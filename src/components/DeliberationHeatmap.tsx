"use client";

import { useMemo, useState } from "react";
import { DOMAINS, type HeatmapSession } from "@/data/heatmapDomains";
import { GRADES, GRADE_BADGE_CLASS, type Grade } from "@/lib/grade";

const GRADE_KEY: Record<Grade, "est" | "pro" | "con" | "gap"> = {
  Established: "est",
  Probable: "pro",
  Contested: "con",
  Gap: "gap",
};

// 4-level density scale per grade — background + text, darkest = most sessions.
// Ported verbatim from the source's c-est-0..3 / c-pro-0..3 / c-con-0..3 / c-gap-0..3.
const DENSITY_CLASSES: Record<Grade, string[]> = {
  Established: ["bg-[#F4F1EB] text-[#B0ADA5]", "bg-[#EAF3DE] text-[#3B6D11]", "bg-[#C0DD97] text-[#27500A]", "bg-[#97C459] text-[#173404]"],
  Probable: ["bg-[#F4F1EB] text-[#B0ADA5]", "bg-[#E6F1FB] text-[#185FA5]", "bg-[#B5D4F4] text-[#0C447C]", "bg-[#85B7EB] text-[#042C53]"],
  Contested: ["bg-[#F4F1EB] text-[#B0ADA5]", "bg-[#FAEEDA] text-[#854F0B]", "bg-[#FAC775] text-[#633806]", "bg-[#EF9F27] text-[#412402]"],
  Gap: ["bg-[#F4F1EB] text-[#B0ADA5]", "bg-[#FCEBEB] text-[#A32D2D]", "bg-[#F7C1C1] text-[#791F1F]", "bg-[#E24B4A] text-[#501313]"],
};

// Sidebar / legend-label / confidence-number color — distinct from the
// GRADE_BADGE_CLASS pill colors (source: GRADE_COLORS in the heatmap script).
const GRADE_TEXT_COLOR: Record<Grade, string> = {
  Established: "#2A7050",
  Probable: "#185FA5",
  Contested: "#854F0B",
  Gap: "#A32D2D",
};

// Column-header text color (source: .hm-col-header.<grade> CSS rules).
const COL_HEADER_CLASS: Record<Grade, string> = {
  Established: "text-[#2A7050]",
  Probable: "text-[#185FA5]",
  Contested: "text-[#8A5A1A]",
  Gap: "text-[#8A1818]",
};

const LEGEND_SWATCHES: Record<Grade, string[]> = {
  Established: ["bg-[#EAF3DE]", "bg-[#C0DD97]", "bg-[#97C459]"],
  Probable: ["bg-[#E6F1FB]", "bg-[#B5D4F4]", "bg-[#85B7EB]"],
  Contested: ["bg-[#FAEEDA]", "bg-[#FAC775]", "bg-[#EF9F27]"],
  Gap: ["bg-[#FCEBEB]", "bg-[#F7C1C1]", "bg-[#E24B4A]"],
};

const SEGMENT_CLASS: Record<Grade, string> = {
  Established: "bg-[#97C459]",
  Probable: "bg-[#85B7EB]",
  Contested: "bg-[#FAC775]",
  Gap: "bg-[#E24B4A]",
};

function densityClass(grade: Grade, n: number, maxN: number): string {
  if (n === 0) return DENSITY_CLASSES[grade][0];
  const ratio = n / maxN;
  if (ratio < 0.25) return DENSITY_CLASSES[grade][1];
  if (ratio < 0.6) return DENSITY_CLASSES[grade][2];
  return DENSITY_CLASSES[grade][3];
}

function SessionWaffle({ agents }: { agents: number[] }) {
  return (
    <div className="my-1.5 flex flex-col gap-[1px]">
      {agents.map((pct, i) => {
        const filled = Math.round(pct / 5);
        return (
          <div key={i} className="grid grid-cols-[repeat(20,minmax(0,1fr))] gap-[1px] overflow-hidden rounded-sm">
            {Array.from({ length: 20 }, (_, j) => (
              <div key={j} className={`aspect-square rounded-[1px] ${j < filled ? "bg-rust" : "bg-border"}`} />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export function DeliberationHeatmap() {
  const [metric, setMetric] = useState<"count" | "pct">("count");
  const [selected, setSelected] = useState<{ domain: string; grade: Grade } | null>(null);

  const maxByGrade = useMemo(() => {
    const map = {} as Record<Grade, number>;
    for (const grade of GRADES) {
      map[grade] = Math.max(...DOMAINS.map((d) => d[GRADE_KEY[grade]].n));
    }
    return map;
  }, []);

  const selectedDomain = selected ? DOMAINS.find((d) => d.name === selected.domain) ?? null : null;
  const selectedStats = selectedDomain && selected ? selectedDomain[GRADE_KEY[selected.grade]] : null;
  const selectedSessions: HeatmapSession[] = selectedDomain && selected ? selectedDomain.sessions[selected.grade] : [];

  return (
    <div className="px-5 py-5 md:px-10 md:py-7 lg:px-[72px]">
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        {/* HEATMAP SIDE */}
        <div className="min-w-0 flex-1">
          <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="font-serif text-lg text-ink">Domains × confidence grades</div>
              <div className="mt-0.5 text-xs text-subtle">Cell intensity = session density · darker = more sessions in that cell</div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex flex-wrap items-center gap-4 text-[11px] text-muted">
                {GRADES.map((grade) => (
                  <div key={grade} className="flex items-center gap-1.5">
                    <div className="flex gap-0.5">
                      {LEGEND_SWATCHES[grade].map((cls, i) => (
                        <div key={i} className={`h-3 w-3 rounded-sm ${cls}`} />
                      ))}
                    </div>
                    <span style={{ color: GRADE_TEXT_COLOR[grade] }}>{grade}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-1">
                {(["count", "pct"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMetric(m)}
                    className={`rounded-[3px] border px-2.5 py-1 font-mono text-[10px] transition-colors ${
                      metric === m ? "border-ink bg-ink text-offwhite" : "border-border text-muted hover:text-ink"
                    }`}
                  >
                    {m === "count" ? "Count" : "%"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse">
              <thead>
                <tr>
                  <th className="w-[100px]" />
                  {GRADES.map((grade) => (
                    <th key={grade} className={`border-b border-border pb-2.5 font-mono text-[11px] font-medium ${COL_HEADER_CLASS[grade]}`}>
                      {grade}
                    </th>
                  ))}
                  <th className="w-12" />
                </tr>
              </thead>
              <tbody>
                {DOMAINS.map((domain) => (
                  <tr key={domain.name}>
                    <td className="py-1 pr-3 text-xs whitespace-nowrap text-body">{domain.name}</td>
                    {GRADES.map((grade) => {
                      const stats = domain[GRADE_KEY[grade]];
                      const cls = densityClass(grade, stats.n, maxByGrade[grade]);
                      const displayVal = stats.n === 0 ? "—" : metric === "count" ? stats.n : `${stats.pct}%`;
                      const subVal = stats.n > 0 ? (metric === "count" ? `${stats.pct}%` : `${stats.n} sessions`) : null;
                      const isActive = selected?.domain === domain.name && selected?.grade === grade;
                      return (
                        <td key={grade} className="p-[3px] align-middle">
                          <button
                            type="button"
                            disabled={stats.n === 0}
                            onClick={() => setSelected({ domain: domain.name, grade })}
                            className={`flex h-11 w-full flex-col items-center justify-center gap-0.5 rounded-[5px] outline-2 outline-transparent transition-[transform,outline] duration-100 md:h-[52px] ${cls} ${
                              stats.n > 0 ? "cursor-pointer hover:scale-[1.05] hover:outline-rust/40" : "cursor-default"
                            } ${isActive ? "scale-[1.05] outline-rust" : ""}`}
                          >
                            <span className="font-mono text-[13px] font-medium">{displayVal}</span>
                            {subVal && <span className="text-[10px] opacity-70">{subVal}</span>}
                          </button>
                        </td>
                      );
                    })}
                    <td className="py-1 pl-2 text-right font-mono text-[11px] text-subtle">{domain.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-col gap-1">
            {DOMAINS.map((d) => (
              <div key={d.name} className="flex items-center gap-2">
                <span className="w-[88px] flex-shrink-0 text-right text-[11px] text-muted">{d.name}</span>
                <div className="flex h-3 flex-1 gap-[1px] overflow-hidden rounded-[3px]">
                  <div className={`h-full ${SEGMENT_CLASS.Established}`} style={{ width: `${d.est.pct}%` }} />
                  <div className={`h-full ${SEGMENT_CLASS.Probable}`} style={{ width: `${d.pro.pct}%` }} />
                  <div className={`h-full ${SEGMENT_CLASS.Contested}`} style={{ width: `${d.con.pct}%` }} />
                  <div className={`h-full ${SEGMENT_CLASS.Gap}`} style={{ width: `${d.gap.pct}%` }} />
                </div>
                <span className="min-w-[36px] text-right font-mono text-[10px] text-subtle">{d.total}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 font-mono text-[10px] tracking-[0.04em] text-border">
            Illustrative data · corpus accumulating from beta launch · augle.com
          </div>
        </div>

        {/* SIDEBAR */}
        {selected && selectedDomain && selectedStats && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-cream md:static md:z-auto md:w-[300px] md:flex-shrink-0 md:overflow-visible md:border-l md:border-border md:bg-paper">
            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-border bg-paper p-4">
              <div>
                <div className="mb-1 font-mono text-[10px] tracking-[0.07em] text-rust uppercase">{selectedDomain.name}</div>
                <div className="font-serif text-[15px] leading-snug text-ink">
                  {selectedStats.n} {selected.grade} session{selectedStats.n !== 1 ? "s" : ""} · {selectedStats.pct}% of {selectedDomain.name} total
                </div>
                <span className={`mt-2 inline-block rounded px-2.5 py-[3px] font-mono text-[11px] font-medium ${GRADE_BADGE_CLASS[selected.grade]}`}>
                  {selected.grade}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded border border-border bg-paper-alt text-muted hover:text-ink"
              >
                ✕
              </button>
            </div>

            <div className="border-b border-border p-4">
              <div className="mb-2.5 font-mono text-[10px] tracking-[0.07em] text-subtle uppercase">Domain summary · {selectedDomain.name}</div>
              <div className="grid grid-cols-2 gap-1.5">
                <div className="rounded-[5px] bg-paper-alt px-2.5 py-2">
                  <div className="font-mono text-[10px] tracking-[0.05em] text-subtle uppercase">Total sessions</div>
                  <div className="font-mono text-base font-medium text-ink">{selectedDomain.total}</div>
                </div>
                <div className="rounded-[5px] bg-paper-alt px-2.5 py-2">
                  <div className="font-mono text-[10px] tracking-[0.05em] text-subtle uppercase">This grade</div>
                  <div className="font-mono text-base font-medium" style={{ color: GRADE_TEXT_COLOR[selected.grade] }}>
                    {selectedStats.pct}%
                  </div>
                </div>
                <div className="rounded-[5px] bg-paper-alt px-2.5 py-2">
                  <div className="font-mono text-[10px] tracking-[0.05em] text-subtle uppercase">Consensus</div>
                  <div className="font-mono text-base font-medium text-[#2A7050]">{selectedDomain.est.pct + selectedDomain.pro.pct}%</div>
                </div>
                <div className="rounded-[5px] bg-paper-alt px-2.5 py-2">
                  <div className="font-mono text-[10px] tracking-[0.05em] text-subtle uppercase">Contested + Gap</div>
                  <div className="font-mono text-base font-medium text-[#8A5A1A]">{selectedDomain.con.pct + selectedDomain.gap.pct}%</div>
                </div>
              </div>
            </div>

            <div className="border-b border-border p-4">
              <div className="mb-2.5 font-mono text-[10px] tracking-[0.07em] text-subtle uppercase">Sessions in this cell</div>
              {selectedSessions.length > 0 ? (
                <div className="flex flex-col gap-1.5">
                  {selectedSessions.map((s, i) => (
                    <div key={i} className="rounded-[5px] border border-transparent bg-paper-alt p-2.5 transition-colors hover:border-rust">
                      <div className="font-serif text-xs leading-snug text-ink">{s.q}</div>
                      <SessionWaffle agents={s.agents} />
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-medium" style={{ color: GRADE_TEXT_COLOR[selected.grade] }}>
                          {s.conf}%
                        </span>
                        <span className="font-mono text-[10px] text-subtle">{s.time}</span>
                      </div>
                      {s.objection && (
                        <div className="mt-2 rounded-[4px] border-l-2 border-rust bg-[#FBF5F2] p-2">
                          <div className="text-[11px] leading-relaxed text-body italic">&quot;{s.objection}&quot;</div>
                          <div className="mt-0.5 font-mono text-[10px] text-subtle">{s.objAgent}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-2 text-[13px] text-subtle">
                  No {selected.grade} sessions in {selectedDomain.name} yet. The corpus is accumulating.
                </div>
              )}
            </div>

            <div className="p-4">
              <button type="button" className="w-full rounded-[5px] border border-border bg-paper-alt py-2 text-xs text-muted transition-colors hover:border-rust hover:bg-rust hover:text-offwhite">
                View all {selectedDomain.name} sessions →
              </button>
            </div>
            <div className="pb-4 text-center font-mono text-[10px] text-border">Illustrative data · augle.com</div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ALL_SESSIONS, DOMAIN_COUNTS, EXPLORER_CONF_CLASS } from "@/data/explorerSessions";
import { GRADES, GRADE_BADGE_CLASS, GRADE_DOT_CLASS, type Grade } from "@/lib/grade";

type SortKey = "recent" | "conf-desc" | "conf-asc" | "dissent-desc";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "recent", label: "Most recent" },
  { value: "conf-desc", label: "Confidence ↓" },
  { value: "conf-asc", label: "Confidence ↑" },
  { value: "dissent-desc", label: "Most dissent" },
];

function DropdownChevron({ open }: { open: boolean }) {
  return (
    <svg
      width={12}
      height={12}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#7A7670"
      strokeWidth={2}
      className={`flex-shrink-0 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function QuestionExplorer() {
  const [search, setSearch] = useState("");
  const [activeDomain, setActiveDomain] = useState("All");
  const [activeGrade, setActiveGrade] = useState<"All" | Grade>("All");
  const [sort, setSort] = useState<SortKey>("recent");
  const [openDropdown, setOpenDropdown] = useState<"domain" | "grade" | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const results = useMemo(() => {
    const term = search.toLowerCase();
    const filtered = ALL_SESSIONS.filter((s) => {
      if (activeDomain !== "All" && s.domain !== activeDomain) return false;
      if (activeGrade !== "All" && s.grade !== activeGrade) return false;
      if (term && !s.q.toLowerCase().includes(term) && !s.domain.toLowerCase().includes(term)) return false;
      return true;
    });
    if (sort === "conf-desc") return [...filtered].sort((a, b) => b.conf - a.conf);
    if (sort === "conf-asc") return [...filtered].sort((a, b) => a.conf - b.conf);
    if (sort === "dissent-desc") return [...filtered].sort((a, b) => b.dissent - a.dissent);
    return filtered;
  }, [search, activeDomain, activeGrade, sort]);

  function clearFilters() {
    setSearch("");
    setActiveDomain("All");
    setActiveGrade("All");
    setSort("recent");
    setOpenDropdown(null);
  }

  const domainCount = DOMAIN_COUNTS.find((d) => d.domain === activeDomain)?.count ?? "";

  return (
    <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-[72px]">
      <div className="flex flex-col gap-6 py-8 md:flex-row md:items-start md:gap-8 md:py-10">
        {/* FILTER PANEL */}
        <div ref={panelRef} className="flex-shrink-0 md:w-60">
          <div className="mb-6">
            <div className="mb-2.5 font-mono text-[10px] tracking-[0.08em] text-subtle uppercase">Search</div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="w-full rounded-[5px] border border-border bg-cream px-3 py-2 text-[13px] text-ink outline-none placeholder:text-subtle focus:border-rust"
            />
          </div>

          <div className="mb-6">
            <div className="mb-2.5 font-mono text-[10px] tracking-[0.08em] text-subtle uppercase">Domain</div>
            <button
              type="button"
              onClick={() => setOpenDropdown((d) => (d === "domain" ? null : "domain"))}
              className={`flex w-full items-center justify-between gap-2 rounded-[5px] border bg-cream px-2.5 py-2 text-left text-[13px] text-ink transition-colors ${
                openDropdown === "domain" ? "border-rust" : "border-border hover:border-subtle"
              }`}
            >
              <span className="truncate">{activeDomain === "All" ? "All domains" : activeDomain}</span>
              <span className="flex flex-shrink-0 items-center gap-2">
                <span className="font-mono text-[10px] text-subtle">{domainCount}</span>
                <DropdownChevron open={openDropdown === "domain"} />
              </span>
            </button>
            {openDropdown === "domain" && (
              <div className="mt-1.5 flex flex-col gap-1">
                {DOMAIN_COUNTS.map((d) => (
                  <button
                    key={d.domain}
                    type="button"
                    onClick={() => {
                      setActiveDomain(d.domain);
                      setOpenDropdown(null);
                    }}
                    className={`flex items-center justify-between rounded px-2.5 py-1.5 text-left text-xs transition-colors ${
                      activeDomain === d.domain ? "bg-ink text-offwhite" : "text-muted hover:bg-paper-alt hover:text-ink"
                    }`}
                  >
                    <span>{d.domain === "All" ? "All domains" : d.domain}</span>
                    <span className="font-mono text-[10px] opacity-60">{d.count}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mb-6">
            <div className="mb-2.5 font-mono text-[10px] tracking-[0.08em] text-subtle uppercase">Confidence grade</div>
            <button
              type="button"
              onClick={() => setOpenDropdown((d) => (d === "grade" ? null : "grade"))}
              className={`flex w-full items-center justify-between gap-2 rounded-[5px] border bg-cream px-2.5 py-2 text-left text-[13px] text-ink transition-colors ${
                openDropdown === "grade" ? "border-rust" : "border-border hover:border-subtle"
              }`}
            >
              <span className="flex items-center gap-2">
                {activeGrade !== "All" && <span className={`h-2 w-2 rounded-full ${GRADE_DOT_CLASS[activeGrade]}`} />}
                <span>{activeGrade === "All" ? "All grades" : activeGrade}</span>
              </span>
              <DropdownChevron open={openDropdown === "grade"} />
            </button>
            {openDropdown === "grade" && (
              <div className="mt-1.5 flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveGrade("All");
                    setOpenDropdown(null);
                  }}
                  className={`rounded px-2.5 py-1.5 text-left text-xs transition-colors ${
                    activeGrade === "All" ? "bg-ink text-offwhite" : "text-muted hover:bg-paper-alt hover:text-ink"
                  }`}
                >
                  All grades
                </button>
                {GRADES.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => {
                      setActiveGrade(g);
                      setOpenDropdown(null);
                    }}
                    className={`flex items-center gap-2 rounded px-2.5 py-1.5 text-left text-xs transition-colors ${
                      activeGrade === g ? "bg-ink text-offwhite" : "text-muted hover:bg-paper-alt hover:text-ink"
                    }`}
                  >
                    <span className={`h-2 w-2 flex-shrink-0 rounded-full ${GRADE_DOT_CLASS[g]}`} />
                    {g}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mb-6">
            <div className="mb-2.5 font-mono text-[10px] tracking-[0.08em] text-subtle uppercase">Sort by</div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="w-full cursor-pointer rounded-[5px] border border-border bg-cream px-2.5 py-1.5 font-mono text-xs text-ink outline-none"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={clearFilters}
            className="w-full rounded-[5px] border border-border py-1.5 text-xs text-muted transition-colors hover:border-rust hover:text-rust"
          >
            Clear all filters
          </button>
        </div>

        {/* RESULTS PANEL */}
        <div className="min-w-0 flex-1">
          <div className="mb-3 border-b border-border pb-3 font-mono text-xs text-subtle">
            Showing <span className="font-medium text-ink">{results.length}</span> of 247 sessions · Illustrative data
          </div>
          <div className="mb-1 hidden grid-cols-[1fr_100px_80px_60px] gap-3 border-b border-border bg-paper-alt px-3 py-2 sm:grid">
            <div className="font-mono text-[10px] tracking-[0.06em] text-subtle uppercase">Question</div>
            <div className="text-right font-mono text-[10px] tracking-[0.06em] text-subtle uppercase">Grade</div>
            <div className="cursor-pointer text-right font-mono text-[10px] tracking-[0.06em] text-rust uppercase">Confidence</div>
            <div className="text-right font-mono text-[10px] tracking-[0.06em] text-subtle uppercase">Time</div>
          </div>

          {results.length === 0 ? (
            <div className="flex h-[300px] flex-col items-center justify-center gap-3">
              <div className="font-serif text-xl text-subtle">No sessions match</div>
              <div className="text-[13px] text-border">Try adjusting your filters</div>
            </div>
          ) : (
            <div>
              {results.map((s, i) => (
                <div
                  key={`${s.domain}-${s.q}-${i}`}
                  className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-2 border-b border-border px-3 py-3.5 transition-colors hover:bg-paper-alt sm:grid-cols-[1fr_100px_80px_60px]"
                >
                  <div className="col-span-2 sm:col-span-1">
                    <div className="mb-1 font-mono text-[10px] tracking-[0.06em] text-rust uppercase">{s.domain}</div>
                    <div className="font-serif text-[13px] leading-snug text-ink">{s.q}</div>
                  </div>
                  <span
                    className={`justify-self-start rounded px-2 py-0.5 text-center font-mono text-[11px] whitespace-nowrap sm:justify-self-end ${GRADE_BADGE_CLASS[s.grade]}`}
                  >
                    {s.grade}
                  </span>
                  <span className={`text-right font-mono text-sm font-medium ${EXPLORER_CONF_CLASS[s.grade]}`}>{s.conf}%</span>
                  <span className="text-right font-mono text-[10px] text-subtle">{s.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

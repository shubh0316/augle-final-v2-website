import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { AgentAvatar, renderRich } from "@/lib/richText";
import { GRADE_BADGE_CLASS, type Grade } from "@/lib/grade";
import {
  OUTCOMES,
  type AgentScore,
  type SessionTagVariant,
  type SidebarRow,
  type StatusVariant,
} from "@/data/outcomes";
import { PhaseTabs, CopyCiteButton } from "./client";

export async function generateStaticParams() {
  return OUTCOMES.map((outcome) => ({ slug: outcome.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const outcome = OUTCOMES.find((o) => o.slug === slug);
  if (!outcome) return {};
  return { title: outcome.title, description: outcome.description };
}

const TAG_CLASS: Record<SessionTagVariant, string> = {
  domain: "bg-paper-alt text-muted",
  mode: "bg-ink-2 text-faint",
  vertical: "bg-svs-verified-bg text-svs-verified",
  depth: "bg-ink-3 text-rust",
  tier: "bg-svs-verified-bg text-svs-verified",
  resolved: "bg-conf-high-bg text-conf-high-text",
  guardian: "border border-rust bg-paper text-rust",
};

const STATUS_CLASS: Record<StatusVariant, string> = {
  good: "bg-conf-high-bg text-conf-high-text",
  warn: "bg-conf-med-bg text-conf-med-text",
  bad: "bg-conf-contested-bg text-conf-contested-text",
};

const ROW_VALUE_CLASS: Record<NonNullable<SidebarRow["variant"]> | "default", string> = {
  default: "text-ink",
  green: "text-conf-high-text",
  accent: "text-rust",
  warn: "text-conf-med-text",
  bad: "text-conf-contested-text",
};

const SECTION_CARD = "overflow-hidden rounded-lg border border-border bg-paper";
const CARD_HEADER = "flex items-center justify-between gap-2 border-b border-border px-5 py-3.5";
const CARD_HEADER_LABEL = "font-mono text-[10px] tracking-[0.08em] text-subtle uppercase";
const SIDE_HEADER = "border-b border-border px-3.5 py-2.5";
const CTRL_BTN =
  "rounded-md border border-border bg-paper-alt px-3.5 py-1.5 text-xs text-body transition-colors hover:border-rust hover:text-rust";

function Waffle({ agents, dissentMuted }: { agents: AgentScore[]; dissentMuted: boolean }) {
  return (
    <div className="mb-2 flex flex-col gap-0.5 overflow-hidden rounded-[3px]">
      {agents.map((agent) => {
        const filled = Math.round(agent.pct / 5);
        const isDim = dissentMuted && agent.dissent;
        return (
          <div key={agent.name} className="grid grid-cols-[repeat(20,minmax(0,1fr))] gap-0.5">
            {Array.from({ length: 20 }, (_, j) => (
              <div
                key={j}
                className={`aspect-square rounded-[1px] ${j < filled ? (isDim ? "bg-rust/55" : "bg-rust") : "bg-border"}`}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const outcome = OUTCOMES.find((o) => o.slug === slug);
  if (!outcome) notFound();

  const { finding } = outcome;
  const isMarketMode = !!finding.resolution;

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Outcomes", href: "/outcomes" },
          { label: `Session · ${outcome.sessionTag}` },
        ]}
      />

      {/* SESSION HEADER */}
      <div className="border-b border-border bg-paper">
        <div className="mx-auto max-w-[1100px] px-5 py-7 md:px-10 lg:px-[72px]">
          <div className="mb-3.5 flex flex-wrap items-center gap-2.5">
            {outcome.tags.map((tag) => (
              <span
                key={tag.label}
                className={`rounded-[3px] px-2.5 py-1 font-mono text-[10px] tracking-[0.05em] uppercase ${TAG_CLASS[tag.variant]}`}
              >
                {tag.label}
              </span>
            ))}
            <span className="ml-auto font-mono text-[11px] text-subtle">{outcome.timestamp}</span>
          </div>
          <h1 className="max-w-[760px] font-serif text-2xl leading-[1.3] text-ink md:text-[28px]">
            {outcome.question}
          </h1>
          {outcome.context && (
            <>
              <p className="mt-2 text-sm text-muted italic">{outcome.context}</p>
              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                <button type="button" className={CTRL_BTN}>
                  ↓ Export PDF
                </button>
                <button type="button" className={CTRL_BTN}>
                  ↗ Share
                </button>
                <button type="button" className={CTRL_BTN}>
                  + Run follow-on
                </button>
                <span className="ml-2 font-mono text-[10px] text-border">Illustrative session · augle.com</span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-7 px-5 py-8 md:px-10 lg:grid-cols-[1fr_280px] lg:px-[72px]">
        {/* MAIN COLUMN */}
        <div className="flex min-w-0 flex-col gap-4">
          {/* FINDING */}
          <div className={SECTION_CARD}>
            <div className={CARD_HEADER}>
              <span className={CARD_HEADER_LABEL}>Finding · Phase 3 synthesis</span>
              <span className={`rounded px-2 py-0.5 font-mono text-[11px] ${GRADE_BADGE_CLASS[finding.grade]}`}>
                {finding.grade}
              </span>
            </div>
            <div className="p-5">
              {isMarketMode ? (
                <div className="mb-4 flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-center">
                  <div>
                    <div className="font-mono text-4xl font-medium leading-none text-rust">{finding.confidence}%</div>
                    <div className="mt-1 text-xs text-subtle">Ensemble confidence</div>
                  </div>
                  <div className="flex-1 border-t border-border pt-3 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-5">
                    <div className="mb-1 font-mono text-[10px] text-subtle">RESOLUTION</div>
                    <div className="font-mono text-sm font-medium text-conf-high-text">{finding.resolution!.status}</div>
                    <div className="mt-0.5 text-[11px] text-subtle">
                      {finding.resolution!.source} · {finding.resolution!.date}
                    </div>
                  </div>
                  {finding.brier && (
                    <div className="border-t border-border pt-3 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-5">
                      <div className="mb-1 font-mono text-[10px] text-subtle">BRIER SCORE</div>
                      <div className="font-mono text-xl font-medium text-conf-high-text">{finding.brier.augle}</div>
                      <div className="mt-0.5 text-[11px] text-subtle">vs market {finding.brier.market}</div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mb-4 grid grid-cols-1 gap-4 border-b border-border pb-4 sm:grid-cols-[auto_1fr_auto]">
                  <div>
                    <div className="font-mono text-4xl font-medium leading-none text-rust">{finding.confidence}%</div>
                    <div className="mt-1 text-xs text-subtle">Ensemble confidence</div>
                  </div>
                  <div className="border-t border-border pt-3 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-5">
                    <div className="mb-1.5 font-mono text-[10px] text-subtle">CONFIDENCE GRADE</div>
                    <span className={`inline-block rounded px-2.5 py-1 font-mono text-[13px] font-medium ${GRADE_BADGE_CLASS[finding.grade]}`}>
                      {finding.grade}
                    </span>
                    {finding.gradeNote && <p className="mt-1.5 text-xs leading-relaxed text-muted">{finding.gradeNote}</p>}
                  </div>
                  <div className="border-t border-border pt-3 sm:min-w-[180px] sm:border-t-0 sm:border-l sm:pt-0 sm:pl-5">
                    <div className="rounded-md bg-paper-alt p-3.5">
                      <div className="mb-2 font-mono text-[10px] tracking-[0.07em] text-subtle uppercase">Calibration basis</div>
                      <div className="mb-1 text-[13px] font-medium text-ink">Confidence grade</div>
                      <p className="text-xs leading-relaxed text-muted">
                        Finding is the confidence grade itself. Confidence grade is the finding. For an open research
                        question, the grade — not a numeric score — is the complete result.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <p className="mb-5 text-[15px] leading-[1.75] text-ink">{finding.text}</p>

              <div className="mb-2 font-mono text-[10px] tracking-[0.07em] text-subtle uppercase">
                Confidence grid · 5 agents × 20 units
              </div>
              <Waffle agents={outcome.sidebar.agents} dissentMuted={isMarketMode} />
              <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-[1.5px] bg-rust" />
                  Agreement / confident
                </span>
                {isMarketMode && (
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-[1.5px] bg-rust/55" />
                    Dissent / Contrarian pressure
                  </span>
                )}
                <span>Shorter row = lower confidence / dissent</span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-[1.5px] bg-border" />
                  Unfilled
                </span>
              </div>

              <div className="flex flex-col gap-2.5 border-t border-border pt-4">
                <div className="font-mono text-[10px] tracking-[0.07em] text-subtle uppercase">{finding.reopenLabel}</div>
                {finding.reopenConditions.map((rc) => (
                  <div key={rc.id} className="flex gap-2.5">
                    <span className="mt-0.5 shrink-0 font-mono text-[10px] text-rust">{rc.id}</span>
                    <div>
                      <div className="text-[13px] leading-[1.55] text-body">{rc.text}</div>
                      <div className="mt-0.5 font-mono text-[10px] text-subtle">{rc.trigger}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FINDING HISTORY (RAG only) */}
          {outcome.findingHistory && (
            <div className={SECTION_CARD}>
              <div className={CARD_HEADER}>
                <span className={CARD_HEADER_LABEL}>Finding history · reopen monitoring</span>
                <span className="rounded bg-paper-alt px-2 py-0.5 font-mono text-[11px] text-muted">
                  {outcome.findingHistory.badge}
                </span>
              </div>
              <div className="p-5">
                <p className="mb-4 text-[13px] text-body">{renderRich(outcome.findingHistory.stableNote)}</p>
                <div className="flex flex-col gap-4 border-l-2 border-border pl-4">
                  {outcome.findingHistory.events.map((ev) => (
                    <div key={ev.date}>
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[11px] text-subtle">{ev.date}</span>
                        <span className="text-[13px] font-medium text-ink">{ev.title}</span>
                        {ev.grade && (
                          <span className={`rounded px-2 py-0.5 font-mono text-[11px] ${GRADE_BADGE_CLASS[ev.grade.split(" ")[0] as Grade]}`}>
                            {ev.grade}
                          </span>
                        )}
                      </div>
                      <p className="text-[13px] leading-relaxed text-body">{ev.text}</p>
                      {ev.trigger && <div className="mt-1 font-mono text-[11px] text-subtle">{ev.trigger}</div>}
                    </div>
                  ))}
                </div>
                <p className="mt-4 border-t border-border pt-3 text-[11px] text-subtle italic">
                  {outcome.findingHistory.footerNote}
                </p>
              </div>
            </div>
          )}

          {/* PHASE TRANSCRIPT */}
          <div className={SECTION_CARD}>
            <div className={CARD_HEADER}>
              <span className={CARD_HEADER_LABEL}>Phase transcript · all three rounds</span>
            </div>
            <PhaseTabs phases={outcome.phases} />
          </div>

          {/* DISSENT REGISTER */}
          <div className={SECTION_CARD}>
            <div className={CARD_HEADER}>
              <span className={CARD_HEADER_LABEL}>Dissent register · all Contrarian objections</span>
              <span className={`rounded px-2 py-0.5 font-mono text-[11px] whitespace-nowrap ${STATUS_CLASS[outcome.dissentBadgeVariant]}`}>
                {outcome.dissentBadge}
              </span>
            </div>
            <div className="flex flex-col p-5">
              {outcome.objections.map((obj, i) => (
                <div
                  key={`${obj.mention}-${obj.phaseLabel}`}
                  className={`py-3.5 first:pt-0 ${i < outcome.objections.length - 1 ? "border-b border-border" : "pb-0"}`}
                >
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${
                        obj.strength === "strong" ? "bg-conf-contested-bg text-conf-contested-text" : "bg-conf-med-bg text-conf-med-text"
                      }`}
                    >
                      {obj.strength === "strong" ? "Strong" : "Moderate"}
                    </span>
                    <span className="font-mono text-[10px] text-subtle">{obj.mention}</span>
                    <span className="font-mono text-[10px] text-subtle">{obj.phaseLabel}</span>
                    <span
                      className={`ml-auto font-mono text-[10px] whitespace-nowrap ${
                        obj.statusVariant === "unresolved" ? "text-rust" : "text-conf-high-text"
                      }`}
                    >
                      {obj.status}
                    </span>
                  </div>
                  <div className="mb-1 font-mono text-[9px] tracking-[0.06em] text-subtle uppercase">Steelman</div>
                  <p className="mb-2 rounded bg-paper-alt p-2.5 text-xs leading-relaxed text-muted italic">{obj.steelman}</p>
                  <p className="mb-1.5 text-[13px] leading-relaxed text-ink italic">{obj.text}</p>
                  <div className="mb-0.5 font-mono text-[10px] tracking-[0.06em] text-subtle uppercase">Resolution condition</div>
                  <p className="rounded bg-paper-alt px-2.5 py-1.5 font-mono text-[11px] text-subtle">{obj.resolution}</p>
                  {obj.resolutionNote && (
                    <p className="mt-1.5 rounded bg-conf-high-bg px-2.5 py-1.5 font-mono text-xs text-conf-high-text">
                      {obj.resolutionNote}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* GUARDIAN LOG */}
          <div className={SECTION_CARD}>
            <div className={CARD_HEADER}>
              <span className={CARD_HEADER_LABEL}>
                Guardian integrity log{outcome.guardian.mode ? ` · ${outcome.guardian.mode.charAt(0).toLowerCase()}${outcome.guardian.mode.slice(1)}` : ""}
              </span>
              <span className={`rounded px-2 py-0.5 font-mono text-[11px] whitespace-nowrap ${STATUS_CLASS[outcome.guardian.badgeVariant]}`}>
                {outcome.guardian.score}% · {outcome.guardian.badgeStatus}
              </span>
            </div>
            <div className="p-5">
              <div className="mb-4 flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="font-mono text-3xl font-medium text-rust">{outcome.guardian.score}%</div>
                  <div className="mt-0.5 text-xs text-subtle">Overall integrity score</div>
                  {outcome.guardian.mode && (
                    <span className="mt-1.5 inline-block rounded border border-rust bg-paper px-2 py-0.5 font-mono text-[10px] text-rust">
                      {outcome.guardian.mode}
                    </span>
                  )}
                </div>
                <p className="text-[13px] leading-relaxed text-body sm:max-w-[400px]">{outcome.guardian.description}</p>
              </div>
              <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {outcome.guardian.dims.map((dim) => (
                  <div key={dim.label} className="rounded-md bg-paper-alt px-3 py-2.5">
                    <div className="mb-1 font-mono text-[10px] text-subtle uppercase">{dim.label}</div>
                    <div className="font-mono text-base font-medium text-rust">{dim.value}%</div>
                    <div className="mt-1.5 h-[3px] overflow-hidden rounded-full bg-border">
                      <div className="h-full rounded-full bg-rust" style={{ width: `${dim.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mb-2.5 font-mono text-[10px] tracking-[0.07em] text-subtle uppercase">{outcome.guardian.svsLabel}</div>
              <div className="flex flex-col">
                {outcome.guardian.svsRows.map((row, i) => (
                  <div
                    key={row.source}
                    className={`flex items-start gap-2.5 py-2 text-xs ${i < outcome.guardian.svsRows.length - 1 ? "border-b border-border" : ""}`}
                  >
                    <span
                      className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${row.status === "ok" ? "bg-svs-verified" : "bg-rust"}`}
                    />
                    <div className="min-w-0 flex-1">
                      <span className="leading-relaxed text-body">{row.source}</span>
                      {row.flagNote && <div className="mt-0.5 font-mono text-[10px] text-rust">{row.flagNote}</div>}
                    </div>
                    <span className="shrink-0 font-mono text-[10px] whitespace-nowrap text-subtle">{row.type}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2.5 font-mono text-[10px] text-subtle">{outcome.guardian.svsSummary}</div>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="flex min-w-0 flex-col gap-3">
          <div className={SECTION_CARD}>
            <div className={SIDE_HEADER}>
              <span className={CARD_HEADER_LABEL}>Session metadata</span>
            </div>
            <div className="flex flex-col p-3.5">
              {outcome.sidebar.metadata.map((row, i) => (
                <div
                  key={row.label}
                  className={`flex items-center justify-between gap-2 py-1.5 ${i < outcome.sidebar.metadata.length - 1 ? "border-b border-border" : ""}`}
                >
                  <span className="text-xs text-muted">{row.label}</span>
                  <span className={`text-right font-mono text-xs font-medium ${ROW_VALUE_CLASS[row.variant ?? "default"]}`}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {finding.brier ? (
            <div className={SECTION_CARD}>
              <div className={SIDE_HEADER}>
                <span className={CARD_HEADER_LABEL}>Brier score · calibration</span>
              </div>
              <div className="p-3.5">
                <div className="mb-2.5 grid grid-cols-2 gap-1.5">
                  <div className="rounded-md bg-paper-alt p-2.5">
                    <div className="mb-0.5 font-mono text-[9px] text-subtle uppercase">Augle</div>
                    <div className="font-mono text-xl font-medium text-conf-high-text">{finding.brier.augle}</div>
                  </div>
                  <div className="rounded-md bg-paper-alt p-2.5">
                    <div className="mb-0.5 font-mono text-[9px] text-subtle uppercase">Market</div>
                    <div className="font-mono text-xl font-medium text-rust">{finding.brier.market}</div>
                  </div>
                </div>
                <p className="text-[11px] leading-relaxed text-subtle">{finding.brier.note}</p>
              </div>
            </div>
          ) : (
            <div className={SECTION_CARD}>
              <div className={SIDE_HEADER}>
                <span className={CARD_HEADER_LABEL}>Calibration status</span>
              </div>
              <div className="p-3.5">
                <div className="rounded-md bg-paper-alt p-3.5">
                  <div className="mb-2.5 font-mono text-[10px] tracking-[0.07em] text-subtle uppercase">Calibration basis</div>
                  <div className="mb-2.5 flex flex-wrap items-center gap-2">
                    <span className="text-[13px] font-medium text-ink">Confidence grade</span>
                    <span className="rounded bg-svs-verified-bg px-2 py-0.5 font-mono text-[10px] text-svs-verified">
                      Confidence grade is the finding
                    </span>
                  </div>
                  <p className="mb-2.5 text-xs leading-relaxed text-muted">
                    For open research questions, the confidence grade is the complete finding — calibrated against the
                    evidence base, not against a binary resolution outcome.
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted">Finding grade</span>
                    <span className={`rounded px-2.5 py-0.5 font-mono text-xs font-medium ${GRADE_BADGE_CLASS[finding.grade]}`}>
                      {finding.grade} · {finding.confidence}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {outcome.citeBox && (
            <div className={SECTION_CARD}>
              <div className={SIDE_HEADER}>
                <span className={CARD_HEADER_LABEL}>Cite this Finding</span>
              </div>
              <div className="p-3.5">
                <div className="mb-2 font-mono text-[10px] text-subtle">{outcome.citeBox.id}</div>
                <p className="mb-3 rounded bg-paper-alt p-2.5 text-xs leading-relaxed text-body">{outcome.citeBox.citation}</p>
                <CopyCiteButton citation={outcome.citeBox.citation} />
                <div className="mt-2.5 flex items-center justify-between gap-2 text-[11px] text-subtle">
                  <span>{outcome.citeBox.trackedLabel}</span>
                  <span className="font-mono">{outcome.citeBox.trackedValue}</span>
                </div>
              </div>
            </div>
          )}

          <div className={SECTION_CARD}>
            <div className={SIDE_HEADER}>
              <span className={CARD_HEADER_LABEL}>Agent confidence</span>
            </div>
            <div className="flex flex-col p-3.5">
              {outcome.sidebar.agents.map((agent, i) => (
                <div
                  key={agent.name}
                  className={`flex items-center gap-2 py-1.5 ${i < outcome.sidebar.agents.length - 1 ? "border-b border-border" : ""}`}
                >
                  <AgentAvatar name={agent.name} size={20} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[11px] text-body">{agent.name}</div>
                    <div className="truncate font-mono text-[9px] text-subtle">{agent.model}</div>
                  </div>
                  <div className="h-[3px] w-12 shrink-0 overflow-hidden rounded-full bg-border">
                    <div className={`h-full rounded-full ${agent.dissent ? "bg-rust/55" : "bg-rust"}`} style={{ width: `${agent.pct}%` }} />
                  </div>
                  <div className="w-8 shrink-0 text-right font-mono text-[11px] font-medium text-rust">{agent.pct}%</div>
                </div>
              ))}
            </div>
          </div>

          <div className={SECTION_CARD}>
            <div className={SIDE_HEADER}>
              <span className={CARD_HEADER_LABEL}>Export &amp; share</span>
            </div>
            <div className="flex flex-col gap-1.5 p-3.5">
              {["↓ Download full PDF report", "↓ Export JSON · audit trail", "↗ Share session link", "+ Run follow-on session"].map((label) => (
                <button
                  key={label}
                  type="button"
                  className="rounded-md border border-border bg-paper-alt py-2 text-xs text-body transition-colors hover:border-rust hover:bg-rust hover:text-offwhite"
                >
                  {label}
                </button>
              ))}
              <div className="pt-1 text-center font-mono text-[10px] tracking-[0.04em] text-border">
                Illustrative session · augle.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

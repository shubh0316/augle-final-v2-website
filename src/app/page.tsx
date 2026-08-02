import Link from "next/link";
import { AGENTS } from "@/data/agents";
import { AgentCard } from "@/components/AgentCard";
import { WaffleWidget } from "@/components/WaffleWidget";
import { CtaBanner } from "@/components/CtaBanner";
import { btnPrimary, btnSecondary, eyebrow, sectionTitle } from "@/lib/styles";

const OUTCOMES = [
  {
    vertical: "Policy",
    confidence: "high" as const,
    confidenceLabel: "High confidence",
    question:
      "\"Does the proposed infrastructure bill's cost-benefit methodology adequately account for climate-adjusted risk over a 30-year horizon?\"",
    finding:
      "Settled: standard CBA frameworks systematically undervalue tail risk. Contested: the appropriate discount rate for climate-adjusted infrastructure. Finding: defensible for near-term projections; materially inadequate for 20+ year claims.",
    phases: "Ensemble · 3 phases",
  },
  {
    vertical: "Healthcare",
    confidence: "contested" as const,
    confidenceLabel: "Contested",
    question:
      "\"Is the drug-drug interaction evidence sufficient to contraindicate concurrent use in patients with moderate hepatic impairment?\"",
    finding:
      "Strong unresolved objection: the interaction studies excluded moderate hepatic impairment populations entirely. The finding is contested — not because evidence conflicts, but because the relevant population was never studied.",
    phases: "Ensemble · 3 phases",
  },
  {
    vertical: "Venture capital",
    confidence: "med" as const,
    confidenceLabel: "Medium confidence",
    question:
      '"Does the TAM assumption in this Series A deck reflect the addressable market or the theoretical maximum?"',
    finding:
      "Construct validity issues with the market sizing methodology — the $14B figure conflates enterprise and SMB segments with fundamentally different sales motions. The defensible TAM for the current GTM is $2.1–3.4B.",
    phases: "Ensemble · 2 phases",
  },
];

const CONFIDENCE_CLASS = {
  high: "bg-conf-high-bg text-conf-high-text",
  med: "bg-conf-med-bg text-conf-med-text",
  contested: "bg-conf-contested-bg text-conf-contested-text",
};

const CHECKS = [
  "Source Verification Service authenticates every citation in real time",
  "Unverified preprints and retracted papers automatically flagged and capped",
  "Domain-specific integrity modes: academic, legal, clinical, financial",
  "Full audit trail — every source decision logged and exportable",
];

const SVS_ROWS = [
  { status: "verified" as const, text: "Pashler et al. (2008) — Reproducibility and Research Practices" },
  { status: "verified" as const, text: "Open Science Collaboration (2015) — Science, Vol. 349" },
  { status: "flagged" as const, text: "Martinez et al. (2024) — arXiv preprint, not peer-reviewed" },
  { status: "verified" as const, text: "Simmons et al. (2011) — False-Positive Psychology, Psych Science" },
  { status: "unverified" as const, text: "Chen & Liu (2023) — Conference proceedings, pending review" },
  { status: "verified" as const, text: "Ioannidis (2005) — Why Most Published Research Findings Are False" },
];

const SVS_DOT_CLASS = {
  verified: "bg-svs-verified",
  flagged: "bg-rust",
  unverified: "bg-faint",
};

const SVS_BADGE_CLASS = {
  verified: "bg-svs-verified-bg text-svs-verified",
  flagged: "bg-svs-flagged-bg text-rust",
  unverified: "bg-svs-unverified-bg text-svs-unverified",
};

const SVS_LABEL = { verified: "Verified", flagged: "Flagged", unverified: "Unverified" };

const STATS = [
  { num: "7", label: "Specialized agents per session" },
  { num: "3", label: "Deliberation phases per analysis" },
  { num: "11", label: "Solution verticals served" },
  { num: "100%", label: "Auditable reasoning corpus" },
];

const VERTICALS = [
  "Universities + academia",
  "Research labs",
  "Policy + lawmakers",
  "Law firms",
  "Venture capital + PE",
  "Think tanks",
  "Enterprise",
  "Healthcare + life sciences",
  "Government",
  "Financial services",
  "Media + journalism",
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <div className="border-b border-border">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-5 py-16 md:px-10 md:py-20 lg:grid-cols-[1fr_420px] lg:items-start lg:gap-24 lg:px-[72px] lg:py-28">
          <div>
            <div className={eyebrow}>Augmented deliberation</div>
            <h1 className="mb-7 font-serif text-[42px] font-normal leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[64px]">
              The questions
              <br />
              that matter don&apos;t
              <br />
              have <em className="text-rust not-italic italic">clean answers.</em>
            </h1>
            <p className="mb-10 max-w-xl text-lg leading-[1.8] text-body">
              Augle&apos;s multi-agent ensemble maps what&apos;s settled, what&apos;s contested,
              and what&apos;s unknown — producing evidence-anchored findings with calibrated
              confidence grades before the stakes are live.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Link href="/waitlist" className={btnPrimary}>
                Join waitlist
              </Link>
              <Link href="/how-it-works" className={btnSecondary}>
                See how it works →
              </Link>
            </div>
          </div>
          <WaffleWidget />
        </div>
      </div>

      {/* ENSEMBLE */}
      <div className="border-t border-border bg-ink py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-[72px]">
          <div className={eyebrow}>Multi-agent ensemble</div>
          <h2 className="mb-12 max-w-2xl font-serif text-3xl leading-[1.15] text-offwhite md:mb-14 md:text-[44px]">
            Structured deliberation across three phases — not a single model guessing.
          </h2>
          <div className="mb-10 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border-dark bg-border-dark md:grid-cols-3">
            <div className="bg-ink-2 p-8">
              <div className="mb-3.5 font-mono text-[10px] tracking-[0.08em] text-rust uppercase">Phase 1</div>
              <div className="mb-3.5 font-serif text-2xl text-offwhite">Exploration</div>
              <p className="text-sm leading-[1.8] text-faint">
                The Cartographer maps the evidence landscape. The Methodologist assesses
                construct validity. The Guardian&apos;s Source Verification Service authenticates
                every citation in real time.
              </p>
            </div>
            <div className="bg-ink-2 p-8">
              <div className="mb-3.5 font-mono text-[10px] tracking-[0.08em] text-rust uppercase">Phase 2</div>
              <div className="mb-3.5 font-serif text-2xl text-offwhite">Deliberation</div>
              <p className="text-sm leading-[1.8] text-faint">
                The Contrarian surfaces the strongest objections — including the ones you
                haven&apos;t thought of. Each objection is classified by strength and resolution
                status before the ensemble proceeds.
              </p>
            </div>
            <div className="bg-ink-2 p-8">
              <div className="mb-3.5 font-mono text-[10px] tracking-[0.08em] text-rust uppercase">Phase 3</div>
              <div className="mb-3.5 font-serif text-2xl text-offwhite">Synthesis</div>
              <p className="text-sm leading-[1.8] text-faint">
                The Synthesizer weighs evidence across agents at temperature zero. The
                Pragmatist produces actionable next steps. The full deliberation is logged as
                an auditable reasoning trace.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-7">
            {AGENTS.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>
      </div>

      {/* OUTCOMES */}
      <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-24 lg:px-[72px]">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-12">
          <div>
            <div className={eyebrow}>Featured outcomes</div>
            <h2 className={sectionTitle}>
              What deliberation
              <br />
              looks like in practice.
            </h2>
          </div>
          <Link href="/outcomes" className="pb-1.5 text-sm font-medium whitespace-nowrap text-rust">
            Browse all outcomes →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {OUTCOMES.map((outcome) => (
            <div
              key={outcome.question}
              className="rounded-lg border border-border bg-paper p-6 transition-colors hover:border-rust"
            >
              <div className="mb-3.5 flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.06em] text-subtle uppercase">
                  {outcome.vertical}
                </span>
                <span className={`rounded font-mono text-[11px] px-2 py-0.5 ${CONFIDENCE_CLASS[outcome.confidence]}`}>
                  {outcome.confidenceLabel}
                </span>
              </div>
              <p className="mb-3.5 text-sm leading-relaxed text-ink italic">{outcome.question}</p>
              <p className="mb-3.5 text-[13px] leading-relaxed text-body">{outcome.finding}</p>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-subtle">{outcome.phases}</span>
                <Link href="/outcomes" className="text-[13px] font-medium text-rust">
                  View →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GUARDIAN */}
      <div className="border-y border-border bg-paper">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-2 lg:items-start lg:gap-24 lg:px-[72px]">
          <div>
            <div className={eyebrow}>Guardian integrity system</div>
            <h2 className={`${sectionTitle} mb-5`}>Every source verified before it influences a finding.</h2>
            <p className="mb-8 text-lg leading-[1.85] text-body">
              The Guardian runs continuously across all three phases — authenticating
              citations, flagging unverified preprints, enforcing domain-specific integrity
              rules, and capping confidence grades on any node where source verification
              fails.
            </p>
            <div className="flex flex-col gap-3.5">
              {CHECKS.map((check) => (
                <div key={check} className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-[3px] bg-rust">
                    <svg width={12} height={12} viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2.5 6L5 8.5L9.5 3.5"
                        stroke="#F7F6F2"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-[15px] leading-[1.7] text-body">{check}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg bg-ink p-7">
            <div className="mb-4.5 font-mono text-[10px] tracking-[0.08em] text-rust uppercase">
              Source verification · live session
            </div>
            <div className="flex flex-col">
              {SVS_ROWS.map((row, i) => (
                <div
                  key={row.text}
                  className={`flex items-center gap-3 py-3 ${i < SVS_ROWS.length - 1 ? "border-b border-border-dark" : ""}`}
                >
                  <div className={`h-2 w-2 flex-shrink-0 rounded-full ${SVS_DOT_CLASS[row.status]}`} />
                  <span className="flex-1 text-[13px] leading-snug text-offwhite/90">{row.text}</span>
                  <span className={`flex-shrink-0 rounded font-mono text-[10px] whitespace-nowrap px-1.5 py-0.5 ${SVS_BADGE_CLASS[row.status]}`}>
                    {SVS_LABEL[row.status]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PROOF */}
      <div className="mx-auto max-w-[1280px] px-5 py-16 text-center md:px-10 md:py-20 lg:px-[72px]">
        <div className="mb-10 font-mono text-xs tracking-[0.1em] text-subtle uppercase md:mb-12">
          Built for high-stakes reasoning across every domain
        </div>
        <div className="mb-12 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border md:mb-16 md:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-paper p-7 text-center md:p-9">
              <div className="mb-2 font-serif text-4xl text-ink md:text-5xl">{stat.num}</div>
              <div className="text-[13px] leading-relaxed text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="mb-5 text-[15px] text-subtle">
          Serving researchers, analysts, and decision-makers across
        </div>
        <div className="flex flex-wrap justify-center gap-2.5">
          {VERTICALS.map((vertical) => (
            <span
              key={vertical}
              className="rounded border border-border bg-paper-alt px-4 py-1.5 font-mono text-xs text-muted"
            >
              {vertical}
            </span>
          ))}
        </div>
      </div>

      <CtaBanner
        title={
          <>
            Engineered for the
            <br />
            questions that matter.
          </>
        }
        body={
          <>
            Join researchers, analysts, and decision-makers using Augle
            <br className="hidden sm:block" />
            to find the hard edges of what they know.
          </>
        }
      />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CtaBanner } from "@/components/CtaBanner";
import { AGENTS } from "@/data/agents";
import { eyebrow, sectionTitle } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Augle's 3-Phase AI Deliberation Process Explained",
  description:
    "Exploration, Deliberation, Synthesis — how Augle structures every research session into three constrained phases that build toward a calibrated finding.",
};

function agent(id: string) {
  const a = AGENTS.find((x) => x.id === id);
  if (!a) throw new Error(`Unknown agent id: ${id}`);
  return a;
}

const PRINCIPLES = [
  {
    label: "Fixed dispatch order",
    text: "Agent dispatch order is fixed within every phase. Parallel execution would allow agents to miss each other's outputs — eliminating the structured constraint propagation that makes the architecture reliable.",
  },
  {
    label: "Typed output contracts",
    text: "Every agent operates under a typed output contract — a defined structure for what it produces and what it is forbidden from producing. Contracts are architectural constraints, not guidelines.",
  },
  {
    label: "Hard constraints, not suggestions",
    text: "Confidence bounds established by the Methodologist are hard upper limits. The Synthesizer cannot produce a conclusion at higher confidence than its supporting evidence — not even if instructed to.",
  },
];

const DISPATCH_FLOW = [
  { id: "topic-architect", phase: "Init only", out: "Session params · phase transitions · final delivery", rust: true },
  { id: "cartographer", phase: "Phases 1–3", out: "Five-component landscape map · evidence nodes · knowledge gaps" },
  { id: "methodologist", phase: "Phases 1–3", out: "Per-node confidence bounds · grade challenges" },
  { id: "guardian", phase: "Phase boundaries", out: "SVS authentication · flag classification · halt authority", rust: true },
  { id: "contrarian", phase: "Phases 1–3", out: "Steelmanned objections · resolution conditions · strength grades" },
  { id: "synthesizer", phase: "Phases 1–3", out: "Evidence-anchored conclusion · T = 0.0 deterministic" },
  { id: "pragmatist", phase: "Phase 3 only", out: "Actionable output · inherits Synthesizer confidence ceiling" },
];

type PhaseAgentRow = { id: string; temp: string; output: string };
type PhaseData = {
  numLabel: string;
  title: React.ReactNode;
  subtitle: string;
  rows: PhaseAgentRow[];
  panelTitle: string;
  panelItems: { label: string; text: string }[];
  carriesForward?: string[];
  dark?: boolean;
};

const PHASE_1: PhaseData = {
  numLabel: "Exploration",
  title: (
    <>
      <em className="text-rust not-italic italic">Map</em> the terrain.
    </>
  ),
  subtitle:
    "Phase 1 establishes the evidence landscape — what's settled, what's contested, what's genuinely unknown. The Cartographer produces the five-component terrain map. The Methodologist issues preliminary confidence bounds on every evidence node. The Guardian authenticates every source. The Contrarian challenges the landscape itself.",
  rows: [
    { id: "topic-architect", temp: "T = 0.2 · init only", output: "Session initialization — research question parsed, depth tier set, first dispatch queued. Does not fire again until phase transition or final delivery." },
    { id: "cartographer", temp: "T = 0.8 · dispatched first", output: "(1) Restated research question · (2) Scope boundaries · (3) Evidence terrain map — Settled / Contested / Unknown · (4) Evidence nodes with source and limitations · (5) Knowledge gap register" },
    { id: "methodologist", temp: "T = 0.5", output: "Four-dimension validity assessment per evidence node: internal validity · external validity · construct validity · methodology-claim match. Issues Established / Probable / Contested / Gap as hard constraints on Synthesizer." },
    { id: "guardian", temp: "T = 0.1 · phase boundary", output: "SVS authentication of all Phase 1 evidence nodes. Confidence downgrades applied. Flags raised to registry. Phase 1 → Phase 2 transition authorised or blocked." },
    { id: "contrarian", temp: "T = 1.0 · max variation", output: "Challenges to the Cartographer's terrain classification — questioning which claims belong in Settled vs Contested. Each objection steelmanned before challenged. Resolution condition specified." },
    { id: "synthesizer", temp: "T = 0.0 · deterministic", output: "Preliminary evidence integration. Not a finding — a structured summary of Phase 1 evidence nodes and their confidence grades. Cannot exceed Methodologist bounds. Carries forward to Phase 2." },
  ],
  panelTitle: "Phase 1 structured outputs",
  panelItems: [
    { label: "Evidence nodes registry", text: "Each node: source, weight, known limitations, verification_status, and Methodologist-assigned confidence bound. This registry is the authoritative evidence record for the entire session." },
    { label: "Knowledge gap register", text: "Named gaps where evidence is insufficient. Gap is a first-class output — not a failure state. It tells you what isn't knowable from the current evidence base." },
    { label: "Contrarian objection set", text: "Phase 1 landscape objections with resolution conditions and strength grades. Resolved objections amend the terrain classification. Unresolved carry to Phase 2." },
    { label: "Guardian flag registry", text: "All SVS verification outcomes and integrity flags raised during Phase 1. Written to the session audit trail. Cannot be amended by research agents." },
  ],
  carriesForward: [
    "Evidence nodes registry with confidence bounds as Methodologist-issued constraints",
    "Unresolved Contrarian objections from the landscape challenge",
    "Knowledge gap register — gaps may be expanded but not silently removed",
    "Synthesizer's preliminary evidence integration — Phase 2 builds from this, not around it",
  ],
};

const PHASE_2: PhaseData = {
  numLabel: "Deliberation",
  title: (
    <>
      <em className="text-rust not-italic italic">Apply</em> adversarial pressure.
    </>
  ),
  subtitle:
    "Phase 2 challenges the evidence base directly. The Cartographer updates the landscape with new evidence or scope refinements. The Methodologist reassesses challenged nodes and grades any new evidence. The Contrarian re-engages against the evidence base itself — not the landscape — and must steelman every claim before challenging it. Each objection must specify a resolution condition and strength grade.",
  dark: true,
  rows: [
    { id: "cartographer", temp: "T = 0.8", output: "Updated evidence terrain incorporating Phase 1 Contrarian resolutions and any new evidence admitted under REAP. No evidence can be silently removed — only reclassified with reason." },
    { id: "methodologist", temp: "T = 0.5", output: "Reassessment of any evidence nodes that were challenged in Phase 1. Issues [GRADE CHALLENGE] flags where a preliminary Synthesizer claim exceeds its evidentiary warrant. Synthesizer must revise before proceeding." },
    { id: "guardian", temp: "T = 0.1 · phase boundary", output: "SVS authentication of any new evidence nodes admitted in Phase 2. Phase 2 → Phase 3 transition authorised or blocked." },
    { id: "contrarian", temp: "T = 1.0 · max variation", output: "Challenges to the evidence base — methodology critiques, sample limitations, generalizability problems. Each objection: steelman → challenge → resolution condition → strength grade (Strong / Moderate / Speculative)." },
    { id: "synthesizer", temp: "T = 0.0 · deterministic", output: "Updated evidence integration incorporating Phase 2 revisions. Produces an Evidence Landscape summary with per-claim confidence grades. If issued a [GRADE CHALLENGE], must revise before Phase 3 can proceed." },
  ],
  panelTitle: "Phase 2 structured outputs",
  panelItems: [
    { label: "Revised evidence nodes registry", text: "Updated confidence bounds reflecting Phase 2 reassessment. Any downgrade must reference the Contrarian objection or Methodologist flag that triggered it." },
    { label: "Objection registry — Phase 2", text: "All Phase 2 Contrarian objections with resolution status. Strong objections unresolved at this stage carry forward to Phase 3 verbatim — they cannot be softened in transit." },
    { label: "Synthesizer evidence landscape", text: "Per-claim confidence grades after Phase 2 deliberation. This is the evidentiary ceiling the Synthesizer must respect in Phase 3 — it cannot self-upgrade grades in the final synthesis." },
    { label: "Grade challenge record", text: "Any [GRADE CHALLENGE] flags issued by the Methodologist and the Synthesizer's revision response. Both are written to the session audit trail." },
  ],
  carriesForward: [
    "Final evidence nodes registry — Synthesizer must anchor exclusively to this, not the discourse thread",
    "All unresolved Strong objections — surface verbatim in final output, no softening permitted",
    "Synthesizer evidence landscape — per-claim grades as hard ceiling on final synthesis",
  ],
};

const PHASE_3: PhaseData = {
  numLabel: "Synthesis",
  title: (
    <>
      <em className="text-rust not-italic italic">Produce</em> the finding.
    </>
  ),
  subtitle:
    "Phase 3 locks the deliberation into a final finding. The Synthesizer anchors exclusively to the evidence nodes registry — not the discourse thread. Temperature is locked at 0.0 for deterministic output. The Contrarian challenges the Synthesizer's draft directly. The Pragmatist converts the finding into actionable output, inheriting the Synthesizer's confidence ceiling as an absolute constraint.",
  rows: [
    { id: "guardian", temp: "T = 0.1 · final integrity", output: "Final SVS check on any outstanding pending verifications. Financial advice framing check on Synthesizer draft. Phase 3 → delivery transition authorised or halted." },
    { id: "contrarian", temp: "T = 1.0", output: "Challenges to the Synthesizer's draft finding — scope overreach, claim-evidence mismatch, anticipated objections from external reviewers. Critical pre-submission objections force a revision loop before Pragmatist dispatch." },
    { id: "synthesizer", temp: "T = 0.0 · locked", output: "Evidence-anchored finding at temperature zero. Three inviolable constraints: (1) conclusion cannot exceed evidence confidence · (2) Insufficient Evidence cannot become directional · (3) financial advice framing forbidden. Plus 2–5 structured reopen conditions." },
    { id: "pragmatist", temp: "T = 0.3 · Phase 3 only", output: "Converts the finding into context-specific actionable output. Inherits the Synthesizer's confidence ceiling as an absolute constraint — cannot recommend more confidently than the synthesis permits. Does not fire in Phase 1 or 2." },
  ],
  panelTitle: "Phase 3 final delivery package",
  panelItems: [
    { label: "Evidence-anchored finding", text: "The calibrated conclusion with confidence grade, anchored to the evidence nodes registry. The same question with the same evidence base must produce the same finding — the Verdict Invariance Requirement." },
    { label: "Unresolved objections · verbatim", text: "All unresolved Strong Contrarian objections surface verbatim. Not summarized. Not softened. Exactly as the Contrarian issued them, with resolution conditions intact." },
    { label: "Reopen conditions · 2–5 required", text: "Structured verdict fragility outputs. Each specifies: a specific observable trigger event · likelihood assessment · the claim whose grade would change · direction of change. General uncertainty not permitted." },
    { label: "Actionable next steps", text: "The Pragmatist's context-specific recommendations, bounded by the Synthesizer's confidence ceiling. Includes follow-on session proposals for unresolved knowledge gaps." },
    { label: "Full audit trail", text: "Complete Guardian flag registry, SVS verification record, grade challenge history, and confidence propagation trace — exportable at session close." },
  ],
};

function PhaseSection({ phase }: { phase: PhaseData }) {
  const dark = !!phase.dark;
  return (
    <div className={`border-b border-border ${dark ? "border-border-dark bg-ink" : ""}`}>
      <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-24 lg:px-[72px]">
        <div className="mb-12 grid grid-cols-[auto_1fr] items-start gap-6 md:mb-14 md:gap-8">
          <div className="min-w-[100px] flex-shrink-0 rounded-md bg-rust px-4 py-4 text-center md:px-5">
            <div className="mb-1 font-mono text-[10px] tracking-[0.08em] text-offwhite/70 uppercase">Phase</div>
            <div className="font-serif text-xl text-offwhite">{phase.numLabel}</div>
          </div>
          <div>
            <h2 className={`mb-3 font-serif text-[32px] leading-[1.1] md:text-[44px] ${dark ? "text-offwhite" : "text-ink"}`}>
              {phase.title}
            </h2>
            <p className={`max-w-2xl text-base leading-[1.8] md:text-lg ${dark ? "text-faint" : "text-body"}`}>
              {phase.subtitle}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <div className={`overflow-hidden rounded-lg border ${dark ? "border-border-dark" : "border-border"}`}>
            {phase.rows.map((row, i) => {
              const a = agent(row.id);
              return (
                <div
                  key={row.id}
                  className={`grid grid-cols-1 sm:grid-cols-[140px_1fr] ${
                    i < phase.rows.length - 1 ? `border-b ${dark ? "border-border-dark" : "border-border"}` : ""
                  }`}
                >
                  <div className={`border-b p-4 sm:border-r sm:border-b-0 ${dark ? "border-border-dark bg-ink-2" : "border-border bg-paper"}`}>
                    <div className={`mb-1 text-[13px] font-medium ${row.id === "guardian" ? "text-rust" : dark ? "text-offwhite" : "text-ink"}`}>
                      {a.name}
                    </div>
                    <div className="font-mono text-[10px] text-subtle">{row.temp}</div>
                  </div>
                  <div className="p-4">
                    <div className="mb-1 font-mono text-[10px] tracking-[0.06em] text-subtle uppercase">Output</div>
                    <p className={`text-xs leading-relaxed ${dark ? "text-faint" : "text-body"}`}>{row.output}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <div className={`overflow-hidden rounded-lg border ${dark ? "border-border-dark bg-ink-2" : "border-border bg-paper"}`}>
              <div className={`border-b px-5 py-3.5 ${dark ? "border-border-dark bg-ink" : "border-border bg-paper-alt"}`}>
                <span className="font-mono text-[10px] tracking-[0.08em] text-subtle uppercase">{phase.panelTitle}</span>
              </div>
              {phase.panelItems.map((item, i) => (
                <div
                  key={item.label}
                  className={`px-5 py-3.5 ${i < phase.panelItems.length - 1 ? `border-b ${dark ? "border-border-dark" : "border-border"}` : ""}`}
                >
                  <div className="mb-1 font-mono text-[10px] tracking-[0.06em] text-rust uppercase">{item.label}</div>
                  <p className={`text-[13px] leading-relaxed ${dark ? "text-faint" : "text-body"}`}>{item.text}</p>
                </div>
              ))}
            </div>
            {phase.carriesForward && (
              <div className={`mt-5 rounded-md p-4 ${dark ? "border border-border-dark bg-ink-2" : "bg-ink"}`}>
                <div className="mb-2.5 font-mono text-[10px] tracking-[0.06em] text-rust uppercase">Carries forward</div>
                <div className="flex flex-col gap-2">
                  {phase.carriesForward.map((cf) => (
                    <div key={cf} className="flex items-start gap-2.5">
                      <span className="mt-px flex-shrink-0 font-mono text-[11px] text-rust">→</span>
                      <span className="text-xs leading-relaxed text-faint">{cf}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const CHAIN = [
  {
    agent: "Methodologist",
    role: "Issues confidence bounds",
    desc: "Established / Probable / Contested / Gap — per evidence node, based on four-dimension validity assessment.",
    constraint: "Hard upper limit — Synthesizer cannot exceed the minimum bound across all supporting nodes for any single claim",
  },
  {
    agent: "Synthesizer",
    role: "Inherits as hard ceiling",
    desc: "Anchors conclusion to evidence nodes registry at T = 0.0. Cannot self-upgrade confidence grades. Revision loop fires on any violation.",
    constraint: "Hard upper limit — Pragmatist cannot produce recommendations more confident than the Synthesizer's conclusion grade",
  },
  {
    agent: "Pragmatist",
    role: "Inherits as absolute constraint",
    desc: "Converts finding to actionable output within the inherited confidence ceiling. Cannot recommend more confidently than permitted by the chain above.",
    constraint: "Gap-graded findings cannot be converted to any directional recommendation — the Pragmatist must surface the gap, not work around it",
  },
];

const DEPTHS = [
  {
    badge: "Rapid",
    name: "Single round",
    tagline: "Preliminary confidence-bounded finding",
    desc: "Cartographer and Synthesizer only. No Guardian. No Contrarian adversarial pressure. Produces a preliminary confidence-bounded finding without the full deliberative structure. Useful for initial question orientation or time-constrained situations.",
    specs: [
      { label: "Agents", val: "Topic Architect · Cartographer · Synthesizer" },
      { label: "Guardian", val: "Not active" },
      { label: "Contrarian", val: "Not active" },
      { label: "Phases", val: "Single round" },
    ],
    output: "Output: Preliminary finding with confidence bound. No unresolved objection record. No audit trail.",
    recommended: false,
  },
  {
    badge: "Standard · recommended",
    name: "Three full rounds",
    tagline: "Complete multi-agent deliberation",
    desc: "Complete multi-agent ensemble across all three phases. Guardian active at every phase boundary. Full Contrarian objection register. Recommended for any substantive research question where the cost of a wrong answer is material.",
    specs: [
      { label: "Agents", val: "All agents" },
      { label: "Guardian", val: "Active at all phase boundaries" },
      { label: "Contrarian", val: "Active all three phases" },
      { label: "Phases", val: "Exploration · Deliberation · Synthesis" },
    ],
    output:
      "Output: Evidence-anchored finding · confidence grade · unresolved objections verbatim · reopen conditions · actionable next steps · full audit trail.",
    recommended: true,
  },
  {
    badge: "Deep",
    name: "Three rounds + expert",
    tagline: "Asynchronous domain expert interjection",
    desc: "Standard deliberation plus an asynchronous domain expert review at the Phase 1 / Phase 2 boundary. The expert's contribution is evaluated by the Guardian before integration — it enters the deliberation as authenticated evidence, not unverified context.",
    specs: [
      { label: "Agents", val: "All agents" },
      { label: "Expert", val: "Domain expert at Phase 1/2 boundary" },
      { label: "Guardian", val: "Evaluates expert contribution before integration" },
      { label: "Flagship", val: "Contrarian on Opus tier for maximum adversarial pressure" },
    ],
    output: "Output: Same as Standard plus authenticated expert contribution in evidence record. Deepest adversarial pressure available.",
    recommended: false,
  },
];

const VLOG_PHASES = [
  {
    label: "Phase 1 · Exploration",
    events: [
      { agent: "Cartographer", text: '4 items Settled Ground · 4 items Contested. "Weight regain follows discontinuation" → Settled.' },
      { agent: "Methodologist", text: "Session evidence ceiling issued: no claim may be graded Established. All nodes Moderate or below." },
      {
        agent: "Contrarian",
        text: '"Weight regain follows discontinuation" assignment challenged — regain is well-documented, but its completeness varies and ≤2yr evidence cannot foreclose the maintenance question.',
        flag: "Strong",
        flagCls: "bg-conf-contested-bg text-conf-contested-text",
        after: "Resolved: moved to Contested.",
      },
    ],
  },
  {
    label: "Phase 2 · Deliberation",
    events: [
      { agent: "Methodologist", text: "Replication cap on lifestyle-alone maintenance claim.", flag: "[GRADE CHALLENGE]", flagCls: "bg-paper-alt text-body" },
      {
        agent: "Synthesizer",
        text: "Evidence landscape: partial regain within 1yr (Probable) · universal full regain (Contested) · lifestyle-alone maintenance (Contested) · maintenance dosing preserves loss (Probable) · tapering mitigates regain (Contested).",
      },
      {
        agent: "Contrarian",
        text: "Durability of off-drug maintenance beyond 2 years.",
        flag: "Moderate",
        flagCls: "bg-conf-med-bg text-conf-med-text",
        after: "Unresolved → carries to Phase 3.",
      },
    ],
  },
  {
    label: "Phase 3 · Synthesis",
    events: [
      { agent: "Contrarian", text: "Follow-up gap — all primary nodes limited to ≤104 weeks.", flag: "Moderate", flagCls: "bg-conf-med-bg text-conf-med-text" },
      {
        agent: "Methodologist",
        text: "Split required: Short-term regain ≤1yr (Probable) · Long-term >2yr maintenance (Gap).",
        flag: "[GRADE CHALLENGE]",
        flagCls: "bg-paper-alt text-body",
      },
      { agent: "Pragmatist", text: "Directional recommendation declined for Gap-graded long-term finding. Gap surfaced as knowledge gap output." },
    ],
  },
];

const SUBPAGES = [
  {
    eyebrow: "Guardian integrity system",
    title: "How the Guardian works",
    body: "SVS mechanics, flag classification, halt authority, domain integrity modes, and the reasoning behind hidden model identity.",
    href: "/how-it-works/guardian",
  },
  {
    eyebrow: "Agents + roles",
    title: "All agents in detail",
    body: "Full specifications — model assignment, temperature rationale, permitted actions, forbidden actions, and dispatch order logic.",
    href: "/how-it-works/agents",
  },
  {
    eyebrow: "Confidence + dissent scoring",
    title: "How findings are graded",
    body: "The four confidence grades, how the Methodologist issues them as hard constraints, and how Contrarian objections are classified and preserved.",
    href: "/how-it-works/scoring",
  },
];

export default function PhasesPage() {
  return (
    <>
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "How it works", href: "/how-it-works" }, { label: "Phase architecture" }]}
      />

      {/* HERO */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-20 lg:px-[72px] lg:py-24">
          <div className={eyebrow}>Phase architecture</div>
          <h1 className="mb-6 max-w-4xl font-serif text-[42px] font-normal leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[64px]">
            Three phases.
            <br />
            Each one constrains
            <br />
            the <em className="text-rust not-italic italic">next.</em>
          </h1>
          <p className="mb-10 max-w-2xl text-lg leading-[1.8] text-body">
            Augle&apos;s three deliberation phases — Exploration, Deliberation, and Synthesis —
            don&apos;t run in parallel. Each phase produces a structured output that the next phase is
            required to respect. The Methodologist&apos;s confidence bounds from Phase 1 become hard
            limits on the Synthesizer in Phase 3. The Contrarian&apos;s unresolved objections from
            Phase 2 surface verbatim in the final finding. Nothing is softened in transit.
          </p>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <div key={p.label} className="bg-paper p-5">
                <div className="mb-2 font-mono text-[10px] tracking-[0.08em] text-rust uppercase">{p.label}</div>
                <p className="text-sm leading-relaxed text-body">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DISPATCH FLOW */}
      <div className="border-t border-border bg-ink py-10 md:py-16">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-[72px]">
          <div className={eyebrow}>Fixed dispatch order</div>
          <h2 className="mb-10 font-serif text-3xl text-offwhite">Every phase. The same sequence.</h2>
          <div className="overflow-x-auto rounded-lg border border-border-dark">
            <div className="flex min-w-[900px] items-stretch">
              {DISPATCH_FLOW.map((d) => {
                const a = agent(d.id);
                return (
                  <div
                    key={d.id}
                    className={`flex-1 border-r border-border-dark p-5 last:border-r-0 ${d.id === "guardian" ? "border-t-2 border-t-rust" : ""}`}
                  >
                    <div className={`mb-1 text-xs leading-tight font-medium ${d.rust ? "text-rust" : "text-offwhite"}`}>
                      {a.name}
                    </div>
                    <div className="mb-2 font-mono text-[10px] tracking-[0.04em] text-faint uppercase">{d.phase}</div>
                    <div className="text-[11px] leading-relaxed text-faint">{d.out}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <PhaseSection phase={PHASE_1} />
      <PhaseSection phase={PHASE_2} />
      <PhaseSection phase={PHASE_3} />

      {/* CONSTRAINT PROPAGATION */}
      <div className="border-b border-border py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-[72px]">
          <div className={eyebrow}>Unidirectional confidence propagation</div>
          <h2 className={`${sectionTitle} mb-4`}>
            Confidence flows
            <br />
            one direction only.
          </h2>
          <p className="mb-12 max-w-2xl text-lg leading-[1.85] text-body">
            The formal constraint: the Synthesizer&apos;s conclusion grade cannot exceed the minimum
            confidence bound of the evidence nodes supporting it. The Pragmatist&apos;s recommendation
            confidence cannot exceed the Synthesizer&apos;s. These are hard architectural constraints —
            not guidelines. Violations trigger a mandatory revision loop.
          </p>
          <div className="mb-8 overflow-x-auto">
            <div className="flex min-w-[720px] items-stretch">
              {CHAIN.map((c, i) => (
                <div key={c.agent} className="flex flex-1 items-stretch">
                  <div className="flex-1 border border-border bg-paper p-6">
                    <span className="mb-2 block font-mono text-[10px] tracking-[0.06em] text-rust uppercase">{c.agent}</span>
                    <div className="mb-2 text-sm font-medium text-ink">{c.role}</div>
                    <p className="mb-2 text-[13px] leading-relaxed text-muted">{c.desc}</p>
                    <div className="mt-2 rounded border-l-2 border-rust bg-paper-alt px-3 py-2.5 text-xs leading-relaxed text-muted">
                      {c.constraint}
                    </div>
                  </div>
                  {i < CHAIN.length - 1 && (
                    <div className="flex flex-shrink-0 items-center border-y border-border bg-paper-alt px-2">
                      <span className="text-lg text-rust">→</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 items-center gap-6 rounded-lg bg-ink p-7 sm:grid-cols-[1fr_auto] sm:p-8">
            <div>
              <div className="mb-2 font-serif text-2xl text-offwhite">The Grade Challenge mechanism</div>
              <p className="text-sm leading-relaxed text-faint">
                When the Methodologist detects that a preliminary Synthesizer claim exceeds its
                evidentiary warrant — where the Synthesizer has graded a claim higher than the minimum
                confidence bound of the supporting evidence nodes — it issues a [GRADE CHALLENGE] flag.
                The Synthesizer must revise the claim downward before Phase 3 can proceed. The challenge
                and the revision are both written to the audit trail. This loop repeats until no Grade
                Challenge violations remain or a maximum iteration count is reached.
              </p>
            </div>
            <span className="flex-shrink-0 rounded border border-rust bg-svs-flagged-bg px-3.5 py-2 font-mono text-[11px] whitespace-nowrap text-rust">
              [GRADE CHALLENGE]
            </span>
          </div>
        </div>
      </div>

      {/* SESSION DEPTHS */}
      <div className="border-b border-border bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-[72px]">
          <div className={eyebrow}>Session depth tiers</div>
          <h2 className={`${sectionTitle} mb-4`}>
            Three depths.
            <br />
            One architecture.
          </h2>
          <p className="mb-12 max-w-2xl text-lg leading-[1.85] text-body">
            The phase architecture is constant across all depth tiers. What changes is the number of
            rounds within each phase and whether the Guardian is active. The Rapid tier is a
            single-round preview — useful for quick orientation. Standard and Deep are for substantive
            research.
          </p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {DEPTHS.map((d) => (
              <div
                key={d.badge}
                className={`overflow-hidden rounded-lg border bg-cream ${d.recommended ? "border-rust" : "border-border"}`}
              >
                <div className="border-b border-border p-5">
                  <span className={`mb-2 block font-mono text-[10px] tracking-[0.06em] uppercase ${d.recommended ? "text-rust" : "text-subtle"}`}>
                    {d.badge}
                  </span>
                  <div className="mb-1 font-serif text-xl text-ink">{d.name}</div>
                  <div className="text-[13px] text-muted italic">{d.tagline}</div>
                </div>
                <div className="border-b border-border p-5">
                  <p className="mb-4 text-[13px] leading-relaxed text-body">{d.desc}</p>
                  <div className="flex flex-col gap-2">
                    {d.specs.map((s) => (
                      <div key={s.label} className="flex gap-3">
                        <span className="w-[72px] flex-shrink-0 pt-px font-mono text-[10px] tracking-[0.05em] text-subtle uppercase">
                          {s.label}
                        </span>
                        <span className="text-xs leading-snug text-body">{s.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-xs leading-relaxed text-muted">{d.output}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* VALIDATION RUN */}
      <div className="border-b border-border py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-[72px]">
          <div className={eyebrow}>Worked example</div>
          <h2 className={`${sectionTitle} mb-10`}>
            What the architecture
            <br />
            looks like in practice.
          </h2>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="flex flex-col gap-4 text-[15px] leading-relaxed text-body">
              <p>
                The following is a condensed record from an illustrative Standard-depth Letters &amp;
                Science session.
              </p>
              <p>
                The session demonstrates all five architectural properties: the Contrarian&apos;s Strong
                objection successfully amended a Settled Ground assignment; the Methodologist&apos;s
                evidence ceiling propagated correctly across all phases; the Grade Challenge mechanism
                functioned as specified; the Pragmatist correctly declined to produce a directional
                recommendation for the Gap-graded claim; and the unresolved Moderate objection surfaced
                verbatim in final delivery.
              </p>
              <p className="font-mono text-[13px] text-subtle">
                Research question: Does the current evidence base support long-term weight maintenance
                without continued GLP-1 dosing?
                <br />
                <br />
                Depth: Standard · Mode: Letters &amp; Science · Guardian: Active
              </p>
              <Link href="/research" className="text-sm font-medium text-rust">
                Illustrative session · representative of session structure
              </Link>
            </div>
            <div className="rounded-lg bg-ink p-6">
              <div className="mb-4.5 font-mono text-[10px] tracking-[0.08em] text-rust uppercase">
                Session log · condensed
              </div>
              <div className="flex flex-col">
                {VLOG_PHASES.map((vp, i) => (
                  <div key={vp.label} className={`py-3 ${i < VLOG_PHASES.length - 1 ? "border-b border-border-dark" : ""}`}>
                    <div className="mb-2 font-mono text-[10px] text-rust uppercase">{vp.label}</div>
                    {vp.events.map((ev, j) => (
                      <div key={j} className="mb-1.5 flex items-start gap-2 last:mb-0">
                        <span className="min-w-[80px] flex-shrink-0 pt-px font-mono text-[10px] text-faint">{ev.agent}</span>
                        <span className="text-[11px] leading-relaxed text-[#D4CFC6]">
                          {ev.text}
                          {ev.flag && (
                            <span className={`ml-1 rounded px-1.5 py-px font-mono text-[10px] whitespace-nowrap ${ev.flagCls}`}>
                              {ev.flag}
                            </span>
                          )}
                          {ev.after && <> {ev.after}</>}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SUBPAGES */}
      <div className="border-b border-border py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-[72px]">
          <div className={eyebrow}>How it works</div>
          <h2 className={`${sectionTitle} mb-9`}>Continue reading.</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {SUBPAGES.map((sp) => (
              <Link
                key={sp.href}
                href={sp.href}
                className="block rounded-lg border border-border bg-paper p-6 transition-colors hover:border-rust"
              >
                <div className="mb-2.5 font-mono text-[10px] tracking-[0.06em] text-rust uppercase">{sp.eyebrow}</div>
                <div className="mb-2 font-serif text-lg text-ink">{sp.title}</div>
                <p className="mb-3.5 text-[13px] leading-relaxed text-muted">{sp.body}</p>
                <span className="text-xs font-medium text-rust">Read more →</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <CtaBanner
        title={
          <>
            Three phases.
            <br />
            One calibrated finding.
          </>
        }
        body="Join waitlist and run a Standard-depth session on a question that matters to your work."
        secondaryLabel="How it works"
        secondaryHref="/how-it-works"
      />
    </>
  );
}

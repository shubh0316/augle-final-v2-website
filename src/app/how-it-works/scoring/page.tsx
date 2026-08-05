import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CtaBanner } from "@/components/CtaBanner";
import { eyebrow, sectionTitle } from "@/lib/styles";

export const metadata: Metadata = {
  title: "How AI Confidence Grades Work | Augle Scoring Methodology",
  description:
    "Augle's four confidence grades — Established, Probable, Contested, Gap — and the Grade Challenge mechanism that prevents overconfident findings.",
};

const GRADE_PREVIEW = [
  { label: "Established", cls: "bg-svs-verified-bg text-svs-verified", desc: "Multiple independent replications. Contrarian challenge required to downgrade." },
  { label: "Probable", cls: "bg-ink-3 text-subtle", desc: "Best available evidence supports. Replication is limited." },
  { label: "Contested", cls: "bg-ink-3 text-faint", desc: "Active dispute or unresolved Strong objection. Cannot grade higher." },
  { label: "Gap", cls: "bg-svs-flagged-bg text-rust", desc: "Evidence insufficient. Named explicitly. Cannot become a recommendation." },
];

const GRADES = [
  {
    badge: "Established",
    badgeCls: "bg-conf-high-bg text-conf-high-text",
    num: "Grade 1 of 4 · highest",
    title: "Multiple independent replications at Moderate or better across distinct methodological contexts.",
    body: "The highest confidence grade. Requires replication across independent studies using distinct methodologies — convergence from a single research group or a single methodology does not qualify. The Contrarian is required to issue a formal objection with a resolution condition to trigger a downgrade from Established.",
    detailLabel: "What it requires for downgrade",
    detail: "An Unresolved Strong Contrarian objection with a specified resolution condition. The Methodologist reassesses and may downgrade to Probable or Contested if the objection identifies a previously unconsidered validity gap. Downgrade is not automatic — it requires a valid methodological challenge.",
    constraint: "Synthesizer may use unqualified assertive claim language for Established-grade nodes",
    barCls: "bg-conf-high-bg text-conf-high-text",
  },
  {
    badge: "Probable",
    badgeCls: "bg-paper-alt text-body",
    num: "Grade 2 of 4",
    title: "At least one Moderate-confidence study, or multiple Weak-confidence studies converging. Replication is limited.",
    body: "The most common ceiling in real-world research sessions. Best available evidence supports the claim, but the evidentiary base has limitations — sample size, methodology constraints, limited replication across contexts, or recency. The Synthesizer may assert moderate confidence but cannot use language implying certainty.",
    detailLabel: "Common causes of Probable assignment",
    detail: "Single-study support with sound methodology. Multiple converging studies with methodological variation but no independent replication. Strong evidence base with an external validity constraint identified by the Methodologist. The majority of evidence nodes in substantive research sessions carry Probable grades.",
    constraint: "Synthesizer must include hedging language — cannot assert with certainty on Probable-grade nodes",
    barCls: "bg-paper-alt text-body",
  },
  {
    badge: "Contested",
    badgeCls: "bg-conf-med-bg text-conf-med-text",
    num: "Grade 3 of 4",
    title: "Active dispute exists, methods are weak, or an Unresolved Strong Contrarian objection applies. Cannot grade higher regardless of discourse content.",
    body: "The Contested grade reflects genuine evidential uncertainty — either because the literature itself is split, the methodology is materially weak, or the Contrarian has raised an objection so strong that it cannot be resolved within the current evidence base. Once Contested, the Synthesizer cannot produce a directional finding on that node.",
    detailLabel: "Why Contested is a complete finding, not a failure",
    detail: "A Contested finding tells you precisely where the limits of the evidence are. It names the dispute, preserves the competing positions, and surfaces the resolution condition that would move the grade. This is more useful than a confident wrong answer — and more honest about what the evidence actually supports.",
    constraint: "Synthesizer must present alternative positions — cannot produce a directional claim on Contested nodes",
    barCls: "bg-conf-med-bg text-conf-med-text",
  },
  {
    badge: "Gap",
    badgeCls: "bg-conf-contested-bg text-conf-contested-text",
    num: "Grade 4 of 4 · Insufficient Evidence",
    title: "Evidence is insufficient to evaluate the claim. Named explicitly. Cannot be converted to a directional recommendation by any downstream agent.",
    body: "The Gap grade is not a failure state — it is a first-class output. It tells you what isn't knowable from the current evidence base. A finding that the evidence doesn't exist is valuable information. The Pragmatist is architecturally forbidden from converting a Gap-graded finding into any directional recommendation. Instead, it produces a follow-on session proposal.",
    detailLabel: "What a Gap finding produces",
    detail: "Named knowledge gap entered into the session Ledger with the specific evidence that would be required to resolve it. A structured follow-on session proposal from the Pragmatist specifying the research question that would fill the gap. The gap record is exported as part of the full session audit trail.",
    constraint: "Pragmatist is forbidden from producing any directional recommendation — must generate a follow-on session proposal",
    barCls: "bg-conf-contested-bg text-conf-contested-text",
  },
];

const PROP_CHAIN = [
  {
    agent: "Methodologist",
    role: "Issues confidence bounds",
    action: "Evaluates each evidence node across four dimensions and issues a grade — Established, Probable, Contested, or Gap — as a hard upper constraint. Also issues [GRADE CHALLENGE] flags when the Synthesizer violates the constraint.",
    constraintLabel: "Constraint issued",
    constraint: "C_M(eᵢ) = grade for node eᵢ · Hard ceiling for all downstream agents",
  },
  {
    agent: "Synthesizer",
    role: "Inherits as hard ceiling",
    action: "For each claim k supported by evidence nodes Eₖ, the Synthesizer's grade cannot exceed the minimum Methodologist grade across all supporting nodes. Operates at T=0.0 — deterministic. Any violation triggers a mandatory [GRADE CHALLENGE] revision loop.",
    constraintLabel: "Constraint enforced",
    constraint: "C_S(k) ≤ min{ C_M(eᵢ) : eᵢ ∈ Eₖ } · Revision loop fires on violation",
  },
  {
    agent: "Pragmatist",
    role: "Inherits Synthesizer ceiling",
    action: "The Pragmatist's recommendation confidence cannot exceed the Synthesizer's conclusion grade. Gap-graded findings cannot become directional recommendations under any circumstances. Fires in Phase 3 only — after Guardian clearance.",
    constraintLabel: "Constraint enforced",
    constraint: "C_P ≤ C_S(k*) · Gap → follow-on session, not recommendation",
  },
];

const CHALLENGE_STEPS = [
  { text: "Synthesizer produces a preliminary evidence landscape with claim grades in Phase 1 or Phase 2" },
  { bold: "Methodologist evaluates", text: " each claim grade against the minimum confidence bound of its supporting evidence nodes" },
  { text: "Violation detected — Synthesizer has graded a claim above the Methodologist's ceiling.", badge: "[GRADE CHALLENGE]", badgeCls: "bg-paper-alt text-body", after: "flag issued at Moderate severity" },
  { bold: "Topic Architect halts dispatch", text: " of Contrarian, Guardian, and all subsequent agents. Session cannot advance." },
  { text: "Synthesizer produces a revised output with the claim grade corrected to comply with Constraint 1" },
  { text: "Methodologist re-evaluates. If compliant:", badge: "Resolved", badgeCls: "bg-conf-high-bg text-conf-high-text", after: "Dispatch resumes. Both challenge and revision written to audit trail." },
  { text: "If max iterations reached without compliance: remaining violations surfaced to user as", badge: "Blocking items", badgeCls: "bg-conf-contested-bg text-conf-contested-text" },
];

const OBJECTIONS = [
  {
    name: "Strong objection",
    grade: "Strong",
    gradeCls: "bg-conf-contested-bg text-conf-contested-text",
    body: "The most consequential objection grade. Issued when the Contrarian identifies a fundamental methodological flaw, a construct validity problem, or an evidentiary gap that materially undermines a claim. A Strong objection that remains unresolved at Phase 3 forces the Synthesizer to reflect it in the confidence grade — the affected node cannot stay at Established or Probable if a Strong objection is unresolved.",
    consequence: "Unresolved at Phase 3 → surfaces verbatim in final output · affected node grade reviewed · may trigger Contested assignment",
  },
  {
    name: "Moderate objection",
    grade: "Moderate",
    gradeCls: "bg-conf-med-bg text-conf-med-text",
    body: "Issued when the Contrarian identifies a real concern — a replication limitation, an external validity constraint, or a methodology-claim mismatch — that is material but does not fundamentally invalidate the claim. Moderate objections that are unresolved at Phase 3 surface in the final output alongside the finding, with their resolution conditions intact.",
    consequence: "Unresolved at Phase 3 → surfaces in output alongside finding · resolution condition preserved · does not force grade revision",
  },
  {
    name: "Speculative objection",
    grade: "Speculative",
    gradeCls: "bg-paper-alt text-muted",
    body: "Issued when the Contrarian identifies a concern that is plausible but not directly supported by evidence in the current session. Speculative objections are logged and included in the session audit trail, but do not affect confidence grades and do not surface in the main finding output.",
    consequence: "Logged in session audit trail · does not surface in main output · does not affect confidence grades",
  },
];

const DISSENT_LIVE = [
  {
    mention: "@Contrarian → @Cartographer · Phase 1",
    strength: "Strong · Unresolved",
    cls: "bg-conf-contested-bg text-conf-contested-text",
    text: '"The assignment of \'weight regain follows discontinuation\' to Settled Ground overstates the case: while regain after discontinuation is well-documented, its completeness varies between individuals, and the ≤2-year evidence cannot establish whether structured tapering or lifestyle transition sustains any of the loss."',
    resolution: "Resolution: Move to Contested Terrain · reframe magnitude/durability claim",
  },
  {
    mention: "@Contrarian → @Methodologist · Phase 2",
    strength: "Moderate · Resolved",
    cls: "bg-conf-high-bg text-conf-high-text",
    text: '"The lifestyle-alone maintenance evidence rests on a single trial paradigm across all studies — convergence without independent methodological variation."',
    resolution: "Resolved: Replication Cap applied · grade adjusted to Probable",
  },
  {
    mention: "@Contrarian → @Synthesizer · Phase 3",
    strength: "Moderate · Unresolved",
    cls: "bg-conf-med-bg text-conf-med-text",
    text: '"Follow-up gap — all primary evidence nodes are limited to ≤104 weeks. Long-term (>2yr) off-drug maintenance cannot be inferred from current trials."',
    resolution: "Resolution: Independent ≥3-year RCT with a structured tapering arm",
  },
  {
    mention: "@Methodologist · Phase 3",
    strength: "[GRADE CHALLENGE]",
    cls: "bg-paper-alt text-body",
    text: "Long-term off-drug maintenance claim graded Probable by Synthesizer — no controlled evidence beyond ~2 years. Claim split required.",
    resolution: "Outcome: Short-term regain (≤1yr) → Probable · Long-term (>2yr) maintenance → Gap",
  },
];

const VLOG_PHASES = [
  {
    label: "Phase 1 · Exploration",
    events: [
      { agent: "Methodologist", text: "Session ceiling set: no node may be graded Established. All evidence Moderate-confidence or below." },
      { agent: "Contrarian", text: '"Weight regain follows discontinuation" → Settled Ground challenged.', flag: "Strong", flagCls: "bg-conf-contested-bg text-conf-contested-text", after: "Regain not universal · ≤2yr data." },
      { agent: "Synthesizer", text: 'Revised terrain: "weight regain follows discontinuation" moved to Contested Terrain.', flag: "Resolved", flagCls: "bg-conf-high-bg text-conf-high-text" },
    ],
  },
  {
    label: "Phase 2 · Deliberation",
    events: [
      { agent: "Methodologist", text: "Replication Cap on lifestyle-alone maintenance — convergence without methodological independence." },
      { agent: "Synthesizer", text: "Evidence landscape: partial regain within 1yr (Probable) · universal full regain (Contested) · lifestyle-alone maintenance (Contested) · maintenance dosing preserves loss (Probable) · tapering mitigates regain (Contested)" },
      { agent: "Contrarian", text: "Durability of off-drug maintenance beyond 2 years.", flag: "Moderate", flagCls: "bg-conf-med-bg text-conf-med-text", after: "Carries to Phase 3." },
    ],
  },
  {
    label: "Phase 3 · Synthesis",
    events: [
      { agent: "Contrarian", text: "Follow-up gap — all nodes limited to ≤104 weeks.", flag: "Moderate · Unresolved", flagCls: "bg-conf-med-bg text-conf-med-text" },
      { agent: "Methodologist", text: "Long-term maintenance claim graded above evidence ceiling.", flag: "[GRADE CHALLENGE]", flagCls: "bg-paper-alt text-body" },
      { agent: "Synthesizer", text: "Split: Short-term regain (≤1yr) → Probable · Long-term (>2yr) maintenance → Gap (no controlled evidence beyond ~2 years).", flag: "Compliant", flagCls: "bg-conf-high-bg text-conf-high-text" },
      { agent: "Pragmatist", text: "Directional recommendation declined for Gap-graded finding. Follow-on session proposed." },
    ],
  },
];

const SUBPAGES = [
  {
    eyebrow: "Guardian integrity system",
    title: "How the Guardian works",
    body: "SVS mechanics, flag taxonomy, halt authority, domain integrity modes, and the reasoning behind hidden model identity.",
    href: "/how-it-works/guardian",
  },
  {
    eyebrow: "Phase architecture",
    title: "Exploration, Deliberation, Synthesis",
    body: "How the three phases constrain each other — what carries forward, what gets locked, and how the Grade Challenge loop works across rounds.",
    href: "/how-it-works/phases",
  },
  {
    eyebrow: "Agents + roles",
    title: "All agents in detail",
    body: "Full specifications for each agent — including the Methodologist's four validity dimensions and the Synthesizer's three inviolable constraints.",
    href: "/how-it-works/agents",
  },
];

export default function ScoringPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "How it works", href: "/how-it-works" },
          { label: "Confidence + dissent scoring" },
        ]}
      />

      {/* HERO */}
      <div className="border-b border-border">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-5 py-16 md:px-10 md:py-20 lg:grid-cols-[1fr_400px] lg:items-start lg:gap-20 lg:px-[72px] lg:py-24">
          <div>
            <div className={eyebrow}>Confidence + dissent scoring</div>
            <h1 className="mb-6 font-serif text-[42px] font-normal leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[64px]">
              Not a score.
              <br />
              A structured
              <br />
              <em className="text-rust not-italic italic">evidence record.</em>
            </h1>
            <p className="mb-4 text-lg leading-[1.8] text-body">
              Augle doesn&apos;t produce a single confidence number. It produces four typed confidence
              grades — one per evidence node — issued by the Methodologist as hard constraints,
              propagated downstream, and enforced architecturally. The Synthesizer cannot exceed them.
              The Pragmatist inherits them. No agent and no user input can override them.
            </p>
            <p className="text-lg leading-[1.8] text-body">
              Every unresolved Contrarian objection is preserved verbatim alongside the finding that
              triggered it. The complete record — grades, objections, resolution conditions — is what
              you get at the end of every session.
            </p>
          </div>
          <div className="rounded-lg bg-ink p-6">
            <div className="mb-4.5 font-mono text-[10px] tracking-[0.08em] text-rust uppercase">
              Four confidence grades
            </div>
            <div className="mb-5 flex flex-col gap-px overflow-hidden rounded-md">
              {GRADE_PREVIEW.map((g) => (
                <div key={g.label} className="flex items-center gap-3 bg-ink-2 px-3.5 py-2.5">
                  <span className={`min-w-[90px] flex-shrink-0 rounded px-2.5 py-1 text-center font-mono text-[11px] whitespace-nowrap ${g.cls}`}>
                    {g.label}
                  </span>
                  <span className="text-xs leading-snug text-faint">{g.desc}</span>
                </div>
              ))}
            </div>
            <div className="rounded-md border-l-2 border-rust bg-ink-2 p-3.5">
              <div className="mb-2 font-mono text-[10px] tracking-[0.06em] text-rust uppercase">
                Propagation constraint · formal
              </div>
              <div className="font-mono text-[11px] leading-[1.8] text-[#D4CFC6]">
                C_S(k) ≤ min{"{"} C_M(eᵢ) : eᵢ ∈ Eₖ {"}"}
                <br />
                C_P ≤ C_S(k*)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GRADES IN DEPTH */}
      <div className="border-b border-border py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-[72px]">
          <div className={eyebrow}>The four grades</div>
          <h2 className={`${sectionTitle} mb-4`}>
            Each grade has a precise
            <br />
            definition and a hard consequence.
          </h2>
          <p className="mb-12 max-w-2xl text-lg leading-[1.85] text-body">
            These are not labels a researcher applies to summarize their judgment. They are typed
            outputs issued by the Methodologist after a four-dimension validity assessment, encoded
            into the evidence nodes registry, and propagated as constraints to every downstream agent.
          </p>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {GRADES.map((g) => (
              <div key={g.badge} className="flex flex-col overflow-hidden rounded-lg border border-border bg-paper">
                <div className="flex flex-1 flex-col p-7">
                  <div className="mb-4 flex items-center gap-2.5">
                    <span className={`rounded px-3 py-1 font-mono text-xs ${g.badgeCls}`}>{g.badge}</span>
                    <span className="font-mono text-[11px] text-subtle">{g.num}</span>
                  </div>
                  <h3 className="mb-3 font-serif text-[22px] leading-[1.25] text-ink">{g.title}</h3>
                  <p className="mb-3.5 text-[15px] leading-relaxed text-body">{g.body}</p>
                  <div className="border-t border-border pt-4">
                    <div className="mb-2 font-mono text-[10px] tracking-[0.06em] text-subtle uppercase">
                      {g.detailLabel}
                    </div>
                    <p className="text-[13px] leading-relaxed text-muted">{g.detail}</p>
                  </div>
                </div>
                <div className={`px-7 py-4 ${g.barCls}`}>
                  <span className="text-xs leading-relaxed">{g.constraint}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROPAGATION */}
      <div className="bg-ink py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-[72px]">
          <div className={eyebrow}>Unidirectional confidence propagation</div>
          <h2 className="mb-4 font-serif text-3xl text-offwhite md:text-[44px]">
            Confidence flows one direction.
            <br />
            No exceptions.
          </h2>
          <p className="mb-12 max-w-2xl text-lg leading-[1.85] text-faint">
            The propagation chain — Methodologist → Synthesizer → Pragmatist — is enforced at the
            orchestration layer, not through prompt instruction. The Topic Architect&apos;s round
            transition logic detects Grade Challenge violations and halts dispatch until the
            Synthesizer revises. There is no mechanism for any agent or user to override this chain.
          </p>
          <div className="mb-8 overflow-x-auto">
            <div className="flex min-w-[720px] items-stretch overflow-hidden rounded-lg border border-border-dark">
              {PROP_CHAIN.map((c, i) => (
                <div key={c.agent} className="flex flex-1 items-stretch">
                  <div className="flex-1 bg-ink-2 p-7">
                    <div className="mb-2.5 font-mono text-[10px] tracking-[0.06em] text-rust uppercase">{c.agent}</div>
                    <div className="mb-2.5 font-serif text-lg text-offwhite">{c.role}</div>
                    <p className="mb-3.5 text-[13px] leading-relaxed text-faint">{c.action}</p>
                    <div className="rounded border border-rust bg-ink p-2.5">
                      <div className="mb-1 font-mono text-[10px] tracking-[0.06em] text-rust uppercase">{c.constraintLabel}</div>
                      <div className="font-mono text-[11px] leading-relaxed text-[#D4CFC6]">{c.constraint}</div>
                    </div>
                  </div>
                  {i < PROP_CHAIN.length - 1 && (
                    <div className="flex flex-shrink-0 items-center bg-[#1A1917] px-3">
                      <span className="text-xl text-rust">→</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-7 rounded-lg border border-border-dark bg-ink-2 p-7">
            <div className="mb-3.5 font-mono text-[10px] tracking-[0.08em] text-rust uppercase">
              Formal propagation constraints · from AUGLE-001P patent application
            </div>
            <div className="font-mono text-[13px] leading-[2] text-[#D4CFC6]">
              Let C_M(eᵢ) denote the Methodologist&apos;s confidence bound for evidence node eᵢ
              <br />
              Let C_S(k) denote the Synthesizer&apos;s grade for claim k supported by node set Eₖ
              <br />
              Let C_P denote the Pragmatist&apos;s recommendation confidence, where k* is the primary
              claim
            </div>
            <div className="mt-2 font-mono text-[13px] leading-[2] text-rust">
              Constraint 1: C_S(k) ≤ min{"{"} C_M(eᵢ) : eᵢ ∈ Eₖ {"}"}
              <br />
              Constraint 2: C_P ≤ C_S(k*)
            </div>
            <p className="mt-2.5 text-[13px] leading-relaxed text-faint">
              These are hard constraints, not guidelines or prompt instructions. They are enforced
              through the session orchestration layer — the Topic Architect&apos;s round transition
              logic detects open [GRADE_CHALLENGE] flags and halts dispatch until the Synthesizer
              produces a compliant revision.
            </p>
          </div>

          <div className="grid grid-cols-1 items-center gap-6 rounded-lg bg-rust p-7 sm:grid-cols-[1fr_auto] sm:p-8">
            <div>
              <div className="mb-2 font-serif text-2xl text-offwhite">The Verdict Invariance Requirement</div>
              <p className="text-sm leading-relaxed text-offwhite/75">
                The Synthesizer operates at T=0.0 and anchors its verdict exclusively to the evidence
                nodes registry — not the discourse thread. This produces a deterministic relationship
                between evidence and finding: the same question with the same evidence base must
                always produce the same confidence verdict. This invariance is essential for the
                calibration corpus — it ensures each confidence grade represents a deterministic
                function of the evidence, enabling meaningful comparison against ground truth
                resolution outcomes.
              </p>
            </div>
            <span className="flex-shrink-0 rounded bg-offwhite px-3.5 py-2 font-mono text-[11px] whitespace-nowrap text-rust">
              T = 0.0 · locked
            </span>
          </div>
        </div>
      </div>

      {/* GRADE CHALLENGE */}
      <div className="border-b border-border py-16 md:py-24">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-5 md:px-10 lg:grid-cols-2 lg:gap-16 lg:px-[72px]">
          <div>
            <div className={eyebrow}>Grade Challenge mechanism</div>
            <h2 className={`${sectionTitle} mb-5`}>
              When the Synthesizer
              <br />
              overreaches.
            </h2>
            <div className="flex flex-col gap-4">
              <p className="text-lg leading-[1.85] text-body">
                If the Synthesizer produces a preliminary claim graded above the minimum confidence
                bound of its supporting evidence nodes, the Methodologist issues a [GRADE CHALLENGE]
                flag. This is not an advisory note — it triggers a mandatory revision loop enforced at
                the orchestration layer.
              </p>
              <p className="text-lg leading-[1.85] text-body">
                The Topic Architect detects the open [GRADE CHALLENGE] flag and halts dispatch of all
                subsequent agents — including the Contrarian, Guardian, and Pragmatist — until the
                Synthesizer produces a revised output in which all claims satisfy the propagation
                constraint.
              </p>
              <p className="text-lg leading-[1.85] text-body">
                Both the challenge and the revision are written to the session audit trail verbatim.
                The loop repeats until no Grade Challenge violations remain, or a maximum iteration
                count is reached — at which point remaining violations are surfaced to the user as
                blocking items.
              </p>
              <div className="rounded-lg border border-rust bg-[#FBF5F2] p-5">
                <p className="mb-2 font-mono text-[10px] tracking-[0.06em] text-rust uppercase">Example trigger</p>
                <p className="text-[13px] leading-relaxed text-body">
                  Methodologist grades a research paper&apos;s construct validity as Probable.
                  Synthesizer produces a preliminary claim labeled Established using that paper as the
                  sole supporting evidence node. Constraint 1 is violated. [GRADE CHALLENGE] fires.
                  Synthesizer must revise the claim to Probable before any agent dispatches.
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="mb-3.5 font-mono text-[10px] tracking-[0.08em] text-subtle uppercase">
              Grade Challenge · step by step
            </div>
            <div className="overflow-hidden rounded-lg border border-border bg-paper">
              {CHALLENGE_STEPS.map((step, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-4 p-5 ${i < CHALLENGE_STEPS.length - 1 ? "border-b border-border" : ""}`}
                >
                  <span className="w-6 flex-shrink-0 pt-px font-mono text-[11px] font-medium text-rust">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[13px] leading-relaxed text-body">
                    {step.bold && <strong className="font-medium text-ink">{step.bold}</strong>}
                    {step.text}
                    {step.badge && (
                      <span className={`mx-1.5 rounded px-2 py-0.5 align-middle font-mono text-[10px] ${step.badgeCls}`}>
                        {step.badge}
                      </span>
                    )}
                    {step.after && <> {step.after}</>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* DISSENT SCORING */}
      <div className="border-b border-border bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-[72px]">
          <div className={eyebrow}>Dissent scoring</div>
          <h2 className={`${sectionTitle} mb-4`}>
            Every objection classified.
            <br />
            Every unresolved objection preserved.
          </h2>
          <p className="mb-12 max-w-2xl text-lg leading-[1.85] text-body">
            The Contrarian issues typed objections — not general criticism. Each objection carries a
            strength grade and a resolution condition. The strength grade determines what happens to
            the objection when Phase 3 closes: Strong unresolved objections surface verbatim in the
            final output. The resolution condition tells you exactly what evidence would change the
            finding.
          </p>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
            <div className="flex flex-col gap-3">
              {OBJECTIONS.map((o) => (
                <div key={o.name} className="overflow-hidden rounded-lg border border-border bg-cream">
                  <div className="flex items-start justify-between gap-4 border-b border-border p-5">
                    <div className="font-serif text-lg text-ink">{o.name}</div>
                    <span className={`flex-shrink-0 rounded px-2.5 py-1 font-mono text-[11px] whitespace-nowrap ${o.gradeCls}`}>
                      {o.grade}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="mb-2.5 text-[13px] leading-relaxed text-body">{o.body}</p>
                    <div className="rounded border-l-2 border-rust bg-[#FBF5F2] px-2.5 py-2 font-mono text-xs text-rust">
                      {o.consequence}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-lg bg-ink p-6">
              <div className="mb-4.5 font-mono text-[10px] tracking-[0.08em] text-rust uppercase">
                Dissent register · example session
              </div>
              <div className="flex flex-col">
                {DISSENT_LIVE.map((d, i) => (
                  <div key={d.mention} className={`py-3.5 ${i < DISSENT_LIVE.length - 1 ? "border-b border-border-dark" : ""}`}>
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-[10px] text-faint">{d.mention}</span>
                      <span className={`flex-shrink-0 rounded px-2 py-0.5 font-mono text-[10px] whitespace-nowrap ${d.cls}`}>
                        {d.strength}
                      </span>
                    </div>
                    <p className="mb-1.5 text-xs leading-relaxed text-faint italic">{d.text}</p>
                    <div className="font-mono text-[11px] text-faint">{d.resolution}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VALIDATION RUN */}
      <div className="border-b border-border py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-[72px]">
          <div className={eyebrow}>Worked example</div>
          <h2 className={`${sectionTitle} mb-10`}>
            Confidence propagation confirmed
            <br />
            across all five checkpoints.
          </h2>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="flex flex-col gap-4 text-base leading-relaxed text-body">
              <p>
                The following is an illustrative Standard-depth Letters &amp; Science session — the
                same confidence and dissent record you receive at the end of every session.
              </p>
              <p>
                The session demonstrates all five architectural properties of the confidence system:
                Strong objection successfully amended a terrain classification; evidence ceiling
                propagated correctly across all three phases; Grade Challenge mechanism fired and
                resolved correctly; Pragmatist declined to produce a directional recommendation for
                the Gap-graded finding; and the Unresolved Moderate objection surfaced verbatim in
                final delivery.
              </p>
              <p>
                Research question:{" "}
                <em className="not-italic italic">
                  Does the current evidence base support long-term weight maintenance without
                  continued GLP-1 dosing?
                </em>
              </p>
              <p className="text-[13px] text-subtle">
                Depth: Standard · Mode: Letters &amp; Science · Guardian: Active
                <br />
                Illustrative session · representative of the record structure
              </p>
              <Link href="/research" className="text-sm font-medium text-rust">
                See the research →
              </Link>
            </div>
            <div className="rounded-lg bg-ink p-6">
              <div className="mb-4.5 font-mono text-[10px] tracking-[0.08em] text-rust uppercase">
                Confidence + dissent record
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
            Calibrated confidence.
            <br />
            Preserved dissent.
          </>
        }
        body={
          <>
            Join waitlist and run a session — every grade enforced,
            <br className="hidden sm:block" />
            every objection logged, every finding auditable.
          </>
        }
        secondaryLabel="Browse outcomes"
        secondaryHref="/outcomes"
      />
    </>
  );
}

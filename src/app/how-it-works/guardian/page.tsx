import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CtaBanner } from "@/components/CtaBanner";
import { eyebrow, sectionTitle } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Guardian Integrity System — Augle",
  description:
    "The Guardian is Augle's independent integrity layer — operating at every phase boundary with halt authority, hidden model identity, and a real-time Source Verification Service that authenticates every citation before it influences a finding.",
};

const FACTS = [
  { label: "Agent class", value: "Independent integrity layer" },
  { label: "Model", value: "Hidden · T = 0.1", mono: true },
  { label: "Dispatch", value: "Phase boundaries only" },
  { label: "Research role", value: "None — forbidden" },
  { label: "Halt authority", value: "Permanent · all phases" },
  { label: "SVS", value: "Runs concurrently · all phases" },
  { label: "Identity", value: "Hidden from users + agents" },
  { label: "Patent", value: "AUGLE-003P · #64/090,101", mono: true },
];

const CONSTRAINTS = [
  { kind: "yes" as const, text: "Authenticate citations via SVS across all three phases in real time" },
  { kind: "yes" as const, text: "Issue flags at three severity levels — Critical, Moderate, Informational" },
  { kind: "yes" as const, text: "Halt dispatch permanently on Hard Block conditions — no override possible" },
  { kind: "yes" as const, text: "Evaluate user-contributed context before it enters the deliberation" },
  {
    kind: "no" as const,
    text: "Cannot produce research findings, conclusions, or directional recommendations of any kind",
  },
  {
    kind: "no" as const,
    text: "Cannot participate in deliberation discourse between agents — no @mentions, no contributions to the evidence record",
  },
  {
    kind: "no" as const,
    text: "Model identity never surfaced to users or to other research agents — prevents anchoring on known model capabilities",
  },
];

const FLAGS = [
  {
    level: "Critical",
    levelCls: "bg-conf-contested-bg text-conf-contested-text",
    name: "Hard block",
    body: "Deliberation cannot proceed. The Topic Architect halts dispatch immediately. The user must resolve the condition before the next round can fire. Critical flags indicate a fundamental integrity failure — not a data quality issue.",
    examples: [
      "Financial advice framing in output",
      "Confirmed hallucinated citation",
      "Unresolvable scope collapse",
      "Compound integrity violation",
    ],
    action:
      "Session halted. User notified. If a Hard Block terminates the session permanently, full credit refund is issued. The flag is written to the session audit trail with full resolution detail.",
  },
  {
    level: "Moderate",
    levelCls: "bg-conf-med-bg text-conf-med-text",
    name: "Soft block",
    body: "Surfaces as a banner before the next round fires. User acknowledgment is required but does not block dispatch — the user can proceed after reviewing the flag. The condition is recorded in the session audit trail regardless of the user's choice.",
    examples: [
      "Evidence asymmetry across agents",
      "Framing bias detected in question",
      "Unverified citation (SVS_UNVERIFIED)",
      "Source confirmed not found (SVS_NOT_FOUND)",
    ],
    action:
      "User acknowledgment required before next round. Dispatch is not blocked. Full flag record written to audit trail with evidence node ID, verification source, and resolution detail.",
  },
  {
    level: "Informational",
    levelCls: "bg-paper-alt text-muted",
    name: "Logged",
    body: "Logged in the session flag registry and included in the session summary output. Does not surface interactively during the session. Informational flags represent conditions the Guardian has noted but assessed as non-material to the deliberation's integrity.",
    examples: [
      "Pending source verification (timeout)",
      "Source behind paywall — unconfirmable",
      "Low citation density in evidence node",
      "Pre-print without peer review status",
    ],
    action: "Logged silently. Included in final session summary. Available in the exportable audit trail. No user acknowledgment required.",
  },
];

const SVS_STEPS = [
  {
    num: "01",
    title: "Identifier detection",
    body: "The SVS detects the citation type — URL, DOI, arXiv identifier, or ISBN — and routes to the appropriate protocol handler. Each type has a distinct resolution pathway and content match verification method.",
  },
  {
    num: "02",
    title: "Existence check",
    body: "The SVS resolves the identifier against the live resource. A resource that doesn't exist at the claimed location returns SVS_NOT_FOUND. A resource that exists but has been retracted is flagged accordingly.",
  },
  {
    num: "03",
    title: "Content match verification",
    body: "The SVS compares the agent's citation claim against the metadata returned by the resolved resource — title, author, publication year. A resource that exists but doesn't match the claim receives verification_status: unverified, not verified. Existence alone is not sufficient.",
  },
  {
    num: "04",
    title: "Confidence downgrade + flag",
    body: "Based on the verification outcome, the SVS applies tiered confidence downgrade rules to the evidence node and raises a typed integrity flag into the session flag registry. The evidence node is preserved — not removed — with its verification status recorded.",
  },
  {
    num: "05",
    title: "Evidence node registry update",
    body: "The verification_status, verification_source, verification_timestamp, and verification_url are written to the evidence node record. The Methodologist receives the updated registry — never the pre-verification state.",
  },
];

const SVS_ROWS = [
  { outcome: "Verified", outcomeCls: "text-conf-high-text", prior: "Any", downgrade: "None", downgradeCls: "text-subtle", flag: "—" },
  {
    outcome: "Unverified",
    outcomeCls: "text-conf-med-text",
    prior: "Established",
    downgrade: "Cap to Probable",
    downgradeCls: "text-conf-med-text",
    flag: "SVS_UNVERIFIED · Informational",
  },
  {
    outcome: "Unverified",
    outcomeCls: "text-conf-med-text",
    prior: "Probable / Contested / Gap",
    downgrade: "No change",
    downgradeCls: "text-subtle",
    flag: "SVS_UNVERIFIED · Informational",
  },
  {
    outcome: "Not found",
    outcomeCls: "text-conf-contested-text",
    prior: "Any",
    downgrade: "Hard downgrade to Contested",
    downgradeCls: "text-conf-contested-text",
    flag: "SVS_NOT_FOUND · Moderate",
  },
  {
    outcome: "Pending",
    outcomeCls: "text-conf-med-text",
    prior: "Established",
    downgrade: "No change at session time",
    downgradeCls: "text-subtle",
    flag: "SVS_UNVERIFIED · Informational",
  },
];

const MODES = [
  {
    badge: "Academic",
    name: "Academic integrity",
    desc: "Applied in Letters & Science sessions for research, dissertation, and grant work. Enforces academic source standards and retraction database checks.",
    rules: [
      "Retraction database check applied to all cited papers",
      "Preprints without peer review flagged at Informational minimum",
      "Self-citation ratio monitored for bias patterns",
      "Statistical claim validation against cited study design",
    ],
  },
  {
    badge: "Legal",
    name: "Legal integrity",
    desc: "Applied in Letters & Science sessions for case analysis, expert evidence review, and regulatory applicability questions.",
    rules: [
      "Case citation verification against legal databases",
      "Overruled or superseded decisions flagged at Moderate",
      "Jurisdiction scope monitoring for applicability claims",
      "Statutory reference version validation",
    ],
  },
  {
    badge: "Clinical",
    name: "Clinical integrity",
    desc: "Applied in Letters & Science sessions for drug interactions, clinical trial design, and healthcare coverage decisions.",
    rules: [
      "Retracted clinical studies flagged at Critical",
      "Population scope monitoring — exclusion criteria preserved in evidence record",
      "Sample size threshold checking against claim strength",
      "Off-label use framing detection",
    ],
  },
  {
    badge: "Financial",
    name: "Financial integrity",
    desc: "Applied in sessions for VC, PE, financial services, and enterprise strategy work.",
    rules: [
      "Financial advice framing (buy/sell/long/short) triggers Critical flag",
      "Market data recency validation — stale data flagged at Moderate",
      "Regulatory filing citation verification",
      "Forecast attribution — speculative claims must be distinguished from historical data",
    ],
  },
  {
    badge: "Editorial",
    name: "Editorial integrity",
    desc: "Applied in Letters & Science sessions for journalism, media analysis, and science reporting work.",
    rules: [
      "Source independence monitoring — conflicting interests flagged",
      "Statistical misrepresentation detection in media claims",
      "Original source vs. secondary report distinction enforced",
      "Press release vs. peer-reviewed study distinction preserved",
    ],
  },
];

const AUDIT_POINTS = [
  "Every SVS verification outcome with timestamp, protocol used, and resolution result",
  "Every flag raised — type, severity, evidence node ID, and resolution detail",
  "Every confidence downgrade applied — prior grade, downgrade applied, flag reference",
  "Every phase boundary evaluation — Guardian dispatch timestamp and outcome",
  "Any halt events — condition, phase, and user notification record",
];

const LOG_ENTRIES = [
  {
    ts: "2026-06-23T14:22:01Z · Phase 1 boundary",
    type: "SVS_VERIFIED",
    typeCls: "text-conf-high-text",
    detail: "Pashler et al. (2008) · DOI resolved · content match PASS · confidence_bound: Established → unchanged",
  },
  {
    ts: "2026-06-23T14:22:04Z · Phase 1 boundary",
    type: "SVS_NOT_FOUND · Moderate",
    typeCls: "text-conf-med-text",
    detail: "Martinez et al. (2024) · arXiv:2403.12847 · resolution_result: 404 · confidence_bound: Probable → Contested · flag written to registry",
  },
  {
    ts: "2026-06-23T14:22:07Z · Phase 1 boundary",
    type: "SVS_UNVERIFIED · Informational",
    typeCls: "text-faint",
    detail: "Chen & Liu (2023) · conference proceedings · content match FAIL (title mismatch) · confidence_bound: Established → capped at Probable",
  },
  {
    ts: "2026-06-23T14:22:09Z · Phase 1 → Phase 2",
    type: "GUARDIAN_PHASE_PASS",
    typeCls: "text-conf-high-text",
    detail: "Phase 1 integrity evaluation complete · 2 flags raised · no Critical conditions · Phase 2 dispatch authorised",
  },
  {
    ts: "2026-06-23T14:38:14Z · Phase 2 → Phase 3",
    type: "GUARDIAN_PHASE_PASS",
    typeCls: "text-conf-high-text",
    detail: "Phase 2 integrity evaluation complete · 0 new flags · no Critical conditions · Phase 3 dispatch authorised",
  },
  {
    ts: "2026-06-23T14:51:02Z · Session close",
    type: "AUDIT_EXPORT_READY",
    typeCls: "text-faint",
    detail: "Full audit trail available for export · 3 flags total · 0 Critical · 1 Moderate · 2 Informational · session certified",
  },
];

const SUBPAGES = [
  {
    eyebrow: "Overview",
    title: "How it works",
    body: "The full multi-agent ensemble explained — dispatch order, phase architecture, output contracts, and session modes.",
    href: "/how-it-works",
  },
  {
    eyebrow: "Phase architecture",
    title: "Exploration, Deliberation, Synthesis",
    body: "How the three phases constrain each other — what carries forward, what gets locked, and how the structured output protocol works.",
    href: "/how-it-works/phases",
  },
  {
    eyebrow: "Confidence + dissent scoring",
    title: "How findings are graded",
    body: "The four confidence grades, how the Methodologist issues them as hard constraints, and how unresolved Contrarian objections are preserved in the final output.",
    href: "/how-it-works/scoring",
  },
];

function CheckIcon() {
  return (
    <svg width={11} height={11} viewBox="0 0 11 11" fill="none">
      <path d="M2 5.5L4.5 8L9 3" stroke="#F7F6F2" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function CrossIcon() {
  return (
    <svg width={11} height={11} viewBox="0 0 11 11" fill="none">
      <path d="M3 3L8 8M8 3L3 8" stroke="#B0ADA5" strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  );
}

export default function GuardianPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "How it works", href: "/how-it-works" },
          { label: "Guardian integrity system" },
        ]}
      />

      {/* HERO */}
      <div className="border-b border-border">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-5 py-16 md:px-10 md:py-20 lg:grid-cols-[1fr_400px] lg:gap-24 lg:px-[72px] lg:py-24">
          <div>
            <div className={eyebrow}>Guardian integrity system</div>
            <h1 className="mb-6 font-serif text-[42px] font-normal leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[64px]">
              The only agent
              <br />
              that can stop
              <br />
              <em className="text-rust not-italic italic">everything.</em>
            </h1>
            <p className="mb-4 text-lg leading-[1.8] text-body">
              The Guardian is not a research agent. It doesn&apos;t produce findings, participate in
              deliberation, or recommend conclusions. It operates exclusively at phase boundaries —
              authenticating sources, classifying integrity events, and holding permanent halt
              authority over every session it monitors.
            </p>
            <p className="text-lg leading-[1.8] text-body">
              Its model identity is hidden from all user-facing surfaces, including the other agents.
              This is not a privacy feature. It is an architectural decision to prevent anchoring
              effects — the well-documented tendency of agents and users to anchor reasoning toward
              known model capabilities.
            </p>
          </div>
          <div className="overflow-hidden rounded-lg border border-border bg-paper">
            {FACTS.map((f, i) => (
              <div
                key={f.label}
                className={`flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-5 py-3.5 ${
                  i < FACTS.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <span className="font-mono text-[10px] tracking-[0.06em] text-subtle uppercase">{f.label}</span>
                <span className={`text-right text-[13px] font-medium ${f.mono ? "font-mono text-rust" : "text-ink"}`}>
                  {f.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* INDEPENDENCE */}
      <div className="border-b border-border">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-2 lg:gap-24 lg:px-[72px]">
          <div className="flex flex-col gap-5">
            <div>
              <div className={eyebrow}>Guardian independence</div>
              <h2 className={sectionTitle}>
                Outside the loop.
                <br />
                By design.
              </h2>
            </div>
            <p className="text-lg leading-[1.85] text-body">
              The Guardian operates outside the research deliberation loop entirely. It evaluates the
              integrity of what the ensemble produces — it does not contribute to producing it. This
              separation is architectural, not procedural.
            </p>
            <p className="border-l-[3px] border-rust pl-6 font-serif text-xl leading-[1.5] text-ink italic">
              &quot;An integrity agent that participates in deliberation is not an integrity agent. It
              is a participant with audit responsibilities — a fundamentally different and weaker
              guarantee.&quot;
            </p>
            <p className="text-lg leading-[1.85] text-body">
              Running at temperature 0.1, the Guardian is near-deterministic — the same input produces
              the same integrity classification across sessions. This is essential for calibration: if
              the Guardian&apos;s behavior were stochastic, the flag record would be unreliable as an
              audit artifact.
            </p>
          </div>
          <div className="overflow-hidden rounded-lg border border-border bg-paper">
            <div className="border-b border-border bg-paper-alt px-5 py-4">
              <span className="font-mono text-[10px] tracking-[0.08em] text-subtle uppercase">
                Guardian · permitted and forbidden actions
              </span>
            </div>
            {CONSTRAINTS.map((c, i) => (
              <div
                key={c.text}
                className={`flex items-start gap-3.5 px-5 py-4 ${i < CONSTRAINTS.length - 1 ? "border-b border-border" : ""}`}
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-[3px] ${
                    c.kind === "yes" ? "bg-rust" : "bg-cell"
                  }`}
                >
                  {c.kind === "yes" ? <CheckIcon /> : <CrossIcon />}
                </span>
                <div>
                  <span className="mb-0.5 block font-mono text-[10px] text-subtle uppercase">
                    {c.kind === "yes" ? "Permitted" : "Forbidden"}
                  </span>
                  <span className="text-[13px] leading-relaxed text-body">{c.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FLAG TAXONOMY */}
      <div className="bg-ink py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-[72px]">
          <div className={eyebrow}>Flag taxonomy</div>
          <h2 className="mb-4 font-serif text-3xl text-offwhite md:text-[44px]">
            Three severity levels.
            <br />
            Each with a defined consequence.
          </h2>
          <p className="mb-14 max-w-2xl text-base leading-[1.75] text-faint">
            The Guardian classifies every integrity event into one of three severity tiers. The tier
            determines what happens next — whether deliberation is blocked, surfaced for
            acknowledgment, or logged silently. There is no discretion in the consequence: the tier
            determines the response deterministically.
          </p>
          <div className="mb-10 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border-dark bg-border-dark md:grid-cols-3">
            {FLAGS.map((f) => (
              <div key={f.level} className="bg-ink-2 p-8">
                <span className={`mb-3.5 inline-block rounded font-mono text-[10px] tracking-[0.08em] uppercase ${f.levelCls} px-2.5 py-1`}>
                  {f.level}
                </span>
                <div className="mb-3.5 font-serif text-2xl text-offwhite">{f.name}</div>
                <p className="mb-5 text-[13px] leading-[1.75] text-faint">{f.body}</p>
                <div className="mb-4 flex flex-col gap-1.5">
                  {f.examples.map((ex) => (
                    <div
                      key={ex}
                      className="rounded-[3px] border-l-2 border-border-dark bg-ink px-2.5 py-1.5 font-mono text-xs text-faint"
                    >
                      {ex}
                    </div>
                  ))}
                </div>
                <div className="border-t border-border-dark pt-4">
                  <div className="mb-1.5 font-mono text-[10px] tracking-[0.06em] text-subtle uppercase">Consequence</div>
                  <p className="text-xs leading-relaxed text-faint">{f.action}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 items-center gap-6 rounded-lg bg-rust p-7 sm:grid-cols-[1fr_auto] sm:p-8">
            <div>
              <div className="mb-2 font-serif text-2xl text-offwhite">Hard Block + permanent halt</div>
              <p className="text-sm leading-relaxed text-offwhite/75">
                A Guardian Hard Block terminates the session permanently when the Guardian determines
                the deliberation cannot be certified under any conditions. This typically occurs due to
                compound integrity violations or a fundamental research question framing problem that
                cannot be corrected mid-session. Hard blocks trigger a full refund of session credits.
                The condition is logged with full detail in the session audit trail.
              </p>
            </div>
            <span className="flex-shrink-0 rounded bg-offwhite px-4 py-2 font-mono text-xs whitespace-nowrap text-rust">
              Full credit refund
            </span>
          </div>
        </div>
      </div>

      {/* SVS */}
      <div className="py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-[72px]">
          <div className={eyebrow}>Source Verification Service</div>
          <h2 className={sectionTitle}>
            Citations authenticated
            <br />
            before they influence anything.
          </h2>
          <p className="mt-3 mb-12 max-w-2xl text-lg leading-[1.85] text-body">
            The SVS runs as a background service between the evidence extraction layer and the
            Methodologist agent dispatch. It intercepts citation hallucinations — the most damaging
            failure mode in AI reasoning systems — before they enter the evidence base and propagate
            downstream.
          </p>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="flex flex-col">
              {SVS_STEPS.map((s, i) => (
                <div
                  key={s.num}
                  className={`grid grid-cols-[32px_1fr] gap-4 py-5 ${i < SVS_STEPS.length - 1 ? "border-b border-border" : ""}`}
                >
                  <span className="pt-0.5 font-mono text-[11px] font-medium text-rust">{s.num}</span>
                  <div>
                    <div className="mb-1.5 text-sm font-medium text-ink">{s.title}</div>
                    <p className="text-[13px] leading-relaxed text-muted">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div className="mb-3.5 font-mono text-[10px] tracking-[0.08em] text-subtle uppercase">
                Confidence downgrade rules · by verification outcome
              </div>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full min-w-[520px] border-collapse">
                  <thead>
                    <tr>
                      {["SVS outcome", "Prior grade", "Downgrade applied", "Flag raised"].map((h) => (
                        <th
                          key={h}
                          className="border-b border-border bg-paper px-3.5 py-2.5 text-left font-mono text-[10px] tracking-[0.06em] text-subtle uppercase"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {SVS_ROWS.map((row, i) => (
                      <tr key={i} className={i % 2 === 1 ? "bg-paper" : ""}>
                        <td className={`border-b border-border px-3.5 py-2.5 font-mono text-[11px] ${row.outcomeCls}`}>
                          {row.outcome}
                        </td>
                        <td className="border-b border-border px-3.5 py-2.5 text-xs text-body">{row.prior}</td>
                        <td className={`border-b border-border px-3.5 py-2.5 font-mono text-[11px] ${row.downgradeCls}`}>
                          {row.downgrade}
                        </td>
                        <td className="border-b border-border px-3.5 py-2.5 text-xs text-body">{row.flag}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-5 rounded-md border border-border border-l-2 border-l-rust bg-paper p-4">
                <div className="mb-1.5 font-mono text-[10px] tracking-[0.06em] text-rust uppercase">
                  Why citations are preserved, not removed
                </div>
                <p className="text-[13px] leading-relaxed text-body">
                  Removing an evidence node that fails verification would silently improve the apparent
                  quality of the session output while concealing a potential hallucination. The SVS
                  preserves every node, downgrades its confidence bound, and records the failure in the
                  flag registry. This is a transparency obligation — not a data retention policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* INTEGRITY MODES */}
      <div className="border-y border-border bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-[72px]">
          <div className={eyebrow}>Domain integrity modes</div>
          <h2 className={sectionTitle}>
            The Guardian adapts
            <br />
            to your domain.
          </h2>
          <p className="mt-3 mb-12 max-w-2xl text-lg leading-[1.85] text-body">
            The Guardian&apos;s core behaviour — SVS authentication, flag taxonomy, halt authority — is
            constant across all modes. What changes is the domain-specific integrity ruleset applied
            on top of that foundation.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {MODES.map((m) => (
              <div key={m.badge} className="rounded-lg border border-border bg-cream p-6">
                <span className="mb-2.5 block font-mono text-[10px] tracking-[0.06em] text-rust uppercase">{m.badge}</span>
                <div className="mb-1.5 font-serif text-xl text-ink">{m.name}</div>
                <p className="mb-4 text-[13px] leading-relaxed text-body">{m.desc}</p>
                <div className="flex flex-col gap-1.5 border-t border-border pt-4">
                  {m.rules.map((r) => (
                    <div key={r} className="flex items-start gap-2">
                      <div className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-rust" />
                      <span className="text-xs leading-snug text-muted">{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AUDIT TRAIL */}
      <div className="py-16 md:py-24">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-5 md:px-10 lg:grid-cols-2 lg:gap-24 lg:px-[72px]">
          <div className="flex flex-col gap-5">
            <div>
              <div className={eyebrow}>Audit trail</div>
              <h2 className={sectionTitle}>
                Every decision.
                <br />
                Every flag.
                <br />
                Fully exportable.
              </h2>
            </div>
            <p className="text-lg leading-[1.85] text-body">
              The Guardian writes a structured record of every integrity decision to the session audit
              trail — not a summary, a full provenance record. Every SVS verification outcome, every
              flag raised, every confidence downgrade applied, every halt decision made.
            </p>
            <p className="text-lg leading-[1.85] text-body">
              The audit trail is exportable in full at session close. For regulated industries —
              clinical, financial, legal — this record is the accountability artifact that demonstrates
              due diligence on the evidence base used to support a decision.
            </p>
            <div className="rounded-lg border border-border bg-paper p-5">
              <p className="mb-3 font-mono text-[10px] tracking-[0.08em] text-subtle uppercase">
                What the audit trail records
              </p>
              <div className="flex flex-col gap-2">
                {AUDIT_POINTS.map((p) => (
                  <div key={p} className="flex items-start gap-2.5">
                    <div className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-rust" />
                    <span className="text-[13px] text-body">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-ink p-6">
            <div className="mb-4.5 font-mono text-[10px] tracking-[0.08em] text-rust uppercase">
              Session audit trail · example
            </div>
            <div className="flex flex-col">
              {LOG_ENTRIES.map((log, i) => (
                <div key={log.ts} className={`py-3 ${i < LOG_ENTRIES.length - 1 ? "border-b border-border-dark" : ""}`}>
                  <div className="mb-1 font-mono text-[10px] text-faint">{log.ts}</div>
                  <div className={`mb-1 font-mono text-[11px] ${log.typeCls}`}>{log.type}</div>
                  <p className="text-xs leading-relaxed text-faint">{log.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SUBPAGES */}
      <div className="border-t border-border py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-[72px]">
          <div className={eyebrow}>How it works</div>
          <h2 className="mb-9 font-serif text-3xl text-ink md:text-[44px]">Continue reading.</h2>
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
            See the Guardian
            <br />
            in action.
          </>
        }
        body={
          <>
            Join waitlist and run a session — every source authenticated,
            <br className="hidden sm:block" />
            every flag logged, every decision auditable.
          </>
        }
        secondaryLabel="How it works"
        secondaryHref="/how-it-works"
      />
    </>
  );
}

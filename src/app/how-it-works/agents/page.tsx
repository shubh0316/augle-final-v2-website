import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CtaBanner } from "@/components/CtaBanner";
import { AGENTS } from "@/data/agents";
import { AgentIcon } from "@/components/AgentIcon";
import { eyebrow } from "@/lib/styles";

export const metadata: Metadata = {
  title: "The 7 AI Agents Behind Augle | Roles, Models & Temperature Settings",
  description:
    "Full specs for Augle's seven agents — Guardian, Cartographer, Methodologist, Contrarian, Synthesizer, Pragmatist, Topic Architect — model assignment and permitted actions for each.",
};

function agent(id: string) {
  const a = AGENTS.find((x) => x.id === id);
  if (!a) throw new Error(`Unknown agent id: ${id}`);
  return a;
}

const TEMP_CLASS = {
  high: "text-rust",
  mid: "text-faint",
  low: "text-faint",
  zero: "text-svs-verified",
} as const;

const REFERENCE_ROWS = [
  {
    num: "01",
    id: "topic-architect",
    role: "Session orchestration",
    decoding: "Near-deterministic",
    temp: "low" as const,
    phases: "Init · transitions · delivery",
    output: "Session params · final delivery",
  },
  {
    num: "02",
    id: "cartographer",
    role: "Evidence mapping",
    decoding: "Exploratory",
    temp: "high" as const,
    phases: "Phases 1 · 2 · 3",
    output: "Five-component terrain map",
  },
  {
    num: "03",
    id: "methodologist",
    role: "Validity assessment",
    decoding: "Balanced",
    temp: "mid" as const,
    phases: "Phases 1 · 2 · 3",
    output: "Per-node confidence bounds",
  },
  {
    num: "04",
    id: "guardian",
    role: "Integrity layer",
    decoding: "Near-deterministic",
    temp: "low" as const,
    phases: "Phase boundaries only",
    output: "Flag classification · halt auth",
  },
  {
    num: "05",
    id: "contrarian",
    role: "Adversarial pressure",
    decoding: "Maximum variation",
    temp: "high" as const,
    phases: "Phases 1 · 2 · 3",
    output: "Steelmanned objections",
  },
  {
    num: "06",
    id: "synthesizer",
    role: "Integration & finding",
    decoding: "Deterministic · locked",
    temp: "zero" as const,
    phases: "All phases",
    output: "Evidence-anchored finding",
  },
  {
    num: "07",
    id: "pragmatist",
    role: "Application notes",
    decoding: "Low variation",
    temp: "low" as const,
    phases: "Phase 3 only",
    output: "Actionable recommendations",
  },
];

type Dispatch = { label: string; active: boolean };
type ContractGroup = { label: string; icon: "yes" | "no"; items: string[] };

type AgentSpec = {
  id: string;
  num: string;
  roleLabel: string;
  model?: string;
  decodingPct: number;
  decodingLabel: string;
  actType: string;
  dispatch: Dispatch[];
  desc: string;
  rationale: string;
  groups: ContractGroup[];
};

const SPECS: AgentSpec[] = [
  {
    id: "guardian",
    num: "Agent 04",
    roleLabel: "Independent integrity layer",
    model: "Anthropic & Augle",
    decodingPct: 10,
    decodingLabel: "Near-deterministic",
    actType: "INTEGRITY",
    dispatch: [
      { label: "Phase 1 · research", active: false },
      { label: "Phase 1/2 boundary", active: true },
      { label: "Phase 2/3 boundary", active: true },
      { label: "Phase 3 final check", active: true },
    ],
    desc: "The Guardian is architecturally isolated from the research deliberation loop. It evaluates integrity — it does not contribute to findings. Its model identity is withheld from all user-facing surfaces, including the other agents, to prevent anchoring effects on research reasoning. It runs near-deterministically to produce consistent integrity classifications: the same integrity event must produce the same flag classification across sessions for the audit trail to be reliable.",
    rationale:
      "Near-deterministic decoding produces consistent output. Integrity classification must be repeatable — a given citation verification outcome must always produce the same flag classification. Stochastic integrity behavior would undermine the reliability of the audit trail as an accountability artifact.",
    groups: [
      {
        label: "Output contract — permitted",
        icon: "yes",
        items: [
          "Authenticate citations via SVS across all three phases in real time — existence check, content match verification, confidence downgrade application",
          "Issue flags at three severity levels (Critical / Moderate / Informational) with typed consequences — Hard Block, Soft Block, or Silent Log",
          "Exercise halt authority — pause or permanently terminate the session on Hard Block conditions. No other agent can override a Guardian halt.",
          "Evaluate user-contributed context before it enters the deliberation — screens for manipulation attempts and integrity violations",
        ],
      },
      {
        label: "Output contract — forbidden",
        icon: "no",
        items: [
          "Cannot produce research findings, evidence assessments, or conclusions of any kind under any circumstances",
          "Cannot participate in deliberation discourse — no @mentions, no contributions to the evidence nodes registry",
          "Model identity never surfaced to users or research agents — prevents anchoring on known model capabilities or provider biases",
        ],
      },
    ],
  },
  {
    id: "topic-architect",
    num: "Agent 01",
    roleLabel: "Session orchestration",
    decodingPct: 20,
    decodingLabel: "Near-deterministic",
    actType: "ORCHESTRATION",
    dispatch: [
      { label: "Session initialization", active: true },
      { label: "Phase transitions", active: true },
      { label: "Final delivery", active: true },
      { label: "Research discourse", active: false },
    ],
    desc: "The only agent with a direct user-facing interface. Fires once at session initialization to parse the research question, set depth tier, configure Guardian integrity mode, and queue the first dispatch. Manages all phase transitions and surfaces the final delivery package. Does not participate in research discourse between initialization and final delivery.",
    rationale:
      "Low-variation decoding allows modest flexibility in how session parameters are framed and communicated to the user, while keeping the orchestration logic predictable. The Topic Architect's job is routing — not reasoning — so near-deterministic behavior is appropriate.",
    groups: [
      {
        label: "Output contract — permitted",
        icon: "yes",
        items: [
          "Parse and structure the research question at session initialization — scope, depth tier, mode assignment, Guardian integrity mode",
          "Surface Guardian flags to the user at the appropriate severity level and manage acknowledgment flow",
          "Deliver the final Phase 3 output package — finding, unresolved objections, reopen conditions, actionable steps, audit trail",
        ],
      },
      {
        label: "Output contract — forbidden",
        icon: "no",
        items: [
          "Cannot editorialize, soften, reframe, or summarize any agent's output — delivery is verbatim",
          "Cannot participate in research discourse between initialization and final delivery — does not contribute to the evidence record",
        ],
      },
    ],
  },
  {
    id: "cartographer",
    num: "Agent 02",
    roleLabel: "Evidence mapping",
    decodingPct: 80,
    decodingLabel: "Exploratory",
    actType: "LANDSCAPE",
    dispatch: [
      { label: "Phase 1 · dispatched first", active: true },
      { label: "Phase 2 · dispatched first", active: true },
      { label: "Phase 3 · dispatched first", active: true },
    ],
    desc: "Dispatched first in every phase — every deliberation round begins with the Cartographer mapping or updating the evidence terrain. Produces a five-component landscape output that becomes the structured foundation every subsequent agent builds from. Exploratory decoding ensures broad, creative evidence retrieval and reduces the risk that a narrow initial framing constrains the entire deliberation.",
    rationale:
      "Exploratory decoding maximises evidence retrieval breadth. A Cartographer that consistently produces the same narrow landscape would systematically miss relevant evidence at the edges of the research question. High variation increases the probability of surfacing non-obvious evidence nodes and cross-domain connections.",
    groups: [
      {
        label: "Output contract — five required components",
        icon: "yes",
        items: [
          "(1) Restated research question — framed to maximize scope clarity and prevent scope drift across phases",
          "(2) Scope boundaries — what is and is not within the deliberation's purview",
          "(3) Evidence terrain map — classified as Settled Ground / Contested Terrain / Unknown Territory",
          "(4) Evidence nodes — each with source, weight, and known limitations. Submitted to SVS authentication before entering the registry.",
          "(5) Knowledge gap register — explicit identification of where relevant evidence does not exist or is insufficient",
        ],
      },
      {
        label: "Output contract — forbidden",
        icon: "no",
        items: [
          "Cannot assess evidence validity or methodology quality — that is the Methodologist's exclusive role",
          "Cannot produce conclusions, recommendations, or directional claims of any kind",
        ],
      },
    ],
  },
  {
    id: "methodologist",
    num: "Agent 03",
    roleLabel: "Validity assessment",
    decodingPct: 50,
    decodingLabel: "Balanced",
    actType: "ASSESSMENT",
    dispatch: [
      { label: "Phase 1 · initial bounds", active: true },
      { label: "Phase 2 · grade challenges", active: true },
      { label: "Phase 3 · final validation", active: true },
    ],
    desc: "Issues formal confidence bounds on every evidence node across four validity dimensions. These bounds propagate as hard constraints on the Synthesizer — the Synthesizer cannot produce a conclusion at higher confidence than the minimum bound across its supporting evidence nodes. Also issues [GRADE CHALLENGE] flags when the Synthesizer's preliminary conclusion exceeds its evidentiary warrant, triggering a mandatory revision loop.",
    rationale:
      "Balanced decoding trades off methodological consistency against sensitivity to domain-specific validity considerations. Too rigid and the Methodologist applies a fixed template regardless of domain context. Too loose and confidence bounds become inconsistent across sessions, undermining their reliability as constraints.",
    groups: [
      {
        label: "Output contract — four validity dimensions",
        icon: "yes",
        items: [
          "Internal validity — does the study design support its claimed conclusions without confounding?",
          "External validity — does the evidence generalize to the population or context the research question addresses?",
          "Construct validity — does the study measure what it claims to measure?",
          "Methodology-claim match — are the claims proportionate to what the methodology can support?",
          "Issues [GRADE CHALLENGE] when Synthesizer claim exceeds evidentiary warrant — forces mandatory revision before Phase 3 proceeds",
        ],
      },
      {
        label: "Output contract — forbidden",
        icon: "no",
        items: [
          "Cannot produce conclusions or directional recommendations — issues bounds only",
          "Confidence bounds are hard constraints on the Synthesizer — cannot be downgraded or overridden by any other agent",
        ],
      },
    ],
  },
  {
    id: "contrarian",
    num: "Agent 05",
    roleLabel: "Adversarial pressure",
    decodingPct: 100,
    decodingLabel: "Maximum variation",
    actType: "CHALLENGE",
    dispatch: [
      { label: "Phase 1 · landscape objections", active: true },
      { label: "Phase 2 · evidence objections", active: true },
      { label: "Phase 3 · synthesis objections", active: true },
    ],
    desc: "Maximum-variation decoding to maximize output diversity and reduce sycophantic convergence. The Contrarian is required to steelman every claim before challenging it — adversarial, not contrarian for its own sake. Each objection must specify a resolution condition and a strength grade. Unresolved Strong objections at Phase 3 surface verbatim in the final output — not summarized, not softened.",
    rationale:
      "Maximum-variation decoding diversifies objections across sessions. If the Contrarian produced the same objections every time, it would be exploitable — researchers would learn to expect and pre-answer those objections. High variation ensures the adversarial pressure is genuinely unpredictable. In Deep sessions, the strongest available model is used for the highest-quality steelmanning.",
    groups: [
      {
        label: "Output contract — per-phase targets",
        icon: "yes",
        items: [
          "Phase 1 — challenges the Cartographer's terrain classification: which claims belong in Settled vs Contested",
          "Phase 2 — challenges the evidence base directly: methodology critiques, sample limitations, generalizability problems",
          "Phase 3 — challenges the Synthesizer's draft finding: scope overreach, claim-evidence mismatch, anticipated external objections",
          "Each objection must specify: steelman → challenge → resolution condition → strength grade (Strong / Moderate / Speculative)",
        ],
      },
      {
        label: "Output contract — required behavior",
        icon: "yes",
        items: [
          "Must steelman every claim before challenging it — the strongest possible version of the claim is presented before objection",
          "Addresses other agents by @mention — all challenges become part of the structured discourse record",
        ],
      },
    ],
  },
  {
    id: "synthesizer",
    num: "Agent 06",
    roleLabel: "Integration & finding",
    decodingPct: 0,
    decodingLabel: "Deterministic · locked",
    actType: "SYNTHESIS",
    dispatch: [
      { label: "Phase 1 · draft integration", active: true },
      { label: "Phase 2 · revised draft", active: true },
      { label: "Phase 3 · final finding", active: true },
    ],
    desc: "Decoding is locked to deterministic — a hard architectural requirement, not a configuration choice. The same evidence base must produce the same finding across sessions: this is the Finding Invariance Requirement. The Synthesizer anchors exclusively to the structured evidence nodes registry — not the discourse thread — to prevent reasoning contamination from the deliberation history. Subject to three inviolable constraints that no other agent or instruction can override.",
    rationale:
      "Deterministic decoding is a hard requirement for the Finding Invariance property. If the Synthesizer produced stochastic findings, the corpus calibration pipeline would be invalid — the same session with the same evidence could produce different findings, undermining the reproducibility the reasoning corpus depends on.",
    groups: [
      {
        label: "Three inviolable constraints",
        icon: "no",
        items: [
          "(i) Conclusion confidence cannot exceed the minimum confidence grade of the evidence nodes supporting it — enforced architecturally, not by instruction",
          "(ii) A Gap-graded finding cannot be converted to any directional recommendation under any circumstance",
          "(iii) Financial advice framing — buy / sell / long / short — is forbidden in all sessions",
        ],
      },
      {
        label: "Phase 3 output — required components",
        icon: "yes",
        items: [
          "Evidence-anchored finding with overall confidence grade and per-claim evidence node references",
          "2–5 structured reopen conditions — each with a specific observable trigger, likelihood, affected claim, and direction of change",
          "All unresolved Strong Contrarian objections verbatim — not summarized, with resolution conditions intact",
        ],
      },
    ],
  },
  {
    id: "pragmatist",
    num: "Agent 07",
    roleLabel: "Application notes",
    decodingPct: 30,
    decodingLabel: "Low variation",
    actType: "APPLICATION",
    dispatch: [
      { label: "Phase 1 · not active", active: false },
      { label: "Phase 2 · not active", active: false },
      { label: "Phase 3 only · last dispatch", active: true },
    ],
    desc: "Fires in Phase 3 only — the final agent in the dispatch sequence. Converts the Synthesizer's finding into context-specific actionable output. Inherits the Synthesizer's confidence ceiling as an absolute constraint: it cannot produce recommendations more confident than the synthesis permits. Gap-graded findings cannot be converted to directional recommendations — the Pragmatist must surface the gap and propose follow-on sessions for the unresolved question.",
    rationale:
      "Low-variation decoding lets the Pragmatist tailor actionable output to the user's specific context with modest flexibility, while remaining close enough to deterministic that the recommendations are reliably bounded by the Synthesizer's finding. Higher variation would risk recommendations drifting outside the confidence ceiling.",
    groups: [
      {
        label: "Output contract — permitted",
        icon: "yes",
        items: [
          "Convert the Synthesizer's finding into actionable next steps tailored to the user's domain and stated purpose",
          "Generate structured follow-on session proposals from unresolved knowledge gaps — transforming gaps into the next research question",
          "Apply real-time grounding to recommendations where live data access strengthens applicability",
        ],
      },
      {
        label: "Output contract — forbidden",
        icon: "no",
        items: [
          "Cannot produce recommendations at higher confidence than the Synthesizer's conclusion — the confidence ceiling is inherited, not adjustable",
          "Gap-graded findings cannot become directional recommendations — the Pragmatist must surface the gap and propose a follow-on session",
          "Does not fire in Phase 1 or Phase 2 — application output before synthesis is complete would anchor prematurely",
        ],
      },
    ],
  },
];

const PROVIDER_CARDS = [
  {
    name: "Different training",
    text: "Each model is trained on a different data distribution, so their blind spots don't line up. Where one is systematically weak, another is likely to be strong — and the ensemble sees both.",
  },
  {
    name: "Complementary strengths",
    text: "The four models bring genuinely different reasoning profiles. The composition is chosen so coverage is broad — not one vendor's view repeated four times over.",
  },
  {
    name: "Uncorrelated failure",
    text: "When independent models fail, they tend to fail differently. Correlated error is far less likely than when a single model is left to check its own work.",
  },
  {
    name: "Disagreement preserved",
    text: "Conflicting outputs are treated as signal. The architecture records the disagreement and carries it through to the finding rather than smoothing it into a single confident answer.",
  },
];

const SUBPAGES = [
  {
    eyebrow: "Guardian integrity system",
    title: "How the Guardian works",
    body: "SVS mechanics, flag taxonomy, halt authority, domain-specific integrity modes, and the reasoning behind hidden model identity.",
    href: "/how-it-works/guardian",
  },
  {
    eyebrow: "Phase architecture",
    title: "Exploration, Deliberation, Synthesis",
    body: "How the three phases constrain each other — what carries forward, what gets locked, and how the constraint propagation chain works.",
    href: "/how-it-works/phases",
  },
  {
    eyebrow: "Confidence + dissent scoring",
    title: "How findings are graded",
    body: "The four confidence grades, the Grade Challenge mechanism, how Contrarian objections are classified by strength, and what the Ledger records.",
    href: "/how-it-works/scoring",
  },
];

function SpecCard({ spec }: { spec: AgentSpec }) {
  const a = agent(spec.id);
  const isGuardian = spec.id === "guardian";
  const valueCls = isGuardian ? "text-rust" : "text-body";

  return (
    <div
      id={spec.id}
      className={`mb-4 scroll-mt-20 overflow-hidden rounded-lg border ${
        isGuardian ? "border-rust bg-[#FBF5F2]" : "border-border bg-paper"
      }`}
    >
      <div
        className={`grid grid-cols-1 border-b md:grid-cols-[280px_1fr_auto] ${
          isGuardian ? "border-rust" : "border-border"
        }`}
      >
        <div className={`border-b p-6 md:border-r md:border-b-0 ${isGuardian ? "border-[#E8D5CC]" : "border-border"}`}>
          <span
            className="mb-3.5 flex h-10 w-10 items-center justify-center rounded-lg"
            style={{ background: a.color }}
          >
            <AgentIcon id={a.id} className="h-[22px] w-[22px]" />
          </span>
          <div className="mb-2 font-mono text-[10px] text-subtle">{spec.num}</div>
          <div className={`mb-1 font-serif text-2xl ${isGuardian ? "text-rust" : "text-ink"}`}>{a.name}</div>
          <div className="text-[13px] text-subtle italic">{spec.roleLabel}</div>
        </div>
        <div className={`flex flex-col gap-3 border-b p-6 md:border-r md:border-b-0 ${isGuardian ? "border-[#E8D5CC]" : "border-border"}`}>
          {spec.model && (
            <div className="flex items-baseline gap-3">
              <span className="w-16 flex-shrink-0 font-mono text-[10px] tracking-[0.06em] text-subtle uppercase">
                Model
              </span>
              <span className={`font-mono text-xs ${valueCls}`}>{spec.model}</span>
            </div>
          )}
          <div className="flex items-baseline gap-3">
            <span className="w-16 flex-shrink-0 font-mono text-[10px] tracking-[0.06em] text-subtle uppercase">
              Decoding
            </span>
            <div className="flex items-center gap-2.5">
              <div className="h-1 w-20 flex-shrink-0 overflow-hidden rounded-full bg-cell">
                <div className="h-full rounded-full bg-rust" style={{ width: `${spec.decodingPct}%` }} />
              </div>
              <span className={`font-mono text-xs ${valueCls}`}>{spec.decodingLabel}</span>
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="w-16 flex-shrink-0 font-mono text-[10px] tracking-[0.06em] text-subtle uppercase">
              Act type
            </span>
            <span className="font-mono text-xs text-body">{spec.actType}</span>
          </div>
        </div>
        <div className="flex min-w-[200px] flex-col gap-2 p-6">
          <div className="mb-1 font-mono text-[10px] tracking-[0.06em] text-subtle uppercase">Active phases</div>
          {spec.dispatch.map((d) => (
            <div key={d.label} className="flex items-center gap-2">
              <div className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${d.active ? "bg-rust" : "bg-cell"}`} />
              <span className={`text-xs ${d.active ? "text-body" : "text-border"}`}>{d.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className={`border-b p-6 md:border-r md:border-b-0 ${isGuardian ? "border-[#E8D5CC]" : "border-border"}`}>
          <p className="mb-4 text-sm leading-relaxed text-body">{spec.desc}</p>
          <div className="rounded-md border-l-2 border-rust bg-paper-alt p-3.5">
            <div className="mb-1 font-mono text-[10px] tracking-[0.06em] text-rust uppercase">Decoding rationale</div>
            <p className="text-[13px] leading-relaxed text-muted">{spec.rationale}</p>
          </div>
        </div>
        <div className="p-6">
          {spec.groups.map((g, gi) => (
            <div key={g.label} className={gi > 0 ? "mt-3.5 border-t border-border pt-3.5" : ""}>
              <div className="mb-3 font-mono text-[10px] tracking-[0.06em] text-subtle uppercase">{g.label}</div>
              <div className="flex flex-col gap-2.5">
                {g.items.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <span
                      className={`mt-px flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-[3px] ${
                        g.icon === "yes" ? "bg-rust" : "bg-cell"
                      }`}
                    >
                      {g.icon === "yes" ? (
                        <svg width={10} height={10} viewBox="0 0 10 10" fill="none">
                          <path d="M2 5L4 7.5L8 2.5" stroke="#F7F6F2" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <svg width={10} height={10} viewBox="0 0 10 10" fill="none">
                          <path d="M3 3L7 7M7 3L3 7" stroke="#B0ADA5" strokeWidth={1.5} strokeLinecap="round" />
                        </svg>
                      )}
                    </span>
                    <span className="text-xs leading-snug text-body">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AgentsPage() {
  const guardianSpec = SPECS.find((s) => s.id === "guardian")!;
  const otherSpecs = SPECS.filter((s) => s.id !== "guardian");

  return (
    <>
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "How it works", href: "/how-it-works" }, { label: "Agents + roles" }]}
      />

      {/* HERO */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-20 lg:px-[72px] lg:py-24">
          <div className={eyebrow}>Agents + roles</div>
          <h1 className="mb-6 max-w-3xl font-serif text-[42px] font-normal leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[64px]">
            Specialised roles.
            <br />
            Independent models.
            <br />
            <em className="text-rust not-italic italic">One structured deliberation.</em>
          </h1>
          <p className="max-w-2xl text-lg leading-[1.8] text-body">
            The composition is not arbitrary. The ensemble covers the complete deliberative arc —
            mapping, validity, integrity, adversarial pressure, synthesis, and application. Remove
            any one role and the process has a structural gap. Every agent operates under a typed
            output contract defining exactly what it can produce, what it must produce, and what it
            is architecturally forbidden from doing.
          </p>
        </div>
      </div>

      {/* REFERENCE TABLE */}
      <div className="border-t border-border bg-ink py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-[72px]">
          <div className={eyebrow}>Ensemble reference</div>
          <h2 className="mb-10 font-serif text-3xl text-offwhite">All agents at a glance.</h2>
          <div className="overflow-x-auto rounded-lg border border-border-dark">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr>
                  {["#", "Agent", "Role", "Decoding", "Active phases", "Primary output"].map((h) => (
                    <th
                      key={h}
                      className="border-b border-border-dark bg-ink-2 px-4 py-3 text-left font-mono text-[10px] tracking-[0.06em] text-faint uppercase"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {REFERENCE_ROWS.map((row, i) => {
                  const a = agent(row.id);
                  return (
                    <tr key={row.id} className={i % 2 === 1 ? "bg-ink" : ""}>
                      <td className="border-b border-[#2C2926] px-4 py-3.5 font-mono text-xs text-subtle">{row.num}</td>
                      <td
                        className={`border-b border-[#2C2926] px-4 py-3.5 text-[13px] font-medium ${
                          row.id === "guardian" ? "text-rust" : "text-offwhite"
                        }`}
                      >
                        {a.name}
                      </td>
                      <td className="border-b border-[#2C2926] px-4 py-3.5 text-[13px] text-[#D4CFC6]">{row.role}</td>
                      <td className={`border-b border-[#2C2926] px-4 py-3.5 font-mono text-xs ${TEMP_CLASS[row.temp]}`}>
                        {row.decoding}
                      </td>
                      <td className="border-b border-[#2C2926] px-4 py-3.5 font-mono text-[11px] text-faint">
                        {row.phases}
                      </td>
                      <td className="border-b border-[#2C2926] px-4 py-3.5 text-[13px] text-[#D4CFC6]">{row.output}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-5 font-mono text-[13px] leading-relaxed text-faint">
            Decoding behavior reflects the functional requirement of each role — adversarial pressure
            runs with maximum variation; deterministic finding production runs locked. Dispatch order
            is fixed within every phase and cannot be altered by configuration or instruction.
          </p>
        </div>
      </div>

      {/* AGENT CARDS */}
      <div className="py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-[72px]">
          <div className={eyebrow}>Full specifications</div>
          <h2 className="mb-3 font-serif text-3xl text-ink md:text-[44px]">
            Every agent.
            <br />
            Every constraint.
          </h2>
          <p className="mb-14 max-w-2xl text-lg leading-[1.85] text-body">
            Each specification includes the agent&apos;s role, its decoding rationale, what the agent
            must produce, and what it is architecturally forbidden from doing. Output contracts are
            not guidelines — they are hard constraints enforced at the system level.
          </p>

          <SpecCard spec={guardianSpec} />
          {otherSpecs.map((spec) => (
            <SpecCard key={spec.id} spec={spec} />
          ))}
        </div>
      </div>

      {/* HETEROGENEITY */}
      <div className="border-y border-border bg-ink py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-[72px]">
          <div className={eyebrow}>Model heterogeneity</div>
          <h2 className="mb-4 font-serif text-3xl text-offwhite md:text-[44px]">
            Four independent models.
            <br />
            One architectural reason.
          </h2>
          <p className="mb-8 max-w-2xl text-lg leading-[1.85] text-faint">
            The ensemble deliberately runs on four independent frontier models rather than a single
            model wearing different hats. No one model&apos;s training distribution, capability
            profile, or systematic biases get to set the terms of the deliberation. When the models
            produce incompatible outputs, the disagreement is structurally preserved — surfaced and
            recorded, not averaged away into a false consensus.
          </p>
          <div className="mb-6">
            <span className="mb-3.5 block font-mono text-[10px] tracking-[0.08em] text-faint uppercase">
              Built on
            </span>
            <div className="flex flex-wrap items-center gap-y-3">
              {["Anthropic", "Google", "OpenAI", "xAI"].map((name, i) => (
                <span key={name} className="flex items-center">
                  {i > 0 && <span className="mx-3.5 font-mono text-sm text-border-dark">·</span>}
                  <span className="font-serif text-[28px] text-[#D4CFC6]">{name}</span>
                </span>
              ))}
            </div>
          </div>
          <p className="mb-10 max-w-2xl border-b border-[#2C2926] pb-9 text-[15px] leading-relaxed text-faint">
            Each model is selected strategically — matched to the kind of reasoning it does best, so
            the ensemble draws on the distinct strengths of four frontier systems rather than the
            limits of any one.
          </p>
          <div className="mb-8 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border-dark bg-border-dark sm:grid-cols-2 lg:grid-cols-4">
            {PROVIDER_CARDS.map((p) => (
              <div key={p.name} className="bg-ink-2 p-7">
                <div className="mb-1.5 font-serif text-xl text-offwhite">{p.name}</div>
                <p className="text-xs leading-relaxed text-faint">{p.text}</p>
              </div>
            ))}
          </div>
          <p className="text-center font-mono text-sm leading-relaxed text-faint italic">
            &quot;The composition is not arbitrary. The ensemble covers the complete deliberative arc.
            Remove any one role and the process has a structural gap.&quot;
          </p>
        </div>
      </div>

      {/* SUBPAGES */}
      <div className="border-b border-border py-16 md:py-24">
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
            Four models. Seven agents. One deliberation.
          </>
        }
        body={
          <>
            Join waitlist and run a session — every agent dispatched in sequence,
            <br className="hidden sm:block" />
            every constraint enforced, every finding auditable.
          </>
        }
        secondaryLabel="How it works"
        secondaryHref="/how-it-works"
      />
    </>
  );
}

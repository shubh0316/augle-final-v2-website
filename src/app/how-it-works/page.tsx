import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CtaBanner } from "@/components/CtaBanner";
import { AGENTS } from "@/data/agents";
import { AgentIcon } from "@/components/AgentIcon";
import { eyebrow, sectionTitle } from "@/lib/styles";

export const metadata: Metadata = {
  title: "How Augle Works | 7-Agent AI Research & Fact-Checking Process",
  description:
    "See how Augle's seven AI agents debate, verify, and grade evidence in three phases — Exploration, Deliberation, Synthesis — before producing a calibrated finding.",
};

const HERO_LINKS = [
  { label: "Phase architecture", href: "/how-it-works/phases" },
  { label: "Agents + roles", href: "/how-it-works/agents" },
  { label: "Guardian system", href: "/how-it-works/guardian" },
  { label: "Confidence + dissent scoring", href: "/how-it-works/scoring" },
];

const DISPATCH = [
  { name: "Topic Architect", sub: "orchestration", rust: true },
  { name: "Cartographer", sub: "landscape" },
  { name: "Methodologist", sub: "validity" },
  { name: "Guardian", sub: "phase boundaries", rust: true },
  { name: "Contrarian", sub: "adversarial" },
  { name: "Synthesizer", sub: "conclusion" },
  { name: "Pragmatist", sub: "phase 3 only" },
];

function agent(id: string) {
  const a = AGENTS.find((x) => x.id === id);
  if (!a) throw new Error(`Unknown agent id: ${id}`);
  return a;
}

const PHASES = [
  {
    num: "Phase 1 · Exploration",
    name: "Map the terrain",
    body: "The Cartographer decomposes the question into settled ground, contested terrain, and unknown territory — producing evidence nodes with preliminary confidence bounds. The Methodologist evaluates validity of each node across four dimensions. The Guardian authenticates every source in real time.",
    agents: [
      { id: "topic-architect", role: "init" },
      { id: "cartographer", role: "landscape map" },
      { id: "methodologist", role: "confidence bounds" },
      { id: "guardian", role: "SVS · phase boundary" },
      { id: "contrarian", role: "landscape objections" },
      { id: "synthesizer", role: "draft integration" },
    ],
  },
  {
    num: "Phase 2 · Deliberation",
    name: "Apply adversarial pressure",
    body: "The Contrarian re-engages with a steelmanned version of every claim before challenging it. Each objection must specify a resolution condition and a strength classification — Strong, Moderate, or Speculative. Unresolved Strong objections carry forward to Phase 3 verbatim.",
    agents: [
      { id: "cartographer", role: "evidence update" },
      { id: "methodologist", role: "grade challenges" },
      { id: "guardian", role: "SVS · phase boundary" },
      { id: "contrarian", role: "evidence objections" },
      { id: "synthesizer", role: "revised draft" },
    ],
  },
  {
    num: "Phase 3 · Synthesis",
    name: "Produce the finding",
    body: "The Synthesizer anchors its conclusion exclusively to the structured evidence nodes registry — not the discourse thread. Temperature is locked at 0.0 for deterministic output. The Pragmatist converts the finding into actionable next steps within the Synthesizer's confidence ceiling.",
    agents: [
      { id: "guardian", role: "final integrity check" },
      { id: "contrarian", role: "synthesis objections" },
      { id: "synthesizer", role: "final finding · T=0.0" },
      { id: "pragmatist", role: "actionable output" },
    ],
  },
];

type AgentCardData = {
  id: string;
  roleBadge: string;
  model: string;
  tempPct: number;
  tempLabel: string;
  desc: string;
  permitted?: string[];
  forbidden?: string[];
};

const GUARDIAN_CARD: AgentCardData = {
  id: "guardian",
  roleBadge: "Independent integrity layer",
  model: "Claude Sonnet 4.6 · identity hidden",
  tempPct: 10,
  tempLabel: "T = 0.1",
  desc: "The Guardian operates exclusively at phase boundaries. It does not produce research findings or participate in deliberation. Its model identity is hidden from all user-facing surfaces — including the other agents — to prevent anchoring effects. It holds halt authority over the entire session.",
  permitted: [
    "Source Verification Service — authenticates every citation across all three phases in real time",
    "Issues flags with halt authority — can pause or terminate a session based on integrity violations",
    "Domain-specific integrity modes: academic, legal, clinical, financial, editorial",
  ],
  forbidden: [
    "Cannot produce research findings, conclusions, or directional recommendations",
    "Cannot participate in deliberation discourse between agents",
    "Model identity never surfaced to users or research agents — prevents anchoring",
  ],
};

const AGENT_CARDS: AgentCardData[] = [
  {
    id: "topic-architect",
    roleBadge: "Session orchestration",
    model: "Claude Sonnet 4.6",
    tempPct: 20,
    tempLabel: "T = 0.2",
    desc: "The only agent with a direct user-facing interface. Fires once at session initialization. Manages dispatch sequencing, phase transitions, and final delivery. Explicitly forbidden from editorializing or softening any agent's output.",
    forbidden: [
      "Cannot editorialize, soften, or reframe any agent output",
      "Does not participate in research discourse",
    ],
  },
  {
    id: "cartographer",
    roleBadge: "Landscape mapping",
    model: "Gemini 3.1 Pro",
    tempPct: 80,
    tempLabel: "T = 0.8",
    desc: "Dispatched first in every phase. Produces a five-component landscape: restated question, scope boundaries, evidence terrain map (settled / contested / unknown), evidence nodes with source and limitations, and a knowledge gap register.",
    forbidden: ["Cannot assess evidence validity", "Cannot produce conclusions of any kind"],
  },
  {
    id: "methodologist",
    roleBadge: "Validity assessment",
    model: "GPT-4o",
    tempPct: 50,
    tempLabel: "T = 0.5",
    desc: "Evaluates each evidence node across four dimensions: internal validity, external validity, construct validity, and methodology-claim match. Issues confidence bounds — Established, Probable, Contested, or Gap — as hard constraints on the Synthesizer. Cannot be overridden.",
    forbidden: [
      "Cannot produce conclusions or directional recommendations",
      "Confidence bounds are architectural constraints — not suggestions",
    ],
  },
  {
    id: "contrarian",
    roleBadge: "Adversarial pressure",
    model: "Claude Sonnet 4.6 / Opus 4.6",
    tempPct: 100,
    tempLabel: "T = 1.0",
    desc: "Runs at maximum temperature to maximize output variation and reduce sycophantic convergence. Must steelman every claim before challenging it. Each objection specifies a resolution condition and a strength grade. Unresolved Strong objections appear verbatim in the final output.",
    permitted: [
      "Must steelman every claim before challenging it — adversarial, not contrarian for its own sake",
      "Addresses other agents by @mention — a structured discourse record",
    ],
  },
  {
    id: "synthesizer",
    roleBadge: "Conclusion + finding",
    model: "GPT-4o",
    tempPct: 0,
    tempLabel: "T = 0.0",
    desc: "Temperature is locked at zero — a hard architectural requirement for deterministic verdict production. Anchors its conclusion exclusively to the structured evidence nodes registry, not the discourse thread. Subject to three inviolable constraints that cannot be overridden by any other agent.",
    forbidden: [
      "Conclusion cannot exceed the confidence grade of its supporting evidence",
      "Insufficient Evidence findings cannot be converted to any directional recommendation",
      "Financial advice framing (buy / sell / long / short) is forbidden in all modes",
    ],
  },
  {
    id: "pragmatist",
    roleBadge: "Application notes",
    model: "Grok 4.1 Fast",
    tempPct: 30,
    tempLabel: "T = 0.3",
    desc: "Fires in Phase 3 only. Converts the Synthesizer's finding into actionable output tailored to the user's specific context. Inherits the Synthesizer's confidence ceiling as an absolute constraint — cannot produce recommendations more confident than the synthesis permits.",
    forbidden: [
      "Cannot exceed the Synthesizer's confidence ceiling",
      "Does not fire in Phase 1 or Phase 2",
    ],
  },
];

const GRADES = [
  {
    label: "Established",
    cls: "bg-conf-high-bg text-conf-high-text",
    text: "Replicated across multiple independent studies using sound methodology. The Synthesizer can anchor high-confidence findings to Established nodes.",
  },
  {
    label: "Probable",
    cls: "bg-[#E8F0F8] text-[#2A4A7A]",
    text: "Well-supported by available evidence but with material limitations — sample size, methodology constraints, or limited replication. The ceiling for most real-world findings.",
  },
  {
    label: "Contested",
    cls: "bg-conf-med-bg text-conf-med-text",
    text: "Evidence exists on multiple sides without clear resolution. The Synthesizer cannot produce a directional finding from Contested nodes — the finding reflects the contestation.",
  },
  {
    label: "Gap",
    cls: "bg-conf-contested-bg text-conf-contested-text",
    text: "The relevant evidence does not exist, has not been studied, or cannot be sourced. Gap findings are a product output — not a failure state. They tell you what isn't knowable yet.",
  },
];

const DISSENT = [
  {
    from: "@Contrarian → @Synthesizer",
    strength: "Strong · Unresolved",
    cls: "bg-svs-flagged-bg text-rust",
    text: '"The notification-triggered self-report measures post-interruption attentional recovery, not naturalistic attention — causally distinct constructs. The thesis conflates them throughout."',
    resolution:
      "Resolution condition: Direct comparison study of notification-triggered vs. researcher-initiated ESM on attentional outcomes",
  },
  {
    from: "@Contrarian → @Cartographer",
    strength: "Moderate · Resolved",
    cls: "bg-[#2C2820] text-[#C79233]",
    text: '"The innovation claim may not be differentiated from the 2024 Friederici lab publication with functionally equivalent architecture."',
    resolution: "Resolved: Innovation reframed to structural differentiation in Phase 2",
  },
  {
    from: "@Contrarian → @Methodologist",
    strength: "Speculative · Noted",
    cls: "bg-[#1E2428] text-[#6A9AAA]",
    text: '"The 3-item Likert operationalisation of attentional state has no published reliability data for smartphone delivery contexts."',
    resolution: "Resolution condition: Psychometric validation study for smartphone-delivered attentional measures",
  },
];

const SUBPAGES = [
  {
    eyebrow: "Guardian integrity system",
    title: "How the Guardian works",
    body: "Source Verification Service, flag classification, halt authority, domain-specific integrity modes, and the reasoning behind hidden model identity.",
    href: "/how-it-works/guardian",
  },
  {
    eyebrow: "Phase architecture",
    title: "Exploration, Deliberation, Synthesis",
    body: "The full phase-by-phase breakdown — what each agent produces, what constraints carry forward, and how the structured output protocol works across rounds.",
    href: "/how-it-works/phases",
  },
  {
    eyebrow: "Agents + roles",
    title: "All agents in detail",
    body: "Full specifications for each agent — model assignment, temperature rationale, permitted actions, forbidden actions, and dispatch order logic.",
    href: "/how-it-works/agents",
  },
  {
    eyebrow: "Confidence + dissent scoring",
    title: "How findings are graded",
    body: "The four confidence grades, how the Methodologist issues them as hard constraints, how Contrarian objections are classified and preserved, and what the Ledger records.",
    href: "/how-it-works/scoring",
  },
];

function AgentCardBlock({ card, full }: { card: AgentCardData; full?: boolean }) {
  const a = agent(card.id);
  const isGuardian = card.id === "guardian";
  return (
    <div
      className={`rounded-lg border p-6 ${
        isGuardian ? "border-rust bg-[#FBF5F2]" : "border-border bg-paper"
      } ${full ? "grid grid-cols-1 gap-8 md:grid-cols-2" : ""}`}
    >
      <div>
        <div className="mb-3 flex items-center gap-2.5">
          <span
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
            style={{ background: a.color }}
          >
            <AgentIcon id={a.id} className="h-4 w-4" />
          </span>
          <div>
            <div className="font-mono text-[10px] tracking-[0.06em] text-subtle uppercase">
              {card.roleBadge}
            </div>
            <div className={`font-serif text-xl ${isGuardian ? "text-rust" : "text-ink"}`}>{a.name}</div>
          </div>
        </div>
        <div className="mb-3.5 flex items-center gap-2 border-b border-border pb-3.5">
          <span className="font-mono text-[11px] text-body">{card.model}</span>
          <div className="h-[3px] max-w-[60px] flex-1 overflow-hidden rounded-full bg-cell">
            <div className="h-full rounded-full bg-rust" style={{ width: `${card.tempPct}%` }} />
          </div>
          <span className="font-mono text-[11px] whitespace-nowrap text-subtle">{card.tempLabel}</span>
        </div>
        <p className="text-[13px] leading-relaxed text-body">{card.desc}</p>
      </div>
      <div className="mt-4 flex flex-col gap-1.5 md:mt-0">
        {card.permitted?.map((text) => (
          <div key={text} className="flex items-start gap-2">
            <span className="mt-0.5 font-mono text-[10px] text-rust">✓</span>
            <span className="text-xs leading-snug text-muted">{text}</span>
          </div>
        ))}
        {card.forbidden?.map((text) => (
          <div key={text} className="flex items-start gap-2">
            <span className="mt-0.5 font-mono text-[10px] text-subtle">✗</span>
            <span className="text-xs leading-snug text-muted">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <>
      {/* <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "How it works" }]} /> */}

      {/* HERO */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-20 lg:px-[72px] lg:py-24">
          <div className={eyebrow}>The ensemble explained</div>
          <h1 className="mb-6 max-w-3xl font-serif text-[42px] font-normal leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-[64px]">
            The agents.
            <br />
            Three phases.
            <br />
            <em className="text-rust not-italic italic">One structured deliberation.</em>
          </h1>
          <p className="mb-10 max-w-2xl text-lg leading-[1.8] text-body">
            Augle doesn&apos;t ask a single model for an answer. It routes your question through a
            multi-agent ensemble — each agent with a defined role, fixed dispatch order, and typed
            output contract — across three deliberation phases before any finding is produced.
          </p>
          <div className="flex flex-wrap gap-2">
            {HERO_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded border border-border bg-paper px-4 py-2 text-[13px] text-muted transition-colors hover:border-rust hover:text-rust"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* DISPATCH ORDER STRIP */}
      <div className="overflow-x-auto bg-ink px-5 py-5 md:px-10 lg:px-[72px]">
        <div className="mx-auto flex max-w-[1280px] items-center">
          {DISPATCH.map((d, i) => (
            <Fragment key={d.name}>
              <div className="flex min-w-0 flex-col items-center px-2 lg:flex-1">
                <span className={`text-[11px] font-medium whitespace-nowrap ${d.rust ? "text-rust" : "text-offwhite"}`}>
                  {d.name}
                </span>
                <span className="font-mono text-[10px] whitespace-nowrap text-faint">{d.sub}</span>
              </div>
              {i < DISPATCH.length - 1 && <span className="flex-shrink-0 px-1 text-base text-faint">→</span>}
            </Fragment>
          ))}
        </div>
      </div>

      {/* PHASE ARCHITECTURE */}
      <div className="bg-ink py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-[72px]">
          <div className={eyebrow}>Phase architecture</div>
          <h2 className="mb-3 max-w-2xl font-serif text-3xl leading-[1.15] text-offwhite md:text-[44px]">
            Three phases. Each one builds on the last.
          </h2>
          <p className="mb-14 max-w-2xl text-base leading-[1.75] text-faint">
            Agents don&apos;t run in parallel. Each phase produces a structured output that constrains
            the next. The Methodologist&apos;s confidence bounds become hard limits on the
            Synthesizer. The Contrarian&apos;s unresolved objections surface verbatim in the final
            finding.
          </p>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border-dark bg-border-dark md:grid-cols-3">
            {PHASES.map((phase) => (
              <div key={phase.num} className="bg-ink-2 p-8">
                <div className="mb-4 font-mono text-[10px] tracking-[0.08em] text-rust uppercase">
                  {phase.num}
                </div>
                <div className="mb-4 font-serif text-[22px] text-offwhite">{phase.name}</div>
                <p className="mb-5 text-[13px] leading-[1.75] text-faint">{phase.body}</p>
                <div className="flex flex-col gap-2">
                  {phase.agents.map((pa) => {
                    const a = agent(pa.id);
                    return (
                      <div key={pa.id} className="flex items-center gap-2.5 rounded bg-ink px-2.5 py-2">
                        <span
                          className="h-[7px] w-[7px] flex-shrink-0 rounded-full"
                          style={{ background: a.color }}
                        />
                        <span className={`text-[11px] font-medium ${pa.id === "guardian" ? "text-rust" : "text-[#D4CFC6]"}`}>
                          {a.name}
                        </span>
                        <span className="ml-auto font-mono text-[10px] whitespace-nowrap text-faint">
                          {pa.role}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AGENTS */}
      <div className="border-y border-border bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-[72px]">
          <div className="mb-12 max-w-2xl">
            <div className={eyebrow}>The agents</div>
            <h2 className={`${sectionTitle} mb-4`}>
              Each agent has one job.
              <br />
              None of them can exceed it.
            </h2>
            <p className="text-lg leading-[1.85] text-body">
              Every agent operates under strict typed output contracts — permitted actions and
              forbidden actions are architectural constraints, not guidelines. No agent can produce
              conclusions outside its role. No agent can exceed the confidence ceiling set by the
              Methodologist.
            </p>
          </div>
          <div className="mb-3">
            <AgentCardBlock card={GUARDIAN_CARD} full />
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {AGENT_CARDS.map((card) => (
              <AgentCardBlock key={card.id} card={card} />
            ))}
          </div>
        </div>
      </div>

      {/* CONFIDENCE + DISSENT */}
      <div className="py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-[72px]">
          <div className={eyebrow}>Confidence + dissent scoring</div>
          <h2 className={`${sectionTitle} mb-4`}>
            Every finding is graded.
            <br />
            Every objection is preserved.
          </h2>
          <p className="mb-12 max-w-2xl text-lg leading-[1.85] text-body">
            Augle doesn&apos;t produce a single confidence score — it produces a structured evidence
            record. Each node carries a grade issued by the Methodologist. Each unresolved objection
            from the Contrarian appears verbatim in the output alongside the finding that triggered it.
          </p>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-4 font-mono text-[10px] tracking-[0.08em] text-subtle uppercase">
                Evidence confidence grades
              </p>
              <div className="flex flex-col gap-2.5">
                {GRADES.map((g) => (
                  <div key={g.label} className="flex items-start gap-4 rounded-md border border-border bg-paper p-4">
                    <span className={`mt-px flex-shrink-0 rounded font-mono text-[11px] px-2.5 py-1 whitespace-nowrap ${g.cls}`}>
                      {g.label}
                    </span>
                    <span className="text-[13px] leading-relaxed text-body">{g.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-4 font-mono text-[10px] tracking-[0.08em] text-subtle uppercase">
                Contrarian objections · live session
              </p>
              <div className="rounded-lg bg-ink p-6">
                <div className="mb-4 font-mono text-[10px] tracking-[0.08em] text-rust uppercase">
                  Unresolved objections · Phase 3
                </div>
                <div className="flex flex-col">
                  {DISSENT.map((d, i) => (
                    <div
                      key={d.from + d.strength}
                      className={`py-3.5 ${i < DISSENT.length - 1 ? "border-b border-border-dark" : ""}`}
                    >
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <span className="font-mono text-[11px] text-[#D4CFC6]">{d.from}</span>
                        <span className={`flex-shrink-0 rounded font-mono text-[10px] whitespace-nowrap px-2 py-0.5 ${d.cls}`}>
                          {d.strength}
                        </span>
                      </div>
                      <p className="mb-1.5 text-xs leading-relaxed text-faint italic">{d.text}</p>
                      <p className="font-mono text-[11px] text-faint">{d.resolution}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODES */}
      <div className="border-y border-border bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-[72px]">
          <div className={eyebrow}>The engine</div>
          <h2 className={`${sectionTitle} mb-4`}>One engine. Built for research questions.</h2>
          <p className="mb-12 max-w-2xl text-lg leading-[1.85] text-body">
            The multi-agent ensemble runs the same way every session. What adapts is the
            Guardian&apos;s domain-specific integrity configuration, tuned to the field the question
            sits in.
          </p>
          <div className="max-w-2xl rounded-lg border border-border bg-cream p-7">
            <div className="mb-1 font-serif text-[22px] text-ink">Academia</div>
            <div className="mb-4 font-mono text-[13px] text-rust italic">For open research questions</div>
            <p className="mb-5 text-sm leading-relaxed text-body">
              Designed for the research questions that don&apos;t resolve to a binary outcome — grant
              applications, dissertation defences, policy analysis, clinical evidence reviews,
              investment thesis validation. Document ingestion supported. Guardian operates in
              domain-specific integrity mode.
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2.5">
                <span className="w-20 flex-shrink-0 font-mono text-[10px] tracking-[0.06em] text-subtle uppercase">
                  Output
                </span>
                <span className="text-[13px] text-body">
                  Evidence-anchored finding with confidence grade and actionable next steps
                </span>
              </div>
              <div className="flex gap-2.5">
                <span className="w-20 flex-shrink-0 font-mono text-[10px] tracking-[0.06em] text-subtle uppercase">
                  Documents
                </span>
                <span className="text-[13px] text-body">
                  Uploaded papers, methodology chapters, grant drafts, case documents · PDF or DOCX
                </span>
              </div>
              <div className="flex gap-2.5">
                <span className="w-20 flex-shrink-0 font-mono text-[10px] tracking-[0.06em] text-subtle uppercase">
                  Guardian
                </span>
                <span className="text-[13px] text-body">
                  Academic, legal, clinical, financial, or editorial integrity mode
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SUB-PAGE LINKS */}
      <div className="py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-[72px]">
          <div className={eyebrow}>Go deeper</div>
          <h2 className={`${sectionTitle} mb-10`}>The full technical picture.</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {SUBPAGES.map((sp) => (
              <Link
                key={sp.href}
                href={sp.href}
                className="block rounded-lg border border-border bg-paper p-6 transition-colors hover:border-rust"
              >
                <div className="mb-2.5 font-mono text-[10px] tracking-[0.06em] text-rust uppercase">
                  {sp.eyebrow}
                </div>
                <div className="mb-2 font-serif text-xl text-ink">{sp.title}</div>
                <p className="mb-4 text-[13px] leading-relaxed text-muted">{sp.body}</p>
                <span className="text-xs font-medium text-rust">Read more →</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <CtaBanner
        title="See it in action."
        body="Join waitlist and run a session on a question that matters to your work."
        secondaryLabel="Browse outcomes"
        secondaryHref="/outcomes"
      />
    </>
  );
}

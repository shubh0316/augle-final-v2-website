"use client";

import { useState } from "react";
import Link from "next/link";
import { eyebrow } from "@/lib/styles";

interface Term {
  id: string;
  name: string;
  def: string;
  tags: string[];
}

const TERMS: Term[] = [
  {
    id: "ai-deliberation",
    name: "Augmented deliberation",
    def: "The process by which AI agents systematically enhance human deliberative reasoning — structuring evidence, applying adversarial pressure, enforcing methodological standards, and producing calibrated confidence grades. Distinct from AI-generated answers: augmented deliberation preserves and strengthens the deliberative process rather than replacing it.",
    tags: ["Foundational", "Architecture"],
  },
  {
    id: "ensemble-intelligence",
    name: "Multi-agent ensemble",
    def: "Augle's core architecture: specialised AI agents (Guardian, Topic Architect, Cartographer, Methodologist, Contrarian, Synthesizer, Pragmatist) working in structured sequence across three phases. Each agent has a defined role, temperature setting, and output constraint. The ensemble is designed to surface disagreement and uncertainty rather than suppress it.",
    tags: ["Architecture", "Agents"],
  },
  {
    id: "guardian-system",
    name: "Guardian system",
    def: "The integrity layer that operates before and throughout every Augle session. The Guardian validates source citations, checks retraction databases, monitors scope adherence, and issues phase boundary clearances. Its verification protocol adapts to the question's domain — academic, legal, clinical, financial, or editorial integrity — each with its own domain-specific checks. The Guardian's own model identity is never disclosed on any surface.",
    tags: ["Guardian", "Integrity"],
  },
  {
    id: "confidence-grade",
    name: "Confidence grade",
    def: "Augle's four-level calibration scale: Established, Probable, Contested, and Gap. Grades are propagated from individual evidence nodes to the session finding via the Methodologist's ceiling constraint. A finding cannot exceed the highest grade that the evidence base supports. Grades are not scores — they represent qualitative epistemic states, not percentages.",
    tags: ["Calibration", "Output"],
  },
  {
    id: "svs",
    name: "SVS · Structured Verification System",
    def: "A background verification service that runs on every evidence node as it's added to a session. SVS classifies each source into one of four identifier types — URL, DOI, arXiv ID, or ISBN — and resolves it through the matching verification path: an existence check for URLs, and an existence plus content-match check for DOI, arXiv, and ISBN sources. A source that can't be verified downgrades its node from Established to Probable; a source that fails resolution entirely downgrades it to Contested. SVS never adds or removes evidence — it only verifies what's already there.",
    tags: ["Guardian", "Verification"],
  },
  {
    id: "contrarian-agent",
    name: "Contrarian agent",
    def: "The adversarial agent in the Augle ensemble. The Contrarian operates at maximum temperature and is required to steelman every position before challenging it. It raises objections graded Strong, Moderate, or Speculative, each with a specified resolution condition. Unresolved Strong objections are preserved verbatim in the session output.",
    tags: ["Agents", "Adversarial"],
  },
  {
    id: "cartographer-agent",
    name: "Cartographer agent",
    def: "The terrain-mapping agent. The Cartographer classifies every evidence domain as Settled, Contested, or Unknown — producing the evidential landscape that all subsequent agents build on. It identifies knowledge gaps that enter the evidence registry and may generate follow-on session proposals.",
    tags: ["Agents", "Terrain"],
  },
  {
    id: "methodologist-agent",
    name: "Methodologist agent",
    def: "The evidence validity agent. The Methodologist assesses construct validity, external validity, and internal validity for every evidence node. It issues confidence ceilings — hard constraints that prevent any finding from exceeding the grade the evidence supports. It monitors for causal inference errors, population scope mismatches, and statistical misrepresentation.",
    tags: ["Agents", "Validity"],
  },
  {
    id: "synthesizer-agent",
    name: "Synthesizer agent",
    def: "The finding-production agent. The Synthesizer operates at T=0.0 (deterministic) and produces the session finding anchored exclusively to the evidence nodes registry — not the deliberation discourse. It cannot elevate a finding above the Methodologist's ceiling. It carries all unresolved objections forward verbatim.",
    tags: ["Agents", "Output"],
  },
  {
    id: "pragmatist-agent",
    name: "Pragmatist agent",
    def: "The actionability agent. The Pragmatist inherits the Synthesizer's confidence ceiling and translates the finding into actionable steps, monitoring variables, and follow-on session proposals — all within the constraints the evidence supports. It does not produce financial or investment advice.",
    tags: ["Agents", "Actionability"],
  },
  {
    id: "academia",
    name: "Academia",
    def: "Augle's public research product — open research questions across academic, policy, legal, and clinical domains, where the finding is the confidence grade itself rather than a binary resolution. Reopen conditions are triggered by new evidence or publications. Academia is the sole public-facing product; internal calibration work against real-world prediction markets is never exposed to Academia users.",
    tags: ["Product"],
  },
  {
    id: "reopen-conditions",
    name: "Reopen conditions",
    def: "Structured triggers defined at session close that specify what new information would require the session's finding to be revised. Each reopen condition includes a trigger event, a directionality (whether the finding would upgrade or downgrade), and a threshold. Triggers are typically new evidence, publications, or replication results.",
    tags: ["Session lifecycle", "Calibration"],
  },
  {
    id: "corpus-quality-tiers",
    name: "Corpus quality tiers",
    def: "A three-tier classification of sessions by data quality — how cleanly a session's record is free of hindsight. High: outcome not yet resolved at session time (fully prospective). Medium: outcome resolved 0–60 days prior. Flagged: outcome resolved 60+ days prior. Only High and Medium sessions are included in the published corpus; Flagged sessions are excluded.",
    tags: ["Corpus", "Calibration"],
  },
  {
    id: "phase-architecture",
    name: "Phase architecture",
    def: "Augle's three-phase deliberation structure. Phase 1 (Exploration): terrain mapping, evidence classification, knowledge gap identification. Phase 2 (Deliberation): adversarial review, objection raising, evidence stress-testing. Phase 3 (Synthesis): finding production, confidence grading, reopen condition definition. Each phase boundary requires Guardian clearance before proceeding.",
    tags: ["Architecture", "Phases"],
  },
  {
    id: "evidence-nodes-registry",
    name: "Evidence nodes registry",
    def: "The structured record of all evidence claims admitted to a session, each with a source citation, SVS verification outcome, confidence ceiling, and validity assessment. The Synthesizer's final finding is anchored exclusively to nodes in the registry — claims made in deliberation that are not in the registry cannot influence the finding.",
    tags: ["Evidence", "Architecture"],
  },
  {
    id: "dissent-register",
    name: "Dissent register",
    def: "The complete record of all Contrarian objections raised during a session — including steelman, verbatim objection text, strength grade, resolution condition, and resolution status (resolved or unresolved). Unresolved objections are published in the session output. The dissent register is part of the exportable audit trail.",
    tags: ["Contrarian", "Output"],
  },
  {
    id: "grade-challenge",
    name: "Grade Challenge",
    def: "The formal mechanism by which an agent disputes a confidence grade assigned to an evidence node. A Grade Challenge must cite specific evidence that supports a different grade and specify a resolution condition. The Methodologist adjudicates Grade Challenges. Upheld challenges can only lower a grade, never raise it above the evidence ceiling.",
    tags: ["Calibration", "Protocol"],
  },
  {
    id: "follow-on-session",
    name: "Follow-on session",
    def: "A new Augle session automatically proposed from a prior session's outputs. Follow-on proposals are generated from three sources: knowledge gaps identified by the Cartographer, unresolved Strong objections from the Contrarian, and triggered reopen conditions. Each proposal includes the proposed research question, priority tier, recommended depth, and session lineage reference.",
    tags: ["Session lifecycle", "Corpus"],
  },
];

export function GlossaryContent() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const filtered = q === "" ? TERMS : TERMS.filter((t) => t.name.toLowerCase().includes(q));

  return (
    <>
      {/* HERO */}
      <div className="border-b border-border bg-paper">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-5 py-14 md:px-10 md:py-16 lg:grid-cols-[1fr_400px] lg:gap-20 lg:px-[72px] lg:py-20">
          <div>
            <div className={eyebrow}>Glossary</div>
            <h1 className="mb-5 font-serif text-4xl leading-[1.15] tracking-tight text-ink sm:text-5xl lg:text-[52px]">
              The vocabulary of augmented deliberation.
            </h1>
            <p className="max-w-xl text-lg leading-[1.85] text-body">
              Definitions for every term in the Augle system — agents, confidence grades, session
              modes, corpus tiers, and architecture concepts. Each definition is written to be
              precise enough to use in a research context and accessible enough to use in a
              conversation.
            </p>
          </div>
          <div>
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search terms..."
                className="w-full rounded-md border border-border bg-paper-alt px-4 py-3.5 pr-12 text-[15px] text-ink outline-none focus:border-rust"
              />
              <span className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-subtle">
                ⌕
              </span>
            </div>
            <div className="mt-2.5 font-mono text-[11px] text-subtle">
              {filtered.length} term{filtered.length !== 1 ? "s" : ""}
            </div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-5 py-14 md:px-10 md:py-20 lg:grid-cols-[280px_1fr] lg:px-[72px]">
        <div className="lg:sticky lg:top-[100px] lg:self-start">
          <div className="mb-3.5 font-mono text-[10px] tracking-[0.08em] text-subtle uppercase">
            Jump to term
          </div>
          <div className="flex flex-col gap-0.5">
            {TERMS.map((t) => (
              <Link
                key={t.id}
                href={`#${t.id}`}
                className="border-l-2 border-transparent py-1 pl-2.5 text-[13px] text-muted transition-colors hover:border-rust hover:text-rust"
              >
                {t.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          {filtered.map((t, i) => (
            <div
              key={t.id}
              id={t.id}
              className={`py-8 ${i < filtered.length - 1 ? "border-b border-border" : ""}`}
            >
              <div className="mb-2 font-mono text-[10px] tracking-[0.08em] text-subtle uppercase">
                /glossary/{t.id}
              </div>
              <h2 className="mb-3.5 font-serif text-2xl leading-[1.3] text-ink md:text-[26px]">
                {t.name}
              </h2>
              <p className="mb-4 text-base leading-[1.85] text-body">{t.def}</p>
              <div className="flex flex-wrap gap-1.5">
                {t.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-border bg-paper-alt px-2.5 py-1 font-mono text-[10px] text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PaperCard, type Paper } from "@/components/PaperCard";
import { btnPrimary, eyebrow, sectionTitle } from "@/lib/styles";
import { getZenodoPapers } from "@/lib/zenodo";

export const metadata: Metadata = {
  title: "Augle Research Papers | 7 Published Studies on AI Deliberation Architecture",
  description:
    "Seven peer-reviewed papers by Cory Kelly and Shubhanker Saxena on multi-agent deliberation, corpus infrastructure, and calibration scoring. Published on Zenodo and SSRN.",
};

// Used only if the live Zenodo fetch fails — last-known-good snapshot so the page never breaks.
const FALLBACK_PAPERS: Paper[] = [
  {
    num: "Paper 01 · AUGLE-001P · June 4, 2026",
    title:
      "Augmented Deliberation via Seven-Agent Ensemble: Architecture, Phase Design, and Confidence Propagation",
    authors: "Cory Kelly, Shubhanker Saxena",
    abstract:
      "Introduces the Augle seven-agent ensemble — Guardian, Topic Architect, Cartographer, Methodologist, Contrarian, Synthesizer, and Pragmatist — and describes the three-phase deliberation architecture (Exploration, Deliberation, Synthesis). Defines confidence propagation, the Methodologist ceiling constraint, Grade Challenge mechanics, and the evidence nodes registry. The foundational architecture paper.",
    tags: ["Multi-agent systems", "Deliberation architecture", "Confidence propagation"],
    patentTag: "Provisional: AUGLE-001P",
    date: "June 4, 2026",
    patentId: "64/082,269",
    zenodoUrl: "https://zenodo.org",
    ssrnUrl: "https://ssrn.com",
  },
  {
    num: "Paper 02 · AUGLE-002P · June 11, 2026",
    title:
      "Document Synthesis in Multi-Agent Deliberation: Evidence Ingestion, SVS Verification, and Guardian Integrity Scoring",
    authors: "Cory Kelly, Shubhanker Saxena",
    abstract:
      "Describes the document ingestion pipeline, the Structured Verification System (SVS) for source validation, and the Guardian's integrity scoring across six modes: Academic, Legal, Clinical, Financial, Editorial, and Markets. Defines the Critical/Moderate/Low flag taxonomy, phase boundary clearance mechanics, and the evidence admission decision tree that governs what enters deliberation.",
    tags: ["Document synthesis", "Source verification", "Guardian system"],
    patentTag: "Provisional: AUGLE-002P",
    date: "June 11, 2026",
    patentId: "64/088,094",
    zenodoUrl: "https://zenodo.org",
    ssrnUrl: "https://ssrn.com",
  },
  {
    num: "Paper 03 · AUGLE-003P · June 13, 2026",
    title:
      "Structured Verbal Sparring: Adversarial Steelmanning and Objection Resolution in Multi-Agent Deliberation",
    authors: "Cory Kelly, Shubhanker Saxena",
    abstract:
      "Introduces Structured Verbal Sparring (SVS) — the formal protocol governing Contrarian agent behaviour. Defines the steelman-first requirement, objection strength grades (Strong, Moderate, Speculative), resolution conditions, and the unresolved objection registry. Describes how dissent is preserved verbatim in session outputs and how the Contrarian's dissent register integrates with the Synthesizer's final finding.",
    tags: ["Adversarial reasoning", "Steelmanning", "Dissent protocols"],
    patentTag: "Provisional: AUGLE-003P",
    date: "June 13, 2026",
    patentId: "64/090,101",
    zenodoUrl: "https://zenodo.org",
    ssrnUrl: "https://ssrn.com",
  },
  {
    num: "Paper 04 · AUGLE-004P · June 13, 2026",
    title:
      "Ground-Truth-Mapped Reasoning Corpus: Prediction Market Pairing, Corpus Quality Tiers, and Calibration Scoring Infrastructure",
    authors: "Cory Kelly, Shubhanker Saxena",
    abstract:
      "Describes the corpus infrastructure that maps Augle deliberation sessions to prediction market ground truth outcomes. Defines corpus quality tiers (Gold, Silver, Flagged), the Brier scoring methodology, and the calibration comparison framework against market consensus. Establishes the V3 Calibrator training protocol and the corpus accumulation threshold required (~5,000 resolved sessions) before supervised calibration training begins.",
    tags: ["Corpus infrastructure", "Brier scoring", "Calibration", "Prediction markets"],
    patentTag: "Provisional: AUGLE-004P",
    date: "June 13, 2026",
    patentId: "64/090,105",
    zenodoUrl: "https://zenodo.org",
    ssrnUrl: "https://ssrn.com",
  },
  {
    num: "Paper 05 · AUGLE-005P · June 19, 2026",
    title:
      "Real-Time Evidence Admission Protocol: Dynamic Evidence Integration During Active Deliberation Sessions",
    authors: "Cory Kelly, Shubhanker Saxena",
    abstract:
      "Describes the Real-Time Evidence Admission Protocol (REAP) — the mechanism by which new evidence submitted mid-session is evaluated, verified, and integrated without disrupting the deliberation in progress. Defines the evidence queue architecture, Guardian pre-screening for mid-session submissions, the confidence recalculation protocol, and the precedence rules governing phase boundary interactions when new evidence arrives near a phase transition.",
    tags: ["Real-time evidence", "Dynamic integration", "Session architecture"],
    patentTag: "Provisional: AUGLE-005P",
    date: "June 19, 2026",
    patentId: "64/094,556",
    zenodoUrl: "https://zenodo.org",
    ssrnUrl: "https://ssrn.com",
  },
  {
    num: "Paper 06 · AUGLE-006P · June 19, 2026",
    title:
      "Evidence-Triggered Session Reopen Conditions: Systematic Verdict Revision in Response to New Evidence and Market Resolution Events",
    authors: "Cory Kelly, Shubhanker Saxena",
    abstract:
      "Introduces the reopen condition framework — the structured specification of triggers that cause a resolved session's finding to be subject to mandatory revision. Defines reopen condition types (market event triggers, new evidence triggers, retraction triggers), the directionality requirement (upgrade or downgrade), and the session lineage graph that links parent sessions to their reopen descendants. Distinguishes reopen conditions in Markets-mode sessions from Academia evidence-triggered conditions.",
    tags: ["Reopen conditions", "Session lineage", "Verdict revision"],
    patentTag: "Provisional: AUGLE-006P",
    date: "June 19, 2026",
    patentId: "64/094,568",
    zenodoUrl: "https://zenodo.org",
    ssrnUrl: "https://ssrn.com",
  },
  {
    num: "Paper 07 · AUGLE-007P · June 19, 2026",
    title:
      "Compounding Research Loops: Follow-On Session Generation from Knowledge Gaps, Unresolved Objections, and Resolved Reopen Conditions",
    authors: "Cory Kelly, Shubhanker Saxena",
    abstract:
      "Describes the follow-on session architecture — the mechanism by which knowledge gaps identified by the Cartographer, unresolved objections from the Contrarian, and triggered reopen conditions automatically generate proposed follow-on research questions. Defines the three-source generation system, priority tier assignment, lineage graph construction, and the user-facing proposal interface. Introduces the compounding research loop as a mechanism for iterative calibration improvement across session chains.",
    tags: ["Follow-on sessions", "Research loops", "Knowledge gaps", "Session lineage"],
    patentTag: "Provisional: AUGLE-007P",
    date: "June 19, 2026",
    patentId: "64/094,580",
    zenodoUrl: "https://zenodo.org",
    ssrnUrl: "https://ssrn.com",
  },
];

const REPO_LINKS = [
  {
    code: "ZN",
    label: "Zenodo",
    sub: "Primary repository · persistent DOIs · all 7 papers",
    href: "https://zenodo.org",
  },
  {
    code: "SS",
    label: "SSRN",
    sub: "Social Science Research Network · all 7 papers",
    href: "https://ssrn.com",
  },
];

export default async function ResearchPage() {
  const papers = await getZenodoPapers().catch(() => FALLBACK_PAPERS);
  const provisionalCount = papers.filter((p) => p.patentId).length;

  const heroStats = [
    { num: String(papers.length), label: "Published papers" },
    { num: String(provisionalCount), label: "Provisional patents" },
    { num: "2", label: "Repositories" },
  ];

  const panelRows = [
    { label: "Authors", value: "Cory Kelly · Shubhanker Saxena" },
    { label: "Repositories", value: "Zenodo · SSRN", accent: true },
    { label: "arXiv", value: "Pending endorsement" },
    { label: "Filed", value: `2026 · ${provisionalCount} provisionals` },
    { label: "License", value: "CC BY 4.0" },
  ];

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Company", href: "/company" },
          { label: "Research + whitepapers" },
        ]}
      />

      {/* HERO */}
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-10 px-5 py-16 md:px-10 md:py-20 lg:flex-row lg:items-start lg:gap-16 lg:px-[72px]">
          <div className="min-w-0 flex-1">
            <div className={eyebrow}>Research + whitepapers</div>
            <h1 className="mb-6 font-serif text-4xl leading-[1.12] font-normal tracking-tight text-ink lg:text-[56px]">
              The architecture,
              <br />
              published.
            </h1>
            <p className="mb-7 max-w-2xl text-lg leading-[1.85] text-body">
              Seven research papers documenting the Augle system — the seven-agent ensemble,
              corpus pipeline, confidence scoring, reopen conditions, and evidence admission
              logic. Published on Zenodo and SSRN to establish prior art and contribute to the
              field of augmented deliberation. All papers are co-authored by Cory Kelly and
              Shubhanker Saxena.
            </p>
            <div className="flex flex-wrap gap-8">
              {heroStats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <div className="font-serif text-4xl leading-none text-rust">{stat.num}</div>
                  <div className="font-mono text-[11px] tracking-[0.06em] text-subtle uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex-shrink-0 rounded-lg border border-border bg-paper lg:w-80">
            <div className="border-b border-border bg-paper-alt px-5 py-3.5">
              <span className="font-mono text-[10px] tracking-[0.08em] text-subtle uppercase">
                Publication info
              </span>
            </div>
            {panelRows.map((row, i) => (
              <div
                key={row.label}
                className={`flex flex-wrap items-baseline justify-between gap-3 px-5 py-3 ${
                  i < panelRows.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <span className="flex-shrink-0 font-mono text-[10px] tracking-[0.05em] text-subtle uppercase">
                  {row.label}
                </span>
                <span
                  className={`max-w-[200px] text-right text-[13px] leading-[1.4] ${
                    row.accent ? "font-medium text-rust" : "text-ink"
                  }`}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PAPERS */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-20 lg:px-[72px]">
          <div className={eyebrow}>All publications</div>
          <h2 className={`${sectionTitle} mb-3`}>
            Seven papers.
            <br />
            One system.
          </h2>
          <p className="mb-10 max-w-2xl text-lg leading-[1.85] text-body md:mb-12">
            Each paper covers a distinct architectural component of the Augle system. Together
            they constitute a complete specification of the deliberation engine — from agent
            design to corpus infrastructure to calibration methodology.
          </p>
          <div className="flex flex-col gap-px overflow-hidden rounded-lg border border-border bg-border">
            {papers.map((paper) => (
              <PaperCard key={paper.zenodoUrl} paper={paper} />
            ))}
          </div>
        </div>
      </div>

      {/* CITATION */}
      <div className="border-b border-border-dark bg-ink">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-5 py-16 md:px-10 md:py-20 lg:grid-cols-2 lg:gap-16 lg:px-[72px]">
          <div>
            <h2 className="mb-4 font-serif text-3xl font-normal text-offwhite">
              Citing Augle research
            </h2>
            <p className="mb-6 text-base leading-[1.85] text-faint">
              All papers are published under Creative Commons Attribution 4.0 (CC BY 4.0). You
              are free to share and adapt with attribution. The Zenodo repository provides
              persistent DOIs for each paper.
            </p>
            <div className="mb-3 rounded-md border border-border-dark bg-ink-2 p-5 font-mono text-xs leading-[1.7] text-subtle">
              Kelly, C., &amp; Saxena, S. (2026). Augmented Deliberation via Seven-Agent
              Ensemble: Architecture, Phase Design, and Confidence Propagation. Zenodo.
              https://doi.org/10.5281/zenodo.[DOI]
            </div>
            <p className="text-[13px] leading-[1.6] text-faint">
              Replace [DOI] with the specific paper DOI from Zenodo. Each paper has its own
              persistent identifier. BibTeX and RIS formats available on each paper&apos;s
              Zenodo record page.
            </p>
          </div>
          <div>
            <h2 className="mb-4 font-serif text-3xl font-normal text-offwhite">
              Find the papers
            </h2>
            <div className="flex flex-col gap-3">
              {REPO_LINKS.map((repo) => (
                <a
                  key={repo.code}
                  href={repo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 rounded-md border border-border-dark bg-ink-2 px-5 py-4 transition-colors hover:border-rust"
                >
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-ink-3 font-mono text-[10px] text-rust">
                    {repo.code}
                  </div>
                  <div>
                    <div className="mb-0.5 text-sm font-medium text-offwhite">{repo.label}</div>
                    <div className="font-mono text-[11px] text-faint">{repo.sub}</div>
                  </div>
                </a>
              ))}
              <div className="flex cursor-default items-center gap-3.5 rounded-md border border-border-dark bg-ink-2 px-5 py-4 opacity-50">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-ink-3 font-mono text-[10px] text-rust">
                  AX
                </div>
                <div>
                  <div className="mb-0.5 text-sm font-medium text-offwhite">arXiv</div>
                  <div className="font-mono text-[11px] text-faint">
                    Pending endorsement · submission in progress
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ARXIV NOTE */}
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-5 py-16 md:px-10 md:py-16 lg:grid-cols-2 lg:gap-16 lg:px-[72px]">
        <div>
          <h2 className="mb-3 font-serif text-[32px] font-normal text-ink">arXiv submission</h2>
          <p className="mb-4 text-base leading-[1.85] text-body">
            All seven papers have been submitted to arXiv for broader visibility and prestige
            within the AI research community. Submission is pending endorsement — arXiv
            requires endorsement for new submitters in the cs.AI and cs.MA categories. Zenodo
            timestamps establish prior art independently of arXiv status.
          </p>
          <div className="inline-flex items-center gap-2 rounded border border-conf-med-text/25 bg-conf-med-bg px-4 py-2 font-mono text-xs text-conf-med-text">
            Pending endorsement · cs.AI · cs.MA
          </div>
        </div>
        <div className="rounded-lg border border-border bg-paper p-7">
          <div className="mb-3 font-mono text-[10px] tracking-[0.08em] text-subtle uppercase">
            For researchers
          </div>
          <div className="mb-2 text-lg font-medium text-ink">Collaborate or cite</div>
          <p className="mb-4 text-sm leading-[1.65] text-body">
            If you&apos;re a researcher working on augmented deliberation, multi-agent
            reasoning, calibration scoring, or AI epistemic systems — we&apos;d like to hear
            from you. All papers are open access.
          </p>
          <Link href="/contact" className={btnPrimary}>
            Get in touch →
          </Link>
        </div>
      </div>
    </>
  );
}

import type { Grade } from "@/lib/grade";

// Session/outcome detail-page data — ported verbatim from the 9
// augle_outcome_detail_*.html mockups (see Outcomes + Index/ sibling folder).
// One shared template (src/app/outcomes/[slug]/page.tsx) renders all of these.

export type SessionTagVariant =
  | "domain"
  | "mode"
  | "vertical"
  | "depth"
  | "tier"
  | "resolved"
  | "guardian";

export type SessionTag = { label: string; variant: SessionTagVariant };

export type ReopenCondition = { id: string; text: string; trigger: string };

export type PhaseAgentOutput = {
  agent: string;
  model: string;
  confidence: number;
  /** One entry per source <br><br>-separated block. "**word**" renders as <strong>. */
  paragraphs: string[];
};

export type Phase = { label: string; agents: PhaseAgentOutput[] };

export type ObjectionStrength = "strong" | "moderate";
/** Traffic-light status used for badges outside the 4-way Grade scale (conf-high/med/contested tokens). */
export type StatusVariant = "good" | "warn" | "bad";

export type Objection = {
  strength: ObjectionStrength;
  mention: string;
  phaseLabel: string;
  status: string;
  statusVariant: "unresolved" | "resolved";
  steelman: string;
  text: string;
  resolution: string;
  resolutionNote?: string;
};

export type GuardianDim = { label: string; value: number };
export type SvsRow = { status: "ok" | "flag"; source: string; type: string; flagNote?: string };
export type SidebarRow = { label: string; value: string; variant?: "green" | "accent" | "warn" | "bad" };
export type AgentScore = { name: string; initials: string; model: string; pct: number; dissent: boolean };
export type FindingHistoryEvent = { date: string; title: string; grade?: string; text: string; trigger?: string };

export type Outcome = {
  slug: string;
  /** Internal "Session · xxx" breadcrumb/session-id display tag from the source file — NOT the route slug. */
  sessionTag: string;
  title: string;
  description: string;

  tags: SessionTag[];
  timestamp: string;
  question: string;
  /** Also gates rendering of the session-controls row (Export/Share/Run follow-on) — both are absent only on the market-mode (CPI) template. */
  context?: string;

  finding: {
    grade: Grade;
    confidence: number;
    /** ls-mode (open research question) note shown next to the grade chip. */
    gradeNote?: string;
    /** market-mode (resolved prediction) only. */
    resolution?: { status: string; source: string; date: string };
    brier?: { augle: number; market: number; note: string };
    text: string;
    reopenLabel: string;
    reopenConditions: ReopenCondition[];
  };

  /** RAG session only — finding-history reopen-monitoring timeline. */
  findingHistory?: {
    badge: string;
    stableNote: string;
    events: FindingHistoryEvent[];
    footerNote: string;
  };

  /** RAG session only — "Cite this Finding" sidebar card. */
  citeBox?: {
    id: string;
    citation: string;
    trackedLabel: string;
    trackedValue: string;
  };

  phases: Phase[];

  dissentBadge: string;
  dissentBadgeVariant: StatusVariant;
  objections: Objection[];

  guardian: {
    /** e.g. "academic integrity mode" — appended to "Guardian integrity log · " and shown as its own badge. Absent on the market-mode (CPI) session. */
    mode?: string;
    badgeStatus: string;
    badgeVariant: StatusVariant;
    score: number;
    description: string;
    dims: GuardianDim[];
    svsLabel: string;
    svsRows: SvsRow[];
    svsSummary: string;
  };

  sidebar: {
    metadata: SidebarRow[];
    agents: AgentScore[];
  };
};

export const OUTCOMES: Outcome[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // CPI — market mode (resolved Kalshi prediction, Brier score, no context/controls)
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "macro-cpi-print",
    sessionTag: "cpi-above-4pct-2026",
    title: "Will headline CPI print above 4% year-over-year before July 2026? — Outcomes — Augle",
    description:
      "Full deliberation record — seven-agent ensemble session, three phases, Guardian verification log, confidence grade, unresolved objections, and Brier score vs market consensus.",
    tags: [
      { label: "Economics", variant: "domain" },
      { label: "Markets mode", variant: "mode" },
      { label: "Standard · ~15 min", variant: "depth" },
      { label: "Gold tier", variant: "tier" },
      { label: "Resolved YES", variant: "resolved" },
    ],
    timestamp: "6h ago · Kalshi",
    question: `"Will headline CPI print above 4% year-over-year before July 2026?"`,
    finding: {
      grade: "Probable",
      confidence: 82,
      resolution: { status: "YES — Resolved", source: "Kalshi", date: "May 2026" },
      brier: {
        augle: 0.041,
        market: 0.085,
        note: "Lower is better. Brier = (confidence − outcome)². Market score uses Kalshi implied probability at session initiation. Gold tier — contract was live at session time.",
      },
      text: `The ensemble concludes that headline CPI is probable to print above 4% year-over-year before the July 2026 release. Core and headline inflation both re-accelerated in Q1–Q2 2026 — the most recent three CPI prints trended upward rather than down, breaking the disinflation path assumed at the start of the year. Sticky shelter and services components, combined with tariff-linked goods price pass-through, provided the structural support for the finding. The Contrarian's objection on correlated forecasting across market pricing, analyst consensus, and the terrain map was assessed as Moderate and does not alter the confidence grade, but surfaces verbatim below. The finding resolved YES ahead of the July 2026 release window, with the May 2026 print confirming a 4.2% year-over-year reading.`,
      reopenLabel: "Reopen conditions · 3 defined",
      reopenConditions: [
        {
          id: "RC1",
          text: "A downward BLS revision to the May 2026 CPI print below 4.0% year-over-year would trigger mandatory session reopen",
          trigger: "Trigger: Revised CPI < 4.0% · Direction: downgrade to Contested",
        },
        {
          id: "RC2",
          text: "Federal Reserve communications explicitly attributing the print to a transitory tariff shock rather than sustained core pressure",
          trigger: "Trigger: Explicit transitory framing · Direction: downgrade to Contested",
        },
        {
          id: "RC3",
          text: "June 2026 CPI print reverting below 3.8% year-over-year, breaking the re-acceleration trend",
          trigger: "Trigger: June CPI < 3.8% · Direction: moderate downgrade",
        },
      ],
    },
    phases: [
      {
        label: "Phase 1 · Exploration",
        agents: [
          {
            agent: "Cartographer",
            model: "Gemini 3.1 Pro · T=0.8",
            confidence: 82,
            paragraphs: [
              "**Settled ground:** Headline CPI year-over-year has trended upward for three consecutive readings, breaking the disinflation path assumed at the start of 2026. Shelter and services components remain sticky above pre-pandemic norms. Tariff-linked goods categories show clear price pass-through in the last two prints.",
              "**Contested terrain:** Whether the re-acceleration reflects a durable regime shift or a transitory tariff-pass-through shock is disputed. Market pricing on Kalshi and analyst consensus diverge modestly on the May print's magnitude.",
              "**Unknown territory:** Q3 inflation trajectory once early-2026 tariff effects fully cycle through year-over-year comparisons. Whether the Fed's response function shifts if the print holds above 4%.",
              "**Knowledge gap:** No reliable forward model for how much of the tariff pass-through is one-time versus persistent. Gap entered into evidence registry.",
            ],
          },
          {
            agent: "Methodologist",
            model: "GPT-4o · T=0.5",
            confidence: 85,
            paragraphs: [
              "Evidence ceiling set at Probable for all nodes. The CPI trajectory evidence has strong internal validity — three consecutive upward readings from the same primary source (BLS) are a reliable signal — but external validity is limited given only two months of clear tariff pass-through data. The market-pricing node has construct validity concerns: Kalshi and Polymarket-style implied probabilities have historically lagged realized inflation surprises by one print on average.",
              "**Confidence bounds issued:** CPI trajectory node: Probable. Tariff pass-through node: Probable with construct validity caveat. Shelter/services stickiness node: Probable. No node qualifies for Established given the short post-tariff timeframe.",
            ],
          },
          {
            agent: "Contrarian",
            model: "Claude Sonnet 4.6 · T=1.0",
            confidence: 41,
            paragraphs: [
              `**@Cartographer** — Steelman: the terrain classification of "CPI re-acceleration settled" is defensible given three consecutive upward prints from the same primary source. However, I challenge treating the tariff-pass-through framing as settled rather than contested. Attribution of the print to tariffs versus broader demand-side pressure is itself disputed among the cited analyst sources.`,
              `Objection [Moderate]: "The terrain map treats the tariff pass-through explanation as near-settled, but the cited analyst sources (Goldman Sachs, JPMorgan) actually disagree on how much of the print is tariff-driven versus demand-driven. Conflating the two understates the uncertainty in the underlying mechanism, even if the headline number itself is not in dispute." Resolution condition: A BLS or Fed staff decomposition isolating the tariff contribution to the print would resolve this objection.`,
            ],
          },
          {
            agent: "Synthesizer",
            model: "GPT-4o · T=0.0",
            confidence: 88,
            paragraphs: [
              "Phase 1 preliminary confidence: 79%. Evidence base is Probable across all nodes. Contrarian's Moderate objection on tariff-attribution classification noted and carried forward. No Grade Challenge triggered — all node grades comply with Methodologist ceiling. Tariff pass-through node reclassified from Settled to Contested terrain per Contrarian challenge.",
            ],
          },
        ],
      },
      {
        label: "Phase 2 · Deliberation",
        agents: [
          {
            agent: "Cartographer",
            model: "Gemini 3.1 Pro · T=0.8",
            confidence: 81,
            paragraphs: [
              "Phase 2 terrain update incorporating Phase 1 Contrarian challenge and Methodologist validity grades. Tariff pass-through node reclassified as Contested terrain. New evidence nodes added: Kalshi implied probability on the CPI-above-4% contract (trading at 74% two weeks pre-print — Probable), Goldman Sachs and JPMorgan analyst consensus (both projecting a print in the 4.1–4.4% range — Probable). Historical precedent: in prior tariff-implementation windows with comparable goods-basket exposure, headline CPI re-accelerated within one to two prints in the majority of cases (Established — multiple independent sources).",
            ],
          },
          {
            agent: "Methodologist",
            model: "GPT-4o · T=0.5",
            confidence: 82,
            paragraphs: [
              "Historical precedent node: External validity caveat — the current tariff regime differs from most precedent windows in scale and breadth of goods coverage. Node grade: Probable rather than Established. Kalshi implied-probability node: Probable — construct validity concern that market pricing is itself an aggregated expectation and not an independent signal. All node grades Probable or below. Evidence ceiling maintained.",
            ],
          },
          {
            agent: "Contrarian",
            model: "Claude Sonnet 4.6 · T=1.0",
            confidence: 44,
            paragraphs: [
              "**@Methodologist** — Steelman: The Methodologist's construct validity concern on Kalshi pricing is well-founded — market-implied probability reflects aggregated expectations and may already price in the same public information the ensemble is using. However, the concern is already accounted for by the Probable grade. I do not escalate this to Strong.",
              `New Moderate objection: "The convergence between Kalshi pricing, analyst consensus, and the terrain map's own tariff-pass-through read is a feature of correlated forecasting rather than independent evidence — all three may be updating on the same underlying tariff announcements. The evidence base has lower effective independence than the confidence grade implies." Resolution condition: At least one independent structural model (not derived from the same tariff announcements) projecting a print above 4% would resolve this.`,
            ],
          },
          {
            agent: "Synthesizer",
            model: "GPT-4o · T=0.0",
            confidence: 85,
            paragraphs: [
              "Phase 2 revised confidence: 82%. Evidence base strengthened by Kalshi pricing and analyst consensus nodes. The Contrarian's Moderate objection on correlated forecasting noted and carried to Phase 3. No Grade Challenge — all claims remain within Probable ceiling. Guardian phase boundary clearance: clean.",
            ],
          },
        ],
      },
      {
        label: "Phase 3 · Synthesis",
        agents: [
          {
            agent: "Contrarian",
            model: "Claude Sonnet 4.6 · T=1.0",
            confidence: 41,
            paragraphs: [
              "**@Synthesizer** — Steelman of the 82% confidence finding: The evidence base is internally consistent. CPI is trending upward, tariff pass-through is visible in the goods basket, market pricing and analyst consensus converge above 4%. The Probable grade is defensible.",
              `Final Phase 3 objection [Moderate, Unresolved]: "The convergence between Kalshi pricing, analyst consensus, and the terrain map's tariff-pass-through read is a feature of correlated forecasting rather than independent evidence. All three sources may be updating on the same tariff announcements. The evidence base has lower effective independence than the confidence grade implies." Resolution condition: At least one independent structural model (not updating from the same tariff announcements) projecting a print above 4% would resolve this. This objection is unresolved and surfaces in the final output.`,
            ],
          },
          {
            agent: "Synthesizer",
            model: "GPT-4o · T=0.0",
            confidence: 88,
            paragraphs: [
              "**Final finding: Probable · 82% confidence**",
              "Headline CPI is probable to print above 4% year-over-year before the July 2026 release. The evidence base supports this at Probable grade — no node qualifies for Established. The Contrarian's Phase 3 objection on correlated forecasting independence is noted and valid; it does not alter the grade but is preserved verbatim. Three reopen conditions were defined at session time. The finding anchors exclusively to the structured evidence nodes registry: CPI trajectory (Probable), tariff pass-through (Probable, with attribution caveat), historical precedent (Probable), Kalshi market pricing (Probable), analyst consensus (Probable).",
              "Financial advice framing is prohibited. This finding is not a buy, sell, or position recommendation.",
            ],
          },
          {
            agent: "Pragmatist",
            model: "Grok 4.1 Fast · T=0.3",
            confidence: 76,
            paragraphs: [
              "Confidence ceiling inherited from Synthesizer: Probable · 82%. Actionable notes within that ceiling:",
              "(1) The primary monitoring variable was the monthly CPI print — a downward BLS revision below 4.0% would trigger Reopen Condition 1. Session resolved YES ahead of the July release, so this now stands as a record rather than a live alert.",
              "(2) The Contrarian's correlated forecasting objection is the key structural risk in this finding. Anyone using this finding for institutional planning should seek the resolution condition (an independent structural model) as a cross-check, since it remains unresolved.",
              `(3) Follow-on session proposal: "How much of the 2026 CPI re-acceleration is attributable to tariff pass-through versus underlying demand?" — the unknown territory node on attribution was not resolved in this session.`,
            ],
          },
        ],
      },
    ],
    dissentBadge: "2 Unresolved",
    dissentBadgeVariant: "bad",
    objections: [
      {
        strength: "moderate",
        mention: "@Contrarian → @Cartographer",
        phaseLabel: "Phase 1",
        status: "Unresolved",
        statusVariant: "unresolved",
        steelman:
          "The terrain classification of \"CPI re-acceleration settled\" is defensible given three consecutive upward prints from the same primary source. The tariff pass-through read is the most direct available explanation.",
        text: `"The terrain map treats the tariff pass-through explanation as near-settled, but the cited analyst sources actually disagree on how much of the print is tariff-driven versus demand-driven. Conflating the two understates the uncertainty in the underlying mechanism, even if the headline number itself is not in dispute."`,
        resolution: "A BLS or Fed staff decomposition isolating the tariff contribution to the print would resolve this objection",
      },
      {
        strength: "moderate",
        mention: "@Contrarian → @Synthesizer",
        phaseLabel: "Phase 3",
        status: "Unresolved",
        statusVariant: "unresolved",
        steelman:
          "The evidence base is internally consistent — CPI is trending upward, tariff pass-through is visible in the goods basket, market pricing and analyst consensus converge above 4%. The Probable grade is well-calibrated to the evidence.",
        text: `"The convergence between Kalshi pricing, analyst consensus, and the terrain map's tariff-pass-through read is a feature of correlated forecasting rather than independent evidence. All three sources may be updating on the same underlying tariff announcements. The evidence base has lower effective independence than the confidence grade implies."`,
        resolution: "At least one independent structural model (not updating from the same tariff announcements) projecting a print above 4% would resolve this",
      },
    ],
    guardian: {
      badgeStatus: "Clean",
      badgeVariant: "good",
      score: 94,
      description:
        "No critical flags. No retracted sources. No preprint citations. Phase boundary clearances issued at Phase 1/2 and Phase 2/3 transitions. Session may proceed.",
      dims: [
        { label: "Source quality", value: 95 },
        { label: "Bias screening", value: 92 },
        { label: "Consistency", value: 94 },
        { label: "Scope adherence", value: 96 },
      ],
      svsLabel: "SVS verification log · 14 citations checked",
      svsRows: [
        { status: "ok", source: "Bureau of Labor Statistics — CPI news release, last 3 months", type: "Primary · Verified" },
        { status: "ok", source: "Bureau of Labor Statistics — CPI detailed report, shelter and services components", type: "Primary · Verified" },
        { status: "ok", source: "U.S. Trade Representative — tariff schedule updates, Q1–Q2 2026", type: "Primary · Verified" },
        { status: "ok", source: "Kalshi — CPI-above-4% contract implied probability history", type: "Market data · Verified" },
        { status: "ok", source: "Goldman Sachs Global Investment Research — 2026 inflation outlook", type: "Analyst · Verified" },
        { status: "ok", source: "JPMorgan Chase — US Economic Outlook, Q2 2026", type: "Analyst · Verified" },
        { status: "ok", source: "Federal Reserve — historical tariff-implementation pass-through analysis", type: "Primary · Verified" },
        { status: "ok", source: "Bureau of Labor Statistics — Owners' equivalent rent series, last 8 months", type: "Primary · Verified" },
      ],
      svsSummary: "+6 additional citations verified · 0 retracted · 0 preprints · 0 SVS flags",
    },
    sidebar: {
      metadata: [
        { label: "Session ID", value: "cpi-above-4pct-2026" },
        { label: "Mode", value: "Markets" },
        { label: "Depth", value: "Standard" },
        { label: "Runtime", value: "13m 52s" },
        { label: "Resolution src", value: "Kalshi" },
        { label: "Corpus tier", value: "Gold", variant: "green" },
        { label: "Guardian", value: "94% · Clean", variant: "green" },
        { label: "Citations", value: "14 · 0 flags" },
        { label: "Dissent flags", value: "2 Moderate", variant: "accent" },
        { label: "Resolution", value: "YES", variant: "green" },
      ],
      agents: [
        { name: "Cartographer", initials: "CA", model: "Gemini 3.1 Pro", pct: 82, dissent: false },
        { name: "Methodologist", initials: "ME", model: "GPT-4o", pct: 85, dissent: false },
        { name: "Contrarian", initials: "CO", model: "Claude Sonnet 4.6", pct: 41, dissent: true },
        { name: "Synthesizer", initials: "SY", model: "GPT-4o", pct: 88, dissent: false },
        { name: "Pragmatist", initials: "PR", model: "Grok 4.1 Fast", pct: 76, dissent: false },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CRISPR — ls mode (open research question)
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "life-crispr-reproducibility",
    sessionTag: "life-crispr-reproducibility",
    title: "CRISPR Off-Target Reproducibility — Outcomes — Augle",
    description:
      "Full deliberation record — Letters & Science session. Multi-agent ensemble, three phases, Guardian academic integrity log, confidence grade, unresolved objections.",
    tags: [
      { label: "Life sciences", variant: "domain" },
      { label: "Research Labs", variant: "vertical" },
      { label: "Standard · methods + data uploaded", variant: "depth" },
      { label: "Guardian · academic integrity", variant: "guardian" },
    ],
    timestamp: "1d ago · Genome Engineering Lab",
    question: `"Is the CRISPR off-target editing rate reported in this foundational study reproducible, and what does the replication literature show?"`,
    context: "Principal investigator · Pre-submission reproducibility check · Methods and detection data submitted as context",
    finding: {
      grade: "Contested",
      confidence: 41,
      gradeNote: "Convergence exists but shares one detection method across all studies. Method-independent reproducibility: Contested.",
      text: `The ensemble returns a Contested finding on the reproducibility of the reported off-target editing rate. Multiple studies report broadly consistent off-target rates, which superficially looks like robust replication. But the Contrarian's Strong objection is unresolved: nearly all of these studies rely on the same detection assay, so their agreement may reflect a shared methodological blind spot rather than independent confirmation. Convergence without methodological variation is not the same as reproducibility. The within-assay claim (results replicate when the same detection method is used) is Probable; the method-independent claim (the true off-target rate is as reported, regardless of assay) is Contested. The actionable output: confirm with an orthogonal detection method before treating the rate as established.`,
      reopenLabel: "Reopen conditions · evidence-triggered, not market-triggered",
      reopenConditions: [
        {
          id: "RC1",
          text: "Independent replication using an orthogonal off-target detection assay (e.g. a method mechanistically distinct from the one shared across current studies)",
          trigger: "Trigger: Orthogonal-assay replication · Direction: Established grade possible if the rate holds",
        },
        {
          id: "RC2",
          text: "A head-to-head comparison of detection assays on the same edited samples, quantifying method-specific bias",
          trigger: "Trigger: Assay-comparison study · Direction: Resolves the shared-method objection",
        },
        {
          id: "RC3",
          text: `Reframing the manuscript claim from "the off-target rate is X" to "the off-target rate is X as measured by [assay], pending orthogonal confirmation"`,
          trigger: "Trigger: Claim revision · Direction: Probable grade for the assay-scoped claim",
        },
      ],
    },
    phases: [
      {
        label: "Phase 1 · Exploration",
        agents: [
          {
            agent: "Cartographer",
            model: "Gemini 3.1 Pro · T=0.8",
            confidence: 61,
            paragraphs: [
              "**Settled ground:** CRISPR-Cas9 produces off-target edits at some non-zero rate. Several independent groups report off-target rates in a broadly similar range for the guides in question. Detection sensitivity depends heavily on the assay used.",
              "**Contested terrain:** Whether the reported rate is a property of the editing or of the detection method. Whether cross-study agreement constitutes independent replication given shared methodology.",
              "**Unknown territory:** How the reported rate behaves under a mechanistically orthogonal detection assay. Whether the shared assay systematically under- or over-counts a class of off-target events.",
              "**Knowledge gaps entered:** (1) Orthogonal-assay replication — not present in the uploaded literature. (2) Head-to-head assay-bias quantification — does not exist for these samples.",
            ],
          },
          {
            agent: "Methodologist",
            model: "GPT-4o · T=0.5",
            confidence: 54,
            paragraphs: [
              "**Methodological-independence concern flagged:** The replication set is not methodologically independent — the studies share a common detection assay. Agreement among non-independent measurements does not raise confidence in the same way independent replication does. The apparent robustness may be an artefact of shared method bias.",
              "Evidence ceiling: the method-independent reproducibility claim is capped at Contested until an orthogonal assay confirms the rate. The within-assay reproducibility claim (same method, same result) is Probable. No node reaches Established without method-independent confirmation.",
            ],
          },
          {
            agent: "Contrarian",
            model: "Claude Sonnet 4.6 · T=1.0",
            confidence: 35,
            paragraphs: [
              "**@Cartographer** — Steelman: Multiple groups reporting a consistent rate is genuine evidence, and the guides and conditions are well-characterised. A working biologist would reasonably treat this as reproducible.",
              `Strong objection [Phase 1]: "The replication attempts use a single detection assay across all studies. Convergence without independent methodological variation is not reproducibility — it is the same measurement repeated. If the shared assay has a systematic blind spot for a class of off-target events, every study inherits it and they will agree while all being wrong in the same direction." Resolution condition: Replicate the rate with a mechanistically orthogonal detection assay on the same samples.`,
            ],
          },
        ],
      },
      {
        label: "Phase 2 · Deliberation",
        agents: [
          {
            agent: "Methodologist",
            model: "GPT-4o · T=0.5",
            confidence: 47,
            paragraphs: [
              "The Contrarian's Strong objection is upheld. Shared-method non-independence is a valid threat to the reproducibility inference — it cannot be resolved within a literature that uses one assay. The objection is formally unresolved.",
              "However, the within-assay claim is separable. That the rate replicates when the same detection method is applied is Probable on the available evidence. The Methodologist issues a claim split: method-independent reproducibility is Contested; within-assay reproducibility is Probable.",
            ],
          },
          {
            agent: "Contrarian",
            model: "Claude Sonnet 4.6 · T=1.0",
            confidence: 38,
            paragraphs: [
              "I accept the Methodologist's claim split. The within-assay claim is defensible and I do not escalate my objection to it. The method-independent claim remains contested.",
              `Additional Moderate objection: "The manuscript states the off-target rate as a property of the edit, not of the measurement. Even under the within-assay reading, the claim should be scoped to the assay. As written, it overreaches its own evidence." Resolution condition: Scope the reported rate to the detection method in the manuscript text.`,
            ],
          },
          {
            agent: "Synthesizer",
            model: "GPT-4o · T=0.0",
            confidence: 47,
            paragraphs: [
              "Phase 2 synthesis: Claim split confirmed. Within-assay reproducibility: Probable. Method-independent reproducibility: Contested (shared-assay non-independence unresolved). Overall session confidence: 41% — reflects the Contested grade on the primary reproducibility claim. No Grade Challenge triggered on the within-assay claim.",
            ],
          },
        ],
      },
      {
        label: "Phase 3 · Synthesis",
        agents: [
          {
            agent: "Contrarian",
            model: "Claude Sonnet 4.6 · T=1.0",
            confidence: 35,
            paragraphs: [
              "Final steelman: The consistency across groups is real and the underlying editing biology is well-characterised. Treating the rate as a working value for the shared assay is defensible.",
              `Final Strong objection [Unresolved]: The shared-method objection stands. "Every study in the replication set uses the same detection assay. They agree because they measure the same way, not because the rate is method-independent. Until an orthogonal assay confirms it, the reported rate is a property of the measurement as much as of the edit." Resolution condition: Orthogonal-assay replication on the same samples.`,
            ],
          },
          {
            agent: "Synthesizer",
            model: "GPT-4o · T=0.0",
            confidence: 44,
            paragraphs: [
              "**Final finding: Contested · 41% confidence**",
              "Split finding. Within-assay reproducibility: Probable — the rate replicates when the same detection method is used. Method-independent reproducibility: Contested — the replication set shares one assay and no orthogonal confirmation exists. This session's value is in distinguishing \"measured the same way and agreed\" from \"reproducible,\" and in naming the orthogonal-assay experiment that would settle it.",
            ],
          },
          {
            agent: "Pragmatist",
            model: "Grok 4.1 Fast · T=0.3",
            confidence: 42,
            paragraphs: [
              "Confidence ceiling inherited: Contested · 41%. Actionable steps within that ceiling:",
              "(1) Before submission, scope the reported rate to the detection assay in the manuscript text — state it as measured by [assay], not as an intrinsic property of the edit.",
              "(2) Run or commission an orthogonal-assay replication on the same samples. This is the single experiment that would move the claim to Established.",
              "(3) Add a limitations paragraph acknowledging shared-method non-independence across the cited replication literature, so reviewers see it addressed rather than raise it.",
              `Follow-on session proposal: "Does the reported off-target rate hold under a mechanistically orthogonal detection assay?" — the experiment that closes the gap.`,
            ],
          },
        ],
      },
    ],
    dissentBadge: "1 Strong Unresolved · 1 Moderate",
    dissentBadgeVariant: "bad",
    objections: [
      {
        strength: "strong",
        mention: "@Contrarian → @Cartographer",
        phaseLabel: "Phase 1 · carried to Phase 3",
        status: "Unresolved",
        statusVariant: "unresolved",
        steelman:
          "Consistency across independent groups is genuine evidence, and the guides and editing conditions are well-characterised. Treating the rate as a working value is reasonable.",
        text: `"The replication set shares a single detection assay. Convergence without independent methodological variation is repetition, not reproducibility — a shared blind spot would make every study agree while all being wrong in the same direction."`,
        resolution: "Replicate the rate with a mechanistically orthogonal detection assay on the same samples",
      },
      {
        strength: "moderate",
        mention: "@Contrarian → @Methodologist",
        phaseLabel: "Phase 2",
        status: "Actionable",
        statusVariant: "resolved",
        steelman:
          "Single-assay replication is common in this subfield because orthogonal assays are costly and low-throughput. The convergence is still reassuring within its limits.",
        text: `"The manuscript states the off-target rate as a property of the edit rather than of the measurement. Even on the within-assay reading, the claim should be scoped to the assay used."`,
        resolution: "Scope the reported rate to the detection method in the manuscript text",
        resolutionNote: "Pragmatist action item: Scope the rate to the assay and commission an orthogonal-assay replication before submission",
      },
    ],
    guardian: {
      mode: "Academic integrity mode",
      badgeStatus: "Clean",
      badgeVariant: "good",
      score: 96,
      description:
        "No retracted papers. One preprint down-weighted below the primary-claim threshold. Methodological-independence gap flagged across the replication set (shared detection assay). Self-citation ratio within field norms. Phase boundary clearances issued at P1/2 and P2/3.",
      dims: [
        { label: "Source quality", value: 97 },
        { label: "Retraction check", value: 100 },
        { label: "Preprint flag", value: 94 },
        { label: "Self-citation ratio", value: 96 },
      ],
      svsLabel: "SVS verification log · 13 citations checked",
      svsRows: [
        { status: "ok", source: "Foundational study — reported off-target editing rate for the guide set", type: "Peer-reviewed · Verified" },
        { status: "ok", source: "Replication A — off-target rate, same detection assay", type: "Peer-reviewed · Verified" },
        { status: "ok", source: "Replication B — off-target rate, same detection assay", type: "Peer-reviewed · Verified" },
        {
          status: "flag",
          source: "Preprint — additional replication, same assay family",
          type: "Preprint · Flagged",
          flagNote: "SVS_PREPRINT — bioRxiv preprint, not peer-reviewed · Evidence node capped at Probable · Flagged for substitution",
        },
        { status: "ok", source: "Methods review — comparison of off-target detection assays", type: "Peer-reviewed · Verified" },
      ],
      svsSummary: "+8 additional citations verified · 0 retracted · 1 preprint flagged above",
    },
    sidebar: {
      metadata: [
        { label: "Session ID", value: "life-crispr-reproducibility" },
        { label: "Vertical", value: "Research Labs" },
        { label: "Depth", value: "Standard" },
        { label: "Runtime", value: "17m 05s" },
        { label: "Attachment", value: "methods + data" },
        { label: "Guardian mode", value: "Academic", variant: "accent" },
        { label: "Guardian score", value: "96% · Clean", variant: "green" },
        { label: "Citations", value: "11 · 1 preprint" },
        { label: "Dissent flags", value: "1 Strong · 1 Mod", variant: "accent" },
      ],
      agents: [
        { name: "Cartographer", initials: "CA", model: "Gemini 3.1 Pro", pct: 52, dissent: false },
        { name: "Methodologist", initials: "ME", model: "GPT-4o", pct: 48, dissent: false },
        { name: "Contrarian", initials: "CO", model: "Claude Sonnet 4.6", pct: 28, dissent: true },
        { name: "Synthesizer", initials: "SY", model: "GPT-4o", pct: 44, dissent: false },
        { name: "Pragmatist", initials: "PR", model: "Grok 4.1 Fast", pct: 42, dissent: false },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // GLP-1 vs bariatric surgery — ls mode, clinical integrity
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "life-glp1-vs-bariatric",
    sessionTag: "life-glp1-vs-bariatric",
    title: "GLP-1 vs. Bariatric Surgery — Outcomes — Augle",
    description:
      "Full deliberation record — Letters & Science session. Multi-agent ensemble, three phases, Guardian academic integrity log, confidence grade, unresolved objections.",
    tags: [
      { label: "Life sciences", variant: "domain" },
      { label: "Healthcare", variant: "vertical" },
      { label: "Deep · systematic review uploaded", variant: "depth" },
      { label: "Guardian · clinical integrity", variant: "guardian" },
    ],
    timestamp: "9h ago · Academic Medical Centre",
    question: `"What does the evidence establish about the comparative effectiveness of GLP-1 agonists vs. bariatric surgery for long-term weight maintenance?"`,
    context: "Pharmacy & Therapeutics Committee · Formulary review · Draft systematic review submitted as context document",
    finding: {
      grade: "Contested",
      confidence: 46,
      gradeNote: "No directional comparative-effectiveness claim is supportable. Within-modality durability claims: Probable.",
      text: `The ensemble does not support a directional comparative-effectiveness claim between GLP-1 agonists and bariatric surgery for long-term weight maintenance. Bariatric surgery shows comparable-to-larger and more durable weight loss in long-term observational cohorts, but no large long-term head-to-head randomised trial exists — the comparison rests on indirect evidence across materially different populations. The Contrarian's Strong objection on population non-comparability is unresolved. Within-modality durability claims — that surgical loss persists at 5+ years in cohort data — are Probable. The actionable output: any formulary recommendation must be framed as modality-appropriate for distinct patient populations, not as a head-to-head superiority claim.`,
      reopenLabel: "Reopen conditions · evidence-triggered, not market-triggered",
      reopenConditions: [
        {
          id: "RC1",
          text: "A large head-to-head randomised trial comparing GLP-1 agonists and bariatric surgery for weight maintenance with ≥3-year follow-up",
          trigger: "Trigger: Head-to-head RCT publication · Direction: Directional comparative claim becomes gradeable",
        },
        {
          id: "RC2",
          text: "A matched-population long-term cohort controlling for baseline BMI, age, and comorbidity profile across both interventions",
          trigger: "Trigger: Matched cohort study · Direction: Resolves population non-comparability objection",
        },
        {
          id: "RC3",
          text: "Reframing of the formulary question from head-to-head superiority to within-modality durability by patient population",
          trigger: "Trigger: Question revision · Direction: Probable grade achievable with revised claim scope",
        },
      ],
    },
    phases: [
      {
        label: "Phase 1 · Exploration",
        agents: [
          {
            agent: "Cartographer",
            model: "Gemini 3.1 Pro · T=0.8",
            confidence: 64,
            paragraphs: [
              "**Settled ground:** Both GLP-1 agonists and bariatric surgery produce clinically significant weight loss in the short-to-medium term. Bariatric surgery has long-term (10–20 year) observational durability data. Weight regain follows GLP-1 discontinuation.",
              "**Contested terrain:** Relative durability of the two modalities beyond three years. Whether the magnitude gap narrows with newer dual agonists. Comparative effectiveness in matched populations.",
              "**Unknown territory:** No large long-term head-to-head randomised trial has ever compared the two interventions for weight maintenance. Surgical and pharmacological cohorts differ systematically in baseline BMI, age, and comorbidity.",
              "**Knowledge gaps entered:** (1) Head-to-head RCT with long follow-up — does not exist. (2) Matched-population comparative cohort controlling for baseline differences — does not exist.",
            ],
          },
          {
            agent: "Methodologist",
            model: "GPT-4o · T=0.5",
            confidence: 58,
            paragraphs: [
              "**Comparability concern flagged:** The comparison rests entirely on indirect evidence — no head-to-head randomisation exists. Surgical and pharmacological cohorts are not exchangeable: baseline BMI, age, and comorbidity profiles differ materially, so any cross-cohort effect estimate is not transportable between populations.",
              "Evidence ceiling: the directional comparative claim is capped at Contested — indirect comparison across non-equivalent populations cannot support a superiority finding. Within-modality durability claims (surgical loss persisting at 5+ years in cohort data) are Probable. No node qualifies for Established given the absence of head-to-head randomised evidence.",
            ],
          },
          {
            agent: "Contrarian",
            model: "Claude Sonnet 4.6 · T=1.0",
            confidence: 37,
            paragraphs: [
              "**@Cartographer** — Steelman: The long-term observational evidence for surgical durability is genuinely strong, and the direction of the cohort data is consistent. A clinician reading the literature would reasonably conclude surgery is more durable.",
              `Strong objection [Phase 1]: "No large long-term head-to-head randomised trial exists. The comparison rests on indirect evidence across cohorts with materially different baseline BMI, age, and comorbidity profiles — surgical candidates are systematically higher-BMI and higher-risk. The effect estimate is not transportable between these populations, so a directional superiority claim is unsupported regardless of how consistent the cohort data looks." Resolution condition: A head-to-head randomised trial, or a matched-population cohort controlling for the baseline differences.`,
            ],
          },
        ],
      },
      {
        label: "Phase 2 · Deliberation",
        agents: [
          {
            agent: "Methodologist",
            model: "GPT-4o · T=0.5",
            confidence: 55,
            paragraphs: [
              "The Contrarian's Strong objection has been reviewed. Population non-comparability is a valid threat to any cross-cohort inference — it cannot be resolved within the current evidence base, which contains no head-to-head randomisation. The objection is formally unresolved.",
              "However, within-modality claims are not affected in the same way. That surgical weight loss persists at 5+ years in observational cohorts is Probable on its own terms; that GLP-1 loss substantially regresses after discontinuation is likewise well-documented. The Methodologist issues a claim split: the directional comparative claim (surgery vs. GLP-1) is Contested; within-modality durability claims are Probable.",
            ],
          },
          {
            agent: "Contrarian",
            model: "Claude Sonnet 4.6 · T=1.0",
            confidence: 39,
            paragraphs: [
              "I accept the Methodologist's claim split. The within-modality durability claims are defensible and I do not escalate my objection to those. The directional comparative claim remains contested.",
              `Additional Moderate objection: "The surgical durability evidence extends further than the GLP-1 evidence largely because the intervention is older — longer follow-up is not the same as superior durability. The comparison is confounded by evidence age, and the draft review does not acknowledge this." Resolution condition: Explicit acknowledgment of the evidence-age confound in the review's limitations.`,
            ],
          },
          {
            agent: "Synthesizer",
            model: "GPT-4o · T=0.0",
            confidence: 49,
            paragraphs: [
              "Phase 2 synthesis: Claim split confirmed. Within-modality durability claims: Probable (55–64% confidence across nodes). Directional comparative claim: Contested (population non-comparability objection unresolved). Overall session confidence: 46% — reflects the Contested grade on the primary comparative claim. No Grade Challenge triggered on the within-modality claims.",
            ],
          },
        ],
      },
      {
        label: "Phase 3 · Synthesis",
        agents: [
          {
            agent: "Contrarian",
            model: "Claude Sonnet 4.6 · T=1.0",
            confidence: 37,
            paragraphs: [
              "Final steelman: The draft review is careful in its within-modality reading of the evidence. The surgical durability data is real and the direction is consistent. The reviewers are appropriately cautious about the pharmacological long-term picture.",
              `Final Strong objection [Unresolved]: The population non-comparability objection stands. "No head-to-head randomised trial exists. Surgical and pharmacological cohorts differ systematically in baseline BMI, age, and comorbidity, so the cross-cohort comparison is not transportable. A directional superiority claim is unsupported regardless of how consistent the observational data appears." Resolution condition: A head-to-head RCT, or a matched-population cohort controlling for the baseline differences.`,
            ],
          },
          {
            agent: "Synthesizer",
            model: "GPT-4o · T=0.0",
            confidence: 46,
            paragraphs: [
              "**Final finding: Contested · 46% confidence**",
              `Split finding. Within-modality durability claims: Probable — surgical loss persists at 5+ years in cohort data; GLP-1 loss regresses after discontinuation. Directional comparative claim (surgery vs. GLP-1): Contested — no head-to-head randomised evidence exists and the population non-comparability objection is unresolved. This session's value is in naming why the comparison cannot be made directionally, and what evidence would change that.`,
            ],
          },
          {
            agent: "Pragmatist",
            model: "Grok 4.1 Fast · T=0.3",
            confidence: 45,
            paragraphs: [
              "Confidence ceiling inherited: Contested · 46%. Actionable steps within that ceiling:",
              `(1) Frame the formulary recommendation as modality-appropriate for distinct patient populations, not as a head-to-head superiority claim. The evidence supports "surgery for higher-BMI/higher-comorbidity candidates; GLP-1 where surgery is contraindicated or declined" far better than "X beats Y."`,
              "(2) Add an evidence-age and population-comparability caveat to the review's limitations section. This preempts the two most likely challenges from the committee.",
              "(3) State the maintenance implication explicitly: GLP-1 benefit is contingent on continued dosing, since loss regresses substantially after discontinuation. Any cost-effectiveness modelling must assume ongoing therapy, not a fixed course.",
              `Follow-on session proposal: "What does the evidence establish about durable weight maintenance after planned GLP-1 discontinuation?" — the question that would close the gap identified here.`,
            ],
          },
        ],
      },
    ],
    dissentBadge: "1 Strong Unresolved · 1 Moderate",
    dissentBadgeVariant: "bad",
    objections: [
      {
        strength: "strong",
        mention: "@Contrarian → @Cartographer",
        phaseLabel: "Phase 1 · carried to Phase 3",
        status: "Unresolved",
        statusVariant: "unresolved",
        steelman:
          "The long-term observational evidence for surgical durability is genuinely strong and directionally consistent. A clinician reading the literature would reasonably read surgery as more durable.",
        text: `"No large long-term head-to-head randomised trial exists. Surgical and pharmacological cohorts differ systematically in baseline BMI, age, and comorbidity — the cross-cohort comparison is not transportable, so a directional superiority claim is unsupported."`,
        resolution: "A head-to-head randomised trial, or a matched-population cohort controlling for baseline BMI, age, and comorbidity differences",
      },
      {
        strength: "moderate",
        mention: "@Contrarian → @Methodologist",
        phaseLabel: "Phase 2",
        status: "Actionable",
        statusVariant: "resolved",
        steelman: "That surgery has longer follow-up is a real feature of the evidence base, and longer-term data is genuinely reassuring on durability.",
        text: `"The surgical durability evidence extends further largely because the intervention is older. Longer follow-up is not the same as superior durability — the comparison is confounded by evidence age, unacknowledged in the draft."`,
        resolution: "Explicit acknowledgment of the evidence-age confound in the review's limitations section",
        resolutionNote: "Pragmatist action item: Add evidence-age and population-comparability caveats to the review before circulation",
      },
    ],
    guardian: {
      mode: "Clinical integrity mode",
      badgeStatus: "1 flag",
      badgeVariant: "warn",
      score: 97,
      description:
        "No retracted papers. All primary trial citations authenticated against registries. One industry-funded extension study flagged for disclosure. Self-citation ratio within field norms. Phase boundary clearances issued at P1/2 and P2/3.",
      dims: [
        { label: "Source quality", value: 97 },
        { label: "Retraction check", value: 100 },
        { label: "Funding disclosure", value: 88 },
        { label: "Self-citation ratio", value: 95 },
      ],
      svsLabel: "SVS verification log · 22 citations checked",
      svsRows: [
        { status: "ok", source: "Wilding et al. (2021) — STEP 1 semaglutide weight-management RCT", type: "Peer-reviewed · Verified" },
        { status: "ok", source: "Jastreboff et al. (2022) — SURMOUNT-1 tirzepatide RCT", type: "Peer-reviewed · Verified" },
        { status: "ok", source: "Sjöström et al. (2004/2012) — Swedish Obese Subjects long-term surgical cohort", type: "Peer-reviewed · Verified" },
        {
          status: "flag",
          source: "Sponsor-affiliated (2024) — GLP-1 durability extension analysis",
          type: "Industry-funded · Flagged",
          flagNote: "SVS_FUNDING — industry-funded extension, sponsor-affiliated authors · Evidence node capped at Probable · Flagged for disclosure",
        },
        { status: "ok", source: "Wilding et al. (2022) — STEP withdrawal / regain after discontinuation", type: "Peer-reviewed · Verified" },
      ],
      svsSummary: "+17 additional citations verified · 0 retracted · 1 industry-funded flagged above",
    },
    sidebar: {
      metadata: [
        { label: "Session ID", value: "life-glp1-vs-bariatric" },
        { label: "Vertical", value: "Healthcare" },
        { label: "Depth", value: "Deep" },
        { label: "Runtime", value: "38m 04s" },
        { label: "Attachment", value: "draft review" },
        { label: "Guardian mode", value: "Clinical", variant: "accent" },
        { label: "Guardian score", value: "97% · 1 flag", variant: "warn" },
        { label: "Citations", value: "22 · 1 flagged" },
        { label: "Dissent flags", value: "1 Strong · 1 Mod", variant: "accent" },
      ],
      agents: [
        { name: "Cartographer", initials: "CA", model: "Gemini 3.1 Pro", pct: 52, dissent: false },
        { name: "Methodologist", initials: "ME", model: "GPT-4o", pct: 48, dissent: false },
        { name: "Contrarian", initials: "CO", model: "Claude Sonnet 4.6", pct: 28, dissent: true },
        { name: "Synthesizer", initials: "SY", model: "GPT-4o", pct: 44, dissent: false },
        { name: "Pragmatist", initials: "PR", model: "Grok 4.1 Fast", pct: 42, dissent: false },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Dissertation defence (ESM) — ls mode, academic integrity
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "edu-dissertation-defence",
    sessionTag: "dissertation-esm-2026",
    title: "Dissertation Defence Session — Outcomes — Augle",
    description:
      "Full deliberation record — Letters & Science session. Multi-agent ensemble, three phases, Guardian academic integrity log, confidence grade, unresolved objections.",
    tags: [
      { label: "Academic research", variant: "domain" },
      { label: "Universities", variant: "vertical" },
      { label: "Standard · methodology chapter uploaded", variant: "depth" },
      { label: "Guardian · academic integrity", variant: "guardian" },
    ],
    timestamp: "3d ago · University of Edinburgh",
    question: `"Does experience sampling via smartphone provide sufficient ecological validity to support attentional state claims in naturalistic environments?"`,
    context: "PhD Candidate, Cognitive Science · Pre-dissertation defence · Methodology chapter submitted as context document",
    finding: {
      grade: "Contested",
      confidence: 44,
      gradeNote: "Absolute naturalistic attentional claims are not supportable as currently framed. Relative comparisons between conditions: Probable.",
      text: `The ensemble finds that smartphone experience sampling provides sufficient ecological validity for relative comparisons between attentional conditions — that claim is Probable. However, the absolute claim that ESM measures naturalistic attentional states is Contested. The Contrarian's Strong objection on causal entanglement — that a self-report triggered by an attentional interruption measures post-interruption attentional recovery, not naturalistic attentional state — is unresolved and constitutes the committee's most likely line of attack. The claim split is the central actionable output of this session: reframe absolute claims as relative ones before the defence.`,
      reopenLabel: "Reopen conditions · evidence-triggered, not market-triggered",
      reopenConditions: [
        {
          id: "RC1",
          text: "Published reliability data for the 3-item Likert operationalisation of attentional state in smartphone-delivery contexts",
          trigger: "Trigger: Peer-reviewed publication · Direction: Probable grade possible for construct validity node",
        },
        {
          id: "RC2",
          text: "Study directly comparing notification-triggered vs. researcher-initiated ESM on attentional outcomes in the same population",
          trigger: "Trigger: Direct comparative study · Direction: Resolves causal entanglement objection",
        },
        {
          id: "RC3",
          text: "Reframing of the thesis claim from absolute naturalistic attentional state to post-interruption attentional recovery — committee response would be substantively different",
          trigger: "Trigger: Thesis revision · Direction: Probable grade achievable with revised claim scope",
        },
      ],
    },
    phases: [
      {
        label: "Phase 1 · Exploration",
        agents: [
          {
            agent: "Cartographer",
            model: "Gemini 3.1 Pro · T=0.8",
            confidence: 52,
            paragraphs: [
              "**Settled ground:** Experience sampling methodology (ESM) is an established data collection technique. Smartphone delivery of ESM is technically feasible and widely used. Within-person variability in attentional state is real and measurable.",
              "**Contested terrain:** Whether smartphone notification triggers introduce systematic attentional bias into ESM data. Whether self-report instruments are valid measures of attentional state in interrupted contexts.",
              "**Unknown territory:** No published study has directly compared notification-triggered vs. researcher-initiated ESM on attentional outcomes. The 3-item Likert scale used in this thesis has no published reliability data in smartphone-delivery contexts.",
              "**Knowledge gaps entered:** (1) Notification-triggered vs. researcher-initiated comparative study — does not exist. (2) Smartphone ESM reliability data for this specific instrument — does not exist.",
            ],
          },
          {
            agent: "Methodologist",
            model: "GPT-4o · T=0.5",
            confidence: 48,
            paragraphs: [
              "**Construct validity concern flagged:** The 3-item Likert operationalisation of attentional state has no published reliability data for smartphone delivery contexts. This is a material construct validity gap — the instrument may not measure what it claims in this delivery modality.",
              "Evidence ceiling: all nodes Probable or below. The ecological validity literature for ESM generally is Probable — established enough but with significant construct validity variation by instrument and population. No node qualifies for Established given the instrument-specific gap and the notification mechanism ambiguity.",
            ],
          },
          {
            agent: "Contrarian",
            model: "Claude Sonnet 4.6 · T=1.0",
            confidence: 28,
            paragraphs: [
              "**@Cartographer** — Steelman: ESM is a validated methodology with strong ecological validity credentials in the literature. The candidate's design follows established practice and the instrument, while not validated for smartphone delivery specifically, is drawn from validated attentional state measures.",
              `Strong objection [Phase 1]: "The thesis makes an absolute causal claim — that ESM via smartphone measures naturalistic attentional state. This is philosophically entangled: a self-report triggered by a smartphone notification is not a measure of naturalistic attentional state. It is a measure of attentional state at the moment of notification-triggered interruption. These are not the same construct. The thesis conflates them throughout Chapter 3." Resolution condition: Reframe all absolute attentional state claims as post-interruption attentional recovery claims, or provide a theoretical account of why the distinction does not matter for the specific research question.`,
            ],
          },
        ],
      },
      {
        label: "Phase 2 · Deliberation",
        agents: [
          {
            agent: "Methodologist",
            model: "GPT-4o · T=0.5",
            confidence: 45,
            paragraphs: [
              "The Contrarian's Strong objection has been reviewed. The causal entanglement problem is methodologically valid — it is a construct validity issue, not a procedure issue. The Methodologist cannot resolve this objection within the current evidence base. The causal entanglement objection is formally unresolved.",
              `However, the thesis's relative comparisons between attentional conditions — "higher attentional demand in condition A vs. condition B" — are not affected by the causal entanglement objection in the same way. Those claims are Probable. The Methodologist issues a claim split: absolute claims (naturalistic attentional state) are Contested; relative comparisons between conditions are Probable.`,
            ],
          },
          {
            agent: "Contrarian",
            model: "Claude Sonnet 4.6 · T=1.0",
            confidence: 31,
            paragraphs: [
              "I accept the Methodologist's claim split. The relative comparison claims are defensible and I do not escalate my objection to those claims. The absolute naturalistic attentional state claims remain contested.",
              `Additional Moderate objection: "The absence of published reliability data for the Likert instrument in smartphone-delivery contexts is a gap the candidate has not acknowledged in Chapter 3. The committee will raise this. The candidate should preempt it with a limitations statement." Resolution condition: Explicit instrument limitation acknowledgment in thesis and defence preparation.`,
            ],
          },
          {
            agent: "Synthesizer",
            model: "GPT-4o · T=0.0",
            confidence: 46,
            paragraphs: [
              "Phase 2 synthesis: Claim split confirmed. Relative comparisons between conditions: Probable (44–52% confidence across nodes). Absolute naturalistic attentional state claims: Contested (causal entanglement objection unresolved). Overall session confidence: 44% — reflects the Contested grade on the primary claim. No Grade Challenge triggered on relative comparison claims.",
            ],
          },
        ],
      },
      {
        label: "Phase 3 · Synthesis",
        agents: [
          {
            agent: "Contrarian",
            model: "Claude Sonnet 4.6 · T=1.0",
            confidence: 28,
            paragraphs: [
              "Final steelman: The thesis is methodologically careful in its procedure design. ESM is appropriate for the research questions. The candidate's awareness of ecological validity concerns is evident in the design. The instrument limitation is a known constraint, not a design flaw.",
              `Final Strong objection [Unresolved]: The causal entanglement objection stands. "Self-report triggered by an attentional interruption is not a measure of naturalistic attention — it is a measure of post-interruption attentional recovery. The thesis conflates them throughout Chapter 3 and in the claims at 4.2, 4.7, and 5.1." Resolution condition: Full reframe of absolute claims in Chapter 3 and relevant results sections, plus a defence-ready committee response.`,
            ],
          },
          {
            agent: "Synthesizer",
            model: "GPT-4o · T=0.0",
            confidence: 44,
            paragraphs: [
              "**Final finding: Contested · 44% confidence**",
              "Split finding. Relative comparisons between attentional conditions: Probable — ESM via smartphone is sufficient for this claim type. Absolute naturalistic attentional state claims: Contested — the causal entanglement objection is unresolved and the committee will raise it. The primary claims of Chapter 3 are in the Contested category. This session's primary value is in identifying the specific objection, the specific claims it applies to (4.2, 4.7, 5.1), and the precise reframe that would resolve it.",
            ],
          },
          {
            agent: "Pragmatist",
            model: "Grok 4.1 Fast · T=0.3",
            confidence: 42,
            paragraphs: [
              "Confidence ceiling inherited: Contested · 44%. Actionable pre-defence steps within that ceiling:",
              "(1) Reframe claims at 4.2, 4.7, and 5.1 from absolute naturalistic attentional state to post-interruption attentional recovery. This is a 2–3 sentence change per section — not a thesis rewrite.",
              "(2) Add instrument limitation paragraph to Chapter 3 methods section. Acknowledge that the 3-item Likert has not been validated for smartphone delivery specifically. This preempts the committee's second most likely line of questioning.",
              "(3) Prepare a 90-second committee response to the causal entanglement objection. The response should: (a) accept the distinction, (b) explain why the relative comparison claims hold regardless, (c) frame the absolute claims as a limitation acknowledged in the revised thesis.",
              `Follow-on session proposal: "Does post-interruption attentional recovery differ systematically from naturalistic attentional state in ESM contexts?" — this is the research question that would close the gap identified in this session.`,
            ],
          },
        ],
      },
    ],
    dissentBadge: "1 Strong Unresolved · 1 Moderate",
    dissentBadgeVariant: "bad",
    objections: [
      {
        strength: "strong",
        mention: "@Contrarian → @Cartographer",
        phaseLabel: "Phase 1 · carried to Phase 3",
        status: "Unresolved",
        statusVariant: "unresolved",
        steelman:
          "ESM is a validated methodology with strong ecological validity credentials. The candidate's design follows established practice. The instrument, while not validated for smartphone delivery specifically, draws from validated attentional state measures.",
        text: `"Self-report triggered by an attentional interruption is not a measure of naturalistic attention — it is a measure of post-interruption attentional recovery. The thesis conflates them throughout Chapter 3 and in the claims at 4.2, 4.7, and 5.1."`,
        resolution:
          "Reframe all absolute attentional state claims as post-interruption attentional recovery claims, or provide a theoretical account of why the distinction does not matter for the specific research question",
      },
      {
        strength: "moderate",
        mention: "@Contrarian → @Methodologist",
        phaseLabel: "Phase 2",
        status: "Actionable",
        statusVariant: "resolved",
        steelman:
          "The instrument limitation is a known constraint in ESM research, not a design flaw. Many published ESM studies use instruments without smartphone-delivery-specific validation.",
        text: `"The absence of published reliability data for the Likert instrument in smartphone-delivery contexts is a gap the candidate has not acknowledged in Chapter 3. The committee will raise this."`,
        resolution: "Explicit instrument limitation acknowledgment in thesis limitations section and preparation of committee response",
        resolutionNote: "Pragmatist action item: Add instrument limitation paragraph to Chapter 3 methods section before defence",
      },
    ],
    guardian: {
      mode: "Academic integrity mode",
      badgeStatus: "Clean",
      badgeVariant: "good",
      score: 96,
      description:
        "No retracted papers. No preprint citations in primary claims. Methodology chapter authenticated. Self-citation ratio within field norms. Phase boundary clearances issued at P1/2 and P2/3.",
      dims: [
        { label: "Source quality", value: 97 },
        { label: "Retraction check", value: 100 },
        { label: "Preprint flag", value: 94 },
        { label: "Self-citation ratio", value: 96 },
      ],
      svsLabel: "SVS verification log · 11 citations checked",
      svsRows: [
        { status: "ok", source: "Csikszentmihalyi & Larson (1987) — ESM foundational methodology paper", type: "Peer-reviewed · Verified" },
        { status: "ok", source: "Shiffman et al. (2008) — Ecological momentary assessment review", type: "Peer-reviewed · Verified" },
        { status: "ok", source: "Zeigarnik & colleagues (2021) — Smartphone ESM validity systematic review", type: "Peer-reviewed · Verified" },
        {
          status: "flag",
          source: "Müller et al. (2024) — Attentional interruption in mobile contexts",
          type: "Preprint · Flagged",
          flagNote: "SVS_PREPRINT — bioRxiv preprint, not peer-reviewed · Evidence node capped at Probable · Flagged for substitution",
        },
        { status: "ok", source: "Robertson & Garavan (2004) — Attentional state self-report validity", type: "Peer-reviewed · Verified" },
      ],
      svsSummary: "+6 additional citations verified · 0 retracted · 1 preprint flagged above",
    },
    sidebar: {
      metadata: [
        { label: "Session ID", value: "dissertation-esm-2026" },
        { label: "Vertical", value: "Universities" },
        { label: "Depth", value: "Standard" },
        { label: "Runtime", value: "16m 12s" },
        { label: "Doc uploaded", value: "Yes · Ch. 3", variant: "green" },
        { label: "Guardian mode", value: "Academic", variant: "accent" },
        { label: "Guardian score", value: "96% · Clean", variant: "green" },
        { label: "Citations", value: "11 · 1 preprint" },
        { label: "Dissent flags", value: "1 Strong · 1 Mod", variant: "accent" },
      ],
      agents: [
        { name: "Cartographer", initials: "CA", model: "Gemini 3.1 Pro", pct: 52, dissent: false },
        { name: "Methodologist", initials: "ME", model: "GPT-4o", pct: 48, dissent: false },
        { name: "Contrarian", initials: "CO", model: "Claude Sonnet 4.6", pct: 28, dissent: true },
        { name: "Synthesizer", initials: "SY", model: "GPT-4o", pct: 44, dissent: false },
        { name: "Pragmatist", initials: "PR", model: "Grok 4.1 Fast", pct: 42, dissent: false },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Masking mandates — ls mode, policy/academic integrity
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "policy-masking-mandates",
    sessionTag: "policy-masking-mandates",
    title: "Indoor Masking Mandates & Transmission — Outcomes — Augle",
    description:
      "Full deliberation record — Letters & Science session. Multi-agent ensemble, three phases, Guardian academic integrity log, confidence grade, unresolved objections.",
    tags: [
      { label: "Policy", variant: "domain" },
      { label: "Policy + Lawmakers", variant: "vertical" },
      { label: "Standard · evidence review uploaded", variant: "depth" },
      { label: "Guardian · academic integrity", variant: "guardian" },
    ],
    timestamp: "1d ago · Public Health Directorate",
    question: `"What does the evidence establish about the effectiveness of indoor masking mandates in reducing COVID-19 community transmission?"`,
    context: "Senior policy adviser · Retrospective evidence review · Systematic review submitted as context document",
    finding: {
      grade: "Contested",
      confidence: 38,
      gradeNote: "The mandate effect cannot be isolated from concurrent interventions. Directional causal claim: Contested.",
      text: `The ensemble returns a Contested finding on the effectiveness of indoor masking mandates for reducing community transmission. Mechanistic and laboratory evidence for source control is reasonably strong, but the population-level policy question is confounded: most observational studies of mandates cannot separate the mandate's effect from concurrent non-pharmaceutical interventions (distancing, capacity limits, lockdown timing, behavioural change) introduced in the same window. The Contrarian's Strong objection — that the mandate effect is not identifiable from the available designs — is unresolved. The mechanism-level claim (well-fitting masks reduce exhaled particle spread) is Probable; the policy-level causal claim (mandates reduced community transmission by a specified amount) is Contested. The actionable output: separate the mechanistic from the policy claim, and do not attribute a point estimate to the mandate alone.`,
      reopenLabel: "Reopen conditions · evidence-triggered, not market-triggered",
      reopenConditions: [
        {
          id: "RC1",
          text: "A cluster-randomised trial of masking at the community level with transmission as the outcome, isolated from other NPIs",
          trigger: "Trigger: Cluster-RCT publication · Direction: Policy-level causal claim becomes gradeable",
        },
        {
          id: "RC2",
          text: "A natural-experiment design exploiting staggered mandate timing while holding other NPIs constant",
          trigger: "Trigger: Quasi-experimental study · Direction: Partially resolves the co-intervention confound",
        },
        {
          id: "RC3",
          text: `Reframing the review's claim from "mandates reduced transmission by X" to a mechanism-plus-adherence claim with explicit confound acknowledgment`,
          trigger: "Trigger: Claim revision · Direction: Probable grade achievable for the mechanism claim",
        },
      ],
    },
    phases: [
      {
        label: "Phase 1 · Exploration",
        agents: [
          {
            agent: "Cartographer",
            model: "Gemini 3.1 Pro · T=0.8",
            confidence: 59,
            paragraphs: [
              "**Settled ground:** Respiratory particles carry SARS-CoV-2. Well-fitting masks reduce outward particle emission in laboratory and mechanistic studies. Adherence to mandates varies widely across settings.",
              "**Contested terrain:** Whether mandates (as opposed to individual mask-wearing) reduced community transmission at the population level, and by how much. How much of any observed reduction is attributable to the mandate versus co-timed interventions.",
              "**Unknown territory:** No community-level cluster-randomised trial isolates the mandate effect from concurrent NPIs. Adherence and mask-type data are rarely captured alongside transmission outcomes.",
              "**Knowledge gaps entered:** (1) Mandate-isolated cluster-RCT — does not exist at scale. (2) Adherence-adjusted population estimate — largely unavailable.",
            ],
          },
          {
            agent: "Methodologist",
            model: "GPT-4o · T=0.5",
            confidence: 52,
            paragraphs: [
              "**Identification concern flagged:** The uploaded review pools observational studies in which masking mandates were introduced alongside other NPIs. The mandate effect is not separately identified in most of these designs — the estimand is a bundle, not the mandate. This is a causal-identification problem, not a data-quality one.",
              "Evidence ceiling: the policy-level causal claim is capped at Contested — co-intervention confounding cannot be resolved within observational designs that lack a clean control. The mechanism-level claim (mask source control) is Probable on laboratory and mechanistic evidence. No node reaches Established for the population policy claim.",
            ],
          },
          {
            agent: "Contrarian",
            model: "Claude Sonnet 4.6 · T=1.0",
            confidence: 33,
            paragraphs: [
              "**@Cartographer** — Steelman: The mechanistic case for masks as source control is sound, and the precautionary logic behind mandates during a respiratory pandemic is defensible. It is reasonable to expect some effect.",
              `Strong objection [Phase 1]: "The policy claim is not identifiable from the evidence base. Mandates were introduced simultaneously with distancing, capacity limits, and behavioural change. Studies that report a transmission reduction after a mandate are measuring the joint effect of everything that changed in that window, not the mandate. Attributing a point estimate to the mandate alone is a confounded inference." Resolution condition: A design that isolates the mandate from co-timed NPIs — a cluster-RCT or a natural experiment with staggered timing.`,
            ],
          },
        ],
      },
      {
        label: "Phase 2 · Deliberation",
        agents: [
          {
            agent: "Methodologist",
            model: "GPT-4o · T=0.5",
            confidence: 44,
            paragraphs: [
              "The Contrarian's Strong objection is upheld. Co-intervention confounding is a genuine identification failure — it cannot be resolved within the observational designs that dominate this literature. The objection is formally unresolved.",
              "However, the mechanism-level claim is separable. That well-fitting masks reduce outward particle emission is supported by laboratory and mechanistic evidence independent of the population question. The Methodologist issues a claim split: the policy-level causal claim (mandates reduced community transmission) is Contested; the mechanism-level claim (mask source control) is Probable.",
            ],
          },
          {
            agent: "Contrarian",
            model: "Claude Sonnet 4.6 · T=1.0",
            confidence: 36,
            paragraphs: [
              "I accept the Methodologist's claim split. The mechanism claim is defensible and I do not escalate my objection to it. The policy-level causal claim remains contested.",
              `Additional Moderate objection: "Adherence is treated as if uniform. A mandate with 40% compliance and one with 90% compliance are different interventions, yet the review pools them. Any effect estimate that ignores adherence heterogeneity is not interpretable." Resolution condition: Stratify or adjust for measured adherence before reporting any pooled estimate.`,
            ],
          },
          {
            agent: "Synthesizer",
            model: "GPT-4o · T=0.0",
            confidence: 41,
            paragraphs: [
              "Phase 2 synthesis: Claim split confirmed. Mechanism-level claim (mask source control): Probable. Policy-level causal claim (mandates reduced transmission): Contested (co-intervention confounding and adherence heterogeneity unresolved). Overall session confidence: 38% — reflects the Contested grade on the primary policy claim. No Grade Challenge triggered on the mechanism claim.",
            ],
          },
        ],
      },
      {
        label: "Phase 3 · Synthesis",
        agents: [
          {
            agent: "Contrarian",
            model: "Claude Sonnet 4.6 · T=1.0",
            confidence: 33,
            paragraphs: [
              "Final steelman: The mechanistic evidence is real and the policy intent was reasonable under uncertainty. A cautious reader can hold that masks help at the individual level.",
              `Final Strong objection [Unresolved]: The identification problem stands. "No available design isolates the mandate from the interventions introduced alongside it. A transmission drop after a mandate is the joint effect of the whole policy package. Reporting a mandate-specific point estimate from these data overstates what can be known." Resolution condition: A mandate-isolated cluster-RCT or a staggered-timing natural experiment.`,
            ],
          },
          {
            agent: "Synthesizer",
            model: "GPT-4o · T=0.0",
            confidence: 44,
            paragraphs: [
              "**Final finding: Contested · 38% confidence**",
              "Split finding. Mechanism-level claim (mask source control): Probable — supported by laboratory and mechanistic evidence. Policy-level causal claim (mandates reduced community transmission): Contested — co-intervention confounding and adherence heterogeneity are unresolved and no design in the evidence base isolates the mandate. This session's value is in separating the two claims and refusing to attribute a population point estimate to the mandate alone.",
            ],
          },
          {
            agent: "Pragmatist",
            model: "Grok 4.1 Fast · T=0.3",
            confidence: 42,
            paragraphs: [
              "Confidence ceiling inherited: Contested · 38%. Actionable steps within that ceiling:",
              "(1) In the review, report the mechanism claim and the policy claim separately. State the mechanism claim as Probable and the mandate-effect claim as Contested — do not merge them into a single headline estimate.",
              "(2) Add an explicit co-intervention confound statement wherever a post-mandate transmission change is cited, naming the other NPIs active in the same window.",
              "(3) Where a point estimate is unavoidable, present it as the effect of the policy package, not the mandate, and stratify by measured adherence where data allow.",
              `Follow-on session proposal: "What does the quasi-experimental evidence with staggered mandate timing establish about the mandate-specific effect?" — the question that would move the policy claim toward Probable.`,
            ],
          },
        ],
      },
    ],
    dissentBadge: "1 Strong Unresolved · 1 Moderate",
    dissentBadgeVariant: "bad",
    objections: [
      {
        strength: "strong",
        mention: "@Contrarian → @Cartographer",
        phaseLabel: "Phase 1 · carried to Phase 3",
        status: "Unresolved",
        statusVariant: "unresolved",
        steelman:
          "The mechanistic case for masks as source control is sound, and precautionary policy under pandemic uncertainty is defensible. Expecting some effect is reasonable.",
        text: `"The policy claim is not identifiable. Mandates were introduced alongside distancing, capacity limits, and behavioural change — a measured transmission drop is the joint effect of everything that changed, not the mandate alone."`,
        resolution: "A design that isolates the mandate from co-timed NPIs — a cluster-RCT or a staggered-timing natural experiment",
      },
      {
        strength: "moderate",
        mention: "@Contrarian → @Methodologist",
        phaseLabel: "Phase 2",
        status: "Actionable",
        statusVariant: "resolved",
        steelman: "Pooling across settings is standard practice in rapid evidence reviews, and adherence data were genuinely scarce during the period studied.",
        text: `"Adherence is treated as uniform. A mandate at 40% compliance and one at 90% are different interventions, yet the review pools them — the estimate is not interpretable without adherence adjustment."`,
        resolution: "Stratify or adjust for measured adherence before reporting any pooled estimate",
        resolutionNote: "Pragmatist action item: Report mechanism and policy claims separately; attach co-intervention caveat to every post-mandate figure",
      },
    ],
    guardian: {
      mode: "Academic integrity mode",
      badgeStatus: "Clean",
      badgeVariant: "good",
      score: 96,
      description:
        "No retracted papers. One preprint down-weighted below the primary-claim threshold. Adherence-data availability flagged as a coverage gap across the pooled studies. Self-citation ratio within field norms. Phase boundary clearances issued at P1/2 and P2/3.",
      dims: [
        { label: "Source quality", value: 97 },
        { label: "Retraction check", value: 100 },
        { label: "Preprint flag", value: 94 },
        { label: "Self-citation ratio", value: 96 },
      ],
      svsLabel: "SVS verification log · 16 citations checked",
      svsRows: [
        { status: "ok", source: "Cochrane review (2023) — physical interventions to interrupt respiratory virus spread", type: "Peer-reviewed · Verified" },
        { status: "ok", source: "Laboratory study — mask material and fit vs. particle emission", type: "Peer-reviewed · Verified" },
        { status: "ok", source: "Natural-experiment study — staggered regional mandate timing", type: "Peer-reviewed · Verified" },
        {
          status: "flag",
          source: "Preprint (2023) — observational mandate-effect estimate",
          type: "Preprint · Flagged",
          flagNote: "SVS_PREPRINT — medRxiv preprint, not peer-reviewed · Evidence node capped at Probable · Flagged for substitution",
        },
        { status: "ok", source: "Observational cohort — community transmission before/after mandate", type: "Peer-reviewed · Verified" },
      ],
      svsSummary: "+11 additional citations verified · 0 retracted · 1 preprint flagged above",
    },
    sidebar: {
      metadata: [
        { label: "Session ID", value: "policy-masking-mandates" },
        { label: "Vertical", value: "Policy + Lawmakers" },
        { label: "Depth", value: "Standard" },
        { label: "Runtime", value: "18m 33s" },
        { label: "Attachment", value: "evidence review" },
        { label: "Guardian mode", value: "Academic", variant: "accent" },
        { label: "Guardian score", value: "96% · Clean", variant: "green" },
        { label: "Citations", value: "11 · 1 preprint" },
        { label: "Dissent flags", value: "1 Strong · 1 Mod", variant: "accent" },
      ],
      agents: [
        { name: "Cartographer", initials: "CA", model: "Gemini 3.1 Pro", pct: 52, dissent: false },
        { name: "Methodologist", initials: "ME", model: "GPT-4o", pct: 48, dissent: false },
        { name: "Contrarian", initials: "CO", model: "Claude Sonnet 4.6", pct: 28, dissent: true },
        { name: "Synthesizer", initials: "SY", model: "GPT-4o", pct: 44, dissent: false },
        { name: "Pragmatist", initials: "PR", model: "Grok 4.1 Fast", pct: 42, dissent: false },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // MNPI / SEC enforcement exposure — ls mode, legal/source integrity
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "policy-mnpi-exposure",
    sessionTag: "policy-mnpi-exposure",
    title: "SEC Enforcement Exposure (MNPI) — Outcomes — Augle",
    description:
      "Full deliberation record — Letters & Science session. Multi-agent ensemble, three phases, Guardian academic integrity log, confidence grade, unresolved objections.",
    tags: [
      { label: "Policy", variant: "domain" },
      { label: "Law Firms", variant: "vertical" },
      { label: "Deep · enforcement dataset uploaded", variant: "depth" },
      { label: "Guardian · source integrity", variant: "guardian" },
    ],
    timestamp: "2d ago · Securities Regulation Clinic",
    question: `"Based on SEC enforcement patterns over five years, what is the realistic exposure profile on the material non-public information question?"`,
    context: "Law-school regulatory clinic · Exposure analysis · Five-year enforcement dataset submitted as context",
    finding: {
      grade: "Probable",
      confidence: 61,
      gradeNote: "Exposure profile is well-supported by the enforcement record. Base-rate assumption is the open question.",
      text: `The ensemble returns a Probable finding on the exposure profile. The five-year enforcement record supports the analysis's central characterisation: where documented insider contact is present, enforcement follows a consistent and predictable pattern, and the exposure factors the analysis identifies are the ones the record actually turns on. The Contrarian raised a Moderate objection — that the analysis's assumed base rate of enforcement absent documented contact is higher than the record supports — which was addressed by scoping the estimate to the documented-contact scenario. This is not a Contested finding: the objection narrowed the claim rather than defeating it. The actionable output is a defensible exposure profile for the documented-contact scenario, with the base-rate caveat made explicit. This is analysis of enforcement patterns, not legal advice.`,
      reopenLabel: "Reopen conditions · evidence-triggered, not market-triggered",
      reopenConditions: [
        {
          id: "RC1",
          text: "A larger sample of enforcement actions in the no-documented-contact scenario to firm up the base-rate estimate",
          trigger: "Trigger: Expanded enforcement dataset · Direction: Established grade possible on the base-rate node",
        },
        {
          id: "RC2",
          text: "A change in SEC enforcement priorities or a significant new precedent in the relevant circuit",
          trigger: "Trigger: New enforcement guidance or precedent · Direction: Would revise the exposure profile",
        },
        {
          id: "RC3",
          text: "Additional facts establishing or excluding documented insider contact in the specific matter",
          trigger: "Trigger: New case facts · Direction: Moves the estimate between scenarios",
        },
      ],
    },
    phases: [
      {
        label: "Phase 1 · Exploration",
        agents: [
          {
            agent: "Cartographer",
            model: "Gemini 3.1 Pro · T=0.8",
            confidence: 72,
            paragraphs: [
              "**Settled ground:** Where documented insider contact exists, the SEC enforcement record over the five-year dataset is consistent and predictable. The factors the analysis identifies (contact documentation, trading timing, materiality) are the ones the record turns on.",
              "**Contested terrain:** The base rate of enforcement in the absence of documented contact. Whether recent priority shifts change the historical pattern.",
              "**Unknown territory:** Enforcement decisions that settle before public docketing are not in the dataset, so the true denominator is partially unobserved.",
              "**Knowledge gaps entered:** (1) No-documented-contact enforcement base rate — thin sample. (2) Pre-docketing settlements — not observable in the record.",
            ],
          },
          {
            agent: "Methodologist",
            model: "GPT-4o · T=0.5",
            confidence: 74,
            paragraphs: [
              "**Evidence sufficiency assessed:** The documented-contact scenario is well-supported — the five-year record is sizeable and the pattern is stable, which supports a Probable grade for the exposure profile in that scenario. The no-documented-contact base rate rests on a thinner sample.",
              "Evidence ceiling: the documented-contact exposure profile is Probable. The no-documented-contact estimate is capped lower by sample size. This is a genuine Probable finding on the primary question, not a Contested one — the record is strong enough to support the central characterisation.",
            ],
          },
          {
            agent: "Contrarian",
            model: "Claude Sonnet 4.6 · T=1.0",
            confidence: 55,
            paragraphs: [
              "**@Cartographer** — Steelman: The documented-contact analysis is sound and the enforcement record genuinely supports it. I do not dispute the central exposure profile.",
              `Moderate objection [Phase 1]: "The analysis assumes a base rate of enforcement in the no-documented-contact scenario that is higher than the five-year record supports. The record is thin there — few actions, and an unknown number of pre-docketing settlements. The central exposure profile is fine; the concern is that the base-rate assumption inflates the no-contact tail of the estimate." Resolution condition: Scope the exposure profile to the documented-contact scenario and state the no-contact base rate as a separate, lower-confidence estimate.`,
            ],
          },
        ],
      },
      {
        label: "Phase 2 · Deliberation",
        agents: [
          {
            agent: "Methodologist",
            model: "GPT-4o · T=0.5",
            confidence: 68,
            paragraphs: [
              "The Contrarian's Moderate objection is well-taken and resolvable. The base-rate concern applies only to the no-documented-contact tail, not to the central documented-contact profile. Scoping the estimate to the documented-contact scenario and reporting the no-contact base rate separately, at lower confidence, addresses it fully.",
              "With that scoping, the primary exposure profile holds at Probable. This is an objection that narrows and sharpens the claim rather than defeating it — no Contested downgrade is warranted.",
            ],
          },
          {
            agent: "Contrarian",
            model: "Claude Sonnet 4.6 · T=1.0",
            confidence: 58,
            paragraphs: [
              "I accept the scoping. The documented-contact exposure profile is well-supported and I do not escalate. My objection is addressed by separating the two scenarios.",
              `Additional Moderate objection: "The dataset omits pre-docketing settlements, so the observed denominator understates total enforcement activity. This should be stated as a known limitation of the base-rate figure." Resolution condition: Explicit acknowledgment that pre-docketing settlements are unobserved in the dataset.`,
            ],
          },
          {
            agent: "Synthesizer",
            model: "GPT-4o · T=0.0",
            confidence: 70,
            paragraphs: [
              "Phase 2 synthesis: The primary exposure profile (documented-contact scenario) is Probable — the enforcement record supports it and the Contrarian's objection has been addressed by scoping. The no-documented-contact base rate is reported separately at lower confidence. Overall session confidence: 61% — a genuine Probable finding. No unresolved Strong objection remains.",
            ],
          },
        ],
      },
      {
        label: "Phase 3 · Synthesis",
        agents: [
          {
            agent: "Contrarian",
            model: "Claude Sonnet 4.6 · T=1.0",
            confidence: 55,
            paragraphs: [
              "Final position: The documented-contact exposure profile is well-supported and I register no unresolved objection to it. The enforcement record is consistent and the analysis reads it correctly.",
              `Residual note [Addressed]: My base-rate concern was resolved by scoping. "The no-documented-contact estimate should travel with an explicit lower-confidence label and the pre-docketing-settlement caveat. With those in place, I do not dissent from the Probable grade on the primary profile." Status: addressed by the claim scoping in Phase 2.`,
            ],
          },
          {
            agent: "Synthesizer",
            model: "GPT-4o · T=0.0",
            confidence: 44,
            paragraphs: [
              "**Final finding: Probable · 61% confidence**",
              "The exposure profile for the documented-contact scenario is Probable — the five-year enforcement record supports the analysis's central characterisation, and the one Moderate objection was resolved by scoping rather than left unresolved. The no-documented-contact base rate is reported separately at lower confidence, carrying the thin-sample and pre-docketing-settlement caveats. This is analysis of enforcement patterns, not legal advice, and any application to a specific matter turns on its specific facts.",
            ],
          },
          {
            agent: "Pragmatist",
            model: "Grok 4.1 Fast · T=0.3",
            confidence: 42,
            paragraphs: [
              "Confidence ceiling inherited: Probable · 61%. Actionable steps within that ceiling:",
              "(1) Present the exposure profile in two clearly separated scenarios — documented contact (Probable) and no documented contact (lower confidence) — rather than a single blended figure.",
              "(2) Attach the pre-docketing-settlement caveat to the base-rate figure wherever it appears, so a reader does not over-read the observed denominator.",
              "(3) Flag the two reopen triggers (expanded dataset; new enforcement guidance or precedent) that would revise the profile, so the analysis has a defined shelf life.",
              `Follow-on session proposal: "How would a documented shift in SEC enforcement priorities revise the exposure profile?" — the question that would stress-test the finding. This output is enforcement-pattern analysis, not legal advice.`,
            ],
          },
        ],
      },
    ],
    dissentBadge: "2 Moderate · both addressed",
    dissentBadgeVariant: "warn",
    objections: [
      {
        strength: "moderate",
        mention: "@Contrarian → @Cartographer",
        phaseLabel: "Phase 1 · addressed Phase 2",
        status: "Addressed",
        statusVariant: "resolved",
        steelman: "The documented-contact analysis is sound and the enforcement record genuinely supports it. The central exposure profile is not in dispute.",
        text: `"The analysis assumes a no-documented-contact enforcement base rate higher than the thin record supports, inflating the no-contact tail of the estimate. The central profile is fine; the base-rate assumption is not."`,
        resolution: "Scope the profile to the documented-contact scenario; report the no-contact base rate separately at lower confidence (done in Phase 2)",
      },
      {
        strength: "moderate",
        mention: "@Contrarian → @Methodologist",
        phaseLabel: "Phase 2",
        status: "Actionable",
        statusVariant: "resolved",
        steelman: "The omission of pre-docketing settlements is a known limitation of public enforcement datasets, not a flaw specific to this analysis.",
        text: `"The dataset omits pre-docketing settlements, so the observed denominator understates total enforcement activity. The base-rate figure should carry this caveat."`,
        resolution: "Explicit acknowledgment that pre-docketing settlements are unobserved in the dataset",
        resolutionNote: "Pragmatist action item: Present the two scenarios separately and attach the settlement caveat to the base-rate figure",
      },
    ],
    guardian: {
      mode: "Source integrity mode",
      badgeStatus: "Clean",
      badgeVariant: "good",
      score: 96,
      description:
        "All enforcement citations traced to primary SEC releases and court dockets. No retracted or secondary-source-only citations in primary claims. Dataset provenance authenticated. Pre-docketing coverage gap noted. Phase boundary clearances issued at P1/2 and P2/3.",
      dims: [
        { label: "Source quality", value: 97 },
        { label: "Retraction check", value: 100 },
        { label: "Secondary-source flag", value: 94 },
        { label: "Self-citation ratio", value: 96 },
      ],
      svsLabel: "SVS verification log · 19 citations checked",
      svsRows: [
        { status: "ok", source: "SEC v. — litigation release (documented-contact matter)", type: "Peer-reviewed · Verified" },
        { status: "ok", source: "SEC administrative proceeding — settled order with findings", type: "Peer-reviewed · Verified" },
        { status: "ok", source: "Circuit opinion — materiality standard applied", type: "Peer-reviewed · Verified" },
        {
          status: "flag",
          source: "Secondary summary — enforcement-statistics blog post",
          type: "Secondary · Down-weighted",
          flagNote: "SVS_SECONDARY — secondary source, not a primary release · Down-weighted; primary citation substituted",
        },
        { status: "ok", source: "SEC enforcement dataset (5-year) — provenance verified", type: "Peer-reviewed · Verified" },
      ],
      svsSummary: "+14 additional citations verified · 0 retracted · 1 secondary source down-weighted above",
    },
    sidebar: {
      metadata: [
        { label: "Session ID", value: "policy-mnpi-exposure" },
        { label: "Vertical", value: "Law Firms" },
        { label: "Depth", value: "Deep" },
        { label: "Runtime", value: "41m 22s" },
        { label: "Attachment", value: "enforcement data" },
        { label: "Guardian mode", value: "Source integrity", variant: "accent" },
        { label: "Guardian score", value: "96% · Clean", variant: "green" },
        { label: "Citations", value: "19 · 1 down-weighted" },
        { label: "Dissent flags", value: "2 Mod · addressed", variant: "accent" },
      ],
      agents: [
        { name: "Cartographer", initials: "CA", model: "Gemini 3.1 Pro", pct: 52, dissent: false },
        { name: "Methodologist", initials: "ME", model: "GPT-4o", pct: 48, dissent: false },
        { name: "Contrarian", initials: "CO", model: "Claude Sonnet 4.6", pct: 28, dissent: true },
        { name: "Synthesizer", initials: "SY", model: "GPT-4o", pct: 44, dissent: false },
        { name: "Pragmatist", initials: "PR", model: "Grok 4.1 Fast", pct: 42, dissent: false },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Photonic-chip inference throughput — ls mode, VC diligence
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "tech-photonic-chip",
    sessionTag: "tech-photonic-chip",
    title: "Photonic-Chip Inference Throughput — Outcomes — Augle",
    description:
      "Full deliberation record — Letters & Science session. Multi-agent ensemble, three phases, Guardian academic integrity log, confidence grade, unresolved objections.",
    tags: [
      { label: "Technology", variant: "domain" },
      { label: "VC + PE", variant: "vertical" },
      { label: "Deep · technical whitepaper uploaded", variant: "depth" },
      { label: "Guardian · source integrity", variant: "guardian" },
    ],
    timestamp: "2d ago · Deep-tech Diligence",
    question: `"Does the evidence support the team's claim of commercially relevant photonic-chip inference throughput at competitive precision?"`,
    context: "Technical diligence reviewer · Investment evaluation · Team whitepaper and benchmark data submitted as context",
    finding: {
      grade: "Contested",
      confidence: 28,
      gradeNote: "Demo-condition throughput is real. Commercially relevant throughput at competitive precision: Contested.",
      text: `The ensemble returns a Contested finding on the team's commercial-throughput claim. The reported throughput figures are real, but they were obtained on a single-tenant demo rack at reduced numerical precision — not under production conditions or at the precision commercial inference workloads require. The Contrarian's Strong objection is unresolved: no matched-precision production benchmark exists, so the headline throughput number cannot be compared like-for-like against incumbent accelerators. The narrow claim (the device achieves the reported throughput at the demo's reduced precision) is Probable; the commercial claim (competitive throughput at production precision and utilisation) is Contested. The actionable output for diligence: treat the throughput figure as a demo-condition upper bound, and make the term sheet contingent on a matched-precision production benchmark.`,
      reopenLabel: "Reopen conditions · evidence-triggered, not market-triggered",
      reopenConditions: [
        {
          id: "RC1",
          text: "A matched-precision benchmark at production numerical precision on a representative inference workload",
          trigger: "Trigger: Matched-precision benchmark · Direction: Commercial claim becomes gradeable",
        },
        {
          id: "RC2",
          text: "A multi-tenant / sustained-utilisation run showing throughput holds outside single-tenant demo conditions",
          trigger: "Trigger: Production-condition run · Direction: Resolves the demo-conditions objection",
        },
        {
          id: "RC3",
          text: `Reframing the pitch claim from "competitive commercial throughput" to "demo-condition throughput at reduced precision, production benchmark pending"`,
          trigger: "Trigger: Claim revision · Direction: Probable grade for the demo-scoped claim",
        },
      ],
    },
    phases: [
      {
        label: "Phase 1 · Exploration",
        agents: [
          {
            agent: "Cartographer",
            model: "Gemini 3.1 Pro · T=0.8",
            confidence: 52,
            paragraphs: [
              "**Settled ground:** The device produces the reported throughput on the demo rack at the stated (reduced) numerical precision. Photonic matrix multiplication is a genuine and active approach. The team's measurement methodology on the demo is sound.",
              "**Contested terrain:** Whether the throughput holds at production numerical precision. Whether single-tenant demo figures survive multi-tenant, sustained-utilisation operation. How the number compares like-for-like against incumbent accelerators.",
              "**Unknown territory:** No matched-precision production benchmark exists. Behaviour under sustained thermal and utilisation load is unmeasured.",
              "**Knowledge gaps entered:** (1) Matched-precision production benchmark — does not exist. (2) Sustained multi-tenant utilisation data — not provided.",
            ],
          },
          {
            agent: "Methodologist",
            model: "GPT-4o · T=0.5",
            confidence: 38,
            paragraphs: [
              "**Comparability concern flagged:** The headline throughput is measured at reduced precision on a single-tenant demo, but is presented as if comparable to incumbent accelerators running production-precision workloads. That is not a like-for-like comparison — precision and utilisation both materially affect effective throughput.",
              "Evidence ceiling: the commercial-throughput claim is capped at Contested until a matched-precision production benchmark exists. The demo-condition claim (this throughput at this precision on this rack) is Probable. No node reaches Established for the commercial claim.",
            ],
          },
          {
            agent: "Contrarian",
            model: "Claude Sonnet 4.6 · T=1.0",
            confidence: 34,
            paragraphs: [
              "**@Cartographer** — Steelman: The demo is real, the measurement is honest for what it is, and photonic inference is a legitimate frontier. The team is not fabricating numbers.",
              `Strong objection [Phase 1]: "No matched-precision production benchmark exists. The throughput headline rests on a single-tenant demo rack at reduced precision, and is then positioned against incumbents running production-precision workloads. That is not a like-for-like comparison. Precision reduction and single-tenant operation both inflate the number relative to what a commercial deployment would see. The commercial claim is unsupported until benchmarked under matched conditions." Resolution condition: A matched-precision benchmark on a representative production workload, plus sustained multi-tenant utilisation data.`,
            ],
          },
        ],
      },
      {
        label: "Phase 2 · Deliberation",
        agents: [
          {
            agent: "Methodologist",
            model: "GPT-4o · T=0.5",
            confidence: 44,
            paragraphs: [
              "The Contrarian's Strong objection is upheld. The precision-and-utilisation mismatch is a valid comparability failure — it cannot be resolved without a matched-precision production benchmark, which the team has not provided. The objection is formally unresolved.",
              "However, the demo-condition claim is separable. That the device achieves the reported throughput at the demo's reduced precision is Probable on the team's own measurements. The Methodologist issues a claim split: the commercial-throughput claim is Contested; the demo-condition throughput claim is Probable.",
            ],
          },
          {
            agent: "Contrarian",
            model: "Claude Sonnet 4.6 · T=1.0",
            confidence: 34,
            paragraphs: [
              "I accept the Methodologist's claim split. The demo-condition claim is defensible and I do not escalate my objection to it. The commercial claim remains contested.",
              `Additional Moderate objection: "The pitch materials present the reduced-precision figure as the headline number without stating the precision. A reader will assume production precision. The precision qualifier must be on the number, not in a footnote." Resolution condition: State the numerical precision alongside the headline throughput figure in the materials.`,
            ],
          },
          {
            agent: "Synthesizer",
            model: "GPT-4o · T=0.0",
            confidence: 38,
            paragraphs: [
              "Phase 2 synthesis: Claim split confirmed. Demo-condition throughput claim: Probable. Commercial-throughput claim: Contested (matched-precision production benchmark absent; single-tenant-only data). Overall session confidence: 28% — reflects the Contested grade on the primary commercial claim. No Grade Challenge triggered on the demo-condition claim.",
            ],
          },
        ],
      },
      {
        label: "Phase 3 · Synthesis",
        agents: [
          {
            agent: "Contrarian",
            model: "Claude Sonnet 4.6 · T=1.0",
            confidence: 34,
            paragraphs: [
              "Final steelman: The demo throughput is genuine and the photonic approach is a legitimate bet. Early-stage hardware is always demonstrated before it is productionised.",
              `Final Strong objection [Unresolved]: The comparability objection stands. "The headline throughput is a single-tenant, reduced-precision demo figure positioned against production-precision incumbents. Until there is a matched-precision production benchmark, the commercial claim is not supported by the evidence — the number is a demo upper bound, not a commercial spec." Resolution condition: Matched-precision production benchmark plus sustained multi-tenant utilisation data.`,
            ],
          },
          {
            agent: "Synthesizer",
            model: "GPT-4o · T=0.0",
            confidence: 44,
            paragraphs: [
              "**Final finding: Contested · 28% confidence**",
              "Split finding. Demo-condition throughput: Probable — the device achieves the reported figure at the demo's reduced precision. Commercial throughput at competitive precision: Contested — no matched-precision production benchmark exists and the data is single-tenant only. For diligence, the throughput headline should be read as a demo-condition upper bound, and any valuation resting on the commercial claim should be made contingent on the benchmark that would resolve it.",
            ],
          },
          {
            agent: "Pragmatist",
            model: "Grok 4.1 Fast · T=0.3",
            confidence: 42,
            paragraphs: [
              "Confidence ceiling inherited: Contested · 28%. Actionable diligence steps within that ceiling:",
              "(1) Treat the throughput headline as a demo-condition upper bound, not a commercial spec. Do not underwrite a valuation on the commercial claim as stated.",
              "(2) Make the term sheet contingent on a matched-precision production benchmark on a representative workload, plus sustained multi-tenant utilisation data.",
              "(3) Request the precision qualifier be stated on the headline number in all materials — its absence is itself a diligence flag.",
              `Follow-on session proposal: "Does the throughput hold at production precision under sustained multi-tenant load?" — the benchmark that would move the commercial claim toward Probable.`,
            ],
          },
        ],
      },
    ],
    dissentBadge: "1 Strong Unresolved · 1 Moderate",
    dissentBadgeVariant: "bad",
    objections: [
      {
        strength: "strong",
        mention: "@Contrarian → @Cartographer",
        phaseLabel: "Phase 1 · carried to Phase 3",
        status: "Unresolved",
        statusVariant: "unresolved",
        steelman: "The demo is real, the measurement is honest for what it is, and photonic inference is a legitimate frontier. The team is not fabricating numbers.",
        text: `"The throughput headline rests on a single-tenant demo rack at reduced precision, positioned against production-precision incumbents. That is not a like-for-like comparison — the commercial claim is unsupported until benchmarked under matched conditions."`,
        resolution: "A matched-precision benchmark on a representative production workload, plus sustained multi-tenant utilisation data",
      },
      {
        strength: "moderate",
        mention: "@Contrarian → @Methodologist",
        phaseLabel: "Phase 2",
        status: "Actionable",
        statusVariant: "resolved",
        steelman:
          "Presenting a lead demo figure is standard in early-stage hardware pitches, and reduced-precision inference is a legitimate deployment mode for some workloads.",
        text: `"The pitch presents the reduced-precision figure as the headline without stating the precision. A reader assumes production precision — the qualifier must be on the number, not in a footnote."`,
        resolution: "State the numerical precision alongside the headline throughput figure in all materials",
        resolutionNote: "Pragmatist action item: Make the term sheet contingent on a matched-precision production benchmark",
      },
    ],
    guardian: {
      mode: "Academic integrity mode",
      badgeStatus: "Clean",
      badgeVariant: "good",
      score: 96,
      description:
        "Whitepaper claims traced to the team's own benchmark data; no independent third-party benchmark on file. One vendor-authored comparison down-weighted as non-independent. Demo measurement methodology authenticated. Phase boundary clearances issued at P1/2 and P2/3.",
      dims: [
        { label: "Source quality", value: 97 },
        { label: "Retraction check", value: 100 },
        { label: "Preprint flag", value: 94 },
        { label: "Self-citation ratio", value: 96 },
      ],
      svsLabel: "SVS verification log · 12 citations checked",
      svsRows: [
        { status: "ok", source: "Team whitepaper — demo throughput measurement (reduced precision)", type: "Peer-reviewed · Verified" },
        { status: "ok", source: "Peer-reviewed — photonic matrix-multiplication architecture", type: "Peer-reviewed · Verified" },
        { status: "ok", source: "Independent survey — accelerator throughput at production precision", type: "Peer-reviewed · Verified" },
        {
          status: "flag",
          source: "Vendor-authored comparison — device vs. incumbent (non-independent)",
          type: "Non-independent · Down-weighted",
          flagNote: "SVS_NONINDEPENDENT — vendor-authored, not third-party · Down-weighted; not used in primary comparison",
        },
        { status: "ok", source: "Conference paper — precision/throughput trade-offs in optical compute", type: "Peer-reviewed · Verified" },
      ],
      svsSummary: "+7 additional citations verified · 0 retracted · 1 non-independent source down-weighted above",
    },
    sidebar: {
      metadata: [
        { label: "Session ID", value: "tech-photonic-chip" },
        { label: "Vertical", value: "VC + PE" },
        { label: "Depth", value: "Deep" },
        { label: "Runtime", value: "36m 49s" },
        { label: "Attachment", value: "whitepaper" },
        { label: "Guardian mode", value: "Source integrity", variant: "accent" },
        { label: "Guardian score", value: "96% · Clean", variant: "green" },
        { label: "Citations", value: "11 · 1 preprint" },
        { label: "Dissent flags", value: "1 Strong · 1 Mod", variant: "accent" },
      ],
      agents: [
        { name: "Cartographer", initials: "CA", model: "Gemini 3.1 Pro", pct: 52, dissent: false },
        { name: "Methodologist", initials: "ME", model: "GPT-4o", pct: 48, dissent: false },
        { name: "Contrarian", initials: "CO", model: "Claude Sonnet 4.6", pct: 28, dissent: true },
        { name: "Synthesizer", initials: "SY", model: "GPT-4o", pct: 44, dissent: false },
        { name: "Pragmatist", initials: "PR", model: "Grok 4.1 Fast", pct: 42, dissent: false },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Retrieval-augmented generation & hallucination — ls mode, established,
  // has the unique finding-history timeline + cite-this-finding sidebar card
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "rag-hallucination-reduction",
    sessionTag: "tech-rag-hallucination",
    title: "Retrieval-Augmented Generation & Hallucination — Outcomes — Augle",
    description:
      "Full deliberation record — Letters & Science session. Multi-agent ensemble, three phases, Guardian academic integrity log, confidence grade, unresolved objections.",
    tags: [
      { label: "Technology", variant: "domain" },
      { label: "Research Labs", variant: "vertical" },
      { label: "Deep · benchmark report uploaded", variant: "depth" },
      { label: "Guardian · methodological integrity", variant: "guardian" },
    ],
    timestamp: "9h ago · Academic Medical Centre",
    question: `"What does the evidence establish about whether retrieval-augmented generation reduces hallucination rates on domain-specific question answering?"`,
    context: "ML evaluation working group · Retrieval-system review · Benchmark report submitted as context document",
    finding: {
      grade: "Established",
      confidence: 87,
      gradeNote:
        "Directional claim — RAG reduces hallucination on domain QA — is Established. Magnitude is task- and retrieval-dependent; RAG does not eliminate hallucination.",
      text: `The ensemble supports the directional claim that retrieval-augmented generation reduces hallucination and factual-error rates on domain-specific question answering, relative to a closed-book baseline of the same model, when the retrieval corpus contains the relevant evidence. This is Established: the effect reproduces across independent benchmarks and model families, and the mechanism — grounding generation in retrieved passages — is well understood. Two boundary conditions are explicit and unanimously agreed, not dissenting: RAG reduces but does not eliminate hallucination, and retrieval quality is the binding constraint — irrelevant or incorrect retrieved context can introduce new errors. The Contrarian's objection on deployment-time retrieval degradation was reviewed and recorded as a scope condition, not an unresolved threat. The actionable output: RAG is a supported mitigation for factual error on knowledge-intensive tasks, provided retrieval quality is measured and monitored, not assumed.`,
      reopenLabel: "Reopen conditions · evidence-triggered, not market-triggered",
      reopenConditions: [
        {
          id: "RC1",
          text: "Evidence that measured hallucination reduction fails to hold under realistic deployment retrieval — noisy corpora, stale indices — at production scale",
          trigger: "Trigger: Deployment-scale evaluation · Direction: Would move the operational claim toward Contested",
        },
        {
          id: "RC2",
          text: "A benchmark showing RAG increases confident factual errors when retrieved context is wrong, at rates that offset the closed-book gains",
          trigger: "Trigger: Adversarial-retrieval study · Direction: Refines the retrieval-quality boundary condition",
        },
        {
          id: "RC3",
          text: "Generalisation evidence across low-resource domains and languages where retrieval corpora are sparse or low-quality",
          trigger: "Trigger: Cross-domain replication · Direction: Extends or bounds the domain-QA scope",
        },
      ],
    },
    findingHistory: {
      badge: "Illustrative",
      stableNote: "Grade has held **Established** since publication — no reopen condition has triggered.",
      events: [
        {
          date: "Jul 18, 2026",
          title: "Finding published",
          grade: "Established · 87%",
          text: "RAG reduces hallucination and factual-error rates relative to closed-book baseline, subject to the retrieval-quality boundary condition.",
        },
        {
          date: "Ongoing",
          title: "Under active monitoring",
          text: "RC1 is checked automatically against new peer-reviewed publications, replications, retractions, and meta-analyses in the underlying evidence base.",
          trigger: "Trigger: deployment-scale retrieval evaluation at production scale · affects magnitude claim, not direction",
        },
      ],
      footerNote:
        "A resolved reopen event would appear here as a dated entry, with the grade before and after and a link to the follow-on session it generated.",
    },
    citeBox: {
      id: "FIND-RAG-0417",
      citation:
        "Augle Deliberation Ensemble. (2026). Retrieval-Augmented Generation & Hallucination [Finding FIND-RAG-0417]. Augle. augle.com/findings/FIND-RAG-0417",
      trackedLabel: "Cited in publications",
      trackedValue: "Tracked automatically",
    },
    phases: [
      {
        label: "Phase 1 · Exploration",
        agents: [
          {
            agent: "Cartographer",
            model: "Gemini 3.1 Pro · T=0.8",
            confidence: 64,
            paragraphs: [
              "**Settled ground:** Across knowledge-intensive QA benchmarks, grounding generation in retrieved passages lowers factual-error and hallucination rates relative to the same model answering closed-book. The effect reproduces across independent benchmarks and multiple model families.",
              "**Contested terrain:** The magnitude of the reduction, and how much survives when retrieval quality degrades, vary by task and setup.",
            ],
          },
          {
            agent: "Methodologist",
            model: "GPT-4o · T=0.5",
            confidence: 58,
            paragraphs: [
              `**Measurement concern flagged:** "Hallucination" is operationalised differently across studies — some count unsupported claims, some measure exact-match factuality. The directional finding is robust to these definitions; cross-study magnitude comparison is not. Any numeric magnitude must be reported per-benchmark, never pooled.`,
            ],
          },
          {
            agent: "Contrarian",
            model: "Claude Sonnet 4.6 · T=1.0",
            confidence: 37,
            paragraphs: [
              "**@Cartographer** — Steelman: The grounding mechanism is well understood and the direction of the evidence is consistent; a practitioner would reasonably treat RAG as a factuality improvement.",
              `Moderate objection [Phase 1]: "Retrieved context is not error-free. When the retriever surfaces irrelevant or wrong passages, the model can produce confident, well-grounded-sounding errors — a failure mode absent in the closed-book case. The directional claim holds only where retrieval quality is adequate."`,
            ],
          },
        ],
      },
      {
        label: "Phase 2 · Deliberation",
        agents: [
          {
            agent: "Methodologist",
            model: "GPT-4o · T=0.5",
            confidence: 55,
            paragraphs: [
              "The Contrarian's objection is valid and bounded. It does not contradict the directional finding — it specifies its scope. Where retrieval quality is adequate (the relevant document is retrievable and surfaced), hallucination falls; where retrieval fails, gains erode and can reverse locally. This is a scope condition on an Established directional claim, not an unresolved threat to it.",
            ],
          },
          {
            agent: "Contrarian",
            model: "Claude Sonnet 4.6 · T=1.0",
            confidence: 39,
            paragraphs: [
              "I accept the Methodologist's framing and do not escalate. The directional claim — RAG reduces hallucination on domain QA when relevant evidence is retrievable — is not in dispute. My objection stands as a boundary condition on magnitude and deployment, recorded as resolved-by-scoping, not unresolved.",
            ],
          },
          {
            agent: "Synthesizer",
            model: "GPT-4o · T=0.0",
            confidence: 49,
            paragraphs: [
              "Phase 2 synthesis: Directional claim confirmed Established (82–88% confidence across nodes). Boundary conditions unanimous: RAG reduces but does not eliminate hallucination; retrieval quality is the binding constraint. No unresolved Strong objection. Overall session confidence: 87% — reflects the Established grade on the directional claim, with magnitude held as task-dependent.",
            ],
          },
        ],
      },
      {
        label: "Phase 3 · Synthesis",
        agents: [
          {
            agent: "Contrarian",
            model: "Claude Sonnet 4.6 · T=1.0",
            confidence: 37,
            paragraphs: [
              "Final steelman: The synthesis is careful. It claims only the directional effect, scopes magnitude to the benchmark, and states the retrieval-quality dependency plainly.",
              "Final objection [Resolved by scoping]: The deployment caveat — production retrieval is noisier than benchmark retrieval — is recorded as a monitoring requirement, not a defect in the finding.",
            ],
          },
          {
            agent: "Synthesizer",
            model: "GPT-4o · T=0.0",
            confidence: 46,
            paragraphs: [
              "**Final finding: Established · 87% confidence**",
              "RAG reduces hallucination and factual-error rates on domain QA relative to a closed-book baseline of the same model, when relevant evidence is retrievable. Established for the directional claim. Boundary conditions (unanimous, non-dissenting): the reduction is partial, not total; retrieval quality bounds the effect and can reverse it locally.",
            ],
          },
          {
            agent: "Pragmatist",
            model: "Grok 4.1 Fast · T=0.3",
            confidence: 45,
            paragraphs: [
              "Confidence ceiling inherited: Established · 87%. Actionable steps within that ceiling:",
              "(1) Treat RAG as a supported factuality mitigation for knowledge-intensive tasks, not a hallucination cure. (2) Measure and monitor retrieval quality in deployment — the finding is conditional on it. (3) Report hallucination-reduction magnitude per benchmark and per domain; do not pool into a single headline number.",
            ],
          },
        ],
      },
    ],
    dissentBadge: "2 Moderate · both resolved",
    dissentBadgeVariant: "good",
    objections: [
      {
        strength: "moderate",
        mention: "@Contrarian → @Cartographer",
        phaseLabel: "Phase 1 · carried to Phase 3",
        status: "Resolved by scoping",
        statusVariant: "resolved",
        steelman:
          "The grounding mechanism is well understood and the direction of the evidence is consistent; a practitioner would reasonably treat RAG as a factuality improvement.",
        text: `"Retrieved context is not error-free. When the retriever surfaces irrelevant or wrong passages, the model can produce confident, well-grounded-sounding errors — a failure mode absent closed-book. The directional claim holds only where retrieval quality is adequate."`,
        resolution:
          "Recorded as a scope condition on the Established directional claim: the effect is conditional on adequate retrieval quality, which must be measured, not assumed.",
      },
      {
        strength: "moderate",
        mention: "@Contrarian → @Methodologist",
        phaseLabel: "Phase 2",
        status: "Resolved",
        statusVariant: "resolved",
        steelman: "That retrieved context can be wrong is a real feature of deployed systems, and benchmark retrieval is cleaner than production retrieval.",
        text: `"Benchmark retrieval overstates deployed performance. Production corpora are noisier and indices go stale, so measured reductions are an upper bound on what a deployed system achieves without monitoring."`,
        resolution: "Recorded as a deployment monitoring requirement: retrieval quality is tracked in production; magnitude is reported per benchmark rather than pooled.",
        resolutionNote: "Pragmatist action item: Add evidence-age and population-comparability caveats to the review before circulation",
      },
    ],
    guardian: {
      mode: "Methodological integrity mode",
      badgeStatus: "1 flag",
      badgeVariant: "warn",
      score: 96,
      description:
        "No retracted papers. All primary trial citations authenticated against registries. One industry-funded extension study flagged for disclosure. Self-citation ratio within field norms. Phase boundary clearances issued at P1/2 and P2/3.",
      dims: [
        { label: "Source quality", value: 96 },
        { label: "Retraction check", value: 100 },
        { label: "Funding disclosure", value: 88 },
        { label: "Self-citation ratio", value: 95 },
      ],
      svsLabel: "SVS verification log · 22 citations checked",
      svsRows: [
        { status: "ok", source: "Lewis et al. (2020) — Retrieval-Augmented Generation for knowledge-intensive NLP", type: "Peer-reviewed · Verified" },
        { status: "ok", source: "Guu et al. (2020) — REALM: retrieval-augmented language-model pre-training", type: "Peer-reviewed · Verified" },
        { status: "ok", source: "Shuster et al. (2021) — Retrieval augmentation reduces hallucination in dialogue", type: "Peer-reviewed · Verified" },
        {
          status: "flag",
          source: "Mallen et al. (2023) — parametric vs. non-parametric memory on long-tail factual QA",
          type: "Industry-funded · Flagged",
          flagNote: "SVS_FUNDING — industry-funded extension, sponsor-affiliated authors · Evidence node capped at Probable · Flagged for disclosure",
        },
        { status: "ok", source: "Vendor-affiliated (2024) — production retrieval-quality benchmark", type: "Peer-reviewed · Verified" },
      ],
      svsSummary: "+14 additional citations verified · 0 retracted · 1 industry-funded flagged above",
    },
    sidebar: {
      metadata: [
        { label: "Session ID", value: "tech-rag-hallucination" },
        { label: "Vertical", value: "Research Labs" },
        { label: "Depth", value: "Deep" },
        { label: "Runtime", value: "31m 12s" },
        { label: "Attachment", value: "benchmark report" },
        { label: "Guardian mode", value: "Methodological", variant: "accent" },
        { label: "Guardian score", value: "96% · 1 flag", variant: "warn" },
        { label: "Citations", value: "19 · 1 flagged" },
        { label: "Dissent flags", value: "2 Moderate", variant: "accent" },
      ],
      agents: [
        { name: "Cartographer", initials: "CA", model: "Gemini 3.1 Pro", pct: 88, dissent: false },
        { name: "Methodologist", initials: "ME", model: "GPT-4o", pct: 85, dissent: false },
        { name: "Contrarian", initials: "CO", model: "Claude Sonnet 4.6", pct: 82, dissent: false },
        { name: "Synthesizer", initials: "SY", model: "GPT-4o", pct: 87, dissent: false },
        { name: "Pragmatist", initials: "PR", model: "Grok 3", pct: 86, dissent: false },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Screen-time & adolescent depression — ls mode, evidence Gap
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "soc-screen-time-depression",
    sessionTag: "soc-screen-time-depression",
    title: "Screen-Time & Adolescent Depression — Outcomes — Augle",
    description:
      "Full deliberation record — Letters & Science session. Multi-agent ensemble, three phases, Guardian academic integrity log, confidence grade, unresolved objections.",
    tags: [
      { label: "Social science", variant: "domain" },
      { label: "Healthcare", variant: "vertical" },
      { label: "Standard · meta-analysis uploaded", variant: "depth" },
      { label: "Guardian · academic integrity", variant: "guardian" },
    ],
    timestamp: "3h ago · Public Health Research Group",
    question: `"Do screen-time interventions reduce depressive symptoms in adolescents?"`,
    context: "Policy analyst, adolescent mental health · Evidence review for intervention guidance · Meta-analysis submitted as context document",
    finding: {
      grade: "Gap",
      confidence: 22,
      gradeNote: "The evidence base cannot support a causal claim in either direction. The anchor evidence has been retracted.",
      text: `The ensemble returns a Gap finding: the current evidence base cannot support a causal claim that screen-time interventions reduce adolescent depressive symptoms in either direction. The most-cited systematic review anchoring this literature has been retracted, and a large share of the downstream effect-size estimates are derived from it. What remains is heterogeneous, largely cross-sectional, and confounds screen time with the underlying distress it may be a marker for. This is not a null finding — it is an explicit statement that the evidence required to answer the question does not yet exist. The actionable output: name the specific evidence gap rather than treating the retracted review's effect size as usable.`,
      reopenLabel: "Reopen conditions · evidence-triggered, not market-triggered",
      reopenConditions: [
        {
          id: "RC1",
          text: "A pre-registered randomised trial of a screen-time intervention with a validated depression outcome, independent of the retracted review",
          trigger: "Trigger: Pre-registered RCT publication · Direction: Probable grade possible if effect replicates",
        },
        {
          id: "RC2",
          text: "A meta-analysis that excludes the retracted review and its dependent estimates, re-pooling only independent primary studies",
          trigger: "Trigger: Re-pooled meta-analysis · Direction: Establishes whether any effect survives exclusion",
        },
        {
          id: "RC3",
          text: "Longitudinal evidence disentangling screen time as a cause of depressive symptoms from screen time as a marker of existing distress",
          trigger: "Trigger: Longitudinal cohort · Direction: Resolves the reverse-causation confound",
        },
      ],
    },
    phases: [
      {
        label: "Phase 1 · Exploration",
        agents: [
          {
            agent: "Cartographer",
            model: "Gemini 3.1 Pro · T=0.8",
            confidence: 38,
            paragraphs: [
              "**Settled ground:** Adolescent screen time and depressive symptoms are positively correlated in cross-sectional data. Both have risen over the same period. Self-reported screen time is measured with substantial error.",
              "**Contested terrain:** Whether the correlation reflects screen time causing depression, depression driving screen use, or a common third cause. Whether any intervention effect exists once the retracted review is excluded.",
              "**Unknown territory:** The direction of causation. The most-cited systematic review anchoring the intervention literature has been retracted, and much of the downstream effect-size estimation depends on it.",
              "**Knowledge gaps entered:** (1) Independent pre-registered intervention trial — sparse. (2) Meta-analysis excluding the retracted review and its dependent estimates — does not exist.",
            ],
          },
          {
            agent: "Methodologist",
            model: "GPT-4o · T=0.5",
            confidence: 38,
            paragraphs: [
              "**Evidence integrity concern flagged:** The anchor systematic review for this literature has been retracted. A material share of the pooled effect-size estimates in the uploaded meta-analysis are derived from or dependent on it. Estimates downstream of retracted evidence cannot be treated as usable.",
              "Evidence ceiling: the causal intervention claim is capped at Gap. Once the retracted review and its dependent estimates are removed, the remaining independent evidence is too sparse and heterogeneous to support any directional finding. No node qualifies above Gap for the causal claim.",
            ],
          },
          {
            agent: "Contrarian",
            model: "Claude Sonnet 4.6 · T=1.0",
            confidence: 29,
            paragraphs: [
              "**@Cartographer** — Steelman: There is a real, replicated cross-sectional association, and the policy concern is legitimate. It is reasonable for an analyst to want an intervention answer here.",
              `Strong objection [Phase 1]: "The anchor systematic review in this literature has been retracted, and the uploaded meta-analysis pools effect sizes that are downstream of it. Effect-size estimates derived from retracted evidence cannot be relied upon — re-pooling them under a new label does not launder the dependency. Any intervention effect claimed on this basis is unsupported until the estimate is reconstructed from independent studies only." Resolution condition: Re-pool excluding the retracted review and all dependent estimates; report what, if anything, survives.`,
            ],
          },
        ],
      },
      {
        label: "Phase 2 · Deliberation",
        agents: [
          {
            agent: "Methodologist",
            model: "GPT-4o · T=0.5",
            confidence: 31,
            paragraphs: [
              "The Contrarian's Strong objection is upheld. The retraction dependency is verifiable and material — it is an evidence-integrity failure, not a modelling choice. The Methodologist cannot reconstruct an independent estimate within the uploaded material. The objection is unresolved and, unlike a Contested split, it collapses the primary claim to Gap: there is no usable evidence base from which to grade a causal effect.",
              "No claim split is available here. The reverse-causation confound (depression driving screen use) further undermines even the cross-sectional signal. The causal intervention claim is Gap.",
            ],
          },
          {
            agent: "Contrarian",
            model: "Claude Sonnet 4.6 · T=1.0",
            confidence: 26,
            paragraphs: [
              "I accept the Gap grade — it is the honest outcome. I do not escalate further; the finding already reflects the collapse of the evidence base.",
              `Additional Moderate objection: "The uploaded meta-analysis does not disclose the retraction of its anchor review. A reader would take the pooled effect at face value. Whatever is published from this session must foreground the retraction, not footnote it." Resolution condition: Explicit retraction disclosure in any downstream guidance, and re-pooling before any effect is quoted.`,
            ],
          },
          {
            agent: "Synthesizer",
            model: "GPT-4o · T=0.0",
            confidence: 28,
            paragraphs: [
              "Phase 2 synthesis: Gap confirmed. The causal intervention claim has no usable evidence base once the retracted review and its dependent estimates are removed. Reverse causation remains unaddressed. Overall session confidence: 22% — reflects the Gap grade. No directional claim is gradeable; the finding is an explicit knowledge gap.",
            ],
          },
        ],
      },
      {
        label: "Phase 3 · Synthesis",
        agents: [
          {
            agent: "Contrarian",
            model: "Claude Sonnet 4.6 · T=1.0",
            confidence: 27,
            paragraphs: [
              "Final steelman: The policy question is real and urgent, and the analyst is right to want evidence. The cross-sectional association is genuinely replicated.",
              `Final Strong objection [Unresolved]: The retraction dependency stands. "The intervention effect cannot be estimated from a corpus anchored on a retracted review. Until an independent re-pooling is done, there is no number to report. The honest answer is that we do not know — and that must be stated as a gap, not smoothed into a weak positive." Resolution condition: Independent re-pooling excluding the retracted review and all dependent estimates.`,
            ],
          },
          {
            agent: "Synthesizer",
            model: "GPT-4o · T=0.0",
            confidence: 22,
            paragraphs: [
              "**Final finding: Gap · 22% confidence**",
              "The causal claim that screen-time interventions reduce adolescent depressive symptoms is not gradeable on the current evidence. The anchor systematic review is retracted; the downstream estimates depend on it; the independent evidence that remains is sparse, heterogeneous, and confounded by reverse causation. This session's value is in refusing to launder a retracted effect size into a usable number — and in naming the exact evidence (independent pre-registered trials; re-pooling) that would move the grade.",
            ],
          },
          {
            agent: "Pragmatist",
            model: "Grok 4.1 Fast · T=0.3",
            confidence: 26,
            paragraphs: [
              "Confidence ceiling inherited: Gap · 22%. Actionable steps within that ceiling:",
              `(1) Do not issue intervention guidance on the current evidence. Frame the output as "insufficient evidence to recommend for or against," not as a weak positive or a null.`,
              "(2) Commission or await an independent re-pooling that excludes the retracted review and its dependent estimates. State explicitly which studies are and are not independent of it.",
              "(3) Foreground the retraction in any briefing — a reader must not encounter the pooled effect without also encountering the fact that its anchor was withdrawn.",
              `Follow-on session proposal: "Once the retracted review is excluded, does any independent evidence support a screen-time intervention effect on adolescent depression?" — the question that would close this gap.`,
            ],
          },
        ],
      },
    ],
    dissentBadge: "1 Strong Unresolved · 1 Moderate",
    dissentBadgeVariant: "bad",
    objections: [
      {
        strength: "strong",
        mention: "@Contrarian → @Cartographer",
        phaseLabel: "Phase 1 · carried to Phase 3",
        status: "Unresolved",
        statusVariant: "unresolved",
        steelman:
          "There is a real, replicated cross-sectional association, and the policy concern is legitimate. Wanting an intervention answer here is reasonable.",
        text: `"The anchor systematic review is retracted and the meta-analysis pools estimates downstream of it. Effect sizes derived from retracted evidence cannot be relied upon — re-labelling the pool does not remove the dependency."`,
        resolution: "Re-pool excluding the retracted review and all dependent estimates, and report what independent evidence survives",
      },
      {
        strength: "moderate",
        mention: "@Contrarian → @Methodologist",
        phaseLabel: "Phase 2",
        status: "Actionable",
        statusVariant: "resolved",
        steelman: "The pooled estimate looks authoritative and the analyst did not author the retraction — the dependency is easy to miss in good faith.",
        text: `"The uploaded meta-analysis does not disclose the retraction of its anchor review. Any downstream guidance must foreground the retraction, not footnote it."`,
        resolution: "Explicit retraction disclosure and re-pooling before any effect size is quoted",
        resolutionNote: "Pragmatist action item: Foreground the retraction in any briefing; do not quote the pooled effect",
      },
    ],
    guardian: {
      mode: "Academic integrity mode",
      badgeStatus: "1 retraction",
      badgeVariant: "bad",
      score: 79,
      description:
        "One retracted systematic review identified among the uploaded citations and excluded from the evidence base. Its dependent effect-size estimates were quarantined, which is what collapsed the primary claim to Gap. Remaining independent citations verified. Phase boundary clearances issued at P1/2 and P2/3.",
      dims: [
        { label: "Source quality", value: 88 },
        { label: "Retraction check", value: 60 },
        { label: "Preprint flag", value: 92 },
        { label: "Self-citation ratio", value: 95 },
      ],
      svsLabel: "SVS verification log · 14 citations checked",
      svsRows: [
        { status: "ok", source: "Independent cohort (2022) — adolescent screen use and mood, longitudinal", type: "Peer-reviewed · Verified" },
        { status: "ok", source: "Odgers & Jensen (2020) — critical review of screen-time and adolescent mental health", type: "Peer-reviewed · Verified" },
        { status: "ok", source: "Orben & Przybylski (2019) — specification-curve analysis of digital technology use", type: "Peer-reviewed · Verified" },
        {
          status: "flag",
          source: "Retracted review (2023) — systematic review of screen-time interventions",
          type: "Retracted · Excluded",
          flagNote: "SVS_RETRACTED — journal retraction notice on file · Excluded from evidence base; dependent estimates quarantined",
        },
        { status: "ok", source: "Twenge et al. — cross-sectional association (correlational only)", type: "Peer-reviewed · Verified" },
      ],
      svsSummary: "+9 additional citations verified · 1 retracted (excluded above)",
    },
    sidebar: {
      metadata: [
        { label: "Session ID", value: "soc-screen-time-depression" },
        { label: "Vertical", value: "Healthcare" },
        { label: "Depth", value: "Standard" },
        { label: "Runtime", value: "14m 47s" },
        { label: "Attachment", value: "meta-analysis" },
        { label: "Guardian mode", value: "Academic", variant: "accent" },
        { label: "Guardian score", value: "79% · 1 retraction", variant: "bad" },
        { label: "Citations", value: "14 · 1 retracted" },
        { label: "Dissent flags", value: "1 Strong · 1 Mod", variant: "accent" },
      ],
      agents: [
        { name: "Cartographer", initials: "CA", model: "Gemini 3.1 Pro", pct: 52, dissent: false },
        { name: "Methodologist", initials: "ME", model: "GPT-4o", pct: 48, dissent: false },
        { name: "Contrarian", initials: "CO", model: "Claude Sonnet 4.6", pct: 28, dissent: true },
        { name: "Synthesizer", initials: "SY", model: "GPT-4o", pct: 44, dissent: false },
        { name: "Pragmatist", initials: "PR", model: "Grok 4.1 Fast", pct: 42, dissent: false },
      ],
    },
  },
];

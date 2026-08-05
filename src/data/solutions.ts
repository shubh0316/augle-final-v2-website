export type ConfigRow = { label: string; value: string };

export type ProblemItem = { title: string; body: string };

export type AgentHighlight = { agent: string; text: string };

export type OutcomeRow = { label: string; value: string };

export type UseCase = {
  numLabel: string;
  name: string;
  persona: string;
  badge: string;
  badgeVariant: "standard" | "deep";
  question: string;
  highlights: AgentHighlight[];
  outcome: OutcomeRow[];
  value: string;
};

export type HowItem = { title: string; body: string };

export type WhyCard = { title: string; body: string };

/** Hero title is always two plain lines followed by an (optionally prefixed) emphasised line. */
export type HeroTitle = {
  lines: [string, string];
  emphasisPrefix?: string;
  emphasis: string;
};

export type Solution = {
  slug: string;
  /** Breadcrumb last-crumb / vertical-nav-chip label — each source file's own wording, verbatim. */
  navLabel: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heroTitle: HeroTitle;
  heroBody: string;
  personas: string[];
  sessionConfigLabel: string;
  sessionConfig: ConfigRow[];
  problemTitle: string[];
  problemBody: string;
  questionsLabel: string;
  questions: string[];
  problemItems: ProblemItem[];
  useCasesTitle: string[];
  useCasesBody: string;
  useCases: UseCase[];
  howEyebrow: string;
  howTitle: string[];
  howItems: HowItem[];
  howConfigLabel: string;
  howConfig: ConfigRow[];
  whyEyebrow: string;
  whyTitle: string[];
  whyCards: WhyCard[];
  ctaTitle: string[];
  ctaBody: string[];
};

/**
 * All 11 verticals share one template (see src/app/solutions/[slug]/page.tsx). Two verticals —
 * universities and research-labs — carry noticeably more content than the other nine: 6 whyCards
 * instead of 3, and a domain-specific (rather than generic Guardian mode/Document types/Contrarian
 * focus/Output package/Session depth) howConfig with 6 rows instead of 5. No dedicated optional
 * field was needed for this: whyCards/howConfig/sessionConfig/personas/problemItems are all plain
 * arrays, so the richer verticals just carry more array entries. There is no structurally distinct
 * "extra section" in the universities source — every one of the 11 files has exactly the same four
 * section classes (problem-section, usecases-section, how-section, why-section) plus hero/CTA.
 */
export const SOLUTIONS: Solution[] = [
  {
    slug: "enterprise",
    navLabel: "Enterprise",
    metaTitle: "AI Vendor Claim & Competitive Intelligence Review | Augle",
    metaDescription:
      "Augle stress-tests strategic research, vendor claims, and competitive intelligence before high-stakes business decisions become irreversible.",
    eyebrow: "Solutions · Enterprise",
    heroTitle: {
      lines: ["The decision is made.", "The evidence behind it"],
      emphasis: "isn’t tested.",
    },
    heroBody:
      "Strategic decisions in large organisations are made on research that has rarely been adversarially reviewed. The market entry analysis that depends on a consultant’s assumptions. The vendor claim that hasn’t been triangulated against independent sources. The competitive intelligence that misses the incumbent’s announced response. Augle stress-tests the evidence before the decision is irreversible.",
    personas: [
      "Strategy teams preparing board-level recommendations",
      "Corporate development evaluating M&A rationale",
      "Procurement teams validating vendor capability claims",
      "Competitive intelligence teams stress-testing market assessments",
    ],
    sessionConfigLabel: "Session configuration",
    sessionConfig: [
      { label: "Guardian mode", value: "Financial + Editorial" },
      { label: "Depth", value: "Standard · Deep" },
      { label: "Documents", value: "Strategy memos · market reports · vendor RFPs · analyst research" },
      { label: "SVS checks", value: "Market data recency · source attribution · vendor claim verification" },
      { label: "Output", value: "Finding · confidence grade · key risks verbatim · audit trail" },
    ],
    problemTitle: ["Strategic decisions move faster than the evidence behind them."],
    problemBody:
      "By the time a major strategic decision reaches the board, the evidence base has passed through several layers of internal review — none of which is designed to be adversarial. The consultant who produced the market entry analysis has an interest in the engagement continuing. The vendor whose claims anchor the procurement decision has an interest in winning. Internal strategy teams have an interest in the recommendation they’ve invested months in. Augle has none of these interests.",
    questionsLabel: "Questions enterprise teams run on Augle",
    questions: [
      "What are the two or three assumptions in this market entry analysis that, if wrong, invalidate the recommendation?",
      "Are the vendor’s ROI claims for this platform independently supported or sourced from their own case studies?",
      "Does the competitive landscape analysis account for the incumbent’s announced strategic response?",
      "Is the evidence for this market’s projected growth rate drawn from independent sources or a single analyst firm?",
      "What would a well-prepared board member who is sceptical of this recommendation ask, and do we have answers?",
    ],
    problemItems: [
      {
        title: "Market analyses built on consultant assumptions",
        body: "The Methodologist evaluates every key assumption in a strategy document against the evidence that supports it. A market sizing figure sourced from a single Gartner report, a growth rate projection that compounds an unvalidated base, or a competitive moat argument that doesn’t account for announced incumbent moves — each is identified and graded before the recommendation reaches the board.",
      },
      {
        title: "Vendor ROI claims unsupported by independent evidence",
        body: "The Contrarian evaluates vendor capability and ROI claims against the available independent evidence. A platform that cites proprietary case studies from its own marketing materials as evidence of enterprise ROI, or a vendor whose reference customers were selected by the vendor, receives a different confidence grade than one with independently documented outcomes.",
      },
      {
        title: "Competitive intelligence with blind spots",
        body: "The Cartographer maps the full competitive landscape, not just the evidence the strategy document includes. A competitive analysis that treats the market as static — ignoring announced acquisitions, published roadmaps, or regulatory changes that will reshape the landscape within the decision horizon — is Contested, regardless of how well-sourced its historical data is.",
      },
      {
        title: "The board question you haven’t prepared for",
        body: "The Contrarian runs at maximum temperature to surface the objection a well-prepared sceptical board member will raise. Unresolved Strong objections appear verbatim with resolution conditions. The strategy team that walks into the board room knowing these questions controls the conversation. The one that hears them for the first time doesn’t.",
      },
    ],
    useCasesTitle: ["Three sessions.", "Three strategic moments."],
    useCasesBody:
      "Each scenario illustrates realistic deliberation behaviour across market entry analysis, vendor evaluation, and competitive intelligence review.",
    useCases: [
      {
        numLabel: "Use case 01 of 03 · Enterprise",
        name: "The Market Entry Review",
        persona: "VP Strategy · FTSE 100 consumer goods company · Pre-board recommendation",
        badge: "Standard depth · document ingestion",
        badgeVariant: "standard",
        question:
          "Does the evidence base in our Southeast Asia market entry analysis support the recommendation to commit £120M over three years, and what are the assumptions the board will challenge?",
        highlights: [
          {
            agent: "Cartographer",
            text: "Settled: the category is growing in the region. Contested: whether the company’s brand positioning translates without localisation investment the analysis doesn’t budget for. Unknown: how the incumbent’s announced partnership with a regional distributor — disclosed in a press release three weeks ago — affects the distribution strategy the entry plan depends on.",
          },
          {
            agent: "Methodologist",
            text: "The Year 3 revenue projection assumes 18% market share in a market where the company has zero brand recognition. The analysis cites a comparable from the company’s Latin America entry, but that entry had a 4-year localisation runway and an acquired local brand. The comparison is structurally invalid. Confidence: Contested.",
          },
          {
            agent: "Contrarian",
            text: "Strong objection (Unresolved): \"The distribution strategy is built around the regional partner network that the incumbent’s announced distributor agreement now partially forecloses. The analysis was completed before this announcement. The board will ask whether the entry economics still work. They don’t, as currently modelled.\"",
          },
          {
            agent: "Pragmatist",
            text: "Update the competitive analysis to incorporate the incumbent’s distributor announcement. Remodel Year 3 share assumption with a Latin America comparison that accounts for the localisation difference. Two updates: one to the competitive section, one to the financial model. The recommendation may still hold — but it needs to hold on the current evidence, not the evidence from three weeks ago.",
          },
        ],
        outcome: [
          { label: "Finding", value: "Contested — two material gaps identified before board presentation" },
          { label: "Key gap 1", value: "Competitor distributor announcement not reflected — analysis predates it" },
          { label: "Key gap 2", value: "Year 3 share assumption draws on structurally invalid comparable" },
          { label: "Next step", value: "Update competitive section + remodel Year 3 assumption before board submission" },
        ],
        value:
          "The incumbent’s distributor announcement was public. No one on the strategy team had caught it because the analysis was already in the approval process. Finding it before the board presentation cost one week of revision. Finding it in the board room would have cost considerably more — and the recommendation would have been deferred regardless.",
      },
      {
        numLabel: "Use case 02 of 03 · Enterprise",
        name: "The Vendor Evaluation",
        persona: "Head of Procurement · Global financial services firm · Enterprise software selection",
        badge: "Standard depth · document ingestion",
        badgeVariant: "standard",
        question:
          "Are the ROI claims in this vendor’s enterprise proposal independently supported, and how should we weight their reference customer evidence?",
        highlights: [
          {
            agent: "Cartographer",
            text: "Settled: the platform has documented enterprise deployments at scale. Contested: whether the 340% ROI figure cited in the proposal is achievable in a regulated financial services context — all reference cases in the proposal are from unregulated or lightly regulated industries. Unknown: total cost of ownership including integration, change management, and ongoing customisation.",
          },
          {
            agent: "Contrarian",
            text: "Strong objection (Unresolved): \"Every reference customer cited in the proposal was provided by the vendor. There are no independent case studies, no analyst assessments of ROI in comparable regulated contexts, and no published implementation timelines for organisations of this complexity. The 340% figure has no independent evidentiary basis.\"",
          },
          {
            agent: "Pragmatist",
            text: "Request independent reference calls with customers not on the vendor’s provided list — specifically in regulated financial services. Commission a total cost of ownership model that includes integration and change management. The procurement decision can still go this vendor’s way, but it should be based on evidence the vendor didn’t select.",
          },
        ],
        outcome: [
          { label: "Finding", value: "Probable for platform capability · Gap for ROI claim in regulated context" },
          { label: "Key gap", value: "340% ROI figure has no independent evidentiary basis — all references vendor-selected" },
          { label: "Next step", value: "Independent reference calls + TCO model before procurement sign-off" },
        ],
        value:
          "The vendor was eventually selected — but at a negotiated contract value that reflected the absence of independent ROI validation in the regulated sector. The procurement team had the evidence to push back on the headline figure. Without Augle, they would have accepted it as stated.",
      },
      {
        numLabel: "Use case 03 of 03 · Enterprise",
        name: "The Competitive Intelligence Review",
        persona: "Director of Strategy · Global technology company · Annual strategic planning cycle",
        badge: "Deep depth",
        badgeVariant: "deep",
        question:
          "Does our competitive landscape assessment accurately reflect the threat from the three challenger platforms, and what are we missing?",
        highlights: [
          {
            agent: "Cartographer",
            text: "Settled: two of the three challengers are subscale and constrained by funding. Contested: whether the third challenger’s recent enterprise customer wins represent a repeatable pattern or isolated deals. Unknown: the strategic implications of the third challenger’s recently announced partnership with the company’s largest channel partner.",
          },
          {
            agent: "Contrarian",
            text: "Moderate objection: \"The assessment treats the channel partner announcement as a minor footnote. It is not. If the challenger is now incentivised to push its platform through the company’s primary distribution channel, the enterprise win rate assumptions in the planning model are materially wrong. This is the most important competitive development of the last 12 months and it has three lines in the assessment.\"",
          },
          {
            agent: "Synthesizer",
            text: "The competitive landscape is accurately described for two of the three challengers. The third requires a dedicated section analysis focused on the channel partner implications. The current assessment’s conclusion — that competitive threat is stable — is not supportable given the channel development.",
          },
        ],
        outcome: [
          { label: "Finding", value: "Probable for Challenger 1 and 2 · Contested for Challenger 3 assessment" },
          { label: "Key gap", value: "Channel partner announcement materially underweighted — affects enterprise win rate assumptions" },
          { label: "Next step", value: "Dedicated Challenger 3 section with channel partner impact modelling before plan sign-off" },
        ],
        value:
          "The channel partner announcement was in the assessment — in three lines at the end of a section. It deserved its own section and a revised enterprise win rate assumption. The annual plan that went to the board reflected the channel risk. The one that nearly went didn’t.",
      },
    ],
    howEyebrow: "How Augle works for enterprise",
    howTitle: ["Independent adversarial", "review. No agenda."],
    howItems: [
      {
        title: "Submit your strategy materials",
        body: "Upload strategy memos, market analyses, vendor proposals, analyst research, and competitive assessments. Financial and editorial integrity modes activate — the Guardian validates market data recency, source attribution, and the distinction between independent evidence and vendor-supplied claims.",
      },
      {
        title: "The ensemble maps what’s supported and what’s assumed",
        body: "The Cartographer classifies every key claim as Settled, Contested, or Unknown. The Methodologist evaluates whether the evidence supports the conclusions drawn — whether growth rate projections are constructed validly, whether comparable cases are structurally equivalent, whether the analysis accounts for the current competitive landscape.",
      },
      {
        title: "The board’s questions are run in advance",
        body: "The Contrarian takes the role of a well-prepared sceptical board member or external advisor — surfacing the strongest version of every challenge to the recommendation. Every objection specifies a resolution condition. Unresolved Strong objections become the preparation agenda before the board presentation.",
      },
      {
        title: "You receive a confidence-graded evidence record",
        body: "The Synthesizer produces a finding anchored to the evidence base — not the internal narrative. Confidence grades per key assumption, unresolved objections verbatim, and reopen conditions that specify what new information would change the assessment. The full audit trail is exportable for governance and compliance purposes.",
      },
    ],
    howConfigLabel: "Enterprise session · configuration",
    howConfig: [
      { label: "Guardian mode", value: "Financial + Editorial — market data recency, source attribution, vendor claim independence, forecast vs. historical distinction" },
      { label: "Document types", value: "Strategy memos · Market entry analyses · Vendor proposals · Analyst research · Competitive assessments · Board papers" },
      { label: "Contrarian focus", value: "Board-level objections · assumption dependency · competitive blind spots · vendor claim independence · comparable validity" },
      { label: "Output package", value: "Confidence grade per key assumption · unresolved objections verbatim · reopen conditions · exportable audit trail for governance" },
      { label: "Session depth", value: "Standard for strategy papers and vendor evaluations · Deep for major M&A rationale and market entry decisions" },
    ],
    whyEyebrow: "Why Augle for enterprise",
    whyTitle: ["The independent review", "no internal team can run."],
    whyCards: [
      {
        title: "No stake in the recommendation",
        body: "Internal strategy teams have invested months in the recommendation. Consultants have an interest in the engagement continuing. Vendors have an interest in winning. Augle has none of these interests — it produces the finding the evidence supports, not the finding the process has converged on. That independence is the value.",
      },
      {
        title: "Surfaces the board question before the meeting",
        body: "The Contrarian runs the objection a well-prepared sceptical board member will raise — at maximum temperature, with the strongest possible framing. Unresolved Strong objections appear verbatim with resolution conditions. The strategy team that prepares for these questions controls the board conversation. The one that hears them for the first time doesn’t.",
      },
      {
        title: "An auditable evidence record for governance",
        body: "Every session produces an exportable audit trail — SVS verification outcomes, confidence grades per assumption, objections raised and their resolution status. For major decisions subject to regulatory scrutiny, shareholder challenge, or post-investment review, this is the record that demonstrates the decision was made on a validated evidence base.",
      },
    ],
    ctaTitle: ["Test the evidence before", "the decision is made."],
    ctaBody: ["Join the waitlist and run a session on your next major strategic decision."],
  },
  {
    slug: "healthcare",
    navLabel: "Healthcare + life sciences",
    metaTitle: "AI Clinical Evidence Review Tool for Healthcare Teams | Augle",
    metaDescription:
      "Augle stress-tests clinical evidence, trial design, and treatment protocol claims — Guardian operates in Clinical integrity mode with retraction database checks.",
    eyebrow: "Solutions · Healthcare + life sciences",
    heroTitle: {
      lines: ["Clinical evidence", "that doesn’t survive"],
      emphasis: "peer review.",
    },
    heroBody:
      "In healthcare and life sciences, the cost of an evidence failure is not a correction notice — it’s a patient outcome, a regulatory action, or a trial result that can’t be replicated. Augle applies adversarial scrutiny to clinical evidence, trial design, coverage decisions, and drug interaction analyses before they inform a consequential choice.",
    personas: [
      "Medical affairs teams reviewing clinical evidence for submissions",
      "Health technology assessment teams evaluating coverage decisions",
      "Clinical research teams stress-testing trial design assumptions",
      "Payer medical directors reviewing evidence for formulary decisions",
    ],
    sessionConfigLabel: "Session configuration",
    sessionConfig: [
      { label: "Guardian mode", value: "Clinical integrity" },
      { label: "Depth", value: "Standard · Deep" },
      { label: "Documents", value: "Clinical studies · systematic reviews · trial protocols · submissions" },
      { label: "SVS checks", value: "Retraction DB · retracted clinical studies flagged Critical · population scope · sample size thresholds" },
      { label: "Output", value: "Finding · confidence grade · unresolved objections · audit trail" },
    ],
    problemTitle: ["The evidence looks stronger than the trial design supports."],
    problemBody:
      "Clinical evidence passes through layers of review that share a bias: they are conducted by teams who have invested in the research, are familiar with its limitations, and have an interest in the conclusions holding. The external reviewer — a payer’s medical director, a regulatory agency, an HTA committee — has none of these interests and will find the things internal review missed. Augle runs that external review first.",
    questionsLabel: "Questions healthcare teams run on Augle",
    questions: [
      "Does the trial’s primary endpoint actually support the efficacy claim in the submission dossier?",
      "What will the HTA committee’s clinical reviewer say about our comparator selection and why?",
      "Is the evidence base for this coverage decision applicable to the patient population we’re targeting?",
      "Which subgroup analyses in this trial are adequately powered and which are exploratory findings presented as confirmatory?",
      "Are any of the studies in this systematic review subject to retraction or known replication failure?",
    ],
    problemItems: [
      {
        title: "Retracted clinical studies in evidence bases",
        body: "Clinical integrity mode flags retracted studies at Critical severity — the highest level, triggering a mandatory halt. The Guardian’s SVS checks every citation in a clinical evidence base against retraction databases before any agent receives the evidence. A retracted study does not enter the deliberation. It is flagged, and the session cannot proceed until the condition is resolved.",
      },
      {
        title: "Trial endpoints that don’t support the submitted claim",
        body: "The Methodologist evaluates construct validity — whether the primary endpoint actually measures what the efficacy claim requires. A trial that uses a surrogate endpoint where a clinical outcome endpoint is required by the HTA framework, or a composite endpoint whose components have heterogeneous clinical significance, is Contested regardless of the p-value.",
      },
      {
        title: "Population scope mismatches between trial and target",
        body: "Clinical integrity mode monitors population scope throughout the session. Evidence derived from a trial with narrow inclusion criteria being applied to a broader treatment population, or subgroup analyses being cited as primary evidence, is flagged with the exclusion criteria preserved in the evidence record — not silently accepted.",
      },
      {
        title: "The HTA or payer objection you haven’t anticipated",
        body: "The Contrarian takes the role of a well-briefed HTA clinical reviewer or payer medical director — surfacing the comparator selection challenge, the indirect comparison methodology objection, the real-world applicability question. Unresolved Strong objections appear verbatim with resolution conditions. These become the dossier preparation agenda.",
      },
    ],
    useCasesTitle: ["Three sessions.", "Three clinical moments."],
    useCasesBody:
      "Each scenario illustrates realistic deliberation behaviour across HTA submission review, coverage decision analysis, and trial design assessment.",
    useCases: [
      {
        numLabel: "Use case 01 of 03 · Healthcare + life sciences",
        name: "The HTA Submission Review",
        persona: "Medical Affairs Director · Pharmaceutical company · Pre-NICE submission",
        badge: "Deep depth · document ingestion",
        badgeVariant: "deep",
        question:
          "Does our NICE submission dossier for this oncology indication present the clinical evidence in a way that will withstand the Evidence Review Group’s scrutiny, and what are the two or three objections we need to address?",
        highlights: [
          {
            agent: "Cartographer",
            text: "Settled: the intervention demonstrates statistically significant improvement in progression-free survival. Contested: whether PFS is an appropriate primary endpoint for this tumour type given NICE’s stated preference for overall survival data. Unknown: whether the indirect treatment comparison methodology used in the absence of head-to-head data will be accepted by the ERG.",
          },
          {
            agent: "Methodologist",
            text: "Construct validity concern: the submission uses PFS as the primary endpoint in a tumour type where NICE’s technology appraisal guidance states a preference for OS data. The dossier does not directly address this preference or provide a justification for the PFS primary endpoint. The ERG’s first question will be about this. Confidence ceiling on primary efficacy claim: Probable.",
          },
          {
            agent: "Contrarian",
            text: "Strong objection (Unresolved): \"The indirect treatment comparison uses a methodology that the ERG flagged as unreliable in two previous submissions in this tumour type. The dossier does not acknowledge this history or address the methodological concerns previously raised. This will be identified immediately by a reviewer familiar with the appraisal committee’s history.\"",
          },
          {
            agent: "Pragmatist",
            text: "(1) Add a section directly addressing the PFS vs OS endpoint preference with clinical justification. (2) Address the ITC methodology concern by name — acknowledging the previous ERG position and explaining why the approach is appropriate in this context. Both are addressable. Neither is currently addressed.",
          },
        ],
        outcome: [
          { label: "Finding", value: "Probable for PFS efficacy · Contested for ITC methodology acceptability" },
          { label: "Key gap 1", value: "PFS endpoint not justified against NICE’s OS preference for this tumour type" },
          { label: "Key gap 2", value: "ITC methodology previously flagged by ERG — history not acknowledged in dossier" },
          { label: "Next step", value: "Add endpoint justification section + ITC methodology response before submission" },
        ],
        value:
          "Both gaps were addressable — but only if they were addressed proactively in the dossier rather than reactively in the clarification round. The ERG’s clarification questions add months to the appraisal timeline. A dossier that anticipates the questions gets a faster decision.",
      },
      {
        numLabel: "Use case 02 of 03 · Healthcare + life sciences",
        name: "The Coverage Decision Review",
        persona: "Medical Director · Large US health plan · Formulary committee preparation",
        badge: "Standard depth · document ingestion",
        badgeVariant: "standard",
        question:
          "Is the clinical evidence presented in this prior authorisation request for a GLP-1 receptor agonist sufficient to support coverage for the requested indication, and what are the coverage criteria gaps?",
        highlights: [
          {
            agent: "Guardian SVS",
            text: "All primary citations verified. One study cited in the real-world evidence section was retracted in 2024 due to data integrity concerns. Flagged Critical — session halted pending resolution. Evidence node removed from the admissible evidence base.",
          },
          {
            agent: "Cartographer",
            text: "After retraction resolution: Settled: the drug class demonstrates weight reduction efficacy in the trial population. Contested: whether the trial population’s BMI and comorbidity profile matches the requesting patient’s clinical characteristics. Unknown: long-run cardiovascular outcome data for patients in the 30–35 BMI range without established cardiovascular disease.",
          },
          {
            agent: "Contrarian",
            text: "Moderate objection: \"The request cites SURMOUNT-1 efficacy data but the patient’s BMI is 31 with no cardiovascular comorbidity. SURMOUNT-1’s primary population had mean BMI of 38. The formulary committee will question whether the effect size applies to this patient at this BMI without the cardiovascular indication.\"",
          },
        ],
        outcome: [
          { label: "SVS flag", value: "Critical — retracted 2024 real-world evidence study identified and removed" },
          { label: "Finding", value: "Probable for efficacy in primary trial population · Contested for this patient’s BMI/comorbidity profile" },
          { label: "Coverage gap", value: "Trial population mismatch — BMI 38 vs patient BMI 31, no cardiovascular comorbidity" },
          { label: "Decision", value: "Prior authorisation declined pending additional clinical documentation for lower BMI indication" },
        ],
        value:
          "The retracted real-world evidence study would have remained in the coverage decision record without SVS. The population mismatch would have been identified by the formulary committee — but after a coverage decision had been issued rather than before. Both were caught at the review stage, not after the fact.",
      },
      {
        numLabel: "Use case 03 of 03 · Healthcare + life sciences",
        name: "The Trial Design Review",
        persona: "Clinical Research Director · Biotech · Phase III trial design finalisation",
        badge: "Standard depth",
        badgeVariant: "standard",
        question:
          "Does our Phase III trial design for this rare disease indication adequately power the primary endpoint, and what are the design decisions most likely to be challenged at the FDA pre-submission meeting?",
        highlights: [
          {
            agent: "Methodologist",
            text: "Sample size concern: the trial is powered at 80% for the primary endpoint using an assumed effect size derived from Phase II data in a population of 34 patients. The Phase II population was enriched for biomarker-positive patients. The Phase III protocol does not restrict enrolment to biomarker-positive patients. The assumed effect size may not hold in the broader population. Confidence on primary endpoint powering: Contested.",
          },
          {
            agent: "Contrarian",
            text: "Strong objection (Unresolved): \"The FDA’s recent guidance on rare disease trials specifically cautions against using enriched Phase II populations to power Phase III designs when Phase III enrolment is unrestricted. This design decision will be the first question at the pre-submission meeting. The team should have an answer before they are in the room.\"",
          },
          {
            agent: "Pragmatist",
            text: "Two options: (1) Restrict Phase III enrolment to biomarker-positive patients to preserve the Phase II effect size assumption — requires a companion diagnostic. (2) Re-power the trial using a conservative effect size for the unrestricted population — increases sample size but eliminates the design challenge. Prepare both scenarios for the pre-submission meeting.",
          },
        ],
        outcome: [
          { label: "Finding", value: "Contested — primary endpoint powering assumption may not hold in unrestricted population" },
          { label: "Key risk", value: "Phase II enriched population effect size used to power Phase III unrestricted enrolment" },
          { label: "FDA risk", value: "Recent guidance specifically cautions against this design approach for rare disease indications" },
          { label: "Next step", value: "Prepare two design scenarios — biomarker restriction vs conservative re-powering — before pre-submission meeting" },
        ],
        value:
          "The FDA’s recent guidance was published. The design decision predated it. No one had mapped the guidance to the protocol. Walking into the pre-submission meeting with two prepared scenarios — rather than hearing the question for the first time — is the difference between a productive meeting and a protocol redesign.",
      },
    ],
    howEyebrow: "How Augle works for healthcare",
    howTitle: ["Clinical evidence reviewed", "to the standard it will face."],
    howItems: [
      {
        title: "Submit your clinical materials",
        body: "Upload clinical study reports, systematic reviews, submission dossiers, trial protocols, and coverage decision packages. Clinical integrity mode activates — the Guardian checks every citation against retraction databases, flags retracted clinical studies at Critical severity, monitors population scope, and validates sample size thresholds against claim strength.",
      },
      {
        title: "The ensemble maps the evidence landscape",
        body: "The Cartographer classifies every clinical claim as Settled, Contested, or Unknown within the relevant evidence base. The Methodologist evaluates construct validity — whether the endpoint measures what the claim requires, whether the population matches the target, whether subgroup analyses are adequately powered. Confidence bounds are set as hard constraints.",
      },
      {
        title: "The reviewer’s objections are run",
        body: "The Contrarian takes the role of a well-briefed HTA clinical reviewer, payer medical director, or FDA reviewer — surfacing the comparator selection challenge, the endpoint appropriateness question, the population scope objection. Unresolved Strong objections appear verbatim with resolution conditions. These become the dossier preparation agenda.",
      },
      {
        title: "You receive an auditable clinical evidence record",
        body: "The full session audit trail — SVS verification outcomes, confidence grades per claim, objections raised and their resolution status — is exportable. For regulatory submissions, HTA dossiers, and coverage decisions, this is the record that demonstrates the evidence base was reviewed to the standard the decision requires.",
      },
    ],
    howConfigLabel: "Healthcare session · configuration",
    howConfig: [
      { label: "Guardian mode", value: "Clinical integrity — retraction database (Critical flag), population scope monitoring, sample size threshold checking, off-label framing detection, exclusion criteria preservation" },
      { label: "Document types", value: "Clinical study reports · Systematic reviews · HTA dossiers · Trial protocols · Coverage decision packages · Formulary submissions" },
      { label: "Contrarian focus", value: "HTA committee objections · endpoint appropriateness · comparator selection · population scope · ITC methodology · trial design challenges" },
      { label: "Output package", value: "Confidence grade per clinical claim · unresolved objections verbatim · SVS record with retraction flags · exportable audit trail for regulatory use" },
      { label: "Session depth", value: "Standard for coverage decisions and evidence reviews · Deep for HTA submissions and Phase III design with clinical expert review" },
    ],
    whyEyebrow: "Why Augle for healthcare",
    whyTitle: ["Evidence reviewed to the", "standard it will face."],
    whyCards: [
      {
        title: "Retracted clinical studies flagged at Critical",
        body: "Clinical integrity mode flags retracted studies at Critical severity — the highest level, triggering a session halt. A retracted study in a clinical evidence base is not a data quality issue — it is a fundamental integrity failure. The Guardian’s SVS catches it before it enters the deliberation. It should not reach an HTA committee, a formulary review, or a regulatory submission.",
      },
      {
        title: "Runs the HTA reviewer’s questions in advance",
        body: "The Contrarian is calibrated to surface the objection an ERG clinical reviewer, a NICE committee, or a payer medical director will raise — comparator selection, endpoint appropriateness, ITC methodology, population scope. These appear verbatim with resolution conditions. A dossier that anticipates and answers these questions proactively gets a faster and more predictable decision.",
      },
      {
        title: "Produces an auditable evidence record",
        body: "Every session produces an exportable audit trail with SVS verification outcomes, confidence grades per clinical claim, and every objection raised and its resolution status. For regulatory submissions, HTA dossiers, and formulary decisions subject to review, this record demonstrates that the evidence base was evaluated to a standard consistent with the decision’s stakes.",
      },
    ],
    ctaTitle: ["Clinical evidence reviewed", "to the standard it will face."],
    ctaBody: ["Join the waitlist and run a session on your next submission, coverage decision, or trial design."],
  },
  {
    slug: "universities",
    navLabel: "Universities + academia",
    metaTitle: "AI Research Tool for Universities | Dissertation & Grant Review — Augle",
    metaDescription:
      "Augle helps PhD candidates and faculty stress-test dissertation claims, review grant applications, and pressure-test peer review — with full academic integrity mode.",
    eyebrow: "Solutions · Universities + academia",
    heroTitle: {
      lines: ["The committee", "already knows"],
      emphasis: "your weaknesses.",
    },
    heroBody:
      "Dissertation defences, grant applications, and peer review processes all share the same structure: your work will face the strongest objections the field can muster. Augle runs those objections before the stakes are live — mapping what's settled, what's contested, and exactly where your methodology is most exposed.",
    personas: [
      "PhD candidates preparing for defence",
      "Grant applicants ahead of study section review",
      "Research faculty preparing manuscripts for submission",
      "Lab directors stress-testing landmark findings",
      "Pre-submission peer review preparation",
    ],
    sessionConfigLabel: "Session configuration · Academia",
    sessionConfig: [
      { label: "Guardian", value: "Academic integrity" },
      { label: "SVS checks", value: "Retraction DB · preprint flag · peer review status" },
      { label: "Documents", value: "Methodology chapters · drafts · grant sections" },
      { label: "Depth", value: "Standard or Deep" },
      { label: "Output", value: "Evidence landscape · objection register · actionable pre-submission edits" },
    ],
    problemTitle: ["You don't find out", "what's wrong until", "it's too late."],
    problemBody:
      "The committee has weeks to find problems in your methodology. You have one afternoon to defend it. Supervisors give broad guidance. Colleagues offer encouragement. Neither surfaces the precise objection the sharpest examiner in the room will use. Augle does.",
    questionsLabel: "Questions academics run on Augle",
    questions: [
      "Does my operationalisation actually support the causal claim I'm making?",
      "Which of my grant's innovation claims are most exposed to prior art challenge?",
      "What will the strongest peer reviewer say about my effect size?",
      "Is the replication record consistent with the framing in my manuscript?",
      "Are any of my significance citations flagged as preprints or retracted?",
    ],
    problemItems: [
      {
        title: "Construct validity gaps you haven't named",
        body: "The Methodologist evaluates whether your operationalisation actually measures the construct you claim. Committees penalise evasion more than limitation — the candidate who names the problem before being asked demonstrates command of the field.",
      },
      {
        title: "Preprint citations in significance claims",
        body: "The Guardian's SVS cross-references every citation against retraction databases and peer review status. Study sections routinely scrutinise preprint citations in significance claims — both affected evidence nodes are automatically capped at Probable and flagged for substitution.",
      },
      {
        title: "Innovation claims that intersect with prior art",
        body: "The Contrarian actively searches for functionally equivalent prior work. If a parallel publication from a competing lab shares architectural similarities with your innovation claim, it will surface — before your study section finds it, not after.",
      },
      {
        title: "The objection you haven't prepared for",
        body: "Augle's Contrarian runs at maximum temperature specifically to surface the unexpected objection — the one your supervisor didn't raise and your colleagues didn't think of. Unresolved Strong objections appear verbatim in the output so you know exactly what still needs answering.",
      },
    ],
    useCasesTitle: ["Three sessions.", "Three moments that matter."],
    useCasesBody:
      "Each scenario below is drawn from the Augle Use Case Compendium — hypothetical sessions illustrating realistic deliberation behaviour across the academic research lifecycle.",
    useCases: [
      {
        numLabel: "Use case 01 of 03 · Universities + academia",
        name: "The Dissertation Defence",
        persona: "PhD Candidate, Cognitive Science · University of Edinburgh",
        badge: "Standard depth",
        badgeVariant: "standard",
        question:
          "Does experience sampling via smartphone provide sufficient ecological validity to support attentional state claims in naturalistic environments?",
        highlights: [
          {
            agent: "Cartographer",
            text: "Settled: ESM is established. Contested: whether smartphone notification triggers introduce systematic attentional bias. Unknown: no study has directly compared notification-triggered vs. researcher-initiated ESM on attentional outcomes.",
          },
          {
            agent: "Methodologist",
            text: "Construct validity issue: the 3-item Likert operationalisation of attentional state has no published reliability data for smartphone delivery contexts.",
          },
          {
            agent: "Contrarian",
            text: "Strong objection (Unresolved): \"Self-report triggered by an attentional interruption is not a measure of naturalistic attention — it is a measure of post-interruption attentional recovery. The thesis conflates them throughout.\"",
          },
          {
            agent: "Synthesizer",
            text: "Probable for relative comparisons between conditions. Contested for absolute naturalistic attentional state claims. The causal entanglement objection is the committee's most likely line of attack.",
          },
        ],
        outcome: [
          { label: "Finding", value: "Contested — absolute naturalistic attentional claims not supportable as written" },
          { label: "SVS", value: "All citations verified. No retracted papers." },
          { label: "Key objection", value: "Causal entanglement — notification triggers the interruption it claims to measure" },
          { label: "Next step", value: "Reframe claim as post-interruption attentional recovery. Prepare committee response before defence." },
        ],
        value:
          "She walked in thinking the objection was about noise. She walked out knowing the committee's real argument is causal entanglement — a philosophically sharper objection that requires a different answer. She had three weeks to prepare it instead of hearing it for the first time in the room.",
      },
      {
        numLabel: "Use case 02 of 03 · Universities + academia",
        name: "The Grant Application Review",
        persona: "Associate Professor, Computational Linguistics · Pre-submission, NIH R01",
        badge: "Standard depth · document ingestion",
        badgeVariant: "standard",
        question:
          "Are the significance and innovation claims in this grant application supported by the current evidence base, and which are most vulnerable to study section challenge?",
        highlights: [
          {
            agent: "Guardian SVS",
            text: "28 of 31 citations verified. Two papers in the innovation section are preprints — neither peer-reviewed. Auto-flagged SVS_UNVERIFIED. Both evidence nodes capped at Probable.",
          },
          {
            agent: "Contrarian",
            text: "Moderate objection: \"The application claims the first computational model to account for bilateral recruitment under load. A 2024 Friederici lab paper has functionally equivalent architecture. This will be raised as prior art by Friederici-adjacent reviewers.\"",
          },
          {
            agent: "Pragmatist",
            text: "(1) Replace preprint citations with peer-reviewed alternatives — they exist. (2) Differentiate innovation claim from 2024 Friederici paper with one specific technical distinguisher. Both edits close predictable study section objections.",
          },
        ],
        outcome: [
          { label: "SVS flags", value: "2 × SVS_UNVERIFIED preprints in significance claims" },
          { label: "Prior art", value: "2024 Friederici lab paper — functionally equivalent architecture" },
          { label: "Edits needed", value: "Preprint substitution + two-sentence innovation differentiator" },
          { label: "Timeline", value: "Both edits completable in one afternoon with 10 days to deadline" },
        ],
        value:
          "The professor had strong conviction in the science. Augle found the two places the study section would focus — a prior art problem he hadn't encountered and two citation vulnerabilities he could fix in an afternoon. The science didn't change. The application's defensibility did.",
      },
      {
        numLabel: "Use case 03 of 03 · Universities + academia",
        name: "The Replication Crisis Check",
        persona: "Postdoctoral Researcher, Social Psychology · Pre-submission manuscript",
        badge: "Deep · flagship Contrarian",
        badgeVariant: "deep",
        question:
          "Does the priming literature support the effect size claimed in this manuscript, given the replication record across published and pre-registered studies?",
        highlights: [
          {
            agent: "Cartographer",
            text: "Settled: priming effects exist in constrained laboratory conditions. Contested: whether original effect sizes replicate outside original lab context. Unknown: pre-registered replication rate specifically for this effect type.",
          },
          {
            agent: "Methodologist",
            text: "External validity concern: original studies used WEIRD samples exclusively. Effect size meta-analysis includes original lab — potential allegiance bias inflating the estimate.",
          },
          {
            agent: "Contrarian",
            text: "Strong objection: \"The claimed d=0.42 draws heavily from pre-replication crisis studies. Post-2015 pre-registered replications show d=0.18 with wide CI. The manuscript's effect size claim is not supported by the contemporary replication record.\"",
          },
        ],
        outcome: [
          { label: "Finding", value: "Contested — claimed effect size not supported by post-2015 pre-registered replication record" },
          { label: "Revision", value: "Update effect size estimate to contemporary replication record before submission" },
          { label: "Framing", value: "Frame as contribution to replication literature rather than confirmation of legacy effect" },
        ],
        value:
          "The reviewer who specialises in replication methodology would have rejected the manuscript on the effect size claim alone. Augle surfaced this before submission — the researcher revised the framing and the effect size estimate, and submitted a paper that could survive the scrutiny it would face.",
      },
    ],
    howEyebrow: "How Augle works for academia",
    howTitle: ["Built for the academic", "research lifecycle."],
    howItems: [
      {
        title: "Submit your question and upload your documents",
        body: "Upload your methodology chapter, grant draft, or manuscript sections alongside your research question. The Topic Architect parses the question, sets the Guardian to academic integrity mode, and begins the deliberation.",
      },
      {
        title: "The Guardian authenticates every source in real time",
        body: "Every citation is cross-referenced against retraction databases and checked for peer review status. Preprints are flagged. Retracted papers are blocked. Your evidence base is authenticated before any deliberation begins.",
      },
      {
        title: "The Contrarian plays the examiner",
        body: "Running at maximum temperature to maximise variation, the Contrarian must steelman your methodology before challenging it. Each objection specifies a resolution condition — exactly what evidence or framing would close it.",
      },
      {
        title: "You get the finding — and the objections that remain",
        body: "The Synthesizer produces a calibrated confidence grade. Every unresolved objection surfaces verbatim in the output alongside the finding that triggered it. The Pragmatist translates this into specific pre-submission or pre-defence action items.",
      },
    ],
    howConfigLabel: "Academic integrity mode · Guardian configuration",
    howConfig: [
      { label: "Retraction check", value: "Every cited paper cross-referenced against Retraction Watch and publisher retraction databases before entering the evidence nodes registry" },
      { label: "Preprint flag", value: "arXiv, bioRxiv, SSRN, and similar preprint servers flagged SVS_UNVERIFIED — evidence node capped at Probable, flag raised to session audit trail" },
      { label: "Self-citation ratio", value: "Concentration of self-citation in significance claims monitored and flagged — Informational flag raised when ratio exceeds field norms" },
      { label: "Statistical claims", value: "Effect size claims validated against cited study design — GRADE CHALLENGE fires when Synthesizer claim exceeds evidentiary warrant" },
      { label: "Prior art search", value: "Contrarian actively surfaces parallel publications and functionally equivalent prior work — particularly relevant for innovation claims in grant applications" },
      { label: "Audit trail", value: "Full session record exportable — SVS verification log, objection register, confidence grades, and all Pragmatist action items" },
    ],
    whyEyebrow: "Why Augle for academia",
    whyTitle: ["What makes it different", "from everything else."],
    whyCards: [
      {
        title: "It plays the role of your sharpest examiner",
        body: "The Contrarian is required to steelman your methodology before challenging it — it produces the strongest possible version of your argument and then finds the objection that argument doesn't fully answer. This is structurally different from asking a colleague for feedback on a draft they want to succeed.",
      },
      {
        title: "Every citation is authenticated, not assumed",
        body: "The Guardian's Source Verification Service authenticates every citation before it enters the evidence base. A finding built on a retracted paper is a finding built on nothing. Academic integrity mode adds retraction database checks and preprint flagging that standard literature review tools don't perform.",
      },
      {
        title: "The objections that remain are the ones that matter",
        body: "Unresolved Strong objections surface verbatim in the final output alongside their resolution conditions. You know exactly what the examiner will say, in what form, and precisely what evidence or reframing would close it. General uncertainty acknowledgments are prohibited — each objection must specify its resolution condition.",
      },
      {
        title: "Gap findings are first-class outputs, not failures",
        body: "When the evidence is genuinely insufficient to support a claim — because the relevant study hasn't been done, or the construct hasn't been operationalised for your context — the finding says so explicitly. A Gap grade tells you what isn't knowable from the current evidence base. That's more valuable than a confident wrong answer.",
      },
      {
        title: "Document ingestion runs through the same architecture",
        body: "Uploading your methodology chapter or grant draft doesn't bypass the deliberation — it feeds it. Evidence from your documents enters the same evidence nodes registry, subject to the same SVS authentication and Methodologist validity assessment as any other source. The Guardian evaluates your documents' citations, not just their claims.",
      },
      {
        title: "$0.60 per Standard session",
        body: "A Standard deliberation — full multi-agent ensemble, three phases, Guardian active — costs $0.60. A dissertation committee costs three years and a defence. A study section rejection costs months of revision time. The economics of running Augle before those moments are straightforward.",
      },
    ],
    ctaTitle: ["Run your methodology", "before the committee does."],
    ctaBody: ["Join the waitlist and get one Standard session free.", "Run it on a real question before your next deadline."],
  },
  {
    slug: "financial-services",
    navLabel: "Financial services",
    metaTitle: "AI Investment Research & Compliance Review Tool | Augle",
    metaDescription:
      "Augle stress-tests investment research, compliance positions, and risk model assumptions with Guardian's Financial integrity mode.",
    eyebrow: "Solutions · Financial services",
    heroTitle: {
      lines: ["The analysis looks", "sound. The regulator"],
      emphasis: "disagrees.",
    },
    heroBody:
      "Financial services operate under a standard of evidence that is adversarial by design. Regulators, auditors, litigation counterparties, and internal risk functions all approach the same analysis with the same objective: finding what didn’t hold. Augle applies that standard to research quality, compliance positions, and risk model assumptions before the regulator does.",
    personas: [
      "Research analysts stress-testing investment theses and reports",
      "Compliance teams reviewing regulatory position papers",
      "Risk functions validating model assumptions and stress scenarios",
      "Legal teams preparing regulatory submissions and enforcement responses",
    ],
    sessionConfigLabel: "Session configuration",
    sessionConfig: [
      { label: "Guardian mode", value: "Financial integrity" },
      { label: "Depth", value: "Standard · Deep" },
      { label: "Documents", value: "Research reports · compliance papers · model documentation · regulatory submissions" },
      { label: "SVS checks", value: "Market data recency · regulatory filing version · forecast vs. historical · financial advice prohibition" },
      { label: "Output", value: "Finding · confidence grade · unresolved objections · audit trail" },
    ],
    problemTitle: ["Regulatory review is adversarial. Internal review isn’t."],
    problemBody:
      "A compliance position that survives internal review will face an FCA supervisor who has read the same regulation with different intent. An investment research report that passes editorial review will face an analyst at a short-selling firm who is looking for exactly what you missed. A risk model that clears the model validation function will face a stress scenario the internal team didn’t test. Augle runs the adversarial review first.",
    questionsLabel: "Questions financial services teams run on Augle",
    questions: [
      "What is the strongest regulatory challenge to our Consumer Duty compliance position on this product feature?",
      "Does the evidence in this equity research report support the investment thesis, or are key assumptions based on stale data?",
      "Which assumptions in this credit risk model are most sensitive to a stress scenario the model hasn’t been tested against?",
      "Is the regulatory filing we’re citing in our position paper the current version, and does it apply to our specific product structure?",
      "What would a short-seller’s research team find in this analyst report that we haven’t addressed?",
    ],
    problemItems: [
      {
        title: "Compliance positions that don’t survive regulatory scrutiny",
        body: "The Contrarian takes the role of an FCA supervisor or a well-briefed regulatory enforcement team — surfacing the interpretation of the regulation that challenges your compliance position, the precedent from a recent enforcement action your analysis doesn’t account for, and the product feature interaction your legal basis doesn’t address. Unresolved Strong objections appear verbatim with resolution conditions.",
      },
      {
        title: "Research reports with stale or single-source market data",
        body: "Financial integrity mode validates every market data citation for recency and source attribution. A market sizing figure from a 2022 report that has since been revised, a growth rate projection based on a single sell-side estimate, or a competitive position claim that doesn’t reflect the latest regulatory filing — each is flagged before it enters the published report. Stale data doesn’t survive SVS.",
      },
      {
        title: "Risk model assumptions untested against tail scenarios",
        body: "The Methodologist evaluates whether the model’s construct — what it claims to measure — holds under stress conditions the calibration data doesn’t cover. A credit risk model calibrated on post-GFC data that hasn’t been stress-tested against a rate environment it hasn’t seen, or a correlation assumption that breaks down under the specific tail scenario being tested, is Contested regardless of in-sample performance.",
      },
      {
        title: "Regulatory citations that are outdated or mis-scoped",
        body: "Financial integrity mode validates every regulatory filing citation against current version and applicable scope. A compliance position that relies on a superseded regulatory technical standard, or a legal basis that doesn’t apply to the specific product structure being assessed, is flagged before it enters a regulatory submission or an enforcement response. These are the citations regulators notice first.",
      },
    ],
    useCasesTitle: ["Three sessions.", "Three financial moments."],
    useCasesBody:
      "Each scenario illustrates realistic deliberation behaviour across compliance review, investment research stress-testing, and risk model validation.",
    useCases: [
      {
        numLabel: "Use case 01 of 03 · Financial services",
        name: "The Compliance Position Review",
        persona: "Head of Compliance · Retail investment platform · Pre-FCA supervisory meeting",
        badge: "Standard depth · document ingestion",
        badgeVariant: "standard",
        question:
          "Does our Consumer Duty compliance position on the platform’s default fund selection hold under the FCA’s current supervisory approach, and what is the strongest regulatory challenge we should be prepared to address?",
        highlights: [
          {
            agent: "Guardian SVS",
            text: "Regulatory citations validated. The compliance position references the FCA’s 2022 Consumer Duty Final Rules but does not reference the FCA’s July 2024 supervisory letter to retail investment platforms, which specifically addressed default fund selection as a target area for the current supervisory cycle. Flagged — regulatory analysis incomplete relative to current supervisory focus.",
          },
          {
            agent: "Cartographer",
            text: "Settled: the platform’s default selection process meets the baseline Consumer Duty requirements. Contested: whether the process meets the FCA’s current supervisory interpretation of ‘good outcomes’ for retail investors who have not made an active fund selection — which the 2024 supervisory letter specifically addresses.",
          },
          {
            agent: "Contrarian",
            text: "Strong objection (Unresolved): \"The FCA’s 2024 supervisory letter makes clear that default fund selection is a current examination priority. A compliance position that doesn’t reference or address this letter will be the first thing the supervisor raises. The platform should have a prepared response — not discover this in the meeting.\"",
          },
          {
            agent: "Pragmatist",
            text: "Add a section directly addressing the 2024 supervisory letter and the platform’s specific response to the FCA’s stated concerns about default fund selection. The supervisor who receives a compliance position that engages with their published supervisory priorities has less to ask about. One section prevents a three-hour examination becoming a six-hour one.",
          },
        ],
        outcome: [
          { label: "SVS flag", value: "2024 FCA supervisory letter not referenced — current examination priority unaddressed" },
          { label: "Finding", value: "Probable for baseline compliance · Contested against current supervisory interpretation" },
          { label: "Next step", value: "Add 2024 supervisory letter response section before supervisory meeting" },
        ],
        value:
          "The FCA’s 2024 supervisory letter was public. The compliance team had the 2022 Final Rules but hadn’t updated the position paper to reflect the current supervisory cycle. Walking into an examination with a position paper that engages the supervisor’s stated priorities is a materially different conversation from the one that doesn’t.",
      },
      {
        numLabel: "Use case 02 of 03 · Financial services",
        name: "The Equity Research Review",
        persona: "Head of Research · Asset management firm · Pre-publication report review",
        badge: "Standard depth · document ingestion",
        badgeVariant: "standard",
        question:
          "Does the investment thesis in this initiating coverage report on a mid-cap technology company hold under stress-testing, and what will a short-seller’s research team find that our team hasn’t addressed?",
        highlights: [
          {
            agent: "Guardian SVS",
            text: "Market data recency check: the TAM estimate ($8.4B by 2027) is sourced from a Forrester report published in Q3 2022. Forrester revised the estimate downward to $6.1B in their Q1 2025 update following sector-wide demand compression. The report uses the superseded figure. Flagged — market data recency concern.",
          },
          {
            agent: "Methodologist",
            text: "Construct validity: the report’s revenue multiple valuation is benchmarked against a peer group with median gross margins of 72%. The subject company’s gross margin is 58% — a 14-point gap the valuation section does not address. A short-seller will use this discrepancy to argue the multiple is inflated by 15–20%.",
          },
          {
            agent: "Contrarian",
            text: "Moderate objection: \"The bull case rests on a customer expansion assumption in the SMB segment. The company’s last two earnings calls show SMB churn running at 18% annually — materially above the 12% the model assumes. This is in the public earnings transcripts. A short-seller has already built this into their model. The report hasn’t.\"",
          },
        ],
        outcome: [
          { label: "SVS flag", value: "TAM estimate superseded — $8.4B (2022) vs $6.1B (2025 revised)" },
          { label: "Finding", value: "Contested — three material gaps before publication" },
          { label: "Key gaps", value: "Stale TAM · margin-adjusted multiple not addressed · SMB churn above model assumption" },
          { label: "Next step", value: "Update TAM · add margin discount to peer multiple · address SMB churn in bear case" },
        ],
        value:
          "All three gaps were in public sources. A short-seller’s response note the day after publication would have found all three. A report that addresses them proactively — with a bear case that acknowledges the SMB churn risk and a margin-adjusted valuation section — is a more credible piece of research, not a less bullish one.",
      },
      {
        numLabel: "Use case 03 of 03 · Financial services",
        name: "The Risk Model Validation",
        persona: "Chief Risk Officer · Regional bank · Internal model validation cycle",
        badge: "Deep depth · document ingestion",
        badgeVariant: "deep",
        question:
          "Does our retail mortgage credit risk model perform reliably under a rapid rate normalisation scenario, and what are the correlation assumptions most likely to break down under stress?",
        highlights: [
          {
            agent: "Methodologist",
            text: "Construct validity: the model is calibrated on 2010–2023 data. This period includes only one sustained rate environment — effectively zero rates post-GFC. The model has not been tested against a normalisation scenario where rate increases coincide with house price compression. The 2022–2024 UK rate environment provides an out-of-sample test case the model validation has not used.",
          },
          {
            agent: "Contrarian",
            text: "Strong objection (Unresolved): \"The LTV-default correlation is calibrated at 0.42. In the 2007–2009 downturn, this correlation rose to 0.67 under simultaneous rate and house price stress. The model assumes the 2010–2023 correlation holds under the stress scenario being tested. It didn’t hold in the last comparable stress period. The PRA will ask this.\"",
          },
          {
            agent: "Pragmatist",
            text: "Two actions: (1) Back-test the model against the 2022–2024 UK rate normalisation data as an out-of-sample validation. (2) Run a sensitivity analysis on the LTV-default correlation at 0.55 and 0.67 — the 2008–2009 levels — as a documented stress scenario. Both are defensible responses to the PRA’s model validation standards. Neither is currently in the validation documentation.",
          },
        ],
        outcome: [
          { label: "Finding", value: "Contested under rapid rate normalisation — correlation assumption untested at stress levels" },
          { label: "Key gap", value: "LTV-default correlation calibrated at 0.42 · reached 0.67 in 2008–2009 comparable stress" },
          { label: "Out-of-sample", value: "2022–2024 UK rate normalisation not used as validation data despite availability" },
          { label: "Next step", value: "2022–2024 back-test + correlation sensitivity at 0.55 and 0.67 before PRA submission" },
        ],
        value:
          "The 2022–2024 rate normalisation data was available. The model validation team hadn’t used it as an out-of-sample test. The PRA’s model validation standards require stress testing against scenarios the calibration period didn’t cover. Finding this before the PRA submission meant a validation update rather than a model rejection.",
      },
    ],
    howEyebrow: "How Augle works for financial services",
    howTitle: ["The adversarial review", "regulators run. First."],
    howItems: [
      {
        title: "Submit your financial materials",
        body: "Upload research reports, compliance position papers, model documentation, regulatory submissions, and risk assessments. Financial integrity mode activates — the Guardian validates market data recency, regulatory filing version and applicability, source attribution, the distinction between historical data and forward projections, and applies the financial advice framing prohibition.",
      },
      {
        title: "The ensemble maps what’s defensible",
        body: "The Cartographer classifies every key claim as Settled, Contested, or Unknown against the current regulatory and market evidence landscape. The Methodologist evaluates construct validity — whether the model measures what it claims under stress, whether the compliance position holds against current supervisory interpretation, whether the research assumptions are supported by current data.",
      },
      {
        title: "The regulator’s challenge is run first",
        body: "The Contrarian takes the role of an FCA supervisor, a PRA model validator, a short-seller’s research team, or a litigation counterparty — surfacing the strongest challenge to your position. Unresolved Strong objections appear verbatim with resolution conditions. These become the preparation agenda before the regulatory meeting, not the surprise during it.",
      },
      {
        title: "You receive a defensible evidence record",
        body: "The full session audit trail — SVS verification outcomes, confidence grades per claim, every objection raised and its resolution status — is exportable. For regulatory submissions, enforcement responses, and model validation documentation, this record demonstrates the analysis was reviewed to the standard the regulatory environment requires.",
      },
    ],
    howConfigLabel: "Financial services session · configuration",
    howConfig: [
      { label: "Guardian mode", value: "Financial integrity — market data recency, regulatory filing version, source attribution, forecast vs. historical distinction, financial advice framing prohibition (Critical flag)" },
      { label: "Document types", value: "Research reports · Compliance positions · Model documentation · Regulatory submissions · Risk assessments · Enforcement responses" },
      { label: "Contrarian focus", value: "Regulatory interpretation challenges · supervisory letter gaps · model stress scenarios · short-seller research angles · enforcement precedent application" },
      { label: "Output package", value: "Confidence grade per claim · unresolved objections verbatim · SVS record · exportable audit trail for regulatory and litigation use" },
      { label: "Session depth", value: "Standard for compliance reviews and research reports · Deep for PRA model submissions and major enforcement responses" },
    ],
    whyEyebrow: "Why Augle for financial services",
    whyTitle: ["Regulatory scrutiny applied", "before the regulator does."],
    whyCards: [
      {
        title: "Runs the regulator’s challenge before the meeting",
        body: "The Contrarian surfaces the FCA supervisor’s interpretation challenge, the PRA model validator’s stress scenario objection, and the enforcement team’s precedent application — at maximum temperature, with the strongest possible framing. Unresolved objections appear verbatim. The compliance team that prepares for these questions controls the supervisory meeting. The one that hears them for the first time doesn’t.",
      },
      {
        title: "Validates market data and regulatory citations automatically",
        body: "Financial integrity mode checks every market data citation for recency and every regulatory filing reference for currency and scope. A compliance position based on a superseded regulatory technical standard, or a research report using a revised market size figure, is flagged before it reaches publication or a regulatory submission. Stale data and outdated citations are the first things regulators and short-sellers find.",
      },
      {
        title: "Produces an auditable record for regulated use",
        body: "Every session produces an exportable audit trail — SVS verification outcomes, confidence grades, every objection raised and its resolution status. For regulatory submissions, enforcement responses, and model validation documentation subject to PRA or FCA review, this record demonstrates the analysis was reviewed to the standard that the regulatory environment and supervisory expectations require.",
      },
    ],
    ctaTitle: ["Run the regulator’s review", "before they do."],
    ctaBody: ["Join the waitlist and stress-test your next compliance position, research report, or risk model."],
  },
  {
    slug: "government",
    navLabel: "Government + public sector",
    metaTitle: "AI Policy Evidence & Procurement Review Tool | Augle",
    metaDescription:
      "Augle stress-tests policy evidence, procurement analysis, and public consultation claims before parliamentary or judicial review does.",
    eyebrow: "Solutions · Government + public sector",
    heroTitle: {
      lines: ["Public decisions made", "on evidence that"],
      emphasis: "hasn’t been tested.",
    },
    heroBody:
      "Government decisions enter the public record and are subject to scrutiny that has no deadline — parliamentary committees, NAO reviews, judicial review, FOI requests, and the sustained attention of a free press. The evidence base that underpins a public decision needs to withstand that scrutiny from the moment it’s published. Augle applies it before publication.",
    personas: [
      "Civil servants preparing advice to ministers",
      "Policy teams developing evidence bases for major programmes",
      "Procurement officials evaluating major contract bids",
      "Heads of analysis reviewing departmental research quality",
    ],
    sessionConfigLabel: "Session configuration",
    sessionConfig: [
      { label: "Guardian mode", value: "Academic + Legal" },
      { label: "Depth", value: "Standard · Deep" },
      { label: "Documents", value: "Policy papers · ministerial briefs · impact assessments · bid documents" },
      { label: "SVS checks", value: "Retraction DB · statutory version · jurisdiction scope · source independence" },
      { label: "Output", value: "Finding · confidence grade · unresolved objections · exportable audit trail" },
    ],
    problemTitle: ["Parliamentary scrutiny finds what departmental review missed."],
    problemBody:
      "Public sector decisions pass through internal review processes that are thorough but rarely adversarial. A select committee researcher, a NAO analyst, a judicial review claimant, or an investigative journalist approaches the same evidence base with a different objective: finding the weakness. The impact assessment whose cost-benefit methodology won’t survive Treasury Select Committee scrutiny. The programme whose evidence base relies on a superseded study. These things get found — the question is when.",
    questionsLabel: "Questions government teams run on Augle",
    questions: [
      "What will the NAO say about the methodology in this business case if the programme underdelivers?",
      "Does the evidence base for this intervention generalise to the population we’re targeting at the scale we’re proposing?",
      "Which claims in this impact assessment are most exposed to select committee or judicial review challenge?",
      "Are the statutory references in this policy document current and applicable to the jurisdiction and context we’re operating in?",
      "What is the strongest argument a judicial review claimant could make against the evidence base for this decision?",
    ],
    problemItems: [
      {
        title: "Business cases whose methodology won’t survive NAO scrutiny",
        body: "The Methodologist evaluates every key assumption in a business case against the evidence that supports it. Optimism bias in cost estimates, benefit calculations that depend on assumptions the Green Book framework doesn’t permit, or BCRs built on evidence from a different context — each is identified and graded before the case goes to approval. The NAO’s methodology review starts from exactly these points.",
      },
      {
        title: "Policy evidence that doesn’t survive independent scrutiny",
        body: "The Contrarian takes the role of a well-briefed select committee researcher, a hostile expert witness, or a judicial review claimant — surfacing the external validity objection, the population scope mismatch, the evidence recency problem. Unresolved Strong objections appear verbatim with resolution conditions. These become the policy team’s preparation agenda, not the committee’s gotcha.",
      },
      {
        title: "Statutory references that are out of date or mis-scoped",
        body: "Legal integrity mode validates every statutory reference against current version and applicable jurisdiction. A policy document that cites superseded regulations, or a legal basis that doesn’t apply to the specific context being addressed, is flagged before it enters a ministerial submission or a published consultation. These are the citations that attract judicial review claims.",
      },
      {
        title: "Procurement decisions without a defensible evidence trail",
        body: "Major procurement decisions are subject to challenge from unsuccessful bidders and ongoing NAO scrutiny. The Contrarian evaluates whether the evaluation criteria were applied consistently, whether the evidence for the winning bid’s claimed capabilities is independently supported, and whether the whole-life cost methodology is defensible. The audit trail Augle produces is the record you want available when challenged.",
      },
    ],
    useCasesTitle: ["Three sessions.", "Three public sector moments."],
    useCasesBody:
      "Each scenario illustrates realistic deliberation behaviour across business case review, policy evidence assessment, and ministerial briefing preparation.",
    useCases: [
      {
        numLabel: "Use case 01 of 03 · Government + public sector",
        name: "The Business Case Review",
        persona: "Deputy Director, Strategy · Central government department · Pre-HM Treasury submission",
        badge: "Standard depth · document ingestion",
        badgeVariant: "standard",
        question:
          "Does the Full Business Case for this digital transformation programme have a BCR and cost-benefit methodology that will withstand Treasury and NAO scrutiny, and what are the two assumptions most likely to be challenged?",
        highlights: [
          {
            agent: "Cartographer",
            text: "Settled: the programme addresses a genuine efficiency gap. Contested: whether the 3.2:1 BCR is achievable given the programme’s dependency on a 40% staff redeployment assumption that has no precedent in comparable digital transformation programmes in the department’s sector. Unknown: the baseline cost of the current system, which the BCR’s benefit calculation depends on but which has not been independently validated.",
          },
          {
            agent: "Methodologist",
            text: "Two construct validity issues: (1) The staff redeployment benefit assumes full redeployment to productive roles within 12 months — the comparable from HMRC’s 2019 transformation shows 18-month average with 15% attrition rather than redeployment. (2) The baseline system cost is a departmental estimate, not an independently audited figure. The Treasury will request independent validation. Confidence ceiling on BCR: Contested.",
          },
          {
            agent: "Contrarian",
            text: "Strong objection (Unresolved): \"The NAO’s 2023 report on digital transformation in government specifically identified optimistic redeployment assumptions as the most common driver of BCR overstatement in the sector. This business case repeats exactly that pattern. The NAO will cite their own report. The department should be prepared for this.\"",
          },
          {
            agent: "Pragmatist",
            text: "(1) Commission independent baseline cost audit before Treasury submission. (2) Revise redeployment timeline to 18 months with 15% attrition sensitivity case — aligning with the HMRC comparable. Both changes reduce the headline BCR but produce a figure the Treasury and NAO will not be able to challenge on methodology.",
          },
        ],
        outcome: [
          { label: "Finding", value: "Contested — BCR overstated on two specific assumptions" },
          { label: "Key gap 1", value: "Redeployment assumption 40% / 12 months vs HMRC comparable 85% / 18 months" },
          { label: "Key gap 2", value: "Baseline system cost is departmental estimate — not independently validated" },
          { label: "Next step", value: "Independent baseline audit + revised redeployment sensitivity case before submission" },
        ],
        value:
          "The NAO’s 2023 report was in the public domain. No one on the programme team had mapped it to the business case assumptions. A revised BCR of 2.6:1 on a defensible methodology is a better outcome than a challenged BCR of 3.2:1 — especially when the NAO is citing their own published work.",
      },
      {
        numLabel: "Use case 02 of 03 · Government + public sector",
        name: "The Ministerial Brief Review",
        persona: "Head of Analysis · Government department · Pre-select committee appearance",
        badge: "Standard depth",
        badgeVariant: "standard",
        question:
          "Does the evidence base in the ministerial briefing pack for the select committee appearance on youth employment hold up, and what are the three questions the committee will ask that the brief doesn’t currently answer?",
        highlights: [
          {
            agent: "Guardian SVS",
            text: "All citations verified. One study cited as evidence for the programme’s 23% employment outcome improvement is a 2019 evaluation conducted before the post-pandemic labour market disruption. The recency qualification is not noted in the brief. Flagged SVS_UNVERIFIED — data recency concern. Evidence node downgraded.",
          },
          {
            agent: "Contrarian",
            text: "Strong objection (Unresolved): \"The committee has the IFS’s March 2025 analysis of youth employment programmes, which covers the same intervention in the post-pandemic period and shows a materially different effect size. The minister will be asked why the brief uses a pre-pandemic evaluation. The brief has no answer because it doesn’t acknowledge the more recent evidence.\"",
          },
          {
            agent: "Pragmatist",
            text: "Add a one-paragraph acknowledgement of the IFS’s 2025 analysis with the department’s interpretation of the difference in effect size. The minister who acknowledges and addresses the more recent evidence is in a stronger position than the minister who appears not to have seen it.",
          },
        ],
        outcome: [
          { label: "SVS flag", value: "Primary citation is pre-pandemic — recency qualification absent from brief" },
          { label: "Key gap", value: "IFS 2025 post-pandemic analysis not acknowledged — committee has it, brief doesn’t" },
          { label: "Next step", value: "Add IFS acknowledgement paragraph + ministerial Q&A line for post-pandemic effect size question" },
        ],
        value:
          "The IFS analysis was published and the committee had it. A ministerial brief that doesn’t acknowledge it looks like the department hasn’t read it. A brief that addresses it proactively demonstrates the department has — and has a considered position. One paragraph changes the committee dynamic entirely.",
      },
      {
        numLabel: "Use case 03 of 03 · Government + public sector",
        name: "The Judicial Review Risk Assessment",
        persona: "Legal Adviser · Central government department · Pre-publication policy decision",
        badge: "Deep depth · document ingestion",
        badgeVariant: "deep",
        question:
          "What is the strongest judicial review ground a claimant could use to challenge this planning policy decision, and does the evidence base in the decision record adequately address it?",
        highlights: [
          {
            agent: "Cartographer",
            text: "Settled: the decision is within the statutory power. Contested: whether the decision-maker adequately considered the equality impact of the policy on the affected community under the Public Sector Equality Duty. Unknown: whether the consultation process met the legal threshold for adequacy given the complexity of the decision and the time allowed for responses.",
          },
          {
            agent: "Guardian SVS",
            text: "Statutory references validated. The PSED analysis references the 2010 Equality Act but does not reference the 2021 Supreme Court decision that clarified the standard of consideration required. Flagged SVS_UNVERIFIED — statutory analysis may be incomplete relative to current case law.",
          },
          {
            agent: "Contrarian",
            text: "Strong objection (Unresolved): \"The two most likely JR grounds are PSED adequacy and consultation lawfulness. The decision record addresses PSED in three paragraphs without referencing the 2021 SC standard. A claimant’s legal team will lead with this. The consultation window was 21 days for a complex technical decision — the case law threshold for adequacy is contested at this length.\"",
          },
        ],
        outcome: [
          { label: "Finding", value: "Probable for statutory power · Contested for PSED adequacy and consultation lawfulness" },
          { label: "Key JR risk 1", value: "PSED analysis doesn’t reference 2021 SC standard — three paragraphs against current case law threshold" },
          { label: "Key JR risk 2", value: "21-day consultation window — lawfulness contested for decision of this complexity" },
          { label: "Next step", value: "Expand PSED section referencing 2021 SC decision. Legal advice on consultation adequacy before publication." },
        ],
        value:
          "Both JR grounds were addressable before publication. The PSED gap required an expanded analysis section. The consultation adequacy question required a legal opinion. Neither required the decision to be remade — but both required action before publication, not after a claim was filed.",
      },
    ],
    howEyebrow: "How Augle works for government",
    howTitle: ["The scrutiny that follows", "public decisions. Applied first."],
    howItems: [
      {
        title: "Submit your policy materials",
        body: "Upload business cases, policy papers, ministerial briefings, impact assessments, and legal advice. Academic and legal integrity modes activate — the Guardian validates statutory references against current versions, checks retraction status on cited research, and flags source independence concerns before any agent receives the evidence.",
      },
      {
        title: "The ensemble maps what’s defensible",
        body: "The Cartographer classifies every claim as Settled, Contested, or Unknown in the relevant policy and legal context. The Methodologist evaluates construct validity — whether BCR assumptions are Green Book-compliant, whether the evidence base generalises to the target population, whether the legal analysis reflects current case law.",
      },
      {
        title: "The scrutineer’s questions are run",
        body: "The Contrarian takes the role of a select committee researcher, NAO analyst, judicial review claimant, or investigative journalist — surfacing the strongest challenge to the evidence base or decision record. Unresolved Strong objections appear verbatim with resolution conditions. These become the preparation agenda before the decision is published.",
      },
      {
        title: "You receive an auditable decision record",
        body: "The full session audit trail is exportable — SVS verification outcomes, confidence grades per claim, every objection raised and its resolution status. For public decisions subject to parliamentary scrutiny, judicial review, FOI requests, or NAO review, this is the record that demonstrates the evidence base was reviewed to an appropriate standard.",
      },
    ],
    howConfigLabel: "Government session · configuration",
    howConfig: [
      { label: "Guardian mode", value: "Academic + Legal — retraction database, statutory version validation, jurisdiction scope, case law currency, source independence" },
      { label: "Document types", value: "Business cases · Policy papers · Ministerial briefings · Impact assessments · Consultation documents · Legal advice · Procurement evaluations" },
      { label: "Contrarian focus", value: "Select committee lines · NAO methodology challenges · judicial review grounds · BCR assumption scrutiny · consultation adequacy" },
      { label: "Output package", value: "Confidence grade per claim · unresolved objections verbatim · SVS record · exportable audit trail for FOI and parliamentary accountability" },
      { label: "Session depth", value: "Standard for ministerial briefings and policy papers · Deep for major business cases and decisions with judicial review exposure" },
    ],
    whyEyebrow: "Why Augle for government",
    whyTitle: ["Decisions that hold up", "under sustained scrutiny."],
    whyCards: [
      {
        title: "Runs the NAO and committee questions in advance",
        body: "The Contrarian surfaces the objection a NAO analyst, select committee researcher, or judicial review claimant will raise — at maximum temperature, with the strongest possible framing. Unresolved objections appear verbatim with resolution conditions. The policy team that prepares for these questions before publication controls the outcome. The one that encounters them for the first time in committee doesn’t.",
      },
      {
        title: "Validates statutory references against current law",
        body: "Legal integrity mode checks every statutory citation against current version and applicable jurisdiction. Superseded regulations, outdated case law, and cross-jurisdiction misapplications are flagged before they enter a ministerial submission or published consultation. These are the citations that attract judicial review claims and committee questions about departmental competence.",
      },
      {
        title: "Produces a defensible audit trail",
        body: "Every session produces an exportable record — SVS verification outcomes, confidence grades, every objection raised and its resolution status. For decisions subject to FOI, judicial review, parliamentary scrutiny, or NAO review, this record demonstrates the evidence base was reviewed to a standard consistent with the accountability requirements that apply to public sector decisions.",
      },
    ],
    ctaTitle: ["Evidence that holds up", "under public scrutiny."],
    ctaBody: ["Join the waitlist and run a session on your next business case, policy paper, or ministerial brief."],
  },
  {
    slug: "law-firms",
    navLabel: "Law firms",
    metaTitle: "AI Legal Research & Brief Review Tool for Law Firms | Augle",
    metaDescription:
      "Stress-test legal arguments and briefs with seven-agent adversarial review — Guardian operates in Legal integrity mode with statutory and jurisdiction verification.",
    eyebrow: "Solutions · Law firms",
    heroTitle: {
      lines: ["Expert evidence that", "won’t survive"],
      emphasis: "cross-examination.",
    },
    heroBody:
      "Opposing counsel will stress-test every citation, every expert opinion, and every precedent your case relies on. Augle runs that review first — mapping what’s settled law, what’s contested, and where your evidence base is most exposed before you’re in the room.",
    personas: [
      "Litigation partners preparing expert evidence",
      "Associates conducting case law research",
      "In-house counsel reviewing regulatory applicability",
      "Dispute resolution teams stress-testing arbitration positions",
    ],
    sessionConfigLabel: "Session configuration",
    sessionConfig: [
      { label: "Guardian mode", value: "Legal integrity" },
      { label: "Depth", value: "Standard · Deep" },
      { label: "Documents", value: "Case bundles · Expert reports · Statutes" },
      { label: "SVS checks", value: "Case citation · overruled decisions · jurisdiction scope · statutory version" },
      { label: "Output", value: "Finding · confidence grade · unresolved objections · audit trail" },
    ],
    problemTitle: ["The weaknesses in your evidence are already known."],
    problemBody:
      "Good opposing counsel doesn’t find weaknesses in the courtroom — they find them during disclosure and prepare the cross-examination weeks in advance. The expert report that relies on a methodology your opponent’s expert will dispute. The precedent that’s been distinguished in three subsequent decisions. The statutory interpretation that doesn’t survive the most recent appellate ruling. These vulnerabilities exist before you file.",
    questionsLabel: "Questions law firms run on Augle",
    questions: [
      "What is the strongest methodological objection opposing counsel will raise against our expert’s damage calculation?",
      "Has this precedent been distinguished or limited in subsequent appellate decisions in our jurisdiction?",
      "Does the regulatory framework our compliance position relies on apply in this specific statutory context?",
      "Which causation claims are most vulnerable to the threshold of proof required in this jurisdiction?",
      "Is the expert consensus on this technical question as settled as our instructions suggest?",
    ],
    problemItems: [
      {
        title: "Expert reports with methodology opposing counsel will challenge",
        body: "The Methodologist evaluates the evidentiary basis of every expert claim — whether the methodology used actually supports the conclusion drawn. A damage calculation based on a comparator set your opponent will dispute, or an expert opinion that overstates the consensus, is identified before it reaches disclosure.",
      },
      {
        title: "Case citations that have been overruled or distinguished",
        body: "The Guardian’s SVS validates every case citation against legal databases — identifying overruled decisions, subsequent distinctions, and jurisdictional inapplicability. A precedent that looked authoritative in your initial research may have been materially limited by subsequent appellate decisions.",
      },
      {
        title: "Statutory interpretations that don’t survive current law",
        body: "Regulatory frameworks change. The compliance position that was defensible under an earlier version of the rules may not survive under the current statutory instrument. SVS validates the version and applicability of every statutory reference automatically, before it enters a submission.",
      },
      {
        title: "The cross-examination line you haven’t prepared for",
        body: "The Contrarian runs at maximum temperature to surface the adversarial framing opposing counsel will deploy. Every objection specifies a resolution condition. Unresolved Strong objections appear verbatim in your output — not softened, not summarised — so you know exactly what needs answering before the hearing.",
      },
    ],
    useCasesTitle: ["Three sessions.", "Three legal moments."],
    useCasesBody:
      "Each scenario illustrates realistic deliberation behaviour across litigation preparation, regulatory review, and expert evidence assessment.",
    useCases: [
      {
        numLabel: "Use case 01 of 03 · Law firms",
        name: "The Expert Evidence Review",
        persona: "Litigation Partner · Commercial dispute · London arbitration",
        badge: "Deep depth · expert review",
        badgeVariant: "deep",
        question:
          "Does our quantum expert’s loss of profit calculation methodology withstand the methodological objections opposing counsel is likely to raise?",
        highlights: [
          {
            agent: "Cartographer",
            text: "Settled: the but-for counterfactual approach is standard. Contested: the choice of comparator period and the exclusion of macro-economic headwinds from the baseline. Unknown: no published arbitral decision directly addresses this comparator methodology for this sector.",
          },
          {
            agent: "Methodologist",
            text: "Construct validity issue: the comparator period selected predates the regulatory change that suppressed sector revenue across all participants. The baseline may be inflated, overstating loss. Confidence ceiling on loss quantum: Contested.",
          },
          {
            agent: "Contrarian",
            text: "Strong objection (Unresolved): \"The expert isolates the breach as the but-for cause while ignoring sector-wide revenue compression during the same period. Opposing counsel will argue the counterfactual overstates loss by 30–40%.\"",
          },
          {
            agent: "Pragmatist",
            text: "Commission supplementary analysis addressing the macro-economic headwind objection. Prepare a fallback quantum with the adjustment applied. The tribunal will want to see this addressed — better to raise it than have it raised against you.",
          },
        ],
        outcome: [
          { label: "Finding", value: "Contested — loss quantum vulnerable to sector-wide adjustment objection" },
          { label: "Key objection", value: "Comparator baseline inflated; macro headwind not isolated from breach effect" },
          { label: "Next step", value: "Supplementary expert analysis + fallback quantum calculation with adjustment" },
        ],
        value:
          "The team knew the comparator period was a potential weakness. They didn’t know opposing counsel had already retained an economist specifically to address the sector-wide revenue compression point. The supplementary analysis was commissioned three weeks before the Preliminary Meeting — not two days before the hearing.",
      },
      {
        numLabel: "Use case 02 of 03 · Law firms",
        name: "The Precedent Validity Check",
        persona: "Senior Associate · Regulatory litigation · Financial services",
        badge: "Standard depth",
        badgeVariant: "standard",
        question:
          "Does the line of authority our submissions rely on for the interpretation of ‘reasonable steps’ under the Consumer Duty remain good law in the current appellate landscape?",
        highlights: [
          {
            agent: "Guardian SVS",
            text: "Three decisions in the primary authority line remain good law. One — cited in the skeleton argument — was distinguished in a 2024 Court of Appeal decision on materially similar facts. Not in the original research file.",
          },
          {
            agent: "Cartographer",
            text: "Settled: the ‘reasonable steps’ standard requires contextual assessment. Contested: whether the standard applies differently where the firm had access to third-party data identifying the risk. The 2024 CA decision shifts the landscape.",
          },
          {
            agent: "Contrarian",
            text: "Moderate objection: \"The skeleton reads the primary authority as settling the standard. The 2024 CA decision introduces a data-access qualification the FCA will invoke. Address the distinction — don’t ignore it.\"",
          },
        ],
        outcome: [
          { label: "SVS flag", value: "One cited authority distinguished in 2024 CA decision — not in original research" },
          { label: "Finding", value: "Probable for general standard · Contested for data-access qualification post-2024" },
          { label: "Next step", value: "Update skeleton to address 2024 CA distinction explicitly" },
        ],
        value:
          "The 2024 Court of Appeal decision wasn’t in the junior’s research file. It would have been in the FCA’s skeleton argument. Finding it through SVS before filing cost one afternoon of revision. Finding it in the FCA’s response would have cost considerably more.",
      },
      {
        numLabel: "Use case 03 of 03 · Law firms",
        name: "The Regulatory Applicability Review",
        persona: "In-house General Counsel · Technology company · Pre-launch compliance",
        badge: "Standard depth · document ingestion",
        badgeVariant: "standard",
        question:
          "Does our data processing architecture comply with the current UK GDPR regulatory framework, and which elements carry material enforcement risk?",
        highlights: [
          {
            agent: "Guardian SVS",
            text: "Two references in the compliance documentation cite the pre-Brexit EU GDPR text rather than the UK GDPR as retained and amended. Article numbers diverge post-amendment. Both flagged SVS_UNVERIFIED — statutory version mismatch.",
          },
          {
            agent: "Methodologist",
            text: "The legitimate interests assessment relies on a balancing test formulation that the ICO’s 2023 guidance has since restated. Technically arguable but not aligned with current ICO enforcement posture.",
          },
          {
            agent: "Contrarian",
            text: "Strong objection (Unresolved): \"The legitimate interests basis is used where purpose limitation concerns should prompt consent. The ICO has issued enforcement notices on materially similar architectures. This is the highest enforcement risk element.\"",
          },
        ],
        outcome: [
          { label: "SVS flags", value: "2 × statutory version mismatch — EU GDPR cited instead of UK GDPR" },
          { label: "Finding", value: "Probable for overall framework · Contested for legitimate interests basis" },
          { label: "Next step", value: "Update citations to UK GDPR. Review legitimate interests basis. Consider consent as alternative." },
        ],
        value:
          "The statutory version mismatch was invisible in internal review — article numbers are similar enough that the error didn’t register. The enforcement risk on the legitimate interests basis was known but not quantified. Augle surfaced both before the architecture was finalised, not after the ICO opened an investigation.",
      },
    ],
    howEyebrow: "How Augle works for law firms",
    howTitle: ["Adversarial review before", "opposing counsel runs it."],
    howItems: [
      {
        title: "Submit your case materials",
        body: "Upload expert reports, case bundles, regulatory filings, and statutory references. Legal integrity mode activates automatically — the Guardian validates case citations against legal databases, checks for overruled or distinguished decisions, and verifies statutory version and jurisdiction scope.",
      },
      {
        title: "The ensemble maps the evidence landscape",
        body: "The Cartographer classifies every legal claim and piece of expert evidence as Settled, Contested, or Unknown within the relevant jurisdiction. The Methodologist assesses whether each expert opinion is supported by the methodology used. Confidence bounds are set before deliberation begins.",
      },
      {
        title: "Opposing counsel’s arguments are run",
        body: "The Contrarian takes the role of opposing counsel — surfacing the strongest version of every objection to your position. Every challenge specifies a resolution condition and a strength grade. Unresolved Strong objections appear verbatim. The session produces the cross-examination your expert needs to prepare for.",
      },
      {
        title: "You receive an auditable evidence record",
        body: "The full session audit trail — SVS verification outcomes, confidence downgrades, objections raised and their resolution status — is exportable. For regulated matters, this is the record that demonstrates due diligence on the evidence base used to support your position.",
      },
    ],
    howConfigLabel: "Legal session · configuration",
    howConfig: [
      { label: "Guardian mode", value: "Legal integrity — case citation verification, overruled/distinguished detection, jurisdiction scope monitoring, statutory version validation" },
      { label: "Document types", value: "Expert reports · Case bundles · Skeleton arguments · Regulatory filings · Statutory instruments · Compliance documentation" },
      { label: "Contrarian focus", value: "Cross-examination lines · methodology challenges · precedent distinctions · threshold of proof vulnerabilities · jurisdiction applicability" },
      { label: "Output package", value: "Evidence-anchored finding · confidence grade per claim · unresolved objections verbatim · SVS record · exportable audit trail" },
      { label: "Session depth", value: "Standard for research and regulatory review · Deep for major litigation with expert review at Phase 1/2 boundary" },
    ],
    whyEyebrow: "Why Augle for law firms",
    whyTitle: ["The review opposing", "counsel will run. First."],
    whyCards: [
      {
        title: "Case citations validated automatically",
        body: "Legal integrity mode checks every case citation against current legal databases — overruled decisions, subsequent distinctions, and jurisdictional inapplicability are flagged before they enter a submission. A precedent that’s been limited by subsequent appellate decisions doesn’t survive SVS. It shouldn’t survive your review either.",
      },
      {
        title: "The strongest cross-examination surfaced before the hearing",
        body: "The Contrarian takes the role of opposing counsel — running the strongest version of every objection at maximum temperature. The objection it doesn’t resolve appears verbatim in your output with a specified resolution condition. That’s the preparation your expert witness needs three weeks before the hearing, not three hours before.",
      },
      {
        title: "A full audit trail for regulated matters",
        body: "Every session produces an exportable record of every SVS verification outcome, every confidence downgrade, and every objection raised and its resolution status. For matters where demonstrating due diligence on the evidence base matters — regulatory investigations, professional liability exposure — this is the record you want to be able to produce.",
      },
    ],
    ctaTitle: ["Run opposing counsel’s", "review before they do."],
    ctaBody: ["Join waitlist and stress-test your next case before it reaches disclosure."],
  },
  {
    slug: "media",
    navLabel: "Media + journalism",
    metaTitle: "AI Fact-Checking Tool for Journalists & Newsrooms | Augle",
    metaDescription:
      "Augle stress-tests sources, statistics, and investigative claims with Guardian's Editorial integrity mode — before publication, not after.",
    eyebrow: "Solutions · Media + journalism",
    heroTitle: {
      lines: ["Published journalism", "is permanent."],
      emphasis: "Corrections aren’t.",
    },
    heroBody:
      "A statistic that doesn’t survive a statistician’s Twitter thread. A source whose conflict of interest wasn’t surfaced. An investigative claim whose primary document has an alternative interpretation the reporter didn’t consider. These are the corrections that define a publication’s credibility. Augle runs the adversarial review before publication — so corrections become optional rather than inevitable.",
    personas: [
      "Investigative reporters stress-testing evidence before publication",
      "Editors reviewing statistical claims and source independence",
      "Science journalists translating research findings for public audiences",
      "Data journalism teams validating analysis before publication",
    ],
    sessionConfigLabel: "Session configuration",
    sessionConfig: [
      { label: "Guardian mode", value: "Editorial integrity" },
      { label: "Depth", value: "Standard · Deep" },
      { label: "Documents", value: "Draft articles · research papers · data analyses · source documents" },
      { label: "SVS checks", value: "Source independence · statistical misrepresentation · primary vs. secondary source · press release vs. peer review" },
      { label: "Output", value: "Finding · confidence grade · unresolved objections · audit trail" },
    ],
    problemTitle: ["The story is right. The statistic in paragraph three isn’t."],
    problemBody:
      "Most journalism corrections are not about the central claim — they’re about a supporting statistic that was misrepresented, a source whose independence wasn’t adequately verified, or a research finding that was drawn from a press release rather than the actual study. These are the errors that don’t change the story but define how the story is remembered. Augle catches them before publication.",
    questionsLabel: "Questions journalism teams run on Augle",
    questions: [
      "Does the statistic in this paragraph accurately represent what the cited study actually found?",
      "Is the research finding we’re reporting from the peer-reviewed paper or the press release, and do they say the same thing?",
      "Does this source have a conflict of interest that isn’t disclosed, and what is the strongest argument against their position?",
      "What is the most credible counter-argument to the central claim in this investigation, and have we addressed it?",
      "Are any of the studies cited in this science story subject to replication failure or retraction?",
    ],
    problemItems: [
      {
        title: "Statistics that misrepresent the underlying study",
        body: "Editorial integrity mode monitors statistical claim accuracy throughout the session. Relative risk presented without an absolute baseline, a correlation stated as causation, a subgroup finding presented as a main effect, or a percentage change calculated from an unrepresentative base — each is identified before it enters the published article. These are the statistics that statisticians correct on social media the morning after publication.",
      },
      {
        title: "Press release findings that diverge from the actual study",
        body: "The Guardian’s SVS distinguishes press releases from peer-reviewed publications and checks the original source against the claim being made. A press release that overstates the study’s findings, omits the sample size limitation, or drops the confidence interval — and that the reporter has relied on without reading the original — is flagged. The paper says something different from the press office.",
      },
      {
        title: "Sources with undisclosed conflicts of interest",
        body: "Editorial integrity mode monitors source independence throughout the deliberation. A quoted expert who has received funding from an industry the story concerns, a think tank whose positions are funded by a party with a direct interest in the story’s framing, or a ‘independent’ report that was commissioned by the subject of the investigation — these are flagged for editorial consideration before publication.",
      },
      {
        title: "The strongest counter-argument you haven’t addressed",
        body: "The Contrarian takes the role of the most credible critic of your story’s central claim — surfacing the alternative explanation for the evidence, the methodological objection to the central thesis, the data that cuts against the narrative. A story that has been tested against its strongest counter-argument, and has an answer for it, is a story that holds up. One that hasn’t been tested doesn’t know whether it holds.",
      },
    ],
    useCasesTitle: ["Three sessions.", "Three journalism moments."],
    useCasesBody:
      "Each scenario illustrates realistic deliberation behaviour across investigative journalism, science reporting, and data journalism.",
    useCases: [
      {
        numLabel: "Use case 01 of 03 · Media + journalism",
        name: "The Investigative Pre-Publication Review",
        persona: "Senior Investigative Reporter · National newspaper · Pre-publication legal and editorial review",
        badge: "Standard depth · document ingestion",
        badgeVariant: "standard",
        question:
          "Does the evidence in this investigation into a major housebuilder’s planning application practices support the central claim, and what is the strongest counter-argument the subject’s legal team will advance?",
        highlights: [
          {
            agent: "Cartographer",
            text: "Settled: the planning application approval rate at the three local authorities is statistically anomalous. Contested: whether the anomaly is explained by the housebuilder’s site selection strategy — they may systematically select sites with pre-existing planning support. Unknown: whether comparable housebuilders operating on equivalent sites have materially different approval rates.",
          },
          {
            agent: "Contrarian",
            text: "Strong objection (Unresolved): \"The subject’s legal team will argue that the anomalous approval rate is a function of site selection, not undue influence — that they choose sites where approval is already likely. Without a controlled comparison to comparable housebuilders on comparable sites, the statistical anomaly is consistent with both the story’s thesis and the alternative explanation. The story currently doesn’t have an answer for this.\"",
          },
          {
            agent: "Methodologist",
            text: "Construct validity: the approval rate comparison uses all planning applications in those local authorities as the baseline. If the housebuilder systematically submits applications for sites with strong pre-existing planning merit, the correct baseline is comparable sites, not all applications. The current methodology doesn’t control for this. Confidence: Contested.",
          },
          {
            agent: "Pragmatist",
            text: "Two options: (1) Obtain comparable approval rates from other major housebuilders in the same LPAs on comparable site types — if the anomaly persists under controlled comparison, the story is stronger. (2) If the comparison can’t be done before deadline, reframe the statistical finding as unexplained anomaly rather than implied influence, and present the alternative explanation in the article. Either is more defensible than the current framing.",
          },
        ],
        outcome: [
          { label: "Finding", value: "Contested — statistical anomaly established but alternative explanation not controlled for" },
          { label: "Key gap", value: "No controlled comparison to comparable housebuilders on comparable sites" },
          { label: "Legal risk", value: "Subject’s legal team has a credible site-selection alternative explanation" },
          { label: "Next step", value: "Obtain comparable data OR reframe as unexplained anomaly with alternative presented" },
        ],
        value:
          "The alternative explanation was the legal team’s entire pre-publication letter. The reporter had considered it but the article didn’t address it directly. A reframed statistical claim with the alternative explanation presented and addressed turned a legally vulnerable story into a defensible one — without changing the central finding.",
      },
      {
        numLabel: "Use case 02 of 03 · Media + journalism",
        name: "The Science Story Review",
        persona: "Science Editor · Weekly magazine · Pre-publication fact check on a clinical research story",
        badge: "Standard depth · document ingestion",
        badgeVariant: "standard",
        question:
          "Does our draft story on a new study linking ultra-processed food consumption to cognitive decline accurately represent what the study actually found, or are we overstating the findings?",
        highlights: [
          {
            agent: "Guardian SVS",
            text: "Primary source check: the draft cites the press release headline (‘Ultra-processed foods linked to 28% higher dementia risk’) and the peer-reviewed paper. The press release figure is a relative risk reduction. The paper’s Abstract states absolute risk: 0.68% vs 0.53% per year. The draft uses the relative figure without the absolute baseline. Editorial integrity mode flags: statistical misrepresentation — press release vs. paper discrepancy.",
          },
          {
            agent: "Methodologist",
            text: "Two additional issues: (1) The study is observational — the draft uses causal language (‘causes’, ‘leads to’) not supported by the study design. (2) The study population is Brazilian adults aged 35–74. The draft’s headline implies general population applicability. The paper’s Discussion explicitly cautions against generalisation to other populations.",
          },
          {
            agent: "Contrarian",
            text: "Moderate objection: \"The lead researcher’s institution receives significant funding from a food industry body that has an interest in the study’s findings being treated as non-generalizable. The story doesn’t mention this. A critical reader will find it. The disclosure should be in the article, even if you assess it doesn’t affect the findings.\"",
          },
        ],
        outcome: [
          { label: "SVS flag", value: "Relative risk cited without absolute baseline — press release vs. paper discrepancy" },
          { label: "Finding", value: "Draft overstates study findings on three dimensions" },
          { label: "Edits needed", value: "Add absolute risk · remove causal language · qualify population scope · disclose funding" },
        ],
        value:
          "The press release was accurate about the relative risk — it just omitted the absolute baseline, the population scope caveat, and the causal language limitation. Four targeted edits turned a story that would have generated a correction from the study’s authors into one they could endorse.",
      },
      {
        numLabel: "Use case 03 of 03 · Media + journalism",
        name: "The Data Journalism Review",
        persona: "Data Journalist · Digital outlet · Pre-publication analysis review on housing affordability",
        badge: "Standard depth · document ingestion",
        badgeVariant: "standard",
        question:
          "Does our analysis showing that housing affordability has deteriorated faster in regional cities than in London hold up to scrutiny, and what is the most likely methodological challenge?",
        highlights: [
          {
            agent: "Methodologist",
            text: "Construct validity issue: the analysis uses median house price to median earnings as the affordability ratio. In regional cities, the denominator includes a higher proportion of part-time and lower-wage earners than in London, where high earners are more concentrated. The ratio may reflect labour market composition differences rather than pure affordability deterioration. This is the methodological challenge a housing economist will raise.",
          },
          {
            agent: "Contrarian",
            text: "Moderate objection: \"The ONS publishes an affordability ratio that uses lower quartile earnings and lower quartile house prices specifically to avoid the labour market composition issue. The analysis uses median-to-median. If the lower quartile ratio shows the same pattern, the finding is robust. If it doesn’t, the choice of denominator is the story’s central vulnerability. This should be checked before publication.\"",
          },
          {
            agent: "Pragmatist",
            text: "Run the same analysis using ONS lower quartile affordability data. If the regional vs London pattern holds, the story’s conclusion is supported by two independent measures and the methodological objection is addressed. If it doesn’t hold, the finding needs to be reframed. Either outcome is better than publishing a median-to-median analysis without knowing whether the ONS measure agrees.",
          },
        ],
        outcome: [
          { label: "Finding", value: "Contested — methodology may conflate affordability with labour market composition" },
          { label: "Key gap", value: "Lower quartile ONS measure not run — this is the standard comparator for the central claim" },
          { label: "Next step", value: "Run ONS lower quartile analysis before publication. If consistent, story is robust. If not, reframe." },
        ],
        value:
          "The ONS lower quartile analysis took two hours. It confirmed the regional vs London pattern — the finding was robust under the more rigorous measure. The story was published with both measures cited, which pre-empted the methodological objection and made the analysis stronger, not weaker. The alternative was publishing a median-to-median analysis and receiving a correction request from a housing economist.",
      },
    ],
    howEyebrow: "How Augle works for journalism",
    howTitle: ["The adversarial reader’s", "review. Before publication."],
    howItems: [
      {
        title: "Submit your draft and source materials",
        body: "Upload the draft article, supporting research papers, data analyses, and source documents. Editorial integrity mode activates — the Guardian checks source independence, distinguishes press releases from peer-reviewed papers, monitors statistical claim accuracy, and flags original source vs. secondary report discrepancies before any agent receives the evidence.",
      },
      {
        title: "The ensemble maps what’s established",
        body: "The Cartographer classifies every claim as Settled, Contested, or Unknown based on the available evidence. The Methodologist evaluates whether the evidence supports the conclusions drawn — whether causal language is justified by the study design, whether the population scope applies to the story’s framing, whether statistical representations are accurate relative to the original source.",
      },
      {
        title: "The adversarial reader’s objections are run",
        body: "The Contrarian takes the role of the story’s most credible critic — a subject’s legal team, a statistician on social media, a rival journalist, or a hostile expert. Every objection specifies a resolution condition. Unresolved Strong objections appear verbatim. These become the pre-publication edit list, not the post-publication correction notice.",
      },
      {
        title: "You receive a confidence-graded evidence record",
        body: "The Synthesizer produces a finding anchored to the evidence — not the story’s thesis. Confidence grades per claim, unresolved objections verbatim, and reopen conditions. The audit trail is exportable — for legal pre-publication review, editorial governance, or the public interest defence records that regulated journalism requires.",
      },
    ],
    howConfigLabel: "Journalism session · configuration",
    howConfig: [
      { label: "Guardian mode", value: "Editorial integrity — source independence monitoring, statistical misrepresentation detection, original vs. secondary source distinction, press release vs. peer review classification" },
      { label: "Document types", value: "Draft articles · Research papers · Press releases · Data analyses · Source documents · Leaked materials · Expert reports" },
      { label: "Contrarian focus", value: "Legal team counter-arguments · statistical objections · alternative explanations · source independence challenges · methodological weaknesses" },
      { label: "Output package", value: "Confidence grade per claim · unresolved objections verbatim · SVS record · exportable audit trail for legal and editorial governance" },
      { label: "Session depth", value: "Standard for features and science stories · Deep for major investigations with expert review at Phase 1/2 boundary" },
    ],
    whyEyebrow: "Why Augle for journalism",
    whyTitle: ["Corrections become optional.", "Not inevitable."],
    whyCards: [
      {
        title: "Catches statistical errors before publication",
        body: "Editorial integrity mode monitors every statistical claim against the original source — relative risk without absolute baseline, correlation framed as causation, subgroup findings presented as primary results, percentage changes from unrepresentative bases. These are the errors that generate corrections from academic statisticians within 24 hours of publication. Catching them before publication is the entire value.",
      },
      {
        title: "Runs the strongest counter-argument before publication",
        body: "The Contrarian surfaces the most credible objection to your story’s central claim — the alternative explanation a legal team will advance, the methodological objection a rival journalist will raise, the conflict of interest a reader will find. Unresolved objections appear verbatim with resolution conditions. A story that has been tested against its strongest counter-argument is a story that holds up under scrutiny.",
      },
      {
        title: "Produces an auditable evidence record",
        body: "Every session produces an exportable record — SVS verification outcomes, confidence grades per claim, every objection raised and its resolution status. For regulated journalism, high-stakes investigations, and pre-publication legal review, this record demonstrates that the evidence base was reviewed to the standard that the story’s claims require. It’s also the record that matters if a correction is later disputed.",
      },
    ],
    ctaTitle: ["Publish stories that hold.", "Not ones that correct."],
    ctaBody: ["Join the waitlist and run a session on your next investigation before it goes to publication."],
  },
  {
    slug: "policy",
    navLabel: "Policy + lawmakers",
    metaTitle: "AI Legislative Evidence & Cost-Benefit Review Tool | Augle",
    metaDescription:
      "Augle stress-tests cost-benefit methodology, regulatory impact assessments, and legislative evidence before it reaches the public record.",
    eyebrow: "Solutions · Policy + lawmakers",
    heroTitle: {
      lines: ["The evidence behind", "every policy decision"],
      emphasisPrefix: "deserves ",
      emphasis: "this scrutiny.",
    },
    heroBody:
      "Policy is made on evidence that is contested, incomplete, or misrepresented — and the consequences of getting it wrong are public. Augle runs the adversarial review that a well-resourced opposition will run anyway, before the decision is made rather than after.",
    personas: [
      "Policy analysts reviewing legislative evidence bases",
      "Parliamentary researchers preparing briefings",
      "Regulatory teams assessing impact methodology",
      "Think tank researchers producing policy recommendations",
    ],
    sessionConfigLabel: "Session configuration",
    sessionConfig: [
      { label: "Guardian mode", value: "Academic + Legal" },
      { label: "Depth", value: "Standard · Deep" },
      { label: "Document ingestion", value: "Bills · RIAs · Studies · Briefings" },
      { label: "SVS checks", value: "Retraction DB · statutory version · jurisdiction scope" },
      { label: "Output", value: "Evidence-anchored finding · confidence grade · dissent flags · audit trail" },
    ],
    problemTitle: ["Policy evidence gets challenged at the worst possible moment."],
    problemBody:
      "A regulatory impact assessment that looks solid under friendly review will look very different under opposition scrutiny. The discount rate in a 30-year infrastructure model. The replication status of the behavioural study your intervention depends on. The jurisdiction scope of the precedent your legal team cited. These things get found — the question is whether you find them first.",
    questionsLabel: "Questions policy teams run on Augle",
    questions: [
      "Does this cost-benefit methodology adequately account for long-run climate-adjusted risk?",
      "Which claims in this regulatory impact assessment are most exposed to opposition challenge?",
      "Is the evidence base for this behavioural intervention replicable at the proposed scale?",
      "Does the cited precedent apply to the jurisdiction and statutory context we're relying on?",
      "What is the strongest argument against our proposed discount rate, and how do we address it?",
    ],
    problemItems: [
      {
        title: "Cost-benefit methodologies that don't survive scrutiny",
        body: "The Methodologist evaluates construct validity across the entire evidence base — whether the methodology actually measures what the policy claims it measures. Standard CBA frameworks systematically undervalue tail risk over long time horizons. Augle surfaces that before the Treasury Select Committee does.",
      },
      {
        title: "Behavioural evidence that doesn't replicate at scale",
        body: "Many policy interventions are based on behavioural research conducted under controlled conditions with non-representative populations. The Contrarian identifies the generalisability objection — whether the effect size holds at population scale and in the real-world context the policy targets.",
      },
      {
        title: "Legal citations with jurisdiction or version problems",
        body: "The Guardian's SVS validates statutory citations against current version and jurisdiction scope. Overruled decisions, superseded statutes, and cross-jurisdiction misapplications are flagged at Moderate severity — automatically, before they enter a briefing or a bill.",
      },
      {
        title: "The objection your opponents have already found",
        body: "The Contrarian runs at maximum temperature to surface the adversarial framing an opposition researcher, a critical journalist, or a hostile expert witness will deploy. Unresolved Strong objections appear verbatim in the output — not softened, not summarised.",
      },
    ],
    useCasesTitle: ["Three sessions.", "Three policy moments."],
    useCasesBody:
      "Each scenario below illustrates realistic deliberation behaviour across the policy research and legislative lifecycle.",
    useCases: [
      {
        numLabel: "Use case 01 of 03 · Policy + lawmakers",
        name: "The Infrastructure Bill Review",
        persona: "Senior Policy Analyst, Treasury · Pre-committee scrutiny",
        badge: "Standard depth · document ingestion",
        badgeVariant: "standard",
        question:
          "Does the proposed infrastructure bill's cost-benefit methodology adequately account for climate-adjusted risk over a 30-year horizon?",
        highlights: [
          {
            agent: "Cartographer",
            text: "Settled: standard CBA frameworks systematically undervalue tail risk. Contested: the appropriate discount rate for climate-adjusted infrastructure over 20+ year horizons. Unknown: no published methodology for integrating physical climate risk into UK Green Book appraisal at this scale.",
          },
          {
            agent: "Methodologist",
            text: "Construct validity issue: the bill's 3.5% discount rate follows HM Treasury guidance but the IPCC AR6 evidence base supports a materially lower rate for long-horizon climate risk. Evidence ceiling set at Probable for 20+ year projections.",
          },
          {
            agent: "Contrarian",
            text: "Strong objection (Unresolved): \"The methodology is defensible for 10-year projections but materially inadequate for 30-year claims. The Treasury committee will have the Stern Review rebuttal ready. The team does not.\"",
          },
          {
            agent: "Pragmatist",
            text: "Prepare a two-page annex defending the discount rate choice with explicit reference to AR6. Alternatively, scope the 30-year projections with a stated sensitivity range. Either closes the committee's most predictable line of attack.",
          },
        ],
        outcome: [
          { label: "Finding", value: "Probable for near-term projections · Contested for 20+ year claims" },
          { label: "Key objection", value: "Discount rate inadequate for long-horizon climate-adjusted infrastructure" },
          { label: "SVS", value: "All citations verified. Green Book version current." },
          { label: "Next step", value: "Discount rate annex or explicit sensitivity range on 30-year figures" },
        ],
        value:
          "The team knew the discount rate was a potential weakness. They didn't know the committee had already briefed a Stern Review expert. They found that out from Augle — before the session, not during it.",
      },
      {
        numLabel: "Use case 02 of 03 · Policy + lawmakers",
        name: "The Behavioural Intervention Assessment",
        persona: "Regulatory Impact Analyst · Department for Health and Social Care",
        badge: "Deep depth · expert review",
        badgeVariant: "deep",
        question:
          "Is the behavioural evidence base for the proposed sugar levy sufficient to support the projected public health outcomes at national scale?",
        highlights: [
          {
            agent: "Cartographer",
            text: "Settled: fiscal interventions reduce consumption in study populations. Contested: effect size at national scale across all socioeconomic groups. Unknown: long-run substitution behaviour and reformulation effects beyond the first two years.",
          },
          {
            agent: "Methodologist",
            text: "External validity problem: primary evidence draws from Chilean and Mexican studies. UK population distribution, retail structure, and price elasticity assumptions diverge materially. Ceiling set at Probable for primary consumption effect, Contested for health outcome projections.",
          },
          {
            agent: "Contrarian",
            text: "Moderate objection: \"The RIA uses the Mexican elasticity figure without adjustment for UK income distribution. The effect is systematically higher in lower-income deciles — which is presented as a benefit but generates a regressive distributional impact that isn't modelled.\"",
          },
        ],
        outcome: [
          { label: "Finding", value: "Probable for primary consumption effect · Contested for health outcome projections" },
          { label: "Key gap", value: "Distributional impact not modelled — regressive effect in lower-income deciles" },
          { label: "Next step", value: "Commission distributional analysis before RIA submission. Add regressivity section." },
        ],
        value:
          "The distributional objection wasn't in the RIA. It would have been in the Health Select Committee's written evidence within 48 hours of publication. Three weeks of additional modelling prevented a headline they couldn't walk back.",
      },
      {
        numLabel: "Use case 03 of 03 · Policy + lawmakers",
        name: "The Parliamentary Briefing",
        persona: "Parliamentary Researcher · House of Commons Library",
        badge: "Standard depth",
        badgeVariant: "standard",
        question:
          "What does the evidence actually say about the relationship between stop-and-search powers and serious violent crime reduction — and what are the strongest objections to the published findings?",
        highlights: [
          {
            agent: "Cartographer",
            text: "Settled: deterrence effect in the immediate operational area during active deployment. Contested: displacement effect vs. net reduction. Contested: effect persistence after deployment ends. Unknown: whether community trust degradation offsets crime reduction over 5+ year horizons.",
          },
          {
            agent: "Contrarian",
            text: "Strong objection (Unresolved): \"The published studies measure crime displacement, not crime reduction. Net crime in the city-wide area is not measured in any of the primary studies cited. The briefing currently makes a claim the evidence cannot support.\"",
          },
          {
            agent: "Synthesizer",
            text: "The evidence supports a localised deterrence effect during active deployment. It does not support claims about net city-wide crime reduction. These are different claims. The briefing currently conflates them.",
          },
        ],
        outcome: [
          { label: "Finding", value: "Established for localised deterrence · Gap for net city-wide crime reduction" },
          { label: "Unresolved objection", value: "Studies measure displacement, not net reduction — conflated in briefing draft" },
          { label: "Edit needed", value: "Scope claims to localised deterrence. Acknowledge the net reduction gap explicitly." },
        ],
        value:
          "A briefing that conflates localised deterrence with net crime reduction is a briefing that gets corrected in committee — publicly, and by the opposition researcher who already knows the distinction. It got fixed before it was published.",
      },
    ],
    howEyebrow: "How Augle works for policy teams",
    howTitle: ["Built for evidence that", "will face adversarial review."],
    howItems: [
      {
        title: "Upload your documents",
        body: "Submit bills, regulatory impact assessments, policy briefs, research papers, and statutory references. The Guardian's SVS validates citations, checks statutory versions, and confirms jurisdiction scope before any agent receives the evidence.",
      },
      {
        title: "The ensemble maps what's contested",
        body: "The Cartographer classifies every evidence node as Settled, Contested, or Unknown. The Methodologist assesses construct validity — whether the methodology measures what the policy claims. Confidence bounds are set as hard constraints before deliberation begins.",
      },
      {
        title: "Adversarial pressure is applied",
        body: "The Contrarian runs at maximum temperature to surface the objections an opposition researcher, expert witness, or critical journalist would raise. Every objection specifies a resolution condition. Unresolved Strong objections cannot be softened.",
      },
      {
        title: "You receive an auditable finding",
        body: "The Synthesizer produces a calibrated finding anchored to the evidence nodes registry — not the discourse thread. Confidence grades, unresolved objections verbatim, and reopen conditions. The full audit trail is exportable for regulatory compliance or FOI purposes.",
      },
    ],
    howConfigLabel: "Policy session · configuration",
    howConfig: [
      { label: "Guardian mode", value: "Academic + Legal — statutory citation validation, retraction database, jurisdiction scope monitoring" },
      { label: "Document types", value: "Bills · Regulatory Impact Assessments · Research papers · Hansard references · Statutory instruments" },
      { label: "Contrarian focus", value: "Opposition framing · generalisability objections · distributional impact gaps · discount rate challenges" },
      { label: "Output package", value: "Evidence-anchored finding · confidence grade per claim · unresolved objections verbatim · reopen conditions · exportable audit trail" },
      { label: "Session depth", value: "Standard for briefings and evidence reviews · Deep for major legislative packages with expert review at Phase 1/2 boundary" },
    ],
    whyEyebrow: "Why Augle for policy",
    whyTitle: ["The scrutiny that policy", "evidence deserves."],
    whyCards: [
      {
        title: "Finds the objection before the opposition does",
        body: "The Contrarian is designed to surface the adversarial framing that a well-resourced opposition team will deploy. It steelmans every claim before challenging it — which means it finds the strongest version of the objection, not a weak one you can dismiss. If the objection is strong and unresolved, it appears verbatim in your output.",
      },
      {
        title: "Validates every source automatically",
        body: "The Guardian's SVS checks retraction status, statutory version, and jurisdiction scope on every citation. A superseded regulation cited in a briefing, or a retracted study cited in an RIA, is flagged automatically — before it becomes a committee embarrassment or a FOI liability.",
      },
      {
        title: "Produces an auditable evidence record",
        body: "Every session produces a full audit trail — SVS verification outcomes, confidence downgrades, objections raised and resolved, and phase boundary evaluations. For regulated industries and parliamentary accountability, this is the record that demonstrates due diligence on the evidence base that informed a decision.",
      },
    ],
    ctaTitle: ["Find the objection", "before they do."],
    ctaBody: ["Join waitlist and run a session on the evidence behind your next policy decision."],
  },
  {
    slug: "research-labs",
    navLabel: "Research labs",
    metaTitle: "AI Assumption-Testing Tool for Research Labs | Augle",
    metaDescription:
      "Augle stress-tests research programme assumptions, trial design, and landmark findings in Academic integrity mode — before you commit the capital.",
    eyebrow: "Solutions · Research labs",
    heroTitle: {
      lines: ["The assumption", "your programme"],
      emphasis: "depends on.",
    },
    heroBody:
      "Every research programme is built on a stack of assumptions. Most hold. One won't. The question is whether you find it before you've committed three years and $4M of capital to a programme that fails on a premise you never stress-tested. Augle finds it — and tells you precisely what evidence would resolve it.",
    personas: [
      "Principal investigators at Phase I–III decision points",
      "Lab directors commissioning landmark finding audits",
      "Research directors evaluating trial design choices",
      "Drug discovery teams assessing target viability",
      "Programme leads stress-testing foundational literature",
    ],
    sessionConfigLabel: "Session configuration · Research labs",
    sessionConfig: [
      { label: "Guardian", value: "Academic integrity" },
      { label: "SVS checks", value: "Retraction DB · erratum tracking · preprint flag" },
      { label: "Documents", value: "Literature summaries · trial briefs · programme memos" },
      { label: "Depth", value: "Standard or Deep" },
      { label: "Output", value: "Critical assumption identification · evidence-anchored finding · resolution pathway" },
    ],
    problemTitle: ["High-stakes decisions", "built on literature", "you haven't audited."],
    problemBody:
      "Research programme decisions happen fast. Literature summaries are compiled by team members with domain expertise but limited adversarial instinct. Errata go uncited. Foundational papers accumulate credibility without replication. By the time a programme fails, the assumption that killed it was visible in the evidence base from the start.",
    questionsLabel: "Questions research labs run on Augle",
    questions: [
      "Does the published evidence support this target's viability, or are we building on a single unreplicated finding?",
      "Which trial design is better supported for this indication — adaptive platform or randomised controlled?",
      "Does the landmark finding we're building this programme on have adequate replication and methodological integrity?",
      "Are any of our foundational citations affected by errata, retractions, or effect size corrections?",
      "What is the specific data gap that, if unresolved, makes this programme's core hypothesis fail?",
    ],
    problemItems: [
      {
        title: "The erratum that changed the evidence weight",
        body: "The Guardian's SVS tracks published errata across cited papers. A 2017 meta-analysis treated as confirmatory with a 31% reduction in pooled effect size after erratum — uncited in the team's literature summary — can rewrite the evidence weight assessment for every node that depended on it.",
      },
      {
        title: "Design decisions built on inapplicable precedents",
        body: "The Contrarian checks whether cited precedents actually apply to your specific context. Adaptive platform trials that demonstrated efficiency gains in characterised biomarker landscapes don't automatically support the same design in an uncharacterised one — and the Contrarian will say so, specifically.",
      },
      {
        title: "The assumption your programme can't survive without",
        body: "The Methodologist traces which evidence nodes are load-bearing — which ones, if they fail, take the programme with them. The output names that assumption explicitly, specifies what data would resolve it, and estimates whether resolving it is feasible within your timeline and budget.",
      },
      {
        title: "Literature reviewed by people who want the programme to succeed",
        body: "Team members reviewing their own programme's foundational literature have a structural conflict of interest. The Contrarian has none. It is architecturally required to steelman every claim before challenging it — which means it produces the strongest possible case for your programme before finding the objection that case doesn't fully answer.",
      },
    ],
    useCasesTitle: ["Three sessions.", "Three decision points."],
    useCasesBody:
      "Each scenario is drawn from the Augle Use Case Compendium — hypothetical sessions illustrating realistic deliberation behaviour across the research lab lifecycle.",
    useCases: [
      {
        numLabel: "Use case 01 of 03 · Research labs",
        name: "The New Drug Target Assessment",
        persona: "Research Director, Oncology · Pre-programme go/no-go decision",
        badge: "Standard depth",
        badgeVariant: "standard",
        question:
          "Is the published evidence for this oncology target sufficient to justify committing to a three-year, $4M research programme, or are there foundational assumptions that require resolution first?",
        highlights: [
          {
            agent: "Cartographer",
            text: "Settled: target is expressed in the relevant tumour type. Contested: whether expression level correlates with functional dependency — one study shows correlation, two show no significant relationship. Unknown: human orthologue binding data for the proposed inhibitor class.",
          },
          {
            agent: "Methodologist",
            text: "The correlation study uses a mouse model with a known metabolic difference from the human orthologue. External validity concern: the correlation may not transfer. This is the load-bearing assumption.",
          },
          {
            agent: "Contrarian",
            text: "Strong objection: \"This is where the programme fails if it fails. A single binding assay in the human orthologue resolves the highest-risk assumption at minimal cost before full commitment.\"",
          },
          {
            agent: "Pragmatist",
            text: "Two paths: (1) 6–8 week translation checkpoint with a targeted binding assay before full programme commitment. (2) Proceed with embedded checkpoint at 6-month milestone. Path 1 resolves the critical assumption cheaply.",
          },
        ],
        outcome: [
          { label: "Finding", value: "Contested — critical assumption unresolved. Not a no-go, but not an unconditional go." },
          { label: "Key risk", value: "Human orthologue binding — single cheap assay resolves it" },
          { label: "Resolution", value: "6–8 week checkpoint before full capital commitment" },
          { label: "SVS", value: "One cited comparable is a conference abstract — cannot be treated as primary evidence" },
        ],
        value:
          "The lab director didn't get a yes or no. She got the specific assumption the programme depends on and a decision structure that resolves it cheaply before full sunk cost accumulates.",
      },
      {
        numLabel: "Use case 02 of 03 · Research labs",
        name: "The Clinical Trial Design Decision",
        persona: "Principal Investigator, Oncology · Phase II design review",
        badge: "Standard depth · document ingestion",
        badgeVariant: "standard",
        question:
          "For a combination immunotherapy Phase II trial in this indication, which trial design — randomised controlled or adaptive platform — is better supported by the available methodological and clinical evidence?",
        highlights: [
          {
            agent: "Cartographer",
            text: "Settled: adaptive platform designs have demonstrated efficiency gains in heterogeneous tumour populations. Contested: whether gains hold in combination therapy with uncharacterised interaction effects. Unknown: specific biomarker landscape for this indication at population level.",
          },
          {
            agent: "Methodologist",
            text: "Internal validity concern: adaptive design interim decision rules require a 12-week biomarker signal. Published response kinetics for this drug class show high variability through week 16 — the interim may fire on noise. RCT does not have this dependency.",
          },
          {
            agent: "Contrarian",
            text: "Strong objection: \"The three cited precedent trials all had pre-characterised biomarker landscapes from Phase I data. This trial does not. Adaptive design efficiency gains are contingent on biomarker reliability — in an uncharacterised landscape, adaptive design adds complexity without the efficiency benefit.\"",
          },
          {
            agent: "Synthesizer",
            text: "Adaptive design: Probable in principle, Contested for this specific trial. The Contrarian objection is specific to this trial's data requirements — not resolved by general adaptive design evidence.",
          },
        ],
        outcome: [
          { label: "Finding", value: "Adaptive: Probable in principle, Contested here. RCT: lower ceiling but no biomarker dependency." },
          { label: "Decision driver", value: "Efficiency advantage is conditional on reliable 12-week biomarker signal — currently absent" },
          { label: "Paths", value: "(1) Biomarker study first (+4–6 months). (2) RCT with embedded biomarker substudy for Phase III." },
        ],
        value:
          "The PI was leaning toward the adaptive design based on general literature. The ensemble surfaced the specific data dependency that makes the adaptive design's efficiency advantage unavailable in this trial — a finding that changes the protocol decision without requiring new experiments.",
      },
      {
        numLabel: "Use case 03 of 03 · Research labs",
        name: "The Landmark Finding Audit",
        persona: "Lab Director, Cognitive Neuroscience · Pre-programme literature review",
        badge: "Deep · full 3-round ensemble",
        badgeVariant: "deep",
        question:
          "Does the 2016 default mode network prospective memory finding have sufficient replication and methodological integrity to serve as a foundational assumption for a new multi-year research programme?",
        highlights: [
          {
            agent: "Guardian SVS",
            text: "Critical flag: a 2017 meta-analysis the team treats as confirmatory has a published erratum reducing the pooled effect size by 31%. The erratum is not cited in the team's summary. Corrected data changes evidence weight for two dependent nodes.",
          },
          {
            agent: "Cartographer",
            text: "With corrected meta-analysis: Settled: original activation pattern is replicable. Contested: whether the prospective memory specificity claim holds — the erratum shifts the evidence toward a more general attention effect.",
          },
          {
            agent: "Contrarian",
            text: "Strong objection: \"The prospective memory specificity claim — the finding this programme depends on — rests on the uncorrected effect size. The corrected meta-analysis cannot support specificity at the level the original paper claimed.\"",
          },
          {
            agent: "Synthesizer",
            text: "General DMN involvement in prospective memory: Probable. Specificity claim as foundational programme assumption: Contested. The programme can proceed on the general finding but not the specificity claim.",
          },
        ],
        outcome: [
          { label: "SVS flag", value: "Uncited erratum — 31% effect size reduction in key meta-analysis" },
          { label: "Finding", value: "General DMN involvement: Probable. Specificity claim: Contested." },
          { label: "Programme", value: "Reframe around general DMN involvement. Specificity requires new data before becoming a programme assumption." },
        ],
        value:
          "The team's literature summary cited the 2017 meta-analysis as confirmatory without the erratum. Augle's SVS caught it. The corrected effect size changes what the programme can assume — catching this before programme launch avoids building three years of work on a specificity claim the corrected evidence doesn't support.",
      },
    ],
    howEyebrow: "How Augle works for research labs",
    howTitle: ["Adversarial review before", "the capital is committed."],
    howItems: [
      {
        title: "Upload your literature summary or programme brief",
        body: "Submit the question alongside your team's literature summary, trial design brief, or programme memo. The Guardian immediately begins SVS authentication across every cited source — checking for retractions, errata, and preprint status before deliberation begins.",
      },
      {
        title: "The Methodologist identifies load-bearing assumptions",
        body: "Across all three deliberation phases, the Methodologist evaluates which evidence nodes are critical dependencies — the assumptions whose failure takes the programme with them. Each gets a confidence grade and an explicit statement of what would change it.",
      },
      {
        title: "The Contrarian challenges applicability, not just existence",
        body: "It's not enough that a precedent exists — it has to apply to your specific context. The Contrarian actively tests whether cited studies' populations, designs, and biomarker landscapes match your trial's requirements. Inapplicable precedents are called out specifically.",
      },
      {
        title: "The output tells you what to do next, not just what's wrong",
        body: "The Pragmatist translates the finding into a concrete decision structure — including the specific experiment, checkpoint, or data collection that would resolve the critical assumption at minimum cost and time before full programme commitment.",
      },
    ],
    howConfigLabel: "Research lab configuration · Guardian SVS",
    howConfig: [
      { label: "Erratum tracking", value: "Published errata cross-referenced against cited papers — effect size corrections and scope limitations flagged and reflected in evidence node confidence grades" },
      { label: "Retraction check", value: "Every citation verified against Retraction Watch and publisher retraction databases before entering the evidence nodes registry — retracted papers blocked from deliberation" },
      { label: "Conference abstracts", value: "Non-peer-reviewed conference abstracts flagged SVS_UNVERIFIED — evidence node capped at Probable, cannot serve as primary evidence for load-bearing programme assumptions" },
      { label: "Applicability check", value: "Contrarian evaluates whether cited precedents' populations, designs, and conditions match your specific research context — not just whether they exist" },
      { label: "Document ingestion", value: "Literature summaries and programme briefs ingested as evidence — all citations within submitted documents authenticated via SVS before entering evidence nodes registry" },
      { label: "Audit trail", value: "Full session record including SVS verification log, erratum flags, objection register, and Pragmatist resolution pathway — exportable for programme documentation" },
    ],
    whyEyebrow: "Why Augle for research labs",
    whyTitle: ["What you can't get", "from internal review."],
    whyCards: [
      {
        title: "SVS catches what literature review misses",
        body: "Errata, retractions, and effect size corrections don't always propagate through the literature. The Guardian's Source Verification Service cross-references every cited paper against retraction databases and published errata — before the deliberation begins, not after you've built a programme on the finding.",
      },
      {
        title: "It names the specific assumption, not general uncertainty",
        body: "The Methodologist doesn't produce a risk register of things that could go wrong. It identifies the single load-bearing assumption — the one whose failure takes the programme with it — and provides the specific evidence that would resolve it. General uncertainty acknowledgments are not permitted outputs.",
      },
      {
        title: "The Contrarian has no stake in your programme succeeding",
        body: "Internal review is conducted by people who want the programme to succeed. The Contrarian is architecturally required to steelman every claim before challenging it — producing the strongest possible case for your hypothesis and then finding the objection that case doesn't fully answer. That's a structurally different process.",
      },
      {
        title: "Precedent applicability, not just precedent existence",
        body: "A cited precedent only supports your decision if it actually applies to your context. The Contrarian evaluates whether each precedent's population, design, biomarker landscape, and conditions match your specific research question. Citing an adaptive trial that succeeded in a characterised landscape doesn't support the same design in an uncharacterised one.",
      },
      {
        title: "A decision structure, not just a finding",
        body: "The Pragmatist produces a concrete resolution pathway — the specific checkpoint, assay, or substudy that resolves the critical assumption at minimum cost before full programme commitment. You don't just learn what's uncertain. You learn what to do about it, in what order, and at what cost.",
      },
      {
        title: "$0.60 against a $4M commitment",
        body: "A Standard deliberation costs $0.60. A three-year research programme costs millions. The economics of running an adversarial review before committing to a programme — or before locking a trial design — are straightforward. The question isn't whether you can afford to run Augle. It's whether you can afford not to.",
      },
    ],
    ctaTitle: ["Find the assumption", "before it finds you."],
    ctaBody: ["Join the waitlist and get one Standard session free.", "Run it on a programme decision that's live right now."],
  },
  {
    slug: "think-tanks",
    navLabel: "Think tanks + nonprofits",
    metaTitle: "AI Policy Research & Advocacy Evidence Review | Augle",
    metaDescription:
      "Augle stress-tests policy recommendations, evidence bases, and advocacy positions before a rival institution or hostile commentator does.",
    eyebrow: "Solutions · Think tanks + nonprofits",
    heroTitle: {
      lines: ["Research that shapes", "public debate needs"],
      emphasis: "this standard.",
    },
    heroBody:
      "Think tank publications and advocacy positions enter the public record and stay there. A methodology weakness that a hostile commentator finds, a statistic that doesn’t survive scrutiny from a rival institution, or a policy recommendation whose evidence base has been superseded — these become the story. Augle runs the adversarial review before publication, not after.",
    personas: [
      "Research directors reviewing pre-publication policy papers",
      "Advocacy teams stress-testing campaign evidence bases",
      "Communications leads preparing for hostile media questions",
      "Programme officers evaluating grant-funded research claims",
    ],
    sessionConfigLabel: "Session configuration",
    sessionConfig: [
      { label: "Guardian mode", value: "Academic + Editorial" },
      { label: "Depth", value: "Standard · Deep" },
      { label: "Documents", value: "Policy papers · research reports · briefings" },
      { label: "SVS checks", value: "Retraction DB · source independence · preprint status · statistical claims" },
      { label: "Output", value: "Finding · confidence grade · unresolved objections · audit trail" },
    ],
    problemTitle: ["Published research is permanent. Corrections aren’t."],
    problemBody:
      "A think tank’s credibility is its only asset. A policy paper that makes a statistical claim a hostile statistician can dismantle in a tweet, or an advocacy position whose primary study has been superseded, damages that credibility in ways a correction doesn’t repair. The standard for publication should be higher than the standard for friendly peer review. Augle applies the adversarial standard before you publish.",
    questionsLabel: "Questions think tanks run on Augle",
    questions: [
      "What is the strongest methodological objection to our headline claim, and can we defend against it?",
      "Are any of the studies our recommendation depends on retracted, superseded, or subject to replication failure?",
      "What will a hostile commentator at a rival institution say about this paper within 48 hours of publication?",
      "Does our statistical framing accurately represent what the cited study actually found?",
      "Which of our policy recommendations have the weakest evidence base and need the most caveating?",
    ],
    problemItems: [
      {
        title: "Statistical claims that don’t survive hostile scrutiny",
        body: "The Methodologist evaluates every statistical claim against the study design that generated it — whether the effect size is appropriately qualified, whether relative risk is being presented without the absolute baseline, whether a correlation is being presented as causal. These are the objections that become quote-tweets within 48 hours of publication.",
      },
      {
        title: "Primary studies that have been retracted or superseded",
        body: "The Guardian’s SVS checks every citation against retraction databases and assesses replication status. A policy recommendation that depends on a study with known replication failures, or a statistic drawn from a retracted paper, is flagged before it enters the published record — not discovered by an opponent after publication.",
      },
      {
        title: "Advocacy positions with asymmetric evidence",
        body: "The Contrarian evaluates the full evidence landscape, not just the evidence the paper cites. A position paper that presents a contested claim as settled, or that cites studies selectively while ignoring materially relevant contrary evidence, will not survive a well-resourced critic. Augle surfaces both sides before publication.",
      },
      {
        title: "Recommendations whose generalisability doesn’t hold",
        body: "The Methodologist evaluates external validity — whether the evidence base for a recommendation applies to the population, context, and scale the recommendation targets. A policy drawn from a randomised trial in a different country, or a programme evaluation with a non-representative sample, requires explicit qualification.",
      },
    ],
    useCasesTitle: ["Three sessions.", "Three publication moments."],
    useCasesBody:
      "Each scenario illustrates realistic deliberation behaviour across policy publication, advocacy preparation, and research quality review.",
    useCases: [
      {
        numLabel: "Use case 01 of 03 · Think tanks + nonprofits",
        name: "The Pre-Publication Review",
        persona: "Research Director · Health policy think tank · Pre-launch paper review",
        badge: "Standard depth · document ingestion",
        badgeVariant: "standard",
        question:
          "Does our paper’s headline claim — that universal free school meals reduce childhood obesity rates by 18% — survive methodological scrutiny, and what will critics say?",
        highlights: [
          {
            agent: "Guardian SVS",
            text: "28 citations verified. One primary study — the source of the 18% figure — is a preprint that has not completed peer review. Flagged SVS_UNVERIFIED. Evidence node capped at Probable. The paper presents the figure without this qualification.",
          },
          {
            agent: "Methodologist",
            text: "External validity problem: the primary study was conducted in a Danish municipality with universal baseline nutrition education. The UK context the paper targets has no equivalent baseline. The effect size is not directly transferable without adjustment. Confidence ceiling: Contested for UK-specific claims.",
          },
          {
            agent: "Contrarian",
            text: "Strong objection (Unresolved): \"The 18% figure is from a preprint, presented as established fact, derived from a context with materially different baseline conditions. A hostile commentator with basic methodological knowledge will identify all three problems in the abstract. This will be the story, not the recommendation.\"",
          },
          {
            agent: "Pragmatist",
            text: "(1) Add preprint qualification to the 18% citation. (2) Qualify the UK generalisability claim explicitly. (3) Present a range based on studies with stronger external validity. Three edits prevent the paper from being reduced to a methodology critique rather than a policy contribution.",
          },
        ],
        outcome: [
          { label: "SVS flag", value: "Primary source is unreviewed preprint — presented as established fact" },
          { label: "Finding", value: "Contested for UK-specific obesity reduction claims" },
          { label: "Key objection", value: "Context mismatch — Danish baseline nutrition conditions not present in UK target context" },
          { label: "Edits needed", value: "Preprint qualification + UK generalisability caveat + effect size range" },
        ],
        value:
          "The paper was two days from publication. The preprint status of the primary source hadn’t been flagged in internal review. Three targeted edits moved the paper from methodologically vulnerable to defensible — and kept the policy recommendation, which was sound, from being buried under a methodology story.",
      },
      {
        numLabel: "Use case 02 of 03 · Think tanks + nonprofits",
        name: "The Advocacy Position Review",
        persona: "Campaign Director · Criminal justice reform nonprofit · Pre-launch advocacy materials",
        badge: "Standard depth",
        badgeVariant: "standard",
        question:
          "Is the evidence base for our campaign’s central claim — that community supervision is more effective than incarceration at reducing reoffending — strong enough to withstand a hostile media cycle?",
        highlights: [
          {
            agent: "Cartographer",
            text: "Settled: community supervision outperforms incarceration on reoffending in low-to-medium risk offender populations in controlled studies. Contested: whether this effect holds for high-risk offenders and violent offence categories. Unknown: long-run community safety outcomes beyond 5-year follow-up windows.",
          },
          {
            agent: "Methodologist",
            text: "Scope problem: the campaign materials present the finding as universal. The primary evidence base is limited to low-to-medium risk, non-violent offender populations. Extending the claim to all offender categories — which the campaign materials do implicitly — is not supported. Confidence ceiling for universal claim: Contested.",
          },
          {
            agent: "Contrarian",
            text: "Moderate objection: \"A journalist covering a high-profile violent reoffending case will immediately ask whether community supervision applies to violent offenders. The campaign has no answer because the materials don’t scope the claim. This is a predictable and entirely avoidable vulnerability.\"",
          },
        ],
        outcome: [
          { label: "Finding", value: "Established for low-to-medium risk non-violent populations · Gap for high-risk and violent categories" },
          { label: "Key vulnerability", value: "Universal claim not scoped — exposes campaign to predictable hostile question" },
          { label: "Next step", value: "Scope the claim explicitly in all materials. Prepare a one-page FAQ for the violent offender question." },
        ],
        value:
          "The campaign’s evidence base was strong — for the population the research actually covered. The materials had silently extended it to all offenders. One scoping edit and a prepared FAQ for the predictable hostile question turned a vulnerability into a demonstration of research rigour.",
      },
      {
        numLabel: "Use case 03 of 03 · Think tanks + nonprofits",
        name: "The Grant Research Evaluation",
        persona: "Programme Officer · Foundation · Evaluating grantee research claims pre-funding",
        badge: "Deep depth · document ingestion",
        badgeVariant: "deep",
        question:
          "Does the evidence base cited in this grant application support the causal claims the applicant makes about their programme’s impact on educational attainment?",
        highlights: [
          {
            agent: "Cartographer",
            text: "Settled: structured mentoring programmes improve attendance and engagement in the cited studies. Contested: whether attendance improvements translate to attainment gains at the scale proposed. Unknown: whether the effect holds in the specific demographic and geographic context the applicant targets.",
          },
          {
            agent: "Guardian SVS",
            text: "All 14 citations verified. One study cited in the impact section was published in a journal that has since been flagged for peer review concerns by the Committee on Publication Ethics. Flagged SVS_UNVERIFIED. Evidence node downgraded.",
          },
          {
            agent: "Contrarian",
            text: "Strong objection (Unresolved): \"The application presents attendance improvement as a causal pathway to attainment. The cited studies establish correlation, not causation. The causal mechanism is asserted, not evidenced. This is the gap a rigorous external evaluator will find.\"",
          },
        ],
        outcome: [
          { label: "Finding", value: "Probable for attendance effect · Contested for causal attainment claim" },
          { label: "SVS flag", value: "One citation from journal flagged by COPE for peer review concerns" },
          { label: "Key gap", value: "Causal mechanism asserted not evidenced — correlation presented as causation" },
          { label: "Decision", value: "Fund conditional on applicant addressing causal mechanism gap with additional evidence or scoped claim" },
        ],
        value:
          "The application was compelling and the programme was promising. The causal claim overreach and the journal integrity flag were not visible in a standard desk review. A conditional grant with a scoped claim requirement protected the foundation’s evaluation record — and gave the applicant a clear path to funding.",
      },
    ],
    howEyebrow: "How Augle works for think tanks",
    howTitle: ["The adversarial review", "before publication."],
    howItems: [
      {
        title: "Submit your research materials",
        body: "Upload policy papers, research reports, briefings, and supporting studies. Academic and editorial integrity modes activate — the Guardian checks retraction status, preprint and peer review classification, source independence, and statistical claim validity before any agent receives the evidence.",
      },
      {
        title: "The ensemble maps what’s settled and what’s contested",
        body: "The Cartographer classifies every claim as Settled, Contested, or Unknown. The Methodologist assesses whether the evidence supports the conclusions drawn — effect size qualification, external validity, causal inference. Confidence bounds are set before deliberation begins, not after.",
      },
      {
        title: "The hostile critic’s objections are run",
        body: "The Contrarian takes the role of a well-resourced critic at a rival institution or a hostile journalist — surfacing the strongest version of every objection. Every challenge specifies a resolution condition. Unresolved Strong objections appear verbatim with a resolution condition. These become the pre-publication edit list.",
      },
      {
        title: "You receive a defensible publication",
        body: "The Synthesizer produces a finding anchored to the evidence base — not the position the paper argues. Confidence grades per claim, unresolved objections verbatim, and reopen conditions that specify what new evidence would change the assessment. The paper that emerges is the one that survives hostile scrutiny.",
      },
    ],
    howConfigLabel: "Think tank session · configuration",
    howConfig: [
      { label: "Guardian mode", value: "Academic + Editorial — retraction database, preprint status, peer review classification, source independence, statistical misrepresentation detection" },
      { label: "Document types", value: "Policy papers · Research reports · Briefings · Supporting studies · Grant applications · Advocacy materials" },
      { label: "Contrarian focus", value: "Hostile commentator framing · statistical overreach · causal inference gaps · generalisability limits · selective citation" },
      { label: "Output package", value: "Confidence grade per claim · unresolved objections verbatim · SVS verification record · reopen conditions · exportable audit trail" },
      { label: "Session depth", value: "Standard for policy papers and advocacy materials · Deep for flagship annual reports and major commissioned research" },
    ],
    whyEyebrow: "Why Augle for think tanks",
    whyTitle: ["Credibility is the only", "asset that matters."],
    whyCards: [
      {
        title: "Runs the hostile critic before you publish",
        body: "The Contrarian is calibrated to surface the objection a well-resourced critic at a rival institution, a hostile journalist, or a hostile politician’s advisor will deploy. Unresolved objections appear verbatim with resolution conditions. The paper that goes out is the one that has already survived the worst-case scrutiny scenario.",
      },
      {
        title: "Catches retracted and superseded sources automatically",
        body: "The Guardian’s SVS checks every citation against retraction databases, assesses preprint and peer review status, and flags source independence concerns. A primary study with known replication failures, or a statistic drawn from a retracted paper, doesn’t survive SVS. It shouldn’t survive your review process either.",
      },
      {
        title: "Grades every claim by the evidence that supports it",
        body: "Every claim receives a confidence grade — Established, Probable, Contested, or Gap — based on the evidence base, not the advocacy position. The difference between Probable and Contested is the difference between a paper with appropriate caveats and one that makes claims it can’t defend. Knowing which is which before publication is the entire value.",
      },
    ],
    ctaTitle: ["Publish with confidence.", "Not regret."],
    ctaBody: ["Join the waitlist and run a session on your next policy paper before it goes out."],
  },
  {
    slug: "venture-capital",
    navLabel: "Venture capital + PE",
    metaTitle: "AI Investment Thesis & Market Sizing Review Tool | Augle",
    metaDescription:
      "Augle stress-tests investment theses, market sizing, and competitive moat claims with Guardian's Financial integrity mode — before capital is deployed.",
    eyebrow: "Solutions · Venture capital + PE",
    heroTitle: {
      lines: ["The thesis looks", "stronger than"],
      emphasis: "the evidence does.",
    },
    heroBody:
      "Every investment thesis has a critical assumption that hasn’t been stress-tested. The market size that’s sourced from a single analyst report. The competitive moat claim that doesn’t survive scrutiny of the incumbent’s roadmap. The unit economics that only work at a scale the company hasn’t reached. Augle runs the adversarial review before capital is deployed.",
    personas: [
      "VC partners stress-testing investment theses pre-IC",
      "PE associates conducting diligence on acquisition targets",
      "Growth equity teams evaluating market sizing assumptions",
      "Portfolio operations teams assessing competitive positioning",
    ],
    sessionConfigLabel: "Session configuration",
    sessionConfig: [
      { label: "Guardian mode", value: "Financial integrity" },
      { label: "Depth", value: "Standard · Deep" },
      { label: "Documents", value: "Memos · models · market reports · CIMs" },
      { label: "SVS checks", value: "Market data recency · source attribution · forecast vs. historical distinction" },
      { label: "Output", value: "Finding · confidence grade · key risks verbatim · audit trail" },
    ],
    problemTitle: ["Investment committees find what diligence missed."],
    problemBody:
      "IC pushback isn’t random. It targets the same structural weaknesses every time: market size claims that can’t be triangulated, moat assertions that don’t survive a look at the competitor roadmap, and unit economics that require assumptions the company hasn’t validated. The deal team that walks in knowing these objections wins the room. The one that hears them for the first time loses it.",
    questionsLabel: "Questions VC and PE teams run on Augle",
    questions: [
      "What is the strongest argument against our TAM estimate, and how should we address it at IC?",
      "Does the claimed competitive moat survive scrutiny of the incumbent’s announced product roadmap?",
      "Which unit economics assumptions are most sensitive to the company not reaching projected scale?",
      "Is the evidence for this market’s regulatory tailwind as established as the founder claims?",
      "What would need to be true for this acquisition’s revenue synergy assumptions to hold?",
    ],
    problemItems: [
      {
        title: "TAM estimates sourced from single analyst reports",
        body: "The Cartographer maps the evidence behind every market size claim — whether it’s triangulated across multiple independent sources or dependent on a single Gartner or IDC figure from 2022. The Methodologist flags when a bottom-up construction and a top-down estimate produce materially different numbers that the memo treats as equivalent.",
      },
      {
        title: "Moat claims that don’t survive incumbent scrutiny",
        body: "The Contrarian steelmans the incumbent’s position before challenging the moat thesis. A switching cost argument that depends on integrations the incumbent announced at their last developer conference, or a network effect claim in a market where the largest player has already replicated the core feature, surfaces here — not at IC.",
      },
      {
        title: "Unit economics that only work at unvalidated scale",
        body: "The Methodologist evaluates whether the construct — whether the unit economics model actually measures what the memo claims — holds at the growth stage being underwritten. CAC that’s been validated at 50 enterprise customers may not hold at 500. Gross margin that assumes a pricing tier the company hasn’t yet launched is Contested, not Probable.",
      },
      {
        title: "The IC objection you haven’t prepared for",
        body: "The Contrarian runs at maximum temperature to surface the objection a skeptical IC member or a competing bidder’s advisor will raise. Unresolved Strong objections appear verbatim in the session output — not summarised, not softened — with a specified resolution condition. These become the IC prep agenda.",
      },
    ],
    useCasesTitle: ["Three sessions.", "Three investment moments."],
    useCasesBody:
      "Each scenario illustrates realistic deliberation behaviour across thesis validation, diligence review, and competitive assessment.",
    useCases: [
      {
        numLabel: "Use case 01 of 03 · Venture capital + PE",
        name: "The Investment Thesis Review",
        persona: "Principal · Series B growth fund · Pre-IC memo finalisation",
        badge: "Standard depth · document ingestion",
        badgeVariant: "standard",
        question:
          "Is the investment thesis for this vertical SaaS company’s Series B defensible at IC, and what are the two or three objections we need to resolve before we go in?",
        highlights: [
          {
            agent: "Cartographer",
            text: "Settled: the category exists and the company has product-market fit in its initial segment. Contested: whether the $4.2B TAM figure is achievable given the company’s actual ICP. Unknown: the timeline and cost of expanding from the current segment to the adjacent verticals that make up 60% of the TAM claim.",
          },
          {
            agent: "Methodologist",
            text: "Construct validity: the TAM is sourced from a single 2023 Forrester report using a definition of the category that includes use cases the company doesn’t currently address. Bottom-up calculation from the company’s own pipeline data produces a $1.1B serviceable figure. These are treated as equivalent in the memo. They are not.",
          },
          {
            agent: "Contrarian",
            text: "Strong objection (Unresolved): \"The moat argument depends on proprietary workflow integrations. Salesforce announced equivalent native functionality at Dreamforce in September. The integration advantage has a 12–18 month shelf life at most. IC will ask this.\"",
          },
          {
            agent: "Pragmatist",
            text: "(1) Restate the TAM using the bottom-up figure with the Forrester number as long-run ceiling — more defensible. (2) Prepare a direct response to the Salesforce roadmap question: what specific integrations remain proprietary and for how long? These are the two slides IC will focus on.",
          },
        ],
        outcome: [
          { label: "Finding", value: "Probable for near-term thesis · Contested for long-run TAM and moat durability" },
          { label: "Key objection", value: "Salesforce native functionality — integration moat has 12–18 month horizon" },
          { label: "TAM gap", value: "$4.2B Forrester vs. $1.1B bottom-up — not reconciled in memo" },
          { label: "IC prep", value: "Restate TAM + prepare moat durability slide before IC" },
        ],
        value:
          "The Salesforce roadmap conflict wasn’t in the competitive analysis. The TAM discrepancy was in the memo but hadn’t been flagged. The partner who walked into IC knowing both objections controlled the room. The one who heard them for the first time didn’t.",
      },
      {
        numLabel: "Use case 02 of 03 · Venture capital + PE",
        name: "The Acquisition Diligence Review",
        persona: "VP · Mid-market PE fund · Proprietary deal · Pre-LOI",
        badge: "Deep depth · document ingestion",
        badgeVariant: "deep",
        question:
          "Do the revenue synergy assumptions in our acquisition model for this add-on hold under scrutiny, and what’s the strongest case against our post-close integration timeline?",
        highlights: [
          {
            agent: "Cartographer",
            text: "Settled: the customer overlap creates genuine cross-sell opportunity. Contested: whether the platform’s two separate CRM systems can be integrated within the 18-month timeline the model assumes. Unknown: customer willingness to migrate — no channel checks have been done with the target’s top 10 accounts.",
          },
          {
            agent: "Methodologist",
            text: "The revenue synergy figure assumes 35% of the target’s existing customers will adopt the acquirer’s premium tier within 24 months. The comparable from the fund’s last add-on shows 12% adoption over 36 months. The assumption is 3x the empirical base rate. Confidence: Contested.",
          },
          {
            agent: "Contrarian",
            text: "Moderate objection: \"The integration timeline assumes parallel CRM migration with no customer disruption. Every PE integration of this type in the past five years has experienced 6–9 month delays. The model has no contingency for this. The synergy realisation schedule needs a sensitivity case.\"",
          },
        ],
        outcome: [
          { label: "Finding", value: "Contested — revenue synergies 3x empirical base rate; integration timeline has no contingency" },
          { label: "Key risk", value: "CRM integration delay + customer adoption rate materially overstated vs. comparable" },
          { label: "Next step", value: "Add 6–9 month delay sensitivity case. Run channel checks with top 10 target accounts pre-LOI." },
        ],
        value:
          "The adoption rate assumption was buried in a tab of the model. The CRM integration risk was described in the CIM as “manageable.” Neither had been stress-tested against the fund’s own comparable. The sensitivity case was added before the LOI was signed, not discovered in the 100-day plan.",
      },
      {
        numLabel: "Use case 03 of 03 · Venture capital + PE",
        name: "The Competitive Positioning Check",
        persona: "Associate · Early-stage fund · Seed extension diligence",
        badge: "Standard depth",
        badgeVariant: "standard",
        question:
          "Is the founder’s claim that they have a two-year technical lead over the nearest competitor supported by the available evidence?",
        highlights: [
          {
            agent: "Cartographer",
            text: "Settled: the company’s inference latency benchmarks are meaningfully better than the published figures from the nearest competitor. Contested: whether inference latency is the primary purchase criterion at the company’s current ICP. Unknown: the competitor’s internal roadmap — only public statements available.",
          },
          {
            agent: "Contrarian",
            text: "Strong objection (Unresolved): \"The ‘two-year lead’ claim is based on a benchmark the company designed and self-published. There is no independent third-party validation. The competitor has not published equivalent benchmarks — absence of evidence is not evidence of absence. This claim will not survive a technical reference check.\"",
          },
          {
            agent: "Synthesizer",
            text: "The inference latency advantage is real based on available data. The two-year lead claim is not supported — it conflates a current benchmark advantage with a durable technical moat. These are different claims requiring different evidence. The memo should reflect this distinction.",
          },
        ],
        outcome: [
          { label: "Finding", value: "Probable for current benchmark advantage · Gap for two-year lead durability claim" },
          { label: "Key objection", value: "Self-published benchmark — no independent validation; competitor roadmap unknown" },
          { label: "Next step", value: "Commission independent technical reference. Restate as benchmark advantage, not two-year lead." },
        ],
        value:
          "The two-year lead was the headline claim in the founder deck. It was also the weakest claim in the deck. Restating it accurately — a real and measurable benchmark advantage, not an asserted durable moat — strengthened the memo’s credibility with IC rather than exposing it to a single pointed question.",
      },
    ],
    howEyebrow: "How Augle works for VC and PE",
    howTitle: ["IC prep that runs the", "objections before you do."],
    howItems: [
      {
        title: "Submit your deal materials",
        body: "Upload memos, financial models, market reports, CIMs, and management presentations. Financial integrity mode activates automatically — the Guardian validates market data recency, distinguishes historical data from forward forecasts, and flags stale or single-source market size claims.",
      },
      {
        title: "The ensemble maps what’s contested",
        body: "The Cartographer classifies every key assumption as Settled, Contested, or Unknown. The Methodologist assesses construct validity — whether the metrics in the model actually measure what the memo claims. TAM definitions, unit economics constructs, and synergy assumptions are evaluated against the evidence base before deliberation begins.",
      },
      {
        title: "The IC objections are run",
        body: "The Contrarian takes the role of a skeptical IC member or a competing bidder’s advisor — surfacing the strongest version of every challenge to the thesis. Every objection specifies a resolution condition. Unresolved Strong objections become the IC prep agenda, not the IC surprise.",
      },
      {
        title: "You receive a calibrated risk register",
        body: "The Synthesizer produces a finding anchored to the evidence base — not the founder narrative. Confidence grades per key assumption, unresolved objections verbatim with resolution conditions, and reopen conditions that specify what new information would change the assessment.",
      },
    ],
    howConfigLabel: "VC/PE session · configuration",
    howConfig: [
      { label: "Guardian mode", value: "Financial integrity — market data recency, forecast vs. historical distinction, source attribution, financial advice prohibition" },
      { label: "Document types", value: "Investment memos · Financial models · CIMs · Market reports · Management presentations · Comparable transaction data" },
      { label: "Contrarian focus", value: "TAM triangulation · moat durability · unit economics at scale · integration timeline realism · competitive roadmap exposure" },
      { label: "Output package", value: "Confidence grade per key assumption · unresolved IC objections verbatim · reopen conditions · full audit trail" },
      { label: "Session depth", value: "Standard for thesis review and IC prep · Deep for major acquisitions with external expert at Phase 1/2 boundary" },
    ],
    whyEyebrow: "Why Augle for VC and PE",
    whyTitle: ["The IC objection surfaced", "before the meeting."],
    whyCards: [
      {
        title: "Runs the skeptical IC member’s objections",
        body: "The Contrarian is calibrated to surface the strongest version of every challenge to your thesis — the TAM triangulation question, the moat durability challenge, the unit economics sensitivity. Unresolved objections appear verbatim with resolution conditions. The deal team that knows these going in controls the IC conversation.",
      },
      {
        title: "Validates market data before it enters the memo",
        body: "Financial integrity mode checks market data recency, source attribution, and the distinction between historical data and forward forecasts. A $4B TAM from a 2021 report that used a category definition your company doesn’t address is flagged before it becomes the first thing IC questions. Stale data doesn’t survive SVS.",
      },
      {
        title: "Produces a confidence-graded risk register",
        body: "Every key assumption receives a confidence grade — Established, Probable, Contested, or Gap — based on the evidence base, not the memo’s framing. The difference between a Probable thesis and a Contested one is the difference between a memo that IC approves and one that generates a 30-minute objection loop on the first key assumption.",
      },
    ],
    ctaTitle: ["Know the IC objections", "before the meeting."],
    ctaBody: ["Join waitlist and stress-test your next investment thesis before you go to committee."],
  },
];

export function getSolution(slug: string): Solution | undefined {
  return SOLUTIONS.find((s) => s.slug === slug);
}

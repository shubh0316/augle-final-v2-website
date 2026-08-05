export type AgentBlock = {
  name: string;
  text: string;
};

export type OutputItem = {
  key: string;
  value: string;
};

export type Session = {
  name: string;
  persona: string;
  question: string;
  tags: string[];
  /** Four agent blocks, rendered as two columns of two. */
  agents: [AgentBlock, AgentBlock, AgentBlock, AgentBlock];
  output: {
    items: OutputItem[];
    noteLabel: "Unresolved objection" | "Reopen condition";
    noteText: string;
  };
};

export type RelatedHub = {
  name: string;
  desc: string;
  href: string;
};

export type UseCase = {
  slug: string;
  /** Full display name — breadcrumb, eyebrow, hero, and (usually) the related "Solutions page" card. */
  vertical: string;
  /** Short form used only in the CTA banner's secondary button label, e.g. "Healthcare solutions page". */
  shortName: string;
  /**
   * One vertical (government) names its own "Solutions page" related-card differently from its
   * breadcrumb ("Government + public sector" vs. "Government") — source inconsistency, captured verbatim.
   */
  solutionsPageName?: string;
  /** Short label for the hub-nav chip — only think-tanks deviates from `vertical` ("Think tanks" vs. "Think tanks + nonprofits"). */
  hubLabel?: string;
  metaTitle: string;
  metaDescription: string;
  heroBody: string;
  heroLinks: [string, string, string, string];
  guardianMode: string;
  commonOutputs: [string, string, string];
  solutionsPageDesc: string;
  relatedHubs: [RelatedHub, RelatedHub];
  sessions: [Session, Session, Session];
};

export const USE_CASES: UseCase[] = [
  {
    slug: "universities",
    vertical: "Universities + academia",
    shortName: "Universities",
    metaTitle: "Dissertation Defence & Grant Review Examples | Augle",
    metaDescription:
      "Example Augle sessions for academia — dissertation defence stress-tests, systematic review gap analysis, and grant proposal review.",
    heroBody:
      "How Augle's multi-agent ensemble serves PhD candidates, faculty researchers, and academic teams — from dissertation defence stress-tests to grant proposal reviews. Each session illustrates realistic deliberation behaviour, unresolved objections, and the output that matters for academic work.",
    heroLinks: [
      "PhD candidates preparing for viva examinations",
      "Research fellows mapping systematic review gaps",
      "Faculty stress-testing grant proposals before submission",
      "Academic librarians reviewing evidence claims for publication",
    ],
    guardianMode: "Academic integrity",
    commonOutputs: [
      "Contested confidence grades",
      "unresolved methodological objections",
      "evidence gap register",
    ],
    solutionsPageDesc:
      "The full solutions page for this vertical — problem framing, configuration panel, and why Augle for academic research.",
    relatedHubs: [
      {
        name: "Research labs hub",
        desc: "Three sessions for corporate and independent research labs — replication review, technology readiness, and competitive intelligence.",
        href: "/use-cases/research-labs",
      },
      {
        name: "Think tanks + nonprofits hub",
        desc: "Pre-publication evidence review, advocacy position stress-testing, and grant evaluation — adjacent patterns for research-adjacent organisations.",
        href: "/use-cases/think-tanks",
      },
    ],
    sessions: [
      {
        name: "The Dissertation Defence",
        persona: "PhD Candidate, Cognitive Science · University of Edinburgh",
        question:
          "“Does experience sampling via smartphone provide sufficient ecological validity to support attentional state claims in naturalistic environments?”",
        tags: ["Standard", "Academic integrity"],
        agents: [
          {
            name: "Cartographer",
            text: "Settled: ESM is an established methodology with a strong publication record. Contested: whether smartphone notification triggers introduce systematic attentional bias through the act of self-report — active debate since 2019. Unknown: no study has directly compared notification-triggered vs. researcher-initiated ESM on attentional outcomes specifically.",
          },
          {
            name: "Methodologist",
            text: "Internal validity concern: the notification itself is an attentional interruption — it cannot be neutral to the construct being measured. Construct validity issue: the 3-item Likert operationalisation of attentional state has no published reliability data for smartphone delivery. Confidence ceiling: Contested.",
          },
          {
            name: "Contrarian — Strong objection (Unresolved)",
            text: "“Self-report of attentional state triggered by an attentional interruption is not a measure of naturalistic attention — it is a measure of post-interruption attentional recovery. These are causally distinct constructs. The thesis conflates them throughout. A viva examiner in cognitive science will identify this immediately.”",
          },
          {
            name: "Synthesizer",
            text: "Evidence weight: Probable for relative comparisons between conditions. Contested for absolute naturalistic attentional state claims. The methodology supports weaker claims than the thesis currently makes. Reopen condition: replication study with researcher-initiated sampling in identical conditions.",
          },
        ],
        output: {
          items: [
            { key: "Finding", value: "Contested" },
            { key: "Guardian", value: "94% · Academic integrity" },
            { key: "Dissent flags", value: "1 Strong (Unresolved)" },
            { key: "Confidence", value: "41%" },
          ],
          noteLabel: "Unresolved objection",
          noteText:
            "“Self-report triggered by attentional interruption is not a measure of naturalistic attention — it measures post-interruption recovery. These are causally distinct. The thesis conflates them.”",
        },
      },
      {
        name: "The Systematic Review Gap",
        persona: "Research Fellow, Public Health · UCL",
        question:
          "“What is the current state of evidence on whether screen time interventions reduce depressive symptoms in adolescents, and where are the critical gaps?”",
        tags: ["Standard"],
        agents: [
          {
            name: "Cartographer",
            text: "Settled: screen time is associated with worse mental health outcomes in cross-sectional studies. Contested: whether interventions that reduce screen time produce clinically meaningful reductions in depressive symptoms — RCT evidence is thin. Unknown: dose-response relationship, mechanism of action, and whether effect size varies by platform type (passive consumption vs. active social interaction).",
          },
          {
            name: "Guardian SVS",
            text: "28 citations verified. One systematic review cited as primary evidence was retracted in 2023 due to data integrity concerns. Flagged Critical — session paused. Evidence node removed from admissible base before deliberation continued.",
          },
          {
            name: "Methodologist",
            text: "External validity problem: the three RCTs with positive findings all recruited from clinical populations already receiving treatment. Effect size for general adolescent populations is unknown. The literature conflates passive consumption and active social use — these have different proposed mechanisms and different intervention implications. Gap is structural, not incidental.",
          },
          {
            name: "Contrarian — Moderate objection",
            text: "“The proposed systematic review scope does not distinguish between platform types. A reviewer will ask why TikTok passive consumption is treated as equivalent to Instagram direct messaging in the intervention literature. Without this distinction, the review's findings will be ungeneralisable.”",
          },
        ],
        output: {
          items: [
            { key: "Finding", value: "Gap" },
            { key: "SVS flag", value: "Critical — retracted systematic review" },
            { key: "Key gap", value: "No RCT evidence in general (non-clinical) adolescent population" },
            { key: "Guardian", value: "91% · Academic integrity" },
          ],
          noteLabel: "Reopen condition",
          noteText:
            "RCT conducted in general adolescent population with platform-type stratification and 6-month follow-up on validated depression measure.",
        },
      },
      {
        name: "The Grant Proposal Review",
        persona: "Associate Professor, Materials Science · MIT",
        question:
          "“Is the evidence base for graphene-based supercapacitor energy density improvements sufficient to support the claims in this NSF proposal, and what will reviewers challenge?”",
        tags: ["Deep"],
        agents: [
          {
            name: "Cartographer",
            text: "Settled: graphene-based supercapacitors demonstrate improved energy density in laboratory conditions. Contested: whether improvements are attributable to graphene specifically vs. overall electrode architecture — confounded in most published studies. Unknown: scalability at commercial electrode dimensions; most published results are for sub-cm² test electrodes.",
          },
          {
            name: "Methodologist",
            text: "Construct validity: the proposal cites energy density figures from studies using different electrolyte systems. Comparing across electrolyte types inflates the apparent advantage of graphene electrodes. The proposal does not disclose this confound. An NSF panel reviewer in materials science will identify it — it is a standard methodological concern in the field.",
          },
          {
            name: "Contrarian — Strong objection (Unresolved)",
            text: "“The scalability gap is not a minor limitation — it is the central unresolved question in graphene electrode research. The proposal's commercialisation pathway assumes scale-up is straightforward. No published study has demonstrated the claimed energy density at electrode dimensions relevant to any practical application. Panel reviewers will not fund a commercialisation pathway built on sub-cm² laboratory data.”",
          },
          {
            name: "Pragmatist",
            text: "Two revisions: (1) Reframe the commercialisation pathway as a research objective rather than an assumed outcome — propose scalability characterisation as Phase 2 deliverable. (2) Add a comparative electrolyte section that directly addresses the confound rather than leaving it for reviewers to find. Both are strengthening moves, not concessions.",
          },
        ],
        output: {
          items: [
            { key: "Finding", value: "Contested" },
            { key: "Confidence", value: "38%" },
            { key: "Key gap", value: "No scalability data at practical electrode dimensions" },
            { key: "Guardian", value: "96% · Academic integrity" },
          ],
          noteLabel: "Unresolved objection",
          noteText:
            "“Commercialisation pathway assumes scale-up is straightforward. No published study demonstrates claimed energy density at relevant electrode dimensions. Reviewers will not fund this pathway on sub-cm² laboratory data.”",
        },
      },
    ],
  },
  {
    slug: "research-labs",
    vertical: "Research labs",
    shortName: "Research labs",
    metaTitle: "Replication Review & TRL Assessment Examples | Augle",
    metaDescription:
      "Example Augle sessions for research labs — replication review, technology readiness assessment, and competitive intelligence.",
    heroBody:
      "How Augle's multi-agent ensemble serves corporate R&D teams, independent research institutes, and laboratory directors — from replication reviews to technology readiness assessments. Each session illustrates how structured deliberation surfaces what peer review alone cannot: contested assumptions, measurement comparability problems, and intelligence blind spots.",
    heroLinks: [
      "Corporate scientists stress-testing foundational claims before downstream investment",
      "R&D directors evaluating technology readiness levels against the actual literature",
      "Strategy teams mapping competitive landscapes with evidence-graded precision",
      "Lab directors preparing replication protocols for contested findings",
    ],
    guardianMode: "Academic integrity",
    commonOutputs: [
      "Contested confidence grades",
      "measurement comparability flags",
      "TRL assessments",
    ],
    solutionsPageDesc:
      "The full solutions page for this vertical — problem framing, configuration panel, and why Augle for R&D teams.",
    relatedHubs: [
      {
        name: "Universities + academia hub",
        desc: "Overlapping patterns: systematic review gaps, foundational claim stress-testing, and evidence weight assessment for academic research teams.",
        href: "/use-cases/universities",
      },
      {
        name: "Think tanks + nonprofits hub",
        desc: "Evidence review and position stress-testing for research-adjacent organisations — adjacent workflows to corporate R&D intelligence.",
        href: "/use-cases/think-tanks",
      },
    ],
    sessions: [
      {
        name: "The Replication Review",
        persona: "Senior Scientist, Computational Biology · Genentech",
        question:
          "“Is the CRISPR off-target editing rate reported in this foundational study reproducible, and what does the replication literature actually show?”",
        tags: ["Standard", "Academic integrity"],
        agents: [
          {
            name: "Cartographer",
            text: "Settled: CRISPR-Cas9 specificity has improved substantially since 2014. Contested: the specific off-target rate in the foundational Zhang lab study has not been directly replicated in an independent lab using identical protocol. Flagged: three subsequent papers cite the original figure without independent verification.",
          },
          {
            name: "Guardian SVS",
            text: "22 citations verified. One preprint cited as corroborating evidence was never published in peer review. Flagged Moderate. Session continued with preprint downgraded to lower-tier evidence.",
          },
          {
            name: "Contrarian — Strong objection (Unresolved)",
            text: "“The field has canonised a specific off-target rate that was measured with a sequencing technology since superseded. Every downstream study that cites it is comparing against a number that may be an artefact of sequencing sensitivity, not of the editing chemistry. This is not a replication failure — it is a measurement comparability problem that has never been formally addressed.”",
          },
          {
            name: "Synthesizer",
            text: "Weight of evidence: Probable that current CRISPR-Cas9 specificity substantially exceeds the foundational claim. Contested that the original figure itself is reproducible using modern assays. Reopen condition: direct replication using matched sequencing depth and contemporary off-target detection methods.",
          },
        ],
        output: {
          items: [
            { key: "Finding", value: "Contested" },
            { key: "Guardian", value: "89% · Academic integrity" },
            { key: "Dissent flags", value: "1 Strong (Unresolved)" },
            { key: "Confidence", value: "44%" },
          ],
          noteLabel: "Unresolved objection",
          noteText:
            "“Measurement comparability, not replication failure. The canonical off-target rate was measured with superseded sequencing technology. Modern assays would produce a different number. The field has never reconciled this.”",
        },
      },
      {
        name: "The Technology Readiness Assessment",
        persona: "VP Research, Advanced Materials · 3M Corporate R&D",
        question:
          "“What is the realistic technology readiness level for room-temperature superconducting materials based on the current published evidence, and where is the field actually stuck?”",
        tags: ["Deep"],
        agents: [
          {
            name: "Cartographer",
            text: "Settled: room-temperature superconductivity has been observed in hydrogen-rich compounds under ultra-high pressures (>150 GPa). Contested: two high-profile claims of near-ambient-pressure room-temperature superconductivity (LK-99, 2023; Dias group, 2023) have both failed independent replication. Unknown: whether any materials pathway exists to room-temperature superconductivity at pressures compatible with practical applications.",
          },
          {
            name: "Methodologist",
            text: "TRL assessment: the field is at TRL 2–3 for pressure-based materials, TRL 1 for ambient-pressure candidates. The Dias retraction is not an isolated failure — it reflects a reproducibility crisis in a field where measurements are extremely sensitive to sample preparation and characterisation protocols. Any corporate investment thesis predicated on near-term room-temperature superconductivity at ambient pressure is not supportable by current evidence.",
          },
          {
            name: "Contrarian — Moderate objection",
            text: "“The LK-99 replication failure should not be read as evidence that the field is at an impasse. It is evidence that a single rushed preprint cannot substitute for reproducible experimental protocol. The underlying copper-substituted apatite chemistry has not been fully explored. A TRL ceiling set by the most hyped recent claims understates what rigorous work in the field has actually established.”",
          },
          {
            name: "Pragmatist",
            text: "Three-part recommendation: (1) Separate the high-pressure TRL trajectory from the ambient-pressure TRL trajectory in any investment framing — they are different bets. (2) Monitor replication literature for 18 months before any materials platform commitment. (3) Focus internal R&D on characterisation methodology, which is the bottleneck regardless of which materials pathway succeeds.",
          },
        ],
        output: {
          items: [
            { key: "Finding", value: "Contested" },
            { key: "TRL estimate", value: "2–3 (pressure-based)" },
            { key: "Key gap", value: "No ambient-pressure candidate has survived replication" },
            { key: "Guardian", value: "93% · Academic integrity" },
          ],
          noteLabel: "Reopen condition",
          noteText:
            "“Independent replication of any ambient-pressure room-temperature superconductivity claim using blind sample preparation and standardised characterisation protocol across at least three independent labs.”",
        },
      },
      {
        name: "The Competitive Intelligence Brief",
        persona: "Director of Strategy, Pharma R&D · Novartis",
        question:
          "“What does the published literature actually establish about competitor progress on GLP-1/GIP dual agonists beyond tirzepatide, and where are the unresolved efficacy and safety questions?”",
        tags: ["Deep"],
        agents: [
          {
            name: "Cartographer",
            text: "Settled: tirzepatide demonstrates superior weight loss vs. semaglutide in head-to-head data (SURMOUNT-5). Contested: whether cardiovascular outcomes advantage of GLP-1 agonists extends to dual agonists — SURPASS-CVOT data is not yet mature. Unknown: long-term safety of GIP agonism specifically; the contribution of GIP receptor agonism to the incremental efficacy over GLP-1 alone is mechanistically contested.",
          },
          {
            name: "Methodologist",
            text: "Competitive landscape limitation: most pipeline data is Phase 2, with heterogeneous endpoints and comparator selection designed to show differentiation rather than head-to-head equivalence. Efficacy comparisons across companies based on Phase 2 data are unreliable. The field lacks a standardised primary endpoint for weight loss trials that would enable valid cross-trial comparisons.",
          },
          {
            name: "Contrarian — Moderate objection",
            text: "“The framing of this as a dual agonist race understates the complexity. Several competitors are pursuing triple agonism (GLP-1/GIP/glucagon). If glucagon agonism proves to be the incremental mechanism driving the tirzepatide advantage over semaglutide, the entire dual agonist competitive set is already obsolete. The intelligence question should be re-scoped.”",
          },
          {
            name: "Synthesizer",
            text: "Confidence grade: Probable for tirzepatide class leadership in current approved agents. Contested for any competitive positioning claim based on pipeline Phase 2 data. Gap for long-term cardiovascular safety of dual vs. triple agonism. Pragmatist recommendation: scope competitive monitoring to include triple agonist candidates as primary threat class.",
          },
        ],
        output: {
          items: [
            { key: "Finding", value: "Contested" },
            { key: "Confidence", value: "52%" },
            { key: "Key gap", value: "CV outcomes data not mature for dual agonists" },
            { key: "Guardian", value: "91% · Academic integrity" },
          ],
          noteLabel: "Unresolved objection",
          noteText:
            "“The competitive framing assumes dual agonism is the relevant category. Triple agonist candidates may make this analysis obsolete. The intelligence brief should be re-scoped to include GLP-1/GIP/glucagon compounds as the primary competitive threat.”",
        },
      },
    ],
  },
  {
    slug: "policy",
    vertical: "Policy + lawmakers",
    shortName: "Policy",
    metaTitle: "Regulatory Impact & Bill Scoring Examples | Augle",
    metaDescription:
      "Example Augle sessions for policy analysts — regulatory impact review, infrastructure bill scoring, and public health mandate review.",
    heroBody:
      "How Augle's multi-agent ensemble serves policy analysts, legislative staff, and government officials — from regulatory impact reviews to bill scoring. Each session shows how structured deliberation identifies the evidentiary gaps that legislation cannot afford to miss.",
    heroLinks: [
      "Senate and House committee staff reviewing the evidence base for proposed legislation",
      "Budget office analysts stress-testing multiplier assumptions in bill scoring",
      "State officials preparing defensible public health policy recommendations",
      "Regulatory economists mapping contested causal claims before rule-making",
    ],
    guardianMode: "Editorial integrity",
    commonOutputs: [
      "Evidentiary gap registers",
      "contested assumption flags",
      "scoring range recommendations",
    ],
    solutionsPageDesc:
      "The full solutions page for this vertical — problem framing, configuration panel, and why Augle for policy research.",
    relatedHubs: [
      {
        name: "Think tanks + nonprofits hub",
        desc: "Pre-publication evidence review and advocacy position stress-testing — adjacent workflows to legislative research.",
        href: "/use-cases/think-tanks",
      },
      {
        name: "Government hub",
        desc: "Evidence-graded analysis for public sector decision-makers — procurement, programme evaluation, and inter-agency intelligence.",
        href: "/use-cases/government",
      },
    ],
    sessions: [
      {
        name: "The Regulatory Impact Review",
        persona: "Senior Policy Advisor, Senate Commerce Committee",
        question:
          "“What does the evidence base actually establish about the economic impact of algorithmic content moderation on small publishers, and where are the critical evidentiary gaps?”",
        tags: ["Standard", "Editorial integrity"],
        agents: [
          {
            name: "Cartographer",
            text: "Settled: platform algorithm changes have measurably reduced organic reach for third-party publishers since 2016 — well documented across multiple independent studies. Contested: whether reduced reach has caused net revenue harm or simply shifted traffic to direct/email channels — evidence is mixed. Unknown: causal mechanism between moderation decisions and publisher revenue, controlling for broader digital advertising market changes.",
          },
          {
            name: "Guardian SVS",
            text: "31 citations verified. One industry-funded study cited as independent evidence was produced by a trade association whose members have direct financial interest in the regulatory outcome. Flagged Moderate — disclosed to deliberation. Evidence downgraded but retained.",
          },
          {
            name: "Contrarian — Strong objection (Unresolved)",
            text: "“The entire evidentiary base conflates three distinct phenomena: algorithmic reach reduction, content moderation removal, and demonetisation. Each has different legal and policy implications. Legislation drafted on this evidence base will address a composite harm that does not correspond to any single enforceable regulatory category. The committee needs disaggregated evidence, not the current aggregate.”",
          },
          {
            name: "Synthesizer",
            text: "Confidence: Probable that algorithmic changes have reduced traffic to independent publishers. Contested whether this constitutes actionable economic harm distinguishable from market competition. Gap on causal mechanism. Legislative recommendation: commission disaggregated study before drafting enforcement mechanisms.",
          },
        ],
        output: {
          items: [
            { key: "Finding", value: "Contested" },
            { key: "SVS flag", value: "Moderate — industry-funded study disclosed" },
            { key: "Dissent flags", value: "1 Strong (Unresolved)" },
            { key: "Guardian", value: "92% · Editorial integrity" },
          ],
          noteLabel: "Unresolved objection",
          noteText:
            "“The evidence conflates three legally distinct phenomena. Legislation drafted on this composite evidentiary base will not correspond to any single enforceable regulatory category. Disaggregated evidence is required before mechanism design.”",
        },
      },
      {
        name: "The Infrastructure Bill Scoring",
        persona: "Deputy Director, Congressional Budget Office",
        question:
          "“What does the infrastructure investment literature establish about the employment multiplier effects of broadband expansion, and how reliable are the projections used in the current bill scoring?”",
        tags: ["Deep"],
        agents: [
          {
            name: "Cartographer",
            text: "Settled: broadband expansion is associated with positive employment effects in underserved rural areas in studies from 2010–2020. Contested: the size of the employment multiplier — published estimates range from 0.6 to 2.1 jobs per infrastructure job, varying substantially by methodology and regional context. Unknown: whether multiplier estimates from the 2010s decade apply to the current macroeconomic environment with higher baseline broadband penetration.",
          },
          {
            name: "Methodologist",
            text: "Scoring methodology concern: the current bill scoring uses a 1.7 multiplier derived from a 2019 meta-analysis that pooled studies with heterogeneous regional contexts. Applying a pooled multiplier to a geographically targeted programme introduces systematic bias. Rural-specific multiplier estimates cluster lower (0.8–1.2). The gap between used multiplier and rural-specific estimates implies the employment projection may be overstated by 30–40%.",
          },
          {
            name: "Contrarian — Moderate objection",
            text: "“The methodologist is correct that rural multipliers are lower, but the analysis omits the network effect: broadband enabling remote work generates downstream employment not captured in direct infrastructure multipliers. The rural-specific estimate is also an undercount. The honest answer is that no multiplier methodology captures the full employment effect of connectivity infrastructure.”",
          },
          {
            name: "Pragmatist",
            text: "Two-track recommendation: (1) Report scoring range rather than point estimate — present 0.8 to 1.7 multiplier band with explicit assumptions. (2) Flag the macroeconomic context dependency explicitly in the bill report language to prevent the scoring from being cited as precision it does not support.",
          },
        ],
        output: {
          items: [
            { key: "Finding", value: "Contested" },
            { key: "Confidence", value: "38%" },
            { key: "Scoring gap", value: "Multiplier may overstate employment by 30–40%" },
            { key: "Guardian", value: "95% · Editorial integrity" },
          ],
          noteLabel: "Reopen condition",
          noteText:
            "“Rural-specific multiplier meta-analysis using post-2020 data with remote work employment included as an outcome category, enabling updated scoring that reflects current baseline broadband penetration.”",
        },
      },
      {
        name: "The Public Health Mandate Review",
        persona: "State Health Commissioner, Governor's Office",
        question:
          "“What does the evidence base establish about the effectiveness of indoor masking mandates in reducing COVID-19 transmission in community settings, and what do the most rigorous studies show?”",
        tags: ["Deep"],
        agents: [
          {
            name: "Cartographer",
            text: "Settled: laboratory studies confirm N95/FFP2 respirators substantially reduce aerosol transmission. Contested: whether community-level mask mandates reduce population-level transmission rates — evidence from RCTs is limited and results are mixed. Unknown: effectiveness of cloth and surgical masks in high-transmission, poorly ventilated community settings at population scale.",
          },
          {
            name: "Guardian SVS",
            text: "44 citations verified. One Cochrane review frequently cited as definitive evidence against community masking was updated in 2023 with revised conclusions. The original 2020 version is still being cited. Flagged Critical — session used updated 2023 version only.",
          },
          {
            name: "Methodologist",
            text: "Internal validity problem across the literature: it is methodologically difficult to isolate mask mandate effects from concurrent interventions (capacity limits, ventilation improvements, vaccination rollout). Most natural experiment studies cannot fully control for simultaneity. Effect size estimates vary by an order of magnitude depending on which concurrent interventions are controlled for.",
          },
          {
            name: "Contrarian — Moderate objection",
            text: "“The literature on respirators vs. surgical masks vs. cloth masks is being treated as a single evidence base. These are different interventions with different mechanisms and different evidence profiles. Policy recommendations that specify 'masking' without specifying mask type are not grounded in what the evidence actually shows.”",
          },
        ],
        output: {
          items: [
            { key: "Finding", value: "Contested" },
            { key: "SVS flag", value: "Critical — outdated Cochrane version replaced" },
            { key: "Confidence", value: "33%" },
            { key: "Guardian", value: "94% · Editorial integrity" },
          ],
          noteLabel: "Unresolved objection",
          noteText:
            "“The evidence base treats N95 respirators, surgical masks, and cloth masks as equivalent interventions. They are not. Policy that specifies masking without specifying type cannot be grounded in what the literature actually shows.”",
        },
      },
    ],
  },
  {
    slug: "law-firms",
    vertical: "Law firms",
    shortName: "Law firms",
    metaTitle: "Expert Witness Prep & Damages Review Examples | Augle",
    metaDescription:
      "Example Augle sessions for law firms — expert witness preparation, damages quantification, and regulatory enforcement exposure previews.",
    heroBody:
      "How Augle's multi-agent ensemble serves litigation partners, regulatory counsel, and legal analysts — from expert witness preparation to enforcement exposure previews. Each session shows how structured deliberation identifies the arguments opposing counsel will make before they make them.",
    heroLinks: [
      "Litigation partners stress-testing expert witness methodology before Daubert",
      "Regulatory counsel mapping enforcement exposure against documented case patterns",
      "Associates quantifying damages with the vulnerabilities identified before opposing experts do",
      "General counsel preparing settlement positions grounded in realistic probability assessments",
    ],
    guardianMode: "Legal integrity",
    commonOutputs: [
      "Daubert vulnerability assessments",
      "enforcement probability estimates",
      "unresolved objections",
    ],
    solutionsPageDesc:
      "The full solutions page for this vertical — problem framing, configuration panel, and why Augle for legal research.",
    relatedHubs: [
      {
        name: "Financial services hub",
        desc: "Regulatory exposure analysis and enforcement pattern mapping — adjacent workflows to financial services litigation.",
        href: "/use-cases/financial-services",
      },
      {
        name: "Policy + lawmakers hub",
        desc: "Evidence standards and legislative intent research — adjacent workflows for regulatory practice groups.",
        href: "/use-cases/policy",
      },
    ],
    sessions: [
      {
        name: "The Expert Witness Preparation",
        persona: "Litigation Partner, Antitrust · Cleary Gottlieb",
        question:
          "“Does the economic literature support the claim that the merger resulted in consumer harm through coordinated effects, and what will the opposing expert challenge?”",
        tags: ["Standard", "Legal integrity"],
        agents: [
          {
            name: "Cartographer",
            text: "Settled: coordinated effects theory is established antitrust doctrine with well-developed evidentiary standards (Merger Guidelines Section 7). Contested: whether the specific market structure in this case — four remaining competitors with asymmetric capacity — satisfies the conditions the literature identifies as conducive to coordination. Unknown: whether market transparency in this sector is sufficient to enable coordination without explicit communication.",
          },
          {
            name: "Methodologist",
            text: "Econometric concern: the plaintiff's expert uses a pricing correlation analysis that does not control for common cost shocks. In markets with shared input costs (relevant here: energy), price correlation is expected even absent coordination. This is a standard critique that defence experts routinely make and courts have accepted as sufficient to exclude correlation-based testimony under Daubert.",
          },
          {
            name: "Contrarian — Strong objection (Unresolved)",
            text: "“The communications record your expert reviewed was produced in the ordinary course. The privilege log indicates withheld communications between the acquiring firm and two competitors in the 90 days pre-announcement. Coordinated effects theory may be less relevant than the question of whether there is direct evidence of communication that was not produced. This changes the litigation theory.”",
          },
          {
            name: "Synthesizer",
            text: "Confidence: Probable that coordinated effects theory is applicable to the market structure. Contested whether current econometric evidence survives Daubert challenge. Gap on the withheld communications question, which is outside the evidentiary record available for deliberation.",
          },
        ],
        output: {
          items: [
            { key: "Finding", value: "Contested" },
            { key: "Guardian", value: "96% · Legal integrity" },
            { key: "Dissent flags", value: "1 Strong (Unresolved)" },
            { key: "Confidence", value: "47%" },
          ],
          noteLabel: "Unresolved objection",
          noteText:
            "“The withheld communications question is outside the deliberation record. If the privilege log indicates pre-announcement competitor communications were withheld, the litigation theory may need to shift from coordinated effects to direct evidence. This requires discovery motion, not expert testimony.”",
        },
      },
      {
        name: "The Contract Damages Quantification",
        persona: "Senior Associate, Commercial Litigation · Quinn Emanuel",
        question:
          "“What methodologies for lost profits quantification in software licence breach cases are most likely to survive Daubert scrutiny, and where is our damages expert most vulnerable?”",
        tags: ["Standard", "Legal integrity"],
        agents: [
          {
            name: "Cartographer",
            text: "Settled: lost profits damages in software licence cases require proof of causation, reasonable certainty, and foreseeability — standard across circuits. Contested: whether the before-and-after method or yardstick method produces more reliable estimates in SaaS markets with high customer churn — courts have accepted both but with different scrutiny standards. Unknown: whether the damages period should include the tail of revenue loss after contract termination, which varies by jurisdiction.",
          },
          {
            name: "Methodologist",
            text: "Vulnerability analysis: the before-and-after method used by current expert requires a clean pre-breach baseline. The defendant will argue the pre-breach period included an anomalous customer acquisition campaign that inflates the baseline. This argument succeeded in 'Oracle v. SAP' and the Ninth Circuit affirmed exclusion of expert testimony that did not address the baseline anomaly.",
          },
          {
            name: "Contrarian — Moderate objection",
            text: "“The Oracle/SAP comparison is imprecise. That case involved hardware bundling, not pure SaaS. The customer acquisition campaign in our baseline period involved no pricing anomaly — only volume. The defendant's anticipated baseline argument is factually distinguishable. The expert should address the distinction affirmatively rather than waiting for cross.”",
          },
          {
            name: "Pragmatist",
            text: "Two pre-trial actions: (1) Commission a supplemental expert declaration that explicitly distinguishes the Oracle/SAP baseline problem and explains why the acquisition campaign does not create the same anomaly. (2) Prepare a Daubert opposition brief that front-runs the baseline challenge rather than responding to it.",
          },
        ],
        output: {
          items: [
            { key: "Finding", value: "Probable" },
            { key: "Confidence", value: "61%" },
            { key: "Key vulnerability", value: "Baseline anomaly — anticipate Oracle/SAP attack" },
            { key: "Guardian", value: "94% · Legal integrity" },
          ],
          noteLabel: "Reopen condition",
          noteText:
            "“Defendant moves to exclude on Oracle/SAP baseline grounds. Supplemental declaration distinguishing the factual record should be prepared before motion practice.”",
        },
      },
      {
        name: "The Regulatory Enforcement Preview",
        persona: "Regulatory Counsel, Financial Services · Sullivan & Cromwell",
        question:
          "“Based on SEC enforcement patterns over the last five years, what is the realistic exposure profile for our client on the material non-public information question, and how is the current examiner likely to characterise the conduct?”",
        tags: ["Deep"],
        agents: [
          {
            name: "Cartographer",
            text: "Settled: the SEC has brought 23 MNPI enforcement actions in the asset management space since 2019, with settlement amounts ranging from $4M to $190M. Contested: whether the “mosaic theory” defence has become less reliable following the 'Raj Rajaratnam' appellate decisions — enforcement staff have signalled a narrower interpretation. Unknown: how the current exam team will weigh the contemporaneous documentation against the trading pattern.",
          },
          {
            name: "Methodologist",
            text: "Pattern analysis: in 18 of 23 recent actions, the SEC's primary evidence was trading timing relative to material announcement, not direct evidence of information receipt. The temporal correlation standard has been applied increasingly aggressively since 2022. Your client's trading window falls within the pattern the enforcement staff uses to establish the rebuttable presumption.",
          },
          {
            name: "Contrarian — Moderate objection",
            text: "“The pattern analysis overstates the risk. Of the 18 timing-based cases, 14 involved documented contact between the trader and a corporate insider. Your client's record shows no direct contact. The mosaic theory defence is weaker than it was, but the baseline for enforcement action in the absence of direct contact evidence is materially lower.”",
          },
          {
            name: "Synthesizer",
            text: "Confidence: Probable (61%) that the exam results in a Wells Notice if the trading window analysis is the primary evidence. Contested whether it results in a formal enforcement action without documented insider contact. Recommended posture: prepare a Wells submission that leads with the no-contact argument and addresses the timing correlation affirmatively.",
          },
        ],
        output: {
          items: [
            { key: "Finding", value: "Contested" },
            { key: "Wells Notice probability", value: "61%" },
            { key: "Key factor", value: "No documented insider contact" },
            { key: "Guardian", value: "97% · Legal integrity" },
          ],
          noteLabel: "Unresolved objection",
          noteText:
            "“The timing correlation standard has been applied aggressively since 2022, but 14 of 18 recent timing-based actions had documented insider contact. Without direct contact evidence, enforcement action probability drops materially. The Wells submission should lead with this distinction.”",
        },
      },
    ],
  },
  {
    slug: "venture-capital",
    vertical: "Venture capital + PE",
    shortName: "Venture capital",
    metaTitle: "Technical Due Diligence & TAM Validation Examples | Augle",
    metaDescription:
      "Example Augle sessions for VC and PE — technical due diligence, market sizing validation, and portfolio stress testing.",
    heroBody:
      "How Augle's multi-agent ensemble serves venture partners, growth equity principals, and PE directors — from technical diligence to covenant stress testing. Each session shows how structured deliberation finds what management presentations obscure: benchmark mismatches, fragile assumptions, and probability ranges that point estimates hide.",
    heroLinks: [
      "Investment partners stress-testing technical claims before term sheet",
      "Growth equity teams validating TAM assumptions against what the evidence actually supports",
      "PE directors mapping covenant breach probability with historical base rates",
      "Diligence teams surfacing the assumptions that will determine whether a deal works",
    ],
    guardianMode: "Academic & Financial integrity",
    commonOutputs: [
      "Assumption fragility maps",
      "probability ranges",
      "benchmark validity assessments",
    ],
    solutionsPageDesc:
      "The full solutions page for this vertical — problem framing, configuration panel, and why Augle for investment research.",
    relatedHubs: [
      {
        name: "Research labs hub",
        desc: "Technical diligence and technology readiness assessment — adjacent workflows for deep tech and life sciences investments.",
        href: "/use-cases/research-labs",
      },
      {
        name: "Financial services hub",
        desc: "Market structure analysis and regulatory exposure mapping — adjacent workflows for financial sector investments.",
        href: "/use-cases/financial-services",
      },
    ],
    sessions: [
      {
        name: "The Technical Due Diligence",
        persona: "Partner, Deep Tech · Sequoia Capital",
        question:
          "“Does the evidence support the founding team's claims about their photonic computing chip achieving commercially relevant inference throughput at competitive power efficiency?”",
        tags: ["Deep"],
        agents: [
          {
            name: "Cartographer",
            text: "Settled: photonic computing offers theoretical advantages in matrix multiplication operations relevant to AI inference, principally lower energy per operation at scale. Contested: whether any current photonic chip achieves these advantages outside laboratory conditions at commercially relevant precision levels. Unknown: scalability of photonic interconnects beyond single-chip demonstrations; yield rates in commercial silicon photonics fabrication.",
          },
          {
            name: "Methodologist",
            text: "Claims analysis: the company's benchmark figures use INT8 precision. Competitive AI accelerators (NVIDIA H100, AMD MI300X) are benchmarked at FP16/BF16. Comparing INT8 photonic throughput to FP16 GPU throughput produces an inflated efficiency ratio. The honest comparison requires matched precision benchmarking that has not been published. This is not a minor methodology difference — it changes the headline efficiency claim by approximately 4×.",
          },
          {
            name: "Contrarian — Strong objection (Unresolved)",
            text: "“The precision mismatch is the core diligence finding, but there's a second problem: the demo environment was a single-tenant rack with no PCIe bandwidth constraint. Real inference workloads are memory-bandwidth-bound at the host interface. The photonic advantage disappears entirely when host memory bandwidth becomes the bottleneck. No published study has characterised photonic inference throughput in a memory-bandwidth-constrained production environment.”",
          },
          {
            name: "Synthesizer",
            text: "Confidence: Contested that commercial claims are supported by published evidence. Gap on memory-bandwidth-constrained production performance. Diligence recommendation: require matched-precision third-party benchmarking in a production-representative environment before term sheet.",
          },
        ],
        output: {
          items: [
            { key: "Finding", value: "Contested" },
            { key: "Confidence", value: "28%" },
            { key: "Key gap", value: "No matched-precision production benchmark exists" },
            { key: "Guardian", value: "93% · Academic integrity" },
          ],
          noteLabel: "Unresolved objection",
          noteText:
            "“Photonic advantage disappears in memory-bandwidth-constrained environments. No study has characterised production inference throughput under real host memory constraints. The demo environment was a single-tenant rack — not representative of production deployment.”",
        },
      },
      {
        name: "The Market Sizing Validation",
        persona: "Principal, Growth Equity · General Atlantic",
        question:
          "“Is the TAM claim of $47B for AI-enabled clinical documentation software by 2029 defensible, and what are the key assumptions that would have to fail for the projection to be wrong?”",
        tags: ["Standard"],
        agents: [
          {
            name: "Cartographer",
            text: "Settled: the clinical documentation software market (EHR-adjacent) is approximately $8–12B annually in 2024. Contested: the AI-enabled penetration rate and pricing premium assumptions that drive the $47B figure — vendor projections in this space have historically overestimated AI adoption rates by 3–5 years. Unknown: whether reimbursement policy will evolve to support AI documentation tools or whether payers will treat AI-generated notes as equivalent to human-generated notes.",
          },
          {
            name: "Methodologist",
            text: "Projection methodology: the company's TAM was built bottom-up from per-physician pricing × physician count × penetration rate. The penetration rate assumption (68% by 2029) has no historical analogue in healthcare software. The fastest healthcare software category adoption on record is electronic prescribing, which reached 68% penetration in 11 years from regulatory mandate. AI documentation has no regulatory mandate.",
          },
          {
            name: "Contrarian — Moderate objection",
            text: "“The ePrescribing comparison understates AI documentation momentum because EHR fatigue is a documented physician crisis that creates demand-pull without regulatory mandate. The 68% penetration assumption may be optimistic, but the directional case for rapid adoption is stronger than the historical analogy suggests. The question is whether the price point holds — the TAM assumption uses $180/physician/month, which is 3× current EHR add-on pricing.”",
          },
          {
            name: "Pragmatist",
            text: "Diligence focus: the price point assumption is more fragile than the penetration assumption. Model sensitivity: at $60/physician/month (current add-on comp), TAM is $16B at 68% penetration — still a large market but changes the return model. Request bottoms-up pricing analysis with customer willingness-to-pay data before closing.",
          },
        ],
        output: {
          items: [
            { key: "Finding", value: "Contested" },
            { key: "TAM confidence", value: "Low — key assumption fragility" },
            { key: "Most fragile assumption", value: "$180/physician/month price point" },
            { key: "Guardian", value: "90% · Financial integrity" },
          ],
          noteLabel: "Reopen condition",
          noteText:
            "“Customer willingness-to-pay survey with ≥200 physician respondents across at least three health system types, with pricing elasticity analysis at $60, $120, and $180/month price points.”",
        },
      },
      {
        name: "The Portfolio Company Stress Test",
        persona: "Managing Director, PE · Apollo Global Management",
        question:
          "“Given rising interest rates and the current covenant structure, what does the evidence on leveraged buyout refinancing outcomes suggest about our probability of covenant breach in the next 18 months?”",
        tags: ["Deep"],
        agents: [
          {
            name: "Cartographer",
            text: "Settled: LBO covenant breach rates correlate strongly with EBITDA-to-interest coverage ratios and are predictable from public capital markets data. Contested: the degree to which current credit market conditions (elevated base rates, tightened spreads) will propagate into covenant stress for 2021–2022 vintage deals. Unknown: whether Fed rate trajectory will provide sufficient relief to extend runway for deals with 2025–2026 covenant reset dates.",
          },
          {
            name: "Methodologist",
            text: "Historical base rates: in the 2008–2009 cycle, LBO covenant breach rates for deals with coverage ratios below 1.5× reached 34% within 18 months of the rate shock onset. Current portfolio company has 1.6× coverage. Base rate breach probability at this coverage level in comparable cycles: approximately 22%. If EBITDA deteriorates 10% (within forecast range), coverage drops to 1.44× and breach probability rises to 31%.",
          },
          {
            name: "Contrarian — Moderate objection",
            text: "“The 2008–2009 base rates are the wrong comparison class. That cycle involved a credit freeze that eliminated refinancing options entirely. Current credit markets remain open to refinancing for investment-grade-adjacent credits. The relevant base rate is 2015–2016 energy sector stress, where companies with 1.5–1.7× coverage breached at approximately 14% with active management. The portfolio company has refinancing options that the 2008 comps did not.”",
          },
          {
            name: "Synthesizer",
            text: "Confidence: 22–31% breach probability range under base and downside EBITDA scenarios using 2008 comps; 14–20% using 2015 energy comps. Recommend: run both scenarios in board materials and present as a range rather than a point estimate. Active refinancing pursuit is warranted regardless of which base rate is correct.",
          },
        ],
        output: {
          items: [
            { key: "Finding", value: "Contested" },
            { key: "Breach probability", value: "14–31% depending on base rate" },
            { key: "Key variable", value: "EBITDA trajectory + refinancing availability" },
            { key: "Guardian", value: "95% · Financial integrity" },
          ],
          noteLabel: "Unresolved objection",
          noteText:
            "“The choice of 2008 vs. 2015 comparison class drives a 2× difference in breach probability. The 2015 energy sector comps may be more appropriate given open credit markets, but this assumption should be validated with the credit team before board presentation.”",
        },
      },
    ],
  },
  {
    slug: "think-tanks",
    vertical: "Think tanks + nonprofits",
    shortName: "Think tanks",
    hubLabel: "Think tanks",
    metaTitle: "Pre-Publication Evidence Review Examples | Augle",
    metaDescription:
      "Example Augle sessions for think tanks and nonprofits — pre-publication evidence review, advocacy stress-testing, and grant panel evaluation.",
    heroBody:
      "How Augle's multi-agent ensemble serves senior fellows, policy directors, and programme officers — from pre-publication evidence review to grant evaluation panels. Each session shows how structured deliberation finds the arguments that will be made against your position before your opponents make them.",
    heroLinks: [
      "Senior fellows reviewing the evidence base before submitting working papers to peer review",
      "Policy directors stress-testing advocacy positions against the strongest counter-arguments",
      "Programme officers evaluating grant proposals with explicit evidentiary grounding",
      "Research directors identifying the assumptions that could undermine a published position",
    ],
    guardianMode: "Academic & Editorial integrity",
    commonOutputs: [
      "Peer review objection previews",
      "advocacy fragility assessments",
      "criterion-dependent rankings",
    ],
    solutionsPageDesc:
      "The full solutions page for this vertical — problem framing, configuration panel, and why Augle for policy research.",
    relatedHubs: [
      {
        name: "Universities + academia hub",
        desc: "Pre-publication stress testing and systematic review gap analysis — adjacent workflows for academic policy institutes.",
        href: "/use-cases/universities",
      },
      {
        name: "Policy + lawmakers hub",
        desc: "Legislative evidence standards and regulatory impact review — adjacent workflows for think tanks that advise government.",
        href: "/use-cases/policy",
      },
    ],
    sessions: [
      {
        name: "The Pre-Publication Evidence Review",
        persona: "Senior Fellow, Economic Policy · Brookings Institution",
        question:
          "“Does the evidence base support our working paper's claim that universal basic income pilots produce sustained labour market participation effects, and what will peer reviewers challenge?”",
        tags: ["Standard", "Academic integrity"],
        agents: [
          {
            name: "Cartographer",
            text: "Settled: UBI pilot studies consistently show no significant reduction in labour force participation in the short term (6–24 months) — this finding is robust across Finland, Stockton, and Kenya pilots. Contested: whether short-term participation effects predict long-term behaviour — no pilot has run longer than 3 years with full income replacement. Unknown: general equilibrium effects at full-scale implementation; pilot studies cannot capture price level or wage effects.",
          },
          {
            name: "Guardian SVS",
            text: "19 citations verified. One frequently cited Stockton pilot analysis is a preliminary report by the programme's own evaluation team, not an independent peer-reviewed study. Flagged Moderate — retained but disclosed as non-independent.",
          },
          {
            name: "Methodologist",
            text: "Construct validity concern: the paper claims “sustained” effects on labour market participation. The longest pilot in the citation base is 36 months (Finland). Defining 36-month effects as “sustained” requires an explicit argument about why this duration is sufficient — this argument is absent from the paper. Peer reviewers in this literature will identify it immediately.",
          },
          {
            name: "Contrarian — Strong objection (Unresolved)",
            text: "“The paper pools pilots across dramatically different income contexts: Stockton (California median income), Finland (Nordic welfare state), and Kenya (subsistence economy). Treating these as a unified evidentiary base for a claim about labour market participation conflates three different underlying phenomena. A peer reviewer in development economics will reject this on external validity grounds.”",
          },
        ],
        output: {
          items: [
            { key: "Finding", value: "Contested" },
            { key: "Guardian", value: "91% · Academic integrity" },
            { key: "Dissent flags", value: "1 Strong (Unresolved)" },
            { key: "Confidence", value: "39%" },
          ],
          noteLabel: "Unresolved objection",
          noteText:
            "“Pooling pilots across income contexts as a unified evidence base conflates three different phenomena. A development economics reviewer will reject the external validity of cross-context pooling. The paper needs to either restrict the claim to high-income contexts or run separate analyses by income context.”",
        },
      },
      {
        name: "The Advocacy Position Stress Test",
        persona: "Policy Director, Climate Advocacy · Environmental Defense Fund",
        question:
          "“Is our advocacy position that a $50/tonne carbon price is sufficient to achieve the 2030 emissions reduction targets defensible against the best counter-arguments?”",
        tags: ["Standard", "Editorial integrity"],
        agents: [
          {
            name: "Cartographer",
            text: "Settled: carbon pricing reduces emissions in sectors where substitution options exist — well-evidenced across EU ETS, British Columbia, and RGGI. Contested: the price level required for specific reduction targets varies widely across models ($40–250/tonne range for 40% reduction). Unknown: behavioural and political economy responses at price levels above current experience; no major economy has sustained carbon prices above $75/tonne.",
          },
          {
            name: "Methodologist",
            text: "Model dependency: the $50/tonne sufficiency claim is derived from a specific IAM (Integrated Assessment Model) with energy sector assumptions that are contested in the literature. Alternative models using higher baseline fossil fuel demand produce required prices of $80–120/tonne for the same target. The claim is sensitive to model selection in a way the advocacy document does not disclose.",
          },
          {
            name: "Contrarian — Moderate objection",
            text: "“The advocacy position is directionally correct but tactically fragile. Opponents will point to the model dependency and correctly argue that $50/tonne is not a consensus figure — it is the bottom of a contested range. Anchoring to a specific price that can be technically refuted hands opponents a credibility argument. The stronger position is to advocate for a carbon price mechanism with automatic adjustment rather than a specific price level.”",
          },
          {
            name: "Pragmatist",
            text: "Reframing recommendation: shift advocacy from a specific price point ($50/tonne) to a price pathway (starting at $30, escalating $15/year) with a defined sufficiency test (annual emissions inventory). This is technically stronger, harder to refute on model-dependency grounds, and reflects how effective carbon pricing has actually worked in practice.",
          },
        ],
        output: {
          items: [
            { key: "Finding", value: "Contested" },
            { key: "Confidence", value: "43%" },
            { key: "Key vulnerability", value: "Model-dependent price claim easily refuted" },
            { key: "Guardian", value: "89% · Editorial integrity" },
          ],
          noteLabel: "Reopen condition",
          noteText:
            "“Advocacy position updated to advocate for price pathway with automatic adjustment rather than specific price level, removing the model-dependency vulnerability.”",
        },
      },
      {
        name: "The Grant Evaluation Panel",
        persona: "Program Officer, Science & Technology · MacArthur Foundation",
        question:
          "“Among these three proposals for AI safety research, which represents the strongest evidence base for impact, and what are the most significant methodological weaknesses in each?”",
        tags: ["Deep", "Academic integrity"],
        agents: [
          {
            name: "Cartographer",
            text: "Settled: interpretability research (Proposal A) has produced measurable progress in understanding specific attention mechanisms in transformer models. Contested: whether mechanistic interpretability findings generalise to safety-relevant failure modes at scale — the scaling gap is an open empirical question. Gap: robustness research (Proposal B) and alignment formalisation (Proposal C) both lack empirical grounding in deployed systems.",
          },
          {
            name: "Methodologist",
            text: "Comparative assessment: Proposal A (interpretability) has the strongest near-term empirical tractability but the weakest connection to safety outcomes. Proposal B (robustness) has clear safety relevance but evaluation methodology relies on benchmark saturation that may not transfer to real adversarial conditions. Proposal C (alignment formalisation) is the most theoretically ambitious and the least falsifiable — success criteria are not operationalised.",
          },
          {
            name: "Contrarian — Moderate objection",
            text: "“The evaluation is comparing proposals on methodological quality when the foundation's actual mandate is impact on catastrophic risk reduction. Interpretability may be the most methodologically tractable, but if it is not on the pathway to preventing catastrophic failures, methodological quality is the wrong criterion. The ranking changes entirely if you evaluate by expected value of catastrophic risk reduction rather than by near-term empirical tractability.”",
          },
          {
            name: "Synthesizer",
            text: "Recommendation hierarchy depends on evaluation criterion: Near-term empirical tractability → Proposal A. Safety relevance by mechanism → Proposal B. Potential for field-defining impact → Proposal C. The foundation should make the criterion explicit before ranking. All three have material methodological weaknesses that should be addressed in grant conditions.",
          },
        ],
        output: {
          items: [
            { key: "Finding", value: "Gap" },
            { key: "Confidence", value: "31%" },
            { key: "Key issue", value: "Criterion choice changes the ranking entirely" },
            { key: "Guardian", value: "94% · Academic integrity" },
          ],
          noteLabel: "Unresolved objection",
          noteText:
            "“Evaluating by methodological quality vs. by expected catastrophic risk reduction produces a different proposal ranking. The foundation must make its evaluation criterion explicit before the panel can produce a defensible recommendation.”",
        },
      },
    ],
  },
  {
    slug: "enterprise",
    vertical: "Enterprise",
    shortName: "Enterprise",
    metaTitle: "Strategic Initiative & M&A Risk Review Examples | Augle",
    metaDescription:
      "Example Augle sessions for enterprise teams — strategic initiative review, M&A integration risk assessment, and operational benchmarking.",
    heroBody:
      "How Augle's multi-agent ensemble serves CSOs, corporate development teams, and operations leaders — from strategic initiative validation to M&A integration risk assessment. Each session shows how structured deliberation finds the assumption buried in the deck that changes the whole recommendation.",
    heroLinks: [
      "Chief strategy officers validating the assumptions in strategic initiative proposals",
      "Corporate development teams stress-testing synergy targets against empirical base rates",
      "Operations leaders benchmarking vendor claims against independently evidenced outcomes",
      "CFOs requiring evidence-graded analysis before major capital commitments",
    ],
    guardianMode: "Academic & Financial integrity",
    commonOutputs: [
      "Assumption fragility maps",
      "base rate comparisons",
      "vendor claim audits",
    ],
    solutionsPageDesc:
      "The full solutions page for this vertical — problem framing, configuration panel, and why Augle for enterprise decision-making.",
    relatedHubs: [
      {
        name: "Venture capital + PE hub",
        desc: "Due diligence and market sizing validation — adjacent workflows for corporate M&A and strategic investment teams.",
        href: "/use-cases/venture-capital",
      },
      {
        name: "Financial services hub",
        desc: "Regulatory and risk analysis for financial services enterprise teams — adjacent workflows for compliance and treasury functions.",
        href: "/use-cases/financial-services",
      },
    ],
    sessions: [
      {
        name: "The Strategic Initiative Review",
        persona: "Chief Strategy Officer · Fortune 100 Consumer Goods",
        question:
          "“Does the evidence support our hypothesis that direct-to-consumer channel expansion will improve gross margin by 8–12 points over three years, and what are the assumptions most likely to fail?”",
        tags: ["Deep"],
        agents: [
          {
            name: "Cartographer",
            text: "Settled: DTC channel expansion is associated with higher gross margin in CPG companies with strong brand equity (Nike, Levi's cases are well documented). Contested: whether margin improvement persists past the initial 18–24 months when customer acquisition costs are excluded from gross margin calculation — several DTC-first brands have reversed this assumption. Unknown: whether the margin advantage holds when DTC is an incremental channel added alongside wholesale, rather than a channel shift.",
          },
          {
            name: "Methodologist",
            text: "Calculation methodology concern: the 8–12 point margin improvement figure assumes customer acquisition costs (CAC) are classified as marketing expense, not COGS. If CAC is treated as a cost of sale — which is appropriate for subscription DTC models and is how several analysts now model it — the gross margin improvement is 3–5 points, not 8–12. The assumption is not flagged in the initiative brief.",
          },
          {
            name: "Contrarian — Strong objection (Unresolved)",
            text: "“The DTC cases cited (Nike, Levi's) both involve brand repositioning that preceded the channel shift — the margin improvement was partially a function of product mix change, not channel economics alone. This company's product mix is not changing. Applying margin improvement data from brand repositioning cases to a channel-only change will produce a systematically optimistic forecast.”",
          },
          {
            name: "Synthesizer",
            text: "Confidence: Probable that DTC expansion improves gross margin. Contested on the magnitude — 3–5 points is defensible; 8–12 points requires the CAC classification assumption and a brand repositioning effect that this initiative does not include. Recommendation: restate the initiative forecast with a 3–7 point range and make the CAC classification assumption explicit.",
          },
        ],
        output: {
          items: [
            { key: "Finding", value: "Contested" },
            { key: "Confidence", value: "44%" },
            { key: "Key assumption", value: "CAC classification drives 2–3× range in outcome" },
            { key: "Guardian", value: "91%" },
          ],
          noteLabel: "Unresolved objection",
          noteText:
            "“The margin cases cited involve brand repositioning, not channel-only shifts. This initiative does not include a product mix change. Applying repositioning-era margin data to a channel-only expansion will systematically overstate the outcome.”",
        },
      },
      {
        name: "The M&A Integration Risk Assessment",
        persona: "VP Corporate Development · Global Technology Company",
        question:
          "“What does the post-merger integration literature establish about the probability of achieving the stated $400M synergy target within 24 months, and where is the risk most concentrated?”",
        tags: ["Standard"],
        agents: [
          {
            name: "Cartographer",
            text: "Settled: PMI synergy realisation rates are well studied — McKinsey and BCG research consistently shows 40–60% of deals fail to achieve stated synergies within the projected timeframe. Contested: whether technology sector acquisitions perform better or worse than the cross-sector average — evidence is mixed, with enterprise software showing higher realisation rates but consumer tech showing lower. Unknown: the specific talent retention risk in this deal, which drives a disproportionate share of synergy assumptions.",
          },
          {
            name: "Methodologist",
            text: "Synergy composition analysis: the $400M breaks down as $180M cost synergies (facilities, headcount) and $220M revenue synergies (cross-sell). Historical data: cost synergies realise at approximately 80% of target within 24 months; revenue synergies realise at approximately 35% of target in the same window. Applied to this deal: expected realisation = ($180M × 0.80) + ($220M × 0.35) = $221M. The gap to target is $179M.",
          },
          {
            name: "Contrarian — Moderate objection",
            text: "“The base rate analysis is correct but the revenue synergy composition matters. The $220M includes $140M from product bundling (historically lower realisation) and $80M from geographic expansion (historically higher). Using disaggregated base rates: ($140M × 0.25) + ($80M × 0.55) = $79M revenue synergies. Total: $223M. The gap is the same, but the distribution of risk changes the integration priorities.”",
          },
          {
            name: "Pragmatist",
            text: "Two integration priorities based on disaggregated analysis: (1) Front-load geographic expansion synergies — highest probability of realisation, least integration complexity. (2) Treat product bundling synergies as a 36-month target, not 24-month — revise board reporting accordingly to avoid miss-vs.-target framing in Q6–Q8.",
          },
        ],
        output: {
          items: [
            { key: "Finding", value: "Contested" },
            { key: "Expected realisation", value: "~$221–223M vs. $400M target" },
            { key: "Highest risk", value: "Revenue synergies, esp. product bundling" },
            { key: "Guardian", value: "93%" },
          ],
          noteLabel: "Reopen condition",
          noteText:
            "“Board presentation updated to show disaggregated synergy realisation curves by category, with cost synergies on 24-month timeline and revenue synergies on 36-month timeline. Point estimate replaced with probability-weighted range.”",
        },
      },
      {
        name: "The Operational Excellence Benchmark",
        persona: "COO · Global Logistics Company",
        question:
          "“What does the evidence show about the operational leverage achievable from last-mile delivery route optimisation AI, and how do published efficiency gains compare to vendor claims?”",
        tags: ["Standard"],
        agents: [
          {
            name: "Cartographer",
            text: "Settled: route optimisation algorithms reduce average cost-per-delivery by 8–15% in controlled studies across multiple carriers. Contested: whether these gains are additive to existing logistics management systems or whether they partially overlap with efficiency gains already captured. Unknown: real-world performance in high-density urban environments with dynamic constraint changes (traffic, access restrictions, recipient availability).",
          },
          {
            name: "Guardian SVS",
            text: "14 citations reviewed. Three vendor white papers cited as independent evidence were produced by the same vendor group whose product is being evaluated. Flagged Critical — removed from evidence base. Without vendor white papers, independent peer-reviewed evidence supports 8–11% cost reduction, not the 15–22% in the proposal.",
          },
          {
            name: "Methodologist",
            text: "Additionality problem: the company has already deployed basic route optimisation (4 years prior). The vendor is claiming efficiency gains relative to an unoptimised baseline. The marginal improvement from state-of-the-art AI over existing optimisation is the relevant measure — literature on this specific comparison suggests 3–6% incremental improvement, not 8–15% from baseline.",
          },
          {
            name: "Contrarian — Moderate objection",
            text: "“The methodologist is correct on additionality, but 3–6% incremental improvement on a $2.4B annual delivery cost base is $72–144M. At a 3-year payback the investment is still justifiable even with the corrected estimate. The problem is not whether to invest — it is that the vendor's claims were evaluated against the wrong baseline, and the procurement team needs to renegotiate performance guarantees against the marginal improvement standard.”",
          },
        ],
        output: {
          items: [
            { key: "Finding", value: "Probable" },
            { key: "Independent evidence", value: "3–6% incremental (not 8–22% claimed)" },
            { key: "SVS flag", value: "Critical — vendor white papers removed" },
            { key: "Guardian", value: "92%" },
          ],
          noteLabel: "Reopen condition",
          noteText:
            "“Vendor performance guarantees renegotiated against marginal improvement baseline (vs. existing route optimisation system) rather than unoptimised baseline. Contract SLAs updated to reflect independently evidenced 3–6% improvement range.”",
        },
      },
    ],
  },
  {
    slug: "healthcare",
    vertical: "Healthcare + life sciences",
    shortName: "Healthcare",
    metaTitle: "Clinical Evidence & Trial Design Review Examples | Augle",
    metaDescription:
      "Example Augle sessions for healthcare teams — clinical evidence review, formulary decision briefing, and trial design review.",
    heroBody:
      "How Augle's multi-agent ensemble serves CMOs, pharmacy committees, and clinical development leaders — from technology adoption reviews to trial design validation. Each session shows how structured deliberation surfaces safety signals, evidence gaps, and protocol weaknesses before they become costly downstream problems.",
    heroLinks: [
      "CMOs evaluating clinical technology adoption against the full evidence base",
      "P&T committees grounding formulary decisions in methodology-graded evidence",
      "Clinical development teams stress-testing trial designs before FDA submission",
      "Medical directors preparing clinical policy with documented evidence standards",
    ],
    guardianMode: "Clinical integrity",
    commonOutputs: [
      "Safety signal flags",
      "protocol weakness assessments",
      "evidence gap registers",
    ],
    solutionsPageDesc:
      "The full solutions page for this vertical — problem framing, configuration panel, and why Augle for clinical research.",
    relatedHubs: [
      {
        name: "Research labs hub",
        desc: "Clinical evidence review and technology readiness assessment — adjacent workflows for life sciences R&D teams.",
        href: "/use-cases/research-labs",
      },
      {
        name: "Universities + academia hub",
        desc: "Pre-publication review and systematic review gap analysis — adjacent workflows for academic medical centres.",
        href: "/use-cases/universities",
      },
    ],
    sessions: [
      {
        name: "The Clinical Evidence Review",
        persona: "Chief Medical Officer · Regional Health System",
        question:
          "“Does the published evidence support adopting AI-assisted colonoscopy detection as standard of care, and what are the unresolved safety and efficacy questions before system-wide rollout?”",
        tags: ["Deep", "Clinical integrity"],
        agents: [
          {
            name: "Cartographer",
            text: "Settled: AI-assisted colonoscopy (CADe) significantly increases adenoma detection rate (ADR) — meta-analyses show 10–15 percentage point ADR improvement. Contested: whether increased ADR translates to reduced colorectal cancer incidence — this requires longer-term follow-up data not yet available. Unknown: whether ADR improvement represents true cancer prevention or detection of clinically insignificant lesions (the overdiagnosis question).",
          },
          {
            name: "Methodologist",
            text: "Surrogate endpoint problem: all major CADe trials use ADR as the primary endpoint. ADR is a validated surrogate for colonoscopy quality but not a direct measure of cancer prevention. The FDA approved CADe devices based on ADR improvement alone. Whether ADR improvement from AI assistance confers the same cancer prevention benefit as ADR improvement from other quality interventions is not established.",
          },
          {
            name: "Contrarian — Strong objection (Unresolved)",
            text: "“The overdiagnosis risk is being systematically underdiscussed. AI detection is optimised for sensitivity, not specificity. Increased ADR from AI assistance includes a disproportionate increase in detection of diminutive lesions (<5mm) whose malignant potential is low and whose removal carries procedural risk. One health system that adopted CADe system-wide saw post-polypectomy bleeding rates increase 23% without a corresponding reduction in interval cancers.”",
          },
          {
            name: "Synthesizer",
            text: "Confidence: Probable that CADe improves ADR. Contested whether ADR improvement prevents cancer at population scale. Gap on overdiagnosis and diminutive lesion removal risk. Clinical recommendation: pilot with post-polypectomy complication monitoring and 3-year interval cancer tracking before system-wide rollout.",
          },
        ],
        output: {
          items: [
            { key: "Finding", value: "Contested" },
            { key: "Guardian", value: "97% · Clinical integrity" },
            { key: "Dissent flags", value: "1 Strong (Unresolved)" },
            { key: "Confidence", value: "41%" },
          ],
          noteLabel: "Unresolved objection",
          noteText:
            "“AI detection optimised for sensitivity increases detection of diminutive lesions with low malignant potential. One health system saw post-polypectomy bleeding increase 23% without reduced interval cancers after system-wide CADe adoption. This safety signal requires prospective monitoring before rollout.”",
        },
      },
      {
        name: "The Formulary Decision Brief",
        persona: "Pharmacy & Therapeutics Committee · Academic Medical Centre",
        question:
          "“What does the evidence base establish about the comparative effectiveness of GLP-1 agonists vs. bariatric surgery for long-term weight maintenance in patients with BMI 35–40, and what does the formulary decision need to account for?”",
        tags: ["Standard", "Clinical integrity"],
        agents: [
          {
            name: "Cartographer",
            text: "Settled: both GLP-1 agonists (semaglutide 2.4mg) and bariatric surgery produce substantial weight loss at 1 year. Contested: long-term (5-year+) weight maintenance comparison — surgery data extends to 10 years; GLP-1 data extends only to 4 years. Unknown: whether GLP-1 agonist efficacy is sustained if medication is discontinued; available discontinuation data shows significant weight regain.",
          },
          {
            name: "Methodologist",
            text: "Comparison validity: head-to-head RCT data comparing GLP-1 to surgery does not exist. Available evidence is observational or indirect comparison. The populations in surgery trials and GLP-1 trials differ systematically in comorbidity burden, which confounds any indirect comparison. A formulary decision that treats indirect comparison evidence as equivalent to RCT evidence will be methodologically contested.",
          },
          {
            name: "Contrarian — Moderate objection",
            text: "“The discontinuation data is the critical factor the committee is not fully weighing. If GLP-1 therapy requires indefinite continuation to maintain effect — which the current evidence suggests — the formulary decision is not a one-time cost comparison. It is a commitment to indefinite high-cost medication for a chronic condition. The lifetime cost comparison changes the recommendation entirely.”",
          },
          {
            name: "Pragmatist",
            text: "Formulary framing: present this as a treatment pathway decision, not a cost comparison. For BMI 35–40 without metabolic comorbidity: GLP-1 trial with explicit discontinuation protocol. For BMI 35–40 with comorbidity (T2D, hypertension): surgery referral pathway with GLP-1 as bridge. Document decision criteria explicitly so the P&T committee can revisit when 5-year GLP-1 maintenance data is available.",
          },
        ],
        output: {
          items: [
            { key: "Finding", value: "Contested" },
            { key: "Confidence", value: "46%" },
            { key: "Key gap", value: "No head-to-head RCT — indirect comparison only" },
            { key: "Guardian", value: "96% · Clinical integrity" },
          ],
          noteLabel: "Reopen condition",
          noteText:
            "“5-year GLP-1 maintenance data with discontinuation arm available. At that point the formulary decision can be grounded in matched-duration outcome comparison rather than indirect evidence.”",
        },
      },
      {
        name: "The Trial Design Review",
        persona: "VP Clinical Development · Mid-size Biotech",
        question:
          "“Does the proposed adaptive trial design for our Phase 2b oncology study meet the evidentiary standards that FDA will require for accelerated approval consideration, and where are the protocol weaknesses?”",
        tags: ["Deep", "Clinical integrity"],
        agents: [
          {
            name: "Cartographer",
            text: "Settled: FDA has approved adaptive designs for oncology trials and published guidance on acceptable interim analysis frameworks (2019 guidance). Contested: whether the specific response rate threshold used as the adaptive interim decision rule meets the Type I error control standard FDA has applied in recent complete response letters. Unknown: whether the proposed biomarker endpoint will be accepted as a primary endpoint or relegated to secondary given the current oncology endpoint precedent.",
          },
          {
            name: "Methodologist",
            text: "Type I error inflation risk: the proposed design uses three interim analyses with alpha spending allocated equally across interim looks. FDA's recent feedback in analogous trials has indicated preference for O'Brien-Fleming or Lan-DeMets alpha spending, not equal allocation. Equal allocation inflates Type I error at early interim analyses when sample sizes are small. This is a protocol weakness that will appear in FDA pre-submission feedback.",
          },
          {
            name: "Contrarian — Strong objection (Unresolved)",
            text: "“The biomarker endpoint is the higher-priority problem. The proposed primary endpoint (biomarker response rate at 12 weeks) is not an established surrogate for overall survival in this indication. FDA has accepted this biomarker as secondary in three recent approvals but has not accepted it as a primary endpoint for accelerated approval in any oncology programme in this tumour type. This needs a pre-IND meeting to resolve before the design is finalised.”",
          },
          {
            name: "Synthesizer",
            text: "Protocol strength: adaptive design is generally sound. Two pre-submission requirements: (1) switch to O'Brien-Fleming alpha spending or provide statistical justification for equal allocation. (2) Request pre-IND meeting specifically on biomarker endpoint acceptability as primary before finalising the SAP.",
          },
        ],
        output: {
          items: [
            { key: "Finding", value: "Contested" },
            { key: "Guardian", value: "98% · Clinical integrity" },
            { key: "Dissent flags", value: "1 Strong (Unresolved)" },
            { key: "Pre-IND meeting required", value: "Biomarker endpoint acceptability" },
          ],
          noteLabel: "Unresolved objection",
          noteText:
            "“FDA has not accepted the proposed biomarker as a primary endpoint for accelerated approval in this tumour type. This requires pre-IND meeting resolution before the statistical analysis plan is finalised. Proceeding without FDA feedback on this point risks a complete response letter on the primary endpoint.”",
        },
      },
    ],
  },
  {
    slug: "government",
    vertical: "Government",
    shortName: "Government",
    solutionsPageName: "Government + public sector",
    metaTitle: "Programme Evaluation & Procurement Risk Examples | Augle",
    metaDescription:
      "Example Augle sessions for government agencies — programme evaluation, procurement risk assessment, and inter-agency intelligence briefing.",
    heroBody:
      "How Augle's multi-agent ensemble serves agency deputies, procurement officers, and intelligence analysts — from programme reauthorisation to procurement risk. Each session shows how structured deliberation produces the kind of evidence-graded analysis that government decision-making requires but rarely gets.",
    heroLinks: [
      "Agency deputies stress-testing programme evidence before reauthorisation hearings",
      "Procurement officers mapping IT delivery risk against empirical base rates",
      "Intelligence analysts identifying epistemic limitations in current assessments",
      "Policy executives requiring documented evidence standards for major decisions",
    ],
    guardianMode: "Editorial integrity",
    commonOutputs: [
      "Programme design gap assessments",
      "base rate calibrations",
      "epistemic limitation flags",
    ],
    solutionsPageDesc:
      "The full solutions page for this vertical — problem framing, configuration panel, and why Augle for public sector analysis.",
    relatedHubs: [
      {
        name: "Policy + lawmakers hub",
        desc: "Legislative evidence review and regulatory impact analysis — adjacent workflows for executive branch teams interfacing with Congress.",
        href: "/use-cases/policy",
      },
      {
        name: "Think tanks + nonprofits hub",
        desc: "Pre-publication review and advocacy position stress-testing for government-adjacent research organisations.",
        href: "/use-cases/think-tanks",
      },
    ],
    sessions: [
      {
        name: "The Programme Evaluation Brief",
        persona: "Deputy Secretary, Department of Labour",
        question:
          "“What does the evidence base establish about the effectiveness of apprenticeship programmes in improving long-term earnings outcomes for participants, and does the current programme design match what the literature shows works?”",
        tags: ["Standard", "Editorial integrity"],
        agents: [
          {
            name: "Cartographer",
            text: "Settled: registered apprenticeship programmes in the US produce average earnings premiums of 40–70% above control groups in the first five years post-completion (Mathematica, 2018; Urban Institute, 2021). Contested: whether earnings premiums persist beyond 10 years or whether they reflect selection effects rather than programme causality — no RCT evidence exists; all studies are quasi-experimental. Unknown: which programme design features (duration, employer ratio, credential type) drive the earnings premium.",
          },
          {
            name: "Methodologist",
            text: "Selection bias concern: quasi-experimental designs in this literature use comparison groups of workers who applied to apprenticeships but were not accepted. This comparison group may differ systematically from participants on unobservable motivation and employer quality dimensions. The earnings premium estimate could partially reflect employer quality selection rather than human capital development. No instrumental variable study has cleanly resolved this.",
          },
          {
            name: "Contrarian — Moderate objection",
            text: "“The current programme design has a 3:1 employer ratio (3 apprentices per journeyperson mentor). The literature on mentorship quality in apprenticeship outcomes consistently identifies 1:1 or 2:1 ratios as the threshold above which outcome quality declines. The programme is operating above this threshold in 60% of registered sites. The design does not match what the literature shows works.”",
          },
          {
            name: "Synthesizer",
            text: "Confidence: Probable that the programme produces positive earnings outcomes. Contested on magnitude due to selection bias. Gap on design feature evidence. Programme recommendation: commission a randomised expansion study with design feature variation to establish causal mechanism before the next reauthorisation cycle.",
          },
        ],
        output: {
          items: [
            { key: "Finding", value: "Probable" },
            { key: "Confidence", value: "58%" },
            { key: "Design gap", value: "Employer ratio exceeds literature threshold at 60% of sites" },
            { key: "Guardian", value: "90% · Editorial integrity" },
          ],
          noteLabel: "Unresolved objection",
          noteText:
            "“The programme operates above the 2:1 mentor ratio threshold that the mentorship quality literature identifies as the quality inflection point. 60% of registered sites are above this threshold. The programme design does not match what the evidence shows works.”",
        },
      },
      {
        name: "The Procurement Risk Assessment",
        persona: "Chief Procurement Officer, Department of Defense",
        question:
          "“What does the evidence on large-scale government IT procurement outcomes show about the probability of on-time, on-budget delivery for a cloud migration programme of this scale, and where is risk most concentrated?”",
        tags: ["Standard"],
        agents: [
          {
            name: "Cartographer",
            text: "Settled: large-scale government IT programmes (>$500M) have well-documented failure rates. GAO data: 80% of large IT programmes exceed original cost estimates; 40% exceed by more than 50%. Contested: whether cloud-native migration programmes perform better than legacy modernisation — limited government-specific data; commercial sector data shows better outcomes but government regulatory and security constraints are materially different. Unknown: contractor performance at this specific scale with the proposed hybrid multi-cloud architecture.",
          },
          {
            name: "Methodologist",
            text: "Base rate calibration: the $2.1B programme falls in the >$1B government IT category. GAO historical data for this category: 23% delivered on time and on budget; 47% delivered with >50% cost overrun; 30% cancelled or restructured. Applying base rates, expected cost at completion: $2.8–3.4B. Expected timeline: 18–36 months beyond current projection.",
          },
          {
            name: "Contrarian — Moderate objection",
            text: "“The GAO base rates pool programmes across agencies with very different procurement maturity. DoD has significantly improved IT procurement outcomes since the establishment of the JEDI/JWCC contracting vehicles. DoD-specific base rates for cloud programmes post-2020 are better than the GAO aggregate. Using the aggregate overstates the risk for a programme with this contracting structure.”",
          },
          {
            name: "Pragmatist",
            text: "Three risk concentration points based on programme-specific analysis: (1) Requirements lock — 60% of DoD IT overruns originate from requirements changes after contract award. (2) Contractor concentration — single prime contractor model creates single point of failure. (3) Security clearance pipeline — cleared personnel bottleneck is the leading cause of schedule slippage. Address all three in programme governance before contract award.",
          },
        ],
        output: {
          items: [
            { key: "Finding", value: "Contested" },
            { key: "Base rate delivery", value: "23% on-time, on-budget" },
            { key: "Expected overrun", value: "$700M–$1.3B above target" },
            { key: "Guardian", value: "94%" },
          ],
          noteLabel: "Reopen condition",
          noteText:
            "“DoD-specific post-2020 cloud programme base rates compiled and substituted for GAO aggregate. Risk concentration assessment updated with programme-specific requirements lock and clearance pipeline analysis.”",
        },
      },
      {
        name: "The Inter-Agency Intelligence Brief",
        persona: "Senior Analyst, National Security Council",
        question:
          "“What does the open-source evidence establish about the state of adversary AI compute acquisition and what are the key uncertainties in the current intelligence assessment?”",
        tags: ["Deep", "Editorial integrity"],
        agents: [
          {
            name: "Cartographer",
            text: "Settled: export controls enacted 2022–2024 have measurably slowed adversary access to leading-edge GPU hardware (A100/H100 class). Contested: whether the slowdown is temporary (before domestic fab capacity comes online) or persistent. Unknown: the actual computing capacity currently deployed for adversary AI development — open-source indicators are a partial and potentially lagging signal.",
          },
          {
            name: "Methodologist",
            text: "Indicator reliability: the current assessment relies on three open-source indicator categories: (1) research publication citations of specific compute resources, (2) satellite imagery of data centre construction, and (3) semiconductor import partner data. Each has known limitations. Research citations undercount classified and non-published work. Satellite imagery has 6–9 month latency on construction-to-operational timelines. Import data captures official channels, not grey market.",
          },
          {
            name: "Contrarian — Strong objection (Unresolved)",
            text: "“The assessment treats the three indicator categories as independent, but they are correlated — a grey market acquisition strategy would specifically avoid all three detection methods simultaneously. The absence of signal in all three channels is consistent with both low capability and sophisticated evasion. The assessment cannot distinguish between these hypotheses on open-source evidence alone, and should explicitly state this limitation rather than presenting a point estimate.”",
          },
          {
            name: "Synthesizer",
            text: "Confidence: Contested. Assessment should be presented as a range with explicit uncertainty bounds rather than a point estimate. The three-indicator methodology cannot distinguish low capability from sophisticated evasion at current signal strength. Recommendation: flag this epistemic limitation explicitly in the NSC brief and recommend augmented collection to resolve the ambiguity.",
          },
        ],
        output: {
          items: [
            { key: "Finding", value: "Contested" },
            { key: "Confidence", value: "Low — evasion vs. low capability ambiguity" },
            { key: "Dissent flags", value: "1 Strong (Unresolved)" },
            { key: "Guardian", value: "96% · Editorial integrity" },
          ],
          noteLabel: "Unresolved objection",
          noteText:
            "“Absence of signal across all three indicator categories is consistent with both low capability and sophisticated evasion. The assessment cannot distinguish between these hypotheses on open-source evidence alone. This epistemic limitation must be explicitly stated in the NSC brief.”",
        },
      },
    ],
  },
  {
    slug: "financial-services",
    vertical: "Financial services",
    shortName: "Financial services",
    metaTitle: "Credit Risk Model Validation Examples | Augle",
    metaDescription:
      "Example Augle sessions for financial services — credit risk model validation, rates strategy review, and compliance risk briefing.",
    heroBody:
      "How Augle's multi-agent ensemble serves CROs, portfolio managers, and compliance officers — from credit model validation to exam probability estimation. Each session shows how structured deliberation produces the evidence-graded analysis that regulatory environments demand and conventional review processes rarely achieve.",
    heroLinks: [
      "Chief risk officers validating model assumptions against the full empirical literature",
      "Portfolio managers calibrating positioning against historical base rates with explicit uncertainty bounds",
      "Compliance officers mapping examination probability against documented regulatory signals",
      "Risk committees requiring evidence-graded analysis before material decisions",
    ],
    guardianMode: "Financial integrity",
    commonOutputs: [
      "Model validity assessments",
      "probability-calibrated positioning",
      "exam risk estimates",
    ],
    solutionsPageDesc:
      "The full solutions page for this vertical — problem framing, configuration panel, and why Augle for financial analysis.",
    relatedHubs: [
      {
        name: "Venture capital + PE hub",
        desc: "Investment diligence and portfolio risk assessment — adjacent workflows for asset management and PE teams.",
        href: "/use-cases/venture-capital",
      },
      {
        name: "Law firms hub",
        desc: "Regulatory enforcement exposure analysis and litigation probability — adjacent workflows for financial services legal teams.",
        href: "/use-cases/law-firms",
      },
    ],
    sessions: [
      {
        name: "The Credit Risk Model Validation",
        persona: "Chief Risk Officer · Regional Bank",
        question:
          "“Does the evidence support the assumption that the incumbent credit scoring model maintains predictive validity in the current macroeconomic environment, and where are the model's blind spots?”",
        tags: ["Deep", "Financial integrity"],
        agents: [
          {
            name: "Cartographer",
            text: "Settled: FICO-based credit scoring models trained on 2010–2019 data have demonstrated performance degradation in 2020–2024 across multiple published validation studies (NY Fed, OFR). Contested: the magnitude of degradation — studies range from marginal AUC reduction to 15+ point Gini decline. Unknown: whether performance degradation reflects macroeconomic regime change (ZIRP to high-rate environment) or pandemic-specific data anomalies that will self-correct.",
          },
          {
            name: "Methodologist",
            text: "Temporal sampling problem: the model was trained in a prolonged low-rate, low-default environment. Consumer behaviour in high-rate environments (debt service ratio management, strategic default decisions) is governed by different factors than low-rate behaviour. A model trained on 2010–2019 data has never seen a consumer population making decisions under 7%+ mortgage rates and 22%+ revolving credit rates simultaneously.",
          },
          {
            name: "Contrarian — Strong objection (Unresolved)",
            text: "“The validation studies you're citing measure model performance on the existing approved portfolio. They cannot measure performance on the counterfactual declined population. If the model has been systematically declining creditworthy borrowers in the new rate environment — which a regime change argument implies — your actual loss rates look better than the model deserves credit for. The model may be generating phantom accuracy by denying credit at scale.”",
          },
          {
            name: "Synthesizer",
            text: "Confidence: Contested on model validity. The phantom accuracy objection is methodologically serious and unresolved. Recommendation: commission a reject inference study using a random sample of declined applications approved for monitoring purposes before next regulatory model validation.",
          },
        ],
        output: {
          items: [
            { key: "Finding", value: "Contested" },
            { key: "Guardian", value: "95% · Financial integrity" },
            { key: "Dissent flags", value: "1 Strong (Unresolved)" },
            { key: "Confidence", value: "34%" },
          ],
          noteLabel: "Unresolved objection",
          noteText:
            "“Validation on approved portfolios cannot detect systematic miscalibration in the declined population. The model may be generating phantom accuracy by declining creditworthy borrowers at scale in the new rate environment. Reject inference study required before next regulatory validation.”",
        },
      },
      {
        name: "The Rates Strategy Review",
        persona: "Head of Fixed Income, Asset Management · PIMCO",
        question:
          "“What does the historical evidence on Fed pivot cycles establish about forward curve accuracy at 18 months, and how should this inform our current positioning?”",
        tags: ["Deep"],
        agents: [
          {
            name: "Cartographer",
            text: "Settled: forward curves systematically overestimate the persistence of rate levels at the peak of hiking cycles — documented across 1994, 2000, 2006, and 2019 cycles. Contested: whether the current cycle (2022–present) will follow the same pattern given fiscal dominance dynamics not present in prior cycles. Unknown: the degree to which AI productivity gains will affect neutral rate estimates and therefore the magnitude of the eventual pivot.",
          },
          {
            name: "Methodologist",
            text: "Forecasting accuracy calibration: across the four documented peak cycles, 18-month forward curves overestimated the terminal rate by an average of 180 basis points. Applied to current pricing: if the pattern holds, the market is pricing in 180bps too much persistence. The Contrarian should be asked specifically whether fiscal dominance changes this calibration.",
          },
          {
            name: "Contrarian — Moderate objection",
            text: "“The 180bps historical overshoot is a useful prior but the fiscal dominance argument is material. In all four prior cycles, fiscal deficits were smaller at cycle peak (<3% GDP). Current deficit is 6.5% GDP. The academic literature on fiscal dominance suggests this level of deficit monetisation reduces the Fed's effective independence on the way down — pivots happen later and are shallower. The historical calibration should be discounted by at least 50%.”",
          },
          {
            name: "Synthesizer",
            text: "Calibration: historical prior suggests 18-month forward curve overstates by ~180bps. Fiscal dominance discount suggested by Contrarian: 50%. Probability-weighted adjustment: ~90bps. Current positioning implication: duration extension is warranted but less aggressive than pure historical base rates suggest. Present as a range (60–120bps adjustment) given model uncertainty.",
          },
        ],
        output: {
          items: [
            { key: "Finding", value: "Contested" },
            { key: "Historical bias", value: "180bps forward curve overestimate at cycle peak" },
            { key: "Fiscal discount", value: "~50% per Contrarian — contested" },
            { key: "Guardian", value: "93% · Financial integrity" },
          ],
          noteLabel: "Reopen condition",
          noteText:
            "“Published empirical study on forward curve accuracy at 18 months in high-deficit (>5% GDP) rate peak environments. Current evidence base does not include a direct analogue to the current fiscal context.”",
        },
      },
      {
        name: "The Compliance Risk Brief",
        persona: "Chief Compliance Officer · Global Investment Bank",
        question:
          "“Based on current regulatory signals, what is the probability that our current AI-assisted trading surveillance programme will face a material exam finding in the next 18 months?”",
        tags: ["Standard", "Financial integrity"],
        agents: [
          {
            name: "Cartographer",
            text: "Settled: SEC and FINRA have both issued exam priorities letters (2024, 2025) explicitly flagging AI-assisted surveillance as an examination focus. Contested: whether the exam focus will result in formal findings or serve primarily as an industry signal. Unknown: what specific documentation and model governance standards examiners will apply — no formal rulemaking has been completed.",
          },
          {
            name: "Methodologist",
            text: "Regulatory signal analysis: in the two prior cases where SEC/FINRA issued joint exam priority letters for specific technology categories (algorithmic trading, 2019; digital assets, 2021), formal findings followed in 60–70% of examinations within 18 months of the priority letter publication. Current programme has three documentation gaps relative to the guidance in the 2024 exam priority letter.",
          },
          {
            name: "Contrarian — Moderate objection",
            text: "“The 60–70% finding rate from prior tech exam cycles is the right base rate, but it applies to the entire examination population. Our firm has a clean 5-year exam history and a documented model governance framework. Firms with clean histories and documented governance have been found at approximately 20–30% rates in analogous cycles. The base rate needs to be conditioned on our firm-specific profile.”",
          },
          {
            name: "Pragmatist",
            text: "Three pre-exam actions: (1) Close the three documentation gaps identified in the 2024 priority letter within 60 days — these are the lowest-hanging fruit and the most likely exam focus. (2) Commission a mock examination specifically on AI surveillance governance. (3) Brief the Board Audit Committee on the exam probability before the next scheduled exam notification.",
          },
        ],
        output: {
          items: [
            { key: "Finding", value: "Probable" },
            { key: "Finding probability", value: "20–30% (firm-adjusted) vs. 60–70% (base rate)" },
            { key: "Key driver", value: "3 documentation gaps vs. 2024 exam letter" },
            { key: "Guardian", value: "96% · Financial integrity" },
          ],
          noteLabel: "Reopen condition",
          noteText:
            "“Three documentation gaps closed and mock examination completed. At that point re-run exam probability estimate against the revised documentation posture.”",
        },
      },
    ],
  },
  {
    slug: "media",
    vertical: "Media + journalism",
    shortName: "Media",
    metaTitle: "Pre-Publication Fact-Check Examples | Augle",
    metaDescription:
      "Example Augle sessions for newsrooms — pre-publication fact review, misinformation source audits, and earnings story verification.",
    heroBody:
      "How Augle's multi-agent ensemble serves investigative editors, research directors, and business correspondents — from pre-publication fact review to earnings story verification. Each session shows how structured deliberation finds the evidentiary weaknesses that legal counsel and IR will exploit after publication.",
    heroLinks: [
      "Senior editors stress-testing causal claims in investigative pieces before publication",
      "Research directors auditing misinformation source evidence with falsity classification",
      "Business correspondents verifying accounting claims against the underlying filings",
      "Editorial boards requiring documented evidence standards for high-stakes investigative work",
    ],
    guardianMode: "Editorial & Financial integrity",
    commonOutputs: [
      "Pre-publication vulnerability assessments",
      "falsity classifications",
      "IR pushback previews",
    ],
    solutionsPageDesc:
      "The full solutions page for this vertical — problem framing, configuration panel, and why Augle for editorial research.",
    relatedHubs: [
      {
        name: "Think tanks + nonprofits hub",
        desc: "Pre-publication evidence review and advocacy position stress-testing — adjacent workflows for journalism-adjacent research organisations.",
        href: "/use-cases/think-tanks",
      },
      {
        name: "Law firms hub",
        desc: "Libel risk assessment and evidentiary standard review — adjacent workflows for media legal teams reviewing investigative pieces.",
        href: "/use-cases/law-firms",
      },
    ],
    sessions: [
      {
        name: "The Pre-Publication Fact Review",
        persona: "Senior Editor, Investigations · ProPublica",
        question:
          "“Does the evidence cited in this investigative piece support the causal claim that the hospital's billing algorithm systematically disadvantaged low-income patients, and will the claim survive legal and factual challenge?”",
        tags: ["Standard", "Editorial integrity"],
        agents: [
          {
            name: "Cartographer",
            text: "Settled: the hospital's billing algorithm applies different payment plan terms to patients based on credit score inputs. Documented in the system vendor's own product documentation. Contested: whether differential terms constitute systematic disadvantage — the hospital will argue that risk-based payment terms are standard practice and not discriminatory. Unknown: whether the patient outcomes data in the piece is sufficiently controlled for comorbidity to support the causal claim.",
          },
          {
            name: "Guardian SVS",
            text: "28 citations and data sources verified. Two of the three outcome studies cited used data provided by a patient advocacy group that has previously filed a complaint against this specific hospital. Not independent. Flagged Moderate — disclosed. One statistical comparison uses unadjusted outcome rates; the comorbidity adjustment would likely reduce the stated disparity by 30–40%.",
          },
          {
            name: "Contrarian — Strong objection (Unresolved)",
            text: "“The piece claims the algorithm 'systematically disadvantaged' low-income patients. This is a causal claim. The evidence shows correlation between algorithm use and outcome disparity. The unadjusted comorbidity data means the disparity may partially reflect underlying health status differences, not algorithmic treatment. If the hospital's lawyer makes this argument — and they will — the central causal claim in the headline is not supported by the cited evidence.”",
          },
          {
            name: "Synthesizer",
            text: "Editorial recommendation: the systematic disparity in billing terms is documented and publishable. The causal outcome claim requires comorbidity-adjusted data before publication. Two-track approach: publish the billing terms story now (solid evidentiary ground) and hold the causal outcome claim for the follow-up piece once adjusted data is obtained.",
          },
        ],
        output: {
          items: [
            { key: "Finding", value: "Contested" },
            { key: "Guardian", value: "94% · Editorial integrity" },
            { key: "SVS flag", value: "Moderate — non-independent outcome data" },
            { key: "Dissent flags", value: "1 Strong (Unresolved)" },
          ],
          noteLabel: "Unresolved objection",
          noteText:
            "“The headline causal claim is not supported by the cited evidence without comorbidity adjustment. The adjusted disparity may be 30–40% smaller. The billing terms disparity is publishable; the causal outcome claim should be held pending adjusted analysis.”",
        },
      },
      {
        name: "The Misinformation Source Audit",
        persona: "Research Director, Digital Journalism · The Atlantic",
        question:
          "“What does the evidence establish about the origin and spread dynamics of the specific climate misinformation narrative under investigation, and which claims are documentably false vs. contested?”",
        tags: ["Standard", "Editorial integrity"],
        agents: [
          {
            name: "Cartographer",
            text: "Settled: the specific narrative (Arctic ice recovery reverses warming trend) originated in a 2017 blog post that misread a NSIDC seasonal recovery graphic as a long-term trend reversal. The misreading was corrected by NSIDC within 72 hours. Contested: whether subsequent amplification by specific media entities was deliberate misrepresentation or good-faith error propagation. Unknown: the degree to which algorithmic amplification vs. coordinated sharing drove the spread pattern.",
          },
          {
            name: "Methodologist",
            text: "Falsity classification: three distinct claims in the narrative require separate treatment. (1) “Arctic ice is recovering” — documentably false; contradicted by 30-year NSIDC dataset. (2) “NSIDC data shows recovery” — documentably false; NSIDC explicitly corrected this characterisation. (3) “Warming trend is reversing” — Contested; contested by the scientific consensus but involves a predictive claim about trend continuation that requires care in characterisation.",
          },
          {
            name: "Contrarian — Moderate objection",
            text: "“Characterising claim (3) as contested rather than false is editorially important but will be used by the subjects of the investigation to argue the piece is not fully grounded. Consider whether the editorial framing of 'contested' accurately reflects the asymmetry between IPCC consensus and the dissenting position. The scientific debate is not symmetric.”",
          },
          {
            name: "Pragmatist",
            text: "Editorial framing recommendation: distinguish between “scientifically contested” (genuine scientific debate) and “contradicted by overwhelming consensus with minority dissent.” Claim (3) falls in the latter category. This distinction is both editorially accurate and legally more defensible than characterising a consensus position as merely contested.",
          },
        ],
        output: {
          items: [
            { key: "Finding", value: "Contested" },
            { key: "Confidence", value: "71%" },
            { key: "Documentably false claims", value: "2 of 3" },
            { key: "Guardian", value: "93% · Editorial integrity" },
          ],
          noteLabel: "Reopen condition",
          noteText:
            "“Claim (3) framing revised from \"contested\" to \"contradicted by overwhelming consensus with minority dissent\" with explicit IPCC confidence level citation. This framing is both more accurate and more legally defensible.”",
        },
      },
      {
        name: "The Earnings Story Verification",
        persona: "Business Correspondent · Financial Times",
        question:
          "“Does the evidence support the claim in the draft story that the company's EBITDA margin improvement is primarily driven by accounting reclassification rather than operational improvement, and what will IR pushback?”",
        tags: ["Standard", "Financial integrity"],
        agents: [
          {
            name: "Cartographer",
            text: "Settled: the company changed its stock-based compensation (SBC) accounting classification from operating expense to a separate line item in Q3 2024. This reclassification mechanically improved reported EBITDA margin by 4.2 percentage points. Contested: whether the reclassification is appropriate under GAAP or whether it constitutes a non-standard presentation. Unknown: whether the operational underlying margin improved at all, or whether the reclassification accounts for all of the improvement.",
          },
          {
            name: "Guardian SVS",
            text: "12 financial filings and analyst reports verified. One analyst report cited as independent validation of the margin improvement was issued by a bank with a buy rating and active banking relationship with the company. Flagged Moderate — retained with disclosure.",
          },
          {
            name: "Methodologist",
            text: "Accounting analysis: restating the historical income statements on a like-for-like basis (SBC as operating expense throughout) produces EBITDA margin of 18.2% in Q3 2024 vs. 18.6% in Q3 2023. On a comparable basis, margin declined 40bps year-over-year. The reported improvement of 3.8% is entirely attributable to the reclassification. This is documentable from the public filings.",
          },
          {
            name: "Contrarian — Moderate objection",
            text: "“The reclassification is non-standard but not unique — at least six S&P 500 companies use similar SBC presentation. IR will argue the company is moving toward what they will describe as industry practice. The story needs to address whether this is an isolated practice or part of a broader trend of EBITDA presentation that systematically obscures SBC cost. The larger story may be more important than the individual company.”",
          },
        ],
        output: {
          items: [
            { key: "Finding", value: "Probable" },
            { key: "Confidence", value: "78%" },
            { key: "Margin improvement", value: "100% reclassification, 0% operational" },
            { key: "Guardian", value: "95% · Financial integrity" },
          ],
          noteLabel: "Reopen condition",
          noteText:
            "“IR response obtained and addressed. If IR argues the reclassification is industry practice, broaden the story to include comparable SBC reclassification analysis across peer set before publication.”",
        },
      },
    ],
  },
];

export function getUseCase(slug: string): UseCase | undefined {
  return USE_CASES.find((uc) => uc.slug === slug);
}

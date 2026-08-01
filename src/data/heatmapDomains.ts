import type { Grade } from "@/lib/grade";

export type HeatmapSession = {
  q: string;
  conf: number;
  time: string;
  agents: number[];
  objection?: string;
  objAgent?: string;
};

export type GradeStats = { n: number; pct: number };

export type DomainHeatmap = {
  name: string;
  total: number;
  est: GradeStats;
  pro: GradeStats;
  con: GradeStats;
  gap: GradeStats;
  sessions: Record<Grade, HeatmapSession[]>;
};

export const DOMAINS: DomainHeatmap[] = [
  {
    name: "Economics",
    total: 51,
    est: { n: 6, pct: 12 },
    pro: { n: 31, pct: 61 },
    con: { n: 11, pct: 22 },
    gap: { n: 3, pct: 6 },
    sessions: {
      Established: [
        { q: "Does expansionary monetary policy lower short-term nominal interest rates?", conf: 91, time: "3d ago", agents: [82, 88, 70, 91, 87] },
        { q: "Does compound interest growth outpace simple interest over 10+ years?", conf: 96, time: "5d ago", agents: [94, 97, 88, 96, 95] },
      ],
      Probable: [
        {
          q: "What does the evidence establish about the pass-through of monetary tightening to core inflation?",
          conf: 78,
          time: "4h ago",
          agents: [82, 85, 41, 88, 76],
          objection: "Fed communication signals inconsistent — dot-plot interpretation has higher variance than acknowledged.",
          objAgent: "Contrarian",
        },
        { q: "What does the evidence establish about the persistence of services inflation after supply shocks?", conf: 71, time: "10h ago", agents: [74, 68, 55, 80, 77] },
        { q: "What does the evidence establish about the real effects of central-bank forward guidance?", conf: 64, time: "1d ago", agents: [68, 62, 48, 72, 60] },
      ],
      Contested: [
        {
          q: "Does the current evidence base support a near-term US recession call, and where is it weakest?",
          conf: 62,
          time: "2h ago",
          agents: [68, 72, 31, 79, 65],
          objection: "Labor market lag undermines recession timing assumptions.",
          objAgent: "Contrarian",
        },
        {
          q: "What does the evidence establish about the relative near-term growth trajectories of the EU and US economies?",
          conf: 18,
          time: "3d ago",
          agents: [20, 15, 61, 18, 16],
          objection: '"Outperform" is undefined — no operationalizable resolution criterion available.',
          objAgent: "Methodologist",
        },
      ],
      Gap: [
        {
          q: "What is the economically optimal global carbon price?",
          conf: 12,
          time: "1w ago",
          agents: [15, 10, 72, 12, 11],
          objection: "No single resolution criterion exists — question requires operationalization before scoring.",
          objAgent: "Methodologist",
        },
      ],
    },
  },
  {
    name: "Life sciences",
    total: 34,
    est: { n: 9, pct: 26 },
    pro: { n: 20, pct: 59 },
    con: { n: 4, pct: 12 },
    gap: { n: 1, pct: 3 },
    sessions: {
      Established: [
        { q: "Does aspirin reduce cardiovascular risk in secondary prevention populations?", conf: 94, time: "1w ago", agents: [92, 96, 78, 94, 91] },
        { q: "Is statin therapy effective for reducing LDL cholesterol?", conf: 97, time: "2w ago", agents: [96, 98, 82, 97, 96] },
      ],
      Probable: [
        { q: "What does the evidence establish about GLP-1 agonists for cardiovascular risk reduction in adults with obesity?", conf: 83, time: "14h ago", agents: [86, 90, 67, 88, 82] },
        {
          q: "Does metformin extend healthy lifespan in non-diabetic populations?",
          conf: 58,
          time: "2d ago",
          agents: [62, 54, 44, 66, 58],
          objection: "TAME trial results pending — current evidence is suggestive not conclusive.",
          objAgent: "Methodologist",
        },
      ],
      Contested: [
        {
          q: "Does the GLP-1 evidence support long-term weight maintenance without dosing?",
          conf: 24,
          time: "2d ago",
          agents: [28, 20, 72, 24, 22],
          objection: "No RCT has followed patients beyond 24 months off-drug — evidence gap is total.",
          objAgent: "Methodologist",
        },
      ],
      Gap: [
        {
          q: "What is the optimal microbiome composition for metabolic health?",
          conf: 9,
          time: "4d ago",
          agents: [12, 8, 68, 10, 9],
          objection: 'Construct is not operationalized — no agreed definition of "optimal" microbiome.',
          objAgent: "Methodologist",
        },
      ],
    },
  },
  {
    name: "Policy",
    total: 38,
    est: { n: 2, pct: 5 },
    pro: { n: 19, pct: 50 },
    con: { n: 14, pct: 37 },
    gap: { n: 3, pct: 8 },
    sessions: {
      Established: [{ q: "Does raising the minimum wage increase employment costs for small businesses?", conf: 88, time: "1w ago", agents: [86, 91, 74, 88, 85] }],
      Probable: [
        { q: "What does the evidence establish about the distributional effects of carbon border adjustment mechanisms?", conf: 72, time: "1d ago", agents: [76, 70, 58, 78, 68] },
        { q: "What does the evidence establish about the emissions effectiveness of carbon pricing relative to standards?", conf: 61, time: "3d ago", agents: [65, 58, 48, 68, 62] },
      ],
      Contested: [
        {
          q: "What does the evidence establish about the effect of federal AI regulation on innovation outcomes?",
          conf: 29,
          time: "8h ago",
          agents: [25, 18, 52, 30, 40],
          objection: "Legislative timeline operationalization is ambiguous across cited examples.",
          objAgent: "Methodologist",
        },
        {
          q: "What does the evidence establish about the emissions impact of re-entry into international climate agreements?",
          conf: 44,
          time: "5d ago",
          agents: [48, 42, 38, 50, 44],
          objection: 'Operational definition of "substantive" is not agreed — resolution criteria disputed.',
          objAgent: "Methodologist",
        },
      ],
      Gap: [
        {
          q: "What is the optimal global immigration policy framework?",
          conf: 8,
          time: "1w ago",
          agents: [10, 7, 71, 9, 8],
          objection: "No operationalizable outcome criterion exists at this level of generality.",
          objAgent: "Topic Architect",
        },
      ],
    },
  },
  {
    name: "Geopolitics",
    total: 41,
    est: { n: 1, pct: 2 },
    pro: { n: 17, pct: 41 },
    con: { n: 18, pct: 44 },
    gap: { n: 5, pct: 12 },
    sessions: {
      Established: [{ q: "Do economic sanctions reduce target state military capability over a 10-year horizon?", conf: 82, time: "2w ago", agents: [80, 86, 68, 82, 78] }],
      Probable: [
        { q: "What does the open-source evidence establish about escalation dynamics in protracted regional conflicts?", conf: 61, time: "6h ago", agents: [64, 58, 52, 66, 62] },
        { q: "What does the evidence establish about the drivers of long-run comparative economic growth?", conf: 54, time: "4d ago", agents: [58, 50, 44, 60, 54] },
      ],
      Contested: [
        {
          q: "What does the open-source evidence establish about deterrence stability in the Taiwan Strait?",
          conf: 34,
          time: "1d ago",
          agents: [38, 29, 58, 34, 31],
          objection: 'Definition of "significant military incident" is underspecified — resolution criteria ambiguous.',
          objAgent: "Methodologist",
        },
        {
          q: "What does the evidence establish about the security effects of defensive-alliance expansion?",
          conf: 48,
          time: "3d ago",
          agents: [52, 44, 40, 54, 48],
          objection: "Membership criteria and timeline operationalization not agreed across cited sources.",
          objAgent: "Methodologist",
        },
      ],
      Gap: [
        {
          q: "What does the evidence establish about the conditions under which strategic-competitor relations shift toward cooperation?",
          conf: 11,
          time: "5d ago",
          agents: [14, 9, 72, 12, 10],
          objection: '"Cooperative" vs "competitive" cannot be operationalized to binary resolution.',
          objAgent: "Methodologist",
        },
      ],
    },
  },
  {
    name: "Technology",
    total: 47,
    est: { n: 1, pct: 2 },
    pro: { n: 14, pct: 30 },
    con: { n: 24, pct: 51 },
    gap: { n: 8, pct: 17 },
    sessions: {
      Established: [{ q: "Does transformer scaling improve performance on benchmarks when training compute is doubled?", conf: 91, time: "2w ago", agents: [89, 94, 76, 91, 88] }],
      Probable: [
        { q: "Does the benchmark evidence support current LLM claims of human-level performance on standardised reasoning tasks?", conf: 74, time: "2d ago", agents: [78, 70, 58, 80, 72] },
        {
          q: "Does the current evidence support claims of practical quantum advantage over classical methods?",
          conf: 58,
          time: "3d ago",
          agents: [62, 54, 46, 64, 58],
          objection: "Practical advantage definition is domain-specific — not uniformly operationalizable.",
          objAgent: "Methodologist",
        },
      ],
      Contested: [
        {
          q: "Do current benchmarks provide a valid construct for claims of general machine intelligence?",
          conf: 41,
          time: "6h ago",
          agents: [44, 22, 61, 48, 19],
          objection: "AGI definition is insufficiently operationalized for reliable scoring across labs.",
          objAgent: "Methodologist",
        },
        {
          q: "What does the evidence establish about AI-driven displacement of knowledge-work tasks?",
          conf: 38,
          time: "1d ago",
          agents: [42, 34, 54, 44, 38],
          objection: 'Job category boundaries and "replacement" threshold are not operationalized.',
          objAgent: "Methodologist",
        },
      ],
      Gap: [
        {
          q: "What is the optimal AI governance framework for superintelligent systems?",
          conf: 7,
          time: "6d ago",
          agents: [10, 6, 74, 8, 7],
          objection: '"Superintelligent" and "optimal" are both undefined — question not scorable.',
          objAgent: "Topic Architect",
        },
        {
          q: "When will brain-computer interfaces become consumer products?",
          conf: 14,
          time: "4d ago",
          agents: [18, 12, 62, 16, 14],
          objection: 'No agreed definition of "consumer product" threshold or market penetration criterion.',
          objAgent: "Methodologist",
        },
      ],
    },
  },
  {
    name: "AI governance",
    total: 18,
    est: { n: 0, pct: 0 },
    pro: { n: 7, pct: 39 },
    con: { n: 8, pct: 44 },
    gap: { n: 3, pct: 17 },
    sessions: {
      Established: [],
      Probable: [
        { q: "What does the evidence establish about the enforceability of risk-tiered AI regulation?", conf: 68, time: "2d ago", agents: [72, 64, 54, 74, 66] },
        { q: "What does the evidence establish about the effectiveness of binding vs. voluntary AI safety commitments?", conf: 54, time: "4d ago", agents: [58, 50, 42, 60, 54] },
      ],
      Contested: [
        {
          q: "What does the evidence establish about the effect of federal AI regulation on innovation outcomes?",
          conf: 29,
          time: "8h ago",
          agents: [25, 18, 52, 30, 40],
          objection: "Legislative calendar constraints make non-appropriations legislation before November 2026 unlikely regardless of support.",
          objAgent: "Contrarian",
        },
        {
          q: "What does the evidence establish about how frontier labs prioritise safety relative to capability research?",
          conf: 36,
          time: "3d ago",
          agents: [40, 32, 48, 38, 36],
          objection: '"Primary concern" cannot be operationalized — proxy metrics all have contested validity.',
          objAgent: "Methodologist",
        },
      ],
      Gap: [
        {
          q: "What is the correct regulatory framework for general-purpose AI?",
          conf: 8,
          time: "5d ago",
          agents: [11, 7, 72, 9, 8],
          objection: "No operationalizable resolution criterion exists — the question requires a policy specification.",
          objAgent: "Topic Architect",
        },
      ],
    },
  },
  {
    name: "Finance",
    total: 29,
    est: { n: 3, pct: 10 },
    pro: { n: 16, pct: 55 },
    con: { n: 8, pct: 28 },
    gap: { n: 2, pct: 7 },
    sessions: {
      Established: [{ q: "Does diversification reduce portfolio volatility across asset classes?", conf: 94, time: "1w ago", agents: [92, 96, 80, 94, 92] }],
      Probable: [
        { q: "What does the historical evidence establish about equity-return predictability at the one-year horizon?", conf: 67, time: "12h ago", agents: [70, 64, 52, 72, 66] },
        {
          q: "Does the evidence support the claim that current AI-infrastructure investment reflects a capital misallocation?",
          conf: 44,
          time: "5h ago",
          agents: [48, 40, 62, 50, 44],
          objection: 'Definition of "correction" threshold not agreed — 10% vs 20% yields different resolution.',
          objAgent: "Methodologist",
        },
      ],
      Contested: [
        {
          q: "Does the evidence support treating crypto-asset market capitalisation as a measure of adoption?",
          conf: 38,
          time: "2d ago",
          agents: [42, 34, 56, 40, 38],
          objection: "Market cap calculation methodology disputed — crypto valuation models are not standardized.",
          objAgent: "Methodologist",
        },
      ],
      Gap: [
        {
          q: "What is the optimal portfolio allocation for a 30-year investment horizon?",
          conf: 11,
          time: "3d ago",
          agents: [14, 9, 68, 12, 11],
          objection: "Optimal allocation depends on individual risk tolerance — not resolvable at the general level.",
          objAgent: "Methodologist",
        },
      ],
    },
  },
  {
    name: "Climate",
    total: 22,
    est: { n: 4, pct: 18 },
    pro: { n: 10, pct: 45 },
    con: { n: 6, pct: 27 },
    gap: { n: 2, pct: 9 },
    sessions: {
      Established: [
        { q: "Is the global average temperature rising due to human activity?", conf: 98, time: "1w ago", agents: [97, 99, 89, 98, 98] },
        { q: "Do greenhouse gas emissions from fossil fuels contribute to atmospheric CO2 increase?", conf: 97, time: "2w ago", agents: [96, 98, 86, 97, 96] },
      ],
      Probable: [
        { q: "What does the evidence establish about the remaining carbon budget for limiting warming to 1.5°C?", conf: 72, time: "3d ago", agents: [76, 70, 58, 78, 68] },
        { q: "What does the evidence establish about the grid-integration limits of variable renewable generation?", conf: 64, time: "5d ago", agents: [68, 62, 50, 70, 62] },
      ],
      Contested: [
        {
          q: "Does the evidence support carbon capture and storage as an economically viable mitigation pathway at scale?",
          conf: 42,
          time: "4d ago",
          agents: [46, 38, 56, 44, 42],
          objection: '"Economically viable at scale" is not operationalized — cost threshold and deployment scale are both disputed.',
          objAgent: "Methodologist",
        },
      ],
      Gap: [
        {
          q: "What is the optimal geoengineering intervention for stabilizing global temperature?",
          conf: 9,
          time: "6d ago",
          agents: [12, 8, 72, 10, 9],
          objection: "No agreed risk-benefit framework exists — geoengineering safety criteria are not established.",
          objAgent: "Topic Architect",
        },
      ],
    },
  },
];

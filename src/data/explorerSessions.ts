import type { Grade } from "@/lib/grade";

export type ExplorerSession = {
  domain: string;
  q: string;
  grade: Grade;
  conf: number;
  time: string;
  dissent: number;
  agents: number[];
};

// Confidence-number text color per grade — distinct from the shared
// GRADE_BADGE_CLASS pill colors (source: GRADE_CONF_COLORS in the explorer script).
export const EXPLORER_CONF_CLASS: Record<Grade, string> = {
  Established: "text-[#2A7050]",
  Probable: "text-[#185FA5]",
  Contested: "text-[#8A5A1A]",
  Gap: "text-[#8A1818]",
};

// Static per-domain corpus counts shown in the domain filter chips.
// These reflect the full illustrative corpus size, not ALL_SESSIONS.length
// (the sample dataset below is a subset) — ported verbatim from source.
export const DOMAIN_COUNTS: { domain: string; count: number }[] = [
  { domain: "All", count: 247 },
  { domain: "Economics", count: 51 },
  { domain: "Technology", count: 47 },
  { domain: "Policy", count: 38 },
  { domain: "Geopolitics", count: 41 },
  { domain: "Life sciences", count: 34 },
  { domain: "Finance", count: 29 },
  { domain: "Climate", count: 22 },
  { domain: "AI governance", count: 18 },
];

export const ALL_SESSIONS: ExplorerSession[] = [
  { domain: "Life sciences", q: "Is statin therapy effective for reducing LDL cholesterol?", grade: "Established", conf: 97, time: "2w ago", dissent: 0, agents: [96, 98, 82, 97, 96] },
  { domain: "Climate", q: "Does greenhouse gas emissions from fossil fuels contribute to atmospheric CO2 increase?", grade: "Established", conf: 97, time: "2w ago", dissent: 0, agents: [96, 98, 84, 97, 96] },
  { domain: "Climate", q: "Is the global average temperature rising due to human activity?", grade: "Established", conf: 98, time: "1w ago", dissent: 0, agents: [97, 99, 89, 98, 98] },
  { domain: "Life sciences", q: "Does aspirin reduce cardiovascular risk in secondary prevention populations?", grade: "Established", conf: 94, time: "1w ago", dissent: 0, agents: [92, 96, 78, 94, 91] },
  { domain: "Economics", q: "Does compound interest growth outpace simple interest over 10+ years?", grade: "Established", conf: 96, time: "5d ago", dissent: 0, agents: [94, 97, 88, 96, 95] },
  { domain: "Finance", q: "Does diversification reduce portfolio volatility across asset classes?", grade: "Established", conf: 94, time: "1w ago", dissent: 0, agents: [92, 96, 80, 94, 92] },
  { domain: "Economics", q: "Does aspirin reduce cardiovascular events in primary prevention?", grade: "Established", conf: 91, time: "3d ago", dissent: 1, agents: [88, 92, 74, 91, 88] },
  { domain: "Policy", q: "Does raising the minimum wage increase employment costs for small businesses?", grade: "Established", conf: 88, time: "1w ago", dissent: 0, agents: [86, 91, 74, 88, 85] },
  { domain: "Technology", q: "Does transformer scaling improve performance when training compute is doubled?", grade: "Established", conf: 91, time: "2w ago", dissent: 0, agents: [89, 94, 76, 91, 88] },
  { domain: "Life sciences", q: "What does the evidence establish about GLP-1 agonists for cardiovascular risk reduction in adults with obesity?", grade: "Probable", conf: 83, time: "14h ago", dissent: 0, agents: [86, 90, 67, 88, 82] },
  { domain: "Policy", q: "What does the evidence establish about the earnings effects of active labour-market programmes?", grade: "Probable", conf: 78, time: "4h ago", dissent: 1, agents: [82, 85, 41, 88, 76] },
  { domain: "Technology", q: "Does the benchmark evidence support current LLM claims of human-level performance on standardised reasoning tasks?", grade: "Probable", conf: 74, time: "2d ago", dissent: 1, agents: [78, 70, 58, 80, 72] },
  { domain: "Policy", q: "What does the evidence establish about the distributional effects of carbon border adjustment mechanisms?", grade: "Probable", conf: 72, time: "1d ago", dissent: 0, agents: [76, 70, 58, 78, 68] },
  { domain: "Economics", q: "What does the evidence establish about the pass-through of monetary tightening to core inflation?", grade: "Probable", conf: 71, time: "10h ago", dissent: 0, agents: [74, 68, 55, 80, 77] },
  { domain: "Climate", q: "What does the evidence establish about the grid-integration limits of variable renewable generation?", grade: "Probable", conf: 64, time: "5d ago", dissent: 1, agents: [68, 62, 50, 70, 62] },
  { domain: "Economics", q: "What does the evidence establish about the real effects of central-bank forward guidance?", grade: "Probable", conf: 64, time: "1d ago", dissent: 1, agents: [68, 62, 48, 72, 60] },
  { domain: "Finance", q: "What does the historical evidence establish about equity-return predictability at the one-year horizon?", grade: "Probable", conf: 67, time: "12h ago", dissent: 1, agents: [70, 64, 52, 72, 66] },
  { domain: "Geopolitics", q: "What does the open-source evidence establish about escalation dynamics in protracted regional conflicts?", grade: "Probable", conf: 61, time: "6h ago", dissent: 2, agents: [64, 58, 52, 66, 62] },
  { domain: "Policy", q: "What does the evidence establish about the emissions effectiveness of carbon pricing relative to standards?", grade: "Probable", conf: 61, time: "3d ago", dissent: 1, agents: [65, 58, 48, 68, 62] },
  { domain: "AI governance", q: "What does the evidence establish about the enforceability of risk-tiered AI regulation?", grade: "Probable", conf: 68, time: "2d ago", dissent: 0, agents: [72, 64, 54, 74, 66] },
  { domain: "Life sciences", q: "Does metformin extend healthy lifespan in non-diabetic populations?", grade: "Probable", conf: 58, time: "2d ago", dissent: 2, agents: [62, 54, 44, 66, 58] },
  { domain: "Geopolitics", q: "What does the evidence establish about the drivers of long-run comparative economic growth?", grade: "Probable", conf: 54, time: "4d ago", dissent: 1, agents: [58, 50, 44, 60, 54] },
  { domain: "AI governance", q: "What does the evidence establish about the effectiveness of binding vs. voluntary AI safety commitments?", grade: "Probable", conf: 54, time: "4d ago", dissent: 1, agents: [58, 50, 42, 60, 54] },
  { domain: "Geopolitics", q: "What does the evidence establish about the security effects of defensive-alliance expansion?", grade: "Probable", conf: 48, time: "3d ago", dissent: 2, agents: [52, 44, 40, 54, 48] },
  { domain: "Finance", q: "Does the evidence support the claim that current AI-infrastructure investment reflects a capital misallocation?", grade: "Contested", conf: 44, time: "5h ago", dissent: 2, agents: [48, 40, 62, 50, 44] },
  { domain: "Climate", q: "Does the evidence support carbon capture and storage as an economically viable mitigation pathway at scale?", grade: "Contested", conf: 42, time: "4d ago", dissent: 2, agents: [46, 38, 56, 44, 42] },
  { domain: "Technology", q: "Do current benchmarks provide a valid construct for claims of general machine intelligence?", grade: "Contested", conf: 41, time: "6h ago", dissent: 3, agents: [44, 22, 61, 48, 19] },
  { domain: "AI governance", q: "Will AI safety become the primary concern of frontier labs by 2028?", grade: "Contested", conf: 36, time: "3d ago", dissent: 2, agents: [40, 32, 48, 38, 36] },
  { domain: "Geopolitics", q: "What does the open-source evidence establish about deterrence stability in the Taiwan Strait?", grade: "Contested", conf: 34, time: "1d ago", dissent: 2, agents: [38, 29, 58, 34, 31] },
  { domain: "Economics", q: "Does the current evidence base support a near-term US recession call, and where is it weakest?", grade: "Contested", conf: 62, time: "2h ago", dissent: 2, agents: [68, 72, 31, 79, 65] },
  { domain: "Policy", q: "What does the evidence establish about the effect of federal AI regulation on innovation outcomes?", grade: "Contested", conf: 29, time: "8h ago", dissent: 3, agents: [25, 18, 52, 30, 40] },
  { domain: "Finance", q: "Does the evidence support treating crypto-asset market capitalisation as a measure of adoption?", grade: "Contested", conf: 38, time: "2d ago", dissent: 2, agents: [42, 34, 56, 40, 38] },
  { domain: "Policy", q: "What does the evidence establish about the emissions impact of re-entry into international climate agreements?", grade: "Contested", conf: 44, time: "5d ago", dissent: 2, agents: [48, 42, 38, 50, 44] },
  { domain: "AI governance", q: "Does the evidence support pre-market approval as a governance model for frontier AI?", grade: "Contested", conf: 29, time: "8h ago", dissent: 3, agents: [25, 18, 52, 30, 40] },
  { domain: "Technology", q: "What does the evidence establish about AI-driven displacement of knowledge-work tasks?", grade: "Contested", conf: 38, time: "1d ago", dissent: 3, agents: [42, 34, 54, 44, 38] },
  { domain: "Life sciences", q: "Does the GLP-1 evidence support long-term weight maintenance without continued dosing?", grade: "Contested", conf: 24, time: "2d ago", dissent: 4, agents: [28, 20, 72, 24, 22] },
  { domain: "Technology", q: "Does the current evidence support claims of practical quantum advantage over classical methods?", grade: "Contested", conf: 58, time: "3d ago", dissent: 2, agents: [62, 54, 46, 64, 58] },
  { domain: "Economics", q: "What does the evidence establish about the relative near-term growth trajectories of the EU and US economies?", grade: "Gap", conf: 18, time: "3d ago", dissent: 3, agents: [20, 15, 61, 18, 16] },
  { domain: "Finance", q: "What is the optimal portfolio allocation for a 30-year investment horizon?", grade: "Gap", conf: 11, time: "3d ago", dissent: 3, agents: [14, 9, 68, 12, 11] },
  { domain: "Geopolitics", q: "What does the evidence establish about the conditions under which strategic-competitor relations shift toward cooperation?", grade: "Gap", conf: 11, time: "5d ago", dissent: 3, agents: [14, 9, 72, 12, 10] },
  { domain: "Technology", q: "What is the optimal AI governance framework for superintelligent systems?", grade: "Gap", conf: 7, time: "6d ago", dissent: 4, agents: [10, 6, 74, 8, 7] },
  { domain: "Technology", q: "When will brain-computer interfaces become consumer products?", grade: "Gap", conf: 14, time: "4d ago", dissent: 3, agents: [18, 12, 62, 16, 14] },
  { domain: "Climate", q: "What is the optimal geoengineering intervention for stabilizing global temperature?", grade: "Gap", conf: 9, time: "6d ago", dissent: 4, agents: [12, 8, 72, 10, 9] },
  { domain: "AI governance", q: "What is the correct regulatory framework for general-purpose AI?", grade: "Gap", conf: 8, time: "5d ago", dissent: 4, agents: [11, 7, 72, 9, 8] },
  { domain: "Life sciences", q: "What is the optimal microbiome composition for metabolic health?", grade: "Gap", conf: 9, time: "4d ago", dissent: 4, agents: [12, 8, 68, 10, 9] },
  { domain: "Policy", q: "What is the optimal global immigration policy framework?", grade: "Gap", conf: 8, time: "1w ago", dissent: 4, agents: [10, 7, 71, 9, 8] },
  { domain: "Economics", q: "What is the economically optimal global carbon price?", grade: "Gap", conf: 12, time: "1w ago", dissent: 4, agents: [15, 10, 72, 12, 11] },
];

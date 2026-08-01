export type Agent = {
  id: string;
  name: string;
  role: string;
  color: string;
  description: string;
};

export const AGENTS: Agent[] = [
  {
    id: "guardian",
    name: "Guardian",
    role: "Integrity & verification",
    color: "#C15F3C",
    description:
      "Oversees integrity — flags bias, unverified sources, and derailment throughout.",
  },
  {
    id: "cartographer",
    name: "Cartographer",
    role: "Evidence mapping",
    color: "#3E9A6E",
    description:
      "Maps the evidence landscape into settled, contested, and unknown terrain.",
  },
  {
    id: "methodologist",
    name: "Methodologist",
    role: "Validity assessment",
    color: "#C79A2E",
    description: "Assesses study validity and locks the confidence ceiling.",
  },
  {
    id: "contrarian",
    name: "Contrarian",
    role: "Objection surfacing",
    color: "#7B6FC4",
    description:
      "Steelmans the strongest counter-case, then challenges it adversarially.",
  },
  {
    id: "synthesizer",
    name: "Synthesizer",
    role: "Evidence weighting",
    color: "#4A82B0",
    description: "Assembles the graded finding from the deliberation record.",
  },
  {
    id: "pragmatist",
    name: "Pragmatist",
    role: "Actionable output",
    color: "#6E9A5A",
    description:
      "Adds application notes, constrained to the confidence ceiling.",
  },
  {
    id: "topic-architect",
    name: "Topic Architect",
    role: "Session orchestration",
    color: "#B06A9A",
    description:
      "Frames and scopes the research question before deliberation begins.",
  },
];

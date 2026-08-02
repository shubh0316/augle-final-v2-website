"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AGENTS, type Agent } from "@/data/agents";
import { AgentIcon } from "@/components/AgentIcon";

type AgentId = "cartographer" | "methodologist" | "contrarian" | "synthesizer" | "pragmatist";
type Grade = "Established" | "Probable" | "Contested" | "Gap";
type Badge = "high" | "mod" | "split";

type AgentScore = { id: AgentId; pct: number; dissent?: boolean };
type Flag = { text: string; agent: string };

type SessionCard = {
  slug?: string;
  category: string;
  question: string;
  conf: number;
  badge: Badge;
  badgeText: string;
  guardian: number;
  time: string;
  grade: Grade;
  agents: AgentScore[];
  flags: Flag[];
  guardianDetail: Record<string, number>;
};

const AGENT_BY_ID = Object.fromEntries(AGENTS.map((a) => [a.id, a])) as Record<AgentId, Agent>;

const CATEGORIES = ["All", "Life sciences", "Policy", "Economics", "Technology", "Social science"];
const GRADES = ["All", "Established", "Probable", "Contested", "Gap"];

const BADGE_CLASS: Record<Badge, string> = {
  high: "bg-conf-high-bg text-conf-high-text",
  mod: "bg-[#D4E4F5] text-[#2A4A7A]",
  split: "bg-conf-contested-bg text-conf-contested-text",
};

const GRADE_CHIP_CLASS: Record<Grade, string> = {
  Established: "text-conf-high-text border-conf-high-text",
  Probable: "text-rust border-rust",
  Contested: "text-conf-med-text border-conf-med-text",
  Gap: "text-conf-contested-text border-conf-contested-text",
};

// Ported verbatim from the source page's `allCards` JS array. The 7 sessions that carry
// a `slug` link to real /outcomes/[slug] detail pages; the other 23 are illustrative-only
// (as in the source, where their `SLUG_FILE` lookup was simply absent so no link rendered).
// One fix applied: the source's `tech-rag-hallucination` slug is remapped to the canonical
// detail-page slug `rag-hallucination-reduction` used across the rest of the site.
const CARDS: SessionCard[] = [
  {
    slug: "soc-screen-time-depression",
    category: "Social science",
    question: "Do screen-time interventions reduce depressive symptoms in adolescents?",
    conf: 22,
    badge: "split",
    badgeText: "Evidence gap",
    guardian: 94,
    time: "3h ago",
    grade: "Gap",
    agents: [
      { id: "cartographer", pct: 48 },
      { id: "methodologist", pct: 38 },
      { id: "contrarian", pct: 29, dissent: true },
      { id: "synthesizer", pct: 31 },
      { id: "pragmatist", pct: 26 },
    ],
    flags: [
      {
        text: "Critical — the anchor systematic review in this literature has been retracted; downstream effect sizes cannot be relied upon",
        agent: "Contrarian",
      },
    ],
    guardianDetail: { Source: 96, "Retraction screen": 88, "Preprint status": 90, "Self-citation": 84 },
  },
  {
    slug: "life-glp1-vs-bariatric",
    category: "Life sciences",
    question:
      "What does the evidence establish about the comparative effectiveness of GLP-1 agonists vs. bariatric surgery for long-term weight maintenance?",
    conf: 46,
    badge: "split",
    badgeText: "Contested",
    guardian: 97,
    time: "9h ago",
    grade: "Contested",
    agents: [
      { id: "cartographer", pct: 64 },
      { id: "methodologist", pct: 58 },
      { id: "contrarian", pct: 37, dissent: true },
      { id: "synthesizer", pct: 49 },
      { id: "pragmatist", pct: 45 },
    ],
    flags: [
      {
        text: "No large long-term head-to-head RCT exists — the comparison rests on indirect, non-randomised cohort data with materially different populations",
        agent: "Contrarian",
      },
    ],
    guardianDetail: { Source: 97, "Retraction screen": 95, "Preprint status": 93, "Self-citation": 90 },
  },
  {
    slug: "policy-masking-mandates",
    category: "Policy",
    question:
      "What does the evidence base establish about the effectiveness of indoor masking mandates in reducing COVID-19 community transmission?",
    conf: 38,
    badge: "split",
    badgeText: "Contested",
    guardian: 92,
    time: "1d ago",
    grade: "Contested",
    agents: [
      { id: "cartographer", pct: 59 },
      { id: "methodologist", pct: 52 },
      { id: "contrarian", pct: 33, dissent: true },
      { id: "synthesizer", pct: 44 },
      { id: "pragmatist", pct: 41 },
    ],
    flags: [
      {
        text: "Primary studies are confounded by concurrent NPIs — the mandate effect cannot be isolated from lockdown timing",
        agent: "Contrarian",
      },
    ],
    guardianDetail: { Source: 93, "Retraction screen": 90, "Preprint status": 88, "Self-citation": 86 },
  },
  {
    slug: "life-crispr-reproducibility",
    category: "Life sciences",
    question:
      "Is the CRISPR off-target editing rate reported in this foundational study reproducible, and what does the replication literature show?",
    conf: 41,
    badge: "split",
    badgeText: "Contested",
    guardian: 89,
    time: "1d ago",
    grade: "Contested",
    agents: [
      { id: "cartographer", pct: 61 },
      { id: "methodologist", pct: 54 },
      { id: "contrarian", pct: 35, dissent: true },
      { id: "synthesizer", pct: 47 },
      { id: "pragmatist", pct: 43 },
    ],
    flags: [
      {
        text: "Replication attempts use a single detection assay across all studies — convergence without independent methodological variation",
        agent: "Contrarian",
      },
    ],
    guardianDetail: { Source: 90, "Retraction screen": 86, "Preprint status": 79, "Self-citation": 82 },
  },
  {
    slug: "policy-mnpi-exposure",
    category: "Policy",
    question:
      "Based on SEC enforcement patterns over five years, what is the realistic exposure profile on the material non-public information question?",
    conf: 61,
    badge: "mod",
    badgeText: "Probable finding",
    guardian: 97,
    time: "2d ago",
    grade: "Probable",
    agents: [
      { id: "cartographer", pct: 72 },
      { id: "methodologist", pct: 74 },
      { id: "contrarian", pct: 55, dissent: true },
      { id: "synthesizer", pct: 70 },
      { id: "pragmatist", pct: 68 },
    ],
    flags: [
      {
        text: "Baseline enforcement rate absent documented insider contact is materially lower than the analysis assumes",
        agent: "Contrarian",
      },
    ],
    guardianDetail: { Source: 97, "Retraction screen": 94, "Preprint status": 96, "Self-citation": 93 },
  },
  {
    slug: "tech-photonic-chip",
    category: "Technology",
    question:
      "Does the evidence support the team's claim of commercially relevant photonic-chip inference throughput at competitive precision?",
    conf: 28,
    badge: "split",
    badgeText: "Contested",
    guardian: 93,
    time: "2d ago",
    grade: "Contested",
    agents: [
      { id: "cartographer", pct: 52 },
      { id: "methodologist", pct: 46 },
      { id: "contrarian", pct: 31, dissent: true },
      { id: "synthesizer", pct: 38 },
      { id: "pragmatist", pct: 35 },
    ],
    flags: [
      {
        text: "No matched-precision production benchmark exists — throughput rests on a single-tenant demo rack, not production conditions",
        agent: "Contrarian",
      },
    ],
    guardianDetail: { Source: 94, "Retraction screen": 91, "Preprint status": 72, "Self-citation": 88 },
  },
  {
    category: "Economics",
    question: "Does the evidence support the claim that universal basic income pilots produce sustained labour-market participation effects?",
    conf: 39,
    badge: "split",
    badgeText: "Contested",
    guardian: 91,
    time: "3d ago",
    grade: "Contested",
    agents: [
      { id: "cartographer", pct: 58 },
      { id: "methodologist", pct: 51 },
      { id: "contrarian", pct: 34, dissent: true },
      { id: "synthesizer", pct: 45 },
      { id: "pragmatist", pct: 42 },
    ],
    flags: [
      {
        text: "Pilot durations are too short to support a 'sustained' claim — effects decay in the only long-horizon study available",
        agent: "Contrarian",
      },
    ],
    guardianDetail: { Source: 92, "Retraction screen": 89, "Preprint status": 90, "Self-citation": 85 },
  },
  {
    category: "Policy",
    question: "What does the evidence base establish about the effectiveness of apprenticeship programmes in improving long-term participant earnings?",
    conf: 58,
    badge: "mod",
    badgeText: "Probable finding",
    guardian: 90,
    time: "3d ago",
    grade: "Probable",
    agents: [
      { id: "cartographer", pct: 70 },
      { id: "methodologist", pct: 72 },
      { id: "contrarian", pct: 53, dissent: true },
      { id: "synthesizer", pct: 68 },
      { id: "pragmatist", pct: 66 },
    ],
    flags: [
      {
        text: "Employer-participation ratio exceeds the literature threshold at only 60% of sites — generalisability constraint",
        agent: "Contrarian",
      },
    ],
    guardianDetail: { Source: 90, "Retraction screen": 87, "Preprint status": 88, "Self-citation": 84 },
  },
  {
    category: "Social science",
    question:
      "Does the evidence support the investigative piece's causal claim that the billing algorithm systematically disadvantaged low-income patients?",
    conf: 43,
    badge: "split",
    badgeText: "Contested",
    guardian: 94,
    time: "4d ago",
    grade: "Contested",
    agents: [
      { id: "cartographer", pct: 60 },
      { id: "methodologist", pct: 53 },
      { id: "contrarian", pct: 36, dissent: true },
      { id: "synthesizer", pct: 46 },
      { id: "pragmatist", pct: 44 },
    ],
    flags: [
      {
        text: "The outcome data is non-independent — supplied by a party with a stake in the finding; a Moderate integrity flag applies",
        agent: "Contrarian",
      },
    ],
    guardianDetail: { Source: 94, "Retraction screen": 92, "Preprint status": 95, "Self-citation": 88 },
  },
  {
    category: "Economics",
    question:
      "Does the evidence support the hypothesis that direct-to-consumer channel expansion improves gross margin by 8–12 points over three years?",
    conf: 44,
    badge: "split",
    badgeText: "Contested",
    guardian: 91,
    time: "5d ago",
    grade: "Contested",
    agents: [
      { id: "cartographer", pct: 62 },
      { id: "methodologist", pct: 55 },
      { id: "contrarian", pct: 38, dissent: true },
      { id: "synthesizer", pct: 48 },
      { id: "pragmatist", pct: 46 },
    ],
    flags: [
      {
        text: "CAC classification drives a 2–3× range in the modelled outcome — the central estimate is not robust to accounting choice",
        agent: "Contrarian",
      },
    ],
    guardianDetail: { Source: 91, "Retraction screen": 88, "Preprint status": 92, "Self-citation": 86 },
  },
  {
    category: "Economics",
    question:
      "Does the evidence support the assumption that the incumbent credit-scoring model retains predictive validity in the current macro environment?",
    conf: 34,
    badge: "split",
    badgeText: "Contested",
    guardian: 95,
    time: "6d ago",
    grade: "Contested",
    agents: [
      { id: "cartographer", pct: 56 },
      { id: "methodologist", pct: 49 },
      { id: "contrarian", pct: 32, dissent: true },
      { id: "synthesizer", pct: 43 },
      { id: "pragmatist", pct: 40 },
    ],
    flags: [
      {
        text: "Reject-inference study required before the next regulatory validation — validity cannot be assumed out-of-sample",
        agent: "Contrarian",
      },
    ],
    guardianDetail: { Source: 95, "Retraction screen": 93, "Preprint status": 94, "Self-citation": 90 },
  },
  {
    category: "Technology",
    question: "What is the realistic technology-readiness level for room-temperature superconducting materials based on current published evidence?",
    conf: 24,
    badge: "split",
    badgeText: "Evidence gap",
    guardian: 88,
    time: "1w ago",
    grade: "Gap",
    agents: [
      { id: "cartographer", pct: 50 },
      { id: "methodologist", pct: 40 },
      { id: "contrarian", pct: 30, dissent: true },
      { id: "synthesizer", pct: 33 },
      { id: "pragmatist", pct: 28 },
    ],
    flags: [
      {
        text: "No ambient-pressure candidate has independent replication — TRL claims beyond pressure-based demonstrations are unsupported",
        agent: "Contrarian",
      },
    ],
    guardianDetail: { Source: 89, "Retraction screen": 85, "Preprint status": 70, "Self-citation": 83 },
  },
  {
    category: "Life sciences",
    question: "Does time-restricted eating improve long-term glycaemic control in type 2 diabetes?",
    conf: 63,
    badge: "mod",
    badgeText: "Probable finding",
    guardian: 91,
    time: "2h ago",
    grade: "Probable",
    agents: [
      { id: "cartographer", pct: 67 },
      { id: "methodologist", pct: 65 },
      { id: "contrarian", pct: 59 },
      { id: "synthesizer", pct: 61 },
      { id: "pragmatist", pct: 57 },
    ],
    flags: [{ text: "Moderate — benefit is consistent but modest once caloric intake is controlled for", agent: "Contrarian" }],
    guardianDetail: { Source: 95, "Retraction screen": 85, "Preprint status": 87, "Self-citation": 94 },
  },
  {
    category: "Life sciences",
    question: "Is faecal microbiota transplantation effective for treatment-resistant IBS?",
    conf: 42,
    badge: "mod",
    badgeText: "Contested",
    guardian: 92,
    time: "5h ago",
    grade: "Contested",
    agents: [
      { id: "cartographer", pct: 46 },
      { id: "methodologist", pct: 41 },
      { id: "contrarian", pct: 23, dissent: true },
      { id: "synthesizer", pct: 43 },
      { id: "pragmatist", pct: 39 },
    ],
    flags: [
      { text: "Strong — benefit concentrates in open-label trials; blinded replications show attenuated effect", agent: "Contrarian" },
    ],
    guardianDetail: { Source: 83, "Retraction screen": 82, "Preprint status": 78, "Self-citation": 88 },
  },
  {
    category: "Life sciences",
    question: "Do continuous glucose monitors improve outcomes in non-insulin-treated type 2 diabetes?",
    conf: 44,
    badge: "mod",
    badgeText: "Contested",
    guardian: 97,
    time: "1d ago",
    grade: "Contested",
    agents: [
      { id: "cartographer", pct: 88 },
      { id: "methodologist", pct: 82 },
      { id: "contrarian", pct: 31, dissent: true },
      { id: "synthesizer", pct: 78 },
      { id: "pragmatist", pct: 78 },
    ],
    flags: [
      {
        text: "Strong — randomised trials in non-insulin-treated patients show mixed and generally modest effects; benefit is not consistent across populations",
        agent: "Contrarian",
      },
    ],
    guardianDetail: { Source: 96, "Retraction screen": 84, "Preprint status": 91, "Self-citation": 94 },
  },
  {
    category: "Life sciences",
    question: "Does long-term metformin use reduce all-cause mortality in non-diabetic adults?",
    conf: 18,
    badge: "split",
    badgeText: "Evidence gap",
    guardian: 87,
    time: "2d ago",
    grade: "Gap",
    agents: [
      { id: "cartographer", pct: 22 },
      { id: "methodologist", pct: 17 },
      { id: "contrarian", pct: 6, dissent: true },
      { id: "synthesizer", pct: 22 },
      { id: "pragmatist", pct: 13 },
    ],
    flags: [
      {
        text: "Critical — no adequately powered RCT in non-diabetic populations; observational estimates confounded by indication",
        agent: "Contrarian",
      },
    ],
    guardianDetail: { Source: 86, "Retraction screen": 85, "Preprint status": 79, "Self-citation": 88 },
  },
  {
    category: "Policy",
    question: "Do supervised consumption sites reduce overdose mortality at the neighbourhood level?",
    conf: 67,
    badge: "mod",
    badgeText: "Probable finding",
    guardian: 94,
    time: "4h ago",
    grade: "Probable",
    agents: [
      { id: "cartographer", pct: 72 },
      { id: "methodologist", pct: 70 },
      { id: "contrarian", pct: 64 },
      { id: "synthesizer", pct: 70 },
      { id: "pragmatist", pct: 62 },
    ],
    flags: [{ text: "Moderate — effect is robust locally but displacement effects are not fully characterised", agent: "Contrarian" }],
    guardianDetail: { Source: 88, "Retraction screen": 93, "Preprint status": 91, "Self-citation": 95 },
  },
  {
    category: "Policy",
    question: "Does universal free school-meal provision improve measured educational attainment?",
    conf: 63,
    badge: "mod",
    badgeText: "Probable finding",
    guardian: 97,
    time: "3d ago",
    grade: "Probable",
    agents: [
      { id: "cartographer", pct: 66 },
      { id: "methodologist", pct: 66 },
      { id: "contrarian", pct: 59 },
      { id: "synthesizer", pct: 61 },
      { id: "pragmatist", pct: 61 },
    ],
    flags: [],
    guardianDetail: { Source: 87, "Retraction screen": 93, "Preprint status": 85, "Self-citation": 92 },
  },
  {
    category: "Policy",
    question: "Do congestion-pricing schemes reduce urban particulate exposure?",
    conf: 64,
    badge: "mod",
    badgeText: "Probable finding",
    guardian: 94,
    time: "6h ago",
    grade: "Probable",
    agents: [
      { id: "cartographer", pct: 95 },
      { id: "methodologist", pct: 93 },
      { id: "contrarian", pct: 86 },
      { id: "synthesizer", pct: 92 },
      { id: "pragmatist", pct: 87 },
    ],
    flags: [],
    guardianDetail: { Source: 91, "Retraction screen": 87, "Preprint status": 94, "Self-citation": 87 },
  },
  {
    category: "Policy",
    question: "Does raising the minimum wage to a specified threshold reduce youth employment in the affected region?",
    conf: 35,
    badge: "mod",
    badgeText: "Contested",
    guardian: 87,
    time: "9h ago",
    grade: "Contested",
    agents: [
      { id: "cartographer", pct: 42 },
      { id: "methodologist", pct: 36 },
      { id: "contrarian", pct: 20, dissent: true },
      { id: "synthesizer", pct: 36 },
      { id: "pragmatist", pct: 31 },
    ],
    flags: [{ text: "Strong — identification confounded by concurrent regional labour-market trends", agent: "Contrarian" }],
    guardianDetail: { Source: 89, "Retraction screen": 83, "Preprint status": 86, "Self-citation": 81 },
  },
  {
    category: "Economics",
    question: "Do sovereign wealth fund disclosure requirements reduce borrowing costs for the issuing state?",
    conf: 66,
    badge: "mod",
    badgeText: "Probable finding",
    guardian: 92,
    time: "1d ago",
    grade: "Probable",
    agents: [
      { id: "cartographer", pct: 72 },
      { id: "methodologist", pct: 66 },
      { id: "contrarian", pct: 63 },
      { id: "synthesizer", pct: 66 },
      { id: "pragmatist", pct: 61 },
    ],
    flags: [],
    guardianDetail: { Source: 94, "Retraction screen": 90, "Preprint status": 82, "Self-citation": 95 },
  },
  {
    category: "Economics",
    question: "Does a four-day working week maintain output in knowledge-work firms?",
    conf: 70,
    badge: "mod",
    badgeText: "Probable finding",
    guardian: 98,
    time: "2d ago",
    grade: "Probable",
    agents: [
      { id: "cartographer", pct: 77 },
      { id: "methodologist", pct: 73 },
      { id: "contrarian", pct: 67 },
      { id: "synthesizer", pct: 74 },
      { id: "pragmatist", pct: 66 },
    ],
    flags: [{ text: "Moderate — output holds in pilots but selection into pilots limits generalisability", agent: "Contrarian" }],
    guardianDetail: { Source: 92, "Retraction screen": 95, "Preprint status": 87, "Self-citation": 94 },
  },
  {
    category: "Economics",
    question: "Do central-bank digital-currency pilots reduce domestic payment-settlement costs?",
    conf: 27,
    badge: "split",
    badgeText: "Evidence gap",
    guardian: 87,
    time: "7h ago",
    grade: "Gap",
    agents: [
      { id: "cartographer", pct: 36 },
      { id: "methodologist", pct: 29 },
      { id: "contrarian", pct: 8, dissent: true },
      { id: "synthesizer", pct: 31 },
      { id: "pragmatist", pct: 21 },
    ],
    flags: [{ text: "Critical — pilots too short and too small to estimate steady-state settlement cost effects", agent: "Contrarian" }],
    guardianDetail: { Source: 86, "Retraction screen": 86, "Preprint status": 88, "Self-citation": 90 },
  },
  {
    slug: "rag-hallucination-reduction",
    category: "Technology",
    question: "Does retrieval-augmented generation reduce hallucination rates on domain QA benchmarks?",
    conf: 79,
    badge: "high",
    badgeText: "Established",
    guardian: 96,
    time: "3d ago",
    grade: "Established",
    agents: [
      { id: "cartographer", pct: 87 },
      { id: "methodologist", pct: 83 },
      { id: "contrarian", pct: 72 },
      { id: "synthesizer", pct: 82 },
      { id: "pragmatist", pct: 77 },
    ],
    flags: [],
    guardianDetail: { Source: 94, "Retraction screen": 88, "Preprint status": 93, "Self-citation": 91 },
  },
  {
    category: "Technology",
    question: "Can current battery chemistries meet the stated grid-storage cost target by the end of the decade?",
    conf: 18,
    badge: "split",
    badgeText: "Evidence gap",
    guardian: 90,
    time: "5h ago",
    grade: "Gap",
    agents: [
      { id: "cartographer", pct: 24 },
      { id: "methodologist", pct: 19 },
      { id: "contrarian", pct: 6, dissent: true },
      { id: "synthesizer", pct: 20 },
      { id: "pragmatist", pct: 12 },
    ],
    flags: [{ text: "Critical — cost projections rest on vendor roadmaps rather than independent production data", agent: "Contrarian" }],
    guardianDetail: { Source: 89, "Retraction screen": 79, "Preprint status": 80, "Self-citation": 92 },
  },
  {
    category: "Technology",
    question: "Do AI coding assistants measurably increase developer throughput on maintenance tasks?",
    conf: 43,
    badge: "mod",
    badgeText: "Contested",
    guardian: 97,
    time: "1d ago",
    grade: "Contested",
    agents: [
      { id: "cartographer", pct: 89 },
      { id: "methodologist", pct: 81 },
      { id: "contrarian", pct: 30, dissent: true },
      { id: "synthesizer", pct: 82 },
      { id: "pragmatist", pct: 81 },
    ],
    flags: [
      {
        text: "Strong — recent controlled studies report no gain or a slowdown on complex maintenance tasks; the net throughput effect is unsettled",
        agent: "Contrarian",
      },
    ],
    guardianDetail: { Source: 94, "Retraction screen": 85, "Preprint status": 84, "Self-citation": 92 },
  },
  {
    category: "Technology",
    question: "Does differential privacy at deployed epsilon values meaningfully limit re-identification risk?",
    conf: 66,
    badge: "mod",
    badgeText: "Probable finding",
    guardian: 96,
    time: "10h ago",
    grade: "Probable",
    agents: [
      { id: "cartographer", pct: 71 },
      { id: "methodologist", pct: 66 },
      { id: "contrarian", pct: 63 },
      { id: "synthesizer", pct: 67 },
      { id: "pragmatist", pct: 66 },
    ],
    flags: [{ text: "Moderate — protection holds at low epsilon but many deployments use values high enough to weaken it", agent: "Contrarian" }],
    guardianDetail: { Source: 95, "Retraction screen": 88, "Preprint status": 93, "Self-citation": 91 },
  },
  {
    category: "Social science",
    question: "Does remote work reduce measured team innovation output?",
    conf: 44,
    badge: "mod",
    badgeText: "Contested",
    guardian: 86,
    time: "2d ago",
    grade: "Contested",
    agents: [
      { id: "cartographer", pct: 50 },
      { id: "methodologist", pct: 44 },
      { id: "contrarian", pct: 26, dissent: true },
      { id: "synthesizer", pct: 42 },
      { id: "pragmatist", pct: 39 },
    ],
    flags: [
      {
        text: "Strong — the innovation metric conflates patent volume with novelty; results reverse under a quality-weighted measure",
        agent: "Contrarian",
      },
    ],
    guardianDetail: { Source: 84, "Retraction screen": 82, "Preprint status": 87, "Self-citation": 83 },
  },
  {
    category: "Social science",
    question: "Do smartphone restrictions in schools improve standardised test performance?",
    conf: 65,
    badge: "mod",
    badgeText: "Probable finding",
    guardian: 96,
    time: "4h ago",
    grade: "Probable",
    agents: [
      { id: "cartographer", pct: 74 },
      { id: "methodologist", pct: 68 },
      { id: "contrarian", pct: 57 },
      { id: "synthesizer", pct: 65 },
      { id: "pragmatist", pct: 61 },
    ],
    flags: [],
    guardianDetail: { Source: 87, "Retraction screen": 86, "Preprint status": 88, "Self-citation": 93 },
  },
  {
    category: "Social science",
    question: "Does early bilingual education improve executive-function measures in children?",
    conf: 42,
    badge: "mod",
    badgeText: "Contested",
    guardian: 91,
    time: "1d ago",
    grade: "Contested",
    agents: [
      { id: "cartographer", pct: 95 },
      { id: "methodologist", pct: 89 },
      { id: "contrarian", pct: 29, dissent: true },
      { id: "synthesizer", pct: 91 },
      { id: "pragmatist", pct: 88 },
    ],
    flags: [
      {
        text: "Strong — the bilingual executive-function advantage fails to replicate in several large pre-registered studies; the effect may reflect publication bias",
        agent: "Contrarian",
      },
    ],
    guardianDetail: { Source: 95, "Retraction screen": 93, "Preprint status": 92, "Self-citation": 95 },
  },
];

function MiniWaffle({ agents }: { agents: AgentScore[] }) {
  return (
    <div className="mb-2.5 flex flex-col gap-[3px]">
      {agents.map((a) => {
        const agent = AGENT_BY_ID[a.id];
        const filled = Math.round(a.pct / 5);
        return (
          <div key={a.id} className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 flex-shrink-0 rounded-full"
              style={{ background: agent.color }}
              title={agent.name}
            />
            <div className="grid flex-1 grid-cols-[repeat(20,minmax(0,1fr))] gap-[2px]">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className={`aspect-square rounded-[1px] ${i < filled ? "bg-rust" : "bg-border"}`} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CardTile({
  card,
  selected,
  onClick,
}: {
  card: SessionCard;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col border-r border-b border-border p-5 text-left transition-colors hover:bg-paper-alt ${
        selected ? "bg-[#FBF5F2]" : "bg-paper"
      }`}
    >
      <div className="mb-1.5 font-mono text-[10px] tracking-[0.07em] text-rust uppercase">{card.category}</div>
      <div className="mb-2.5 flex items-start justify-between gap-2">
        <div className="font-serif text-[13px] leading-[1.45] font-medium text-ink">{card.question}</div>
        <div className="flex-shrink-0 font-mono text-lg font-medium text-rust">{card.conf}%</div>
      </div>
      <MiniWaffle agents={card.agents} />
      <div className="flex items-center justify-between border-t border-border pt-2">
        <div className="flex items-center gap-1.5">
          <span className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-medium ${BADGE_CLASS[card.badge]}`}>
            {card.badgeText}
          </span>
          <span className="font-mono text-[10px] text-subtle">{card.time}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-[3px] w-9 overflow-hidden rounded-full bg-border">
            <div className="h-full rounded-full bg-rust" style={{ width: `${card.guardian}%` }} />
          </div>
          <span className="font-mono text-[10px] text-subtle">{card.guardian}%</span>
        </div>
      </div>
    </button>
  );
}

function Metric({ label, value, valueClassName }: { label: string; value: string; valueClassName: string }) {
  return (
    <div className="rounded-md bg-paper-alt p-2.5">
      <div className="mb-0.5 font-mono text-[10px] tracking-[0.05em] text-subtle uppercase">{label}</div>
      <div className={`font-mono text-[17px] font-medium ${valueClassName}`}>{value}</div>
    </div>
  );
}

function SidebarContent({ card, onClose }: { card: SessionCard; onClose: () => void }) {
  const agentsOver50 = card.agents.filter((a) => a.pct >= 50).length;
  const hasFlag = card.flags.length > 0;
  const keyText = hasFlag
    ? card.flags[0].text
    : "No unresolved objections — the agents converged within the evidence available.";

  return (
    <div className="flex h-full flex-col">
      <div className="sticky top-0 z-10 flex items-start justify-between gap-2.5 border-b border-border bg-paper px-4 py-3.5">
        <div>
          <div className="mb-1 font-mono text-[10px] tracking-[0.05em] text-subtle uppercase">
            {card.category} · {card.time}
          </div>
          <div className="font-serif text-sm leading-[1.45] text-ink">{card.question}</div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded border border-border bg-paper-alt text-xs text-body hover:text-ink"
        >
          ✕
        </button>
      </div>

      <div className="border-b border-border p-4">
        <div className="mb-2.5 font-mono text-[10px] tracking-[0.07em] text-subtle uppercase">Finding</div>
        <div className="mb-2.5 flex items-center gap-2.5">
          <span className={`rounded border px-2.5 py-0.5 font-mono text-[11px] tracking-[0.04em] ${GRADE_CHIP_CLASS[card.grade]}`}>
            {card.grade}
          </span>
          <span className="font-mono text-[11px] text-body">{card.conf}% confidence</span>
        </div>
        <div className="text-[13px] leading-[1.55] text-body">
          <span className="mb-0.5 block font-mono text-[10px] tracking-[0.05em] text-subtle uppercase">
            Key {hasFlag ? "objection" : "note"}
          </span>
          {keyText}
        </div>
      </div>

      {card.slug && (
        <div className="px-4 pt-4">
          <Link
            href={`/outcomes/${card.slug}`}
            className="flex items-center justify-center gap-1.5 rounded-lg bg-ink px-4 py-2.5 font-mono text-xs tracking-[0.03em] text-offwhite transition-colors hover:bg-rust"
          >
            View full deliberation record <span>→</span>
          </Link>
        </div>
      )}

      <div className="border-b border-border p-4">
        <div className="mb-2.5 font-mono text-[10px] tracking-[0.07em] text-subtle uppercase">Session metrics</div>
        <div className="grid grid-cols-2 gap-1.5">
          <Metric label="Confidence" value={`${card.conf}%`} valueClassName="text-rust" />
          <Metric
            label="Consensus"
            value={`${agentsOver50} of ${card.agents.length}`}
            valueClassName={agentsOver50 >= 4 ? "text-conf-high-text" : "text-conf-med-text"}
          />
          <Metric
            label="Dissent flags"
            value={`${card.flags.length}`}
            valueClassName={card.flags.length > 0 ? "text-rust" : "text-conf-high-text"}
          />
          <Metric label="Guardian" value={`${card.guardian}%`} valueClassName="text-rust" />
        </div>
      </div>

      <div className="border-b border-border p-4">
        <div className="mb-2.5 font-mono text-[10px] tracking-[0.07em] text-subtle uppercase">
          Confidence grid · each row = one agent
        </div>
        <div className="mb-2.5 flex flex-col gap-1">
          {card.agents.map((a) => {
            const agent = AGENT_BY_ID[a.id];
            const filled = Math.round(a.pct / 5);
            return (
              <div key={a.id} className="flex items-center gap-2">
                <span
                  className="flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded"
                  style={{ background: agent.color }}
                  title={agent.name}
                >
                  <AgentIcon id={agent.id} className="h-3 w-3" />
                </span>
                <div className="grid flex-1 grid-cols-[repeat(20,minmax(0,1fr))] gap-[2px]">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className={`aspect-square rounded-[1px] ${i < filled ? "bg-rust" : "bg-border"}`} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-2.5">
          {card.agents.map((a) => {
            const agent = AGENT_BY_ID[a.id];
            return (
              <div key={a.id} className="flex items-center gap-1 text-[11px] text-body">
                <span className="h-[7px] w-[7px] rounded-[1.5px]" style={{ background: agent.color }} />
                {agent.name}
                {a.dissent ? " · dissent" : ""}
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-b border-border p-4">
        <div className="mb-2.5 font-mono text-[10px] tracking-[0.07em] text-subtle uppercase">Agent confidence</div>
        <div className="flex flex-col">
          {card.agents.map((a, i, arr) => {
            const agent = AGENT_BY_ID[a.id];
            return (
              <div
                key={a.id}
                className={`flex items-center justify-between py-2 ${i < arr.length - 1 ? "border-b border-border" : ""}`}
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className="flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded"
                    style={{ background: agent.color }}
                  >
                    <AgentIcon id={agent.id} className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-xs font-medium text-ink">{agent.name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-[3px] w-11 overflow-hidden rounded-full bg-border">
                    <div className="h-full rounded-full" style={{ width: `${a.pct}%`, background: agent.color }} />
                  </div>
                  <span
                    className="flex min-w-[32px] items-center justify-end gap-1 font-mono text-xs font-medium"
                    style={{ color: agent.color }}
                  >
                    {a.dissent && <span className="h-1.5 w-1.5 rounded-full bg-[#A05040]" title="Dissenting" />}
                    {a.pct}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-b border-border p-4">
        <div className="mb-2.5 font-mono text-[10px] tracking-[0.07em] text-subtle uppercase">Guardian integrity</div>
        <div className="rounded border border-border bg-paper-alt p-3">
          <div className="mb-2.5 flex items-center justify-between">
            <span className="text-xs font-medium text-ink">Guardian · integrity score</span>
            <span className="font-mono text-xl font-medium text-rust">{card.guardian}%</span>
          </div>
          <div className="flex flex-col gap-1.5">
            {Object.entries(card.guardianDetail).map(([k, v]) => (
              <div key={k} className="flex items-center gap-1.5">
                <span className="flex-1 text-[11px] text-body">{k}</span>
                <div className="h-[3px] w-14 overflow-hidden rounded-full bg-border">
                  <div className="h-full rounded-full bg-rust" style={{ width: `${v}%` }} />
                </div>
                <span className="w-6 flex-shrink-0 text-right font-mono text-[10px] text-subtle">{v}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-b border-border px-4 py-3.5 text-center text-[11px] leading-[1.5] text-subtle">
        Illustrative session summary. Confidence grades are calibrated against real-world outcomes.
      </div>

      {hasFlag && (
        <div className="border-b border-border p-4">
          <div className="mb-2.5 font-mono text-[10px] tracking-[0.07em] text-subtle uppercase">Unresolved objections</div>
          <div className="flex flex-col">
            {card.flags.map((f, i, arr) => (
              <div key={i} className={`flex gap-1.5 py-2 ${i < arr.length - 1 ? "border-b border-border" : ""}`}>
                <span className="mt-1 h-[5px] w-[5px] flex-shrink-0 rounded-full bg-rust" />
                <div>
                  <div className="text-xs leading-[1.5] text-body">{f.text}</div>
                  <div className="mt-0.5 font-mono text-[10px] text-subtle">{f.agent}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="m-4">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-1.5 rounded-md border border-border bg-paper-alt py-2 text-xs text-body transition-colors hover:border-rust hover:bg-rust hover:text-offwhite"
        >
          View full session record →
        </button>
      </div>

      <div className="pb-4 text-center font-mono text-[10px] tracking-[0.04em] text-border">Illustrative data · augle.com</div>
    </div>
  );
}

export function OutcomesBrowser() {
  const [filter, setFilter] = useState("All");
  const [gradeFilter, setGradeFilter] = useState("All");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const filtered = useMemo(
    () =>
      CARDS.map((card, idx) => ({ card, idx })).filter(
        ({ card }) =>
          (filter === "All" || card.category === filter) && (gradeFilter === "All" || card.grade === gradeFilter),
      ),
    [filter, gradeFilter],
  );

  const selectedCard = selectedIdx !== null ? CARDS[selectedIdx] : null;

  function selectCard(idx: number) {
    setSelectedIdx(idx);
    setOpen(true);
  }
  function closeSidebar() {
    setOpen(false);
  }
  function selectFilter(cat: string) {
    setFilter(cat);
    setOpen(false);
  }
  function selectGrade(grade: string) {
    setGradeFilter(grade);
    setOpen(false);
  }

  return (
    <div className="flex flex-col md:h-[760px]">
      {/* FILTER BAR */}
      <div className="flex flex-wrap items-center gap-3 border-b border-border bg-paper px-5 py-3 md:px-10">
        <span className="font-mono text-[10px] tracking-[0.06em] text-subtle uppercase">Filter</span>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => selectFilter(cat)}
              className={`rounded-[3px] border px-3 py-1 font-mono text-xs whitespace-nowrap transition-colors ${
                filter === cat
                  ? "border-ink bg-ink text-offwhite"
                  : "border-border bg-cream text-body hover:border-rust hover:text-rust"
              }`}
            >
              {cat === "All" ? "All domains" : cat}
            </button>
          ))}
        </div>
        <div className="hidden h-6 w-px bg-border sm:block" />
        <div className="flex flex-wrap gap-1.5">
          {GRADES.map((grade) => (
            <button
              key={grade}
              type="button"
              onClick={() => selectGrade(grade)}
              className={`rounded-[3px] border px-3 py-1 font-mono text-xs whitespace-nowrap transition-colors ${
                gradeFilter === grade
                  ? "border-ink bg-ink text-offwhite"
                  : "border-border bg-cream text-body hover:border-rust hover:text-rust"
              }`}
            >
              {grade === "All" ? "All grades" : grade}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <span className="font-mono text-[13px] font-medium text-ink">33</span>
              <span className="font-mono text-[10px] tracking-[0.05em] text-subtle uppercase">Sessions</span>
            </div>
            <div className="h-6 w-px bg-border" />
            <div className="flex flex-col items-center">
              <span className="font-mono text-[13px] font-medium text-ink">11</span>
              <span className="font-mono text-[10px] tracking-[0.05em] text-subtle uppercase">Domains</span>
            </div>
          </div>
          <span className="font-mono text-xs text-subtle">Confidence ↓</span>
        </div>
      </div>

      {/* LIVE STRIP */}
      <div className="flex items-center gap-3 overflow-x-auto border-b border-border bg-paper-alt px-5 py-2 md:px-10">
        <div className="flex flex-shrink-0 items-center gap-1.5 font-mono text-[10px] tracking-[0.06em] text-subtle uppercase">
          <span className="h-[5px] w-[5px] flex-shrink-0 rounded-full bg-rust" />
          Recently resolved
        </div>
        <div className="flex gap-1.5">
          {CARDS.slice(0, 3).map((c, i) => (
            <div
              key={i}
              className="flex flex-shrink-0 items-center gap-1.5 rounded border border-border bg-paper px-2.5 py-1"
            >
              <span className="h-1 w-1 flex-shrink-0 rounded-full bg-rust" />
              <span className="max-w-[200px] truncate text-[11px] text-body">{c.question}</span>
              <span className="font-mono text-[11px] font-medium text-rust">{c.conf}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* BODY: GRID + SIDEBAR */}
      <div className="flex flex-1 flex-col md:flex-row md:overflow-hidden">
        <div className="flex-1 border-t border-l border-border md:overflow-y-auto">
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${open ? "" : "lg:grid-cols-3"}`}>
            {filtered.map(({ card, idx }) => (
              <CardTile key={idx} card={card} selected={open && selectedIdx === idx} onClick={() => selectCard(idx)} />
            ))}
          </div>
        </div>

        {open && <div className="fixed inset-0 z-40 bg-ink/40 md:hidden" onClick={closeSidebar} />}

        <div
          className={`fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-2xl border-t border-border bg-paper shadow-[0_-8px_28px_rgba(30,28,26,0.18)] transition-transform duration-300 ease-out md:static md:z-auto md:max-h-none md:flex-shrink-0 md:translate-y-0 md:overflow-hidden md:rounded-none md:border-t-0 md:shadow-none md:transition-[width] ${
            open ? "translate-y-0" : "translate-y-full"
          } ${open ? "md:w-80 md:border-l md:border-border" : "md:w-0"}`}
        >
          <div className="flex justify-center py-2 md:hidden">
            <div className="h-1 w-9 rounded-full bg-border" />
          </div>
          <div className="md:h-full md:w-80 md:overflow-y-auto">
            {selectedCard && <SidebarContent card={selectedCard} onClose={closeSidebar} />}
          </div>
        </div>
      </div>
    </div>
  );
}

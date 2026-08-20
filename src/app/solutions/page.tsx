import type { Metadata } from "next";
import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { btnPrimary, eyebrow } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Solutions — Augle",
  description:
    "Augle's multi-agent deliberation ensemble serves researchers, analysts, and decision-makers across eleven verticals — from universities to venture capital.",
};

/** Listing-page-only content: shorter persona line + single question + tags per vertical.
 *  Distinct from the richer per-vertical data in src/data/solutions.ts, so kept local. */
const VERTICALS = [
  {
    slug: "universities",
    jumpLabel: "Universities",
    name: "Universities + academia",
    personas: "PhD candidates · Grant applicants · Research faculty · Pre-submission reviewers",
    desc: "Research questions don't have clean answers before the committee does. Augle maps what's settled, what's contested, and what's genuinely unknown in your methodology — before the defence, before the submission, before the study section finds it first.",
    question:
      "Does experience sampling via smartphone provide sufficient ecological validity to support attentional state claims in naturalistic environments?",
    tags: ["Dissertation defence", "Grant review", "Replication", "Peer review prep"],
    mode: "Academic integrity focus",
  },
  {
    slug: "research-labs",
    jumpLabel: "Research labs",
    name: "Research labs",
    personas: "Principal investigators · Lab directors · Clinical researchers · Biotech scientists",
    desc: "High-stakes hypothesis decisions require more than a literature review. Augle stress-tests your evidence base against the strongest objections in the field — surfacing validity gaps before they become rejection vectors or, worse, replication failures.",
    question:
      "Is the protein folding hypothesis supported by the current cryo-EM evidence base, or are the resolution limitations material to the claim?",
    tags: ["Hypothesis validation", "Clinical trial design", "Landmark finding audit"],
    mode: "Clinical integrity focus",
  },
  {
    slug: "policy",
    jumpLabel: "Policy",
    name: "Policy + lawmakers",
    personas: "Legislative analysts · Policy advisors · Congressional staff · Regulatory officers",
    desc: "Policy testimony and impact assessments rest on evidence that gets challenged in real time. Augle produces a structured map of what the evidence actually supports — and what it doesn't — so you're never the one who finds out at the hearing.",
    question:
      "Does the proposed infrastructure bill's cost-benefit methodology adequately account for climate-adjusted risk over a 30-year horizon?",
    tags: ["Bill testimony", "CBA review", "Regulatory impact", "Education funding"],
    mode: "Policy focus",
  },
  {
    slug: "law-firms",
    jumpLabel: "Law firms",
    name: "Law firms",
    personas: "Litigation partners · Associates · Expert witness coordinators · Regulatory counsel",
    desc: "Case theory, expert evidence, and regulatory applicability all need to survive adversarial challenge. Augle's Contrarian plays opposing counsel before opposing counsel does — surfacing the strongest objections and their resolution conditions while you still have time to respond.",
    question:
      "Does the expert testimony meet the Daubert threshold given the methodological assumptions in the underlying study design?",
    tags: ["Case theory", "Daubert review", "Regulatory applicability", "Expert evidence"],
    mode: "Legal integrity focus",
  },
  {
    slug: "venture-capital",
    jumpLabel: "Venture capital",
    name: "Venture capital + PE",
    personas: "General partners · Analysts · Operating partners · Investment committees",
    desc: "TAM assumptions, growth theses, and portfolio pivot decisions all depend on evidence that isn't neutral. Augle stress-tests the claim before the IC does — and when the evidence doesn't support the thesis, it says so, clearly, with the specific construct validity issue identified.",
    question: "Does the TAM assumption in this Series A deck reflect the addressable market or the theoretical maximum?",
    tags: ["TAM validation", "Series A review", "Portfolio pivots", "IC prep"],
    mode: "Financial focus",
  },
  {
    slug: "think-tanks",
    jumpLabel: "Think tanks",
    name: "Think tanks + nonprofits",
    personas: "Research directors · Policy fellows · Program officers · Impact evaluators",
    desc: "Policy reports and intervention recommendations carry institutional weight. Augle maps the evidence landscape before publication — distinguishing what the data supports from what you wish it supported, and producing an auditable record of the deliberation behind the finding.",
    question:
      "Does the available evidence support the criminal justice intervention's recidivism reduction claims at the proposed scale?",
    tags: ["Policy reports", "Intervention review", "Global health", "Impact evaluation"],
    mode: "Policy focus",
  },
  {
    slug: "enterprise",
    jumpLabel: "Enterprise",
    name: "Enterprise",
    personas: "Strategy leads · Corporate development · M&A teams · Supply chain executives",
    desc: "Market entry decisions, M&A synergy assumptions, and supply chain resilience theses all carry evidence that needs adversarial pressure before capital is committed. Augle runs the pre-mortem your team won't — because it has no stake in the outcome.",
    question:
      "Does the M&A synergy thesis hold under independent examination of the integration assumptions and market overlap claims?",
    tags: ["Market entry", "M&A synergy", "Supply chain", "Pre-mortem"],
    mode: "Enterprise focus",
  },
  {
    slug: "healthcare",
    jumpLabel: "Healthcare",
    name: "Healthcare + life sciences",
    personas: "Chief medical officers · Formulary committees · Health system strategists · Pharma teams",
    desc: "Drug-drug interactions, health system partnerships, and digital therapeutics coverage decisions all depend on evidence with gaps that matter. Augle's Guardian operates in clinical integrity mode — flagging unverified sources, retracted studies, and the studies that simply don't exist yet.",
    question:
      "Is the drug-drug interaction evidence sufficient to contraindicate concurrent use in patients with moderate hepatic impairment?",
    tags: ["Drug interactions", "Formulary decisions", "Health system strategy", "Coverage review"],
    mode: "Clinical integrity focus",
  },
  {
    slug: "government",
    jumpLabel: "Government",
    name: "Government + public sector",
    personas: "Agency analysts · Budget officers · Infrastructure planners · Public safety officials",
    desc: "Infrastructure investment prioritisation, regulatory impact assessment, and public safety technology deployment decisions require evidence that can withstand public and legislative scrutiny. Augle produces the auditable deliberation record that accountability demands.",
    question: "Does the regulatory impact assessment adequately capture second-order economic effects in underserved communities?",
    tags: ["Infrastructure", "Regulatory impact", "Public safety tech", "Budget analysis"],
    mode: "Policy focus",
  },
  {
    slug: "financial-services",
    jumpLabel: "Financial services",
    name: "Financial services",
    personas: "Risk officers · Compliance teams · ESG analysts · Model validation teams",
    desc: "Model risk audits, ESG integration decisions, and sanctions compliance exposure reviews all require evidence that holds up to regulatory examination. Augle's Guardian operates in financial integrity mode — and the Synthesizer is architecturally forbidden from producing buy, sell, long, or short framing.",
    question: "Does the internal model's assumptions adequately capture tail risk under the Basel III stress scenarios?",
    tags: ["Model risk", "ESG integration", "Sanctions exposure", "Compliance review"],
    mode: "Financial integrity focus",
  },
  {
    slug: "media",
    jumpLabel: "Media",
    name: "Media + journalism",
    personas: "Investigative reporters · Science journalists · Editors · Fact-checking teams",
    desc: "Algorithmic bias investigations, source credibility assessments, and science reporting standards all depend on the same thing: knowing what the evidence actually says versus what you've been told it says. Augle's SVS authenticates every source in real time — no hallucinated citations reach the finding.",
    question: "Is the algorithmic bias claim in the dataset robust to the methodological critiques raised in the academic literature?",
    tags: ["Algorithmic bias", "Source credibility", "Science reporting", "Fact verification"],
    mode: "Editorial integrity focus",
  },
];

const THREAD = [
  {
    title: "The stakes are real",
    body: "A wrong finding in a dissertation defence, a clinical review, or an investment thesis doesn't stay wrong — it propagates. Augle is built for questions where the cost of a confident wrong answer materially exceeds the cost of a calibrated uncertain one.",
  },
  {
    title: "The evidence is contested",
    body: "The questions that matter most don't have clean answers. They have conflicting studies, methodological disputes, and gaps where the relevant evidence doesn't exist yet. Augle maps that landscape precisely — settled, contested, unknown — instead of collapsing it into a single confident claim.",
  },
  {
    title: "The objections are coming",
    body: "Every finding faces a Contrarian eventually — a committee member, an opposing partner, a regulator, a peer reviewer. Augle's Contrarian runs at temperature 1.0 and is required to steelman every claim before challenging it. Better to face the strongest version of the objection before the stakes are live.",
  },
];

export default function SolutionsPage() {
  return (
    <>
      {/* HERO */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-20 lg:px-[72px] lg:py-24">
          <div className={eyebrow}>Solutions</div>
          <h1 className="mb-6 max-w-2xl font-serif text-[42px] font-normal leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-[64px]">
            One ensemble.
            <br />
            <em className="text-rust not-italic italic">Eleven verticals.</em>
            <br />
            One question type.
          </h1>
          <p className="mb-10 max-w-2xl text-lg leading-[1.8] text-body">
            The questions that matter most don&apos;t sort neatly by industry. A dissertation
            defence, an M&amp;A thesis, a clinical evidence review, a policy cost-benefit analysis
            — they all share the same structure: contested evidence, high stakes, and a wrong
            answer that costs more than the right one would have. Augle is built for that
            structure, regardless of domain.
          </p>
          <div className="flex flex-wrap gap-2">
            {VERTICALS.map((v) => (
              <Link
                key={v.slug}
                href={`/solutions/${v.slug}`}
                className="rounded border border-border bg-paper px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-rust hover:text-rust"
              >
                {v.jumpLabel}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* VERTICALS GRID */}
      <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-24 lg:px-[72px]">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {VERTICALS.map((v, i) => (
            <div
              key={v.slug}
              className="flex flex-col overflow-hidden rounded-lg border border-border bg-paper transition-colors hover:border-rust"
            >
              <div className="flex-1 p-6">
                <div className="mb-2 font-mono text-[10px] text-subtle">
                  {String(i + 1).padStart(2, "0")} / 11
                </div>
                <div className="mb-1.5 font-serif text-xl leading-snug text-ink">{v.name}</div>
                <div className="mb-3.5 text-xs leading-relaxed text-subtle italic">{v.personas}</div>
                <p className="mb-3.5 text-[13px] leading-relaxed text-body">{v.desc}</p>
                <p className="mb-3.5 rounded border-l-2 border-rust bg-paper-alt px-3.5 py-3 text-xs leading-relaxed text-body italic">
                  &ldquo;{v.question}&rdquo;
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {v.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-cell px-2 py-0.5 font-mono text-[11px] text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-border px-6 py-3.5">
                <span className="font-mono text-[10px] tracking-[0.04em] text-subtle">{v.mode}</span>
                <Link href={`/solutions/${v.slug}`} className="text-xs font-medium text-rust">
                  Explore →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COMMON THREAD */}
      <div className="border-t border-border bg-ink py-16 md:py-[72px]">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-[72px]">
          <div className={eyebrow}>The common thread</div>
          <h2 className="mb-12 max-w-xl font-serif text-3xl leading-[1.15] text-offwhite md:text-[44px]">
            Every vertical shares the same underlying problem.
          </h2>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border-dark bg-border-dark md:grid-cols-3">
            {THREAD.map((item) => (
              <div key={item.title} className="bg-ink-2 p-7">
                <div className="mb-2.5 font-serif text-lg text-offwhite">{item.title}</div>
                <p className="text-[13px] leading-relaxed text-faint">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NOT SURE */}
      <div className="border-b border-border bg-paper py-12">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-8 px-5 md:px-10 lg:grid-cols-[1fr_auto] lg:px-[72px]">
          <div>
            <h2 className="mb-3 font-serif text-[34px] leading-tight text-ink">
              Not sure which vertical fits your work?
            </h2>
            <p className="max-w-2xl text-lg leading-[1.8] text-body">
              Augle is built around question structure, not industry classification. If your
              question has contested evidence and real stakes, it&apos;s the right tool —
              regardless of which vertical it falls into. Browse the use case library to find
              sessions closest to yours.
            </p>
          </div>
          <Link href="/use-cases" className={`${btnPrimary} whitespace-nowrap`}>
            Browse use cases →
          </Link>
        </div>
      </div>

      <CtaBanner
        title={
          <>
            Find your vertical.
            <br />
            Run your question.
          </>
        }
        body="Join waitlist and submit a session on a question that matters to your work."
      />
    </>
  );
}

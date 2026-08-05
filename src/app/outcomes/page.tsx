import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CtaBanner } from "@/components/CtaBanner";
import { eyebrow, sectionTitle } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Augle Outcomes | Public Record of AI Deliberation Sessions & Accuracy",
  description:
    "Every Augle session is published in full — confidence grade, agent scores, Guardian audit trail, and Brier score against market consensus. Browse resolved sessions by domain.",
};

type Grade = "Established" | "Probable" | "Contested" | "Gap";

const GRADE_CLASS: Record<Grade, string> = {
  Established: "bg-conf-high-bg text-conf-high-text",
  Probable: "bg-[#D4E4F5] text-[#2A4A7A]",
  Contested: "bg-conf-med-bg text-conf-med-text",
  Gap: "bg-conf-contested-bg text-conf-contested-text",
};

type SessionCard = {
  href: string;
  domain: string;
  depth: "Standard" | "Deep";
  question: string;
  grade: Grade;
  dissent: number;
};

// Preserved exactly as in the source: the last two cards (UBI pilots,
// room-temperature superconductors) link to a bare "/outcomes/" href with no
// specific slug in the mockup — no matching detail page exists, so they self-link.
const SESSION_CARDS: SessionCard[] = [
  {
    href: "/outcomes/life-glp1-vs-bariatric",
    domain: "Life sciences",
    depth: "Deep",
    question:
      "\"What does the evidence establish about the comparative effectiveness of GLP-1 agonists vs. bariatric surgery for long-term weight maintenance?\"",
    grade: "Contested",
    dissent: 1,
  },
  {
    href: "/outcomes/soc-screen-time-depression",
    domain: "Social science",
    depth: "Standard",
    question: "\"Do screen-time interventions reduce depressive symptoms in adolescents?\"",
    grade: "Gap",
    dissent: 1,
  },
  {
    href: "/outcomes/policy-masking-mandates",
    domain: "Policy",
    depth: "Standard",
    question:
      "\"What does the evidence establish about the effectiveness of indoor masking mandates in reducing COVID-19 community transmission?\"",
    grade: "Contested",
    dissent: 1,
  },
  {
    href: "/outcomes/life-crispr-reproducibility",
    domain: "Life sciences",
    depth: "Standard",
    question: "\"Is the CRISPR off-target editing rate reported in this foundational study reproducible?\"",
    grade: "Contested",
    dissent: 1,
  },
  {
    href: "/outcomes/policy-mnpi-exposure",
    domain: "Policy",
    depth: "Deep",
    question:
      "\"Based on SEC enforcement patterns, what is the realistic exposure profile on the material non-public information question?\"",
    grade: "Probable",
    dissent: 1,
  },
  {
    href: "/outcomes/tech-photonic-chip",
    domain: "Technology",
    depth: "Deep",
    question:
      "\"Does the evidence support the team's claim of commercially relevant photonic-chip inference throughput at competitive precision?\"",
    grade: "Contested",
    dissent: 1,
  },
  {
    href: "/outcomes",
    domain: "Economics",
    depth: "Standard",
    question: "\"Do universal basic income pilots produce sustained labour-market participation effects?\"",
    grade: "Contested",
    dissent: 1,
  },
  {
    href: "/outcomes",
    domain: "Technology",
    depth: "Standard",
    question: "\"What is the realistic technology-readiness level for room-temperature superconducting materials?\"",
    grade: "Gap",
    dissent: 1,
  },
];

const DOMAIN_FILTERS = ["All domains", "Life sciences", "Policy", "Economics", "Technology", "Social science"];
const GRADE_FILTERS = ["All grades", "Established", "Probable", "Contested", "Gap"];

const HOW_STEPS = [
  {
    n: 1,
    title: "A session runs on a research question",
    body: "A session addresses an open research question — academic, policy, legal, or clinical. The question and its scope are locked to the session record before deliberation begins.",
  },
  {
    n: 2,
    title: "The full deliberation is logged with provenance",
    body: "Every agent output, every evidence node, every Contrarian objection, and every Guardian flag is written to the session transcript with a timestamp and agent attribution. The record is immutable after session close.",
  },
  {
    n: 3,
    title: "The finding is produced with a confidence grade",
    body: "The Synthesizer produces an evidence-anchored finding graded Established, Probable, Contested, or Gap — bounded by the Methodologist's confidence ceiling. The grade is the finding, not a footnote to it.",
  },
  {
    n: 4,
    title: "Reopen conditions are attached",
    body: "Each finding carries structured reopen conditions: the specific new evidence, publication, or replication result that would move the grade. Uncertainty is made explicit, not hidden.",
  },
  {
    n: 5,
    title: "The full record is published",
    body: "Sessions are published in full — question, finding, confidence grade, agent outputs, Contrarian objections, and Guardian flags. Every claim in the record is auditable against the source transcript.",
  },
  {
    n: 6,
    title: "The corpus accumulates as a structured asset",
    body: "Every session adds a structured record to the reasoning corpus: multi-agent deliberation, adversarial challenge, and calibrated confidence across domains. It is a dataset of how the system reasons — it exists only because the sessions ran.",
  },
];

const CORPUS_METRICS = [
  { label: "Beta launch", val: "First live sessions", accent: true },
  { label: "Day 90", val: "Deliberation behaviour visible", accent: false },
  { label: "Day 180 — 2,000–5,000 sessions", val: "Domain coverage broadens", accent: false },
  { label: "Day 365 — 10,000+ sessions", val: "Research-scale corpus", accent: false },
  { label: "Year 3 — 1.5M+ sessions", val: "Largest structured AI deliberation dataset", accent: true },
];

const AGENT_SCORES = [
  { name: "Cartographer", pct: 64 },
  { name: "Methodologist", pct: 58 },
  { name: "Contrarian", pct: 37 },
  { name: "Synthesizer", pct: 49 },
  { name: "Pragmatist", pct: 45 },
];

export default function OutcomesPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Outcomes" }]} />

      {/* HERO */}
      <div className="border-b border-border">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-5 py-16 md:px-10 md:py-20 lg:grid-cols-[1fr_420px] lg:items-start lg:gap-20 lg:px-[72px] lg:py-24">
          <div>
            <div className={eyebrow}>Public deliberations</div>
            <h1 className="mb-6 font-serif text-[42px] font-normal leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-[56px]">
              Every deliberation
              <br />
              is a <em className="text-rust not-italic italic">complete record.</em>
            </h1>
            <p className="mb-6 max-w-xl text-lg leading-[1.8] text-body">
              Every Augle session is published in full — the question, the finding, the
              confidence grade, every agent&apos;s contribution, and every Contrarian
              objection. Not summaries. The full structured record.
            </p>
            <p className="mb-6 max-w-xl rounded border-l-2 border-border bg-paper px-4 py-3 font-mono text-[13px] text-subtle">
              Example sessions, shown to demonstrate the record format. Live sessions publish
              here as they run.
            </p>
            <Link
              href="/outcomes/browser"
              className="inline-flex items-center gap-2 rounded bg-rust px-6 py-3.5 text-[15px] font-medium text-offwhite transition-opacity hover:opacity-90"
            >
              Browse the interactive session log <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="rounded-lg bg-ink p-6">
            <div className={eyebrow}>Corpus · illustrative</div>
            <div className="mb-4 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border-dark bg-border-dark">
              <div className="bg-ink-2 p-4">
                <div className="mb-1 font-serif text-3xl text-offwhite">33</div>
                <div className="font-mono text-[10px] tracking-[0.06em] text-faint uppercase">Sessions</div>
              </div>
              <div className="bg-ink-2 p-4">
                <div className="mb-1 font-serif text-3xl text-rust">11</div>
                <div className="font-mono text-[10px] tracking-[0.06em] text-faint uppercase">Domains covered</div>
              </div>
              <div className="bg-ink-2 p-4">
                <div className="mb-1 font-serif text-3xl text-offwhite">38%</div>
                <div className="font-mono text-[10px] tracking-[0.06em] text-faint uppercase">Contested or Gap</div>
              </div>
              <div className="bg-ink-2 p-4">
                <div className="mb-1 font-serif text-3xl text-offwhite">93%</div>
                <div className="font-mono text-[10px] tracking-[0.06em] text-faint uppercase">Avg Guardian integrity</div>
              </div>
            </div>
            <p className="font-mono text-[11px] leading-relaxed text-faint">
              The record captures the ensemble&apos;s confidence grade, agent contributions,
              dissent, and Guardian integrity for every session.
            </p>
          </div>
        </div>
      </div>

      {/* FILTER BAR (illustrative — non-interactive on this page; see the interactive browser) */}
      <div className="border-b border-border bg-paper">
        <div className="mx-auto flex max-w-[1280px] items-center gap-3 overflow-x-auto px-5 py-3 md:px-10 lg:px-[72px]">
          <span className="flex-shrink-0 font-mono text-[10px] tracking-[0.06em] text-subtle uppercase">Filter</span>
          <div className="flex flex-shrink-0 gap-1.5">
            {DOMAIN_FILTERS.map((f, i) => (
              <span
                key={f}
                className={`flex-shrink-0 rounded-[3px] border border-border px-3 py-1 font-mono text-xs whitespace-nowrap ${
                  i === 0 ? "bg-ink text-offwhite border-ink" : "bg-cream text-body"
                }`}
              >
                {f}
              </span>
            ))}
          </div>
          <div className="hidden h-6 w-px flex-shrink-0 bg-border sm:block" />
          <div className="flex flex-shrink-0 gap-1.5">
            {GRADE_FILTERS.map((f, i) => (
              <span
                key={f}
                className={`flex-shrink-0 rounded-[3px] border border-border px-3 py-1 font-mono text-xs whitespace-nowrap ${
                  i === 0 ? "bg-ink text-offwhite border-ink" : "bg-cream text-body"
                }`}
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* SESSIONS GRID */}
      <div className="border-b border-border py-16">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-[72px]">
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-serif text-3xl font-normal text-ink">Deliberation sessions</h2>
            <span className="font-mono text-xs text-subtle">Illustrative data · sorted by recency</span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {SESSION_CARDS.map((card, i) => (
              <Link
                key={i}
                href={card.href}
                className="block overflow-hidden rounded-lg border border-border bg-paper transition-colors hover:border-rust"
              >
                <div className="border-b border-border px-5 py-4">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="font-mono text-[10px] tracking-[0.06em] text-rust uppercase">{card.domain}</span>
                    <span className="h-[3px] w-[3px] rounded-full bg-border" />
                    <span className="font-mono text-[10px] text-subtle">{card.depth}</span>
                  </div>
                  <p className="font-serif text-[15px] leading-[1.5] text-ink">{card.question}</p>
                </div>
                <div className="flex items-center justify-between px-5 py-3.5">
                  <span className={`rounded font-mono text-[11px] px-2.5 py-0.5 ${GRADE_CLASS[card.grade]}`}>
                    {card.grade}
                  </span>
                  <span className="rounded bg-[#FBF5F2] px-1.5 py-0.5 font-mono text-[10px] text-rust">
                    {card.dissent} dissent
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURED SESSION DETAIL */}
      <div className="border-t border-border bg-ink py-20">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-[72px]">
          <div className={eyebrow}>Featured session · full record</div>
          <h2 className="mb-10 max-w-2xl font-serif text-3xl leading-[1.15] text-offwhite md:text-[44px]">
            What a complete deliberation record looks like.
          </h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
            <div className="overflow-hidden rounded-lg border border-border-dark bg-ink-2">
              <div className="border-b border-border-dark px-7 py-6">
                <div className="mb-2.5 font-mono text-[10px] tracking-[0.06em] text-rust uppercase">
                  Life sciences · Deep depth · Healthcare
                </div>
                <div className="mb-4 font-serif text-[22px] leading-[1.4] text-offwhite">
                  &quot;What does the evidence establish about the comparative effectiveness of GLP-1 agonists vs.
                  bariatric surgery for long-term weight maintenance?&quot;
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded bg-[#2A1A10] px-2.5 py-0.5 font-mono text-[10px] text-rust">Deep · ~40 min</span>
                  <span className="rounded bg-svs-verified-bg px-2.5 py-0.5 font-mono text-[10px] text-svs-verified">
                    Healthcare
                  </span>
                </div>
              </div>
              <div className="px-7 py-6">
                <div className="mb-6">
                  <div className="mb-2.5 font-mono text-[10px] tracking-[0.06em] text-faint uppercase">
                    Finding · Phase 3 synthesis
                  </div>
                  <div className="mb-2.5 flex items-center gap-3">
                    <span className="font-serif text-4xl text-svs-verified">Contested</span>
                    <span className="font-mono text-lg text-svs-verified">46%</span>
                  </div>
                  <p className="text-sm leading-[1.7] text-faint">
                    The evidence does not support a directional comparative-effectiveness claim. Bariatric surgery
                    shows comparable-to-larger and more durable weight loss in long-term observational cohorts, but
                    no large long-term head-to-head randomised trial exists — the comparison rests on indirect
                    evidence across materially different populations. The finding is Contested: the dispute is
                    named and both positions preserved, rather than resolved into a false winner. Reopen condition:
                    a head-to-head randomised trial with ≥3-year follow-up would move the grade.
                  </p>
                </div>
                <div className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-3">
                  <div className="rounded bg-ink p-3">
                    <div className="mb-1.5 font-mono text-[10px] tracking-[0.06em] text-rust uppercase">
                      Phase 1 · Exploration
                    </div>
                    <p className="text-[11px] leading-[1.5] text-faint">
                      Cartographer maps settled ground (both interventions produce clinically significant
                      short-term loss), contested terrain (relative durability beyond three years), and unknown
                      territory (outcomes in matched long-term populations).
                    </p>
                  </div>
                  <div className="rounded bg-ink p-3">
                    <div className="mb-1.5 font-mono text-[10px] tracking-[0.06em] text-rust uppercase">
                      Phase 2 · Deliberation
                    </div>
                    <p className="text-[11px] leading-[1.5] text-faint">
                      Methodologist caps the comparative claim at Contested — no large long-term head-to-head RCT,
                      indirect comparison only. Contrarian raises a Strong objection on population
                      non-comparability. Guardian authenticates all 22 citations and flags one industry-funded
                      extension.
                    </p>
                  </div>
                  <div className="rounded bg-ink p-3">
                    <div className="mb-1.5 font-mono text-[10px] tracking-[0.06em] text-rust uppercase">
                      Phase 3 · Synthesis
                    </div>
                    <p className="text-[11px] leading-[1.5] text-faint">
                      Synthesizer produces a Contested finding that names the dispute and preserves both positions.
                      Pragmatist declines a directional recommendation and proposes a follow-on session scoped to
                      the head-to-head evidence gap.
                    </p>
                  </div>
                </div>
                <div className="rounded-md bg-ink p-4">
                  <div className="mb-3 font-mono text-[10px] tracking-[0.06em] text-subtle uppercase">
                    Unresolved objections · preserved verbatim
                  </div>
                  <div className="flex flex-col divide-y divide-ink-2">
                    <div className="flex gap-2.5 py-2">
                      <span className="mt-0.5 flex-shrink-0 rounded bg-svs-flagged-bg px-1.5 py-0.5 font-mono text-[10px] whitespace-nowrap text-rust">
                        Strong
                      </span>
                      <span className="text-[11px] leading-[1.5] text-faint">
                        &quot;No large long-term head-to-head randomised trial exists. The comparison rests on
                        indirect evidence across cohorts with materially different baseline BMI, age, and
                        comorbidity profiles — the effect estimate is not transportable between populations.&quot;
                      </span>
                    </div>
                    <div className="flex gap-2.5 pt-2">
                      <span className="mt-0.5 flex-shrink-0 rounded bg-[#2C2820] px-1.5 py-0.5 font-mono text-[10px] whitespace-nowrap text-[#C79233]">
                        Moderate
                      </span>
                      <span className="text-[11px] leading-[1.5] text-faint">
                        &quot;The durability evidence for surgery extends further only because the intervention is
                        older. Longer follow-up is not the same as superior durability — the comparison is
                        confounded by evidence age.&quot;
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="rounded-lg border border-border-dark bg-ink-2 p-5">
                <div className="mb-3.5 font-mono text-[10px] tracking-[0.06em] text-faint uppercase">
                  Session metadata
                </div>
                {[
                  ["Vertical", "Healthcare"],
                  ["Guardian flags", "1 — industry-funded source"],
                  ["Citations verified", "22 of 22"],
                  ["Dissent flags", "1 Strong · 1 Moderate"],
                  ["Reopen conditions", "3 defined"],
                  ["Finding", "Contested"],
                ].map(([label, val], i, arr) => (
                  <div
                    key={label}
                    className={`flex items-center justify-between py-2 ${i < arr.length - 1 ? "border-b border-ink-3" : ""}`}
                  >
                    <span className="text-xs text-faint">{label}</span>
                    <span className="font-mono text-xs text-[#D4CFC6]">{val}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-lg border border-border-dark bg-ink-2 p-5">
                <div className="mb-3.5 font-mono text-[10px] tracking-[0.06em] text-faint uppercase">
                  Agent confidence scores
                </div>
                <div className="flex flex-col gap-1.5">
                  {AGENT_SCORES.map((a) => (
                    <div key={a.name} className="flex items-center gap-2.5">
                      <span className="w-20 flex-shrink-0 font-mono text-[10px] text-faint">{a.name}</span>
                      <div className="h-1 flex-1 overflow-hidden rounded-full bg-ink-3">
                        <div className="h-full rounded-full bg-rust" style={{ width: `${a.pct}%` }} />
                      </div>
                      <span className="w-7 flex-shrink-0 text-right font-mono text-[10px] text-faint">{a.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HOW OUTCOMES WORK */}
      <div className="border-b border-border bg-paper py-20">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-[72px]">
          <div className={eyebrow}>How it works</div>
          <h2 className={sectionTitle}>
            From session to
            <br />
            published record.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {HOW_STEPS.map((step) => (
              <div key={step.n} className="rounded-lg border border-border bg-cream p-6">
                <div className="mb-3 font-serif text-4xl text-rust">{step.n}</div>
                <div className="mb-2 text-[15px] font-medium text-ink">{step.title}</div>
                <p className="text-[13px] leading-[1.7] text-body">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CORPUS EXPLAINER */}
      <div className="border-t border-border bg-ink py-20">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-5 md:px-10 lg:grid-cols-2 lg:gap-20 lg:px-[72px]">
          <div>
            <div className={eyebrow}>The reasoning corpus</div>
            <h2 className="mb-4 font-serif text-3xl leading-[1.15] text-offwhite md:text-[44px]">
              The deliberation record
              <br />
              is the asset.
            </h2>
            <p className="mb-6 text-lg leading-[1.85] text-faint">
              Every session adds a structured record to the reasoning corpus — multi-agent
              deliberation, disagreement, adversarial challenge, evidence weighting, and
              calibrated uncertainty across research questions. At scale, this constitutes a
              dataset that does not exist anywhere else: how a structured ensemble reasons,
              argues, and quantifies what it does and doesn&apos;t know.
            </p>
            <Link href="/index" className="text-sm font-medium text-rust">
              View the Deliberation Index →
            </Link>
          </div>
          <div className="flex flex-col gap-px overflow-hidden rounded-lg border border-border-dark bg-border-dark">
            {CORPUS_METRICS.map((m) => (
              <div key={m.label} className="flex items-center justify-between bg-ink-2 px-6 py-5">
                <span className="text-[13px] text-faint">{m.label}</span>
                <span className={`font-mono text-sm ${m.accent ? "text-rust" : "text-[#D4CFC6]"}`}>{m.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CtaBanner
        title={
          <>
            Add your question
            <br />
            to the record.
          </>
        }
        body={
          <>
            Join the waitlist — every session you run becomes part of the deliberation record.
            <br className="hidden sm:block" />
            One free Standard session with every new account.
          </>
        }
        primaryLabel="Join waitlist"
        primaryHref="/waitlist"
        secondaryLabel="Deliberation Index"
        secondaryHref="/index"
      />
    </>
  );
}

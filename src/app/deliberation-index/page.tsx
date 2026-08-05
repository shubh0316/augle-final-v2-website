import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { IndexSubnav } from "@/components/IndexSubnav";
import { CtaBanner } from "@/components/CtaBanner";
import { eyebrow, sectionTitle } from "@/lib/styles";

export const metadata: Metadata = {
  title: "The Augle Index | Where AI Models Agree and Disagree on Key Questions",
  description:
    "Real-time tracking of consensus rates, dissent levels, and confidence grade distributions across economics, technology, policy, and more.",
};

const TICKER_ITEMS: { domain: string; q: string; grade: "Probable" | "Contested" }[] = [
  { domain: "Policy", q: "Do apprenticeship programmes improve long-term participant earnings?", grade: "Probable" },
  { domain: "Technology", q: "Does the evidence support commercially relevant photonic-chip throughput?", grade: "Contested" },
  { domain: "Policy", q: "Do indoor masking mandates reduce COVID-19 community transmission?", grade: "Contested" },
  { domain: "Life sci", q: "Does current GLP-1 evidence support long-term maintenance without dosing?", grade: "Contested" },
  { domain: "Economics", q: "Does the incumbent credit-scoring model retain predictive validity today?", grade: "Contested" },
  { domain: "Policy", q: "What is the realistic SEC exposure on the material non-public information question?", grade: "Probable" },
];

const TICKER_GRADE_CLASS = {
  Probable: "bg-[#1E2428] text-[#6A9AAA]",
  Contested: "bg-[#2C2820] text-[#C79233]",
};

type FillTier = "green" | "amber" | "red";
const FILL_CLASS: Record<FillTier, string> = {
  green: "bg-[#3AAA72]",
  amber: "bg-[#C79233]",
  red: "bg-[#C15F3C]",
};

const DOMAIN_ROWS: { domain: string; sessions: number; consensus: number; tier: FillTier; dissent: number }[] = [
  { domain: "Life sciences", sessions: 34, consensus: 84, tier: "green", dissent: 12 },
  { domain: "Economics", sessions: 51, consensus: 78, tier: "green", dissent: 18 },
  { domain: "Finance", sessions: 29, consensus: 74, tier: "green", dissent: 22 },
  { domain: "Policy", sessions: 38, consensus: 72, tier: "amber", dissent: 26 },
  { domain: "Climate", sessions: 22, consensus: 68, tier: "amber", dissent: 28 },
  { domain: "Geopolitics", sessions: 41, consensus: 62, tier: "amber", dissent: 35 },
  { domain: "Technology", sessions: 47, consensus: 58, tier: "red", dissent: 38 },
  { domain: "AI governance", sessions: 18, consensus: 49, tier: "red", dissent: 46 },
];

type ValTier = "high" | "mid" | "low";
const HM_TIER_CLASS: Record<ValTier, string> = {
  high: "bg-[#1A3D2A] text-[#3AAA72]",
  mid: "bg-[#2C2820] text-[#C79233]",
  low: "bg-[#3D1A10] text-[#C15F3C]",
};

const HEATMAP_ROWS: {
  domain: string;
  contested: { val: string; tier: ValTier };
  consensus: { val: string; tier: ValTier };
  dissent: { val: string; tier: ValTier };
  avgGrade: { val: string; tier: ValTier };
}[] = [
  { domain: "Economics", contested: { val: "22%", tier: "high" }, consensus: { val: "78%", tier: "high" }, dissent: { val: "1.4", tier: "mid" }, avgGrade: { val: "Probable", tier: "high" } },
  { domain: "Life sciences", contested: { val: "16%", tier: "high" }, consensus: { val: "84%", tier: "high" }, dissent: { val: "0.9", tier: "high" }, avgGrade: { val: "Probable", tier: "high" } },
  { domain: "Policy", contested: { val: "34%", tier: "mid" }, consensus: { val: "72%", tier: "mid" }, dissent: { val: "2.1", tier: "mid" }, avgGrade: { val: "Contested", tier: "mid" } },
  { domain: "Geopolitics", contested: { val: "46%", tier: "mid" }, consensus: { val: "62%", tier: "mid" }, dissent: { val: "2.8", tier: "low" }, avgGrade: { val: "Contested", tier: "mid" } },
  { domain: "Technology", contested: { val: "52%", tier: "mid" }, consensus: { val: "58%", tier: "low" }, dissent: { val: "3.2", tier: "low" }, avgGrade: { val: "Contested", tier: "low" } },
  { domain: "AI governance", contested: { val: "63%", tier: "low" }, consensus: { val: "49%", tier: "low" }, dissent: { val: "4.1", tier: "low" }, avgGrade: { val: "Contested", tier: "low" } },
];

const GRADE_BARS: { grade: string; pct: number; fillClass: string; note: string }[] = [
  { grade: "Probable", pct: 48, fillClass: "bg-[#6A9AAA]", note: "The most common grade. Best available evidence supports the claim but replication is limited." },
  { grade: "Contested", pct: 31, fillClass: "bg-[#C79233]", note: "Active dispute or unresolved Strong objection. The finding names the dispute, not a direction." },
  { grade: "Established", pct: 14, fillClass: "bg-[#3AAA72]", note: "Multiple independent replications across distinct methodologies. Requires formal objection to downgrade." },
  { grade: "Gap", pct: 7, fillClass: "bg-[#C15F3C]", note: "Insufficient evidence to evaluate the claim. A first-class finding — not a failure state." },
];

const CORPUS_STATS = [
  { val: "33", label: "Sessions · illustrative" },
  { val: "11", label: "Domains covered" },
  { val: "38%", label: "Contested or Gap findings" },
  { val: "93%", label: "Avg Guardian integrity" },
];

const SUBPAGES = [
  {
    eyebrow: "Question explorer",
    title: "Search and filter all deliberation sessions",
    body: "Browse every session by domain, confidence grade, dissent level, and session depth. Sort by domain, grade, or recency.",
    link: "Open explorer →",
    href: "/index/explorer",
  },
  {
    eyebrow: "Heatmaps",
    title: "Confidence and dissent across domains and time",
    body: "Interactive heatmaps showing how consensus rates, dissent levels, and confidence grade distributions vary across domains and evolve over time as the corpus grows.",
    link: "View heatmaps →",
    href: "/index/heatmap",
  },
  {
    eyebrow: "Methodology",
    title: "How the Index is computed",
    body: "Full methodology — how consensus and dissent are measured, how confidence grades are assigned, and what the data does and doesn't show.",
    link: "Read methodology →",
    href: "/index/methodology",
  },
];

export default function IndexOverviewPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Deliberation Index" }]} />

      {/* HERO */}
      <div className="border-b border-border bg-paper">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-5 py-16 md:px-10 md:py-20 lg:grid-cols-[1fr_400px] lg:items-start lg:gap-20 lg:px-[72px] lg:py-20">
          <div>
            <div className={eyebrow}>Augle Deliberation Index</div>
            <h1 className="mb-6 font-serif text-[40px] leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-[64px]">
              Where does AI
              <br />
              reach <em className="text-rust not-italic italic">consensus</em> —<br />
              and where does it
              <br />
              break down?
            </h1>
            <p className="mb-5 max-w-xl text-lg leading-[1.8] text-body">
              The Deliberation Index tracks consensus rates, dissent levels, and confidence grade
              distributions across domains — as the corpus grows. Not what the models think. What
              the structured deliberation produces.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-paper-alt p-5">
            <div className="mb-3.5 flex items-center gap-2 font-mono text-[10px] tracking-[0.08em] text-rust uppercase">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-rust" />
              Recent sessions · illustrative
            </div>
            <div className="flex flex-col gap-2">
              {TICKER_ITEMS.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 rounded border border-border bg-paper-alt px-3 py-2.5">
                  <span className="min-w-[64px] flex-shrink-0 font-mono text-[10px] text-rust uppercase">{item.domain}</span>
                  <span className="flex-1 text-[11px] leading-tight text-body">{item.q}</span>
                  <span className={`flex-shrink-0 rounded px-1.5 py-0.5 font-mono text-[10px] whitespace-nowrap ${TICKER_GRADE_CLASS[item.grade]}`}>
                    {item.grade}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <IndexSubnav active="overview" variant="dark" />

      {/* DOMAIN CONSENSUS */}
      <div className="border-b border-border py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-[72px]">
          <div className={eyebrow}>Consensus by domain</div>
          <h2 className={sectionTitle}>
            Consensus rates across
            <br />
            all deliberation domains.
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="overflow-hidden rounded-lg border border-border bg-paper">
              <div className="grid grid-cols-[1fr_60px_60px_60px] gap-2 border-b border-border bg-paper-alt px-4 py-3.5 sm:grid-cols-[1fr_80px_80px_80px] sm:px-5">
                <span className="font-mono text-[10px] tracking-[0.06em] text-subtle uppercase">Domain</span>
                <span className="text-right font-mono text-[10px] tracking-[0.06em] text-subtle uppercase">Sessions</span>
                <span className="text-right font-mono text-[10px] tracking-[0.06em] text-subtle uppercase">Consensus</span>
                <span className="text-right font-mono text-[10px] tracking-[0.06em] text-subtle uppercase">Dissent</span>
              </div>
              {DOMAIN_ROWS.map((row, i) => (
                <div
                  key={row.domain}
                  className={`grid grid-cols-[1fr_60px_60px_60px] items-center gap-2 px-4 py-3.5 sm:grid-cols-[1fr_80px_80px_80px] sm:px-5 ${
                    i < DOMAIN_ROWS.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <span className="text-sm font-medium text-ink">{row.domain}</span>
                  <span className="text-right font-mono text-xs text-subtle">{row.sessions}</span>
                  <div className="flex items-center justify-end gap-1.5">
                    <div className="h-1 w-12 overflow-hidden rounded-full bg-cell">
                      <div className={`h-full rounded-full ${FILL_CLASS[row.tier]}`} style={{ width: `${row.consensus}%` }} />
                    </div>
                    <span className="min-w-[32px] text-right font-mono text-xs text-ink">{row.consensus}%</span>
                  </div>
                  <span className="text-right font-mono text-xs text-rust">{row.dissent}%</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-5">
              <h3 className="font-serif text-[32px] leading-tight text-ink">How consensus is measured.</h3>
              <p className="text-base leading-[1.8] text-body">
                Consensus rate is the proportion of sessions in a domain that reached a Probable or
                Established confidence grade without an Unresolved Strong Contrarian objection. High
                consensus means the ensemble consistently converged. Low consensus means the
                questions in that domain consistently produce unresolved adversarial pressure — which
                is information, not a failure.
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div className="rounded-md border border-border bg-paper p-3.5">
                  <div className="mb-1.5 font-mono text-[10px] tracking-[0.06em] text-[#3AAA72] uppercase">High consensus</div>
                  <p className="text-xs leading-relaxed text-muted">
                    Cartographer, Methodologist, and Synthesizer converge. Contrarian objections are
                    resolved or graded Speculative. Final grade: Probable or Established.
                  </p>
                </div>
                <div className="rounded-md border border-border bg-paper p-3.5">
                  <div className="mb-1.5 font-mono text-[10px] tracking-[0.06em] text-rust uppercase">High dissent</div>
                  <p className="text-xs leading-relaxed text-muted">
                    Contrarian raises Unresolved Strong objections that carry to Phase 3. The finding
                    reflects the dispute — Contested grade or multiple unresolved objections in the
                    output.
                  </p>
                </div>
              </div>
              <div className="rounded-md border-l-2 border-border bg-paper px-4 py-3.5 font-mono text-[13px] leading-relaxed text-subtle">
                AI governance has the lowest consensus rate in the corpus — 49%. This is structurally
                expected: the questions are genuinely contested, the evidence base is thin, and the
                Contrarian has strong material to work with. The index is accurate because it reflects
                the actual state of the evidence.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HEATMAP (static) */}
      <div className="border-b border-border bg-ink py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-[72px]">
          <div className={eyebrow}>Confidence + dissent heatmap</div>
          <h2 className="mb-3 font-serif text-3xl leading-[1.15] text-offwhite md:text-[44px]">
            How confidence and dissent
            <br />
            interact across domains.
          </h2>
          <p className="mb-12 max-w-2xl text-lg leading-[1.85] text-faint">
            Each cell shows the average metric for that domain × confidence grade combination. High
            consensus doesn&apos;t always mean low dissent — a domain can produce many Probable
            findings while still generating significant Contrarian pressure on individual claims.
          </p>
          <div className="mb-5 overflow-x-auto">
            <div className="grid min-w-[560px] grid-cols-[120px_repeat(4,1fr)] gap-px overflow-hidden rounded-lg border border-border-dark bg-border-dark">
              <div className="bg-ink-2 px-3.5 py-2.5" />
              {["Contested %", "Consensus %", "Dissent flags", "Avg grade"].map((label) => (
                <div key={label} className="flex items-center justify-center bg-ink-2 px-3.5 py-2.5">
                  <span className="font-mono text-[10px] tracking-[0.06em] text-faint uppercase">{label}</span>
                </div>
              ))}
              {HEATMAP_ROWS.map((row) => (
                <Fragment key={row.domain}>
                  <div className="flex items-center justify-end bg-ink-2 px-4 py-4">
                    <span className="text-xs text-faint">{row.domain}</span>
                  </div>
                  {[row.contested, row.consensus, row.dissent, row.avgGrade].map((cell, i) => (
                    <div key={i} className="flex items-center justify-center bg-ink-2 px-3.5 py-4">
                      <span className={`rounded px-2 py-1 font-mono text-sm ${HM_TIER_CLASS[cell.tier]}`}>{cell.val}</span>
                    </div>
                  ))}
                </Fragment>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap justify-end gap-5">
            <span className="flex items-center gap-1.5 text-[11px] text-faint">
              <span className="inline-block h-3 w-3 rounded-sm bg-[#1A3D2A]" />
              Strong (high consensus, low dissent)
            </span>
            <span className="flex items-center gap-1.5 text-[11px] text-faint">
              <span className="inline-block h-3 w-3 rounded-sm bg-[#2C2820]" />
              Moderate
            </span>
            <span className="flex items-center gap-1.5 text-[11px] text-faint">
              <span className="inline-block h-3 w-3 rounded-sm bg-[#3D1A10]" />
              Weak (low consensus, high dissent)
            </span>
          </div>
        </div>
      </div>

      {/* GRADE DISTRIBUTION */}
      <div className="border-b border-border py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-[72px]">
          <div className={eyebrow}>Confidence grade distribution</div>
          <h2 className={sectionTitle}>
            How findings are distributed
            <br />
            across the four grades.
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col gap-5">
              <div className="font-mono text-[13px] text-subtle">All sessions · illustrative data</div>
              {GRADE_BARS.map((bar) => (
                <div key={bar.grade} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-ink">{bar.grade}</span>
                    <span className="font-mono text-[13px] text-body">{bar.pct}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-paper-alt">
                    <div className={`h-full rounded-full ${bar.fillClass}`} style={{ width: `${bar.pct}%` }} />
                  </div>
                  <div className="text-xs text-subtle">{bar.note}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="font-serif text-[32px] leading-tight text-ink">What the distribution reveals.</h3>
              <p className="text-base leading-[1.8] text-body">
                The preponderance of Probable grades reflects an accurate picture of where most
                research questions sit: supported by evidence, but not at the level of independent
                replication across methodological contexts. Contested at 31% is structurally honest —
                the ensemble isn&apos;t softening findings. Gap at 7% is small but important: these are
                the questions the evidence genuinely cannot answer.
              </p>
              <div className="rounded-md border border-border bg-paper p-4.5">
                <div className="mb-2 font-mono text-[10px] tracking-[0.06em] text-rust uppercase">Key signal</div>
                <p className="text-[13px] leading-relaxed text-body">
                  AI governance questions produce a Contested or Gap grade in 71% of sessions — the
                  highest contested rate of any domain. Technology is second at 58%. Life sciences and
                  economics are the most resolvable domains in the corpus, with Probable or Established
                  grades in over 80% of sessions.
                </p>
              </div>
              <div className="rounded-md border border-border bg-paper p-4.5">
                <div className="mb-2 font-mono text-[10px] tracking-[0.06em] text-rust uppercase">
                  What Contested means in practice
                </div>
                <p className="text-[13px] leading-relaxed text-body">
                  A Contested finding is not a failure to reach a conclusion. It is a structurally
                  complete finding that names the dispute, preserves competing positions, and surfaces
                  the resolution condition. In 31% of all sessions, the honest answer is &quot;the
                  evidence is genuinely split.&quot; The Index records that accurately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CORPUS COMPOSITION */}
      <div className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-[72px]">
          <div className={eyebrow}>Corpus composition</div>
          <h2 className={sectionTitle}>
            What the corpus looks like
            <br />
            as it grows.
          </h2>
          <div className="mt-10 flex max-w-3xl flex-col gap-4">
            <p className="text-base leading-[1.8] text-body">
              The Index is a descriptive record of how the ensemble behaves across domains — how often
              it converges, how often the Contrarian&apos;s objections go unresolved, and how findings
              distribute across the four confidence grades. It measures the epistemic behaviour of the
              system, not a claim of predictive accuracy.
            </p>
            <p className="text-base leading-[1.8] text-body">
              The most useful signal is where deliberation breaks down. A high Contested-or-Gap rate in
              a domain is not a weakness in the system — it is an accurate reading that the evidence
              there is genuinely unsettled. The ensemble is built to say so rather than manufacture
              confidence.
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {CORPUS_STATS.map((stat) => (
                <div key={stat.label} className="rounded-md border border-border bg-cream p-4">
                  <div className="mb-1 font-serif text-3xl text-rust">{stat.val}</div>
                  <div className="text-xs text-muted">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="rounded-md border-l-2 border-border bg-cream px-4 py-3.5 font-mono text-[13px] leading-relaxed text-subtle">
              Example sessions, shown to demonstrate the Index structure. Live sessions publish here as
              they run.
            </div>
          </div>
        </div>
      </div>

      {/* SUB-PAGES */}
      <div className="border-y border-border py-16">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-[72px]">
          <div className={eyebrow}>Explore the Index</div>
          <h2 className={sectionTitle}>Go deeper.</h2>
          <div className="mt-9 grid grid-cols-1 gap-3 md:grid-cols-3">
            {SUBPAGES.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="block rounded-lg border border-border bg-paper p-6 transition-colors hover:border-rust"
              >
                <div className="mb-2.5 font-mono text-[10px] tracking-[0.06em] text-rust uppercase">{page.eyebrow}</div>
                <div className="mb-2 font-serif text-lg text-ink">{page.title}</div>
                <p className="mb-3.5 text-[13px] leading-relaxed text-muted">{page.body}</p>
                <span className="text-xs font-medium text-rust">{page.link}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <CtaBanner
        title={
          <>
            Add your sessions
            <br />
            to the Index.
          </>
        }
        body={
          <>
            Every session you run contributes to the corpus.
            <br />
            Join the waitlist — one Standard session free.
          </>
        }
        secondaryLabel="Browse outcomes"
        secondaryHref="/outcomes"
      />
    </>
  );
}

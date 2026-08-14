import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CtaBanner } from "@/components/CtaBanner";
import { btnPrimary, eyebrow, sectionTitle } from "@/lib/styles";

export const metadata: Metadata = {
  title: "About Augle | AI-Powered Deliberation & Research Infrastructure",
  description:
    "Augle builds structured multi-agent AI deliberation infrastructure — seven specialized agents, evidence-anchored findings, and calibrated confidence grades for high-stakes research.",
};

const MISSION_VIDEOS = [
  {
    id: "3ZB_tOA_9eg",
    title: "Augle — Engineered for the questions that matter most.",
    description:
      "Ask a frontier model a question and you get a confident answer. Ask Augle and you get an evidence gathered, assumptions challenged, and integrity maintained answer, delivered from a structured, auditable, reality-graded finding.",
  },
  {
    id: "f8kmHakMEW0",
    title: "Augle — Augmented Deliberation.",
    description:
      "An Augled question returns gathered evidence, challenged assumptions, and maintained integrity, resulting in a structured, auditable, reality-graded finding. That's Augmented Deliberation. That's Augle.",
  },
];

const VIDEO_JSONLD = MISSION_VIDEOS.map((video, i) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: `Augle Corporate Overview Video ${i + 1}`,
  description: `The ${i === 0 ? "first" : "second"} official embedded company profile video featured on the augle.com About page.`,
  thumbnailUrl: `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`,
  uploadDate: "2026-08-14T00:00:00+00:00",
  embedUrl: `https://www.youtube.com/embed/${video.id}`,
}));

const BUILT_ITEMS = [
  {
    tag: "01 · Architecture",
    title: "Unidirectional confidence propagation",
    body: "Confidence bounds established by the Methodologist agent serve as hard upper constraints on the Synthesizer and Pragmatist. No downstream agent can produce a finding more confident than the evidence warrants. This constraint is architectural — it cannot be overridden by prompting, context, or user instruction.",
  },
  {
    tag: "02 · Integrity",
    title: "Phase-boundary Guardian layer",
    body: "An independent integrity agent operates exclusively at phase boundaries — outside the research deliberation loop. It authenticates every source in real time, holds halt authority over the entire session, and operates with a hidden model identity to prevent anchoring effects on other agents and users. It cannot produce findings. It cannot be influenced by the deliberation.",
  },
  {
    tag: "03 · Calibration",
    title: "Ground-truth-mapped reasoning corpus",
    body: "Every session produces a structured reasoning artifact mapped to a verifiable real-world outcome that resolves to binary ground truth. As the corpus grows, Augle builds the only dataset of its kind: calibrated multi-agent deliberation traces mapped to real-world outcomes. This corpus is the moat. It does not exist anywhere else.",
  },
];

const WHAT_WE_BUILD = [
  {
    label: "Architecture",
    title: "Multi-agent deliberation ensemble",
    body: "A structured multi-agent system where each agent has a defined role, typed output contract, and a set of things it is architecturally forbidden from doing. The ensemble produces findings that no individual model can produce alone.",
  },
  {
    label: "Integrity",
    title: "Guardian integrity layer",
    body: "An independent integrity agent operating at every phase boundary with halt authority, real-time source verification, and hidden model identity. It does not participate in deliberation. It certifies it.",
  },
  {
    label: "Calibration",
    title: "Calibrated reasoning corpus",
    body: "Every session produces a structured reasoning artifact mapped to a verifiable binary outcome. The corpus is the moat — calibrated multi-agent deliberation traces mapped to ground truth. It does not exist anywhere else.",
  },
];

const FOUNDATION_STATS = [
  {
    num: "7",
    title: "Provisional patents filed",
    body: "USPTO applications covering all core architectural innovations. Filing window: June 4–19, 2026. Non-provisional deadlines begin June 2027.",
  },
  {
    num: "7",
    title: "Peer-reviewed preprints published",
    body: "Co-authored by the Augle team. Published on Zenodo and SSRN. Zenodo DOI: 10.5281/zenodo.20619123. SSRN Abstract ID: 6880718.",
  },
  {
    num: "100%",
    title: "Ensemble shipped and operational",
    body: "All agents deployed across the full three-phase deliberation arc. Guardian integrity layer active. Source Verification Service operational.",
  },
];

const PATENTS = [
  { id: "AUGLE-001P", title: "Multi-agent ensemble · Confidence propagation · Guardian layer" },
  { id: "AUGLE-002P", title: "Corpus-driven document synthesis · Adversarial pre-submission review" },
  { id: "AUGLE-003P", title: "Source Verification Service · Confidence-tiered evidence downgrade" },
  { id: "AUGLE-004P", title: "Ground-truth-mapped reasoning corpus · Prediction market pairing" },
  { id: "AUGLE-005P", title: "Round-Aware Evidence Admission Protocol (REAP)" },
  { id: "AUGLE-006P", title: "Verdict fragility · Structured reopen conditions" },
  { id: "AUGLE-007P", title: "Automated follow-on session generation · Session lineage tracking" },
];

const RESEARCH_ITEMS = [
  { id: "SSRN", title: "Abstract ID 6880718" },
  { id: "Zenodo", title: "DOI 10.5281/zenodo.20619123" },
  { id: "Authors", title: "Cory Kelly · Shubhanker Saxena" },
  { id: "Published", title: "May–June 2026" },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(VIDEO_JSONLD) }}
      />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />

      {/* HERO */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-20 lg:px-[72px] lg:py-24">
          <div className={eyebrow}>About Augle</div>
          <h1 className="mb-6 font-serif text-[42px] font-normal leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-[64px]">
            We built the platform
            <br />
            we couldn&apos;t find
            <br />
            <em className="text-rust not-italic italic">anywhere else.</em>
          </h1>
          <p className="mb-4 max-w-2xl text-lg leading-[1.8] text-body">
            Single AI models produce confident answers. That&apos;s not the same as
            correct answers. The confidence problem in AI isn&apos;t about better
            prompting — it&apos;s structural. No individual model has the architecture
            to challenge its own reasoning, authenticate its own sources, or preserve
            the objections it can&apos;t resolve.
          </p>
          <p className="max-w-2xl text-lg leading-[1.8] text-body">
            Augle is built on a different premise: rigorous reasoning is a property of
            a system, not a property of any individual model. You build it through
            structure — through a multi-agent ensemble where each agent has a defined
            role, a typed output contract, and a set of things it is architecturally
            forbidden from doing.
          </p>
        </div>
      </div>

      {/* MISSION */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-20 lg:px-[72px]">
          <div className={eyebrow}>Mission</div>
          <p className="mb-6 max-w-3xl border-l-[3px] border-rust pl-7 font-serif text-2xl leading-[1.5] text-ink italic md:text-[32px]">
            &quot;Rigorous reasoning is a structural property — not a property of any
            individual model. You cannot prompt your way to it. You build it.&quot;
          </p>
          <p className="max-w-2xl text-base leading-[1.8] text-body">
            Augle exists to make structured, accountable deliberation accessible for
            the questions that matter most. Not summaries. Not confident guesses.
            Evidence-anchored findings with calibrated confidence grades, a full audit
            trail, and the preserved objections that the system couldn&apos;t resolve —
            so you know exactly where the edges of your knowledge are before the
            stakes are live.
          </p>

          <div className="mt-10 grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2">
            {MISSION_VIDEOS.map((video) => (
              <div key={video.id}>
                <div className="aspect-video overflow-hidden rounded-lg border border-border">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <p className="mt-3 text-[13px] leading-[1.7] text-body">{video.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WHAT WE BUILT — intro line */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-10 lg:px-[72px]">
          <p className="max-w-3xl font-serif text-2xl leading-[1.4] text-ink md:text-[32px]">
            Augle is building the infrastructure for calibrated reasoning at scale.
            The deliberation corpus is the asset. The platform is how it&apos;s built.
          </p>
        </div>
      </div>

      <div className="border-b border-border-dark bg-ink py-16 md:py-18">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-[72px]">
          <div className={eyebrow}>What we built</div>
          <h2 className="mb-12 max-w-xl font-serif text-3xl leading-[1.15] text-offwhite md:text-[44px]">
            Three architectural innovations that didn&apos;t exist before Augle.
          </h2>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border-dark bg-border-dark md:grid-cols-3">
            {BUILT_ITEMS.map((item) => (
              <div key={item.tag} className="bg-ink-2 p-7">
                <div className="mb-2.5 font-mono text-[10px] tracking-[0.08em] text-rust uppercase">
                  {item.tag}
                </div>
                <div className="mb-2.5 font-serif text-lg text-offwhite">{item.title}</div>
                <p className="text-[13px] leading-[1.7] text-faint">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WHAT WE BUILD (dark strip) */}
      <div className="border-t border-b border-border-dark bg-ink py-14">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-[72px]">
          <p className="mb-10 font-mono text-[10px] tracking-[0.1em] text-rust uppercase">
            What we build
          </p>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border-dark bg-border-dark md:grid-cols-3">
            {WHAT_WE_BUILD.map((item) => (
              <div key={item.label} className="bg-ink-2 p-8">
                <p className="mb-3.5 font-mono text-[10px] tracking-[0.08em] text-rust uppercase">
                  {item.label}
                </p>
                <p className="mb-3 font-serif text-xl text-offwhite">{item.title}</p>
                <p className="text-[13px] leading-[1.75] text-faint">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOUNDATION */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-20 lg:px-[72px]">
          <div className={eyebrow}>Foundation</div>
          <h2 className={`${sectionTitle} mb-12`}>
            Prior art established.
            <br />
            Architecture protected.
          </h2>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
            {FOUNDATION_STATS.map((stat) => (
              <div key={stat.title} className="bg-paper p-7">
                <p className="mb-2 font-serif text-4xl leading-none text-ink">{stat.num}</p>
                <p className="mb-1.5 text-sm font-medium text-ink">{stat.title}</p>
                <p className="text-[13px] leading-[1.6] text-muted">{stat.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* IP + RESEARCH */}
      <div className="border-b border-border">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-5 py-16 md:grid-cols-2 md:px-10 md:py-20 lg:gap-16 lg:px-[72px]">
          <div>
            <div className={eyebrow}>Patent portfolio</div>
            <h3 className="mb-3 font-serif text-2xl leading-[1.3] text-ink">
              Seven provisional patents.
            </h3>
            <p className="mb-5 text-sm leading-[1.75] text-body">
              Every core architectural innovation is protected. The filing window
              spans June 4 through June 19, 2026 — non-provisional deadlines begin
              June 2027.
            </p>
            <div className="flex flex-col gap-2">
              {PATENTS.map((patent, i) => (
                <div
                  key={patent.id}
                  className={`flex items-baseline gap-3 py-2.5 ${i < PATENTS.length - 1 ? "border-b border-border" : ""}`}
                >
                  <span className="min-w-[100px] flex-shrink-0 font-mono text-[11px] text-rust">
                    {patent.id}
                  </span>
                  <span className="text-[13px] leading-[1.5] text-body">{patent.title}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className={eyebrow}>Research</div>
            <h3 className="mb-3 font-serif text-2xl leading-[1.3] text-ink">
              Seven papers. One architecture. All open.
            </h3>
            <p className="mb-5 text-sm leading-[1.75] text-body">
              Augle publishes its research. Every architectural decision is documented
              in peer-reviewed preprints available on Zenodo and SSRN. This isn&apos;t
              marketing — it&apos;s the timestamped prior art record that establishes
              Augle&apos;s architectural precedence.
            </p>
            <div className="mb-1 flex flex-col gap-2">
              {RESEARCH_ITEMS.map((item, i) => (
                <div
                  key={item.id}
                  className={`flex items-baseline gap-3 py-2.5 ${i < RESEARCH_ITEMS.length - 1 ? "border-b border-border" : ""}`}
                >
                  <span className="min-w-[60px] flex-shrink-0 font-mono text-[11px] text-rust">
                    {item.id}
                  </span>
                  <span className="text-[13px] leading-[1.5] text-body">{item.title}</span>
                </div>
              ))}
            </div>
            <Link href="/research" className="mt-2 inline-block text-[13px] font-medium text-rust">
              Browse all seven papers →
            </Link>
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div className="border-b border-border">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-5 py-16 md:grid-cols-2 md:px-10 md:py-20 lg:gap-16 lg:px-[72px]">
          <div>
            <div className={eyebrow}>Contact</div>
            <h2 className="mb-3.5 font-serif text-4xl leading-[1.15] text-ink md:text-[40px]">
              Work with us.
            </h2>
            <p className="mb-7 max-w-md text-[15px] leading-[1.75] text-body">
              Augle is accepting early access requests from researchers, analysts, and
              institutional teams. For partnership, research collaboration, or
              platform enquiries, reach out directly.
            </p>
            <Link href="/waitlist" className={btnPrimary}>
              Join waitlist →
            </Link>
          </div>
          <div>
            {[
              { label: "General", value: "hello@augle.com", href: "mailto:hello@augle.com" },
              { label: "Press", value: "press@augle.com", href: "mailto:press@augle.com" },
              { label: "Website", value: "augle.com", href: "https://augle.com" },
            ].map((row, i, arr) => (
              <div
                key={row.label}
                className={`flex items-center gap-3 py-3.5 ${i < arr.length - 1 ? "border-b border-border" : ""}`}
              >
                <span className="min-w-[80px] font-mono text-[10px] tracking-[0.06em] text-subtle uppercase">
                  {row.label}
                </span>
                <span className="text-sm text-ink">
                  <a href={row.href} className="text-rust hover:underline">
                    {row.value}
                  </a>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CtaBanner
        title={
          <>
            The architecture is built.
            <br />
            The corpus is accumulating.
          </>
        }
        body="Request early access and run a session on a question that matters to your work."
        secondaryLabel="Read the research"
        secondaryHref="/research"
      />
    </>
  );
}

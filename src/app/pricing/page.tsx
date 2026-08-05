import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { btnWhite, eyebrow, sectionTitle } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Augle Pricing | Credit-Based AI Research Sessions",
  description:
    "No subscriptions. Buy credits, run sessions at three depth tiers, credits never expire. One free Standard session on signup.",
};

const PRINCIPLES = [
  {
    label: "No subscription",
    text: "No monthly fee. No seat count. Purchase credit bundles and spend them when you need deliberation — not on a schedule.",
  },
  {
    label: "Credits never expire",
    text: "Credits you purchase don't disappear at the end of a billing cycle. They're yours until you use them.",
  },
  {
    label: "One free session",
    text: "Every new account gets one Standard session at no cost. Real API calls, real deliberation — not a demo simulation.",
  },
];

type Tier = {
  badge: string;
  name: string;
  subtitle: string;
  price: string;
  credits: string;
  specs: { label: string; value: string }[];
  features: { text: string; included: boolean }[];
  ctaText: string;
  note: string;
  recommended?: boolean;
};

const TIERS: Tier[] = [
  {
    badge: "Rapid",
    name: "Rapid",
    subtitle: "Quick orientation — single round",
    price: "$0.20",
    credits: "per session · 1 credit · ~3 minutes",
    specs: [
      { label: "Agents", value: "Cartographer + Synthesizer" },
      { label: "Guardian", value: "Not active" },
      { label: "Rounds", value: "Single round — no deliberation phases" },
      { label: "Output", value: "Preliminary evidence landscape + confidence-bounded finding" },
    ],
    features: [
      { text: "Evidence terrain map — Settled / Contested / Unknown", included: true },
      { text: "Preliminary confidence-bounded finding", included: true },
      { text: "Knowledge gap register", included: true },
      { text: "No Guardian integrity verification", included: false },
      { text: "No Contrarian adversarial pressure", included: false },
      { text: "No audit trail", included: false },
    ],
    ctaText: "Use for initial orientation",
    note: "Not recommended for high-stakes decisions",
  },
  {
    badge: "Standard · Recommended",
    name: "Standard",
    subtitle: "Full deliberation — three phases",
    price: "$0.60",
    credits: "per session · 3 credits · ~15 minutes",
    specs: [
      { label: "Agents", value: "Full multi-agent ensemble" },
      { label: "Guardian", value: "Active at all phase boundaries" },
      { label: "Rounds", value: "Exploration · Deliberation · Synthesis" },
      { label: "Output", value: "Evidence-anchored finding · unresolved objections · reopen conditions · audit trail" },
    ],
    features: [
      { text: "Full multi-agent deliberation across three phases", included: true },
      { text: "Guardian SVS authentication on every citation", included: true },
      { text: "Contrarian adversarial pressure — steelmanned objections", included: true },
      { text: "Calibrated confidence grade — Established / Probable / Contested / Gap", included: true },
      { text: "Unresolved objections preserved verbatim in output", included: true },
      { text: "Full session audit trail — exportable", included: true },
    ],
    ctaText: "The right choice for most questions",
    note: "Free for first session on every new account",
    recommended: true,
  },
  {
    badge: "Deep",
    name: "Deep",
    subtitle: "Maximum adversarial pressure",
    price: "$1.20",
    credits: "per session · 6 credits · ~45 minutes",
    specs: [
      { label: "Agents", value: "Full ensemble + flagship Contrarian" },
      { label: "Contrarian", value: "Opus tier — highest-capability steelmanning" },
      { label: "Expert", value: "Async domain expert interjection at P1/P2 boundary" },
      { label: "Output", value: "Everything in Standard + authenticated expert contribution" },
    ],
    features: [
      { text: "Everything in Standard", included: true },
      { text: "Contrarian runs on Opus tier — maximum steelmanning quality", included: true },
      { text: "Async domain expert interjection — authenticated by Guardian before integration", included: true },
      { text: "Expert contribution enters evidence record as authenticated node", included: true },
      { text: "Deepest adversarial pressure available in any session", included: true },
    ],
    ctaText: "For the highest-stakes questions",
    note: "Augle selects optimal models — you don't configure agents",
  },
];

const BUNDLES = [
  {
    credits: "10",
    price: "$2.00",
    rate: "$0.20 / credit",
    what: [
      "10 Rapid sessions, or",
      "3 Standard sessions + 1 credit remaining, or",
      "1 Deep session + 4 credits remaining",
    ],
    best: false,
  },
  {
    credits: "30",
    price: "$5.40",
    rate: "$0.18 / credit · 10% off",
    what: [
      "30 Rapid sessions, or",
      "10 Standard sessions, or",
      "5 Deep sessions, or",
      "Any combination across all three tiers",
    ],
    best: true,
  },
  {
    credits: "50",
    price: "$8.00",
    rate: "$0.16 / credit · 20% off",
    what: [
      "50 Rapid sessions, or",
      "16 Standard sessions + 2 credits, or",
      "8 Deep sessions + 2 credits remaining",
    ],
    best: false,
  },
];

const DEMO_ROWS = [
  { label: "Session depth", value: "Standard", accent: false },
  { label: "Agents active", value: "Full ensemble", accent: false },
  { label: "Guardian", value: "Active", accent: true },
  { label: "Contrarian", value: "Active · Sonnet tier", accent: true },
  { label: "Output", value: "Full finding · audit trail", accent: false },
  { label: "API calls", value: "Real — not simulated", accent: false },
  { label: "Credit card", value: "Not required", accent: false },
  { label: "Limit", value: "One per account", accent: false },
];

const ENTERPRISE_ITEMS = [
  {
    feature: "SSO / SAML",
    desc: "Role-based access controls, per-seat provisioning, and single sign-on integration for your organization's identity provider.",
  },
  {
    feature: "Data segregation",
    desc: "Segregated data environment with IP and confidentiality controls. Corpus opt-out available — your sessions stay yours.",
  },
  {
    feature: "Audit-ready export",
    desc: "Structured export with institutional letterhead and compliance formatting. Organization-wide session management and admin dashboard.",
  },
  {
    feature: "Priority queue",
    desc: "Guaranteed uptime SLA, no rate limits, and a priority dispatch queue for time-sensitive institutional research.",
  },
  {
    feature: "Custom configuration",
    desc: "Custom depth tiers, agent configuration, output templates, and direct API access for integration into institutional research workflows.",
  },
  {
    feature: "Dedicated support",
    desc: "Dedicated account contact, signed contract, vendor onboarding, invoicing on NET-30/60 terms, and priority support response.",
  },
];

const FAQ_COL_1 = [
  {
    q: "Do credits expire?",
    a: "No. Credits you purchase are yours indefinitely. There's no billing cycle, no monthly reset, and no expiry date. You spend them when you need deliberation.",
  },
  {
    q: "Is the free session a real deliberation or a demo?",
    a: "Real deliberation. Real API calls across all agents. Real Guardian source verification. The free session runs exactly the same architecture as a paid Standard session — we run real API calls and absorb the cost. There's no simulation, no canned output, and no version of the product you're not seeing.",
  },
  {
    q: "What happens if the Guardian stops my session?",
    a: "If the Guardian issues a Hard Block that permanently terminates the session, you receive a full credit refund. The flag record and the reason for termination are provided in full. Sessions that pause with a Soft Block do not trigger a refund — you can resolve the condition and continue.",
  },
  {
    q: "When will Augle be publicly available?",
    a: "We're in early access now, accepting waitlist requests. We'll notify you by email when your account is ready. Join the waitlist below — we're working through it as quickly as the corpus build allows.",
  },
];

const FAQ_COL_2 = [
  {
    q: "What's the difference between Standard and Deep?",
    a: "Both run the full multi-agent ensemble across three phases with Guardian active. Deep adds the flagship Contrarian model (Opus tier for maximum steelmanning quality) and an asynchronous domain expert interjection at the Phase 1/Phase 2 boundary. Use Deep for the questions where the quality of adversarial pressure is most critical.",
  },
  {
    q: "Can I get a refund on unused credits?",
    a: "Yes — unused credit bundles are refundable within 30 days of purchase. Once credits are spent on sessions, they cannot be refunded, but we issue full credit refunds on any session that terminates due to a Guardian Hard Block before the session is complete.",
  },
  {
    q: "I'm a researcher at a university. Is there an academic rate?",
    a: "At current credit pricing ($0.60 for a full Standard deliberation), the academic use case is already cost-effective. We're building an institutional academia tier with volume access and compliance-ready output. Contact us and we'll work something out for your lab or department while that tier is in development.",
  },
  {
    q: "Does Augle choose which models to use, or can I configure that?",
    a: "Augle selects and manages all model assignments. Each agent is assigned to the model best suited to its role — you don't configure this, and you shouldn't have to. The model selection is part of what makes the deliberation reliable. Deep sessions automatically use the highest-capability available model for the Contrarian agent.",
  },
];

export default function PricingPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Pricing" }]} />

      {/* HERO */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-20 lg:px-[72px]">
          <div className={eyebrow}>Pricing</div>
          <h1 className="mb-6 max-w-3xl font-serif text-[38px] font-normal leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-[64px]">
            Credits. No subscriptions.
            <br />
            <em className="text-rust not-italic italic">You pay for what you run.</em>
          </h1>
          <p className="mb-9 max-w-2xl text-lg leading-[1.8] text-body">
            Buy credits. Spend them on sessions. Credits never expire, there&apos;s no
            monthly commitment, and you get one free Standard session to run a real
            question before you spend anything. The ensemble runs the same regardless
            of tier — what changes is depth and deliberation time.
          </p>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <div key={p.label} className="bg-paper p-6">
                <div className="mb-2 font-mono text-[10px] tracking-[0.08em] text-rust uppercase">
                  {p.label}
                </div>
                <p className="text-sm leading-[1.6] text-body">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WAITLIST BANNER */}
      <div className="bg-rust">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-5 px-5 py-7 md:flex-row md:justify-between md:px-10 lg:px-[72px]">
          <div className="text-base leading-[1.6] text-offwhite">
            <strong className="font-semibold">Augle is currently in early access.</strong> Pricing
            is live — join the waitlist and we&apos;ll notify you when your account is ready.
          </div>
          <form className="flex w-full flex-wrap items-center gap-3 md:w-auto md:flex-nowrap">
            <label htmlFor="pricing-banner-email" className="sr-only">
              Email
            </label>
            <input
              id="pricing-banner-email"
              name="email"
              type="email"
              placeholder="your@email.com"
              className="w-full rounded border-none bg-offwhite px-4 py-2.5 text-sm text-ink placeholder:text-subtle md:w-[260px]"
            />
            <button
              type="submit"
              className="w-full flex-shrink-0 rounded bg-offwhite px-5 py-2.5 text-sm font-medium whitespace-nowrap text-rust md:w-auto"
            >
              Join waitlist
            </button>
          </form>
        </div>
      </div>

      {/* SESSION TIERS */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-20 lg:px-[72px]">
          <div className={eyebrow}>Session tiers</div>
          <h2 className={`${sectionTitle} mb-3`}>
            Three depths.
            <br />
            One ensemble.
          </h2>
          <p className="mb-12 max-w-2xl text-lg leading-[1.85] text-body">
            The same multi-agent architecture runs at every tier. What changes is the
            number of deliberation rounds, whether the Guardian is active, and whether
            the Contrarian runs at its highest capability. Most substantive research
            questions belong in Standard. Run Rapid when you need a fast orientation.
            Run Deep when the stakes are highest.
          </p>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`flex flex-col overflow-hidden rounded-lg border ${
                  tier.recommended ? "border-rust bg-rust/5" : "border-border bg-paper"
                }`}
              >
                <div
                  className={`flex-1 border-b p-7 ${tier.recommended ? "border-rust/30" : "border-border"}`}
                >
                  <span
                    className={`mb-2.5 block font-mono text-[10px] tracking-[0.06em] uppercase ${
                      tier.recommended ? "text-rust" : "text-subtle"
                    }`}
                  >
                    {tier.badge}
                  </span>
                  <div className="mb-1.5 font-serif text-3xl text-ink">{tier.name}</div>
                  <div className="mb-6 text-[13px] text-muted italic">{tier.subtitle}</div>
                  <div className="mb-1.5 flex items-baseline gap-2">
                    <span className="font-serif text-[44px] leading-none text-rust">{tier.price}</span>
                  </div>
                  <div className="mb-5 font-mono text-xs text-subtle">{tier.credits}</div>
                  <div className={`mb-5 h-px ${tier.recommended ? "bg-rust/30" : "bg-border"}`} />
                  <div className="mb-5 flex flex-col gap-2.5">
                    {tier.specs.map((spec) => (
                      <div key={spec.label} className="flex items-start gap-3">
                        <span className="mt-0.5 min-w-16 flex-shrink-0 font-mono text-[10px] tracking-[0.05em] text-subtle uppercase">
                          {spec.label}
                        </span>
                        <span className="text-[13px] leading-[1.5] text-body">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2">
                    {tier.features.map((f) => (
                      <div key={f.text} className="flex items-start gap-2.5">
                        <span
                          className={`mt-px flex-shrink-0 text-[13px] leading-[1.5] ${f.included ? "text-rust" : "text-border"}`}
                        >
                          {f.included ? "✓" : "✗"}
                        </span>
                        <span
                          className={`text-[13px] leading-[1.5] ${f.included ? "text-body" : "text-border"}`}
                        >
                          {f.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`p-4.5 ${tier.recommended ? "bg-rust/10" : "bg-paper-alt"}`}>
                  <div className="flex items-center justify-between text-sm font-medium text-rust">
                    <span>{tier.ctaText}</span>
                    <span>→</span>
                  </div>
                  <div className="mt-1 text-xs text-subtle">{tier.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CREDIT BUNDLES */}
      <div className="border-b border-border bg-paper">
        <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-20 lg:px-[72px]">
          <div className={eyebrow}>Credit bundles</div>
          <h2 className={sectionTitle}>
            Buy more, pay less
            <br />
            per credit.
          </h2>
          <p className="mt-3 mb-12 max-w-2xl text-lg leading-[1.85] text-body">
            All bundles are pay-once. Credits never expire. No renewal, no
            commitment. The best-value bundle covers 10 Standard sessions or 5 Deep
            sessions — enough to evaluate the platform thoroughly before committing
            further.
          </p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {BUNDLES.map((bundle) => (
              <div
                key={bundle.credits}
                className={`relative rounded-lg border bg-cream p-7 ${bundle.best ? "border-rust" : "border-border"}`}
              >
                {bundle.best && (
                  <span className="absolute top-0 right-5 rounded-b bg-rust px-2.5 py-1 font-mono text-[10px] tracking-[0.06em] text-offwhite uppercase">
                    Best value
                  </span>
                )}
                <div className="mb-1 font-serif text-4xl text-ink">{bundle.credits}</div>
                <div className="mb-5 text-sm text-subtle">credits</div>
                <div className="mb-1 font-serif text-[28px] text-rust">{bundle.price}</div>
                <div className="mb-5 font-mono text-xs text-subtle">{bundle.rate}</div>
                <div className="flex flex-col gap-1.5">
                  {bundle.what.map((line, i) => {
                    const [count, ...rest] = line.split(" ");
                    return (
                      <div key={i} className="text-[13px] text-muted">
                        <span className="font-medium text-ink">{count}</span> {rest.join(" ")}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-md border border-border bg-paper-alt px-5 py-4 text-center text-[13px] leading-[1.6] text-muted">
            Credits never expire · No subscription required · Unused credits carry
            forward indefinitely · Refunds available for unused credit bundles within
            30 days of purchase
          </div>
        </div>
      </div>

      {/* FREE DEMO */}
      <div className="border-b border-border">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-5 py-16 md:grid-cols-2 md:px-10 md:py-20 lg:gap-20 lg:px-[72px]">
          <div>
            <div className={eyebrow}>Free session</div>
            <h2 className={`${sectionTitle} mb-4`}>
              One Standard session.
              <br />
              On us. No card required.
            </h2>
            <p className="mb-6 text-lg leading-[1.85] text-body">
              Every new account gets one Standard session at no cost — the full
              multi-agent deliberation across all three phases. Real API calls. Real
              Guardian verification. Real Contrarian pressure. Not a simulated demo.
            </p>
            <p className="text-sm leading-[1.7] text-muted">
              Run it on a question that matters to your work. If the output
              doesn&apos;t demonstrate the value of structured deliberation on your
              actual research question, you&apos;ll know before you spend anything.
              We&apos;re confident enough to run real sessions for free because the
              architecture speaks for itself.
            </p>
          </div>
          <div className="rounded-lg bg-ink p-7">
            <div className="mb-4.5 font-mono text-[10px] tracking-[0.08em] text-rust uppercase">
              Free session · what&apos;s included
            </div>
            <div className="flex flex-col">
              {DEMO_ROWS.map((row, i) => (
                <div
                  key={row.label}
                  className={`flex items-center justify-between py-3 ${i < DEMO_ROWS.length - 1 ? "border-b border-border-dark" : ""}`}
                >
                  <span className="text-[13px] text-faint">{row.label}</span>
                  <span className={`font-mono text-xs ${row.accent ? "text-rust" : "text-offwhite/80"}`}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ENTERPRISE */}
      <div className="border-t border-border border-b border-border-dark bg-ink">
        <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-20 lg:px-[72px]">
          <div className={eyebrow}>Enterprise</div>
          <h2 className="mb-3 font-serif text-3xl leading-[1.15] text-offwhite md:text-[44px]">
            A different product
            <br />
            on the same engine.
          </h2>
          <p className="mb-12 max-w-2xl text-lg leading-[1.85] text-faint">
            Enterprise isn&apos;t a markup on credits. It&apos;s a different access
            model built for institutional research teams — with SSO, data
            segregation, audit-ready export, and a dedicated account contact.
            Available when these features are built. Contact us now to get on the
            early access list.
          </p>
          <div className="mb-8 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border-dark bg-border-dark md:grid-cols-2">
            {ENTERPRISE_ITEMS.map((item) => (
              <div key={item.feature} className="grid grid-cols-1 gap-2 bg-ink-2 p-6 sm:grid-cols-[180px_1fr] sm:gap-5">
                <span className="text-[13px] font-medium text-offwhite/90">{item.feature}</span>
                <span className="text-[13px] leading-[1.6] text-faint">{item.desc}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="mailto:hello@augle.com"
              className="inline-block rounded bg-offwhite px-6 py-2.5 text-[15px] font-medium whitespace-nowrap text-ink"
            >
              Contact us about enterprise →
            </a>
            <span className="text-sm leading-[1.6] text-faint">
              Enterprise access is currently by arrangement. Contact us to discuss your
              institution&apos;s requirements and join the early access list.
            </span>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-20 lg:px-[72px]">
          <div className={eyebrow}>Common questions</div>
          <h2 className={sectionTitle}>Answered.</h2>
          <div className="mt-12 flex flex-col gap-10 lg:flex-row lg:gap-14">
            {[FAQ_COL_1, FAQ_COL_2].map((col, i) => (
              <div key={i} className="flex flex-1 flex-col gap-8">
                {col.map((item) => (
                  <div key={item.q}>
                    <div className="mb-2.5 text-base leading-[1.4] font-medium text-ink">{item.q}</div>
                    <p className="text-sm leading-[1.7] text-muted">{item.a}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-rust px-5 py-16 text-center md:px-10 md:py-24 lg:px-[72px]">
        <h2 className="mx-auto mb-5 max-w-2xl font-serif text-[32px] leading-[1.12] tracking-tight text-offwhite md:text-[52px]">
          Join the waitlist.
          <br />
          Run your first session free.
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-offwhite/75 md:text-lg">
          Enter your email and we&apos;ll notify you when your account is ready.
          <br className="hidden sm:block" />
          No card required to join — or to run your first session.
        </p>
        <form className="mx-auto flex max-w-[480px] flex-col items-center gap-3 sm:flex-row">
          <label htmlFor="pricing-cta-email" className="sr-only">
            Email
          </label>
          <input
            id="pricing-cta-email"
            name="email"
            type="email"
            placeholder="your@email.com"
            className="w-full flex-1 rounded border-none bg-offwhite px-5 py-3.5 text-[15px] text-ink placeholder:text-subtle"
          />
          <button type="submit" className={`w-full flex-shrink-0 whitespace-nowrap sm:w-auto ${btnWhite}`}>
            Join waitlist
          </button>
        </form>
        <p className="mt-4 text-[13px] text-offwhite/50">
          One free Standard session with every new account · Credits never expire ·
          No subscription
        </p>
      </div>
    </>
  );
}

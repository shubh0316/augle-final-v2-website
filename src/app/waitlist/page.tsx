import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { btnPrimary, eyebrow, sectionTitle } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Join the Waitlist — Augle",
  description:
    "Join the Augle waitlist for early access to seven-agent deliberation. Your first Standard session is free — no card required.",
};

const HERO_NOTES = [
  "No credit card to join",
  "One free Standard session",
  "Credits never expire",
];

const STEPS = [
  {
    num: "01",
    title: "Join the waitlist",
    body: "Enter your email and tell us a bit about how you plan to use Augle. Takes under a minute.",
  },
  {
    num: "02",
    title: "Get your invite",
    body: "We'll email you when your account is ready. Invites go out in batches as capacity opens up.",
  },
  {
    num: "03",
    title: "Run your free session",
    body: "Bring a real research question. Run it at the Standard tier — full ensemble, no cost, no simulation.",
  },
  {
    num: "04",
    title: "Buy credits as needed",
    body: "Liked what you saw? Buy a credit bundle and keep going. No subscription, credits never expire.",
  },
];

const INCLUDED_FEATURES = [
  "All seven agents — Topic Architect through Guardian",
  "Exploration, Deliberation, and Synthesis phases",
  "Guardian integrity verification active",
  "Contrarian adversarial pressure at full capability",
  "Evidence-anchored Finding with calibrated confidence grade",
  "Full audit trail and source verification",
];

const FAQ_COL_1 = [
  {
    q: "How long is the wait?",
    a: "It varies. We're bringing on new accounts in batches tied to corpus and infrastructure capacity, not a fixed queue position. Most people hear back within a few weeks.",
  },
  {
    q: "Is the free session really the full product?",
    a: "Yes. It runs the same seven-agent ensemble and Guardian checks as any paid Standard session — the only difference is you don't pay for it.",
  },
];

const FAQ_COL_2 = [
  {
    q: "Do I need a credit card to join the waitlist?",
    a: "No. Joining the waitlist and running your free session both require no payment information at all.",
  },
  {
    q: "What happens after my free session?",
    a: "You can buy a credit bundle to keep running sessions, or stop there — there's no subscription and nothing renews automatically.",
  },
];

export default function WaitlistPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Waitlist" }]} />

      {/* HERO + SIGNUP */}
      <div className="border-b border-border">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-5 py-16 md:px-10 md:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-[72px]">
          <div>
            <div className={eyebrow}>Early access</div>
            <h1 className="mb-6 font-serif text-[38px] font-normal leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-[64px]">
              Join the waitlist.
              <br />
              <em className="text-rust not-italic italic">Run your first session free.</em>
            </h1>
            <p className="mb-8 max-w-xl text-lg leading-[1.8] text-body">
              Augle is in early access. Join the waitlist to get your account and run
              a real research question through the ensemble — not a demo, not a
              simulation. Every new account starts with one free Standard session, no
              card required.
            </p>
            <div className="flex flex-wrap items-center gap-5 sm:gap-7">
              {HERO_NOTES.map((note) => (
                <span key={note} className="flex items-center gap-2 text-base text-muted">
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-rust" />
                  {note}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-paper p-9 lg:sticky lg:top-24">
            <div className="mb-3.5 font-mono text-[10px] tracking-[0.08em] text-rust uppercase">
              Get early access
            </div>
            <div className="mb-5 font-serif text-[26px] leading-[1.25] text-ink">
              Reserve your spot on the Augle waitlist
            </div>
            <form className="flex flex-col">
              <label htmlFor="waitlist-email" className="mb-1.5 block text-xs text-muted">
                Email
              </label>
              <input
                id="waitlist-email"
                name="email"
                type="email"
                placeholder="your@email.com"
                className="mb-3.5 w-full rounded border border-border bg-offwhite px-4 py-3 text-[15px] text-ink placeholder:text-subtle"
              />
              <label htmlFor="waitlist-role" className="mb-1.5 block text-xs text-muted">
                What best describes you?
              </label>
              <select
                id="waitlist-role"
                name="role"
                defaultValue=""
                className="mb-5 w-full rounded border border-border bg-offwhite px-4 py-3 text-[15px] text-ink"
              >
                <option value="" disabled>
                  Select one
                </option>
                <option value="academic">Academic / researcher</option>
                <option value="enterprise">Enterprise / team</option>
                <option value="law-firm">Law firm</option>
                <option value="vc">Venture capital / PE</option>
                <option value="government">Government / policy</option>
                <option value="other">Other</option>
              </select>
              <button type="submit" className={btnPrimary}>
                Join waitlist →
              </button>
            </form>
            <p className="mt-3.5 text-center text-xs leading-[1.6] text-subtle">
              We&apos;ll email you when your account is ready. No spam — just your
              invite.
            </p>
            <div className="my-6 h-px bg-border" />
            <div className="flex flex-col gap-2.5">
              <div className="flex items-start gap-2.5 text-[13px] leading-[1.5] text-body">
                <span className="flex-shrink-0 text-rust">✓</span>
                <span>One free Standard session on activation</span>
              </div>
              <div className="flex items-start gap-2.5 text-[13px] leading-[1.5] text-body">
                <span className="flex-shrink-0 text-rust">✓</span>
                <span>Full seven-agent ensemble, Guardian included</span>
              </div>
              <div className="flex items-start gap-2.5 text-[13px] leading-[1.5] text-body">
                <span className="flex-shrink-0 text-rust">✓</span>
                <span>Evidence-anchored Finding with confidence grade</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STEPS */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-20 lg:px-[72px]">
          <div className={eyebrow}>How it works</div>
          <h2 className={`${sectionTitle} mb-3`}>
            From waitlist to Finding
            <br />
            in four steps.
          </h2>
          <p className="mb-12 max-w-2xl text-lg leading-[1.85] text-body">
            There&apos;s no gatekeeping beyond capacity — we&apos;re rolling out
            access in batches as we scale the corpus and infrastructure. Here&apos;s
            what happens after you join.
          </p>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <div key={step.num} className="bg-paper p-7">
                <div className="mb-3.5 font-serif text-3xl text-rust">{step.num}</div>
                <div className="mb-2 text-[15px] font-semibold text-ink">{step.title}</div>
                <p className="text-[13px] leading-[1.6] text-muted">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WHAT'S INCLUDED */}
      <div className="border-b border-border bg-paper">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-5 py-16 md:grid-cols-2 md:px-10 md:py-20 lg:gap-16 lg:px-[72px]">
          <div>
            <div className={eyebrow}>Your free session</div>
            <h2 className={`${sectionTitle} mb-4`}>
              One Standard session.
              <br />
              The full ensemble.
            </h2>
            <p className="mb-5 text-lg leading-[1.85] text-body">
              Your free session isn&apos;t a stripped-down preview. It runs the same
              seven-agent ensemble, the same three deliberation phases, and the same
              Guardian integrity checks as every paid Standard session — on a real
              question you bring.
            </p>
            <p className="text-sm leading-[1.7] text-muted">
              Want to see the difference between session tiers first? Visit the{" "}
              <Link href="/pricing" className="text-rust">
                pricing page
              </Link>{" "}
              for the full breakdown.
            </p>
          </div>

          <div className="overflow-hidden rounded-lg border border-rust/30 bg-rust/5">
            <div className="border-b border-rust/30 p-7">
              <span className="mb-2.5 block font-mono text-[10px] tracking-[0.06em] text-rust uppercase">
                Included free
              </span>
              <div className="mb-1.5 font-serif text-3xl text-ink">Standard</div>
              <div className="mb-6 text-[13px] text-muted italic">
                Full deliberation — three phases
              </div>
              <div className="mb-6 flex items-baseline gap-2">
                <span className="font-serif text-4xl leading-none text-rust">$0</span>
                <span className="text-sm text-subtle">first session · normally 1 credit</span>
              </div>
              <div className="flex flex-col gap-2.5">
                {INCLUDED_FEATURES.map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5">
                    <span className="mt-px flex-shrink-0 text-[13px] text-rust">✓</span>
                    <span className="text-[13px] leading-[1.5] text-body">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-rust/10 px-7 py-4.5 text-[13px] text-muted">
              One free session per new account · after that, credits work like the
              pricing page describes
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-20 lg:px-[72px]">
          <div className={eyebrow}>Questions</div>
          <h2 className={sectionTitle}>Before you join.</h2>
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

      {/* CTA (dark, not rust) */}
      <div className="bg-ink px-5 py-16 text-center md:px-10 md:py-24 lg:px-[72px]">
        <h2 className="mx-auto mb-4 max-w-xl font-serif text-[32px] leading-[1.15] tracking-tight text-offwhite md:text-[44px]">
          Not ready to join yet?
        </h2>
        <p className="mx-auto mb-8 max-w-lg text-base leading-[1.7] text-faint md:text-lg">
          See what a real deliberation looks like before you sign up — browse
          completed sessions with full agent traces, dissent, and Guardian
          integrity checks.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link href="/outcomes" className="rounded bg-offwhite px-6.5 py-3.5 text-[15px] font-medium text-ink">
            Browse outcomes
          </Link>
          <Link
            href="/how-it-works"
            className="rounded border border-border-dark px-6.5 py-3.5 text-[15px] font-medium text-offwhite"
          >
            How it works
          </Link>
        </div>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { btnPrimary, eyebrow, sectionTitle } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Contact — Augle",
  description:
    "Get in touch with the Augle team — product questions, research collaboration, enterprise inquiries, and press.",
};

const CHANNELS = [
  {
    code: "WL",
    label: "Waitlist",
    title: "Get early access",
    body: "Join the waitlist to be among the first to run sessions when Augle opens to new users.",
    actionLabel: "Join waitlist →",
    href: "/waitlist",
  },
  {
    code: "EN",
    label: "Enterprise",
    title: "Team + enterprise plans",
    body: "Custom session volumes, Guardian configuration, API access, and white-label options for organisations.",
    actionLabel: "enterprise@augle.com →",
    href: "mailto:enterprise@augle.com",
  },
  {
    code: "RE",
    label: "Research",
    title: "Collaboration + citations",
    body: "Working on augmented deliberation, multi-agent reasoning, or calibration scoring? We'd like to hear from you.",
    actionLabel: "research@augle.com →",
    href: "mailto:research@augle.com",
  },
  {
    code: "PR",
    label: "Press",
    title: "Media inquiries",
    body: "For press coverage, interview requests, and media assets. Response within one business day.",
    actionLabel: "press@augle.com →",
    href: "mailto:press@augle.com",
  },
];

const TEAM = [
  {
    role: "Co-Founder · CEO",
    name: "Cory Kelly",
    bio: "Product design and strategy. 15+ years of UI/UX and product leadership. Responsible for Augle's product architecture, design system, investor relations, and commercial strategy.",
    email: "cory@augle.com",
  },
  {
    role: "Co-Founder · CTO",
    name: "Shubhanker Saxena",
    bio: "Engineering and infrastructure. Responsible for the deliberation engine, corpus pipeline, API architecture, and all production systems. Wozniak to Cory's Jobs.",
    email: "shub@augle.com",
  },
];

export default function ContactPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Company", href: "/company" },
          { label: "Contact" },
        ]}
      />

      {/* HERO */}
      <div className="border-b border-border">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-2 lg:gap-20 lg:px-[72px]">
          <div>
            <div className={eyebrow}>Contact</div>
            <h1 className="mb-5 font-serif text-4xl leading-[1.12] font-normal tracking-tight text-ink lg:text-[52px]">
              Talk to the people building this.
            </h1>
            <p className="text-lg leading-[1.85] text-body">
              We&apos;re a small team. When you reach out to Augle, you reach the founders.
              Whether you have a product question, a research idea, an enterprise inquiry, or
              press coverage in mind — we read and respond to everything.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {CHANNELS.map((channel) => (
              <div
                key={channel.label}
                className="flex items-start gap-5 rounded-lg border border-border bg-paper p-6 transition-colors hover:border-rust"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-paper-alt font-mono text-[11px] font-medium text-rust">
                  {channel.code}
                </div>
                <div>
                  <div className="mb-1 font-mono text-[10px] tracking-[0.08em] text-subtle uppercase">
                    {channel.label}
                  </div>
                  <div className="mb-1 text-[15px] font-medium text-ink">{channel.title}</div>
                  <p className="mb-2 text-[13px] leading-[1.6] text-muted">{channel.body}</p>
                  <Link href={channel.href} className="font-mono text-[11px] text-rust">
                    {channel.actionLabel}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FORM */}
      <div className="border-b border-border bg-paper">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-5 py-16 md:px-10 md:py-20 lg:grid-cols-2 lg:gap-20 lg:px-[72px]">
          <div>
            <div className={eyebrow}>Send a message</div>
            <h2 className={`${sectionTitle} mb-3`}>
              We read everything.
              <br />
              We respond to most.
            </h2>
            <p className="mb-6 text-base leading-[1.85] text-body">
              Use this form for general inquiries. For enterprise, research, or press — the
              direct emails above get a faster response. We don&apos;t use a ticketing system.
              A person reads every submission.
            </p>
            <p className="text-[13px] leading-[1.6] text-subtle">
              Expected response time: 1–2 business days. For time-sensitive matters, email
              directly.
            </p>
          </div>
          <form className="flex flex-col">
            <div className="mb-4">
              <label
                htmlFor="contact-name"
                className="mb-1.5 block font-mono text-[10px] tracking-[0.08em] text-muted uppercase"
              >
                Your name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="Full name"
                className="w-full rounded-[5px] border border-border bg-paper-alt px-3.5 py-3 text-[15px] text-ink outline-none transition-colors focus:border-rust"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="contact-email"
                className="mb-1.5 block font-mono text-[10px] tracking-[0.08em] text-muted uppercase"
              >
                Email address
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="you@organisation.com"
                className="w-full rounded-[5px] border border-border bg-paper-alt px-3.5 py-3 text-[15px] text-ink outline-none transition-colors focus:border-rust"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="contact-org"
                className="mb-1.5 block font-mono text-[10px] tracking-[0.08em] text-muted uppercase"
              >
                Organisation
              </label>
              <input
                id="contact-org"
                name="organisation"
                type="text"
                placeholder="Optional"
                className="w-full rounded-[5px] border border-border bg-paper-alt px-3.5 py-3 text-[15px] text-ink outline-none transition-colors focus:border-rust"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="contact-subject"
                className="mb-1.5 block font-mono text-[10px] tracking-[0.08em] text-muted uppercase"
              >
                Subject
              </label>
              <select
                id="contact-subject"
                name="subject"
                defaultValue=""
                className="w-full appearance-none rounded-[5px] border border-border bg-paper-alt bg-[right_14px_center] bg-no-repeat px-3.5 py-3 text-[15px] text-ink outline-none transition-colors focus:border-rust"
              >
                <option value="">Select a topic</option>
                <option>Product question</option>
                <option>Waitlist inquiry</option>
                <option>Enterprise / team plan</option>
                <option>Research collaboration</option>
                <option>Press / media</option>
                <option>Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="contact-message"
                className="mb-1.5 block font-mono text-[10px] tracking-[0.08em] text-muted uppercase"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="What's on your mind?"
                className="h-[120px] w-full resize-y rounded-[5px] border border-border bg-paper-alt px-3.5 py-3 text-[15px] leading-[1.6] text-ink outline-none transition-colors focus:border-rust"
              />
            </div>
            <button type="submit" className={`${btnPrimary} mt-1 w-full text-center`}>
              Send message
            </button>
            <p className="mt-3 text-center text-[13px] leading-[1.6] text-subtle">
              By submitting this form you agree to our{" "}
              <Link href="/privacy" className="text-rust">
                Privacy Policy
              </Link>
              .
            </p>
          </form>
        </div>
      </div>

      {/* TEAM */}
      <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-20 lg:px-[72px]">
        <div className={eyebrow}>The team</div>
        <h2 className={`${sectionTitle} mb-3`}>
          Two founders.
          <br />
          Building in public.
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2">
          {TEAM.map((member) => (
            <div key={member.name} className="rounded-lg border border-border bg-paper p-7">
              <div className="mb-1.5 font-mono text-[10px] tracking-[0.08em] text-rust uppercase">
                {member.role}
              </div>
              <div className="mb-2 font-serif text-2xl text-ink">{member.name}</div>
              <p className="mb-3 text-[13px] leading-[1.7] text-body">{member.bio}</p>
              <div className="font-mono text-xs text-rust">{member.email}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

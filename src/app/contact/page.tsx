import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ContactForm } from "@/components/ContactForm";
import { AugleIconAnimation } from "@/components/AugleIconAnimation";
import { eyebrow, sectionTitle } from "@/lib/styles";

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
        <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-24 lg:px-[72px]">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
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
            <div className="flex items-center justify-center">
              <AugleIconAnimation className="w-full max-w-70" />
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-2">
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
          <ContactForm />
        </div>
      </div>
    </>
  );
}

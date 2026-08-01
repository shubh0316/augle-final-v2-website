import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { eyebrow } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Security — Augle",
  description: "How Augle protects your data and the integrity of the Service.",
};

const TOC = [
  { href: "#overview", label: "Overview" },
  { href: "#infrastructure", label: "Infrastructure & hosting" },
  { href: "#encryption", label: "Encryption" },
  { href: "#access", label: "Access controls" },
  { href: "#classification", label: "Data classification" },
  { href: "#appsec", label: "Application security" },
  { href: "#vendor", label: "Vendor risk management" },
  { href: "#backups", label: "Backups & disaster recovery" },
  { href: "#physical", label: "Physical security" },
  { href: "#training", label: "Personnel & training" },
  { href: "#integrity", label: "Guardian & source verification" },
  { href: "#disclosure", label: "Responsible disclosure" },
  { href: "#incident", label: "Incident response" },
  { href: "#compliance", label: "Compliance roadmap" },
  { href: "#contact", label: "Contact us" },
];

export default function SecurityPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Security" }]} />

      {/* HERO */}
      <div className="border-b border-border px-5 pt-16 pb-10 md:px-10 md:pt-20 lg:px-[72px]">
        <div className="mx-auto max-w-[820px]">
          <div className={eyebrow}>Legal</div>
          <h1 className="font-serif text-4xl leading-[1.12] font-normal tracking-tight text-ink sm:text-5xl lg:text-[64px]">
            Security
          </h1>
          <div className="mt-2 font-mono text-xs text-muted">Last updated: [Month] 2026</div>
        </div>
      </div>

      {/* BODY */}
      <div className="mx-auto max-w-[820px] px-5 py-14 md:px-10 md:py-24 lg:px-[72px]">
        <nav className="mb-2 rounded-lg border border-border bg-paper p-5">
          <div className="mb-2.5 font-mono text-[11px] tracking-[0.05em] text-muted uppercase">
            On this page
          </div>
          <ol className="list-decimal space-y-1.5 pl-[18px]">
            {TOC.map((item) => (
              <li key={item.href} className="text-sm leading-relaxed">
                <Link href={item.href} className="text-ink hover:text-rust">
                  {item.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <h2 id="overview" className="mt-10 mb-3.5 font-serif text-2xl font-normal text-ink">
          1. Overview
        </h2>
        <p className="mb-3.5 text-[15px] leading-[1.75] text-body">
          Security is core to how Augle operates, given the evidentiary and research use cases
          our Service supports. This page summarizes the practices we follow to protect your
          data and the integrity of the Service. It is a high-level summary, not an exhaustive
          technical specification, and will be updated as our program matures.
        </p>

        <h2 id="infrastructure" className="mt-10 mb-3.5 font-serif text-2xl font-normal text-ink">
          2. Infrastructure &amp; hosting
        </h2>
        <p className="mb-3.5 text-[15px] leading-[1.75] text-body">
          Augle&apos;s infrastructure runs on established cloud providers with independently
          audited data center controls. Production environments are logically isolated from
          development and staging environments, and infrastructure changes go through a review
          process before deployment.
        </p>

        <h2 id="encryption" className="mt-10 mb-3.5 font-serif text-2xl font-normal text-ink">
          3. Encryption
        </h2>
        <p className="mb-3.5 text-[15px] leading-[1.75] text-body">
          Data is encrypted in transit using TLS 1.2 or higher, and at rest using
          industry-standard encryption (such as AES-256). Access to encryption keys is
          restricted to authorized systems and personnel, and key management follows the
          practices of our infrastructure provider.
        </p>

        <h2 id="access" className="mt-10 mb-3.5 font-serif text-2xl font-normal text-ink">
          4. Access controls
        </h2>
        <p className="mb-3.5 text-[15px] leading-[1.75] text-body">
          Internal access to production systems and user data is limited to personnel who
          require it to operate the Service, governed by the principle of least privilege.
          Access to sensitive systems requires multi-factor authentication, and access grants
          are periodically reviewed and revoked promptly upon role change or offboarding.
          Access is logged for audit purposes.
        </p>

        <h2 id="classification" className="mt-10 mb-3.5 font-serif text-2xl font-normal text-ink">
          5. Data classification
        </h2>
        <p className="mb-3.5 text-[15px] leading-[1.75] text-body">
          We classify data by sensitivity (for example, public, internal, confidential, and
          restricted) and apply handling and access controls appropriate to each
          classification. Session content and personal information are treated as confidential
          or restricted.
        </p>

        <h2 id="appsec" className="mt-10 mb-3.5 font-serif text-2xl font-normal text-ink">
          6. Application security
        </h2>
        <p className="mb-3.5 text-[15px] leading-[1.75] text-body">
          We follow secure development practices, including code review prior to deployment,
          dependency and vulnerability scanning, and periodic security testing.{" "}
          <em>
            [Details on penetration testing cadence and any third-party security audits will be
            published here once established.]
          </em>
        </p>

        <h2 id="vendor" className="mt-10 mb-3.5 font-serif text-2xl font-normal text-ink">
          7. Vendor risk management
        </h2>
        <p className="mb-3.5 text-[15px] leading-[1.75] text-body">
          Before engaging infrastructure, AI model, or other sub-processor vendors, we review
          their security and privacy practices, and require contractual data-protection
          commitments consistent with this page and our Privacy Policy.
        </p>

        <h2 id="backups" className="mt-10 mb-3.5 font-serif text-2xl font-normal text-ink">
          8. Backups &amp; disaster recovery
        </h2>
        <p className="mb-3.5 text-[15px] leading-[1.75] text-body">
          We maintain regular backups of critical data and a disaster recovery process designed
          to restore Service availability in the event of an outage.{" "}
          <em>
            [Specific recovery time and recovery point objectives will be published here once
            finalized.]
          </em>
        </p>

        <h2 id="physical" className="mt-10 mb-3.5 font-serif text-2xl font-normal text-ink">
          9. Physical security
        </h2>
        <p className="mb-3.5 text-[15px] leading-[1.75] text-body">
          Augle does not operate its own data centers; physical security for infrastructure is
          provided by our cloud hosting providers, who maintain independently audited physical
          access controls.
        </p>

        <h2 id="training" className="mt-10 mb-3.5 font-serif text-2xl font-normal text-ink">
          10. Personnel &amp; training
        </h2>
        <p className="mb-3.5 text-[15px] leading-[1.75] text-body">
          Personnel with access to production systems or user data undergo background checks
          where legally permitted, and receive security and confidentiality training
          appropriate to their role. Access is granted only as needed for their function.
        </p>

        <h2 id="integrity" className="mt-10 mb-3.5 font-serif text-2xl font-normal text-ink">
          11. Guardian &amp; source verification
        </h2>
        <p className="mb-3.5 text-[15px] leading-[1.75] text-body">
          Alongside infrastructure security, Augle&apos;s Guardian system performs independent
          integrity checks on the evidence used within a deliberation session — verifying
          citations and flagging issues before a Finding is finalized. This is a
          product-integrity feature distinct from, and in addition to, the infrastructure
          security measures described on this page.
        </p>

        <h2 id="disclosure" className="mt-10 mb-3.5 font-serif text-2xl font-normal text-ink">
          12. Responsible disclosure
        </h2>
        <p className="mb-3.5 text-[15px] leading-[1.75] text-body">
          If you believe you&apos;ve found a security vulnerability in the Service, please
          report it to{" "}
          <a href="mailto:security@augle.com" className="text-rust underline">
            security@augle.com
          </a>
          . Include enough detail for us to reproduce the issue. We ask that you:
        </p>
        <ul className="mb-3.5 list-disc space-y-1.5 pl-5">
          <li className="text-[15px] leading-[1.75] text-body">
            Give us a reasonable opportunity to investigate and address a report before any
            public disclosure.
          </li>
          <li className="text-[15px] leading-[1.75] text-body">
            Avoid accessing, modifying, or deleting data that isn&apos;t yours in the course of
            testing.
          </li>
          <li className="text-[15px] leading-[1.75] text-body">
            Avoid degrading the Service for other users, including through automated scanning
            that causes load issues.
          </li>
          <li className="text-[15px] leading-[1.75] text-body">
            Not use social engineering, physical attacks, or denial-of-service techniques.
          </li>
        </ul>
        <p className="mb-3.5 text-[15px] leading-[1.75] text-body">
          We will acknowledge good-faith reports and will not pursue legal action against
          researchers who comply with this policy.{" "}
          <em>
            [A formal safe-harbor statement and, if applicable, a bug-bounty program with
            reward tiers will be finalized and published here.]
          </em>
        </p>

        <h2 id="incident" className="mt-10 mb-3.5 font-serif text-2xl font-normal text-ink">
          13. Incident response
        </h2>
        <p className="mb-3.5 text-[15px] leading-[1.75] text-body">
          Augle maintains an incident response process for identifying, containing,
          eradicating, and recovering from security incidents, including a defined escalation
          path and post-incident review. Where an incident affects user data, we will notify
          affected users and relevant authorities as required by applicable law, without undue
          delay.
        </p>

        <h2 id="compliance" className="mt-10 mb-3.5 font-serif text-2xl font-normal text-ink">
          14. Compliance roadmap
        </h2>
        <p className="mb-3.5 text-[15px] leading-[1.75] text-body">
          <em>
            [Details on SOC 2 Type II, ISO 27001, or other compliance certifications, if and
            when pursued, will be published here as they are achieved.]
          </em>
        </p>

        <h2 id="contact" className="mt-10 mb-3.5 font-serif text-2xl font-normal text-ink">
          15. Contact us
        </h2>
        <p className="mb-3.5 text-[15px] leading-[1.75] text-body">
          Security questions or vulnerability reports can be directed to{" "}
          <a href="mailto:security@augle.com" className="text-rust underline">
            security@augle.com
          </a>
          .
        </p>
      </div>
    </>
  );
}

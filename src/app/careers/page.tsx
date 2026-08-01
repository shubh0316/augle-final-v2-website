import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { eyebrow, sectionTitle } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Careers — Augle",
  description:
    "Careers at Augle, Inc. — building a multi-agent AI deliberation platform. No open roles right now, but we'd like to hear from you.",
};

const VALUES = [
  {
    title: "Comfortable being wrong in public",
    body: "Our own product's core premise is that confidence should be earned, not assumed. We hold ourselves to the same standard — surfacing disagreement and gaps rather than papering over them.",
  },
  {
    title: "Evidence over assertion",
    body: "We'd rather ship something narrower and defensible than something broad and unverifiable. If a claim can't be traced to a source, it doesn't ship.",
  },
  {
    title: "Small team, real ownership",
    body: "Early-stage means fewer layers between an idea and it shipping. We're looking for people who want that kind of direct ownership, not distance from it.",
  },
];

export default function CareersPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Company", href: "/company" },
          { label: "Careers" },
        ]}
      />

      {/* HERO */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-24 lg:px-[72px]">
          <div className={eyebrow}>Careers</div>
          <h1 className="mb-6 font-serif text-4xl leading-[1.15] font-normal tracking-tight text-ink sm:text-5xl lg:text-[56px]">
            Build the case <em className="text-rust not-italic italic">for rigor</em>
            <br />
            in an era of confident noise.
          </h1>
          <p className="max-w-2xl text-lg leading-[1.8] text-body">
            Augle is a small team building a multi-agent AI deliberation platform —
            infrastructure for the questions where getting it right matters more than getting
            an answer fast.
          </p>
        </div>
      </div>

      {/* VALUES */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-24 lg:px-[72px]">
          <div className={eyebrow}>How we work</div>
          <h2 className={sectionTitle}>What we look for</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:mt-10 md:grid-cols-3">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="rounded-lg border border-border bg-paper p-7"
              >
                <div className="mb-2.5 text-base font-semibold text-ink">{value.title}</div>
                <p className="text-sm leading-[1.7] text-body">{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* OPENINGS */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-24 lg:px-[72px]">
          <div className={eyebrow}>Open Roles</div>
          <h2 className={sectionTitle}>Current openings</h2>
          <div className="mt-8 rounded-lg border border-dashed border-border bg-paper p-12 text-center md:mt-10">
            <div className="mb-2.5 font-serif text-xl text-ink">Nothing open right now</div>
            <p className="mx-auto max-w-xl text-[15px] text-muted">
              We&apos;re a small founding team and aren&apos;t actively hiring at the moment. If
              that changes, roles will be posted here. If you think you&apos;d be a strong fit
              for where we&apos;re headed, we&apos;d still like to hear from you.
            </p>
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-8 px-5 py-16 md:px-10 md:py-20 lg:px-[72px]">
        <div>
          <div className="mb-2 font-serif text-[28px] text-ink">Get in touch anyway</div>
          <p className="max-w-lg text-[15px] text-muted">
            Send a note and tell us what you&apos;d want to work on. We keep good conversations
            on file for when a role opens up.
          </p>
        </div>
        <a
          href="mailto:careers@augle.com"
          className="rounded-md border border-border bg-paper px-5 py-3 font-mono text-[15px] whitespace-nowrap text-rust"
        >
          careers@augle.com
        </a>
      </div>
    </>
  );
}

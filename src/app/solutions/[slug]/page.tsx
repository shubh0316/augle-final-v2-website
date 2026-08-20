import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CtaBanner } from "@/components/CtaBanner";
import { eyebrow, sectionTitle } from "@/lib/styles";
import { SOLUTIONS, getSolution } from "@/data/solutions";

/** Same 11 chips, same order, on every vertical page in the source — shared nav, not per-vertical data. */
const VERTICALS_NAV: { label: string; slug: string }[] = [
  { label: "Universities + academia", slug: "universities" },
  { label: "Research labs", slug: "research-labs" },
  { label: "Policy + lawmakers", slug: "policy" },
  { label: "Law firms", slug: "law-firms" },
  { label: "Venture capital + PE", slug: "venture-capital" },
  { label: "Think tanks", slug: "think-tanks" },
  { label: "Enterprise", slug: "enterprise" },
  { label: "Healthcare + life sciences", slug: "healthcare" },
  { label: "Government", slug: "government" },
  { label: "Financial services", slug: "financial-services" },
  { label: "Media + journalism", slug: "media" },
];

const BADGE_CLASS: Record<"standard" | "deep", string> = {
  standard: "bg-ink-2 text-subtle",
  deep: "bg-rust/15 text-rust",
};

function Lines({ lines, className }: { lines: string[]; className?: string }) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className={className}>
          {i > 0 && <br />}
          {line}
        </span>
      ))}
    </>
  );
}

export async function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) return {};
  return { title: solution.metaTitle };
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  const ctaTitle: ReactNode = <Lines lines={solution.ctaTitle} />;
  const ctaBody: ReactNode = <Lines lines={solution.ctaBody} />;

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: solution.navLabel },
        ]}
      />

      {/* HERO */}
      <div className="border-b border-border">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-5 py-16 md:px-10 md:py-20 lg:grid-cols-[1fr_360px] lg:gap-20 lg:px-[72px] lg:py-24">
          <div>
            <div className={eyebrow}>{solution.eyebrow}</div>
            <h1 className="mb-6 font-serif text-[42px] font-normal leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-[64px]">
              {solution.heroTitle.lines[0]}
              <br />
              {solution.heroTitle.lines[1]}
              <br />
              {solution.heroTitle.emphasisPrefix}
              <em className="text-rust not-italic italic">{solution.heroTitle.emphasis}</em>
            </h1>
            <p className="mb-8 max-w-2xl text-lg leading-[1.8] text-body">{solution.heroBody}</p>
            <div className="flex flex-col gap-2">
              {solution.personas.map((persona) => (
                <div key={persona} className="flex items-center gap-2.5 text-sm text-body">
                  <span className="h-[5px] w-[5px] flex-shrink-0 rounded-full bg-rust" />
                  {persona}
                </div>
              ))}
            </div>
          </div>

          <div className="self-start overflow-hidden rounded-lg border border-border bg-paper">
            <div className="border-b border-border bg-paper-alt px-5 py-3.5">
              <span className="font-mono text-[10px] tracking-[0.08em] text-subtle uppercase">
                {solution.sessionConfigLabel}
              </span>
            </div>
            {solution.sessionConfig.map((row, i) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-3 border-b border-border px-5 py-3.5 last:border-b-0"
              >
                <span className="flex-shrink-0 font-mono text-[10px] tracking-[0.05em] text-subtle uppercase">
                  {row.label}
                </span>
                <span
                  className={`text-right text-[13px] leading-snug ${i === 0 ? "font-medium text-rust" : "text-ink"}`}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROBLEM */}
      <div className="border-b border-border">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-16 px-5 py-16 md:px-10 md:py-20 lg:grid-cols-2 lg:px-[72px]">
          <div>
            <div className={eyebrow}>The problem</div>
            <h2 className={`${sectionTitle} mb-4`}>
              <Lines lines={solution.problemTitle} />
            </h2>
            <p className="text-lg leading-[1.85] text-body">{solution.problemBody}</p>
            <div className="mt-7">
              <p className="mb-3.5 font-mono text-[10px] tracking-[0.08em] text-subtle uppercase">
                {solution.questionsLabel}
              </p>
              <div className="overflow-hidden rounded-md border border-border">
                {solution.questions.map((q, i) => (
                  <div
                    key={q}
                    className={`px-4.5 py-3.5 text-sm leading-relaxed text-body ${
                      i < solution.questions.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    &ldquo;{q}&rdquo;
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {solution.problemItems.map((item) => (
              <div key={item.title} className="rounded-md border border-border border-l-2 border-l-rust bg-paper p-5">
                <div className="mb-1.5 text-sm font-medium text-ink">{item.title}</div>
                <p className="text-[13px] leading-relaxed text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* USE CASES */}
      <div className="border-b border-border bg-ink py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-[72px]">
          <div className={eyebrow}>How it works in practice</div>
          <h2 className="mb-3 font-serif text-3xl leading-[1.15] text-offwhite md:text-[44px]">
            <Lines lines={solution.useCasesTitle} />
          </h2>
          <p className="mb-12 max-w-2xl text-lg leading-[1.85] text-faint md:mb-14">{solution.useCasesBody}</p>
          <div className="flex flex-col gap-px overflow-hidden rounded-lg border border-border-dark bg-border-dark">
            {solution.useCases.map((uc) => (
              <div key={uc.name} className="bg-ink-2 p-6 md:p-9">
                <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="mb-2 font-mono text-[10px] tracking-[0.06em] text-rust uppercase">
                      {uc.numLabel}
                    </div>
                    <div className="mb-1.5 font-serif text-2xl text-offwhite">{uc.name}</div>
                    <div className="text-[13px] text-faint italic">{uc.persona}</div>
                  </div>
                  <span
                    className={`inline-block flex-shrink-0 rounded px-2.5 py-1 font-mono text-[10px] whitespace-nowrap ${BADGE_CLASS[uc.badgeVariant]}`}
                  >
                    {uc.badge}
                  </span>
                </div>
                <p className="mb-5 rounded border-l-2 border-rust bg-ink px-4.5 py-3.5 text-sm leading-relaxed text-offwhite/85 italic">
                  &ldquo;{uc.question}&rdquo;
                </p>
                <div className="mb-5 grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div className="flex flex-col gap-3">
                    {uc.highlights.map((h) => (
                      <div key={h.agent} className="flex gap-3">
                        <span className="w-20 flex-shrink-0 font-mono text-[10px] tracking-[0.06em] text-faint uppercase">
                          {h.agent}
                        </span>
                        <span className="text-xs leading-relaxed text-faint">{h.text}</span>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-md bg-ink p-4">
                    <div className="mb-3 font-mono text-[10px] tracking-[0.06em] text-rust uppercase">
                      Session output
                    </div>
                    {uc.outcome.map((row) => (
                      <div key={row.label} className="mb-2 flex gap-2.5 last:mb-0">
                        <span className="w-[72px] flex-shrink-0 font-mono text-[10px] text-faint uppercase">
                          {row.label}
                        </span>
                        <span className="text-xs leading-relaxed text-faint">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t border-border-dark pt-5">
                  <div className="mb-2 font-mono text-[10px] tracking-[0.06em] text-subtle uppercase">The value</div>
                  <p className="text-[13px] leading-[1.7] text-faint italic">{uc.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HOW IT WORKS FOR THIS VERTICAL */}
      <div className="border-b border-border py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-[72px]">
          <div className={eyebrow}>{solution.howEyebrow}</div>
          <h2 className={`${sectionTitle} mb-12 md:mb-14`}>
            <Lines lines={solution.howTitle} />
          </h2>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col gap-6">
              {solution.howItems.map((item, i) => (
                <div key={item.title} className="grid grid-cols-[40px_1fr] gap-4">
                  <div className="font-serif text-3xl leading-none text-rust">{i + 1}</div>
                  <div>
                    <div className="mb-1.5 text-[15px] font-medium text-ink">{item.title}</div>
                    <p className="text-[13px] leading-relaxed text-muted">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="overflow-hidden rounded-lg border border-border bg-paper">
              <div className="border-b border-border bg-paper-alt px-5 py-3.5">
                <span className="font-mono text-[10px] tracking-[0.08em] text-subtle uppercase">
                  {solution.howConfigLabel}
                </span>
              </div>
              {solution.howConfig.map((row) => (
                <div key={row.label} className="border-b border-border px-5 py-3.5 last:border-b-0">
                  <div className="mb-1 font-mono text-[10px] tracking-[0.05em] text-rust uppercase">{row.label}</div>
                  <div className="text-[13px] leading-relaxed text-body">{row.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* WHY AUGLE */}
      <div className="border-b border-border bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-[72px]">
          <div className={eyebrow}>{solution.whyEyebrow}</div>
          <h2 className={`${sectionTitle} mb-12 md:mb-14`}>
            <Lines lines={solution.whyTitle} />
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {solution.whyCards.map((card) => (
              <div key={card.title} className="rounded-lg border border-border bg-cream p-6">
                <div className="mb-2.5 font-serif text-xl text-ink">{card.title}</div>
                <p className="text-[13px] leading-relaxed text-body">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ALL SOLUTION VERTICALS */}
      <div className="border-b border-border py-10 md:py-14">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-[72px]">
          <div className={eyebrow}>All solution verticals</div>
          <div className="flex flex-wrap gap-2">
            {VERTICALS_NAV.map((v) => (
              <Link
                key={v.slug}
                href={`/solutions/${v.slug}`}
                className={`inline-block rounded px-4 py-2 text-[13px] ${
                  v.slug === solution.slug
                    ? "bg-ink text-offwhite"
                    : "border border-border bg-paper text-muted hover:border-rust hover:text-rust"
                }`}
              >
                {v.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <CtaBanner title={ctaTitle} body={ctaBody} />
    </>
  );
}

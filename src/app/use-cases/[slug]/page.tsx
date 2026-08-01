import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CtaBanner } from "@/components/CtaBanner";
import { eyebrow, sectionTitle } from "@/lib/styles";
import { getUseCase, USE_CASES, type Session } from "@/data/use-cases";

export async function generateStaticParams() {
  return USE_CASES.map((uc) => ({ slug: uc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const useCase = getUseCase(slug);
  if (!useCase) return {};
  return { title: useCase.metaTitle, description: useCase.metaDescription };
}

const DEPTH_TAG_CLASS: Record<string, string> = {
  Deep: "bg-ink-3 text-rust",
  Standard: "border border-border bg-paper-alt text-muted",
};

function SessionCard({ session, index, total }: { session: Session; index: number; total: number }) {
  const columns = [session.agents.slice(0, 2), session.agents.slice(2, 4)];
  return (
    <div id={`s${index + 1}`} className="scroll-mt-20 border-b border-border bg-paper p-6 last:border-b-0 md:p-8">
      <div className="mb-1.5 font-mono text-[10px] tracking-[0.06em] text-rust uppercase">
        Session {String(index + 1).padStart(2, "0")} of {String(total).padStart(2, "0")}
      </div>
      <div className="mb-1.5 font-serif text-2xl text-ink">{session.name}</div>
      <div className="mb-3.5 text-[13px] text-muted italic">{session.persona}</div>
      <p className="mb-3.5 max-w-2xl rounded border-l-2 border-rust bg-paper-alt px-4 py-3.5 text-sm leading-relaxed text-body italic">
        {session.question}
      </p>
      <div className="mb-6 flex flex-wrap gap-2">
        {session.tags.map((tag) => (
          <span
            key={tag}
            className={`rounded px-2.5 py-1 font-mono text-[10px] ${
              DEPTH_TAG_CLASS[tag] ?? "border border-rust bg-paper-alt text-rust"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {columns.map((col, i) => (
          <div key={i} className="flex flex-col gap-3">
            {col.map((block) => (
              <div key={block.name} className="rounded-md border border-border bg-cream p-4">
                <div className="mb-2 font-mono text-[10px] tracking-[0.06em] text-rust uppercase">
                  {block.name}
                </div>
                <p className="text-[13px] leading-relaxed text-body">{block.text}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-ink p-6">
        <div className="mb-4 font-mono text-[10px] tracking-[0.06em] text-rust uppercase">
          Session output
        </div>
        <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {session.output.items.map((item, i) => (
            <div key={item.key} className="rounded-md bg-ink-2 p-3.5">
              <div className="mb-1.5 font-mono text-[10px] tracking-[0.05em] text-faint uppercase">
                {item.key}
              </div>
              <div className={`text-xs leading-snug ${i === 0 ? "text-rust" : "text-faint"}`}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-start gap-3 rounded-md bg-ink-2 p-3.5">
          <span className="min-w-16 flex-shrink-0 font-mono text-[10px] text-faint uppercase">
            {session.output.noteLabel}
          </span>
          <span className="text-[13px] leading-relaxed text-offwhite/90 italic">
            {session.output.noteText}
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-border-dark pt-4">
          <span className="text-[13px] text-faint">Illustrative session · augle.com</span>
          <Link href="/outcomes" className="font-mono text-[13px] font-medium text-rust">
            View full session record →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default async function UseCasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const useCase = getUseCase(slug);
  if (!useCase) notFound();

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Use cases", href: "/use-cases" },
          { label: useCase.vertical },
        ]}
      />

      {/* HERO */}
      <div className="border-b border-border">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-5 py-16 md:px-10 md:py-20 lg:grid-cols-[1fr_380px] lg:gap-20 lg:px-[72px] lg:py-24">
          <div>
            <div className={eyebrow}>Use cases · {useCase.vertical}</div>
            <h1 className="mb-6 font-serif text-[42px] font-normal leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-[64px]">
              Three sessions.
              <br />
              One <em className="text-rust not-italic italic">vertical.</em>
            </h1>
            <p className="mb-7 max-w-2xl text-lg leading-[1.8] text-body">{useCase.heroBody}</p>
            <div className="flex flex-col gap-2.5">
              {useCase.heroLinks.map((link) => (
                <div key={link} className="flex items-start gap-2.5 text-sm text-body">
                  <span className="mt-2 h-[5px] w-[5px] flex-shrink-0 rounded-full bg-rust" />
                  {link}
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-border bg-paper">
            <div className="border-b border-border bg-paper-alt px-5 py-3.5">
              <span className="font-mono text-[10px] tracking-[0.08em] text-subtle uppercase">
                Vertical overview
              </span>
            </div>
            <div className="flex items-baseline justify-between gap-3 border-b border-border px-5 py-3.5">
              <span className="flex-shrink-0 font-mono text-[10px] tracking-[0.05em] text-subtle uppercase">
                Sessions
              </span>
              <span className="text-right text-[13px] leading-snug text-ink">3 hypothetical</span>
            </div>
            <div className="flex items-baseline justify-between gap-3 border-b border-border px-5 py-3.5">
              <span className="flex-shrink-0 font-mono text-[10px] tracking-[0.05em] text-subtle uppercase">
                Depths
              </span>
              <span className="text-right text-[13px] leading-snug text-ink">Standard · Deep</span>
            </div>
            <div className="flex items-baseline justify-between gap-3 border-b border-border px-5 py-3.5">
              <span className="flex-shrink-0 font-mono text-[10px] tracking-[0.05em] text-subtle uppercase">
                Guardian mode
              </span>
              <span className="text-right text-[13px] leading-snug font-medium text-rust">
                {useCase.guardianMode}
              </span>
            </div>
            <div className="flex items-baseline justify-between gap-3 border-b border-border px-5 py-3.5">
              <span className="flex-shrink-0 font-mono text-[10px] tracking-[0.05em] text-subtle uppercase">
                Common outputs
              </span>
              <span className="text-right text-[13px] leading-snug text-ink">
                {useCase.commonOutputs.join(" · ")}
              </span>
            </div>
            <div className="flex items-baseline justify-between gap-3 px-5 py-3.5">
              <span className="flex-shrink-0 font-mono text-[10px] tracking-[0.05em] text-subtle uppercase">
                Solutions page
              </span>
              <Link href={`/solutions/${useCase.slug}`} className="text-right text-[13px] text-rust">
                {useCase.vertical} →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* SESSIONS */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-20 lg:px-[72px]">
          <div className={eyebrow}>Three sessions</div>
          <h2 className={`${sectionTitle} mb-3`}>The deliberation in full.</h2>
          <p className="mb-12 max-w-2xl text-lg leading-[1.85] text-body md:mb-14">
            Each session below shows the complete arc: question submitted, ensemble behaviour
            across agents, unresolved objections preserved verbatim, and the session output.
          </p>
          <div className="overflow-hidden rounded-lg border border-border">
            {useCase.sessions.map((session, i) => (
              <SessionCard key={session.name} session={session} index={i} total={useCase.sessions.length} />
            ))}
          </div>
        </div>
      </div>

      {/* RELATED */}
      <div className="border-b border-border bg-paper">
        <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-20 lg:px-[72px]">
          <div className={eyebrow}>Related</div>
          <h2 className={`${sectionTitle} mb-10 md:mb-12`}>Where to go next.</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-border bg-cream p-6 transition-colors hover:border-rust">
              <div className="mb-2 font-mono text-[10px] tracking-[0.06em] text-rust uppercase">
                Solutions page
              </div>
              <div className="mb-2 font-serif text-xl text-ink">
                {useCase.solutionsPageName ?? useCase.vertical}
              </div>
              <p className="mb-3.5 text-[13px] leading-relaxed text-muted">{useCase.solutionsPageDesc}</p>
              <Link href={`/solutions/${useCase.slug}`} className="text-[13px] text-rust">
                View solutions page →
              </Link>
            </div>
            {useCase.relatedHubs.map((hub) => (
              <div
                key={hub.href}
                className="rounded-lg border border-border bg-cream p-6 transition-colors hover:border-rust"
              >
                <div className="mb-2 font-mono text-[10px] tracking-[0.06em] text-rust uppercase">
                  Related hub
                </div>
                <div className="mb-2 font-serif text-xl text-ink">{hub.name}</div>
                <p className="mb-3.5 text-[13px] leading-relaxed text-muted">{hub.desc}</p>
                <Link href={hub.href} className="text-[13px] text-rust">
                  View {hub.name.replace(/ hub$/, "")} hub →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HUB NAV */}
      <div className="border-b border-border py-10 md:py-14">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-[72px]">
          <div className={eyebrow}>All use case hubs</div>
          <div className="flex flex-wrap gap-2">
            {USE_CASES.map((uc) => (
              <Link
                key={uc.slug}
                href={`/use-cases/${uc.slug}`}
                className={`inline-block rounded px-4 py-2 text-[13px] ${
                  uc.slug === useCase.slug
                    ? "bg-ink text-offwhite"
                    : "border border-border bg-paper text-muted hover:border-rust hover:text-rust"
                }`}
              >
                {uc.hubLabel ?? uc.vertical}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <CtaBanner
        title={
          <>
            Run a real session
            <br />
            on your question.
          </>
        }
        body="Join the waitlist and get one Standard session free — real deliberation, not a simulation."
        secondaryLabel={`${useCase.shortName} solutions page`}
        secondaryHref={`/solutions/${useCase.slug}`}
      />
    </>
  );
}

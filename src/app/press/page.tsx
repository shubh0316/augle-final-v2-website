import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { MediumArticleGrid } from "@/components/MediumArticleGrid";
import {
  logoOnLight,
  logoOnDark,
  iconSwatch,
  logoDownloads,
  iconDownloads,
} from "@/data/pressKit";
import { eyebrow, sectionTitle } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Press & Media — Augle",
  description:
    "Media resources for Augle, Inc. — company boilerplate, logo and brand assets, and press contact information.",
};

export default function PressPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Company", href: "/company" },
          { label: "Press" },
        ]}
      />

      {/* HERO */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-24 lg:px-[72px]">
          <div className={eyebrow}>Press &amp; Media</div>
          <h1 className="mb-6 font-serif text-4xl leading-[1.12] font-normal tracking-tight text-ink sm:text-5xl lg:text-[64px]">
            Resources for
            <br />
            covering <em className="text-rust not-italic italic">Augle</em>.
          </h1>
          <p className="max-w-2xl text-lg leading-[1.8] text-body">
            Company background, brand assets, and a direct line to the team — everything you
            need to write about Augle accurately.
          </p>
        </div>
      </div>

      {/* BOILERPLATE */}
      <div className="border-b border-border bg-paper">
        <div className="mx-auto max-w-[900px] px-5 py-16 md:px-10 md:py-24 lg:px-[72px]">
          <div className={eyebrow}>Company Boilerplate</div>
          <p className="text-lg leading-[1.85] text-body">
            <strong className="text-ink">Augle, Inc.</strong> is a Delaware C-Corporation
            building a multi-agent AI deliberation platform for research and evidence-based
            decision-making. A multi-agent ensemble examines a research question across three
            structured phases — Exploration, Deliberation, and Synthesis — surfacing
            disagreement rather than hiding it, and producing a calibrated Finding with a
            transparent confidence grade: Established, Probable, Contested, or Gap. Augle
            publishes its full session record, including agent contributions and an
            independent Guardian integrity audit, for every deliberation. Augle was founded in
            2026 by Cory Kelly and Shubhanker Saxena.
          </p>
        </div>
      </div>

      {/* MEDIA KIT */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-24 lg:px-[72px]">
          <div className={eyebrow}>Media Kit</div>
          <h2 className={`${sectionTitle} mb-8`}>Brand assets</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Logo card */}
            <div className="flex flex-col gap-3.5 rounded-lg border border-border bg-paper p-7">
              <div className="text-base font-medium text-ink">Logo</div>
              <p className="flex-1 text-sm leading-[1.6] text-body">
                Use the light-background version on cream/white surfaces, and the
                dark-background version on dark surfaces.
              </p>
              <div className="flex flex-col gap-2.5">
                <div className="flex min-h-16 items-center justify-center rounded-md border border-border bg-paper-alt px-4 py-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logoOnLight.src}
                    alt={logoOnLight.alt}
                    className="block h-8 max-w-full w-auto"
                  />
                </div>
                <div className="flex min-h-16 items-center justify-center rounded-md bg-ink px-4 py-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logoOnDark.src}
                    alt={logoOnDark.alt}
                    className="block h-8 max-w-full w-auto"
                  />
                </div>
              </div>
              <div className="flex gap-3.5">
                <a
                  href={logoDownloads[0].href}
                  download={logoDownloads[0].download}
                  className="font-mono text-xs tracking-[0.03em] text-rust hover:underline"
                >
                  {logoDownloads[0].label}
                </a>
                <a
                  href={logoDownloads[1].href}
                  download={logoDownloads[1].download}
                  className="font-mono text-xs tracking-[0.03em] text-rust hover:underline"
                >
                  {logoDownloads[1].label}
                </a>
              </div>
              <div className="flex gap-3.5">
                <a
                  href={logoDownloads[2].href}
                  download={logoDownloads[2].download}
                  className="font-mono text-xs tracking-[0.03em] text-rust hover:underline"
                >
                  {logoDownloads[2].label}
                </a>
                <a
                  href={logoDownloads[3].href}
                  download={logoDownloads[3].download}
                  className="font-mono text-xs tracking-[0.03em] text-rust hover:underline"
                >
                  {logoDownloads[3].label}
                </a>
              </div>
            </div>

            {/* Icon card */}
            <div className="flex flex-col gap-3.5 rounded-lg border border-border bg-paper p-7">
              <div className="text-base font-medium text-ink">Icon</div>
              <p className="flex-1 text-sm leading-[1.6] text-body">
                Standalone mark for favicons, app icons, and compact placements. Works on light
                or dark backgrounds.
              </p>
              <div className="flex items-center justify-center rounded-md border border-border bg-paper-alt p-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={iconSwatch.src} alt={iconSwatch.alt} className="h-12 w-12" />
              </div>
              <div className="flex gap-3.5">
                {iconDownloads.map((dl) => (
                  <a
                    key={dl.download}
                    href={dl.href}
                    download={dl.download}
                    className="font-mono text-xs tracking-[0.03em] text-rust hover:underline"
                  >
                    {dl.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* COVERAGE */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-24 lg:px-[72px]">
          <MediumArticleGrid />
        </div>
      </div>

      {/* CONTACT */}
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-8 px-5 py-16 md:px-10 md:py-20 lg:px-[72px]">
        <div>
          <div className="mb-2 font-serif text-[28px] text-ink">Press inquiries</div>
          <p className="text-[15px] text-muted">
            For interviews, comment, or additional materials, reach out directly.
          </p>
        </div>
        <a
          href="mailto:press@augle.com"
          className="rounded-md border border-border bg-paper px-5 py-3 font-mono text-[15px] whitespace-nowrap text-rust"
        >
          press@augle.com
        </a>
      </div>
    </>
  );
}

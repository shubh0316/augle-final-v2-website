import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { MediumArticleGrid } from "@/components/MediumArticleGrid";
import { eyebrow } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Blog — Augle",
  description:
    "Augle's blog — notes on multi-agent deliberation, confidence calibration, and the architecture behind evidence-anchored AI research.",
};

export default function BlogPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />

      {/* HERO */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-24 lg:px-[72px]">
          <div className={eyebrow}>Blog</div>
          <h1 className="mb-6 font-serif text-4xl leading-[1.12] font-normal tracking-tight text-ink sm:text-5xl lg:text-[64px]">
            Notes on <em className="text-rust not-italic italic">deliberation</em>,
            <br />
            confidence, and evidence.
          </h1>
          <p className="max-w-2xl text-lg leading-[1.8] text-body">
            Essays on the architecture behind Augle — why confidence should only flow downhill,
            how the Guardian catches what a single model can&apos;t, and what it takes to make
            AI reasoning genuinely auditable.
          </p>
        </div>
      </div>

      {/* ARTICLES */}
      <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-24 lg:px-[72px]">
        <MediumArticleGrid />
      </div>
    </>
  );
}

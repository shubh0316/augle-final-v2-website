import type { Metadata } from "next";
import { IndexSubnav } from "@/components/IndexSubnav";
import { QuestionExplorer } from "@/components/QuestionExplorer";

export const metadata: Metadata = {
  title: "Question Explorer — Deliberation Index — Augle",
  description:
    "Search and filter Augle deliberation sessions by domain, confidence grade, and dissent level.",
};

export default function ExplorerPage() {
  return (
    <>
      <div className="border-b border-border bg-paper">
        <div className="mx-auto max-w-[1280px] px-5 py-3.5 md:px-10 lg:px-[72px]">
          <div className="mb-1 font-mono text-[10px] tracking-[0.08em] text-rust uppercase">
            Augle Deliberation Index
          </div>
          <div className="mb-0.5 font-serif text-[22px] text-ink">Question explorer</div>
          <div className="text-xs text-subtle">Search and filter every deliberation session · Illustrative data</div>
        </div>
      </div>
      <IndexSubnav active="explorer" />
      <QuestionExplorer />
    </>
  );
}

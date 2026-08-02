import type { Metadata } from "next";
import { IndexSubnav } from "@/components/IndexSubnav";
import { DeliberationHeatmap } from "@/components/DeliberationHeatmap";

export const metadata: Metadata = {
  title: "Deliberation Index — Heatmap — Augle",
  description:
    "The Augle Deliberation Index heatmap — confidence grade distribution by domain. Click any cell to explore sessions.",
};

export default function HeatmapPage() {
  return (
    <>
      <div className="border-b border-border bg-paper px-5 py-3.5 md:px-10 lg:px-[72px]">
        <div className="mb-1 font-mono text-[10px] tracking-[0.08em] text-rust uppercase">
          Augle Deliberation Index
        </div>
        <div className="mb-0.5 font-serif text-[22px] text-ink">Confidence grade heatmap</div>
        <div className="text-xs text-subtle">
          Session count and grade distribution by domain · Click any cell to explore sessions · Illustrative data
        </div>
      </div>
      <IndexSubnav active="heatmap" fullWidth />
      <DeliberationHeatmap />
    </>
  );
}

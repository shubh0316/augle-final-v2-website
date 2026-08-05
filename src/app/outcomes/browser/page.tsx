import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { OutcomesBrowser } from "@/components/OutcomesBrowser";

export const metadata: Metadata = {
  title: "Outcomes — Augle",
  description:
    "Browse illustrative Augle deliberation sessions — confidence grades, agent contributions, dissent, and Guardian integrity.",
};

export default function OutcomesBrowserPage() {
  return (
    <div className="flex h-[calc(100dvh-4rem)] flex-col overflow-hidden">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Outcomes", href: "/outcomes" }, { label: "Session browser" }]}
      />
      <div className="border-b border-border bg-paper px-5 py-3.5 md:px-10 lg:px-[72px]">
        <div className="mb-1 font-mono text-[10px] leading-none tracking-[0.08em] text-rust uppercase">
          Public deliberations
        </div>
        <h1 className="mb-0.5 font-serif text-[22px] leading-none text-ink">Outcomes</h1>
        <p className="text-xs text-subtle">
          Ensemble deliberation sessions — confidence grades, agent contributions, dissent, Guardian integrity.
          Example sessions; live sessions publish here as they run.
        </p>
      </div>
      <OutcomesBrowser />
    </div>
  );
}

import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { OutcomesBrowser } from "@/components/OutcomesBrowser";
import { eyebrow } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Outcomes — Augle",
  description:
    "Browse illustrative Augle deliberation sessions — confidence grades, agent contributions, dissent, and Guardian integrity.",
};

export default function OutcomesBrowserPage() {
  return (
    <>
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Outcomes", href: "/outcomes" }, { label: "Session browser" }]}
      />
      <div className="border-b border-border bg-paper px-5 py-3.5 md:px-10 lg:px-[72px]">
        <div className={`${eyebrow} mb-1`}>Public deliberations</div>
        <h1 className="mb-1 font-serif text-2xl text-ink">Outcomes</h1>
        <p className="text-xs text-subtle">
          Ensemble deliberation sessions — confidence grades, agent contributions, dissent, Guardian integrity.
          Example sessions; live sessions publish here as they run.
        </p>
      </div>
      <OutcomesBrowser />
    </>
  );
}

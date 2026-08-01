import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { sectionTitle } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Methodology — Deliberation Index — Augle",
  description: "How the Augle Deliberation Index is computed.",
};

export default function MethodologyPage() {
  return (
    <>
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Index", href: "/index" }, { label: "Methodology" }]}
      />
      <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-24 lg:px-[72px]">
        <h1 className={sectionTitle}>Methodology</h1>
        <p className="mt-5 max-w-xl text-lg leading-[1.8] text-body">
          Full methodology documentation is coming soon.
        </p>
      </div>
    </>
  );
}

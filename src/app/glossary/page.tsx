import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { GlossaryContent } from "./GlossaryContent";

export const metadata: Metadata = {
  title: "AI Deliberation Glossary | Augle Terms Explained (Confidence Grades, Agents, More)",
  description:
    "Plain-language definitions for every Augle concept — confidence grades, the seven-agent ensemble, corpus tiers, and session architecture.",
};

export default function GlossaryPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Glossary" }]} />
      <GlossaryContent />
    </>
  );
}

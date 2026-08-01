import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { GlossaryContent } from "./GlossaryContent";

export const metadata: Metadata = {
  title: "Glossary — Augle",
  description:
    "Definitions for Augle's core concepts — augmented deliberation, confidence grades, agent roles, corpus tiers, and session architecture.",
};

export default function GlossaryPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Glossary" }]} />
      <GlossaryContent />
    </>
  );
}

import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { sectionTitle } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Release Notes — Augle",
  description: "Release notes and version history for the Augle desktop and mobile apps.",
};

export default function ReleaseNotesPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Release notes" }]} />
      <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-24 lg:px-[72px]">
        <h1 className={sectionTitle}>Release notes</h1>
        <p className="mt-5 max-w-xl text-lg leading-[1.8] text-body">
          Release notes are coming soon.
        </p>
      </div>
    </>
  );
}

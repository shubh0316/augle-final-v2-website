import type { Metadata } from "next";
import { InvestorGate } from "./InvestorGate";

export const metadata: Metadata = {
  title: "Investor Access — Augle",
  description:
    "Enter your email to receive a one-time passcode and access the Corpus Training Data.",
  robots: { index: false, follow: false },
};

export default function InvestorAccessPage() {
  return <InvestorGate />;
}

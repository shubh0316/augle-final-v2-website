"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

const NO_FOOTER_PATHS = ["/outcomes/browser", "/index/explorer", "/index/heatmap"];

export function FooterGate() {
  const pathname = usePathname();
  if (NO_FOOTER_PATHS.includes(pathname)) return null;
  return <Footer />;
}

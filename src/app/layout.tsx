import type { Metadata } from "next";
import { IBM_Plex_Sans, Libre_Baskerville, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const baskerville = Libre_Baskerville({
  variable: "--font-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Augle — Augmented deliberation",
  description:
    "Augle's multi-agent ensemble maps what's settled, what's contested, and what's unknown — producing evidence-anchored findings with calibrated confidence grades before the stakes are live.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plexSans.variable} ${baskerville.variable} ${plexMono.variable}`}>
      <body className="bg-cream font-sans text-ink">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

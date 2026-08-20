import type { Metadata } from "next";
import { IBM_Plex_Sans, Libre_Baskerville, IBM_Plex_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { FooterGate } from "@/components/FooterGate";

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
//TODO: there are only 34 metadata tags have to add other metadata tags.
const title = "Augle | AI Research Tool for Evidence-Based Decisions";
const description =
  "Augle runs your research question through a multi-agent AI ensemble that surfaces disagreement instead of hiding it — with a calibrated confidence grade.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.augle.com"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Augle",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://augle.com",
  name: "Augle",
  legalName: "Augle, Inc.",
  url: "https://augle.com",
  logo: {
    "@type": "ImageObject",
    url: "https://augle.com",
    caption: "Augle Logo",
  },
  description:
    "A multi-agent AI deliberation platform for evidence-based research and corpus-driven document synthesis.",
  alternateName: ["Augle Research", "Augle Deliberation Engine", "Augle AI Research Platform"],
  email: "cory@augle.com",
  knowsAbout: [
    "Multi-Agent AI",
    "Deliberative Reasoning",
    "Confidence Calibration",
    "Corpus-Driven Document Synthesis",
    "Adversarial Pre-Submission Review",
    "Academic Research Integration",
  ],
  publishingPrinciples: "https://augle.com",
  sameAs: ["https://linkedin.com", "https://twitter.com"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plexSans.variable} ${baskerville.variable} ${plexMono.variable}`}>
      <body className="flex min-h-screen flex-col bg-cream font-sans text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSONLD) }}
        />
        <Navbar />
        <div className="flex flex-1 flex-col">{children}</div>
        <FooterGate />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "var(--color-paper)",
              color: "var(--color-ink)",
              border: "1px solid var(--color-border)",
              fontFamily: "var(--font-sans)",
              fontSize: "14px",
            },
          }}
        />
      </body>
    </html>
  );
}

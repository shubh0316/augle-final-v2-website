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
  "Augle runs your research question through a multi-agents AI ensemble that surfaces disagreement instead of hiding it. Get a calibrated confidence grade backed by verified sources."; //changed metadata description "7-agents"

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plexSans.variable} ${baskerville.variable} ${plexMono.variable}`}>
      <body className="flex min-h-screen flex-col bg-cream font-sans text-ink">
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

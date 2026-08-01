import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { AGENTS } from "@/data/agents";
import { eyebrow, sectionTitle } from "@/lib/styles";
import { HeroDownloadCta } from "./HeroDownloadCta";
import { PlatformGrid } from "./PlatformGrid";

export const metadata: Metadata = {
  title: "Download — Augle",
  description:
    "Get Augle on desktop and mobile. Native apps for macOS, Windows, Linux, iOS, and Android — same account, same credits, same Findings, wherever you're working.",
};

function agentColor(id: string) {
  return AGENTS.find((a) => a.id === id)?.color ?? "#C15F3C";
}

const MOCK_ROWS = [
  { id: "cartographer", name: "Cartographer", pct: 78 },
  { id: "methodologist", name: "Methodologist", pct: 64 },
  { id: "contrarian", name: "Contrarian", pct: 38 },
  { id: "synthesizer", name: "Synthesizer", pct: 52 },
];

const CONTINUITY_ITEMS = [
  {
    label: "Credits",
    title: "Your balance carries over",
    text: "Buy credits once. Spend them from your desktop, your phone, or both — the balance is shared, not per-device.",
  },
  {
    label: "Sessions",
    title: "Pick up where you left off",
    text: "Start a Deep session on desktop, then check its Guardian status or read the Finding from your phone.",
  },
  {
    label: "Notifications",
    title: "Told the moment it's ready",
    text: "A push notification when a Finding completes — not a status you have to go check yourself.",
  },
];

export default function DownloadPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Download" }]} />

      {/* HERO */}
      <div className="overflow-hidden border-b border-border">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-5 pt-14 md:px-10 md:pt-20 lg:grid-cols-[1fr_480px] lg:gap-14 lg:px-[72px] lg:pt-[88px]">
          <div>
            <div className={eyebrow}>Download Augle</div>
            <h1 className="mb-6 font-serif text-[36px] font-normal leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-[60px]">
              Bring the ensemble with you.
            </h1>
            <p className="mb-8 max-w-xl text-lg leading-[1.8] text-body">
              The full multi-agent deliberation loop — Exploration through Synthesis,
              Guardian oversight included — runs natively on desktop and mobile. Same
              account, same credits, same Findings, wherever you&apos;re working.
            </p>
            <HeroDownloadCta />
          </div>

          {/* Device mockup */}
          <div className="relative h-[300px] pt-2 sm:h-[360px] lg:h-[420px]">
            <div className="relative w-full max-w-[440px] overflow-hidden rounded-[10px] border border-border-dark bg-ink shadow-[0_24px_60px_rgba(30,28,26,0.18)] lg:absolute lg:top-0 lg:left-0">
              <div className="flex h-[30px] items-center gap-1.5 border-b border-border-dark bg-ink-2 px-3">
                <div className="h-[7px] w-[7px] rounded-full bg-border-dark" />
                <div className="h-[7px] w-[7px] rounded-full bg-border-dark" />
                <div className="h-[7px] w-[7px] rounded-full bg-border-dark" />
              </div>
              <div className="flex flex-col gap-3.5 p-4.5">
                {MOCK_ROWS.map((row) => (
                  <div key={row.id} className="flex items-center gap-2">
                    <div
                      className="h-[9px] w-[9px] flex-shrink-0 rounded-full"
                      style={{ background: agentColor(row.id) }}
                    />
                    <div className="w-[78px] flex-shrink-0 font-mono text-[10px] text-offwhite/80">
                      {row.name}
                    </div>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-3">
                      <div className="h-full rounded-sm bg-rust" style={{ width: `${row.pct}%` }} />
                    </div>
                  </div>
                ))}
                <div className="mt-1 rounded-md border border-border-dark bg-ink-2 p-3.5">
                  <div className="mb-1.5 flex items-center justify-between font-mono text-[9px] tracking-[0.06em] text-faint uppercase">
                    <span>Finding</span>
                    <span className="rounded bg-rust/20 px-1.5 py-0.5 text-rust normal-case">Contested</span>
                  </div>
                  <div className="text-[11px] leading-[1.5] text-offwhite/80">
                    Evidence base does not support the long-term claim without
                    continued dosing.
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute right-2 -bottom-4 flex w-[120px] flex-col gap-2.5 rounded-[18px] border border-border-dark bg-ink px-3 py-4 shadow-[0_20px_44px_rgba(30,28,26,0.22)] sm:right-6 sm:w-[140px] lg:right-10 lg:-bottom-1.5 lg:w-[150px]">
              <div className="mx-auto h-1 w-8 rounded-full bg-border-dark" />
              <div className="font-mono text-[8px] tracking-[0.06em] text-faint uppercase">Signals</div>
              <div className="flex gap-1">
                {MOCK_ROWS.map((row) => (
                  <div
                    key={row.id}
                    className="h-[5px] w-[5px] rounded-full"
                    style={{ background: agentColor(row.id) }}
                  />
                ))}
              </div>
              <div className="mt-0.5 rounded border border-border-dark bg-ink-2 p-2">
                <span className="mb-1.5 inline-block rounded bg-rust/20 px-1.5 py-0.5 font-mono text-[8px] text-rust">
                  Contested
                </span>
                <div className="text-[9px] leading-[1.4] text-offwhite/80">
                  Guardian: 2 flags cleared. Synthesis complete.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP */}
      <div id="desktop" className="border-b border-border">
        <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-20 lg:px-[72px]">
          <div className={eyebrow}>Desktop</div>
          <h2 className={`${sectionTitle} mb-3`}>Built for deep work</h2>
          <p className="mb-12 max-w-2xl text-lg leading-[1.85] text-body">
            The full interface — Signals, Evidence, and the Ledger, side by side —
            with room to actually read a deliberation as it unfolds. Sessions keep
            running once loaded, even if your connection drops.
          </p>
          <PlatformGrid />
        </div>
      </div>

      {/* MOBILE */}
      <div id="mobile" className="border-b border-border-dark bg-ink">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-5 py-16 md:grid-cols-[1fr_320px] md:px-10 md:py-20 lg:gap-14 lg:px-[72px]">
          <div>
            <div className={eyebrow}>Mobile</div>
            <h2 className="mb-4 font-serif text-[30px] leading-[1.18] text-offwhite md:text-[38px]">
              Check a Finding from anywhere
            </h2>
            <p className="mb-8 max-w-lg text-[17px] leading-[1.8] text-faint">
              Review deliberations, get notified the moment a session resolves, and
              keep an eye on Guardian flags — without sitting at your desk. Full
              session detail opens on desktop when you&apos;re ready to dig in.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener"
                className="flex items-center gap-2.5 rounded-[7px] border border-border-dark bg-ink-2 px-4.5 py-2.5 text-offwhite hover:border-subtle"
              >
                <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#F7F6F2" strokeWidth={1.6}>
                  <rect x={6} y={2} width={12} height={20} rx={2.5} />
                  <line x1={10} y1={19} x2={14} y2={19} />
                </svg>
                <div className="leading-[1.3]">
                  <div className="font-mono text-[9px] tracking-[0.05em] text-faint uppercase">
                    Download on the
                  </div>
                  <div className="text-[15px] font-medium">App Store</div>
                </div>
              </a>
              <a
                href="https://play.google.com"
                target="_blank"
                rel="noopener"
                className="flex items-center gap-2.5 rounded-[7px] border border-border-dark bg-ink-2 px-4.5 py-2.5 text-offwhite hover:border-subtle"
              >
                <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#F7F6F2" strokeWidth={1.6}>
                  <path d="M6 3l14 9-14 9V3z" />
                </svg>
                <div className="leading-[1.3]">
                  <div className="font-mono text-[9px] tracking-[0.05em] text-faint uppercase">Get it on</div>
                  <div className="text-[15px] font-medium">Google Play</div>
                </div>
              </a>
            </div>
          </div>
          <div className="rounded-[10px] border border-border-dark bg-ink-2 p-5 text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASIAAAEiAQAAAAB1xeIbAAAB20lEQVR4nO2aQa6kIBRFz2tIeqiJC6il4M46vTNdSu1Ahj/B3B4A/vr5nXRPjFrCoCLWGdw84L0LaOLfbf7xHxA0qlEXoqKVNkYzG6Mn/5Tmj9L19pQHXALAADT3DhGBMAHE4RBd96HK9MbJRlYzeyTyghgP1XUjqktoAjRFfyZdb0p9iXHsISxDsrAMB+u6A5VjX4xmJ5gfCehS6RKP0XUHygOrlU4ckoWnTxCHxJxfu0N03YGy73ur9cX75Nb2VntR0cNc3Txz70RYVoNs8pu/34tCkkRYQFqgpvrieKCTNJ1V/bWpHPsc56DPsDuVfxfXYr8TlaObn6aXrlMZClrs96KQlGrEO+Wwl3nfSW3e70vFnzLrV5OW1UqZBaSnr3b/xOovTJUKGxa3FdySgggL0HLOftSWbhKaulRLb+0SWs7ZjSpORkoQpM3dAGxJv8V+L6rb7Ez0vLibMgCH6boD9XlvBeh3X/J97urZ9rV7Ui4n+fwiPOsoTEBZFWdWf3Wq3lutZiNOzP1qZv3huu5EOTE/PsqRclCCuZ2l7UZ9ubeqVRdYvYj9cbruQ2WPmZ8WIK+AWnXPrv7K1FqO7qmf5mTv80sfVobizOqvS/3l3up7a/dWjXoz6g8s2QTnJ7nOwwAAAABJRU5ErkJggg=="
              alt="QR code to download Augle"
              className="mx-auto mb-3 h-auto w-full max-w-[160px] rounded bg-offwhite p-2"
            />
            <div className="font-mono text-[11px] text-faint">Scan with your phone</div>
          </div>
        </div>
      </div>

      {/* CONTINUITY */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-[1280px] px-5 py-14 md:px-10 lg:px-[72px]">
          <div className={eyebrow}>One account, every device</div>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
            {CONTINUITY_ITEMS.map((item) => (
              <div key={item.label} className="bg-paper p-7">
                <div className="mb-2.5 font-mono text-[10px] tracking-[0.08em] text-rust uppercase">
                  {item.label}
                </div>
                <div className="mb-2 text-base font-medium text-ink">{item.title}</div>
                <p className="text-sm leading-[1.65] text-body">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SYSTEM NOTE */}
      <div className="px-5 py-8 md:px-10 lg:px-[72px]">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 text-[13px] text-muted">
          <div>
            Augle&apos;s desktop and mobile apps are free to install. Sessions run on
            your credit balance — see{" "}
            <Link href="/pricing" className="border-b border-subtle text-ink hover:border-ink">
              Pricing
            </Link>{" "}
            for details.
          </div>
          <div>
            <Link href="/release-notes" className="border-b border-subtle text-ink hover:border-ink">
              Release notes and version history →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

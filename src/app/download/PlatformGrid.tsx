"use client";

import { usePlatform } from "@/lib/detectPlatform";

type CardPlatform = "mac" | "windows" | "linux";

const CARDS: {
  id: CardPlatform;
  name: string;
  specs: string[];
  downloadHref: string;
  downloadLabel: string;
  altPrefix: string;
  altLinkText?: string;
  altHref?: string;
}[] = [
  {
    id: "mac",
    name: "macOS",
    specs: ["Version 1.2.0", "macOS 12 Monterey or later", "Apple Silicon & Intel · 84 MB"],
    downloadHref: "/downloads/Augle-1.2.0-mac.dmg",
    downloadLabel: "Download for macOS",
    altPrefix: "Also on the ",
    altLinkText: "Mac App Store",
    altHref: "https://apps.apple.com",
  },
  {
    id: "windows",
    name: "Windows",
    specs: ["Version 1.2.0", "Windows 10 or later", "64-bit · 91 MB"],
    downloadHref: "/downloads/Augle-1.2.0-win.exe",
    downloadLabel: "Download for Windows",
    altPrefix: "Also on the ",
    altLinkText: "Microsoft Store",
    altHref: "https://apps.microsoft.com",
  },
  {
    id: "linux",
    name: "Linux",
    specs: ["Version 1.2.0", "Ubuntu 20.04+ and most distributions", "AppImage · 96 MB"],
    downloadHref: "/downloads/Augle-1.2.0.AppImage",
    downloadLabel: "Download for Linux",
    altPrefix: ".deb and .rpm also available",
  },
];

export function PlatformGrid() {
  const platform = usePlatform();

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      {CARDS.map((card) => {
        const detected = platform === card.id;
        return (
          <div
            key={card.id}
            className={`flex flex-col rounded-lg border p-7 ${
              detected ? "border-rust bg-rust/5" : "border-border bg-paper"
            }`}
          >
            {detected && (
              <div className="mb-3 font-mono text-[10px] tracking-[0.06em] text-rust uppercase">
                Recommended for your device
              </div>
            )}
            <div className="mb-2.5 font-serif text-2xl text-ink">{card.name}</div>
            <div className="mb-5 flex-1 font-mono text-[11px] leading-[1.7] text-muted">
              {card.specs.map((spec) => (
                <div key={spec}>{spec}</div>
              ))}
            </div>
            <a
              href={card.downloadHref}
              className={`mb-2.5 block rounded-md border py-2.5 text-center text-sm font-medium ${
                detected
                  ? "border-rust bg-rust text-offwhite"
                  : "border-border bg-offwhite text-ink hover:border-ink"
              }`}
            >
              {card.downloadLabel}
            </a>
            <div className="text-center text-xs text-muted">
              {card.altHref ? (
                <>
                  {card.altPrefix}
                  <a
                    href={card.altHref}
                    target="_blank"
                    rel="noopener"
                    className="border-b border-border text-muted hover:border-ink hover:text-ink"
                  >
                    {card.altLinkText}
                  </a>
                </>
              ) : (
                card.altPrefix
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

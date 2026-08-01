"use client";

import { PLATFORM_LABELS, PLATFORM_LINKS, usePlatform } from "@/lib/detectPlatform";

export function HeroDownloadCta() {
  const detected = usePlatform();
  const platform = detected ?? "mac";
  const isMobile = platform === "ios" || platform === "android";

  return (
    <div className="flex flex-col items-start gap-3.5">
      <a
        href={PLATFORM_LINKS[platform]}
        className="inline-flex items-center gap-2.5 rounded-md bg-rust px-6.5 py-3.5 text-[15px] font-medium text-offwhite transition-opacity hover:opacity-90"
      >
        <svg
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3v13M7 11l5 5 5-5" />
          <path d="M5 19h14" />
        </svg>
        {PLATFORM_LABELS[platform]}
      </a>
      <div className="text-[13px] text-muted">
        {isMobile ? (
          <>
            Also available for{" "}
            <a href="#desktop" className="border-b border-subtle text-ink hover:border-ink">
              Mac, Windows, and Linux
            </a>
            .
          </>
        ) : (
          <>
            Also available for{" "}
            <a href="#desktop" className="border-b border-subtle text-ink hover:border-ink">
              Windows and Linux
            </a>
            , and{" "}
            <a href="#mobile" className="border-b border-subtle text-ink hover:border-ink">
              iOS and Android
            </a>
            .
          </>
        )}
      </div>
    </div>
  );
}

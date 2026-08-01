"use client";

import { useState } from "react";
import type { Phase } from "@/data/outcomes";
import { AgentAvatar, renderRich } from "@/lib/richText";

/** Tabbed phase-transcript viewer — the only genuinely interactive piece of the session-detail page. */
export function PhaseTabs({ phases }: { phases: Phase[] }) {
  const [active, setActive] = useState(0);
  const phase = phases[active];

  return (
    <>
      <div className="flex overflow-x-auto border-b border-border">
        {phases.map((p, i) => (
          <button
            key={p.label}
            type="button"
            onClick={() => setActive(i)}
            className={`flex-1 border-r border-border px-3 py-2.5 font-mono text-xs tracking-[0.04em] whitespace-nowrap last:border-r-0 ${
              active === i ? "bg-paper-alt text-rust" : "text-muted hover:bg-paper-alt"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
      <div className="flex flex-col p-5">
        {phase.agents.map((block, i) => (
          <div
            key={`${phase.label}-${block.agent}-${i}`}
            className={`py-3.5 first:pt-0 ${i < phase.agents.length - 1 ? "border-b border-border" : "pb-0"}`}
          >
            <div className="mb-2 flex items-center gap-2.5">
              <AgentAvatar name={block.agent} />
              <div className="min-w-0">
                <div className="text-[13px] font-medium text-ink">{block.agent}</div>
                <div className="font-mono text-[10px] text-subtle">{block.model}</div>
              </div>
              <span className="ml-auto font-mono text-[11px] text-rust">{block.confidence}%</span>
            </div>
            <div className="flex flex-col gap-2.5 text-[13px] leading-[1.7] text-body">
              {block.paragraphs.map((p2, j) => (
                <p key={j}>{renderRich(p2)}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/** "Copy citation" button with a brief confirmation state — mirrors the source's clipboard-copy widget. */
export function CopyCiteButton({ citation }: { citation: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(citation);
        setCopied(true);
        setTimeout(() => setCopied(false), 1900);
      }}
      className="w-full rounded-md border border-border bg-paper-alt py-2 text-xs text-body transition-colors hover:border-rust hover:bg-rust hover:text-offwhite"
    >
      {copied ? "✓ Copied" : "⧉ Copy citation"}
    </button>
  );
}

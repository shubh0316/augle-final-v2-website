import { Fragment } from "react";
import { AGENTS } from "@/data/agents";
import { AgentIcon } from "@/components/AgentIcon";

/**
 * Renders "**bold**" markdown-lite markers as <strong>. Used to port the
 * source mockups' inline <strong> labels (e.g. "**Settled ground:**") inside
 * the outcome session-detail phase transcripts without dangerouslySetInnerHTML.
 */
export function renderRich(text: string) {
  return text.split("**").map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-medium text-ink">
        {part}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}

/** Colored icon badge for a deliberation agent, looked up by name from src/data/agents.ts. */
export function AgentAvatar({ name, size = 26 }: { name: string; size?: number }) {
  const agent = AGENTS.find((a) => a.name === name);
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-[5px]"
      style={{ background: agent?.color ?? "#7A7670", width: size, height: size }}
    >
      <AgentIcon id={agent?.id ?? ""} className={size >= 24 ? "h-3.75 w-3.75" : "h-2.75 w-2.75"} />
    </span>
  );
}

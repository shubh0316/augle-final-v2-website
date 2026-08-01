import Link from "next/link";
import { AgentIcon } from "./AgentIcon";
import type { Agent } from "@/data/agents";

export function AgentCard({ agent }: { agent: Agent }) {
  return (
    <Link
      href={`/how-it-works/agents#${agent.id}`}
      className="group relative flex min-h-[84px] flex-col justify-center rounded-md border border-border-dark bg-ink-2 px-3 py-4 text-center transition-colors hover:border-rust hover:bg-ink-3"
    >
      <div className="mb-1 text-xs font-medium text-offwhite transition-colors group-hover:text-rust">
        {agent.name}
      </div>
      <div className="text-[10px] leading-tight text-faint">{agent.role}</div>

      <div className="pointer-events-none absolute bottom-full left-1/2 z-50 w-[220px] -translate-x-1/2 translate-y-1 rounded-[10px] bg-paper p-3.5 text-left opacity-0 shadow-[0_10px_28px_rgba(0,0,0,0.35)] transition-all duration-150 group-hover:translate-y-0 group-hover:opacity-100">
        <div className="mb-2 flex items-center gap-2.5">
          <span
            className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full"
            style={{ background: agent.color }}
          >
            <AgentIcon id={agent.id} className="h-[15px] w-[15px]" />
          </span>
          <span className="text-[13px] font-semibold text-ink">{agent.name}</span>
        </div>
        <div className="text-xs leading-snug text-body">{agent.description}</div>
        <div className="absolute top-full left-1/2 h-0 w-0 -translate-x-1/2 border-8 border-transparent border-t-paper" />
      </div>
    </Link>
  );
}

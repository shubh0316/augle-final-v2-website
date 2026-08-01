"use client";

import { useState } from "react";

export interface Paper {
  num: string;
  title: string;
  authors: string;
  abstract: string;
  tags: string[];
  patentTag: string;
  date: string;
  patentId: string;
}

export function PaperCard({ paper }: { paper: Paper }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 items-start gap-6 bg-paper p-7 transition-colors hover:bg-paper-alt sm:grid-cols-[1fr_auto] md:p-9">
      <div>
        <div className="mb-2.5 font-mono text-[10px] tracking-[0.08em] text-rust uppercase">
          {paper.num}
        </div>
        <h3 className="mb-2.5 font-serif text-xl leading-[1.3] text-ink md:text-[22px]">
          {paper.title}
        </h3>
        <p className="mb-2 text-[13px] text-muted">{paper.authors}</p>

        <div
          className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
          style={{ maxHeight: open ? "400px" : "0px" }}
        >
          <p className="pt-0.5 pb-4 text-[13px] leading-[1.7] text-body">{paper.abstract}</p>
        </div>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {paper.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-[3px] border border-border bg-paper-alt px-2.5 py-1 font-mono text-[10px] text-muted"
            >
              {tag}
            </span>
          ))}
          <span className="rounded-[3px] border border-rust bg-paper px-2.5 py-1 font-mono text-[10px] text-rust">
            {paper.patentTag}
          </span>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <a
            href="https://zenodo.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded bg-rust px-3.5 py-1.5 font-mono text-[11px] text-offwhite transition-opacity hover:opacity-90"
          >
            ↗ Zenodo
          </a>
          <a
            href="https://ssrn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded border border-border bg-paper-alt px-3.5 py-1.5 font-mono text-[11px] text-body transition-colors hover:border-rust hover:text-rust"
          >
            ↗ SSRN
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded border border-border bg-paper-alt px-3.5 py-1.5 font-mono text-[11px] text-body transition-colors hover:border-rust hover:text-rust"
          >
            {open ? "Hide abstract" : "Read abstract"}{" "}
            <span
              className={`inline-block text-[10px] transition-transform ${open ? "rotate-180" : ""}`}
            >
              ▾
            </span>
          </button>
        </div>
      </div>

      <div className="flex flex-row items-center gap-3 sm:flex-col sm:items-end sm:gap-2.5 sm:pt-7">
        <span className="font-mono text-[11px] whitespace-nowrap text-subtle">{paper.date}</span>
        <span className="font-mono text-[10px] tracking-[0.04em] text-faint">
          {paper.patentId}
        </span>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";

type Question = { q: string; s: number; c: number; u: number };
type CellType = "settled" | "contested" | "unknown";

const QUESTIONS: Question[] = [
  {
    q: '"Does smartphone ESM provide sufficient ecological validity for attentional state claims in naturalistic environments?"',
    s: 32,
    c: 21,
    u: 28,
  },
  {
    q: '"Are the TAM assumptions in this Series A deck addressable market or theoretical maximum?"',
    s: 22,
    c: 38,
    u: 21,
  },
  {
    q: '"Does the proposed healthcare bill cost-benefit methodology account for 30-year climate-adjusted risk?"',
    s: 41,
    c: 18,
    u: 22,
  },
  {
    q: '"Is the innovation claim in this NIH R01 differentiated from the 2024 Friederici lab publication?"',
    s: 25,
    c: 29,
    u: 27,
  },
];

function buildCells(question: Question): CellType[] {
  const cells: CellType[] = [];
  for (let i = 0; i < question.s; i++) cells.push("settled");
  for (let i = 0; i < question.c; i++) cells.push("contested");
  const unknownCount = Math.min(question.u, 81 - question.s - question.c);
  for (let i = 0; i < unknownCount; i++) cells.push("unknown");
  while (cells.length < 81) cells.push("unknown");
  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }
  return cells;
}

const CELL_CLASS: Record<CellType, string> = {
  settled: "bg-ink/75",
  contested: "bg-rust",
  unknown: "bg-cell",
};

export function WaffleWidget() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const cells = useMemo(() => buildCells(QUESTIONS[index]), [index]);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % QUESTIONS.length);
        setVisible(true);
      }, 300);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const question = QUESTIONS[index];

  return (
    <div className="rounded-lg border border-border bg-paper p-6">
      <div className="mb-4 font-mono text-[10px] tracking-[0.08em] text-subtle uppercase">
        Evidence landscape
      </div>
      <div className="mb-3.5 grid grid-cols-9 gap-1">
        {cells.map((type, i) => (
          <div key={i} className={`aspect-square rounded-[3px] ${CELL_CLASS[type]}`} />
        ))}
      </div>
      <div className="mb-4 flex flex-col gap-2">
        <div className="flex items-center gap-2.5">
          <div className="h-2.5 w-2.5 flex-shrink-0 rounded-[2px] bg-ink/75" />
          <span className="flex-1 text-[13px] text-muted">Settled</span>
          <span className="font-mono text-xs text-subtle">{question.s} nodes</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="h-2.5 w-2.5 flex-shrink-0 rounded-[2px] bg-rust" />
          <span className="flex-1 text-[13px] text-muted">Contested</span>
          <span className="font-mono text-xs text-subtle">{question.c} nodes</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="h-2.5 w-2.5 flex-shrink-0 rounded-[2px] border border-border bg-cell" />
          <span className="flex-1 text-[13px] text-muted">Unknown</span>
          <span className="font-mono text-xs text-subtle">{question.u} nodes</span>
        </div>
      </div>
      <div className="border-t border-border pt-4">
        <div className="mb-2 font-mono text-[10px] tracking-[0.06em] text-subtle uppercase">
          Active question
        </div>
        <div
          className={`min-h-[54px] text-xs leading-relaxed text-body italic transition-opacity duration-300 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          {question.q}
        </div>
      </div>
    </div>
  );
}

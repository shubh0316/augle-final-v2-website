"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/solutions", label: "Solutions" },
  { href: "/outcomes", label: "Outcomes" },
  { href: "/deliberation-index", label: "Index" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "Company" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-paper px-5 md:px-10 lg:px-[72px]">
      <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
        <Logo variant="dark" className="h-7 w-auto" />
      </Link>

      <div className="hidden items-center gap-9 lg:flex">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-muted transition-colors hover:text-ink"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/waitlist"
          className="rounded bg-rust px-5 py-2.5 text-sm font-medium text-offwhite transition-opacity hover:opacity-90"
        >
          Join waitlist
        </Link>
      </div>

      <button
        type="button"
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-paper lg:hidden"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1E1C1A" strokeWidth={2}>
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col gap-1 overflow-y-auto bg-paper p-6 lg:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-border py-3.5 text-lg text-ink"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/waitlist"
            onClick={() => setOpen(false)}
            className="mt-4 rounded bg-rust py-3.5 text-center text-sm font-medium text-offwhite"
          >
            Join waitlist
          </Link>
        </div>
      )}
    </nav>
  );
}

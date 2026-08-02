"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Something went wrong. Try again.");

      toast.success("Message sent — we'll get back to you within 1–2 business days.");
      form.reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="contact-name"
          className="mb-1.5 block font-mono text-[10px] tracking-[0.08em] text-muted uppercase"
        >
          Your name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          placeholder="Full name"
          disabled={submitting}
          className="w-full rounded-[5px] border border-border bg-paper-alt px-3.5 py-3 text-[15px] text-ink outline-none transition-colors focus:border-rust disabled:opacity-60"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="contact-email"
          className="mb-1.5 block font-mono text-[10px] tracking-[0.08em] text-muted uppercase"
        >
          Email address
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          placeholder="you@organisation.com"
          disabled={submitting}
          className="w-full rounded-[5px] border border-border bg-paper-alt px-3.5 py-3 text-[15px] text-ink outline-none transition-colors focus:border-rust disabled:opacity-60"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="contact-org"
          className="mb-1.5 block font-mono text-[10px] tracking-[0.08em] text-muted uppercase"
        >
          Organisation
        </label>
        <input
          id="contact-org"
          name="organisation"
          type="text"
          placeholder="Optional"
          disabled={submitting}
          className="w-full rounded-[5px] border border-border bg-paper-alt px-3.5 py-3 text-[15px] text-ink outline-none transition-colors focus:border-rust disabled:opacity-60"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="contact-subject"
          className="mb-1.5 block font-mono text-[10px] tracking-[0.08em] text-muted uppercase"
        >
          Subject
        </label>
        <select
          id="contact-subject"
          name="subject"
          defaultValue=""
          disabled={submitting}
          className="w-full appearance-none rounded-[5px] border border-border bg-paper-alt bg-[right_14px_center] bg-no-repeat px-3.5 py-3 text-[15px] text-ink outline-none transition-colors focus:border-rust disabled:opacity-60"
        >
          <option value="">Select a topic</option>
          <option>Product question</option>
          <option>Waitlist inquiry</option>
          <option>Enterprise / team plan</option>
          <option>Research collaboration</option>
          <option>Press / media</option>
          <option>Other</option>
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="contact-message"
          className="mb-1.5 block font-mono text-[10px] tracking-[0.08em] text-muted uppercase"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          placeholder="What's on your mind?"
          disabled={submitting}
          className="h-[120px] w-full resize-y rounded-[5px] border border-border bg-paper-alt px-3.5 py-3 text-[15px] leading-[1.6] text-ink outline-none transition-colors focus:border-rust disabled:opacity-60"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="mt-1 flex w-full items-center justify-center gap-2 rounded bg-rust px-7 py-3.5 text-center text-[15px] font-medium text-offwhite transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? (
          <>
            <span className="h-3.5 w-3.5 flex-shrink-0 animate-spin rounded-full border-2 border-offwhite/30 border-t-offwhite" />
            Sending…
          </>
        ) : (
          "Send message"
        )}
      </button>
      <p className="mt-3 text-center text-[13px] leading-[1.6] text-subtle">
        By submitting this form you agree to our{" "}
        <Link href="/privacy" className="text-rust">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}

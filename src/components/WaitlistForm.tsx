"use client";

import { useState } from "react";
import { toast } from "sonner";
import { btnPrimary } from "@/lib/styles";

export function WaitlistForm() {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = data.get("email") as string;
    const role = data.get("role") as string;

    setSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Something went wrong. Try again.");

      toast.success("You're on the list — check your email for updates.");
      form.reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <label htmlFor="waitlist-email" className="mb-1.5 block text-xs text-muted">
        Email
      </label>
      <input
        id="waitlist-email"
        name="email"
        type="email"
        required
        placeholder="your@email.com"
        disabled={submitting}
        className="mb-3.5 w-full rounded border border-border bg-offwhite px-4 py-3 text-[15px] text-ink placeholder:text-subtle disabled:opacity-60"
      />
      <label htmlFor="waitlist-role" className="mb-1.5 block text-xs text-muted">
        What best describes you?
      </label>
      <select
        id="waitlist-role"
        name="role"
        required
        defaultValue=""
        disabled={submitting}
        className="mb-5 w-full rounded border border-border bg-offwhite px-4 py-3 text-[15px] text-ink disabled:opacity-60"
      >
        <option value="" disabled>
          Select one
        </option>
        <option value="academic">Academic / researcher</option>
        <option value="enterprise">Enterprise / team</option>
        <option value="law-firm">Law firm</option>
        <option value="vc">Venture capital / PE</option>
        <option value="government">Government / policy</option>
        <option value="other">Other</option>
      </select>
      <button
        type="submit"
        disabled={submitting}
        className={`${btnPrimary} flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60`}
      >
        {submitting ? (
          <>
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-offwhite/30 border-t-offwhite" />
            Joining…
          </>
        ) : (
          "Join waitlist →"
        )}
      </button>
    </form>
  );
}

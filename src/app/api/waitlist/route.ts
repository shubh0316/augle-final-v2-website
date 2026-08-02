import { NextResponse } from "next/server";
import { saveSubmission } from "@/lib/submissions";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ROLES = ["academic", "enterprise", "law-firm", "vc", "government", "other"];

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const role = typeof body.role === "string" ? body.role : "";

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (!ROLES.includes(role)) {
    return NextResponse.json({ error: "Select what best describes you." }, { status: 400 });
  }

  try {
    await saveSubmission("waitlist", { email, role });
  } catch (err) {
    console.error("[api/waitlist] failed to save submission", err);
    return NextResponse.json(
      { error: "Something went wrong saving your submission. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}

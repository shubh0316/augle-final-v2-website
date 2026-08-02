import { NextResponse } from "next/server";
import { saveSubmission } from "@/lib/submissions";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const organisation = typeof body.organisation === "string" ? body.organisation.trim() : "";
  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name) {
    return NextResponse.json({ error: "Enter your name." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (!message) {
    return NextResponse.json({ error: "Enter a message." }, { status: 400 });
  }

  try {
    await saveSubmission("contact", { name, email, organisation, subject, message });
  } catch (err) {
    console.error("[api/contact] failed to save submission", err);
    return NextResponse.json(
      { error: "Something went wrong saving your submission. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}

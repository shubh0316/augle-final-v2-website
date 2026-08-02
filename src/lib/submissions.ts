import { getDb } from "@/lib/mongodb";

const COLLECTION = process.env.MONGODB_COLLECTION || "website-data";
const MAX_ATTEMPTS = 3;

// Retries transient connection blips (e.g. a one-off TLS handshake failure) before
// giving up — each failure is logged with the attempt number so a persistent
// outage is still visible in server logs, not just silently retried forever.
export async function saveSubmission(type: "waitlist" | "contact", record: Record<string, unknown>) {
  let lastError: unknown;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const db = await getDb();
      await db.collection(COLLECTION).insertOne({ type, ...record, submittedAt: new Date() });
      return;
    } catch (err) {
      lastError = err;
      console.error(`[submissions] ${type} insert failed (attempt ${attempt}/${MAX_ATTEMPTS})`, err);
      if (attempt < MAX_ATTEMPTS) await new Promise((r) => setTimeout(r, attempt * 300));
    }
  }
  throw lastError;
}

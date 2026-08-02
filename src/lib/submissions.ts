import { getDb } from "@/lib/mongodb";

const COLLECTION = process.env.MONGODB_COLLECTION || "website-data";

export async function saveSubmission(type: "waitlist" | "contact", record: Record<string, unknown>) {
  const db = await getDb();
  await db.collection(COLLECTION).insertOne({ type, ...record, submittedAt: new Date() });
}

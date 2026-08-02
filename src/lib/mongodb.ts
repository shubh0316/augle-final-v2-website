import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "augle";

if (!uri) throw new Error("Missing MONGODB_URI environment variable");

// Cached on `global` so Next.js's dev-mode hot reload reuses one connection
// instead of opening a new one on every module reload.
const globalForMongo = global as unknown as { mongoClientPromise?: Promise<MongoClient> };

const clientPromise =
  globalForMongo.mongoClientPromise ?? (globalForMongo.mongoClientPromise = new MongoClient(uri).connect());

export async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db(dbName);
}

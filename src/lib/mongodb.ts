import { MongoClient, type Db } from "mongodb";

const dbName = process.env.MONGODB_DB || "augle";

if (!process.env.MONGODB_URI) throw new Error("Missing MONGODB_URI environment variable");
const uri: string = process.env.MONGODB_URI;

// Cached on `global` so Next.js's dev-mode hot reload reuses one connection
// instead of opening a new one on every module reload.
const globalForMongo = global as unknown as { mongoClientPromise?: Promise<MongoClient> };

function getClientPromise(): Promise<MongoClient> {
  if (!globalForMongo.mongoClientPromise) {
    const promise = new MongoClient(uri).connect();
    globalForMongo.mongoClientPromise = promise;
    // A failed connection attempt (e.g. a transient TLS/network blip) shouldn't
    // permanently poison the cache — clear it so the next request retries fresh
    // instead of replaying the same rejected promise forever.
    promise.catch(() => {
      if (globalForMongo.mongoClientPromise === promise) globalForMongo.mongoClientPromise = undefined;
    });
  }
  return globalForMongo.mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(dbName);
}

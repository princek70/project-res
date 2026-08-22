import pg from "pg";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  console.warn("[db] DATABASE_URL not set — PostgreSQL storage unavailable, falling back to in-memory storage.");
}

export const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    })
  : null;

export async function query(text: string, params?: unknown[]) {
  if (!pool) throw new Error("PostgreSQL pool is not initialized (DATABASE_URL missing).");
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
}

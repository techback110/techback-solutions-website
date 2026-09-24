import postgres from "postgres";
import { normalizeDatabaseUrl } from "./db-url";

const url = normalizeDatabaseUrl(process.env.DATABASE_URL);

/** True when a real connection string (not the Supabase placeholder) is configured. */
export const hasDatabase = Boolean(url && !url.includes("[YOUR-PASSWORD]"));

const MAX_CONNECTIONS = 5;

const globalForDb = globalThis as unknown as { __sql?: postgres.Sql };

function createClient() {
  const local = /localhost|127\.0\.0\.1/.test(url!);
  return postgres(url!, {
    // Supabase's poolers don't support prepared statements.
    prepare: false,
    ssl: local ? false : "require",
    max: MAX_CONNECTIONS,
    idle_timeout: 20,
    connect_timeout: 10,
  });
}

export const sql: postgres.Sql | null = hasDatabase
  ? (globalForDb.__sql ??= createClient())
  : null;

/*
 * When every connection is busy, postgres.js pipelines extra queries onto an
 * open connection. Supabase's transaction pooler (port 6543) never answers
 * pipelined queries, so the request hangs. Capping in-flight queries at the
 * connection count keeps each connection to one query at a time.
 */
let active = 0;
const waiting: (() => void)[] = [];

export async function query<T>(run: (db: postgres.Sql) => Promise<T>): Promise<T> {
  if (!sql) throw new Error("DATABASE_URL is not configured");
  const db = sql;
  if (active < MAX_CONNECTIONS) active++;
  else await new Promise<void>((resolve) => waiting.push(resolve)); // slot handed over on release
  try {
    return await run(db);
  } finally {
    const next = waiting.shift();
    if (next) next();
    else active--;
  }
}

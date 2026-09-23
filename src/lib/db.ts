import postgres from "postgres";

const url = process.env.DATABASE_URL?.trim();

/** True when a real connection string (not the Supabase placeholder) is configured. */
export const hasDatabase = Boolean(url && !url.includes("[YOUR-PASSWORD]"));

const globalForDb = globalThis as unknown as { __sql?: postgres.Sql };

function createClient() {
  const local = /localhost|127\.0\.0\.1/.test(url!);
  return postgres(url!, {
    // Supabase's transaction pooler (port 6543) does not support prepared statements.
    prepare: false,
    ssl: local ? false : "require",
    max: 5,
    idle_timeout: 20,
    connect_timeout: 10,
  });
}

export const sql: postgres.Sql | null = hasDatabase
  ? (globalForDb.__sql ??= createClient())
  : null;

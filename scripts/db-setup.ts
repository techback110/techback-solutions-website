/**
 * Creates the tables and seeds starter content (only into empty tables).
 *   npm run db:setup
 * Reads DATABASE_URL from .env.local.
 */
import { readFileSync } from "node:fs";
import postgres from "postgres";
import { seedProjects, seedReviews, seedServices } from "../src/lib/seed.ts";

const url = process.env.DATABASE_URL;
if (!url || url.includes("[YOUR-PASSWORD]")) {
  console.error("✖ Set a real DATABASE_URL in .env.local first (replace [YOUR-PASSWORD]).");
  process.exit(1);
}

const sql = postgres(url, { prepare: false, ssl: /localhost|127\.0\.0\.1/.test(url) ? false : "require", max: 1 });

async function seed(table: string, rows: Record<string, unknown>[]) {
  const [{ count }] = await sql`select count(*)::int as count from ${sql(table)}`;
  if (count > 0) {
    console.log(`• ${table}: ${count} rows present, skipping seed`);
    return;
  }
  for (const row of rows) {
    const data: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(row)) {
      if (Array.isArray(v) && v.some((x) => typeof x === "object")) data[k] = sql.json(v as postgres.JSONValue);
      else if (Array.isArray(v)) data[k] = sql.array(v as string[]);
      else data[k] = v;
    }
    await sql`insert into ${sql(table)} ${sql(data)}`;
  }
  console.log(`✓ ${table}: seeded ${rows.length} rows`);
}

try {
  const schema = readFileSync(new URL("../supabase/schema.sql", import.meta.url), "utf8");
  await sql.unsafe(schema);
  console.log("✓ schema applied");
  await seed("services", seedServices);
  await seed("projects", seedProjects);
  await seed("reviews", seedReviews);
  console.log("Done.");
} catch (err) {
  console.error("✖ Setup failed:", err instanceof Error ? err.message : err);
  process.exitCode = 1;
} finally {
  await sql.end();
}

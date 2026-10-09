/**
 * Creates the tables and seeds starter content (only into empty tables).
 *   npm run db:setup
 * Reads DATABASE_URL from .env.local.
 */
import { readFileSync } from "node:fs";
import postgres from "postgres";
import { normalizeDatabaseUrl } from "../src/lib/db-url.ts";
import { pgTextArray } from "../src/lib/pg-array.ts";
import { hashPassword } from "../src/lib/password.ts";
import { seedProjects, seedReviews, seedServices, seedSettings, seedTeam } from "../src/lib/seed.ts";

const raw = process.env.DATABASE_URL;
const url = normalizeDatabaseUrl(raw);
// Test the raw value: normalize() percent-encodes the password, so the
// placeholder arrives here as %5BYOUR-PASSWORD%5D and slips past a check on `url`.
if (!url || raw?.includes("[YOUR-PASSWORD]")) {
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
      else if (Array.isArray(v)) data[k] = pgTextArray(v as string[]);
      else data[k] = v;
    }
    await sql`insert into ${sql(table)} ${sql(data)}`;
  }
  console.log(`✓ ${table}: seeded ${rows.length} rows`);
}

/** Creates the first admin account from ADMIN_EMAIL / ADMIN_PASSWORD if there are none yet. */
async function seedAdmin() {
  const [{ count }] = await sql`select count(*)::int as count from admin_users`;
  if (count > 0) {
    console.log(`• admin_users: ${count} account(s) present, skipping`);
    return;
  }
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    console.log("• admin_users: set ADMIN_EMAIL and ADMIN_PASSWORD in .env.local to create the first account");
    return;
  }
  await sql`insert into admin_users (email, name, password_hash) values (${email}, '', ${await hashPassword(password)})`;
  console.log(`✓ admin_users: created ${email}`);
}

try {
  const schema = readFileSync(new URL("../supabase/schema.sql", import.meta.url), "utf8");
  await sql.unsafe(schema);
  console.log("✓ schema applied");
  await seed("services", seedServices);
  await seed("projects", seedProjects);
  await seed("reviews", seedReviews);
  await seed("team_members", seedTeam);
  await sql`
    insert into settings (key, value) values ('site', ${sql.json(seedSettings as unknown as postgres.JSONValue)})
    on conflict (key) do nothing
  `;
  console.log("✓ settings: ready");
  await seedAdmin();
  console.log("Done.");
} catch (err) {
  console.error("✖ Setup failed:", err instanceof Error ? err.message : err);
  process.exitCode = 1;
} finally {
  await sql.end();
}

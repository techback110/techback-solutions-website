import type postgres from "postgres";
import { sql } from "./db";
import { seedProjects, seedReviews, seedServices } from "./seed";
import type { Inquiry, Project, Review, Service } from "./types";

type Tables = {
  services: Service;
  projects: Project;
  reviews: Review;
  inquiries: Inquiry;
};
type Table = keyof Tables;
type Input<K extends Table> = Omit<Tables[K], "id" | "created_at">;

/* ------------------------------------------------------------------ */
/* In-memory fallback so the site runs locally before a DB is wired.  */
/* ------------------------------------------------------------------ */

type Memory = { [K in Table]: Tables[K][] };
const g = globalThis as unknown as { __mem?: Memory; __dbError?: string };

function stamp<T>(rows: T[]) {
  return rows.map((row, i) => ({
    ...row,
    id: crypto.randomUUID(),
    created_at: new Date(Date.now() - i * 86_400_000).toISOString(),
  }));
}

function memory(): Memory {
  g.__mem ??= {
    services: stamp(seedServices),
    projects: stamp(seedProjects),
    reviews: stamp(seedReviews),
    inquiries: [],
  };
  return g.__mem;
}

export function dataSource() {
  return { mode: sql ? "postgres" : "memory", error: g.__dbError } as const;
}

/* ------------------------------------------------------------------ */
/* Generic table helpers                                              */
/* ------------------------------------------------------------------ */

/** Arrays of objects (e.g. project metrics) are stored as jsonb. */
function serialize(data: Record<string, unknown>) {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value) && value.some((v) => typeof v === "object" && v !== null)) {
      out[key] = sql!.json(value as postgres.JSONValue);
    } else if (Array.isArray(value)) {
      out[key] = sql!.array(value as string[]);
    } else {
      out[key] = value;
    }
  }
  return out;
}

async function all<K extends Table>(table: K): Promise<Tables[K][]> {
  if (!sql) return ([...memory()[table]] as Tables[K][]);
  try {
    const rows = await sql`select * from ${sql(table as string)}`;
    g.__dbError = undefined;
    return rows.map((r) => ({
      ...r,
      created_at: new Date(r.created_at).toISOString(),
    })) as unknown as Tables[K][];
  } catch (err) {
    g.__dbError = err instanceof Error ? err.message : String(err);
    console.error(`[db] failed to read "${table}":`, g.__dbError);
    return ([...memory()[table]] as Tables[K][]);
  }
}

async function insert<K extends Table>(table: K, data: Input<K>) {
  if (!sql) {
    const row = { ...data, id: crypto.randomUUID(), created_at: new Date().toISOString() } as Tables[K];
    (memory()[table] as Tables[K][]).unshift(row);
    return row;
  }
  const [row] = await sql`insert into ${sql(table as string)} ${sql(serialize(data))} returning *`;
  return row as unknown as Tables[K];
}

async function update<K extends Table>(table: K, id: string, data: Partial<Input<K>>) {
  if (!sql) {
    const rows = memory()[table] as Tables[K][];
    const i = rows.findIndex((r) => r.id === id);
    if (i === -1) throw new Error("Record not found");
    rows[i] = { ...rows[i], ...data };
    return rows[i];
  }
  const [row] = await sql`update ${sql(table as string)} set ${sql(serialize(data))} where id = ${id} returning *`;
  if (!row) throw new Error("Record not found");
  return row as unknown as Tables[K];
}

async function remove(table: Table, id: string) {
  if (!sql) {
    const mem = memory();
    mem[table] = mem[table].filter((r) => r.id !== id) as never;
    return;
  }
  await sql`delete from ${sql(table as string)} where id = ${id}`;
}

const byOrder = <T extends { sort_order: number }>(a: T, b: T) => a.sort_order - b.sort_order;
const byNewest = <T extends { created_at: string }>(a: T, b: T) =>
  b.created_at.localeCompare(a.created_at);

/* ------------------------------------------------------------------ */
/* Services                                                           */
/* ------------------------------------------------------------------ */

export async function getServices({ includeDrafts = false } = {}) {
  const rows = await all("services");
  return rows.filter((s) => includeDrafts || s.published).sort(byOrder);
}
export async function getServiceById(id: string) {
  return (await all("services")).find((s) => s.id === id) ?? null;
}
export const createService = (data: Input<"services">) => insert("services", data);
export const updateService = (id: string, data: Partial<Input<"services">>) =>
  update("services", id, data);
export const deleteService = (id: string) => remove("services", id);

/* ------------------------------------------------------------------ */
/* Projects                                                           */
/* ------------------------------------------------------------------ */

export async function getProjects({ includeDrafts = false, featuredOnly = false } = {}) {
  const rows = await all("projects");
  return rows
    .filter((p) => (includeDrafts || p.published) && (!featuredOnly || p.featured))
    .map((p) => ({ ...p, metrics: p.metrics ?? [], tags: p.tags ?? [], gallery: p.gallery ?? [] }))
    .sort(byOrder);
}
export async function getProjectBySlug(slug: string) {
  return (await getProjects()).find((p) => p.slug === slug) ?? null;
}
export async function getProjectById(id: string) {
  return (await getProjects({ includeDrafts: true })).find((p) => p.id === id) ?? null;
}
export const createProject = (data: Input<"projects">) => insert("projects", data);
export const updateProject = (id: string, data: Partial<Input<"projects">>) =>
  update("projects", id, data);
export const deleteProject = (id: string) => remove("projects", id);

/* ------------------------------------------------------------------ */
/* Reviews                                                            */
/* ------------------------------------------------------------------ */

export async function getReviews({ includePending = false, featuredOnly = false } = {}) {
  const rows = await all("reviews");
  return rows
    .filter((r) => (includePending || r.approved) && (!featuredOnly || r.featured))
    .sort(byNewest);
}
export async function getReviewById(id: string) {
  return (await all("reviews")).find((r) => r.id === id) ?? null;
}
export const createReview = (data: Input<"reviews">) => insert("reviews", data);
export const updateReview = (id: string, data: Partial<Input<"reviews">>) =>
  update("reviews", id, data);
export const deleteReview = (id: string) => remove("reviews", id);

/* ------------------------------------------------------------------ */
/* Inquiries                                                          */
/* ------------------------------------------------------------------ */

export async function getInquiries() {
  return (await all("inquiries")).sort(byNewest);
}
export const createInquiry = (data: Input<"inquiries">) => insert("inquiries", data);
export const setInquiryRead = (id: string, read: boolean) => update("inquiries", id, { read });
export const deleteInquiry = (id: string) => remove("inquiries", id);

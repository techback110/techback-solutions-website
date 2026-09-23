"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { checkCredentials, requireAdmin } from "@/lib/auth";
import * as db from "@/lib/data";
import { SESSION_COOKIE, SESSION_MAX_AGE, signSession } from "@/lib/session";
import type { ActionState, Metric } from "@/lib/types";
import { lines, slugify } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Auth                                                               */
/* ------------------------------------------------------------------ */

export async function login(_: ActionState, formData: FormData): Promise<ActionState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  if (!checkCredentials(email, password)) {
    await new Promise((r) => setTimeout(r, 600)); // slow down guessing
    return { error: "Invalid email or password." };
  }

  const store = await cookies();
  store.set(SESSION_COOKIE, await signSession(email), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logout() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

const bool = (v: FormDataEntryValue | null) => v === "on" || v === "true";
const optional = (v: FormDataEntryValue | null) => {
  const s = String(v ?? "").trim();
  return s ? s : null;
};

function refresh() {
  revalidatePath("/", "layout");
}

function invalid(error: z.ZodError): ActionState {
  return { error: "Please fix the highlighted fields.", fieldErrors: z.flattenError(error).fieldErrors };
}

function failure(err: unknown): ActionState {
  const msg = err instanceof Error ? err.message : String(err);
  if (/duplicate key|unique/i.test(msg)) return { error: "That slug is already in use." };
  console.error("[admin]", err);
  return { error: `Save failed: ${msg}` };
}

/* ------------------------------------------------------------------ */
/* Services                                                           */
/* ------------------------------------------------------------------ */

const serviceSchema = z.object({
  title: z.string().trim().min(2).max(120),
  slug: z.string().trim().regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers and dashes only").max(80),
  summary: z.string().trim().min(10).max(300),
  description: z.string().trim().max(5000),
  deliverables: z.array(z.string()).max(30),
  sort_order: z.coerce.number().int().min(0).max(9999),
  published: z.boolean(),
});

export async function saveService(_: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const id = optional(formData.get("id"));
  const title = String(formData.get("title") ?? "");
  const parsed = serviceSchema.safeParse({
    title,
    slug: slugify(String(formData.get("slug") || title)),
    summary: formData.get("summary"),
    description: formData.get("description") ?? "",
    deliverables: lines(formData.get("deliverables")),
    sort_order: formData.get("sort_order") || 0,
    published: bool(formData.get("published")),
  });
  if (!parsed.success) return invalid(parsed.error);

  try {
    if (id) await db.updateService(id, parsed.data);
    else await db.createService(parsed.data);
  } catch (err) {
    return failure(err);
  }
  refresh();
  redirect("/admin/services");
}

export async function removeService(formData: FormData) {
  await requireAdmin();
  await db.deleteService(String(formData.get("id")));
  refresh();
}

/* ------------------------------------------------------------------ */
/* Projects                                                           */
/* ------------------------------------------------------------------ */

const projectSchema = z.object({
  title: z.string().trim().min(2).max(160),
  slug: z.string().trim().regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers and dashes only").max(80),
  client: z.string().trim().min(1).max(120),
  category: z.string().trim().min(1).max(80),
  year: z.coerce.number().int().min(1990).max(2100),
  summary: z.string().trim().min(10).max(400),
  description: z.string().trim().max(10000),
  cover_image: z.url("Must be a full URL").nullable(),
  gallery: z.array(z.url("Each gallery line must be a URL")).max(24),
  tags: z.array(z.string().max(40)).max(12),
  metrics: z.array(z.object({ value: z.string().max(24), label: z.string().max(80) })).max(6),
  live_url: z.url("Must be a full URL").nullable(),
  accent: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Use a hex colour like #C08552"),
  featured: z.boolean(),
  published: z.boolean(),
  sort_order: z.coerce.number().int().min(0).max(9999),
});

function parseMetrics(v: FormDataEntryValue | null): Metric[] {
  return lines(v).map((line) => {
    const [value, ...rest] = line.split("|");
    return { value: value.trim(), label: rest.join("|").trim() };
  });
}

export async function saveProject(_: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const id = optional(formData.get("id"));
  const title = String(formData.get("title") ?? "");
  const parsed = projectSchema.safeParse({
    title,
    slug: slugify(String(formData.get("slug") || formData.get("client") || title)),
    client: formData.get("client"),
    category: formData.get("category"),
    year: formData.get("year"),
    summary: formData.get("summary"),
    description: formData.get("description") ?? "",
    cover_image: optional(formData.get("cover_image")),
    gallery: lines(formData.get("gallery")),
    tags: String(formData.get("tags") ?? "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    metrics: parseMetrics(formData.get("metrics")),
    live_url: optional(formData.get("live_url")),
    accent: formData.get("accent") || "#FF4D1C",
    featured: bool(formData.get("featured")),
    published: bool(formData.get("published")),
    sort_order: formData.get("sort_order") || 0,
  });
  if (!parsed.success) return invalid(parsed.error);

  try {
    if (id) await db.updateProject(id, parsed.data);
    else await db.createProject(parsed.data);
  } catch (err) {
    return failure(err);
  }
  refresh();
  redirect("/admin/projects");
}

export async function removeProject(formData: FormData) {
  await requireAdmin();
  await db.deleteProject(String(formData.get("id")));
  refresh();
}

/* ------------------------------------------------------------------ */
/* Reviews                                                            */
/* ------------------------------------------------------------------ */

const reviewSchema = z.object({
  author: z.string().trim().min(2).max(120),
  role: z.string().trim().max(120),
  company: z.string().trim().max(160),
  avatar_url: z.url("Must be a full URL").nullable(),
  rating: z.coerce.number().int().min(1).max(5),
  content: z.string().trim().min(10).max(1200),
  featured: z.boolean(),
  approved: z.boolean(),
});

export async function saveReview(_: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const id = optional(formData.get("id"));
  const parsed = reviewSchema.safeParse({
    author: formData.get("author"),
    role: formData.get("role") ?? "",
    company: formData.get("company") ?? "",
    avatar_url: optional(formData.get("avatar_url")),
    rating: formData.get("rating") || 5,
    content: formData.get("content"),
    featured: bool(formData.get("featured")),
    approved: bool(formData.get("approved")),
  });
  if (!parsed.success) return invalid(parsed.error);

  try {
    if (id) await db.updateReview(id, parsed.data);
    else await db.createReview(parsed.data);
  } catch (err) {
    return failure(err);
  }
  refresh();
  redirect("/admin/reviews");
}

export async function toggleReviewApproval(formData: FormData) {
  await requireAdmin();
  await db.updateReview(String(formData.get("id")), { approved: bool(formData.get("approved")) });
  refresh();
}

export async function removeReview(formData: FormData) {
  await requireAdmin();
  await db.deleteReview(String(formData.get("id")));
  refresh();
}

/* ------------------------------------------------------------------ */
/* Inquiries                                                          */
/* ------------------------------------------------------------------ */

export async function toggleInquiryRead(formData: FormData) {
  await requireAdmin();
  await db.setInquiryRead(String(formData.get("id")), bool(formData.get("read")));
  refresh();
}

export async function removeInquiry(formData: FormData) {
  await requireAdmin();
  await db.deleteInquiry(String(formData.get("id")));
  refresh();
}

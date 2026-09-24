"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { authenticate, requireAdmin } from "@/lib/auth";
import * as db from "@/lib/data";
import { hashPassword, verifyPassword } from "@/lib/password";
import { SESSION_COOKIE, SESSION_MAX_AGE, signSession } from "@/lib/session";
import type { ActionState, Metric, SiteSettings } from "@/lib/types";
import { lines, slugify } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Auth                                                               */
/* ------------------------------------------------------------------ */

export async function login(_: ActionState, formData: FormData): Promise<ActionState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  const signedIn = await authenticate(email, password);
  if (!signedIn) {
    await new Promise((r) => setTimeout(r, 600)); // slow down guessing
    return { error: "Invalid email or password." };
  }

  const store = await cookies();
  store.set(SESSION_COOKIE, await signSession(signedIn), {
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

/* ------------------------------------------------------------------ */
/* Team                                                               */
/* ------------------------------------------------------------------ */

const teamSchema = z.object({
  name: z.string().trim().min(2).max(120),
  role: z.string().trim().max(120),
  photo_url: z.url("Must be a full URL").nullable(),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Use a hex colour like #C08552"),
  sort_order: z.coerce.number().int().min(0).max(9999),
  published: z.boolean(),
});

export async function saveTeamMember(_: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const id = optional(formData.get("id"));
  const parsed = teamSchema.safeParse({
    name: formData.get("name"),
    role: formData.get("role") ?? "",
    photo_url: optional(formData.get("photo_url")),
    color: formData.get("color") || "#FF4D1C",
    sort_order: formData.get("sort_order") || 0,
    published: bool(formData.get("published")),
  });
  if (!parsed.success) return invalid(parsed.error);

  try {
    if (id) await db.updateTeamMember(id, parsed.data);
    else await db.createTeamMember(parsed.data);
  } catch (err) {
    return failure(err);
  }
  refresh();
  redirect("/admin/team");
}

export async function removeTeamMember(formData: FormData) {
  await requireAdmin();
  await db.deleteTeamMember(String(formData.get("id")));
  refresh();
}

/* ------------------------------------------------------------------ */
/* Settings                                                           */
/* ------------------------------------------------------------------ */

/** Splits "left | right" lines; lines without a "|" get an empty right side. */
function pairs(v: FormDataEntryValue | null) {
  return lines(v).map((line) => {
    const [left, ...rest] = line.split("|");
    return [left.trim(), rest.join("|").trim()] as const;
  });
}

const settingsSchema = z.object({
  email: z.email("Enter a valid email"),
  phone: z.string().trim().max(40),
  address: z.string().trim().max(200),
  description: z.string().trim().max(400),
  socials: z.array(z.object({ label: z.string().min(1).max(40), href: z.url("Each link needs a full URL") })).max(12),
  home_intro: z.string().trim().max(600),
  clients: z.array(z.string().max(60)).max(40),
  stats: z
    .array(z.object({ value: z.number().int().min(0), suffix: z.string().max(4), label: z.string().min(1).max(60) }))
    .max(4, "Up to 4 stats"),
  about_intro: z.string().trim().max(600),
  about_story: z.string().trim().max(1200),
  principles: z.array(z.object({ title: z.string().min(1).max(80), body: z.string().max(400) })).max(8),
});

export async function saveSettings(_: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = settingsSchema.safeParse({
    email: String(formData.get("email") ?? "").trim(),
    phone: formData.get("phone") ?? "",
    address: formData.get("address") ?? "",
    description: formData.get("description") ?? "",
    socials: pairs(formData.get("socials")).map(([label, href]) => ({ label, href })),
    home_intro: formData.get("home_intro") ?? "",
    clients: lines(formData.get("clients")),
    stats: pairs(formData.get("stats")).map(([value, label]) => {
      const m = value.match(/^(\d+)\s*(.*)$/);
      return { value: m ? Number(m[1]) : NaN, suffix: m?.[2] ?? "", label };
    }),
    about_intro: formData.get("about_intro") ?? "",
    about_story: formData.get("about_story") ?? "",
    principles: pairs(formData.get("principles")).map(([title, body]) => ({ title, body })),
  } satisfies Record<keyof SiteSettings, unknown>);
  if (!parsed.success) return invalid(parsed.error);

  try {
    await db.saveSettings(parsed.data);
  } catch (err) {
    return failure(err);
  }
  refresh();
  return { ok: true, message: "Settings saved." };
}

/* ------------------------------------------------------------------ */
/* Admin users                                                        */
/* ------------------------------------------------------------------ */

const password = z.string().min(8, "At least 8 characters").max(200);

const userSchema = z.object({
  name: z.string().trim().max(120),
  email: z.email("Enter a valid email"),
  password,
});

export async function createUser(_: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = userSchema.safeParse({
    name: formData.get("name") ?? "",
    email: String(formData.get("email") ?? "").trim().toLowerCase(),
    password: formData.get("password") ?? "",
  });
  if (!parsed.success) return invalid(parsed.error);
  if (await db.getAdminUserByEmail(parsed.data.email)) {
    return { error: "A user with that email already exists.", fieldErrors: { email: ["Already in use"] } };
  }

  // The first real account replaces the bootstrap login, so make sure whoever
  // is signed in with it still has a way back in.
  const isFirst = (await db.getAdminUsers()).length === 0;
  try {
    await db.createAdminUser({
      name: parsed.data.name,
      email: parsed.data.email,
      password_hash: await hashPassword(parsed.data.password),
    });
  } catch (err) {
    return failure(err);
  }
  revalidatePath("/admin/users");
  return {
    ok: true,
    message: isFirst
      ? `Created ${parsed.data.email}. From now on only accounts listed here can sign in.`
      : `Created ${parsed.data.email}.`,
  };
}

export async function removeUser(formData: FormData) {
  const session = await requireAdmin();
  const id = String(formData.get("id"));
  const users = await db.getAdminUsers();
  const target = users.find((u) => u.id === id);
  // Never delete yourself or the last account — that would lock everyone out.
  if (!target || target.email === session.email || users.length <= 1) return;
  await db.deleteAdminUser(id);
  revalidatePath("/admin/users");
}

const changePasswordSchema = z
  .object({ current: z.string().min(1, "Required"), next: password, confirm: z.string() })
  .refine((d) => d.next === d.confirm, { path: ["confirm"], message: "Passwords don't match" });

export async function changePassword(_: ActionState, formData: FormData): Promise<ActionState> {
  const session = await requireAdmin();
  const parsed = changePasswordSchema.safeParse({
    current: formData.get("current") ?? "",
    next: formData.get("next") ?? "",
    confirm: formData.get("confirm") ?? "",
  });
  if (!parsed.success) return invalid(parsed.error);

  const user = await db.getAdminUserByEmail(session.email);
  if (!user) {
    return { error: "You're signed in with the setup login. Create your own account below first, then sign in with it." };
  }
  if (!(await verifyPassword(parsed.data.current, user.password_hash))) {
    return { error: "Current password is incorrect.", fieldErrors: { current: ["Incorrect password"] } };
  }
  try {
    await db.updateAdminUser(user.id, { password_hash: await hashPassword(parsed.data.next) });
  } catch (err) {
    return failure(err);
  }
  return { ok: true, message: "Password updated." };
}

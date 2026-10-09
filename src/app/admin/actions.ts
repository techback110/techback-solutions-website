"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { authenticate, requireAdmin } from "@/lib/auth";
import * as db from "@/lib/data";
import { hashPassword, verifyPassword } from "@/lib/password";
import { hasSessionSecret, SESSION_COOKIE, SESSION_MAX_AGE, signSession } from "@/lib/session";
import type { ActionState, Metric, SiteSettings } from "@/lib/types";
import { lines, slugify } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Auth                                                               */
/* ------------------------------------------------------------------ */

export async function login(_: ActionState, formData: FormData): Promise<ActionState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  if (!hasSessionSecret()) return { error: "AUTH_SECRET is not set for this deployment." };
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

/**
 * `z.url()` alone accepts any scheme, including `javascript:` and `data:`.
 * Every stored URL here can end up in an href or src, so the scheme is pinned
 * at the boundary. `safeHref` guards the render side as well.
 */
const httpUrl = (message: string) => z.url({ protocol: /^https?$/, error: message });

const serviceSchema = z.object({
  title: z.string().trim().min(2).max(120),
  slug: z.string().trim().regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers and dashes only").max(80),
  summary: z.string().trim().min(10).max(300),
  description: z.string().trim().max(5000),
  deliverables: z.array(z.string()).max(30),
  sort_order: z.coerce.number().int().min(0).max(9999),
  published: z.boolean(),

  outcome: z.string().trim().max(300),
  timeline_weeks: z.string().trim().max(40),
  engagement_types: z.array(z.string().max(40)).max(6),
  starting_from: z.string().trim().max(60),
  in_scope: z.array(z.string().max(160)).max(20),
  out_of_scope: z.array(z.string().max(160)).max(20),
  sample_project_slugs: z.array(z.string().max(80)).max(6),
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

    outcome: formData.get("outcome") ?? "",
    timeline_weeks: formData.get("timeline_weeks") ?? "",
    engagement_types: lines(formData.get("engagement_types")),
    starting_from: formData.get("starting_from") ?? "",
    in_scope: lines(formData.get("in_scope")),
    out_of_scope: lines(formData.get("out_of_scope")),
    sample_project_slugs: lines(formData.get("sample_project_slugs")),
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
  cover_image: httpUrl("Must be a full http(s) URL").nullable(),
  gallery: z.array(httpUrl("Each gallery line must be an http(s) URL")).max(24),
  tags: z.array(z.string().max(40)).max(12),
  metrics: z
    .array(
      z.object({
        value: z.string().max(24),
        label: z.string().max(80),
        method: z.string().max(120).optional(),
      })
    )
    .max(6),
  live_url: httpUrl("Must be a full http(s) URL").nullable(),
  accent: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Use a hex colour like #C08552"),
  featured: z.boolean(),
  published: z.boolean(),
  sort_order: z.coerce.number().int().min(0).max(9999),

  industry: z.string().trim().max(80),
  duration_weeks: z.string().trim().max(40),
  team_size: z.string().trim().max(40),
  role: z.string().trim().max(160),
  brief: z.string().trim().max(2000),
  outcome_bullets: z.array(z.string().max(200)).max(8),
  services_used: z.array(z.string().max(80)).max(8),
  tech_stack: z.array(z.string().max(40)).max(20),
  pull_quote: z.string().trim().max(400),
  pull_quote_attribution: z.string().trim().max(120),
  video_url: httpUrl("Must be a full http(s) URL").nullable(),
  pdf_url: httpUrl("Must be a full http(s) URL").nullable(),
});

/** `value | label`, with an optional third segment for how it was measured. */
function parseMetrics(v: FormDataEntryValue | null): Metric[] {
  return lines(v).map((line) => {
    const [value, label = "", method = ""] = line.split("|").map((s) => s.trim());
    return method ? { value, label, method } : { value, label };
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

    industry: formData.get("industry") ?? "",
    duration_weeks: formData.get("duration_weeks") ?? "",
    team_size: formData.get("team_size") ?? "",
    role: formData.get("role") ?? "",
    brief: formData.get("brief") ?? "",
    outcome_bullets: lines(formData.get("outcome_bullets")),
    services_used: lines(formData.get("services_used")),
    tech_stack: String(formData.get("tech_stack") ?? "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    pull_quote: formData.get("pull_quote") ?? "",
    pull_quote_attribution: formData.get("pull_quote_attribution") ?? "",
    video_url: optional(formData.get("video_url")),
    pdf_url: optional(formData.get("pdf_url")),
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
  avatar_url: httpUrl("Must be a full http(s) URL").nullable(),
  rating: z.coerce.number().int().min(1).max(5),
  content: z.string().trim().min(10).max(1200),
  featured: z.boolean(),
  approved: z.boolean(),

  project_slug: z.string().trim().max(80).nullable(),
  quote_short: z.string().trim().max(240),
  verification_source: z.enum(["email", "linkedin", "clutch", "gbp", "other"]).nullable(),
  source_url: z.union([httpUrl("Must be a full http(s) URL"), z.null()]),
  permission_granted: z.boolean(),
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

    project_slug: optional(formData.get("project_slug")),
    quote_short: formData.get("quote_short") ?? "",
    verification_source: optional(formData.get("verification_source")),
    source_url: optional(formData.get("source_url")),
    permission_granted: bool(formData.get("permission_granted")),
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
  photo_url: httpUrl("Must be a full http(s) URL").nullable(),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Use a hex colour like #C08552"),
  sort_order: z.coerce.number().int().min(0).max(9999),
  published: z.boolean(),

  bio: z.string().trim().max(600),
  specialty: z.string().trim().max(120),
  location: z.string().trim().max(120),
  linkedin_url: z.union([httpUrl("Must be a full http(s) URL"), z.null()]),
  github_url: z.union([httpUrl("Must be a full http(s) URL"), z.null()]),
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

    bio: formData.get("bio") ?? "",
    specialty: formData.get("specialty") ?? "",
    location: formData.get("location") ?? "",
    linkedin_url: optional(formData.get("linkedin_url")),
    github_url: optional(formData.get("github_url")),
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
  socials: z.array(z.object({ label: z.string().min(1).max(40), href: httpUrl("Each link needs a full http(s) URL") })).max(12),
  home_intro: z.string().trim().max(600),
  clients: z.array(z.string().max(60)).max(40),
  stats: z
    .array(z.object({ value: z.number().int().min(0), suffix: z.string().max(4), label: z.string().min(1).max(60) }))
    .max(4, "Up to 4 stats"),
  about_intro: z.string().trim().max(600),
  about_story: z.string().trim().max(1200),
  principles: z.array(z.object({ title: z.string().min(1).max(80), body: z.string().max(400) })).max(8),

  hq: z.string().trim().max(120),
  regions: z.array(z.string().max(60)).max(20),
  office_hours: z.string().trim().max(120),

  hero_headline: z.string().trim().max(160),
  hero_sublede: z.string().trim().max(400),
  hero_rotator: z.array(z.string().max(40)).max(4, "Up to 4 — more reflows the headline"),
  preloader_tagline: z.string().trim().max(160),

  booking_url: z.union([httpUrl("Enter a full http(s) URL"), z.literal("")]),
  whatsapp: z.string().trim().max(40),
  reply_time_promise: z.string().trim().max(120),
  reply_time_miss_policy: z.string().trim().max(200),

  legal_entity: z.string().trim().max(160),
  gstin: z.string().trim().max(30),

  founder_letter: z.string().trim().max(2000),
  founder_signature: z.string().trim().max(80),
  continuity_statement: z.string().trim().max(600),
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

    hq: formData.get("hq") ?? "",
    regions: lines(formData.get("regions")),
    office_hours: formData.get("office_hours") ?? "",

    hero_headline: formData.get("hero_headline") ?? "",
    hero_sublede: formData.get("hero_sublede") ?? "",
    hero_rotator: lines(formData.get("hero_rotator")),
    preloader_tagline: formData.get("preloader_tagline") ?? "",

    booking_url: String(formData.get("booking_url") ?? "").trim(),
    whatsapp: formData.get("whatsapp") ?? "",
    reply_time_promise: formData.get("reply_time_promise") ?? "",
    reply_time_miss_policy: formData.get("reply_time_miss_policy") ?? "",

    legal_entity: formData.get("legal_entity") ?? "",
    gstin: formData.get("gstin") ?? "",

    founder_letter: formData.get("founder_letter") ?? "",
    founder_signature: formData.get("founder_signature") ?? "",
    continuity_statement: formData.get("continuity_statement") ?? "",
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

import { timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminUserByEmail, getAdminUsers } from "./data";
import { verifyPassword } from "./password";
import { SESSION_COOKIE, verifySession } from "./session";

const DEV_EMAIL = "admin@studio.dev";
const DEV_PASSWORD = "admin12345";

/**
 * Bootstrap credentials, used only while the admin_users table is empty.
 * They come from env; local dev falls back to a documented default.
 */
export function envCredentials() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (email && password) return { email, password, isDefault: false };
  if (process.env.NODE_ENV === "production") return null;
  return { email: DEV_EMAIL, password: DEV_PASSWORD, isDefault: true };
}

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

/** What the login page should offer. */
export async function loginOptions() {
  const hasUsers = (await getAdminUsers()).length > 0;
  const creds = hasUsers ? null : envCredentials();
  return { enabled: hasUsers || Boolean(creds), devDefault: creds?.isDefault ? creds : null };
}

/** Returns the signed-in email on success, null otherwise. */
export async function authenticate(email: string, password: string) {
  const normalized = email.trim().toLowerCase();
  if ((await getAdminUsers()).length > 0) {
    const user = await getAdminUserByEmail(normalized);
    return user && (await verifyPassword(password, user.password_hash)) ? user.email : null;
  }
  const creds = envCredentials();
  if (!creds) return null;
  const ok = safeEqual(normalized, creds.email.toLowerCase()) && safeEqual(password, creds.password);
  return ok ? normalized : null;
}

/** A session stays valid only while its user still exists (or matches the bootstrap login). */
async function isActiveAdmin(email: string) {
  if ((await getAdminUsers()).length > 0) return Boolean(await getAdminUserByEmail(email));
  return envCredentials()?.email.toLowerCase() === email.toLowerCase();
}

export async function getSession() {
  const store = await cookies();
  const session = await verifySession(store.get(SESSION_COOKIE)?.value);
  return session && (await isActiveAdmin(session.email)) ? session : null;
}

/** Guard for server components and server actions. */
export async function requireAdmin() {
  const session = await getSession();
  // `signedout` tells the proxy to drop a cookie whose user no longer exists.
  if (!session) redirect("/admin/login?signedout=1");
  return session;
}

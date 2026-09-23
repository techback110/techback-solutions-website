import { timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySession } from "./session";

const DEV_EMAIL = "admin@studio.dev";
const DEV_PASSWORD = "admin12345";

/** Admin credentials come from env; local dev falls back to a documented default. */
export function adminCredentials() {
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

export function checkCredentials(email: string, password: string) {
  const creds = adminCredentials();
  if (!creds) return false;
  const emailOk = safeEqual(email.trim().toLowerCase(), creds.email.toLowerCase());
  const passOk = safeEqual(password, creds.password);
  return emailOk && passOk;
}

export async function getSession() {
  const store = await cookies();
  return verifySession(store.get(SESSION_COOKIE)?.value);
}

/** Guard for server components and server actions. */
export async function requireAdmin() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

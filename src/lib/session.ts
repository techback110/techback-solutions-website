import { jwtVerify, SignJWT } from "jose";

export const SESSION_COOKIE = "studio_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

const DEV_SECRET = "dev-only-secret-change-me-dev-only-secret-change-me";

/** Sessions can be signed: a secret is set, or we're in development. */
export function hasSessionSecret() {
  return Boolean(process.env.AUTH_SECRET?.trim()) || process.env.NODE_ENV !== "production";
}

function secretKey() {
  const secret = process.env.AUTH_SECRET?.trim();
  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("AUTH_SECRET must be set in production");
  }
  return new TextEncoder().encode(secret || DEV_SECRET);
}

export async function signSession(email: string) {
  return new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(secretKey());
}

export async function verifySession(token: string | undefined) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey(), { algorithms: ["HS256"] });
    return payload.role === "admin" ? { email: String(payload.email) } : null;
  } catch {
    return null;
  }
}

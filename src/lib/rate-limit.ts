/**
 * Per-IP fixed-window limiter held in process memory.
 *
 * Deliberately not durable: on Vercel each instance keeps its own counter and
 * cold starts reset it, so this raises the cost of casual form spam rather than
 * guaranteeing a global ceiling. The honeypot and Zod validation stay the first
 * line of defence. Swap the Map for Redis if abuse ever justifies the dependency.
 */
type Window = { count: number; resetAt: number };

const g = globalThis as unknown as { __rate?: Map<string, Window> };
const buckets = (g.__rate ??= new Map<string, Window>());

const MAX_KEYS = 5000;

export async function clientKey() {
  // Imported lazily so `allow` stays usable (and testable) outside a request.
  const { headers } = await import("next/headers");
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  return ip;
}

/** Returns true when the caller is within budget. */
export function allow(key: string, { limit = 5, windowMs = 10 * 60_000 } = {}) {
  const now = Date.now();
  const hit = buckets.get(key);

  if (!hit || now > hit.resetAt) {
    // Cheap eviction: the map only grows on genuinely new keys.
    if (buckets.size > MAX_KEYS) {
      for (const [k, v] of buckets) if (now > v.resetAt) buckets.delete(k);
    }
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (hit.count >= limit) return false;
  hit.count += 1;
  return true;
}

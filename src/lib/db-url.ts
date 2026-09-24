/**
 * Cleans up a pasted Postgres connection string: strips surrounding quotes and
 * URL-encodes the password, so a raw password like "#abc" (which would
 * otherwise cut the URL short at "#") works as well as the encoded "%23abc".
 */
export function normalizeDatabaseUrl(raw: string | undefined) {
  const url = raw?.trim().replace(/^(["'])(.*)\1$/, "$2");
  if (!url) return url;
  // scheme://user:password@host… — the password runs up to the *last* "@".
  const match = url.match(/^(postgres(?:ql)?:\/\/[^:/@]+:)(.*)@([^@]+)$/);
  if (!match) return url;
  const [, prefix, password, rest] = match;
  let decoded = password;
  try {
    decoded = decodeURIComponent(password);
  } catch {
    // A stray "%" that isn't an escape: treat the whole thing as raw text.
  }
  return `${prefix}${encodeURIComponent(decoded)}@${rest}`;
}

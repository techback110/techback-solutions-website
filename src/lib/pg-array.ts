/**
 * Encodes strings as a Postgres array literal, e.g. {"a","b \"c\""}.
 *
 * postgres.js only serialises sql.array() correctly once it has fetched the
 * server's type list, which happens after the first query on a client. A
 * write that is a client's first query then fails with "column is of type
 * text[] but expression is of type text". A quoted literal always works.
 */
export function pgTextArray(values: readonly string[]) {
  return `{${values.map((v) => `"${v.replace(/[\\"]/g, "\\$&")}"`).join(",")}}`;
}

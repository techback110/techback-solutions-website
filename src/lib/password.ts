import { randomBytes, scrypt as scryptCb, timingSafeEqual, type BinaryLike } from "node:crypto";

const KEYLEN = 64;

function scrypt(password: BinaryLike, salt: BinaryLike) {
  return new Promise<Buffer>((resolve, reject) =>
    scryptCb(password, salt, KEYLEN, (err, key) => (err ? reject(err) : resolve(key)))
  );
}

/** Returns "scrypt$<salt>$<hash>" (hex). */
export async function hashPassword(password: string) {
  const salt = randomBytes(16);
  const key = await scrypt(password, salt);
  return `scrypt$${salt.toString("hex")}$${key.toString("hex")}`;
}

export async function verifyPassword(password: string, stored: string) {
  const [scheme, salt, hash] = stored.split("$");
  if (scheme !== "scrypt" || !salt || !hash) return false;
  const expected = Buffer.from(hash, "hex");
  const key = await scrypt(password, Buffer.from(salt, "hex"));
  return key.length === expected.length && timingSafeEqual(key, expected);
}

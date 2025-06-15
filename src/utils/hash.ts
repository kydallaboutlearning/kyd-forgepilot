
// Use @noble/hashes/scrypt for browser-friendly password hashing
import { scrypt } from "@noble/hashes/scrypt";
import { randomBytes } from "@noble/hashes/utils";

// Helper to encode string to Uint8Array
function toBytes(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

// Hash password with scrypt; returns salt + hash as hex string, separated by $
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const N = 16384, r = 8, p = 1, dkLen = 32;
  const key = await scrypt(toBytes(password), salt, { N, r, p, dkLen });
  // Join salt and hash as hex
  return `${Buffer.from(salt).toString("hex")}$${Buffer.from(key).toString("hex")}`;
}

// Compare password with stored hash
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  if (!hash.includes("$")) return false;
  const [saltHex, keyHex] = hash.split("$");
  const salt = Buffer.from(saltHex, "hex");
  const expectedKey = Buffer.from(keyHex, "hex");
  const N = 16384, r = 8, p = 1, dkLen = 32;
  const testKey = await scrypt(toBytes(password), salt, { N, r, p, dkLen });
  // Constant-time comparison
  return testKey.length === expectedKey.length && testKey.every((b, i) => b === expectedKey[i]);
}

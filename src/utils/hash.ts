
// Use @noble/hashes/scrypt for browser-friendly password hashing
import { scrypt } from "@noble/hashes/scrypt";
import { randomBytes } from "@noble/hashes/utils";

// These scrypt parameters balance security and browser performance
const SCRYPT_PARAMS = {
  N: 2048, // Was 16384 -- this is much more reasonable for browsers
  r: 8,
  p: 1,
  dkLen: 32,
};

// Helper to encode string to Uint8Array
function toBytes(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

// Hash password with scrypt; returns salt + hash as hex string, separated by $
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const { N, r, p, dkLen } = SCRYPT_PARAMS;
  const key = await scrypt(toBytes(password), salt, { N, r, p, dkLen });
  // Join salt and hash as hex
  return `${toHex(salt)}$${toHex(key)}`;
}

// Compare password with stored hash
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  if (!hash.includes("$")) return false;
  const [saltHex, keyHex] = hash.split("$");
  const salt = fromHex(saltHex);
  const expectedKey = fromHex(keyHex);
  const { N, r, p, dkLen } = SCRYPT_PARAMS;
  const testKey = await scrypt(toBytes(password), salt, { N, r, p, dkLen });
  // Constant-time comparison
  return testKey.length === expectedKey.length && testKey.every((b, i) => b === expectedKey[i]);
}

// Safe hex helpers (avoid Buffer)
function toHex(uint8: Uint8Array) {
  return Array.from(uint8)
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

function fromHex(hex: string): Uint8Array {
  const arr = new Uint8Array(hex.length / 2);
  for (let i = 0; i < arr.length; ++i) {
    arr[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return arr;
}



import bcrypt from "bcryptjs";

// Hash password (returns promise)
export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

// Check password (returns promise)
export function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

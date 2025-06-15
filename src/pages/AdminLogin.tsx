
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useNavigate } from "react-router-dom";
import { hashPassword } from "@/utils/hash";
import { scrypt } from "@noble/hashes/scrypt";
import { randomBytes } from "@noble/hashes/utils";

const SCRYPT_PARAMS = {
  N: 2048, // This should match your hash util params
  r: 8,
  p: 1,
  dkLen: 32,
};

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

// Debug helper: hash with custom salt
async function scryptHashWithSalt(password: string, saltHex: string) {
  const salt = fromHex(saltHex);
  const { N, r, p, dkLen } = SCRYPT_PARAMS;
  const key = await scrypt(new TextEncoder().encode(password), salt, { N, r, p, dkLen });
  return `${toHex(salt)}$${toHex(key)}`;
}

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const { login, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();

  // For debug admin: show scrypt hash for given password
  const [hashTest, setHashTest] = useState<string | null>(null);
  const [hashError, setHashError] = useState<string | null>(null);
  const [hashLoading, setHashLoading] = useState(false);

  // Debug: manual salt input for advanced check
  const [manualSalt, setManualSalt] = useState<string>("");
  const [manualSaltResult, setManualSaltResult] = useState<string | null>(null);

  // Scrypt param test display
  const scryptDebugParams = JSON.stringify(SCRYPT_PARAMS, null, 2);

  // Redirect already-logged-in admins
  if (isAuthenticated) {
    navigate("/dashboard");
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { success, error } = await login(email, password);
    if (success) {
      setErr(null);
      navigate("/dashboard");
    } else {
      setErr((error ?? "Invalid credentials.") + " (check browser console for debug info)");
    }
  }

  // Extra: test hash for given password with random salt
  async function handleTestHash(e: React.FormEvent) {
    e.preventDefault();
    setHashTest(null);
    setHashError(null);
    setHashLoading(true);
    try {
      const hash = await hashPassword(password);
      setHashTest(hash);
    } catch (e: any) {
      setHashError(String(e));
    }
    setHashLoading(false);
  }

  // Extra: test hash for given password with manual salt
  async function handleManualSaltHash(e: React.FormEvent) {
    e.preventDefault();
    setManualSaltResult(null);
    setHashError(null);
    setHashLoading(true);
    try {
      if (!/^[a-fA-F0-9]{32}$/.test(manualSalt)) {
        setHashError("Salt must be a 16-byte hex string (32 chars).");
        setHashLoading(false);
        return;
      }
      const hash = await scryptHashWithSalt(password, manualSalt);
      setManualSaltResult(hash);
    } catch (e: any) {
      setHashError(String(e));
    }
    setHashLoading(false);
  }

  // helpers for extracting DB salt/hash for testing
  function extractSaltFromDbHash(dbHash: string): string | null {
    const [salt] = dbHash.split("$");
    if (salt && salt.length === 32) return salt;
    return null;
  }
  function extractKeyFromDbHash(dbHash: string): string | null {
    const [, key] = dbHash.split("$");
    if (key && key.length === 64) return key;
    return null;
  }

  // Example DB hash for copy/paste
  const exampleDbHash = "a391c10d965798fbf5ba769ac2339f22$352f3aa07328873df3d32ddf93e2cd6e797134efd03a989c7e383161995bff06";
  const saltExample = extractSaltFromDbHash(exampleDbHash);
  const keyExample = extractKeyFromDbHash(exampleDbHash);

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-card shadow-lg rounded-xl p-8 w-full max-w-sm mx-auto mt-24">
      <h2 className="text-2xl font-bold text-center">Admin Login</h2>
      <Input type="email" placeholder="Admin Email" value={email} onChange={e => setEmail(e.target.value)} required autoFocus />
      <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      {err && <div className="text-destructive text-sm">{err}</div>}
      <Button className="w-full" type="submit">Log In</Button>
      <div className="text-xs text-muted-foreground mt-2 text-center">
        Debug mode: check the browser console for step-by-step login results.
      </div>
      {/* ADMIN DEBUGGER: password hash tester */}
      <div className="mt-6 p-4 border rounded bg-muted text-xs">
        <div className="font-semibold mb-2">Debug: Scrypt Hash Tool</div>
        <form onSubmit={handleTestHash} className="mb-3">
          <Input
            type="text"
            placeholder="Password to hash"
            className="mb-2"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button size="sm" type="submit" disabled={hashLoading}>Test Hash (random salt)</Button>
        </form>
        {hashLoading && <div>Hashing...</div>}
        {hashTest && (
          <div className="break-all mt-2">
            <span>Random salt hash: </span>
            <code>{hashTest}</code>
          </div>
        )}
        {/* Divider */}
        <div className="border-t my-2"></div>
        <div className="font-semibold mb-1">Hash with custom salt</div>
        <form onSubmit={handleManualSaltHash} className="flex gap-2">
          <Input
            type="text"
            placeholder="Paste salt (32 hex chars)"
            className="mb-2"
            value={manualSalt}
            onChange={e => setManualSalt(e.target.value)}
            maxLength={32}
          />
          <Button size="sm" type="submit" disabled={hashLoading}>Test</Button>
        </form>
        {manualSaltResult && (
          <div className="break-all mt-2">
            <span>Manual salt hash:</span>
            <code>{manualSaltResult}</code>
          </div>
        )}
        {hashError && <div className="text-red-500">Error: {hashError}</div>}

        <div className="mt-4 opacity-70">
          <div>Scrypt Params:</div>
          <pre className="break-all">{scryptDebugParams}</pre>
        </div>
        {/* Example hash and split salt */}
        <div className="mt-2">
          <div>Example DB hash: <code>{exampleDbHash}</code></div>
          <div>Salt: <code>{saltExample}</code></div>
          <div>Key: <code>{keyExample}</code></div>
        </div>
        <div className="mt-2 opacity-50">
          Paste the salt from your DB hash above and run with your password. The hash output should match your DB value if everything is correct.
        </div>
      </div>
    </form>
  );
}



import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useNavigate } from "react-router-dom";
import { hashPassword } from "@/utils/hash";

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

  // Extra: test hash for given password
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
        <form onSubmit={handleTestHash}>
          <Input
            type="text"
            placeholder="Password to hash"
            className="mb-2"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button size="sm" type="submit" disabled={hashLoading}>Test Hash</Button>
        </form>
        {hashLoading && <div>Hashing...</div>}
        {hashTest && (
          <div className="break-all mt-2">
            <span>Hash: </span>
            <code>{hashTest}</code>
          </div>
        )}
        {hashError && <div className="text-red-500">Error: {hashError}</div>}
        <div className="mt-2 opacity-50">After copying the hash, you can compare it to what is stored for your admin in the database.</div>
      </div>
    </form>
  );
}


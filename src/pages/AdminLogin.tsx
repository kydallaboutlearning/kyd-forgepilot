import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const { login, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();

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
      // Show error and all details encountered
      setErr((error ?? "Invalid credentials.") + " (check browser console for debug info)");
    }
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
    </form>
  );
}

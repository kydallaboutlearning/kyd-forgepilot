
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminLogin({ onLogin }: { onLogin: () => void }) {
  // TODO: Replace with real API call + Supabase auth
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email === "admin@agency.ai" && password === "admin") {
      onLogin();
      setErr(null);
    } else {
      setErr("Invalid credentials (demo: admin@agency.ai / admin)");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-card shadow-lg rounded-xl p-8 w-full max-w-sm mx-auto mt-24">
      <h2 className="text-2xl font-bold">Admin Login</h2>
      <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required autoFocus />
      <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      {err && <div className="text-destructive text-sm">{err}</div>}
      <Button className="w-full" type="submit">Log in</Button>
    </form>
  )
}

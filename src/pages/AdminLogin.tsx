
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [token, setToken] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const { login, isAuthenticated, loading } = useAdminAuth();
  const navigate = useNavigate();

  // Redirect already-logged-in admins
  if (isAuthenticated) {
    navigate("/dashboard");
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token.trim()) {
      setErr("Please enter a token");
      return;
    }

    const { success, error } = await login(token.trim());
    if (success) {
      setErr(null);
      navigate("/dashboard");
    } else {
      setErr(error || "Invalid token");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-card shadow-lg rounded-xl p-8 w-full max-w-sm mx-auto mt-24">
      <h2 className="text-2xl font-bold text-center">Admin Login</h2>
      <Input 
        type="text" 
        placeholder="Enter admin token" 
        value={token} 
        onChange={e => setToken(e.target.value)} 
        required 
        autoFocus 
      />
      {err && <div className="text-destructive text-sm">{err}</div>}
      <Button className="w-full" type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Log In"}
      </Button>
      <div className="text-xs text-muted-foreground mt-2 text-center">
        Use your admin token to access the dashboard.
      </div>
    </form>
  );
}

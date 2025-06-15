
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data?.session) {
        navigate("/dashboard", { replace: true });
      }
    });
    // Auth redirect error handling
    // If just redirected after email confirm, go to dashboard
    const params = new URLSearchParams(window.location.search);
    if (params.has("access_token") && params.has("type")) {
      window.location.href = "/dashboard";
    }
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (isLogin) {
      // sign in
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else window.location.href = "/dashboard";
    } else {
      // sign up
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth`
        }
      });
      setError(error ? error.message : "Check your email for confirmation.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <form onSubmit={handleSubmit} className="space-y-6 bg-card shadow-lg rounded-xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold">{isLogin ? "Admin Login" : "Sign Up"}</h2>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoFocus
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="mt-1"
          />
        </div>
        {error && <div className="text-destructive text-sm">{error}</div>}
        <Button className="w-full" type="submit" disabled={loading}>
          {loading ? "Working…" : isLogin ? "Log in" : "Sign up"}
        </Button>
        <div className="text-center text-xs text-muted-foreground mt-2">
          {isLogin
            ? <>New here? <button type="button" onClick={() => setIsLogin(false)} className="underline">Sign up</button></>
            : <>Already have an account? <button type="button" onClick={() => setIsLogin(true)} className="underline">Log in</button></>
          }
        </div>
      </form>
    </div>
  );
}

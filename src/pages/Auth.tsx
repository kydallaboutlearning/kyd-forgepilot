
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
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else window.location.href = "/dashboard";
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth`,
        }
      });
      setError(error ? error.message : "Check your email for confirmation.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-card shadow-2xl rounded-2xl p-8 
                  animate-fade-in border border-border flex flex-col gap-7"
        style={{ animationDelay: "0.1s", animationFillMode: "both" }}
      >
        <h2 className="font-playfair text-3xl font-bold mb-1 text-center text-foreground leading-tight">
          {isLogin ? "Admin Login" : "Create Account"}
        </h2>
        
        <div className="flex flex-col gap-1">
          <Label htmlFor="email" className="text-base">Email</Label>
          <Input
            id="email"
            type="email"
            autoFocus
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="bg-muted/10 border border-input rounded-lg py-2 px-4 text-lg
                       placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary
                       transition-all"
            placeholder="your@email.com"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="password" className="text-base">Password</Label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="bg-muted/10 border border-input rounded-lg py-2 px-4 text-lg
                     placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary
                     transition-all"
            placeholder="••••••••"
          />
        </div>
        {error && (
          <div className="text-destructive text-sm text-center bg-destructive/10 px-3 py-2 rounded-lg">
            {error}
          </div>
        )}

        <Button
          className="w-full mt-1 py-3 font-semibold text-base rounded-lg
                     bg-primary hover:bg-primary/90 transition-colors shadow 
                     disabled:bg-primary/60 disabled:hover:bg-primary/60"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <span className="animate-pulse">Working…</span>
          ) : isLogin ? "Log in" : "Sign up"}
        </Button>

        <div className="text-center text-sm text-muted-foreground mt-1">
          {isLogin
            ? (
              <>New here?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                >
                  Log in
                </button>
              </>
            )}
        </div>
      </form>
    </div>
  );
}

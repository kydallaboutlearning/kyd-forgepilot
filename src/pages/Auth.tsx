
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

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

  async function handleGoogleLogin() {
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` }
    });
    if (error) setError(error.message);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-2 relative">
      <div className="max-w-md w-full bg-card/90 shadow-2xl rounded-2xl p-8 border border-border flex flex-col gap-7 animate-fade-in" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
        {/* ForgePilot Brand Header */}
        <div className="flex items-center justify-center flex-col mb-2">
          <span
            className="text-4xl font-bold font-playfair tracking-tight select-none"
            style={{
              color: "#FFB74A",
              letterSpacing: "-0.02em",
              textShadow: "0 0 3px #ffb84a44,0 1.5px 8px #111,0 0.5px 1px #ffd08555",
            }}
          >
            Forge<span style={{ color: "white", marginLeft: "-2px" }}>Pilot</span>
          </span>
        </div>

        {/* Google Sign in */}
        <Button
          type="button"
          variant="outline"
          className="w-full flex gap-2 items-center justify-center bg-white text-black font-semibold text-base rounded-lg border border-neutral-200 hover:bg-neutral-100 transition shadow-sm"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <span className="text-xl"><FcGoogle /></span>
          Continue with Google
        </Button>
        <div className="flex items-center text-muted-foreground mt-2 mb-[-17px]" aria-hidden>
          <span className="border-t border-border flex-1 mr-2" />
          <span className="text-xs font-medium">or</span>
          <span className="border-t border-border flex-1 ml-2" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-7 mt-2">
          <h2 className="font-playfair text-xl font-bold mb-1 text-center text-foreground leading-tight">
            {isLogin ? "Admin Log in" : "Create Account"}
          </h2>
          <div className="flex flex-col gap-1">
            <Label htmlFor="email" className="text-base">Email</Label>
            <Input
              id="email"
              type="email"
              required
              autoFocus
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
    </div>
  );
}

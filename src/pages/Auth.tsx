
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";

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
    <div className="min-h-screen flex items-center justify-center bg-black px-2">
      <div
        className="
          max-w-md w-full 
          rounded-2xl shadow-2xl
          px-8 py-10
          flex flex-col gap-7
          border border-border
          bg-[rgba(255,255,255,0.81)]
          dark:bg-[rgba(255,255,255,0.14)]
          backdrop-blur-[2px]
        "
        style={{
          animation: "fade-in 0.5s cubic-bezier(0.4,0,0.2,1) both",
          animationDelay: "0.1s",
          animationFillMode: "both"
        }}
      >
        {/* Logo header */}
        <div className="flex flex-col items-center justify-center mb-1 select-none">
          <span
            className="font-playfair font-bold text-5xl tracking-tight leading-tight"
            style={{
              textShadow:
                "0.75px 1.5px 1.2px #444, 0 0px 7px #19191988, 0 2px 10px #d8a74eff",
              userSelect: "none"
            }}
          >
            <span
              style={{
                color: "#FFB74A",
                filter: "drop-shadow(0px 2px 2.2px #FFE6BA)",
                marginRight: "1.5px"
              }}
            >
              Forge
            </span>
            <span
              style={{
                color: "white",
                marginLeft: "-3px",
                textShadow: "0 1.2px 12px #222"
              }}
            >
              Pilot
            </span>
          </span>
        </div>

        {/* Google Sign in */}
        <Button
          type="button"
          variant="outline"
          className={`
            w-full flex gap-2 items-center justify-center
            bg-white text-black font-semibold text-base
            rounded-lg border border-neutral-200
            hover:bg-neutral-100 transition shadow-none
            h-11
          `}
          onClick={handleGoogleLogin}
          disabled={loading}
          style={{ boxShadow: "0 2px 10px 0 rgba(0,0,0,.03)" }}
        >
          <span className="text-xl flex items-center">
            <Mail size={22} className="mr-2" />
          </span>
          Continue with Google
        </Button>

        {/* or separator */}
        <div className="flex items-center justify-center text-muted-foreground my-[-6px]" aria-hidden>
          <span className="border-t border-neutral-300 flex-1" />
          <span className="mx-2 text-xs font-medium tracking-wide" style={{ color: "#7e7e7e", fontWeight: 500 }}>
            or
          </span>
          <span className="border-t border-neutral-300 flex-1" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-7 mt-0"
        >
          <h2
            className="font-playfair text-lg font-bold text-center text-neutral-600 leading-tight mb-1"
            style={{ opacity: 0.66, letterSpacing: "-0.01em" }}
          >
            {isLogin ? <>Admin <span className="text-neutral-800/90 font-semibold">Log in</span></> : <>Create <span className="text-neutral-800/90 font-semibold">Account</span></>}
          </h2>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="email" className="text-[15px] text-neutral-800/80 font-medium mb-[2px]">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              required
              autoFocus
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="
                h-11
                bg-neutral-50/30
                dark:bg-white/10
                border border-neutral-300
                dark:border-neutral-400/10
                rounded-lg
                px-4 text-[16px] placeholder:text-neutral-400
                font-[450]
                focus-visible:ring-2 focus-visible:ring-primary
                transition-all
              "
              placeholder="your@email.com"
            />
          </div>
          {/* Password */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="password" className="text-[15px] text-neutral-800/80 font-medium mb-[2px]">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="
                h-11
                bg-neutral-50/30
                dark:bg-white/10
                border border-neutral-300
                dark:border-neutral-400/10
                rounded-lg
                px-4 text-[17px] tracking-[0.01em] placeholder:text-neutral-400
                font-[450]
                focus-visible:ring-2 focus-visible:ring-primary
                transition-all
              "
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="text-destructive text-[15px] text-center 
                            bg-destructive/10 px-3 py-2 rounded-lg font-semibold">
              {error}
            </div>
          )}

          {/* Submit button */}
          <Button
            className="
              w-full h-11 mt-1 font-semibold text-[17px]
              rounded-lg bg-primary text-white
              hover:bg-primary/90 transition-colors
              shadow
              disabled:bg-primary/60 disabled:hover:bg-primary/60
              "
            type="submit"
            disabled={loading}
            style={{ background: "#FFB74A" }}
          >
            {loading ? (
              <span className="animate-pulse">Working…</span>
            ) : isLogin ? "Log in" : "Sign up"}
          </Button>

          {/* Create account / login toggle */}
          <div className="text-center text-[15px] text-neutral-600 mt-1">
            {isLogin ? (
              <>New here?{" "}
                <button
                  type="button"
                  tabIndex={0}
                  onClick={() => setIsLogin(false)}
                  className="text-[#FFB74A] underline underline-offset-2 hover:text-primary/80 transition-colors font-semibold"
                  style={{ fontWeight: 500 }}
                >
                  Sign up
                </button>
              </>
            ) : (
              <>Already have an account?{" "}
                <button
                  type="button"
                  tabIndex={0}
                  onClick={() => setIsLogin(true)}
                  className="text-[#FFB74A] underline underline-offset-2 hover:text-primary/80 transition-colors font-semibold"
                  style={{ fontWeight: 500 }}
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


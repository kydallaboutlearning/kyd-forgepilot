import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAdminCredentials } from "@/hooks/useAdminCredentials";
import { validateAdminPassword } from "@/utils/adminAuthUtils";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { adminEmail, adminPasswordHash, loading: loadingAdminCreds } = useAdminCredentials();
  const navigate = useNavigate();

  // Redirect if signed in as admin
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session && data.session.user.email?.toLowerCase() === adminEmail?.toLowerCase()) {
        navigate("/dashboard", { replace: true });
      }
    });
  }, [navigate, adminEmail]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    // Validate credentials against site_settings entry
    if (!adminEmail || !adminPasswordHash) {
      setErr("No admin credentials configured. Please set them in the dashboard.");
      setLoading(false);
      return;
    }
    if (email.trim().toLowerCase() !== adminEmail.trim().toLowerCase()) {
      setErr("Only the configured admin login is allowed.");
      setLoading(false);
      return;
    }

    // Use the new util for password validation
    const passwordOk = await validateAdminPassword(password, adminPasswordHash);

    if (!passwordOk) {
      setErr("Invalid credentials.");
      setLoading(false);
      return;
    }

    // Clean up previous auth state (robustness)
    try {
      // Remove all Supabase/local auth tokens for a fresh login
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          localStorage.removeItem(key);
        }
      });
      Object.keys(sessionStorage || {}).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          sessionStorage.removeItem(key);
        }
      });
      await supabase.auth.signOut({ scope: "global" });
    } catch (_) {
      // ignore
    }

    // Try log in with Supabase Auth (register if user doesn't exist!)
    const { error: signInErr } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (signInErr) {
      // Try sign up if not exists
      const { error: signUpErr } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/dashboard` },
      });
      if (signUpErr) {
        // If this error is "Email not confirmed", show friendly message
        if (
          signUpErr.message &&
          (signUpErr.message.toLowerCase().includes("confirm") ||
            signUpErr.message.toLowerCase().includes("email not confirmed"))
        ) {
          setErr(
            "Please check your email to confirm your account before logging in."
          );
        } else {
          setErr("Error logging in: " + (signUpErr.message || "unknown"));
        }
        setLoading(false);
        return;
      } else {
        // Show message for confirmation step
        setErr(
          "A confirmation email was sent to your address. Please confirm and log in again."
        );
        setLoading(false);
        return;
      }
    }
    // Success: force full redirect
    window.location.href = "/dashboard";
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 flex flex-col justify-center items-center px-4">
      <div
        className="
          w-full max-w-md
          rounded-2xl border border-zinc-800
          bg-[rgba(22,22,26,0.92)] shadow-2xl
          px-8 py-10
          flex flex-col gap-8
          backdrop-blur-md
          animate-fade-in
        "
      >
        {/* Logo and title */}
        <div className="flex flex-col items-center mb-3 select-none">
          <span
            className="font-playfair font-bold text-5xl md:text-6xl tracking-tight leading-tight"
            style={{
              textShadow:
                "1px 2px 8px #1a1815, 0px 2px 16px #ffb84a33, 0 1.2px 12px #222",
              userSelect: "none"
            }}
          >
            <span
              className="text-primary"
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
                textShadow: "0 1.2px 16px #222"
              }}
            >
              Pilot
            </span>
          </span>
          <span className="mt-4 text-gray-200 text-lg font-semibold tracking-wide opacity-70">Admin Login</span>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="email"
              className="text-[15px] text-neutral-300 font-semibold mb-1"
            >
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
                bg-zinc-900/70
                border border-zinc-700
                text-gray-100
                rounded-lg
                placeholder:text-zinc-400
                font-medium
                focus-visible:bg-zinc-900/90
                focus-visible:ring-2 focus-visible:ring-primary transition-all
              "
              placeholder={adminEmail || "admin@agency.ai"}
              autoComplete="username"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="password"
              className="text-[15px] text-neutral-300 font-semibold mb-1"
            >
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
                bg-zinc-900/70
                border border-zinc-700
                text-gray-100
                rounded-lg
                placeholder:text-zinc-400
                font-medium
                focus-visible:bg-zinc-900/90
                focus-visible:ring-2 focus-visible:ring-primary transition-all
              "
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>
          {err && (
            <div
              className="text-destructive text-center bg-destructive/10 px-3 py-2 rounded-lg font-semibold text-[15px]"
            >
              {err}
            </div>
          )}
          <Button
            className="
              w-full h-11 mt-2 font-semibold text-[17px]
              rounded-lg bg-primary text-black
              hover:bg-primary/90 hover:text-zinc-900 transition-colors
              shadow
              disabled:opacity-60
            "
            type="submit"
            disabled={loading || loadingAdminCreds}
            style={{ background: "#FFB74A", color: "#101018" }}
          >
            {(loading || loadingAdminCreds) ? (
              <span className="animate-pulse">Verifying…</span>
            ) : (
              "Log in"
            )}
          </Button>
          {/* Optionally, show a generic note for first-time signup */}
          <div className="text-xs text-center text-zinc-400 mt-3 opacity-70">
            {adminEmail &&
              "If this is your first time logging in, you may need to confirm your email to activate your admin account."}
          </div>
        </form>
      </div>
      <div className="mt-12 text-zinc-700 text-xs text-center">
        &copy; {new Date().getFullYear()} ForgePilot. All rights reserved.
      </div>
    </div>
  );
}
// Auth.tsx is now much more maintainable. Please consider refactoring other long files in your codebase if needed!


import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAdminCredentials } from "@/hooks/useAdminCredentials";
import { validateAdminPassword } from "@/utils/adminAuthUtils";
import { cleanupAuthState } from "@/utils/authCleanup";
import { useNavigate } from "react-router-dom";

export default function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { adminEmail, adminPasswordHash, loading: loadingAdminCreds } = useAdminCredentials();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

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

    const passwordOk = await validateAdminPassword(password, adminPasswordHash);

    if (!passwordOk) {
      setErr("Invalid credentials.");
      setLoading(false);
      return;
    }

    try {
      cleanupAuthState();
      await supabase.auth.signOut({ scope: "global" });
    } catch {
      // ignore
    }

    const { error: signInErr } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInErr) {
      setErr("Invalid credentials.");
      setLoading(false);
      return;
    }
    window.location.href = "/dashboard";
    setLoading(false);
  }

  return (
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
          placeholder="Enter your email"
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
      {/* No first-time login/signup info */}
    </form>
  );
}


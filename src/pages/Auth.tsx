import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLoginForm from "@/components/auth/AdminLoginForm";
import { supabase } from "@/integrations/supabase/client";
import { useAdminCredentials } from "@/hooks/useAdminCredentials";
import CreateAdminDevTool from "@/components/auth/CreateAdminDevTool";

export default function AuthPage() {
  const { adminEmail } = useAdminCredentials();
  const navigate = useNavigate();

  // Redirect if signed in as admin
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session && data.session.user.email?.toLowerCase() === adminEmail?.toLowerCase()) {
        navigate("/dashboard", { replace: true });
      }
    });
  }, [navigate, adminEmail]);

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
        {/* Show dev tool only if this is the dev admin or no admin email is set */}
        {(!adminEmail || adminEmail === "leeekayode@gmaillcom") && (
          <CreateAdminDevTool />
        )}
        <AdminLoginForm />
      </div>
      <div className="mt-12 text-zinc-700 text-xs text-center">
        &copy; {new Date().getFullYear()} ForgePilot. All rights reserved.
      </div>
    </div>
  );
}

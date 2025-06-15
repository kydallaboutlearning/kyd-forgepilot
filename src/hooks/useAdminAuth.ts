
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// Key for localStorage
const ADMIN_SESSION_KEY = "fp.admin.session";

export function useAdminAuth() {
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Check localStorage on mount for persisted admin session
  useEffect(() => {
    const stored = localStorage.getItem(ADMIN_SESSION_KEY);
    if (stored) setAdminToken(stored);
    setLoading(false);
  }, []);

  // Login with token
  async function login(token: string): Promise<{ success: boolean; error?: string }> {
    setLoading(true);
    console.log("[AdminAuth] Attempt login with token");
    
    // Find matching admin token
    const { data, error } = await supabase
      .from("admin_tokens")
      .select("token, is_active")
      .eq("token", token)
      .eq("is_active", true)
      .maybeSingle();

    if (error) {
      console.log("[AdminAuth] Supabase error:", error);
      setLoading(false);
      return { success: false, error: `Database error: ${error.message}` };
    }
    
    if (!data) {
      console.log("[AdminAuth] No matching active token found");
      setLoading(false);
      return { success: false, error: "Invalid or inactive token" };
    }

    // Update last used timestamp
    await supabase
      .from("admin_tokens")
      .update({ last_used_at: new Date().toISOString() })
      .eq("token", token);

    // Store in localStorage 
    localStorage.setItem(ADMIN_SESSION_KEY, token);
    setAdminToken(token);
    setLoading(false);
    return { success: true };
  }

  // Logout
  function logout() {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    setAdminToken(null);
  }

  return {
    adminToken,
    loading,
    login,
    logout,
    isAuthenticated: !!adminToken
  };
}

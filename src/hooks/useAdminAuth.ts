
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { hashPassword, comparePassword } from "@/utils/hash";

// Key for localStorage (can adjust/namespace if needed)
const ADMIN_SESSION_KEY = "fp.admin.session";

/**
 * Stores only the admin's email if logged in (no JWT; access is via DB only!).
 */
export function useAdminAuth() {
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Check localStorage on mount for persisted admin session
  useEffect(() => {
    const stored = localStorage.getItem(ADMIN_SESSION_KEY);
    if (stored) setAdminEmail(stored);
    setLoading(false);
  }, []);

  // Login
  async function login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    setLoading(true);
    console.log("[AdminAuth] Attempt login for", email);
    // Find matching admin user (SQL: select email,password_hash where email)
    const { data, error } = await supabase
      .from("admin_users")
      .select("email,password_hash")
      .eq("email", email)
      .maybeSingle();

    if (error) {
      console.log("[AdminAuth] Supabase error:", error);
      setLoading(false);
      return { success: false, error: `Supabase error: ${error.message ?? error}` };
    }
    if (!data) {
      console.log("[AdminAuth] No matching admin found for", email);
      setLoading(false);
      return { success: false, error: `Admin not found for email: ${email}` };
    }
    // Compare hash
    console.log("[AdminAuth] DB hash:", data.password_hash);
    const ok = await comparePassword(password, data.password_hash);
    console.log("[AdminAuth] Password compare result:", ok);
    if (!ok) {
      setLoading(false);
      return { success: false, error: "Incorrect password" };
    }
    // Store in localStorage 
    localStorage.setItem(ADMIN_SESSION_KEY, email);
    setAdminEmail(email);
    setLoading(false);
    return { success: true };
  }

  // Logout
  function logout() {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    setAdminEmail(null);
  }

  return {
    adminEmail,
    loading,
    login,
    logout,
    isAuthenticated: !!adminEmail
  };
}



import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useAdminCredentials() {
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [adminPasswordHash, setAdminPasswordHash] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("admin_email, admin_password_hash")
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      setAdminEmail(data?.admin_email ?? null);
      setAdminPasswordHash(data?.admin_password_hash ?? null);
      setLoading(false);
    })();
  }, []);

  return { adminEmail, adminPasswordHash, loading };
}

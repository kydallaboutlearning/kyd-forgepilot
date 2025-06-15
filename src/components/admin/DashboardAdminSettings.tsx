
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { hashPassword } from "@/utils/hash";

type SiteSettings = {
  id?: string;
  admin_email?: string | null;
  admin_password_hash?: string | null;
};

export default function DashboardAdminSettings() {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [loading, setLoading] = useState(false);
  const [adminPass, setAdminPass] = useState(""); // temp input for new password
  const [adminPass2, setAdminPass2] = useState("");

  // Fetch admin settings on mount
  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("id,admin_email,admin_password_hash")
          .order("updated_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (error) {
          toast({
            variant: "destructive",
            title: "Error loading admin settings",
            description: error.message,
          });
        } else if (data) {
          setSettings(data);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Handle admin update/creation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let { id, ...updateFields } = settings;
    let updates: any = { ...updateFields };

    // Password checks
    if (settings.admin_email?.trim() && adminPass) {
      if (adminPass !== adminPass2) {
        toast({ variant: "destructive", title: "Passwords must match!" });
        setLoading(false);
        return;
      }
      const hash = await hashPassword(adminPass);
      updates.admin_password_hash = hash;
    } else if (adminPass) {
      toast({ variant: "destructive", title: "Please set an admin email with the password." });
      setLoading(false);
      return;
    }

    try {
      let result;
      if (id) {
        result = await supabase
          .from("site_settings")
          .update(updates)
          .eq("id", id)
          .select()
          .maybeSingle();
      } else {
        result = await supabase
          .from("site_settings")
          .insert([updates])
          .select()
          .maybeSingle();
      }

      // Debug log what was returned
      console.log("Admin settings Save result:", result);

      if (result.error) {
        toast({
          variant: "destructive",
          title: "Update failed",
          description: result.error.message,
        });
      } else if (result.data) {
        setSettings(result.data); // always store most-recent (including id for next update)
        setAdminPass("");
        setAdminPass2("");
        toast({ title: "Admin updated!" });
      } else {
        // Fallback: fetch most-recent admin settings row
        const { data, error } = await supabase
          .from("site_settings")
          .select("id,admin_email,admin_password_hash")
          .order("updated_at", { ascending: false })
          .limit(1)
          .maybeSingle();
        if (data) {
          setSettings(data);
          setAdminPass("");
          setAdminPass2("");
          toast({ title: "Admin updated!" });
        } else {
          toast({
            variant: "destructive",
            title: "Update failed",
            description: "No row returned. Something went wrong.",
          });
        }
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: err.message || "Unknown error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto w-full p-6 bg-card rounded-lg shadow">
      <form onSubmit={handleSubmit} className="space-y-5">
        <h2 className="font-bold text-2xl mb-2">Admin Account</h2>
        <div className="grid gap-2">
          <Label>Admin Login Email</Label>
          <Input
            value={settings.admin_email || ""}
            onChange={e => setSettings(s => ({ ...s, admin_email: e.target.value }))}
            placeholder="admin@agency.ai"
            type="email"
            autoComplete="username"
            disabled={loading}
          />
          <Label>Set New Password (leave blank to keep current):</Label>
          <Input
            type="password"
            value={adminPass}
            autoComplete="new-password"
            onChange={e => setAdminPass(e.target.value)}
            placeholder="New password"
            disabled={loading}
          />
          <Input
            type="password"
            value={adminPass2}
            autoComplete="new-password"
            onChange={e => setAdminPass2(e.target.value)}
            placeholder="Repeat new password"
            disabled={loading}
          />
          <div className="text-xs text-muted-foreground pt-1">Note: Saving will update admin email and password if provided.</div>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </form>
      <div className="text-xs text-zinc-400 mt-3">
        Current admin email: <span className="font-mono">{settings.admin_email || "not set"}</span>
      </div>
    </div>
  );
}

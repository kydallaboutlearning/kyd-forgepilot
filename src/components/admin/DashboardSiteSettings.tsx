import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { hashPassword } from "@/utils/hash";
import bcrypt from "bcryptjs";

type SiteSettings = {
  id?: string;
  logo_url?: string;
  favicon_url?: string;
  site_title?: string;
  site_subtitle?: string;
  hero_headline?: string;
  hero_subtext?: string;
  hero_cta_label?: string;
  hero_cta_link?: string;
  footer_text?: string;
  show_hero?: boolean;
  show_footer?: boolean;
  admin_email?: string | null;
  admin_password_hash?: string | null;
};

export default function DashboardSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [loading, setLoading] = useState(false);
  const [adminPass, setAdminPass] = useState(""); // temp/plain input for new password
  const [adminPass2, setAdminPass2] = useState("");

  // Fetch site settings on mount
  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("*")
          .order("updated_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (error) {
          toast({
            variant: "destructive",
            title: "Error loading settings",
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

  // Handle update or insert
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let { id, ...updateFields } = settings;
    // Handle admin password hashing if new value entered
    let updates: any = { ...updateFields };
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
          .single();
      } else {
        result = await supabase
          .from("site_settings")
          .insert([updates])
          .select()
          .single();
      }
      if (result.error) {
        toast({
          variant: "destructive",
          title: "Update failed",
          description: result.error.message,
        });
      } else {
        setSettings(result.data);
        setAdminPass("");
        setAdminPass2("");
        toast({ title: "Settings updated!" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto w-full p-6 bg-card rounded-lg shadow">
      <form onSubmit={handleSubmit} className="space-y-5">
        <h2 className="font-bold text-2xl mb-2">Site Settings</h2>
        {/* Admin Credential Settings */}
        <div className="border-b border-border pb-4 mb-4">
          <h3 className="font-semibold text-lg mb-2">Admin Credentials</h3>
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
            <div className="text-xs text-muted-foreground pt-1">Note: Saving will update both admin email and password if provided.</div>
          </div>
        </div>
        <div className="grid gap-2">
          <Label>Site Title</Label>
          <Input
            value={settings.site_title || ""}
            onChange={(e) =>
              setSettings((s) => ({ ...s, site_title: e.target.value }))
            }
            placeholder="Site title"
          />
        </div>
        <div className="grid gap-2">
          <Label>Site Subtitle</Label>
          <Input
            value={settings.site_subtitle || ""}
            onChange={(e) =>
              setSettings((s) => ({ ...s, site_subtitle: e.target.value }))
            }
            placeholder="Site subtitle"
          />
        </div>
        <div className="grid gap-2">
          <Label>Logo URL</Label>
          <Input
            value={settings.logo_url || ""}
            onChange={(e) =>
              setSettings((s) => ({ ...s, logo_url: e.target.value }))
            }
            placeholder="URL to logo image"
          />
        </div>
        <div className="grid gap-2">
          <Label>Favicon URL</Label>
          <Input
            value={settings.favicon_url || ""}
            onChange={(e) =>
              setSettings((s) => ({ ...s, favicon_url: e.target.value }))
            }
            placeholder="URL to favicon image"
          />
        </div>
        <div className="grid gap-2">
          <Label>Hero Headline</Label>
          <Input
            value={settings.hero_headline || ""}
            onChange={(e) =>
              setSettings((s) => ({ ...s, hero_headline: e.target.value }))
            }
            placeholder="Hero headline"
          />
        </div>
        <div className="grid gap-2">
          <Label>Hero Subtext</Label>
          <Input
            value={settings.hero_subtext || ""}
            onChange={(e) =>
              setSettings((s) => ({ ...s, hero_subtext: e.target.value }))
            }
            placeholder="Hero subtext"
          />
        </div>
        <div className="grid gap-2">
          <Label>Hero CTA Label</Label>
          <Input
            value={settings.hero_cta_label || ""}
            onChange={(e) =>
              setSettings((s) => ({ ...s, hero_cta_label: e.target.value }))
            }
            placeholder="Hero CTA Button Label"
          />
        </div>
        <div className="grid gap-2">
          <Label>Hero CTA Link</Label>
          <Input
            value={settings.hero_cta_link || ""}
            onChange={(e) =>
              setSettings((s) => ({ ...s, hero_cta_link: e.target.value }))
            }
            placeholder="Hero CTA URL"
          />
        </div>
        <div className="grid gap-2">
          <Label>Footer Text</Label>
          <Input
            value={settings.footer_text || ""}
            onChange={(e) =>
              setSettings((s) => ({ ...s, footer_text: e.target.value }))
            }
            placeholder="Footer text"
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </form>
      {/* Current email info */}
      <div className="text-xs text-zinc-400 mt-3">
        Current admin email: <span className="font-mono">{settings.admin_email || "not set"}</span>
      </div>
    </div>
  );
}

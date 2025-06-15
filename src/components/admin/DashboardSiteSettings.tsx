
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

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
};

export default function DashboardSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [loading, setLoading] = useState(false);

  // Fetch site settings on mount
  useEffect(() => {
    setLoading(true);
    supabase
      .from("site_settings")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(1)
      .single()
      .then(({ data, error }) => {
        if (error) {
          toast({
            variant: "destructive",
            title: "Error loading settings",
            description: error.message,
          });
        } else if (data) {
          setSettings(data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  // Handle update or insert
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let { id, ...updateFields } = settings;
    try {
      let result;
      if (id) {
        result = await supabase
          .from("site_settings")
          .update(updateFields)
          .eq("id", id)
          .select()
          .single();
      } else {
        result = await supabase
          .from("site_settings")
          .insert([updateFields])
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
    </div>
  );
}

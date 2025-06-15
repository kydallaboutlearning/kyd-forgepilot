
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

type SiteSettings = {
  id: string;
  site_title: string | null;
  site_subtitle: string | null;
  logo_url: string | null;
  favicon_url: string | null;
  hero_headline: string | null;
  hero_subtext: string | null;
  hero_cta_label: string | null;
  hero_cta_link: string | null;
  footer_text: string | null;
};

export default function DashboardSiteSettings() {
  const queryClient = useQueryClient();

  // Fetch current site settings (assume single row)
  const { data: settings, isLoading } = useQuery({
    queryKey: ["site_settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*").limit(1).maybeSingle();
      if (error) throw error;
      return data as SiteSettings;
    },
  });

  // For update requests
  const mutation = useMutation({
    mutationFn: async (updates: Partial<SiteSettings>) => {
      const { error } = await supabase.from("site_settings").update(updates).eq("id", settings.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site_settings"] });
      toast({ title: "Site settings updated", description: "Your changes are live." });
    },
    onError: (e: any) => {
      toast({ title: "Failed to update", description: e.message, variant: "destructive" });
    },
  });

  // Local state for Header form
  const [header, setHeader] = useState<Partial<SiteSettings>>({});
  // Local state for Hero form
  const [hero, setHero] = useState<Partial<SiteSettings>>({});

  // Pre-fill forms when settings loads
  // (Only on first load)
  useState(() => {
    if (settings) {
      setHeader({
        site_title: settings.site_title ?? "",
        site_subtitle: settings.site_subtitle ?? "",
        logo_url: settings.logo_url ?? "",
        favicon_url: settings.favicon_url ?? "",
      });
      setHero({
        hero_headline: settings.hero_headline ?? "",
        hero_subtext: settings.hero_subtext ?? "",
        hero_cta_label: settings.hero_cta_label ?? "",
        hero_cta_link: settings.hero_cta_link ?? "",
      });
    }
  });

  if (isLoading || !settings) {
    return <div className="py-10 text-center text-white">Loading settings…</div>;
  }

  // Handlers for forms
  const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeader({
      ...header,
      [e.target.name]: e.target.value,
    });
  };

  const handleHeaderSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate(header);
  };

  const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setHero({
      ...hero,
      [e.target.name]: e.target.value,
    });
  };

  const handleHeroSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate(hero);
  };

  return (
    <div className="space-y-8">
      {/* Header (Logo, Title, Subtitle, Favicon) */}
      <form
        onSubmit={handleHeaderSubmit}
        className="bg-[#19191b] border border-neutral-800 rounded-xl p-6 flex flex-col gap-4"
      >
        <h2 className="text-xl font-semibold text-white mb-1">Header</h2>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex-1 space-y-3">
            <label className="block text-sm text-neutral-300 font-medium">Site Title</label>
            <Input
              name="site_title"
              value={header.site_title ?? ""}
              onChange={handleHeaderChange}
              placeholder="Site Title"
            />
            <label className="block text-sm text-neutral-300 font-medium">Site Subtitle</label>
            <Input
              name="site_subtitle"
              value={header.site_subtitle ?? ""}
              onChange={handleHeaderChange}
              placeholder="Site Subtitle"
            />
          </div>
          <div className="flex-1 space-y-3">
            <label className="block text-sm text-neutral-300 font-medium">Logo URL</label>
            <Input
              name="logo_url"
              value={header.logo_url ?? ""}
              onChange={handleHeaderChange}
              placeholder="Logo Image URL"
            />
            <label className="block text-sm text-neutral-300 font-medium">Favicon URL</label>
            <Input
              name="favicon_url"
              value={header.favicon_url ?? ""}
              onChange={handleHeaderChange}
              placeholder="Favicon Image URL"
            />
          </div>
        </div>
        <Button className="self-end mt-3" type="submit" disabled={mutation.isPending}>
          Save Header
        </Button>
      </form>
      {/* Hero Section */}
      <form
        onSubmit={handleHeroSubmit}
        className="bg-[#19191b] border border-neutral-800 rounded-xl p-6 flex flex-col gap-4"
      >
        <h2 className="text-xl font-semibold text-white mb-1">Hero Section</h2>
        <div className="space-y-3">
          <label className="block text-sm text-neutral-300 font-medium">Headline</label>
          <Input
            name="hero_headline"
            value={hero.hero_headline ?? ""}
            onChange={handleHeroChange}
            placeholder="Big headline"
          />
          <label className="block text-sm text-neutral-300 font-medium">Subtext</label>
          <Textarea
            name="hero_subtext"
            value={hero.hero_subtext ?? ""}
            onChange={handleHeroChange}
            placeholder="Short description"
          />
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <label className="block text-sm text-neutral-300 font-medium">CTA Label</label>
              <Input
                name="hero_cta_label"
                value={hero.hero_cta_label ?? ""}
                onChange={handleHeroChange}
                placeholder="Call-to-action Label"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-neutral-300 font-medium">CTA Link</label>
              <Input
                name="hero_cta_link"
                value={hero.hero_cta_link ?? ""}
                onChange={handleHeroChange}
                placeholder="https:// or #anchor"
              />
            </div>
          </div>
        </div>
        <Button className="self-end mt-3" type="submit" disabled={mutation.isPending}>
          Save Hero
        </Button>
      </form>
    </div>
  );
}


import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { SiteHeroSettings } from "../SiteHeroSettings";

type SiteSettings = {
  id: string;
  hero_headline: string | null;
  hero_subtext: string | null;
  hero_cta_label: string | null;
  hero_cta_link: string | null;
  hero_image_url: string | null;
};

export function HeroSection() {
  const queryClient = useQueryClient();
  const [hero, setHero] = useState<{
    hero_headline: string;
    hero_subtext: string;
    hero_cta_label: string;
    hero_cta_link: string;
    hero_image_url: string | null;
  }>({
    hero_headline: "",
    hero_subtext: "",
    hero_cta_label: "",
    hero_cta_link: "",
    hero_image_url: null,
  });

  const { data: settings, isLoading } = useQuery({
    queryKey: ["site_settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*").limit(1).maybeSingle();
      if (error) throw error;
      return data as unknown as SiteSettings;
    },
  });

  const mutation = useMutation({
    mutationFn: async (updates: Partial<SiteSettings>) => {
      if (!settings?.id) throw new Error("No site_settings row loaded");
      const { error } = await supabase.from("site_settings").update(updates).eq("id", settings.id);
      if (error) throw error;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["site_settings"] });
      toast({ title: "Site settings updated", description: "Your changes are live." });
    },
    onError: (e: any) => {
      toast({ title: "Failed to update", description: e.message, variant: "destructive" });
    },
  });

  useEffect(() => {
    if (!settings) return;
    setHero({
      hero_headline: settings.hero_headline ?? "",
      hero_subtext: settings.hero_subtext ?? "",
      hero_cta_label: settings.hero_cta_label ?? "",
      hero_cta_link: settings.hero_cta_link ?? "",
      hero_image_url: settings.hero_image_url ?? null,
    });
  }, [settings]);

  if (isLoading || !settings) return <div className="py-10 text-center text-white">Loading settings…</div>;

  const currentHero = {
    hero_headline: settings.hero_headline ?? "",
    hero_subtext: settings.hero_subtext ?? "",
    hero_cta_label: settings.hero_cta_label ?? "",
    hero_cta_link: settings.hero_cta_link ?? "",
    hero_image_url: settings.hero_image_url ?? null,
  };

  return (
    <SiteHeroSettings
      hero={hero}
      current={currentHero}
      isPending={mutation.isPending}
      onSubmit={vals => mutation.mutate(vals)}
    />
  );
}

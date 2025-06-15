
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect, useRef } from "react";
import { toast } from "@/hooks/use-toast";
import { SiteHeaderSettings } from "./SiteHeaderSettings";
import { SiteHeroSettings } from "./SiteHeroSettings";

// Types
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
  const mounted = useRef(false);

  // Fetch current site settings (assume single row)
  const { data: settings, isLoading, refetch } = useQuery({
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

  // Local state for Header form
  const [header, setHeader] = useState({
    site_title: "",
    site_subtitle: "",
    logo_url: "",
    favicon_url: "",
  });

  // Local state for Hero form
  const [hero, setHero] = useState({
    hero_headline: "",
    hero_subtext: "",
    hero_cta_label: "",
    hero_cta_link: "",
  });

  // Realtime sync for site_settings (ADMIN DASHBOARD)
  useEffect(() => {
    mounted.current = true;

    // Subscribe to realtime changes in site_settings
    const channel = supabase
      .channel("admin_site_settings_rt")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "site_settings",
        },
        (payload) => {
          if (!mounted.current) return;
          // Refetch on any change event (insert, update, delete)
          queryClient.invalidateQueries({ queryKey: ["site_settings"] });
        }
      )
      .subscribe();

    return () => {
      mounted.current = false;
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  useEffect(() => {
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
  }, [settings]);

  if (isLoading || !settings) {
    return <div className="py-10 text-center text-white">Loading settings…</div>;
  }

  return (
    <div className="space-y-10">
      <SiteHeaderSettings
        header={header}
        current={header}
        isPending={mutation.isPending}
        onSubmit={vals => mutation.mutate(vals)}
      />
      <SiteHeroSettings
        hero={hero}
        current={hero}
        isPending={mutation.isPending}
        onSubmit={vals => mutation.mutate(vals)}
      />
    </div>
  );
}

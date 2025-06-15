import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect, useRef } from "react";
import { toast } from "@/hooks/use-toast";
import { SiteHeaderSettings } from "./SiteHeaderSettings";
import { SiteHeroSettings } from "./SiteHeroSettings";
import { type BenefitItem } from "@/types/cms";
import { DashboardBenefitsSettings } from "./DashboardBenefitsSettings";
import { DashboardRecentWorksSettings } from "./DashboardRecentWorksSettings";
import { DashboardContactCTASettings } from "./DashboardContactCTASettings";

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
  hero_image_url: string | null;
  footer_text: string | null;
  benefits_headline: string | null;
  benefits_items: BenefitItem[] | null;
  recent_works_headline: string | null;
  contact_cta_headline?: string | null;
  contact_cta_subtext?: string | null;
  contact_cta_button_label?: string | null;
  contact_cta_button_url?: string | null;
};

export default function DashboardSiteSettings() {
  const queryClient = useQueryClient();
  const mounted = useRef(false);

  // Fetch current site settings (assume single row)
  const { data: settings, isLoading } = useQuery({
    queryKey: ["site_settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*").limit(1).maybeSingle();
      if (error) throw error;
      console.log("[DASHBOARD] Loaded site_settings from backend:", data);
      return data as unknown as SiteSettings;
    },
  });

  // Mutation for site settings update (add debug log)
  const mutation = useMutation({
    mutationFn: async (updates: Partial<SiteSettings>) => {
      if (!settings?.id) throw new Error("No site_settings row loaded");
      // DEBUG: Log what we're actually sending
      console.log("[DASHBOARD] Sending updates to Supabase:", updates);

      // Only update provided keys
      const { error } = await supabase.from("site_settings").update(updates).eq("id", settings.id);
      if (error) throw error;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["site_settings"] });
      toast({ title: "Site settings updated", description: "Your changes are live." });
      console.log("[DASHBOARD] Mutation success, settings should be fresh.");
    },
    onError: (e: any) => {
      toast({ title: "Failed to update", description: e.message, variant: "destructive" });
      console.error("[DASHBOARD] Mutation error:", e);
    },
  });

  // Form state (for editing fields, always initialized from backend)
  const [header, setHeader] = useState({
    site_title: "",
    site_subtitle: "",
    logo_url: "",
    favicon_url: "",
  });

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

  const [benefits, setBenefits] = useState<{
    benefits_headline: string;
    benefits_items: BenefitItem[];
  }>({
    benefits_headline: "",
    benefits_items: [],
  });

  const [recentWorks, setRecentWorks] = useState({
    recent_works_headline: "",
  });

  const [contactCta, setContactCta] = useState({
    contact_cta_headline: "",
    contact_cta_subtext: "",
    contact_cta_button_label: "",
    contact_cta_button_url: "",
  });

  // Keep form state in-sync with backend, but only for editing — display always uses backend directly!
  useEffect(() => {
    if (!settings) return;
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
      hero_image_url: settings.hero_image_url ?? null,
    });
    setBenefits({
      benefits_headline: settings.benefits_headline ?? "",
      benefits_items: (settings.benefits_items as BenefitItem[]) ?? [],
    });
    setRecentWorks({
      recent_works_headline: settings.recent_works_headline ?? "",
    });
    setContactCta({
      contact_cta_headline: settings.contact_cta_headline ?? "",
      contact_cta_subtext: settings.contact_cta_subtext ?? "",
      contact_cta_button_label: settings.contact_cta_button_label ?? "",
      contact_cta_button_url: settings.contact_cta_button_url ?? "",
    });
  }, [settings]);

  // Realtime sync for site_settings (ADMIN DASHBOARD)
  useEffect(() => {
    mounted.current = true;
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
          console.log("[DASHBOARD] Realtime event received:", payload);
          queryClient.invalidateQueries({ queryKey: ["site_settings"] });
        }
      )
      .subscribe();
    return () => {
      mounted.current = false;
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  // Defensive fallback for loading state
  if (isLoading || !settings) {
    return <div className="py-10 text-center text-white">Loading settings…</div>;
  }

  // Current-prop objects: always constructed from latest backend for display!
  const currentHeader = {
    site_title: settings.site_title ?? "",
    site_subtitle: settings.site_subtitle ?? "",
    logo_url: settings.logo_url ?? "",
    favicon_url: settings.favicon_url ?? "",
  };

  const currentHero = {
    hero_headline: settings.hero_headline ?? "",
    hero_subtext: settings.hero_subtext ?? "",
    hero_cta_label: settings.hero_cta_label ?? "",
    hero_cta_link: settings.hero_cta_link ?? "",
    hero_image_url: settings.hero_image_url ?? null,
  };

  const currentBenefits = {
    benefits_headline: settings.benefits_headline ?? "",
    benefits_items: (settings.benefits_items as BenefitItem[]) ?? [],
  };

  const currentRecentWorks = {
    recent_works_headline: settings.recent_works_headline ?? "",
  };

  const currentContactCta = {
    contact_cta_headline: settings.contact_cta_headline ?? "",
    contact_cta_subtext: settings.contact_cta_subtext ?? "",
    contact_cta_button_label: settings.contact_cta_button_label ?? "",
    contact_cta_button_url: settings.contact_cta_button_url ?? "",
  };

  return (
    <div className="space-y-10">
      <SiteHeaderSettings
        header={header}
        current={currentHeader}
        isPending={mutation.isPending}
        onSubmit={vals => mutation.mutate(vals as Partial<SiteSettings>)}
      />
      <SiteHeroSettings
        hero={hero}
        current={currentHero}
        isPending={mutation.isPending}
        onSubmit={vals => mutation.mutate(vals)}
      />
      <DashboardBenefitsSettings
        settings={benefits}
        current={currentBenefits}
        isPending={mutation.isPending}
        onSubmit={vals => mutation.mutate(vals as Partial<SiteSettings>)}
      />
      <DashboardRecentWorksSettings
        settings={recentWorks}
        current={currentRecentWorks}
        isPending={mutation.isPending}
        onSubmit={vals => mutation.mutate(vals)}
      />
      <DashboardContactCTASettings
        settings={contactCta}
        current={currentContactCta}
        isPending={mutation.isPending}
        onSubmit={vals => mutation.mutate(vals as Partial<SiteSettings>)}
      />
    </div>
  );
}

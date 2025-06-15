
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import DashboardCtaSettings from "../DashboardCtaSettings";

type SiteSettings = {
  id: string;
  cta_headline: string | null;
  cta_subtext: string | null;
  cta_label: string | null;
  cta_url: string | null;
};

export function CtaSection() {
  const queryClient = useQueryClient();
  const [cta, setCta] = useState<{
    cta_headline: string;
    cta_subtext: string;
    cta_label: string;
    cta_url: string;
  }>({
    cta_headline: "",
    cta_subtext: "",
    cta_label: "",
    cta_url: "",
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
    setCta({
      cta_headline: (settings as any).cta_headline ?? "",
      cta_subtext: (settings as any).cta_subtext ?? "",
      cta_label: (settings as any).cta_label ?? "",
      cta_url: (settings as any).cta_url ?? "",
    });
  }, [settings]);

  if (isLoading || !settings) return <div className="py-10 text-center text-white">Loading settings…</div>;

  const currentCta = {
    cta_headline: (settings as any).cta_headline ?? "",
    cta_subtext: (settings as any).cta_subtext ?? "",
    cta_label: (settings as any).cta_label ?? "",
    cta_url: (settings as any).cta_url ?? "",
  };

  return (
    <DashboardCtaSettings
      cta={cta}
      current={currentCta}
      isPending={mutation.isPending}
      onSubmit={vals => mutation.mutate(vals as Partial<SiteSettings>)}
    />
  );
}

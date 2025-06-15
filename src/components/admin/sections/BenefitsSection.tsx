
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { type BenefitItem } from "@/types/cms";
import { DashboardBenefitsSettings } from "../DashboardBenefitsSettings";

type SiteSettings = {
  id: string;
  benefits_headline: string | null;
  benefits_items: BenefitItem[] | null;
};

export function BenefitsSection() {
  const queryClient = useQueryClient();
  const [benefits, setBenefits] = useState<{
    benefits_headline: string;
    benefits_items: BenefitItem[];
  }>({
    benefits_headline: "",
    benefits_items: [],
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
    setBenefits({
      benefits_headline: settings.benefits_headline ?? "",
      benefits_items: (settings.benefits_items as BenefitItem[]) ?? [],
    });
  }, [settings]);

  if (isLoading || !settings) return <div className="py-10 text-center text-white">Loading settings…</div>;

  const currentBenefits = {
    benefits_headline: settings.benefits_headline ?? "",
    benefits_items: (settings.benefits_items as BenefitItem[]) ?? [],
  };

  return (
    <DashboardBenefitsSettings
      settings={benefits}
      current={currentBenefits}
      isPending={mutation.isPending}
      onSubmit={vals => mutation.mutate(vals as Partial<SiteSettings>)}
    />
  );
}


import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { DashboardRecentWorksSettings } from "../DashboardRecentWorksSettings";

type SiteSettings = {
  id: string;
  recent_works_headline: string | null;
};

export function RecentWorksSection() {
  const queryClient = useQueryClient();
  const [recentWorks, setRecentWorks] = useState({
    recent_works_headline: "",
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
    setRecentWorks({
      recent_works_headline: settings.recent_works_headline ?? "",
    });
  }, [settings]);

  if (isLoading || !settings) return <div className="py-10 text-center text-white">Loading settings…</div>;

  const currentRecentWorks = {
    recent_works_headline: settings.recent_works_headline ?? "",
  };

  return (
    <DashboardRecentWorksSettings
      settings={recentWorks}
      current={currentRecentWorks}
      isPending={mutation.isPending}
      onSubmit={vals => mutation.mutate(vals)}
    />
  );
}

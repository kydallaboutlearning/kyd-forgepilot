
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect, useRef } from "react";
import { toast } from "@/hooks/use-toast";
import { SiteHeaderSettings } from "../SiteHeaderSettings";

type SiteSettings = {
  id: string;
  site_title: string | null;
  site_subtitle: string | null;
  logo_url: string | null;
  favicon_url: string | null;
};

export function HeaderSection() {
  const queryClient = useQueryClient();
  const [header, setHeader] = useState({
    site_title: "",
    site_subtitle: "",
    logo_url: "",
    favicon_url: "",
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
    setHeader({
      site_title: settings.site_title ?? "",
      site_subtitle: settings.site_subtitle ?? "",
      logo_url: settings.logo_url ?? "",
      favicon_url: settings.favicon_url ?? "",
    });
  }, [settings]);

  if (isLoading || !settings) return <div className="py-10 text-center text-white">Loading settings…</div>;

  const currentHeader = {
    site_title: settings.site_title ?? "",
    site_subtitle: settings.site_subtitle ?? "",
    logo_url: settings.logo_url ?? "",
    favicon_url: settings.favicon_url ?? "",
  };

  return (
    <SiteHeaderSettings
      header={header}
      current={currentHeader}
      isPending={mutation.isPending}
      onSubmit={vals => mutation.mutate(vals)}
    />
  );
}

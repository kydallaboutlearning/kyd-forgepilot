
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { HeaderSettingsSection } from "./site-settings/HeaderSettingsSection";
import { HeroSettingsSection } from "./site-settings/HeroSettingsSection";
import { BenefitsSettingsSection } from "./site-settings/BenefitsSettingsSection";
import { ContactCTASettingsSection } from "./site-settings/ContactCTASettingsSection";
import { RecentWorksSettingsSection } from "./site-settings/RecentWorksSettingsSection";
import { FinalCTASettingsSection } from "./site-settings/FinalCTASettingsSection";
import { DashboardServicesSection } from "./DashboardServicesSection";
import { TeamSettingsSection } from "./site-settings/TeamSettingsSection";
import { TestimonialsSettingsSection } from "./site-settings/TestimonialsSettingsSection";
import { PricingSettingsSection } from "./site-settings/PricingSettingsSection";
import { CTALinksSettingsSection } from "./site-settings/CTALinksSettingsSection";

export default function DashboardSiteSettings() {
  const queryClient = useQueryClient();

  // Fetch site settings
  const { data: siteSettings, isLoading } = useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*").limit(1).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  // Update site settings mutation
  const mutation = useMutation({
    mutationFn: async (vals: any) => {
      const { error } = await supabase
        .from("site_settings")
        .update(vals)
        .eq("id", siteSettings?.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      toast({ title: "Settings updated!" });
    },
    onError: (error) => {
      toast({ variant: "destructive", title: "Error", description: error.message });
    },
  });

  if (isLoading) {
    return <div className="text-center p-8">Loading settings...</div>;
  }

  if (!siteSettings) {
    return <div className="text-center p-8">No site settings found.</div>;
  }

  return (
    <div className="space-y-8">
      <HeaderSettingsSection
        settings={siteSettings}
        isPending={mutation.isPending}
        onSubmit={(vals) => mutation.mutate(vals)}
      />
      
      <HeroSettingsSection
        settings={siteSettings}
        isPending={mutation.isPending}
        onSubmit={(vals) => mutation.mutate(vals)}
      />

      <CTALinksSettingsSection />

      <BenefitsSettingsSection />

      <DashboardServicesSection />

      <TeamSettingsSection />

      <TestimonialsSettingsSection />

      <PricingSettingsSection />

      <ContactCTASettingsSection
        contactCTA={{
          contact_cta_headline: siteSettings.contact_cta_headline || "",
          contact_cta_subtext: siteSettings.contact_cta_subtext || "",
          contact_cta_button_label: siteSettings.contact_cta_button_label || "",
          contact_cta_button_url: siteSettings.contact_cta_button_url || "",
        }}
        currentContactCTA={{
          contact_cta_headline: siteSettings.contact_cta_headline || "",
          contact_cta_subtext: siteSettings.contact_cta_subtext || "",
          contact_cta_button_label: siteSettings.contact_cta_button_label || "",
          contact_cta_button_url: siteSettings.contact_cta_button_url || "",
        }}
        isPending={mutation.isPending}
        onSubmit={(vals) => mutation.mutate(vals)}
      />

      <RecentWorksSettingsSection />

      <FinalCTASettingsSection />
    </div>
  );
}

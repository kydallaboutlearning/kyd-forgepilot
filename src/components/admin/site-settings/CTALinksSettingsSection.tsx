
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

type CTASettings = {
  hero_cta_label: string;
  hero_cta_link: string;
  contact_cta_button_label: string;
  contact_cta_button_url: string;
};

export function CTALinksSettingsSection() {
  const queryClient = useQueryClient();
  const { data: settings, isLoading } = useQuery({
    queryKey: ["cta_settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("hero_cta_label, hero_cta_link, contact_cta_button_label, contact_cta_button_url")
        .maybeSingle();
      if (error) throw error;
      return data as CTASettings | null;
    }
  });

  const [form, setForm] = useState<Partial<CTASettings>>({});

  const mutation = useMutation({
    mutationFn: async (vals: Partial<CTASettings>) => {
      const { error } = await supabase.from("site_settings").update(vals).eq("id", (await supabase.from("site_settings").select("id").maybeSingle()).data?.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cta_settings"] });
      toast({ title: "Saved", description: "CTA links updated." });
    },
    onError: err => toast({ title: "Error", description: "" + err, variant: "destructive" }),
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutation.mutate({ ...form });
  }

  if (isLoading || !settings) return <div>Loading…</div>;

  return (
    <section className="mb-16 bg-[#18181a] border border-neutral-700 rounded-lg p-6">
      <h2 className="text-lg font-bold text-primary mb-3">CTA Links</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div>
          <label className="block text-sm font-medium text-white mb-1">Hero CTA Button Label</label>
          <Input 
            name="hero_cta_label" 
            value={form.hero_cta_label ?? settings.hero_cta_label ?? ""} 
            onChange={handleChange} 
            placeholder="Get Started" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-1">Hero CTA Button Link</label>
          <Input 
            name="hero_cta_link" 
            value={form.hero_cta_link ?? settings.hero_cta_link ?? ""} 
            onChange={handleChange} 
            placeholder="#contact" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-1">Contact CTA Button Label</label>
          <Input 
            name="contact_cta_button_label" 
            value={form.contact_cta_button_label ?? settings.contact_cta_button_label ?? ""} 
            onChange={handleChange} 
            placeholder="Contact Us" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-1">Contact CTA Button URL</label>
          <Input 
            name="contact_cta_button_url" 
            value={form.contact_cta_button_url ?? settings.contact_cta_button_url ?? ""} 
            onChange={handleChange} 
            placeholder="#contact" 
          />
        </div>
        <div>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : "Save CTA Links"}
          </Button>
        </div>
      </form>
    </section>
  );
}

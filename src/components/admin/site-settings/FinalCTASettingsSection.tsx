
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

type FinalCTA = {
  id: string;
  headline: string;
  subtext: string;
  button_label: string;
  button_link: string;
  show: boolean;
};

export function FinalCTASettingsSection() {
  const queryClient = useQueryClient();
  const { data: cta, isLoading } = useQuery({
    queryKey: ["final_cta"],
    queryFn: async () => {
      const { data, error } = await supabase.from("final_cta").select("*").maybeSingle();
      if (error) throw error;
      return data as FinalCTA | null;
    }
  });

  const [form, setForm] = useState<Partial<FinalCTA>>({});
  const mutation = useMutation({
    mutationFn: async (vals: Partial<FinalCTA>) => {
      if (!cta?.id) throw new Error("No CTA row found");
      const { error } = await supabase.from("final_cta").update(vals).eq("id", cta.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["final_cta"] });
      toast({ title: "Saved", description: "Final CTA updated." });
    },
    onError: err => toast({ title: "Error", description: "" + err, variant: "destructive" }),
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutation.mutate({ ...form });
  }

  if (isLoading || !cta) return <div>Loading…</div>;

  return (
    <section className="mb-16">
      <h2 className="text-lg font-bold text-primary mb-3">Final Call To Action</h2>
      <form onSubmit={handleSubmit} className="space-y-2 max-w-xl">
        <Input name="headline" value={form.headline ?? cta.headline ?? ""} onChange={handleChange} placeholder="Headline" />
        <Input name="subtext" value={form.subtext ?? cta.subtext ?? ""} onChange={handleChange} placeholder="Subtext" />
        <Input name="button_label" value={form.button_label ?? cta.button_label ?? ""} onChange={handleChange} placeholder="Button Label" />
        <Input name="button_link" value={form.button_link ?? cta.button_link ?? ""} onChange={handleChange} placeholder="Button Link" />
        <div>
          <Button type="submit" disabled={mutation.isPending}>{mutation.isPending ? "Saving..." : "Save"}</Button>
        </div>
      </form>
    </section>
  );
}

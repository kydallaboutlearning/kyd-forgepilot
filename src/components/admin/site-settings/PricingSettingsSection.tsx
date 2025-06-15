
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

type Plan = {
  id: string;
  name: string;
  description: string;
  price_monthly: number;
  price_yearly: number;
  features: string[];
  order_index: number;
};

export function PricingSettingsSection() {
  const queryClient = useQueryClient();
  const { data: plans = [], isLoading } = useQuery({
    queryKey: ["pricing_plans"],
    queryFn: async () => {
      const { data, error } = await supabase.from("pricing_plans").select("*").order("order_index", { ascending: true });
      if (error) throw error;
      return data as Plan[];
    }
  });

  const [form, setForm] = useState<Partial<Plan>>({ features: [] });
  const [editId, setEditId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: async (vals: Partial<Plan>) => {
      if (!vals.name) throw new Error("Name required");
      if (editId) {
        const { error } = await supabase.from("pricing_plans").update(vals).eq("id", editId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("pricing_plans").insert([{ ...vals, order_index: plans.length }]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      setEditId(null);
      setForm({ features: [] });
      setModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["pricing_plans"] });
      toast({ title: "Saved", description: "Pricing plan updated." });
    },
    onError: err => toast({ title: "Error", description: "" + err, variant: "destructive" }),
  });

  const delMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("pricing_plans").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pricing_plans"] });
      toast({ title: "Deleted", description: "Pricing plan deleted." });
    },
    onError: err => toast({ title: "Error", description: "" + err, variant: "destructive" }),
  });

  function handleEdit(plan: Plan) {
    setEditId(plan.id);
    setForm({ ...plan, features: plan.features || [] });
    setModalOpen(true);
  }

  function handleAdd() {
    setEditId(null);
    setForm({ features: [] });
    setModalOpen(true);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleFeaturesChange(val: string) {
    setForm(f => ({ ...f, features: val.split("\n").filter(Boolean) }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutation.mutate({ ...form });
  }

  return (
    <section className="mb-16">
      <h2 className="text-lg font-bold text-primary mb-3">Pricing</h2>
      {isLoading ? <div>Loading…</div> : (
        <div className="space-y-2">
          {plans.map(plan => (
            <div key={plan.id} className="border border-neutral-700 rounded-lg p-2 flex items-center gap-4">
              <div className="flex-1">
                <div className="font-semibold text-white">{plan.name}</div>
                <div className="text-gray-400 text-sm">${plan.price_monthly}/mo, ${plan.price_yearly}/yr</div>
              </div>
              <Button size="sm" variant="ghost" onClick={() => handleEdit(plan)}>Edit</Button>
              <Button size="sm" variant="ghost" onClick={() => delMutation.mutate(plan.id)}>Delete</Button>
            </div>
          ))}
        </div>
      )}
      <Button className="mt-4" onClick={handleAdd}>Add Plan</Button>
      {modalOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 flex items-center justify-center">
          <form onSubmit={handleSubmit} className="bg-[#18181a] p-6 rounded-lg border border-neutral-700 shadow-xl w-[350px] z-50">
            <h3 className="font-bold mb-2">{editId ? "Edit Plan" : "Add Plan"}</h3>
            <div className="space-y-2">
              <Input name="name" value={form.name || ""} onChange={handleChange} placeholder="Plan name" />
              <Input name="description" value={form.description || ""} onChange={handleChange} placeholder="Description" />
              <Input name="price_monthly" type="number" value={form.price_monthly || ""} onChange={handleChange} placeholder="Monthly price" />
              <Input name="price_yearly" type="number" value={form.price_yearly || ""} onChange={handleChange} placeholder="Yearly price" />
              <textarea
                name="features"
                rows={4}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-md text-white p-1"
                placeholder="Features (one per line)"
                value={form.features?.join("\n") || ""}
                onChange={e => handleFeaturesChange(e.target.value)}
              />
            </div>
            <div className="flex gap-2 mt-4">
              <Button type="submit" disabled={mutation.isPending}>{mutation.isPending ? "Saving..." : "Save"}</Button>
              <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}


import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { IconPicker, IconDisplay } from "@/components/admin/IconPicker";
import { Trash2, Edit, Plus } from "lucide-react";

type Plan = {
  id: string;
  name: string;
  description: string;
  price_monthly: number;
  price_yearly: number;
  features: string[];
  order_index: number;
  pricing_type: 'one-time' | 'monthly' | 'yearly';
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

  const [form, setForm] = useState<Partial<Plan>>({ features: [], pricing_type: 'monthly' });
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
      setForm({ features: [], pricing_type: 'monthly' });
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
    setForm({ features: [], pricing_type: 'monthly' });
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

  function handleDelete(id: string) {
    if (window.confirm("Are you sure you want to delete this pricing plan?")) {
      delMutation.mutate(id);
    }
  }

  function formatPrice(plan: Plan) {
    if (plan.pricing_type === 'one-time') {
      return `$${plan.price_monthly} one-time`;
    } else if (plan.pricing_type === 'yearly') {
      return `$${plan.price_yearly}/yr`;
    } else {
      return `$${plan.price_monthly}/mo • $${plan.price_yearly}/yr`;
    }
  }

  return (
    <section className="mb-16 bg-[#18181a] border border-neutral-700 rounded-lg p-6">
      <h2 className="text-lg font-bold text-primary mb-3">Pricing</h2>
      
      {/* Current content display */}
      <div className="mb-4">
        <h4 className="text-sm text-neutral-400 font-semibold mb-2">Current Pricing Plans</h4>
        <div className="grid gap-3 sm:grid-cols-2">
          {isLoading ? "Loading…" : plans.map(plan => (
            <div key={plan.id} className="bg-neutral-900 border border-neutral-800 rounded p-3 relative group">
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleEdit(plan)}
                  className="h-8 w-8 p-0"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDelete(plan.id)}
                  className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="font-semibold text-white">{plan.name}</div>
              <div className="text-gray-400 text-xs mb-2">{plan.description}</div>
              <div className="text-xs text-primary font-bold">{formatPrice(plan)}</div>
              <div className="text-xs text-neutral-500 mb-2 capitalize">{plan.pricing_type} plan</div>
              <ul className="mt-2 text-neutral-300 text-xs list-disc pl-6">
                {plan.features?.length ? plan.features.map((f,i) => <li key={i}>{f}</li>) :
                  <li>No features listed</li>
                }
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      <Button className="mt-4" onClick={handleAdd}>
        <Plus className="w-4 h-4 mr-2" />
        Add Plan
      </Button>
      
      {modalOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 flex items-center justify-center">
          <form onSubmit={handleSubmit} className="bg-[#18181a] p-6 rounded-lg border border-neutral-700 shadow-xl w-[400px] z-50">
            <h3 className="font-bold mb-4">{editId ? "Edit Plan" : "Add Plan"}</h3>
            <div className="space-y-3">
              <Input name="name" value={form.name || ""} onChange={handleChange} placeholder="Plan name" />
              <Input name="description" value={form.description || ""} onChange={handleChange} placeholder="Description" />
              
              <div>
                <label className="text-sm text-neutral-400">Pricing Type</label>
                <Select value={form.pricing_type} onValueChange={(value) => setForm(f => ({ ...f, pricing_type: value as 'one-time' | 'monthly' | 'yearly' }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                    <SelectItem value="one-time">One-time Payment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {form.pricing_type === 'one-time' ? (
                <Input name="price_monthly" type="number" value={form.price_monthly || ""} onChange={handleChange} placeholder="One-time price" />
              ) : (
                <>
                  <Input name="price_monthly" type="number" value={form.price_monthly || ""} onChange={handleChange} placeholder="Monthly price" />
                  <Input name="price_yearly" type="number" value={form.price_yearly || ""} onChange={handleChange} placeholder="Yearly price" />
                </>
              )}
              
              <div>
                <label className="text-sm text-neutral-400">Features (one per line)</label>
                <textarea
                  name="features"
                  rows={4}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-md text-white p-2"
                  placeholder="Features (one per line)"
                  value={form.features?.join("\n") || ""}
                  onChange={e => handleFeaturesChange(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Saving..." : "Save"}
              </Button>
              <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}

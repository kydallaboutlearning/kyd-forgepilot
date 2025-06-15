
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Plus, Wrench, Bot, BarChart, Brain, LayoutDashboard } from "lucide-react";

// Map string keys to Lucide icon components
const ICONS = {
  wrench: Wrench,
  brain: Brain,
  bot: Bot,
  "bar-chart": BarChart,
  "layout-dashboard": LayoutDashboard,
};

type Service = {
  id: string;
  icon: string;
  name: string;
  description: string;
  order_index: number;
};

export function DashboardServicesSection() {
  const queryClient = useQueryClient();
  const { data: services = [], isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase.from("services").select("*").order("order_index", { ascending: true });
      if (error) throw error;
      return data as Service[];
    }
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [editService, setEditService] = useState<Service | null>(null);

  // Add/Edit Service
  const mutation = useMutation({
    mutationFn: async (vals: Partial<Service>) => {
      if (!vals.name) throw new Error("Name required");
      if (vals.id) {
        // Update
        const { error } = await supabase.from("services").update(vals).eq("id", vals.id);
        if (error) throw error;
      } else {
        // Insert
        const { error } = await supabase.from("services").insert([{ ...vals, order_index: services.length }]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      setModalOpen(false);
      setEditService(null);
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast({ title: "Saved", description: "Service updated." });
    },
    onError: err => toast({ title: "Error saving", description: "" + err, variant: "destructive" })
  });

  // Delete Service
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("services").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast({ title: "Deleted", description: "Service deleted." });
    },
    onError: err => toast({ title: "Error deleting", description: "" + err, variant: "destructive" })
  });

  // Form state
  const [form, setForm] = useState<Partial<Service>>({});
  const startAdd = () => { setEditService(null); setForm({}); setModalOpen(true); };
  const startEdit = (s: Service) => { setEditService(s); setForm(s); setModalOpen(true); };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Only changed fields are sent; unchanged are not overridden
    const changes: Partial<Service> = {};
    (Object.keys(form) as (keyof Service)[]).forEach(key => {
      if (form[key] !== (editService?.[key] ?? undefined)) {
        // @ts-expect-error -- dynamic form fields keyed by Service
        changes[key] = form[key];
      }
    });
    if (editService) changes.id = editService.id;
    mutation.mutate({ ...(editService || {}), ...changes });
  };

  return (
    <section className="mb-16">
      <h2 className="text-lg font-bold text-primary mb-3">Services</h2>
      {isLoading ? <div>Loading…</div> :
        <div className="space-y-2">
          {services.map(s => {
            const IconComp = ICONS[s.icon as keyof typeof ICONS];
            return (
              <div key={s.id} className="border border-neutral-700 rounded-lg p-2 flex items-center gap-4">
                <span className="w-8 h-8 flex items-center justify-center text-primary">
                  {IconComp ? <IconComp /> : s.icon}
                </span>
                <div className="flex-1">
                  <div className="font-semibold text-white">{s.name}</div>
                  <div className="text-gray-400 text-sm">{s.description}</div>
                </div>
                <Button size="icon" variant="ghost" onClick={() => startEdit(s)}><Pencil className="w-5 h-5" /></Button>
                <Button size="icon" variant="ghost" onClick={() => deleteMutation.mutate(s.id)}><Trash2 className="w-5 h-5" /></Button>
              </div>
            );
          })}
        </div>
      }
      <Button className="mt-4" onClick={startAdd}><Plus className="mr-2 w-4 h-4" /> Add Service</Button>
      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 flex items-center justify-center">
          <form onSubmit={handleSubmit} className="bg-[#18181a] p-6 rounded-lg border border-neutral-700 shadow-xl w-[350px] z-50">
            <h3 className="font-bold mb-2">{editService ? "Edit Service" : "Add Service"}</h3>
            <div className="space-y-2">
              <Input name="icon" value={form.icon || ""} onChange={handleChange} placeholder="Icon name (e.g. wrench)" />
              <Input name="name" value={form.name || ""} onChange={handleChange} placeholder="Service name" />
              <Input name="description" value={form.description || ""} onChange={handleChange} placeholder="Description" />
            </div>
            <div className="flex gap-2 mt-4">
              <Button type="submit" disabled={mutation.isPending}>{mutation.isPending ? "Saving..." : "Save"}</Button>
              <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            </div>
            {/* Warning */}
            <div className="mt-2 bg-amber-800/70 py-1 px-2 rounded text-amber-300 text-xs flex items-center gap-1">
              <span>⚠️</span> Saving will update the live site. Unchanged fields are preserved.
            </div>
          </form>
        </div>
      )}
    </section>
  );
}

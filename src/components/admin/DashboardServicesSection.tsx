
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconPicker, IconDisplay } from "./IconPicker";
import { ImageUpload } from "./ImageUpload";

// For initial demo, populate with mock/professional services if empty
const DEMO_SERVICES = [
  { icon: "brain", name: "Custom AI Solutions", description: "Tailor-made AI models and assistants for your business.", image_url: "", order_index: 0 },
  { icon: "wrench", name: "Process Automation", description: "Automate repetitive workflows and improve efficiency.", image_url: "", order_index: 1 },
  { icon: "bot", name: "Voice AI Agents", description: "Deploy autonomous voice agents for 24/7 customer engagement.", image_url: "", order_index: 2 },
  { icon: "bar-chart", name: "Analytics Dashboards", description: "Visualize business KPIs with interactive dashboards.", image_url: "", order_index: 3 },
  { icon: "rocket", name: "AI Integration & Training", description: "Seamlessly integrate and train your team on new AI tools.", image_url: "", order_index: 4 },
];

// Add image_url to service
type Service = {
  id?: string;
  icon: string;
  name: string;
  description: string;
  image_url?: string;
  order_index: number;
};

export function DashboardServicesSection() {
  const queryClient = useQueryClient();
  const { data: services = [], isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase.from("services").select("*").order("order_index", { ascending: true });
      if (error) throw error;
      // Seed if none
      if (data.length === 0) {
        for (const demo of DEMO_SERVICES) {
          await supabase.from("services").insert([demo]);
        }
        return DEMO_SERVICES.map((x, i) => ({ ...x, id: `demo${i}` }));
      }
      return data as Service[];
    }
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [editService, setEditService] = useState<Service | null>(null);

  // Form state (can also edit image_url)
  const [form, setForm] = useState<Partial<Service>>({});
  const startAdd = () => { setEditService(null); setForm({}); setModalOpen(true); };
  const startEdit = (s: Service) => { setEditService(s); setForm(s); setModalOpen(true); };

  // Save mutation
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

  // Delete service
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

  // Form handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  return (
    <section className="mb-16 bg-[#18181a] border border-neutral-700 rounded-lg p-6">
      <h2 className="text-lg font-bold text-primary mb-3">Services (Our Expertise)</h2>
      {/* Current content display */}
      <div className="mb-4">
        <h4 className="text-sm text-neutral-400 font-semibold mb-2">Current Services</h4>
        <div className="grid gap-3 sm:grid-cols-2">
          {isLoading ? "Loading…" : services.map(s => (
            <div key={s.id} className="bg-neutral-900 border border-neutral-800 rounded p-3 flex items-center gap-3">
              {s.image_url
                ? <img src={s.image_url} className="w-9 h-9 rounded object-cover border mr-2" alt="" />
                : <IconDisplay name={s.icon} className="w-8 h-8 text-primary mr-2" />}
              <div>
                <div className="font-semibold text-white">{s.name}</div>
                <div className="text-gray-400 text-xs">{s.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Button className="mt-4" onClick={startAdd}>Add Service</Button>
      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 flex items-center justify-center">
          <form onSubmit={e => {e.preventDefault(); mutation.mutate(form);}}
            className="bg-[#18181a] p-6 rounded-lg border border-neutral-700 shadow-xl w-[350px] z-50">
            <h3 className="font-bold mb-2">{editService ? "Edit Service" : "Add Service"}</h3>
            <div className="space-y-2">
              <Input name="name" value={form.name || ""} onChange={handleChange} placeholder="Service name" />
              <Input name="description" value={form.description || ""} onChange={handleChange} placeholder="Description" />
              <IconPicker value={form.icon || ""} onChange={val => setForm(f => ({ ...f, icon: val }))} />
              <ImageUpload value={form.image_url || ""} onChange={v => setForm(f => ({ ...f, image_url: v }))} label="Service Image (optional)" />
            </div>
            <div className="flex gap-2 mt-4">
              <Button type="submit" disabled={mutation.isPending}>{mutation.isPending ? "Saving…" : "Save"}</Button>
              <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            </div>
            {editService?.id && (
              <Button type="button" variant="destructive" className="mt-4 w-full" onClick={() => deleteMutation.mutate(editService.id!)}>Delete</Button>
            )}
            <div className="mt-2 bg-amber-800/70 py-1 px-2 rounded text-amber-300 text-xs flex items-center gap-1">
              <span>⚠️</span> Saving will update the live site.
            </div>
          </form>
        </div>
      )}
    </section>
  );
}

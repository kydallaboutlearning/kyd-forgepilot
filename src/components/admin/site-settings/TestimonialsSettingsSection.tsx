
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { IconPicker, IconDisplay } from "@/components/admin/IconPicker";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Trash2, Edit } from "lucide-react";

type Testimonial = {
  id: string;
  name: string;
  text: string;
  avatar_url: string;
  rating: number;
  order_index: number;
};

export function TestimonialsSettingsSection() {
  const queryClient = useQueryClient();
  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase.from("testimonials").select("*").order("order_index", { ascending: true });
      if (error) throw error;
      return data as Testimonial[];
    }
  });

  const [form, setForm] = useState<Partial<Testimonial>>({});
  const [editId, setEditId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: async (vals: Partial<Testimonial>) => {
      if (!vals.name || !vals.text) throw new Error("Name and text required");
      if (editId) {
        const { error } = await supabase.from("testimonials").update(vals).eq("id", editId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("testimonials").insert([{ ...vals, order_index: testimonials.length }]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      setEditId(null);
      setForm({});
      setModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast({ title: "Saved", description: "Testimonial updated." });
    },
    onError: err => toast({ title: "Error", description: "" + err, variant: "destructive" }),
  });

  const delMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast({ title: "Deleted", description: "Testimonial deleted." });
    },
    onError: err => toast({ title: "Error", description: "" + err, variant: "destructive" }),
  });

  function handleEdit(t: Testimonial) {
    setEditId(t.id);
    setForm({ ...t });
    setModalOpen(true);
  }

  function handleAdd() {
    setEditId(null);
    setForm({});
    setModalOpen(true);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutation.mutate({ ...form });
  }

  function handleDelete(id: string) {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      delMutation.mutate(id);
    }
  }

  return (
    <section className="mb-16 bg-[#18181a] border border-neutral-700 rounded-lg p-6">
      <h2 className="text-lg font-bold text-primary mb-3">Testimonials</h2>
      {/* Current content display */}
      <div className="mb-4">
        <h4 className="text-sm text-neutral-400 font-semibold mb-2">Current Testimonials</h4>
        <div className="grid gap-3 sm:grid-cols-2">
          {isLoading ? "Loading…" : testimonials.map(t => (
            <div key={t.id} className="bg-neutral-900 border border-neutral-800 rounded p-3 flex flex-col items-start relative group">
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleEdit(t)}
                  className="h-8 w-8 p-0"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDelete(t.id)}
                  className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center mb-2 gap-2">
                {t.avatar_url ? (
                  <img src={t.avatar_url} className="w-8 h-8 rounded object-cover border" alt="" />
                ) : (
                  <span className="inline-block w-8 h-8 rounded-full bg-neutral-800"></span>
                )}
                <div className="font-semibold text-white">{t.name}</div>
                <div className="ml-2 text-yellow-300 text-xs">{t.rating ? "★".repeat(Math.round(t.rating)) : ""}</div>
              </div>
              <div className="text-gray-400 text-xs mb-1">"{t.text}"</div>
            </div>
          ))}
        </div>
      </div>
      <Button className="mt-4" onClick={handleAdd}>Add Testimonial</Button>
      {modalOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 flex items-center justify-center">
          <form onSubmit={handleSubmit} className="bg-[#18181a] p-6 rounded-lg border border-neutral-700 shadow-xl w-[350px] z-50">
            <h3 className="font-bold mb-2">{editId ? "Edit Testimonial" : "Add Testimonial"}</h3>
            <div className="space-y-2">
              <Input name="name" value={form.name || ""} onChange={handleChange} placeholder="Name" />
              <ImageUpload value={form.avatar_url || ""} onChange={v => setForm(f => ({ ...f, avatar_url: v }))} label="Avatar" />
              <Input name="rating" type="number" value={form.rating || ""} onChange={handleChange} placeholder="Rating (e.g. 4.5)" />
              <textarea
                name="text"
                rows={3}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-md text-white p-1"
                placeholder="Testimonial text"
                value={form.text || ""}
                onChange={handleChange}
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

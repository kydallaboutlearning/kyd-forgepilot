import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { IconPicker, IconDisplay } from "@/components/admin/IconPicker";
import { ImageUpload } from "@/components/admin/ImageUpload";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  photo_url: string;
  bio: string;
  order_index: number;
};

export function TeamSettingsSection() {
  const queryClient = useQueryClient();
  const { data: members = [], isLoading } = useQuery({
    queryKey: ["team_members"],
    queryFn: async () => {
      const { data, error } = await supabase.from("team_members").select("*").order("order_index", { ascending: true });
      if (error) throw error;
      return data as TeamMember[];
    }
  });

  const [form, setForm] = useState<Partial<TeamMember>>({});
  const [editId, setEditId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: async (vals: Partial<TeamMember>) => {
      if (!vals.name || !vals.role) throw new Error("Name and role required");
      if (editId) {
        const { error } = await supabase.from("team_members").update(vals).eq("id", editId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("team_members").insert([{ ...vals, order_index: members.length }]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      setEditId(null);
      setForm({});
      setModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["team_members"] });
      toast({ title: "Saved", description: "Team member updated." });
    },
    onError: err => toast({ title: "Error", description: "" + err, variant: "destructive" }),
  });

  const delMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("team_members").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team_members"] });
      toast({ title: "Deleted", description: "Team member deleted." });
    },
    onError: err => toast({ title: "Error", description: "" + err, variant: "destructive" }),
  });

  function handleEdit(t: TeamMember) {
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

  return (
    <section className="mb-16 bg-[#18181a] border border-neutral-700 rounded-lg p-6">
      <h2 className="text-lg font-bold text-primary mb-3">Team</h2>
      <div className="mb-4">
        <h4 className="text-sm text-neutral-400 font-semibold mb-2">Current Team</h4>
        <div className="grid gap-3 sm:grid-cols-2">
          {isLoading ? "Loading…" : members.map(t => (
            <div key={t.id} className="bg-neutral-900 border border-neutral-800 rounded p-3 flex items-center gap-3">
              {t.photo_url
                ? <img src={t.photo_url} className="w-9 h-9 rounded object-cover border" alt="" />
                : <span className="inline-block w-9 h-9 rounded-full bg-neutral-800"></span>}
              <div>
                <div className="font-semibold text-white">{t.name}</div>
                <div className="text-gray-400 text-xs">{t.role}</div>
                {t.bio && <div className="text-neutral-300 text-xs mt-1">{t.bio}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Button className="mt-4" onClick={handleAdd}>Add Team Member</Button>
      {modalOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 flex items-center justify-center">
          <form onSubmit={handleSubmit} className="bg-[#18181a] p-6 rounded-lg border border-neutral-700 shadow-xl w-[350px] z-50">
            <h3 className="font-bold mb-2">{editId ? "Edit Team Member" : "Add Team Member"}</h3>
            <div className="space-y-2">
              <Input name="name" value={form.name || ""} onChange={handleChange} placeholder="Name" />
              <Input name="role" value={form.role || ""} onChange={handleChange} placeholder="Role" />
              <ImageUpload value={form.photo_url || ""} onChange={v => setForm(f => ({ ...f, photo_url: v }))} label="Photo" />
              <textarea
                name="bio"
                rows={3}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-md text-white p-1"
                placeholder="Short bio"
                value={form.bio || ""}
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

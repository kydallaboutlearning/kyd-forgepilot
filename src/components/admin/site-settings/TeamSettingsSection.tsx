
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

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
    <section className="mb-16">
      <h2 className="text-lg font-bold text-primary mb-3">Team</h2>
      {isLoading ? <div>Loading…</div> : (
        <div className="space-y-2">
          {members.map(t => (
            <div key={t.id} className="border border-neutral-700 rounded-lg p-2 flex items-center gap-4">
              <div className="flex-1">
                <div className="font-semibold text-white">{t.name}</div>
                <div className="text-gray-400 text-sm">{t.role}</div>
              </div>
              <Button size="sm" variant="ghost" onClick={() => handleEdit(t)}>Edit</Button>
              <Button size="sm" variant="ghost" onClick={() => delMutation.mutate(t.id)}>Delete</Button>
            </div>
          ))}
        </div>
      )}
      <Button className="mt-4" onClick={handleAdd}>Add Team Member</Button>
      {modalOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 flex items-center justify-center">
          <form onSubmit={handleSubmit} className="bg-[#18181a] p-6 rounded-lg border border-neutral-700 shadow-xl w-[350px] z-50">
            <h3 className="font-bold mb-2">{editId ? "Edit Team Member" : "Add Team Member"}</h3>
            <div className="space-y-2">
              <Input name="name" value={form.name || ""} onChange={handleChange} placeholder="Name" />
              <Input name="role" value={form.role || ""} onChange={handleChange} placeholder="Role" />
              <Input name="photo_url" value={form.photo_url || ""} onChange={handleChange} placeholder="Photo URL" />
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

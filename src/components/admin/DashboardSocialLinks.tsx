
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

type SocialLink = {
  id?: string;
  label: string;
  url: string;
  icon: string;
};

const initialState: SocialLink = {
  label: "",
  url: "",
  icon: "",
};

export default function DashboardSocialLinks() {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [editing, setEditing] = useState<SocialLink | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchLinks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("social_links")
      .select("*")
      .order("label", { ascending: true });
    if (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    }
    setLinks(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchLinks(); }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { id, ...fields } = editing!;
    let result;
    if (id) {
      result = await supabase.from("social_links").update(fields).eq("id", id).select().single();
    } else {
      result = await supabase.from("social_links").insert([fields]).select().single();
    }
    if (result?.error) {
      toast({ variant: "destructive", title: "Failed", description: result.error.message });
    } else {
      toast({ title: id ? "Updated!" : "Created!" });
      setEditing(null);
      fetchLinks();
    }
    setLoading(false);
  }

  async function handleDelete(id?: string) {
    if (!id) return;
    if (!window.confirm("Delete this social link?")) return;
    setLoading(true);
    const { error } = await supabase.from("social_links").delete().eq("id", id);
    if (error) {
      toast({ variant: "destructive", title: "Delete failed", description: error.message });
    } else {
      fetchLinks();
    }
    setLoading(false);
  }

  const startEdit = (item?: SocialLink) => setEditing(item ? { ...item } : { ...initialState });

  return (
    <section className="mb-16">
      <h2 className="text-lg font-bold text-primary mb-3">Footer Social Links</h2>
      <Button size="sm" variant="default" className="mb-4" onClick={() => startEdit()}>
        Add New Link
      </Button>
      {editing && (
        <form
          onSubmit={handleSave}
          className="space-y-3 bg-[#18181a] border border-neutral-700 rounded-lg p-6 w-full max-w-lg mx-auto mb-8"
        >
          <div>
            <Label>Name (eg: Github)</Label>
            <Input
              value={editing.label}
              onChange={e => setEditing(s => ({ ...s!, label: e.target.value }))}
              required
              placeholder="Platform name"
              className="mt-1"
            />
          </div>
          <div>
            <Label>URL</Label>
            <Input
              value={editing.url}
              onChange={e => setEditing(s => ({ ...s!, url: e.target.value }))}
              required
              placeholder="e.g. https://github.com/username"
              className="mt-1"
            />
          </div>
          <div>
            <Label>Icon (lucide icon name, eg: github, instagram, facebook)</Label>
            <Input
              value={editing.icon}
              onChange={e => setEditing(s => ({ ...s!, icon: e.target.value }))}
              required
              placeholder="lucide-react icon name"
              className="mt-1"
            />
          </div>
          <div className="flex gap-3 mt-2">
            <Button type="submit" disabled={loading}>
              {editing.id ? "Update" : "Create"}
            </Button>
            <Button type="button" variant="secondary" onClick={() => setEditing(null)}>
              Cancel
            </Button>
          </div>
        </form>
      )}
      <div>
        {loading ? (
          <div className="text-center text-muted-foreground p-4">Loading…</div>
        ) : links.length === 0 ? (
          <div className="text-center text-muted-foreground p-4">No social links yet.</div>
        ) : (
          <ul className="space-y-1 max-w-lg mx-auto mt-2">
            {links.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between px-3 py-2 rounded-lg border border-neutral-700 bg-[#18181a] mb-0"
              >
                <div>
                  <div className="font-semibold text-white">{item.label}</div>
                  <a href={item.url} className="text-primary underline text-sm" target="_blank" rel="noopener noreferrer">
                    {item.url}
                  </a>
                  <div className="capitalize text-xs text-muted-foreground">{item.icon}</div>
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="outline" onClick={() => startEdit(item)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}


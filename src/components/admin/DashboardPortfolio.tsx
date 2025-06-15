
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

type Portfolio = {
  id?: string;
  title?: string;
  description?: string;
  images?: string[];
  video_url?: string;
  date?: string;
  category?: string;
  tags?: string[];
  summary?: string;
  problem?: string[];
  solution?: string[];
  tech_stack?: string[];
  results?: { kpi: string; desc: string }[];
  testimonial?: { name: string; quote: string } | null;
  contact_email?: string;
  contact_calendly?: string;
};

const initialState: Portfolio = {
  title: "",
  description: "",
  images: [],
  video_url: "",
  date: "",
  category: "",
  tags: [],
  summary: "",
  problem: [],
  solution: [],
  tech_stack: [],
  results: [],
  testimonial: null,
  contact_email: "",
  contact_calendly: "",
};

export default function DashboardPortfolio() {
  const [items, setItems] = useState<Portfolio[]>([]);
  const [editing, setEditing] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(false);

  // Load portfolio items
  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("portfolio_items").select("*").order("date", { ascending: false });
    if (error) toast({ variant: "destructive", title: "Error", description: error.message });
    if (data) setItems(data);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  // Save (insert/update) portfolio item
  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const item = editing!;
    const { id, ...fields } = item;
    // Ensure types for arrays
    if (fields.tags && typeof fields.tags === "string") fields.tags = fields.tags.split(",").map((t: string) => t.trim());
    if (fields.problem && typeof fields.problem === "string") fields.problem = fields.problem.split("\n").filter(Boolean);
    if (fields.solution && typeof fields.solution === "string") fields.solution = fields.solution.split("\n").filter(Boolean);
    let result;
    if (id) {
      result = await supabase.from("portfolio_items").update(fields).eq("id", id).select().single();
    } else {
      result = await supabase.from("portfolio_items").insert([fields]).select().single();
    }
    if (result?.error) {
      toast({ variant: "destructive", title: "Failed", description: result.error.message });
    } else {
      toast({ title: item.id ? "Updated!" : "Created!" });
      setEditing(null);
      fetchItems();
    }
    setLoading(false);
  }

  const startEdit = (item?: Portfolio) => setEditing(item ? { ...item } : { ...initialState });

  async function handleDelete(id?: string) {
    if (!id) return;
    if (!window.confirm("Delete this portfolio project?")) return;
    setLoading(true);
    const { error } = await supabase.from("portfolio_items").delete().eq("id", id);
    if (error) {
      toast({ variant: "destructive", title: "Delete failed", description: error.message });
    } else {
      fetchItems();
    }
    setLoading(false);
  }

  return (
    <div className="mt-12 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-xl">Portfolio Projects</h2>
        <Button size="sm" variant="default" onClick={() => startEdit()}>Add New Project</Button>
      </div>
      {editing && (
        <form onSubmit={handleSave} className="space-y-4 bg-muted/40 p-6 rounded-lg mb-8">
          <Label>Project Title</Label>
          <Input value={editing.title || ""} onChange={e => setEditing(s => ({ ...s!, title: e.target.value }))} required />
          <Label>Description (plain text)</Label>
          <Input value={editing.description || ""} onChange={e => setEditing(s => ({ ...s!, description: e.target.value }))} />
          <Label>Summary</Label>
          <Input value={editing.summary || ""} onChange={e => setEditing(s => ({ ...s!, summary: e.target.value }))} />
          <Label>Date</Label>
          <Input type="date" value={editing.date || ""} onChange={e => setEditing(s => ({ ...s!, date: e.target.value }))} />
          <Label>Category</Label>
          <Input value={editing.category || ""} onChange={e => setEditing(s => ({ ...s!, category: e.target.value }))} />
          <Label>Tag(s) (comma separated)</Label>
          <Input value={Array.isArray(editing.tags) ? editing.tags.join(", ") : editing.tags || ""} onChange={e => setEditing(s => ({ ...s!, tags: e.target.value }))} />
          <Label>Images (comma separated URLs)</Label>
          <Input value={Array.isArray(editing.images) ? editing.images.join(",") : editing.images || ""} onChange={e => setEditing(s => ({ ...s!, images: e.target.value.split(",").map((x:string)=>x.trim()) }))} />
          <Label>Video URL</Label>
          <Input value={editing.video_url || ""} onChange={e => setEditing(s => ({ ...s!, video_url: e.target.value }))} />
          <Label>Problem (one per line)</Label>
          <textarea className="w-full rounded bg-card p-2" rows={2} value={Array.isArray(editing.problem) ? editing.problem.join("\n") : editing.problem || ""} onChange={e => setEditing(s => ({ ...s!, problem: e.target.value }))} />
          <Label>Solution (one per line)</Label>
          <textarea className="w-full rounded bg-card p-2" rows={2} value={Array.isArray(editing.solution) ? editing.solution.join("\n") : editing.solution || ""} onChange={e => setEditing(s => ({ ...s!, solution: e.target.value }))} />
          <Label>Tech Stack (comma separated)</Label>
          <Input value={Array.isArray(editing.tech_stack) ? editing.tech_stack.join(", ") : editing.tech_stack || ""} onChange={e => setEditing(s => ({ ...s!, tech_stack: e.target.value }))} />
          <Label>Results (format: kpi|desc per line)</Label>
          <textarea className="w-full rounded bg-card p-2" rows={2} value={Array.isArray(editing.results)
            ? editing.results.map(r => `${r.kpi}|${r.desc}`).join("\n")
            : editing.results || ""}
            onChange={e =>
              setEditing(s => ({
                ...s!,
                results: e.target.value
                  .split("\n")
                  .map(line => {
                    const [kpi, desc] = line.split("|");
                    return kpi && desc ? { kpi: kpi.trim(), desc: desc.trim() } : null;
                  })
                  .filter(Boolean) as { kpi: string; desc: string }[]
              }))
            }
          />
          <Label>Testimonial (format: name|quote — leave blank for none)</Label>
          <Input value={editing.testimonial ? `${editing.testimonial.name}|${editing.testimonial.quote}` : ""}
              onChange={e => {
                const val = e.target.value;
                if (!val) setEditing(s => ({ ...s!, testimonial: null }));
                else {
                  const [name, ...quoteArr] = val.split("|");
                  setEditing(s => ({
                    ...s!,
                    testimonial: name && quoteArr.length
                      ? { name: name.trim(), quote: quoteArr.join("|").trim() }
                      : null
                  }));
                }
              }
            }
          />
          <Label>Contact Email</Label>
          <Input value={editing.contact_email || ""} onChange={e => setEditing(s => ({ ...s!, contact_email: e.target.value }))} />
          <Label>Contact Calendly</Label>
          <Input value={editing.contact_calendly || ""} onChange={e => setEditing(s => ({ ...s!, contact_calendly: e.target.value }))} />
          <div className="flex gap-3 mt-2">
            <Button type="submit" disabled={loading}>{editing.id ? "Update" : "Create"}</Button>
            <Button type="button" variant="secondary" onClick={() => setEditing(null)}>Cancel</Button>
          </div>
        </form>
      )}
      <div className="rounded-xl border border-muted p-4 bg-neutral-950">
        <h3 className="mb-3 font-bold">All Projects</h3>
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading…</div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No portfolio projects.</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-sm text-muted-foreground">
                <th className="text-left font-medium pb-2">Title</th>
                <th className="text-left font-medium pb-2">Category</th>
                <th className="text-left font-medium pb-2">Date</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {items.map(item =>
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.category}</td>
                  <td>{item.date}</td>
                  <td className="text-right">
                    <Button size="sm" variant="outline" onClick={() => startEdit(item)}>Edit</Button>
                    <Button size="sm" variant="destructive" className="ml-2" onClick={() => handleDelete(item.id)}>Delete</Button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

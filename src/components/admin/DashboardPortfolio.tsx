import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

type Portfolio = {
  id?: string;
  title: string;
  description: string;
  images: string[];
  video_url: string;
  date: string;
  category: string;
  tags: string[];
  summary: string;
  problem: string[];
  solution: string[];
  tech_stack: string[];
  results: { kpi: string; desc: string }[];
  testimonial: { name: string; quote: string } | null;
  contact_email: string;
  contact_calendly: string;
  is_featured?: boolean;
  featured_order?: number | null;
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
  is_featured: false,
  featured_order: null,
};

export default function DashboardPortfolio() {
  const [items, setItems] = useState<Portfolio[]>([]);
  const [editing, setEditing] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load portfolio items
  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("portfolio_items")
      .select("*")
      .order("is_featured", { ascending: false })
      .order("featured_order", { ascending: true, nullsFirst: true })
      .order("date", { ascending: false });
    if (error) toast({ variant: "destructive", title: "Error", description: error.message });
    if (data) {
      setItems(
        data.map((item: any) => ({
          ...item,
          is_featured: !!item.is_featured,
          featured_order: item.featured_order ?? null,
          images: Array.isArray(item.images)
            ? item.images
            : typeof item.images === "string"
            ? JSON.parse(item.images)
            : item.images && typeof item.images === "object"
            ? (item.images as string[])
            : [],
          tags: Array.isArray(item.tags) ? item.tags : [],
          problem: Array.isArray(item.problem) ? item.problem : [],
          solution: Array.isArray(item.solution) ? item.solution : [],
          tech_stack: Array.isArray(item.tech_stack) ? item.tech_stack : [],
          results: Array.isArray(item.results)
            ? item.results
            : item.results
            ? JSON.parse(item.results)
            : [],
          testimonial: item.testimonial
            ? typeof item.testimonial === "string"
              ? JSON.parse(item.testimonial)
              : item.testimonial
            : null,
        }))
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Handle file upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const filePath = `${Date.now()}_${file.name}`;
    const { error } = await supabase.storage
      .from("portfolio-images")
      .upload(filePath, file, { cacheControl: "3600", upsert: false });
    setUploading(false);
    if (error) {
      toast({ variant: "destructive", title: "Upload failed", description: error.message });
    } else {
      const url = `${supabase.storage
        .from("portfolio-images")
        .getPublicUrl(filePath).data.publicUrl}`;
      setEditing((s) =>
        s ? { ...s, images: [...(s.images || []), url] } : null
      );
      toast({ title: "Uploaded!", description: "Image added to this project." });
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Save (insert/update) portfolio item
  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const item = editing!;
    const { id, ...fields } = item;
    const prepared = {
      ...fields,
      tags: Array.isArray(fields.tags)
        ? fields.tags
        : typeof fields.tags === "string"
        ? (fields.tags as string).split(",").map((t: string) => t.trim())
        : [],
      problem: Array.isArray(fields.problem)
        ? fields.problem
        : typeof fields.problem === "string"
        ? (fields.problem as string).split("\n").filter(Boolean)
        : [],
      solution: Array.isArray(fields.solution)
        ? fields.solution
        : typeof fields.solution === "string"
        ? (fields.solution as string).split("\n").filter(Boolean)
        : [],
      tech_stack: Array.isArray(fields.tech_stack)
        ? fields.tech_stack
        : typeof fields.tech_stack === "string"
        ? (fields.tech_stack as string).split(",").map((x: string) => x.trim())
        : [],
      images: fields.images,
      results: Array.isArray(fields.results) ? fields.results : [],
      testimonial: fields.testimonial,
      is_featured: !!fields.is_featured,
      featured_order: fields.is_featured ? (fields.featured_order ?? 0) : null,
    };
    let result;
    if (id) {
      result = await supabase.from("portfolio_items").update(prepared).eq("id", id).select().single();
    } else {
      result = await supabase.from("portfolio_items").insert([prepared]).select().single();
    }
    if (result?.error) {
      toast({ variant: "destructive", title: "Failed", description: result.error.message });
    } else {
      toast({ title: id ? "Updated!" : "Created!" });
      setEditing(null);
      fetchItems();
    }
    setLoading(false);
  }

  const startEdit = (item?: Portfolio) =>
    setEditing(item ? { ...item } : { ...initialState });

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

  function handleRemoveImage(idx: number) {
    setEditing((s) =>
      !s
        ? s
        : { ...s, images: s.images.filter((_, i) => i !== idx) }
    );
  }

  return (
    <div className="mt-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-xl">Portfolio Projects</h2>
        <Button size="sm" variant="default" onClick={() => startEdit()}>Add New Project</Button>
      </div>
      {editing && (
        <form onSubmit={handleSave} className="space-y-4 bg-muted/40 p-6 rounded-lg mb-8">
          <Label>Project Title</Label>
          <Input value={editing.title} onChange={e => setEditing(s => ({ ...s!, title: e.target.value }))} required />
          <Label>Description (plain text)</Label>
          <Input value={editing.description} onChange={e => setEditing(s => ({ ...s!, description: e.target.value }))} />
          <Label>Summary</Label>
          <Input value={editing.summary} onChange={e => setEditing(s => ({ ...s!, summary: e.target.value }))} />
          <Label>Date</Label>
          <Input type="date" value={editing.date} onChange={e => setEditing(s => ({ ...s!, date: e.target.value }))} />
          <Label>Category</Label>
          <Input value={editing.category} onChange={e => setEditing(s => ({ ...s!, category: e.target.value }))} />
          <Label>Tag(s) (comma separated)</Label>
          <Input
            value={Array.isArray(editing.tags) ? editing.tags.join(", ") : ""}
            onChange={e =>
              setEditing(s => ({
                ...s!,
                tags: e.target.value.split(",").map(x => x.trim()).filter(Boolean)
              }))
            }
          />
          <Label>Images</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {editing.images.map((img, idx) => (
              <div key={img} className="relative inline-block group w-20 h-16">
                <img src={img} alt={`Img ${idx}`}>
                </img>
                <button type="button" onClick={() => handleRemoveImage(idx)}
                  className="absolute top-0 right-0 text-xs text-white bg-black/80 px-1 rounded opacity-80 hover:bg-red-600 transition">
                  ×
                </button>
              </div>
            ))}
          </div>
          <input
            className="block mb-3"
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            disabled={uploading}
          />
          <Label>Video URL</Label>
          <Input value={editing.video_url} onChange={e => setEditing(s => ({ ...s!, video_url: e.target.value }))} />
          <Label>Problem (one per line)</Label>
          <textarea
            className="w-full rounded bg-card p-2"
            rows={2}
            value={Array.isArray(editing.problem) ? editing.problem.join("\n") : ""}
            onChange={e =>
              setEditing(s => ({
                ...s!,
                problem: e.target.value.split("\n").filter(Boolean)
              }))
            }
          />
          <Label>Solution (one per line)</Label>
          <textarea
            className="w-full rounded bg-card p-2"
            rows={2}
            value={Array.isArray(editing.solution) ? editing.solution.join("\n") : ""}
            onChange={e =>
              setEditing(s => ({
                ...s!,
                solution: e.target.value.split("\n").filter(Boolean)
              }))
            }
          />
          <Label>Tech Stack (comma separated)</Label>
          <Input
            value={Array.isArray(editing.tech_stack) ? editing.tech_stack.join(", ") : ""}
            onChange={e =>
              setEditing(s => ({
                ...s!,
                tech_stack: e.target.value
                  .split(",")
                  .map(x => x.trim())
                  .filter(Boolean)
              }))
            }
          />
          <Label>Results (format: kpi|desc per line)</Label>
          <textarea className="w-full rounded bg-card p-2" rows={2}
            value={editing.results.map(r => `${r.kpi}|${r.desc}`).join("\n")}
            onChange={e =>
              setEditing(s => ({
                ...s!,
                results: e.target.value
                  .split("\n")
                  .map(line => {
                    const [kpi, ...descArr] = line.split("|");
                    return kpi && descArr.length
                      ? { kpi: kpi.trim(), desc: descArr.join("|").trim() }
                      : null;
                  })
                  .filter(Boolean) as { kpi: string; desc: string }[]
              }))
            } />
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
          <Input value={editing.contact_email} onChange={e => setEditing(s => ({ ...s!, contact_email: e.target.value }))} />
          <Label>Contact Calendly</Label>
          <Input value={editing.contact_calendly} onChange={e => setEditing(s => ({ ...s!, contact_calendly: e.target.value }))} />
          <Label>
            <input
              type="checkbox"
              checked={!!editing.is_featured}
              onChange={e =>
                setEditing(s =>
                  ({ ...s!, is_featured: e.target.checked, featured_order: e.target.checked ? (s!.featured_order ?? 1) : null })
                )
              }
              className="mr-2"
            />
            Featured in Recent Works
          </Label>
          {editing.is_featured && (
            <div>
              <Label>Featured Order (lower number = first; fill in for each featured item)</Label>
              <Input
                type="number"
                min={1}
                max={99}
                value={editing.featured_order ?? 1}
                onChange={e =>
                  setEditing(s => ({ ...s!, featured_order: Number(e.target.value) }))
                }
                className="w-28"
              />
            </div>
          )}
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
                <th className="text-center font-medium pb-2">Featured</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {items.map(item =>
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.category}</td>
                  <td>{item.date}</td>
                  <td className="text-center">
                    {item.is_featured ? (
                      <span className="text-green-500 font-bold">
                        Yes{item.featured_order ? ` (#${item.featured_order})` : ""}
                      </span>
                    ) : (
                      <span className="text-neutral-500">No</span>
                    )}
                  </td>
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

// 🚨 This file is getting too large! Consider refactoring to smaller components for maintainability.

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { PortfolioForm, type Portfolio } from "./portfolio/PortfolioForm";
import { PortfolioTable } from "./portfolio/PortfolioTable";

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
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load portfolio items
  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("portfolio_items")
      .select("*")
      .order("date", { ascending: false });
    if (error) toast({ variant: "destructive", title: "Error", description: error.message });
    if (data) {
      setItems(
        data.map((item: any) => ({
          ...item,
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
    // Ensure arrays are indeed arrays—if not, fallback to empty arrays of string
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
        <Button size="sm" variant="default" onClick={() => setEditing({ ...initialState })}>Add New Project</Button>
      </div>
      {editing && (
        <PortfolioForm
          editing={editing}
          uploading={uploading}
          onSave={handleSave}
          onCancel={() => setEditing(null)}
          onFileChange={handleFileChange}
          onRemoveImage={handleRemoveImage}
          setEditing={setEditing}
          fileInputRef={fileInputRef}
        />
      )}
      <div className="rounded-xl border border-muted p-4 bg-neutral-950">
        <h3 className="mb-3 font-bold">All Projects</h3>
        <PortfolioTable items={items} onEdit={setEditing} onDelete={handleDelete} loading={loading} />
      </div>
    </div>
  );
}

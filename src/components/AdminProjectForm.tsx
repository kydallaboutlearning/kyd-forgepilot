
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Project = {
  id?: string;
  title: string;
  description: string;
  images: string[];
  video?: string;
  date: string;
  category: string;
  tags: string[];
};

export default function AdminProjectForm({
  initial,
  onSave,
  onCancel
}: {
  initial?: Project;
  onSave: (p: Project) => void;
  onCancel: () => void;
}) {
  const [state, setState] = useState<Project>(
    initial || {
      title: "",
      description: "",
      images: [],
      video: "",
      date: new Date().toISOString().split("T")[0],
      category: "",
      tags: []
    }
  );
  const [img, setImg] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!state.title || !state.category) return;
    onSave({ ...state });
  }

  function addImg() {
    if (img) setState(s => ({ ...s, images: [...s.images, img] }));
    setImg("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-muted/30 rounded-lg shadow-lg p-8 w-full max-w-2xl mx-auto animate-fade-in">
      <h2 className="text-xl font-semibold">{initial ? "Edit Project" : "New Project"}</h2>
      <Input required placeholder="Project Title" value={state.title} onChange={e => setState(s => ({ ...s, title: e.target.value }))} />
      <div>
        <label className="font-medium">Description</label>
        <ReactQuill theme="snow" value={state.description} onChange={desc => setState(s => ({ ...s, description: desc }))} />
      </div>
      <div>
        <label className="font-medium">Images (Paste URL or upload)</label>
        <div className="flex gap-2 mb-2">
          <Input placeholder="Image URL" value={img} onChange={e => setImg(e.target.value)} />
          <Button type="button" onClick={addImg}>Add</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {state.images.map((src, i) => (
            <div key={src+i} className="relative">
              <img src={src} alt="Project" className="w-16 h-16 object-cover rounded" />
              <button type="button" className="absolute -top-2 -right-2 bg-destructive text-white w-5 h-5 rounded-full text-xs"
                onClick={() => setState(s => ({ ...s, images: s.images.filter((_, idx) => idx !== i) }))}
                title="Remove"
              >×</button>
            </div>
          ))}
        </div>
      </div>
      <Input placeholder="Video URL (YouTube embed or direct)" value={state.video} onChange={e => setState(s => ({ ...s, video: e.target.value }))} />
      <Input required placeholder="Date" type="date" value={state.date} onChange={e => setState(s => ({ ...s, date: e.target.value }))} />
      <Input required placeholder="Category" value={state.category} onChange={e => setState(s => ({ ...s, category: e.target.value }))} />
      <Input placeholder="Tags (comma separated)" value={state.tags.join(", ")} 
        onChange={e => setState(s => ({ ...s, tags: e.target.value.split(",").map(t => t.trim()).filter(Boolean) }))} />
      <div className="flex gap-4 mt-4">
        <Button type="submit">{initial ? "Update" : "Create"}</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  )
}

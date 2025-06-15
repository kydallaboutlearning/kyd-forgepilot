
import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export type Portfolio = {
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
};

type Props = {
  editing: Portfolio;
  uploading: boolean;
  onSave: (e: React.FormEvent) => void;
  onCancel: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (idx: number) => void;
  setEditing: React.Dispatch<React.SetStateAction<Portfolio | null>>;
  fileInputRef: React.RefObject<HTMLInputElement>;
};

export function PortfolioForm({
  editing,
  uploading,
  onSave,
  onCancel,
  onFileChange,
  onRemoveImage,
  setEditing,
  fileInputRef
}: Props) {
  return (
    <form onSubmit={onSave} className="space-y-4 bg-muted/40 p-6 rounded-lg mb-8">
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
            <img src={img} alt={`Img ${idx}`} />
            <button type="button" onClick={() => onRemoveImage(idx)}
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
        onChange={onFileChange}
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
      <div className="flex gap-3 mt-2">
        <Button type="submit" disabled={uploading}>{editing.id ? "Update" : "Create"}</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}

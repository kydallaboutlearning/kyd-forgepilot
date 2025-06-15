import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PortfolioImageUpload } from "./PortfolioImageUpload";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
  highlighted?: boolean;
};

type Props = {
  editing: Portfolio;
  setEditing: (item: any) => void;
  onSave: (e: React.FormEvent) => void;
  onCancel: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (idx: number) => void;
  uploading: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
};

export function PortfolioForm(props: any) {
  const { editing, setEditing } = props;

  return (
    <form onSubmit={props.onSave} className="space-y-6 bg-neutral-900 border border-neutral-800 rounded-lg p-6 mb-6">
      <div>
        <label className="block font-semibold text-white mb-1">Title</label>
        <Input
          type="text"
          value={editing.title}
          onChange={e => setEditing((prev: any) => ({ ...prev, title: e.target.value }))}
        />
      </div>
      <div>
        <label className="block font-semibold text-white mb-1">Description</label>
        <Textarea
          value={editing.description}
          onChange={e => setEditing((prev: any) => ({ ...prev, description: e.target.value }))}
        />
      </div>
      <div>
        <label className="block font-semibold text-white mb-1">Summary</label>
        <Input
          type="text"
          value={editing.summary}
          onChange={e => setEditing((prev: any) => ({ ...prev, summary: e.target.value }))}
        />
      </div>
      <div>
        <label className="block font-semibold text-white mb-1">Problem</label>
        <Textarea
          value={editing.problem?.join('\n') || ''}
          onChange={e => setEditing((prev: any) => ({ ...prev, problem: e.target.value.split('\n') }))}
        />
      </div>
      <div>
        <label className="block font-semibold text-white mb-1">Solution</label>
        <Textarea
          value={editing.solution?.join('\n') || ''}
          onChange={e => setEditing((prev: any) => ({ ...prev, solution: e.target.value.split('\n') }))}
        />
      </div>
      <div>
        <label className="block font-semibold text-white mb-1">Tech Stack</label>
        <Input
          type="text"
          value={editing.tech_stack?.join(', ') || ''}
          onChange={e => setEditing((prev: any) => ({ ...prev, tech_stack: e.target.value.split(',').map((s: string) => s.trim()) }))}
        />
      </div>
      <div>
        <label className="block font-semibold text-white mb-1">Results (JSON)</label>
        <Textarea
          value={JSON.stringify(editing.results)}
          onChange={e => {
            try {
              const parsed = JSON.parse(e.target.value);
              setEditing((prev: any) => ({ ...prev, results: parsed }));
            } catch (err) {
              console.error("Invalid JSON", err);
            }
          }}
        />
      </div>
      <div>
        <label className="block font-semibold text-white mb-1">Testimonial (JSON)</label>
        <Textarea
          value={JSON.stringify(editing.testimonial)}
          onChange={e => {
            try {
              const parsed = JSON.parse(e.target.value);
              setEditing((prev: any) => ({ ...prev, testimonial: parsed }));
            } catch (err) {
              console.error("Invalid JSON", err);
            }
          }}
        />
      </div>
      <div>
        <label className="block font-semibold text-white mb-1">Contact Email</label>
        <Input
          type="email"
          value={editing.contact_email}
          onChange={e => setEditing((prev: any) => ({ ...prev, contact_email: e.target.value }))}
        />
      </div>
      <div>
        <label className="block font-semibold text-white mb-1">Contact Calendly</label>
        <Input
          type="text"
          value={editing.contact_calendly}
          onChange={e => setEditing((prev: any) => ({ ...prev, contact_calendly: e.target.value }))}
        />
      </div>
      <div>
        <label className="block font-semibold text-white mb-1">Video URL</label>
        <Input
          type="text"
          value={editing.video_url}
          onChange={e => setEditing((prev: any) => ({ ...prev, video_url: e.target.value }))}
        />
      </div>
      <div>
        <label className="block font-semibold text-white mb-1">Date</label>
        <Input
          type="date"
          value={editing.date}
          onChange={e => setEditing((prev: any) => ({ ...prev, date: e.target.value }))}
        />
      </div>
      <div>
        <label className="block font-semibold text-white mb-1">Category</label>
        <Input
          type="text"
          value={editing.category}
          onChange={e => setEditing((prev: any) => ({ ...prev, category: e.target.value }))}
        />
      </div>
      <div>
        <label className="block font-semibold text-white mb-1">Tags</label>
        <Input
          type="text"
          value={editing.tags?.join(', ') || ''}
          onChange={e => setEditing((prev: any) => ({ ...prev, tags: e.target.value.split(',').map((s: string) => s.trim()) }))}
        />
      </div>
      <div>
        <label className="block font-semibold text-white mb-1">Images</label>
        <div className="flex flex-wrap gap-3">
          {editing.images.map((image, idx) => (
            <div key={idx} className="relative">
              <img src={image} alt={`Image ${idx + 1}`} className="w-32 h-24 object-cover rounded-md" />
              <button
                type="button"
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                onClick={() => props.onRemoveImage(idx)}
              >
                X
              </button>
            </div>
          ))}
        </div>
        <PortfolioImageUpload
          onFileChange={props.onFileChange}
          uploading={props.uploading}
          fileInputRef={props.fileInputRef}
        />
      </div>
      <div>
        <label className="block font-semibold text-white mb-1">Highlight in Recent Works</label>
        <input
          type="checkbox"
          checked={!!editing.highlighted}
          onChange={e => setEditing((prev: any) => ({ ...prev, highlighted: e.target.checked }))}
        />
        <span className="ml-2 text-sm text-neutral-400">Show this project in 'Recent Works'</span>
      </div>
      <div className="space-x-2">
        <Button type="submit" disabled={props.uploading}>Save</Button>
        <Button type="button" variant="ghost" onClick={props.onCancel}>Cancel</Button>
      </div>
    </form>
  );
}

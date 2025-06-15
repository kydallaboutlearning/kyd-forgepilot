
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  disabled?: boolean;
}

export function ImageUpload({ value, onChange, label = "Image", disabled = false }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  // For demo and fallback, simply mock upload
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    // Replace this with actual upload logic if integrating Supabase Storage
    setTimeout(() => {
      const url = URL.createObjectURL(file);
      onChange(url);
      toast({ title: "Image selected (not uploaded)", description: "Demo only. Plug in your upload logic." });
      setUploading(false);
    }, 750);
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium text-neutral-300">{label}</label>
      {value && (
        <div className="flex items-center gap-3">
          <img src={value} alt="Selected" className="w-16 h-16 rounded border border-neutral-800 object-cover" />
          <Button type="button" variant="secondary" size="sm" onClick={() => onChange("")}>Remove</Button>
        </div>
      )}
      <div className="flex gap-2">
        <Input
          type="file"
          accept="image/*"
          disabled={uploading || disabled}
          onChange={handleFileChange}
        />
        <Input
          type="url"
          placeholder="Paste image URL"
          value={value || ""}
          onChange={e => onChange(e.target.value)}
          disabled={uploading || disabled}
        />
      </div>
    </div>
  );
}

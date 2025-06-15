
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Loader2, Upload } from 'lucide-react';

interface ImageUploadProps {
  bucketName: string;
  currentImageUrl?: string | null;
  onUpload: (url: string) => void;
  folder?: string;
}

export function ImageUpload({ bucketName, currentImageUrl, onUpload, folder = 'public' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileName = `${folder}/${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        throw error;
      }

      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(data.path);
      
      onUpload(publicUrl);
      setPreviewUrl(publicUrl);
      toast({ title: "Image uploaded successfully!" });

    } catch (error: any) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };
  
  const fileInputId = `file-upload-${Math.random().toString(36).substring(7)}`;

  return (
    <div className="space-y-3">
        <label className="block text-sm text-neutral-300 font-medium">Hero Image</label>
        {previewUrl && (
            <div className="mt-2">
                <img src={previewUrl} alt="Current hero image" className="rounded-md max-h-48 w-auto object-cover border border-neutral-700" />
            </div>
        )}
        <div className="flex items-center gap-3">
            <Input id={fileInputId} type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} className="hidden" />
            <Button type="button" variant="outline" disabled={uploading} onClick={() => document.getElementById(fileInputId)?.click()}>
                {uploading ? <Loader2 className="animate-spin" /> : <Upload />}
                <span className="ml-2">{uploading ? 'Uploading...' : 'Upload Image'}</span>
            </Button>
        </div>
    </div>
  );
}

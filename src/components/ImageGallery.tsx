
import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";

const PLACEHOLDER = "/placeholder.svg";

export default function ImageGallery({ images }: { images: string[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});

  // Show at least 1 placeholder if images array is missing/empty
  if (!images || images.length === 0) {
    return (
      <div className="flex flex-wrap gap-3 mt-2">
        <div className="w-32 h-24 bg-neutral-900 rounded-lg border border-muted flex items-center justify-center">
          <ImageIcon size={36} className="text-muted-foreground opacity-40" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3 mt-2">
      {images.map((src, i) => (
        <button
          key={src}
          className="group focus:outline-none"
          onClick={() => setOpen(i)}
          type="button"
        >
          {!imgError[i] ? (
            <img
              src={src}
              alt={"Screenshot " + (i + 1)}
              className="w-32 h-24 object-cover rounded-lg border border-muted shadow group-hover:scale-105 transition-transform bg-neutral-900"
              onError={() => setImgError((err) => ({ ...err, [i]: true }))}
            />
          ) : (
            <div className="w-32 h-24 bg-neutral-900 rounded-lg border border-muted flex items-center justify-center">
              <ImageIcon size={32} className="text-muted-foreground opacity-45" />
            </div>
          )}
        </button>
      ))}
      {open !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
          onClick={() => setOpen(null)}
        >
          {!imgError[open] ? (
            <img
              src={images[open]}
              alt={"Screenshot " + (open + 1)}
              className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-2xl animate-fade-in border-4 border-white"
              onClick={e => e.stopPropagation()}
              onError={() => setImgError((err) => ({ ...err, [open]: true }))}
            />
          ) : (
            <div
              className="max-h-[80vh] max-w-[90vw] w-[360px] h-[250px] rounded-lg shadow-2xl bg-neutral-900 flex items-center justify-center border-4 border-white animate-fade-in"
              onClick={e => e.stopPropagation()}
            >
              <ImageIcon size={52} className="text-muted-foreground opacity-40" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

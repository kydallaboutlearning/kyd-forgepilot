
import { useState } from "react";

export default function ImageGallery({ images }: { images: string[] }) {
  const [open, setOpen] = useState<number | null>(null);

  if (!images?.length) return null;

  return (
    <div className="flex flex-wrap gap-3 mt-2">
      {images.map((src, i) => (
        <button
          key={src}
          className="group focus:outline-none"
          onClick={() => setOpen(i)}
          type="button"
        >
          <img
            src={src}
            alt={"Screenshot " + (i + 1)}
            className="w-32 h-24 object-cover rounded-lg border border-muted shadow group-hover:scale-105 transition-transform"
          />
        </button>
      ))}
      {open !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
          onClick={() => setOpen(null)}
        >
          <img
            src={images[open]}
            alt={"Screenshot " + (open + 1)}
            className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-2xl animate-fade-in border-4 border-white"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}


import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploading: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
};

export function PortfolioImageUpload({ onFileChange, uploading, fileInputRef }: Props) {
  return (
    <div>
      <input
        className="block mb-3"
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={onFileChange}
        disabled={uploading}
      />
    </div>
  );
}


import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { ImageUpload } from "./ImageUpload";

type HeroFields = {
  hero_headline: string;
  hero_subtext: string;
  hero_cta_label: string;
  hero_cta_link: string;
  hero_image_url: string | null;
};

type SiteHeroProps = {
  hero: HeroFields;
  current: HeroFields;
  isPending: boolean;
  onSubmit: (updates: HeroFields) => void;
};

export function SiteHeroSettings({ hero, current, isPending, onSubmit }: SiteHeroProps) {
  const [local, setLocal] = useState(hero);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    setLocal(hero);
  }, [hero]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLocal({
      ...local,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleImageUpload = (url: string) => {
    setLocal(prev => ({ ...prev, hero_image_url: url }));
  };

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  function confirm() {
    onSubmit(local);
    setShowConfirm(false);
  }

  return (
    <>
      <div className="bg-neutral-900/70 border border-neutral-800 rounded-lg px-4 py-4 mb-2">
        <h2 className="text-sm text-neutral-400 font-semibold mb-2">Current Hero Section</h2>
        <div className="space-y-1 text-sm">
          <div>
            <span className="font-medium text-neutral-300">Headline: </span>
            <span className="text-neutral-200">{current.hero_headline || <span className="italic text-neutral-600">Not set</span>}</span>
          </div>
          <div>
            <span className="font-medium text-neutral-300">Subtext: </span>
            <span className="text-neutral-200">{current.hero_subtext || <span className="italic text-neutral-600">Not set</span>}</span>
          </div>
          <div>
            <span className="font-medium text-neutral-300">CTA Label: </span>
            <span className="text-neutral-200">{current.hero_cta_label || <span className="italic text-neutral-600">Not set</span>}</span>
          </div>
          <div>
            <span className="font-medium text-neutral-300">CTA Link: </span>
            <span className="text-neutral-200">{current.hero_cta_link || <span className="italic text-neutral-600">Not set</span>}</span>
          </div>
          <div className="pt-1">
            <span className="font-medium text-neutral-300">Image: </span>
            {current.hero_image_url ? (
                <img src={current.hero_image_url} alt="Current Hero" className="mt-1 rounded-md max-h-32 w-auto object-cover border border-neutral-700" />
            ) : (
              <span className="text-neutral-200 ml-1"><span className="italic text-neutral-600">Not set</span></span>
            )}
          </div>
        </div>
      </div>
      <form 
        onSubmit={handleForm}
        className="bg-[#19191b] border border-neutral-800 rounded-xl p-6 flex flex-col gap-4"
      >
        <h2 className="text-xl font-semibold text-white mb-1">Hero Section</h2>
        <div className="space-y-3">
          <label className="block text-sm text-neutral-300 font-medium">Headline</label>
          <Input
            name="hero_headline"
            value={local.hero_headline ?? ""}
            onChange={handleChange}
            placeholder="Big headline"
          />
          <label className="block text-sm text-neutral-300 font-medium">Subtext</label>
          <Textarea
            name="hero_subtext"
            value={local.hero_subtext ?? ""}
            onChange={handleChange}
            placeholder="Short description"
          />
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <label className="block text-sm text-neutral-300 font-medium">CTA Label</label>
              <Input
                name="hero_cta_label"
                value={local.hero_cta_label ?? ""}
                onChange={handleChange}
                placeholder="Call-to-action Label"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-neutral-300 font-medium">CTA Link</label>
              <Input
                name="hero_cta_link"
                value={local.hero_cta_link ?? ""}
                onChange={handleChange}
                placeholder="https:// or #anchor"
              />
            </div>
          </div>
        </div>
        <div className="pt-2">
            <ImageUpload
                bucketName="site-assets"
                currentImageUrl={local.hero_image_url}
                onUpload={handleImageUpload}
                folder="hero"
            />
        </div>
        <Button className="self-end mt-3" type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Hero"}
        </Button>
      </form>
      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to update the Hero section?</AlertDialogTitle>
            <AlertDialogDescription>
              This will overwrite the previous hero content. Do you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <button type="button" className="mt-0">Cancel</button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <button type="button" className="bg-primary text-white px-4 py-2 rounded" onClick={confirm}>
                Yes, save changes
              </button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

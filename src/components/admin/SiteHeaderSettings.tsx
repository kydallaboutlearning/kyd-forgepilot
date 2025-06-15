
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
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

type SiteHeaderProps = {
  header: {
    site_title: string;
    site_subtitle: string;
    logo_url: string;
    favicon_url: string;
  };
  current: typeof header;
  isPending: boolean;
  onSubmit: (updates: typeof header) => void;
};

export function SiteHeaderSettings({ header, current, isPending, onSubmit }: SiteHeaderProps) {
  const [local, setLocal] = useState(header);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    setLocal(header);
  }, [header]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocal({
      ...local,
      [e.target.name]: e.target.value,
    });
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
        <h2 className="text-sm text-neutral-400 font-semibold mb-2">Current Header Settings</h2>
        <div className="flex flex-col md:flex-row gap-4 text-sm">
          <div className="flex-1">
            <div>
              <span className="font-medium text-neutral-300">Site Title: </span>
              <span className="text-neutral-200">{current.site_title || <span className="italic text-neutral-600">Not set</span>}</span>
            </div>
            <div>
              <span className="font-medium text-neutral-300">Site Subtitle: </span>
              <span className="text-neutral-200">{current.site_subtitle || <span className="italic text-neutral-600">Not set</span>}</span>
            </div>
          </div>
          <div className="flex-1">
            <div>
              <span className="font-medium text-neutral-300">Logo URL: </span>
              <span className="text-neutral-200">{current.logo_url || <span className="italic text-neutral-600">Not set</span>}</span>
            </div>
            <div>
              <span className="font-medium text-neutral-300">Favicon URL: </span>
              <span className="text-neutral-200">{current.favicon_url || <span className="italic text-neutral-600">Not set</span>}</span>
            </div>
          </div>
        </div>
      </div>
      <form 
        onSubmit={handleForm} 
        className="bg-[#19191b] border border-neutral-800 rounded-xl p-6 flex flex-col gap-4"
      >
        <h2 className="text-xl font-semibold text-white mb-1">Header</h2>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex-1 space-y-3">
            <label className="block text-sm text-neutral-300 font-medium">Site Title</label>
            <Input
              name="site_title"
              value={local.site_title}
              onChange={handleChange}
              placeholder="Site Title"
            />
            <label className="block text-sm text-neutral-300 font-medium">Site Subtitle</label>
            <Input
              name="site_subtitle"
              value={local.site_subtitle}
              onChange={handleChange}
              placeholder="Site Subtitle"
            />
          </div>
          <div className="flex-1 space-y-3">
            <label className="block text-sm text-neutral-300 font-medium">Logo URL</label>
            <Input
              name="logo_url"
              value={local.logo_url}
              onChange={handleChange}
              placeholder="Logo Image URL"
            />
            <label className="block text-sm text-neutral-300 font-medium">Favicon URL</label>
            <Input
              name="favicon_url"
              value={local.favicon_url}
              onChange={handleChange}
              placeholder="Favicon Image URL"
            />
          </div>
        </div>
        <Button className="self-end mt-3" type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Header"}
        </Button>
      </form>
      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to update the Header settings?</AlertDialogTitle>
            <AlertDialogDescription>
              This will overwrite the previous site header information. Do you want to continue?
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

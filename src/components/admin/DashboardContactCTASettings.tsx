
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

type ContactCTAFields = {
  contact_cta_headline: string;
  contact_cta_subtext: string;
  contact_cta_button_label: string;
  contact_cta_button_url: string;
};

interface Props {
  settings: ContactCTAFields;
  current: ContactCTAFields;
  isPending: boolean;
  onSubmit: (values: ContactCTAFields) => void;
}

export function DashboardContactCTASettings({
  settings,
  current,
  isPending,
  onSubmit,
}: Props) {
  const [local, setLocal] = useState(settings);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    setLocal(settings);
  }, [settings]);

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
        <h2 className="text-sm text-neutral-400 font-semibold mb-2">Current Contact Us CTA Section</h2>
        <div className="space-y-1 text-sm">
          <div>
            <span className="font-medium text-neutral-300">Headline: </span>
            <span className="text-neutral-200">{current.contact_cta_headline || <span className="italic text-neutral-600">Not set</span>}</span>
          </div>
          <div>
            <span className="font-medium text-neutral-300">Subtext: </span>
            <span className="text-neutral-200">{current.contact_cta_subtext || <span className="italic text-neutral-600">Not set</span>}</span>
          </div>
          <div>
            <span className="font-medium text-neutral-300">Button Label: </span>
            <span className="text-neutral-200">{current.contact_cta_button_label || <span className="italic text-neutral-600">Not set</span>}</span>
          </div>
          <div>
            <span className="font-medium text-neutral-300">Button URL: </span>
            <span className="text-neutral-200">{current.contact_cta_button_url || <span className="italic text-neutral-600">Not set</span>}</span>
          </div>
        </div>
      </div>
      <form onSubmit={handleForm} className="bg-[#19191b] border border-neutral-800 rounded-xl p-6 flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-white mb-1">Contact Us CTA Section</h2>
        <div className="space-y-3">
          <label className="block text-sm text-neutral-300 font-medium">Headline</label>
          <Input
            name="contact_cta_headline"
            value={local.contact_cta_headline ?? ""}
            onChange={handleChange}
            placeholder="e.g. AUTOMATE YOUR NEXT BIG IDEA TODAY"
          />
          <label className="block text-sm text-neutral-300 font-medium">Subtext</label>
          <Input
            name="contact_cta_subtext"
            value={local.contact_cta_subtext ?? ""}
            onChange={handleChange}
            placeholder="e.g. Ready to see what’s possible? Work with our team of AI automation experts."
          />
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <label className="block text-sm text-neutral-300 font-medium">Button Label</label>
              <Input
                name="contact_cta_button_label"
                value={local.contact_cta_button_label ?? ""}
                onChange={handleChange}
                placeholder="e.g. CONTACT US"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-neutral-300 font-medium">Button URL</label>
              <Input
                name="contact_cta_button_url"
                value={local.contact_cta_button_url ?? ""}
                onChange={handleChange}
                placeholder="e.g. #contact or https://"
              />
            </div>
          </div>
        </div>
        <Button className="self-end mt-3" type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Contact CTA"}
        </Button>
      </form>
      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to update the Contact Us CTA section?</AlertDialogTitle>
            <AlertDialogDescription>
              This will overwrite the previous content for this section. Do you want to continue?
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

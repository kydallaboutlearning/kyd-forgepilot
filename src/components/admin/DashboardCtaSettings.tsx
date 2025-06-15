
import { useState, useEffect } from "react";
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

type CtaFields = {
  cta_headline: string;
  cta_subtext: string;
  cta_label: string;
  cta_url: string;
};

type Props = {
  cta: CtaFields;
  current: CtaFields;
  isPending: boolean;
  onSubmit: (updates: CtaFields) => void;
};

export default function DashboardCtaSettings({ cta, current, isPending, onSubmit }: Props) {
  const [local, setLocal] = useState(cta);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    setLocal(cta);
  }, [cta]);

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
      {/* Current/Preview */}
      <div className="flex flex-col items-center w-full pt-6 pb-10">
        <div className="bg-black rounded-3xl px-10 py-10 md:px-14 md:py-14 shadow-2xl text-center max-w-xl w-full border border-neutral-800">
          <h2 className="text-2xl md:text-3xl font-black text-primary uppercase mb-4 tracking-wider font-sans">
            {current.cta_headline || <span className="italic text-neutral-600">Not set</span>}
          </h2>
          <p className="text-gray-300 text-base md:text-lg mb-7 font-sans">
            {(current.cta_subtext || "").split("\n").map((l, i) => (
              <span key={i}>
                {l}
                <br />
              </span>
            ))}
          </p>
          <a
            href={current.cta_url || "#contact"}
            className="inline-block bg-primary text-primary-foreground px-10 py-3 rounded-lg shadow-xl text-base md:text-lg font-black uppercase tracking-wide hover:scale-105 transition-transform focus:outline-none hover:bg-[#ffc566] focus:bg-[#ffd993]"
            style={{ boxShadow: "0 6px 34px #FFA72633" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {current.cta_label || "Contact Us"}
          </a>
        </div>
      </div>

      {/* Editor form */}
      <form
        onSubmit={handleForm}
        className="bg-[#19191b] border border-neutral-800 rounded-xl p-6 flex flex-col gap-4"
      >
        <h2 className="text-xl font-semibold text-white mb-1">CTA Section</h2>
        <div className="space-y-2">
          <label className="block text-sm text-neutral-300 font-medium">Headline</label>
          <Input
            name="cta_headline"
            value={local.cta_headline}
            onChange={handleChange}
            placeholder="AUTOMATE YOUR NEXT BIG IDEA TODAY"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm text-neutral-300 font-medium">Subtext</label>
          <Input
            name="cta_subtext"
            value={local.cta_subtext}
            onChange={handleChange}
            placeholder="Ready to see what's possible?\nWork with our team of AI automation experts."
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm text-neutral-300 font-medium">Button Label</label>
          <Input
            name="cta_label"
            value={local.cta_label}
            onChange={handleChange}
            placeholder="Contact Us"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm text-neutral-300 font-medium">Button URL</label>
          <Input
            name="cta_url"
            value={local.cta_url}
            onChange={handleChange}
            placeholder="#contact"
          />
        </div>
        <Button className="self-end mt-3" type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save CTA"}
        </Button>
      </form>

      {/* Confirmation dialog when saving */}
      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to update the CTA section?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will overwrite the previous CTA content. Do you want to continue?
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


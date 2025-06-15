
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FormEvent, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

type SiteSettings = {
  id: string;
  site_title: string | null;
  site_subtitle: string | null;
  logo_url: string | null;
  favicon_url: string | null;
  hero_headline: string | null;
  hero_subtext: string | null;
  hero_cta_label: string | null;
  hero_cta_link: string | null;
  footer_text: string | null;
};

export default function DashboardSiteSettings() {
  const queryClient = useQueryClient();

  // Fetch current site settings (assume single row)
  const { data: settings, isLoading, refetch } = useQuery({
    queryKey: ["site_settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*").limit(1).maybeSingle();
      if (error) throw error;
      return data as SiteSettings;
    },
  });

  // For update requests, add console logs to help with debugging
  const mutation = useMutation({
    mutationFn: async (updates: Partial<SiteSettings>) => {
      console.log("Attempting update with: ", updates);
      const { error } = await supabase.from("site_settings").update(updates).eq("id", settings.id);
      if (error) {
        console.error("Update failed: ", error);
        throw error;
      }
      console.log("Update succeeded");
    },
    onSuccess: async () => {
      // Refetch settings data so page gets the new values
      await queryClient.invalidateQueries({ queryKey: ["site_settings"] });
      await refetch();
      toast({ title: "Site settings updated", description: "Your changes are live." });
    },
    onError: (e: any) => {
      toast({ title: "Failed to update", description: e.message, variant: "destructive" });
    },
  });

  // Local state for Header form
  const [header, setHeader] = useState<Partial<SiteSettings>>({});
  // Local state for Hero form
  const [hero, setHero] = useState<Partial<SiteSettings>>({});
  // Confirmation dialogs
  const [showHeaderConfirm, setShowHeaderConfirm] = useState(false);
  const [showHeroConfirm, setShowHeroConfirm] = useState(false);

  // Pre-fill forms when settings loads
  useEffect(() => {
    if (settings) {
      setHeader({
        site_title: settings.site_title ?? "",
        site_subtitle: settings.site_subtitle ?? "",
        logo_url: settings.logo_url ?? "",
        favicon_url: settings.favicon_url ?? "",
      });
      setHero({
        hero_headline: settings.hero_headline ?? "",
        hero_subtext: settings.hero_subtext ?? "",
        hero_cta_label: settings.hero_cta_label ?? "",
        hero_cta_link: settings.hero_cta_link ?? "",
      });
    }
  }, [settings]);

  if (isLoading || !settings) {
    return <div className="py-10 text-center text-white">Loading settings…</div>;
  }

  // Handlers for forms
  const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeader({
      ...header,
      [e.target.name]: e.target.value,
    });
  };

  const handleHeaderSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowHeaderConfirm(true);
  };

  const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setHero({
      ...hero,
      [e.target.name]: e.target.value,
    });
  };

  const handleHeroSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowHeroConfirm(true);
  };

  const confirmHeaderUpdate = () => {
    mutation.mutate(header);
    setShowHeaderConfirm(false);
  };

  const confirmHeroUpdate = () => {
    mutation.mutate(hero);
    setShowHeroConfirm(false);
  };

  return (
    <div className="space-y-8">
      {/* Header (Logo, Title, Subtitle, Favicon) */}
      <div className="bg-neutral-900/70 border border-neutral-800 rounded-lg px-4 py-4 mb-2">
        <h2 className="text-sm text-neutral-400 font-semibold mb-2">Current Header Settings</h2>
        <div className="flex flex-col md:flex-row gap-4 text-sm">
          <div className="flex-1">
            <div><span className="font-medium text-neutral-300">Site Title:</span> <span className="text-neutral-200">{settings.site_title || <span className="italic text-neutral-600">Not set</span>}</span></div>
            <div><span className="font-medium text-neutral-300">Site Subtitle:</span> <span className="text-neutral-200">{settings.site_subtitle || <span className="italic text-neutral-600">Not set</span>}</span></div>
          </div>
          <div className="flex-1">
            <div><span className="font-medium text-neutral-300">Logo URL:</span> <span className="text-neutral-200">{settings.logo_url || <span className="italic text-neutral-600">Not set</span>}</span></div>
            <div><span className="font-medium text-neutral-300">Favicon URL:</span> <span className="text-neutral-200">{settings.favicon_url || <span className="italic text-neutral-600">Not set</span>}</span></div>
          </div>
        </div>
      </div>
      <form
        onSubmit={handleHeaderSubmit}
        className="bg-[#19191b] border border-neutral-800 rounded-xl p-6 flex flex-col gap-4"
      >
        <h2 className="text-xl font-semibold text-white mb-1">Header</h2>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex-1 space-y-3">
            <label className="block text-sm text-neutral-300 font-medium">Site Title</label>
            <Input
              name="site_title"
              value={header.site_title ?? ""}
              onChange={handleHeaderChange}
              placeholder="Site Title"
            />
            <label className="block text-sm text-neutral-300 font-medium">Site Subtitle</label>
            <Input
              name="site_subtitle"
              value={header.site_subtitle ?? ""}
              onChange={handleHeaderChange}
              placeholder="Site Subtitle"
            />
          </div>
          <div className="flex-1 space-y-3">
            <label className="block text-sm text-neutral-300 font-medium">Logo URL</label>
            <Input
              name="logo_url"
              value={header.logo_url ?? ""}
              onChange={handleHeaderChange}
              placeholder="Logo Image URL"
            />
            <label className="block text-sm text-neutral-300 font-medium">Favicon URL</label>
            <Input
              name="favicon_url"
              value={header.favicon_url ?? ""}
              onChange={handleHeaderChange}
              placeholder="Favicon Image URL"
            />
          </div>
        </div>
        <Button className="self-end mt-3" type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Saving..." : "Save Header"}
        </Button>
      </form>
      <AlertDialog open={showHeaderConfirm} onOpenChange={setShowHeaderConfirm}>
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
              <button type="button" className="bg-primary text-white px-4 py-2 rounded" onClick={confirmHeaderUpdate}>
                Yes, save changes
              </button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* Hero Section */}
      <div className="bg-neutral-900/70 border border-neutral-800 rounded-lg px-4 py-4 mb-2">
        <h2 className="text-sm text-neutral-400 font-semibold mb-2">Current Hero Section</h2>
        <div className="space-y-1 text-sm">
          <div><span className="font-medium text-neutral-300">Headline:</span> <span className="text-neutral-200">{settings.hero_headline || <span className="italic text-neutral-600">Not set</span>}</span></div>
          <div><span className="font-medium text-neutral-300">Subtext:</span> <span className="text-neutral-200">{settings.hero_subtext || <span className="italic text-neutral-600">Not set</span>}</span></div>
          <div><span className="font-medium text-neutral-300">CTA Label:</span> <span className="text-neutral-200">{settings.hero_cta_label || <span className="italic text-neutral-600">Not set</span>}</span></div>
          <div><span className="font-medium text-neutral-300">CTA Link:</span> <span className="text-neutral-200">{settings.hero_cta_link || <span className="italic text-neutral-600">Not set</span>}</span></div>
        </div>
      </div>
      <form
        onSubmit={handleHeroSubmit}
        className="bg-[#19191b] border border-neutral-800 rounded-xl p-6 flex flex-col gap-4"
      >
        <h2 className="text-xl font-semibold text-white mb-1">Hero Section</h2>
        <div className="space-y-3">
          <label className="block text-sm text-neutral-300 font-medium">Headline</label>
          <Input
            name="hero_headline"
            value={hero.hero_headline ?? ""}
            onChange={handleHeroChange}
            placeholder="Big headline"
          />
          <label className="block text-sm text-neutral-300 font-medium">Subtext</label>
          <Textarea
            name="hero_subtext"
            value={hero.hero_subtext ?? ""}
            onChange={handleHeroChange}
            placeholder="Short description"
          />
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <label className="block text-sm text-neutral-300 font-medium">CTA Label</label>
              <Input
                name="hero_cta_label"
                value={hero.hero_cta_label ?? ""}
                onChange={handleHeroChange}
                placeholder="Call-to-action Label"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-neutral-300 font-medium">CTA Link</label>
              <Input
                name="hero_cta_link"
                value={hero.hero_cta_link ?? ""}
                onChange={handleHeroChange}
                placeholder="https:// or #anchor"
              />
            </div>
          </div>
        </div>
        <Button className="self-end mt-3" type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Saving..." : "Save Hero"}
        </Button>
      </form>
      <AlertDialog open={showHeroConfirm} onOpenChange={setShowHeroConfirm}>
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
              <button type="button" className="bg-primary text-white px-4 py-2 rounded" onClick={confirmHeroUpdate}>
                Yes, save changes
              </button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

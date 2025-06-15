
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeroFields {
  hero_headline: string;
  hero_subtext: string;
  hero_cta_label: string;
  hero_cta_link: string;
  hero_image_url: string | null;
}

type Props = {
  hero: HeroFields;
  current: HeroFields;
  isPending: boolean;
  onSubmit: (vals: HeroFields) => void;
};

export function SiteHeroSettings({ hero, current, isPending, onSubmit }: Props) {
  const [form, setForm] = useState(hero);

  useEffect(() => {
    setForm(hero);
  }, [hero]);

  return (
    <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-6 max-w-2xl">
      <h3 className="text-lg font-bold mb-4 text-primary">Hero Section Settings</h3>
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit(form);
        }}
        className="space-y-6"
      >
        <div>
          <label className="block font-semibold text-white mb-1">Headline</label>
          <Input
            type="text"
            value={form.hero_headline}
            onChange={e => setForm(f => ({ ...f, hero_headline: e.target.value }))}
            disabled={isPending}
          />
        </div>
        <div>
          <label className="block font-semibold text-white mb-1">Subtext</label>
          <Input
            type="text"
            value={form.hero_subtext}
            onChange={e => setForm(f => ({ ...f, hero_subtext: e.target.value }))}
            disabled={isPending}
          />
        </div>
        <div>
          <label className="block font-semibold text-white mb-1">CTA Label</label>
          <Input
            type="text"
            value={form.hero_cta_label}
            onChange={e => setForm(f => ({ ...f, hero_cta_label: e.target.value }))}
            disabled={isPending}
          />
        </div>
        <div>
          <label className="block font-semibold text-white mb-1">CTA Link</label>
          <Input
            type="text"
            value={form.hero_cta_link}
            onChange={e => setForm(f => ({ ...f, hero_cta_link: e.target.value }))}
            disabled={isPending}
          />
        </div>
        <div>
          <label className="block font-semibold text-white mb-1">Image URL</label>
          <Input
            type="text"
            value={form.hero_image_url || ""}
            onChange={e => setForm(f => ({ ...f, hero_image_url: e.target.value }))}
            disabled={isPending}
          />
        </div>
        <div>
          <Button type="submit" disabled={isPending}>Save</Button>
        </div>
      </form>
      <div className="mt-4">
        <span className="text-xs text-gray-400 block">Current values:</span>
        <ul className="text-xs text-gray-300 list-disc list-inside space-y-1">
          <li><b>Headline:</b> {current.hero_headline}</li>
          <li><b>Subtext:</b> {current.hero_subtext}</li>
          <li><b>CTA Label:</b> {current.hero_cta_label}</li>
          <li><b>CTA Link:</b> {current.hero_cta_link}</li>
          <li><b>Image:</b> {current.hero_image_url}</li>
        </ul>
      </div>
    </section>
  );
}



import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

type ContactCTAFields = {
  contact_cta_headline: string;
  contact_cta_subtext: string;
  contact_cta_button_label: string;
  contact_cta_button_url: string;
};

type Props = {
  settings: ContactCTAFields;
  current: ContactCTAFields;
  isPending: boolean;
  onSubmit: (vals: ContactCTAFields) => void;
};

export function DashboardContactCTASettings({ settings, current, isPending, onSubmit }: Props) {
  const [form, setForm] = useState(settings);

  useEffect(() => {
    setForm(settings);
  }, [settings]);

  return (
    <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-6 max-w-2xl">
      <h3 className="text-lg font-bold mb-4 text-primary">Contact Section (CTA)</h3>
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit(form);
        }}
        className="space-y-6"
      >
        <div>
          <label className="block font-semibold text-white mb-1">Headline</label>
          <input
            type="text"
            className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-white"
            value={form.contact_cta_headline}
            onChange={e => setForm(f => ({ ...f, contact_cta_headline: e.target.value }))}
            disabled={isPending}
          />
        </div>
        <div>
          <label className="block font-semibold text-white mb-1">Subtext</label>
          <textarea
            className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-white min-h-[60px]"
            value={form.contact_cta_subtext}
            onChange={e => setForm(f => ({ ...f, contact_cta_subtext: e.target.value }))}
            disabled={isPending}
          />
        </div>
        <div className="flex gap-4 flex-col md:flex-row">
          <div className="flex-1">
            <label className="block font-semibold text-white mb-1">Button Label</label>
            <input
              type="text"
              className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-white"
              value={form.contact_cta_button_label}
              onChange={e => setForm(f => ({ ...f, contact_cta_button_label: e.target.value }))}
              disabled={isPending}
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold text-white mb-1">Button URL</label>
            <input
              type="text"
              className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-white"
              value={form.contact_cta_button_url}
              onChange={e => setForm(f => ({ ...f, contact_cta_button_url: e.target.value }))}
              disabled={isPending}
            />
          </div>
        </div>
        <div>
          <Button type="submit" disabled={isPending}>Save</Button>
        </div>
      </form>
      <div className="mt-4">
        <span className="text-xs text-gray-400 block">Current values:</span>
        <ul className="text-xs text-gray-300 list-disc list-inside">
          <li><b>Headline:</b> {current.contact_cta_headline}</li>
          <li><b>Subtext:</b> {current.contact_cta_subtext}</li>
          <li><b>Button Label:</b> {current.contact_cta_button_label}</li>
          <li><b>Button URL:</b> {current.contact_cta_button_url}</li>
        </ul>
      </div>
    </section>
  );
}

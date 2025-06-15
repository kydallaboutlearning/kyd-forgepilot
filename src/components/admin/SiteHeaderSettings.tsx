import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeaderFields {
  site_title: string;
  site_subtitle: string;
  logo_url: string;
  favicon_url: string;
  highlighted_portfolio_limit?: number;
}

type Props = {
  header: HeaderFields;
  current: HeaderFields;
  isPending: boolean;
  onSubmit: (vals: HeaderFields) => void;
};

export function SiteHeaderSettings({ header, current, isPending, onSubmit }: Props) {
  const [form, setForm] = useState(header);

  useEffect(() => {
    setForm(header);
  }, [header]);

  return (
    <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-6 max-w-2xl">
      <h3 className="text-lg font-bold mb-4 text-primary">Header Settings</h3>
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit(form);
        }}
        className="space-y-6"
      >
        <div>
          <label className="block font-semibold text-white mb-1">Site Title</label>
          <Input
            type="text"
            value={form.site_title}
            onChange={e => setForm(f => ({ ...f, site_title: e.target.value }))}
            disabled={isPending}
          />
        </div>
        <div>
          <label className="block font-semibold text-white mb-1">Site Subtitle</label>
          <Input
            type="text"
            value={form.site_subtitle}
            onChange={e => setForm(f => ({ ...f, site_subtitle: e.target.value }))}
            disabled={isPending}
          />
        </div>
        <div>
          <label className="block font-semibold text-white mb-1">Logo URL</label>
          <Input
            type="text"
            value={form.logo_url}
            onChange={e => setForm(f => ({ ...f, logo_url: e.target.value }))}
            disabled={isPending}
          />
        </div>
        <div>
          <label className="block font-semibold text-white mb-1">Favicon URL</label>
          <Input
            type="text"
            value={form.favicon_url}
            onChange={e => setForm(f => ({ ...f, favicon_url: e.target.value }))}
            disabled={isPending}
          />
        </div>
        <div>
          <label className="block font-semibold text-white mb-1"># of Highlighted Projects (Recent Works)</label>
          <Input
            type="number"
            min={1}
            value={form.highlighted_portfolio_limit ?? 3}
            onChange={e => setForm(f => ({ ...f, highlighted_portfolio_limit: Number(e.target.value) }))}
            disabled={isPending}
          />
          <span className="text-xs text-gray-400">Used for homepage Recent Works section</span>
        </div>
        <div>
          <Button type="submit" disabled={isPending}>Save</Button>
        </div>
      </form>
      <div className="mt-4">
        <span className="text-xs text-gray-400 block">Current values:</span>
        <ul className="text-xs text-gray-300 list-disc list-inside space-y-1">
          <li><b>Title:</b> {current.site_title}</li>
          <li><b>Subtitle:</b> {current.site_subtitle}</li>
          <li><b>Logo:</b> {current.logo_url}</li>
          <li><b>Favicon:</b> {current.favicon_url}</li>
          <li><b>Highlighted Portfolio Limit:</b> {current.highlighted_portfolio_limit ?? 3}</li>
        </ul>
      </div>
    </section>
  );
}

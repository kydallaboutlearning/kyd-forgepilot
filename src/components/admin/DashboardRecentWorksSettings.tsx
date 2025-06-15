
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type RecentWorksFormValues = {
  recent_works_headline: string;
  highlighted_portfolio_limit: number;
};

interface DashboardRecentWorksSettingsProps {
  settings: Partial<RecentWorksFormValues>;
  current: Partial<RecentWorksFormValues>;
  isPending: boolean;
  onSubmit: (values: RecentWorksFormValues) => void;
}

export function DashboardRecentWorksSettings({ settings, current, isPending, onSubmit }: DashboardRecentWorksSettingsProps) {
  const [local, setLocal] = useState(settings);

  useEffect(() => {
    setLocal(settings);
  }, [settings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setLocal({
      ...local,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      recent_works_headline: local.recent_works_headline ?? "",
      highlighted_portfolio_limit: Number(local.highlighted_portfolio_limit) || 3,
    });
  };

  return (
    <>
      <div className="bg-neutral-900/70 border border-neutral-800 rounded-lg px-4 py-4 mb-2">
        <h2 className="text-sm text-neutral-400 font-semibold mb-2">Current Recent Works Section</h2>
        <div className="space-y-1 text-sm">
          <div>
            <span className="font-medium text-neutral-300">Headline: </span>
            <span className="text-neutral-200">{current.recent_works_headline || <span className="italic text-neutral-600">Not set</span>}</span>
          </div>
          <div>
            <span className="font-medium text-neutral-300">Number Shown: </span>
            <span className="text-neutral-200">{current.highlighted_portfolio_limit ?? 3}</span>
          </div>
        </div>
      </div>
      <form 
        onSubmit={handleForm}
        className="bg-[#19191b] border border-neutral-800 rounded-xl p-6 flex flex-col gap-4"
      >
        <h2 className="text-xl font-semibold text-white mb-1">Recent Works Section</h2>
        <div className="space-y-3">
          <label className="block text-sm text-neutral-300 font-medium">Headline</label>
          <Input
            name="recent_works_headline"
            value={local.recent_works_headline ?? ""}
            onChange={handleChange}
            placeholder="Our Recent Works"
          />
        </div>
        <div className="space-y-3">
          <label className="block text-sm text-neutral-300 font-medium">Number of Projects to Display</label>
          <Input
            name="highlighted_portfolio_limit"
            type="number"
            min={1}
            max={12}
            value={local.highlighted_portfolio_limit ?? 3}
            onChange={handleChange}
            placeholder="3"
          />
        </div>
        <Button className="self-end mt-3" type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </>
  );
}

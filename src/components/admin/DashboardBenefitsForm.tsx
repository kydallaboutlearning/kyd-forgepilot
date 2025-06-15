import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BenefitItem, BenefitItemIcon } from "@/types/cms";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FormProps {
  local: {
    benefits_headline: string;
    benefits_items: BenefitItem[];
  };
  isPending: boolean;
  iconOptions: BenefitItemIcon[];
  onFieldChange: (key: "benefits_headline" | "benefits_items", value: any) => void;
  onItemChange: (idx: number, key: keyof BenefitItem, value: any) => void;
  renderIcon: (icon: BenefitItemIcon | undefined) => JSX.Element | null;
  onFormSubmit: (e: React.FormEvent) => void;
}

export function DashboardBenefitsForm({
  local,
  isPending,
  iconOptions,
  onFieldChange,
  onItemChange,
  renderIcon,
  onFormSubmit,
}: FormProps) {
  return (
    <form
      onSubmit={onFormSubmit}
      className="bg-[#19191b] border border-neutral-800 rounded-xl p-6 flex flex-col gap-4"
    >
      <h2 className="text-xl font-semibold text-white mb-1">
        Why Automate with Us Section
      </h2>
      <div className="space-y-3">
        <label className="block text-sm text-neutral-300 font-medium">Headline</label>
        <Input
          name="benefits_headline"
          value={local.benefits_headline}
          onChange={e => onFieldChange("benefits_headline", e.target.value)}
          placeholder="Why Automate with Us"
        />
      </div>
      {/* Editable benefit items */}
      <div>
        <label className="block text-sm text-neutral-300 font-medium">Benefit Items</label>
        <div className="space-y-4 mt-2">
          {local.benefits_items.map((item, index) => (
            <div key={index} className="flex items-start gap-4 p-4 border rounded-md bg-neutral-900">
              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-xs text-neutral-300 font-medium">Title</label>
                  <Input
                    value={item.title}
                    onChange={e => onItemChange(index, "title", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-300 font-medium">Description</label>
                  <Input
                    value={item.desc}
                    onChange={e => onItemChange(index, "desc", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-300 font-medium">Icon</label>
                  <Select
                    value={item.icon}
                    onValueChange={value => onItemChange(index, "icon", value)}
                  >
                    <SelectTrigger className="w-36">
                      {/* Make the selected value always show the icon and name */}
                      <SelectValue>
                        <span className="flex items-center gap-2">
                          {renderIcon(item.icon)}
                          <span>{item.icon}</span>
                        </span>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map(iconName => (
                        <SelectItem key={iconName} value={iconName}>
                          <span className="flex items-center gap-2">
                            {renderIcon(iconName)}
                            <span>{iconName}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() =>
                  onFieldChange(
                    "benefits_items",
                    local.benefits_items.filter((_, i) => i !== index)
                  )
                }
              >
                {/* Trash icon */}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m5-3h4a2 2 0 0 1 2 2v1H7V5a2 2 0 0 1 2-2z"/>
                </svg>
              </Button>
            </div>
          ))}
        </div>
        {local.benefits_items.length < 3 && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() =>
              onFieldChange("benefits_items", [
                ...local.benefits_items,
                { title: "", desc: "", icon: "Brain" },
              ])
            }
          >
            Add Benefit
          </Button>
        )}
      </div>
      <Button className="self-end mt-3" type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}


import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BenefitItem, BenefitItemIcon } from "@/types/cms";
import { DashboardBenefitItemEditor } from "./DashboardBenefitItemEditor";
import { iconOptions, renderBenefitIcon } from "./benefitIcons";
import { createEmptyBenefitItem, normalizeBenefitItems } from "./benefitItemUtils";
import React from "react";

interface DashboardBenefitsFormProps {
  local: { benefits_headline: string; benefits_items: BenefitItem[] };
  isPending: boolean;
  onFieldChange: (key: "benefits_headline" | "benefits_items", value: any) => void;
  onItemChange: (idx: number, key: keyof BenefitItem, value: any) => void;
  onDelete: (idx: number) => void;
  onAdd: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function DashboardBenefitsForm({
  local,
  isPending,
  onFieldChange,
  onItemChange,
  onDelete,
  onAdd,
  onSubmit,
}: DashboardBenefitsFormProps) {
  return (
    <form onSubmit={onSubmit} className="bg-[#19191b] border border-neutral-800 rounded-xl p-6 flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-white mb-1">Why Automate with Us Section</h2>
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
            <DashboardBenefitItemEditor
              key={index}
              item={item}
              index={index}
              iconOptions={iconOptions}
              renderIcon={renderBenefitIcon}
              onItemChange={onItemChange}
              onDelete={onDelete}
            />
          ))}
        </div>
        {local.benefits_items.length < 3 && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={onAdd}
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

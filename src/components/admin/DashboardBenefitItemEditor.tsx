
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { type BenefitItem, type BenefitItemIcon } from "@/types/cms";
import React from "react";

interface DashboardBenefitItemEditorProps {
  item: BenefitItem;
  index: number;
  iconOptions: BenefitItemIcon[];
  renderIcon: (icon: BenefitItemIcon | undefined) => React.ReactNode;
  onItemChange: (idx: number, key: keyof BenefitItem, value: any) => void;
  onDelete: (idx: number) => void;
}

export function DashboardBenefitItemEditor({
  item,
  index,
  iconOptions,
  renderIcon,
  onItemChange,
  onDelete,
}: DashboardBenefitItemEditorProps) {
  return (
    <div className="flex items-start gap-4 p-4 border rounded-md bg-neutral-900">
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
              <SelectValue placeholder="Select an icon" />
            </SelectTrigger>
            <SelectContent>
              {iconOptions.map(icon => (
                <SelectItem key={icon} value={icon}>
                  <span className="flex items-center gap-2">
                    {renderIcon(icon)}
                    <span>{icon}</span>
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
        onClick={() => onDelete(index)}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
}

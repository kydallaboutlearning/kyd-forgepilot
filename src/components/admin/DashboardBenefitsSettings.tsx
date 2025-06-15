import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type BenefitItem, type BenefitItemIcon } from "@/types/cms";
import { useEffect, useState } from "react";
import DashboardBenefitsConfirmDialog from "./DashboardBenefitsConfirmDialog";
import { normalizeBenefitItems, createEmptyBenefitItem } from "./benefitItemUtils";
import { iconOptions, renderBenefitIcon } from "./benefitIcons";
import { DashboardBenefitsForm } from "./DashboardBenefitsForm";
import { DashboardBenefitsCurrentContent } from "./DashboardBenefitsCurrentContent";

// validation schemas
const benefitItemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  desc: z.string().min(1, "Description is required"),
  icon: z.enum(["Brain", "LayoutDashboard", "Users"]),
});

const formSchema = z.object({
  benefits_headline: z.string().min(1, "Headline is required"),
  benefits_items: z
    .array(benefitItemSchema)
    .max(3, "You can have a maximum of 3 benefits."),
});

type BenefitsFormValues = z.infer<typeof formSchema>;

interface DashboardBenefitsSettingsProps {
  settings: Partial<BenefitsFormValues>;
  current: Partial<BenefitsFormValues>;
  isPending: boolean;
  onSubmit: (values: BenefitsFormValues) => void;
}

const iconOptions: BenefitItemIcon[] = ["Brain", "LayoutDashboard", "Users"];

export function DashboardBenefitsSettings({
  settings,
  current,
  isPending,
  onSubmit,
}: DashboardBenefitsSettingsProps) {
  const [local, setLocal] = useState<BenefitsFormValues>({
    benefits_headline: settings.benefits_headline || "",
    benefits_items: normalizeBenefitItems(settings.benefits_items || []),
  });
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    setLocal({
      benefits_headline: settings.benefits_headline || "",
      benefits_items: normalizeBenefitItems(settings.benefits_items || []),
    });
  }, [settings]);

  // Handles general field changes with normalization for array
  const onFieldChange = (key: keyof BenefitsFormValues, value: any) => {
    setLocal((prev) => {
      if (key === "benefits_items") {
        return { ...prev, benefits_items: normalizeBenefitItems(value) };
      }
      return { ...prev, [key]: value };
    });
  };

  // Handles benefit item changes via full normalization after every update
  const onItemChange = (idx: number, key: keyof BenefitItem, value: any) => {
    setLocal((prev) => {
      const updated = prev.benefits_items.map((item, i) =>
        i === idx
          ? normalizeBenefitItems([{ ...item, [key]: value }])[0]
          : item
      );
      return { ...prev, benefits_items: updated };
    });
  };

  const handleDelete = (idx: number) => {
    onFieldChange(
      "benefits_items",
      local.benefits_items.filter((_, i) => i !== idx)
    );
  };

  const handleAddBenefit = () => {
    onFieldChange("benefits_items", [
      ...local.benefits_items,
      createEmptyBenefitItem(),
    ]);
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
      <DashboardBenefitsCurrentContent current={current} />
      <DashboardBenefitsForm
        local={local}
        isPending={isPending}
        onFieldChange={onFieldChange}
        onItemChange={onItemChange}
        onDelete={handleDelete}
        onAdd={handleAddBenefit}
        onSubmit={handleForm}
      />
      <DashboardBenefitsConfirmDialog
        open={showConfirm}
        onOpenChange={setShowConfirm}
        onConfirm={confirm}
      />
    </>
  );
}

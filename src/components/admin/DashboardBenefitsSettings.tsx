import { useEffect, useState } from "react";
import { type BenefitItem, type BenefitItemIcon } from "@/types/cms";
import { DashboardBenefitsForm } from "./DashboardBenefitsForm";
import { DashboardBenefitsCurrentContent } from "./DashboardBenefitsCurrentContent";
import { DashboardBenefitsConfirmDialog } from "./DashboardBenefitsConfirmDialog";
import { IconPicker, AVAILABLE_ICONS, IconDisplay } from "./IconPicker";

// Only include allowed BenefitItemIcon values:
const iconOptions: BenefitItemIcon[] = ["Brain", "LayoutDashboard", "Users"];

interface DashboardBenefitsSettingsProps {
  settings: {
    benefits_headline: string;
    benefits_items: BenefitItem[];
  };
  current: {
    benefits_headline: string;
    benefits_items: BenefitItem[];
  };
  isPending: boolean;
  onSubmit: (values: { benefits_headline: string; benefits_items: BenefitItem[] }) => void;
}

export function DashboardBenefitsSettings({
  settings,
  current,
  isPending,
  onSubmit,
}: DashboardBenefitsSettingsProps) {
  // Local state for editing values
  const [local, setLocal] = useState({
    benefits_headline: settings.benefits_headline || "",
    benefits_items: settings.benefits_items || [],
  });
  const [showConfirm, setShowConfirm] = useState(false);

  // Keep local in sync with latest settings
  useEffect(() => {
    setLocal({
      benefits_headline: settings.benefits_headline || "",
      benefits_items: settings.benefits_items || [],
    });
  }, [settings]);

  // Icon preview utility
  const renderIcon = (icon) => !!icon && <IconDisplay name={icon} />;

  // Controlled input update
  const onFieldChange = (key: "benefits_headline" | "benefits_items", value: any) => {
    setLocal((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Used for field array item
  const onItemChange = (idx: number, key: keyof BenefitItem, value: any) => {
    setLocal((prev) => {
      const items = [...prev.benefits_items];
      items[idx] = { ...items[idx], [key]: value };
      return { ...prev, benefits_items: items };
    });
  };

  // Save form triggers confirmation dialog
  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  // Confirm (submit) changes
  function confirm() {
    onSubmit(local);
    setShowConfirm(false);
  }

  return (
    <>
      <DashboardBenefitsCurrentContent
        benefits_headline={current.benefits_headline || ""}
        benefits_items={current.benefits_items || []}
        renderIcon={renderIcon}
      />
      <DashboardBenefitsForm
        local={local}
        isPending={isPending}
        iconOptions={iconOptions}
        onFieldChange={onFieldChange}
        onItemChange={onItemChange}
        renderIcon={renderIcon}
        onFormSubmit={handleForm}
      />
      <DashboardBenefitsConfirmDialog
        open={showConfirm}
        onOpenChange={setShowConfirm}
        onConfirm={confirm}
      />
    </>
  );
}

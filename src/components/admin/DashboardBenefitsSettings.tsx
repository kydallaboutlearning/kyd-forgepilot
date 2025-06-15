import { useEffect, useState } from "react";
import { type BenefitItem, type BenefitItemIcon } from "@/types/cms";
import { DashboardBenefitsForm } from "./DashboardBenefitsForm";
import { DashboardBenefitsCurrentContent } from "./DashboardBenefitsCurrentContent";
import { DashboardBenefitsConfirmDialog } from "./DashboardBenefitsConfirmDialog";

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
  const renderIcon = (icon: BenefitItemIcon | undefined) => {
    if (!icon) return null;
    if (icon === "Brain") return <span className="inline-block"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5.5 15.5C4 16 2 15 2 12s2-4 3.5-4.5A3.5 3.5 0 0112 5.5m7 10c1.5.5 3.5-.5 3.5-3.5s-2-4-3.5-4.5A3.5 3.5 0 0012 5.5m0 13v-11m0 11a3.5 3.5 0 010-7m0 7a3.5 3.5 0 010-7" /></svg></span>;
    if (icon === "LayoutDashboard") return <span className="inline-block"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg></span>;
    if (icon === "Users") return <span className="inline-block"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-3-3.87"/><path d="M9 21v-2a4 4 0 0 1 3-3.87"/><circle cx="12" cy="7" r="4"/></svg></span>;
    return null;
  };

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

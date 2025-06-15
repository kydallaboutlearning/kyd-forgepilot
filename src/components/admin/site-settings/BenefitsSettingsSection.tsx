
import { DashboardBenefitsSettings } from "../DashboardBenefitsSettings";
import { type BenefitItem } from "@/types/cms";

type Props = {
  benefits: {
    benefits_headline: string;
    benefits_items: BenefitItem[];
  };
  currentBenefits: {
    benefits_headline: string;
    benefits_items: BenefitItem[];
  };
  isPending: boolean;
  onSubmit: (vals: any) => void;
};

export function BenefitsSettingsSection({ benefits, currentBenefits, isPending, onSubmit }: Props) {
  return (
    <DashboardBenefitsSettings
      settings={benefits}
      current={currentBenefits}
      isPending={isPending}
      onSubmit={onSubmit}
    />
  );
}

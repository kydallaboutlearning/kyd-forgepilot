
import { BenefitItem } from "@/types/cms";

/**
 * Factory function for creating a new, valid BenefitItem.
 */
export function createEmptyBenefitItem(): BenefitItem {
  return {
    title: "",
    desc: "",
    icon: "Brain",
  };
}

/**
 * Ensures that an array contains only valid BenefitItem objects.
 * This will fill in missing fields with defaults.
 */
export function normalizeBenefitItems(items: any[]): BenefitItem[] {
  return (items || []).map((item) => ({
    title: typeof item.title === "string" ? item.title : "",
    desc: typeof item.desc === "string" ? item.desc : "",
    icon:
      item.icon === "Brain" || item.icon === "LayoutDashboard" || item.icon === "Users"
        ? item.icon
        : "Brain",
  }));
}

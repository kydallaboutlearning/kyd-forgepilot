
import { BenefitItemIcon } from "@/types/cms";
import React from "react";

export const iconOptions: BenefitItemIcon[] = ["Brain", "LayoutDashboard", "Users"];

// Shared icon SVGs
export function renderBenefitIcon(icon: BenefitItemIcon | undefined) {
  if (!icon) return null;
  if (icon === "Brain")
    return (
      <span className="inline-block" aria-label="Brain icon">
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5.5 15.5C4 16 2 15 2 12s2-4 3.5-4.5A3.5 3.5 0 0112 5.5m7 10c1.5.5 3.5-.5 3.5-3.5s-2-4-3.5-4.5A3.5 3.5 0 0012 5.5m0 13v-11m0 11a3.5 3.5 0 010-7m0 7a3.5 3.5 0 010-7" />
        </svg>
      </span>
    );
  if (icon === "LayoutDashboard")
    return (
      <span className="inline-block" aria-label="Dashboard icon">
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      </span>
    );
  if (icon === "Users")
    return (
      <span className="inline-block" aria-label="Users icon">
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M9 21v-2a4 4 0 0 1 3-3.87" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </span>
    );
  return null;
}

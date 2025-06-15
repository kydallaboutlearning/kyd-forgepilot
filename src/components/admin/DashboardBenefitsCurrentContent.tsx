
import { BenefitItem } from "@/types/cms";
import { renderBenefitIcon } from "./benefitIcons";
import React from "react";

interface DashboardBenefitsCurrentContentProps {
  current: { benefits_headline?: string; benefits_items?: BenefitItem[] };
}

export function DashboardBenefitsCurrentContent({ current }: DashboardBenefitsCurrentContentProps) {
  return (
    <div className="bg-neutral-900/70 border border-neutral-800 rounded-lg px-4 py-4 mb-2">
      <h2 className="text-sm text-neutral-400 font-semibold mb-2">Current Why Automate with Us Section</h2>
      <div className="space-y-1 text-sm">
        <div>
          <span className="font-medium text-neutral-300">Headline: </span>
          <span className="text-neutral-200">
            {current.benefits_headline || <span className="italic text-neutral-600">Not set</span>}
          </span>
        </div>
        <div className="pt-1">
          <span className="font-medium text-neutral-300">Benefit Items:</span>
          <ul className="mt-2 space-y-1">
            {current.benefits_items && Array.isArray(current.benefits_items) && current.benefits_items.length > 0
              ? current.benefits_items.map((item, idx) => (
                  <li key={idx} className="flex gap-2 items-center bg-neutral-800 rounded p-2">
                    {renderBenefitIcon(item.icon)}
                    <span className="font-semibold text-neutral-200">{item.title || <span className="italic text-neutral-500">No title</span>}</span>
                    <span className="ml-3 text-neutral-300">{item.desc || <span className="italic text-neutral-500">No desc</span>}</span>
                    <span className="ml-2 text-xs text-neutral-400">[{item.icon}]</span>
                  </li>
                ))
              : <li className="italic text-neutral-600 ml-1">No benefit items set</li>
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

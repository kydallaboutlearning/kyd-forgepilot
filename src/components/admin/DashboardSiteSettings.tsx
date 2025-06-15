
import { HeaderSection } from "./sections/HeaderSection";
import { HeroSection } from "./sections/HeroSection";
import { BenefitsSection } from "./sections/BenefitsSection";
import { CtaSection } from "./sections/CtaSection";
import { RecentWorksSection } from "./sections/RecentWorksSection";

export default function DashboardSiteSettings() {
  return (
    <div className="space-y-10">
      <HeaderSection />
      <HeroSection />
      <BenefitsSection />
      <CtaSection />
      <RecentWorksSection />
    </div>
  );
}

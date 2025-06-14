
import Hero from "@/components/landing/Hero";
import PartnerLogos from "@/components/landing/PartnerLogos";
import Benefits from "@/components/landing/Benefits";
import CTA from "@/components/landing/CTA";
import RecentWorks from "@/components/landing/RecentWorks";
import Metrics from "@/components/landing/Metrics";
import Services from "@/components/landing/Services";
import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";
import Team from "@/components/landing/Team";
import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";

export default function Index() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-br from-background via-secondary to-background">
      <Hero />
      <PartnerLogos />
      <Benefits />
      <CTA />
      <RecentWorks />
      <Metrics />
      <Services />
      <Pricing />
      <Testimonials />
      <Team />
      <FAQ />
      <FinalCTA />
    </div>
  );
}


import Header from "@/components/Header";
import Hero from "@/components/landing/Hero";
import PartnerLogos from "@/components/landing/PartnerLogos";
import Benefits from "@/components/landing/Benefits";
import ContactCTA from "@/components/landing/ContactCTA";
import RecentWorks from "@/components/landing/RecentWorks";
import Metrics from "@/components/landing/Metrics";
import Services from "@/components/landing/Services";
import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";
import Team from "@/components/landing/Team";
import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-black">
      {/* Header visible at the very top */}
      <Header />
      <Hero />
      <PartnerLogos />
      <Benefits />
      <ContactCTA />
      <RecentWorks />
      <Metrics />
      {/* 
        Set correct id for "Services" so #services works ("Our Expertise" section).
        If Services component already uses <section id="services"> internally, 
        you can remove this outer wrapper, but to ensure scroll always works, 
        we do it here.
      */}
      <section id="services">
        <Services />
      </section>
      {/* 
        Same for pricing: ensure #pricing points to pricing section.
        If Pricing component already sets <section id="pricing"> internally, you can remove this,
        but this wrapper guarantees anchor scroll works everywhere.
      */}
      <section id="pricing">
        <Pricing />
      </section>
      <Testimonials />
      <Team />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}

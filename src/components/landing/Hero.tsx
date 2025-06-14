import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import HeroAvailableTag from "./HeroAvailableTag";
import HeroMainHeadline from "./HeroMainHeadline";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center py-40 md:py-56 px-4 text-center bg-black overflow-hidden min-h-[65vh]">
      {/* Bg dot grid */}
      <svg
        className="absolute left-0 top-0 w-full h-full pointer-events-none z-0"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern id="automatix-dots" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#FFB74A" fillOpacity="0.14" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#automatix-dots)" />
      </svg>
      {/* Available tag */}
      <HeroAvailableTag />
      {/* Main headline */}
      <HeroMainHeadline />
      {/* Subtext */}
      <p className="z-10 max-w-xl mx-auto text-base md:text-xl text-gray-300 font-sans font-medium mb-7 md:mb-9"
        style={{ letterSpacing: "0.007em" }}
      >
        Design services at your fingertips, Pause or cancel anytime.
      </p>
      {/* CTA Button */}
      <a
        href="#works"
        className="z-10 group relative inline-flex items-center justify-center font-sans text-base md:text-lg font-semibold text-white border border-neutral-700 rounded-md px-7 py-3 mt-2 transition duration-200 bg-black/70 hover:bg-neutral-900 hover:border-primary focus:outline-none"
        style={{ boxShadow: "0 4px 20px #19160c0b" }}
      >
        Learn More
        <svg className="ml-2 w-5 h-5 -mt-0.5 text-primary transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 18 18"><path d="M5 9h8M9 5l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </a>
      {/* Partner logos and additional info handled in another component */}
    </section>
  );
}

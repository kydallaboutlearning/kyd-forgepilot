
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center py-48 md:py-56 px-4 text-center bg-black overflow-hidden min-h-[65vh]">
      {/* Gold/orange dot grid background */}
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
      <motion.h1
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.14, type: "spring" }}
        className="z-10 text-center font-sans font-extrabold tracking-tight mb-8 text-white leading-tight"
        style={{ 
          fontSize: 'clamp(2.8rem,8vw,5rem)', 
          lineHeight: 1.06,
          letterSpacing: "-0.02em"
        }}
      >
        Dream Into Reality
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.36 }}
        className="z-10 max-w-xl mx-auto text-lg md:text-2xl text-gray-300 font-sans font-medium mb-9"
        style={{
          letterSpacing: "0.01em"
        }}
      >
        We bring your vision to life with creativity and precision. Let&apos;s make it happen.
      </motion.p>
      <motion.a
        whileHover={{ scale: 1.05 }}
        href="#contact"
        className="z-10 group relative inline-flex items-center font-sans font-semibold text-xl md:text-2xl text-[#FFB74A] transition duration-200 no-underline hover:brightness-125 hover:text-[#ffd993] focus:outline-none"
        style={{ textShadow: "0 0 8px #ffb74a22" }}
      >
        Book A Call
        <ArrowRight className="ml-2 w-6 h-6 stroke-[2.1] transition-transform group-hover:translate-x-1" />
      </motion.a>
      {/* Remove colored blurs */}
    </section>
  );
}

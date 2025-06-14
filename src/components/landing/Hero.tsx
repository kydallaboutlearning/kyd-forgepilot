
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center py-44 md:py-60 px-4 text-center bg-black overflow-hidden">
      {/* grid/dot background */}
      <svg className="absolute left-0 top-0 w-full h-full pointer-events-none opacity-20 z-0" width="100%" height="100%">
        <defs>
          <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="#444" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
      <motion.h1
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.08, type: "spring" }}
        className="z-10 text-center text-6xl md:text-8xl font-black font-sans uppercase tracking-tight mb-8 text-white leading-tight"
        style={{ letterSpacing: '-2.5px' }}
      >
        Automation Agency<br className="hidden md:block" />
        <span className="text-primary font-extrabold"> Amplified With AI.</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.22 }}
        className="z-10 max-w-2xl mx-auto text-2xl md:text-3xl text-gray-300 font-sans font-semibold mb-10"
      >
        Next-gen automation, custom AI, real results.<br className="hidden md:block"/>
        <span className="font-semibold opacity-90">Innovate. Streamline. Grow.</span>
      </motion.p>
      <motion.a
        whileHover={{ scale: 1.09 }}
        href="#contact"
        className="z-10 inline-block bg-primary text-primary-foreground px-12 py-5 rounded-lg text-2xl font-black uppercase tracking-wide shadow-lg hover:scale-105 transition-all focus:outline-none hover:bg-[#ffc566] focus:bg-[#ffd993]"
        style={{ boxShadow: "0 8px 32px 0 #FFA72622" }}
      >
        Let&apos;s Talk
      </motion.a>
      <div className="absolute -left-16 top-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute right-0 -bottom-28 w-96 h-96 bg-primary/10 rounded-full blur-2xl pointer-events-none -z-10"></div>
    </section>
  );
}


import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center py-36 md:py-48 px-4 text-center bg-black overflow-hidden">
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
        className="z-10 text-center text-5xl md:text-7xl font-bold font-playfair uppercase tracking-tight mb-6 text-white"
        style={{ letterSpacing: '-2px' }}
      >
        Automation Agency<br className="hidden md:block" />
        <span className="text-primary font-extrabold"> Amplified With AI.</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.22 }}
        className="z-10 max-w-2xl mx-auto text-xl md:text-2xl text-gray-300 font-medium mb-8"
      >
        Next-gen automation, custom AI, real results.<br className="hidden md:block"/>
        <span className="font-semibold opacity-90">Innovate. Streamline. Grow.</span>
      </motion.p>
      <motion.a
        whileHover={{ scale: 1.07 }}
        href="#contact"
        className="z-10 inline-block bg-primary text-primary-foreground px-10 py-4 rounded-lg text-xl font-bold uppercase tracking-wide shadow-lg hover:scale-105 transition-transform focus:outline-none"
      >
        Let&apos;s Talk
      </motion.a>
      {/* subtle blurred gradient for edge interest */}
      <div className="absolute -left-16 top-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute right-0 -bottom-28 w-96 h-96 bg-primary/10 rounded-full blur-2xl pointer-events-none -z-10"></div>
    </section>
  )
}

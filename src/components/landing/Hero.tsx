
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center py-28 md:py-36 px-4 text-center bg-gradient-to-br from-background via-secondary to-background">
      <motion.h1
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1, type: "spring" }}
        className="text-5xl md:text-7xl font-bold font-playfair leading-tight mb-4"
        style={{ letterSpacing: '-2px' }}
      >
        Automation Agency Beyond Limits.<br className="hidden md:block" />
        <span className="text-primary"> Amplified With AI.</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="max-w-2xl mx-auto text-xl md:text-2xl text-muted-foreground mb-7"
      >
        Next-gen automation, custom AI, real results.<br className="hidden md:block"/><span className="font-medium opacity-75">Innovate. Streamline. Grow.</span>
      </motion.p>
      <motion.a
        whileHover={{ scale: 1.05 }}
        href="#contact"
        className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-xl text-lg font-semibold shadow-lg transition-transform hover:scale-105"
      >
        Let&apos;s Talk
      </motion.a>
      {/* Glassy blurred gradient circles for background */}
      <div className="absolute -left-16 top-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute right-0 -bottom-28 w-96 h-96 bg-accent/10 rounded-full blur-2xl pointer-events-none -z-10"></div>
    </section>
  )
}

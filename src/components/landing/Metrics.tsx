
import { motion } from "framer-motion";

const stats = [
  { label: "Users", value: "150k+" },
  { label: "Avg. Rating", value: "4.9" },
  { label: "Satisfaction", value: "99%" },
];

export default function Metrics() {
  return (
    <section className="w-full py-16 md:py-20 flex items-center justify-center bg-neutral-900 border-b border-neutral-800">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-black border border-neutral-800 rounded-2xl flex gap-10 md:gap-16 px-10 md:px-20 py-9 md:py-14 shadow-2xl animate-fade-in"
      >
        {stats.map((stat, i) => (
          <div className="flex flex-col items-center min-w-[100px] md:min-w-[130px]" key={stat.label}>
            <div className="text-4xl md:text-6xl font-black text-primary mb-2 font-sans tracking-tight">{stat.value}</div>
            <div className="text-gray-400 font-bold uppercase text-sm tracking-[0.15em]">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}

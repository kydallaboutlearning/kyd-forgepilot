
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const projects = [
  {
    name: "Voice AI Agent",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800",
    desc: "Conversational agent for 24/7 lead qualification & booking.",
    metrics: ["+25% conversion", "~4x faster response"],
  },
  {
    name: "Medical Transcription Automation",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800",
    desc: "Automated transcription for clinics, HIPAA compliant.",
    metrics: ["500+ hrs saved", "99% accuracy"],
  },
  {
    name: "Real Estate Bot",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800",
    desc: "Property chatbot handling 120+ customer queries daily.",
    metrics: ["4.9⭐ rating", "12k+ users"],
  },
];

export default function RecentWorks() {
  return (
    <section className="w-full py-20 px-4 max-w-6xl mx-auto bg-black border-b border-neutral-900 flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-black uppercase mb-12 text-primary tracking-wider text-center font-sans">
        Recent Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8 w-full">
        {projects.map((proj, idx) => (
          <motion.div
            key={proj.name}
            initial={{ opacity: 0, y: 52 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.65, delay: idx * 0.15 }}
            className="bg-neutral-900 rounded-2xl shadow-xl overflow-hidden border border-neutral-800 transition-transform hover:scale-105 hover:shadow-2xl animate-fade-in group"
            style={{ minHeight: 410 }}
          >
            <img
              src={proj.image}
              alt={proj.name}
              className="w-full h-52 object-cover group-hover:opacity-90 transition duration-150"
            />
            <div className="p-7">
              <div className="text-lg font-bold uppercase text-white mb-2 font-sans">
                {proj.name}
              </div>
              <div className="text-gray-400 mb-4">{proj.desc}</div>
              <div className="flex flex-wrap gap-2 mt-2">
                {proj.metrics.map((metric) => (
                  <span
                    key={metric}
                    className="bg-accent text-accent-foreground rounded-full px-3 py-1 text-xs font-semibold"
                  >
                    {metric}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <Link to="/portfolio" className="mt-5">
        <Button className="px-7 py-3 text-base rounded-lg shadow-lg bg-primary text-primary-foreground transition hover:scale-105 hover:bg-primary/90">
          View Portfolio
        </Button>
      </Link>
    </section>
  );
}


import {
  Wrench,
  Bot,
  BarChart,
  Brain,
  LayoutDashboard,
} from "lucide-react";

// Selected icons:
// - Custom Projects: Wrench
// - Smart Automation: Brain
// - Voice Agents: Bot
// - Analytics Dashboards: BarChart
// - AI Training: LayoutDashboard

const services = [
  {
    name: "Custom Projects",
    desc: "Tailored automation solutions from zero to launch.",
    icon: <Wrench className="w-9 h-9 text-primary" aria-hidden />,
  },
  {
    name: "Smart Automation",
    desc: "End-to-end process automation harnessing GPTs and modern APIs.",
    icon: <Brain className="w-9 h-9 text-primary" aria-hidden />,
  },
  {
    name: "Voice Agents",
    desc: "Conversational AI for calls, support, and engagement.",
    icon: <Bot className="w-9 h-9 text-primary" aria-hidden />,
  },
  {
    name: "Analytics Dashboards",
    desc: "Real-time insights and reporting on your operations.",
    icon: <BarChart className="w-9 h-9 text-primary" aria-hidden />,
  },
  {
    name: "AI Training",
    desc: "Custom LLM and RAG-based agent deployments.",
    icon: <LayoutDashboard className="w-9 h-9 text-primary" aria-hidden />,
  }
]

export default function Services() {
  return (
    <section className="py-24 w-full flex flex-col items-center px-4 bg-black border-b border-neutral-900">
      <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider mb-11 text-primary text-center font-sans">Our Expertise</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl w-full">
        {services.map((s, idx) => (
          <div
            key={s.name}
            className="flex flex-col items-center bg-neutral-900 border border-neutral-800 rounded-2xl px-8 py-12 shadow-lg text-center animate-fade-in"
            style={{ minHeight: 260 }}
          >
            <div className="mb-3">{s.icon}</div>
            <div className="font-bold text-md mb-2 uppercase tracking-wide text-white font-sans">{s.name}</div>
            <div className="text-gray-300 font-sans">{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}


const services = [
  {
    name: "Custom Projects",
    desc: "Tailored automation solutions from zero to launch.",
    icon: "🛠️"
  },
  {
    name: "Smart Automation",
    desc: "End-to-end process automation harnessing GPTs and modern APIs.",
    icon: "⚡"
  },
  {
    name: "Voice Agents",
    desc: "Conversational AI for calls, support, and engagement.",
    icon: "🎤"
  },
  {
    name: "Analytics Dashboards",
    desc: "Real-time insights and reporting on your operations.",
    icon: "📊"
  },
  {
    name: "AI Training",
    desc: "Custom LLM and RAG-based agent deployments.",
    icon: "🤖"
  }
]

export default function Services() {
  return (
    <section className="py-20 w-full flex flex-col items-center px-4 bg-black border-b border-neutral-900">
      <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider mb-10 text-primary text-center">Our Expertise</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl w-full">
        {services.map(s => (
          <div key={s.name} className="flex flex-col items-center bg-neutral-900 border border-neutral-800 rounded-2xl px-7 py-10 shadow text-center animate-fade-in">
            <div className="text-4xl mb-3">{s.icon}</div>
            <div className="font-bold text-md mb-2 uppercase tracking-wide text-white">{s.name}</div>
            <div className="text-gray-300">{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

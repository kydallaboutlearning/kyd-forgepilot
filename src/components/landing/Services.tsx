
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
    <section className="py-14 md:py-18 w-full flex flex-col items-center px-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Our Expertise</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
        {services.map(s => (
          <div key={s.name} className="flex flex-col items-center bg-card/70 border border-muted rounded-2xl px-7 py-8 shadow justify-center text-center animate-fade-in">
            <div className="text-4xl mb-3">{s.icon}</div>
            <div className="font-semibold text-lg mb-2">{s.name}</div>
            <div className="text-muted-foreground">{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

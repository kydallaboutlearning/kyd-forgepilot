
const projects = [
  // Use Unsplash or placeholder images for now
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
    <section className="w-full py-14 px-4 max-w-6xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Recent Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((proj) => (
          <div className="bg-card/80 rounded-2xl shadow-lg overflow-hidden border animate-fade-in transition-transform hover:scale-105" key={proj.name}>
            <img src={proj.image} alt={proj.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <div className="text-lg font-semibold mb-1">{proj.name}</div>
              <div className="text-muted-foreground mb-3">{proj.desc}</div>
              <div className="flex flex-wrap gap-2 mt-2">
                {proj.metrics.map(metric => (
                  <span key={metric} className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-xs font-semibold">{metric}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

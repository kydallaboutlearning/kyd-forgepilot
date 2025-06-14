
const items = [
  {
    title: "Innovative Approach",
    desc: "Cutting-edge automation strategies tailored for your unique workflows, leveraging the latest in AI advancements.",
    icon: "💡"
  },
  {
    title: "Seamless Experience",
    desc: "From onboarding to delivery — enjoy frictionless integration and delightfully simple user journeys.",
    icon: "✨"
  },
  {
    title: "Ongoing Partnership",
    desc: "We’re invested in your long-term success, offering proactive support and future-proof solutions.",
    icon: "🤝"
  }
];

export default function Benefits() {
  return (
    <section className="w-full flex flex-col px-4 py-14 md:py-20 items-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {items.map((b) => (
          <div
            key={b.title}
            className="bg-card/70 rounded-2xl flex flex-col items-center p-8 shadow-md border border-muted text-center animate-fade-in"
          >
            <div className="text-4xl mb-3">{b.icon}</div>
            <div className="text-xl font-semibold mb-2">{b.title}</div>
            <div className="text-muted-foreground">{b.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

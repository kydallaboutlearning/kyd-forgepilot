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
    <section className="w-full flex flex-col px-4 py-16 md:py-28 items-center bg-black border-b border-neutral-900">
      <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider text-primary mb-12 text-center">Why Automate with Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl w-full">
        {items.map((b) => (
          <div
            key={b.title}
            className="bg-neutral-900 rounded-2xl flex flex-col items-center p-10 shadow-md border border-neutral-800 text-center animate-fade-in"
          >
            <div className="text-4xl mb-3">{b.icon}</div>
            <div className="text-lg font-bold uppercase tracking-wide text-white mb-2">{b.title}</div>
            <div className="text-gray-300">{b.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

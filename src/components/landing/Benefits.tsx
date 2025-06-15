
import { Brain, ThumbsUp, Users } from "lucide-react";

const items = [
  {
    title: "Innovative Approach",
    desc: "Cutting-edge automation strategies tailored for your unique workflows, leveraging the latest in AI advancements.",
    icon: <Brain className="w-9 h-9 text-primary" />,
  },
  {
    title: "Seamless Experience",
    desc: "From onboarding to delivery — enjoy frictionless integration and delightfully simple user journeys.",
    icon: <ThumbsUp className="w-9 h-9 text-primary" />,
  },
  {
    title: "Ongoing Partnership",
    desc: "We’re invested in your long-term success, offering proactive support and future-proof solutions.",
    icon: <Users className="w-9 h-9 text-primary" />,
  },
];

export default function Benefits() {
  return (
    <section
      className="w-full flex flex-col px-4 py-20 md:py-28 items-center bg-black border-b border-neutral-900"
      id="whyus"
    >
      <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider text-primary mb-12 text-center font-sans">
        Why Automate with Us
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl w-full">
        {items.map((b, idx) => (
          <div
            key={b.title}
            className="bg-neutral-900 rounded-2xl flex flex-col items-center p-12 shadow-md border border-neutral-800 text-center animate-fade-in"
            style={{ minHeight: 295 }}
          >
            <div className="mb-5 flex items-center justify-center">
              <span className="inline-flex items-center justify-center rounded-full bg-primary/10" style={{ width: 68, height: 68 }}>
                {b.icon}
              </span>
            </div>
            <div className="text-lg font-bold uppercase tracking-wide text-white mb-2 font-sans">
              {b.title}
            </div>
            <div className="text-gray-300 font-sans">{b.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

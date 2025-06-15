
import { Brain, ThumbsUp, Users } from "lucide-react";

const items = [
  {
    title: "Innovative Approach",
    desc: "Cutting-edge automation strategies tailored for your unique workflows, leveraging the latest in AI advancements.",
    icon: <Brain className="w-9 h-9 text-white" />,
  },
  {
    title: "Seamless Experience",
    desc: "From onboarding to delivery — enjoy frictionless integration and delightfully simple user journeys.",
    icon: <ThumbsUp className="w-9 h-9 text-white" />,
  },
  {
    title: "Ongoing Partnership",
    desc: "We’re invested in your long-term success, offering proactive support and future-proof solutions.",
    icon: <Users className="w-9 h-9 text-white" />,
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
            className="bg-neutral-900 rounded-2xl flex flex-col items-center p-8 md:p-12 shadow-md border border-neutral-800 text-center animate-fade-in"
            style={{ minHeight: 340 }}
          >
            <div className="mb-7 w-full flex items-center justify-center">
              {/* Grid background with animated orange circle icon */}
              <span className="relative inline-flex items-center justify-center" style={{ width: 110, height: 82 }}>
                {/* Subtle grid/star background */}
                <svg
                  viewBox="0 0 110 82"
                  fill="none"
                  className="absolute left-0 top-0 w-full h-full"
                  style={{ zIndex: 1 }}
                >
                  {/* Star grid points */}
                  {[...Array(6)].map((_, i) =>
                    <circle
                      key={i}
                      cx={16 + (i % 3) * 40}
                      cy={15 + Math.floor(i / 3) * 38}
                      r="1.3"
                      fill="#fff"
                      fillOpacity="0.13"
                    />
                  )}
                  {/* Grid squares */}
                  {Array.from({ length: 3 }).map((_, r) =>
                    Array.from({ length: 4 }).map((_, c) => (
                      <rect
                        key={`${r}-${c}`}
                        x={15 + c * 24}
                        y={12 + r * 22}
                        width="8"
                        height="8"
                        fill="#fff"
                        fillOpacity="0.06"
                        rx="2"
                      />
                    ))
                  )}
                </svg>
                {/* Orange animated icon circle */}
                <span
                  className="relative z-10 flex items-center justify-center rounded-full shadow-lg animate-bounce-benefit"
                  style={{
                    width: 54,
                    height: 54,
                    background: "linear-gradient(135deg,#FFB74A,#FDD47E)",
                  }}
                >
                  {b.icon}
                </span>
              </span>
            </div>
            <div className="text-lg font-bold uppercase tracking-wide text-white mb-2 font-sans">
              {b.title}
            </div>
            <div className="text-gray-300 font-sans">{b.desc}</div>
          </div>
        ))}
      </div>
      {/* Local bounce keyframes for animated icon */}
      <style>{`
        @keyframes bounce-benefit {
          0%, 100% { transform: translateY(0);}
          10%, 30%, 50%, 70% { transform: translateY(-7px);}
          20%, 40%, 60%, 80% { transform: translateY(2px);}
          90% {transform: translateY(-2px);}
        }
        .animate-bounce-benefit {
          animation: bounce-benefit 2.15s cubic-bezier(0.41,0.63,0.43,1.12) infinite;
        }
      `}</style>
    </section>
  );
}


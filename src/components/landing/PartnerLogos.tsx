
import { Zap } from "lucide-react";

const brands = [
  {
    label: "Grapho",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
        <circle cx="16" cy="16" r="13" fill="#fff" fillOpacity="0.06"/>
        <path d="M16 5a11 11 0 1 1 0 22A11 11 0 0 1 16 5zm0 2A9 9 0 1 0 16 25a9 9 0 0 0 0-18z" fill="#fff" fillOpacity="0.11"/>
        <path d="M9 16a7 7 0 0 1 10.8-5.8A7 7 0 1 0 23 16a7 7 0 0 1-14 0z" fill="#fff" fillOpacity="0.2"/>
      </svg>
    ),
  },
  {
    label: "Signum.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
        <circle cx="16" cy="16" r="12" fill="#fff" fillOpacity="0.12"/>
        <g>
          <ellipse cx="21" cy="16" rx="7" ry="5" fill="#fff" fillOpacity="0.16"/>
          <ellipse cx="16" cy="16" rx="4" ry="8" fill="#fff" fillOpacity="0.10"/>
        </g>
      </svg>
    ),
  },
  {
    label: "Vectra",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
        <circle cx="16" cy="16" r="13" fill="#fff" fillOpacity="0.1"/>
        <path d="M16 8 L24 24 H8 Z" fill="#fff" fillOpacity="0.18"/>
      </svg>
    ),
  },
  {
    label: "Optimal",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
        <circle cx="16" cy="16" r="13" fill="#fff" fillOpacity="0.09"/>
        <path d="M12 16l4 4 6-9" stroke="#fff" strokeOpacity="0.29" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Zapfast",
    icon: (
      <span className="flex items-center justify-center w-8 h-8"><Zap className="w-7 h-7 text-white/60" strokeWidth={2.3}/></span>
    ),
  },
];

// Infinite ticker animation using Tailwind/CSS custom class
export default function PartnerLogos() {
  return (
    <section className="w-full py-8 flex flex-col items-center bg-black border-y border-neutral-800 relative overflow-x-hidden">
      <div className="mb-2 text-gray-400 text-[15px] tracking-wide font-semibold uppercase text-center">Our services are featured on</div>
      <div className="w-full flex overflow-x-hidden">
        <div
          className="flex min-w-max gap-12 animate-logo-ticker"
          style={{ animationDuration: "22s" }}
          aria-label="Brand partners ticker"
        >
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-1 min-w-[95px]"
              style={{ opacity: 0.76, color: "#d1d5db" }}
              aria-label={brand.label}
            >
              <span className="block w-8 h-8 flex items-center justify-center mb-0.5">{brand.icon}</span>
              <span className="text-[15px] font-medium text-neutral-400">{brand.label}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes logo-ticker {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-logo-ticker {
          animation: logo-ticker linear infinite;
        }
      `}</style>
    </section>
  );
}

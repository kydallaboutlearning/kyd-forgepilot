import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Lightbulb,
  Rocket,
  Briefcase,
  Wrench,
  List,
  LayoutDashboard,
  Book,
  HelpCircle,
  FileText,
  DollarSign,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileNavDrawer } from "./MobileNavDrawer";

const nav = [
  { to: "#whyus", label: "Why Us", icon: <Lightbulb className="w-4 h-4 mr-1.5" /> },
  { to: "#pricing", label: "Pricing", icon: <DollarSign className="w-4 h-4 mr-1.5" /> },
  { to: "#works", label: "Works", icon: <Briefcase className="w-4 h-4 mr-1.5" /> },
  { to: "#services", label: "Services", icon: <Wrench className="w-4 h-4 mr-1.5" /> },
  {
    label: "Pages",
    icon: <List className="w-4 h-4 mr-1.5" />,
    dropdown: [
      { to: "/portfolio", label: "Portfolio", icon: <FileText className="w-4 h-4 mr-1.5" /> },
      { to: "/blog", label: "Blog", icon: <Book className="w-4 h-4 mr-1.5" /> },
      { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4 mr-1.5" /> },
      { to: "/faq", label: "FAQ", icon: <HelpCircle className="w-4 h-4 mr-1.5" /> },
    ],
  },
];

function NavLinks() {
  return (
    <nav className="flex items-center gap-6 md:gap-7 font-sans text-base text-neutral-200">
      {nav.map((item) => {
        if ("dropdown" in item) {
          return (
            <div className="group relative" key={item.label}>
              <span className="cursor-pointer hover:text-primary transition flex items-center gap-1">
                {item.icon}
                {item.label}
                <svg width={15} height={15} viewBox="0 0 20 20" className="ml-0.5 mt-0.5 opacity-70" fill="none">
                  <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div className="absolute left-0 mt-2 bg-[#101010] rounded-xl border border-neutral-800 shadow-xl min-w-[180px] z-30 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
                <ul className="py-2">
                  {item.dropdown.map((drop) => (
                    <li key={drop.to}>
                      <Link
                        to={drop.to}
                        className="flex items-center px-5 py-2 whitespace-nowrap text-neutral-200 hover:text-primary transition"
                      >
                        {drop.icon}
                        {drop.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        }
        return (
          <a
            key={item.to}
            href={item.to}
            className="hover:text-primary transition flex items-center"
            style={{ fontWeight: 400 }}
          >
            {item.icon}
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}

export default function Header() {
  const isMobile = useIsMobile();

  return (
    <header className="relative w-full flex items-center justify-center bg-transparent py-2 px-1 md:py-5 md:px-4 select-none z-50">
      {/* Dot grid background */}
      <svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern id="forgepilot-dot-header" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.1" fill="#FFB74A" fillOpacity="0.12" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#forgepilot-dot-header)" />
      </svg>
      {/* Main header bar */}
      <div
        className={`
          relative z-10 w-full max-w-5xl
          flex items-center
          justify-between
          py-2 md:py-[0.5rem] px-2 sm:px-4 md:px-8
          rounded-2xl md:rounded-full bg-black bg-opacity-[0.95] md:bg-opacity-[0.82]
          border border-[#FFB74A]/40
          shadow-[0_0_0_1.5px_#FFB74A20]
          transition-all
        `}
        style={{
          boxShadow: "0 1.5px 28px 0 #FFB74A0C, 0 0 0 1.5px #FFB74A30",
        }}
      >
        {/* MOBILE: logo left, hamburger menu right */}
        <div className="flex w-full items-center justify-between md:hidden h-12">
          <Link
            to="/"
            className="font-sans text-xl font-semibold tracking-tight flex items-baseline"
            style={{
              color: "#FFB74A",
              letterSpacing: "-0.02em",
              textShadow: "0 0 3px #ffb84a44, 0 1.5px 8px #111, 0 0.5px 1px #ffd08555",
            }}
          >
            Forge
            <span style={{ color: "white", marginLeft: "-2px" }}>Pilot</span>
          </Link>
          {/* Z-50 ensures drawer trigger stays clickable */}
          <div className="z-50"><MobileNavDrawer /></div>
        </div>
        {/* TABLET & DESKTOP: logo left, nav center, CTA right */}
        <div className="hidden md:flex w-full items-center justify-between gap-2 min-h-[56px]">
          <Link
            to="/"
            className="font-sans text-2xl font-semibold tracking-tight flex items-baseline"
            style={{
              color: "#FFB74A",
              letterSpacing: "-0.02em",
              textShadow: "0 0 3px #ffb84a44, 0 1.5px 8px #111, 0 0.5px 1px #ffd08555",
            }}
          >
            Forge
            <span style={{ color: "white", marginLeft: "-2px" }}>Pilot</span>
          </Link>
          <div className="flex-1 flex items-center justify-center ml-0 lg:ml-4">
            <div className="hidden md:flex md:gap-3 lg:gap-7">
              <NavLinks />
            </div>
          </div>
          <a
            href="#contact"
            className="
              group flex items-center gap-2
              rounded-xl bg-black/60 border border-[#FFB74A44] px-4 py-2.5
              font-semibold text-base text-neutral-200 hover:text-primary transition
              shadow-[0_0_9px_0_#FFB74A33]
              focus:outline-none
              relative
              md:text-base md:px-4 md:py-2.5
              lg:px-5 lg:py-2.5
            "
            style={{
              boxShadow: "0 0 2px #1f1603, 0 0 4px 0 #dba54a22",
            }}
          >
            Let&apos;s Talk
            <ArrowUpRight className="w-4 h-4 ml-1 opacity-90 text-primary group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </header>
  );
}

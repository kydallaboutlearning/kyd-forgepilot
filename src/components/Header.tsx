
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const nav = [
  { to: "#whyus", label: "Why Us" },
  { to: "#mission", label: "Mission" },
  { to: "#works", label: "Works" },
  { to: "#services", label: "Services" },
  {
    label: "Pages",
    dropdown: [
      { to: "/portfolio", label: "Portfolio" },
      { to: "/blog", label: "Blog" },
      { to: "/dashboard", label: "Dashboard" },
      { to: "/faq", label: "FAQ" },
    ],
  },
];

function NavLinks() {
  return (
    <nav className="flex items-center gap-7 font-sans text-base text-neutral-200">
      {nav.map((item) => {
        if ("dropdown" in item) {
          return (
            <div className="group relative" key={item.label}>
              <span className="cursor-pointer hover:text-primary transition flex items-center gap-1">{item.label}
                <svg width={15} height={15} viewBox="0 0 20 20" className="ml-0.5 mt-0.5 opacity-70" fill="none"><path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              <div className="absolute left-0 mt-2 bg-[#101010] rounded-xl border border-neutral-800 shadow-xl min-w-[160px] z-30 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
                <ul className="py-2">
                  {item.dropdown.map((drop) => (
                    <li key={drop.to}>
                      <Link
                        to={drop.to}
                        className="block px-5 py-2 whitespace-nowrap text-neutral-200 hover:text-primary transition"
                      >
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
            className="hover:text-primary transition"
            style={{ fontWeight: 400 }}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}

export default function Header() {
  return (
    <header className="relative w-full flex items-center justify-center bg-transparent py-7 px-4 select-none">
      {/* Dot grid background */}
      <svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern id="automatix-dot-header" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.1" fill="#FFB74A" fillOpacity="0.12" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#automatix-dot-header)" />
      </svg>
      {/* Main header bar */}
      <div
        className="
          relative z-10 w-full max-w-5xl
          flex items-center
          justify-between
          py-[0.7rem] px-8
          rounded-full bg-black bg-opacity-[0.82]
          border border-[#FFB74A]/40
          shadow-[0_0_0_1.5px_#FFB74A20]
          "
        style={{
          boxShadow: "0 1.5px 28px 0 #FFB74A0C, 0 0 0 1.5px #FFB74A30",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          className="font-sans text-2xl font-semibold tracking-tight flex items-baseline"
          style={{
            color: "#FFB74A",
            letterSpacing: "-0.02em",
            textShadow:
              "0 0 3px #ffb84a44, 0 1.5px 8px #111, 0 0.5px 1px #ffd08555",
          }}
        >
          Automa
          <span style={{ color: "white", marginLeft: "-2px" }}>tix</span>
        </Link>
        {/* Nav */}
        <div className="flex-1 flex items-center justify-center ml-4">
          <NavLinks />
        </div>
        {/* Right CTA */}
        <a
          href="#contact"
          className="
            group flex items-center gap-2 
            rounded-xl bg-black/60 border border-[#FFB74A44] px-5 py-2.5
            font-semibold text-base text-neutral-200 hover:text-primary transition
            shadow-[0_0_9px_0_#FFB74A33]
            focus:outline-none
            relative
          "
          style={{
            boxShadow: "0 0 2px #1f1603, 0 0 4px 0 #dba54a22",
          }}
        >
          Let&apos;s Talk
          <ArrowUpRight className="w-4 h-4 ml-1 opacity-90 text-primary group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </header>
  );
}

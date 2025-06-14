
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
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
    <nav className="hidden md:flex items-center gap-6 font-sans text-base text-white">
      {nav.map((item) => {
        if ("dropdown" in item) {
          return (
            <div className="group relative" key={item.label}>
              <span className="cursor-pointer hover:text-primary transition">{item.label}</span>
              <div className="absolute left-0 mt-2 bg-neutral-950 rounded-xl border border-neutral-800 shadow-lg min-w-[160px] z-30 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
                <ul className="py-2">
                  {item.dropdown.map((drop) => (
                    <li key={drop.to}>
                      <Link
                        to={drop.to}
                        className="block px-5 py-2 whitespace-nowrap text-white hover:text-primary transition"
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
    <header className="w-full sticky top-0 z-50 px-4 md:px-8 py-3 bg-[#131313]/90 border-b border-neutral-900 shadow-none flex items-center justify-between backdrop-blur-sm">
      {/* Left: Logo */}
      <Link
        to="/"
        className="font-sans font-bold text-lg md:text-2xl tracking-tight text-primary px-4 py-2 rounded-full bg-neutral-900 border border-neutral-800 shadow-sm"
        style={{ letterSpacing: "-0.01em" }}
      >
        Automatix
      </Link>
      {/* Center: Nav */}
      <div className="flex-1 flex justify-center">
        <NavLinks />
      </div>
      {/* Right: CTA */}
      <a
        href="#contact"
        className="flex items-center gap-1 bg-black/90 px-4 md:px-6 py-2.5 rounded-2xl font-semibold text-base md:text-lg text-white hover:text-primary border border-neutral-800 shadow-[0_2px_16px_0_#FFB74A22] transition focus:outline-none font-sans"
        style={{ boxShadow: "0 4px 24px 0 #FFB74A22" }}
      >
        Let&apos;s Talk
        <ArrowUpRight className="w-4 h-4 ml-0.5 -mt-0.5 opacity-85" />
      </a>
    </header>
  );
}


import { Link } from "react-router-dom";
import {
  Lightbulb,
  DollarSign,
  Briefcase,
  Wrench,
  List,
  FileText,
  Book,
  LayoutDashboard,
  HelpCircle,
} from "lucide-react";

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

export default NavLinks;

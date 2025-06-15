import React, { useRef } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
} from "@/components/ui/drawer";
import {
  Lightbulb,
  Rocket,
  Briefcase,
  Wrench,
  List,
  LayoutDashboard,
  Book,
  HelpCircle,
  FileText,
  ArrowUpRight,
  Menu as MenuIcon,
  X as CloseIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const nav = [
  { to: "#whyus", label: "Why Us", icon: <Lightbulb className="w-4 h-4 mr-2 inline-block" /> },
  { to: "#mission", label: "Mission", icon: <Rocket className="w-4 h-4 mr-2 inline-block" /> },
  { to: "#works", label: "Works", icon: <Briefcase className="w-4 h-4 mr-2 inline-block" /> },
  { to: "#services", label: "Services", icon: <Wrench className="w-4 h-4 mr-2 inline-block" /> },
  {
    label: "Pages",
    icon: <List className="w-4 h-4 mr-2 inline-block" />,
    dropdown: [
      { to: "/portfolio", label: "Portfolio", icon: <FileText className="w-4 h-4 mr-2 inline-block" /> },
      { to: "/blog", label: "Blog", icon: <Book className="w-4 h-4 mr-2 inline-block" /> },
      { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4 mr-2 inline-block" /> },
      { to: "/faq", label: "FAQ", icon: <HelpCircle className="w-4 h-4 mr-2 inline-block" /> },
    ],
  },
];

// Add stateful open debugging for Drawer (to verify state)
export function MobileNavDrawer() {
  const openRef = useRef(false);

  // To help debug: on drawer open/close, log to console.
  const onOpenChange = (open: boolean) => {
    openRef.current = open;
    console.log("MobileNavDrawer: Drawer open state:", open);
  };

  return (
    <Drawer shouldScaleBackground={true} onOpenChange={onOpenChange}>
      <DrawerTrigger
        asChild
        className="outline-none border-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Open navigation menu"
      >
        <button
          className="p-2 rounded-full hover:bg-neutral-900 transition flex items-center justify-center"
          type="button"
          onClick={() => {
            // Debugging if button is being clicked
            console.log("MobileNavDrawer: DrawerTrigger clicked");
          }}
        >
          <MenuIcon className="w-7 h-7 text-primary" />
        </button>
      </DrawerTrigger>
      {/* Remove custom animate-slide-in-right and z-[60], use Drawer default */}
      <DrawerContent
        className="px-3 py-5 !rounded-t-2xl bg-yellow-300 border-4 border-red-600 min-h-[60vh] flex flex-col gap-4 relative z-[9999]"
        style={{
          background: 'rgba(255,255,80,0.95)',
          border: '6px solid #ff0000',
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <Link
            to="/"
            className="font-sans text-2xl font-semibold tracking-tight flex items-baseline"
            style={{
              color: "#FFB74A",
              letterSpacing: "-0.02em",
              textShadow: "0 0 3px #ffb84a44, 0 1.5px 8px #111, 0 0.5px 1px #ffd08555",
            }}
            tabIndex={0}
          >
            Forge
            <span style={{ color: "white", marginLeft: "-2px" }}>Pilot</span>
          </Link>
          <DrawerClose asChild>
            <button className="text-white p-2 w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-900" aria-label="Close navigation">
              <span className="sr-only">Close navigation</span>
              <CloseIcon className="w-7 h-7" />
            </button>
          </DrawerClose>
        </div>
        <nav>
          <ul className="flex flex-col gap-1.5 text-lg font-medium">
            {nav.map((item) =>
              "dropdown" in item ? (
                <li key={item.label}>
                  <div tabIndex={0} className="flex flex-col">
                    <span className="flex items-center gap-2 text-neutral-200 py-2">
                      {item.icon}
                      {item.label}
                    </span>
                    <ul className="ml-6 flex flex-col text-base font-normal border-l border-neutral-700 gap-1 mt-1">
                      {item.dropdown.map((drop) => (
                        <li key={drop.to}>
                          <Link
                            to={drop.to}
                            className="flex items-center py-1 text-neutral-300 hover:text-primary transition"
                          >
                            {drop.icon}
                            {drop.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={item.to}>
                  <a
                    href={item.to}
                    className="flex items-center gap-2 py-2 text-neutral-200 hover:text-primary transition"
                    style={{ fontWeight: 500 }}
                  >
                    {item.icon}
                    {item.label}
                  </a>
                </li>
              )
            )}
          </ul>
        </nav>
        <a
          href="#contact"
          className="mt-5 group flex items-center gap-2 rounded-xl bg-black/70 border border-[#FFB74A44] px-4 py-3 font-semibold text-base text-neutral-200 hover:text-primary transition shadow-[0_0_9px_0_#FFB74A33] focus:outline-none w-full justify-center"
          style={{
            boxShadow: "0 0 2px #1f1603, 0 0 4px 0 #dba54a22",
          }}
        >
          Let&apos;s Talk
          <ArrowUpRight className="w-4 h-4 ml-1 opacity-90 text-primary group-hover:translate-x-1 transition-transform" />
        </a>
      </DrawerContent>
    </Drawer>
  );
}


import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/dashboard", label: "Dashboard" }
];

export default function Header() {
  const { pathname } = useLocation();
  return (
    <header className="w-full flex items-center justify-between py-6 px-8 bg-background shadow-sm fixed top-0 z-30">
      <Link to="/" className="text-2xl font-bold tracking-tight">AI Agency</Link>
      <nav className="flex gap-8">
        {nav.map(item => (
          <Link 
            key={item.to}
            to={item.to}
            className={cn(
              "font-medium hover:text-primary transition-colors",
              pathname === item.to ? "text-primary" : "text-muted-foreground"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

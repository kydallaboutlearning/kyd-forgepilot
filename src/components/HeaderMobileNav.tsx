
import { Link } from "react-router-dom";
import { MobileNavDrawer } from "./MobileNavDrawer";

export default function HeaderMobileNav() {
  return (
    <div className="flex w-full items-center justify-between md:hidden h-12">
      <Link
        to="/"
        className="font-sans text-xl font-semibold tracking-tight flex items-baseline"
        style={{
          color: "#FFB74A",
          letterSpacing: "-0.02em",
          textShadow: "0 0 3px #ffb84a44, 0 1.5px 8px #111, 0 0.5px 1px #ffd08555"
        }}
      >
        Forge
        <span style={{ color: "white", marginLeft: "-2px" }}>Pilot</span>
      </Link>
      {/* Z-50 ensures drawer trigger stays clickable */}
      <div className="z-50"><MobileNavDrawer /></div>
    </div>
  );
}

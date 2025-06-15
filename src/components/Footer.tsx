
import { facebook, instagram, twitter, linkedin, whatsapp, github } from "lucide-react";
import React from "react";

const socials = [
  { href: "https://facebook.com/", icon: facebook, label: "Facebook" },
  { href: "https://instagram.com/", icon: instagram, label: "Instagram" },
  { href: "https://twitter.com/", icon: twitter, label: "X/Twitter" },
  { href: "https://linkedin.com/", icon: linkedin, label: "LinkedIn" },
  { href: "https://wa.me/", icon: whatsapp, label: "WhatsApp" },
  { href: "https://github.com/", icon: github, label: "Github" },
];

export default function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 py-8 px-4 mt-24">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
        <nav className="flex flex-row gap-5 flex-wrap">
          {socials.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="rounded-full p-3 hover:bg-primary/20 hover:text-primary transition-colors text-xl text-neutral-300"
            >
              <Icon size={28} />
            </a>
          ))}
        </nav>
        <span className="text-xs text-neutral-500 tracking-wide text-center">
          &copy; {new Date().getFullYear()} ForgeDomain. All rights reserved.
        </span>
      </div>
    </footer>
  );
}

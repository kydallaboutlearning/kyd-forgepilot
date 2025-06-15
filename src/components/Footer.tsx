
import React, { useEffect, useState } from "react";
import * as lucideIcons from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type SocialLink = {
  id: string;
  label: string;
  url: string;
  icon: string;
};

export default function Footer() {
  const [socials, setSocials] = useState<SocialLink[]>([]);

  useEffect(() => {
    supabase.from("social_links").select("*").then(({ data }) => {
      if (data) setSocials(data);
    });
  }, []);

  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 py-8 px-4 mt-24">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
        <nav className="flex flex-row gap-5 flex-wrap">
          {socials.map(({ url, icon: iconName, label, id }) => {
            // fallback if unknown icon
            const Icon =
              // @ts-ignore
              lucideIcons[iconName.charAt(0).toUpperCase() + iconName.slice(1)] ||
              // @ts-ignore
              lucideIcons[iconName.toLowerCase()] ||
              lucideIcons.Github;
            return (
              <a
                key={id}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-full p-3 hover:bg-primary/20 hover:text-primary transition-colors text-xl text-neutral-300"
              >
                <Icon size={28} />
              </a>
            );
          })}
        </nav>
        <span className="text-xs text-neutral-500 tracking-wide text-center">
          &copy; {new Date().getFullYear()} ForgeDomain. All rights reserved.
        </span>
      </div>
    </footer>
  );
}


import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import HeroAvailableTag from "./HeroAvailableTag";
import HeroMainHeadline from "./HeroMainHeadline";

type HeroSettings = {
  hero_headline: string | null;
  hero_subtext: string | null;
  hero_cta_label: string | null;
  hero_cta_link: string | null;
};

export default function Hero() {
  const [heroSettings, setHeroSettings] = useState<HeroSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const mounted = useRef(false);

  // Fetch settings from Supabase and listen to real-time updates
  useEffect(() => {
    mounted.current = true;

    const fetchSettings = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("site_settings")
        .select("hero_headline, hero_subtext, hero_cta_label, hero_cta_link")
        .limit(1)
        .maybeSingle();
      if (!mounted.current) return;
      if (error || !data) {
        // No row at all, treat as no data (allow fallback)
        setHeroSettings(null);
      } else {
        setHeroSettings(data as HeroSettings);
      }
      setIsLoading(false);
    };

    fetchSettings();

    // Real-time subscription for updates
    const channel = supabase
      .channel("site_settings_hero_realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "site_settings",
        },
        (payload) => {
          if (!mounted.current) return;
          // payload.new will always contain the full latest row
          const newData = payload.new as HeroSettings | null;
          if (newData) {
            setHeroSettings({ ...newData });
          } else {
            setHeroSettings(null);
          }
        }
      )
      .subscribe();

    return () => {
      mounted.current = false;
      supabase.removeChannel(channel);
    };
  }, []);

  // Placeholders ONLY if we have no data
  const noDatabaseRow = !heroSettings;

  const headline = !noDatabaseRow && heroSettings?.hero_headline !== null
    ? heroSettings.hero_headline
    : undefined;
  const subtext = !noDatabaseRow && heroSettings?.hero_subtext !== null
    ? heroSettings.hero_subtext
    : undefined;
  const ctaLabel = !noDatabaseRow && heroSettings?.hero_cta_label !== null
    ? heroSettings.hero_cta_label
    : undefined;
  const ctaLink = !noDatabaseRow && heroSettings?.hero_cta_link !== null
    ? heroSettings.hero_cta_link
    : undefined;

  return (
    <section className="relative flex flex-col items-center justify-center py-20 md:py-28 px-4 text-center bg-black overflow-hidden min-h-[55vh]">
      {/* Bg dot grid */}
      <svg
        className="absolute left-0 top-0 w-full h-full pointer-events-none z-0"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern id="automatix-dots" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#FFB74A" fillOpacity="0.14" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#automatix-dots)" />
      </svg>
      {/* Available tag */}
      <HeroAvailableTag />
      {/* Main headline */}
      <div className="z-10 w-full">
        {headline !== undefined
          ? (
              headline.trim() !== "" ? (
                <h1 className="text-[2.35rem] md:text-[3.2rem] lg:text-[3.55rem] xl:text-[4.2rem] leading-[1.08] font-black font-sans tracking-tight text-center mb-8" style={{ letterSpacing: "-0.017em" }}>
                  <span className="block text-primary">{headline}</span>
                </h1>
              ) : (
                <h1 className="text-[2.35rem] md:text-[3.2rem] lg:text-[3.55rem] xl:text-[4.2rem] leading-[1.08] font-black font-sans tracking-tight text-center mb-8" style={{ letterSpacing: "-0.017em" }}>
                  {/* empty headline shows as blank space */}
                  <span className="block text-primary">&nbsp;</span>
                </h1>
              )
            )
          : <HeroMainHeadline />
        }
      </div>
      {/* Subtext */}
      <p className="z-10 max-w-xl mx-auto text-base md:text-xl text-gray-300 font-sans font-medium mb-7 md:mb-9" style={{ letterSpacing: "0.007em" }}>
        {subtext !== undefined
          ? (subtext.trim() !== "" ? subtext : <span>&nbsp;</span>)
          : "Design services at your fingertips, Pause or cancel anytime."
        }
      </p>
      {/* CTA Button */}
      <a
        href={ctaLink !== undefined && ctaLink.trim() !== "" ? ctaLink : "#works"}
        className="z-10 group relative inline-flex items-center justify-center font-sans text-base md:text-lg font-semibold text-white border border-neutral-700 rounded-md px-7 py-3 mt-2 transition duration-200 bg-black/70 hover:bg-neutral-900 hover:border-primary focus:outline-none"
        style={{ boxShadow: "0 4px 20px #19160c0b" }}
      >
        {ctaLabel !== undefined
          ? (ctaLabel.trim() !== "" ? ctaLabel : <span>&nbsp;</span>)
          : "Learn More"
        }
        <svg className="ml-2 w-5 h-5 -mt-0.5 text-primary transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 18 18"><path d="M5 9h8M9 5l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </a>
      {/* Loader for sync */}
      {isLoading && (
        <div className="z-10 mt-4 text-sm text-neutral-400">Loading…</div>
      )}
    </section>
  );
}


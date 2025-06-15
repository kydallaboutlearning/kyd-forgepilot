import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Brain, LayoutDashboard, Users, type LucideProps } from "lucide-react";
import { type BenefitItem, type BenefitItemIcon } from "@/types/cms";

// --- DYNAMIC ICON LOGIC ---
const icons = {
  Brain,
  LayoutDashboard,
  Users,
};
export type IconName = keyof typeof icons;
const DynamicIcon = ({ name, ...props }: { name: IconName } & LucideProps) => {
  const LucideIcon = icons[name];
  if (!LucideIcon) return null;
  return <LucideIcon {...props} />;
};
// --- END DYNAMIC ICON LOGIC ---

type BenefitsSettings = {
  benefits_headline: string | null;
  benefits_items: BenefitItem[] | null;
};

// Default data to be used as a fallback
const defaultItems: BenefitItem[] = [
  {
    title: "Innovative Approach",
    desc: "Cutting-edge automation strategies tailored for your unique workflows, leveraging the latest in AI advancements.",
    icon: "Brain",
  },
  {
    title: "Seamless Experience",
    desc: "From onboarding to delivery — enjoy frictionless integration and delightfully simple user journeys.",
    icon: "LayoutDashboard",
  },
  {
    title: "Ongoing Partnership",
    desc: "We’re invested in your long-term success, offering proactive support and future-proof solutions.",
    icon: "Users",
  },
];
const defaultHeadline = "Why Automate with Us";

export default function Benefits() {
  const [settings, setSettings] = useState<BenefitsSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    const fetchSettings = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("site_settings")
        .select("benefits_headline, benefits_items")
        .limit(1)
        .maybeSingle();

      if (mounted.current) {
        if (error || !data) {
          setSettings(null);
        } else {
          // Manually parse benefits_items if it's a string
          if (data && typeof data.benefits_items === 'string') {
            try {
              data.benefits_items = JSON.parse(data.benefits_items);
            } catch (e) {
              console.error("Failed to parse benefits_items:", e);
              data.benefits_items = null;
            }
          }
          setSettings(data as BenefitsSettings);
        }
        setIsLoading(false);
      }
    };

    fetchSettings();

    const channel = supabase
      .channel("site_settings_benefits_realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "site_settings",
        },
        (payload) => {
          if (mounted.current) {
            const newData = payload.new as BenefitsSettings | null;
            if (newData) {
               if (newData && typeof newData.benefits_items === 'string') {
                try {
                  newData.benefits_items = JSON.parse(newData.benefits_items);
                } catch (e) {
                  console.error("Failed to parse real-time benefits_items:", e);
                  newData.benefits_items = null;
                }
              }
              setSettings({ ...newData });
            } else {
              setSettings(null);
            }
          }
        }
      )
      .subscribe();

    return () => {
      mounted.current = false;
      supabase.removeChannel(channel);
    };
  }, []);

  const headline = settings?.benefits_headline || defaultHeadline;
  const items = settings?.benefits_items && settings.benefits_items.length > 0 ? settings.benefits_items : defaultItems;

  return (
    <section
      className="w-full flex flex-col px-4 py-20 md:py-28 items-center bg-black border-b border-neutral-900"
      id="whyus"
    >
      <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider text-primary mb-12 text-center font-sans">
        {isLoading ? "Loading..." : headline}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl w-full">
        {items.map((b, idx) => (
          <div
            key={b.title}
            className="bg-neutral-900 rounded-2xl flex flex-col items-center p-8 md:p-12 shadow-md border border-neutral-800 text-center animate-fade-in"
            style={{ minHeight: 340 }}
          >
            <div className="mb-7 w-full flex items-center justify-center">
              <span className="relative inline-flex items-center justify-center" style={{ width: 110, height: 82 }}>
                <svg
                  viewBox="0 0 110 82"
                  fill="none"
                  className="absolute left-0 top-0 w-full h-full"
                  style={{ zIndex: 1 }}
                >
                  {[...Array(6)].map((_, i) =>
                    <circle
                      key={i}
                      cx={16 + (i % 3) * 40}
                      cy={15 + Math.floor(i / 3) * 38}
                      r="1.3"
                      fill="#fff"
                      fillOpacity="0.13"
                    />
                  )}
                  {Array.from({ length: 3 }).map((_, r) =>
                    Array.from({ length: 4 }).map((_, c) => (
                      <rect
                        key={`${r}-${c}`}
                        x={15 + c * 24}
                        y={12 + r * 22}
                        width="8"
                        height="8"
                        fill="#fff"
                        fillOpacity="0.06"
                        rx="2"
                      />
                    ))
                  )}
                </svg>
                <span
                  className="relative z-10 flex items-center justify-center rounded-full shadow-lg animate-bounce-benefit"
                  style={{
                    width: 54,
                    height: 54,
                    background: "linear-gradient(135deg,#FFB74A,#FDD47E)",
                  }}
                >
                  <DynamicIcon name={b.icon} className="w-9 h-9 text-white" />
                </span>
              </span>
            </div>
            <div className="text-lg font-bold uppercase tracking-wide text-white mb-2 font-sans">
              {b.title}
            </div>
            <div className="text-gray-300 font-sans">{b.desc}</div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes bounce-benefit {
          0%, 100% { transform: translateY(0);}
          10%, 30%, 50%, 70% { transform: translateY(-7px);}
          20%, 40%, 60%, 80% { transform: translateY(2px);}
          90% {transform: translateY(-2px);}
        }
        .animate-bounce-benefit {
          animation: bounce-benefit 3.4s cubic-bezier(0.41,0.63,0.43,1.12) infinite;
        }
      `}</style>
    </section>
  );
}

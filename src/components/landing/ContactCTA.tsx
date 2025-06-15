
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Helper to check if object has the expected CTA fields
function isContactCTAData(data: any): data is {
  contact_cta_headline?: string;
  contact_cta_subtext?: string;
  contact_cta_button_label?: string;
  contact_cta_button_url?: string;
} {
  // Avoid nulls and unexpected error shapes
  return (
    data &&
    typeof data === "object" &&
    ("contact_cta_headline" in data ||
      "contact_cta_subtext" in data ||
      "contact_cta_button_label" in data ||
      "contact_cta_button_url" in data)
  );
}

export default function ContactCTA() {
  const { data, isLoading } = useQuery({
    queryKey: ["site_settings", "contact_cta"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select(
          "contact_cta_headline,contact_cta_subtext,contact_cta_button_label,contact_cta_button_url"
        )
        .limit(1)
        .maybeSingle();
      if (error) return { error: error.message }; // Do not throw, return error indicator
      return data;
    },
  });

  if (isLoading || !data) {
    return null;
  }

  // Defensive: if data is not ContactCTA expected shape, fallback to defaults
  const headline =
    isContactCTAData(data) && typeof data.contact_cta_headline === "string"
      ? data.contact_cta_headline
      : "AUTOMATE YOUR NEXT BIG IDEA TODAY";
  const subtext =
    isContactCTAData(data) && typeof data.contact_cta_subtext === "string"
      ? data.contact_cta_subtext
      : "Ready to see what’s possible?\nWork with our team of AI automation experts.";
  const btnLabel =
    isContactCTAData(data) && typeof data.contact_cta_button_label === "string"
      ? data.contact_cta_button_label
      : "CONTACT US";
  const btnUrl =
    isContactCTAData(data) && typeof data.contact_cta_button_url === "string"
      ? data.contact_cta_button_url
      : "#contact";

  return (
    <section className="w-full flex flex-col items-center py-20 bg-neutral-900 border-b border-neutral-800">
      <div
        className="bg-black rounded-3xl px-8 md:px-14 py-12 md:py-16 shadow-2xl text-center max-w-lg md:max-w-2xl w-full"
        style={{
          boxShadow: "0 8px 50px 0 #000000aa",
        }}
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#FFA726] uppercase mb-5 tracking-wider font-sans">
          {headline}
        </h2>
        <p className="text-gray-300 text-lg md:text-xl mb-10 font-sans whitespace-pre-line">
          {subtext}
        </p>
        <a
          href={btnUrl}
          className="inline-block bg-[#FFA726] text-black px-10 md:px-12 py-3 md:py-4 rounded-lg shadow-xl text-base md:text-lg font-black uppercase tracking-wide hover:scale-105 transition-transform focus:outline-none hover:bg-[#ffc566] focus:bg-[#ffd993]"
          style={{ boxShadow: "0 6px 34px #FFA72633" }}
        >
          {btnLabel}
        </a>
      </div>
    </section>
  );
}

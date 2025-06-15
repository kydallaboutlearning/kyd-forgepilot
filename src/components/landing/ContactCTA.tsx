
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type ContactCTAContent = {
  contact_cta_headline: string;
  contact_cta_subtext: string;
  contact_cta_button_label: string;
  contact_cta_button_url: string;
};

export default function ContactCTA() {
  const [content, setContent] = useState<ContactCTAContent>({
    contact_cta_headline: "Automate your next big idea today",
    contact_cta_subtext: "Ready to see what’s possible? Work with our team of AI automation experts.",
    contact_cta_button_label: "Contact Us",
    contact_cta_button_url: "#contact",
  });

  useEffect(() => {
    supabase
      .from("site_settings")
      .select(
        "contact_cta_headline, contact_cta_subtext, contact_cta_button_label, contact_cta_button_url"
      )
      .limit(1)
      .maybeSingle()
      .then((res) => {
        if (res.data) {
          setContent((old) => ({
            contact_cta_headline: res.data.contact_cta_headline || old.contact_cta_headline,
            contact_cta_subtext: res.data.contact_cta_subtext || old.contact_cta_subtext,
            contact_cta_button_label: res.data.contact_cta_button_label || old.contact_cta_button_label,
            contact_cta_button_url: res.data.contact_cta_button_url || old.contact_cta_button_url,
          }));
        }
      });
  }, []);

  return (
    <section className="w-full flex flex-col items-center py-20 md:py-32 bg-neutral-900 border-b border-neutral-800">
      <div className="bg-black rounded-3xl px-8 md:px-14 py-12 md:py-16 shadow-2xl text-center max-w-2xl w-full border border-neutral-800">
        <h2 className="text-3xl md:text-4xl font-black text-primary uppercase mb-5 tracking-wider font-sans">
          {content.contact_cta_headline}
        </h2>
        <p className="text-gray-300 text-xl md:text-2xl mb-10 font-sans">
          {content.contact_cta_subtext}
        </p>
        <a
          href={content.contact_cta_button_url}
          className="inline-block bg-primary text-primary-foreground px-12 py-4 rounded-lg shadow-xl text-lg md:text-2xl font-black uppercase tracking-wide hover:scale-105 transition-transform focus:outline-none hover:bg-[#ffc566] focus:bg-[#ffd993]"
          style={{ boxShadow: "0 6px 34px #FFA72633" }}
        >
          {content.contact_cta_button_label}
        </a>
      </div>
    </section>
  );
}

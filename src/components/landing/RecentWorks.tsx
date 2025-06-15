
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

type Project = {
  id: string;
  title: string;
  description: string;
  images: string[];
  results: { kpi: string; desc: string }[] | null;
  is_featured?: boolean;
  featured_order?: number | null;
};

const defaultHeadline = "Recent Works";

const fallbackProjects: Project[] = [
  {
    id: "fallback-1",
    title: "Voice AI Agent",
    images: ["https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800"],
    description: "Conversational agent for 24/7 lead qualification & booking.",
    results: [{ kpi: "+25% conversion", desc: "" }, { kpi: "~4x faster response", desc: "" }],
  },
  {
    id: "fallback-2",
    title: "Medical Transcription Automation",
    images: ["https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800"],
    description: "Automated transcription for clinics, HIPAA compliant.",
    results: [{ kpi: "500+ hrs saved", desc: "" }, { kpi: "99% accuracy", desc: "" }],
  },
  {
    id: "fallback-3",
    title: "Real Estate Bot",
    images: ["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800"],
    description: "Property chatbot handling 120+ customer queries daily.",
    results: [{ kpi: "4.9⭐ rating", desc: "" }, { kpi: "12k+ users", desc: "" }],
  },
];

export default function RecentWorks() {
  const [headline, setHeadline] = useState(defaultHeadline);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);

      const settingsPromise = supabase
        .from("site_settings")
        .select("recent_works_headline")
        .limit(1)
        .maybeSingle();

      const projectsPromise = supabase
        .from("portfolio_items")
        .select("id, title, description, images, results, is_featured, featured_order")
        .eq("is_featured", true)
        .order("featured_order", { ascending: true, nullsFirst: true })
        .limit(12); // reasonable upper bound

      const [settingsResult, projectsResult] = await Promise.all([
        settingsPromise,
        projectsPromise,
      ]);

      if (settingsResult.data?.recent_works_headline) {
        setHeadline(settingsResult.data.recent_works_headline);
      }

      if (projectsResult.data) {
        setProjects(projectsResult.data as Project[]);
      }

      setLoading(false);
    };

    fetchContent();
  }, []);

  const displayProjects = projects.length > 0 ? projects : fallbackProjects;

  return (
    <section className="w-full py-20 px-4 max-w-6xl mx-auto bg-black border-b border-neutral-900 flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-black uppercase mb-12 text-primary tracking-wider text-center font-sans">
        {headline}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8 w-full">
        {(loading ? Array(3).fill(null) : displayProjects).map((proj: Project, idx) =>
          loading ? (
            <div key={idx} className="bg-neutral-900 rounded-2xl shadow-xl overflow-hidden border border-neutral-800 animate-pulse" style={{ minHeight: 410 }}>
              <div className="w-full h-52 bg-neutral-800"></div>
              <div className="p-7">
                <div className="h-6 w-3/4 bg-neutral-800 rounded mb-3"></div>
                <div className="h-4 w-full bg-neutral-800 rounded mb-4"></div>
                <div className="h-4 w-1/2 bg-neutral-800 rounded"></div>
              </div>
            </div>
          ) : (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 52 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.65, delay: idx * 0.15 }}
              className="bg-neutral-900 rounded-2xl shadow-xl overflow-hidden border border-neutral-800 transition-transform hover:scale-105 hover:shadow-2xl animate-fade-in group"
              style={{ minHeight: 410 }}
            >
              <img
                src={proj.images?.[0] || "/placeholder.svg"}
                alt={proj.title}
                className="w-full h-52 object-cover group-hover:opacity-90 transition duration-150"
              />
              <div className="p-7">
                <div className="text-lg font-bold uppercase text-white mb-2 font-sans">
                  {proj.title}
                </div>
                <div className="text-gray-400 mb-4">{proj.description}</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {proj.results?.map((metric) => (
                    <span
                      key={metric.kpi}
                      className="bg-accent text-accent-foreground rounded-full px-3 py-1 text-xs font-semibold"
                    >
                      {metric.kpi}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )
        )}
      </div>
      <Link to="/portfolio" className="mt-5">
        <Button className="px-7 py-3 text-base rounded-lg shadow-lg bg-primary text-primary-foreground transition hover:scale-105 hover:bg-primary/90">
          View Portfolio
        </Button>
      </Link>
    </section>
  );
}

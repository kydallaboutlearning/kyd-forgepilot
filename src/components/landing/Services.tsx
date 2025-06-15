import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
// Selected icons:
// - Custom Projects: Wrench
// - Smart Automation: Brain
// - Voice Agents: Bot
// - Analytics Dashboards: BarChart
// - AI Training: LayoutDashboard

import {
  Wrench,
  Bot,
  BarChart,
  Brain,
  LayoutDashboard,
} from "lucide-react";

export default function Services() {
  // Fetch services from Supabase
  const { data: services = [], isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase.from("services").select("*").order("order_index", { ascending: true });
      if (error) throw error;
      return data;
    }
  });

  return (
    <section className="py-24 w-full flex flex-col items-center px-4 bg-black border-b border-neutral-900">
      <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider mb-11 text-primary text-center font-sans">
        Our Expertise
      </h2>
      {isLoading ? <div>Loading…</div> :
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl w-full">
        {services.map((s: any, idx: number) => {
          // Icon is a string
          let IconComp = null;
          switch(s.icon) {
            case "wrench": IconComp = <span className="w-9 h-9 text-primary">🔧</span>; break;
            case "brain": IconComp = <span className="w-9 h-9 text-primary">🧠</span>; break;
            case "bot": IconComp = <span className="w-9 h-9 text-primary">🤖</span>; break;
            case "bar-chart": IconComp = <span className="w-9 h-9 text-primary">📊</span>; break;
            case "layout-dashboard": IconComp = <span className="w-9 h-9 text-primary">📋</span>; break;
            default: IconComp = <span className="w-9 h-9 text-primary">✨</span>;
          }
          return (
            <div
              key={s.id}
              className="flex flex-col items-center bg-neutral-900 border border-neutral-800 rounded-2xl px-8 py-12 shadow-lg text-center animate-fade-in"
              style={{ minHeight: 260 }}
            >
              <div className="mb-3">{IconComp}</div>
              <div className="font-bold text-md mb-2 uppercase tracking-wide text-white font-sans">{s.name}</div>
              <div className="text-gray-300 font-sans">{s.description}</div>
            </div>
          )
        })}
      </div>}
    </section>
  )
}

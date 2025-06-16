
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type Plan = {
  id: string;
  name: string;
  description: string;
  price_monthly: number;
  price_yearly: number;
  features: string[];
  pricing_type: 'one-time' | 'monthly' | 'yearly';
};

export default function Pricing() {
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly");
  
  const { data: plans = [] } = useQuery({
    queryKey: ["pricing_plans"],
    queryFn: async () => {
      const { data, error } = await supabase.from("pricing_plans").select("*").order("order_index", { ascending: true });
      if (error) throw error;
      return data as Plan[];
    }
  });

  // Filter plans that support the current period or are one-time
  const visiblePlans = plans.filter(plan => 
    plan.pricing_type === 'one-time' || 
    plan.pricing_type === period || 
    (plan.pricing_type === 'monthly' && (plan.price_monthly || plan.price_yearly))
  );

  function formatPrice(plan: Plan) {
    if (plan.pricing_type === 'one-time') {
      return {
        amount: plan.price_monthly?.toLocaleString() || '0',
        suffix: 'one-time'
      };
    } else if (plan.pricing_type === 'yearly') {
      return {
        amount: plan.price_yearly?.toLocaleString() || '0',
        suffix: '/yr'
      };
    } else {
      // Monthly or dual pricing
      const amount = period === 'yearly' ? plan.price_yearly : plan.price_monthly;
      return {
        amount: amount?.toLocaleString() || '0',
        suffix: period === 'yearly' ? '/yr' : '/mo'
      };
    }
  }

  // Show period toggle only if there are plans that support both monthly and yearly
  const showPeriodToggle = plans.some(plan => 
    plan.pricing_type === 'monthly' && plan.price_monthly && plan.price_yearly
  );

  return (
    <section id="pricing" className="py-24 w-full flex flex-col items-center px-4 bg-neutral-900 border-b border-neutral-800">
      <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider mb-11 text-primary text-center font-sans">Pricing</h2>
      
      {showPeriodToggle && (
        <motion.div layout className="mb-10 flex items-center gap-3 bg-black p-2 rounded-xl shadow border border-neutral-800">
          <button
            className={`px-6 py-2 rounded-md font-bold uppercase transition-all tracking-wide text-lg ${period === "monthly" ? "bg-primary text-black shadow-lg scale-105" : "text-gray-400"}`}
            onClick={() => setPeriod("monthly")}
          >
            Monthly
          </button>
          <button
            className={`px-6 py-2 rounded-md font-bold uppercase transition-all tracking-wide text-lg ${period === "yearly" ? "bg-primary text-black shadow-lg scale-105" : "text-gray-400"}`}
            onClick={() => setPeriod("yearly")}
          >
            Yearly
          </button>
        </motion.div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 w-full max-w-6xl">
        {visiblePlans.map((plan, idx) => {
          const priceInfo = formatPrice(plan);
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.75 }}
              transition={{ duration: 0.65, delay: idx * 0.13 }}
              className={`bg-black rounded-2xl border border-neutral-800 p-12 flex flex-col items-center shadow-2xl animate-fade-in ${
                plan.name?.toLowerCase().includes('pro') ? 'ring-2 ring-primary' : ''
              }`}
            >
              <div className="text-xl font-extrabold uppercase mb-2 tracking-wider text-primary font-sans">{plan.name}</div>
              <div className="text-sm text-neutral-400 mb-4 text-center">{plan.description}</div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${plan.id}-${period}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.23 }}
                  className="text-5xl font-black mb-2 text-white font-sans text-center"
                >
                  ${priceInfo.amount}
                  <span className="text-lg font-semibold text-gray-400">/{priceInfo.suffix}</span>
                </motion.div>
              </AnimatePresence>
              
              <div className="flex flex-col gap-2 my-6 w-full items-start">
                {plan.features?.length ? plan.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-base text-gray-300">
                    <span className="text-orange-400 font-black">✓</span> {feat}
                  </div>
                )) : (
                  <div className="flex items-center gap-2 text-base text-gray-300">
                    <span className="text-orange-400 font-black">✓</span> Custom solution
                  </div>
                )}
              </div>
              
              <a 
                href="#contact" 
                className="mt-6 bg-primary text-black px-8 py-3 rounded-md font-black uppercase shadow-lg hover:scale-105 transition-transform w-full text-center tracking-wide hover:bg-[#ffc566] focus:bg-[#ffd993]" 
                style={{ boxShadow: "0 4px 32px #FFA72622" }}
              >
                Get Started
              </a>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

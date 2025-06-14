
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const plans = [
  {
    name: "Standard",
    price: { monthly: 750, yearly: 7200 },
    features: [
      "Strategy Session",
      "Custom Automation Build",
      "Support via Email",
      "Integrates With 3 Platforms"
    ]
  },
  {
    name: "Pro",
    price: { monthly: 1900, yearly: 18000 },
    features: [
      "All in Standard",
      "Priority Onboarding",
      "Phone & Slack Support",
      "Unlimited Integrations",
      "Quarterly Automation Audit"
    ]
  }
];

export default function Pricing() {
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly");
  return (
    <section className="py-24 w-full flex flex-col items-center px-4 bg-neutral-900 border-b border-neutral-800">
      <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider mb-11 text-primary text-center font-sans">Pricing</h2>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14 w-full max-w-4xl">
        {plans.map((plan, idx) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.75 }}
            transition={{ duration: 0.65, delay: idx * 0.13 }}
            className={`bg-black rounded-2xl border border-neutral-800 p-12 flex flex-col items-center shadow-2xl animate-fade-in ${
              plan.name === 'Pro' ? 'ring-2 ring-primary' : ''
            }`}
          >
            <div className="text-xl font-extrabold uppercase mb-2 tracking-wider text-primary font-sans">{plan.name}</div>
            <AnimatePresence mode="wait">
              <motion.div
                key={period}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.23 }}
                className="text-5xl font-black mb-2 text-white font-sans"
              >
                ${plan.price[period].toLocaleString()}
                <span className="text-lg font-semibold text-gray-400">/{period === "monthly" ? "mo" : "yr"}</span>
              </motion.div>
            </AnimatePresence>
            <div className="flex flex-col gap-2 my-6 w-full items-start">
              {plan.features.map(feat => (
                <div key={feat} className="flex items-center gap-2 text-base text-gray-300">
                  <span className="text-orange-400 font-black">✓</span> {feat}
                </div>
              ))}
            </div>
            <a href="#contact" className="mt-6 bg-primary text-black px-8 py-3 rounded-md font-black uppercase shadow-lg hover:scale-105 transition-transform w-full text-center tracking-wide hover:bg-[#ffc566] focus:bg-[#ffd993]" style={{ boxShadow: "0 4px 32px #FFA72622" }}>Get Started</a>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

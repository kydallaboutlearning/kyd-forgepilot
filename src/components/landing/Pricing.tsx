import { useState } from "react";

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
    <section className="py-20 w-full flex flex-col items-center px-4 bg-neutral-900 border-b border-neutral-800">
      <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider mb-9 text-primary text-center">Pricing</h2>
      <div className="mb-8 flex items-center gap-3 bg-black p-2 rounded-xl shadow border border-neutral-800">
        <button
          className={`px-5 py-2 rounded-md font-bold uppercase transition-colors tracking-wide text-lg ${period === "monthly" ? "bg-primary text-black" : "text-gray-400"}`}
          onClick={() => setPeriod("monthly")}
        >
          Monthly
        </button>
        <button
          className={`px-5 py-2 rounded-md font-bold uppercase transition-colors tracking-wide text-lg ${period === "yearly" ? "bg-primary text-black" : "text-gray-400"}`}
          onClick={() => setPeriod("yearly")}
        >
          Yearly
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-4xl">
        {plans.map(plan => (
          <div key={plan.name} className="bg-black rounded-2xl border border-neutral-800 p-10 flex flex-col items-center shadow-lg animate-fade-in">
            <div className="text-xl font-semibold uppercase mb-2 tracking-wider text-primary">{plan.name}</div>
            <div className="text-4xl font-extrabold mb-2 text-white">
              ${plan.price[period].toLocaleString()}
              <span className="text-lg font-medium text-gray-400">/{period === "monthly" ? "mo" : "yr"}</span>
            </div>
            <div className="flex flex-col gap-2 my-5 w-full items-start">
              {plan.features.map(feat => (
                <div key={feat} className="flex items-center gap-2 text-base text-gray-400">
                  <span className="text-orange-400 font-bold">✓</span> {feat}
                </div>
              ))}
            </div>
            <a href="#contact" className="mt-6 bg-primary text-black px-8 py-3 rounded-md font-bold uppercase shadow hover:scale-105 transition-transform w-full text-center tracking-wide">Get Started</a>
          </div>
        ))}
      </div>
    </section>
  )
}

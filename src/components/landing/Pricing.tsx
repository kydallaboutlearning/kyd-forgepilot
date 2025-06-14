
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
    <section className="py-14 md:py-24 w-full flex flex-col items-center px-4 bg-secondary/60">
      <h2 className="text-2xl md:text-3xl font-bold mb-7 text-center">Pricing</h2>
      <div className="mb-8 flex items-center gap-3 bg-card p-2 rounded-xl shadow">
        <button
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${period === "monthly" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
          onClick={() => setPeriod("monthly")}
        >
          Monthly
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${period === "yearly" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
          onClick={() => setPeriod("yearly")}
        >
          Yearly
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl">
        {plans.map(plan => (
          <div key={plan.name} className="bg-card rounded-2xl border p-8 flex flex-col items-center shadow-md animate-fade-in">
            <div className="text-xl font-semibold mb-2">{plan.name}</div>
            <div className="text-4xl font-bold mb-2">
              ${plan.price[period].toLocaleString()}
              <span className="text-lg font-medium text-muted-foreground">/{period === "monthly" ? "mo" : "yr"}</span>
            </div>
            <div className="flex flex-col gap-2 my-5 w-full items-start">
              {plan.features.map(feat => (
                <div key={feat} className="flex items-center gap-2 text-base text-muted-foreground">
                  <span className="text-green-500 font-bold">✓</span> {feat}
                </div>
              ))}
            </div>
            <a href="#contact" className="mt-5 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold shadow hover:scale-105 transition-transform w-full text-center">Get Started</a>
          </div>
        ))}
      </div>
    </section>
  )
}

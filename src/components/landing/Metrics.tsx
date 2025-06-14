
const stats = [
  { label: "Users", value: "150k+" },
  { label: "Avg. Rating", value: "4.9" },
  { label: "Satisfaction", value: "99%" },
];

export default function Metrics() {
  return (
    <section className="w-full py-14 md:py-16 flex items-center justify-center">
      <div className="bg-card/80 border border-muted rounded-2xl flex gap-10 px-10 py-6 shadow-md">
        {stats.map((stat, i) => (
          <div className="flex flex-col items-center min-w-[100px]" key={stat.label}>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
            <div className="text-muted-foreground font-medium text-base">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

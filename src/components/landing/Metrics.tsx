const stats = [
  { label: "Users", value: "150k+" },
  { label: "Avg. Rating", value: "4.9" },
  { label: "Satisfaction", value: "99%" },
];

export default function Metrics() {
  return (
    <section className="w-full py-14 md:py-16 flex items-center justify-center bg-neutral-900 border-b border-neutral-800">
      <div className="bg-black border border-neutral-800 rounded-2xl flex gap-12 px-16 py-8 shadow-md">
        {stats.map((stat, i) => (
          <div className="flex flex-col items-center min-w-[110px]" key={stat.label}>
            <div className="text-4xl md:text-5xl font-extrabold text-primary mb-1">{stat.value}</div>
            <div className="text-gray-400 font-bold uppercase text-sm tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

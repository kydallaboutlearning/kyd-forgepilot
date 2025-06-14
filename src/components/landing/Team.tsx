const team = [
  { name: "Jordan Baker", role: "Founder, AI Architect", photo: "https://randomuser.me/api/portraits/men/42.jpg" },
  { name: "Casey Kim", role: "Product Lead", photo: "https://randomuser.me/api/portraits/women/67.jpg" },
  { name: "Morgan Patel", role: "Automation Engineer", photo: "https://randomuser.me/api/portraits/men/61.jpg" },
  { name: "Alex Zhang", role: "Client Success", photo: "https://randomuser.me/api/portraits/men/68.jpg" }
];

export default function Team() {
  return (
    <section className="w-full py-20 px-4 flex flex-col items-center bg-neutral-900 border-b border-neutral-800">
      <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider mb-10 text-primary text-center">The People Behind the Magic</h2>
      <div className="flex flex-wrap gap-12 justify-center max-w-5xl w-full">
        {team.map(person => (
          <div key={person.name} className="flex flex-col items-center bg-black border border-neutral-800 rounded-2xl px-7 py-10 animate-fade-in shadow text-center min-w-[170px]">
            <img src={person.photo} alt={person.name} className="w-20 h-20 rounded-full mb-3 object-cover border-2 border-primary" />
            <div className="font-bold text-lg text-white mb-1">{person.name}</div>
            <div className="text-base text-gray-400">{person.role}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

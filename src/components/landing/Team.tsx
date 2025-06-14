
const team = [
  { name: "Jordan Baker", role: "Founder, AI Architect", photo: "https://randomuser.me/api/portraits/men/42.jpg" },
  { name: "Casey Kim", role: "Product Lead", photo: "https://randomuser.me/api/portraits/women/67.jpg" },
  { name: "Morgan Patel", role: "Automation Engineer", photo: "https://randomuser.me/api/portraits/men/61.jpg" },
  { name: "Alex Zhang", role: "Client Success", photo: "https://randomuser.me/api/portraits/men/68.jpg" }
];

export default function Team() {
  return (
    <section className="w-full py-24 px-4 flex flex-col items-center bg-neutral-900 border-b border-neutral-800">
      <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider mb-12 text-primary text-center font-sans">The People Behind the Magic</h2>
      <div className="flex flex-wrap gap-12 justify-center max-w-5xl w-full">
        {team.map(person => (
          <div key={person.name} className="flex flex-col items-center bg-black border border-neutral-800 rounded-2xl px-9 py-12 animate-fade-in shadow text-center min-w-[180px]">
            <img src={person.photo} alt={person.name} className="w-24 h-24 rounded-full mb-4 object-cover border-2 border-primary" />
            <div className="font-bold text-xl text-white mb-1 font-sans">{person.name}</div>
            <div className="text-base text-gray-400 font-sans">{person.role}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

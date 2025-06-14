
const team = [
  { name: "Jordan Baker", role: "Founder, AI Architect", photo: "https://randomuser.me/api/portraits/men/42.jpg" },
  { name: "Casey Kim", role: "Product Lead", photo: "https://randomuser.me/api/portraits/women/67.jpg" },
  { name: "Morgan Patel", role: "Automation Engineer", photo: "https://randomuser.me/api/portraits/men/61.jpg" },
  { name: "Alex Zhang", role: "Client Success", photo: "https://randomuser.me/api/portraits/men/68.jpg" }
];

export default function Team() {
  return (
    <section className="w-full py-14 px-4 flex flex-col items-center bg-gradient-to-br from-background via-secondary/60 to-accent/20">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">The People Behind the Magic</h2>
      <div className="flex flex-wrap gap-9 justify-center max-w-5xl w-full">
        {team.map(person => (
          <div key={person.name} className="flex flex-col items-center bg-card/90 border rounded-2xl px-6 py-6 animate-fade-in shadow text-center min-w-[170px]">
            <img src={person.photo} alt={person.name} className="w-20 h-20 rounded-full mb-3 object-cover border-2 border-primary" />
            <div className="font-semibold text-lg">{person.name}</div>
            <div className="text-base text-muted-foreground">{person.role}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

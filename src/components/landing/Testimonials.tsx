
const testimonials = [
  {
    text: "An absolute game-changer. Automated our lead gen and improved our response time drastically.",
    name: "Ava Carter",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5
  },
  {
    text: "Truly seamless experience and the AI agent fits our workflow perfectly.",
    name: "Liam Nguyen",
    avatar: "https://randomuser.me/api/portraits/men/33.jpg",
    rating: 5
  },
  {
    text: "Great communication, innovative ideas. Highly recommend for automation & AI.",
    name: "Sofia Martinez",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 4.5
  },
];

export default function Testimonials() {
  return (
    <section className="w-full py-16 flex flex-col items-center bg-accent/30">
      <h2 className="text-2xl md:text-3xl font-bold mb-7 text-center">What Our Clients Say</h2>
      <div className="flex flex-wrap gap-8 justify-center">
        {testimonials.map((t, i) => (
          <div key={i} className="max-w-sm w-full bg-card/95 rounded-2xl px-7 py-8 border shadow animate-fade-in flex flex-col items-center text-center">
            <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full mb-3 object-cover" />
            <div className="text-lg font-medium mb-2">{t.text}</div>
            <div className="flex items-center justify-center gap-1 mb-1">
              {Array(Math.floor(t.rating)).fill(0).map((_, idx) => (
                <span key={idx} className="text-yellow-400 text-lg">★</span>
              ))}
              {t.rating % 1 !== 0 && <span className="text-yellow-400 text-lg">½</span>}
            </div>
            <div className="font-semibold text-primary">{t.name}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

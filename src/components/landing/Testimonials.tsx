
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
    <section className="w-full py-20 flex flex-col items-center bg-black border-b border-neutral-900">
      <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider mb-12 text-primary text-center font-sans">What Our Clients Say</h2>
      <div className="flex flex-wrap gap-12 justify-center">
        {testimonials.map((t, i) => (
          <div key={i} className="max-w-sm w-full bg-neutral-900 rounded-2xl px-8 py-10 border border-neutral-800 shadow-lg animate-fade-in flex flex-col items-center text-center">
            <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full mb-3 object-cover border-2 border-primary" />
            <div className="text-lg font-semibold text-white mb-3 font-sans">{t.text}</div>
            <div className="flex items-center justify-center gap-1 mb-2">
              {Array(Math.floor(t.rating)).fill(0).map((_, idx) => (
                <span key={idx} className="text-orange-400 text-lg">★</span>
              ))}
              {t.rating % 1 !== 0 && <span className="text-orange-400 text-lg">½</span>}
            </div>
            <div className="font-bold text-primary font-sans">{t.name}</div>
          </div>
        ))}
      </div>
    </section>
  )
}


export default function CTA() {
  return (
    <section className="w-full flex flex-col items-center py-12 md:py-20">
      <div className="bg-primary/90 rounded-2xl px-10 py-10 shadow-lg text-center max-w-xl w-full animate-fade-in-up">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-3">Automate your next big idea today</h2>
        <p className="text-primary-foreground/80 text-lg mb-7">Ready to see what’s possible?<br/>Work with our team of AI automation experts.</p>
        <a href="#contact" className="inline-block bg-accent text-accent-foreground px-7 py-3 rounded-lg shadow-lg text-lg font-semibold mt-2 hover:scale-105 transition-transform focus:outline-none">Contact Us</a>
      </div>
    </section>
  )
}


export default function FinalCTA() {
  return (
    <section className="w-full py-24 px-4 bg-neutral-900 text-primary-foreground flex flex-col items-center border-t border-neutral-800 relative overflow-hidden">
      {/* Subtle grid/dot SVG background */}
      <svg className="absolute left-0 top-0 w-full h-full pointer-events-none opacity-10 z-0" width="100%" height="100%">
        <defs>
          <pattern id="footer-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="#444" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#footer-dots)" />
      </svg>
      <h2 className="z-10 text-3xl md:text-4xl font-extrabold uppercase tracking-wider text-center mb-8 text-primary drop-shadow font-sans">Let’s Turn Your Dream Into Reality</h2>
      <div className="z-10 text-2xl text-gray-300 mb-12 text-center max-w-lg font-sans">Ready to discuss your next project? Book a call, start a chat or just say hi.</div>
      <a href="#contact" className="z-10 bg-primary text-black px-12 py-5 rounded-xl text-2xl font-black uppercase shadow-2xl hover:scale-105 transition-transform focus:outline-none hover:bg-[#ffc566] focus:bg-[#ffd993]" style={{ boxShadow: "0 8px 34px #FFA72644" }}>Get In Touch</a>
    </section>
  )
}


import React from 'react'

export default function CTA() {
  return (
    <section className="w-full flex flex-col items-center py-20 md:py-32 bg-neutral-900 border-b border-neutral-800">
      <div className="bg-black rounded-3xl px-14 py-16 shadow-2xl text-center max-w-2xl w-full animate-fade-in-up border border-neutral-800">
        <h2 className="text-3xl md:text-4xl font-black text-primary uppercase mb-5 tracking-wider font-sans">Automate your next big idea today</h2>
        <p className="text-gray-300 text-xl md:text-2xl mb-10 font-sans">Ready to see what’s possible?<br/>Work with our team of AI automation experts.</p>
        <a
          href="#contact"
          className="inline-block bg-primary text-primary-foreground px-12 py-4 rounded-lg shadow-xl text-lg md:text-2xl font-black uppercase tracking-wide hover:scale-105 transition-transform focus:outline-none hover:bg-[#ffc566] focus:bg-[#ffd993]"
          style={{ boxShadow: "0 6px 34px #FFA72633" }}
        >
          Contact Us
        </a>
      </div>
    </section>
  )
}

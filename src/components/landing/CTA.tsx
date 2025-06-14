import React from 'react'

export default function CTA() {
  return (
    <section className="w-full flex flex-col items-center py-16 md:py-28 bg-neutral-900 border-b border-neutral-800">
      <div className="bg-black rounded-2xl px-12 py-14 shadow-xl text-center max-w-2xl w-full animate-fade-in-up border border-neutral-800">
        <h2 className="text-3xl md:text-4xl font-black text-primary uppercase mb-4 tracking-wider">Automate your next big idea today</h2>
        <p className="text-gray-300 text-lg mb-8">Ready to see what’s possible?<br/>Work with our team of AI automation experts.</p>
        <a
          href="#contact"
          className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-md shadow-lg text-lg font-semibold uppercase tracking-wide hover:scale-105 transition-transform focus:outline-none"
        >
          Contact Us
        </a>
      </div>
    </section>
  )
}

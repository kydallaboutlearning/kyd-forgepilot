
// Removed invalid import: import { logos } from "@/data/constants";

const logos = [
  { src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", alt: "Microsoft" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg", alt: "Nike" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg", alt: "Netflix" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg", alt: "IBM" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Spotify_logo_without_text.svg", alt: "Spotify" }
];

export default function PartnerLogos() {
  return (
    <section className="w-full py-8 md:py-10 flex flex-col items-center bg-neutral-900 border-y border-neutral-800">
      <div className="mb-2 text-gray-400 text-base tracking-wider font-bold uppercase">Trusted by</div>
      <div className="flex flex-wrap items-center justify-center gap-10 md:gap-20 opacity-85">
        {logos.map((logo) => (
          <img
            key={logo.alt}
            src={logo.src}
            alt={logo.alt}
            className="h-10 md:h-12 grayscale opacity-90 hover:opacity-100 hover:scale-105 transition-transform duration-200 mx-2"
            style={{ maxWidth: 110, objectFit: "contain" }}
          />
        ))}
      </div>
    </section>
  );
}

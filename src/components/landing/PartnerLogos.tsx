
const logos = [
  { src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", alt: "Microsoft" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg", alt: "Nike" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg", alt: "Netflix" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg", alt: "IBM" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Spotify_logo_without_text.svg", alt: "Spotify" }
];

export default function PartnerLogos() {
  return (
    <section className="w-full py-8 md:py-10 flex flex-col items-center">
      <div className="mb-2 text-muted-foreground text-base tracking-wider font-medium">Trusted by</div>
      <div className="flex flex-wrap items-center justify-center gap-7 md:gap-14 opacity-80">
        {logos.map((logo) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={logo.alt} src={logo.src} alt={logo.alt} className="h-8 grayscale opacity-80 hover:opacity-100 transition-opacity duration-200" />
        ))}
      </div>
    </section>
  );
}

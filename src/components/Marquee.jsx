export default function Marquee() {
  const items = [
    "AI INTEGRATION",
    "3D WEB",
    "MOTION DESIGN",
    "EDITORIAL CRAFT",
    "BRAND SYSTEMS",
    "CINEMATIC SCROLL",
    "WEBGL",
    "DEVELOPED IN HOUSE",
  ];
  const row = [...items, ...items, ...items];
  return (
    <section
      aria-hidden="true"
      data-testid="marquee"
      className="border-y kb-border py-6 overflow-hidden bg-black"
    >
      <div className="marquee whitespace-nowrap">
        {row.map((t, i) => (
          <span
            key={i}
            className="font-display text-4xl md:text-6xl mx-10 text-white/90"
          >
            {t}
            <span className="font-serif-i text-white/30 italic mx-8">◦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const PROJECTS = [
  {
    slug: "orion-studio",
    title: "ORION STUDIO",
    category: "Architecture · Atelier",
    tier: "COSMOS",
    year: "2025",
    span: "md:col-span-7 md:row-span-2",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=85&w=1400",
  },
  {
    slug: "maison-veil",
    title: "MAISON VEIL",
    category: "Luxury · Fashion House",
    tier: "COSMOS",
    year: "2025",
    span: "md:col-span-5",
    img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=85&w=1200",
  },
  {
    slug: "vanta-collective",
    title: "VANTA COLLECTIVE",
    category: "Creative Agency",
    tier: "COSMOS",
    year: "2025",
    span: "md:col-span-5",
    img: "https://images.unsplash.com/photo-1508615070457-7baeba4003ab?auto=format&fit=crop&q=85&w=1200",
  },
  {
    slug: "meridian-estates",
    title: "MERIDIAN ESTATES",
    category: "Real Estate",
    tier: "AETHER",
    year: "2025",
    span: "md:col-span-4",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=85&w=1200",
  },
  {
    slug: "nuage-atelier",
    title: "NUAGE ATELIER",
    category: "Skincare · Liquid Glass",
    tier: "ECHO",
    year: "2025",
    span: "md:col-span-4",
    img: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=85&w=1200",
  },
  {
    slug: "lume-journal",
    title: "LUME JOURNAL",
    category: "Editorial · Magazine",
    tier: "ECHO",
    year: "2024",
    span: "md:col-span-4",
    img: "https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&q=85&w=1200",
  },
];

export default function Portfolio() {
  return (
    <section
      id="work"
      data-testid="portfolio-section"
      className="relative py-32 md:py-48 px-6 md:px-12 bg-[#030303]"
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs text-white/50">◦ 03</span>
          <span className="font-mono text-xs text-white/50">— SELECTED WORK</span>
          <div className="h-px flex-1 bg-white/15" />
        </div>

        <div className="grid grid-cols-12 gap-6 mb-16 md:mb-20">
          <h2 className="col-span-12 md:col-span-9 font-display text-5xl md:text-7xl lg:text-8xl tracking-tight text-balance">
            The work{" "}
            <span className="font-serif-i italic text-white/70">
              speaks in scrolls.
            </span>
          </h2>
          <p className="col-span-12 md:col-span-3 text-white/55 text-sm leading-relaxed md:pt-4">
            Six fully realised websites built across all three tiers. Click any
            to walk through the live experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px] md:auto-rows-[340px]">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 1,
                delay: (i % 3) * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`col-span-12 ${p.span}`}
            >
              <Link
                to={`/work/${p.slug}`}
                data-testid={`portfolio-item-${i}`}
                data-hover="true"
                className="group relative block w-full h-full overflow-hidden border kb-border"
              >
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 brightness-90 transition-all duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105 group-hover:brightness-100 group-hover:contrast-100"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" />

                <div className="relative z-10 h-full w-full p-6 md:p-8 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-white/70">
                      {p.year}
                    </span>
                    <span
                      className={`font-mono text-[10px] px-2 py-1 rounded-full border ${
                        p.tier === "COSMOS"
                          ? "bg-white text-black border-white"
                          : p.tier === "AETHER"
                            ? "border-white/60 text-white"
                            : "border-white/30 text-white/80"
                      }`}
                    >
                      {p.tier}
                    </span>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-white/60 mb-2">
                      {p.category}
                    </div>
                    <div className="flex items-end justify-between gap-4">
                      <h3 className="font-display text-3xl md:text-4xl leading-none tracking-tight text-balance">
                        {p.title}
                      </h3>
                      <div className="shrink-0 flex items-center gap-2">
                        <span className="font-mono text-[10px] text-white/70 hidden md:block group-hover:text-white transition-colors">
                          VISIT ↗
                        </span>
                        <ArrowUpRight
                          size={22}
                          strokeWidth={1}
                          className="opacity-60 transition-all duration-500 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:translate-x-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

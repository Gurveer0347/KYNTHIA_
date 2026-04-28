import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollFrameSequence from "@/components/ScrollFrameSequence";

const PARAS = [
  {
    plain: "We don't build websites. ",
    italic: "We compose worlds.",
  },
  {
    plain: "Every pixel earns its place. Every interaction ",
    italic: "holds a breath.",
  },
  {
    plain: "From the first scroll to the final ",
    italic: "whisper of animation,",
    plain2: " we craft digital environments that feel alive — intelligent, intentional, unforgettable.",
  },
];

export default function Manifesto() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section
      id="manifesto"
      ref={ref}
      data-testid="manifesto-section"
      className="relative py-32 md:py-48 px-6 md:px-12 bg-black overflow-hidden"
    >
      {/* Scroll-synced cinematic frame sequence behind everything */}
      <ScrollFrameSequence
        basePath="/frames/f_"
        count={600}
        pad={3}
        opacity={1}
        speed={1.2}
      />

      {/* Background giant word */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <span
          className="font-display text-white/[0.03] select-none"
          style={{ fontSize: "clamp(10rem, 30vw, 30rem)" }}
        >
          MANIFESTO
        </span>
      </motion.div>

      <div className="relative max-w-[1400px] mx-auto">
        <div className="flex items-center gap-4 mb-16 md:mb-24">
          <span className="font-mono text-xs text-white/50">◦ 01</span>
          <span className="font-mono text-xs text-white/50">— MANIFESTO</span>
          <div className="h-px flex-1 bg-white/15" />
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-10 md:col-start-2">
            {PARAS.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 1.1,
                  delay: i * 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-10 md:mb-14 text-balance"
              >
                <span className="text-white">{p.plain}</span>
                <span className="font-serif-i italic text-white/85">
                  {p.italic}
                </span>
                {p.plain2 && <span className="text-white/70">{p.plain2}</span>}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 mt-24 border kb-border">
          {[
            ["100%", "Custom built"],
            ["3", "Tiers of craft"],
          ].map(([n, l]) => (
            <div
              key={l}
              className="bg-black p-8 md:p-10"
              data-testid={`stat-${l.replace(/\s/g, "-").toLowerCase()}`}
            >
              <div className="font-display text-4xl md:text-6xl tracking-tight">
                {n}
              </div>
              <div className="font-mono text-[10px] text-white/40 mt-3">
                {l.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

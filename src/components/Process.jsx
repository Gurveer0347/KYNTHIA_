import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollFrameSequence from "@/components/ScrollFrameSequence";

const STEPS = [
  {
    n: "01",
    title: "Discover",
    text: "We listen. We research. We map your brand's gravity — what it stands for, who it serves, where it's going. No deck is drafted before the truth is found.",
    tag: "WEEK 01–02",
  },
  {
    n: "02",
    title: "Define",
    text: "A tight concept, tier selected (ECHO / AETHER / COSMOS), motion language drawn, information architecture carved. This is where the silhouette of the site becomes visible.",
    tag: "WEEK 02–03",
  },
  {
    n: "03",
    title: "Design",
    text: "Editorial typography, custom components, motion prototypes. Every scroll, hover, and transition is designed with intent — not decoration.",
    tag: "WEEK 03–06",
  },
  {
    n: "04",
    title: "Develop",
    text: "Hand-crafted code. WebGL, Three.js, Framer Motion, AI integrations wired where relevant. We don't ship what we wouldn't save on our own desktop.",
    tag: "WEEK 05–09",
  },
  {
    n: "05",
    title: "Deliver",
    text: "Performance passes, accessibility audits, a guided handoff. You launch with documentation, a living system, and a team that stays in orbit.",
    tag: "WEEK 09–10",
  },
];

export default function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="process"
      ref={ref}
      data-testid="process-section"
      className="relative py-32 md:py-48 px-6 md:px-12 bg-black overflow-hidden"
    >
      <ScrollFrameSequence
        basePath="/frames/f_"
        count={600}
        pad={3}
        opacity={1}
        speed={1.1}
      />

      <div className="relative max-w-[1400px] mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs text-white/50">◦ 04</span>
          <span className="font-mono text-xs text-white/50">— PROCESS</span>
          <div className="h-px flex-1 bg-white/15" />
        </div>

        <div className="grid grid-cols-12 gap-6 mb-20 md:mb-28">
          <h2 className="col-span-12 md:col-span-8 font-display text-5xl md:text-7xl lg:text-8xl tracking-tight text-balance">
            A quiet,{" "}
            <span className="font-serif-i italic text-white/70">
              deliberate choreography.
            </span>
          </h2>
        </div>

        <div className="relative grid grid-cols-12 gap-6">
          {/* Spine */}
          <div className="hidden md:block col-span-1 relative">
            <div className="sticky top-1/3 h-[60vh] w-px mx-auto bg-white/10 relative">
              <motion.div
                style={{ height: lineHeight }}
                className="absolute top-0 left-0 w-full bg-white origin-top"
              />
            </div>
          </div>

          <div className="col-span-12 md:col-span-11 flex flex-col gap-20 md:gap-28">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                data-testid={`process-step-${s.n}`}
                className="relative grid grid-cols-12 gap-6 items-start"
              >
                <div className="col-span-12 md:col-span-3 flex items-start gap-4">
                  <span className="font-display text-5xl md:text-6xl text-white/85 leading-none">
                    {s.n}
                  </span>
                  <div className="flex-1 pt-3 border-t kb-border">
                    <div className="font-mono text-[10px] text-white/40">
                      {s.tag}
                    </div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-9 md:pl-4">
                  <h3 className="font-display text-4xl md:text-5xl tracking-tight mb-4">
                    {s.title}
                    <span className="font-serif-i italic text-white/50 text-3xl md:text-4xl">
                      .
                    </span>
                  </h3>
                  <p className="text-white/65 text-lg leading-relaxed max-w-2xl">
                    {s.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

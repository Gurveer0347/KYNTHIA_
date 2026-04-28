import { motion } from "framer-motion";
import BackToKynthia from "@/components/BackToKynthia";
import HoverRevealImage from "@/components/HoverRevealImage";
import { ArrowUpRight } from "lucide-react";

/* ====== COSMOS TIER — MAISON VEIL (Luxury Fashion) ======
 * Palette: champagne + ivory + wine/burgundy + soft black
 * Signature: HOVER-REVEAL image masks in the lookbook (the cursor-follow reveal)
 * Persistent: animated silk SVG strip flowing along the side
 */

const LOOKS = [
  {
    n: "N°01",
    name: "SILK VEIL",
    base: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=85&w=900",
    hover: "https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&q=85&w=900",
  },
  {
    n: "N°02",
    name: "OBSIDIAN COAT",
    base: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=85&w=900",
    hover: "https://images.unsplash.com/photo-1485518882345-15568b007407?auto=format&fit=crop&q=85&w=900",
  },
  {
    n: "N°03",
    name: "PALE LINEN",
    base: "https://images.unsplash.com/photo-1485518882345-15568b007407?auto=format&fit=crop&q=85&w=900",
    hover: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&q=85&w=900",
  },
  {
    n: "N°04",
    name: "IVORY KIMONO",
    base: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&q=85&w=900",
    hover: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=85&w=900",
  },
];

function FlowingSilk() {
  return (
    <svg
      className="fixed top-0 right-0 h-screen pointer-events-none z-0 opacity-40"
      viewBox="0 0 300 1000"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="silkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c9a36b" stopOpacity="0" />
          <stop offset="0.5" stopColor="#c9a36b" stopOpacity="0.6" />
          <stop offset="1" stopColor="#6b1e28" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <motion.path
        d="M 200 0 C 220 200 150 340 230 500 C 300 660 140 780 220 1000"
        stroke="url(#silkGrad)"
        strokeWidth="2"
        fill="none"
        animate={{
          d: [
            "M 200 0 C 220 200 150 340 230 500 C 300 660 140 780 220 1000",
            "M 180 0 C 260 200 130 360 250 520 C 320 680 120 800 240 1000",
            "M 200 0 C 220 200 150 340 230 500 C 300 660 140 780 220 1000",
          ],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M 240 0 C 180 220 280 380 200 540 C 140 700 260 820 180 1000"
        stroke="url(#silkGrad)"
        strokeWidth="1"
        fill="none"
        animate={{
          d: [
            "M 240 0 C 180 220 280 380 200 540 C 140 700 260 820 180 1000",
            "M 260 0 C 200 240 280 400 220 560 C 160 720 260 820 180 1000",
            "M 240 0 C 180 220 280 380 200 540 C 140 700 260 820 180 1000",
          ],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

export default function MaisonVeil() {
  return (
    <div
      className="min-h-screen text-[#1a1410] relative overflow-hidden"
      data-testid="showcase-maison"
      style={{
        background:
          "linear-gradient(135deg, #f6f0e4 0%, #efe4d1 40%, #e9dcc4 100%)",
      }}
    >
      <FlowingSilk />
      <BackToKynthia light />
      <div className="fixed top-5 right-5 md:top-6 md:right-8 z-50 font-mono text-[10px] tracking-widest px-4 py-2 rounded-full border border-[#1a1410]/25 bg-[#f6f0e4]/80 backdrop-blur-xl">
        COSMOS TIER · LIVE DEMO
      </div>

      {/* HEADER */}
      <header className="relative z-10 flex items-center justify-between px-6 md:px-12 h-20 border-b border-[#1a1410]/15">
        <div
          className="italic tracking-[-0.02em]"
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "1.8rem",
            fontWeight: 500,
          }}
        >
          Maison Veil
        </div>
        <nav className="hidden md:flex gap-10 font-mono text-[10px] tracking-widest">
          {["COLLECTION", "ATELIER", "BOUTIQUE", "JOURNAL"].map((l) => (
            <a key={l} href={`#${l}`} className="hover:text-[#6b1e28]">
              {l}
            </a>
          ))}
        </nav>
        <button className="font-mono text-[10px] tracking-widest border border-[#1a1410]/40 px-4 py-2 rounded-full hover:bg-[#6b1e28] hover:text-[#f6f0e4] hover:border-[#6b1e28] transition-all">
          SHOP
        </button>
      </header>

      {/* HERO */}
      <section className="relative z-10 grid grid-cols-12 gap-4 px-6 md:px-12 py-20">
        <div className="col-span-12 md:col-span-7 flex flex-col justify-end">
          <div className="font-mono text-[10px] tracking-widest text-[#6b1e28] mb-8">
            ◦ AW MMXXV · THE VEILED COLLECTION
          </div>
          <h1
            className="leading-[0.88] tracking-[-0.02em]"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(3.5rem, 10vw, 10rem)",
              fontWeight: 400,
            }}
          >
            <div>A wardrobe</div>
            <div className="italic">composed</div>
            <div>
              in <span className="text-[#6b1e28]">silence.</span>
            </div>
          </h1>
          <p className="mt-8 max-w-md text-[#1a1410]/70 leading-relaxed">
            Six pieces in ivory, graphite, and midnight silk. Tailored slowly
            in Kyoto and Paris. The collection releases in limited editions —
            each garment is numbered.
          </p>
        </div>
        <div className="col-span-12 md:col-span-5 md:pl-10 md:border-l border-[#1a1410]/15 flex flex-col gap-5 justify-end">
          <HoverRevealImage
            baseImg="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=85&w=900"
            hoverImg="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=85&w=900"
            alt="The Veiled Collection"
            className="aspect-[3/4] rounded-sm"
            radius={180}
          />
          <div className="font-mono text-[10px] tracking-widest text-[#6b1e28]">
            ◦ HOVER TO REVEAL
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="relative z-10 py-24 px-6 md:px-12 border-y border-[#1a1410]/15 bg-[#efe4d1]/50 backdrop-blur-sm">
        <div className="max-w-[1300px] mx-auto">
          <p
            className="leading-[1.18]"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(1.8rem, 4vw, 3.6rem)",
              fontWeight: 400,
            }}
          >
            We make <span className="italic text-[#6b1e28]">few</span> things,
            and we make them with{" "}
            <span className="italic text-[#6b1e28]">patience</span>. A coat
            that lasts thirty winters. A silk shirt that becomes softer each
            year. A kimono dyed with oak bark, numbered, signed, and delivered
            in a linen envelope.
          </p>
        </div>
      </section>

      {/* LOOKBOOK — hover-reveal grid */}
      <section id="COLLECTION" className="relative z-10 py-24 px-6 md:px-12">
        <div className="max-w-[1500px] mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-xs text-[#1a1410]/50">◦ 02</span>
            <span className="font-mono text-xs text-[#1a1410]/50">
              — THE LOOKBOOK · HOVER TO DISCOVER
            </span>
            <div className="h-px flex-1 bg-[#1a1410]/15" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LOOKS.map((l, i) => (
              <motion.div
                key={l.n}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.9, delay: i * 0.1 }}
                className="relative"
              >
                <HoverRevealImage
                  baseImg={l.base}
                  hoverImg={l.hover}
                  alt={l.name}
                  className="aspect-[4/5]"
                  radius={160}
                />
                <div className="flex items-end justify-between mt-4">
                  <div>
                    <div className="font-mono text-[10px] tracking-widest text-[#6b1e28]">
                      LOOK {l.n}
                    </div>
                    <div
                      className="italic mt-1 tracking-tight"
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "2rem",
                      }}
                    >
                      {l.name}
                    </div>
                  </div>
                  <button className="font-mono text-[10px] tracking-widest border border-[#1a1410]/30 rounded-full px-4 py-2 hover:bg-[#1a1410] hover:text-[#f6f0e4] transition-all">
                    RESERVE
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ATELIER */}
      <section
        id="ATELIER"
        className="relative z-10 py-24 px-6 md:px-12 border-t border-[#1a1410]/15 bg-[#1a1410] text-[#f6f0e4]"
      >
        <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-5">
            <div className="font-mono text-[10px] tracking-widest text-[#c9a36b] mb-6">
              ◦ THE ATELIER
            </div>
            <h2
              className="leading-[0.95] mb-8"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
              }}
            >
              Cut by{" "}
              <span className="italic text-[#c9a36b]">hand.</span>
              <br />
              Worn by <span className="italic text-[#c9a36b]">time.</span>
            </h2>
            <p className="text-[#f6f0e4]/70 leading-relaxed max-w-md">
              Two studios — one in Kyoto, one in Paris — connected by forty
              years of shared practice.
            </p>
          </div>
          <div className="col-span-12 md:col-span-7">
            <HoverRevealImage
              baseImg="https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&q=85&w=1200"
              hoverImg="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=85&w=1200"
              alt="Atelier"
              className="aspect-[4/3] rounded-sm"
              radius={200}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-24 px-6 md:px-12 text-center">
        <div
          className="italic mb-8 tracking-tight"
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(3rem, 8vw, 7rem)",
            fontWeight: 400,
          }}
        >
          Enter the maison.
        </div>
        <a
          href="mailto:hello@maisonveil.com"
          className="inline-flex items-center gap-3 px-8 py-4 bg-[#6b1e28] text-[#f6f0e4] font-mono text-xs rounded-full hover:bg-[#8a2636] transition-all"
        >
          HELLO@MAISONVEIL.COM <ArrowUpRight size={14} />
        </a>
      </section>

      <footer className="relative z-10 border-t border-[#1a1410]/15 px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] text-[#1a1410]/50">
        <div>© MAISON VEIL · PARIS / KYOTO</div>
        <div>WEBSITE BY KYNTHIA · COSMOS TIER</div>
      </footer>
    </div>
  );
}

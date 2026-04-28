import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import BackToKynthia from "@/components/BackToKynthia";
import { ArrowUpRight, MapPin, Bed, Bath, Square } from "lucide-react";

/* ====== AETHER TIER — MERIDIAN ESTATES (Real Estate) ======
 * Palette: deep emerald forest + cream + aged brass
 * Signature: morphing SVG dividers between sections
 * Persistent: animated brass gradient frame around viewport
 */

const LISTINGS = [
  {
    name: "Villa Arcadia",
    loc: "Tuscan Hills, Italy",
    beds: 6,
    baths: 5,
    sqft: "11,400",
    price: "€ 4.8M",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=85&w=1400",
  },
  {
    name: "The Glass Retreat",
    loc: "Aspen, Colorado",
    beds: 5,
    baths: 5,
    sqft: "8,200",
    price: "$ 9.2M",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=85&w=1400",
  },
  {
    name: "Dune House",
    loc: "Comporta, Portugal",
    beds: 4,
    baths: 4,
    sqft: "6,100",
    price: "€ 3.1M",
    img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=85&w=1400",
  },
];

/* Morphing SVG divider */
function MorphDivider() {
  return (
    <svg
      className="w-full h-20 md:h-32"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.path
        d="M 0 60 C 300 10 600 110 900 60 C 1050 35 1150 85 1200 60 L 1200 120 L 0 120 Z"
        fill="#0d2a22"
        animate={{
          d: [
            "M 0 60 C 300 10 600 110 900 60 C 1050 35 1150 85 1200 60 L 1200 120 L 0 120 Z",
            "M 0 60 C 300 110 600 10 900 60 C 1050 85 1150 35 1200 60 L 1200 120 L 0 120 Z",
            "M 0 60 C 300 10 600 110 900 60 C 1050 35 1150 85 1200 60 L 1200 120 L 0 120 Z",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function BrassFrame() {
  return (
    <>
      <div
        className="fixed top-0 inset-x-0 h-1 z-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, #c89a4a 20%, #e8c178 50%, #c89a4a 80%, transparent)",
        }}
      />
      <div
        className="fixed bottom-0 inset-x-0 h-1 z-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, #c89a4a 20%, #e8c178 50%, #c89a4a 80%, transparent)",
        }}
      />
      <div
        className="fixed left-0 inset-y-0 w-px z-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent, #c89a4a 20%, #e8c178 50%, #c89a4a 80%, transparent)",
        }}
      />
      <div
        className="fixed right-0 inset-y-0 w-px z-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent, #c89a4a 20%, #e8c178 50%, #c89a4a 80%, transparent)",
        }}
      />
    </>
  );
}

export default function MeridianEstates() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <div
      className="min-h-screen text-[#f7f1e1] relative overflow-hidden"
      data-testid="showcase-meridian"
      style={{ background: "#0d2a22" }}
    >
      <BrassFrame />
      <BackToKynthia />
      <div className="fixed top-5 right-5 md:top-6 md:right-8 z-50 font-mono text-[10px] tracking-widest px-4 py-2 rounded-full border border-[#c89a4a]/50 bg-[#0d2a22]/70 backdrop-blur-xl text-[#e8c178]">
        AETHER TIER · LIVE DEMO
      </div>

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col">
        <motion.div style={{ y, opacity }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=85&w=2000"
            alt=""
            className="w-full h-full object-cover grayscale brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d2a22]/50 via-[#0d2a22]/70 to-[#0d2a22]" />
        </motion.div>

        <header className="relative z-10 flex items-center justify-between px-6 md:px-12 h-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full border border-[#c89a4a] flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-[#e8c178] rounded-full" />
            </div>
            <div className="font-display text-xl tracking-tight">MERIDIAN</div>
          </div>
          <nav className="hidden md:flex gap-8 font-mono text-[10px] tracking-widest">
            {["PORTFOLIO", "LOCATIONS", "ABOUT", "PRIVATE OFFICE"].map((l) => (
              <a
                key={l}
                href={`#${l.replace(/\s/g, "")}`}
                className="hover:text-[#e8c178] text-[#f7f1e1]/75"
              >
                {l}
              </a>
            ))}
          </nav>
          <button className="font-mono text-[10px] tracking-widest border border-[#c89a4a] text-[#e8c178] px-4 py-2 rounded-full hover:bg-[#c89a4a] hover:text-[#0d2a22] transition-all">
            SCHEDULE VIEWING
          </button>
        </header>

        <div className="relative z-10 flex-1 flex items-center px-6 md:px-12">
          <div className="max-w-5xl">
            <div className="font-mono text-[10px] tracking-widest text-[#e8c178] mb-6">
              ◦ MERIDIAN ESTATES · PRIVATE PROPERTY
            </div>
            <h1
              className="font-display leading-[0.88] tracking-[-0.04em] text-balance"
              style={{ fontSize: "clamp(3rem, 10vw, 10rem)" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.15 }}
              >
                Homes for
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="font-serif-i italic text-[#e8c178]"
              >
                extraordinary
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.45 }}
              >
                lives.
              </motion.div>
            </h1>
            <p className="mt-10 text-[#f7f1e1]/80 text-lg max-w-xl leading-relaxed">
              A discreet real-estate office curating private residences across
              Europe, North America, and the Mediterranean. Every property is
              personally visited by our partners.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#PORTFOLIO"
                className="px-7 py-4 bg-[#e8c178] text-[#0d2a22] font-mono text-xs rounded-full hover:bg-[#c89a4a] transition-all"
              >
                EXPLORE PORTFOLIO
              </a>
              <a
                href="#PRIVATEOFFICE"
                className="px-7 py-4 border border-[#e8c178]/50 text-[#e8c178] font-mono text-xs rounded-full hover:bg-[#e8c178]/10 transition-all"
              >
                PRIVATE OFFICE
              </a>
            </div>
          </div>
        </div>

        <div className="relative z-10 border-t border-[#c89a4a]/30 px-6 md:px-12 py-4 grid grid-cols-2 md:grid-cols-4 gap-6 font-mono text-[10px] tracking-widest text-[#e8c178]/80">
          <div>◦ 38 COUNTRIES</div>
          <div>◦ 240 CURATED HOMES</div>
          <div>◦ 22 YEARS</div>
          <div className="text-right hidden md:block">◦ ESTABLISHED MMIII</div>
        </div>
      </section>

      <div className="-mt-px">
        <MorphDivider />
      </div>

      {/* FEATURED LISTINGS */}
      <section id="PORTFOLIO" className="py-20 px-6 md:px-12 bg-[#0d2a22]">
        <div className="max-w-[1500px] mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-xs text-[#e8c178]">◦ 02</span>
            <span className="font-mono text-xs text-[#f7f1e1]/55">
              — CURRENT PORTFOLIO
            </span>
            <div className="h-px flex-1 bg-[#c89a4a]/30" />
          </div>
          <div className="grid grid-cols-12 gap-8 mb-16">
            <h2 className="col-span-12 md:col-span-8 font-display text-5xl md:text-7xl tracking-tight">
              Three homes,{" "}
              <span className="font-serif-i italic text-[#e8c178]">
                currently quiet.
              </span>
            </h2>
          </div>

          <div className="space-y-8">
            {LISTINGS.map((l, i) => (
              <motion.div
                key={l.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
                className="group relative grid grid-cols-12 gap-0 overflow-hidden border border-[#c89a4a]/30 hover:border-[#e8c178]/70 transition-colors"
              >
                <div className="col-span-12 md:col-span-7 relative aspect-[16/10] md:aspect-auto md:min-h-[480px] overflow-hidden">
                  <img
                    src={l.img}
                    alt={l.name}
                    className="absolute inset-0 w-full h-full object-cover grayscale-[20%] sepia-[15%] group-hover:grayscale-0 group-hover:sepia-0 group-hover:scale-105 transition-all duration-[1400ms]"
                  />
                </div>
                <div className="col-span-12 md:col-span-5 p-8 md:p-12 flex flex-col justify-between gap-8 bg-[#0d2a22]">
                  <div>
                    <div className="font-mono text-[10px] text-[#e8c178] tracking-widest mb-4">
                      LISTING N°{String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="font-display text-4xl md:text-5xl tracking-tight leading-none mb-3">
                      {l.name}
                    </h3>
                    <div className="flex items-center gap-2 text-[#f7f1e1]/70 text-sm">
                      <MapPin size={13} strokeWidth={1.5} /> {l.loc}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm border-y border-[#c89a4a]/30 py-5">
                    <div className="flex items-center gap-2">
                      <Bed size={14} strokeWidth={1.5} className="text-[#e8c178]" />
                      {l.beds}
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath size={14} strokeWidth={1.5} className="text-[#e8c178]" />
                      {l.baths}
                    </div>
                    <div className="flex items-center gap-2">
                      <Square size={14} strokeWidth={1.5} className="text-[#e8c178]" />
                      {l.sqft} ft²
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="font-mono text-[10px] text-[#e8c178] mb-1">
                        PRIVATE SALE
                      </div>
                      <div className="font-display text-3xl">{l.price}</div>
                    </div>
                    <button className="inline-flex items-center gap-2 font-mono text-[10px] border border-[#c89a4a] text-[#e8c178] px-4 py-3 rounded-full hover:bg-[#c89a4a] hover:text-[#0d2a22] transition-all">
                      VIEW <ArrowUpRight size={12} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="transform rotate-180">
        <MorphDivider />
      </div>

      {/* LOCATIONS */}
      <section
        id="LOCATIONS"
        className="py-28 px-6 md:px-12 bg-[#0a1f19]"
      >
        <div className="max-w-[1500px] mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <span className="font-mono text-xs text-[#e8c178]">◦ 03</span>
            <span className="font-mono text-xs text-[#f7f1e1]/55">
              — SPHERE OF OPERATION
            </span>
            <div className="h-px flex-1 bg-[#c89a4a]/30" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl tracking-tight mb-12 max-w-3xl">
            We operate across{" "}
            <span className="font-serif-i italic text-[#e8c178]">
              thirty-eight countries.
            </span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#c89a4a]/20 border border-[#c89a4a]/30">
            {[
              "ITALY",
              "FRANCE",
              "SWITZERLAND",
              "UNITED STATES",
              "PORTUGAL",
              "SPAIN",
              "GREECE",
              "UNITED KINGDOM",
            ].map((c) => (
              <div
                key={c}
                className="bg-[#0a1f19] p-6 font-mono text-xs tracking-widest text-[#f7f1e1]/75 hover:bg-[#e8c178] hover:text-[#0d2a22] transition-colors cursor-none"
                data-hover="true"
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="-mt-px">
        <MorphDivider />
      </div>

      {/* PRIVATE OFFICE */}
      <section
        id="PRIVATEOFFICE"
        className="py-28 px-6 md:px-12 text-center relative overflow-hidden bg-[#0d2a22]"
      >
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] morph-blob bg-[#e8c178]/8 blur-3xl pointer-events-none" />
        <div className="relative max-w-[1200px] mx-auto">
          <div className="font-mono text-[10px] text-[#e8c178] tracking-widest mb-6">
            ◦ 04 — PRIVATE OFFICE
          </div>
          <h2 className="font-display text-5xl md:text-7xl tracking-tight mb-8">
            Introduced,{" "}
            <span className="font-serif-i italic text-[#e8c178]">
              never listed.
            </span>
          </h2>
          <p className="text-[#f7f1e1]/75 max-w-xl mx-auto leading-relaxed mb-10">
            Speak with a partner about a bespoke search. Our private office
            sources homes that never appear on the open market.
          </p>
          <a
            href="mailto:office@meridian-estates.com"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#e8c178] text-[#0d2a22] font-mono text-xs rounded-full hover:bg-[#c89a4a] transition-all"
          >
            OFFICE@MERIDIAN-ESTATES.COM <ArrowUpRight size={14} />
          </a>
        </div>
      </section>

      <footer className="border-t border-[#c89a4a]/30 px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] text-[#f7f1e1]/50">
        <div>© MERIDIAN ESTATES · LONDON / MILAN / NEW YORK</div>
        <div>WEBSITE BY KYNTHIA · AETHER TIER</div>
      </footer>
    </div>
  );
}

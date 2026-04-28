import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import BackToKynthia from "@/components/BackToKynthia";
import { ArrowUpRight, Sparkles, Droplet, Leaf } from "lucide-react";

/* ====== ECHO TIER — NUAGE ATELIER ======
 * Pure liquid-glass + pastel palette: peach, mint, lilac, sky.
 * Heavy frosted backdrop-blur, translucent surfaces, soft shadows.
 * A high-end skincare atelier — bespoke & weightless.
 */

const PRODUCTS = [
  {
    n: "N°01",
    name: "Cloud Serum",
    note: "Hyaluronic · ceramide · peptide",
    tone: "from-pink-200/60 to-orange-100/50",
    icon: Droplet,
  },
  {
    n: "N°02",
    name: "Jade Elixir",
    note: "Green tea · niacinamide",
    tone: "from-emerald-200/60 to-teal-100/50",
    icon: Leaf,
  },
  {
    n: "N°03",
    name: "Iris Veil",
    note: "Cold-pressed iris · squalane",
    tone: "from-violet-200/60 to-fuchsia-100/50",
    icon: Sparkles,
  },
  {
    n: "N°04",
    name: "Sky Mist",
    note: "Mineral water · bamboo",
    tone: "from-sky-200/60 to-blue-100/50",
    icon: Droplet,
  },
];

function FloatingBlobs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      <div className="absolute -top-40 -left-40 w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-pink-300/50 via-rose-200/40 to-transparent blur-3xl morph-blob" />
      <div className="absolute top-1/3 -right-40 w-[55vw] h-[55vw] rounded-full bg-gradient-to-br from-violet-300/45 via-fuchsia-200/30 to-transparent blur-3xl morph-blob" style={{ animationDelay: "2s" }} />
      <div className="absolute -bottom-40 left-1/4 w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-emerald-200/40 via-teal-100/30 to-transparent blur-3xl morph-blob" style={{ animationDelay: "4s" }} />
      <div className="absolute top-2/3 left-1/2 w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-sky-200/40 via-blue-100/30 to-transparent blur-3xl morph-blob" style={{ animationDelay: "6s" }} />
    </div>
  );
}

/* Liquid cursor follower */
function LiquidCursor() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);
    let raf;
    const loop = () => {
      tx += (x - tx) * 0.12;
      ty += (y - ty) * 0.12;
      if (el) el.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);
  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 w-40 h-40 rounded-full pointer-events-none z-[60] mix-blend-plus-lighter"
      style={{
        background:
          "radial-gradient(circle, rgba(255,204,214,0.55), rgba(200,220,255,0.25) 50%, transparent 75%)",
        filter: "blur(18px)",
      }}
      aria-hidden="true"
    />
  );
}

const glass =
  "bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(200,180,210,0.18)]";

export default function NuageAtelier() {
  return (
    <div
      className="min-h-screen text-slate-800 relative overflow-hidden"
      data-testid="showcase-nuage"
      style={{
        background:
          "linear-gradient(135deg, #fce7f0 0%, #fef6e4 30%, #e0f2f1 55%, #e3e8ff 80%, #f5e6ff 100%)",
      }}
    >
      <FloatingBlobs />
      <LiquidCursor />
      <BackToKynthia light />
      <div className={`fixed top-5 right-5 md:top-6 md:right-8 z-50 font-mono text-[10px] tracking-widest px-4 py-2 rounded-full ${glass} text-slate-700`}>
        ECHO TIER · LIQUID GLASS · LIVE DEMO
      </div>

      {/* HEADER */}
      <header className={`sticky top-4 mx-4 md:mx-8 z-40 ${glass} rounded-full px-6 py-3 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-300 via-rose-200 to-orange-100 shadow-inner" />
          <div
            className="tracking-tight text-lg"
            style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 500 }}
          >
            Nuage Atelier
          </div>
        </div>
        <nav className="hidden md:flex gap-7 font-mono text-[10px] tracking-widest text-slate-600">
          {["RITUAL", "OBJECTS", "NOTES", "CONCIERGE"].map((l) => (
            <a key={l} href={`#${l}`} className="hover:text-slate-900">
              {l}
            </a>
          ))}
        </nav>
        <button className="font-mono text-[10px] tracking-widest px-4 py-2 rounded-full bg-white/70 border border-white/80 backdrop-blur-xl hover:bg-white">
          RESERVE
        </button>
      </header>

      {/* HERO */}
      <section className="relative px-6 md:px-12 pt-24 pb-28">
        <div className="max-w-[1500px] mx-auto grid grid-cols-12 gap-8 items-center">
          <div className="col-span-12 md:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="font-mono text-[10px] tracking-widest text-slate-500 mb-8"
            >
              ◦ NUAGE ATELIER — BESPOKE SKIN RITUALS · PARIS / KYOTO
            </motion.div>
            <h1
              className="leading-[0.92] tracking-[-0.03em]"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(3rem, 9vw, 9.5rem)",
                fontWeight: 400,
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.15 }}
              >
                Weightless.
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="italic bg-gradient-to-r from-rose-500 via-violet-500 to-sky-500 bg-clip-text text-transparent"
              >
                Luminous.
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.45 }}
              >
                Yours.
              </motion.div>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="mt-10 max-w-lg text-slate-600 leading-relaxed text-lg"
            >
              A small atelier formulating skincare by appointment. Each ritual
              is mixed for your skin on the morning of delivery — bottled in
              hand-blown glass and sent same-day.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.85 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <a
                href="#OBJECTS"
                className={`px-7 py-4 ${glass} rounded-full font-mono text-xs hover:bg-white/60 transition-all`}
              >
                EXPLORE OBJECTS
              </a>
              <a
                href="#CONCIERGE"
                className="px-7 py-4 rounded-full bg-slate-900 text-white font-mono text-xs hover:bg-slate-800 transition-all"
              >
                BOOK A CONCIERGE
              </a>
            </motion.div>
          </div>

          {/* Floating bottle glass card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4 }}
            className={`col-span-12 md:col-span-5 ${glass} rounded-[40px] p-8 md:p-10 relative`}
          >
            <div className="absolute -top-6 left-8 font-mono text-[9px] tracking-widest text-slate-500 bg-white/70 backdrop-blur-xl border border-white/70 rounded-full px-3 py-1">
              ◦ FEATURED
            </div>
            <div className="aspect-[3/4] rounded-3xl overflow-hidden relative bg-gradient-to-br from-pink-100 via-rose-50 to-violet-100">
              <img
                src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=85&w=900"
                alt="Cloud Serum"
                className="w-full h-full object-cover mix-blend-luminosity opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent" />
            </div>
            <div className="mt-6 flex items-end justify-between">
              <div>
                <div className="font-mono text-[9px] tracking-widest text-slate-500">
                  N°01 · CLOUD SERUM
                </div>
                <div
                  className="text-2xl mt-1 tracking-tight"
                  style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 500 }}
                >
                  Morning weightless hydration
                </div>
              </div>
              <div className="font-mono text-sm">€ 148</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* OBJECTS */}
      <section id="OBJECTS" className="relative py-24 px-6 md:px-12">
        <div className="max-w-[1500px] mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-xs text-slate-500">◦ 02</span>
            <span className="font-mono text-xs text-slate-500">— THE OBJECTS</span>
            <div className="h-px flex-1 bg-slate-400/30" />
          </div>
          <h2
            className="leading-[0.95] mb-16"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 400,
            }}
          >
            Four <span className="italic">quiet</span> objects.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.n}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: i * 0.08 }}
                  className={`relative ${glass} rounded-3xl p-6 flex flex-col hover:-translate-y-1 transition-transform duration-500`}
                  data-hover="true"
                >
                  <div
                    className={`aspect-square rounded-2xl bg-gradient-to-br ${p.tone} flex items-center justify-center relative overflow-hidden mb-6`}
                  >
                    <Icon size={48} strokeWidth={1} className="text-slate-700" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-white/20 pointer-events-none" />
                  </div>
                  <div className="font-mono text-[9px] tracking-widest text-slate-500 mb-1">
                    {p.n}
                  </div>
                  <div
                    className="text-xl tracking-tight mb-1"
                    style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 500 }}
                  >
                    {p.name}
                  </div>
                  <div className="text-xs text-slate-600">{p.note}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* RITUAL */}
      <section id="RITUAL" className="relative py-28 px-6 md:px-12">
        <div className={`max-w-[1300px] mx-auto ${glass} rounded-[40px] p-10 md:p-16 relative`}>
          <div className="font-mono text-[10px] tracking-widest text-slate-500 mb-6">
            ◦ 03 — THE MORNING RITUAL
          </div>
          <p
            className="leading-[1.2]"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(1.8rem, 4vw, 3.4rem)",
              fontWeight: 400,
            }}
          >
            A <span className="italic">cloud</span> on the palm, a{" "}
            <span className="italic">breath</span> in the glass, a moment that
            sets the tone for the whole day.
          </p>
          <div className="mt-10 grid grid-cols-3 md:grid-cols-6 gap-4">
            {["01 · Mist", "02 · Serum", "03 · Veil", "04 · Balm", "05 · Mist", "06 · Bow"].map(
              (s) => (
                <div
                  key={s}
                  className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl p-4 text-center"
                >
                  <div className="font-mono text-[10px] text-slate-700">{s}</div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CONCIERGE */}
      <section
        id="CONCIERGE"
        className="relative py-28 px-6 md:px-12 text-center"
      >
        <div className={`max-w-[1100px] mx-auto ${glass} rounded-[40px] p-12 md:p-20`}>
          <div className="font-mono text-[10px] tracking-widest text-slate-500 mb-6">
            ◦ 04 — CONCIERGE
          </div>
          <h2
            className="leading-[0.95] mb-8"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)",
              fontWeight: 400,
            }}
          >
            A formulation,{" "}
            <span className="italic bg-gradient-to-r from-rose-500 via-violet-500 to-sky-500 bg-clip-text text-transparent">
              entirely for you.
            </span>
          </h2>
          <p className="text-slate-600 max-w-lg mx-auto leading-relaxed mb-10">
            Book a private consultation — 40 minutes with a formulator, a
            sample ritual, and a personalised bottle shipped within the week.
          </p>
          <a
            href="mailto:concierge@nuage-atelier.com"
            className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-mono text-xs rounded-full hover:bg-slate-800 transition-all"
          >
            CONCIERGE@NUAGE-ATELIER.COM <ArrowUpRight size={14} />
          </a>
        </div>
      </section>

      <footer className="relative px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] text-slate-500">
        <div>© NUAGE ATELIER · PARIS / KYOTO</div>
        <div>WEBSITE BY KYNTHIA · ECHO TIER · LIQUID GLASS</div>
      </footer>
    </div>
  );
}

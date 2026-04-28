import { motion } from "framer-motion";
import BackToKynthia from "@/components/BackToKynthia";
import { ArrowUpRight } from "lucide-react";

/* ====== ECHO TIER — LUME JOURNAL (Editorial magazine) ======
 * Palette: newsprint warm yellow/butter + ink black + vermillion red accents
 * Signature: old-newsprint aesthetic with typewriter-tracked heads
 * Persistent: column rules and page gutter markers
 */

const ARTICLES = [
  {
    tag: "ESSAY",
    title: "On the pleasure of smaller rooms",
    author: "H. Ishimoto",
    date: "Dec 05 · 2025",
    excerpt:
      "An argument for ceilings that do not reach for the sky and for rooms that know the sound of rain.",
    img: "https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&q=85&w=1200",
  },
  {
    tag: "INTERVIEW",
    title: "An afternoon with the weaver",
    author: "L. Marchetti",
    date: "Nov 28 · 2025",
    excerpt: "Threads, time, and the patience of the loom.",
    img: "https://images.unsplash.com/photo-1489367874814-f5d040621dd8?auto=format&fit=crop&q=85&w=1200",
  },
  {
    tag: "FIELD NOTES",
    title: "Paper from the Saône valley",
    author: "C. Auben",
    date: "Nov 14 · 2025",
    excerpt:
      "Where the old mills still press by hand, and why the paper breathes differently.",
    img: "https://images.unsplash.com/photo-1471017432149-d3b75446f2b7?auto=format&fit=crop&q=85&w=1200",
  },
  {
    tag: "ESSAY",
    title: "A brief history of quiet typefaces",
    author: "R. Amari",
    date: "Oct 30 · 2025",
    excerpt: "The ones that do not announce themselves, and the ones that do.",
    img: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=85&w=1200",
  },
];

const ink = "#1a1a1a";
const paper = "#f2e9ce";
const red = "#c1351a";

export default function LumeJournal() {
  return (
    <div
      className="min-h-screen relative"
      data-testid="showcase-lume"
      style={{
        background: paper,
        color: ink,
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/></svg>\")",
        backgroundSize: "200px 200px",
      }}
    >
      <BackToKynthia light />
      <div
        className="fixed top-5 right-5 md:top-6 md:right-8 z-50 font-mono text-[10px] tracking-widest px-4 py-2 rounded-full border-2 text-xs"
        style={{ borderColor: red, color: red, background: paper }}
      >
        ECHO TIER · LIVE DEMO
      </div>

      {/* MASTHEAD — bold newspaper flag */}
      <header
        className="px-6 md:px-12 py-8 border-b-[6px] border-t-4 relative"
        style={{ borderColor: ink }}
      >
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between mb-4 font-mono text-[10px] tracking-[0.3em]">
            <span>VOL. VII · ISSUE 34</span>
            <span className="hidden md:inline">THE JOURNAL OF QUIET THINGS</span>
            <span>DECEMBER · MMXXV · $ 12</span>
          </div>
          <div
            className="leading-[0.8] text-center"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(5rem, 16vw, 15rem)",
              fontWeight: 600,
              letterSpacing: "-0.05em",
            }}
          >
            Lume<span className="italic font-[400]" style={{ color: red }}>.</span>
          </div>
          <div
            className="mt-4 flex items-center justify-between font-mono text-[10px] tracking-[0.3em]"
            style={{ color: red }}
          >
            <span>◦ QUARTERLY PUBLISHED IN BROOKLYN & SAINT-ÉTIENNE ◦</span>
            <span className="hidden md:inline">PRINTED ON OAK PAPER</span>
          </div>
        </div>
      </header>

      {/* NAVIGATION */}
      <nav
        className="px-6 md:px-12 py-3 border-b flex flex-wrap gap-6 md:gap-8 justify-center font-mono text-[10px] tracking-[0.25em]"
        style={{ borderColor: ink + "40" }}
      >
        {["CURRENT ISSUE", "ESSAYS", "INTERVIEWS", "ARCHIVE", "COLOPHON", "SUBSCRIBE"].map(
          (l) => (
            <a
              key={l}
              href="#"
              className="hover:opacity-60"
              style={{ color: ink }}
            >
              {l}
            </a>
          )
        )}
      </nav>

      {/* FEATURE */}
      <section className="px-6 md:px-12 py-16 md:py-20">
        <div className="max-w-[1500px] mx-auto grid grid-cols-12 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="col-span-12 md:col-span-8 md:pr-10 md:border-r"
            style={{ borderColor: ink + "30" }}
          >
            <div
              className="font-mono text-[10px] tracking-[0.3em] mb-4"
              style={{ color: red }}
            >
              ◦ FEATURE — {ARTICLES[0].tag} · {ARTICLES[0].date}
            </div>
            <h2
              className="leading-[0.92] tracking-tight mb-6"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(2.5rem, 6.5vw, 6.5rem)",
                fontWeight: 500,
              }}
            >
              On the <span className="italic">pleasure</span> of smaller rooms
            </h2>
            <div className="aspect-[16/9] overflow-hidden mb-6 border" style={{ borderColor: ink + "30" }}>
              <img
                src={ARTICLES[0].img}
                alt=""
                className="w-full h-full object-cover grayscale"
                style={{ filter: "grayscale(1) contrast(1.15) sepia(0.1)" }}
              />
            </div>
            <p
              className="max-w-2xl leading-[1.7] columns-1 md:columns-2 gap-8"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "1.35rem",
                color: ink + "d9",
              }}
            >
              <span
                className="float-left text-[5.5rem] leading-[0.8] pr-2 pt-1"
                style={{ fontFamily: "Cormorant Garamond, serif", color: red }}
              >
                A
              </span>
              n argument for ceilings that do not reach for the sky and for
              rooms that know the sound of rain. I keep returning to the idea
              that a smaller room holds a person the way a pocket holds a
              stone — with a quiet insistence that the stone is not lost.
              Grand rooms are theatrical; they demand that we perform. A small
              room, by contrast, asks only that we be present.
            </p>
            <div
              className="mt-6 font-mono text-[10px] tracking-[0.3em]"
              style={{ color: red }}
            >
              BY {ARTICLES[0].author.toUpperCase()}
            </div>
          </motion.div>

          <aside className="col-span-12 md:col-span-4 space-y-10">
            <div>
              <div
                className="font-mono text-[10px] tracking-[0.3em] mb-4"
                style={{ color: red }}
              >
                ◦ IN THIS ISSUE
              </div>
              <ul className="space-y-4">
                {ARTICLES.slice(1).map((a) => (
                  <li
                    key={a.title}
                    className="flex items-baseline gap-3 border-b pb-4"
                    style={{ borderColor: ink + "30" }}
                  >
                    <span className="font-mono text-[10px] tracking-[0.2em] w-20 shrink-0" style={{ color: red }}>
                      {a.tag}
                    </span>
                    <div className="flex-1">
                      <div
                        style={{
                          fontFamily: "Cormorant Garamond, serif",
                          fontSize: "1.3rem",
                          lineHeight: 1.2,
                          fontWeight: 500,
                        }}
                      >
                        {a.title}
                      </div>
                      <div className="font-mono text-[10px] tracking-wider mt-1 opacity-60">
                        {a.author} · {a.date}
                      </div>
                    </div>
                    <ArrowUpRight size={14} strokeWidth={1.5} />
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="border-2 p-6 relative"
              style={{ borderColor: ink }}
            >
              <div
                className="absolute -top-3 left-4 px-2 font-mono text-[10px] tracking-[0.3em]"
                style={{ background: paper, color: red }}
              >
                ◦ SUBSCRIBE
              </div>
              <div
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "1.7rem",
                  fontWeight: 500,
                  lineHeight: 1.1,
                }}
              >
                Four issues a year.
                <br />
                <span className="italic" style={{ color: red }}>
                  Printed on oak paper.
                </span>
              </div>
              <div className="mt-4 flex gap-2">
                <input
                  placeholder="your email"
                  className="flex-1 bg-transparent border-b focus:outline-none py-2 text-sm placeholder-black/40"
                  style={{ borderColor: ink + "60" }}
                />
                <button
                  className="font-mono text-[10px] tracking-widest text-white px-4 py-2 hover:opacity-85 transition-all"
                  style={{ background: red }}
                >
                  JOIN
                </button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ARCHIVE */}
      <section
        className="px-6 md:px-12 py-16 border-t-4"
        style={{ borderColor: ink }}
      >
        <div className="max-w-[1500px] mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-xs" style={{ color: red }}>
              ◦ 02
            </span>
            <span className="font-mono text-xs opacity-60">
              — FROM THE ARCHIVE
            </span>
            <div className="h-px flex-1" style={{ background: ink + "40" }} />
          </div>

          <div className="grid grid-cols-12 gap-10">
            {ARTICLES.slice(1).map((a, i) => (
              <motion.article
                key={a.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: i * 0.08 }}
                className="col-span-12 md:col-span-4 border-t-2 pt-6"
                style={{ borderColor: ink }}
              >
                <div className="aspect-[3/2] overflow-hidden mb-5 border" style={{ borderColor: ink + "30" }}>
                  <img
                    src={a.img}
                    alt=""
                    className="w-full h-full object-cover"
                    style={{ filter: "grayscale(1) contrast(1.1) sepia(0.1)" }}
                  />
                </div>
                <div
                  className="font-mono text-[10px] tracking-[0.3em] mb-3"
                  style={{ color: red }}
                >
                  {a.tag} · {a.date}
                </div>
                <h3
                  className="leading-[1.08] mb-3"
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "1.9rem",
                    fontWeight: 500,
                  }}
                >
                  {a.title}
                </h3>
                <p
                  className="text-sm leading-[1.7] mb-3 opacity-80"
                  style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.05rem" }}
                >
                  {a.excerpt}
                </p>
                <div className="font-mono text-[10px] tracking-[0.3em] opacity-70">
                  BY {a.author.toUpperCase()}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* COLOPHON */}
      <section
        className="px-6 md:px-12 py-16 border-t-4"
        style={{ borderColor: ink, background: "#ece2bf" }}
      >
        <div className="max-w-[1300px] mx-auto grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-5">
            <div
              className="font-mono text-[10px] tracking-[0.3em] mb-4"
              style={{ color: red }}
            >
              ◦ COLOPHON
            </div>
            <h2
              className="leading-[0.95]"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(2rem, 4.5vw, 4rem)",
                fontWeight: 500,
              }}
            >
              A <span className="italic" style={{ color: red }}>quiet</span>{" "}
              publication.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-7 space-y-4 leading-relaxed opacity-85" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.2rem" }}>
            <p>
              Lume is edited in a small attic in Brooklyn and printed in
              Saint-Étienne on uncoated oak paper. We publish four times a year.
            </p>
            <p>
              No advertising. Four hundred readers. A slow subscription list.
            </p>
            <a
              href="mailto:editor@lumejournal.com"
              className="inline-flex items-center gap-2 mt-2 font-mono text-[10px] tracking-[0.3em] border-2 px-4 py-3 rounded-none hover:text-white transition-all"
              style={{
                borderColor: ink,
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = red;
                e.currentTarget.style.borderColor = red;
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = ink;
                e.currentTarget.style.color = ink;
              }}
            >
              EDITOR@LUMEJOURNAL.COM <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </section>

      <footer
        className="px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] tracking-[0.2em] border-t-4"
        style={{ borderColor: ink, color: ink + "80" }}
      >
        <div>© LUME JOURNAL · VOL. VII · MMXXV</div>
        <div style={{ color: red }}>WEBSITE BY KYNTHIA · ECHO TIER</div>
      </footer>
    </div>
  );
}

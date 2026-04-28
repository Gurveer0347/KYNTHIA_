import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      data-testid="footer"
      className="relative border-t kb-border bg-black px-6 md:px-12 pt-24 pb-10"
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-12 gap-8 mb-20">
          <div className="col-span-12 md:col-span-8">
            <div className="font-mono text-[10px] text-white/40 mb-8">
              ◦ ENTER THE ORBIT
            </div>
            <h2
              className="font-display tracking-tighter leading-[0.9]"
              style={{ fontSize: "clamp(3rem, 12vw, 11rem)" }}
            >
              KYNTHIA
            </h2>
            <p className="font-serif-i italic text-white/50 text-xl md:text-2xl mt-6 max-w-xl">
              Websites engineered with gravity.
            </p>
          </div>

          <div className="col-span-6 md:col-span-2 flex flex-col gap-3">
            <div className="font-mono text-[10px] text-white/40 mb-2">
              NAVIGATION
            </div>
            {["Manifesto", "Tiers", "Work", "Process", "Contact"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(l.toLowerCase());
                  if (window.__lenis && el)
                    window.__lenis.scrollTo(el, { offset: -40 });
                  else el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-white/70 hover:text-white transition-colors text-sm w-fit"
              >
                {l}
              </a>
            ))}
          </div>

          <div className="col-span-6 md:col-span-2 flex flex-col gap-3">
            <div className="font-mono text-[10px] text-white/40 mb-2">
              CONTACT
            </div>
            <a
              href="#contact"
              className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-1 w-fit"
            >
              hello@kynthia.studio
              <ArrowUpRight size={14} strokeWidth={1} />
            </a>
            <div className="text-white/40 text-sm">Global / Remote</div>
            <div className="font-mono text-[10px] text-white/40 mt-4">
              AVAILABILITY — Q1 / 2026
            </div>
          </div>
        </div>

        <div className="border-t kb-border pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-[10px] text-white/40">
          <div>© {year} KYNTHIA STUDIO · ALL RIGHTS RESERVED</div>
          <div className="flex gap-6">
            <span>ECHO · AETHER · COSMOS</span>
            <span>BUILT WITH OBSESSION</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

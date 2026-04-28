import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { id: "manifesto", label: "Manifesto" },
  { id: "tiers", label: "Tiers" },
  { id: "work", label: "Work" },
  { id: "process", label: "Process" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -40 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        data-testid="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/60 backdrop-blur-2xl border-b kb-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
          <button
            onClick={() => scrollTo("top")}
            data-testid="nav-logo"
            className="font-display text-xl md:text-2xl tracking-tighter"
          >
            KYNTHIA
            <span className="font-serif-i text-white/40 text-sm ml-1">®</span>
          </button>

          <nav className="hidden md:flex items-center gap-10">
            {LINKS.map((l, i) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                data-testid={`nav-${l.id}`}
                className="font-mono text-xs text-white/60 hover:text-white transition-colors duration-300 relative group"
              >
                <span className="text-white/30 mr-2">
                  0{i + 1}
                </span>
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-500 group-hover:w-full" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollTo("contact")}
              data-testid="nav-cta-quote"
              className="hidden md:inline-flex items-center gap-2 font-mono text-xs px-5 py-3 border border-white/20 hover:bg-white hover:text-black transition-all duration-300 rounded-full"
            >
              Request quote
              <span className="inline-block w-1 h-1 bg-current rounded-full" />
            </button>
            <button
              className="md:hidden p-2"
              onClick={() => setOpen(true)}
              data-testid="nav-menu-open"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black md:hidden"
            data-testid="mobile-menu"
          >
            <div className="flex justify-between items-center h-16 px-6 border-b kb-border">
              <span className="font-display text-xl">KYNTHIA</span>
              <button
                onClick={() => setOpen(false)}
                data-testid="nav-menu-close"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>
            <nav className="flex flex-col p-8 gap-6">
              {LINKS.map((l, i) => (
                <motion.button
                  key={l.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  onClick={() => scrollTo(l.id)}
                  data-testid={`mnav-${l.id}`}
                  className="text-left font-display text-4xl tracking-tight"
                >
                  <span className="font-mono text-xs text-white/30 mr-3 align-top">
                    0{i + 1}
                  </span>
                  {l.label}
                </motion.button>
              ))}
              <button
                onClick={() => scrollTo("contact")}
                className="mt-6 font-mono text-xs px-6 py-4 border border-white/30 rounded-full"
              >
                Request a quote →
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

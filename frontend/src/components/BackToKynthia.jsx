import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/**
 * Small consistent back-navigation pill shown on every showcase page.
 * Fixed top-left, mixes with content but non-intrusive.
 */
export default function BackToKynthia({ light = false }) {
  return (
    <Link
      to="/"
      data-testid="back-to-kynthia"
      className={`fixed top-5 left-5 md:top-6 md:left-8 z-50 group inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[10px] tracking-widest border backdrop-blur-xl transition-all ${
        light
          ? "bg-white/80 text-black border-black/20 hover:bg-white"
          : "bg-black/60 text-white border-white/20 hover:bg-black"
      }`}
    >
      <ArrowLeft
        size={12}
        strokeWidth={2}
        className="transition-transform group-hover:-translate-x-0.5"
      />
      BACK TO KYNTHIA
    </Link>
  );
}

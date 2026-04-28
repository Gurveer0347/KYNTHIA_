import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const API = (process.env.REACT_APP_BACKEND_URL || "") + "/api";

const TIERS = [
  { v: "echo", l: "ECHO — minimal" },
  { v: "aether", l: "AETHER — dynamic + AI" },
  { v: "cosmos", l: "COSMOS — full 3D web app" },
  { v: "unsure", l: "Not sure yet" },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    tier_interest: "unsure",
    budget: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email and a short message.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/quote`, form);
      setSent(true);
      toast.success("Transmission received. We'll be in touch within 48h.");
      setForm({
        name: "",
        email: "",
        company: "",
        tier_interest: "unsure",
        budget: "",
        message: "",
      });
    } catch (err) {
      const detail =
        err?.response?.data?.detail || "Something went wrong. Please try again.";
      toast.error(typeof detail === "string" ? detail : "Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative py-32 md:py-48 px-6 md:px-12 bg-[#030303] overflow-hidden"
    >
      {/* Giant background word */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-[-5%] flex items-end justify-center pointer-events-none"
      >
        <span
          className="font-display text-white/[0.04] select-none leading-none"
          style={{ fontSize: "clamp(8rem, 25vw, 22rem)" }}
        >
          KYNTHIA
        </span>
      </motion.div>

      <div className="relative max-w-[1400px] mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs text-white/50">◦ 05</span>
          <span className="font-mono text-xs text-white/50">
            — REQUEST A QUOTE
          </span>
          <div className="h-px flex-1 bg-white/15" />
        </div>

        <div className="grid grid-cols-12 gap-8 md:gap-16">
          {/* Left column */}
          <div className="col-span-12 md:col-span-5">
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[0.95] text-balance">
              Let's build something{" "}
              <span className="font-serif-i italic text-white/75">
                unreasonable.
              </span>
            </h2>
            <p className="mt-8 text-white/60 text-lg leading-relaxed max-w-md">
              Every engagement is custom. Pricing is dynamic — scoped to the
              ambition of your brand and the tier you choose.
            </p>

            <div className="mt-16 space-y-8">
              <div>
                <div className="font-mono text-[10px] text-white/40 mb-2">
                  TYPICAL TIMELINE
                </div>
                <div className="font-display text-2xl">6 – 10 weeks</div>
              </div>
              <div>
                <div className="font-mono text-[10px] text-white/40 mb-2">
                  TIERS
                </div>
                <div className="font-display text-2xl">
                  ECHO · AETHER · COSMOS
                </div>
              </div>
              <div>
                <div className="font-mono text-[10px] text-white/40 mb-2">
                  RESPONSE TIME
                </div>
                <div className="font-display text-2xl">Within 48 hours</div>
              </div>
            </div>
          </div>

          {/* Right column - form */}
          <div className="col-span-12 md:col-span-7">
            <form
              onSubmit={submit}
              data-testid="quote-form"
              className="space-y-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <label className="block">
                  <span className="font-mono text-[10px] text-white/40">
                    ◦ 01 · NAME
                  </span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={update("name")}
                    data-testid="quote-input-name"
                    className="kb-input"
                    placeholder="Your full name"
                    required
                  />
                </label>
                <label className="block">
                  <span className="font-mono text-[10px] text-white/40">
                    ◦ 02 · EMAIL
                  </span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    data-testid="quote-input-email"
                    className="kb-input"
                    placeholder="you@brand.com"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <label className="block">
                  <span className="font-mono text-[10px] text-white/40">
                    ◦ 03 · COMPANY
                  </span>
                  <input
                    type="text"
                    value={form.company}
                    onChange={update("company")}
                    data-testid="quote-input-company"
                    className="kb-input"
                    placeholder="Brand or company name"
                  />
                </label>
                <label className="block">
                  <span className="font-mono text-[10px] text-white/40">
                    ◦ 04 · BUDGET (OPTIONAL)
                  </span>
                  <input
                    type="text"
                    value={form.budget}
                    onChange={update("budget")}
                    data-testid="quote-input-budget"
                    className="kb-input"
                    placeholder="e.g. $15k – $40k"
                  />
                </label>
              </div>

              <label className="block">
                <span className="font-mono text-[10px] text-white/40">
                  ◦ 05 · TIER OF INTEREST
                </span>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {TIERS.map((t) => {
                    const active = form.tier_interest === t.v;
                    return (
                      <button
                        key={t.v}
                        type="button"
                        onClick={() =>
                          setForm({ ...form, tier_interest: t.v })
                        }
                        data-testid={`quote-tier-${t.v}`}
                        className={`px-4 py-3 rounded-full border text-xs font-mono transition-all ${
                          active
                            ? "bg-white text-black border-white"
                            : "border-white/20 text-white/70 hover:border-white/60"
                        }`}
                      >
                        {t.l}
                      </button>
                    );
                  })}
                </div>
              </label>

              <label className="block">
                <span className="font-mono text-[10px] text-white/40">
                  ◦ 06 · PROJECT
                </span>
                <textarea
                  value={form.message}
                  onChange={update("message")}
                  data-testid="quote-input-message"
                  rows={5}
                  className="kb-input resize-none"
                  placeholder="Tell us about your brand, ambitions, timeline..."
                />
              </label>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-4">
                <p className="font-mono text-[10px] text-white/40 max-w-sm">
                  BY SUBMITTING, YOU AGREE TO BE CONTACTED ABOUT YOUR PROJECT.
                  NO NEWSLETTERS. NO NOISE.
                </p>
                <button
                  type="submit"
                  disabled={loading}
                  data-testid="quote-submit-button"
                  className="group inline-flex items-center gap-4 bg-white text-black px-8 py-5 rounded-full font-mono text-xs hover:bg-white/90 transition-all disabled:opacity-60 disabled:cursor-wait"
                >
                  {loading ? "TRANSMITTING..." : sent ? "SENT ✓" : "SEND TRANSMISSION"}
                  <ArrowUpRight
                    size={16}
                    strokeWidth={2}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { ArrowUpRight, Check } from "lucide-react";

const TIERS = [
  {
    id: "echo",
    label: "ECHO",
    tagline: "Minimal. Measured. Masterful.",
    description:
      "A full marketing website stripped to its essence. Editorial typography, whisper-smooth transitions, and restrained morphing. Built to convert without shouting.",
    features: [
      "5–7 section marketing site",
      "Smooth scroll & fade transitions",
      "Limited, intentional morphing",
      "Mobile-first responsive",
      "CMS-ready (if needed)",
    ],
    index: "01",
  },
  {
    id: "aether",
    label: "AETHER",
    tagline: "Dynamic. Intelligent. Alive.",
    description:
      "Everything in Echo, with dynamic scroll storytelling, fluid morphing, and AI integration. Chatbots, content generation, personalization — woven into the experience.",
    features: [
      "Dynamic scroll-driven animation",
      "Morphing & fluid transitions",
      "AI integration (chat, content)",
      "Advanced micro-interactions",
      "Custom motion system",
    ],
    index: "02",
  },
  {
    id: "cosmos",
    label: "COSMOS",
    tagline: "Everything. All at once.",
    description:
      "A full web application built to dominate. Real-time 3D, custom cursors, pointer-reactive systems, interactive storytelling, deep AI integration — a showpiece engineered to win awards.",
    features: [
      "Full 3D / WebGL experiences",
      "Interactive pointer systems",
      "Complete scroll choreography",
      "Deep AI integration",
      "Custom full web application",
      "Award-tier craft",
    ],
    index: "03",
  },
];

/* --- ECHO visual: single precise line --- */
function EchoVisual() {
  return (
    <div className="h-40 w-full flex items-center justify-center relative overflow-hidden">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-px bg-white origin-left"
      />
      <div className="absolute font-mono text-[10px] text-white/40 -bottom-0 left-0">
        ECHO.01
      </div>
      <div className="absolute font-mono text-[10px] text-white/40 -bottom-0 right-0">
        MINIMAL
      </div>
    </div>
  );
}

/* --- AETHER visual: morphing blob --- */
function AetherVisual() {
  return (
    <div className="h-40 w-full flex items-center justify-center relative">
      <div
        className="morph-blob w-40 h-40 bg-gradient-to-br from-white via-white/60 to-white/10"
        style={{
          filter: "blur(0.5px)",
        }}
      />
      <div className="absolute inset-0 morph-blob border border-white/25" style={{ animationDelay: "2s" }} />
    </div>
  );
}

/* --- COSMOS visual: mini 3D (raw Three.js) --- */
function CosmosVisual() {
  const mountRef = useRef(null);
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    cam.position.z = 3.2;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      cam.aspect = w / h;
      cam.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    resize();
    mount.appendChild(renderer.domElement);
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    const dl = new THREE.DirectionalLight(0xffffff, 0.7);
    dl.position.set(3, 2, 4);
    scene.add(dl);
    const geo = new THREE.IcosahedronGeometry(1.1, 1);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      wireframe: true,
      emissive: 0xffffff,
      emissiveIntensity: 0.08,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);
    window.addEventListener("resize", resize);
    const clock = new THREE.Clock();
    let raf;
    const tick = () => {
      const t = clock.getElapsedTime();
      mesh.rotation.x = t * 0.4;
      mesh.rotation.y = t * 0.55;
      renderer.render(scene, cam);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      mount.removeChild(renderer.domElement);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, []);
  return (
    <div className="h-40 w-full relative overflow-hidden">
      <div ref={mountRef} className="absolute inset-0" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 85%)",
        }}
      />
    </div>
  );
}

const VISUALS = {
  echo: <EchoVisual />,
  aether: <AetherVisual />,
  cosmos: <CosmosVisual />,
};

export default function Tiers() {
  return (
    <section
      id="tiers"
      data-testid="tiers-section"
      className="relative py-32 md:py-48 px-6 md:px-12 bg-[#030303]"
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs text-white/50">◦ 02</span>
          <span className="font-mono text-xs text-white/50">— TIERS</span>
          <div className="h-px flex-1 bg-white/15" />
        </div>

        <div className="grid grid-cols-12 gap-6 mb-20 md:mb-28">
          <h2 className="col-span-12 md:col-span-8 font-display text-5xl md:text-7xl lg:text-8xl tracking-tight text-balance">
            Three tiers.{" "}
            <span className="font-serif-i italic text-white/70">
              One obsession.
            </span>
          </h2>
          <p className="col-span-12 md:col-span-4 font-body text-white/60 md:pt-6 leading-relaxed">
            From a quiet, elegant marketing site to a full 3D web application —
            every tier is engineered with the same discipline. Only the
            intensity changes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TIERS.map((t, i) => {
            const isEcho = t.id === "echo";
            const isAether = t.id === "aether";
            const isCosmos = t.id === "cosmos";
            const cardClass = isEcho
              ? "bg-[#0a0a0a] border kb-border"
              : isAether
                ? "aether-border"
                : "cosmos-glow border kb-border";

            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 1,
                  delay: i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                data-testid={`tier-card-${t.id}`}
                className={`relative ${cardClass} p-8 md:p-10 flex flex-col min-h-[680px]`}
              >
                {/* Corner labels */}
                <div className="flex items-start justify-between mb-8">
                  <span className="font-mono text-[10px] text-white/40">
                    TIER / {t.index}
                  </span>
                  <ArrowUpRight
                    size={20}
                    strokeWidth={1}
                    className="text-white/30"
                  />
                </div>

                {/* Label */}
                <h3
                  className={`font-display tracking-tight leading-none ${
                    isCosmos
                      ? "text-6xl md:text-7xl"
                      : isAether
                        ? "text-5xl md:text-6xl"
                        : "text-5xl md:text-6xl"
                  }`}
                >
                  {t.label}
                </h3>
                <p className="font-serif-i italic text-white/60 text-xl mt-3 mb-8">
                  {t.tagline}
                </p>

                {/* Visual */}
                <div className="mb-8 border-t border-b kb-border py-4">
                  {VISUALS[t.id]}
                </div>

                {/* Description */}
                <p className="text-white/70 leading-relaxed mb-8 text-[15px]">
                  {t.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-auto">
                  {t.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 text-sm text-white/80"
                    >
                      <Check
                        size={14}
                        strokeWidth={1.5}
                        className="mt-1 text-white/50 shrink-0"
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById("contact");
                    if (window.__lenis && el)
                      window.__lenis.scrollTo(el, { offset: -40 });
                    else el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  data-testid={`tier-cta-${t.id}`}
                  className={`mt-10 inline-flex items-center justify-between gap-4 px-5 py-4 rounded-full font-mono text-xs transition-all group ${
                    isCosmos
                      ? "bg-white text-black hover:bg-white/90"
                      : "border border-white/25 hover:border-white"
                  }`}
                >
                  <span>Start with {t.label}</span>
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 font-mono text-xs text-white/40 text-center">
          ◦ EVERY TIER IS CUSTOM. PRICING IS DYNAMIC AND TAILORED TO SCOPE.
        </div>
      </div>
    </section>
  );
}

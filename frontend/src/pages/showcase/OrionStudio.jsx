import { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion, useScroll, useTransform } from "framer-motion";
import BackToKynthia from "@/components/BackToKynthia";
import { ArrowUpRight } from "lucide-react";

/* ====== COSMOS TIER — ORION STUDIO (Architecture) ======
 * Palette: concrete grey + bone + terracotta + deep ochre
 * Signature: scroll-driven horizontal split reveal for each project
 * Persistent: animated blueprint grid in background + rotating compass
 */

function BlueprintGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 opacity-40">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(170,110,80,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(170,110,80,0.08) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(170,110,80,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(170,110,80,0.15) 1px, transparent 1px)",
          backgroundSize: "400px 400px",
        }}
      />
    </div>
  );
}

function PersistentCompass() {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 540]);
  return (
    <motion.div
      style={{ rotate }}
      className="fixed bottom-8 right-8 md:bottom-10 md:right-10 z-40 w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-[#b5653a]/50 flex items-center justify-center pointer-events-none"
      data-testid="orion-compass"
    >
      <div className="w-px h-full bg-[#b5653a]/40" />
      <div className="absolute w-full h-px bg-[#b5653a]/40" />
      <div className="absolute top-1 font-mono text-[9px] text-[#b5653a]">N</div>
      <div className="absolute bottom-1 font-mono text-[9px] text-[#b5653a]/60">S</div>
    </motion.div>
  );
}

function WireTower() {
  const mountRef = useRef(null);
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(
      42,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    cam.position.set(4.5, 3, 7);
    cam.lookAt(0, 1.5, 0);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    const mat = new THREE.MeshBasicMaterial({
      color: 0x2a2015,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    for (let i = 0; i < 7; i++) {
      const w = 2.4 - i * 0.14;
      const d = 2.4 - i * 0.14;
      const g = new THREE.BoxGeometry(w, 0.5, d);
      const m = new THREE.Mesh(g, mat);
      m.position.y = i * 0.52;
      group.add(m);
    }
    scene.add(group);

    const onResize = () => {
      cam.aspect = mount.clientWidth / mount.clientHeight;
      cam.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);
    const mouse = { x: 0, y: 0 };
    const onMove = (e) => {
      const r = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      mouse.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    };
    mount.addEventListener("mousemove", onMove);
    const clock = new THREE.Clock();
    let raf;
    const tick = () => {
      const t = clock.getElapsedTime();
      group.rotation.y = t * 0.15 + mouse.x * 0.4;
      group.rotation.x = mouse.y * 0.15;
      renderer.render(scene, cam);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      mount.removeEventListener("mousemove", onMove);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);
  return <div ref={mountRef} className="absolute inset-0" />;
}

const PROJECTS = [
  {
    n: "01",
    title: "Casa Vesper",
    loc: "Oaxaca, MX",
    year: "2024",
    desc:
      "A quiet volume of concrete and oak, set into the slope so the roof gathers rain for the cistern below.",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=85&w=1200",
  },
  {
    n: "02",
    title: "Haus Linia",
    loc: "Basel, CH",
    year: "2024",
    desc: "Three linear pavilions aligned with the sun path, connected by a single 60m courtyard.",
    img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=85&w=1200",
  },
  {
    n: "03",
    title: "Monolith 9",
    loc: "Kyoto, JP",
    year: "2023",
    desc: "Tea house carved from a single cedar trunk, its grain running unbroken across the nine rooms.",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=85&w=1200",
  },
];

export default function OrionStudio() {
  return (
    <div
      className="min-h-screen text-[#1c1612]"
      data-testid="showcase-orion"
      style={{
        background:
          "linear-gradient(180deg, #f5efe4 0%, #ebe1d0 40%, #e8dac4 100%)",
      }}
    >
      <BlueprintGrid />
      <PersistentCompass />
      <BackToKynthia light />
      <div className="fixed top-5 right-5 md:top-6 md:right-8 z-50 font-mono text-[10px] tracking-widest px-4 py-2 rounded-full border border-[#1c1612]/30 bg-[#f5efe4]/80 backdrop-blur-xl">
        COSMOS TIER · LIVE DEMO
      </div>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col">
        <div className="absolute inset-0 opacity-80">
          <WireTower />
        </div>

        <header className="relative z-10 flex items-center justify-between px-6 md:px-12 h-20 border-b border-[#1c1612]/10">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-[#b5653a]" />
            <div className="font-display text-xl tracking-[0.35em]">ORION</div>
          </div>
          <nav className="hidden md:flex gap-10 font-mono text-[10px] tracking-widest">
            {["PROJECTS", "STUDIO", "JOURNAL", "CONTACT"].map((l) => (
              <a key={l} href={`#${l}`} className="hover:text-[#b5653a]">
                {l}
              </a>
            ))}
          </nav>
          <div className="font-mono text-[10px] tracking-widest text-[#1c1612]/60">
            EST. MMXII
          </div>
        </header>

        <div className="relative z-10 flex-1 grid grid-cols-12 gap-4 px-6 md:px-12 pt-16 pb-16 items-end">
          <div className="col-span-12 md:col-span-7">
            <div className="font-mono text-[10px] tracking-widest text-[#b5653a] mb-8">
              ◦ ARCHITECTURE · OAXACA / BASEL
            </div>
            <h1
              className="font-display leading-[0.82] tracking-[-0.05em]"
              style={{ fontSize: "clamp(3.5rem, 12vw, 11rem)" }}
            >
              <div>Shelter</div>
              <div className="font-serif-i italic text-[#b5653a]">as</div>
              <div>silence.</div>
            </h1>
          </div>
          <div className="col-span-12 md:col-span-5 md:pl-10 md:border-l border-[#1c1612]/15">
            <p className="text-[#1c1612]/75 text-lg leading-relaxed max-w-sm">
              We build quiet houses for loud lives — composed from concrete,
              timber, and light. Every plan begins with the weather.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8 border-t border-[#1c1612]/15 pt-6">
              <div>
                <div className="font-mono text-[9px] text-[#1c1612]/50 tracking-widest">
                  FOUNDED
                </div>
                <div className="font-display text-3xl">2012</div>
              </div>
              <div>
                <div className="font-mono text-[9px] text-[#1c1612]/50 tracking-widest">
                  PROJECTS
                </div>
                <div className="font-display text-3xl">42</div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 border-t border-[#1c1612]/10 py-4 px-6 md:px-12 flex items-center justify-between font-mono text-[10px] tracking-widest text-[#1c1612]/60">
          <span>◦ CONCRETE · TIMBER · LIGHT · AIR</span>
          <span>41°N / 103°W → 47°N / 7°E</span>
        </div>
      </section>

      {/* PROJECT STORIES — split scroll */}
      <section id="PROJECTS" className="py-28 px-6 md:px-12">
        <div className="max-w-[1500px] mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-xs text-[#1c1612]/50">◦ 02</span>
            <span className="font-mono text-xs text-[#1c1612]/50">
              — PROJECTS
            </span>
            <div className="h-px flex-1 bg-[#1c1612]/15" />
          </div>

          <div className="space-y-28">
            {PROJECTS.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                className="grid grid-cols-12 gap-6 items-stretch"
              >
                <div
                  className={`col-span-12 md:col-span-7 ${i % 2 ? "md:order-2" : ""}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden group">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover grayscale-[30%] sepia-[20%] transition-all duration-[1400ms] group-hover:grayscale-0 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 font-mono text-[10px] bg-[#f5efe4]/90 backdrop-blur px-2 py-1 rounded text-[#1c1612]">
                      N°{p.n}
                    </div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-5 flex flex-col gap-4 md:pt-10">
                  <div className="font-mono text-[10px] text-[#b5653a] tracking-widest">
                    {p.year}
                  </div>
                  <h3 className="font-display text-5xl md:text-6xl tracking-tight leading-[0.95]">
                    {p.title}
                  </h3>
                  <div className="font-serif-i italic text-[#1c1612]/60 text-xl">
                    {p.loc}
                  </div>
                  <p className="text-[#1c1612]/70 leading-relaxed">{p.desc}</p>
                  <button className="mt-2 w-fit inline-flex items-center gap-2 font-mono text-[10px] border border-[#1c1612]/30 rounded-full px-4 py-2 hover:bg-[#1c1612] hover:text-[#f5efe4] transition-all">
                    VIEW PROJECT <ArrowUpRight size={12} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="CONTACT"
        className="py-28 px-6 md:px-12 border-t border-[#1c1612]/15 text-center relative"
      >
        <div className="font-mono text-[10px] text-[#b5653a] mb-6 tracking-widest">
          ◦ COMMISSION
        </div>
        <h2 className="font-display text-5xl md:text-7xl tracking-tight mb-10">
          Build with{" "}
          <span className="font-serif-i italic text-[#b5653a]">ORION.</span>
        </h2>
        <a
          href="mailto:studio@orion.works"
          className="inline-flex items-center gap-3 px-8 py-4 bg-[#1c1612] text-[#f5efe4] font-mono text-xs rounded-full hover:bg-[#b5653a] transition-all"
        >
          STUDIO@ORION.WORKS <ArrowUpRight size={14} />
        </a>
      </section>

      <footer className="border-t border-[#1c1612]/15 px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] text-[#1c1612]/50">
        <div>© ORION ARCHITECTS · OAXACA / BASEL</div>
        <div>WEBSITE BY KYNTHIA · COSMOS TIER</div>
      </footer>
    </div>
  );
}

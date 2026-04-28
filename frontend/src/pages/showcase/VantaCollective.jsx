import { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import BackToKynthia from "@/components/BackToKynthia";
import { ArrowUpRight } from "lucide-react";

/* ====== COSMOS TIER — VANTA COLLECTIVE (Creative Agency) ======
 * Palette: jet black + neon pink + electric cyan + acid lime
 * Signature: chromatic glitch text + cursor-following neon orb trail
 * Persistent: rotating/morphing 3D torus with chromatic rim glow
 */

function NeonOrbTrail() {
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
      tx += (x - tx) * 0.14;
      ty += (y - ty) * 0.14;
      if (el)
        el.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
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
      className="fixed top-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none z-[3] mix-blend-screen"
      style={{
        background:
          "radial-gradient(circle, rgba(255,0,150,0.35), rgba(0,200,255,0.2) 40%, transparent 75%)",
        filter: "blur(30px)",
      }}
      aria-hidden="true"
    />
  );
}

function ChromaticTorus() {
  const mountRef = useRef(null);
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(
      50,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    cam.position.z = 4;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.2));
    const pink = new THREE.PointLight(0xff3399, 2, 50);
    pink.position.set(-3, 2, 3);
    scene.add(pink);
    const cyan = new THREE.PointLight(0x33ccff, 2, 50);
    cyan.position.set(3, -2, 3);
    scene.add(cyan);

    const geo = new THREE.TorusKnotGeometry(1, 0.35, 180, 32);
    const original = geo.attributes.position.array.slice();
    const mat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.9,
      roughness: 0.15,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const onResize = () => {
      cam.aspect = mount.clientWidth / mount.clientHeight;
      cam.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);
    const clock = new THREE.Clock();
    let raf;
    const tick = () => {
      const t = clock.getElapsedTime();
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const ox = original[i * 3];
        const oy = original[i * 3 + 1];
        const oz = original[i * 3 + 2];
        const n = Math.sin(ox + t) * 0.04 + Math.cos(oy + t * 1.3) * 0.03;
        pos.setXYZ(i, ox * (1 + n), oy * (1 + n), oz * (1 + n));
      }
      pos.needsUpdate = true;
      geo.computeVertexNormals();
      mesh.rotation.x = t * 0.25;
      mesh.rotation.y = t * 0.35;
      renderer.render(scene, cam);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      mount.removeChild(renderer.domElement);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, []);
  return <div ref={mountRef} className="absolute inset-0" />;
}

/* Chromatic glitch text — three offset copies */
function GlitchText({ children, className = "" }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span
        className="absolute inset-0 text-[#ff3399]"
        style={{ transform: "translate(2px, 0px)", mixBlendMode: "screen" }}
        aria-hidden="true"
      >
        {children}
      </span>
      <span
        className="absolute inset-0 text-[#33ccff]"
        style={{ transform: "translate(-2px, 0px)", mixBlendMode: "screen" }}
        aria-hidden="true"
      >
        {children}
      </span>
      <span className="relative text-white">{children}</span>
    </span>
  );
}

const WORK = [
  {
    t: "SABLE STUDIOS",
    c: "Brand Identity",
    img: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=85&w=1200",
  },
  {
    t: "NORTH HARBOR",
    c: "Campaign · Motion",
    img: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?auto=format&fit=crop&q=85&w=1200",
  },
  {
    t: "FERRO MAGAZINE",
    c: "Editorial System",
    img: "https://images.unsplash.com/photo-1495716091242-0ad7bc9e21b5?auto=format&fit=crop&q=85&w=1200",
  },
  {
    t: "INDIGO & OAK",
    c: "Packaging",
    img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=85&w=1200",
  },
];

export default function VantaCollective() {
  return (
    <div
      className="min-h-screen bg-black text-white relative overflow-hidden"
      data-testid="showcase-vanta"
    >
      <NeonOrbTrail />
      <BackToKynthia />
      <div className="fixed top-5 right-5 md:top-6 md:right-8 z-50 font-mono text-[10px] tracking-widest px-4 py-2 rounded-full border border-[#ff3399]/50 bg-black/60 backdrop-blur-xl text-[#ff3399]">
        COSMOS TIER · LIVE DEMO
      </div>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        <div className="absolute inset-[10%] opacity-90">
          <ChromaticTorus />
        </div>

        <header className="relative z-10 flex items-center justify-between px-6 md:px-12 h-20 border-b border-white/10">
          <div className="font-display text-2xl tracking-[-0.02em]">
            VANTA<span className="font-serif-i italic text-[#ff3399]">°</span>
          </div>
          <nav className="hidden md:flex gap-10 font-mono text-[10px] tracking-widest">
            {["WORK", "STUDIO", "MANIFESTO", "CONTACT"].map((l) => (
              <a key={l} href={`#${l}`} className="hover:text-[#33ccff] text-white/70">
                {l}
              </a>
            ))}
          </nav>
          <button className="font-mono text-[10px] tracking-widest px-4 py-2 rounded-full bg-[#ff3399] text-black hover:bg-[#33ccff] transition-all">
            HIRE US
          </button>
        </header>

        <div className="relative z-10 flex-1 grid grid-cols-12 gap-6 px-6 md:px-12 pt-12 pb-16">
          <div className="col-span-12 md:col-span-10 flex flex-col justify-end">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-[#ff3399]" />
              <span className="font-mono text-[10px] text-[#33ccff] tracking-widest">
                VANTA COLLECTIVE · NYC / TOKYO / LISBON
              </span>
            </div>
            <h1
              className="font-display leading-[0.8] tracking-[-0.055em]"
              style={{ fontSize: "clamp(4rem, 14vw, 14rem)" }}
            >
              <div>
                <GlitchText>We make</GlitchText>
              </div>
              <div className="flex items-baseline gap-[0.1em]">
                <span className="font-serif-i italic text-[#ff3399]">
                  bold
                </span>
                <span>for</span>
              </div>
              <div>brave brands.</div>
            </h1>
            <div className="mt-10 flex flex-col md:flex-row gap-6 md:gap-12 md:items-end">
              <p className="max-w-md text-white/70 leading-relaxed">
                A collective of 22 designers, directors, and technologists
                building identity systems, campaigns, and digital products
                across three continents.
              </p>
              <div className="flex gap-6">
                {[
                  ["22", "Creatives", "#ff3399"],
                  ["160+", "Projects", "#33ccff"],
                  ["03", "Studios", "#c6ff00"],
                ].map(([n, l, c]) => (
                  <div key={l}>
                    <div className="font-display text-3xl" style={{ color: c }}>
                      {n}
                    </div>
                    <div className="font-mono text-[9px] text-white/40 tracking-widest mt-1">
                      {l.toUpperCase()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Neon marquee */}
      <section className="border-y border-white/10 py-6 overflow-hidden bg-black">
        <div className="marquee whitespace-nowrap">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <span key={i} className="font-display text-5xl md:text-7xl mx-10">
                <span className="text-white">IDENTITY </span>
                <span className="text-[#ff3399]">· MOTION </span>
                <span className="text-white">· CAMPAIGN </span>
                <span className="text-[#33ccff]">· PRODUCT </span>
                <span className="font-serif-i italic text-[#c6ff00] mx-4">◦</span>
              </span>
            ))}
        </div>
      </section>

      {/* WORK */}
      <section id="WORK" className="py-28 px-6 md:px-12 relative">
        <div className="max-w-[1500px] mx-auto">
          <div className="flex items-center gap-4 mb-14">
            <span className="font-mono text-xs text-[#ff3399]">◦ 02</span>
            <span className="font-mono text-xs text-white/50">
              — SELECTED WORK
            </span>
            <div className="h-px flex-1 bg-white/15" />
          </div>
          <div className="grid grid-cols-12 gap-6">
            {WORK.map((w, i) => (
              <motion.a
                key={w.t}
                href="#"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.1 }}
                className={`group relative block overflow-hidden ${
                  i % 3 === 0
                    ? "col-span-12 md:col-span-8"
                    : "col-span-12 md:col-span-4"
                } aspect-[4/3]`}
                data-hover="true"
              >
                <img
                  src={w.img}
                  alt={w.t}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-[1400ms]"
                />
                <div
                  className="absolute inset-0 mix-blend-screen opacity-80 group-hover:opacity-40 transition-opacity duration-700"
                  style={{
                    background:
                      "linear-gradient(135deg, #ff3399 0%, #000 50%, #33ccff 100%)",
                  }}
                />
                <div className="relative z-10 h-full w-full p-6 flex flex-col justify-end">
                  <div className="font-mono text-[10px] text-[#c6ff00] mb-1">
                    {w.c}
                  </div>
                  <div className="flex items-end justify-between">
                    <h3 className="font-display text-3xl tracking-tight">{w.t}</h3>
                    <ArrowUpRight size={22} strokeWidth={1} />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section
        id="MANIFESTO"
        className="py-32 px-6 md:px-12 border-t border-white/10 relative overflow-hidden"
      >
        <div className="absolute -top-40 -left-40 w-[50vw] h-[50vw] rounded-full bg-[#ff3399]/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-[50vw] h-[50vw] rounded-full bg-[#33ccff]/20 blur-3xl" />
        <div className="max-w-[1400px] mx-auto relative">
          <div className="font-mono text-[10px] text-[#ff3399] mb-10 tracking-widest">
            ◦ 03 — OUR WAY
          </div>
          <h2
            className="font-display leading-[0.95] tracking-tight text-balance"
            style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}
          >
            We are{" "}
            <span className="font-serif-i italic bg-gradient-to-r from-[#ff3399] via-[#c6ff00] to-[#33ccff] bg-clip-text text-transparent">
              allergic
            </span>{" "}
            to the average.
          </h2>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="CONTACT"
        className="py-32 px-6 md:px-12 border-t border-white/10 text-center"
      >
        <div className="font-mono text-[10px] text-[#c6ff00] mb-6 tracking-widest">
          ◦ 04 — COME MAKE NOISE
        </div>
        <h2 className="font-display text-5xl md:text-7xl tracking-tight mb-8">
          Let's{" "}
          <span className="font-serif-i italic text-[#ff3399]">collide.</span>
        </h2>
        <a
          href="mailto:hello@vantacollective.co"
          className="inline-flex items-center gap-3 px-8 py-4 bg-[#ff3399] text-black font-mono text-xs rounded-full hover:bg-[#33ccff] transition-all"
        >
          HELLO@VANTACOLLECTIVE.CO <ArrowUpRight size={14} />
        </a>
      </section>

      <footer className="border-t border-white/10 px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] text-white/40">
        <div>© VANTA COLLECTIVE · NYC / TOKYO / LISBON</div>
        <div>WEBSITE BY KYNTHIA · COSMOS TIER</div>
      </footer>
    </div>
  );
}

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

/**
 * HeroScene: soft metallic ring + ambient particles behind the KYNTHIA wordmark.
 * Raw Three.js for React 19 compat.
 */
function HeroScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      48,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.35));
    const dir = new THREE.DirectionalLight(0xffffff, 0.95);
    dir.position.set(4, 5, 6);
    scene.add(dir);
    const rim = new THREE.DirectionalLight(0xffffff, 0.35);
    rim.position.set(-4, -2, 2);
    scene.add(rim);

    // Thin chrome ring
    const ringGeo = new THREE.TorusGeometry(1.9, 0.055, 32, 220);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 1,
      roughness: 0.12,
      emissive: 0xffffff,
      emissiveIntensity: 0.04,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI * 0.4;
    scene.add(ring);

    // Inner hairline ring
    const inner = new THREE.Mesh(
      new THREE.TorusGeometry(1.35, 0.015, 16, 160),
      ringMat
    );
    inner.rotation.x = Math.PI * 0.45;
    inner.rotation.y = Math.PI * 0.1;
    scene.add(inner);

    // Sparse particles
    const count = 900;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.8;
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.018,
      color: 0xffffff,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    const mouse = { x: 0, y: 0 };
    const onMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove);

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let raf;
    const animate = () => {
      const t = clock.getElapsedTime();
      ring.rotation.z = t * 0.18;
      ring.rotation.y = Math.sin(t * 0.3) * 0.25;
      inner.rotation.z = -t * 0.24;
      inner.rotation.x = Math.PI * 0.45 + Math.sin(t * 0.2) * 0.1;
      particles.rotation.y = t * 0.04;
      particles.position.x += (mouse.x * 0.4 - particles.position.x) * 0.03;
      particles.position.y += (mouse.y * 0.3 - particles.position.y) * 0.03;
      ring.position.x += (mouse.x * 0.25 - ring.position.x) * 0.04;
      ring.position.y += (mouse.y * 0.18 - ring.position.y) * 0.04;
      inner.position.x = ring.position.x * 0.7;
      inner.position.y = ring.position.y * 0.7;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      mount.removeChild(renderer.domElement);
      ringGeo.dispose();
      ringMat.dispose();
      pGeo.dispose();
      pMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" />;
}

const ease = [0.22, 1, 0.36, 1];

export default function Hero({ loaded }) {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative min-h-screen w-full overflow-hidden bg-black"
    >
      <HeroScene />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 15%, rgba(0,0,0,0.78) 78%)",
        }}
      />

      {/* TOP MASTHEAD STRIP */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={loaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.1, ease }}
        className="absolute top-20 md:top-24 left-0 right-0 z-10 px-6 md:px-12"
      >
        <div className="flex items-center gap-6">
          <div className="h-px flex-1 bg-white/20" />
          <div className="font-mono text-[10px] md:text-xs text-white/80 tracking-[0.3em] whitespace-nowrap">
            VOL · 01 — THE KYNTHIA COMPENDIUM — DEC · MMXXV
          </div>
          <div className="h-px flex-1 bg-white/20" />
        </div>
      </motion.div>

      {/* ==== CENTRAL KYNTHIA MASTHEAD ==== */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-36 pb-28 px-6 text-center">
        {/* small tag */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="flex items-center gap-4 mb-8 md:mb-10"
        >
          <div className="h-px w-10 bg-white/40" />
          <span className="font-mono text-[10px] md:text-xs text-white/70 tracking-[0.32em]">
            A WEB AGENCY FOR BRANDS THAT DON'T FOLLOW
          </span>
          <div className="h-px w-10 bg-white/40" />
        </motion.div>

        {/* The GIANT KYNTHIA wordmark — per-letter stagger */}
        <h1
          className="font-display text-white select-none leading-[0.82] tracking-[-0.055em]"
          style={{ fontSize: "clamp(4.5rem, 17vw, 18rem)" }}
          aria-label="KYNTHIA"
        >
          <span className="sr-only">KYNTHIA</span>
          <span className="inline-flex overflow-hidden">
            {"KYNTHIA".split("").map((letter, i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                initial={{ y: "115%", opacity: 0 }}
                animate={loaded ? { y: 0, opacity: 1 } : {}}
                transition={{
                  duration: 1.15,
                  delay: 0.3 + i * 0.07,
                  ease,
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* registered + subtitle line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="mt-4 md:mt-6 flex items-center gap-4 md:gap-6 font-mono text-[10px] md:text-xs text-white/55 tracking-[0.3em]"
        >
          <span>ECHO</span>
          <span className="text-white/25">◦</span>
          <span>AETHER</span>
          <span className="text-white/25">◦</span>
          <span>COSMOS</span>
        </motion.div>

        {/* Editorial pull-sentence */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.1, ease }}
          className="mt-10 md:mt-12 max-w-2xl text-white/75 text-base md:text-xl leading-[1.6] font-body"
        >
          We engineer{" "}
          <span className="font-serif-i italic text-white">
            beautifully intelligent
          </span>{" "}
          websites for brands entering their next era — composed with craft,
          code, and AI.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 1.35 }}
          className="mt-10 md:mt-12 flex flex-col md:flex-row items-center gap-3 md:gap-4"
        >
          <a
            href="#tiers"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("tiers");
              if (window.__lenis && el)
                window.__lenis.scrollTo(el, { offset: -40 });
              else el?.scrollIntoView({ behavior: "smooth" });
            }}
            data-testid="hero-cta-tiers"
            className="group inline-flex items-center gap-3 px-7 py-4 bg-white text-black font-mono text-xs rounded-full hover:bg-white/90 transition-all"
          >
            EXPLORE TIERS
            <span className="w-8 h-px bg-black group-hover:w-12 transition-all duration-500" />
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("contact");
              if (window.__lenis && el)
                window.__lenis.scrollTo(el, { offset: -40 });
              else el?.scrollIntoView({ behavior: "smooth" });
            }}
            data-testid="hero-cta-contact"
            className="inline-flex items-center gap-3 px-7 py-4 border border-white/25 font-mono text-xs rounded-full hover:border-white hover:bg-white/5 transition-all"
          >
            REQUEST A QUOTE
          </a>
        </motion.div>
      </div>

      {/* CORNER META — reinforces brand */}
      <div className="absolute top-24 md:top-28 left-6 md:left-12 z-10 font-mono text-[10px] text-white/45 tracking-[0.25em] hidden md:block">
        <div>KYNTHIA °</div>
        <div className="mt-1 text-white/30">BRAND_OS · v3.1</div>
      </div>
      <div className="absolute top-24 md:top-28 right-6 md:right-12 z-10 font-mono text-[10px] text-white/45 tracking-[0.25em] text-right hidden md:block">
        <div>EST. MMXXV</div>
        <div className="mt-1 text-white/30">GLOBAL / REMOTE</div>
      </div>

      {/* BOTTOM MASTHEAD */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-0 left-0 right-0 z-10 border-t kb-border bg-black/60 backdrop-blur-sm"
      >
        <div className="px-6 md:px-12 h-14 md:h-16 flex items-center justify-between gap-6">
          <div className="font-mono text-[10px] text-white/55 tracking-widest">
            KYNTHIA · ESTABLISHED MMXXV · GLOBAL
          </div>
          <div className="hidden md:flex items-center gap-4 font-mono text-[10px] text-white/55 tracking-widest">
            <span>01 MANIFESTO</span>
            <span className="text-white/25">—</span>
            <span>02 TIERS</span>
            <span className="text-white/25">—</span>
            <span>03 WORK</span>
            <span className="text-white/25">—</span>
            <span>04 PROCESS</span>
            <span className="text-white/25">—</span>
            <span>05 CONTACT</span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[10px] text-white/60">
            <div className="scroll-indicator scale-75">
              <span />
            </div>
            <span className="tracking-widest">SCROLL</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

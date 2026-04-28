import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * BrandOrb — a persistent morphing 3D sigil that lives on the main KYNTHIA site.
 * Fixed to bottom-left of the viewport; a small metal icosahedron that slowly
 * morphs and rotates across every section of the homepage.
 */
export default function BrandOrb() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const size = mount.clientWidth;
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    cam.position.z = 3;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(size, size);
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.45));
    const dl = new THREE.DirectionalLight(0xffffff, 0.9);
    dl.position.set(3, 3, 4);
    scene.add(dl);
    const rim = new THREE.DirectionalLight(0xffffff, 0.3);
    rim.position.set(-3, -2, 2);
    scene.add(rim);

    const geo = new THREE.IcosahedronGeometry(1, 5);
    const original = geo.attributes.position.array.slice();
    const mat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 1,
      roughness: 0.18,
      emissive: 0xffffff,
      emissiveIntensity: 0.04,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const onResize = () => {
      const s = mount.clientWidth;
      renderer.setSize(s, s);
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
        const n =
          Math.sin(ox * 3 + t * 0.9) * 0.08 +
          Math.cos(oy * 2.5 + t * 1.1) * 0.07 +
          Math.sin(oz * 2 + t * 0.7) * 0.06;
        pos.setXYZ(i, ox * (1 + n), oy * (1 + n), oz * (1 + n));
      }
      pos.needsUpdate = true;
      geo.computeVertexNormals();
      mesh.rotation.y = t * 0.25;
      mesh.rotation.x = Math.sin(t * 0.3) * 0.3;
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

  return (
    <div
      className="fixed left-6 bottom-6 md:left-10 md:bottom-10 z-40 flex items-end gap-3 pointer-events-none select-none"
      data-testid="brand-orb"
    >
      <div
        ref={mountRef}
        className="w-16 h-16 md:w-20 md:h-20"
        aria-hidden="true"
      />
      <div className="hidden md:flex flex-col mb-1">
        <div className="font-mono text-[9px] tracking-widest text-white/55">
          ◦ KYNTHIA
        </div>
        <div className="font-mono text-[9px] tracking-widest text-white/35">
          BRAND SIGIL / LIVE
        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef } from "react";

/**
 * ScrollFrameSequence
 * -------------------
 * A scroll-synced image sequence. Preloads a numbered JPG sequence from
 * `basePath` (e.g. "/frames/f_###.jpg") and paints the frame matching the
 * section's scroll progress onto a full-size canvas. Like the Apple AirPods
 * scroll effect — smooth, GPU-free, and paints only what's on-screen.
 *
 * Props:
 *  - basePath: "/frames/f_" (will append nnn.jpg, 1-indexed, zero-padded to pad)
 *  - count:    number of frames (e.g. 120)
 *  - pad:      number of zero-padding digits (default 3)
 *  - opacity:  canvas opacity (default 0.35)
 *  - speed:    how much of the section scroll maps to sequence progress (default 1)
 */
export default function ScrollFrameSequence({
  basePath,
  count,
  pad = 3,
  opacity = 0.35,
  speed = 1,
  className = "",
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const loadedRef = useRef(0);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    // Preload frames
    const imgs = [];
    for (let i = 1; i <= count; i++) {
      const img = new Image();
      const num = String(i).padStart(pad, "0");
      img.src = `${basePath}${num}.jpg`;
      img.onload = () => {
        loadedRef.current += 1;
        if (loadedRef.current === 1) {
          // first frame loaded — draw it immediately
          draw(0);
        }
      };
      img.onerror = () => {
        loadedRef.current += 1;
      };
      imgs.push(img);
    }
    framesRef.current = imgs;
  }, [basePath, count, pad]);

  const fitCanvas = () => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const { clientWidth: w, clientHeight: h } = wrap;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const draw = (frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const frames = framesRef.current;
    const idx = Math.max(0, Math.min(count - 1, Math.round(frameIndex)));
    const img = frames[idx];
    if (!img || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext("2d");
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    // cover fit
    const ir = img.naturalWidth / img.naturalHeight;
    const cr = cw / ch;
    let dw, dh, dx, dy;
    if (ir > cr) {
      dh = ch;
      dw = dh * ir;
      dx = (cw - dw) / 2;
      dy = 0;
    } else {
      dw = cw;
      dh = dw / ir;
      dx = 0;
      dy = (ch - dh) / 2;
    }
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  };

  useEffect(() => {
    fitCanvas();
    const onResize = () => {
      fitCanvas();
      draw(currentFrameRef.current);
    };
    window.addEventListener("resize", onResize);

    const computeProgress = () => {
      const wrap = wrapRef.current;
      if (!wrap) return 0;
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // progress: 0 when top of wrap is at bottom of viewport,
      // 1 when bottom of wrap is at top of viewport.
      const total = rect.height + vh;
      const scrolled = vh - rect.top;
      let p = scrolled / total;
      p = Math.max(0, Math.min(1, p));
      // Apply speed factor (higher speed compresses the mapping)
      const shifted = (p - 0.5) * speed + 0.5;
      return Math.max(0, Math.min(1, shifted));
    };

    const tick = () => {
      const p = computeProgress();
      targetFrameRef.current = p * (count - 1);
      // Lerp toward target for smoother painting
      currentFrameRef.current +=
        (targetFrameRef.current - currentFrameRef.current) * 0.12;
      if (Math.abs(targetFrameRef.current - currentFrameRef.current) < 0.01) {
        currentFrameRef.current = targetFrameRef.current;
      }
      draw(currentFrameRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, speed]);

  return (
    <div
      ref={wrapRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{ opacity, width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
}

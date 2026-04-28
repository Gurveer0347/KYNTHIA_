import { useEffect, useRef, useState } from "react";

/**
 * Custom magnetic cursor: two layers (outer ring + dot).
 * Detects interactive elements ([data-hover], a, button, input, textarea, select, [role=button]).
 */
export default function CustomCursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    // Disable on touch devices
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) {
      setEnabled(false);
      document.body.style.cursor = "auto";
      return;
    }

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let rafId;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      }
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    const hoverSel =
      'a, button, input, textarea, select, [role="button"], [data-hover="true"]';
    const onOver = (e) => {
      if (e.target.closest && e.target.closest(hoverSel)) {
        ringRef.current?.classList.add("is-hover");
      }
    };
    const onOut = (e) => {
      if (e.target.closest && e.target.closest(hoverSel)) {
        ringRef.current?.classList.remove("is-hover");
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={ringRef} className="kb-cursor" aria-hidden="true" />
      <div ref={dotRef} className="kb-cursor-dot" aria-hidden="true" />
    </>
  );
}

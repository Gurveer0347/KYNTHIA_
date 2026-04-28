import { useRef, useState } from "react";

/**
 * HoverRevealImage
 * ----------------
 * Two images stacked. The `hoverImg` is masked to a soft circle that follows
 * the cursor — so hovering only reveals the alternate image within the
 * hovered area, not the whole element.
 */
export default function HoverRevealImage({
  baseImg,
  hoverImg,
  alt = "",
  className = "",
  radius = 180,
}) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 50, y: 50, active: false });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    setPos({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
      active: true,
    });
  };

  const mask = pos.active
    ? `radial-gradient(circle ${radius}px at ${pos.x}% ${pos.y}%, black 0%, black 60%, transparent 100%)`
    : `radial-gradient(circle 0px at 50% 50%, black 0%, transparent 100%)`;

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setPos((p) => ({ ...p, active: false }))}
      className={`relative overflow-hidden ${className}`}
      data-hover="true"
    >
      <img
        src={baseImg}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <img
        src={hoverImg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover transition-[mask-image] duration-100"
        style={{
          WebkitMaskImage: mask,
          maskImage: mask,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      />
    </div>
  );
}

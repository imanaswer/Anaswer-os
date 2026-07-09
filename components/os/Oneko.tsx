"use client";

import { useEffect, useRef } from "react";

// A tiny pixel cat that chases the cursor (oneko-lite).
// Summoned by typing `cat` in the terminal.
export default function Oneko() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let x = window.innerWidth / 2;
    let y = window.innerHeight - 120;
    if (reduce) {
      // ponytail: reduced motion — the cat just sits by the taskbar
      el.style.transform = `translate(${window.innerWidth - 90}px, ${window.innerHeight - 96}px)`;
      el.dataset.idle = "1";
      return;
    }
    let tx = x;
    let ty = y;
    let raf = 0;
    let last = 0;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    window.addEventListener("pointermove", onMove);
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (t - last < 45) return;
      last = t;
      const dx = tx - x;
      const dy = ty - 26 - y;
      const d = Math.hypot(dx, dy);
      if (d > 32) {
        const step = Math.min(7, d);
        x += (dx / d) * step;
        y += (dy / d) * step;
        frame += 1;
        el.dataset.idle = "0";
      } else {
        el.dataset.idle = "1";
      }
      el.dataset.frame = String(frame % 2);
      el.style.transform = `translate(${x - 16}px, ${y - 14}px) scaleX(${dx < 0 ? 1 : -1})`;
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="oneko pointer-events-none fixed left-0 top-0 z-[9500] h-8 w-8"
      aria-hidden
      data-frame="0"
      data-idle="1"
    >
      <svg viewBox="0 0 16 16" shapeRendering="crispEdges" className="h-full w-full">
        {/* ears */}
        <path d="M3 1h2v2H3zM9 1h2v2H9z" fill="#1A1B26" />
        <path d="M4 2h1v1H4zM10 2h1v1h-1z" fill="#F7768E" />
        {/* head */}
        <rect x="3" y="3" width="8" height="4" fill="#1A1B26" />
        <path d="M4 4h2v2H4zM8 4h2v2H8z" fill="#FFD84D" />
        <path d="M5 5h1v1H5zM9 5h1v1H9z" fill="#1A1B26" />
        {/* body */}
        <rect x="2" y="7" width="10" height="5" fill="#1A1B26" />
        {/* tail — two frames */}
        <path className="tail-a" d="M12 6h2v2h-2zM13 4h2v2h-2z" fill="#1A1B26" />
        <path className="tail-b" d="M12 8h2v2h-2zM13 10h2v2h-2z" fill="#1A1B26" />
        {/* legs — two frames while walking, tucked when idle */}
        <path className="legs-a" d="M3 12h2v3H3zM9 12h2v3H9z" fill="#1A1B26" />
        <path className="legs-b" d="M5 12h2v3H5zM11 12h2v3h-2z" fill="#1A1B26" />
        <path className="legs-idle" d="M2 12h10v2H2z" fill="#1A1B26" />
        {/* chest patch */}
        <rect x="4" y="8" width="2" height="2" fill="#F6F1E7" />
      </svg>
      <style jsx>{`
        .oneko .tail-b, .oneko .legs-b, .oneko .legs-idle { display: none; }
        .oneko[data-frame="1"] .tail-a { display: none; }
        .oneko[data-frame="1"] .tail-b { display: block; }
        .oneko[data-idle="0"][data-frame="1"] .legs-a { display: none; }
        .oneko[data-idle="0"][data-frame="1"] .legs-b { display: block; }
        .oneko[data-idle="1"] .legs-a, .oneko[data-idle="1"] .legs-b { display: none; }
        .oneko[data-idle="1"] .legs-idle { display: block; }
      `}</style>
    </div>
  );
}

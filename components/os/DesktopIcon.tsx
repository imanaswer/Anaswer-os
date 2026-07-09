"use client";

import { useRef, type RefObject } from "react";
import { motion, useMotionValue } from "framer-motion";
import type { AppDef } from "./apps";
import { sounds } from "@/lib/sound";

const POS_KEY = "os-icon-pos";

function loadPositions(): Record<string, { x: number; y: number }> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(POS_KEY) || "{}");
  } catch {
    return {};
  }
}

export default function DesktopIcon({
  app,
  index,
  constraintsRef,
  onOpen,
}: {
  app: Pick<AppDef, "title" | "icon">;
  index: number;
  constraintsRef: RefObject<HTMLDivElement>;
  onOpen: (origin: { x: number; y: number }) => void;
}) {
  const Icon = app.icon;
  const ref = useRef<HTMLButtonElement>(null);
  const stored = useRef(loadPositions()[app.title]);
  const x = useMotionValue(stored.current?.x ?? 0);
  const y = useMotionValue(stored.current?.y ?? 0);

  const savePosition = () => {
    const all = loadPositions();
    all[app.title] = { x: x.get(), y: y.get() };
    localStorage.setItem(POS_KEY, JSON.stringify(all));
  };

  return (
    <motion.button
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index, type: "spring", stiffness: 300, damping: 24 }}
      style={{ x, y }}
      drag
      dragMomentum={false}
      dragConstraints={constraintsRef}
      onDragEnd={savePosition}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      onTap={() => {
        const r = ref.current?.getBoundingClientRect();
        onOpen({
          x: r ? r.left + r.width / 2 : window.innerWidth / 2,
          y: r ? r.top + r.height / 2 : window.innerHeight / 2,
        });
      }}
      onMouseEnter={() => sounds.hover()}
      className="group flex w-[84px] cursor-pointer touch-none flex-col items-center gap-1.5 rounded-lg p-2 outline-none transition-colors hover:bg-white/10 focus-visible:bg-white/10 focus-visible:ring-2 focus-visible:ring-amber/70"
      aria-label={`Open ${app.title}`}
    >
      <span className="flex h-[52px] w-[52px] items-center justify-center rounded-[5px] border-2 border-[#7E77C2] bg-[#221F3A] p-2.5 shadow-[3px_3px_0_rgba(5,15,16,0.45)] transition-colors group-hover:border-[#A79FE8]">
        <Icon />
      </span>
      <span className="max-w-full truncate rounded-[4px] border border-[#7E77C2]/80 bg-[#221F3A] px-1.5 py-[3px] font-pixel text-[8px] uppercase tracking-wider text-cream">
        {app.title}
      </span>
    </motion.button>
  );
}

"use client";

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { motion, useDragControls, useReducedMotion } from "framer-motion";
import type { AppDef } from "./apps";
import type { WinState } from "./OS";
import { IconClose, IconMinimize } from "./Icons";

export default function Window({
  def,
  state,
  focused,
  constraintsRef,
  onClose,
  onMinimize,
  onFocus,
  children,
}: {
  def: AppDef;
  state: WinState;
  focused: boolean;
  constraintsRef: RefObject<HTMLDivElement>;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  children: ReactNode;
}) {
  const dragControls = useDragControls();
  const reduce = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [size, setSize] = useState({ w: def.w, h: def.h });
  // where to fly when minimizing (delta to the taskbar button)
  const [fly, setFly] = useState({ x: 0, y: 120, scale: 0.05 });
  const resizing = useRef(false);
  const outerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 700;
      setIsMobile(mobile);
      if (!mobile) {
        setSize({
          w: Math.min(def.w, window.innerWidth - 24),
          h: Math.min(def.h, window.innerHeight - 90),
        });
      }
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [def.w, def.h]);

  // measure the taskbar button so minimize flies into it
  useEffect(() => {
    if (!state.minimized) return;
    const btn = document.querySelector(`[data-task="${def.id}"]`)?.getBoundingClientRect();
    const win = outerRef.current?.getBoundingClientRect();
    if (btn && win) {
      setFly({
        x: btn.left + btn.width / 2 - (win.left + win.width / 2),
        y: btn.top + btn.height / 2 - (win.top + win.height / 2),
        scale: 0.05,
      });
    }
  }, [state.minimized, def.id]);

  const startResize = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    resizing.current = true;
    const startX = e.clientX;
    const startY = e.clientY;
    const startW = size.w;
    const startH = size.h;
    const onMove = (ev: PointerEvent) => {
      if (!resizing.current) return;
      setSize({
        w: Math.max(320, startW + (ev.clientX - startX)),
        h: Math.max(240, startH + (ev.clientY - startY)),
      });
    };
    const onUp = () => {
      resizing.current = false;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  // open animation starts from the icon that launched it (when we know it)
  const originX = state.ox !== undefined ? state.ox - (state.x + size.w / 2) : 0;
  const originY = state.oy !== undefined ? state.oy - (state.y + size.h / 2) : 18;

  return (
    // outer layer: position + drag (drag offsets live here and are never animated over)
    <motion.div
      ref={outerRef}
      drag={!isMobile}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragConstraints={constraintsRef}
      onPointerDown={onFocus}
      style={
        isMobile
          ? { zIndex: state.z, left: 8, right: 8, top: 8, bottom: 64, position: "absolute" }
          : {
              zIndex: state.z,
              left: state.x,
              top: state.y,
              width: size.w,
              height: size.h,
              position: "absolute",
            }
      }
      className={state.minimized ? "pointer-events-none" : ""}
    >
      {/* inner layer: open / minimize / close animations */}
      <motion.div
        initial={
          reduce
            ? { opacity: 0 }
            : { opacity: 0, scale: 0.15, x: originX, y: originY }
        }
        animate={
          state.minimized
            ? { opacity: 0, scale: fly.scale, x: fly.x, y: fly.y }
            : { opacity: 1, scale: 1, x: 0, y: 0 }
        }
        exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 14 }}
        transition={
          state.minimized
            ? { duration: 0.32, ease: [0.6, 0, 0.85, 1] }
            : { type: "spring", stiffness: 340, damping: 30 }
        }
        className={`flex h-full w-full flex-col overflow-hidden rounded-xl border-2 bg-cream transition-shadow duration-200 ${
          focused ? "border-ink/70 shadow-window" : "border-ink/30 shadow-icon"
        }`}
        role="dialog"
        aria-label={def.title}
      >
        {/* title bar — drag to move; on mobile, swipe down to minimize */}
        <motion.div
          onPointerDown={(e) => {
            if (!isMobile) dragControls.start(e);
          }}
          drag={isMobile ? "y" : false}
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0, bottom: 0.5 }}
          dragSnapToOrigin
          onDragEnd={(_, info) => {
            if (isMobile && info.offset.y > 90) onMinimize();
          }}
          className={`titlebar-stripes flex h-9 shrink-0 cursor-grab select-none items-center gap-2 border-b-2 px-2.5 transition-colors duration-200 active:cursor-grabbing ${
            focused ? "border-ink/70 bg-creamDim" : "border-ink/30 bg-cream"
          }`}
        >
          <div className="flex h-5 w-5 items-center justify-center rounded border border-ink/30 bg-[#221F3A] p-0.5">
            <def.icon />
          </div>
          <span className={`font-pixel text-[10px] ${focused ? "text-ink" : "text-inkSoft"}`}>
            {def.title}
          </span>
          <div className="ml-auto flex items-center gap-1.5">
            <button
              onClick={onMinimize}
              onPointerDown={(e) => e.stopPropagation()}
              className="flex h-6 w-6 cursor-pointer items-center justify-center rounded border border-ink/40 bg-cream text-ink transition-colors hover:bg-amber hover:text-ink focus-visible:ring-2 focus-visible:ring-amber"
              aria-label="Minimize window"
            >
              <span className="h-3.5 w-3.5"><IconMinimize /></span>
            </button>
            <button
              onClick={onClose}
              onPointerDown={(e) => e.stopPropagation()}
              className="flex h-6 w-6 cursor-pointer items-center justify-center rounded border border-ink/40 bg-cream text-ink transition-colors hover:bg-blush hover:text-white focus-visible:ring-2 focus-visible:ring-blush"
              aria-label="Close window"
            >
              <span className="h-3.5 w-3.5"><IconClose /></span>
            </button>
          </div>
        </motion.div>

        {/* content */}
        <div className="min-h-0 flex-1">{children}</div>

        {/* resize handle */}
        {!isMobile && (
          <div
            onPointerDown={startResize}
            className="absolute bottom-0 right-0 h-5 w-5 cursor-nwse-resize"
            aria-hidden
          >
            <svg viewBox="0 0 20 20" className="h-full w-full text-ink/30">
              <path d="M17 9v2h-2v2h-2v2h-2v2h8V9z" fill="currentColor" opacity="0.4" />
            </svg>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

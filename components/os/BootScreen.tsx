"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { sounds } from "@/lib/sound";
import { profile } from "@/lib/content";

const LINES = [
  "ANASWER BIOS v1.0 — cozy edition",
  "checking memory ............... 640K OK (should be enough)",
  "loading personality.sys ....... OK",
  "loading projects.dll .......... OK",
  "loading coffee.drv ............ ██████ 100%",
  "mounting /skills .............. OK",
  "starting window manager ....... OK",
];

export default function BootScreen({ onDone }: { onDone: () => void }) {
  const [lineCount, setLineCount] = useState(0);
  const [ready, setReady] = useState(false);
  const played = useRef(false);

  useEffect(() => {
    const t = setInterval(() => {
      setLineCount((c) => {
        if (c >= LINES.length) {
          clearInterval(t);
          setReady(true);
          return c;
        }
        return c + 1;
      });
    }, 220);
    return () => clearInterval(t);
  }, []);

  const enter = () => {
    if (!played.current) {
      played.current = true;
      sounds.boot();
    }
    onDone();
  };

  useEffect(() => {
    if (!ready) return;
    const onKey = () => enter();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  return (
    <div
      className="crt power-on flex h-dvh w-full cursor-pointer flex-col items-center justify-center bg-termBg px-6"
      onClick={() => (ready ? enter() : setLineCount(LINES.length))}
    >
      <div className="w-full max-w-xl font-mono text-[13px] leading-7 text-termGreen/90">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 font-pixel text-xl text-cream md:text-2xl"
        >
          {profile.name}
          <span className="text-amber">.os</span>
        </motion.div>

        {LINES.slice(0, lineCount).map((l, i) => (
          <div key={i}>
            <span className="text-amber/70">&gt;</span> {l}
          </div>
        ))}

        {ready && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-cream/80"
          >
            <span className="rounded border border-cream/20 bg-cream/5 px-3 py-1.5">
              press any key <span className="text-cream/40">or click</span> to enter
            </span>
            <span className="caret ml-2 inline-block h-4 w-2 translate-y-0.5 bg-termGreen" />
          </motion.div>
        )}
        {!ready && (
          <div className="mt-8 h-2 w-full overflow-hidden rounded-sm bg-white/10">
            <div
              className="h-full bg-amber"
              style={{
                width: `${(lineCount / LINES.length) * 100}%`,
                transition: "width 200ms linear",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

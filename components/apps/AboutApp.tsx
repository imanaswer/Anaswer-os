"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { profile, skills } from "@/lib/content";
import type { AppId } from "../os/apps";
import { sounds } from "@/lib/sound";

export default function AboutApp({ openApp }: { openApp: (id: AppId) => void }) {
  return (
    <div className="win-scroll h-full overflow-y-auto p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="mb-5 flex items-center gap-4">
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 border-ink/60 bg-desk">
            <Image
              src="/portrait.png"
              alt={`Pixel-art portrait of ${profile.name}`}
              width={128}
              height={128}
              className="h-full w-full scale-150 object-cover object-[50%_22%]"
            />
          </div>
          <div>
            <h1 className="font-pixel text-lg leading-tight text-ink">{profile.name}</h1>
            <p className="font-mono text-[13px] text-inkSoft">{profile.role}</p>
          </div>
        </div>

        <p className="mb-4 rounded-lg bg-amber/20 px-3 py-2 font-body text-[15px] font-medium text-ink">
          {profile.tagline}
        </p>

        {profile.about.map((p, i) => (
          <p key={i} className="mb-3 font-body text-[14.5px] leading-relaxed text-inkSoft">
            {p}
          </p>
        ))}

        <h2 className="mb-3 mt-6 font-pixel text-[11px] uppercase tracking-wide text-ink">
          toolbox
        </h2>
        <div className="space-y-2.5">
          {Object.entries(skills).map(([group, items]) => (
            <div key={group} className="flex flex-wrap items-baseline gap-1.5">
              <span className="w-24 shrink-0 font-mono text-[11px] text-inkSoft">{group}</span>
              {items.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-ink/20 bg-creamDim px-2 py-0.5 font-mono text-[11px] text-ink"
                >
                  {s}
                </span>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap gap-2">
          <button
            onClick={() => { sounds.click(); openApp("projects"); }}
            className="cursor-pointer rounded-lg border-2 border-ink bg-amber px-4 py-2 font-pixel text-[10px] text-ink shadow-[3px_3px_0_#2A2721] transition-transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-none focus-visible:ring-2 focus-visible:ring-ink"
          >
            see my projects →
          </button>
          <button
            onClick={() => { sounds.click(); openApp("terminal"); }}
            className="cursor-pointer rounded-lg border-2 border-ink/40 bg-cream px-4 py-2 font-pixel text-[10px] text-ink transition-colors hover:bg-creamDim focus-visible:ring-2 focus-visible:ring-amber"
          >
            open terminal
          </button>
        </div>
      </motion.div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Project } from "@/lib/content";
import { sounds } from "@/lib/sound";

const statusStyle: Record<Project["status"], string> = {
  shipped: "bg-sage/50 text-ink border-sage",
  "in-progress": "bg-amber/30 text-ink border-amber",
  archived: "bg-creamDim text-inkSoft border-ink/20",
};

export default function ProjectsApp() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <div className="flex h-full">
      {/* list */}
      <div className={`win-scroll overflow-y-auto border-r border-ink/10 p-3 ${selected ? "hidden w-2/5 md:block" : "w-full"}`}>
        {projects.map((p, i) => (
          <motion.button
            key={p.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            onClick={() => { sounds.click(); setSelected(p); }}
            className={`mb-2 block w-full cursor-pointer rounded-lg border-2 p-3 text-left transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-amber ${
              selected?.id === p.id ? "border-amber bg-amber/10" : "border-ink/15 bg-cream hover:border-ink/40"
            }`}
          >
            <div className="mb-1 flex items-center justify-between gap-2">
              <span className="font-pixel text-[11px] text-ink">
                <span className="mr-1.5">{p.icon}</span>
                {p.name}
              </span>
              <span className="font-mono text-[10px] text-inkSoft">{p.year}</span>
            </div>
            <p className="font-body text-[12.5px] leading-snug text-inkSoft">{p.blurb}</p>
          </motion.button>
        ))}
      </div>

      {/* detail */}
      <AnimatePresence mode="wait">
        {selected ? (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="win-scroll flex-1 overflow-y-auto p-5"
          >
            <button
              onClick={() => setSelected(null)}
              className="mb-3 cursor-pointer font-mono text-[11px] text-inkSoft hover:text-ink md:hidden"
            >
              ← back
            </button>
            <div
              className="mb-4 flex items-center justify-center rounded-lg border-2 border-ink/15 py-7"
              style={{
                backgroundColor: `${selected.accent}2E`,
                backgroundImage: `repeating-linear-gradient(0deg, ${selected.accent}26 0 2px, transparent 2px 10px), repeating-linear-gradient(90deg, ${selected.accent}26 0 2px, transparent 2px 10px)`,
              }}
            >
              <span className="text-5xl drop-shadow-[3px_3px_0_rgba(42,39,33,0.25)]">
                {selected.icon}
              </span>
            </div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <h2 className="font-pixel text-sm text-ink">{selected.name}</h2>
              <span className={`rounded-full border px-2 py-0.5 font-mono text-[10px] ${statusStyle[selected.status]}`}>
                {selected.status}
              </span>
            </div>
            <p className="mb-4 font-body text-[14px] leading-relaxed text-inkSoft">
              {selected.description}
            </p>
            {selected.metrics && (
              <div className="mb-4 grid grid-cols-3 gap-2">
                {selected.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-lg border-2 border-ink/15 bg-cream p-2 text-center"
                    style={{ borderBottomColor: selected.accent, borderBottomWidth: 3 }}
                  >
                    <div className="font-pixel text-[11px] leading-tight text-ink">{m.value}</div>
                    <div className="mt-1 font-mono text-[9px] uppercase leading-tight text-inkSoft">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {selected.architecture && (
              <div className="mb-4">
                <p className="mb-1.5 font-pixel text-[9px] text-inkSoft">architecture.txt</p>
                <pre className="win-scroll overflow-x-auto rounded-lg border-2 border-ink/15 bg-creamDim p-3 font-mono text-[10.5px] leading-[1.45] text-ink">
                  {selected.architecture}
                </pre>
              </div>
            )}
            {selected.highlights && (
              <ul className="mb-4 space-y-1.5">
                {selected.highlights.map((h) => (
                  <li key={h} className="flex gap-2 font-body text-[13px] leading-snug text-inkSoft">
                    <span className="text-amber">▸</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mb-5 flex flex-wrap gap-1.5">
              {selected.stack.map((s) => (
                <span key={s} className="rounded-md border border-ink/20 bg-creamDim px-2 py-0.5 font-mono text-[11px] text-ink">
                  {s}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              {selected.link && (
                <a
                  href={selected.link}
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-pointer rounded-lg border-2 border-ink bg-amber px-3.5 py-1.5 font-pixel text-[9px] text-ink shadow-[3px_3px_0_#2A2721] transition-transform hover:-translate-y-0.5"
                >
                  visit ↗
                </a>
              )}
              {selected.repo && (
                <a
                  href={selected.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-pointer rounded-lg border-2 border-ink/40 bg-cream px-3.5 py-1.5 font-pixel text-[9px] text-ink transition-colors hover:bg-creamDim"
                >
                  source code
                </a>
              )}
            </div>
          </motion.div>
        ) : (
          <div className="hidden flex-1 items-center justify-center p-6 md:flex">
            <p className="text-center font-mono text-[12px] text-inkSoft/70">
              ← select a project<br />to open its file
            </p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

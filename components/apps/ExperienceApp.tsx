"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/content";

export default function ExperienceApp() {
  return (
    <div className="win-scroll h-full overflow-y-auto p-6">
      <div className="relative border-l-2 border-ink/15 pl-6">
        {experience.map((job, i) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative mb-8 last:mb-2"
          >
            {/* timeline dot */}
            <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-ink bg-amber" />
            <div className="mb-1 flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
              <h2 className="font-pixel text-[12px] text-ink">{job.company}</h2>
              <span className="font-mono text-[11px] text-inkSoft">{job.period}</span>
            </div>
            <p className="mb-2 font-body text-[13.5px] font-semibold text-ink">{job.role}</p>
            <ul className="mb-2 space-y-1.5">
              {job.points.map((pt, j) => (
                <li key={j} className="flex gap-2 font-body text-[13.5px] leading-relaxed text-inkSoft">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-amber" />
                  {pt}
                </li>
              ))}
            </ul>
            {job.stack && (
              <div className="flex flex-wrap gap-1.5">
                {job.stack.map((s) => (
                  <span key={s} className="rounded-md border border-ink/20 bg-creamDim px-2 py-0.5 font-mono text-[10.5px] text-ink">
                    {s}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

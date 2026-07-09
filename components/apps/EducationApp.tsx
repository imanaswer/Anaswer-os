"use client";

import { motion } from "framer-motion";
import { education } from "@/lib/content";
import { IconGradCap } from "../os/Icons";

export default function EducationApp() {
  return (
    <div className="win-scroll h-full overflow-y-auto p-6">
      {education.map((edu, i) => (
        <motion.div
          key={edu.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="mb-4 rounded-xl border-2 border-ink/15 bg-cream p-4 transition-shadow hover:shadow-md"
        >
          <div className="flex items-start gap-3">
            <span className="mt-0.5 h-8 w-8 shrink-0"><IconGradCap /></span>
            <div>
              <h2 className="font-pixel text-[12px] text-ink">{edu.school}</h2>
              <p className="font-body text-[13.5px] font-semibold text-ink">{edu.degree}</p>
              <p className="mb-1.5 font-mono text-[11px] text-inkSoft">{edu.period}</p>
              <p className="font-body text-[13px] leading-relaxed text-inkSoft">{edu.detail}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

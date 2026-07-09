"use client";

import { motion } from "framer-motion";
import { funFacts, profile } from "@/lib/content";
import { IconStar } from "../os/Icons";

export default function SecretApp() {
  return (
    <div className="win-scroll h-full overflow-y-auto p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="text-center"
      >
        <motion.span
          className="mx-auto mb-3 block h-10 w-10"
          animate={{ rotate: [0, -8, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
        >
          <IconStar />
        </motion.span>
        <h1 className="mb-1 font-pixel text-[13px] text-ink">you found the secret file</h1>
        <p className="mb-5 font-mono text-[11px] text-inkSoft">
          most people never do. you&apos;re clearly detail-oriented — we&apos;d probably get along.
        </p>
      </motion.div>

      <div className="space-y-2">
        {funFacts.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="rounded-lg border border-ink/15 bg-creamDim px-3 py-2 font-body text-[13px] text-ink"
          >
            <span className="mr-2 font-pixel text-[9px] text-amber">{String(i + 1).padStart(2, "0")}</span>
            {f}
          </motion.div>
        ))}
      </div>

      <p className="mt-5 text-center font-mono text-[11px] text-inkSoft">
        since you dug this deep: <span className="text-ink">{profile.email}</span> — mention the secret file for +10 charisma.
      </p>
    </div>
  );
}

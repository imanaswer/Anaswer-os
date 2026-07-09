"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/lib/content";
import { sounds } from "@/lib/sound";

export default function ContactApp() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      sounds.open();
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      sounds.error();
    }
  };

  const links = [
    { label: "github", href: profile.socials.github },
    { label: "linkedin", href: profile.socials.linkedin },
    { label: "resume", href: profile.resume },
  ];

  return (
    <div className="win-scroll flex h-full flex-col items-center justify-center overflow-y-auto p-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm"
      >
        <p className="mb-1 font-pixel text-[13px] text-ink">say hello</p>
        <p className="mb-6 font-body text-[13.5px] text-inkSoft">
          Inbox is always open — whether it&apos;s a role, a project, or just a good tech rabbit hole.
        </p>

        <button
          onClick={copyEmail}
          className="mb-3 w-full cursor-pointer rounded-xl border-2 border-ink bg-amber px-4 py-3 font-mono text-[13px] text-ink shadow-[4px_4px_0_#2A2721] transition-transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-none focus-visible:ring-2 focus-visible:ring-ink"
        >
          {copied ? "copied to clipboard ✓" : profile.email}
        </button>
        <p className="mb-6 font-mono text-[10.5px] text-inkSoft/70">(click to copy)</p>

        <div className="flex justify-center gap-2">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              onClick={() => sounds.click()}
              className="cursor-pointer rounded-lg border-2 border-ink/30 bg-cream px-3.5 py-2 font-pixel text-[9px] text-ink transition-all hover:-translate-y-0.5 hover:border-ink hover:bg-creamDim focus-visible:ring-2 focus-visible:ring-amber"
            >
              {l.label}
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

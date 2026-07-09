"use client";

import { media } from "@/lib/content";

export default function LofiApp() {
  return (
    <div className="flex h-full flex-col bg-black">
      <iframe
        src={`https://www.youtube.com/embed/${media.lofiVideo}`}
        title="lofi radio"
        className="min-h-0 w-full flex-1"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
      <p className="shrink-0 px-3 py-2 font-mono text-[11px] text-termGreen/80">
        ♪ beats to debug distributed systems to
      </p>
    </div>
  );
}

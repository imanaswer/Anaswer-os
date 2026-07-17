"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { WinState } from "./OS";
import type { AppId } from "./apps";
import { APPS, appById } from "./apps";
import { getMuted, setMuted, sounds } from "@/lib/sound";
import { IconSpeakerOn, IconSpeakerOff, IconMonitor, IconHeart, IconDoc } from "./Icons";
import { profile } from "@/lib/content";

export default function Taskbar({
  windows,
  onSelect,
  crt,
  onToggleCrt,
  openApp,
  achievements,
  achievementsTotal,
  onRestart,
  onShutdown,
}: {
  windows: WinState[];
  onSelect: (id: AppId) => void;
  crt: boolean;
  onToggleCrt: () => void;
  openApp: (id: AppId) => void;
  achievements: number;
  achievementsTotal: number;
  onRestart: () => void;
  onShutdown: () => void;
}) {
  const [time, setTime] = useState("");
  const [muted, setMutedState] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMutedState(getMuted());
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    tick();
    const t = setInterval(tick, 10_000);
    return () => clearInterval(t);
  }, []);

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    setMutedState(next);
    if (!next) sounds.click();
  };

  const menuApps = APPS.filter((a) => !a.hidden);
  const menuItem =
    "flex w-full cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-1.5 text-left font-pixel text-[9px] uppercase text-ink transition-colors hover:bg-amber/30 focus-visible:bg-amber/30 focus-visible:outline-none";

  return (
    <>
      {/* start menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <div
              className="fixed inset-0 z-[8900]"
              onClick={() => setMenuOpen(false)}
              aria-hidden
            />
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              className="fixed bottom-[calc(3.5rem+env(safe-area-inset-bottom))] left-2 z-[8950] w-60 overflow-hidden rounded-xl border-2 border-ink/70 bg-cream shadow-window"
              role="menu"
              aria-label="Start menu"
            >
              <div className="titlebar-stripes border-b-2 border-ink/60 bg-creamDim px-3 py-2">
                <p className="font-pixel text-[10px] text-ink">
                  {profile.handle}
                  <span className="text-amberDark">.os</span>
                </p>
                <p className="font-mono text-[12px] text-inkSoft">{profile.role}</p>
              </div>
              <div className="p-1.5">
                {menuApps.map((app) => (
                  <button
                    key={app.id}
                    role="menuitem"
                    className={menuItem}
                    onClick={() => {
                      sounds.click();
                      setMenuOpen(false);
                      openApp(app.id);
                    }}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[4px] bg-[#221F3A] p-1">
                      <app.icon />
                    </span>
                    {app.title}
                  </button>
                ))}
                <button
                  role="menuitem"
                  className={menuItem}
                  onClick={() => {
                    sounds.click();
                    setMenuOpen(false);
                    window.open(profile.resume, "_blank", "noopener");
                  }}
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[4px] bg-[#221F3A] p-1">
                    <IconDoc />
                  </span>
                  resume.pdf
                </button>
              </div>
              <div className="border-t border-ink/15 p-1.5">
                {Object.entries(profile.socials).map(([name, url]) => (
                  <a
                    key={name}
                    role="menuitem"
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className={menuItem}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="w-6 text-center font-mono text-[13px] text-inkSoft">↗</span>
                    {name}
                  </a>
                ))}
              </div>
              <div className="border-t border-ink/15 p-1.5">
                <button
                  role="menuitem"
                  className={menuItem}
                  onClick={() => {
                    setMenuOpen(false);
                    onRestart();
                  }}
                >
                  <span className="w-6 text-center font-mono text-[13px] text-inkSoft">⟳</span>
                  restart
                </button>
                <button
                  role="menuitem"
                  className={`${menuItem} hover:bg-blush/30`}
                  onClick={() => {
                    setMenuOpen(false);
                    onShutdown();
                  }}
                >
                  <span className="w-6 text-center font-mono text-[13px] text-blush">⏻</span>
                  shut down
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 z-[9000] flex h-[calc(3rem+env(safe-area-inset-bottom))] items-center gap-2 border-t-2 border-ink/70 bg-cream px-2 pb-[env(safe-area-inset-bottom)] shadow-taskbar">
        {/* start button */}
        <button
          onClick={() => {
            sounds.click();
            setMenuOpen((o) => !o);
          }}
          className={`flex h-8 cursor-pointer select-none items-center gap-1.5 rounded-md border px-2.5 transition-colors focus-visible:ring-2 focus-visible:ring-amber ${
            menuOpen ? "border-ink/50 bg-amber/40" : "border-ink/30 bg-creamDim hover:bg-amber/20"
          }`}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          aria-label="Open start menu"
        >
          <span className="h-4 w-4"><IconHeart /></span>
          <span className="hidden font-pixel text-[10px] text-ink sm:inline">anaswer.os</span>
        </button>

        <div className="h-6 w-px bg-ink/15" />

        {/* open windows */}
        <div className="flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto">
          {windows.map((w) => {
            const def = appById(w.appId);
            return (
              <button
                key={w.appId}
                data-task={w.appId}
                onClick={() => {
                  sounds.click();
                  onSelect(w.appId);
                }}
                className={`flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-md border px-2.5 font-pixel text-[9px] transition-colors focus-visible:ring-2 focus-visible:ring-amber ${
                  w.minimized
                    ? "border-ink/20 bg-transparent text-inkSoft hover:bg-creamDim"
                    : "border-ink/40 bg-amber/30 text-ink hover:bg-amber/50"
                }`}
                aria-label={`${w.minimized ? "Restore" : "Focus"} ${def.title}`}
              >
                <span className="flex h-[18px] w-[18px] items-center justify-center rounded-[3px] bg-[#221F3A] p-[2px]"><def.icon /></span>
                <span className="hidden md:inline">{def.title}</span>
              </button>
            );
          })}
        </div>

        {/* system tray */}
        <div className="flex items-center gap-1">
          <div
            className="hidden select-none items-center gap-1 rounded-md border border-ink/20 px-2 py-1.5 font-pixel text-[9px] text-ink sm:flex"
            title={`easter eggs found: ${achievements}/${achievementsTotal} — keep exploring`}
          >
            🏆 {achievements}/{achievementsTotal}
          </div>
          <button
            onClick={() => { sounds.click(); onToggleCrt(); }}
            className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border transition-colors focus-visible:ring-2 focus-visible:ring-amber ${
              crt ? "border-ink/40 bg-creamDim text-ink" : "border-ink/20 text-inkSoft hover:bg-creamDim"
            }`}
            title={crt ? "CRT effect: on" : "CRT effect: off"}
            aria-label="Toggle CRT effect"
          >
            <span className="h-4 w-4"><IconMonitor /></span>
          </button>
          <button
            onClick={toggleMute}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-ink/20 text-ink transition-colors hover:bg-creamDim focus-visible:ring-2 focus-visible:ring-amber"
            title={muted ? "Sound: off" : "Sound: on"}
            aria-label="Toggle sound"
          >
            <span className="h-4 w-4">{muted ? <IconSpeakerOff /> : <IconSpeakerOn />}</span>
          </button>
          <div className="ml-1 select-none rounded-md border border-ink/20 px-2.5 py-1.5 font-mono text-[13px] text-ink">
            {time}
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { APPS, AppId, appById } from "./apps";
import BootScreen from "./BootScreen";
import DesktopIcon from "./DesktopIcon";
import Taskbar from "./Taskbar";
import Window from "./Window";
import Oneko from "./Oneko";
import AboutApp from "../apps/AboutApp";
import ProjectsApp from "../apps/ProjectsApp";
import ExperienceApp from "../apps/ExperienceApp";
import EducationApp from "../apps/EducationApp";
import TerminalApp from "../apps/TerminalApp";
import ContactApp from "../apps/ContactApp";
import SpotifyApp from "../apps/SpotifyApp";
import LofiApp from "../apps/LofiApp";
import SnakeApp from "../apps/SnakeApp";
import SecretApp from "../apps/SecretApp";
import { IconDoc } from "./Icons";
import { initMute, sounds } from "@/lib/sound";
import { profile } from "@/lib/content";
import { ACHIEVEMENTS, ACHIEVEMENT_TOTAL, unlock, unlockedIds } from "@/lib/achievements";

export type WinState = {
  appId: AppId;
  x: number;
  y: number;
  minimized: boolean;
  z: number;
  /** launch origin (icon center) for the open animation */
  ox?: number;
  oy?: number;
};

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

const STATE_KEY = "os-state-v1";
type SavedState = { windows: WinState[]; crt: boolean; z: number };

function loadSaved(): SavedState | null {
  if (typeof window === "undefined") return null;
  try {
    const s = JSON.parse(localStorage.getItem(STATE_KEY) || "null") as SavedState | null;
    if (!s) return null;
    // drop windows for apps that no longer exist + the secret (needs re-unlocking)
    s.windows = s.windows.filter(
      (w) => w.appId !== "secret" && APPS.some((a) => a.id === w.appId)
    );
    return s;
  } catch {
    return null;
  }
}

export default function OS() {
  const saved = useRef<SavedState | null>(loadSaved());
  const [booting, setBooting] = useState(true);
  const [windows, setWindows] = useState<WinState[]>(saved.current?.windows ?? []);
  const [crt, setCrt] = useState(saved.current?.crt ?? true);
  const [crtFlick, setCrtFlick] = useState(false);
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [poweringOff, setPoweringOff] = useState(false);
  const [catActive, setCatActive] = useState(false);
  const [toasts, setToasts] = useState<{ id: string; label: string }[]>([]);
  const [achCount, setAchCount] = useState(0);
  const [switcher, setSwitcher] = useState<AppId | null>(null);
  // ponytail: portrait.png is ~1MB — don't render (= download) it on phones where it's hidden anyway
  const [wideScreen, setWideScreen] = useState(false);
  const zCounter = useRef(saved.current?.z ?? 10);
  const konamiIdx = useRef(0);
  const desktopRef = useRef<HTMLDivElement>(null);
  const switcherTimer = useRef<ReturnType<typeof setTimeout>>();

  // gentle portrait parallax that follows the pointer
  const reduceMotion = useReducedMotion();
  const parallaxX = useMotionValue(0);
  const parallaxY = useMotionValue(0);
  const heroX = useSpring(parallaxX, { stiffness: 40, damping: 16 });
  const heroY = useSpring(parallaxY, { stiffness: 40, damping: 16 });

  const openApp = useCallback((appId: AppId, origin?: { x: number; y: number }) => {
    if (appId === "snake") unlock("snake");
    if (appId === "spotify" || appId === "lofi") unlock("music");
    setWindows((wins) => {
      const existing = wins.find((w) => w.appId === appId);
      zCounter.current += 1;
      if (existing) {
        return wins.map((w) =>
          w.appId === appId ? { ...w, minimized: false, z: zCounter.current } : w
        );
      }
      sounds.open();
      const def = appById(appId);
      const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
      const vh = typeof window !== "undefined" ? window.innerHeight : 800;
      const offset = (wins.length % 5) * 32;
      const x = Math.max(8, Math.min(vw / 2 - def.w / 2 + offset, vw - def.w - 8));
      const y = Math.max(8, Math.min(80 + offset, vh - def.h - 60));
      return [...wins, { appId, x, y, minimized: false, z: zCounter.current, ox: origin?.x, oy: origin?.y }];
    });
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const update = () => setWideScreen(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // boot skip + deep links (?open=projects)
  useEffect(() => {
    initMute();
    setAchCount(unlockedIds().length);
    const params = new URLSearchParams(window.location.search);
    const open = params.get("open") as AppId | null;
    // ponytail: ?skipboot jumps straight to the desktop (repeat visits + screenshot testing)
    if (sessionStorage.getItem("booted") || params.has("skipboot") || open) {
      setBooting(false);
    }
    if (open && APPS.some((a) => a.id === open && !a.hidden)) {
      setTimeout(() => openApp(open), 350);
    }
  }, [openApp]);

  // persist desktop state
  useEffect(() => {
    if (booting) return;
    localStorage.setItem(
      STATE_KEY,
      JSON.stringify({ windows, crt, z: zCounter.current } satisfies SavedState)
    );
  }, [windows, crt, booting]);

  // achievement toasts
  useEffect(() => {
    const onAch = (e: Event) => {
      const id = (e as CustomEvent).detail as string;
      sounds.secret();
      setAchCount(unlockedIds().length);
      setToasts((t) => [...t, { id, label: ACHIEVEMENTS[id] }]);
      setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3400);
    };
    const onCat = () => setCatActive(true);
    window.addEventListener("achievement", onAch);
    window.addEventListener("summon-cat", onCat);
    return () => {
      window.removeEventListener("achievement", onAch);
      window.removeEventListener("summon-cat", onCat);
    };
  }, []);

  const closeApp = useCallback((appId: AppId) => {
    sounds.close();
    setWindows((wins) => wins.filter((w) => w.appId !== appId));
  }, []);

  const minimizeApp = useCallback((appId: AppId) => {
    sounds.minimize();
    setWindows((wins) =>
      wins.map((w) => (w.appId === appId ? { ...w, minimized: true } : w))
    );
  }, []);

  const focusApp = useCallback((appId: AppId) => {
    zCounter.current += 1;
    setWindows((wins) =>
      wins.map((w) =>
        w.appId === appId ? { ...w, z: zCounter.current, minimized: false } : w
      )
    );
  }, []);

  const unlockSecret = useCallback(() => {
    setSecretUnlocked(true);
    unlock("konami");
    sounds.secret();
    openApp("secret");
  }, [openApp]);

  // cycle windows (alt/option+tab or backtick)
  const cycleWindows = useCallback(() => {
    setWindows((wins) => {
      if (wins.length < 2) return wins;
      const next = [...wins].sort((a, b) => a.z - b.z)[0];
      zCounter.current += 1;
      setSwitcher(next.appId);
      clearTimeout(switcherTimer.current);
      switcherTimer.current = setTimeout(() => setSwitcher(null), 900);
      sounds.click();
      return wins.map((w) =>
        w.appId === next.appId ? { ...w, z: zCounter.current, minimized: false } : w
      );
    });
  }, []);

  // keyboard: konami, esc-to-close, window cycling
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA";

      if (!typing && e.key === "Escape") {
        setWindows((wins) => {
          const top = wins.filter((w) => !w.minimized).sort((a, b) => b.z - a.z)[0];
          if (!top) return wins;
          sounds.close();
          return wins.filter((w) => w.appId !== top.appId);
        });
        return;
      }
      if ((e.altKey && e.key === "Tab") || (!typing && e.key === "`")) {
        e.preventDefault();
        cycleWindows();
        return;
      }

      const expected = KONAMI[konamiIdx.current];
      if (e.key === expected || e.key.toLowerCase() === expected) {
        konamiIdx.current += 1;
        if (konamiIdx.current === KONAMI.length) {
          konamiIdx.current = 0;
          unlockSecret();
        }
      } else {
        konamiIdx.current = e.key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [unlockSecret, cycleWindows]);

  const powerOff = useCallback((clearState: boolean) => {
    sounds.minimize();
    setPoweringOff(true);
    setTimeout(() => {
      sessionStorage.removeItem("booted");
      if (clearState) {
        localStorage.removeItem(STATE_KEY);
        setWindows([]);
      }
      setPoweringOff(false);
      setBooting(true);
    }, 650);
  }, []);

  const renderApp = (appId: AppId) => {
    switch (appId) {
      case "about": return <AboutApp openApp={openApp} />;
      case "projects": return <ProjectsApp />;
      case "experience": return <ExperienceApp />;
      case "education": return <EducationApp />;
      case "terminal":
        return (
          <TerminalApp openApp={openApp} closeApp={closeApp} unlockSecret={unlockSecret} setCrt={setCrt} />
        );
      case "contact": return <ContactApp />;
      case "spotify": return <SpotifyApp />;
      case "lofi": return <LofiApp />;
      case "snake": return <SnakeApp />;
      case "secret": return <SecretApp />;
    }
  };

  if (booting) {
    return (
      <BootScreen
        onDone={() => {
          sessionStorage.setItem("booted", "1");
          setBooting(false);
          if (windows.length === 0) setTimeout(() => openApp("about"), 600);
        }}
      />
    );
  }

  const visibleApps = APPS.filter((a) => !a.hidden || secretUnlocked);
  const topZ = windows.reduce((m, w) => (w.minimized ? m : Math.max(m, w.z)), 0);
  const musicOpen = windows.some(
    (w) => (w.appId === "spotify" || w.appId === "lofi") && !w.minimized
  );

  return (
    <div
      className={`${crt ? "crt" : ""} ${crtFlick ? "crt-flick" : ""} ${poweringOff ? "tv-off" : ""} ${secretUnlocked ? "wallpaper-secret" : "wallpaper"} relative h-dvh w-full overflow-hidden transition-colors duration-700`}
      onPointerMove={(e) => {
        if (reduceMotion) return;
        parallaxX.set((e.clientX / window.innerWidth - 0.5) * -10);
        parallaxY.set((e.clientY / window.innerHeight - 0.5) * -6);
      }}
    >
      {/* portrait hero — blends into the wallpaper (same bg color as the art) */}
      {!secretUnlocked && wideScreen && (
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="pointer-events-none absolute bottom-12 right-[10vw] z-[1] hidden select-none sm:block"
          aria-hidden
        >
          <motion.div style={{ x: heroX, y: heroY }} className="portrait-blend relative">
            <Image
              src="/portrait.png"
              alt=""
              width={800}
              height={1086}
              priority
              className="h-[min(80vh,760px)] w-auto"
            />
            {/* blink — eyelid overlays matched to the art's skin tones */}
            <span
              className="eyelid absolute rounded-[45%]"
              style={{ left: "34.9%", top: "30.1%", width: "4.4%", height: "2.4%", background: "#a5643c" }}
            />
            <span
              className="eyelid absolute rounded-[45%]"
              style={{ left: "46.1%", top: "28.4%", width: "5.1%", height: "2.4%", background: "#8f5433" }}
            />
            {/* floating notes while music plays */}
            {musicOpen && !reduceMotion && (
              <div className="absolute left-[8%] top-[4%]">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="music-note absolute font-pixel text-amber"
                    style={{ animationDelay: `${i * 0.9}s`, left: i * 18, fontSize: 13 + (i % 2) * 5 }}
                  >
                    ♪
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* soft vignette light from top for coziness — above the portrait so both darken evenly */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-white/[0.06] via-transparent to-black/[0.12]" />

      {/* intro blurb — pixel type, center-left, with clickable highlights */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
        className="pointer-events-none absolute left-[max(230px,25vw)] top-[45%] z-[2] hidden max-w-[470px] -translate-y-1/2 select-none md:block"
      >
        <p className="font-pixel text-[13px] uppercase leading-[2.2] tracking-[0.05em] text-cream [text-shadow:2px_2px_0_rgba(0,20,22,0.4)]">
          Hey, I&apos;m <span className="text-amber">{profile.name}</span> — a{" "}
          <span className="text-amber">backend engineer</span>{" "}
          who takes products from first commit to production. These days
          I&apos;m the founding engineer at{" "}
          <span className="text-amber">GameGround</span>; before that I
          interned on Google search. Have a look at my{" "}
          <button
            onClick={() => { sounds.click(); openApp("projects"); }}
            className="pointer-events-auto cursor-pointer uppercase text-amber underline decoration-amber/50 decoration-2 underline-offset-4 transition-colors hover:text-cream focus-visible:ring-2 focus-visible:ring-amber"
          >
            projects
          </button>{" "}
          and my{" "}
          <button
            onClick={() => { sounds.click(); openApp("experience"); }}
            className="pointer-events-auto cursor-pointer uppercase text-amber underline decoration-amber/50 decoration-2 underline-offset-4 transition-colors hover:text-cream focus-visible:ring-2 focus-visible:ring-amber"
          >
            experience
          </button>{" "}
          — that&apos;s where the good stuff is!
        </p>
      </motion.div>

      {/* compact mobile intro */}
      <div className="pointer-events-none absolute bottom-[calc(4rem+env(safe-area-inset-bottom))] left-4 z-[2] max-w-[280px] select-none md:hidden">
        <p className="font-pixel text-[10px] uppercase leading-[2] text-cream [text-shadow:2px_2px_0_rgba(0,20,22,0.4)]">
          Hey, I&apos;m <span className="text-amber">{profile.name}</span> —{" "}
          {profile.role}. Tap an icon to look around!
        </p>
      </div>

      {/* hint line */}
      <div className="pointer-events-none absolute right-5 top-4 hidden select-none text-right font-pixel text-[10px] leading-relaxed text-white/40 md:block">
        {profile.name}
        <span className="text-white/25">.os</span> v1.0
        <br />
        <span className="text-white/25">psst — try ↑↑↓↓←→←→BA</span>
      </div>

      {/* desktop icon grid */}
      <div ref={desktopRef} className="absolute inset-0 bottom-14 p-4 md:p-6">
        <div className="grid w-fit grid-cols-3 gap-x-2 gap-y-3 md:grid-cols-2 md:gap-x-3 md:gap-y-4">
          {visibleApps.map((app, i) => (
            <DesktopIcon
              key={app.id}
              app={app}
              index={i}
              constraintsRef={desktopRef}
              onOpen={(origin) => openApp(app.id, origin)}
            />
          ))}
          <DesktopIcon
            app={{ title: "resume.pdf", icon: IconDoc }}
            index={visibleApps.length}
            constraintsRef={desktopRef}
            onOpen={() => {
              unlock("resume");
              window.open(profile.resume, "_blank", "noopener");
            }}
          />
        </div>
      </div>

      {/* windows */}
      <AnimatePresence>
        {windows.map((w) => {
          const def = appById(w.appId);
          return (
            <Window
              key={w.appId}
              def={def}
              state={w}
              focused={w.z === topZ}
              constraintsRef={desktopRef}
              onClose={() => closeApp(w.appId)}
              onMinimize={() => minimizeApp(w.appId)}
              onFocus={() => focusApp(w.appId)}
            >
              {renderApp(w.appId)}
            </Window>
          );
        })}
      </AnimatePresence>

      {/* alt-tab switcher overlay */}
      <AnimatePresence>
        {switcher && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute left-1/2 top-1/3 z-[9200] -translate-x-1/2 rounded-lg border-2 border-ink/70 bg-cream px-4 py-3 shadow-window"
          >
            <div className="flex items-center gap-3">
              {windows.map((w) => {
                const def = appById(w.appId);
                return (
                  <div
                    key={w.appId}
                    className={`flex flex-col items-center gap-1 rounded-md p-2 ${
                      w.appId === switcher ? "bg-amber/40 ring-2 ring-ink/60" : "opacity-60"
                    }`}
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-[4px] bg-[#221F3A] p-1"><def.icon /></span>
                    <span className="font-pixel text-[8px] text-ink">{def.title}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* achievement toasts */}
      <div className="pointer-events-none absolute bottom-[calc(4rem+env(safe-area-inset-bottom))] right-4 z-[9300] flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 60 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              className="rounded-lg border-2 border-ink/70 bg-cream px-3.5 py-2.5 shadow-window"
            >
              <p className="font-pixel text-[9px] uppercase text-ink">
                🏆 achievement unlocked
              </p>
              <p className="mt-1 font-mono text-[13px] text-inkSoft">{t.label}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {catActive && <Oneko />}

      <Taskbar
        windows={windows}
        onSelect={(id) => focusApp(id)}
        crt={crt}
        onToggleCrt={() => {
          setCrt((c) => !c);
          setCrtFlick(true);
          setTimeout(() => setCrtFlick(false), 320);
        }}
        openApp={openApp}
        achievements={achCount}
        achievementsTotal={ACHIEVEMENT_TOTAL}
        onRestart={() => powerOff(false)}
        onShutdown={() => powerOff(true)}
      />
    </div>
  );
}

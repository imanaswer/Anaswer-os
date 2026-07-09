"use client";

import { useEffect, useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { AppId } from "../os/apps";
import { profile, projects, experience, education, skills, funFacts } from "@/lib/content";
import { sounds } from "@/lib/sound";
import { unlock } from "@/lib/achievements";

const HIST_KEY = "os-term-history";
const COMMANDS = [
  "help", "whoami", "projects", "experience", "education", "skills", "contact",
  "open", "neofetch", "fact", "clear", "sudo", "crt", "ls", "cat", "snake",
  "konami", "exit", "coffee", "history",
];
const OPENABLE = ["about", "projects", "experience", "education", "contact", "spotify", "lofi", "snake", "terminal", "resume"];

type Line = { text: string; kind?: "in" | "out" | "accent" | "err" };

const HELP = `available commands:
  whoami          who is this person
  projects        list projects
  experience      work history
  education       where i studied
  skills          the toolbox
  contact         how to reach me
  open <app>      open a window (e.g. open snake)
  neofetch        system info, but make it personal
  fact            random fun fact
  clear           clear the screen
  sudo hire-me    try it
  crt on|off      toggle the scanlines
  exit            close terminal

tip: there are a few commands not listed here. explore.`;

export default function TerminalApp({
  openApp,
  closeApp,
  unlockSecret,
  setCrt,
}: {
  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  unlockSecret: () => void;
  setCrt: Dispatch<SetStateAction<boolean>>;
}) {
  const [lines, setLines] = useState<Line[]>([
    { text: `${profile.name}.os terminal — type 'help' to get started`, kind: "accent" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem(HIST_KEY) || "[]");
    } catch {
      return [];
    }
  });
  const [histIdx, setHistIdx] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem(HIST_KEY, JSON.stringify(history.slice(0, 50)));
  }, [history]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const print = (text: string, kind: Line["kind"] = "out") => {
    setLines((ls) => [...ls, ...text.split("\n").map((t) => ({ text: t, kind }))]);
  };

  const run = (raw: string) => {
    const cmd = raw.trim();
    setLines((ls) => [...ls, { text: `$ ${cmd}`, kind: "in" }]);
    if (!cmd) return;
    unlock("terminal");
    setHistory((h) => [cmd, ...h]);
    setHistIdx(-1);

    const [name, ...args] = cmd.toLowerCase().split(/\s+/);

    switch (name) {
      case "help":
        print(HELP);
        break;
      case "whoami":
        print(`${profile.name} — ${profile.role}\n${profile.tagline}`);
        break;
      case "projects":
        projects.forEach((p) =>
          print(`▸ ${p.name} (${p.year}) — ${p.blurb}`)
        );
        print(`\nrun 'open projects' for the full view`, "accent");
        break;
      case "experience":
        experience.forEach((e) => print(`▸ ${e.role} @ ${e.company} (${e.period})`));
        break;
      case "education":
        education.forEach((e) => print(`▸ ${e.degree}, ${e.school} (${e.period})`));
        break;
      case "skills":
        Object.entries(skills).forEach(([k, v]) => print(`${k.padEnd(10)} ${v.join(", ")}`));
        break;
      case "contact":
        print(`email     ${profile.email}\ngithub    ${profile.socials.github}\nlinkedin  ${profile.socials.linkedin}`);
        break;
      case "fact":
        print(funFacts[Math.floor(Math.random() * funFacts.length)], "accent");
        break;
      case "neofetch":
        print(
          `        ▄▄▄▄▄▄        ${profile.name}@portfolio\n` +
          `      ▄█  ◕ ◕ █▄      ─────────────────\n` +
          `      █   ▽    █      os        ${profile.name}.os v1.0\n` +
          `      ▀█▄▄▄▄▄█▀       role      ${profile.role}\n` +
          `       ▄█▀▀▀█▄        uptime    ${profile.uptime}\n` +
          `      ▀▀     ▀▀       shell     enthusiasm/bash\n` +
          `                      location  ${profile.location}`
        );
        break;
      case "open": {
        if (args[0] === "resume" || args[0] === "resume.pdf") {
          print("opening resume.pdf...", "accent");
          unlock("resume");
          window.open(profile.resume, "_blank", "noopener");
          break;
        }
        const target = args[0] as AppId;
        const valid: AppId[] = ["about", "projects", "experience", "education", "contact", "spotify", "lofi", "snake", "terminal"];
        if (valid.includes(target)) {
          print(`opening ${target}...`, "accent");
          openApp(target);
        } else {
          sounds.error();
          print(`unknown app '${args[0] ?? ""}' — try: ${[...valid, "resume"].join(", ")}`, "err");
        }
        break;
      }
      case "clear":
        setLines([]);
        break;
      case "sudo":
        if (args.join(" ") === "hire-me") {
          sounds.secret();
          print(
            `[sudo] password for recruiter: ********\naccess granted.\n\n  ✓ strong fundamentals\n  ✓ ships fast, learns faster\n  ✓ actually fun to work with\n\nhiring ${profile.name} is now 100% authorized.\nrun 'contact' to proceed.`,
            "accent"
          );
        } else {
          print(`${profile.name} is not in the sudoers file. this incident will be reported.`, "err");
        }
        break;
      case "crt":
        if (args[0] === "off") { setCrt(false); print("scanlines off. so crisp."); }
        else if (args[0] === "on") { setCrt(true); print("scanlines on. cozy mode."); }
        else print("usage: crt on|off", "err");
        break;
      case "ls":
        print("about.txt  projects/  experience/  education/  .secret");
        break;
      case "cat":
        if (args[0] === ".secret" || args[0] === "secret" || args[0] === ".secret.txt") {
          print("nice find. unlocking...", "accent");
          unlockSecret();
        } else if (args[0] === "about.txt") {
          print(profile.about.join("\n"));
        } else if (!args[0]) {
          print("meow. (a cat appears — it will follow your cursor now)", "accent");
          unlock("cat");
          window.dispatchEvent(new CustomEvent("summon-cat"));
        } else {
          print(`cat: ${args[0]}: no such file`, "err");
        }
        break;
      case "history":
        print(history.slice(0, 15).map((h, i) => `  ${i + 1}  ${h}`).join("\n") || "no history yet");
        break;
      case "snake":
        print("launching snake.exe...", "accent");
        openApp("snake");
        break;
      case "konami":
        print("↑ ↑ ↓ ↓ ← → ← → B A — but you have to actually press them ;)", "accent");
        break;
      case "exit":
        closeApp("terminal");
        break;
      case "rm":
        print("nice try.", "err");
        sounds.error();
        break;
      case "coffee":
      case "brew":
        print("☕ brewing... done. productivity +20%", "accent");
        break;
      default:
        sounds.error();
        print(`command not found: ${name}. try 'help'`, "err");
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    sounds.key();
    if (e.key === "Tab") {
      e.preventDefault();
      const parts = input.split(/\s+/);
      const last = parts[parts.length - 1].toLowerCase();
      if (!last) return;
      const pool = parts.length > 1 && parts[0].toLowerCase() === "open" ? OPENABLE : COMMANDS;
      const matches = pool.filter((c) => c.startsWith(last));
      if (matches.length === 1) {
        parts[parts.length - 1] = matches[0];
        setInput(parts.join(" ") + (parts.length === 1 && matches[0] === "open" ? " " : ""));
      } else if (matches.length > 1) {
        print(matches.join("  "));
      }
    } else if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      if (history[next]) { setHistIdx(next); setInput(history[next]); }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = histIdx - 1;
      if (next < 0) { setHistIdx(-1); setInput(""); }
      else { setHistIdx(next); setInput(history[next]); }
    }
  };

  const color = (kind?: Line["kind"]) =>
    kind === "in" ? "text-cream/90"
    : kind === "accent" ? "text-amber"
    : kind === "err" ? "text-blush"
    : "text-termGreen/90";

  return (
    <div
      className="flex h-full flex-col bg-termBg font-mono text-[12.5px] leading-6"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={scrollRef} className="term-scroll flex-1 overflow-y-auto whitespace-pre-wrap p-4">
        {lines.map((l, i) => (
          <div key={i} className={color(l.kind)}>{l.text || " "}</div>
        ))}
        <div className="flex items-center text-cream/90">
          <span className="mr-2 text-amber">$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            className="min-w-0 flex-1 border-none bg-transparent text-cream outline-none [font-size-adjust:0.52] placeholder:text-cream/25"
            placeholder="type 'help'"
            autoFocus
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal input"
          />
        </div>
      </div>
    </div>
  );
}

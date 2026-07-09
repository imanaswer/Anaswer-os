# anaswer.os — retro desktop portfolio

An interactive portfolio that feels like stepping into your personal computer: a cozy retro OS with draggable windows, a working terminal, a boot sequence, sounds, and easter eggs.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Make it yours (one file)

All content lives in **`lib/content.ts`** — name, about text, projects, experience, education, skills, socials, and fun facts. Edit that file and everything (windows, terminal commands, boot screen) updates. No component code needs touching.

## What's inside

- **Boot screen** — retro BIOS boot with chime (once per session; click or press any key to skip)
- **Draggable windows** — drag by title bar, resize from bottom-right corner, minimize to taskbar; full-screen sheets on mobile
- **Terminal** — `help`, `whoami`, `projects`, `neofetch`, `open snake`, plus unlisted commands worth discovering (`sudo hire-me`, `ls` → `cat .secret`, `coffee`…)
- **snake.exe** — arrows/WASD, touch controls on mobile, best score saved
- **Konami code** — ↑↑↓↓←→←→BA anywhere on the desktop unlocks a secret file and wallpaper
- **Taskbar** — open windows, CRT scanline toggle, sound mute, clock

## Deploy

Easiest: push to GitHub and import into [Vercel](https://vercel.com/new) — zero config. Netlify and Cloudflare Pages also work out of the box.

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · WebAudio (no audio files)

## Structure

```
lib/content.ts        ← your content (edit this!)
lib/sound.ts          ← synth sound effects + mute
components/os/        ← boot, desktop, windows, taskbar, icons
components/apps/      ← the apps that open in windows
```
# Anaswer-os

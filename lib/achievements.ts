// Tiny achievement system: unlock(id) persists + fires a window event the OS
// listens to for toasts. All client-side.

export const ACHIEVEMENTS: Record<string, string> = {
  snake: "snake charmer — found snake.exe",
  music: "certified vibes — turned on the tunes",
  resume: "paper trail — opened the resume",
  terminal: "shell native — ran a command",
  konami: "konami master — ↑↑↓↓←→←→BA",
  cat: "cat person — summoned the cat",
};

export const ACHIEVEMENT_TOTAL = Object.keys(ACHIEVEMENTS).length;

const KEY = "os-achievements";

export function unlockedIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function unlock(id: keyof typeof ACHIEVEMENTS) {
  if (typeof window === "undefined") return;
  const cur = unlockedIds();
  if (cur.includes(id)) return;
  localStorage.setItem(KEY, JSON.stringify([...cur, id]));
  window.dispatchEvent(new CustomEvent("achievement", { detail: id }));
}

// Tiny WebAudio synth — no audio files needed.
// All sounds are soft, short, and respect the mute toggle.

let ctx: AudioContext | null = null;
let muted = false;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

export function setMuted(m: boolean) {
  muted = m;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("anaswer-os-muted", m ? "1" : "0");
    } catch {}
  }
}

export function getMuted(): boolean {
  if (typeof window !== "undefined") {
    try {
      return localStorage.getItem("anaswer-os-muted") === "1";
    } catch {}
  }
  return muted;
}

export function initMute() {
  muted = getMuted();
}

function tone(
  freq: number,
  dur: number,
  type: OscillatorType = "sine",
  vol = 0.08,
  delay = 0
) {
  const c = getCtx();
  if (!c || muted) return;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  const t0 = c.currentTime + delay;
  gain.gain.setValueAtTime(0, t0);
  gain.gain.linearRampToValueAtTime(vol, t0 + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(gain).connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.05);
}

export const sounds = {
  click: () => tone(680, 0.06, "square", 0.04),
  hover: () => tone(520, 0.04, "sine", 0.02),
  open: () => {
    tone(392, 0.09, "triangle", 0.05);
    tone(523, 0.12, "triangle", 0.05, 0.06);
  },
  close: () => {
    tone(523, 0.08, "triangle", 0.05);
    tone(349, 0.12, "triangle", 0.05, 0.05);
  },
  minimize: () => tone(440, 0.1, "triangle", 0.04),
  error: () => {
    tone(196, 0.15, "square", 0.05);
    tone(185, 0.2, "square", 0.05, 0.1);
  },
  boot: () => {
    // Cozy little startup chime: C - E - G - C
    tone(261.6, 0.25, "triangle", 0.06, 0);
    tone(329.6, 0.25, "triangle", 0.06, 0.15);
    tone(392.0, 0.25, "triangle", 0.06, 0.3);
    tone(523.3, 0.5, "triangle", 0.07, 0.45);
  },
  eat: () => tone(880, 0.07, "square", 0.05),
  gameOver: () => {
    tone(330, 0.15, "square", 0.05);
    tone(262, 0.15, "square", 0.05, 0.12);
    tone(196, 0.3, "square", 0.05, 0.24);
  },
  secret: () => {
    tone(523, 0.12, "sine", 0.06, 0);
    tone(659, 0.12, "sine", 0.06, 0.1);
    tone(784, 0.12, "sine", 0.06, 0.2);
    tone(1047, 0.35, "sine", 0.07, 0.3);
  },
  key: () => tone(600 + Math.random() * 120, 0.025, "square", 0.015),
};

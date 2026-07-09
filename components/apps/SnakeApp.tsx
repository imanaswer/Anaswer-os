"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { sounds } from "@/lib/sound";

const GRID = 15;
const TICK_MS = 130;

type Pt = { x: number; y: number };

const randFood = (snake: Pt[]): Pt => {
  while (true) {
    const f = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
    if (!snake.some((s) => s.x === f.x && s.y === f.y)) return f;
  }
};

export default function SnakeApp() {
  const [snake, setSnake] = useState<Pt[]>([{ x: 7, y: 7 }]);
  const [food, setFood] = useState<Pt>({ x: 3, y: 3 });
  const [dir, setDir] = useState<Pt>({ x: 1, y: 0 });
  const [running, setRunning] = useState(false);
  const [dead, setDead] = useState(false);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const dirRef = useRef(dir);
  const queuedDir = useRef<Pt | null>(null);

  useEffect(() => {
    try {
      setBest(Number(localStorage.getItem("snake-best") || 0));
    } catch {}
  }, []);

  const reset = useCallback(() => {
    const s = [{ x: 7, y: 7 }];
    setSnake(s);
    setFood(randFood(s));
    setDir({ x: 1, y: 0 });
    dirRef.current = { x: 1, y: 0 };
    setScore(0);
    setDead(false);
    setRunning(true);
  }, []);

  // input
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, Pt> = {
        ArrowUp: { x: 0, y: -1 }, w: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 }, s: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 }, a: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 }, d: { x: 1, y: 0 },
      };
      const nd = map[e.key] ?? map[e.key.toLowerCase()];
      if (!nd) {
        if (e.key === " " && (dead || !running)) reset();
        return;
      }
      e.preventDefault();
      const cur = dirRef.current;
      if (nd.x === -cur.x && nd.y === -cur.y) return; // no 180s
      queuedDir.current = nd;
      if (!running && !dead) setRunning(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [running, dead, reset]);

  // game loop
  useEffect(() => {
    if (!running || dead) return;
    const t = setInterval(() => {
      setSnake((prev) => {
        const nd = queuedDir.current ?? dirRef.current;
        dirRef.current = nd;
        queuedDir.current = null;
        setDir(nd);
        const head = { x: prev[0].x + nd.x, y: prev[0].y + nd.y };
        // wall or self collision
        if (
          head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID ||
          prev.some((s) => s.x === head.x && s.y === head.y)
        ) {
          sounds.gameOver();
          setDead(true);
          setRunning(false);
          setBest((b) => {
            const nb = Math.max(b, prev.length - 1);
            try { localStorage.setItem("snake-best", String(nb)); } catch {}
            return nb;
          });
          return prev;
        }
        const next = [head, ...prev];
        setFood((f) => {
          if (head.x === f.x && head.y === f.y) {
            sounds.eat();
            setScore((s) => s + 1);
            return randFood(next);
          }
          next.pop();
          return f;
        });
        return next;
      });
    }, TICK_MS);
    return () => clearInterval(t);
  }, [running, dead]);

  const turn = (nd: Pt) => {
    const cur = dirRef.current;
    if (nd.x === -cur.x && nd.y === -cur.y) return;
    queuedDir.current = nd;
    if (!running && !dead) setRunning(true);
  };

  return (
    <div className="flex h-full flex-col items-center bg-termBg p-4">
      <div className="mb-2 flex w-full max-w-[340px] items-center justify-between font-pixel text-[10px] text-termGreen">
        <span>score {score}</span>
        <span className="text-amber">best {best}</span>
      </div>

      <div
        className="relative grid aspect-square w-full max-w-[340px] gap-px rounded-lg border-2 border-termGreen/30 bg-[#232219] p-1"
        style={{ gridTemplateColumns: `repeat(${GRID}, 1fr)` }}
      >
        {Array.from({ length: GRID * GRID }).map((_, i) => {
          const x = i % GRID;
          const y = Math.floor(i / GRID);
          const isHead = snake[0].x === x && snake[0].y === y;
          const isBody = !isHead && snake.some((s) => s.x === x && s.y === y);
          const isFood = food.x === x && food.y === y;
          return (
            <div
              key={i}
              className={`aspect-square rounded-[2px] ${
                isHead ? "bg-termGreen"
                : isBody ? "bg-termGreen/60"
                : isFood ? "bg-blush"
                : "bg-white/[0.02]"
              }`}
            />
          );
        })}

        {(!running || dead) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-lg bg-black/70 text-center">
            <p className="font-pixel text-[12px] text-cream">
              {dead ? "game over" : "snake.exe"}
            </p>
            {dead && <p className="font-mono text-[11px] text-termGreen">final score: {score}</p>}
            <button
              onClick={reset}
              className="cursor-pointer rounded-lg border-2 border-termGreen bg-termGreen/10 px-4 py-2 font-pixel text-[9px] text-termGreen transition-colors hover:bg-termGreen/25 focus-visible:ring-2 focus-visible:ring-termGreen"
            >
              {dead ? "play again" : "start"} (space)
            </button>
            <p className="font-mono text-[10px] text-cream/40">arrows or WASD to move</p>
          </div>
        )}
      </div>

      {/* touch controls */}
      <div className="mt-3 grid grid-cols-3 gap-1.5 md:hidden">
        <div />
        <PadBtn label="↑" onClick={() => turn({ x: 0, y: -1 })} />
        <div />
        <PadBtn label="←" onClick={() => turn({ x: -1, y: 0 })} />
        <PadBtn label="↓" onClick={() => turn({ x: 0, y: 1 })} />
        <PadBtn label="→" onClick={() => turn({ x: 1, y: 0 })} />
      </div>
    </div>
  );
}

function PadBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="h-11 w-14 cursor-pointer rounded-lg border-2 border-termGreen/40 bg-termGreen/10 font-pixel text-sm text-termGreen active:bg-termGreen/30"
      aria-label={`Move ${label}`}
    >
      {label}
    </button>
  );
}

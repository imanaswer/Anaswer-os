import type { ComponentType, ReactNode } from "react";
import {
  IconUser,
  IconFolder,
  IconBriefcase,
  IconGradCap,
  IconTerminal,
  IconMail,
  IconGamepad,
  IconStar,
  IconMusic,
  IconPlay,
} from "./Icons";

export type AppId =
  | "about"
  | "projects"
  | "experience"
  | "education"
  | "terminal"
  | "contact"
  | "spotify"
  | "lofi"
  | "snake"
  | "secret";

export type AppDef = {
  id: AppId;
  title: string;
  icon: ComponentType<{ className?: string }>;
  w: number;
  h: number;
  hidden?: boolean; // not shown on desktop (easter eggs)
};

export const APPS: AppDef[] = [
  { id: "about", title: "about-me", icon: IconUser, w: 560, h: 480 },
  { id: "projects", title: "projects", icon: IconFolder, w: 640, h: 520 },
  { id: "experience", title: "experience", icon: IconBriefcase, w: 600, h: 500 },
  { id: "education", title: "education", icon: IconGradCap, w: 540, h: 420 },
  { id: "terminal", title: "terminal", icon: IconTerminal, w: 620, h: 440 },
  { id: "contact", title: "contact", icon: IconMail, w: 500, h: 420 },
  { id: "spotify", title: "spotify", icon: IconMusic, w: 420, h: 600 },
  { id: "lofi", title: "lofi", icon: IconPlay, w: 640, h: 420 },
  { id: "snake", title: "snake.exe", icon: IconGamepad, w: 420, h: 520 },
  { id: "secret", title: "secret.txt", icon: IconStar, w: 460, h: 380, hidden: true },
];

export const appById = (id: AppId) => APPS.find((a) => a.id === id)!;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        desk: "#02656A", // sampled from public/portrait.png background so the hero blends in
        deskDark: "#014B4F",
        cream: "#F6F1E7",
        creamDim: "#EDE6D6",
        ink: "#2A2721",
        inkSoft: "#5C564A",
        amber: "#E8A33D",
        amberDark: "#C9862A",
        blush: "#E5928E",
        sage: "#9DBFA9",
        termBg: "#1C1B18",
        termGreen: "#B8E0A8",
        chrome: "#3E3A32",
      },
      fontFamily: {
        pixel: ["var(--font-pixel)", "monospace"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        window: "0 24px 60px rgba(20, 30, 25, 0.35), 0 2px 8px rgba(20,30,25,0.2)",
        icon: "0 4px 12px rgba(20,30,25,0.25)",
        taskbar: "0 -8px 30px rgba(20,30,25,0.25)",
      },
    },
  },
  plugins: [],
};
export default config;

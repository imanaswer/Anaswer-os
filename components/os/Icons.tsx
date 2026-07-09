// Pixel-flavored SVG icons (crisp edges, chunky shapes).
// Each icon draws on a 16x16 grid and scales cleanly.

type P = { className?: string };

const base = {
  width: "100%",
  height: "100%",
  viewBox: "0 0 16 16",
  shapeRendering: "crispEdges" as const,
  xmlns: "http://www.w3.org/2000/svg",
};

export const IconTerminal = ({ className }: P) => (
  <svg {...base} className={className}>
    <rect x="1" y="2" width="14" height="12" fill="#565F89" />
    <rect x="2" y="3" width="12" height="10" fill="#0D0F1C" />
    <path d="M4 6h1v1H4zM5 7h1v1H5zM4 8h1v1H4z" fill="#9ECE6A" />
    <rect x="7" y="9" width="4" height="1" fill="#C0CAF5" />
  </svg>
);

export const IconUser = ({ className }: P) => (
  <svg {...base} className={className}>
    <rect x="4" y="2" width="8" height="2" fill="#1A1B26" />
    <rect x="5" y="4" width="6" height="4" fill="#F2C9A0" />
    <rect x="6" y="5" width="1" height="1" fill="#1A1B26" />
    <rect x="9" y="5" width="1" height="1" fill="#1A1B26" />
    <rect x="4" y="9" width="8" height="1" fill="#7AA2F7" />
    <rect x="3" y="10" width="10" height="4" fill="#7AA2F7" />
  </svg>
);

export const IconFolder = ({ className }: P) => (
  <svg {...base} className={className}>
    <rect x="1" y="4" width="6" height="2" fill="#E8A33D" />
    <rect x="1" y="6" width="14" height="8" fill="#FFC94A" />
    <rect x="2" y="7" width="12" height="6" fill="#FFDE8A" />
  </svg>
);

export const IconBriefcase = ({ className }: P) => (
  <svg {...base} className={className}>
    <rect x="6" y="2" width="4" height="2" fill="#3D4259" />
    <rect x="2" y="4" width="12" height="9" fill="#E0975A" />
    <rect x="3" y="5" width="10" height="7" fill="#F2B97C" />
    <rect x="7" y="8" width="2" height="2" fill="#FFD84D" />
  </svg>
);

export const IconGradCap = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M8 3 1 6l7 3 7-3z" fill="#BB9AF7" />
    <rect x="4" y="8" width="8" height="4" fill="#9D7CD8" />
    <rect x="13" y="7" width="1" height="5" fill="#FFD84D" />
  </svg>
);

export const IconMail = ({ className }: P) => (
  <svg {...base} className={className}>
    <rect x="1" y="3" width="14" height="10" fill="#F7768E" />
    <rect x="2" y="4" width="12" height="8" fill="#FFF0F3" />
    <path d="M2 4l6 5 6-5v1l-6 5-6-5z" fill="#F7768E" />
  </svg>
);

export const IconGamepad = ({ className }: P) => (
  <svg {...base} className={className}>
    <rect x="2" y="5" width="12" height="7" fill="#9ECE6A" />
    <rect x="1" y="6" width="1" height="4" fill="#9ECE6A" />
    <rect x="14" y="6" width="1" height="4" fill="#9ECE6A" />
    <rect x="4" y="7" width="1" height="3" fill="#1A1B26" />
    <rect x="3" y="8" width="3" height="1" fill="#1A1B26" />
    <rect x="10" y="7" width="1" height="1" fill="#F7768E" />
    <rect x="12" y="9" width="1" height="1" fill="#FFD84D" />
  </svg>
);

export const IconStar = ({ className }: P) => (
  <svg {...base} className={className}>
    <path
      d="M8 1l2 4 5 1-3.5 3.5L12.5 15 8 12.5 3.5 15l1-5.5L1 6l5-1z"
      fill="#FFD84D"
    />
  </svg>
);

export const IconMusic = ({ className }: P) => (
  <svg {...base} className={className}>
    <rect x="5" y="2" width="8" height="2" fill="#1ED760" />
    <rect x="5" y="4" width="2" height="7" fill="#1ED760" />
    <rect x="11" y="4" width="2" height="7" fill="#1ED760" />
    <rect x="3" y="10" width="4" height="3" fill="#1ED760" />
    <rect x="9" y="10" width="4" height="3" fill="#1ED760" />
  </svg>
);

export const IconPlay = ({ className }: P) => (
  <svg {...base} className={className}>
    <rect x="5" y="3" width="2" height="10" fill="#F6F1E7" />
    <rect x="7" y="4" width="2" height="8" fill="#F6F1E7" />
    <rect x="9" y="6" width="2" height="4" fill="#F6F1E7" />
    <rect x="11" y="7" width="1" height="2" fill="#F6F1E7" />
  </svg>
);

export const IconDoc = ({ className }: P) => (
  <svg {...base} className={className}>
    <rect x="3" y="1" width="10" height="14" fill="#F6F1E7" />
    <rect x="5" y="4" width="6" height="1" fill="#7AA2F7" />
    <rect x="5" y="6" width="6" height="1" fill="#7AA2F7" />
    <rect x="5" y="8" width="4" height="1" fill="#7AA2F7" />
    <rect x="5" y="10" width="6" height="3" fill="#F7768E" />
  </svg>
);

export const IconSpeakerOn = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M3 6h3l4-3v10l-4-3H3z" fill="currentColor" />
    <rect x="11" y="6" width="1" height="4" fill="currentColor" />
    <rect x="13" y="4" width="1" height="8" fill="currentColor" />
  </svg>
);

export const IconSpeakerOff = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M3 6h3l4-3v10l-4-3H3z" fill="currentColor" />
    <path d="M11 6l3 4M14 6l-3 4" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

export const IconMonitor = ({ className }: P) => (
  <svg {...base} className={className}>
    <rect x="1" y="2" width="14" height="10" fill="currentColor" />
    <rect x="3" y="4" width="10" height="6" fill="#02656A" />
    <rect x="6" y="13" width="4" height="1" fill="currentColor" />
  </svg>
);

export const IconClose = ({ className }: P) => (
  <svg {...base} className={className} shapeRendering="auto">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const IconMinimize = ({ className }: P) => (
  <svg {...base} className={className} shapeRendering="auto">
    <path d="M4 11h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const IconHeart = ({ className }: P) => (
  <svg {...base} className={className}>
    <path
      d="M8 14S2 10 2 6c0-2 1.5-3 3-3s3 2 3 2 1.5-2 3-2 3 1 3 3c0 4-6 8-6 8z"
      fill="#E5928E"
    />
  </svg>
);

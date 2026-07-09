// ============================================================
// EDIT THIS FILE to make the site yours.
// Everything the site displays lives here — no need to touch
// any component code.
// ============================================================

export const profile = {
  name: "Anaswer",
  handle: "anaswer",
  role: "Founding Engineer @ GameGround",
  tagline:
    "I take products from zero to production — the backend, the infra, and the AI plumbing in between.",
  about: [
    "Hey, I'm Anaswer Ajay — a backend engineer from Kerala who likes building things that have to actually work: marketplaces, search systems, distributed anything.",
    "I interned on Google's Search Ranking team, then did the scary thing — left to become the founding engineer at GameGround, a sports marketplace for athletes and coaches back home. I built the backend from the first commit (FastAPI, PostgreSQL, AWS) and it now serves 500+ active users. Biggest gamble of my life; zero regrets.",
    "I build things wherever I go. A bakery in Croatia kept selling out of burek, so I made them a live-menu site on the spot. I've trained an RL agent to land a lunar module, compared fraud-detection models for fun, and written about all of it for the 2,600+ people who follow along on LinkedIn.",
    "Off the clock: rebuilding Kafka in Go, the occasional jam session, and lofi on loop the whole time.",
  ],
  location: "Kerala, India",
  email: "anaswer.impluse@gmail.com",
  socials: {
    github: "https://github.com/imanaswer",
    linkedin: "https://www.linkedin.com/in/anaswerajay/",
  },
  resume: "/ResumeII.pdf",
  // Shown by the `neofetch` terminal command
  uptime: "shipping production code since 2024",
};

// Media apps — swap these ids to change what plays
export const media = {
  // open.spotify.com/playlist/<id>
  spotifyPlaylist: "37i9dQZF1DWWQRwui0ExPn", // Lofi Beats
  // youtube.com/watch?v=<id>
  lofiVideo: "jfKfPfyJRdk", // lofi girl — beats to relax/study to
};

export type Project = {
  id: string;
  name: string;
  blurb: string;
  description: string;
  stack: string[];
  link?: string;
  repo?: string;
  year: string;
  status: "shipped" | "in-progress" | "archived";
};

export const projects: Project[] = [
  {
    id: "ai-coding-agent",
    name: "AI Coding Agent",
    blurb: "An agent that reads your whole codebase — not just the file you're in.",
    description:
      "An autonomous repository-intelligence agent that can reason across codebases past 100K lines. A Neo4j knowledge graph maps every file, import and function, and retrieval-augmented pipelines use it to localize bugs, analyze pull requests, and explain how the code actually fits together.",
    stack: ["Python", "Neo4j", "LLMs", "Vector Search"],
    year: "2026",
    status: "in-progress",
  },
  {
    id: "kafka-clone",
    name: "Distributed Kafka Clone",
    blurb: "I wanted to know how Kafka really works — so I built one.",
    description:
      "A distributed event-streaming platform written in Go: partitioned logs, replication, and persistent message storage, plus the genuinely hard parts — consumer-group coordination, offset management, leader-based replication, and partition recovery when nodes fall over.",
    stack: ["Go"],
    year: "2025",
    status: "shipped",
  },
  {
    id: "semantic-search",
    name: "Enterprise Semantic Search",
    blurb: "Ask your documents a question, get an actual answer back.",
    description:
      "A semantic retrieval platform built on embeddings, vector search and RAG for enterprise knowledge discovery. Scalable ingestion and indexing pipelines, with embedding caching and async processing keeping retrieval quick even as the document pile grows.",
    stack: ["Python", "FastAPI", "RAG"],
    year: "2025",
    status: "shipped",
  },
  {
    id: "burek-today",
    name: "Burek Today",
    blurb: "A live menu for a family bakery in Croatia that kept selling out.",
    description:
      "On a trip to Croatia I kept going back to a tiny bakery — and kept watching people walk out disappointed because the burek was gone. So I built them a simple site: today's menu, what's in stock live, a way for regulars to signal tomorrow's demand, and end-of-day discounts on what's left. Less waste, happier customers.",
    stack: ["Full-stack", "Live inventory"],
    year: "2026",
    status: "shipped",
  },
  {
    id: "lunar-lander",
    name: "Lunar Lander RL Agent",
    blurb: "Taught an agent to land on the moon. The simulated one.",
    description:
      "A reinforcement-learning deep dive: trained an agent to land a lunar module, which meant getting my hands dirty with RL algorithms, reward shaping and neural networks. It crashed a few hundred times first — watching it finally stick the landing never got old.",
    stack: ["Python", "Reinforcement Learning"],
    year: "2025",
    status: "shipped",
  },
  {
    id: "fraud-detection",
    name: "Fraud Detection Model",
    blurb: "Catching bad transactions with boosted trees and neural nets.",
    description:
      "Built and compared fraud-detection models — neural networks vs XGBoost vs LightGBM — with proper feature engineering and a hard look at the precision/recall trade-offs that actually matter when false positives annoy real customers.",
    stack: ["Python", "XGBoost", "LightGBM"],
    year: "2025",
    status: "shipped",
  },
  {
    id: "yolo-detection",
    name: "YOLO Object Detection",
    blurb: "Boxing pedestrians and storefronts on live street footage.",
    description:
      "Explored real-time object detection with YOLO together with a friend — running it over busy street video and watching it pick out people, bikes and shops frame by frame. My gateway drug into computer vision.",
    stack: ["Python", "YOLO", "OpenCV"],
    year: "2024",
    status: "shipped",
  },
];

export type Experience = {
  id: string;
  company: string;
  role: string;
  period: string;
  points: string[];
  stack?: string[];
};

export const experience: Experience[] = [
  {
    id: "gameground",
    company: "GameGround",
    role: "Founding Engineer",
    period: "Sep 2025 — Present",
    points: [
      "Building the backend of a sports marketplace from the very first commit — it now supports 500+ active users and 19+ onboarded coaches.",
      "Designed the FastAPI + PostgreSQL APIs behind bookings, coach discovery and onboarding, and own the architecture, data modeling and indexing decisions.",
      "Set up auth and role-based access for athletes, coaches and admins, plus the AWS infrastructure and deploy pipelines that let us ship fast.",
      "Work side-by-side with product, ops and business folks to take features from a whiteboard sketch to production.",
    ],
    stack: ["FastAPI", "PostgreSQL", "AWS"],
  },
  {
    id: "google",
    company: "Google",
    role: "Software Engineering Intern — Search Ranking",
    period: "Feb 2025 — Jul 2025",
    points: [
      "Built feature-engineering workflows for search ranking experiments, working from real user-behavior and interaction signals.",
      "Wrote internal tooling that automated dataset prep, validation and ranking evaluation for the engineering teams around me.",
      "Dug through production-scale search datasets to figure out which ranking signals actually move the needle.",
    ],
    stack: ["Python", "Distributed Data Processing"],
  },
  {
    id: "sproutheads",
    company: "Sproutheads",
    role: "Python Automation Developer",
    period: "Jul 2024 — Jul 2025",
    points: [
      "Automated the boring parts of the business — Python systems gluing external APIs and internal apps into smooth workflows.",
      "Built ETL pipelines for business-critical data, and internal tools for orchestration, analytics and process monitoring.",
      "Turned vague stakeholder requests into concrete automation running across multiple business functions.",
    ],
    stack: ["Python", "ETL", "APIs"],
  },
];

export type Education = {
  id: string;
  school: string;
  degree: string;
  period: string;
  detail: string;
};

export const education: Education[] = [
  {
    id: "amrita",
    school: "Amrita Vishwa Vidyapeetham",
    degree: "B.Tech in Computer Science & Engineering",
    period: "2021 — 2025",
    detail:
      "Four years in Kerala, India — where I fell for distributed systems and never quite recovered.",
  },
];

export const skills: Record<string, string[]> = {
  Languages: ["Python", "Go", "Java", "SQL"],
  Backend: ["FastAPI", "Flask", "REST APIs", "Microservices"],
  Cloud: ["AWS", "Docker", "Kubernetes", "CI/CD", "Linux"],
  Databases: ["PostgreSQL", "Neo4j", "Vector DBs"],
  "AI Infra": ["LLMs", "RAG", "Agentic AI", "Embeddings"],
  Tools: ["Git", "GitHub Actions", "Bash"],
};

// Fun facts revealed by easter eggs / terminal
export const funFacts = [
  "I built my own Kafka just to see if I could. (I could. Mostly.)",
  "A bakery in Croatia kept selling out of burek, so I built them a live-menu site.",
  "I trained an RL agent to land a lunar module. It crashed ~400 times first.",
  "Left Google for a startup gamble — biggest one of my life, zero regrets.",
  "Debugging soundtrack: lofi, always. There's an app for it on this desktop.",
];

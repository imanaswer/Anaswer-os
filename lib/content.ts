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
    "I interned on Google's Search Ranking team, spent an autumn writing Python and C++ at Jane Street in London, then did the scary thing — became the founding engineer at GameGround, a sports marketplace for athletes and coaches back home. I built the backend from the first commit (FastAPI, PostgreSQL, AWS) and it now serves 500+ active users. Biggest gamble of my life; zero regrets.",
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
    id: "support-agent",
    name: "AI Customer Support Agent",
    blurb: "Not a ChatGPT wrapper. An agent that actually closes tickets.",
    description:
      "A production-grade support agent that plugs into Gmail, Slack, Notion and a knowledge base, answers customer questions with RAG over real company docs, and — the important part — knows when it doesn't know: uncertain answers escalate to a human instead of hallucinating. Every conversation, tool call and escalation is logged straight into the CRM, so nothing falls through the cracks.",
    stack: ["Python", "FastAPI", "Agents", "RAG", "Tool Calling"],
    year: "2026",
    status: "shipped",
  },
  {
    id: "event-platform",
    name: "Stripe-style Event Processing Platform",
    blurb: "Millions of webhooks walk in. Every single one gets processed. Exactly once.",
    description:
      "A backend built for the unglamorous reality of webhooks at scale: millions of events flowing through Kafka, idempotency keys so retries never double-charge anyone, exponential-backoff retry queues, and dead-letter queues for the events that refuse to behave. Redis for hot-path dedup, PostgreSQL for durable state. The kind of plumbing you only notice when it breaks — so it doesn't.",
    stack: ["Kafka", "Redis", "PostgreSQL", "Distributed Systems"],
    year: "2026",
    status: "shipped",
  },
  {
    id: "docs-copilot",
    name: "Copilot for Internal Docs",
    blurb: "Upload your PDFs. Interrogate them. Get code back.",
    description:
      "GitHub Copilot, but for the docs nobody reads: drop in PDFs and internal wikis, then ask questions, search the architecture, get APIs explained, and generate working code snippets from the answers. Under the hood it's a full retrieval pipeline — vector database, embeddings, a reranking stage to keep the good chunks on top, and an evaluation harness so 'it feels smarter' is backed by actual numbers.",
    stack: ["Python", "Vector DB", "Embeddings", "Reranking", "Evals"],
    year: "2026",
    status: "shipped",
  },
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
    period: "Mar 2026 — Present",
    points: [
      "Building the backend of a sports marketplace from the very first commit — it now supports 500+ active users and 19+ onboarded coaches.",
      "Designed the FastAPI + PostgreSQL APIs behind bookings, coach discovery and onboarding, and own the architecture, data modeling and indexing decisions.",
      "Set up auth and role-based access for athletes, coaches and admins, plus the AWS infrastructure and deploy pipelines that let us ship fast.",
      "Work side-by-side with product, ops and business folks to take features from a whiteboard sketch to production.",
    ],
    stack: ["FastAPI", "PostgreSQL", "AWS"],
  },
  {
    id: "janestreet",
    company: "Jane Street",
    role: "Software Engineering Intern",
    period: "Sep 2025 — Dec 2025",
    points: [
      "Spent an autumn in London building and optimizing software in Python and C++, where 'fast enough' is never actually fast enough.",
      "Collaborated with engineers on scalable systems and shipped improvements through a culture of relentless testing and code review.",
      "Learned what production rigor looks like when the cost of a bug is measured in real money, in real time.",
    ],
    stack: ["Python", "C++"],
  },
  {
    id: "google",
    company: "Google",
    role: "Software Engineering Intern — Search Ranking",
    period: "Jan 2025 — Aug 2025",
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
  {
    id: "code69",
    company: "Code 69",
    role: "Project Manager",
    period: "Mar 2024 — Jul 2024",
    points: [
      "Led product planning and feature delivery — gathering requirements, prioritizing roadmaps, and herding cross-functional teams from idea to launch.",
      "First taste of shipping software where the hard part wasn't the code — it was the people, the scope, and the deadline.",
    ],
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
  "One autumn at Jane Street taught me that 'fast enough' is never actually fast enough.",
  "I built a webhook platform that handles millions of events, so I never have to think about a lost webhook again.",
  "Debugging soundtrack: lofi, always. There's an app for it on this desktop.",
];

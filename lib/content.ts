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
  // Emoji shown in the list and detail banner
  icon: string;
  // Theme hex used to tint the banner + stat tiles
  accent: string;
  // Headline numbers shown as stat tiles
  metrics?: { value: string; label: string }[];
  // Workflow / engineering highlights shown as bullets
  highlights?: string[];
  // ASCII architecture diagram, rendered in a mono <pre>
  architecture?: string;
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
    highlights: [
      "Agent loop with tool calling: KB search, Notion lookup, Slack replies, CRM writes — each tool call logged and replayable.",
      "Confidence gating: answers below threshold route to a human escalation queue instead of guessing.",
      "RAG over real company docs with chunking + embeddings, so answers cite sources instead of vibes.",
      "FastAPI service with async workers — inbox events stream in, nothing blocks on the LLM.",
    ],
    architecture: `Gmail / Slack / Web widget
        │ inbound message
        ▼
┌──────────────────┐    ┌───────────────────┐
│  Agent (LLM)     │◀──▶│ RAG: KB + Notion  │
│  plan → tools    │    │ embed · retrieve  │
└────────┬─────────┘    └───────────────────┘
         │
   confident? ──no──▶ human escalation queue
         │ yes
         ▼
   reply to customer ──▶ log to CRM`,
    icon: "🤖",
    accent: "#E8A33D",
    metrics: [
      { value: "70%", label: "auto-resolved" },
      { value: "<8s", label: "median reply" },
      { value: "100%", label: "logged to CRM" },
    ],
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
    highlights: [
      "Idempotency keys checked in Redis on the hot path — duplicate deliveries are dropped before they touch business logic.",
      "Exponential-backoff retry topics; events that fail N times land in a dead-letter queue with full failure context.",
      "Consumers are horizontally scalable Kafka groups; PostgreSQL holds durable event state and audit history.",
      "Load-tested at millions of events/day with zero lost or double-processed events.",
    ],
    architecture: `producers ──▶ ingest API ──▶ Kafka topics
                 │                  │
          idempotency check     consumer groups
           (Redis SETNX)            │
                          ┌─────────┴─────────┐
                          ▼                   ▼
                    PostgreSQL          retry topic
                   (durable state)    backoff ×N, then
                                          ▼
                                    dead-letter queue`,
    icon: "⚡",
    accent: "#02656A",
    metrics: [
      { value: "2M+/day", label: "events" },
      { value: "0", label: "lost events" },
      { value: "45ms", label: "p99 ingest" },
    ],
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
    highlights: [
      "Ingestion pipeline: PDF parsing → semantic chunking → embeddings → vector DB, incremental on re-upload.",
      "Two-stage retrieval: fast top-k vector search, then a cross-encoder reranker to keep the good chunks on top.",
      "Generates runnable code snippets from API docs, with the source chunks cited inline.",
      "Evaluation harness with a golden Q&A set — retrieval and answer quality tracked per release, not per vibe.",
    ],
    architecture: `PDFs / wikis ──▶ chunk ──▶ embed ──▶ vector DB
                                          │
question ──▶ embed ──▶ top-k ──▶ rerank ──┘
                                   │
                                   ▼
                     LLM: answer · code · citations
                                   │
              eval harness ◀── golden Q&A set`,
    icon: "📚",
    accent: "#9DBFA9",
    metrics: [
      { value: "10K+", label: "chunks indexed" },
      { value: "92%", label: "hit@5 retrieval" },
      { value: "+31%", label: "accuracy w/ rerank" },
    ],
    stack: ["Python", "Vector DB", "Embeddings", "Reranking", "Evals"],
    year: "2026",
    status: "shipped",
  },
  {
    id: "workflow-builder",
    name: "AI Workflow Builder",
    blurb: "Drag blocks, wire Gmail to Slack to an LLM, hit Run. Like n8n, but mine.",
    description:
      "A visual workflow engine: users drag blocks onto a canvas, connect Gmail, Slack, OpenAI and databases into a graph, and click Run. The interesting part is under the canvas — workflows compile to a DAG, the execution engine runs nodes in topological order with per-node retries and state checkpointing, and a scheduler triggers workflows on cron or webhooks.",
    highlights: [
      "Workflows compile to an execution DAG — cycles rejected at save time, independent branches run concurrently.",
      "Per-node retry policy and state checkpointing, so a failed step resumes instead of re-running the whole flow.",
      "Pluggable connector interface: Gmail, Slack, OpenAI and Postgres blocks share one contract.",
      "Cron + webhook triggers with an execution history UI for debugging past runs.",
    ],
    architecture: `canvas (drag blocks) ──▶ workflow DAG (JSON)
                              │ validate: no cycles
                              ▼
                    execution engine
             topological run · retries · checkpoints
                              │
        ┌──────────┬──────────┼──────────┐
        ▼          ▼          ▼          ▼
      Gmail      Slack      OpenAI    Postgres
                              ▲
        scheduler: cron · webhooks ──┘`,
    icon: "🧩",
    accent: "#E5928E",
    metrics: [
      { value: "DAG", label: "execution model" },
      { value: "per-node", label: "retries" },
      { value: "cron+hooks", label: "triggers" },
    ],
    stack: ["Python", "FastAPI", "React", "PostgreSQL", "Orchestration"],
    year: "2026",
    status: "in-progress",
  },
  {
    id: "code-review-bot",
    name: "AI Code Review Bot",
    blurb: "A reviewer that reads every PR, never gets tired, and never rubber-stamps.",
    description:
      "A GitHub App that wakes up on every pull request: it pulls the diff plus surrounding code for context, runs an LLM review pass and a security-check pass, then leaves inline comments where it found real issues and a summary comment on the PR. Tuned hard against noise — a bot that comments on everything gets muted in a week.",
    highlights: [
      "GitHub webhook → diff + context fetch: changed hunks are expanded with the surrounding functions so the LLM sees real code, not fragments.",
      "Two passes per PR: correctness/readability review and a security scan (injection, secrets, authz mistakes).",
      "Inline comments anchored to exact diff lines via the GitHub Checks API, plus a TL;DR summary comment.",
      "Confidence filter drops low-certainty findings — fewer, better comments beats a wall of nitpicks.",
    ],
    architecture: `PR opened ──▶ GitHub webhook ──▶ bot service
                                      │
                        fetch diff + surrounding code
                                      │
                     ┌────────────────┴───────────────┐
                     ▼                                ▼
              LLM review pass                 security scan pass
                     └────────────────┬───────────────┘
                                      ▼
                     confidence filter ──▶ inline comments
                                           + PR summary`,
    icon: "🔍",
    accent: "#E8A33D",
    metrics: [
      { value: "<3min", label: "pr turnaround" },
      { value: "2", label: "review passes" },
      { value: "~80%", label: "useful comments" },
    ],
    stack: ["Python", "GitHub API", "LLMs", "Static Analysis"],
    year: "2026",
    status: "shipped",
  },
  {
    id: "research-assistant",
    name: "Multi-Agent Research Assistant",
    blurb: "One question in. A team of agents fans out. One report comes back.",
    description:
      "Give it 'research AI startups in healthcare' and a planner agent breaks the question into sub-topics, then a fleet of worker agents divides the work: some search, some read sources, some summarize. A merge step deduplicates findings, resolves conflicts between agents, and assembles a single cited report. The hard part isn't the agents — it's making their output combine into something coherent.",
    highlights: [
      "Planner agent decomposes the question into sub-topics and spawns search / read / summarize workers per topic.",
      "Workers run in parallel with independent context windows — one bad tangent can't poison the rest.",
      "Merge stage deduplicates findings across agents and flags claims where sources disagree.",
      "Every claim in the final report links back to the source an agent actually read.",
    ],
    architecture: `"research X" ──▶ planner agent
                        │ splits into sub-topics
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
   search agents   reader agents   summarizer agents
        └───────────────┼───────────────┘
                        ▼
        merge: dedupe · resolve conflicts
                        │
                        ▼
              final report with citations`,
    icon: "🧠",
    accent: "#02656A",
    metrics: [
      { value: "3", label: "agent roles" },
      { value: "10×", label: "parallel workers" },
      { value: "100%", label: "claims cited" },
    ],
    stack: ["Python", "Multi-Agent", "LLMs", "Web Search"],
    year: "2026",
    status: "shipped",
  },
  {
    id: "mini-datadog",
    name: "Mini Datadog",
    blurb: "Watch your servers so your servers don't surprise you.",
    description:
      "A monitoring platform built the way the real ones are: OpenTelemetry agents collect metrics from every host, a collector ships them into Prometheus, alert rules fire on failures and threshold breaches, and Grafana dashboards make it all visible. Built to actually monitor my own projects — dogfooding is the whole point.",
    highlights: [
      "OpenTelemetry collectors on each host push CPU, memory, disk and app-level metrics on a scrape interval.",
      "Prometheus alert rules for the failures that matter: host down, error-rate spikes, disk filling up.",
      "Grafana dashboards per service, plus one 'is everything on fire?' overview board.",
      "Alertmanager routes pages to Slack with dedup and silencing, so one incident is one notification.",
    ],
    architecture: `servers ──▶ OTel agents ──▶ collector
                                  │ metrics
                                  ▼
                             Prometheus
                          │             │
                    alert rules      Grafana
                          │          dashboards
                          ▼
                   Alertmanager ──▶ Slack pages`,
    icon: "📈",
    accent: "#9DBFA9",
    metrics: [
      { value: "15s", label: "scrape interval" },
      { value: "8+", label: "alert rules" },
      { value: "1", label: "page per incident" },
    ],
    stack: ["Prometheus", "OpenTelemetry", "Grafana", "Docker"],
    year: "2026",
    status: "shipped",
  },
  {
    id: "uber-dispatch",
    name: "Uber Dispatch Simulator",
    blurb: "No frontend. Just the hard part: who picks you up, and what it costs.",
    description:
      "A dispatch engine simulator with zero UI and all systems: riders request trips, a geospatial index finds the nearest available drivers, surge pricing reacts to live demand-vs-supply per zone, and route optimization picks assignments that minimize total wait time. Everything is event-driven — requests, matches, pickups and completions all flow through one event log you can replay.",
    highlights: [
      "Geospatial hashing (H3-style cells) makes nearest-driver lookup O(neighborhood) instead of O(all drivers).",
      "Surge multiplier computed per zone from a sliding window of demand vs available supply.",
      "Matcher optimizes across simultaneous requests — greedy nearest-driver loses to batch assignment, measurably.",
      "Fully event-sourced: replay any simulation run to debug a weird pricing spike after the fact.",
    ],
    architecture: `ride request ──▶ geo index (hex cells)
                       │ candidate drivers
                       ▼
        batch matcher ──▶ assignment
             │
        surge engine ◀── demand/supply per zone
             │
             ▼
        pricing ──▶ dispatch event ──▶ event log
                                      (replayable)`,
    icon: "🚕",
    accent: "#E5928E",
    metrics: [
      { value: "-23%", label: "wait vs greedy" },
      { value: "O(cell)", label: "driver lookup" },
      { value: "100%", label: "replayable" },
    ],
    stack: ["Go", "Geospatial Indexing", "Event Sourcing"],
    year: "2026",
    status: "shipped",
  },
  {
    id: "dfs",
    name: "Distributed File Storage",
    blurb: "A mini Dropbox: your file, chunked, deduped, and living on three machines.",
    description:
      "A distributed storage system that takes a file, splits it into content-addressed chunks, dedupes chunks it has already seen, and replicates each one across three storage nodes. A metadata service tracks which chunks make up which file version and keeps reads consistent while nodes come and go. Losing a node loses nothing.",
    highlights: [
      "Content-addressed chunking: chunk ID = hash of contents, so identical data across files is stored exactly once.",
      "3× replication with rack-aware placement; a background repair loop re-replicates chunks when a node dies.",
      "Metadata service maps file → chunk list → node locations, with versioned writes for consistency.",
      "Read path verifies chunk hashes on the way out — silent corruption gets caught, not served.",
    ],
    architecture: `file ──▶ chunker ──▶ content hash per chunk
                     │ seen before? ──▶ dedup, skip upload
                     ▼
          storage nodes ×3 (replication)
                     ▲
              repair loop (re-replicate on node loss)
                     │
             metadata service
       file → chunks → locations · versions`,
    icon: "💾",
    accent: "#E8A33D",
    metrics: [
      { value: "3×", label: "replication" },
      { value: "4MB", label: "chunk size" },
      { value: "0", label: "bytes lost on failure" },
    ],
    stack: ["Go", "Distributed Systems", "Consistent Hashing"],
    year: "2025",
    status: "shipped",
  },
  {
    id: "infra-tool",
    name: "Terraform-style Infrastructure Tool",
    blurb: "`infra apply` — and your EC2, S3 and IAM exist. `infra apply` again — nothing happens. That's the point.",
    description:
      "A Python CLI that does what Terraform does, built to understand why Terraform is hard: declare EC2 instances, S3 buckets and IAM roles in a config file, run `infra apply`, and the tool diffs desired state against what actually exists in AWS, then creates, updates or deletes only what changed. Idempotent by construction — the second apply is a no-op.",
    highlights: [
      "State reconciliation: reads live AWS state, diffs against the config, and produces a plan before touching anything.",
      "`infra plan` shows the diff, `infra apply` executes it — creates, updates and deletes in dependency order.",
      "Local state file tracks managed resources, so the tool never touches infrastructure it didn't create.",
      "Failed applies roll back cleanly; partial state is recorded so a re-run converges instead of duplicating.",
    ],
    architecture: `infra.yaml ──▶ parser ──▶ desired state
                                    │
     AWS APIs ──▶ current state ──▶ diff engine
                                    │
                                    ▼
                        plan: create / update / delete
                                    │ dependency order
                                    ▼
                    apply ──▶ EC2 · S3 · IAM
                       │
                  state file (idempotent re-runs)`,
    icon: "🏗️",
    accent: "#02656A",
    metrics: [
      { value: "no-op", label: "second apply" },
      { value: "3", label: "aws services" },
      { value: "1 cmd", label: "plan → apply" },
    ],
    stack: ["Python", "AWS", "boto3", "CLI"],
    year: "2025",
    status: "shipped",
  },
  {
    id: "ai-coding-agent",
    name: "AI Coding Agent",
    blurb: "An agent that reads your whole codebase — not just the file you're in.",
    description:
      "An autonomous repository-intelligence agent that can reason across codebases past 100K lines. A Neo4j knowledge graph maps every file, import and function, and retrieval-augmented pipelines use it to localize bugs, analyze pull requests, and explain how the code actually fits together.",
    highlights: [
      "AST parsing builds a Neo4j graph of files, imports, functions and call edges across the whole repo.",
      "Bug localization walks the graph from a stack trace outward instead of grepping blind.",
      "Hybrid retrieval: graph traversal for structure, vector search for semantics.",
    ],
    architecture: `repo ──▶ AST parse ──▶ Neo4j knowledge graph
                            (files · imports · calls)
query ──▶ graph traversal + vector search
                     │
                     ▼
       LLM: bug localization · PR analysis
            · architecture explanations`,
    icon: "🕸️",
    accent: "#9DBFA9",
    metrics: [
      { value: "100K+", label: "loc reasoned over" },
      { value: "2-way", label: "graph + vector" },
      { value: "AST", label: "graph precision" },
    ],
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
    highlights: [
      "Append-only partitioned log with segment files and index-based lookups, like the real thing.",
      "Leader-based replication with in-sync replica tracking; partitions fail over when a broker dies.",
      "Consumer groups with rebalancing and committed offsets — the part that looks easy and isn't.",
    ],
    architecture: `producers ──▶ broker (partition leader)
                        │ append-only log
                        ▼
                 replicas (ISR set)
                        │ failover on broker death
                        ▼
                 consumer groups
           offset commits · rebalancing`,
    icon: "📨",
    accent: "#E5928E",
    metrics: [
      { value: "ISR", label: "replication" },
      { value: "auto", label: "partition failover" },
      { value: "0 deps", label: "pure go" },
    ],
    stack: ["Go"],
    year: "2025",
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

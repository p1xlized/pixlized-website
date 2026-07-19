// src/db/db.ts
// @ts-ignore
import { DatabaseSync } from "node:sqlite"

export const db = new DatabaseSync("local.db")

// ==========================================
// 1. TYPES & INTERFACES
// ==========================================

export interface Metric {
  label: string
  value: number
}

export interface Award {
  title: string
  organization: string
}

export interface Project {
  id: number
  title: string
  tech: string
  role: string
  date: string // Display format: "NOV_2024"
  releasedAt: string // ISO format: "2024-11-15" for sorting
  tag: "MOBILE" | "WEB" | "GAME"
  description: string
  cover: string
  imgs?: string[] // Array of images for the carousel
  githubUrl: string
  projectUrl?: string
  isVideo?: boolean
  videoUrl?: string
  features: string[]
  metrics: Metric[]
  awards?: Award[]
  isFeatured: boolean
  isPersonal: boolean
  stack: string[]
}

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 1,
    title: "GYMBUD",
    tech: "FLUTTER / SUPABASE / OPENAI",
    role: "Developer | AI Integration",
    date: "NOV_2024",
    releasedAt: "2024-11-15",
    tag: "MOBILE",
    description:
      "An AI fitness MVP featuring real-time adaptable workout logic powered by OpenAI and a gamified high-fidelity progression system.",
    cover: "/assets/projects/gymbud.jpg",
    imgs: [
      "/assets/projects/gymbud.jpg",
      "/assets/projects/gymbud2.gif",
      "https://media.licdn.com/dms/image/v2/D4E22AQFfuXKdQLPydg/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1732720938191?e=1775692800&v=beta&t=luBHskv9-mrN8LgIdWYzk-PBzvDABwxhxJee1pU4vnc",
    ],
    githubUrl: "https://github.com/Hackathon2024v2/frontend",
    features: [
      "Gamified Progression",
      "Real-Time advice",
      "AI nutrition advices",
    ],
    metrics: [
      { label: "HACKATHON_SPEED", value: 100 },
      { label: "UI_FIDELITY", value: 96 },
    ],
    awards: [
      { title: "3RD_PLACE_OVERALL", organization: "HACKATHON_2024" },
      { title: "BEST_DESIGN_AWARD", organization: "HACKATHON_2024" },
    ],
    isFeatured: true,
    isPersonal: true,
    stack: ["Flutter", "Supabase", "OpenAI"],
  },
  {
    id: 2,
    title: "BEERBOLTER",
    tech: "REACT / THREE.JS / SUPABASE",
    role: "Solo Developer",
    date: "FEB_2025",
    releasedAt: "2025-02-10",
    tag: "WEB",
    description:
      "High-performance 3D editor utilizing custom GLTF instancing and asset streaming pipelines for sub-second page loads.",
    cover: "/assets/projects/beerbolter.jpg",
    imgs: [
      "/assets/projects/beerbolter.jpg",
      "/assets/projects/beerbolter2.gif",
    ],
    githubUrl: "https://github.com/p1xlized/40k-homebrewer",
    features: ["GLTF_INSTANCING", "STREAMING_PIPELINE", "VERSION_CONTROL"],
    metrics: [
      { label: "Progress", value: 100 },
      { label: "LOAD_TIME_MS", value: 95 },
    ],
    isFeatured: true,
    isPersonal: true,
    stack: ["React", "Three.js", "Supabase"],
  },
  {
    id: 3,
    title: "KIRA",
    tech: "GODOT / GDSCRIPT",
    role: "GAME_DEVELOPER",
    tag: "GAME",
    date: "FEB_2025",
    releasedAt: "2025-02-20",
    description:
      "A gorgeous 2D atmospheric game engine utilizing modular GDScript nodes to orchestrate over 300 active objects in real-time.",
    cover: "/assets/projects/kira1.jpg",
    imgs: ["/assets/projects/kira1.jpg", "/assets/projects/kira3.jpg"],
    githubUrl: "https://github.com/p1xlized/kira-from-light-to-darkness",
    features: ["Interactive World", "Enemy AI", "Varied Environments"],
    metrics: [{ label: "Progress", value: 100 }],
    isFeatured: false,
    isPersonal: true,
    stack: ["Godot", "GDScript"],
  },
  {
    id: 4,
    title: "Rancher's delight",
    tech: "Java / FXGL / JavaFX",
    role: "GAME_DEVELOPER",
    date: "MARCH_2026",
    releasedAt: "2026-03-05",
    tag: "GAME",
    description:
      "Cozy procedural farming simulation exploring game architecture boundaries using JavaFX rendering engines.",
    cover: "/assets/projects/RNCHDL4.jpg",
    imgs: [
      "/assets/projects/RNCHDL4.jpg",
      "/assets/projects/RNCHDL3.jpg",
      "/assets/projects/RNCHDL2.jpg",
      "/assets/projects/RNCHDL1.jpg",
    ],
    githubUrl: "https://github.com/p1xlized/rancher-s-delight",
    features: ["Randomly generated interactive map", "3 save slots "],
    metrics: [
      { label: "MAP_FIDELITY", value: 100 },
      { label: "UI_FIDELITY", value: 96 },
    ],
    isFeatured: true,
    isPersonal: true,
    stack: ["Java", "FXGL", "JavaFX"],
  },
  {
    id: 5,
    title: "Junction Hack",
    tech: "ElysiaJS / Unity / OLLAMA",
    role: "GAME_DEVELOPER & AI integration",
    date: "NOVEMBER_2025",
    releasedAt: "2025-11-15",
    tag: "GAME",
    description:
      "Procedural game built for the Junction Hackathon, leveraging local LLMs (Ollama) to synthesize adaptive narrative mechanics.",
    cover: "/assets/projects/junc2025.jpg",
    isVideo: true,
    videoUrl: "https://www.youtube.com/embed/8T6qDzPPie0?si=IOcL2TV_2sMHd9En",
    githubUrl: "https://github.com/orgs/Junction-The-Chosen-Ones/repositories",
    features: ["Randomly generated interactive map", "3 save slots "],
    metrics: [
      { label: "AI_efficiency", value: 100 },
      { label: "Data>Population_Time", value: 20 },
    ],
    isFeatured: true,
    isPersonal: true,
    stack: ["ElysiaJS", "Unity", "OLLAMA"],
  },
  {
    id: 6,
    title: "Aalto Defense",
    tech: "OpenCV / Python / FastAPI / Gemini API",
    role: "Developer & AI integration",
    date: "MAY_2026",
    releasedAt: "2026-05-10",
    tag: "WEB",
    description:
      "Autonomous threat-assessment engine mapping weather, elevation profiles, and OpenCV tracking telemetry for instant geospatial directives.",
    cover: "/assets/projects/defense.png",
    isVideo: true,
    videoUrl: "https://www.youtube.com/embed/oK_Lz4J4iMU?si=9BQd1aX_3t-M2ePT",
    githubUrl: "https://github.com/romanButkus/TactisHackathon",
    features: [
      "Real-time object-detection simulation",
      "Automated multi-sector threat level matrix",
      "Geospatial data analysis",
    ],
    metrics: [
      { label: "AI_efficiency", value: 100 },
      { label: "Data>Population_Time", value: 20 },
    ],
    isFeatured: true,
    isPersonal: true,
    stack: ["Python", "FastAPI", "OpenCV", "Gemini API"],
  },
  {
    id: 7,
    title: "City Life",
    tech: "React Native / Supabase / City of Montreal API",
    role: "Solo Developer",
    date: "FEB_2023",
    releasedAt: "2023-02-15",
    tag: "MOBILE",
    description:
      "Native mobile app resolving complex city APIs to deliver seamless interactive transit, municipal notifications, and service schedules.",
    cover: "/assets/projects/city.jpg",
    imgs: ["/assets/projects/city.jpg"],
    githubUrl: "https://github.com/p1xlized/Hackathon2024App",
    features: [
      "Avaliable Services",
      "Dynamic Billboard",
      "Extensible API Integration",
    ],
    metrics: [
      { label: "Progress", value: 100 },
      { label: "USABILITY", value: 95 },
    ],
    isFeatured: true,
    isPersonal: true,
    stack: ["React Native", "Supabase"],
  },
]
db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    tech TEXT NOT NULL,
    role TEXT NOT NULL,
    date TEXT NOT NULL,
    releasedAt TEXT NOT NULL,
    tag TEXT NOT NULL,            -- 'MOBILE' | 'WEB' | 'GAME'
    description TEXT NOT NULL,
    cover TEXT NOT NULL,          -- Main thumbnail cover url
    imgs TEXT,                    -- JSON stringified array of multiple images
    githubUrl TEXT NOT NULL,
    projectUrl TEXT,
    isVideo INTEGER DEFAULT 0,    -- Boolean stored as 1 or 0
    videoUrl TEXT,
    features TEXT,                -- JSON stringified array of string features
    metrics TEXT,                 -- JSON stringified array of Metric objects
    awards TEXT,                  -- JSON stringified array of Award objects
    isFeatured INTEGER DEFAULT 0, -- Boolean stored as 1 or 0
    isPersonal INTEGER DEFAULT 1, -- Boolean stored as 1 or 0
    stack TEXT NOT NULL           -- JSON stringified array of technologies
  );
`)

const checkTable = db
  .prepare("SELECT COUNT(*) as count FROM projects")
  .get() as { count: number }

// Seed database with the complete projects list if empty
if (checkTable.count === 0) {
  const insertStatement = db.prepare(`
    INSERT INTO projects (
      title, tech, role, date, releasedAt, tag, description, cover, imgs,
      githubUrl, projectUrl, isVideo, videoUrl, features, metrics, awards,
      isFeatured, isPersonal, stack
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  for (const project of INITIAL_PROJECTS) {
    insertStatement.run(
      project.title,
      project.tech,
      project.role,
      project.date,
      project.releasedAt,
      project.tag,
      project.description,
      project.cover,
      project.imgs ? JSON.stringify(project.imgs) : null,
      project.githubUrl,
      project.projectUrl || null,
      project.isVideo ? 1 : 0,
      project.videoUrl || null,
      JSON.stringify(project.features),
      JSON.stringify(project.metrics),
      project.awards ? JSON.stringify(project.awards) : null,
      project.isFeatured ? 1 : 0,
      project.isPersonal ? 1 : 0,
      JSON.stringify(project.stack)
    )
  }

  console.log("Portfolio database seeded with all projects!")
}

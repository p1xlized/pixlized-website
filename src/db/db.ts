import type { D1Database } from "@cloudflare/workers-types"

export interface Metric {
  label: string
  value: number
}

export interface Award {
  title: string
  organization: string
}

export interface MusicTrack {
  id: number
  title: string
  genre: string
  duration: string
  bpm: string
  description: string
  file: string
  createdAt: string
  albumId: number
}

export interface Album {
  id: number
  title: string
  description: string
  cover: string
  createdAt: string
}

export interface Project {
  id: number
  title: string
  tech: string
  role: string
  date: string
  releasedAt: string
  tag: "MOBILE" | "WEB" | "GAME"
  description: string
  cover: string
  imgs?: string[]
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

export const INITIAL_MUSIC_TRACKS: MusicTrack[] = [
  {
    id: 1,
    title: "15.10.22",
    genre: "Ambient",
    duration: "3:45",
    bpm: "120",
    description: "Atmospheric ambient soundscape",
    file: "/assets/music/15.10.22.mp3",
    createdAt: "2022-10-15",
    albumId: 1,
  },
  {
    id: 2,
    title: "Ambient",
    genre: "Ambient",
    duration: "4:20",
    bpm: "110",
    description: "Smooth ambient textures",
    file: "/assets/music/ambient.mp3",
    createdAt: "2022-10-16",
    albumId: 1,
  },
  {
    id: 3,
    title: "Beauty",
    genre: "Cinematic",
    duration: "5:15",
    bpm: "90",
    description: "Beautiful cinematic composition",
    file: "/assets/music/beauty.mp3",
    createdAt: "2022-10-17",
    albumId: 1,
  },
  {
    id: 4,
    title: "Bleach",
    genre: "Electronic",
    duration: "4:50",
    bpm: "128",
    description: "High-energy electronic track",
    file: "/assets/music/bleach.mp3",
    createdAt: "2022-10-18",
    albumId: 1,
  },
  {
    id: 5,
    title: "Cyberpunk",
    genre: "Cyberpunk",
    duration: "5:30",
    bpm: "135",
    description: "Futuristic cyberpunk vibes",
    file: "/assets/music/cyberpunk.mp3",
    createdAt: "2022-10-19",
    albumId: 1,
  },
  {
    id: 6,
    title: "Killa",
    genre: "Hip-Hop",
    duration: "3:25",
    bpm: "95",
    description: "Hard-hitting hip-hop track",
    file: "/assets/music/killa.mp3",
    createdAt: "2022-10-25",
    albumId: 1,
  },
  {
    id: 7,
    title: "Weird Things",
    genre: "Experimental",
    duration: "5:00",
    bpm: "105",
    description: "Experimental weird sounds",
    file: "/assets/music/weird_things.mp3",
    createdAt: "2022-10-27",
    albumId: 1,
  },
  {
    id: 8,
    title: "World Eater",
    genre: "Dark",
    duration: "3:50",
    bpm: "118",
    description: "World-eating dark ambient",
    file: "/assets/music/world_eater.mp3",
    createdAt: "2022-10-28",
    albumId: 1,
  },
  {
    id: 9,
    title: "Darkness",
    genre: "Dark",
    duration: "4:10",
    bpm: "115",
    description: "Dark atmospheric sounds",
    file: "/assets/music/darkness.mp3",
    createdAt: "2022-10-20",
    albumId: 2,
  },
  {
    id: 10,
    title: "Eldrich Horror",
    genre: "Horror",
    duration: "3:55",
    bpm: "100",
    description: "Eldritch horror atmosphere",
    file: "/assets/music/eldrich_horror.mp3",
    createdAt: "2022-10-21",
    albumId: 2,
  },
  {
    id: 11,
    title: "Force",
    genre: "Electronic",
    duration: "4:40",
    bpm: "125",
    description: "Powerful electronic forces",
    file: "/assets/music/force.mp3",
    createdAt: "2022-10-22",
    albumId: 2,
  },
  {
    id: 12,
    title: "Heretic Leader",
    genre: "Orchestral",
    duration: "6:20",
    bpm: "140",
    description: "Epic orchestral heretic theme",
    file: "/assets/music/heretic_leader.mp3",
    createdAt: "2022-10-23",
    albumId: 2,
  },
  {
    id: 13,
    title: "Heretic",
    genre: "Orchestral",
    duration: "6:05",
    bpm: "130",
    description: "Heretic orchestral composition",
    file: "/assets/music/heretic.mp3",
    createdAt: "2022-10-24",
    albumId: 2,
  },
  {
    id: 14,
    title: "Wall of Sound",
    genre: "Electronic",
    duration: "3:15",
    bpm: "138",
    description: "Massive wall of sound",
    file: "/assets/music/wall_of_sound.mp3",
    createdAt: "2022-10-26",
    albumId: 2,
  },
]

export const INITIAL_ALBUMS: Album[] = [
  {
    id: 1,
    title: "Old Demos",
    description: "Early experimental tracks and demos",
    cover: "/assets/music/cover-ambient.jpg",
    createdAt: "2022-10-15",
  },
  {
    id: 2,
    title: "Dance on the Graves",
    description: "Dark electronic and orchestral compositions",
    cover: "/assets/music/cover-orchestral.jpg",
    createdAt: "2022-10-20",
  },
]

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

// ==========================================
// ASYNC D1 DATA ACCESS HELPERS
// ==========================================

export async function getProjects(
  d1: D1Database | undefined
): Promise<Project[]> {
  if (!d1) {
    return INITIAL_PROJECTS
  }
  const { results } = await d1
    .prepare("SELECT * FROM projects ORDER BY releasedAt DESC")
    .all()
  return (results || []).map((row: any) => ({
    ...row,
    imgs: row.imgs ? JSON.parse(row.imgs) : [],
    features: row.features ? JSON.parse(row.features) : [],
    metrics: row.metrics ? JSON.parse(row.metrics) : [],
    awards: row.awards ? JSON.parse(row.awards) : [],
    stack: row.stack ? JSON.parse(row.stack) : [],
    isVideo: Boolean(row.isVideo),
    isFeatured: Boolean(row.isFeatured),
    isPersonal: Boolean(row.isPersonal),
  }))
}

export async function getAlbums(d1: D1Database | undefined): Promise<Album[]> {
  if (!d1) {
    return INITIAL_ALBUMS
  }
  const { results } = await d1.prepare("SELECT * FROM albums").all()
  return (results as Album[]) || []
}

export async function getMusicTracks(
  d1: D1Database | undefined
): Promise<MusicTrack[]> {
  if (!d1) {
    return INITIAL_MUSIC_TRACKS
  }
  const { results } = await d1.prepare("SELECT * FROM music_tracks").all()
  return (results as MusicTrack[]) || []
}

// Helper function for custom queries
export async function query(
  d1: D1Database | undefined,
  sql: string,
  params?: any[]
): Promise<any> {
  if (!d1) {
    console.warn("D1 database not available, returning empty array")
    return []
  }
  const statement = d1.prepare(sql)
  if (params) {
    return statement.all(...params)
  }
  return statement.all()
}

// Helper function for custom query with single result
export async function queryOne(
  d1: D1Database | undefined,
  sql: string,
  params?: any[]
): Promise<any> {
  if (!d1) {
    console.warn("D1 database not available, returning undefined")
    return undefined
  }
  const statement = d1.prepare(sql)
  if (params) {
    return statement.get(...params)
  }
  return statement.get()
}

// Helper function for insert
export async function insert(
  d1: D1Database | undefined,
  sql: string,
  params: any[]
): Promise<{ lastInsertRowid: number }> {
  if (!d1) {
    console.warn("D1 database not available, cannot insert")
    return { lastInsertRowid: -1 }
  }
  const statement = d1.prepare(sql)
  const result = statement.run(...params)
  return { lastInsertRowid: result.lastInsertRowid }
}

// Helper function for update/delete
export async function execute(
  d1: D1Database | undefined,
  sql: string,
  params: any[]
): Promise<void> {
  if (!d1) {
    console.warn("D1 database not available, cannot execute")
    return
  }
  const statement = d1.prepare(sql)
  statement.run(...params)
}

// Utility to safely get D1 database from Astro locals
export function getD1(): D1Database | undefined {
  // Check if we're in Astro context with locals
  if (typeof Astro !== "undefined" && Astro.locals?.runtime?.env) {
    return Astro.locals.runtime.env.CF_D1_DB
  }
  return undefined
}

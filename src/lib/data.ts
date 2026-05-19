export interface Testimonial {
  id: string;
  author: string;
  role: string;
  project: string;
  date: string;
  content: string;
  hash: string;
}

export interface Track {
  name: string;
  description: string;
  audioUrl: string;
  duration: number; // in seconds
  trackNumber: number;
}

export interface Album {
  id: string;
  name: string;
  description: string;
  releaseDate: string;
  genre: string;
  coverUrl: string;
  tracks: Track[];
}

export interface Metric {
  label: string;
  value: number;
}

export interface Award {
  title: string;
  organization: string;
}

export interface Project {
  id: number;
  title: string;
  tech: string;
  role: string;
  date: string; // Display format: "NOV_2024"
  releasedAt: string; // ISO format: "2024-11-15" for sorting
  tag: "MOBILE" | "WEB" | "GAME";
  description: string;
  cover: string;
  imgs?: string[];
  githubUrl: string;
  projectUrl?: string;
  isVideo?: boolean;
  videoUrl?: string;
  features: string[];
  metrics: Metric[];
  awards?: Award[];
  isFeatured: boolean;
  isPersonal: boolean;
  stack: string[];
}

export interface PortfolioData {
  testimonials: Testimonial[];
  albums: Album[];
  projects: Project[];
}

/**
 * STATIC DATA ASSET
 */

export const PORTFOLIO_DATA: PortfolioData = {
  testimonials: [
    {
      id: "U-01",
      author: "Arslan R.",
      role: "Upworks client",
      project: "React Developer for AI-Integrated Storefront",
      date: "2026.02.21",
      content:
        "Alex is a highly skilled IT professional who consistently delivers top-tier results. As a freelancer, his technical expertise and commitment to meeting deadlines made a huge difference in our project. I highly recommend his services.",
      hash: "0x88_SEC_ALPHA",
    },
    {
      id: "U-03",
      author: "Saad B.",
      role: "Full-Stack Dev",
      project: "E-commerce Platform Development",
      date: "2026.01.05",
      content:
        "Alex is one of those rare freelancers who combines deep technical knowledge with great communication. He made a massive impact on our latest launch, ensuring everything was optimized and delivered without a hitch. A total pro through and through.",
      hash: "0xFF_OPT_GAMMA",
    },
  ],
  albums: [
    {
      id: "album-01",
      name: "They will dance on our graves",
      description:
        "A of agressive , dejnty, agressive soundrack design to accompany the apocalyptic vibes of hopelessness and space horror. Ispired alot by Mick Gordon's work on DOOM and Cyberpunk 2077, this album is a sonic journey through the darkest corners of the universe, where despair meets defiance in a relentless battle for survival.",
      releaseDate: "2026-01-15",
      genre: "Argent Metal / Metal / Industrial Metal",
      coverUrl: "/assets/cover_art/skeletons.gif",
      tracks: [
        {
          name: "Souless Machine",
          description:
            "Distorted basslines and glitchy synths, that embody a mechanical monstrosity devoid of humanity, relentlessly grinding through the void with an unyielding, soulless rhythm.",
          audioUrl: "/assets/music/world_eater.mp3",
          duration: 59,
          trackNumber: 1,
        },
        {
          name: "Death from Above",
          description:
            "It represents an overwhelming, unstoppable force descending upon its victims with relentless aggression, embodying the sheer power and inevitability of destruction from the skies.",
          audioUrl: "/assets/music/force.mp3",
          duration: 97,
          trackNumber: 2,
        },
        {
          name: "Metalic Flesh",
          description:
            "It represents the fusion of organic and inorganic elements, where the cold, unyielding nature of metal intertwines with the vulnerability and rawness of flesh, creating a haunting and visceral sonic experience.",
          audioUrl: "/assets/music/bleach.mp3",
          duration: 112,
          trackNumber: 3,
        },
        {
          name: "The Lord of the Swarm",
          description: "The sound of a successful build.",
          audioUrl: "/assets/music/heretic.mp3",
          duration: 158,
          trackNumber: 4,
        },
        {
          name: "Elrdich Horror",
          description: "The sound of a successful build.",
          audioUrl: "/assets/music/eldrich_horror.mp3",
          duration: 62,
          trackNumber: 5,
        },
        {
          name: "Heretic",
          description: "The sound of a successful build.",
          audioUrl: "/assets/music/heretic_leader.mp3",
          duration: 62,
          trackNumber: 6,
        },
        {
          name: "Heretic",
          description: "The sound of a successful build.",
          audioUrl: "/assets/music/darkness.mp3",
          duration: 108,
          trackNumber: 7,
        },
      ],
    },
    {
      id: "album-02",
      name: "Old Demos",
      description:
        "A collection of my old experimental demos. It has different array of genres and styles, but it all has that raw, unpolished energy that I love. It's a snapshot of my creative process and a testament to the power of experimentation in music.",
      releaseDate: "2024-01-15",
      genre: "Electro Pop / Electronic / Wxperimental",
      coverUrl: "/assets/cover_art/sun.gif",
      tracks: [
        {
          name: "Beauty",
          description:
            "Melodic synths coupled with a driving beat, creating an uplifting and euphoric atmosphere that celebrates the beauty of life and the joy of music.",
          audioUrl: "/assets/music/beauty.mp3",
          duration: 184,
          trackNumber: 1,
        },
        {
          name: "ambient",
          description:
            "This is a simple ambient, I made it for my video games idea and ended up not using it, but I still like it so here it is.",
          audioUrl: "/assets/music/ambient.mp3",
          duration: 210,
          trackNumber: 2,
        },
        {
          name: "Cyberpunk",
          description:
            "I made this song after playing Cyberpunk 2077, I like that it feels this distopian cybernetic athmosphere.",
          audioUrl: "/assets/music/cyberpunk.mp3",
          duration: 210,
          trackNumber: 3,
        },
        {
          name: "Wall of Sound",
          description:
            "Very dreamy song when first part is typical shoegaze, while second part is raw and has a jungle vibe, I like the contrast between the two parts and how they blend together.",
          audioUrl: "/assets/music/wall_of_sound.mp3",
          duration: 210,
          trackNumber: 4,
        },
        {
          name: "Killa",
          description: "Metal/phonk song, no more comments needed",
          audioUrl: "/assets/music/killa.mp3",
          duration: 210,
          trackNumber: 5,
        },
        {
          name: "Weird Things",
          description:
            "Experimental song, I coupled low tuned guitar with agressive synths, and this is what came out.",
          audioUrl: "/assets/music/weird_things.mp3",
          duration: 210,
          trackNumber: 6,
        },
      ],
    },
  ],
  projects: [
    {
      id: 1,
      title: "GYMBUD",
      tech: "FLUTTER / SUPABASE / OPENAI",
      role: "Developer | AI Integration",
      date: "NOV_2024",
      releasedAt: "2024-11-15",
      tag: "MOBILE",
      description:
        "Led a 5-person team in a 24-hour hackathon to build an AI fitness MVP, implementing real-time adaptable workout logic via OpenAI and architecting a high-fidelity, gamified progression system.",
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
        "High-performance 3D editor featuring a custom streaming pipeline that achieves sub-one-second load times. Optimized rendering through GLTF instancing and asset management.",
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
        "2D exploration game from scratch featuring dynamic environment logic and custom modular architecture managing 300+ concurrent objects.",
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
        "A cozy, procedurally generated farming simulator built to explore the boundaries of JavaFX game development. Escape to a unique island to plant, grow, and harvest your way to a tranquil life.",
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
        "A cozy, procedurally generated farming simulator built to explore the boundaries of JavaFX game development. Escape to a unique island to plant, grow, and harvest your way to a tranquil life.",
      cover: "/assets/projects/junc2025.jpg",
      isVideo: true,
      videoUrl: "https://www.youtube.com/embed/8T6qDzPPie0?si=IOcL2TV_2sMHd9En",
      githubUrl:
        "https://github.com/orgs/Junction-The-Chosen-Ones/repositories",
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
      title: "Aalto Defense & Junction Hackathon",
      tech: "OpenCV / Python / FastAPI / Gemini API",
      role: "Developer & AI integration",
      date: "MAY_2026",
      releasedAt: "2026-05-10",
      tag: "WEB",
      description:
        "An automated regional intelligence engine designed for autonomous drone operations. By ingesting macro weather conditions, topographic elevation profiles, and object-detection telemetry, the system chains specialized LLM analytical prompts to generate real-time military-grade threat assessments. It synthesizes complex geospatial layers into a single, cohesive operational directive, providing mission commanders with instantaneous overall risk scores and actionable flight recommendations across multiple strategic sectors.",
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
        "High-performance 3D editor featuring a custom streaming pipeline that achieves sub-one-second load times. Optimized rendering through GLTF instancing and asset management.",
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
  ],
};

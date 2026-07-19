import { DatabaseSync } from "node:sqlite"

// Opens or creates the local SQLite database file in your project root
export const db = new DatabaseSync("local.db")

// 1. Create the projects table structure if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    tags TEXT NOT NULL,
    image TEXT,
    link TEXT NOT NULL,
    featured INTEGER DEFAULT 0
  );
`)

// 2. Check if the table is currently empty
const checkTable = db
  .prepare("SELECT COUNT(*) as count FROM projects")
  .get() as { count: number }

if (checkTable.count === 0) {
  // 3. Define your initial data
  const initialProjects = [
    {
      title: "EcoTrack API",
      description:
        "A lightweight carbon tracking API built with Go, SQLite, and Docker. Implements sub-millisecond response times.",
      tags: ["Go", "SQLite", "Docker"],
      link: "https://github.com",
      image:
        "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=600&q=80",
      featured: 1,
    },
    {
      title: "Zen-Writer",
      description:
        "A minimalist, offline-first Markdown editor for focused writing with local-storage auto-saving.",
      tags: ["Astro", "Tailwind", "React"],
      link: "https://github.com",
      image:
        "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=600&q=80",
      featured: 1,
    },
    {
      title: "Deno Edge Cache",
      description:
        "An experimental middleware layer optimized for low-latency header parsing on edge runtimes.",
      tags: ["Deno", "TypeScript"],
      link: "https://github.com",
      image:
        "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=600&q=80",
      featured: 0,
    },
    {
      title: "Git-Sync Engine",
      description:
        "A background daemon written in Rust to automatically push local directories securely to private git nodes.",
      tags: ["Rust", "Git"],
      link: "https://github.com",
      image:
        "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=600&q=80",
      featured: 0,
    },
  ]

  // 4. Prepare the insert statement
  const insertStatement = db.prepare(`
    INSERT INTO projects (title, description, link, image, tags, featured)
    VALUES (?, ?, ?, ?, ?, ?)
  `)

  // 5. Run the transaction loop to seed data cleanly
  for (const project of initialProjects) {
    insertStatement.run(
      project.title,
      project.description,
      project.link,
      project.image,
      JSON.stringify(project.tags), // SQLite stores arrays best as stringified JSON strings
      project.featured
    )
  }

  console.log(
    "Database initialized and seeded with starter projects successfully!"
  )
}

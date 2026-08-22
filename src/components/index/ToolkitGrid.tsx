import {
  Typescript,
  Java,
  Python,
  CSharp,
  Rust,
  Astro,
  React,
  Nextjs,
  Godot,
  Unity,
  Flutter,
  Git,
  Docker,
  Prisma,
  TailwindCss,
  Openai,
  Ollama,
  Gemini,
  Langchain
} from "@thesvg/react"

interface Tool {
  name: string
  icon: React.ComponentType<{ className?: string; variant?: string; fill?: string }>
  variant?: string
}

const tools: Tool[] = [
  { name: "TypeScript", icon: Typescript, variant: "mono" },
  { name: "Java", icon: Java },
  { name: "Python", icon: Python, variant: "mono" },
  { name: "C#", icon: CSharp },
  { name: "Rust", icon: Rust, variant: "mono" },
  { name: "Astro", icon: Astro, variant: "mono" },
  { name: "React", icon: React, variant: "mono" },
  { name: "Next.js", icon: Nextjs },
  { name: "Godot", icon: Godot, variant: "mono" },
  { name: "Unity", icon: Unity, variant: "mono" },
  { name: "Flutter", icon: Flutter, variant: "mono" },
  { name: "Git", icon: Git, variant: "mono" },
  { name: "Docker", icon: Docker, variant: "mono" },
  { name: "Prisma", icon: Prisma, variant: "mono" },
  { name: "Tailwind", icon: TailwindCss },
  { name: "OpenAI", icon: Openai },
  { name: "Ollama", icon: Ollama, variant: "mono" },
  { name: "Gemini", icon: Gemini },
  { name: "LangChain", icon: Langchain, variant: "mono" },
]

export default function ToolkitGrid() {
  return (
    <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
      {tools.map((tool) => (
        <div
          key={tool.name}
          className="group flex flex-col items-center justify-center rounded-lg border border-border/60 bg-secondary/30 p-3 transition-all duration-200 hover:border-primary/50 hover:bg-secondary/60 hover:shadow-md"
          title={tool.name}
        >
          <div className="h-6 w-6 text-foreground transition-all duration-200 group-hover:scale-125 group-hover:text-primary group-hover:drop-shadow-md">
            <tool.icon
              className="w-full h-full"
              fill="currentColor"
              variant={tool.variant}
            />
          </div>
          <span className="mt-1 font-mono text-[8px] text-muted-foreground/80 group-hover:text-primary">
            {tool.name}
          </span>
        </div>
      ))}
    </div>
  )
}

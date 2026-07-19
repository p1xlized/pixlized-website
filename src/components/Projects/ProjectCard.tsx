import type { Project } from "@/db/db"

interface ProjectCardProps {
  project: Project
  onSelect: (project: Project) => void
  layoutSize?: "small" | "medium" | "large"
}

export function ProjectCard({
  project,
  onSelect,
  layoutSize = "medium",
}: ProjectCardProps) {
  // --- MOBILE LIST VIEW RENDERING ---
  if (layoutSize === "small") {
    return (
      <button
        onClick={() => onSelect(project)}
        className="group flex w-full items-center gap-4 py-1 text-left focus:outline-none"
      >
        {/* Compact left side Thumbnail */}
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
          <img
            src={project.cover}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Dynamic center content */}
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-extrabold tracking-wider text-primary uppercase">
              {project.isPersonal ? "Personal" : "Professional"}
            </span>
            <span className="text-[9px] text-muted-foreground/40">•</span>
            <span className="font-mono text-[9px] text-muted-foreground">
              {project.date}
            </span>
          </div>
          <h3 className="truncate text-sm font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
            {project.title}
          </h3>
          <p className="line-clamp-1 text-xs text-muted-foreground">
            {project.description}
          </p>
        </div>

        {/* Subtle Right Arrow indicator */}
        <div className="shrink-0 pr-1 text-muted-foreground/50 transition-colors group-hover:text-primary">
          <span className="font-mono text-sm">→</span>
        </div>
      </button>
    )
  }

  // --- DESKTOP ASPECT SQUARE GRID RENDERING ---
  return (
    <button
      onClick={() => onSelect(project)}
      className="group rounded-xsborder relative flex aspect-square w-full flex-col overflow-hidden border-border bg-card text-left text-foreground transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 focus:ring-2 focus:ring-primary/40 focus:outline-none"
    >
      {/* 1. Cover Image */}
      <div className="absolute inset-0 z-0 h-full w-full bg-muted">
        <img
          src={project.cover}
          alt={project.title}
          className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-[0.25]"
        />
        {/* Dark subtle overlay for consistent readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/45 to-transparent opacity-100 transition-opacity duration-300 group-hover:opacity-20" />
      </div>

      {/* 2. Top corner tags */}
      <div className="absolute top-3 right-3 z-20 flex flex-wrap items-center justify-end gap-1.5">
        {project.isVideo && (
          <span className="rounded bg-red-600 px-1.5 py-0.5 text-[8px] font-extrabold tracking-wider text-white uppercase shadow-sm">
            VIDEO
          </span>
        )}
        <span className="rounded border border-primary/20 bg-background/95 px-1.5 py-0.5 text-[8px] font-extrabold tracking-wider text-primary uppercase shadow-sm backdrop-blur-sm">
          {project.tag}
        </span>
      </div>

      {/* 3. Static metadata view */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-4 transition-all duration-300 group-hover:translate-y-4 group-hover:opacity-0">
        <div className="flex items-center justify-between text-[8px] font-bold tracking-wider text-muted-foreground uppercase">
          <span className="font-black text-primary/90">
            {project.isPersonal ? "Personal" : "Professional"}
          </span>
          <span className="font-mono">{project.date}</span>
        </div>
        <h3 className="mt-1.5 truncate text-sm font-bold tracking-tight text-white drop-shadow-sm">
          {project.title}
        </h3>
      </div>

      {/* 4. Hover deep metadata context */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
        <div />
        <div className="translate-y-4 space-y-2 transition-transform duration-300 group-hover:translate-y-0">
          <p className="line-clamp-4 text-xs leading-relaxed font-medium text-slate-200">
            {project.description}
          </p>
          <div className="flex items-center justify-between border-t border-white/10 pt-1.5">
            <span className="font-mono text-[8px] text-slate-400">
              {project.date}
            </span>
            <span className="text-[9px] font-black tracking-wider text-primary uppercase">
              VIEW DETAILS →
            </span>
          </div>
        </div>
      </div>
    </button>
  )
}

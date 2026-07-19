import type { Project } from "@/db/db"
import AssetViewer from "../AssetViewer"

interface ProjectDetailsProps {
  project: Project
  onBack: () => void
}

export function ProjectDetails({ project, onBack }: ProjectDetailsProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 flex h-full max-h-[calc(100vh-1rem)] flex-col space-y-4 overflow-hidden p-2 duration-200 select-none">
      {/* 1. TOP UTILITY HEADER */}
      <div className="flex shrink-0 items-center justify-between border-b border-border/40 pb-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold tracking-tight text-muted-foreground transition-colors hover:text-primary"
        >
          <span className="text-sm">←</span> Back to projects
        </button>

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
        >
          Repository ↗
        </a>
      </div>

      {/* 2. TOP SECTION: ASSET MEDIA (LEFT) & METRIC SPECS (RIGHT) */}
      <div className="grid min-h-0 flex-[2] grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Left Video/Image Asset Frame - Scaled up base height */}
        <div className="flex h-full min-h-[300px] flex-col lg:col-span-8 lg:min-h-0">
          <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded-xl border border-border/50 bg-muted/10 shadow-md">
            <AssetViewer project={project} />
          </div>
        </div>

        {/* Right Stats Dashboard Frame - Increased spacing and font sizes */}
        <div className="flex h-full flex-col justify-start space-y-4 overflow-y-auto rounded-xl border border-border/40 bg-card/20 p-4 lg:col-span-4">
          {/* Status Indicators */}
          <div className="flex items-center justify-between border-b border-border/30 pb-2 font-mono text-[10px] tracking-wider">
            <span className="font-bold text-muted-foreground">
              ENGINE STATUS:
            </span>
            <span className="flex animate-pulse items-center gap-1 font-black text-primary">
              <span className="inline-block h-2 w-2 rounded-full bg-primary"></span>{" "}
              ONLINE
            </span>
          </div>

          {/* Metrics Data Widgets */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {project.metrics.map((m, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border/20 bg-background/50 p-3 shadow-sm"
                >
                  <div className="truncate font-mono text-[9px] font-bold tracking-wider text-muted-foreground uppercase">
                    {m.label.replace(/_/g, " ")}
                  </div>
                  <div className="mt-1 text-xl font-black tracking-tight text-primary">
                    {m.value}%
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Accolades Banner */}
          {project.awards && project.awards.length > 0 && (
            <div className="space-y-2 pt-2">
              <div className="text-[9px] font-black tracking-widest text-yellow-600/90 uppercase">
                Accolades
              </div>
              <div className="space-y-1.5">
                {project.awards.map((award, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 rounded-lg border border-yellow-500/15 bg-yellow-500/5 px-3 py-1.5 text-xs font-semibold text-yellow-600"
                  >
                    <span>🏆</span>
                    <span className="truncate tracking-wide">
                      {award.title.replace(/_/g, " ")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. BOTTOM SECTION: EXPANDED AND SCALED FOR BREATHING ROOM */}
      <div className="grid shrink-0 grid-cols-1 items-start gap-6 rounded-xl border border-border/40 bg-card/40 p-5 md:grid-cols-12">
        {/* Left Side: Title & Description summary (Takes 60% of bottom) */}
        <div className="space-y-2.5 md:col-span-7">
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="text-lg font-black tracking-tight text-foreground uppercase sm:text-xl">
              {project.title}
            </h2>
            <div className="flex gap-1.5">
              <span className="rounded bg-primary/10 px-2 py-0.5 text-[9px] font-extrabold tracking-wider text-primary uppercase">
                {project.isPersonal ? "Personal" : "Production"}
              </span>
              <span className="rounded border border-border bg-muted/60 px-2 py-0.5 text-[9px] font-bold tracking-wider text-foreground uppercase">
                {project.tag}
              </span>
            </div>
            <span className="ml-auto font-mono text-xs text-muted-foreground/80">
              {project.date}
            </span>
          </div>

          {/* Main textual content scaled to text-xs with leading-relaxed */}
          <p className="text-xs leading-relaxed tracking-wide text-muted-foreground">
            {project.description}
          </p>
        </div>

        {/* Right Side: Features & Engine specifications (Takes 40% of bottom) */}
        <div className="flex h-full flex-col justify-between space-y-4 border-t border-border/30 pt-4 md:col-span-5 md:border-t-0 md:border-l md:pt-0 md:pl-6">
          {/* Checklists */}
          {project.features && project.features.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[9px] font-black tracking-widest text-foreground uppercase">
                Deliverables
              </div>
              <ul className="grid grid-cols-2 gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
                {project.features.slice(0, 4).map((feat, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="text-xs text-primary/70">✔</span>
                    <span className="truncate tracking-tight">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Core Code Stack Engine */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[9px] font-black tracking-widest text-foreground uppercase">
              <span>Stack Build</span>
              <span className="font-mono text-xs tracking-normal text-muted-foreground normal-case">
                Role:{" "}
                <span className="font-bold text-foreground">
                  {project.role}
                </span>
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="rounded border border-border/40 bg-muted/40 px-2.5 py-1 font-mono text-[9px] font-bold text-muted-foreground/90 transition-all hover:border-primary/45 hover:text-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import type { Project } from "@/db/db"
import { useMemo } from "react"

interface ProjectFiltersProps {
  projects: Project[]
  searchQuery: string
  setSearchQuery: (query: string) => void
  activeTag: string
  setActiveTag: (tag: string) => void
  activeScope: "All" | "Personal" | "Professional"
  setActiveScope: (scope: "All" | "Personal" | "Professional") => void
}

export default function ProjectFilters({
  projects,
  searchQuery,
  setSearchQuery,
  activeTag,
  setActiveTag,
  activeScope,
  setActiveScope,
}: ProjectFiltersProps) {
  const tags = useMemo(() => {
    const list = new Set(projects.map((p) => p.tag))
    return ["All", ...Array.from(list)]
  }, [projects])

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search by tech, description, or stack..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-border bg-card p-3 pl-10 text-foreground transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none"
        />
        <div className="absolute top-3.5 left-3 text-primary">
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Categories */}
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tg) => (
            <button
              key={tg}
              onClick={() => setActiveTag(tg)}
              className={`rounded-lg px-3.5 py-1.5 text-sm font-semibold transition-all ${
                activeTag === tg
                  ? "scale-[1.02] bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "border border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {tg}
            </button>
          ))}
        </div>

        {/* Scope Selector */}
        <div className="flex items-center space-x-1 self-start rounded-lg border border-border bg-card p-1">
          {(["All", "Personal", "Professional"] as const).map((scope) => (
            <button
              key={scope}
              onClick={() => setActiveScope(scope)}
              className={`rounded-md px-3 py-1 text-xs font-semibold transition-all ${
                activeScope === scope
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {scope}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

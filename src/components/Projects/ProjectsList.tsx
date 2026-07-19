import { useState, useMemo, useEffect } from "react"
import { ProjectDetails } from "./ProjectDetails"
import { ProjectCard } from "./ProjectCard"
import type { Project } from "@/db/db"

// Shadcn UI Imports (Adjust paths based on your absolute project architecture config)
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface ProjectListProps {
  initialProjects: Project[]
}

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const ITEMS_PER_PAGE = 4

// Isolated Pagination Component (Borderless Style)
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <div className="flex shrink-0 items-center justify-between pt-4 pb-1 select-none">
      <div className="text-[11px] font-medium tracking-wider text-muted-foreground/70 uppercase">
        Index {currentPage} / {totalPages}
      </div>
      <div className="flex gap-1">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="rounded px-2.5 py-1 text-xs font-semibold tracking-wide transition-colors hover:bg-muted disabled:opacity-30 disabled:hover:bg-transparent"
        >
          PREV
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="rounded px-2.5 py-1 text-xs font-semibold tracking-wide transition-colors hover:bg-muted disabled:opacity-30 disabled:hover:bg-transparent"
        >
          NEXT
        </button>
      </div>
    </div>
  )
}

export function ProjectList({ initialProjects }: ProjectListProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTag, setActiveTag] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)

  // Sync chosen project title back out to the Astro layout navbar
  useEffect(() => {
    const event = new CustomEvent("update-navbar-project", {
      detail: selectedProject ? selectedProject.title : null,
    })
    window.dispatchEvent(event)
  }, [selectedProject])

  // Reset page index on filter modifications
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, activeTag])

  // Extract unique tags
  const availableTags = useMemo(() => {
    const tags = new Set(initialProjects.map((p) => p.tag).filter(Boolean))
    return ["All", ...Array.from(tags)]
  }, [initialProjects])

  // Filter Engine
  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      const matchesSearch =
        !searchQuery ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesTag = activeTag === "All" || project.tag === activeTag

      return matchesSearch && matchesTag
    })
  }, [initialProjects, searchQuery, activeTag])

  // Compute pagination math
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE)

  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredProjects.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredProjects, currentPage])

  // Detail View Drilldown Layer
  if (selectedProject) {
    return (
      <div className="mx-auto w-full max-w-4xl p-2 md:p-6">
        <ProjectDetails
          project={selectedProject}
          onBack={() => setSelectedProject(null)}
        />
      </div>
    )
  }

  // Common input elements used across layouts
  const FilterInputs = () => (
    <>
      <input
        type="text"
        placeholder="Search projects..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full rounded-lg border border-input bg-background px-3 py-1.5 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:max-w-xs"
      />
      <div className="flex flex-wrap gap-1.5">
        {availableTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              activeTag === tag
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </>
  )

  return (
    <div className="animate-in fade-in flex h-full w-full flex-col overflow-hidden duration-200">
      {/* 1. MOBILE RESPONSIVE HEADER: Shadcn Accordion (Hidden on small screens and up) */}
      <div className="mb-2 block shrink-0 sm:hidden">
        <Accordion type="single" collapsible className="w-full border-none">
          <AccordionItem value="filters" className="border-none">
            <AccordionTrigger className="py-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase hover:no-underline">
              Filter & Search {activeTag !== "All" || searchQuery ? "•" : ""}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-3 pt-1 pb-3">
              <FilterInputs />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* 2. DESKTOP/TABLET RESPONSIVE HEADER: Persistent Controls (Hidden on mobile phones) */}
      <div className="mb-4 hidden shrink-0 flex-row items-center justify-between gap-3 sm:flex">
        <FilterInputs />
      </div>

      {/* CORE PRESENTATION BODY */}
      {filteredProjects.length === 0 ? (
        <div className="flex h-40 shrink-0 items-center justify-center rounded-xl border border-dashed border-border text-center">
          <p className="text-sm text-muted-foreground">
            No matching projects found.
          </p>
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col justify-between overflow-hidden">
          {/* A. MOBILE INTERFACE: Vertical scrolling list view */}
          <div className="block flex-1 space-y-4 overflow-y-auto pr-1 sm:hidden">
            {paginatedProjects.map((project) => (
              <div key={project.id} className="w-full">
                <ProjectCard
                  project={project}
                  onSelect={setSelectedProject}
                  layoutSize="medium"
                />
              </div>
            ))}
          </div>

          {/* B. DESKTOP/TABLET INTERFACE: Exact 2x2 Grid with restricted flex heights */}
          <div className="hidden min-h-0 w-full flex-1 flex-row flex-wrap gap-4 overflow-hidden sm:flex">
            {paginatedProjects.map((project) => (
              <div
                key={project.id}
                className="flex min-h-0 w-full flex-col overflow-hidden sm:h-[calc(50%-8px)] sm:basis-[calc(50%-8px)]"
              >
                <div className="flex h-full min-h-0 w-full flex-col overflow-hidden">
                  <ProjectCard
                    project={project}
                    onSelect={setSelectedProject}
                    layoutSize="medium"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* BOTTOM-ANCHORED PAGINATION */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  )
}

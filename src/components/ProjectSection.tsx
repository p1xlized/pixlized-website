"use client";

import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";

// Loaders
import { DataUplink, SystemLoader } from "@/components/Loaders/Loader";
import ProjectArchiveCard from "@/components/Projects/ProjectCard";
import ProjectDetailView from "@/components/Projects/ProjectDetailsView";
import { ProjectFilters } from "@/components/Projects/ProjectFilter";
import PageBackground from "@/components/BackgroundEffects/ProjectBackground";

import { ShieldCheck } from "@phosphor-icons/react";
import { PORTFOLIO_DATA } from "@/lib/data";
import { ArchivePagination } from "@/components/Projects/Pagination";
import { useBrowserTab } from "@/components/BrowserTab";

const ITEMS_PER_PAGE = 6;

export function ProjectSection() {
  const [isBooting, setIsBooting] = useState(true);
  const [isUplinking, setIsUplinking] = useState(false);
  const [time, setTime] = useState("");

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);


  const [filter, setFilter] = useState("ALL");
  const [workType, setWorkType] = useState<"ALL" | "PERSONAL" | "FREELANCE">(
    "ALL",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("DESC");

  const projects = PORTFOLIO_DATA.projects;
  const navigate = useNavigate();
  // ⏱ Clock

  // ✅ FILTER + SORT
  const filteredProjects = useMemo(() => {
    return projects
      .filter((p: any) => {
        const matchesTag = filter === "ALL" || p.tag === filter;
        const matchesType =
          workType === "ALL" ||
          (workType === "PERSONAL" ? p.isPersonal : !p.isPersonal);
        const matchesSearch = p.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        return matchesTag && matchesType && matchesSearch;
      })
      .sort((a: any, b: any) => {
        const dateA = new Date(a.releasedAt).getTime();
        const dateB = new Date(b.releasedAt).getTime();
        return sortOrder === "ASC" ? dateA - dateB : dateB - dateA;
      });
  }, [filter, workType, searchQuery, sortOrder, projects]);

  // ✅ PAGINATION & VIEW LOGIC
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  // We only chunk the items for Desktop (paginated).
  // For Mobile, we will map through `filteredProjects` directly in the JSX.
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, workType, searchQuery]);

  useBrowserTab({ section: "Projects" });

  const handleProjectClick = (id: number) => {
    navigate({
      to: "/$projectId",
      params: { projectId: id.toString() },
    });
  };
  return (
    <div className="relative z-10 h-full w-full max-w-7xl mx-auto flex flex-col px-6 pt-24 pb-32 md:pb-20 md:overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key="grid-scene"
          // On mobile, we use relative positioning to allow content to push the page down
          className="relative md:absolute md:inset-0 pt-0 md:pt-24 md:pb-20 md:px-6 flex flex-col"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
        >
          <header className="shrink-0 mb-6 border-b border-primary/10 pb-4 flex justify-between items-end">
            <div className="space-y-1">
              <h1 className="text-2xl md:text-5xl uppercase tracking-tighter leading-none text-primary">
                Repository
              </h1>
              <p className="text-[10px] uppercase tracking-[0.5em] text-primary/30">
                Nodes_Active: {filteredProjects.length}
              </p>
            </div>
          </header>

          <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-0 md:overflow-hidden">
            {/* FILTERS - Visible on Mobile as a top list, Hidden on Desktop sidebar if you choose */}
            <aside className="shrink-0 w-full lg:w-64">
              <ProjectFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                workType={workType}
                setWorkType={setWorkType}
                filter={filter}
                setFilter={setFilter}
              />
            </aside>

            <div className="flex-1 flex flex-col min-h-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`view-${currentPage}-${filter}-${workType}-${searchQuery}-${sortOrder}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col min-h-0"
                >
                  {/* MOBILE LIST VIEW (Full scrollable list) */}
                  <div className="flex md:hidden flex-col gap-6">
                    {filteredProjects.map((p: any) => (
                      <ProjectArchiveCard
                        key={p.id}
                        project={p}
                        onClick={() => handleProjectClick(p.id)}
                      />
                    ))}
                  </div>

                  {/* DESKTOP PAGINATED GRID (Exactly 6 items) */}
                  <div className="hidden md:grid grid-cols-2 xl:grid-cols-3 gap-2 min-h-0 overflow-hidden">
                    {currentItems.map((p: any) => (
                      <ProjectArchiveCard
                        key={p.id}
                        project={p}
                        onClick={() => handleProjectClick(p.id)}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* PAGINATION (Kept outside AnimatePresence so the buttons don't flicker) */}
              <div className="hidden md:block mt-auto pt-6 ">
                <ArchivePagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
export default ProjectSection;

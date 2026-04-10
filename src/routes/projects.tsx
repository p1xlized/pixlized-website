"use client";

import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
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

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
});

const ITEMS_PER_PAGE = 6;

export default function ProjectsPage() {
  const [isBooting, setIsBooting] = useState(true);
  const [isUplinking, setIsUplinking] = useState(false);
  const [time, setTime] = useState("");

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [filter, setFilter] = useState("ALL");
  const [workType, setWorkType] = useState<"ALL" | "PERSONAL" | "FREELANCE">(
    "ALL",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("DESC");

  const projects = PORTFOLIO_DATA.projects;

  // ⏱ Clock
  useEffect(() => {
    const updateTime = () =>
      setTime(new Date().toLocaleTimeString("en-GB", { hour12: false }));
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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
      .sort((a: any, b: any) =>
        sortOrder === "ASC" ? a.id - b.id : b.id - a.id,
      );
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

  const handleProjectSelect = (id: number | null) => {
    setIsUplinking(true);
    setTimeout(() => {
      setSelectedId(id);
      setCurrentIndex(0);
      setIsUplinking(false);
      // On mobile, scroll to top when selecting/deselecting to ensure visibility
      window.scrollTo(0, 0);
    }, 1200);
  };
  useBrowserTab({
    section: "Projects",
  });
  return (
    // changed h-screen to min-h-screen on mobile to allow document scroll
    <div className="relative min-h-screen md:h-screen w-screen md:overflow-hidden font-mono text-foreground bg-background/20 selection:bg-primary/20">
      <PageBackground />

      <AnimatePresence>
        {isBooting && (
          <SystemLoader
            key="boot"
            onComplete={() => setIsBooting(false)}
            duration={2.5}
          />
        )}
        {isUplinking && (
          <DataUplink
            key="uplink"
            statusText={selectedId ? "DECRYPTING_ARCHIVE" : "ESTABLISHING_LINK"}
          />
        )}
      </AnimatePresence>

      {!isBooting && (
        // Changed overflow-hidden to md:overflow-hidden and added pb-32 for mobile spacing
        <main className="relative z-10 h-full w-full max-w-7xl mx-auto flex flex-col px-6 pt-24 pb-32 md:pb-20 md:overflow-hidden">
          <AnimatePresence mode="wait">
            {!selectedId ? (
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
                      {/* The key below is the secret sauce.
                        Whenever any filter or page changes, the key changes.
                        'mode="wait"' ensures the old cards are removed BEFORE the new ones enter.
                      */}
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
                              key={`mob-${p.id}`}
                              project={p}
                              onClick={() => handleProjectSelect(p.id)}
                            />
                          ))}
                        </div>

                        {/* DESKTOP PAGINATED GRID (Exactly 6 items) */}
                        <div className="hidden md:grid grid-cols-2 xl:grid-cols-3 gap-2 min-h-0 overflow-hidden">
                          {currentItems.map((p: any) => (
                            <ProjectArchiveCard
                              key={`desk-${p.id}`}
                              project={p}
                              onClick={() => handleProjectSelect(p.id)}
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
            ) : (
              <motion.div
                key="detail-scene"
                className="relative md:absolute md:inset-0 pt-0 md:pt-24 md:pb-20 md:px-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                <ProjectDetailView
                  project={projects.find((p: any) => p.id === selectedId)!}
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                  onBack={() => handleProjectSelect(null)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      )}

      {/* HUD - Remains fixed on both mobile and desktop */}
      {!isBooting && (
        <div className="fixed inset-0 z-50 pointer-events-none flex flex-col justify-between p-6 md:p-10 hidden md:block">
          <div className="flex justify-between items-start w-full bg-background/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-2 md:p-0">
            <div className="text-[9px] uppercase tracking-[0.4em] text-primary/30">
              Loc: Orion_Arm
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[10px] uppercase tracking-widest text-primary/60">
                {selectedId ? "Active" : "Standby"}
              </span>
              <span className="text-xs tabular-nums text-primary/40">
                [{time}]
              </span>
            </div>
          </div>

          <div className="hidden md:flex justify-between items-end text-[9px] uppercase tracking-[0.3em] text-primary/30">
            <span>Sys_v1.0.4 // {selectedId ? "Explorer" : "Repository"}</span>
            <div className="flex items-center gap-3">
              <ShieldCheck size={14} className="text-primary/40" />
              <span>Secure_Uplink</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

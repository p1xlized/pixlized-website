import { Project } from "@/lib/data";
import {
  ArrowLeft,
  CaretLeft,
  CaretRight,
  ChartBar,
  Cpu,
  GithubLogo,
  Globe,
  Target,
  Trophy,
  User,
} from "@phosphor-icons/react";

import { AnimatePresence, motion } from "framer-motion";

interface ProjectDetailViewProps {
  project: Project;
  Index: number;
  setCurrentIndex: (index: number) => void;
  onBack: () => void;
}

export const ProjectDetailView = ({
  project,
  currentIndex,
  setCurrentIndex,
  onBack,
}: any) => {
  const mediaCount = project.isVideo ? 1 : project.imgs?.length || 0;

  const nextMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.isVideo) return;
    setCurrentIndex((prev: number) => (prev + 1) % (project.imgs?.length || 1));
  };

  const prevMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.isVideo) return;
    setCurrentIndex(
      (prev: number) =>
        (prev - 1 + (project.imgs?.length || 1)) % (project.imgs?.length || 1),
    );
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 pb-2 font-mono">
      {/* --- 1. NAVIGATION & SYSTEM HEADER --- */}
      <nav className="flex items-center justify-between border-b border-primary/10 pb-2">
        <button
          onClick={onBack}
          className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-primary/60 hover:text-primary transition-colors"
        >
          <div className="p-2 border border-primary/20 group-hover:border-primary/60 transition-all">
            <ArrowLeft size={14} />
          </div>
          <span>Return_to_Archive</span>
        </button>
        <div className="text-right">
          <div className="text-[10px] font-bold text-primary tracking-widest uppercase">
            {project.date}
          </div>
          <div className="text-[8px] text-primary/40 uppercase tracking-tighter">
            Status: Fully_Synced
          </div>
        </div>
      </nav>

      <header className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-[1px] w-12 bg-primary/40" />
          <span className="text-[10px] uppercase tracking-[0.5em] text-primary/40">
            Node_Project_Analysis
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-2">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground uppercase leading-none">
            {project.title}
          </h2>
          <div className="flex gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-3 border border-primary/20 text-primary hover:bg-primary hover:text-background transition-all"
              >
                <GithubLogo size={20} weight="fill" />
              </a>
            )}
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noreferrer"
                className="p-3 border border-primary/20 text-primary hover:bg-primary hover:text-background transition-all"
              >
                <Globe size={20} weight="fill" />
              </a>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.stack?.map((s: string, i: number) => (
            <span
              key={i}
              className="px-3 py-1 bg-primary/5 border border-primary/10 text-[10px] font-bold text-primary uppercase tracking-widest"
            >
              {s}
            </span>
          ))}
        </div>
      </header>

      {/* --- 2. CORE INTERFACE GRID --- */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* LEFT COLUMN: Visual Intelligence */}
        <div className="lg:col-span-8 space-y-8">
          <div className="relative aspect-video overflow-hidden border border-primary/20 bg-background/40 backdrop-blur-xl group shadow-2xl">
            {/* Viewfinder Overlay */}
            <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-4">
              <div className="flex justify-between items-start opacity-40">
                <div className="size-4 border-t border-l border-primary" />
                <div className="size-4 border-t border-r border-primary" />
              </div>
              <div className="flex justify-between items-end opacity-40">
                <div className="size-4 border-b border-l border-primary" />
                <div className="size-4 border-b border-r border-primary" />
              </div>
            </div>

            {/* Carousel / Video Controls */}
            {mediaCount > 1 && !project.isVideo && (
              <>
                <button
                  onClick={prevMedia}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-background/80 border border-primary/20 text-primary hover:scale-110 transition-all backdrop-blur-md"
                >
                  <CaretLeft size={20} weight="bold" />
                </button>
                <button
                  onClick={nextMedia}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-background/80 border border-primary/20 text-primary hover:scale-110 transition-all backdrop-blur-md"
                >
                  <CaretRight size={20} weight="bold" />
                </button>
              </>
            )}

            <AnimatePresence mode="wait">
              {project.isVideo && project.videoUrl ? (
                <motion.div
                  key="video"
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="h-full w-full"
                >
                  <div className="h-full w-full">
                    <iframe
                      width="100%"
                      height="100%"
                      src={project.videoUrl}
                      title={project.title}
                      frameBorder={0}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={currentIndex ?? 0}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full w-full"
                >
                  {project.imgs && project.imgs.length > 0 ? (
                    <img
                      src={project.imgs[currentIndex]}
                      alt={project.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full bg-primary/5 text-primary">
                      No preview available
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Indicators / Dots (images only) */}
            {!project.isVideo && project.imgs && project.imgs.length > 0 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                {project.imgs.map((_: any, i: number) => (
                  <div
                    key={i}
                    className={`h-1 transition-all duration-300 ${
                      i === currentIndex
                        ? "w-8 bg-primary shadow-[0_0_8px_var(--primary)]"
                        : "w-2 bg-primary/20"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Key Features / Logic Modules */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {project.features?.map((f: string, i: number) => (
              <div
                key={i}
                className="p-4 border border-primary/10 bg-primary/[0.03] hover:border-primary/30 transition-all group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Cpu
                    size={14}
                    className="text-primary group-hover:rotate-90 transition-transform duration-500"
                  />
                  <span className="text-[9px] uppercase tracking-[0.2em] text-primary/40">
                    Feature_Ref_{i}
                  </span>
                </div>
                <div className="text-[11px] font-bold text-foreground uppercase tracking-wider">
                  {f}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Data & Metrics */}
        <div className="lg:col-span-4 space-y-10">
          {/* Role & Role Detail */}
          <div className="p-6 border border-primary/10 bg-primary/[0.02] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10">
              <User size={40} />
            </div>
            <div className="text-[10px] uppercase tracking-widest text-primary/40 mb-2">
              Assigned_Role
            </div>
            <div className="text-xl font-bold text-primary uppercase">
              {project.role}
            </div>
          </div>

          {/* Analysis Paragraph */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary/40">
              <Target size={14} />
              <span className="text-[10px] uppercase tracking-[0.4em]">
                Project_Scope
              </span>
            </div>
            <p className="text-sm leading-relaxed text-foreground/80 font-sans ">
              {project.description}
            </p>
          </div>

          {/* Performance Metrics */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-primary/40">
              <ChartBar size={14} />
              <span className="text-[10px] uppercase tracking-[0.4em]">
                Efficiency_Metrics
              </span>
            </div>
            <div className="space-y-5">
              {project.metrics?.map((m: any, i: number) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-[10px] uppercase tracking-tighter">
                    <span className="text-foreground/60">{m.label}</span>
                    <span className="text-primary font-bold">{m.value}%</span>
                  </div>
                  <div className="h-[2px] w-full bg-primary/10 relative">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${m.value}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="absolute h-full bg-primary shadow-[0_0_10px_var(--primary)]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Awards / Achievements */}
          {project.awards && (
            <div className="pt-6 border-t border-primary/10 space-y-4">
              <div className="flex items-center gap-2 text-primary/40">
                <Trophy size={14} />
                <span className="text-[10px] uppercase tracking-[0.4em]">
                  Achieved_Nodes
                </span>
              </div>
              <div className="space-y-3">
                {project.awards.map((award: any, i: number) => (
                  <div
                    key={i}
                    className="flex flex-col p-3 bg-emerald-500/5 border border-emerald-500/20"
                  >
                    <span className="text-[10px] font-bold text-emerald-400 uppercase">
                      {award.title}
                    </span>
                    <span className="text-[8px] text-emerald-400/60 uppercase">
                      {award.organization}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProjectDetailView;

import { ArrowUpRight, Code, Cpu } from "@phosphor-icons/react";
import { motion } from "framer-motion";

export default function ProjectArchiveCard({ project, onClick }: any) {
  return (
    <motion.div
      onClick={onClick}
      whileHover="hover"
      initial="initial"
      className="group relative flex flex-col border border-primary/20 bg-background/40 backdrop-blur-md cursor-pointer overflow-hidden transition-all duration-500 hover:border-primary/60 hover:shadow-[0_0_40px_rgba(var(--primary-rgb),0.15)]"
    >
      {/* 1. ULTRA-MINIMAL HEADER */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-primary/10 border-b border-primary/10">
        <div className="flex items-center gap-2">
          <div className="size-1.5 bg-primary animate-pulse rounded-full" />
          <span className="text-[8px] font-bold tracking-[0.3em] text-primary/70 uppercase">
            Node_{project.id.toString().padStart(3, "0")}
          </span>
        </div>
        <span className="text-[8px] font-mono text-primary/40 group-hover:text-primary transition-colors">
          {project.date}
        </span>
      </div>

      {/* 2. IMAGE CONTAINER (Vivid & Fluid) */}
      <div className="relative aspect-16/10 overflow-hidden">
        <motion.img
          src={project.cover}
          variants={{
            initial: { scale: 1 },
            hover: { scale: 1.1 },
          }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="size-full object-cover"
          alt={project.title}
        />

        {/* Animated Gradient Overlay */}

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <div
            className={`px-2 py-0.5 text-[8px] font-black uppercase tracking-widest border backdrop-blur-md ${
              project.isPersonal
                ? "border-blue-500/50 text-blue-400 bg-blue-500/10"
                : "border-emerald-500/50 text-emerald-400 bg-emerald-500/10"
            }`}
          >
            {project.isPersonal ? "Personal" : "Freelance"}
          </div>
        </div>

        {/* Fluid Action Button */}
        <motion.div
          variants={{
            initial: { opacity: 0, x: 10, y: 10 },
            hover: { opacity: 1, x: 0, y: 0 },
          }}
          className="absolute bottom-3 right-3 p-2 bg-primary text-background"
        >
          <ArrowUpRight size={14} weight="bold" />
        </motion.div>
      </div>

      {/* 3. COMPACT CONTENT */}
      <div className="p-4 space-y-3">
        <motion.div
          variants={{
            initial: { y: 0 },
            hover: { y: -2 },
          }}
          className="space-y-2"
        >
          <h3 className="text-xl font-bold tracking-tight text-foreground/90 group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>

          {/* Tech Stack - Pill Style */}
          <div className="flex flex-wrap gap-1.5">
            {project.tech.split(",").map((t: string, i: number) => (
              <motion.span
                key={t}
                variants={{
                  initial: { opacity: 0.6, y: 0 },
                  hover: { opacity: 1, y: -1 },
                }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-1 text-[9px] font-bold border border-primary/10 bg-primary/5 px-2 py-0.5 text-primary/80 uppercase tracking-tighter"
              >
                <Code size={8} />
                {t.trim()}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* 4. INTERACTIVE FOOTER */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-1">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                variants={{
                  initial: { scaleY: 1, opacity: 0.2 },
                  hover: { scaleY: [1, 2, 1], opacity: 1 },
                }}
                transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
                className="w-[2px] h-2 bg-primary"
              />
            ))}
          </div>
          <div className="flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-opacity">
            <Cpu size={12} className="text-primary" />
            <span className="text-[8px] font-mono tracking-widest text-primary">
              V_2.0
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Scanning Line Accent */}
      <motion.div
        variants={{
          initial: { scaleX: 0 },
          hover: { scaleX: 1 },
        }}
        className="absolute bottom-0 left-0 h-0.75 w-full bg-primary origin-left shadow-[0_0_15px_var(--primary)]"
      />
    </motion.div>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { CornersOut, CaretDoubleRight } from "@phosphor-icons/react";
import { UI_DATA } from "../constants";
import CornerMarkers from "./CornerMarkers";

interface ProjectsModuleProps {
  onClick: () => void;
}

const ProjectsModule: React.FC<ProjectsModuleProps> = ({ onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 0.995 }}
    className="group relative col-span-12 flex min-h-80 flex-col justify-between overflow-hidden border-2 border-primary/20 bg-card/40 p-6 text-left transition-all hover:border-primary lg:col-span-7"
  >
    {/* --- 1. BACKGROUND ANIMATIONS (Planet & Grid) --- */}

    {/* High-Density Wireframe Planet */}
    <div className="absolute top-1/2 left-1/2 -z-10 h-120 w-120 -translate-x-1/2 -translate-y-1/2 opacity-[0.06] transition-opacity duration-700 group-hover:opacity-15">
      <motion.svg
        viewBox="0 0 100 100"
        className="h-full w-full text-primary"
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      >
        <circle
          cx="50"
          cy="50"
          r="49"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.1"
          strokeDasharray="1 1"
        />
        <circle
          cx="50"
          cy="50"
          r="47"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
        />

        {[...Array(8)].map((_, i) => (
          <ellipse
            key={`lat-${i}`}
            cx="50"
            cy="50"
            rx="47"
            ry={6 + i * 6}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.15"
          />
        ))}

        {[...Array(8)].map((_, i) => (
          <ellipse
            key={`lng-${i}`}
            cx="50"
            cy="50"
            rx={6 + i * 6}
            ry="47"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.15"
          />
        ))}

        <motion.ellipse
          cx="50"
          cy="50"
          rx="55"
          ry="12"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.3"
          strokeDasharray="4 4"
          animate={{ rotate: [15, 20, 15] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.ellipse
          cx="50"
          cy="50"
          rx="58"
          ry="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.1"
          animate={{ rotate: [-15, -10, -15] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.svg>
    </div>

    {/* Background Matrix Grid Overlay */}
    <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,--theme(--color-primary/0.05)_1px,transparent_1px),linear-gradient(to_bottom,--theme(--color-primary/0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

    {/* Data Bits Sidebar */}
    <div className="absolute top-1/2 left-4 flex -translate-y-1/2 flex-col gap-1">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="h-[2px] w-[2px] bg-primary/20"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ delay: i * 0.1, duration: 1.5, repeat: Infinity }}
        />
      ))}
    </div>

    {/* --- 3. CONTENT --- */}

    <div className="relative z-20 flex items-start justify-between">
      <div className="flex items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] tracking-[0.6em] text-primary uppercase">
              System_Link
            </span>
            <span className="border border-primary/20 px-1 text-[7px] text-primary/40">
              ESTABLISHED
            </span>
          </div>
          <div className="font-mono text-[9px] tracking-widest text-primary/30 uppercase">
            Node_Deployment: ASSPS_SEC_04
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <CornersOut
          size={24}
          className="text-primary/20 transition-all group-hover:scale-110 group-hover:rotate-90 group-hover:text-primary"
        />
        <span className="text-[6px] tracking-[0.3em] text-primary/20 uppercase">
          Direct_Access
        </span>
      </div>
    </div>

    <div className="relative z-20 py-4">
      <div className="mb-1 flex items-center gap-4">
        <span className="text-[10px] text-primary/30">01</span>
        <div className="h-px w-8 bg-primary/20" />
      </div>
      <motion.h2
        className="mb-1 text-3xl tracking-tighter uppercase transition-all group-hover:text-primary sm:text-5xl"
        whileHover={{ skewX: -2 }}
      >
        Projects
      </motion.h2>
      <div className="flex items-center gap-6">
        <div className="h-0.5 w-24 bg-primary/20 transition-all group-hover:w-36 group-hover:bg-primary" />
        <span className="text-xs tracking-[0.8em] text-primary/40 uppercase group-hover:text-primary">
          Repository
        </span>
      </div>
    </div>

    <div className="relative z-20 flex items-center justify-between border-t border-primary/10 pt-4">
      <div className="flex gap-12">
        <div className="group/stat flex flex-col">
          <span className="text-[8px] tracking-tighter text-primary/30 uppercase">
            Total_Compiled
          </span>
          <span className="origin-left text-lg text-primary transition-transform group-hover:scale-105">
            {UI_DATA.stats.records}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[8px] tracking-tighter text-primary/30 uppercase">
            Security_Level
          </span>
          <span className="text-lg text-primary uppercase">
            {UI_DATA.stats.encryption.split("_")[0]}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <CaretDoubleRight
          size={20}
          className="mb-1 animate-pulse text-primary"
        />
        <div className="h-1 w-20 overflow-hidden bg-primary/5">
          <motion.div
            className="h-full bg-primary"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    </div>

    <CornerMarkers />
  </motion.button>
);

export default ProjectsModule;

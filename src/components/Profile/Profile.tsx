"use client";

import React, { useEffect, useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Archive,
  Broadcast,
  CaretDoubleRight,
  Code,
  CornersOut,
  Envelope,
  GithubLogo,
  LinkedinLogo,
  UserFocus,
} from "@phosphor-icons/react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

// External Components
import ActionButton from "./ActionButton";
import ProfileDialog from "./ProfileDialog";

// --- 1. CONSTANTS (Outside component to prevent re-allocation) ---
const TITLES = ["FULL STACK", "BACKEND", "MOBILE", "GAMEDEV"];

const UI_DATA = {
  profile: {
    name: "Alexandru Paduret",
    image: "https://avatars.githubusercontent.com/u/72890769?v=4",
    about:
      "Full-stack architect building fast systems and reactive interfaces. A jack-of-all-trades who’s surprisingly good at all of them, blending creativity and code.",
  },
  socials: [
    {
      id: "git",
      icon: <GithubLogo size={20} />,
      link: "https://github.com/pixlized",
    },
    {
      id: "link",
      icon: <LinkedinLogo size={20} />,
      link: "https://linkedin.com/in/apaduret",
    },
    {
      id: "mail",
      icon: <Envelope size={20} />,
      link: "mailto:alex@pixlized.net",
    },
  ],
  education: [
    {
      org: "UEF - FI",
      degree: "B.Sc Computer Science",
      progress: 50,
      status: "ACTIVE",
    },
    {
      org: "Maisonneuve College - CA",
      degree: "DEC Software Dev",
      progress: 100,
      status: "COMPLETE",
    },
  ],
  stats: { records: 14, encryption: "BitLock_256" },
};

// --- 2. ATOMIC COMPONENTS (Isolated Renders) ---

const CornerMarkers = React.memo(() => (
  <>
    <div className="absolute top-0 left-0 h-1.5 w-1.5 border-t border-l border-primary/40" />
    <div className="absolute top-0 right-0 h-1.5 w-1.5 border-t border-r border-primary/40" />
    <div className="absolute bottom-0 left-0 h-1.5 w-1.5 border-b border-l border-primary/40" />
    <div className="absolute right-0 bottom-0 h-1.5 w-1.5 border-r border-b border-primary/40" />
  </>
));

const TitleTicker = React.memo(() => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(
      () => setIndex((p) => (p + 1) % TITLES.length),
      3000,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-4">
      <div className="h-4 flex items-center bg-primary px-2">
        <AnimatePresence mode="wait">
          <motion.span
            key={TITLES[index]}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-[10px] font-black tracking-[0.2em] text-background uppercase"
          >
            {TITLES[index]}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[7px] font-mono text-primary/40 tabular-nums">
        SEGMENT_0{index + 1}
      </span>
    </div>
  );
});

const SchematicGrid = React.memo(() => (
  <motion.svg
    viewBox="0 0 100 100"
    className="h-full w-full text-primary"
    style={{ willChange: "transform" }}
    animate={{ rotate: -360 }}
    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
  >
    <circle
      cx="50"
      cy="50"
      r="10"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.1"
      strokeDasharray="1 2"
    />
    <circle
      cx="50"
      cy="50"
      r="25"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.2"
      strokeDasharray="4 2"
    />
    <circle
      cx="50"
      cy="50"
      r="45"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.1"
    />
    <motion.path
      d="M 50 50 L 50 5 a 45 45 0 0 1 31.8 13.2 z"
      fill="currentColor"
      className="opacity-20"
      animate={{ opacity: [0.1, 0.3, 0.1] }}
      transition={{ duration: 4, repeat: Infinity }}
    />
  </motion.svg>
));

// --- 3. MODULES ---
const BioModule = () => (
  <div className="group relative flex-[1.4] overflow-hidden border border-primary/20 bg-card/40 p-5 transition-all duration-500 hover:border-primary hover:bg-primary/[0.04]">
    {/* --- BACKGROUND SCHEMATIC (Shows on hover) --- */}
    <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-1000 group-hover:opacity-[0.12]">
      <SchematicGrid />
    </div>

    {/* --- TERMINAL HEADER --- */}
    <div className="relative z-10 mb-6 flex items-center justify-between border-b border-primary/10 pb-3">
      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          <div className="size-1.5 rounded-full bg-primary/20 group-hover:bg-primary/60 transition-colors" />
          <div className="size-1.5 rounded-full bg-primary/10 group-hover:bg-primary/40 transition-colors" />
        </div>
        <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] text-primary/70">
          <UserFocus size={14} weight="fill" className="opacity-50" />
          <span>USR://ALEX_PADURET/BIO.LOG</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-mono text-[7px] text-primary/30 uppercase tracking-widest animate-pulse">
          Scanning...
        </span>
        <span className="font-mono text-[7px] text-primary/30 uppercase tracking-widest">
          Read_Only
        </span>
      </div>
    </div>

    {/* --- BIO TEXT AREA --- */}
    <div className="relative z-10 mb-8 px-2">
      <div className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-primary/40 via-primary/5 to-transparent" />
      <p className="font-mono text-[11px] leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground/90">
        <span className="mr-2 text-primary animate-pulse inline-block">█</span>
        {UI_DATA.profile.about}
      </p>
    </div>

    {/* --- EDUCATION: DATA BLOCKS --- */}
    <div className="relative z-10 space-y-5">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[7px] font-black tracking-[0.4em] text-primary/40 uppercase">
          Academic_History
        </span>
        <div className="h-[1px] flex-1 bg-primary/5" />
      </div>

      {UI_DATA.education.map((e, i) => (
        <div key={i} className="group/node relative pl-4">
          <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-primary/10 group-hover/node:bg-primary/40 transition-colors" />

          <div className="mb-1.5 flex items-center justify-between">
            <h4 className="text-[10px] font-bold tracking-wider text-foreground uppercase group-hover/node:text-primary transition-colors">
              {e.degree}
            </h4>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[6px] text-primary/40 uppercase tracking-tighter">
                Status: {e.status}
              </span>
              <div
                className={cn(
                  "size-1 rounded-full animate-pulse",
                  e.status === "COMPLETE" ? "bg-primary" : "bg-yellow-500/50",
                )}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="shrink-0 font-mono text-[8px] text-muted-foreground/60 uppercase">
              {e.org}
            </span>

            <div className="flex flex-1 gap-1">
              {[...Array(10)].map((_, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0.1 }}
                  whileInView={{ opacity: idx * 10 < e.progress ? 1 : 0.1 }}
                  transition={{ delay: i * 0.1 + idx * 0.05 }}
                  className={cn(
                    "h-1.5 flex-1 skew-x-[-20deg] transition-all duration-500",
                    idx * 10 < e.progress
                      ? "bg-primary/60 group-hover/node:bg-primary group-hover/node:shadow-[0_0_8px_rgba(var(--primary),0.5)]"
                      : "bg-primary/5",
                  )}
                />
              ))}
            </div>

            <span className="w-6 text-right font-mono text-[7px] text-primary/40">
              {e.progress}%
            </span>
          </div>
        </div>
      ))}
    </div>

    {/* --- DECORATIVE FOOTER --- */}
    <div className="absolute bottom-2 right-3 opacity-10 group-hover:opacity-30 transition-opacity">
      <div className="flex flex-col items-end font-mono text-[5px] text-primary">
        <span>CHECKSUM: 0x882A</span>
        <span>ENCODING: UTF-8</span>
      </div>
    </div>
  </div>
);
const HeaderSection = React.memo(() => (
  <header className="relative flex w-full flex-row items-center gap-6 bg-background/20 border-2 border-primary/20 p-4 h-24 md:h-28 overflow-hidden">
    <Dialog>
      <DialogTrigger asChild>
        <div className="group relative size-16 shrink-0 cursor-crosshair sm:size-20 md:size-24 transition-transform duration-300 hover:scale-[1.02]">
          <div className="absolute inset-[-6px] rounded-full border border-primary/10" />
          <div className="absolute inset-[-3px] rounded-full border-t-2 border-l-2 border-primary/40 group-hover:border-primary transition-colors" />
          <div className="relative size-full overflow-hidden rounded-full border-2 border-primary/30 bg-background transition-all group-hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.15)]">
            <img
              src={UI_DATA.profile.image}
              alt="Profile"
              className="size-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
            />
          </div>
          <div className="absolute right-0.5 bottom-0.5 z-20 size-3.5 rounded-full border-2 border-background bg-primary" />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-5xl w-full border-none bg-transparent p-0 shadow-none">
        <ProfileDialog />
      </DialogContent>
    </Dialog>

    <div className="flex flex-1 flex-col justify-center min-w-0">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[7px] font-black tracking-[0.6em] text-primary/70 uppercase">
          User_Identity
        </span>
        <div className="h-[1px] w-12 bg-primary/20" />
      </div>
      <div className="flex flex-col md:flex-row md:items-end gap-0 md:gap-3 leading-none">
        <h1
          className="font-mono text-3xl font-black tracking-tighter text-transparent sm:text-4xl md:text-6xl uppercase"
          style={{ WebkitTextStroke: "1px var(--primary)" }}
        >
          {UI_DATA.profile.name.split(" ")[0]}
        </h1>
        <h1 className="font-mono text-3xl font-black tracking-tighter text-primary sm:text-4xl md:text-6xl uppercase">
          {UI_DATA.profile.name.split(" ")[1]}
        </h1>
      </div>
      <div className="mt-2">
        <TitleTicker />
      </div>
    </div>

    <div className="flex flex-col gap-1 md:flex-row md:gap-2">
      {UI_DATA.socials.map((social) => (
        <a
          key={social.id}
          href={social.link}
          target="_blank"
          className="group relative flex size-8 items-center justify-center border-2 border-primary/20 transition-all hover:bg-primary sm:size-9 md:size-10"
        >
          <div className="relative z-10 text-primary transition-colors group-hover:text-background">
            {social.icon}
          </div>
          <div className="absolute bottom-0 left-0 h-0 w-full bg-primary transition-all group-hover:h-full" />
        </a>
      ))}
    </div>
  </header>
));

const ProjectsModule = ({ onClick }: { onClick: () => void }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 0.995 }}
    className="group relative col-span-12 flex min-h-125 flex-col justify-between overflow-hidden border-2 border-primary/20 bg-card/40 p-12 text-left transition-all hover:border-primary lg:col-span-7"
  >
    {/* --- 1. BACKGROUND ANIMATIONS (Planet & Grid) --- */}

    {/* High-Density Wireframe Planet */}
    <div className="absolute top-1/2 left-1/2 -z-10 h-150 w-150 -translate-x-1/2 -translate-y-1/2 opacity-[0.08] transition-opacity duration-700 group-hover:opacity-20">
      <motion.svg
        viewBox="0 0 100 100"
        className="h-full w-full text-primary"
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      >
        {/* Outer Sphere Boundary */}
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

        {/* Dense Latitude Lines */}
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

        {/* Dense Longitude Lines */}
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

        {/* Atmospheric / Orbital Rings (Inclined) */}
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

    {/* --- 2. DECORATIONS --- */}

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
          size={28}
          className="text-primary/20 transition-all group-hover:scale-125 group-hover:rotate-90 group-hover:text-primary"
        />
        <span className="text-[6px] tracking-[0.3em] text-primary/20 uppercase">
          Direct_Access
        </span>
      </div>
    </div>

    <div className="relative z-20">
      <div className="mb-2 flex items-center gap-4">
        <span className="text-[10px] text-primary/30">01</span>
        <div className="h-px w-8 bg-primary/20" />
      </div>
      <motion.h2
        className="mb-2 text-4xl tracking-tighter uppercase transition-all group-hover:text-primary sm:text-6xl"
        whileHover={{ skewX: -2 }}
      >
        Projects
      </motion.h2>
      <div className="flex items-center gap-6">
        <div className="h-0.5 w-32 bg-primary/20 transition-all group-hover:w-48 group-hover:bg-primary" />
        <span className="text-xs tracking-[0.8em] text-primary/40 uppercase group-hover:text-primary">
          Repository
        </span>
      </div>
    </div>

    <div className="relative z-20 flex items-center justify-between border-t border-primary/10 pt-8">
      <div className="flex gap-12">
        <div className="group/stat flex flex-col">
          <span className="text-[8px] tracking-tighter text-primary/30 uppercase">
            Total_Compiled
          </span>
          <span className="origin-left text-xl text-primary transition-transform group-hover:scale-110">
            {UI_DATA.stats.records}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[8px] tracking-tighter text-primary/30 uppercase">
            Security_Level
          </span>
          <span className="text-xl text-primary uppercase">
            {UI_DATA.stats.encryption.split("_")[0]}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <CaretDoubleRight
          size={24}
          className="mb-1 animate-pulse text-primary"
        />
        <div className="h-1 w-24 overflow-hidden bg-primary/5">
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

// --- MAIN VIEWS ---

// --- 4. MAIN VIEWS ---
const MobileView = () => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-col gap-4 p-6 font-mono relative overflow-hidden">
      {/* Background Decorative Scanline */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

      {/* --- HEADER BLOCK --- */}
      <div className="relative flex items-center gap-4 border border-primary/30 bg-card/40 p-4">
        <div className="relative size-16 shrink-0">
          <img
            src={UI_DATA.profile.image}
            className="size-full border border-primary/40 grayscale object-cover"
            alt="Profile"
          />
          <div className="absolute -bottom-1 -right-1 size-3 bg-primary shadow-[0_0_8px_var(--primary)] rounded-full border-2 border-background" />
        </div>

        <div className="flex flex-col min-w-0">
          <h1 className="truncate text-xl font-black tracking-tighter text-primary uppercase leading-tight">
            {UI_DATA.profile.name}
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-[7px] font-bold tracking-[0.2em] text-primary/60 uppercase italic">
              System_Authorized
            </span>
            <div className="h-px flex-1 bg-primary/20" />
          </div>
        </div>
        <CornerMarkers />
      </div>

      {/* --- BIO MODULE --- */}
      <div className="relative border border-primary/20 bg-primary/5 p-5">
        <div className="mb-2 flex items-center gap-2 opacity-30">
          <UserFocus size={10} weight="fill" />
          <span className="text-[6px] tracking-[0.3em] uppercase font-bold">
            Identity_Fragment
          </span>
        </div>
        <p className="text-[11px] leading-relaxed text-primary/80 italic">
          "{UI_DATA.profile.about}"
        </p>
        <div className="absolute top-0 right-0 p-1 text-[5px] text-primary/20 font-mono">
          0x04F2BC
        </div>
      </div>

      {/* --- GRID NAVIGATION --- */}
      <div className="grid grid-cols-2 gap-3">
        {/* LARGE PRIMARY BUTTON: PROJECTS */}
        <button
          onClick={() => navigate({ to: "/projects" })}
          className="relative col-span-2 flex h-32 flex-col items-center justify-center border border-primary/40 bg-primary/10 active:bg-primary active:text-background transition-colors overflow-hidden group"
        >
          <Code
            size={32}
            className="text-primary group-active:text-background"
          />
          <span className="mt-2 text-xs font-black tracking-[0.6em] text-primary group-active:text-background uppercase">
            Projects
          </span>
          <div className="absolute top-2 left-2 text-[6px] opacity-30 uppercase font-bold">
            Node_01
          </div>
          <CornerMarkers />
        </button>

        {/* SECONDARY BUTTON: BLOG */}
        <button
          onClick={() => navigate({ to: "/blog" })}
          className="relative flex h-24 flex-col items-center justify-center border border-primary/20 bg-card/40 active:bg-primary/20"
        >
          <Archive size={20} weight="thin" className="text-primary" />
          <span className="mt-2 text-[10px] font-bold tracking-[0.3em] text-primary/80 uppercase">
            Blog
          </span>
          <CornerMarkers />
        </button>

        {/* SECONDARY BUTTON: MUSIC */}
        <button
          onClick={() => navigate({ to: "/albums" })}
          className="relative flex h-24 flex-col items-center justify-center border border-primary/20 bg-card/40 active:bg-primary/20"
        >
          <Broadcast size={20} weight="thin" className="text-primary" />
          <span className="mt-2 text-[10px] font-bold tracking-[0.3em] text-primary/80 uppercase">
            Music
          </span>
          <CornerMarkers />
        </button>
        <div className="flex w-full gap-3">
          <button
            onClick={() => window.open(UI_DATA.socials[0].link, "_blank")}
            aria-label="Open GitHub"
            className="flex-1 relative flex h-14 items-center gap-3 px-4 rounded-md border border-primary/15 bg-card/30 hover:bg-primary/6 transition-colors duration-200"
          >
            <GithubLogo size={18} weight="thin" className="text-primary" />
            <div className="flex-1 text-left">
              <div className="text-[10px] font-bold tracking-[0.3em] text-primary/80 uppercase">
                GitHub
              </div>
              <div className="text-[9px] text-primary/60 font-mono truncate">
                /pixlized
              </div>
            </div>
            <CaretDoubleRight size={14} className="text-primary/40" />
          </button>

          <button
            onClick={() => window.open(UI_DATA.socials[1].link, "_blank")}
            aria-label="Open LinkedIn"
            className="flex-1 relative flex h-14 items-center gap-3 px-4 rounded-md border border-primary/15 bg-card/30 hover:bg-primary/6 transition-colors duration-200"
          >
            <LinkedinLogo size={18} weight="thin" className="text-primary" />
            <div className="flex-1 text-left">
              <div className="text-[9px] font-bold tracking-[0.3em] text-primary/80 uppercase">
                LinkedIn
              </div>
              <div className="text-[9px] text-primary/60 font-mono truncate">
                /apaduret
              </div>
            </div>
            <CaretDoubleRight size={14} className="text-primary/40" />
          </button>
        </div>
        {/* SECONDARY BUTTON: SOCIALS / CONTACT */}
      </div>

      {/* --- FOOTER STATUS --- */}
      <div className="mt-4 flex justify-between items-center px-2 opacity-20 font-mono text-[6px] tracking-widest uppercase">
        <span>Kernel_V.4.2</span>
        <div className="flex gap-1">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="size-1 bg-primary rotate-45" />
          ))}
        </div>
        <span>Sync_Ready</span>
      </div>
    </div>
  );
};

const DesktopView = React.memo(() => {
  const navigate = useNavigate();
  return (
    <div className="relative mt-4 flex h-full w-full max-w-5xl flex-col gap-3 p-8">
      <HeaderSection />
      <div className="mt-4 grid h-130 grid-cols-12 gap-3">
        <div className="col-span-12 flex flex-col gap-3 md:col-span-5">
          <BioModule />
          <div className="flex flex-1 gap-4">
            <ActionButton
              label="Blog"
              icon={Archive}
              sublabel="Index_Status: 0x00"
              onClick={() => navigate({ to: "/blog" })}
              variant="blog"
            />
            <ActionButton
              label="Music"
              icon={Broadcast}
              sublabel="Stereo_Uplink"
              onClick={() => navigate({ to: "/albums" })}
              variant="music"
            />
          </div>
        </div>
        <ProjectsModule onClick={() => navigate({ to: "/projects" })} />
      </div>
    </div>
  );
});

// --- 5. ENTRY POINT ---

export default function Profile() {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <div className="flex min-h-screen w-full items-center justify-center text-foreground selection:bg-primary/20">
      {isDesktop ? <DesktopView /> : <MobileView />}
    </div>
  );
}

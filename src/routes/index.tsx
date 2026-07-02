"use client";

import React, { useEffect, useState, useCallback } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowDown, ArrowRight } from "@phosphor-icons/react";

// Internal Libs
import { useBrowserTab } from "@/components/BrowserTab";

// Components
import Profile from "@/components/Profile_experiment/Profile";

import { SystemLoader } from "@/components/Loaders/Loader";
import SpaceParallax from "@/components/BackgroundEffects/SpaceParallax";
import ContactSection from "@/components/Profile/ContactMe";

// --- 1. STATIC DECORATIONS (Rendered Once) ---
const GaugeDecoration = React.memo(() => (
  <>
    {/* Right Side: Vertical Labeling */}
    <div className="absolute -right-4 flex flex-col items-center h-72 justify-center opacity-20 pointer-events-none">
      <div className="text-[6px] tracking-[0.6em] [writing-mode:vertical-rl] font-mono font-black rotate-180">
        ALIGN::TGT_LOCK
      </div>
    </div>
  </>
));

// --- 2. ISOLATED HUD COMPONENTS ---
const TimeDisplay = React.memo(() => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const t = () =>
      setTime(new Date().toLocaleTimeString("en-GB", { hour12: false }));
    t();
    const i = setInterval(t, 1000);
    return () => clearInterval(i);
  }, []);
  return (
    <div className="text-[12px] font-black tabular-nums leading-none">
      {time}
    </div>
  );
});

const ScrollGauge = React.memo(({ active }: { active: string }) => {
  const activeIndex = Math.max(0, SECTIONS.indexOf(active));
  const progress = (activeIndex / (SECTIONS.length - 1)) * 100;

  return (
    <div className="fixed top-1/2 right-8 z-50 -translate-y-1/2 hidden md:flex flex-col items-center gap-3">
      <div className="flex flex-col items-center gap-1.5 opacity-40">
        <div className="flex items-center gap-1">
          <div className="size-1 bg-primary animate-pulse" />
          <div className="h-[2px] w-6 bg-primary" />
        </div>
        <span className="text-[6px] tracking-[0.4em] font-black uppercase">
          Nav_Track
        </span>
      </div>

      <div className="relative flex items-center justify-center w-20">
        <GaugeDecoration />

        <div className="flex flex-col items-center gap-2">
          <div className="size-2 border border-primary/50 flex items-center justify-center opacity-60">
            <div className="size-[2px] bg-primary" />
          </div>

          <div className="relative h-72 w-[2px] bg-primary/10 rounded-full">
            <motion.div
              initial={false}
              animate={{ height: `${progress}%` }}
              transition={{ type: "spring", stiffness: 70, damping: 18, mass: 0.8 }}
              className="absolute top-0 w-full bg-primary/40"
            />
            <motion.div
              initial={false}
              animate={{ top: `${progress}%` }}
              transition={{ type: "spring", stiffness: 110, damping: 20, mass: 0.8 }}
              className="absolute left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/70 bg-primary"
            />
          </div>

          <div className="size-2 border border-primary/50 flex items-center justify-center opacity-60">
            <div className="size-[2px] bg-primary animate-ping" />
          </div>
        </div>
      </div>
    </div>
  );
});

// --- 3. MAIN ROUTE & COMPONENT ---
export const Route = createFileRoute("/")({ component: App });
const SECTIONS = ["PROFILE", "PROJECTS", "CONTACT"];

function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("PROFILE");
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [isInactive, setIsInactive] = useState(false);

  // Scroll Engine
  const { scrollYProgress } = useScroll({
    container: container ? { current: container } : undefined,
  });

  // Inactivity Detection (30 minutes = 1800000 ms)
  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;
    const resetInactivityTimer = () => {
      setIsInactive(false);
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => setIsInactive(true), 20000);
    };

    // Listen for user activity
    const events = ["mousedown", "keydown", "scroll", "touchstart", "click"];
    events.forEach((event) => {
      window.addEventListener(event, resetInactivityTimer);
    });

    // Initial timer
    inactivityTimer = setTimeout(() => setIsInactive(true), 20000);

    return () => {
      clearTimeout(inactivityTimer);
      events.forEach((event) => {
        window.removeEventListener(event, resetInactivityTimer);
      });
    };
  }, []);

  // Update active section label without re-rendering everything
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.round(latest * (SECTIONS.length - 1));
    if (SECTIONS[index] && activeSection !== SECTIONS[index]) {
      setActiveSection(SECTIONS[index]);
    }
  });

  const smoothScrollTo = useCallback(
    (index: number) => {
      container?.scrollTo({
        top: index * container.offsetHeight,
        behavior: "smooth",
      });
    },
    [container],
  );
  // Browser Tab Metadata
  // useBrowserTab({ section: activeSection, appSuffix: "x_x" });

  return (
    <div className="relative min-h-screen bg-background/20 text-primary font-mono uppercase overflow-hidden selection:bg-primary/30">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background"
          >
            <SystemLoader onComplete={() => setLoading(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* STABLE BACKGROUND */}
            <SpaceParallax scrollYProgress={scrollYProgress} />

            {/* HUD: HEADER */}
            <header className="fixed inset-x-0 top-0 z-50 flex justify-between p-8 pointer-events-none select-none">
              {/* LEFT: SYSTEM STATUS MODULE */}
              <div className="relative flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="relative size-2">
                    <div className="absolute inset-0 bg-primary animate-pulse rounded-full" />
                    <div className="absolute inset-0 bg-primary animate-ping rounded-full opacity-40" />
                  </div>
                  <div className="flex flex-col mt-1">
                    <span className="text-[10px] font-black tracking-[0.3em] leading-none">
                      <span className="hidden md:block">P1XLIZED //</span>{" "}
                      {activeSection}
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT: CHRONO & LOC MODULE */}
              <div className="flex gap-6 items-start hidden md:block">
                {/* SYSTEM UPTIME DECO */}
                <div className="text-right hidden sm:block opacity-40">
                  <div className="text-[5px] tracking-widest leading-none mb-1">
                    DATA_STREAM
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <div className="h-0.5 w-16 bg-primary/20 overflow-hidden">
                      <motion.div
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="h-full w-1/2 bg-primary/60"
                      />
                    </div>
                    <div className="text-[5px] font-mono opacity-50">
                      BUFF_SIZE::0x244
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center justify-end gap-2 mb-1">
                    <span className="text-[7px] font-black tracking-widest opacity-40">
                      CHRONO::SYNC
                    </span>
                    <div className="size-1 bg-primary" />
                  </div>
                  <TimeDisplay />
                  <div className="text-[5px] opacity-30 mt-1 tracking-tighter">
                    OS_VERSION::pxlOS_v3.2
                  </div>
                </div>
              </div>
            </header>

            {/* HUD: GAUGE */}
            <div className="hidden md:block">
              <ScrollGauge active={activeSection} />
            </div>

            {/* MAIN CONTENT ENGINE */}
            <div
              ref={setContainer}
              className="hide-scrollbar relative z-10 h-screen w-full snap-y snap-mandatory overflow-y-auto scroll-smooth"
            >
              <section className="h-screen w-full snap-start flex items-center justify-center p-4">
                <Profile />
              </section>

              <section className="h-screen w-full snap-start flex items-center justify-center p-4 overflow-hidden">
                <div className="flex h-[88vh] w-full max-w-7xl items-center justify-center">
                  <div className="grid w-full max-w-6xl gap-4 md:grid-cols-12 md:grid-rows-2">
                    <div className="relative flex min-h-64 flex-col justify-between border border-primary/20 bg-background/10 p-6 backdrop-blur-xl md:col-span-8 md:row-span-2 md:min-h-0">
                      <div className="text-[10px] uppercase tracking-[0.4em] text-primary/45">
                        Featured Project
                      </div>
                      <div>
                        <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-foreground md:text-4xl">
                          Pixlized Platform
                        </h2>
                        <p className="mt-3 max-w-xl text-sm leading-6 text-foreground/70">
                          Complete design system + frontend architecture with
                          motion-driven UI, responsive layouts, and performance-first
                          implementation.
                        </p>
                      </div>
                      <div className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-primary/40">
                        <span>View Case Study</span>
                        <ArrowRight size={14} />
                      </div>
                    </div>

                    {[
                      {
                        title: "Brand Website",
                        text: "Sharp marketing site with clean information flow and smooth interactions.",
                      },
                      {
                        title: "UI Motion Kit",
                        text: "Reusable animation components for consistent, modern micro-interactions.",
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="relative flex min-h-48 flex-col justify-between border border-primary/15 bg-background/10 p-5 backdrop-blur-xl md:col-span-4"
                      >
                        <div className="text-[10px] uppercase tracking-[0.4em] text-primary/45">
                          Best Project
                        </div>
                        <div>
                          <h3 className="mt-3 text-xl font-black uppercase tracking-tight text-foreground">
                            {item.title}
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-foreground/70">
                            {item.text}
                          </p>
                        </div>
                        <div className="mt-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-primary/40">
                          <span>Open Project</span>
                          <ArrowRight size={14} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="h-screen w-full snap-start flex items-center justify-center p-4 overflow-hidden">
                <div className="flex h-[92vh] w-full max-w-7xl items-stretch justify-center">
                  <div className="w-full max-w-5xl">
                    <ContactSection />
                  </div>
                </div>
              </section>
            </div>

            {/* HUD: FOOTER COMMAND MODULE (centered & prominent) */}
            <footer className="hidden md:block fixed bottom-6 left-1/2 z-50 -translate-x-1/2 flex flex-col items-center pointer-events-none select-none px-6">
              <div className="group relative flex flex-col items-center pointer-events-auto">
                {/* 1. COMMAND TOOLTIP (Centered Legend) */}
                <motion.div
                  animate={{
                    opacity: isInactive ? 1 : 0,
                    x: isInactive ? 0 : -8,
                  }}
                  transition={{ duration: 0.4 }}
                  className="absolute right-full mr-6 top-1/2 -translate-y-1/2 flex flex-col items-end"
                  style={{
                    opacity: isInactive ? 1 : 0,
                    pointerEvents: isInactive ? "auto" : "none",
                  }}
                >
                  <div className="relative p-2 bg-background/95 backdrop-blur-2xl border border-primary/20 flex flex-col gap-2 shadow-[0_0_30px_rgba(var(--primary-rgb),0.15)] min-w-[140px]">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[5px] tracking-[0.3em] font-black opacity-30 uppercase">
                        Manual_Override
                      </span>
                      <div className="size-1 bg-primary animate-pulse" />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[6px] tracking-widest opacity-50">
                          KBD_INPUT
                        </span>
                        <kbd className="px-1 border border-primary/40 rounded-[2px] text-[7px] font-mono bg-primary/5">
                          ↑↓
                        </kbd>
                      </div>
                      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[6px] tracking-widest opacity-50">
                          HAPTIC_THRUST
                        </span>
                        <kbd className="px-1 border border-primary/40 rounded-[2px] text-[7px] font-mono bg-primary/5">
                          SCRL
                        </kbd>
                      </div>
                    </div>

                    {/* Connecting line to button */}
                    <div className="absolute left-full top-1/2 -translate-y-1/2 w-6 h-[1px] bg-primary/20" />
                  </div>
                </motion.div>

                {/* 2. THE PROMINENT CENTER BUTTON */}
                <div className="relative p-1 rounded-sm">
                  {/* "CLICK ME" label - appears on right when inactive */}
                  <motion.div
                    animate={{
                      opacity: isInactive ? 1 : 0,
                      x: isInactive ? 0 : 8,
                    }}
                    transition={{ duration: 0.4 }}
                    className="absolute left-full ml-6 top-1/2 -translate-y-1/2 pointer-events-none whitespace-nowrap"
                  >
                    <span className="text-[8px] font-black tracking-[0.3em] text-primary/60 uppercase animate-pulse">
                      Click Me
                    </span>
                  </motion.div>

                  <button
                    onClick={() =>
                      smoothScrollTo(
                        (SECTIONS.indexOf(activeSection) + 1) % SECTIONS.length,
                      )
                    }
                    className="relative size-12 flex items-center justify-center bg-transparent text-primary backdrop-blur-sm border-2 border-primary/60 hover:border-primary hover:scale-105 transform-gpu transition-all duration-300 overflow-hidden rounded-full shadow-[0_0_12px_rgba(var(--primary-rgb),0.12)] hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)]"
                    aria-label="Next section"
                  >
                    {/* Subtle scanning line */}
                    <motion.div
                      animate={{ top: ["-10%", "110%"] }}
                      transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-x-0 h-[1px] bg-primary/15 z-0"
                    />

                    {/* Accent overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/6 to-transparent opacity-0 group-hover:opacity-15 transition-all duration-300 rounded-full" />

                    <motion.div
                      animate={{
                        rotate: activeSection === "CONTACT" ? 180 : 0,
                      }}
                      className="relative z-10 text-primary transition-colors duration-300 group-hover:text-primary"
                    >
                      <ArrowDown size={20} weight="bold" />
                    </motion.div>
                  </button>
                </div>

                {/* 3. DYNAMIC DATA STRIP */}
                <div className="mt-3 flex flex-col items-center gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[6px] tracking-[0.5em] font-black uppercase text-primary/80">
                      {activeSection === "CONTACT"
                        ? "EXEC::REBOOT"
                        : "EXEC::NEXT_MOD"}{" "}
                    </span>
                    <div className="flex gap-0.5">
                      {[...Array(SECTIONS.length)].map((_, i) => (
                        <div
                          key={i}
                          className={`size-0.5 rounded-full ${i === SECTIONS.indexOf(activeSection) ? "bg-primary" : "bg-primary/20"}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="h-[1px] w-20 bg-gradient-to-l from-primary/40 to-transparent" />
                  <span className="text-[4px] font-mono opacity-20 uppercase">
                    Auth_Token::0xA1X_VALID
                  </span>
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        ::selection { background: rgba(var(--primary-rgb), 0.2); }
      `}</style>
    </div>
  );
}

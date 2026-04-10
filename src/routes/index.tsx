"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowDown } from "@phosphor-icons/react";
import { useStore } from "@tanstack/react-store";

// Internal Libs
import { useBrowserTab } from "@/components/BrowserTab";

// Components
import Profile from "@/components/Profile/Profile";
import { SystemLoader } from "@/components/Loaders/Loader";

import TestimonialsNode from "@/components/Profile/Testimonials";
import SpaceParallax from "@/components/BackgroundEffects/SpaceParallax";
import { PORTFOLIO_DATA } from "@/lib/data";
import ContactSection from "@/components/Profile/ContactMe";

// --- 1. STATIC DECORATIONS (Rendered Once) ---
const GaugeDecoration = React.memo(() => (
  <>
    {/* Left Side: Ruler Ticks & Hex Readouts */}
    {/*<div className="absolute right-4 flex-col justify-between h-72 py-0 opacity-30 pointer-events-none ">
      {[...Array(16)].map((_, i) => (
        <div key={i} className="flex items-center justify-end gap-1.5 w-8">
          <span className="text-[5px] font-mono">
            {i % 5 === 0 ? `0x0${i.toString(16).toUpperCase()}` : ""}
          </span>
          <div
            className={`h-[1px] bg-primary ${i % 5 === 0 ? "w-3" : "w-1"}`}
          />
        </div>
      ))}
    </div>*/}

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

const ScrollGauge = React.memo(({ active }: { active: string }) => (
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

        {/* SPRING INDICATOR TRACK */}
        <div className="relative h-72 w-[2px] bg-primary/10 rounded-full">
          <motion.div
            initial={false}
            animate={{
              scaleY:
                active === "PROFILE" ? 0 : active === "TESTIMONIALS" ? 0.5 : 1,
              opacity: [0.6, 1, 0.8],
            }}
            transition={{
              scaleY: { type: "spring", stiffness: 70, damping: 18, mass: 0.8 },
              opacity: { duration: 0.4 },
            }}
            style={{ originY: 0 }}
            className="absolute top-0 w-full h-full bg-primary shadow-[0_0_15px_var(--primary)]"
          />
        </div>

        <div className="size-2 border border-primary/50 flex items-center justify-center opacity-60">
          <div className="size-[2px] bg-primary animate-ping" />
        </div>
      </div>
    </div>
  </div>
));

// --- 3. MAIN ROUTE & COMPONENT ---
export const Route = createFileRoute("/")({ component: App });
const SECTIONS = ["PROFILE", "TESTIMONIALS", "CONTACT"];

function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("PROFILE");
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  // System Store Subscription
  // System Store Subscription
  const feedbacks = PORTFOLIO_DATA.testimonials;

  // Scroll Engine
  const { scrollYProgress } = useScroll({
    container: container ? { current: container } : undefined,
  });

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
                    OS_VERSION::BUN_ELYSIA_v3.2
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

              <section className="h-screen w-full snap-start flex items-center justify-center p-4">
                {/* Lazy Mount: Only render testimonials when on or near the page */}
                {activeSection !== "CONTACT" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <TestimonialsNode data={feedbacks} />
                  </motion.div>
                )}
              </section>

              <section className="h-screen w-full snap-start flex items-center justify-center p-4 overflow-hidden">
                <ContactSection />
              </section>
            </div>

            {/* HUD: FOOTER COMMAND MODULE */}
            <footer className="hidden md:block fixed bottom-6 md:bottom-10 inset-x-0 md:inset-x-auto md:right-10 z-50 flex flex-col items-center md:items-end pointer-events-none select-none px-6">
              <div className="group relative flex flex-col items-center md:items-end pointer-events-auto">
                {/* 1. COMMAND TOOLTIP (Right-Aligned Legend) */}
                <div className="absolute bottom-full mb-5 flex flex-col items-center md:items-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <div className="relative p-2 bg-background/95 backdrop-blur-2xl border border-primary/20 flex flex-col gap-2 shadow-[0_0_30px_rgba(var(--primary-rgb),0.15)] min-w-[120px]">
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

                    {/* Right-aligned connecting stem */}
                    <div className="absolute top-full right-4 w-[1px] h-4 bg-primary/20" />
                  </div>
                </div>

                {/* 2. THE MECHANICAL BUTTON HOUSING */}
                <div className="relative p-1 border border-primary/10 rounded-sm">
                  {/* Outer Brackets (Static) */}
                  <div className="absolute -top-1 -left-1 size-2 border-t border-l border-primary/40" />
                  <div className="absolute -bottom-1 -right-1 size-2 border-b border-r border-primary/40" />

                  <button
                    onClick={() =>
                      smoothScrollTo((SECTIONS.indexOf(activeSection) + 1) % 3)
                    }
                    className="relative size-10 flex items-center justify-center bg-background/60 backdrop-blur-md border border-primary/40 hover:border-primary transition-all duration-300 group/btn overflow-hidden"
                  >
                    {/* Animated Scanning Line */}
                    <motion.div
                      animate={{ top: ["-10%", "110%"] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-x-0 h-[1px] bg-primary/20 z-0"
                    />

                    {/* Hover Invert Effect */}
                    <div className="absolute inset-0 bg-primary scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left" />

                    <motion.div
                      animate={{
                        rotate: activeSection === "CONTACT" ? 180 : 0,
                      }}
                      className="relative z-10 group-hover/btn:text-background transition-colors duration-300"
                    >
                      <ArrowDown size={16} />
                    </motion.div>
                  </button>
                </div>

                {/* 3. DYNAMIC DATA STRIP */}
                <div className="mt-3 flex flex-col items-center md:items-end gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[5px] tracking-[0.5em] font-black uppercase text-primary/80">
                      {activeSection === "CONTACT"
                        ? "EXEC::REBOOT"
                        : "EXEC::NEXT_MOD"}
                    </span>
                    <div className="flex gap-0.5">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className={`size-0.5 rounded-full ${i === SECTIONS.indexOf(activeSection) ? "bg-primary" : "bg-primary/20"}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Bitrate decoration */}
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

export default App;

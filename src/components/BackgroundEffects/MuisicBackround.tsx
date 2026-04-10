"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GeometricBackgroundProps {
  className?: string;
}

export default function GeometricBackground({
  className,
}: GeometricBackgroundProps) {
  // Memoize starfield so it's only generated once
  const stars = useMemo(() => {
    return Array.from({ length: 150 }).map(() => ({
      x: Math.random() * 1920,
      y: Math.random() * 1080,
      size: Math.random() * 1.5,
      opacity: 0.3 + Math.random() * 0.7,
    }));
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-0 z-0 pointer-events-none overflow-hidden bg-background text-primary selection:bg-none",
        className,
      )}
    >
      {/* Deep space base - stars field */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.12)_0%,rgba(var(--primary-rgb),0.04)_50%,transparent_100%)]" />

      {/* Starfield - static stars with subtle twinkle */}
      <svg
        className="absolute inset-0 w-full h-full opacity-60"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="star-glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Scattered stars with subtle twinkling */}
        {stars.map((star, i) => (
          <motion.circle
            key={i}
            cx={star.x}
            cy={star.y}
            r={star.size}
            fill="currentColor"
            opacity={star.opacity}
            filter="url(#star-glow)"
            animate={{
              opacity: [star.opacity * 0.6, star.opacity, star.opacity * 0.7],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </svg>

      {/* Nebula clouds - cosmic ambience (ANIMATED BREATHING) */}
      <motion.div
        animate={{
          opacity: [0.2, 0.3, 0.2],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-1/2 -left-1/4 w-300 h-225 rounded-full bg-linear-to-r from-chart-2 via-primary/20 to-transparent blur-[100px]"
      />

      <motion.div
        animate={{
          opacity: [0.15, 0.28, 0.15],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute -bottom-1/2 -right-1/4 w-250 h-200 rounded-full bg-linear-to-l from-chart-2 via-chart-1 to-transparent blur-[120px]"
      />

      <motion.div
        animate={{
          opacity: [0.12, 0.22, 0.12],
          scale: [1, 1.06, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute top-1/3 right-1/4 w-200 h-175 rounded-full bg-linear-to-b from-chart-2 via-transparent to-transparent blur-[100px]"
      />

      {/* Terminal UI overlay - Grid with HUD elements */}
      <svg
        className="absolute inset-0 w-full h-full opacity-15"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="terminal-grid"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <circle cx="0" cy="0" r="0.75" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#terminal-grid)" />
      </svg>

      {/* Terminal frame corners - top left */}
      <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-primary/40" />
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-2 left-2 text-[10px] font-mono text-primary/60 tracking-widest uppercase"
      >
        &gt; AUDIO_KERNEL_INIT
      </motion.div>

      {/* Terminal frame corners - top right */}
      <div className="absolute top-0 right-0 w-24 h-24 border-r-2 border-t-2 border-primary/40" />
      <motion.div
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-2 right-2 text-[10px] font-mono text-primary/50 tracking-widest uppercase text-right"
      >
        SYS_STATUS: READY
      </motion.div>

      {/* Terminal frame corners - bottom left */}
      <div className="absolute bottom-0 left-0 w-24 h-24 border-l-2 border-b-2 border-primary/40" />
      <motion.div
        animate={{ opacity: [0.25, 0.55, 0.25] }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute bottom-2 left-2 text-[10px] font-mono text-primary/60 tracking-widest uppercase"
      >
        STREAM_ACTIVE
      </motion.div>

      {/* Terminal frame corners - bottom right */}
      <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-primary/40" />
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        className="absolute bottom-2 right-2 text-[10px] font-mono text-primary/50 tracking-widest uppercase text-right"
      >
        LATENCY: 12ms
      </motion.div>

      {/* Center HUD circle target (ANIMATED PULSE) */}
      <motion.div
        animate={{
          scale: [0.9, 1.1, 0.9],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="w-1 h-1 bg-primary rounded-full shadow-[0_0_16px_var(--primary)]" />
        <div className="absolute inset-0 -m-3 border border-primary/40" />
        <div className="absolute inset-0 -m-6 border border-primary/20" />
      </motion.div>

      {/* Holographic data stream lines (ANIMATED FLOW) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 1080"
      >
        <defs>
          <linearGradient id="data-stream" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,255,255,0)" />
            <stop offset="50%" stopColor="rgba(0,255,255,1)" />
            <stop offset="100%" stopColor="rgba(0,255,255,0)" />
          </linearGradient>
        </defs>

        {/* Flowing data lines */}
        <motion.polyline
          points="0,540 480,300 960,540 1440,300 1920,540"
          stroke="url(#data-stream)"
          strokeWidth="1"
          fill="none"
          animate={{ strokeDashoffset: [0, -100] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          strokeDasharray="50,50"
        />

        <motion.polyline
          points="0,540 480,780 960,540 1440,780 1920,540"
          stroke="url(#data-stream)"
          strokeWidth="0.8"
          fill="none"
          opacity="0.6"
          animate={{ strokeDashoffset: [0, -100] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
            delay: 1,
          }}
          strokeDasharray="50,50"
        />
      </svg>

      {/* Side info panels (ANIMATED BREATHING) */}
      <motion.div
        animate={{ opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-4 top-1/3 w-40 text-[9px] font-mono text-primary/60 space-y-2"
      >
        <div className="border-l border-primary/40 pl-3">
          <div className="text-primary/80">BUFFER: 128</div>
          <div className="text-primary/50 text-[8px]">LATENCY_LOW</div>
        </div>
        <div className="border-l border-primary/40 pl-3">
          <div className="text-primary/80">SAMPLE: 48kHz</div>
          <div className="text-primary/50 text-[8px]">BIT_DEPTH_24</div>
        </div>
      </motion.div>

      <motion.div
        animate={{ opacity: [0.12, 0.32, 0.12] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute right-4 bottom-1/3 w-40 text-[9px] font-mono text-primary/60 space-y-2 text-right"
      >
        <div className="border-r border-primary/40 pr-3">
          <div className="text-primary/80">CPU: 34%</div>
          <div className="text-primary/50 text-[8px]">NORMAL</div>
        </div>
        <div className="border-r border-primary/40 pr-3">
          <div className="text-primary/80">STREAM: ACTIVE</div>
          <div className="text-primary/50 text-[8px]">1411_KBPS</div>
        </div>
      </motion.div>
    </div>
  );
}

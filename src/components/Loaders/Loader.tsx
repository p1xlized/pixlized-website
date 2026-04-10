"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SystemLoaderProps {
  onComplete?: () => void
  duration?: number // Time in seconds
}

export function SystemLoader({ onComplete, duration = 1.5 }: SystemLoaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-background font-mono"
    >
      {/* BACKGROUND: MICROMESH GRID */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(theme(colors.primary.DEFAULT/0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />

      {/* --- DECORATED WIREFRAME MODULE --- */}
      <div className="relative mb-16 flex size-48 items-center justify-center">
        {/* EXTERNAL CORNER BRACKETS */}
        <div className="absolute inset-0 scale-110">
          <div className="absolute top-0 left-0 size-4 border-t border-l border-primary/30" />
          <div className="absolute top-0 right-0 size-4 border-t border-r border-primary/30" />
          <div className="absolute bottom-0 left-0 size-4 border-b border-l border-primary/30" />
          <div className="absolute right-0 bottom-0 size-4 border-r border-b border-primary/30" />
        </div>

        {/* ROTATING PLANET (HIGH DENSITY) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="relative size-32 rounded-full border border-primary/5"
        >
          {/* Increased Density: Latitude (6 lines) */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`lat-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="absolute inset-0 rounded-full border border-primary/20"
              style={{ transform: `rotateX(${30 + i * 25}deg)` }}
            />
          ))}
          {/* Increased Density: Longitude (6 lines) */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`lng-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 + 0.5 }}
              className="absolute inset-0 rounded-full border border-primary/20"
              style={{ transform: `rotateY(${30 + i * 25}deg)` }}
            />
          ))}

          {/* Equatorial Ring (Heavy) */}
          <div className="absolute inset-0 scale-105 rounded-full border-y border-primary/40" />
        </motion.div>

        {/* HUD DECO: DATA PIPS */}
        <div className="absolute -left-8 flex flex-col gap-1">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              className="h-1 w-3 bg-primary/40"
            />
          ))}
        </div>

        <div className="absolute -right-12 rotate-90 text-[6px] tracking-[0.5em] text-primary/20 uppercase">
          Geometry_Buffer // Static
        </div>

        {/* Core Focal Point */}
        <div className="absolute size-1.5 rounded-full bg-primary shadow-[0_0_20px_var(--primary)]" />
      </div>

      {/* --- PROGRESS MODULE --- */}
      <div className="relative w-72 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-1 animate-pulse bg-primary" />
            <span className="text-[7px] font-bold tracking-[0.5em] text-primary uppercase">
              Uplink_Seq
            </span>
          </div>
          <span className="font-mono text-[7px] text-primary/40">
            0x004_SYSTEM_INIT
          </span>
        </div>

        <div className="relative h-[2px] w-full bg-primary/5">
          {/* Progress Trace */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration, ease: [0.45, 0.05, 0.55, 0.95] }}
            onAnimationComplete={onComplete}
            className="h-full w-full origin-left bg-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.8)]"
          />
          {/* Scanning light "glitch" */}
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
        </div>

        <div className="flex justify-between text-[6px] tracking-widest text-primary/30 uppercase">
          <span>Mem_Alloc: OK</span>
          <span>Kernel: Phosphor_V4</span>
        </div>
      </div>
    </motion.div>
  )
}

export function DataUplink({
  onComplete,
  mode,
}: {
  onComplete: () => void
  mode: "uplink" | "downlink"
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-background font-mono"
    >
      {/* BACKGROUND: MICROMESH GRID (Matching SystemLoader) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(theme(colors.primary.DEFAULT/0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />

      {/* --- CENTRAL TRANSITION MODULE --- */}
      <div className="relative flex flex-col items-center">

        {/* EXTERNAL DECORATIVE BRACKETS */}
        <div className="absolute -inset-16 pointer-events-none opacity-40">
          <div className="absolute top-0 left-0 size-6 border-t border-l border-primary/40" />
          <div className="absolute bottom-0 right-0 size-6 border-b border-r border-primary/40" />

          {/* Moving scan line during transition */}
          <motion.div
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-px bg-primary/20 shadow-[0_0_10px_var(--primary)]"
          />
        </div>

        {/* CORE SIGNAL INDICATOR */}
        <div className="relative mb-8 flex size-20 items-center justify-center">
          <motion.div
            animate={{
              rotate: mode === "uplink" ? 180 : -180,
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute size-full border border-dashed border-primary/60 rounded-sm"
          />
          <div className="size-2 bg-primary shadow-[0_0_15px_var(--primary)] rotate-45" />
        </div>

        {/* DATA STREAM IDENTITY */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="size-1 bg-primary animate-pulse" />
            <span className="text-[8px] font-black tracking-[0.6em] text-primary uppercase">
              {mode === "uplink" ? "Establish_Data_Link" : "Close_Archive_Sync"}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[6px] text-primary/30 font-mono tracking-widest">
              TX_BUFF_04
            </span>
            <div className="h-[1px] w-32 bg-primary/10 relative overflow-hidden">
               {/* THE ACTUAL PROGRESS TRACE */}
               <motion.div
                initial={{ x: mode === "uplink" ? "-100%" : "100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                onAnimationComplete={onComplete}
                className="h-full w-full bg-primary shadow-[0_0_10px_var(--primary)]"
              />
            </div>
            <span className="text-[6px] text-primary/30 font-mono tracking-widest">
              {mode === "uplink" ? "MODE_EXPLORE" : "MODE_INDEX"}
            </span>
          </div>
        </div>

        {/* SIDE DATA BITS (Vertical coordinates) */}
        <div className="absolute -right-24 top-1/2 -translate-y-1/2 flex flex-col gap-4 opacity-20">
           <div className="h-12 w-px bg-gradient-to-b from-transparent via-primary to-transparent" />
           <span className="text-[6px] [writing-mode:vertical-lr] tracking-[0.5em] uppercase">Bit_Stream_Active</span>
        </div>

        <div className="absolute -left-24 top-1/2 -translate-y-1/2 flex flex-col items-end gap-4 opacity-20">
           <span className="text-[6px] [writing-mode:vertical-lr] rotate-180 tracking-[0.5em] uppercase">Auth_Encrypted_RSA</span>
           <div className="h-12 w-px bg-gradient-to-b from-transparent via-primary to-transparent" />
        </div>

        {/* BOTTOM METADATA PIPS */}
        <div className="mt-12 flex gap-2">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                backgroundColor: ["rgba(var(--primary-rgb), 0.1)", "rgba(var(--primary-rgb), 0.8)", "rgba(var(--primary-rgb), 0.1)"]
              }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
              className="h-1 w-4 bg-primary/10"
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Waveform } from "@phosphor-icons/react";

interface InlineLoaderProps {
  onComplete: () => void;
}

export default function AudioBootLoader({ onComplete }: InlineLoaderProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center font-mono text-primary overflow-hidden selection:bg-primary/20"
    >
      {/* Heavy CRT & Scanline overlays to preserve the interface design system */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(theme(colors.primary.DEFAULT/0.04)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />
      <motion.div
        animate={{ y: ["-100%", "100%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[1px] bg-primary/20 pointer-events-none"
      />

      {/* --- AUDIO SYNTHESIS CENTRAL HARDWARE GEOMETRY --- */}
      <div className="relative size-40 md:size-48 flex items-center justify-center mb-8">
        {/* Outer Radial Step-Sequencer Rings */}
        <motion.svg
          viewBox="0 0 100 100"
          className="absolute inset-0 size-full overflow-visible text-primary/30"
        >
          {/* Outer Ring: Variable Sample Rate Nodes */}
          <motion.circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="1 8"
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          {/* Mid Ring: Phase Cancellation Arc */}
          <motion.circle
            cx="50"
            cy="50"
            r="36"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeDasharray="40 120"
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
        </motion.svg>

        {/* Concentric Audio Spectrum Waveforms (Nested Circles) */}
        <div className="absolute inset-0 flex items-center justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                height: ["16px", `${40 + i * 14}px`, "16px"],
                opacity: [0.2, 0.7, 0.2],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.12,
                ease: "easeInOut",
              }}
              className="w-[2px] bg-primary rounded-full shadow-[0_0_8px_var(--primary)]"
            />
          ))}
        </div>

        {/* Oscilloscope Corner Target Lines */}
        <div className="absolute top-2 left-2 size-2 border-t border-l border-primary/40" />
        <div className="absolute top-2 right-2 size-2 border-t border-r border-primary/40" />
        <div className="absolute bottom-2 left-2 size-2 border-b border-l border-primary/40" />
        <div className="absolute bottom-2 right-2 size-2 border-b border-r border-primary/40" />
      </div>

      {/* --- SIGNAL PATHWAY DATA --- */}
      <div className="flex flex-col items-center gap-3.5 w-full max-w-xs px-4">
        {/* Module Header */}
        <div className="flex items-center gap-2 text-xs font-black tracking-[0.35em] uppercase text-foreground">
          <Waveform size={16} className="text-primary animate-pulse" />
          <span>Syncing_Audio_Engine</span>
        </div>

        {/* Linear Signal Decibel Level Bar */}
        <div className="w-full h-[3px] border border-primary/20 bg-card/10 relative rounded-sm overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary/60 to-primary shadow-[0_0_6px_var(--primary)]"
          />
        </div>

        {/* Frequency & Buffer Stream Readout */}
        <div className="text-[8px] opacity-50 tracking-[0.2em] font-mono h-3 overflow-hidden w-full text-center uppercase">
          <motion.div
            animate={{ y: ["0%", "-20%", "-40%", "-60%", "-80%"] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "steps(5, end)",
            }}
            className="flex flex-col gap-0.5"
          >
            <span>[44.1kHz] // INIT_BUFFER_32BIT</span>
            <span>[SYS_GEN] // CLOCK_SYNC_EXTERNAL</span>
            <span>[LOW_PASS] // RES_SET_0.707</span>
            <span>[DSP_CORE] // CALIBRATING_LFO_1</span>
            <span>[OUT_VAL] // NOISE_FLOOR_-96dB</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

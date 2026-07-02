"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SystemLoaderProps {
  onComplete?: () => void;
  duration?: number; // Overall boot sequence duration in seconds
}

const BOOT_LOGS = [
  "INIT: PHOSPHOR_CORE_v4.2026.1 SUCCESS",
  "CPU: QUANTUM_STREAM_x64 @ 8.40GHz (OK)",
  "MEM: 262,144 MB RAM ALLOCATED // VIRT_SWAP: OK",
  "DRV: MOUNTING ENCRYPTED_VFS_ARCHIVE...",
  "NET: ESTABLISHING QUANTUM_UPLINK... PORT_773",
  "SEC: AUTH_TOKEN_VALIDATED [TYPE: RSA_2048]",
  "HUD: SYNCING GEOMETRY_BUFFERS...",
  "SYS: LAUNCHING KERNEL_PHOSPHOR...",
];

export function SystemLoader({
  onComplete,
  duration = 2.0,
}: SystemLoaderProps) {
  const [currentLogs, setCurrentLogs] = useState<string[]>([]);

  useEffect(() => {
    // Dynamically feed lines to look like an active terminal boot stream
    const totalLines = BOOT_LOGS.length;
    const intervalTime = (duration * 1000 * 0.7) / totalLines; // Leave room for the final 100% trace

    const intervals = BOOT_LOGS.map((log, index) => {
      return setTimeout(() => {
        setCurrentLogs((prev) => [...prev, log].slice(-5)); // Keep last 5 lines visible
      }, index * intervalTime);
    });

    return () => intervals.forEach(clearTimeout);
  }, [duration]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
      transition={{ ease: "easeInOut", duration: 0.3 }}
      className="fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden bg-transparent p-6 font-mono text-primary select-none"
    >
      {/* BACKGROUND: TIGHT CRT SCANLINES / MICROGRID */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] opacity-30" />

      {/* HEADER STATUS */}
      <div className="flex items-center justify-between text-[8px] uppercase tracking-[0.3em] border-b border-primary/20 pb-2">
        <div className="flex items-center gap-2">
          <div className="size-1.5 animate-ping bg-primary rounded-full" />
          <span>PHOSPHOR_BOOT_SEQUENCE</span>
        </div>
        <span>SYS_REV_4.0</span>
      </div>

      {/* CORE TERMINAL OUTPUT AREA */}
      <div className="flex flex-1 flex-col justify-end gap-1.5 py-12 text-[10px] tracking-wider leading-relaxed text-primary/90">
        <AnimatePresence mode="popLayout">
          {currentLogs.map((log, index) => (
            <motion.div
              key={log}
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: index === currentLogs.length - 1 ? 1 : 0.4,
                x: 0,
              }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="flex items-start gap-2 font-mono"
            >
              <span className="text-primary/40 text-[9px] select-none">
                $&gt;
              </span>
              <span>{log}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* FOOTER PROGRESS MODULE */}
      <div className="space-y-3 border-t border-primary/20 pt-4">
        <div className="relative h-[4px] w-full bg-primary/10 overflow-hidden rounded-xs border border-primary/20">
          {/* Main fast-fill trace */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration, ease: [0.25, 1, 0.5, 1] }}
            onAnimationComplete={onComplete}
            className="h-full w-full origin-left bg-primary shadow-[0_0_12px_var(--primary)]"
          />
        </div>

        <div className="flex justify-between text-[8px] tracking-[0.2em] text-primary/40 uppercase">
          <div className="flex gap-4">
            <span>MEM_BLOCK: LOCK_OK</span>
            <span>SECURE_BOOT: ENABLED</span>
          </div>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.6 }}
            className="font-bold text-primary"
          >
            SYS_READY //
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}

export function DataUplink({
  onComplete,
  mode,
}: {
  onComplete: () => void;
  mode: "uplink" | "downlink";
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-blend-saturation font-mono text-primary select-none"
    >
      {/* MINIMALIST COMPACT DATALINK PANEL */}
      <div className="w-64 space-y-4">
        {/* TOP STATUS AND INDICATOR DIRECTION */}
        <div className="flex items-center justify-between border-b border-primary/20 pb-1.5 text-[8px] tracking-[0.4em] uppercase">
          <span className="font-bold">
            {mode === "uplink" ? "▲ SYNC_CONNECT" : "▼ SYNC_DISCONNECT"}
          </span>
          <span className="text-primary/40">SPEED_MAX</span>
        </div>

        {/* ULTRA FAST PROGRESS TRACE */}
        <div className="h-[2px] w-full bg-primary/10 relative overflow-hidden">
          <motion.div
            initial={{ x: mode === "uplink" ? "-100%" : "100%" }}
            animate={{ x: "0%" }}
            // Compressed to 0.4s for raw tactical speed
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={onComplete}
            className="h-full w-full bg-primary shadow-[0_0_8px_var(--primary)]"
          />
        </div>

        {/* METADATA PIP FEED */}
        <div className="flex items-center justify-between text-[6px] text-primary/30 tracking-widest uppercase">
          <span>TX_STREAM_OK</span>
          <div className="flex gap-0.5">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{
                  duration: 0.4,
                  repeat: Infinity,
                  delay: i * 0.08,
                }}
                className="size-1 bg-primary"
              />
            ))}
          </div>
          <span>PIPE_V42</span>
        </div>
      </div>
    </motion.div>
  );
}

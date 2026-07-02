"use client";

import React from "react";
import { motion } from "framer-motion";
import { WarningCircle } from "@phosphor-icons/react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-transparent px-4 text-center text-foreground overflow-hidden">
      {/* Soft Ambient Background Glows */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-[100px] delay-700" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        {/* Colorful Gradient Transparent 404 */}
        <div className="relative select-none font-black leading-none">
          <motion.h1
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ bgSize: "200% auto" }}
            className="bg-gradient-to-r from-sky-400 via-violet-400 to-emerald-400 bg-clip-text text-8xl tracking-tighter text-transparent sm:text-9xl"
          >
            404
          </motion.h1>
        </div>

        {/* Floating Minimal Badge */}
        <div className="mt-4 flex items-center gap-1.5 rounded-full border border-primary/10 bg-primary/[0.02] px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-primary/60 backdrop-blur-md">
          <WarningCircle size={12} className="text-violet-400 animate-pulse" />
          <span>System Exception</span>
        </div>

        <h2 className="mt-6 text-2xl font-bold tracking-tight text-foreground/90">
          Lost in the matrix.
        </h2>

        <p className="mt-2 text-sm text-muted-foreground/80 max-w-xs">
          I don't know what you are searching <br />
          (╥﹏╥)
        </p>

        {/* Clean, Small GIF container */}
        <div className="mt-8 relative max-w-42 overflow-hidden p-1.5 backdrop-blur-sm  transition-all duration-500 hover:grayscale-0 hover:border-primary/30">
          <img
            src="/assets/orks.gif"
            alt="404 orks"
            className="h-42-full rounded-lg object-contain opacity-70 transition-opacity duration-300 hover:opacity-100"
          />
        </div>

        {/* Transparent Button with Hover Flow Effect */}
        <a
          href="/"
          className="group relative mt-10 overflow-hidden rounded-md border border-primary/25 bg-transparent px-6 py-3 text-xs font-semibold tracking-widest uppercase text-foreground/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/60 hover:text-foreground hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]"
        >
          <span className="relative z-10">Return to Safety</span>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-violet-500/0 via-primary/5 to-emerald-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </a>
      </motion.div>
    </div>
  );
}

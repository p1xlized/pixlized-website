"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Fingerprint,
  Target,
  GraphIcon,
  Plus,
  ArrowRight,
  ArrowLeft,
} from "@phosphor-icons/react";

interface Testimonial {
  id: string | number;
  content: string;
  author: string;
  role: string;
  hash?: string;
}

interface Props {
  data: Testimonial[];
}

export default function DataFragmentReviews({ data }: Props) {
  const [index, setIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const current = useMemo(() => data[index], [data, index]);

  useEffect(() => {
    if (!isAutoPlay || data.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % data.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isAutoPlay, data.length]);

  const navigate = useCallback(
    (dir: number) => {
      setIndex((prev) => (prev + dir + data.length) % data.length);
      setIsAutoPlay(false);
    },
    [data.length],
  );

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-32 font-mono select-none relative overflow-hidden">
      {/* 1. TOP DECORATIVE RAIL */}
      <div className="flex items-center gap-3 mb-8 md:mb-12 opacity-60">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-primary/40" />
        <Plus size={10} className="text-primary animate-spin-slow shrink-0" />
        <span className="text-base md:text-base tracking-[0.4em] md:tracking-[0.6em] uppercase whitespace-nowrap">
          User_Validation
        </span>
        <div className="h-[1px] w-12 md:w-24 bg-primary/40" />
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-12 items-center">
        {/* 2. FLOATING NAV: LEFT */}
        <div className="hidden lg:flex lg:col-span-1 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="group relative py-12 px-2 transition-all"
          >
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-primary/10 group-hover:bg-primary/40 transition-colors" />
            <ArrowLeft
              size={18}
              className="relative z-10 text-primary/30 group-hover:text-primary group-hover:-translate-x-1 transition-all mr-6"
            />
            <span className="absolute top-1/2 -left-6 -translate-y-1/2 [writing-mode:vertical-lr] text-[6px] tracking-[0.3em] opacity-0 group-hover:opacity-40 transition-opacity whitespace-nowrap">
              PREV_NODE
            </span>
          </button>
        </div>

        {/* 3. CENTER CONTENT FRAGMENT */}
        <div className="lg:col-span-10 relative">
          {/* Brackets - Hidden on very small screens, smaller on mobile */}
          <div className="absolute -top-3 -left-3 md:-top-6 md:-left-6 size-6 md:size-12 border-t border-l border-primary/30" />
          <div className="absolute -bottom-3 -right-3 md:-bottom-6 md:-right-6 size-6 md:size-12 border-b border-r border-primary/30" />

          <div className="relative px-2 py-6 md:px-6 md:py-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 0.99, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.01, filter: "blur(8px)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-8 md:space-y-12"
              >
                {/* Meta Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 md:gap-3">
                    <Target size={16} className="text-primary/40 shrink-0" />
                    <div className="h-[1px] w-6 md:w-12 bg-primary/20" />
                    <span className="text-[8px] md:text-[10px] text-primary tracking-widest uppercase truncate max-w-[120px] md:max-w-none">
                      {current.role}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[9px] md:text-[10px] text-primary/40  tabular-nums">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <ShieldCheck size={14} className="text-primary/60" />
                  </div>
                </div>

                {/* Main Quote */}
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-4xl  tracking-tighter text-foreground uppercase leading-[1.1] text-center md:text-left">
                  "{current.content}"
                </h2>

                {/* Author Block */}
                <div className="flex flex-col sm:flex-row items-center justify-between pt-6 md:pt-8 border-t border-primary/10 gap-6">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="size-8 md:size-10 border border-primary/30 flex items-center justify-center bg-primary/5 shrink-0">
                      <Fingerprint size={16} className="text-primary/60" />
                    </div>
                    <div className="text-center sm:text-left">
                      <div className="text-base md:text-xl font-black text-primary leading-none uppercase">
                        {current.author}
                      </div>
                      <div className="text-[7px] md:text-[8px] tracking-[0.2em] md:tracking-[0.4em] opacity-40 mt-1 font-mono">
                        HASH::{current.hash || "0x7721"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <GraphIcon
                      size={14}
                      className="text-primary/60 animate-pulse shrink-0"
                    />
                    <div className="flex gap-1 md:gap-1.5">
                      {data.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setIndex(i);
                            setIsAutoPlay(false);
                          }}
                          className={`size-1 rotate-45 transition-all duration-500 hover:bg-primary/50 ${
                            index === i
                              ? "bg-primary scale-125 shadow-[0_0_8px_var(--primary)]"
                              : "bg-primary/10"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 4. FLOATING NAV: RIGHT */}
        <div className="hidden lg:flex lg:col-span-1 justify-center">
          <button
            onClick={() => navigate(1)}
            className="group relative py-12 px-2 transition-all"
          >
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-primary/10 group-hover:bg-primary/40 transition-colors" />
            <ArrowRight
              size={18}
              className="relative z-10 text-primary/30 group-hover:text-primary group-hover:translate-x-1 transition-all ml-6"
            />
            <span className="absolute top-1/2 -right-6 -translate-y-1/2 [writing-mode:vertical-lr] text-[6px] tracking-[0.3em] opacity-0 group-hover:opacity-40 transition-opacity whitespace-nowrap">
              NEXT_NODE
            </span>
          </button>
        </div>
      </div>

      {/* 5. MOBILE/TABLET NAV (Visible below LG breakpoint) */}
      <div className="flex lg:hidden justify-center gap-8 md:gap-16 mt-10 md:mt-12">
        <button
          onClick={() => navigate(-1)}
          className="text-primary/40 hover:text-primary transition-colors flex items-center gap-2 group active:scale-95"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform mr-6"
          />
          <span className="text-[8px] md:text-[9px] tracking-[0.2em] font-bold">
            PREV
          </span>
        </button>
        <button
          onClick={() => navigate(1)}
          className="text-primary/40 hover:text-primary transition-colors flex items-center gap-2 group active:scale-95"
        >
          <span className="text-[8px] md:text-[9px] tracking-[0.2em] font-bold">
            NEXT
          </span>
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>

      {/* 6. BOTTOM DECORATIVE RAIL */}
      <div className="flex items-center gap-3 mt-10 md:mt-16 opacity-30">
        <div className="h-[1px] w-12 md:w-24 bg-primary/40" />
        <span className="text-[7px] md:text-[8px] tracking-[0.3em] md:tracking-[0.5em] uppercase whitespace-nowrap italic font-mono">
          Feed_Active__{index + 1}
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-primary/40" />
      </div>
    </section>
  );
}

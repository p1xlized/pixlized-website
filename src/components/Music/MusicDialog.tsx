"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Database,
  Clock,
  TerminalWindow,
  HardDrive,
  GraphIcon,
  ShieldCheck,
  Globe,
  MusicNotes,
  CaretLeft,
  CaretRight,
  SlidersHorizontal,
  Waveform,
  Disc,
  GearSix,
} from "@phosphor-icons/react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

type DawSlide = {
  title: string;
  subtitle: string;
  imageUrl: string;
  note: string;
};

const dawSlides: DawSlide[] = [
  {
    title: "Ableton Session View",
    subtitle: "DAW Workflow Snapshot",
    imageUrl: "/assets/imgs/bitwig-1.jpg",
    note: "Basic Bitwig view",
  },
  {
    title: "SurgeXT view",
    subtitle: "My main synth for the past 3 years",
    imageUrl: "/assets/imgs/bitwig-2.jpg",
    note: "Surgical EQ, glue compression and harmonic coloration.",
  },
];

export function MusicDialog() {
  const [time, setTime] = useState("");
  const [slideIndex, setSlideIndex] = useState(0);
  const kernelVersion = "6.12.arch1-1";

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const auto = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % dawSlides.length);
    }, 4500);
    return () => clearInterval(auto);
  }, []);

  const activeSlide = useMemo(() => dawSlides[slideIndex], [slideIndex]);

  const goPrev = () =>
    setSlideIndex((prev) => (prev - 1 + dawSlides.length) % dawSlides.length);
  const goNext = () => setSlideIndex((prev) => (prev + 1) % dawSlides.length);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 group hover:text-primary transition-colors outline-none font-mono">
          <Database
            size={18}
            className="text-primary/60 group-hover:text-primary group-hover:scale-110 transition-all"
          />
          <span className="hidden md:inline text-[9px] uppercase tracking-widest opacity-60 group-hover:opacity-100">
            Studio Specs
          </span>
        </button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="max-w-5xl bg-background/95 backdrop-blur-xl border border-primary/20 p-0 gap-0 shadow-2xl rounded-none font-mono overflow-hidden"
      >
        {/* Header */}
        <div className="h-8 border-b border-primary/15 bg-primary/5 px-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="size-1 rounded-full bg-primary animate-pulse shadow-[0_0_8px_var(--primary)]" />
              <span className="text-[8px] text-primary/80 uppercase tracking-[0.4em]">
                Studio_Inspect_Active
              </span>
            </div>
            <span className="text-[8px] text-primary/20 uppercase tracking-[0.2em] hidden md:block">
              Node: AUDIO_KERNEL_X64
            </span>
          </div>
          <div className="flex items-center gap-4 text-[8px] text-primary/40">
            <span className="flex items-center gap-1.5 tracking-widest uppercase">
              <Clock size={10} /> {time}
            </span>
          </div>
        </div>

        {/* Main */}
        <div className="p-6 md:p-8 grid grid-cols-1 xl:grid-cols-[1.1fr_1fr] gap-8">
          {/* LEFT: Production details */}
          <div className="space-y-7">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TerminalWindow size={20} className="text-primary/40" />
                <h2 className="text-xl md:text-2xl uppercase tracking-tight text-foreground/90 leading-none">
                  Music_Production_Stack
                </h2>
              </div>
              <p className="text-[8px] text-primary/30 uppercase tracking-[0.45em] italic">
                Low_Latency_Signal_Path_Verified
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary/50">
                  <MusicNotes size={14} />
                  <span className="text-[9px] uppercase tracking-widest">
                    DAW + Composition
                  </span>
                </div>
                {[
                  { label: "Primary_DAW", value: "Bitwig Studio" },
                  {
                    label: "Guitars Amps",
                    value: "Amped amps VST & Solidus Randy 250",
                  },
                  {
                    label: "Drums",
                    value: "Drum Guismo VST & Mjollnir Drums VST",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="border-l border-primary/20 pl-4 hover:border-primary/50 transition-colors"
                  >
                    <p className="text-[10px] text-foreground/85 uppercase tracking-tight">
                      {item.value}
                    </p>
                    <p className="text-[7px] text-primary/35 uppercase italic mt-1">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary/50">
                  <SlidersHorizontal size={14} />
                  <span className="text-[9px] uppercase tracking-widest">
                    Sound + Mix
                  </span>
                </div>
                {[
                  { label: "Synths", value: "Serum / Vital / PhasePlant" },
                  {
                    label: "FX_Suite",
                    value: "Audiotority Pedals",
                  },
                  {
                    label: "Compression and post processing",
                    value: "OTT + Analog Obsession + Limiter",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="border-l border-primary/20 pl-4 hover:border-primary/50 transition-colors"
                  >
                    <p className="text-[10px] text-foreground/85 uppercase tracking-tight">
                      {item.value}
                    </p>
                    <p className="text-[7px] text-primary/35 uppercase italic mt-1">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: Cpu, label: "Buffer", value: "128" },
                { icon: Waveform, label: "SampleRate", value: "48k" },
                { icon: Disc, label: "BitDepth", value: "24-bit" },
                { icon: GearSix, label: "Latency", value: "Low" },
              ].map((m) => (
                <div
                  key={m.label}
                  className="border border-primary/15 bg-primary/3 p-3 hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-center gap-2 text-primary/40 mb-1">
                    <m.icon size={12} />
                    <span className="text-[7px] uppercase tracking-widest">
                      {m.label}
                    </span>
                  </div>
                  <div className="text-[10px] font-bold text-primary/85">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Carousel */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary/45">
                <GraphIcon size={14} />
                <span className="text-[9px] uppercase tracking-widest">
                  Studio_Capture_Carousel
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={goPrev}
                  className="size-7 border border-primary/30 text-primary/70 hover:text-primary hover:border-primary transition-colors flex items-center justify-center"
                >
                  <CaretLeft size={12} />
                </button>
                <button
                  onClick={goNext}
                  className="size-7 border border-primary/30 text-primary/70 hover:text-primary hover:border-primary transition-colors flex items-center justify-center"
                >
                  <CaretRight size={12} />
                </button>
              </div>
            </div>

            <div className="relative border border-primary/25 bg-primary/3 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide.title}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-0"
                >
                  <div className="relative h-60 md:h-72 overflow-hidden">
                    <img
                      src={activeSlide.imageUrl}
                      alt={activeSlide.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-[11px] md:text-xs font-bold uppercase tracking-wide text-primary">
                        {activeSlide.title}
                      </p>
                      <p className="text-[9px] text-primary/75 uppercase tracking-wider mt-1">
                        {activeSlide.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 border-t border-primary/15">
                    <p className="text-[10px] text-primary/70 leading-relaxed uppercase tracking-tight">
                      <span className="text-primary mr-2">/&gt;</span>
                      {activeSlide.note}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2">
              {dawSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSlideIndex(idx)}
                  className={`h-1.5 flex-1 transition-all ${
                    idx === slideIndex
                      ? "bg-primary shadow-[0_0_8px_var(--primary)]"
                      : "bg-primary/20 hover:bg-primary/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="h-8 border-t border-primary/15 bg-background px-4 flex items-center justify-between shrink-0">
          <div className="flex gap-8 text-[7px] tracking-[0.3em] text-primary/20 uppercase">
            <span className="flex items-center gap-2">
              <HardDrive size={12} className="opacity-40" /> KERNEL:{" "}
              {kernelVersion}
            </span>
            <span className="hidden sm:inline italic">
              #AUDIO_PIPELINE_STABLE
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[7px] text-primary/10 uppercase tracking-widest">
              Process_Rate
            </span>
            <div className="h-px w-20 bg-primary/5 overflow-hidden">
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="h-full bg-primary/30"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MusicDialog;

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  MapPin,
  Translate,
  Circle,
  DownloadSimple,
  TerminalWindow,
} from "@phosphor-icons/react";

const UI_DATA = {
  tools: [
    { src: `https://cdn.simpleicons.org/react/61DAFB`, alt: "React" },
    { src: `https://cdn.simpleicons.org/typescript/3178C6`, alt: "TS" },
    { src: `https://cdn.simpleicons.org/postgresql/4169E1`, alt: "SQL" },
    { src: `https://cdn.simpleicons.org/godotengine/478CBF`, alt: "Godot" },
    { src: `https://cdn.simpleicons.org/python/3776AB`, alt: "Py" },
    { src: `https://cdn.simpleicons.org/linux/FCC624`, alt: "Linux" },
    { src: `https://cdn.simpleicons.org/flutter/02569B`, alt: "Flt" },
    { src: `https://cdn.simpleicons.org/go/00ADD8`, alt: "Go" },
    { src: `https://cdn.simpleicons.org/dotnet/512BD4`, alt: ".Net" },
  ],
  stats: [
    { label: "LOC", val: "Europe | FI", icon: MapPin },
    { label: "LNG", val: "FR / EN / RU / RO", icon: Translate },
    { label: "STS", val: "ACTIVE_NODE", icon: Circle },
  ],
};

const CornerPins = () => (
  <>
    <div className="absolute top-1.5 left-1.5 size-1 bg-primary/40 rounded-full" />
    <div className="absolute top-1.5 right-1.5 size-1 bg-primary/40 rounded-full" />
    <div className="absolute bottom-1.5 left-1.5 size-1 bg-primary/40 rounded-full" />
    <div className="absolute bottom-1.5 right-1.5 size-1 bg-primary/40 rounded-full" />
  </>
);

const EncryptionBackground = () => (
  <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04] flex items-center justify-center scale-150 md:scale-100">
    <motion.svg
      width="800"
      height="800"
      viewBox="0 0 100 100"
      animate={{ rotate: 360 }}
      transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      className="text-primary"
    >
      <circle
        cx="50"
        cy="50"
        r="48"
        stroke="currentColor"
        strokeWidth="0.1"
        fill="none"
        strokeDasharray="1 3"
      />
      <motion.rect
        x="25"
        y="25"
        width="50"
        height="50"
        stroke="currentColor"
        strokeWidth="0.1"
        fill="none"
        animate={{ rotate: -180 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <circle
        cx="50"
        cy="50"
        r="35"
        stroke="currentColor"
        strokeWidth="0.2"
        fill="none"
      />
      <path
        d="M10,50 L90,50 M50,10 L50,90"
        stroke="currentColor"
        strokeWidth="0.05"
      />
    </motion.svg>
  </div>
);

export default function ProfileBento() {
  const [isPhotoHovered, setIsPhotoHovered] = useState(false);

  const handleCVDownload = () => {
    const link = document.createElement("a");
    link.href = "/assets/cv/CV.pdf";
    link.download = "Paduret_Aleksandr_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.9, scale: 1 }}
      className="relative col-span-12 flex min-h-160 flex-col overflow-hidden border-2 border-primary/20 bg-background/80 font-mono shadow-[0_0_60px_rgba(0,0,0,0.6)] backdrop-blur-md"
    >
      <EncryptionBackground />

      <div className="grid flex-1 grid-cols-1 md:grid-cols-12">
        {/* --- LEFT: IDENTITY --- */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-8 border-r border-primary/10 bg-primary/1 relative">
          <div className="absolute top-0 left-0 p-4 opacity-20 flex items-center gap-2">
            <TerminalWindow size={16} />
            <span className="text-[8px] font-black uppercase tracking-widest">
              p1xlized.sys
            </span>
          </div>

          <div className="mt-4">
            <div
              className="relative group/photo mb-8"
              onMouseEnter={() => setIsPhotoHovered(true)}
              onMouseLeave={() => setIsPhotoHovered(false)}
            >
              <div className="relative size-48 overflow-hidden border border-primary/30 bg-background transition-all group-hover/photo:border-primary">
                <img
                  src="https://avatars.githubusercontent.com/u/72890769?v=4"
                  className="size-full object-cover grayscale transition-all duration-700 group-hover/photo:grayscale-0"
                  alt="Identity"
                />
                <AnimatePresence>
                  {isPhotoHovered && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-primary/20 backdrop-blur-sm"
                    >
                      <ShieldCheck
                        size={48}
                        weight="fill"
                        className="text-primary drop-shadow-[0_0_20px_var(--primary)]"
                      />
                      <span className="mt-2 text-[7px] font-black uppercase tracking-[0.4em] text-primary bg-background/90 px-2 py-1 border border-primary/40">
                        ID_VALIDATED
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-size-[100%_4px] opacity-20" />
              </div>
              <div className="absolute -top-2 -left-2 size-8 border-t-2 border-l-2 border-primary/40" />
              <div className="absolute -bottom-2 -right-2 size-8 border-b-2 border-r-2 border-primary/40" />
            </div>

            {/* Info Below Image */}
            <div className="mb-6 p-3 border border-primary/20 bg-primary/5 rounded text-center w-full">
              <div className="flex items-center gap-2 mb-2 justify-center">
                <div className="h-1 w-1 bg-primary animate-ping rounded-full" />
                <span className="text-[7px] font-black text-primary uppercase tracking-[0.3em]">
                  Dossier_Meta
                </span>
              </div>
              <div className="space-y-1 text-[8px]">
                <div className="flex items-center justify-between">
                  <span className="text-primary/40">Ver:</span>
                  <span className="text-primary/70">2026.03</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-primary/40">Status:</span>
                  <span className="text-primary">STABLE</span>
                </div>
              </div>
            </div>

            <div className="text-center w-full max-w-xs">
              <div className="mb-6">
                <span className="text-[9px] font-black text-primary/40 uppercase tracking-[0.6em] block mb-1">
                  p1xlized
                </span>
                <h2 className="text-3xl font-black uppercase tracking-tighter text-foreground leading-none">
                  Paduret. A
                </h2>
              </div>

              <div className="space-y-2.5">
                {UI_DATA.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center justify-between border-b border-primary/5 pb-1.5"
                  >
                    <div className="flex items-center gap-2.5 opacity-40">
                      <stat.icon
                        size={12}
                        className={
                          stat.label === "STS"
                            ? "animate-pulse text-primary"
                            : ""
                        }
                      />
                      <span className="text-[7px] font-black tracking-[0.2em] uppercase">
                        {stat.label}
                      </span>
                    </div>
                    <span className="text-[10px] font-black text-foreground uppercase tracking-widest">
                      {stat.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT: UPLINK CONTROL & ARSENAL --- */}
        <div className="md:col-span-8 flex flex-col">
          <div className="flex-1 p-10 md:p-14 flex flex-col items-center justify-center">
            <div className="flex flex-col md:flex-row items-center gap-10 mb-12 w-full max-w-xl">
              <div className="relative group/qr p-4 bg-white shadow-[0_0_80px_rgba(255,255,255,0.1)]">
                <img
                  src="/assets/cv/qrcode.svg"
                  alt="Profile QR Code"
                  className="w-40 h-40 object-contain"
                />
                <div className="absolute -top-4 -left-4 size-14 border-t-4 border-l-4 border-primary" />
                <div className="absolute -bottom-4 -right-4 size-14 border-b-4 border-r-4 border-primary" />
              </div>
              <div className="flex flex-col gap-4 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <div className="size-2 bg-primary animate-ping rounded-full" />
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">
                    System_Uplink
                  </span>
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tighter text-foreground/90 leading-[0.9]">
                  Establish_
                  <br />
                  Contact_Now
                </h3>
                <div className="h-0.5 w-full bg-primary/20" />
                <p className="text-[8px] font-mono text-primary/40 uppercase tracking-[0.3em]">
                  Status: Awaiting_Handshake
                </p>
              </div>
            </div>

            <div className="w-full max-w-xl">
              <div className="flex items-center gap-4 mb-6 opacity-30">
                <div className="h-px flex-1 bg-primary/30" />
                <span className="text-[8px] font-black tracking-[0.6em] uppercase whitespace-nowrap">
                  Arsenal_Integrated
                </span>
                <div className="h-px flex-1 bg-primary/30" />
              </div>
              <div className="grid grid-cols-9 gap-4">
                {UI_DATA.tools.map((tool) => (
                  <div
                    key={tool.alt}
                    className="aspect-square flex items-center justify-center border border-primary/10 bg-primary/3 transition-colors hover:border-primary/40"
                  >
                    <img
                      src={tool.src}
                      alt={tool.alt}
                      className="size-6 transition-all group-hover:brightness-125"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* --- CV DOWNLOAD BUTTON (CLEAN & SIMPLE) --- */}
          <motion.button
            onClick={handleCVDownload}
            className="group relative w-full py-6 px-8 bg-primary/8 hover:bg-primary/15 border-t border-primary/20 transition-all duration-500 cursor-pointer overflow-hidden"
          >
            {/* Subtle background animation */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              animate={{ backgroundPosition: ["0% 0%", "100% 0%"] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                backgroundImage: `linear-gradient(90deg, transparent, rgba(var(--primary-rgb), 0.1), transparent)`,
                backgroundSize: "200% 100%",
              }}
            />

            <div className="relative z-10 flex items-center justify-between gap-6">
              {/* Left: Icon & Label */}
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex-shrink-0"
                >
                  <DownloadSimple
                    size={32}
                    weight="fill"
                    className="text-primary group-hover:text-primary/80 transition-colors"
                  />
                </motion.div>
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">
                      Download
                    </span>
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-tight text-foreground group-hover:text-primary transition-colors">
                    Curriculum_Vitae
                  </h3>
                </div>
              </div>

              {/* Right: File Info */}
              <div className="flex-shrink-0 text-right border-l border-primary/20 pl-6">
                <div className="text-[9px] font-mono text-primary/60 mb-1">
                  PDF • 1.2MB
                </div>
                <div className="text-[8px] font-mono text-primary/40 uppercase tracking-widest">
                  Ready
                </div>
              </div>
            </div>

            {/* Bottom accent line */}
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-primary"
              initial={{ width: "0%" }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </motion.button>
        </div>
      </div>
      <CornerPins />
    </motion.div>
  );
}

"use client";

import React from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Code,
  Archive,
  Broadcast,
  GithubLogo,
  LinkedinLogo,
  CaretDoubleRight,
  UserFocus,
} from "@phosphor-icons/react";
import { UI_DATA } from "../constants";
import CornerMarkers from "./CornerMarkers";
import ToolkitModule from "../ToolkitModule";

const MobileView = () => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-col gap-4 p-6 font-mono relative overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

      {/* --- HEADER BLOCK --- */}
      <div className="relative flex items-center gap-4 border border-primary/30 bg-card/40 p-4">
        <div className="relative size-16 shrink-0">
          <img
            src={UI_DATA.profile.image}
            className="size-full border border-primary/40 grayscale object-cover"
            alt="Profile"
          />
          <div className="absolute -bottom-1 -right-1 size-3 bg-primary shadow-[0_0_8px_var(--primary)] rounded-full border-2 border-background" />
        </div>

        <div className="flex flex-col min-w-0">
          <h1 className="truncate text-xl font-black tracking-tighter text-primary uppercase leading-tight">
            {UI_DATA.profile.name}
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-[7px] font-bold tracking-[0.2em] text-primary/60 uppercase italic">
              System_Authorized
            </span>
            <div className="h-px flex-1 bg-primary/20" />
          </div>
        </div>
        <CornerMarkers />
      </div>

      {/* --- BIO MODULE --- */}
      <div className="relative border border-primary/20 bg-primary/5 p-5">
        <div className="mb-2 flex items-center gap-2 opacity-30">
          <UserFocus size={10} weight="fill" />
          <span className="text-[6px] tracking-[0.3em] uppercase font-bold">
            Identity_Fragment
          </span>
        </div>
        <p className="text-[11px] leading-relaxed text-primary/80 italic">
          "{UI_DATA.profile.about}"
        </p>
        <div className="absolute top-0 right-0 p-1 text-[5px] text-primary/20 font-mono">
          0x04F2BC
        </div>
      </div>

      {/* --- GRID NAVIGATION --- */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => navigate({ to: "/projects" })}
          className="relative col-span-2 flex h-14 flex-col items-center justify-center border border-primary/40 bg-primary/10 active:bg-primary active:text-background transition-colors overflow-hidden group"
        >
          <Code
            size={24}
            className="text-primary group-active:text-background"
          />
          <span className="mt-1 text-[9px] font-black tracking-[0.6em] text-primary group-active:text-background uppercase">
            Projects
          </span>
          <div className="absolute top-2 left-2 text-[6px] opacity-30 uppercase font-bold">
            Node_01
          </div>
          <CornerMarkers />
        </button>

        <button
          onClick={() =>
            window.open("https://blog.pixlized.net/index", "_blank")
          }
          className="relative flex h-12 flex-col items-center justify-center border border-primary/20 bg-card/40 active:bg-primary/20"
        >
          <Archive size={18} weight="thin" className="text-primary" />
          <span className="mt-1 text-[9px] font-bold tracking-[0.3em] text-primary/80 uppercase">
            Blog
          </span>
          <CornerMarkers />
        </button>

        <button
          onClick={() => navigate({ to: "/albums" })}
          className="relative flex h-12 flex-col items-center justify-center border border-primary/20 bg-card/40 active:bg-primary/20"
        >
          <Broadcast size={18} weight="thin" className="text-primary" />
          <span className="mt-1 text-[9px] font-bold tracking-[0.3em] text-primary/80 uppercase">
            Music
          </span>
          <CornerMarkers />
        </button>
        <div className="flex w-full gap-3 col-span-2">
          <button
            onClick={() => window.open(UI_DATA.socials[0].link, "_blank")}
            aria-label="Open GitHub"
            className="flex-1 relative flex h-14 items-center gap-3 px-4 rounded-md border border-primary/15 bg-card/30 hover:bg-primary/6 transition-colors duration-200"
          >
            <GithubLogo size={18} weight="thin" className="text-primary" />
            <div className="flex-1 text-left">
              <div className="text-[10px] font-bold tracking-[0.3em] text-primary/80 uppercase">
                GitHub
              </div>
              <div className="text-[9px] text-primary/60 font-mono truncate">
                /pixlized
              </div>
            </div>
            <CaretDoubleRight size={14} className="text-primary/40" />
          </button>

          <button
            onClick={() => window.open(UI_DATA.socials[1].link, "_blank")}
            aria-label="Open LinkedIn"
            className="flex-1 relative flex h-14 items-center gap-3 px-4 rounded-md border border-primary/15 bg-card/30 hover:bg-primary/6 transition-colors duration-200"
          >
            <LinkedinLogo size={18} weight="thin" className="text-primary" />
            <div className="flex-1 text-left">
              <div className="text-[9px] font-bold tracking-[0.3em] text-primary/80 uppercase">
                LinkedIn
              </div>
              <div className="text-[9px] text-primary/60 font-mono truncate">
                /apaduret
              </div>
            </div>
            <CaretDoubleRight size={14} className="text-primary/40" />
          </button>
        </div>
      </div>

      <ToolkitModule items={UI_DATA.toolkit} />

      <div className="mt-2 flex justify-between items-center px-2 opacity-20 font-mono text-[6px] tracking-widest uppercase">
        <span>Kernel_V.4.2</span>
        <div className="flex gap-1">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="size-1 bg-primary rotate-45" />
          ))}
        </div>
        <span>Sync_Ready</span>
      </div>
    </div>
  );
};

export default MobileView;

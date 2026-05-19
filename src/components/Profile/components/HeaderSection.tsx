"use client";

import React from "react";
import { UI_DATA } from "../constants";
import CornerMarkers from "./CornerMarkers";
import TitleTicker from "./TitleTicker";

const HeaderSection = React.memo(() => (
  <header className="relative flex w-full flex-row items-center gap-6 bg-background/20 border-2 border-primary/20 p-4 h-24 md:h-28 overflow-hidden">
    <div className="group relative size-16 shrink-0 sm:size-20 md:size-24 transition-transform duration-300 hover:scale-[1.02]">
      <div className="absolute inset-[-6px] rounded-full border border-primary/10" />
      <div className="absolute inset-[-3px] rounded-full border-t-2 border-l-2 border-primary/40 group-hover:border-primary transition-colors" />
      <div className="relative size-full overflow-hidden rounded-full border-2 border-primary/30 bg-background transition-all group-hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.15)]">
        <img
          src={UI_DATA.profile.image}
          alt="Profile"
          className="size-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
        />
      </div>
      <div className="absolute right-0.5 bottom-0.5 z-20 size-3.5 rounded-full border-2 border-background bg-primary" />
    </div>

    <div className="flex flex-1 flex-col justify-center min-w-0">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[7px] font-black tracking-[0.6em] text-primary/70 uppercase">
          User_Identity
        </span>
        <div className="h-[1px] w-12 bg-primary/20" />
      </div>
      <div className="flex flex-col md:flex-row md:items-end gap-0 md:gap-3 leading-none">
        <h1
          className="font-mono text-3xl font-black tracking-tighter text-transparent sm:text-4xl md:text-6xl uppercase"
          style={{ WebkitTextStroke: "1px var(--primary)" }}
        >
          {UI_DATA.profile.name.split(" ")[0]}
        </h1>
        <h1 className="font-mono text-3xl font-black tracking-tighter text-primary sm:text-4xl md:text-6xl uppercase">
          {UI_DATA.profile.name.split(" ")[1]}
        </h1>
      </div>
      <div className="mt-2">
        <TitleTicker />
      </div>
    </div>

    <div className="flex flex-col gap-1 md:flex-row md:gap-2">
      {UI_DATA.socials.map((social) => (
        <a
          key={social.id}
          href={social.link}
          target="_blank"
          className="group relative flex size-8 items-center justify-center border-2 border-primary/20 transition-all hover:bg-primary sm:size-9 md:size-10"
        >
          <div className="relative z-10 text-primary transition-colors group-hover:text-background">
            {social.icon}
          </div>
          <div className="absolute bottom-0 left-0 h-0 w-full bg-primary transition-all group-hover:h-full" />
        </a>
      ))}
    </div>
  </header>
));

HeaderSection.displayName = "HeaderSection";

export default HeaderSection;

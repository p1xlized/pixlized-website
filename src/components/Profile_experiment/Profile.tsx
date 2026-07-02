"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Archive,
  Broadcast,
  Code,
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
  Sparkle,
} from "@phosphor-icons/react";
import { TOOLKIT, UI_DATA } from "../Profile/constants";

const navCards = [
  { label: "Projects", href: "/projects", icon: Code },
  { label: "Blog", href: "https://blog.pixlized.net/index/", icon: Archive },
  { label: "Music", href: "/albums", icon: Broadcast },
];

const links = [
  { label: "GitHub", href: UI_DATA.socials[0].link, icon: GithubLogo },
  { label: "LinkedIn", href: UI_DATA.socials[1].link, icon: LinkedinLogo },
  {
    label: "Email",
    href: "mailto:contact-me@pixlized.net",
    icon: EnvelopeSimple,
  },
];

function ButtonHoverSchematic({ label }: { label: string }) {
  if (label === "Music") {
    return (
      <svg viewBox="0 0 100 100" className="h-full w-full text-primary/60">
        <line
          x1="10"
          y1="50"
          x2="90"
          y2="50"
          stroke="currentColor"
          strokeWidth="0.4"
          opacity="0.25"
        />
        <motion.path
          d="M 0 50 C 10 20, 20 80, 30 50 C 40 20, 50 80, 60 50 C 70 20, 80 80, 90 50 C 100 20, 110 80, 120 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.7"
          animate={{ x: [0, -30] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 100 100" className="h-full w-full text-primary/55">
      {[...Array(5)].map((_, i) => (
        <React.Fragment key={i}>
          <line
            x1={20 * i}
            y1="0"
            x2={20 * i}
            y2="100"
            stroke="currentColor"
            strokeWidth="0.18"
            opacity="0.2"
          />
          <line
            x1="0"
            y1={20 * i}
            x2="100"
            y2={20 * i}
            stroke="currentColor"
            strokeWidth="0.18"
            opacity="0.2"
          />
        </React.Fragment>
      ))}
      {[...Array(4)].map((_, i) => (
        <motion.rect
          key={i}
          width="2.3"
          height="2.3"
          fill="currentColor"
          animate={{ opacity: [0.15, 0.8, 0.15] }}
          transition={{
            duration: 1.5,
            delay: i * 0.2,
            repeat: Number.POSITIVE_INFINITY,
          }}
          x={16 + (i % 2) * 40}
          y={20 + Math.floor(i / 2) * 42}
        />
      ))}
    </svg>
  );
}

export default function ProfileExperiment() {
  return (
    <div className="min-h-screen w-full bg-transparent text-foreground">
      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-4 py-6 md:px-8 md:py-10">
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-4xl bg-transparent"
        >
          <div className="flex flex-col items-center text-center">
            {/* Header Section */}
            <div className="flex flex-col items-center gap-6 md:flex-row md:items-center">
              <div className="relative">
                <img
                  src={UI_DATA.profile.image}
                  alt={UI_DATA.profile.name}
                  className="size-32 rounded-2xl border border-border object-cover saturate-110 transition-transform duration-500 hover:scale-[1.03] md:size-40"
                />
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: 0.8,
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  className="absolute -bottom-2 -right-3 flex items-center gap-1.5 rounded-full bg-emerald-950 px-3 py-1 border border-emerald-500/40 shadow-xl"
                >
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="size-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50"
                  />
                  <span className="text-[10px] font-medium tracking-tight text-emerald-200">
                    Open for Work
                  </span>
                </motion.div>
              </div>

              <div className="space-y-4 text-center md:text-left">
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-2 md:justify-start text-[10px] uppercase tracking-[0.4em] text-muted-foreground/60">
                    <Sparkle size={10} />
                    freelancer portfolio
                  </div>
                  <motion.h1
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
                    className="bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-4xl font-extrabold uppercase tracking-tight text-transparent md:text-6xl"
                  >
                    {UI_DATA.profile.name}
                  </motion.h1>
                </div>
                {/* Simplified Social Links */}
                <div className="flex justify-center md:justify-start gap-6">
                  {links.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target={link.label === "Email" ? undefined : "_blank"}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Icon size={24} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 💡 BRIEF DESCRIPTION BLOCK */}
            <div className="relative mt-8 w-full max-w-2xl rounded-md border border-border/40 bg-card/20 px-6 py-4 text-center md:text-left">
              <div className="absolute left-0 top-0 size-1.5 border-l border-t border-muted-foreground/40" />
              <div className="absolute right-0 bottom-0 size-1.5 border-b border-r border-muted-foreground/40" />
              <div className="font-mono text-[8px] uppercase tracking-[0.3em] text-primary mb-1">
                Identity // Core_Bio
              </div>
              <p className="text-sm font-normal leading-relaxed text-muted-foreground">
                Full-stack engineer and digital architect focusing on reactive
                interfaces, dynamic systems, and audio experiments. Designing
                high-throughput, cyber-minimal environments for modern web
                environments.
              </p>
            </div>

            <div className="my-10 h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-border to-transparent" />

            {/* Simplified Navigation */}
            <div className="flex w-full max-w-2xl flex-wrap items-center justify-center gap-3">
              {navCards.map((item, index) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-md border border-border bg-card/60 px-7 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-border-hover hover:bg-card/100 shadow-md hover:shadow-xl"
                  >
                    <div className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <ButtonHoverSchematic label={item.label} />
                    </div>
                    <div className="absolute left-2 right-2 top-1 z-[1] flex items-center justify-between text-[7px] uppercase tracking-[0.28em] text-muted-foreground/50">
                      <span>NAV</span>
                      <span>0{index + 1}</span>
                    </div>
                    <span className="relative z-[2] pt-2 text-lg font-semibold tracking-wide text-card-foreground transition-colors group-hover:text-primary">
                      {item.label}
                    </span>
                    <Icon
                      size={22}
                      className="relative z-[2] mt-2 text-primary transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-primary"
                    />
                    <div className="absolute left-0 top-0 size-2 border-l border-t border-border/60 transition-colors group-hover:border-border-hover" />
                    <div className="absolute bottom-0 right-0 size-2 border-b border-r border-border/60 transition-colors group-hover:border-border-hover" />
                  </a>
                );
              })}
            </div>

            <div className="my-10 h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-border to-transparent" />

            {/* Colorful Toolkit */}
            <div className="w-full max-w-4xl">
              <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-6">
                Toolkit
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                {TOOLKIT.map((tool, index) => (
                  <motion.div
                    key={tool.name}
                    title={tool.name}
                    whileHover={
                      index % 3 === 0
                        ? { y: -4, rotate: -4, scale: 1.12 }
                        : index % 3 === 1
                          ? { y: -3, rotate: 4, scale: 1.14 }
                          : { y: -5, scale: 1.1 }
                    }
                    transition={{ type: "spring", stiffness: 260, damping: 16 }}
                    className="group relative rounded-md border border-border bg-card p-2 text-foreground/80 transition-colors hover:border-border-hover"
                  >
                    <motion.div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-md"
                      animate={{ opacity: [0.12, 0.28, 0.12] }}
                      transition={{
                        duration: 1.8 + (index % 3) * 0.4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                      style={{
                        background:
                          index % 3 === 0
                            ? "linear-gradient(135deg, rgba(56,189,248,0.16), transparent)"
                            : index % 3 === 1
                              ? "linear-gradient(135deg, rgba(168,85,247,0.16), transparent)"
                              : "linear-gradient(135deg, rgba(34,197,94,0.16), transparent)",
                      }}
                    />
                    <div className="relative z-[1] size-6">
                      {React.cloneElement(tool.icon as React.ReactElement, {
                        size: 24,
                        className:
                          index % 3 === 0
                            ? "text-sky-300 transition-colors duration-300 group-hover:text-sky-200"
                            : index % 3 === 1
                              ? "text-violet-300 transition-colors duration-300 group-hover:text-violet-200"
                              : "text-emerald-300 transition-colors duration-300 group-hover:text-emerald-200",
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

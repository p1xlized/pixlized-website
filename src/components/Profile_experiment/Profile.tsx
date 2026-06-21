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
import { UI_DATA, TOOLKIT } from "../Profile/constants";

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
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col items-center gap-3 md:flex-row md:items-center md:gap-6">
                <div className="relative">
                  <div className="absolute inset-0 -z-10 rounded-full bg-primary/10 blur-2xl" />
                  <img
                    src={UI_DATA.profile.image}
                    alt={UI_DATA.profile.name}
                    className="size-28 rounded-full border border-primary/15 object-cover grayscale md:size-36"
                  />
                </div>

                <div className="space-y-2 text-center md:text-left">
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-2 md:justify-start text-[10px] uppercase tracking-[0.4em] text-primary/45">
                      <Sparkle size={10} />
                      freelancer portfolio
                    </div>
                    <h1 className="text-3xl font-black uppercase tracking-tight text-foreground md:text-5xl">
                      {UI_DATA.profile.name}
                    </h1>
                  </div>
                  <div className="flex justify-center md:justify-start gap-2">
                    {links.map((link) => {
                      const Icon = link.icon;
                      return (
                        <a
                          key={link.label}
                          href={link.href}
                          target={link.label === "Email" ? undefined : "_blank"}
                          aria-label={link.label}
                          className="group relative flex size-9 items-center justify-center overflow-hidden bg-transparent transition-all hover:bg-primary/5 md:size-10"
                        >
                          <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                          <span className="absolute inset-0 rounded-full border border-transparent transition-all group-hover:border-primary/10" />
                          <Icon
                            size={18}
                            className="relative z-10 text-primary/55 transition-transform group-hover:scale-110 group-hover:text-primary"
                          />
                        </a>
                      );
                    })}
                  </div>{" "}
                </div>
              </div>
            </div>

            <div className="my-5 h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <div className="grid w-full max-w-3xl gap-2 sm:grid-cols-3">
              {navCards.map((item, index) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.label === "Blog" ? "_blank" : undefined}
                    aria-label={item.label}
                    className="group relative overflow-hidden bg-transparent px-4 py-4 transition-all hover:bg-primary/5"
                  >
                    <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <span className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-primary/20 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:16px_16px]" />
                    <div className="relative z-10 flex items-center justify-between gap-4">
                      <div className="text-left">
                        <div className="text-[9px] uppercase tracking-[0.35em] text-primary/40">
                          0{index + 1}
                        </div>
                        <div className="mt-1 text-sm font-medium tracking-[0.08em] text-foreground/85">
                          {item.label}
                        </div>
                      </div>
                      <div className="flex size-8 items-center justify-center rounded-full bg-primary/5 transition-all group-hover:bg-primary/10">
                        <Icon
                          size={16}
                          className="text-primary/50 transition-transform group-hover:translate-x-1 group-hover:text-primary"
                        />
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="my-5 h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            <div className="w-full max-w-4xl">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-[10px] uppercase tracking-[0.4em] text-primary/45">
                  Toolkit
                </div>
                <div className="text-[10px] uppercase tracking-[0.35em] text-primary/30">
                  Stack
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-10">
                {TOOLKIT.map((tool) => (
                  <div
                    key={tool.name}
                    title={tool.name}
                    className="group relative flex aspect-square items-center justify-center overflow-hidden bg-transparent transition-all hover:bg-primary/5"
                  >
                    <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <span className="relative z-10">{tool.icon}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

import React from "react";
import {
  Envelope,
  GithubLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import {
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiTanstack,
  SiRust,
  SiDeno,
  SiPostgresql,
  SiDocker,
  SiLinux,
  SiGo,
} from "@icons-pack/react-simple-icons";

// --- UNIFIED TOOLKIT DATA ---
// Single source of truth for all tools
export const TOOLKIT = [
  { name: "TypeScript", icon: React.createElement(SiTypescript, { size: 20 }) },
  { name: "React", icon: React.createElement(SiReact, { size: 20 }) },
  { name: "Node", icon: React.createElement(SiNodedotjs, { size: 20 }) },
  { name: "Tanstack", icon: React.createElement(SiTanstack, { size: 20 }) },
  { name: "Docker", icon: React.createElement(SiDocker, { size: 20 }) },
  { name: "Linux", icon: React.createElement(SiLinux, { size: 20 }) },
  { name: "Postgresql", icon: React.createElement(SiPostgresql, { size: 20 }) },
  { name: "Deno", icon: React.createElement(SiDeno, { size: 20 }) },
  { name: "Rust", icon: React.createElement(SiRust, { size: 20 }) },
  { name: "GoLang", icon: React.createElement(SiGo, { size: 20 }) },
];

// --- CONSTANTS ---
export const TITLES = ["FULL STACK", "BACKEND", "MOBILE", "GAMEDEV"];

export const UI_DATA = {
  profile: {
    name: "Alexandru Paduret",
    image: "https://avatars.githubusercontent.com/u/72890769?v=4",
    about:
      "Full-stack architect building fast systems and reactive interfaces. A jack-of-all-trades who's surprisingly good at all of them, blending creativity and code.",
  },
  socials: [
    {
      id: "git",
      icon: React.createElement(GithubLogo, { size: 20 }),
      link: "https://github.com/pixlized",
    },
    {
      id: "link",
      icon: React.createElement(LinkedinLogo, { size: 20 }),
      link: "https://linkedin.com/in/apaduret",
    },
    {
      id: "mail",
      icon: React.createElement(Envelope, { size: 20 }),
      link: "mailto:alex@pixlized.net",
    },
  ],
  toolkit: TOOLKIT,
  education: [
    {
      org: "UEF - FI",
      degree: "B.Sc Computer Science",
      progress: 50,
      status: "ACTIVE",
    },
    {
      org: "Maisonneuve College - CA",
      degree: "DEC Software Dev",
      progress: 100,
      status: "COMPLETE",
    },
  ],
  stats: { records: 14, encryption: "BitLock_256" },
};

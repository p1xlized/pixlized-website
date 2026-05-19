"use client";

import React from "react";
import { motion } from "framer-motion";

interface Tool {
  name: string;
  icon: React.ReactNode;
}

interface ToolkitModuleProps {
  items: Tool[];
}

export const ToolkitModule: React.FC<ToolkitModuleProps> = ({ items }) => (
  <div className="flex flex-wrap gap-2 justify-center">
    {items.map((tool, i) => (
      <motion.button
        key={i}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.05, duration: 0.3 }}
        className="group relative p-3 border border-primary/20 bg-card/40 transition-all duration-300 hover:border-primary hover:bg-primary/10"
        title={tool.name}
      >
        <div className="text-primary transition-all duration-300 group-hover:text-primary/80 group-hover:scale-110 group-hover:drop-shadow-lg">
          {tool.icon}
        </div>

        {/* --- CORNER ACCENTS --- */}
        <div className="absolute top-1 left-1 size-1 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-1 right-1 size-1 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* --- HOVER GLOW --- */}
        <div className="absolute inset-0 bg-primary/10 blur-lg opacity-0 group-hover:opacity-20 transition-opacity" />
      </motion.button>
    ))}
  </div>
);

export default ToolkitModule;

import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "@tanstack/react-router";

export const Footer = React.memo(() => {
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  // Hide footer on home page
  if (location.pathname === "/") {
    return null;
  }

  const techStack = ["TanStack", "React", "Tailwind"];

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 border-t border-primary/10 bg-background/80 backdrop-blur-sm font-mono text-[8px] uppercase tracking-[0.3em] text-primary/40 hidden md:block">
      <div className="mx-auto max-w-7xl px-8 py-2 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-0"
        >
          <p>© {currentYear} p1xlized // all rights reserved</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-3"
        >
          <span className="text-primary/50">Built with:</span>
          <div className="flex items-center gap-2">
            {techStack.map((tech, index) => (
              <React.Fragment key={tech}>
                <span className="text-primary/70 hover:text-primary transition-colors">
                  {tech}
                </span>
                {index < techStack.length - 1 && (
                  <span className="text-primary/20">//</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

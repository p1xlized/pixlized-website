"use client"

import React, { useEffect, useMemo } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

// --- MEMOIZED GEOMETRIC ASSETS ---
const GeometricSchematic = React.memo(() => (
  <svg width="100%" height="100%" className="text-primary overflow-visible">
    <defs>
      {/* Blueprint Dot Grid */}
      <pattern id="dot-grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="currentColor" fillOpacity="0.1" />
      </pattern>
    </defs>

    <rect width="100%" height="100%" fill="url(#dot-grid)" />

    {/* PERSPECTIVE AXES */}
    <g stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.1">
      <line x1="50%" y1="0" x2="50%" y2="100%" />
      <line x1="0" y1="50%" x2="100%" y2="50%" />
    </g>

    {/* CENTRAL ICOSAHEDRON (Wireframe) */}
    <g fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" strokeLinecap="round" strokeLinejoin="round">
      <motion.path
        d="M50,20 L80,40 L80,70 L50,90 L20,70 L20,40 Z M50,20 L50,90 M80,40 L20,70 M20,40 L80,70"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      />
      {/* Nested Circles for Geometric Balance */}
      <circle cx="50%" cy="50%" r="35%" strokeDasharray="4 8" strokeOpacity="0.1" />
      <circle cx="50%" cy="50%" r="15%" strokeOpacity="0.2" />
    </g>

    {/* FLOATING GEOMETRIC NODES */}
    <g fill="currentColor">
       <rect x="20%" y="40%" width="3" height="3" className="animate-pulse" />
       <rect x="80%" y="70%" width="3" height="3" className="animate-pulse" />
       <rect x="50%" y="20%" width="3" height="3" className="animate-pulse" />
    </g>
  </svg>
));

GeometricSchematic.displayName = "GeometricSchematic";

export function PageBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Ultra-fluid settings: Low stiffness, High damping, High mass for "floaty" feel
  const springConfig = { stiffness: 12, damping: 45, mass: 2.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Parallax: Layers moving at opposing ratios for deep 3D effect
  const layer1X = useTransform(springX, [-0.5, 0.5], ["4%", "-4%"]);
  const layer1Y = useTransform(springY, [-0.5, 0.5], ["4%", "-4%"]);

  const layer2X = useTransform(springX, [-0.5, 0.5], ["-3%", "3%"]);
  const layer2Y = useTransform(springY, [-0.5, 0.5], ["-3%", "3%"]);

  // 3D Tilt: Subtle but expansive
  const rotateX = useTransform(springY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-12, 12]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Memoize static filters
  const visualFilters = useMemo(() => (
    <>
      {/* Deep Vignette: Keeps focus on the central content */}

      {/* Noise Texture (Very subtle, no scanlines) */}
    </>
  ), []);

  return (
    <div className="fixed inset-0 -z-50 bg-background/20 overflow-hidden pointer-events-none select-none font-mono">

      {/* LAYER 1: THE PRIMARY SCHEMATIC */}
      <motion.div
        style={{
          x: layer1X,
          y: layer1Y,
          rotateX,
          rotateY,
          perspective: "1500px",
          transformStyle: "preserve-3d"
        }}
        className="absolute inset-[-20%] opacity-60"
      >
        <GeometricSchematic />
      </motion.div>

      {/* LAYER 2: SECONDARY ISOMETRIC FLOATING LAYER */}
      <motion.div
        style={{
          x: layer2X,
          y: layer2Y,
          rotateX: useTransform(springY, [-0.5, 0.5], [6, -6]),
          rotateY: useTransform(springX, [-0.5, 0.5], [-6, 6]),
        }}
        className="absolute inset-[-10%] opacity-10"
      >
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <circle cx="20" cy="20" r="0.5" fill="currentColor" />
          <circle cx="80" cy="80" r="0.5" fill="currentColor" />
          <line x1="20" y1="20" x2="25" y2="25" stroke="currentColor" strokeWidth="0.2" />
          <line x1="80" y1="80" x2="75" y2="75" stroke="currentColor" strokeWidth="0.2" />
        </svg>
      </motion.div>

      {/* AMBIENT LIGHT BLOOM (Slowly Pulsing) */}
      <motion.div
        animate={{ opacity: [0.03, 0.07, 0.03], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-primary/20 rounded-full blur-[160px]"
      />

      {visualFilters}
    </div>
  );
}

export default PageBackground;

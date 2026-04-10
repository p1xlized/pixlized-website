"use client"

import { useMemo, useState, useEffect } from "react"
import { motion, useTransform } from "framer-motion"

const SpaceParallax = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const [mounted, setMounted] = useState(false)

  const starsY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"])
  const nebulaY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"])

  useEffect(() => {
    setMounted(true)
  }, [])

  // 1. NEBULA FIELD: Static deterministic positions
  const nebulaField = useMemo(() => {
    return [...Array(12)].map((_, i) => ({
      id: i,
      top: (i * 137.5) % 100,
      left: (i * 224.7) % 100,
      width: 400 + (i * 50 % 200),
      height: 300 + (i * 30 % 150),
      color: `var(--chart-${(i % 4) + 1})`,
      opacity: 0.07,
      rotate: i * 45,
    }));
  }, []);

  // 2. STARFIELD: Individual nodes for that specific "glow" and drift look
  // Deterministic math ensures server and client match perfectly
  const starfield = useMemo(() => {
    return [...Array(200)].map((_, i) => {
      const size = (i * 7.3 % 1) > 0.85 ? (i * 2.1 % 3) + 2 : (i * 1.5 % 1.5) + 0.5;
      return {
        id: i,
        top: (i * 927.7) % 100,
        left: (i * 131.3) % 100,
        size,
        tx: ((i * 11.3 % 1) - 0.5) * 40, // Horizontal drift
        ty: ((i * 17.9 % 1) - 0.5) * 40, // Vertical drift
        duration: 10 + (i * 3.1 % 15),
        delay: -(i * 1.7 % 20),
      };
    });
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden bg-background pointer-events-none">
      {/* Cinematic Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

      {/* --- LAYER 1: NEBULAS --- */}
      <motion.div style={{ y: nebulaY }} className="absolute inset-0 will-change-transform">
        {nebulaField.map((n) => (
          <div
            key={`nebula-${n.id}`}
            className="absolute blur-[120px]"
            style={{
              top: `${n.top}%`,
              left: `${n.left}%`,
              width: n.width,
              height: n.height,
              backgroundColor: n.color,
              opacity: n.opacity,
              borderRadius: '50%',
              transform: `translate(-50%, -50%) rotate(${n.rotate}deg)`,
            }}
          />
        ))}
      </motion.div>

      {/* --- LAYER 2: STARS --- */}
      <motion.div style={{ y: starsY }} className="absolute inset-0 will-change-transform">
        {starfield.map((star) => (
          <div
            key={`star-${star.id}`}
            className="absolute rounded-full bg-primary"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              // Glow effect for larger stars
              boxShadow: star.size > 2 ? `0 0 8px var(--primary)` : 'none',
              opacity: 0.4 + (star.id * 0.1 % 0.6),
              // Performance-optimized drift
              animation: `drift ${star.duration}s ease-in-out ${star.delay}s infinite alternate`,
              // CSS Variables for the keyframe
              // @ts-ignore
              '--tx': `${star.tx}px`,
              // @ts-ignore
              '--ty': `${star.ty}px`,
            } as any}
          />
        ))}
      </motion.div>

      <style jsx global>{`
        @keyframes drift {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(var(--tx), var(--ty), 0); }
        }
      `}</style>
    </div>
  )
}

export default SpaceParallax;

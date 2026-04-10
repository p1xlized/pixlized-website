"use client"

import React, { useEffect, useState, ElementType } from "react"
import { AnimatePresence, motion } from "framer-motion"

// --- TYPES ---

interface ActionButtonProps {
  label: string
  icon: ElementType
  sublabel: string
  onClick: () => void
  variant?: "blog" | "music"
}

interface TypedTextProps {
  text: string
  delay?: number
}

// --- ANIMATION COMPONENTS ---

/**
 * ArchiveSchematic: Blog variant.
 * Features a data grid + "crawling" textual bit-metadata.
 */
const ArchiveSchematic: React.FC = () => (
  <motion.div className="relative h-full w-full overflow-hidden p-4">
    <svg viewBox="0 0 100 100" className="h-full w-full text-primary">
      {/* Structural Grid */}
      {[...Array(5)].map((_, i) => (
        <React.Fragment key={i}>
          <line x1={20 * i} y1="0" x2={20 * i} y2="100" stroke="currentColor" strokeWidth="0.05" opacity="0.1" />
          <line x1="0" y1={20 * i} x2="100" y2={20 * i} stroke="currentColor" strokeWidth="0.05" opacity="0.1" />
        </React.Fragment>
      ))}
      {/* Pulsing Nodes */}
      {[...Array(6)].map((_, i) => (
        <motion.rect
          key={i}
          width="1.5"
          height="1.5"
          fill="currentColor"
          animate={{ opacity: [0.1, 0.6, 0.1] }}
          transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
          x={15 + (i % 3) * 35}
          y={20 + Math.floor(i / 3) * 50}
        />
      ))}
    </svg>

    {/* Textual Decoration: Bit Streams */}
    <div className="absolute left-2 top-0 flex flex-col font-mono text-[4px] leading-tight text-primary/20 uppercase">
      {["0x00FF1", "MEM_ALLOC", "DB_SYNC", "PUSH_DATA"].map((t, i) => (
        <motion.span key={i} animate={{ x: [-2, 2, -2] }} transition={{ duration: 4, delay: i, repeat: Infinity }}>
          {t}
        </motion.span>
      ))}
    </div>
    <div className="absolute right-2 bottom-4 flex flex-col items-end font-mono text-[4px] leading-tight text-primary/20 uppercase">
      <span>INDEX_RUNNING</span>
      <span className="text-primary/40">v.0.4.2_stable</span>
    </div>
  </motion.div>
)

/**
 * SignalSchematic: Music variant.
 * Features a real-time waveform oscillograph and frequency markers.
 */
const SignalSchematic: React.FC = () => (
  <motion.div className="relative h-full w-full overflow-hidden">
    <svg viewBox="0 0 100 100" className="h-full w-full text-primary">
      {/* Frequency Range Markers */}
      {[20, 40, 60, 80].map((x) => (
        <line key={x} x1={x} y1="45" x2={x} y2="55" stroke="currentColor" strokeWidth="0.1" opacity="0.3" />
      ))}
      <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.05" opacity="0.2" />

      {/* The Waveform */}
      <motion.path
        d="M 0 50 C 10 20, 20 80, 30 50 C 40 20, 50 80, 60 50 C 70 20, 80 80, 90 50 C 100 20, 110 80, 120 50"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.3"
        animate={{ x: [0, -30] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      {/* Radial Signal Radar */}
      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.05" strokeDasharray="2 2" className="opacity-10" />
    </svg>

    {/* Textual Decoration: Signal Stats */}
    <div className="absolute bottom-6 left-4 flex gap-4 font-mono text-[5px] text-primary/30 uppercase">
      <div className="flex flex-col">
        <span>G_GAIN</span>
        <span className="text-primary/60">+12.4dB</span>
      </div>
      <div className="flex flex-col">
        <span>BITRATE</span>
        <span className="text-primary/60">320KBPS</span>
      </div>
    </div>
  </motion.div>
)

// --- COMPONENTS ---

export const TypedText: React.FC<TypedTextProps> = ({ text, delay = 0.03 }) => {
  const [displayedText, setDisplayedText] = useState("")

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, i))
      i++
      if (i > text.length) clearInterval(timer)
    }, delay * 1000)
    return () => clearInterval(timer)
  }, [text, delay])

  return (
    <span className="font-mono">
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{
            duration: 0.8,
            repeat: Infinity,

            ease: "linear"
          }}
        className="ml-1 inline-block h-3 w-1.5 bg-primary align-middle"
      />
    </span>
  )
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  icon: Icon,
  sublabel,
  onClick,
  variant = "blog"
}) => {
  return (
    <button
      onClick={onClick}
      className="group relative flex flex-1 flex-col items-center justify-center overflow-hidden border border-primary/20 bg-card/40 py-12 transition-all duration-500 hover:border-primary hover:bg-primary/[0.04]"
    >
      {/* Background Schematic Layer */}
      <div className="absolute inset-0 -z-10 scale-110 opacity-0 transition-all duration-700 group-hover:scale-100 group-hover:opacity-100">
        {variant === "blog" ? <ArchiveSchematic /> : <SignalSchematic />}
      </div>

      {/* Primary Icon & Label */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative mb-4">
          <Icon
            size={36}
            weight="thin"
            className="text-muted-foreground transition-all duration-500 group-hover:scale-110 group-hover:text-primary"
          />
          <div className="absolute inset-0 bg-primary/40 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-40" />
        </div>

        <h3 className="text-4xl font-sans tracking-tighter text-foreground transition-all duration-300 group-hover:text-primary uppercase">
          {label}
        </h3>

        <div className="mt-1 flex items-center gap-2">
          <div className="h-[1px] w-4 bg-primary/20 group-hover:w-6 transition-all" />
          <span className="font-mono text-[8px] tracking-[0.4em] text-muted-foreground/60 uppercase group-hover:text-primary/70 transition-colors">
            {variant === "blog" ? `ARC_${sublabel}` : `FRQ_${sublabel}`}
          </span>
          <div className="h-[1px] w-4 bg-primary/20 group-hover:w-6 transition-all" />
        </div>
      </div>

      {/* Bottom Visualizer / Data Activity Animation */}
      <div className="absolute bottom-0 left-0 flex h-1.5 w-full items-end justify-center gap-[2px] px-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            className="w-full bg-primary"
            animate={
              variant === "music"
                ? { height: ["10%", "100%", "30%", "80%", "20%"] }
                : { opacity: [0.1, 1, 0.1] }
            }
            transition={{
              duration: variant === "music" ? 0.5 + Math.random() : 1.2,
              repeat: Infinity,
              delay: i * 0.04,
            }}
          />
        ))}
      </div>

      {/* Metadata Corners */}
      <div className="absolute top-3 left-3 flex flex-col font-mono text-[6px] text-primary/30 uppercase tracking-[0.2em]">
        <span>{variant === "blog" ? "DAT_LOAD_OK" : "SIG_RECV_ON"}</span>
        <span className="text-[5px] opacity-50">{variant === "blog" ? "UUID: 882A" : "STEREO_UPLINK"}</span>
      </div>

      {/* Decorative Corner Accents */}
      <div className="absolute top-0 right-0 size-2 border-t border-r border-primary/20 transition-colors group-hover:border-primary" />
      <div className="absolute bottom-0 left-0 size-2 border-b border-l border-primary/20 transition-colors group-hover:border-primary" />
    </button>
  )
}

export default ActionButton

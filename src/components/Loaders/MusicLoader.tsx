import { TerminalWindow } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useEffect } from "react";

/**
 * INLINE LOADER (Heavy, Deliberate OS Boot Sequence)
 */
interface InlineLoaderProps {
  onComplete: () => void;
}
const InlineLoader = ({ onComplete }: InlineLoaderProps) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05, filter: "blur(5px)" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-0 z-100 bg-background flex flex-col items-center justify-center font-mono text-primary overflow-hidden"
    >
      {/* Slow, scanning background line */}
      <motion.div
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-48 bg-linear-to-b from-transparent via-primary/3 to-transparent pointer-events-none"
      />

      {/* --- HEAVY GEOMETRY CENTER --- */}
      <div className="relative size-32 md:size-48 flex items-center justify-center mb-8 opacity-60">
        <motion.svg
          viewBox="0 0 100 100"
          className="absolute inset-0 size-full overflow-visible"
        >
          {/* Slow Tumbling Triangle */}
          <motion.polygon
            points="50,15 85,85 15,85"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            animate={{ rotate: [0, 360], scale: [1, 1.05, 0.95, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            style={{ originX: "50%", originY: "50%" }}
          />
          {/* Reverse Rotating Dashed Square */}
          <motion.rect
            x="20"
            y="20"
            width="60"
            height="60"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeDasharray="4 6"
            animate={{ rotate: [0, -360] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            style={{ originX: "50%", originY: "50%" }}
          />
          {/* Breathing Outer Hexagon */}
          <motion.polygon
            points="50,0 95,25 95,75 50,100 5,75 5,25"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ originX: "50%", originY: "50%" }}
          />
        </motion.svg>

        {/* Slow Pulsing Core */}
        <motion.div
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="size-2 bg-primary absolute shadow-[0_0_10px_var(--primary)]"
        />
      </div>

      {/* --- TEXT & LOADING BAR --- */}
      <div className="flex flex-col items-center gap-4 w-full max-w-65">
        {/* Solid Header */}
        <div className="flex items-center gap-3 text-xs md:text-sm font-black tracking-[0.4em] uppercase opacity-80">
          <TerminalWindow size={20} />
          <span>Mounting_Volumes</span>
        </div>

        {/* Smooth, deliberate loading bar matching the 1.5s unmount */}
        <div className="w-full h-1 border border-primary/40 bg-background relative overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className="absolute inset-y-0 left-0 bg-primary"
          />
        </div>

        {/* Slowed-down Terminal Readout */}
        <div className="text-[8px] opacity-40 tracking-widest font-mono h-3 overflow-hidden w-full text-center">
          <motion.div
            animate={{ y: ["0%", "-25%", "-50%", "-75%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="flex flex-col gap-1"
          >
            <span>0x7F2A... INIT_MEM_BLOCK</span>
            <span>0x1B9C... ALLOC_SEC_KEY</span>
            <span>0x88F1... CHK_DSK_INTEGRITY</span>
            <span>0x9A22... SYNC_I/O_STREAM</span>
            <span>0x7F2A... INIT_MEM_BLOCK</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
export default InlineLoader;

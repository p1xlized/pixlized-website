import React, { useMemo } from "react";
import { Album, Track } from "@/lib/data";
import { Disc, Waveform } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { formatDuration } from "./Player";

interface TrackVisualizerProps {
  album: Album;
  track: Track | null;
  isPlaying: boolean;
}

const TrackVisualizer: React.FC<TrackVisualizerProps> = ({
  album,
  track,
  isPlaying,
}) => {
  const BAR_COUNT = 36;

  const barAnimations = useMemo(() => {
    return Array.from({ length: BAR_COUNT }, (_, index) => {
      const seed = Math.sin(index * 5.7 + 2.3) * 100;
      const minHeight = 12 + (Math.abs(Math.round(seed)) % 16);
      const maxHeight = Math.min(
        98,
        minHeight + (Math.abs(Math.round(seed * 1.4)) % 50),
      );
      const medHeight = Math.round((minHeight + maxHeight) / 2);

      return {
        min: `${minHeight}%`,
        max: `${maxHeight}%`,
        med: `${medHeight}%`,
      };
    });
  }, []);

  return (
    <aside className="hidden lg:flex flex-col w-[420px] xl:w-[460px] flex-1 border border-primary/25 bg-gradient-to-br from-background/95 to-background/85 backdrop-blur-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-primary/15 bg-primary/8 px-5 py-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`text-primary transition-transform ${isPlaying ? "animate-spin-slow" : ""}`}
            >
              <Disc size={20} weight="fill" />
            </div>
            <span className="text-base font-black uppercase tracking-widest text-primary">
              Now Playing
            </span>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider opacity-50">
            {album.name.split(" ").slice(0, 2).join(" ")}
          </span>
        </div>
      </div>

      {/* Track Info */}
      <div className="flex-shrink-0 border-b border-primary/15 bg-primary/4 p-5">
        <div className="flex gap-4">
          <div className="relative w-28 h-28 flex-shrink-0 rounded-lg border border-primary/15 overflow-hidden bg-primary/5">
            <img
              src={album.coverUrl}
              alt={album.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-background/40" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-black uppercase tracking-tight text-primary truncate mb-2">
              {track?.name || "No Track"}
            </h3>
            <p className="text-[10px] font-mono text-primary/60 mb-2.5">
              {track
                ? `${String(track.trackNumber).padStart(2, "0")} • ${formatDuration(track.duration)}`
                : album.releaseDate}
            </p>
            <p className="text-[11px] text-primary/70 line-clamp-2 leading-relaxed">
              {track?.description || album.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Visualizer */}
      <div className="flex-1 flex flex-col min-h-0 p-5 gap-4">
        {/* Spectrum Container */}
        <div className="flex-1 relative bg-background/40 border border-primary/10 rounded-lg overflow-hidden">
          {/* Bars */}
          <div className="absolute inset-0 flex items-end justify-center gap-1.5 px-4 pb-4">
            {barAnimations.map((anim, idx) => {
              const isActive = isPlaying && track;

              return (
                <motion.div
                  key={idx}
                  className="flex-1 bg-gradient-to-t from-primary via-primary/80 to-primary/60 rounded-t-md shadow-[0_0_8px_rgba(var(--primary-rgb),0.6)]"
                  animate={{
                    height: isActive
                      ? [anim.min, anim.max, anim.med, anim.min]
                      : "5%",
                    opacity: isActive ? [0.5, 1, 0.7, 0.5] : 0.2,
                  }}
                  transition={{
                    duration: isActive ? 0.4 + (idx % 8) * 0.06 : 0.4,
                    ...(isActive && {
                      repeat: Infinity,
                      repeatType: "loop" as const,
                      ease: "easeInOut" as const,
                      delay: idx * 0.02,
                    }),
                  }}
                  style={{ minHeight: "5%" }}
                />
              );
            })}
          </div>

          {/* Center Pulse */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {isPlaying && track ? (
              <div className="relative w-40 h-40">
                <motion.div
                  className="absolute inset-0 border-2 border-primary/20 rounded-full"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute inset-4 border border-primary/35 rounded-full"
                  animate={{ scale: [1.3, 1, 1.3] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.6,
                  }}
                />
                <motion.div
                  className="absolute inset-8 border border-primary/50 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.2,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-5 h-5 bg-primary rounded-full shadow-[0_0_20px_rgba(var(--primary-rgb),1)]"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="w-32 h-32 rounded-full border-2 border-primary/15 flex items-center justify-center opacity-30">
                <Disc size={56} className="text-primary/20" />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 border-t border-primary/15 pt-3.5 space-y-2.5">
          <div className="flex gap-2.5 items-center justify-between">
            <div className="flex gap-2.5">
              <div className="px-2.5 py-1.5 text-[9px] font-mono uppercase bg-primary/8 border border-primary/15 text-primary/70 rounded-sm">
                {album.tracks.length} tracks
              </div>
              <div className="px-2.5 py-1.5 text-[9px] font-mono uppercase bg-primary/8 border border-primary/15 text-primary/70 rounded-sm">
                {album.genre.split("/")[0]}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono opacity-50">Spectrum</span>
              <Waveform size={14} className="text-primary/60" />
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono uppercase">
            <span
              className={
                isPlaying ? "text-primary animate-pulse" : "text-primary/50"
              }
            >
              {isPlaying ? "● Streaming" : "○ Idle"}
            </span>
            <span className="text-primary/60">
              {track ? formatDuration(track.duration) : "—"}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default TrackVisualizer;

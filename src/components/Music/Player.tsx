import { Album, Track } from "@/lib/data";
import {
  FastForward,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  SpeakerHigh,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";

interface MusicPlayerProps {
  album: Album;
  track: Track;
  isPlaying: boolean;
  onTogglePlay: () => void;
  currentTime: number;
  duration: number;
  onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
  onPrev: () => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
}

export const formatDuration = (seconds: number) => {
  if (isNaN(seconds)) return "00:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};

export const MusicPlayer = ({
  album,
  track,
  isPlaying,
  onTogglePlay,
  currentTime,
  duration,
  onSeek,
  onNext,
  onPrev,
  volume,
  onVolumeChange,
}: MusicPlayerProps) => {
  if (!track || !album) return null;

  const currentIndex = album.tracks.findIndex(
    (t: Track) => t.trackNumber === track.trackNumber,
  );
  const nextTrack = album.tracks[currentIndex + 1];

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl border border-primary/40 bg-background/80 backdrop-blur-xl shadow-[0_-10px_40px_-10px_rgba(var(--primary-rgb),0.3)] flex flex-col overflow-hidden"
    >
      {/* Ambient decoration */}
      <div className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_10%_0%,rgba(var(--primary-rgb),0.18),transparent_28%),radial-gradient(circle_at_90%_100%,rgba(var(--primary-rgb),0.14),transparent_30%)]" />
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-primary/50 shadow-[0_0_12px_var(--primary)]" />

      {/* Corner brackets */}
      <div className="pointer-events-none absolute left-0 top-0 size-3 border-l-2 border-t-2 border-primary/60 z-10" />
      <div className="pointer-events-none absolute right-0 top-0 size-3 border-r-2 border-t-2 border-primary/60 z-10" />
      <div className="pointer-events-none absolute bottom-0 left-0 size-3 border-l-2 border-b-2 border-primary/60 z-10" />
      <div className="pointer-events-none absolute bottom-0 right-0 size-3 border-r-2 border-b-2 border-primary/60 z-10" />

      {/* INTERACTIVE PROGRESS BAR */}
      <div className="relative h-[3px] md:h-[4px] w-full bg-primary/20 group cursor-pointer hover:h-[8px] transition-all duration-200 z-20">
        <motion.div
          className="absolute left-0 top-0 bottom-0 bg-primary shadow-[0_0_10px_var(--primary)] pointer-events-none"
          style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
        />
        <input
          type="range"
          min="0"
          max={duration || 100}
          value={currentTime}
          onChange={onSeek}
          className="absolute inset-0 w-full h-full cursor-pointer opacity-0 z-20"
        />
        <div className="absolute -top-5 right-2 hidden text-[9px] font-mono font-bold tracking-widest text-primary opacity-70 group-hover:block transition-opacity pointer-events-none z-30">
          {formatDuration(currentTime)} / {formatDuration(duration)}
        </div>
      </div>

      <div className="relative z-20 flex items-center justify-between p-3 md:p-4 gap-4 w-full">
        {/* Left: Info */}
        <div className="flex items-center gap-3 w-[40%] md:w-1/3 min-w-0">
          <div className="relative size-10 md:size-12 shrink-0 border border-primary/40 overflow-hidden hidden sm:block group shadow-[0_0_12px_rgba(var(--primary-rgb),0.18)]">
            <img
              src={album.coverUrl}
              alt={album.name}
              className="size-full object-cover opacity-95 transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
            />
            <div className="pointer-events-none absolute inset-0 border border-primary/0 transition-colors duration-300 group-hover:border-primary/50" />
            {isPlaying && (
              <motion.div
                animate={{ opacity: [0.15, 0.35, 0.15] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 bg-primary/20 mix-blend-overlay"
              />
            )}
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-[10px] md:text-xs font-black uppercase text-primary truncate tracking-[0.12em] transition-all duration-300 hover:tracking-[0.18em] hover:text-primary/90">
              {track.name}
            </span>
            <span className="text-[8px] font-mono opacity-60 tracking-widest uppercase truncate hidden sm:block transition-opacity duration-300 hover:opacity-90">
              {album.name}
            </span>
          </div>
        </div>

        {/* Center: Controls */}
        <div className="flex items-center justify-center gap-3 md:gap-6 w-[20%] md:w-1/3 shrink-0">
          <button
            onClick={onPrev}
            className="text-primary/50 hover:text-primary transition-all active:scale-90 hidden sm:block"
          >
            <SkipBack size={20} weight="fill" />
          </button>

          {/* Redesigned Play/Resume button */}
          <button
            onClick={onTogglePlay}
            className="relative size-11 md:size-12 rounded-full border border-primary/70 bg-primary/10 hover:bg-primary/15 transition-all duration-300 shrink-0 flex items-center justify-center shadow-[0_0_16px_rgba(var(--primary-rgb),0.25)] hover:shadow-[0_0_24px_rgba(var(--primary-rgb),0.35)] active:scale-95"
          >
            <motion.div
              animate={{
                scale: isPlaying ? [1, 1.08, 1] : 1,
                opacity: isPlaying ? [0.4, 0.75, 0.4] : 0.2,
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-1 rounded-full border border-primary/40"
            />
            <motion.div
              animate={isPlaying ? { scale: [1, 1.02, 1] } : { scale: 1 }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="relative z-10 flex items-center justify-center text-primary"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isPlaying ? (
                  <motion.span
                    key="pause"
                    initial={{ opacity: 0, scale: 0.75 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.75 }}
                    transition={{ duration: 0.15 }}
                    className="flex"
                  >
                    <Pause size={20} weight="fill" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="play"
                    initial={{ opacity: 0, scale: 0.75 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.75 }}
                    transition={{ duration: 0.15 }}
                    className="flex"
                  >
                    <Play size={20} weight="fill" className="ml-0.5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </button>

          <button
            onClick={onNext}
            className="text-primary/50 hover:text-primary transition-all active:scale-90"
          >
            <SkipForward size={20} weight="fill" />
          </button>
        </div>

        {/* Right: Volume & Up Next */}
        <div className="flex items-center justify-end w-[40%] md:w-1/3 min-w-0 gap-4">
          <div className="hidden lg:flex items-center gap-2 w-24">
            <SpeakerHigh size={14} className="text-primary/60" />
            <div className="relative h-1 w-full bg-primary/20 rounded-full group cursor-pointer hover:h-2 transition-all">
              <motion.div
                className="h-full bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.45)] pointer-events-none"
                animate={{ width: `${volume}%` }}
              />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => onVolumeChange(Number(e.target.value))}
                className="absolute inset-0 w-full h-full cursor-pointer opacity-0 z-10"
              />
            </div>
          </div>

          <div className="hidden md:flex flex-col items-end min-w-0 text-right border-l border-primary/20 pl-4">
            {nextTrack ? (
              <>
                <span className="text-[7px] font-black uppercase tracking-[0.3em] opacity-50 flex items-center gap-1">
                  <FastForward size={10} /> Up_Next
                </span>
                <span className="text-[9px] font-bold text-primary/80 truncate max-w-[120px] transition-colors duration-300 hover:text-primary">
                  {nextTrack.name}
                </span>
              </>
            ) : (
              <span className="text-[8px] font-mono opacity-30 tracking-widest uppercase mt-1">
                End_Of_Queue
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

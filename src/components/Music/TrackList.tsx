import { Album, Track } from "@/lib/data";
import { TerminalWindow, Waveform } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { formatDuration } from "./Player";

interface TracksListProps {
  album: Album;
  activeTrack: Track | null;
  onSelectTrack: (track: Track) => void;
}

const TracksList = ({ album, activeTrack, onSelectTrack }: TracksListProps) => (
  <motion.section
    key="track-list"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="relative flex flex-col border border-primary/30 bg-background/80 shadow-[0_0_30px_rgba(var(--primary-rgb),0.1)] backdrop-blur-md lg:flex-1 w-full h-full min-h-0 overflow-hidden"
  >
    <div className="absolute left-0 top-0 size-2 border-l-2 border-t-2 border-primary z-20" />
    <div className="absolute right-0 top-0 size-2 border-r-2 border-t-2 border-primary z-20" />
    <div className="absolute bottom-0 left-0 size-2 border-b-2 border-l-2 border-primary z-20" />
    <div className="absolute bottom-0 right-0 size-2 border-b-2 border-r-2 border-primary z-20" />

    <div className="flex items-center justify-between border-b border-primary/30 bg-primary/10 px-4 py-3 shrink-0">
      <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-primary">
        <TerminalWindow size={16} />
        <span>SYS_LOG // {album.id}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[8px] uppercase opacity-50 tracking-widest hidden sm:block">
          Index_Loaded
        </span>
        <div className="size-1.5 bg-primary animate-pulse" />
      </div>
    </div>

    <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2 min-h-0">
      {album.tracks.map((track: Track) => {
        const isActive = activeTrack?.trackNumber === track.trackNumber;
        return (
          <button
            key={track.trackNumber}
            onClick={() => onSelectTrack(track)}
            className={`w-full flex flex-col sm:flex-row sm:items-center justify-between p-3 border-l-2 transition-all duration-300 text-left group ${
              isActive
                ? "border-primary bg-primary/10 shadow-[inset_0_0_20px_rgba(var(--primary-rgb),0.15)]"
                : "border-primary/20 hover:border-primary/60 hover:bg-primary/5"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center justify-center w-6 shrink-0">
                {isActive ? (
                  <Waveform size={18} className="text-primary animate-pulse" />
                ) : (
                  <span className="text-[9px] font-mono font-bold opacity-40 group-hover:opacity-100 transition-opacity">
                    {String(track.trackNumber).padStart(2, "0")}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <span
                  className={`text-[11px] font-black uppercase tracking-widest truncate ${isActive ? "text-primary" : "text-foreground/80 group-hover:text-primary transition-colors"}`}
                >
                  {track.name}
                </span>
                <span className="text-[7px] font-mono opacity-40 uppercase tracking-[0.2em]">
                  {isActive ? "> EXECUTING_PLAYBACK..." : "> AWAITING_CMD"}
                </span>
              </div>
            </div>
            <div className="hidden sm:flex flex-col items-end gap-1 shrink-0">
              <span
                className={`text-[10px] font-mono font-bold ${isActive ? "text-primary" : "opacity-50"}`}
              >
                {formatDuration(track.duration)}
              </span>
              <span className="text-[7px] font-bold opacity-30 tracking-widest uppercase">
                {isActive ? "[ LIVE ]" : "[ IDLE ]"}
              </span>
            </div>
          </button>
        );
      })}
    </div>

    <div className="border-t border-primary/30 bg-primary/5 px-4 py-2 shrink-0 flex justify-between items-center text-[8px] font-mono uppercase tracking-[0.2em] opacity-50">
      <span>END_OF_FILE</span>
      <span>{album.tracks.length}_ENTRIES</span>
    </div>
  </motion.section>
);
export default TracksList;

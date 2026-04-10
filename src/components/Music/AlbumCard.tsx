import React from "react";
import { Album } from "@/lib/data";
import { Play } from "@phosphor-icons/react";
import { motion } from "framer-motion";

interface AlbumCardProps {
  album: Album;
  index: number;
  onSelectAlbum: (a: Album) => void;
}

function formatMinSec(seconds?: number) {
  if (!seconds && seconds !== 0) return "—";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

const AlbumCard: React.FC<AlbumCardProps> = ({
  album,
  index,
  onSelectAlbum,
}) => {
  const totalSeconds = album.tracks.reduce(
    (acc, t) => acc + (t.duration || 0),
    0,
  );
  const totalMinutes = Math.round(totalSeconds / 60);

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      onClick={() => onSelectAlbum(album)}
      role="button"
      aria-label={`Open album ${album.name}`}
      className="group relative w-full cursor-pointer select-none"
    >
      {/* Card shell */}
      <div className="relative h-full flex flex-col overflow-hidden border border-primary/15 dark:border-primary/25 bg-background/30 dark:bg-background/60 transition-colors duration-200 rounded-lg">
        {/* Top: circular disk cover */}
        <div className="flex-shrink-0 flex items-center justify-center pt-6">
          <div
            className="relative rounded-full overflow-hidden flex items-center justify-center
                       w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40
                       bg-background/10 dark:bg-background/20 border border-primary/10 dark:border-primary/20"
            aria-hidden
          >
            <img
              src={album.coverUrl}
              alt={album.name}
              className="w-full h-full object-cover"
              style={{ borderRadius: "9999px" }}
            />

            {/* subtle hover overlay + play center */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100">
              <div className="rounded-full bg-primary/10 dark:bg-primary/20 p-2">
                <Play size={20} className="text-primary" weight="fill" />
              </div>
            </div>
          </div>
        </div>

        {/* Middle: info */}
        <div className="flex-1 px-4 pt-4 pb-3 flex flex-col min-h-0">
          <h3
            className="text-sm sm:text-base font-black uppercase tracking-tight text-primary truncate text-center md:text-left"
            title={album.name}
          >
            {album.name}
          </h3>

          <div className="mt-2 flex flex-col gap-2">
            <div className="flex items-center justify-center md:justify-between text-[11px] font-mono text-primary/60">
              <span className="truncate">
                <span className="hidden md:inline">ID: </span>
                0x{album.id.split("-")[1] || "FF"}
              </span>
              <span className="hidden md:inline">{album.releaseDate}</span>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-[10px] uppercase tracking-widest text-primary/50">
                Genre
              </span>
              <span className="text-[11px] font-bold uppercase text-primary/80 truncate max-w-[200px]">
                {album.genre}
              </span>
            </div>

            <p className="mt-2 text-[11px] text-primary/70 leading-snug line-clamp-3 text-center md:text-left">
              {album.description}
            </p>
          </div>
        </div>

        {/* Footer: a compact bar with extra info and CTA */}
        <footer className="flex-shrink-0 px-3 pb-3 pt-2 border-t border-primary/10 dark:border-primary/20 bg-background/20 dark:bg-background/55">
          <div className="flex items-center justify-between gap-3">
            {/* Left: first track preview (compact) */}
            <div className="min-w-0">
              <div className="text-[10px] font-mono text-primary/60 truncate">
                {album.tracks[0]
                  ? `${String(album.tracks[0].trackNumber).padStart(2, "0")}. ${album.tracks[0].name}`
                  : "No tracks"}
              </div>
              <div className="text-[11px] font-black text-primary/80">
                {album.tracks[0] ? formatMinSec(album.tracks[0].duration) : "—"}
              </div>
            </div>

            {/* Middle: small stats */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="px-2 py-1 rounded bg-primary/6 dark:bg-primary/12 text-[10px] font-mono uppercase text-primary/70 border border-primary/10 dark:border-primary/20">
                {album.tracks.length} tracks
              </div>

              <div className="px-2 py-1 rounded bg-primary/6 dark:bg-primary/12 text-[10px] font-mono uppercase text-primary/70 border border-primary/10 dark:border-primary/20">
                {new Date(album.releaseDate).getFullYear()}
              </div>
            </div>

            {/* Right: Open album CTA */}
            <div className="flex-shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectAlbum(album);
                }}
                className="px-3 py-1.5 rounded text-[11px] font-black uppercase tracking-widest text-primary/80 dark:text-primary/90 bg-transparent border border-primary/10 dark:border-primary/20 hover:bg-primary/6 dark:hover:bg-primary/12 transition-colors"
              >
                Open
              </button>
            </div>
          </div>

          {/* Mobile stacked stats row */}
          <div className="mt-2 sm:hidden flex items-center gap-2 justify-between text-[10px]">
            <div className="font-mono text-primary/70">
              {album.tracks.length} trk
            </div>
            <div className="font-mono text-primary/70">
              {Math.round(totalSeconds / 60)}m
            </div>
            <div className="font-mono text-primary/70">
              {new Date(album.releaseDate).getFullYear()}
            </div>
          </div>
        </footer>
      </div>
    </motion.article>
  );
};

export default AlbumCard;

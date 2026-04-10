import { Album } from "@/lib/data";
import { HardDrives } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import AlbumCard from "./AlbumCard";

interface AlbumsListProps {
  albums: Album[];
  onSelectAlbum: (a: Album) => void;
}

export default function AlbumsList({ albums, onSelectAlbum }: AlbumsListProps) {
  const totalTracks = albums.reduce((acc, a) => acc + a.tracks.length, 0);
  const totalDurationMin = Math.round(
    albums.reduce(
      (acc, a) => acc + a.tracks.reduce((tAcc, t) => tAcc + t.duration, 0),
      0,
    ) / 60,
  );

  return (
    <motion.section
      key="album-list"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="relative w-full max-w-5xl flex flex-col h-full border border-primary/20 dark:border-primary/30 bg-background/40 dark:bg-background/50 backdrop-blur-md overflow-hidden"
      aria-label="Albums list"
    >
      {/* Corner accents */}
      <div className="absolute left-0 top-0 size-4 border-l-2 border-t-2 border-primary/40 dark:border-primary/50 z-10" />
      <div className="absolute right-0 top-0 size-4 border-r-2 border-t-2 border-primary/40 dark:border-primary/50 z-10" />
      <div className="absolute bottom-0 left-0 size-4 border-b-2 border-l-2 border-primary/40 dark:border-primary/50 z-10" />
      <div className="absolute bottom-0 right-0 size-4 border-b-2 border-r-2 border-primary/40 dark:border-primary/50 z-10" />

      {/* Header */}
      <header className="relative flex items-center justify-between border-b border-primary/15 dark:border-primary/25 bg-primary/8 dark:bg-primary/12 px-6 py-3 overflow-hidden flex-shrink-0">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(var(--primary-rgb),0.05)_1px,transparent_1px)] bg-size-[100%_4px] opacity-20 dark:opacity-30" />
        <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.18em] relative z-10 text-primary">
          <HardDrives size={20} /> Discography
        </div>
        <div className="flex items-center gap-2 relative z-10">
          <div className="size-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] uppercase opacity-60 dark:opacity-70 font-bold tracking-widest text-primary/80 dark:text-primary/90">
            Ready
          </span>
        </div>
      </header>

      {/* Albums Grid (centered, no page scroll) */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-5xl h-fit items-stretch">
          {albums.map((album, idx) => (
            <AlbumCard
              key={album.id}
              album={album}
              index={idx}
              onSelectAlbum={onSelectAlbum}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative border-t border-primary/15 dark:border-primary/25 bg-primary/8 dark:bg-primary/12 px-6 py-3 flex items-center justify-between text-[9px] font-mono text-primary/60 dark:text-primary/70 tracking-widest uppercase flex-shrink-0">
        <div className="flex items-center gap-4">
          <span>Albums: {albums.length}</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Tracks: {totalTracks}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">•</span>
          <span>Duration: {totalDurationMin}min</span>
        </div>
      </footer>
    </motion.section>
  );
}

import { Album } from "@/lib/data";
import {
  ArrowLeftIcon,
  Broadcast,
  Disc,
  HardDrives,
  ShieldCheck,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import MusicDialog from "@/components/Music/MusicDialog";

interface MusicNavbarProps {
  activeAlbum: Album | null;
  onBackToArchive: () => void;
  onExit: () => void;
}

const MusicNavbar = ({
  activeAlbum,
  onBackToArchive,
  onExit,
}: MusicNavbarProps) => (
  <motion.header
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 md:gap-4 rounded-none border border-primary/30 bg-background/70 px-4 py-2 shadow-[0_10px_40px_-10px_rgba(var(--primary-rgb),0.3)] backdrop-blur-xl w-[95%] max-w-4xl overflow-hidden"
  >
    <button
      onClick={onExit}
      className="flex items-center gap-2 opacity-50 transition-colors hover:opacity-100 hover:text-primary shrink-0"
    >
      <ArrowLeftIcon size={18} />
      <span className="hidden sm:block text-[10px] font-black uppercase tracking-widest">
        Back to Home
      </span>
    </button>

    <span className="text-primary/20 shrink-0">/</span>

    <button
      onClick={activeAlbum ? onBackToArchive : undefined}
      className={`flex items-center gap-2 transition-colors shrink-0 ${activeAlbum ? "cursor-pointer opacity-50 hover:opacity-100 hover:text-primary" : "cursor-default text-primary font-black"}`}
    >
      <HardDrives size={18} weight="duotone" />
      <span className="hidden sm:block text-[10px] font-black uppercase tracking-widest">
        Albums
      </span>
    </button>

    <AnimatePresence>
      {activeAlbum && (
        <>
          <span className="text-primary/20 shrink-0">/</span>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            className="flex items-center gap-2 text-primary overflow-hidden whitespace-nowrap"
          >
            <Disc size={18} className="animate-spin-slow shrink-0" />
            <span className="text-[10px] font-black uppercase tracking-widest truncate max-w-[100px] md:max-w-[200px]">
              {activeAlbum.name}
            </span>
          </motion.div>
        </>
      )}
    </AnimatePresence>

    <div className="ml-auto flex items-center gap-3 border-l border-primary/20 pl-3 md:pl-4">
      <MusicDialog />
      <Broadcast
        size={16}
        className="animate-pulse text-primary hidden sm:block"
      />
      <ShieldCheck size={16} className="opacity-40" />
    </div>
  </motion.header>
);

export default MusicNavbar;

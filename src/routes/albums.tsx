"use client";

import React, { useState, useEffect, useRef } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";

import GeometricBackground from "@/components/BackgroundEffects/MuisicBackround";
import { useBrowserTab } from "@/components/BrowserTab";
import { Album, PORTFOLIO_DATA, Track } from "@/lib/data";
import { MusicPlayer } from "@/components/Music/Player";
import TrackVisualizer from "@/components/Music/TrackVisualizer";
import { setNavbarVisibility } from "@/components/Navbar/Navbar";
import AlbumsList from "@/components/Music/AlbumsList";
import TracksList from "@/components/Music/TrackList";
import MusicNavbar from "@/components/Navbar/MusicNavbar";
import InlineLoader from "@/components/Loaders/MusicLoader";

export const Route = createFileRoute("/albums")({
  component: MusicPage,
});

export default function MusicPage() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const [activeAlbum, setActiveAlbum] = useState<Album | null>(null);
  const [activeTrack, setActiveTrack] = useState<Track | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    setNavbarVisibility(false);
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => {
      clearTimeout(timer);
      setNavbarVisibility(true);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          console.warn("Playback failed:", err);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, activeTrack]);

  // --- DYNAMIC BROWSER TAB ---
  // Changes to "▶ Song Name", "⏸ Song Name", or just "Music"
  useBrowserTab({
    section: activeTrack
      ? `${isPlaying ? "▶" : "⏸"} ${activeTrack.name}`
      : "Music",
  });

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const handleTimeUpdate = () =>
    setCurrentTime(audioRef.current?.currentTime || 0);
  const handleLoadedMetadata = () =>
    setDuration(audioRef.current?.duration || 0);

  // --- ADDED SCRUBBING FUNCTION ---
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
    setCurrentTime(time);
  };

  const handleNext = () => {
    if (!activeAlbum || !activeTrack) return;
    const idx = activeAlbum.tracks.findIndex(
      (t) => t.trackNumber === activeTrack.trackNumber,
    );
    if (idx < activeAlbum.tracks.length - 1) {
      setActiveTrack(activeAlbum.tracks[idx + 1]);
      setCurrentTime(0);
      setIsPlaying(true);
    }
  };

  const handlePrev = () => {
    if (!activeAlbum || !activeTrack) return;
    const idx = activeAlbum.tracks.findIndex(
      (t) => t.trackNumber === activeTrack.trackNumber,
    );
    if (idx > 0) {
      setActiveTrack(activeAlbum.tracks[idx - 1]);
      setCurrentTime(0);
      setIsPlaying(true);
    }
  };

  const handleTrackEnded = () => {
    if (activeAlbum && activeTrack) {
      const idx = activeAlbum.tracks.findIndex(
        (t) => t.trackNumber === activeTrack.trackNumber,
      );
      if (idx < activeAlbum.tracks.length - 1) {
        handleNext();
        return;
      }
    }
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleAlbumSelect = (album: Album) => {
    setActiveAlbum(album);
    setActiveTrack(album.tracks[0]);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleTrackSelect = (track: Track) => {
    setActiveTrack(track);
    setIsPlaying(true);
  };

  const handleBackToAlbums = () => {
    setIsPlaying(false);
    setActiveAlbum(null);
    setActiveTrack(null);
    setCurrentTime(0);
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && <InlineLoader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <main className="relative flex w-full h-screen items-center justify-center bg-background/40 p-4 font-mono text-primary md:p-8 overflow-hidden">
        <GeometricBackground />

        <audio
          ref={audioRef}
          src={activeTrack?.audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleTrackEnded}
        />

        <AnimatePresence mode="wait">
          {!isLoading && (
            <motion.div
              key="main-content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-20 flex flex-col w-full max-w-6xl items-center justify-center flex-1 overflow-hidden"
            >
              <MusicNavbar
                activeAlbum={activeAlbum}
                onBackToArchive={handleBackToAlbums}
                onExit={() => navigate({ to: "/" })}
              />

              <div className="flex w-full h-full flex-col items-center justify-center overflow-hidden">
                {!activeAlbum ? (
                  <AlbumsList
                    albums={PORTFOLIO_DATA.albums}
                    onSelectAlbum={handleAlbumSelect}
                  />
                ) : (
                  <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-stretch lg:justify-center">
                    <TracksList
                      album={activeAlbum}
                      activeTrack={activeTrack!}
                      onSelectTrack={handleTrackSelect}
                    />
                    <TrackVisualizer
                      album={activeAlbum}
                      track={activeTrack}
                      isPlaying={isPlaying}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {activeTrack && activeAlbum && !isLoading && (
            <MusicPlayer
              album={activeAlbum}
              track={activeTrack}
              isPlaying={isPlaying}
              onTogglePlay={() => setIsPlaying(!isPlaying)}
              currentTime={currentTime}
              duration={duration}
              onSeek={handleSeek}
              onNext={handleNext}
              onPrev={handlePrev}
              volume={volume}
              onVolumeChange={setVolume}
            />
          )}
        </AnimatePresence>
      </main>
    </>
  );
}

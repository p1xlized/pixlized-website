import { useState, useEffect, useCallback, useRef } from "react"
import { boxDrawing, formatTime, debounce } from "./utils"
import Spectrogram from "./Spectrogram"
import ArtworkDisplay from "./ArtworkDisplay"

interface MusicTrack {
  id: number
  title: string
  genre: string
  duration: string
  bpm: string
  file: string
  albumId: number
}

interface Album {
  id: number
  title: string
  description: string
  cover: string
  createdAt: string
  tracks: MusicTrack[]
}

interface MusicPlayerProps {
  albums: Album[]
  tracks: MusicTrack[]
}

const covers = ["/assets/imgs/bitwig-1.jpg", "/assets/imgs/bitwig-2.jpg"]

export default function MusicPlayer({ albums, tracks }: MusicPlayerProps) {
  const [currentAlbumIdx, setCurrentAlbumIdx] = useState(-1)
  const [currentTrackIdx, setCurrentTrackIdx] = useState(-1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [mirrorMode, setMirrorMode] = useState(true)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null)
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null)
  const [dataArray, setDataArray] = useState<Uint8Array<ArrayBuffer> | null>(
    null
  )
  const [animFrameId, setAnimFrameId] = useState<number | null>(null)
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null)
  const [currentTime, setCurrentTime] = useState("00:00")
  const [duration, setDuration] = useState("00:00")
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("SYSTEM READY")
  const [trackInfo, setTrackInfo] = useState("STEREO 44.1kHz")
  const [vizStatus, setVizStatus] = useState("OFFLINE")
  const [vizMode, setVizMode] = useState("MIRROR: ON")
  const [nowPlaying, setNowPlaying] = useState({
    title: "STANDBY MODE",
    meta: "--:-- | -- BPM",
  })

  const progressContainerRef = useRef<HTMLDivElement>(null)

  // Add covers to albums
  const albumsWithCovers = albums.map((album, index) => ({
    ...album,
    cover: covers[index % covers.length],
  }))

  // Play a track
  const playTrack = useCallback(
    (track: MusicTrack) => {
      // Cleanup previous audio
      if (audio) {
        audio.pause()
      }
      if (animFrameId) {
        cancelAnimationFrame(animFrameId)
      }

      const newAudio = new Audio(track.file)
      newAudio.crossOrigin = "anonymous"

      newAudio.addEventListener("loadedmetadata", () => {
        setDuration(formatTime(newAudio.duration))
      })

      newAudio.addEventListener("timeupdate", () => {
        setCurrentTime(formatTime(newAudio.currentTime))
        if (newAudio.duration) {
          setProgress((newAudio.currentTime / newAudio.duration) * 100)
        }
      })

      newAudio.addEventListener("ended", () => {
        if (currentTrackIdx < tracks.length - 1) {
          const nextTrack = tracks[currentTrackIdx + 1]
          setCurrentTrackIdx((prev) => prev + 1)
          playTrack(nextTrack)
        }
      })

      newAudio
        .play()
        .then(() => {
          setAudio(newAudio)
          setIsPlaying(true)

          setNowPlaying({
            title: track.title,
            meta: `${track.genre || "UNKNOWN"} | ${track.duration || "--:--"}`,
          })
          setTrackInfo(
            `${track.genre || "UNKNOWN"} | ${track.bpm ? track.bpm + " BPM" : "120 BPM"}`
          )
          setStatus(`PLAYING: ${track.title}`)
          setVizStatus("ACTIVE")
          setVizMode(mirrorMode ? "MIRROR: ON" : "MIRROR: OFF")
        })
        .catch(() => {
          setStatus("AUDIO PLAYBACK ERROR")
        })
    },
    [audio, animFrameId, currentTrackIdx, tracks, mirrorMode]
  )

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      if (animFrameId) {
        cancelAnimationFrame(animFrameId)
        setAnimFrameId(null)
      }

      setStatus("PAUSED")
      setVizStatus("PAUSED")
      setIsPlaying(false)
    } else {
      audio.play()
      setStatus("PLAYING")
      setVizStatus("ACTIVE")
      setIsPlaying(true)

      if (audioCtx && audioCtx.state === "suspended") {
        audioCtx.resume()
      }
    }
  }, [audio, isPlaying, animFrameId, audioCtx])

  // Previous track
  const prevTrack = useCallback(() => {
    if (currentTrackIdx > 0) {
      const newIdx = currentTrackIdx - 1
      setCurrentTrackIdx(newIdx)
      playTrack(tracks[newIdx])
    }
  }, [currentTrackIdx, tracks, playTrack])

  // Next track
  const nextTrack = useCallback(() => {
    if (currentTrackIdx < tracks.length - 1) {
      const newIdx = currentTrackIdx + 1
      setCurrentTrackIdx(newIdx)
      playTrack(tracks[newIdx])
    }
  }, [currentTrackIdx, tracks, playTrack])

  // Seek in track
  const handleProgressClick = useCallback(
    (e: React.MouseEvent) => {
      if (!audio || !progressContainerRef.current) return

      const rect = progressContainerRef.current.getBoundingClientRect()
      const pct = (e.clientX - rect.left) / rect.width
      audio.currentTime = pct * audio.duration
    },
    [audio]
  )

  // Toggle mirror mode
  const toggleMirror = useCallback(() => {
    const newMirrorMode = !mirrorMode
    setVizMode(newMirrorMode ? "MIRROR: ON" : "MIRROR: OFF")
    setStatus(`MIRROR MODE: ${newMirrorMode ? "ON" : "OFF"}`)
    setMirrorMode(newMirrorMode)

    setTimeout(() => {
      setStatus(isPlaying ? "PLAYING" : "SYSTEM READY")
    }, 2000)
  }, [mirrorMode, isPlaying])

  // Load album
  const loadAlbum = useCallback(
    (idx: number) => {
      setCurrentAlbumIdx(idx)
      const album = albumsWithCovers[idx]
      setSelectedAlbum(album)
      setStatus(`LOADED ALBUM: ${album.title}`)
    },
    [albumsWithCovers]
  )

  // Handle theme toggle
  const handleThemeToggle = useCallback(() => {
    const el = document.documentElement
    el.classList.toggle("dark")
    const isDark = el.classList.contains("dark")
    localStorage.setItem("theme", isDark ? "dark" : "light")
    setStatus(`THEME: ${isDark ? "DARK MODE" : "LIGHT MODE"}`)

    setTimeout(() => {
      setStatus(isPlaying ? "PLAYING" : "SYSTEM READY")
    }, 2000)
  }, [isPlaying])

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case "Space":
          e.preventDefault()
          togglePlay()
          break
        case "ArrowLeft":
          e.preventDefault()
          prevTrack()
          break
        case "ArrowRight":
          e.preventDefault()
          nextTrack()
          break
        case "Escape":
          e.preventDefault()
          if (isPlaying && audio) {
            audio.pause()
            if (animFrameId) {
              cancelAnimationFrame(animFrameId)
            }
            setStatus("STOPPED")
            setVizStatus("PAUSED")
            setIsPlaying(false)
          }
          break
        case "KeyM":
          e.preventDefault()
          toggleMirror()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [
    isPlaying,
    audio,
    animFrameId,
    togglePlay,
    prevTrack,
    nextTrack,
    toggleMirror,
  ])

  // Setup window.loadAlbum for onclick handlers
  useEffect(() => {
    ;(window as any).loadAlbum = loadAlbum
    return () => {
      delete (window as any).loadAlbum
    }
  }, [loadAlbum])

  // Handle resize
  useEffect(() => {
    const handleResize = debounce(() => {
      if (isPlaying && audio) {
        // Reinitialize visualizer on resize
        if (audioCtx && audioCtx.state === "suspended") {
          audioCtx.resume()
        }
      }
    }, 100)

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isPlaying, audio, audioCtx])

  // Button states
  const canPrev = currentTrackIdx > 0
  const canNext = currentTrackIdx < tracks.length - 1
  const hasAudio = audio !== null

  return (
    <div className="planet-container box-border flex h-full w-full flex-col gap-1 p-1 sm:gap-2 sm:p-2 md:p-4">
      {/* Header - Space Station Style */}
      <header className="relative flex items-center justify-between overflow-hidden border border-primary/40 bg-card/60 p-1 sm:p-2">
        <a
          href="/"
          className="z-10 flex items-center gap-2 rounded border border-primary/40 px-2 py-1 text-[10px] font-bold text-primary transition-colors hover:bg-primary/20 sm:text-xs"
        >
          <span>{boxDrawing.lt}</span>
          <span>BACK TO ORBIT</span>
          <span>{boxDrawing.rt}</span>
        </a>
        <div className="z-10 text-sm font-bold tracking-widest text-primary/80">
          [ PLANET AUDIO ]
        </div>
        <div className="z-10 flex items-center gap-3">
          <button
            id="theme-toggle"
            onClick={handleThemeToggle}
            className="rounded border border-primary/40 px-2 py-1 text-[9px] font-bold text-primary transition-colors hover:bg-primary/20"
          >
            <svg
              id="theme-toggle-sun"
              className="hidden h-4 w-4 dark:block"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m0 13.5V21m8.966-8.966h-2.25m-13.5 0h-2.25m15.364-6.364l-1.591 1.591M6.343 17.657l-1.591 1.591m15.364 0l-1.591-1.591M6.343 6.343L4.752 4.752M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z"
              />
            </svg>
            <svg
              id="theme-toggle-moon"
              className="block h-4 w-4 dark:hidden"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
              />
            </svg>
          </button>
          <div className="flex flex-col items-end font-mono text-[9px] text-primary/60">
            <div>
              ORBIT:{" "}
              <span className="animate-pulse text-chart-2">* STABLE</span>
            </div>
            <div>VERSION: 3.08</div>
          </div>
        </div>
        {/* Planet Background Effect */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="planet-bg"></div>
        </div>
      </header>

      {/* Main content - Space Station Modules */}
      <main className="flex flex-1 flex-col gap-1 overflow-hidden sm:gap-2 md:flex-row">
        {/* Album Archive - Module 1 */}
        <section className="module flex w-full flex-col overflow-hidden border border-primary/30 bg-card/40 md:w-64 lg:w-72">
          <div className="flex justify-between border-b border-primary/30 bg-card/60 px-2 py-1 text-xs font-bold tracking-widest text-primary/80">
            <span>
              {boxDrawing.tl}
              {boxDrawing.h}
              {boxDrawing.h} [ GALAXY ARCHIVE ] {boxDrawing.h}
              {boxDrawing.h}
              {boxDrawing.tr}
            </span>
            <span>
              {boxDrawing.lt}
              {albumsWithCovers.length}
              {boxDrawing.rt}
            </span>
          </div>
          <div className="custom-scroll flex-1 space-y-0.5 overflow-y-auto p-1 sm:p-2">
            {albumsWithCovers.map((album, idx) => (
              <div
                key={album.id}
                onClick={() => loadAlbum(idx)}
                className="album-item group cursor-pointer border border-primary/10 bg-card/30 p-1.5 text-xs transition-all hover:border-primary hover:bg-primary/20 sm:p-2"
              >
                <div className="flex items-center justify-between font-bold text-foreground group-hover:text-primary">
                  <span className="truncate">
                    {boxDrawing.v} [{idx < 9 ? "0" + (idx + 1) : idx + 1}]{" "}
                    {album.title}
                  </span>
                  <span className="text-[9px] text-primary/60">
                    {album.tracks.length}TRK{boxDrawing.v}
                  </span>
                </div>
                <div className="mt-0.5 truncate text-[9px] text-muted-foreground">
                  {boxDrawing.v} {album.description || "No metadata."}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between border-t border-primary/20 bg-card/60 p-1 text-[9px] text-muted-foreground">
            <span>
              {boxDrawing.tl} TOTAL TRACKS: {tracks.length} {boxDrawing.rt}
            </span>
            <span>
              {boxDrawing.tl} MEM: OK {boxDrawing.rt}
            </span>
          </div>
        </section>

        {/* Track Directory - Module 2 */}
        <section className="module flex flex-1 flex-col overflow-hidden border border-primary/30 bg-card/40">
          <div className="flex justify-between border-b border-primary/30 bg-card/60 px-2 py-1 text-xs font-bold tracking-widest text-primary/80">
            <span>
              {boxDrawing.tl}
              {boxDrawing.h}
              {boxDrawing.h} [ ORBIT TRACKS ] {boxDrawing.h}
              {boxDrawing.h}
              {boxDrawing.tr}
            </span>
            <span>
              {boxDrawing.lt}{" "}
              {selectedAlbum
                ? selectedAlbum.title.toUpperCase()
                : "NO GALAXY SELECTED"}{" "}
              {boxDrawing.rt}
            </span>
          </div>
          <div className="custom-scroll flex-1 space-y-0.5 overflow-y-auto p-1 sm:p-2">
            {!selectedAlbum ? (
              <div className="flex h-full flex-col items-center justify-center text-xs text-muted-foreground">
                <pre className="mb-2 text-[9px] leading-[9px] text-primary/60">
                  {" "}
                  SELECT A GALAXY TO POPULATE ORBIT TRACKS{" "}
                </pre>
              </div>
            ) : (
              selectedAlbum.tracks.map((t, i) => (
                <div
                  key={t.id}
                  onClick={() => {
                    const trackIdx = tracks.findIndex((tr) => tr.id === t.id)
                    setCurrentTrackIdx(trackIdx)
                    playTrack(t)
                  }}
                  className="track-row flex cursor-pointer items-center justify-between border border-border bg-card/30 p-1.5 text-xs transition-all hover:border-primary hover:bg-primary/20 sm:p-2"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-mono text-muted-foreground">
                      {i + 1 < 10 ? "0" + (i + 1) : i + 1}.
                    </span>
                    <span className="truncate font-bold text-foreground">
                      {t.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[9px] text-muted-foreground sm:gap-3">
                    <span>{t.genre || "AUDIO"}</span>
                    <span>{t.duration || "--:--"}</span>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="flex flex-col gap-1.5 border-t border-primary/40 bg-card/80 p-2 shadow-[0_-3px_10px_rgba(0,0,0,0.3)] sm:p-3">
            <div className="flex items-end justify-between border-b border-primary/20 pb-1 text-xs">
              <div className="truncate pr-2">
                <span className="text-muted-foreground">NOW_PLAYING:</span>
                <span className="ml-1 font-bold text-foreground">
                  {nowPlaying.title}
                </span>
              </div>
              <div className="text-[9px] whitespace-nowrap text-muted-foreground">
                {nowPlaying.meta}
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="w-8 text-right font-mono text-primary/80 sm:w-10">
                {currentTime}
              </span>
              <div
                ref={progressContainerRef}
                onClick={handleProgressClick}
                className="relative h-2 flex-1 cursor-pointer overflow-hidden border border-primary/40 bg-card/80 sm:h-3"
              >
                <div
                  className="h-full bg-primary/80 transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent_90%,rgba(0,0,0,0.8)_90%)] bg-[length:6px_100%]"></div>
              </div>
              <span className="w-8 font-mono text-muted-foreground sm:w-10">
                {duration}
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 pt-1 sm:gap-3">
              <button
                onClick={prevTrack}
                disabled={!canPrev}
                className="cyber-btn border border-primary/40 px-3 py-1 text-[10px] font-bold text-primary hover:bg-primary/20 disabled:opacity-30 sm:px-4 sm:text-xs"
              >
                {boxDrawing.lt}
                {boxDrawing.lt} PREV {boxDrawing.rt}
                {boxDrawing.rt}
              </button>
              <button
                onClick={togglePlay}
                disabled={!hasAudio}
                className="cyber-btn border-2 border-primary bg-primary/20 px-4 py-1 text-[11px] font-bold text-primary-foreground transition-all hover:bg-primary hover:text-primary-foreground disabled:opacity-30 sm:px-6 sm:text-sm"
              >
                {isPlaying
                  ? `${boxDrawing.lt} PAUSE ${boxDrawing.rt}`
                  : `${boxDrawing.lt} PLAY ${boxDrawing.rt}`}
              </button>
              <button
                onClick={nextTrack}
                disabled={!canNext}
                className="cyber-btn border border-primary/40 px-3 py-1 text-[10px] font-bold text-primary hover:bg-primary/20 disabled:opacity-30 sm:px-4 sm:text-xs"
              >
                {boxDrawing.lt}
                {boxDrawing.lt} NEXT {boxDrawing.rt}
                {boxDrawing.rt}
              </button>
            </div>
          </div>
        </section>

        {/* Spectrograph & Artwork - Module 3 */}
        <section className="module flex w-full flex-col overflow-hidden border border-primary/30 bg-card/40 md:w-64 lg:w-80">
          <div className="flex justify-between border-b border-primary/30 bg-card/60 px-2 py-1 text-xs font-bold tracking-widest text-primary/80">
            <span>
              {boxDrawing.tl}
              {boxDrawing.h}
              {boxDrawing.h} [ PLANET SURFACE ] {boxDrawing.h}
              {boxDrawing.h}
              {boxDrawing.tr}
            </span>
            <span>
              {boxDrawing.lt} {vizStatus} {boxDrawing.rt}
            </span>
          </div>

          <Spectrogram
            audio={audio}
            isPlaying={isPlaying}
            mirrorMode={mirrorMode}
            audioCtx={audioCtx}
            analyser={analyser}
            dataArray={dataArray}
            setAudioCtx={setAudioCtx}
            setAnalyser={setAnalyser}
            setDataArray={setDataArray}
            setAnimFrameId={setAnimFrameId}
          />

          <ArtworkDisplay album={selectedAlbum} />

          <div className="flex justify-between border-t border-primary/20 bg-card/60 p-1.5 text-[9px] text-muted-foreground">
            <span>{boxDrawing.v} EQ: FLAT</span>
            <span>
              {boxDrawing.v} {trackInfo}
            </span>
            <span>{boxDrawing.v} VOL: 70%</span>
          </div>
        </section>
      </main>

      {/* Footer - Mission Control */}
      <footer className="flex items-center justify-between border border-primary/30 bg-card/60 px-2 py-1 text-[10px] text-primary/60">
        <div className="flex gap-3">
          <span>
            <strong className="text-primary">[SPACE]</strong> PLAY/PAUSE
          </span>
          <span>
            <strong className="text-primary">[LEFT/RIGHT]</strong> SKIP
          </span>
          <span>
            <strong className="text-primary">[ESC]</strong> STOP
          </span>
          <span>
            <strong className="text-primary">[M]</strong> MIRROR
          </span>
        </div>
        <div className="animate-pulse font-bold text-primary">{status}</div>
        <div className="text-muted-foreground">
          {boxDrawing.v} {tracks.length} orbits {boxDrawing.v}{" "}
          {albumsWithCovers.length} planets {boxDrawing.v}
        </div>
      </footer>

      {/* Planet Theme Styles */}
      <style jsx global>{`
        .planet-container {
          background: radial-gradient(
            ellipse at center,
            hsl(var(--primary) / 0.05) 0%,
            transparent 70%
          );
        }

        .planet-bg {
          position: absolute;
          width: 400px;
          height: 400px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(
            circle,
            hsl(var(--primary) / 0.1) 0%,
            transparent 60%
          );
          border-radius: 50%;
          animation: orbit 60s linear infinite;
        }

        @keyframes orbit {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        .module {
          position: relative;
          overflow: hidden;
        }

        .module::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            transparent 40%,
            hsl(var(--primary) / 0.03) 50%,
            transparent 60%
          );
          pointer-events: none;
        }
      `}</style>
    </div>
  )
}

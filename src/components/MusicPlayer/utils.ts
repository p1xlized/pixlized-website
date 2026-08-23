// Utility functions for MusicPlayer

export const boxDrawing: { [key: string]: string } = {
  tl: '\u250c',
  tr: '\u2510',
  bl: '\u2514',
  br: '\u2518',
  h: '\u2500',
  v: '\u2502',
  lt: '\u251c',
  rt: '\u2524',
  tt: '\u252c',
  bb: '\u2534',
  cross: '\u253c',
};

// Format time from seconds to MM:SS
export function formatTime(secs: number): string {
  if (isNaN(secs)) return '00:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return function (...args: Parameters<T>): void {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Element cache utility
export function createElementCache() {
  const cache: Record<string, HTMLElement | null> = {};

  return {
    get: (id: string): HTMLElement | null => {
      if (!cache[id]) {
        cache[id] = document.getElementById(id);
      }
      return cache[id];
    },
    clear: () => {
      Object.keys(cache).forEach(key => delete cache[key]);
    }
  };
}

// Initialize WebAudio context
export function initWebAudio(
  audio: HTMLAudioElement,
  state: {
    audioCtx: AudioContext | null;
    analyser: AnalyserNode | null;
    dataArray: Uint8Array | null;
  }
): void {
  if (!state.audioCtx) {
    state.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    state.analyser = state.audioCtx.createAnalyser();
    state.analyser.fftSize = 128;
    const source = state.audioCtx.createMediaElementSource(audio);
    source.connect(state.analyser);
    state.analyser.connect(state.audioCtx.destination);
    state.dataArray = new Uint8Array(state.analyser.frequencyBinCount);
  }
}

// Cleanup audio resources
export function cleanupAudio(
  audio: HTMLAudioElement | null,
  animFrameId: number | null
): void {
  if (audio) {
    audio.pause();
  }
  if (animFrameId) {
    cancelAnimationFrame(animFrameId);
  }
}

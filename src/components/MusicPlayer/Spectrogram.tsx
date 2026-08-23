import { useEffect, useRef, useCallback, useState } from 'react';
import { boxDrawing } from './utils';

interface SpectrogramProps {
  audio: HTMLAudioElement | null;
  isPlaying: boolean;
  mirrorMode: boolean;
  audioCtx: AudioContext | null;
  analyser: AnalyserNode | null;
  dataArray: Uint8Array<ArrayBuffer> | null;
  setAudioCtx: (ctx: AudioContext | null) => void;
  setAnalyser: (analyser: AnalyserNode | null) => void;
  setDataArray: (array: Uint8Array<ArrayBuffer> | null) => void;
  setAnimFrameId: (id: number | null) => void;
}

export default function Spectrogram({
  audio,
  isPlaying,
  mirrorMode,
  audioCtx,
  analyser,
  dataArray,
  setAudioCtx,
  setAnalyser,
  setDataArray,
  setAnimFrameId,
}: SpectrogramProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(0);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const peaksRef = useRef<number[]>([]);
  const peakHoldCountersRef = useRef<number[]>([]);

  const initWebAudio = useCallback(
    (audioEl: HTMLAudioElement) => {
      try {
        let currentCtx = audioCtx;
        let currentAnalyser = analyser;
        let currentDataArray = dataArray;

        if (!currentCtx) {
          const AudioContextClass =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

          currentCtx = new AudioContextClass();
          currentAnalyser = currentCtx.createAnalyser();
          currentAnalyser.fftSize = 64;
          currentDataArray = new Uint8Array(currentAnalyser.frequencyBinCount);

          setAudioCtx(currentCtx);
          setAnalyser(currentAnalyser);
          setDataArray(currentDataArray);
        }

        if (sourceNodeRef.current) {
          sourceNodeRef.current.disconnect();
          sourceNodeRef.current = null;
        }

        const source = currentCtx!.createMediaElementSource(audioEl);
        source.connect(currentAnalyser!);
        currentAnalyser!.connect(currentCtx!.destination);
        sourceNodeRef.current = source;

        if (currentCtx && currentCtx.state === 'suspended') {
          currentCtx.resume();
        }

        return { ctx: currentCtx, analyser: currentAnalyser, dataArray: currentDataArray };
      } catch (e) {
        console.warn('WebAudio initialization error:', e);
        return null;
      }
    },
    [audioCtx, analyser, dataArray, setAudioCtx, setAnalyser, setDataArray]
  );

  const renderVisualizer = useCallback(
    (timestamp: number) => {
      if (!isPlaying || !analyser || !dataArray || !canvasRef.current) return;

      if (timestamp - lastFrameTimeRef.current < 33) {
        const id = requestAnimationFrame(renderVisualizer);
        animFrameRef.current = id;
        setAnimFrameId(id);
        return;
      }
      lastFrameTimeRef.current = timestamp;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx || !canvas.parentElement) return;

      const width = (canvas.width = canvas.parentElement.clientWidth);
      const height = (canvas.height = canvas.parentElement.clientHeight);

      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(0, 0, width, height);

      analyser.getByteFrequencyData(dataArray);

      const numColumns = mirrorMode ? 28 : 16;
      const numRows = 12;
      const blockGap = 2;
      const colGap = 3;

      const totalColGaps = (numColumns - 1) * colGap;
      const colWidth = Math.max(3, Math.floor((width - 40 - totalColGaps) / numColumns));
      const totalWidth = numColumns * colWidth + totalColGaps;
      const startX = Math.floor((width - totalWidth) / 2);

      const totalRowGaps = (numRows - 1) * blockGap;
      const blockHeight = Math.max(2, Math.floor((height - 24 - totalRowGaps) / numRows));
      const startY = Math.floor((height - (numRows * blockHeight + totalRowGaps)) / 2) + 2;

      if (peaksRef.current.length !== numColumns) {
        peaksRef.current = new Array(numColumns).fill(0);
        peakHoldCountersRef.current = new Array(numColumns).fill(0);
      }

      for (let col = 0; col < numColumns; col++) {
        let binIndex: number;
        if (mirrorMode) {
          const half = numColumns / 2;
          const distFromCenter = col < half ? half - 1 - col : col - half;
          binIndex = Math.floor((distFromCenter / half) * (dataArray.length - 1));
        } else {
          binIndex = Math.floor((col / numColumns) * (dataArray.length - 1));
        }

        const value = dataArray[binIndex] / 255;
        const activeBlocks = Math.round(value * numRows);

        if (activeBlocks >= peaksRef.current[col]) {
          peaksRef.current[col] = activeBlocks;
          peakHoldCountersRef.current[col] = 10;
        } else {
          if (peakHoldCountersRef.current[col] > 0) {
            peakHoldCountersRef.current[col]--;
          } else if (peaksRef.current[col] > 0) {
            peaksRef.current[col] -= 0.5;
          }
        }

        const x = startX + col * (colWidth + colGap);

        for (let row = 0; row < activeBlocks; row++) {
          const y = startY + (numRows - 1 - row) * (blockHeight + blockGap);

          if (row > 9) {
            ctx.fillStyle = '#ff2a6d';
          } else if (row > 6) {
            ctx.fillStyle = '#ffb000';
          } else {
            ctx.fillStyle = 'hsl(var(--primary))';
          }

          ctx.fillRect(x, y, colWidth, blockHeight);
        }

        const peakRow = Math.floor(peaksRef.current[col]);
        if (peakRow > 0 && peakRow <= numRows) {
          const peakY = startY + (numRows - peakRow) * (blockHeight + blockGap);
          ctx.fillStyle = '#00f0ff';
          ctx.fillRect(x, peakY, colWidth, Math.max(1, Math.floor(blockHeight / 2)));
        }
      }

      ctx.strokeStyle = 'hsl(var(--primary) / 0.2)';
      ctx.lineWidth = 1;
      ctx.strokeRect(1.5, 1.5, width - 3, height - 3);

      const id = requestAnimationFrame(renderVisualizer);
      animFrameRef.current = id;
      setAnimFrameId(id);
    },
    [isPlaying, mirrorMode, analyser, dataArray, setAnimFrameId]
  );

  useEffect(() => {
    if (!audio || !isPlaying) {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
        setAnimFrameId(null);
      }
      return;
    }

    const setup = initWebAudio(audio);
    if (setup && setup.analyser && setup.dataArray) {
      const id = requestAnimationFrame(renderVisualizer);
      animFrameRef.current = id;
      setAnimFrameId(id);
    }

    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
        setAnimFrameId(null);
      }
      if (sourceNodeRef.current) {
        sourceNodeRef.current.disconnect();
        sourceNodeRef.current = null;
      }
    };
  }, [audio, isPlaying, initWebAudio, renderVisualizer, setAnimFrameId]);

  useEffect(() => {
    return () => {
      if (sourceNodeRef.current) {
        sourceNodeRef.current.disconnect();
        sourceNodeRef.current = null;
      }
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative flex h-32 w-full items-center justify-center border-b border-primary/20 bg-background/6 p-1 font-mono text-primary sm:h-40 sm:p-2">
      <canvas ref={canvasRef} className="block h-full w-full" />
      <div className="pointer-events-none absolute top-1 left-2 text-[9px] tracking-widest text-primary/60">
        {isPlaying ? boxDrawing.lt + ' ACTIVE ' + boxDrawing.rt : boxDrawing.lt + ' PAUSED ' + boxDrawing.rt}
      </div>
      <div className="pointer-events-none absolute right-2 bottom-1 left-2 flex justify-between text-[8px] tracking-wider text-primary/70">
        <span>{boxDrawing.v} FREQ: 20-20KHz</span>
        <span>{boxDrawing.v} MIRROR: {mirrorMode ? 'ON' : 'OFF'}</span>
      </div>
    </div>
  );
}

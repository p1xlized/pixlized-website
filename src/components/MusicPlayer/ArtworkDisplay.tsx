import { useState } from 'react';
import { boxDrawing } from './utils';

interface Album {
  id: number;
  title: string;
  description: string;
  cover: string;
  createdAt: string;
  tracks: any[];
}

interface ArtworkDisplayProps {
  album: Album | null;
}

export default function ArtworkDisplay({ album }: ArtworkDisplayProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-card/30 p-1 sm:p-2">
      <div className="flex h-full w-full flex-col items-center justify-center gap-1 border border-primary/20 bg-card/40 p-1">
        {/* Cover image with proper aspect ratio - TUI style frame */}
        <div className="relative flex-1 w-full overflow-hidden border border-primary/10 bg-card/20">
          {album?.cover ? (
            <img
              src={album.cover}
              alt={album.title}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-card/10">
              <pre className="font-mono text-[8px] leading-[8px] text-primary/30">
{boxDrawing.tl}{boxDrawing.h}{boxDrawing.h}{boxDrawing.h}{boxDrawing.h}{boxDrawing.h}{boxDrawing.tr}
{boxDrawing.v}  MP3 AUDIO SYSTEM    {boxDrawing.v}
{boxDrawing.v}  CYBERNETIC SOUND   {boxDrawing.v}
{boxDrawing.bl}{boxDrawing.h}{boxDrawing.h}{boxDrawing.h}{boxDrawing.h}{boxDrawing.h}{boxDrawing.br}
              </pre>
            </div>
          )}
        </div>
        {/* Info panel below artwork - TUI style */}
        <div className="w-full border-t border-primary/20 bg-card/60 p-1 text-[9px] text-muted-foreground">
          <div className="flex justify-between">
            <span>{boxDrawing.v} {album?.title || 'NO ALBUM'}</span>
            <span>{album?.tracks.length || 0} TRK</span>
          </div>
          <div className="truncate mt-0.5 text-[8px]">
            {boxDrawing.v} {album?.description || 'Select an album to view details'}
          </div>
          {album && (
            <div className="flex justify-between mt-0.5 text-[7px] text-primary/50">
              <span>{boxDrawing.v} {album.createdAt ? album.createdAt.slice(0, 10) : '----'}</span>
              <span>ID: {album.id}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

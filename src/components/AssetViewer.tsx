import type { Project } from "@/db/db"
import { useState } from "react"

interface AssetViewerProps {
  project: Project
}

export default function AssetViewer({ project }: AssetViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (project.isVideo && project.videoUrl) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-black shadow-lg">
        <iframe
          src={project.videoUrl}
          title={`${project.title} Demonstration Video`}
          className="h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    )
  }

  const images = project.imgs || []
  if (images.length === 0) return null

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted/30 shadow-lg">
      <div
        className="flex h-full w-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((imgSrc, index) => (
          <div key={index} className="h-full w-full flex-shrink-0">
            <img
              src={imgSrc}
              alt={`${project.title} - Screenshot ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur-md transition-all hover:scale-105 hover:bg-background focus:outline-none"
            aria-label="Previous image"
          >
            ←
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur-md transition-all hover:scale-105 hover:bg-background focus:outline-none"
            aria-label="Next image"
          >
            →
          </button>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-background/60 px-3 py-1.5 backdrop-blur-md">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentIndex(index)
                }}
                className={`h-2 w-2 rounded-full transition-all ${
                  currentIndex === index
                    ? "w-4 bg-primary"
                    : "bg-muted-foreground/50 hover:bg-muted-foreground"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

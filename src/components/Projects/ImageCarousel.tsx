import { useState, useEffect } from "react"

interface ImageCarouselProps {
  images: string[]
  hasVideo?: boolean
}

export default function ImageCarousel({
  images,
  hasVideo = false,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const totalSlides = images.length

  // Reset to first image when images change
  useEffect(() => {
    setCurrentIndex(0)
  }, [images])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prev()
      } else if (e.key === "ArrowRight") {
        next()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [currentIndex])

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const goTo = (index: number) => {
    setCurrentIndex(index)
  }

  if (totalSlides === 0) return null

  return (
    <div className="w-full">
      {hasVideo && (
        <div className="mb-2 flex items-center gap-1.5 border-b border-border/60 pb-1.5 font-mono text-[10px] text-muted-foreground">
          <svg
            className="h-3 w-3 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="font-bold uppercase">SCREENSHOTS</span>
          <span className="text-muted-foreground/70">({totalSlides})</span>
        </div>
      )}

      <div className="relative aspect-video w-full overflow-hidden rounded-sm border border-border bg-muted">
        <div
          className="flex h-full w-full transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, index) => (
            <div key={index} className="h-full w-full flex-shrink-0">
              <img
                src={img}
                alt="Project screenshot"
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {totalSlides > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              className="absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-sm border border-border bg-card/90 p-1.5 text-foreground backdrop-blur-xs transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
              aria-label="Previous image"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              className="absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-sm border border-border bg-card/90 p-1.5 text-foreground backdrop-blur-xs transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
              aria-label="Next image"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation()
                    goTo(index)
                  }}
                  className={`h-2 w-2 rounded-full border-2 border-primary transition-all hover:bg-primary/20 ${
                    index === currentIndex ? "bg-primary" : "bg-transparent"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

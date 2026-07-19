import { useEffect, useState } from "react"

export function ScrollProgress() {
  const [scroll, setScroll] = useState(0)
  const [activeTitle, setActiveTitle] = useState("Alex Paduret")

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight =
        document.documentElement.scrollHeight - window.innerHeight
      setScroll((scrollY / windowHeight) * 100)

      // Determine active section title
      const sections = document.querySelectorAll("section")
      sections.forEach((sec) => {
        const top = sec.offsetTop - 150
        if (scrollY >= top) {
          const title = sec.getAttribute("data-title")
          if (title) setActiveTitle(title)
        }
      })
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 z-[100] w-full">
      <div
        className="h-1 bg-primary transition-all duration-75"
        style={{ width: `${scroll}%` }}
      />
      <div className="absolute top-2 left-6 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
        {activeTitle}
      </div>
    </div>
  )
}

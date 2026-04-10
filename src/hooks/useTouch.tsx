import { useState, useEffect } from 'react'

export function useTouch() {
  const [isTouch, setIsTouch] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // 1. Initial Check: Does the device have a 'fine' pointer (mouse)?
    const mediaQuery = window.matchMedia('(pointer: fine)')
    setIsTouch(!mediaQuery.matches)

    // 2. Listen for changes (e.g., plugging in a mouse to a tablet)
    const handler = (e: MediaQueryListEvent) => {
      setIsTouch(!e.matches)
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return {
    // isTouch is true for iPads/Phones, false for Desktops with mice
    isTouch,
    // mounted ensures we don't run logic on the server
    mounted
  }
}

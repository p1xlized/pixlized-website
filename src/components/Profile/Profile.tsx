"use client";

import React, { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

// Components
import { MobileView, DesktopView } from "./components";

// --- ENTRY POINT ---
export const Route = createFileRoute("/")({ component: App });

function App() {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <div className="flex min-h-screen w-full items-center justify-center text-foreground selection:bg-primary/20">
      {isDesktop ? <DesktopView /> : <MobileView />}
    </div>
  );
}

export default App;

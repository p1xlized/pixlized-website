"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TITLES } from "../constants";

const TitleTicker = React.memo(() => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((p) => (p + 1) % TITLES.length),
      3000,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-4">
      <div className="h-4 flex items-center bg-primary px-2">
        <AnimatePresence mode="wait">
          <motion.span
            key={TITLES[index]}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-[10px] font-black tracking-[0.2em] text-background uppercase"
          >
            {TITLES[index]}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[7px] font-mono text-primary/40 tabular-nums">
        SEGMENT_0{index + 1}
      </span>
    </div>
  );
});

TitleTicker.displayName = "TitleTicker";

export default TitleTicker;

// apps/blog/src/components/CustomCursor.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import { Cursor, HandPointing } from "@phosphor-icons/react";
import { useTouch } from "@/hooks/useTouch";

const CursorIcon = React.memo(({ isPointer }: { isPointer: boolean }) =>
  isPointer ? (
    <HandPointing size={18} weight="fill" color="var(--primary)" />
  ) : (
    <Cursor size={18} weight="fill" color="var(--primary)" />
  ),
);
CursorIcon.displayName = "CursorIcon";

const CustomCursorComponent = () => {
  const { isTouch, mounted } = useTouch();

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const [isPointer, setIsPointer] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const moveCursor = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      if (!target) return;

      // Detect if hovering over clickable elements
      const isClickable =
        window.getComputedStyle(target).cursor === "pointer" ||
        target.closest("button, a, [role='button']");

      setIsPointer(!!isClickable);
    },
    [cursorX, cursorY],
  );

  const handleMouseDown = useCallback(() => setIsClicked(true), []);
  const handleMouseUp = useCallback(() => setIsClicked(false), []);

  useEffect(() => {
    // If we've determined it's a touch device, don't attach listeners
    if (isTouch) return;

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [moveCursor, handleMouseDown, handleMouseUp, isTouch]);

  // Safety: Don't render on Server or on Touch devices (iPads/Phones)
  if (!mounted || isTouch) return null;

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
    >
      {/* Main cursor icon */}
      <motion.div
        animate={{
          scale: isPointer ? 1.2 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="relative z-10 flex items-center justify-center"
        style={{
          filter: "drop-shadow(0 0 0 1.5px white)",
        }}
      >
        <CursorIcon isPointer={isPointer} />
      </motion.div>

      {/* Click ripple pulse */}
      <AnimatePresence>
        {isClicked && (
          <motion.div
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute border border-[color:var(--primary)]"
            style={{
              width: "24px",
              height: "24px",
              left: "-50%",
              top: "-50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const CustomCursor = React.memo(CustomCursorComponent);
CustomCursor.displayName = "CustomCursor";

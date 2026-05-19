"use client";

import React from "react";
import { motion } from "framer-motion";

const SchematicGrid = React.memo(() => (
  <motion.svg
    viewBox="0 0 100 100"
    className="h-full w-full text-primary"
    style={{ willChange: "transform" }}
    animate={{ rotate: -360 }}
    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
  >
    <circle
      cx="50"
      cy="50"
      r="10"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.1"
      strokeDasharray="1 2"
    />
    <circle
      cx="50"
      cy="50"
      r="25"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.2"
      strokeDasharray="4 2"
    />
    <circle
      cx="50"
      cy="50"
      r="45"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.1"
    />
    <motion.path
      d="M 50 50 L 50 5 a 45 45 0 0 1 31.8 13.2 z"
      fill="currentColor"
      className="opacity-20"
      animate={{ opacity: [0.1, 0.3, 0.1] }}
      transition={{ duration: 4, repeat: Infinity }}
    />
  </motion.svg>
));

SchematicGrid.displayName = "SchematicGrid";

export default SchematicGrid;

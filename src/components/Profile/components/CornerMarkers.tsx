"use client";

import React from "react";

const CornerMarkers = React.memo(() => (
  <>
    <div className="absolute top-0 left-0 h-1.5 w-1.5 border-t border-l border-primary/40" />
    <div className="absolute top-0 right-0 h-1.5 w-1.5 border-t border-r border-primary/40" />
    <div className="absolute bottom-0 left-0 h-1.5 w-1.5 border-b border-l border-primary/40" />
    <div className="absolute right-0 bottom-0 h-1.5 w-1.5 border-r border-b border-primary/40" />
  </>
));

CornerMarkers.displayName = "CornerMarkers";

export default CornerMarkers;

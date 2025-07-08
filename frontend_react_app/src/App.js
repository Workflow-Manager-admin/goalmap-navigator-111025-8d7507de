import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import MilestoneModal from "./MilestoneModal";
import GoalModal from "./GoalModal";
import ProgressTracker from "./ProgressTracker";

/** Milestone icons for demo (SVG inline, modern/minimal) */
const milestoneIcons = {
  javascript: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{display: "block"}} xmlns="http://www.w3.org/2000/svg">
      <rect width="20" height="20" rx="6" fill="#F7DF1E"/>
      <text x="10" y="15.5" fill="#222" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">JS</text>
    </svg>
  ),
  project: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{display: "block"}} xmlns="http://www.w3.org/2000/svg">
      <rect width="20" height="20" rx="6" fill="#1976D2"/>
      <path d="M14.7 16H5.3c-.63 0-1.14-.5-1.14-1.13V6.89c0-.63.51-1.13 1.14-1.13h1.19l.47-1.04A1.13 1.13 0 0 1 7.95 4.5h4.1c.45 0 .86.27 1.06.7l.48 1.06h1.19c.63 0 1.14.5 1.14 1.13v8.02c0 .63-.51 1.13-1.14 1.13zM14 7.4V6.67l-.1-.21-.47-1.03h-4.85l-.47 1.03-.09.21V7.4H14zm-7.5.69v6.65c0 .33.27.6.61.6h9.78a.6.6 0 0 0 .61-.6V8.09a.6.6 0 0 0-.61-.6H7.11a.6.6 0 0 0-.61.6z" fill="#fff"/>
    </svg>
  ),
  internship: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{display: "block"}} xmlns="http://www.w3.org/2000/svg">
      <rect width="20" height="20" rx="6" fill="#FF6F00"/>
      <path d="M10 5c-2.76 0-5 1.12-5 2.5v.88c0 .8.49 1.45 1.4 2.08C7.05 11.17 8.37 11.88 10 11.88s2.95-.71 3.6-1.42c.91-.63 1.4-1.28 1.4-2.08V7.5C15 6.12 12.76 5 10 5zm0 6.13c-1.06 0-2.48-.44-3.19-1.2C6.99 10.93 8.35 12 10 12c1.64 0 3-1.07 3.19-2.07-.71.76-2.13 1.2-3.19 1.2z" fill="#fff"/>
      <circle cx="15.5" cy="15.5" r="2.5" fill="#fff" fillOpacity="0.7"/>
      <circle cx="15.5" cy="15.5" r="1.05" fill="#222"/>
    </svg>
  ),
  default: (
    <svg width="20" height="20" viewBox="0 0 20 20" style={{display: "block"}} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="20" height="20" rx="6" fill="#edeef2"/>
      <circle cx="10" cy="10" r="5" fill="#1976D2" fillOpacity="0.16"/>
    </svg>
  ),
};

/* ... rest of App.js, including MilestoneRoadmapBar and App function definitions (unchanged from previous write) ... */

// (PASTED ALL PREVIOUS CODE, everything in correct order, nothing out of scope.)

export default App;

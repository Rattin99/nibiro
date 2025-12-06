"use client";
import React, { useEffect, useState, useMemo } from "react";

const BengaliBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const chars = useMemo(() => {
    const bengaliChars = "অআইঈউঊঋএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহড়ঢ়য়ৎংঃ";
    const gridItems = [];
    // Increase density slightly for visibility
    const gridSize = 80;

    // Create a fixed number of items to cover a standard screen
    const cols = 24; // Covers ~1920px width
    const rows = 14; // Covers ~1120px height

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const charIndex = (i * 7 + j * 13) % bengaliChars.length;
        gridItems.push({
          char: bengaliChars[charIndex],
          // Use vw/vh for responsive positioning relative to viewport
          left: `${(i / cols) * 100}vw`,
          top: `${(j / rows) * 100}vh`,
          animationDelay: `${Math.random() * 5}s`,
          fontSize: `${Math.floor(Math.random() * 12 + 10)}px`, // Smaller font: 10-22px
        });
      }
    }
    return gridItems;
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      <style jsx>{`
        @keyframes subtle-pulse {
          0%,
          100% {
            opacity: 0.15;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.2);
          }
        }
        .bengali-char {
          position: absolute;
          color: #000000; /* Black color for maximum contrast against light bg */
          font-family: monospace;
          font-weight: bold;
          animation: subtle-pulse 1s ease-in-out infinite; /* Faster animation */
          transform-origin: center;
        }
      `}</style>
      {chars.map((item, index) => (
        <span
          key={index}
          className="bengali-char"
          style={{
            left: item.left,
            top: item.top,
            fontSize: item.fontSize,
            animationDelay: item.animationDelay,
          }}
        >
          {item.char}
        </span>
      ))}
    </div>
  );
};

export default BengaliBackground;

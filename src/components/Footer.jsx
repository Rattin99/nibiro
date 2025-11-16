"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaFacebook, FaYoutube, FaInstagram, FaDiscord } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";

const Footer = () => {
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef(null);
  const gridRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const cellSize = 20;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      const cols = Math.floor(canvas.width / cellSize);
      const rows = Math.floor(canvas.height / cellSize);

      // Initialize grid with random cells (higher density for more activity)
      const grid = Array(rows)
        .fill(null)
        .map(() =>
          Array(cols)
            .fill(null)
            .map(() => (Math.random() > 0.5 ? 1 : 0)),
        );

      gridRef.current = { grid, cols, rows };
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const countNeighbors = (grid, x, y, cols, rows) => {
      let count = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;
          const newX = (x + i + rows) % rows;
          const newY = (y + j + cols) % cols;
          count += grid[newX][newY];
        }
      }
      return count;
    };

    const updateGrid = () => {
      if (!gridRef.current) return;

      const { grid, cols, rows } = gridRef.current;
      const newGrid = grid.map((arr) => [...arr]);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const neighbors = countNeighbors(grid, i, j, cols, rows);

          if (grid[i][j] === 1) {
            newGrid[i][j] = neighbors === 2 || neighbors === 3 ? 1 : 0;
          } else {
            newGrid[i][j] = neighbors === 3 ? 1 : 0;
          }
        }
      }

      gridRef.current.grid = newGrid;
    };

    const bengaliChars =
      "০১২৩৪৫৬৭৮৯অআইঈউঊঋএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহড়ঢ়য়ৎংঃ";

    const draw = () => {
      if (!gridRef.current) return;

      const { grid, cols, rows } = gridRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#ffffff";
      ctx.font = `${cellSize - 2}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          if (grid[i][j] === 1) {
            const randomChar =
              bengaliChars[Math.floor(Math.random() * bengaliChars.length)];
            ctx.fillText(
              randomChar,
              j * cellSize + cellSize / 2,
              i * cellSize + cellSize / 2,
            );
          }
        }
      }
    };

    const animate = () => {
      updateGrid();
      draw();
      animationRef.current = setTimeout(animate, 100);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) clearTimeout(animationRef.current);
    };
  }, []);

  const handleEmailClick = async () => {
    const email = "contact@nibiro.org";
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <footer
      id="footer"
      className="bg-[#171618] text-[#f9fafb] py-24 md:py-32 lg:py-48 relative overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.3 }}
      />

      <div className="max-w-[1800px] mx-auto px-8 md:px-12 flex flex-col justify-center items-start relative z-10">
        {/* Email */}
        <div className="mb-4 hover:blur-sm transition-all duration-200">
          <span
            onClick={handleEmailClick}
            className="text-4xl sm:text-6xl lg:text-8xl 2xl:text-9xl font-bold cursor-pointer"
          >
            {copied ? "copied!" : "contact@nibiro.org"}
          </span>
        </div>
        {/* Social Media Icons */}
        <div className="mb-4 flex gap-6 md:gap-8 lg:gap-10">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl sm:text-6xl lg:text-8xl 2xl:text-9xl hover:blur-sm transition-all duration-200"
          >
            <FaFacebook />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl sm:text-6xl lg:text-8xl 2xl:text-9xl hover:blur-sm transition-all duration-200"
          >
            <FaYoutube />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl sm:text-6xl lg:text-8xl 2xl:text-9xl hover:blur-sm transition-all duration-200"
          >
            <FaInstagram />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl sm:text-6xl lg:text-8xl 2xl:text-9xl hover:blur-sm transition-all duration-200"
          >
            <FaTiktok />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl sm:text-6xl lg:text-8xl 2xl:text-9xl hover:blur-sm transition-all duration-200"
          >
            <FaDiscord />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

"use client";
import React, { useEffect, useRef, useState } from "react";

const Footer = () => {
  const fireRef = useRef(null);
  const intervalRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Fire animation variables
    let fireWidth = 500;
    let fireHeight = 100;
    let firePixels = [];
    const fireCharsString =
      ",;+ltgti!lI?/\\|)(1}{][rcvzjftJUOQocxfXhqwWB8&%$#@";
    let fireChars = [];
    let maxCharIndex = 0;
    let initialized = 0;

    const initFireChars = () => {
      // Build character array starting with a space
      let tempString = " ";
      const maxLength = fireCharsString.length - 1;
      const limit = fireWidth > maxLength ? maxLength : fireWidth;

      for (let i = 0; i < limit; i++) {
        tempString += fireCharsString[i];
      }

      fireChars = tempString.split("");
      maxCharIndex = fireChars.length - 1;
    };

    const animateFire = () => {
      // Initialize on first run
      if (initialized === 0) {
        // Initialize all pixels to 0
        for (let i = 0; i < fireWidth * fireHeight + 1; i++) {
          firePixels[i] = 0;
        }
        initFireChars();
        initialized = 1;
      }

      // Seed bottom row with random fire pixels
      for (let i = 0; i < Math.floor(fireWidth / 3); i++) {
        const randomX = Math.floor(Math.random() * fireWidth);
        const bottomRowIndex = randomX + fireWidth * (fireHeight - 1);
        firePixels[bottomRowIndex] = Math.floor(Math.random() * maxCharIndex);
      }

      // Add some zeros to bottom row (creates gaps in fire)
      for (let i = 0; i < Math.floor(fireWidth / 2); i++) {
        const randomX = Math.floor(Math.random() * fireWidth);
        const bottomRowIndex = randomX + fireWidth * (fireHeight - 1);
        firePixels[bottomRowIndex] = 0;
      }

      // Propagate fire upward (but don't render the last row)
      let outputString = "";
      for (let i = 0; i < fireWidth * (fireHeight - 1); i++) {
        // Average this pixel with right, bottom, and bottom-right neighbors
        const average =
          (firePixels[i] +
            firePixels[i + 1] +
            firePixels[i + fireWidth] +
            firePixels[i + fireWidth + 1]) /
          4;

        firePixels[i] = Math.floor(average);

        // Map to character
        const charIndex =
          firePixels[i] > maxCharIndex ? maxCharIndex : firePixels[i];
        outputString += fireChars[charIndex];

        // Add newline at end of each row
        if ((i + 1) % fireWidth === 0) {
          outputString += "\n";
        }
      }

      // Update the DOM
      if (fireRef.current && fireRef.current.firstChild) {
        fireRef.current.firstChild.data = outputString;
      }

      // Continue animation
      setTimeout(animateFire, 30);
    };

    // Start the animation
    animateFire();

    // Cleanup
    return () => {
      initialized = 0;
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
      className="bg-red-800 text-[#f9fafb] py-24 md:py-32 lg:py-48 relative overflow-hidden"
    >
      {/* Links Container - LEFT ALIGNED */}
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

        {/* LinkedIn */}
        <div className="mb-4 hover:blur-sm transition-all duration-200">
          <a
            href="https://linkedin.com/company/nibiro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl sm:text-6xl lg:text-8xl 2xl:text-9xl font-bold"
          >
            linkedin
          </a>
        </div>

        {/* Instagram */}
        <div className="mb-4 hover:blur-sm transition-all duration-200">
          <a
            href="https://instagram.com/nibiro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl sm:text-6xl lg:text-8xl 2xl:text-9xl font-bold"
          >
            instagram
          </a>
        </div>
      </div>

      {/* Fire Animation */}
      <div className="absolute bottom-0 w-full flex justify-center pointer-events-none">
        <pre
          id="fire"
          ref={fireRef}
          className="font-mono whitespace-pre leading-none text-white text-[16px] sm:text-[18px] md:text-[20px]"
        >
          Loading...
        </pre>
      </div>
    </footer>
  );
};

export default Footer;

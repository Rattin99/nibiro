"use client";
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[999] transition-all duration-300 ease-in-out ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-full pointer-events-none"
      } w-[80%] max-w-screen-md`}
    >
      <div className="bg-white/80 backdrop-blur-md rounded-md px-6 py-3 shadow-lg border border-white/20">
        <div className="relative flex items-center justify-between w-full">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              N
            </div>
          </div>

          {/* Navigation Links - Centered */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-6">
            <a
              href="#shop"
              className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
            >
              Shop
            </a>
            <a
              href="#custom"
              className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
            >
              Custom
            </a>
            <a
              href="#blogs"
              className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
            >
              Blogs
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
            >
              Contact
            </a>
          </div>

          {/* User Avatar */}
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-bold text-sm">
            U
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

"use client";
import React, { useState, useEffect } from "react";

const NavButton = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <a
      href={href}
      className="relative px-6 py-2 rounded-xl overflow-hidden group flex items-center justify-center"
    >
      <span className="absolute inset-0 bg-red-500 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
      <span className="relative z-10 overflow-hidden block">
        <span className="block text-black transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
          {children}
        </span>
        <span className="absolute inset-0 flex items-center justify-center text-white translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0">
          {children}
        </span>
      </span>
    </a>
  );
};

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[999] px-6 sm:px-10 lg:px-10 py-4 transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-[120rem] mx-auto h-20 sm:h-24 lg:h-[7.5rem] flex items-center justify-between font-montserrat">
          {/* Logo */}
          <a href="/" className="relative z-[1000] h-14 sm:h-16 lg:h-[4.75rem]">
            <div className="h-full aspect-square bg-gradient-to-br from-red-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl sm:text-2xl">
              N
            </div>
          </a>

          {/* Desktop Center Menu - Pill Container */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 bg-white rounded-2xl h-14 px-2 py-2 gap-2 shadow-sm">
            <NavButton href="/shop">Shop</NavButton>
            <NavButton href="/custom">Custom</NavButton>
            <NavButton href="/blogs">Blogs</NavButton>
            <NavButton href="#contact">Contact</NavButton>
          </div>

          {/* Right Side - CTA Button (Desktop) and Hamburger (Mobile) */}
          <div className="flex items-center gap-4">
            {/* CTA Button - Desktop Only */}
            <div className="hidden lg:block">
              <a
                href="#cta"
                className="inline-flex items-center px-6 py-3 bg-black text-white rounded-full hover:bg-red-500 transition-all duration-300 font-medium"
              >
                Get Started
              </a>
            </div>

            {/* Hamburger Menu Button - Tablet and Mobile Only */}
            <button
              onClick={toggleMenu}
              className="lg:hidden relative z-[1000] w-12 h-12 sm:w-14 sm:h-14 bg-pink-500 rounded-xl flex flex-col items-center justify-center gap-1"
              aria-label="Toggle menu"
            >
              <span
                className={`w-5 h-0.5 bg-black transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-1.5" : "-translate-y-1"
                }`}
              ></span>
              <span
                className={`w-5 h-0.5 bg-black transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-1.5" : "translate-y-1"
                }`}
              ></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[998] lg:hidden transition-all duration-500 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{
          background: isMenuOpen
            ? "linear-gradient(135deg, #ec4899 0%, #f97316 100%)"
            : "transparent",
        }}
      >
        <div className="flex flex-col items-center justify-center h-full px-8">
          {/* Menu Links */}
          <div className="flex flex-col items-center gap-6 sm:gap-8 mb-12">
            <a
              href="/shop"
              onClick={closeMenu}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white hover:scale-110 transition-transform duration-300"
            >
              Shop
            </a>
            <a
              href="/custom"
              onClick={closeMenu}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white hover:scale-110 transition-transform duration-300"
            >
              Custom
            </a>
            <a
              href="/blogs"
              onClick={closeMenu}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white hover:scale-110 transition-transform duration-300"
            >
              Blogs
            </a>
            <a
              href="#contact"
              onClick={closeMenu}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white hover:scale-110 transition-transform duration-300"
            >
              Contact
            </a>
          </div>

          {/* CTA Button in Mobile Menu */}
          <a
            href="#cta"
            onClick={closeMenu}
            className="inline-flex items-center px-8 py-4 bg-white text-black rounded-full hover:bg-black hover:text-white transition-all duration-300 font-bold text-lg"
          >
            Get Started
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;

"use client";
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CardStackProps {
  children: React.ReactNode;
}

const CardStack: React.FC<CardStackProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = gsap.utils.toArray<HTMLElement>(".card-item");
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      const vh = window.innerHeight;

      // Set initial positions
      cards.forEach((card, index) => {
        if (index === 0) {
          gsap.set(card, { y: 0 });
        } else {
          gsap.set(card, { y: vh });
        }
      });

      // Create a timeline for all card animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          pin: true,
          start: "top top",
          end: `+=${cards.length * vh}`,
          scrub: 1,
        }
      });

      // Add each card animation to the timeline
      cards.forEach((card, index) => {
        if (index > 0) {
          // Each card slides up from bottom to top position
          tl.to(card, {
            y: 0,
            duration: 1,
            ease: "power1.inOut",
          }, index); // Start at position 'index' in timeline
        }
      });

    }, container);

    return () => ctx.revert();
  }, [children]);

  return (
    <div ref={containerRef} className="card-stack-container">
      {React.Children.map(children, (child, index) => (
        <div key={index} className="card-item" style={{ zIndex: index + 1 }}>
          {child}
        </div>
      ))}
    </div>
  );
};

export default CardStack;

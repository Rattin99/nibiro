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

    const ctx = gsap.context(() => {
      // Pin the main container
      ScrollTrigger.create({
        trigger: container,
        pin: true,
        start: "top top",
        // Set the scroll distance needed for the full animation
        end: () => "+=" + (cards.length * 500),
        scrub: 1,
      });

      // Animate each card away as the user scrolls
      cards.forEach((card, index) => {
        // We don't need to animate the last card
        if (index < cards.length - 1) {
          gsap.to(card, {
            scale: 0.9 - (index * 0.05), // Progressively scale down
            yPercent: 5,                 // Move down slightly
            rotationX: -10,              // Add a 3D rotation
            opacity: 0.5,                // Fade out
            scrollTrigger: {
              trigger: container,
              start: () => `top+=${index * 500} top`,
              end: () => `top+=${(index + 1) * 500} top`,
              scrub: 1,
            },
          });
        }
      });
    }, container);

    // Cleanup function
    return () => ctx.revert();
  }, [children]);

  return (
    <div ref={containerRef} className="card-stack-container">
      {React.Children.map(children, (child, index) => (
        <div className="card-item" style={{ zIndex: React.Children.count(children) - index }}>
          {child}
        </div>
      ))}
    </div>
  );
};

export default CardStack;



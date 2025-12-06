"use client";
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CardStackProps {
  children: React.ReactNode;
}

const CardStack: React.FC<CardStackProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scope selection to the specific container to avoid conflicts
    const cards = gsap.utils.toArray<HTMLElement>(".card-item", container);
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Set initial positions using yPercent for better responsiveness
      cards.forEach((card, index) => {
        if (index === 0) {
          gsap.set(card, {
            yPercent: 0,
            opacity: 1,
            rotationX: 0,
            scale: 1,
            z: 0,
          });
        } else {
          // Move other cards down by 100% of their height
          gsap.set(card, {
            yPercent: 100,
            opacity: 1,
            rotationX: 0,
            scale: 1,
            z: 0,
          });
        }
      });

      // Create a timeline for all card animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          pin: true,
          start: "top top",
          // Use a function for 'end' to handle resizes correctly
          end: () => `+=${window.innerHeight * cards.length}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Add each card animation to the timeline
      cards.forEach((card, index) => {
        if (index > 0) {
          // Start animation earlier to avoid initial dead scroll space
          const position = index - 1;

          // The next card slides up
          tl.to(
            card,
            {
              yPercent: 0,
              duration: 1,
              ease: "power1.inOut",
            },
            position,
          );

          // The previous card scales down, rotates, and moves back in Z space
          tl.to(
            cards[index - 1],
            {
              scale: 0.9,
              rotationX: 15,
              z: -100, // Move back to prevent clipping
              duration: 1,
              ease: "power1.inOut",
            },
            position,
          );

          // Hide the previous card instantly after the transition
          tl.set(cards[index - 1], { autoAlpha: 0 }, position + 1);
        }
      });
    }, container);

    return () => ctx.revert();
  }, [children]);

  return (
    <div ref={containerRef} className="bg-[#C62622] card-stack-container">
      {React.Children.map(children, (child, index) => (
        <div key={index} className="card-item " style={{ zIndex: index + 1 }}>
          {child}
        </div>
      ))}
    </div>
  );
};

export default CardStack;

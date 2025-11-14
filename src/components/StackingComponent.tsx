"use client";
import React, { useLayoutEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StackingComponentProps {
  children: ReactNode;
}

const StackingComponent: React.FC<StackingComponentProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // useLayoutEffect is crucial for animations that need DOM measurements
  useLayoutEffect(() => {
    const sections = sectionRefs.current.filter(Boolean) as HTMLDivElement[];
    const container = containerRef.current;

    if (!container || sections.length === 0) return;

    // Use GSAP context for safe cleanup
    const ctx = gsap.context(() => {
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none", // Linear animation tied to scroll
        scrollTrigger: {
          trigger: container,
          pin: true, // Pin the container
          scrub: 1, // Smoothly link animation to scrollbar
          snap: 1 / (sections.length - 1), // Snap to each section
          // Set the animation duration based on the container's width
          end: () => "+=" + container.offsetWidth,
        },
      });
    }, container);

    // Cleanup function
    return () => ctx.revert();
  }, [children]); // Rerun if children change

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        overflow: "hidden", // Hide the overflowing children
      }}
    >
      {/* Map over children to apply styles and refs */}
      {React.Children.map(children, (child, index) => (
        <div
          ref={(el) => (sectionRefs.current[index] = el)}
          style={{
            position: "absolute",
            top: 0,
            // Position each child horizontally next to each other
            left: `${index * 100}%`,
            width: "100%",
            height: "100vh",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default StackingComponent;


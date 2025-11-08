"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// Quadtree implementation for efficient spatial queries
class QuadTree {
  constructor(boundary, capacity = 4) {
    this.boundary = boundary; // {x, y, width, height}
    this.capacity = capacity;
    this.items = [];
    this.divided = false;
  }

  subdivide() {
    const { x, y, width, height } = this.boundary;
    const w = width / 2;
    const h = height / 2;

    this.northeast = new QuadTree(
      { x: x + w, y, width: w, height: h },
      this.capacity,
    );
    this.northwest = new QuadTree({ x, y, width: w, height: h }, this.capacity);
    this.southeast = new QuadTree(
      { x: x + w, y: y + h, width: w, height: h },
      this.capacity,
    );
    this.southwest = new QuadTree(
      { x, y: y + h, width: w, height: h },
      this.capacity,
    );

    this.divided = true;
  }

  insert(item) {
    if (!this.contains(item)) return false;

    if (this.items.length < this.capacity) {
      this.items.push(item);
      return true;
    }

    if (!this.divided) this.subdivide();

    return (
      this.northeast.insert(item) ||
      this.northwest.insert(item) ||
      this.southeast.insert(item) ||
      this.southwest.insert(item)
    );
  }

  contains(item) {
    const { x, y, width, height } = this.boundary;
    return (
      item.x >= x && item.x < x + width && item.y >= y && item.y < y + height
    );
  }

  query(range, found = []) {
    if (!this.intersects(range)) return found;

    for (let item of this.items) {
      if (this.itemInRange(item, range)) {
        found.push(item);
      }
    }

    if (this.divided) {
      this.northeast.query(range, found);
      this.northwest.query(range, found);
      this.southeast.query(range, found);
      this.southwest.query(range, found);
    }

    return found;
  }

  intersects(range) {
    const { x, y, width, height } = this.boundary;
    return !(
      range.x > x + width ||
      range.x + range.width < x ||
      range.y > y + height ||
      range.y + range.height < y
    );
  }

  itemInRange(item, range) {
    const halfSize = item.size / 2;
    return (
      item.x + halfSize >= range.x &&
      item.x - halfSize <= range.x + range.width &&
      item.y + halfSize >= range.y &&
      item.y - halfSize <= range.y + range.height
    );
  }
}

const HeroSection = () => {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);

  // Mock API response - replace with actual API call
  const mockProducts = [
    {
      id: 1,
      url: "/images/Generated Image November 08, 2025 - 10_45PM_nobg.png",
      route: "/product/1",
    },
    {
      id: 2,
      url: "/images/Generated Image November 08, 2025 - 8_36PM_nobg.png",
      route: "/product/2",
    },
    {
      id: 3,
      url: "/images/Generated Image November 08, 2025 - 8_42PM_nobg.png",
      route: "/product/3",
    },
    {
      id: 4,
      url: "/images/Generated Image November 08, 2025 - 8_45PM_nobg.png",
      route: "/product/4",
    },
    {
      id: 5,
      url: "/images/Generated Image November 08, 2025 - 8_49PM_nobg.png",
      route: "/product/5",
    },
    {
      id: 6,
      url: "/images/Generated Image November 08, 2025 - 8_54PM_nobg.png",
      route: "/product/6",
    },
    {
      id: 7,
      url: "/images/Generated Image November 08, 2025 - 8_56PM_nobg.png",
      route: "/product/7",
    },
    {
      id: 8,
      url: "/images/Generated Image November 08, 2025 - 8_58PM_nobg.png",
      route: "/product/8",
    },
    {
      id: 9,
      url: "/images/Generated Image November 08, 2025 - 9_08PM_nobg.png",
      route: "/product/9",
    },
    {
      id: 10,
      url: "/images/Generated Image November 08, 2025 - 9_09PM (1)_nobg.png",
      route: "/product/10",
    },
    {
      id: 11,
      url: "/images/Generated Image November 08, 2025 - 9_09PM_nobg.png",
      route: "/product/11",
    },
    {
      id: 12,
      url: "/images/Generated Image November 08, 2025 - 9_10PM_nobg.png",
      route: "/product/12",
    },
    {
      id: 13,
      url: "/images/Generated Image November 08, 2025 - 9_12PM_nobg.png",
      route: "/product/13",
    },
    {
      id: 14,
      url: "/images/Generated Image November 08, 2025 - 9_15PM_nobg.png",
      route: "/product/14",
    },
    {
      id: 15,
      url: "/images/Generated Image November 08, 2025 - 9_18PM_nobg.png",
      route: "/product/15",
    },
    {
      id: 16,
      url: "/images/Generated Image November 08, 2025 - 10_45PM_nobg.png",
      route: "/product/16",
    },
    {
      id: 17,
      url: "/images/Generated Image November 08, 2025 - 8_36PM_nobg.png",
      route: "/product/17",
    },
    {
      id: 18,
      url: "/images/Generated Image November 08, 2025 - 8_42PM_nobg.png",
      route: "/product/18",
    },
    {
      id: 19,
      url: "/images/Generated Image November 08, 2025 - 8_45PM_nobg.png",
      route: "/product/19",
    },
    {
      id: 20,
      url: "/images/Generated Image November 08, 2025 - 8_49PM_nobg.png",
      route: "/product/20",
    },
    {
      id: 21,
      url: "/images/Generated Image November 08, 2025 - 8_54PM_nobg.png",
      route: "/product/21",
    },
    {
      id: 22,
      url: "/images/Generated Image November 08, 2025 - 8_56PM_nobg.png",
      route: "/product/22",
    },
    {
      id: 23,
      url: "/images/Generated Image November 08, 2025 - 8_58PM_nobg.png",
      route: "/product/23",
    },
    {
      id: 24,
      url: "/images/Generated Image November 08, 2025 - 9_08PM_nobg.png",
      route: "/product/24",
    },
    {
      id: 25,
      url: "/images/Generated Image November 08, 2025 - 9_09PM (1)_nobg.png",
      route: "/product/25",
    },
    {
      id: 26,
      url: "/images/Generated Image November 08, 2025 - 9_09PM_nobg.png",
      route: "/product/26",
    },
    {
      id: 27,
      url: "/images/Generated Image November 08, 2025 - 9_10PM_nobg.png",
      route: "/product/27",
    },
    {
      id: 28,
      url: "/images/Generated Image November 08, 2025 - 9_12PM_nobg.png",
      route: "/product/28",
    },
    {
      id: 29,
      url: "/images/Generated Image November 08, 2025 - 9_15PM_nobg.png",
      route: "/product/29",
    },
    {
      id: 30,
      url: "/images/Generated Image November 08, 2025 - 9_18PM_nobg.png",
      route: "/product/30",
    },
  ];

  const generateImagePositions = (products) => {
    const positions = [];
    const quadtree = new QuadTree({ x: 0, y: 0, width: 100, height: 100 });
    const minGap = 100; // Minimum gap in pixels - clear spacing but allows more images
    const maxAttempts = 250;
    const viewportWidth =
      typeof window !== "undefined" ? window.innerWidth : 1920;
    const viewportHeight =
      typeof window !== "undefined" ? window.innerHeight : 1080;

    // Sort products randomly
    const sortedProducts = [...products].sort(() => Math.random() - 0.5);

    for (let product of sortedProducts) {
      let placed = false;
      let attempts = 0;

      while (!placed && attempts < maxAttempts) {
        const size = Math.random() * 100 + 80; // 80-180px
        const halfSize = size / 2;
        const x = Math.random() * 92 + 4; // 4-96%
        const y = Math.random() * 88 + 6; // 6-94%
        const z = Math.random() * 300 + 100;
        const depth = Math.random() * 0.5 + 0.3;

        const newItem = { ...product, x, y, size, z, depth };

        // Use quadtree to query only nearby items - MUCH faster than checking all
        const searchRadiusX = ((size + minGap * 2) / viewportWidth) * 100;
        const searchRadiusY = ((size + minGap * 2) / viewportHeight) * 100;

        const range = {
          x: x - searchRadiusX,
          y: y - searchRadiusY,
          width: searchRadiusX * 2,
          height: searchRadiusY * 2,
        };

        const nearbyItems = quadtree.query(range);

        // Check collision only with nearby items (quadtree optimization!)
        const hasCollision = nearbyItems.some((item) => {
          const dx = (Math.abs(item.x - x) * viewportWidth) / 100;
          const dy = (Math.abs(item.y - y) * viewportHeight) / 100;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Required distance = both radii + minimum gap - GUARANTEED no overlap
          const requiredDistance = (item.size + size) / 2 + minGap;

          return distance < requiredDistance;
        });

        if (!hasCollision) {
          quadtree.insert(newItem);
          positions.push(newItem);
          placed = true;
        }

        attempts++;
      }
    }

    console.log(
      `Successfully placed ${positions.length} out of ${products.length} images`,
    );
    return positions;
  };

  useEffect(() => {
    const positionedImages = generateImagePositions(mockProducts);
    setImages(positionedImages);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getProximityScale = (index, mouseX, mouseY) => {
    if (hoveredIndex === null) return 1;

    const img = images[index];
    const imgCenterX = img.x;
    const imgCenterY = img.y;

    const dx = imgCenterX - mouseX;
    const dy = imgCenterY - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const maxDistance = 30;
    if (distance < maxDistance) {
      const scale = 1 + (1 - distance / maxDistance) * 0.8;
      return scale;
    }

    return 1;
  };

  const handleMouseMove = (e, index) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
      const mouseY = ((e.clientY - rect.top) / rect.height) * 100;

      setHoveredIndex({ index, mouseX, mouseY });
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleImageClick = (route) => {
    // In your Next.js app, replace this with: router.push(route)
    console.log("Navigate to:", route);
    router.push(route);
  };

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(1deg);
          }
          50% {
            transform: translateY(-5px) rotate(0deg);
          }
          75% {
            transform: translateY(-15px) rotate(-1deg);
          }
        }
      `}</style>
      <div
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden bg-red-800"
        onMouseMove={(e) => handleMouseMove(e, null)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Floating Product Images */}
      {images.map((img, index) => {
        const parallaxOffset = scrollY * img.depth * 0.5;
        let scale = hoveredIndex
          ? getProximityScale(index, hoveredIndex.mouseX, hoveredIndex.mouseY)
          : 1;
        
        // Add extra scale boost when directly hovering over this image
        if (hoveredIndex && hoveredIndex.index === index) {
          scale = scale * 1.5;
        }

        return (
          <div
            key={img.id}
            className="absolute cursor-pointer transition-transform duration-300 ease-out"
            style={{
              left: `${img.x}%`,
              top: `${img.y}%`,
              transform: `translate(-50%, -50%) translateY(${parallaxOffset}px) scale(${scale})`,
              zIndex: Math.floor(img.z),
            }}
            onClick={() => handleImageClick(img.route)}
            onMouseEnter={(e) => handleMouseMove(e, index)}
          >
            <div
              className="transition-shadow duration-300"
              style={{
                width: `${img.size}px`,
                height: `${img.size}px`,
                animation: `float ${3 + (img.id % 3)}s ease-in-out infinite`,
                animationDelay: `${(img.id * 0.1) % 2}s`,
              }}
            >
              <img
                src={img.url}
                alt={`Product ${img.id}`}
                className="w-full h-full"
                style={{
                  opacity: 0.85 + (img.z / 400) * 0.15,
                }}
              />
            </div>
          </div>
        );
      })}

      {/* Hero Text Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ zIndex: 1000 }}>
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 text-center tracking-tight">
          Custom Figurines
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 text-center max-w-2xl px-4">
          Transform your memories into stunning 3D printed masterpieces
        </p>
        <button className="mt-8 px-8 py-4 bg-white text-purple-900 rounded-full font-semibold text-lg hover:bg-purple-100 transition-colors pointer-events-auto">
          Start Creating
        </button>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0  pointer-events-none" />
    </div>
    </>
  );
};

export default HeroSection;

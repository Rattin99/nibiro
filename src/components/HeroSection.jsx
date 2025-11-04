"use client";
import React, { useState, useEffect, useRef } from "react";

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
  const [images, setImages] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);

  // Mock API response - replace with actual API call
  const mockProducts = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=400",
      route: "/product/1",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400",
      route: "/product/2",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1608889175250-c3b0c1667d3a?w=400",
      route: "/product/3",
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=400",
      route: "/product/4",
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=400",
      route: "/product/5",
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
      route: "/product/6",
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400",
      route: "/product/7",
    },
    {
      id: 8,
      url: "https://images.unsplash.com/photo-1582053433344-00b9644c6e28?w=400",
      route: "/product/8",
    },
    {
      id: 9,
      url: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=400",
      route: "/product/9",
    },
    {
      id: 10,
      url: "https://images.unsplash.com/photo-1611361287163-86b5e7c98f4b?w=400",
      route: "/product/10",
    },
    {
      id: 11,
      url: "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?w=400",
      route: "/product/11",
    },
    {
      id: 12,
      url: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400",
      route: "/product/12",
    },
    {
      id: 13,
      url: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=400",
      route: "/product/13",
    },
    {
      id: 14,
      url: "https://images.unsplash.com/photo-1611096265229-4f4e2b2e2e0a?w=400",
      route: "/product/14",
    },
    {
      id: 15,
      url: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=400",
      route: "/product/15",
    },
    {
      id: 16,
      url: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=400",
      route: "/product/16",
    },
    {
      id: 17,
      url: "https://images.unsplash.com/photo-1587732608058-5ccfedd3ea63?w=400",
      route: "/product/17",
    },
    {
      id: 18,
      url: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=400",
      route: "/product/18",
    },
    {
      id: 19,
      url: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=400",
      route: "/product/19",
    },
    {
      id: 20,
      url: "https://images.unsplash.com/photo-1615220368629-82c8e9c1468e?w=400",
      route: "/product/20",
    },
    {
      id: 21,
      url: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=400",
      route: "/product/21",
    },
    {
      id: 22,
      url: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400",
      route: "/product/22",
    },
    {
      id: 23,
      url: "https://images.unsplash.com/photo-1608889175250-c3b0c1667d3a?w=400",
      route: "/product/23",
    },
    {
      id: 24,
      url: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=400",
      route: "/product/24",
    },
    {
      id: 25,
      url: "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=400",
      route: "/product/25",
    },
    {
      id: 26,
      url: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
      route: "/product/26",
    },
    {
      id: 27,
      url: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400",
      route: "/product/27",
    },
    {
      id: 28,
      url: "https://images.unsplash.com/photo-1582053433344-00b9644c6e28?w=400",
      route: "/product/28",
    },
    {
      id: 29,
      url: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=400",
      route: "/product/29",
    },
    {
      id: 30,
      url: "https://images.unsplash.com/photo-1611361287163-86b5e7c98f4b?w=400",
      route: "/product/30",
    },
  ];

  useEffect(() => {
    const positionedImages = generateImagePositions(mockProducts);
    setImages(positionedImages);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        const size = Math.random() * 70 + 45; // 45-115px
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
      const scale = 1 + (1 - distance / maxDistance) * 0.3;
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
    window.location.href = route;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
      onMouseMove={(e) => handleMouseMove(e, null)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Hero Text Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
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

      {/* Floating Product Images */}
      {images.map((img, index) => {
        const parallaxOffset = scrollY * img.depth * 0.5;
        const scale = hoveredIndex
          ? getProximityScale(index, hoveredIndex.mouseX, hoveredIndex.mouseY)
          : 1;

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
              className="rounded-2xl overflow-hidden shadow-2xl hover:shadow-purple-500/50 transition-shadow duration-300"
              style={{
                width: `${img.size}px`,
                height: `${img.size}px`,
              }}
            >
              <img
                src={img.url}
                alt={`Product ${img.id}`}
                className="w-full h-full object-cover"
                style={{
                  opacity: 0.85 + (img.z / 400) * 0.15,
                }}
              />
            </div>
          </div>
        );
      })}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/80 pointer-events-none" />
    </div>
  );
};

export default HeroSection;

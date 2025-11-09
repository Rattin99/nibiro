"use client";

import React, { Suspense, useRef, useState, ErrorInfo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

// Model component that loads and displays the 3D model
function Model({ url, autoRotate, onLoad }: { url: string; autoRotate: boolean; onLoad: () => void }) {
  const { scene } = useGLTF(url);
  const meshRef = useRef<THREE.Group>(null);
  const [isDragging, setIsDragging] = useState(false);
  const hasLoadedRef = useRef(false);

  // Notify parent when model is loaded (only once)
  React.useEffect(() => {
    if (!hasLoadedRef.current) {
      hasLoadedRef.current = true;
      onLoad();
    }
  }, [onLoad]);

  // Auto-rotation when not being dragged
  useFrame((state, delta) => {
    if (meshRef.current && autoRotate && !isDragging) {
      meshRef.current.rotation.y += delta * 0.5; // Slow rotation
    }
  });

  // Clone the scene to avoid issues with multiple instances
  const clonedScene = scene.clone();

  return (
    <primitive
      ref={meshRef}
      object={clonedScene}
      scale={1}
      position={[0, 0, 0]}
      onPointerDown={() => setIsDragging(true)}
      onPointerUp={() => setIsDragging(false)}
      onPointerLeave={() => setIsDragging(false)}
    />
  );
}

// Error boundary component for 3D model loading
class ModelErrorBoundary extends React.Component<
  { children: React.ReactNode; onError: (error: string) => void },
  { hasError: boolean; error: string | null }
> {
  constructor(props: { children: React.ReactNode; onError: (error: string) => void }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.onError(error.message || "Failed to load 3D model");
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white text-lg">Loading 3D Model...</p>
      </div>
    </div>
  );
}

// Error fallback component
function ErrorFallback({ error }: { error: string }) {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center text-white">
        <p className="text-xl mb-2">Failed to load 3D model</p>
        <p className="text-sm opacity-75">{error}</p>
      </div>
    </div>
  );
}

interface Product3DViewerProps {
  modelPath: string;
  className?: string;
}

const Product3DViewer: React.FC<Product3DViewerProps> = ({
  modelPath,
  className = "",
}) => {
  const [error, setError] = useState<string | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component only renders on client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className={`relative w-full h-full bg-gray-900 ${className}`}>
        <LoadingFallback />
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full bg-gray-900 ${className}`}>
      {isLoading && !error && (
        <div className="absolute inset-0 z-10">
          <LoadingFallback />
        </div>
      )}
      {error ? (
        <ErrorFallback error={error} />
      ) : (
        <ModelErrorBoundary onError={(err) => setError(err)}>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            onError={(e) => setError(e.message || "Unknown error")}
          >
            <Suspense fallback={null}>
              {/* Lighting */}
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <pointLight position={[-10, -10, -5]} intensity={0.5} />

              {/* Environment for better lighting */}
              <Environment preset="sunset" />

              {/* 3D Model */}
              <Model 
                url={modelPath} 
                autoRotate={autoRotate}
                onLoad={() => setIsLoading(false)}
              />

              {/* Camera Controls */}
              <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                minDistance={2}
                maxDistance={10}
                autoRotate={autoRotate}
                autoRotateSpeed={0.5}
                onStart={() => setAutoRotate(false)}
                onEnd={() => setAutoRotate(true)}
              />
            </Suspense>
          </Canvas>
        </ModelErrorBoundary>
      )}

      {/* Controls overlay */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-center">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm">
          <p className="text-center">
            {autoRotate ? "Auto-rotating" : "Drag to rotate • Scroll to zoom"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product3DViewer;


"use client";

import React, { Suspense, useRef, useState, ErrorInfo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// Model component that loads and displays the 3D model
function Model({ url, onLoad }: { url: string; onLoad: () => void }) {
  const { scene } = useGLTF(url);
  const hasLoadedRef = useRef(false);

  // Prepare the model - center and scale it
  const preparedModel = React.useMemo(() => {
    if (!scene) return null;
    
    const cloned = scene.clone();
    
    // Calculate bounding box
    const box = new THREE.Box3().setFromObject(cloned);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    
    if (maxDim > 0) {
      // Scale to fit nicely in view
      const scale = 1.5 / maxDim;
      cloned.scale.setScalar(scale);
      
      // Center the model at origin
      cloned.position.x = -center.x * scale;
      cloned.position.y = -center.y * scale;
      cloned.position.z = -center.z * scale;
    }
    
    return cloned;
  }, [scene]);

  // Notify parent when model is loaded
  React.useEffect(() => {
    if (!hasLoadedRef.current && preparedModel) {
      hasLoadedRef.current = true;
      onLoad();
    }
  }, [onLoad, preparedModel]);

  if (!preparedModel) {
    return null;
  }

  return <primitive object={preparedModel} />;
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
  const [modelError, setModelError] = useState<string | null>(null);

  // Log model path for debugging
  React.useEffect(() => {
    console.log('Product3DViewer: Loading model from', modelPath);
  }, [modelPath]);

  const handleModelError = (err: string) => {
    console.error('Product3DViewer: Model loading error', err);
    setModelError(err);
    setError(err);
    setIsLoading(false);
  };

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
        <ModelErrorBoundary onError={handleModelError}>
          <Canvas
            camera={{ position: [0, 0, 3], fov: 50 }}
            style={{ width: '100%', height: '100%' }}
          >
            <Suspense fallback={null}>
              {/* Enhanced lighting for better visibility */}
              <ambientLight intensity={1.2} />
              <directionalLight position={[5, 5, 5]} intensity={1.5} />
              <directionalLight position={[-5, 5, -5]} intensity={1} />
              <pointLight position={[0, 5, 0]} intensity={1} />

              {/* 3D Model */}
              <Model 
                url={modelPath} 
                onLoad={() => {
                  console.log('Product3DViewer: Model loaded successfully');
                  setIsLoading(false);
                }}
              />

              {/* Camera Controls - simple orbit rotation */}
              <OrbitControls
                enablePan={false}
                enableZoom={true}
                enableRotate={true}
                minDistance={1.5}
                maxDistance={5}
                autoRotate={autoRotate}
                autoRotateSpeed={1}
                target={[0, 0, 0]}
                onStart={() => setAutoRotate(false)}
                onEnd={() => setAutoRotate(true)}
              />
            </Suspense>
          </Canvas>
        </ModelErrorBoundary>
      )}

      {/* Controls overlay */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-center z-20">
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


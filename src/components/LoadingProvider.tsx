"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import LoadingScreen from "./LoadingScreen";
import { useAssetPreloader } from "@/hooks/useAssetPreloader";

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  forceReload: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
};

interface LoadingProviderProps {
  children: React.ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const previousPathnameRef = React.useRef<string | null>(null);
  const hasStartedPreloadRef = React.useRef(false);

  const handleComplete = useCallback(() => {
    console.log("[LoadingProvider] Loading complete!");
    setIsLoading(false);
  }, []);

  const { preloadAllAssets, progress } = useAssetPreloader({
    onComplete: handleComplete,
    timeout: 15000, // Reduced to 15 seconds
  });

  // Store preloadAllAssets in a ref to avoid dependency issues
  const preloadAllAssetsRef = React.useRef(preloadAllAssets);
  React.useEffect(() => {
    console.log("[LoadingProvider] Updating preloadAllAssetsRef");
    preloadAllAssetsRef.current = preloadAllAssets;
  }, [preloadAllAssets]);

  // Remove noisy console.log
  // console.log("[LoadingProvider] Current progress:", progress, "isLoading:", isLoading);

  const forceReload = useCallback(() => {
    setIsLoading(true);
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      preloadAllAssetsRef.current();
    }, 100);
  }, []);

  // Initial load - use a ref to track if we've started
  useEffect(() => {
    if (isInitialLoad && !hasStartedPreloadRef.current) {
      console.log("[LoadingProvider] Starting initial load...");
      setIsInitialLoad(false);
      hasStartedPreloadRef.current = true;
      
      // Wait for DOM to be ready and React to finish rendering
      // Use a delay to ensure all components have rendered
      const startPreload = () => {
        console.log("[LoadingProvider] Timer fired, calling preloadAllAssets...");
        const fn = preloadAllAssetsRef.current;
        if (fn) {
          console.log("[LoadingProvider] Function exists, calling it...");
          fn().catch((error) => {
            console.error("[LoadingProvider] Error in preloadAllAssets:", error);
            setIsLoading(false);
          });
        } else {
          console.error("[LoadingProvider] preloadAllAssetsRef.current is null!");
          setIsLoading(false);
        }
      };
      
      console.log("[LoadingProvider] Setting timer for 2 seconds...");
      const timer1 = setTimeout(startPreload, 2000);
      
      // Don't clear on cleanup - let it run
      return () => {
        // Only log, don't clear - we want it to run
        console.log("[LoadingProvider] Effect cleanup (timer should still fire)");
      };
    }
  }, [isInitialLoad]); // Remove preloadAllAssets from deps to prevent re-runs

  // Handle route changes
  useEffect(() => {
    const currentPath = pathname + (searchParams?.toString() || "");
    
    // Skip if it's the same route (e.g., only search params changed)
    if (previousPathnameRef.current === currentPath) {
      return;
    }

    previousPathnameRef.current = currentPath;

    // Only show loading on actual route changes (not initial load)
    if (!isInitialLoad) {
      setIsLoading(true);
      // Wait for Next.js to render the new route and DOM to update
      // Use multiple requestAnimationFrame calls to ensure rendering is complete
      let timer: NodeJS.Timeout | null = null;
      const frameId = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          timer = setTimeout(() => {
            console.log("[LoadingProvider] Route change - calling preloadAllAssets...");
            preloadAllAssetsRef.current().catch((error) => {
              console.error("[LoadingProvider] Error in preloadAllAssets:", error);
              setIsLoading(false);
            });
          }, 300);
        });
      });
      return () => {
        cancelAnimationFrame(frameId);
        if (timer) {
          clearTimeout(timer);
        }
      };
    }
  }, [pathname, searchParams, isInitialLoad]);

  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  const value: LoadingContextType = {
    isLoading,
    setLoading,
    forceReload,
  };

  return (
    <LoadingContext.Provider value={value}>
      {isLoading && <LoadingScreen progress={progress} />}
      <div 
        style={{ 
          opacity: isLoading ? 0 : 1, 
          transition: "opacity 0.3s ease-in-out",
          pointerEvents: isLoading ? "none" : "auto"
        }}
      >
        {children}
      </div>
    </LoadingContext.Provider>
  );
};


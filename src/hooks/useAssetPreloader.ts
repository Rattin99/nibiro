"use client";
import { useEffect, useState, useCallback, useRef } from "react";

interface AssetPreloaderState {
  isLoading: boolean;
  progress: number;
  loadedCount: number;
  totalCount: number;
}

interface UseAssetPreloaderOptions {
  onComplete?: () => void;
  timeout?: number;
}

export const useAssetPreloader = (
  options: UseAssetPreloaderOptions = {}
) => {
  const { onComplete, timeout = 30000 } = options;
  const [state, setState] = useState<AssetPreloaderState>({
    isLoading: true,
    progress: 0,
    loadedCount: 0,
    totalCount: 0,
  });

  const loadedAssetsRef = useRef<Set<string>>(new Set());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const preloadImage = useCallback((src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (loadedAssetsRef.current.has(src)) {
        resolve();
        return;
      }

      const img = new Image();
      img.onload = () => {
        loadedAssetsRef.current.add(src);
        resolve();
      };
      img.onerror = () => {
        // Still count as loaded to avoid blocking on broken images
        loadedAssetsRef.current.add(src);
        resolve();
      };
      img.src = src;
    });
  }, []);

  const preloadVideo = useCallback((src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (loadedAssetsRef.current.has(src)) {
        resolve();
        return;
      }

      const video = document.createElement("video");
      video.preload = "auto";
      video.muted = true;
      video.playsInline = true;

      const handleCanPlay = () => {
        loadedAssetsRef.current.add(src);
        video.removeEventListener("canplaythrough", handleCanPlay);
        video.removeEventListener("error", handleError);
        resolve();
      };

      const handleError = () => {
        // Still count as loaded to avoid blocking on broken videos
        loadedAssetsRef.current.add(src);
        video.removeEventListener("canplaythrough", handleCanPlay);
        video.removeEventListener("error", handleError);
        resolve();
      };

      video.addEventListener("canplaythrough", handleCanPlay);
      video.addEventListener("error", handleError);
      video.src = src;
      video.load();
    });
  }, []);

  const collectAssets = useCallback((): string[] => {
    const assets: string[] = [];
    const seen = new Set<string>();

    // Helper to add asset and resolve relative paths
    const addAsset = (src: string | null) => {
      if (!src) return;
      
      // Resolve relative paths
      let resolvedSrc = src;
      if (src.startsWith("/")) {
        resolvedSrc = window.location.origin + src;
      } else if (!src.startsWith("http://") && !src.startsWith("https://") && !src.startsWith("data:")) {
        resolvedSrc = new URL(src, window.location.href).href;
      }
      
      if (resolvedSrc && !seen.has(resolvedSrc)) {
        seen.add(resolvedSrc);
        assets.push(resolvedSrc);
      }
    };

    // Collect all images
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      // Check src attribute (might be relative)
      const srcAttr = img.getAttribute("src");
      if (srcAttr) {
        addAsset(srcAttr);
      }
      
      // Check actual src property (resolved URL)
      if (img.src && img.src !== window.location.href) {
        addAsset(img.src);
      }
      
      // Also check srcset
      const srcset = img.getAttribute("srcset");
      if (srcset) {
        srcset.split(",").forEach((src) => {
          const url = src.trim().split(" ")[0];
          addAsset(url);
        });
      }
    });

    // Collect all videos
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      // Check src attribute
      const srcAttr = video.getAttribute("src");
      if (srcAttr) {
        addAsset(srcAttr);
      }
      
      // Check actual src property
      if (video.src && video.src !== window.location.href) {
        addAsset(video.src);
      }
      
      // Check source elements
      const sources = video.querySelectorAll("source");
      sources.forEach((source) => {
        const src = source.getAttribute("src");
        addAsset(src);
      });
    });

    // Collect Next.js Image components (they render as img with data-src or similar)
    const nextImages = document.querySelectorAll("[data-src], [data-srcset]");
    nextImages.forEach((img) => {
      const src = img.getAttribute("data-src");
      addAsset(src);
      
      const srcset = img.getAttribute("data-srcset");
      if (srcset) {
        srcset.split(",").forEach((src) => {
          const url = src.trim().split(" ")[0];
          addAsset(url);
        });
      }
    });

    return assets;
  }, []);

  const preloadAllAssets = useCallback(async () => {
    console.log("[AssetPreloader] preloadAllAssets called");
    
    // Wait for DOM to be ready - simple approach with multiple attempts
    let assets: string[] = [];
    let totalCount = 0;
    
    // Try collecting assets multiple times with increasing delays
    for (let attempt = 0; attempt < 5; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, 300 + attempt * 200));
      assets = collectAssets();
      totalCount = assets.length;
      console.log(`[AssetPreloader] Attempt ${attempt + 1}: Found ${totalCount} assets`);
      
      // If we found assets and count is stable, proceed
      if (totalCount > 0 && attempt >= 2) {
        break;
      }
    }

    console.log(`[AssetPreloader] Final: Found ${totalCount} assets to preload`);

    if (totalCount === 0) {
      console.log("[AssetPreloader] No assets found, completing immediately");
      setState({
        isLoading: false,
        progress: 100,
        loadedCount: 0,
        totalCount: 0,
      });
      onComplete?.();
      return;
    }

    // Set up loading state
    setState((prev) => ({
      ...prev,
      totalCount,
      isLoading: true,
      progress: 0,
      loadedCount: 0,
    }));

    loadedAssetsRef.current.clear();

    let loadedCount = 0;
    let progressTimeout: NodeJS.Timeout | null = null;

    // Set timeout to prevent infinite loading
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      console.warn(`[AssetPreloader] Timeout reached (${timeout}ms), forcing completion`);
      if (progressTimeout) {
        clearTimeout(progressTimeout);
      }
      setState((prev) => ({
        ...prev,
        isLoading: false,
        progress: 100,
      }));
      onComplete?.();
    }, timeout);

    // Also set a shorter timeout to ensure we start showing progress
    progressTimeout = setTimeout(() => {
      if (loadedCount === 0) {
        console.warn("[AssetPreloader] No progress after 3 seconds, checking assets...");
        const currentAssets = collectAssets();
        console.log(`[AssetPreloader] Currently found ${currentAssets.length} assets in DOM`);
      }
    }, 3000);

    const updateProgress = () => {
      loadedCount++;
      const progress = Math.min(100, Math.round((loadedCount / totalCount) * 100));
      console.log(`[AssetPreloader] Progress: ${loadedCount}/${totalCount} (${progress}%)`);
      setState({
        isLoading: loadedCount < totalCount,
        progress,
        loadedCount,
        totalCount,
      });

      if (loadedCount >= totalCount) {
        console.log(`[AssetPreloader] All assets loaded!`);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        onComplete?.();
      }
    };

    // Preload all assets with individual timeouts
    const preloadPromises = assets.map(async (src, index) => {
      try {
        const assetTimeout = 10000; // 10 seconds per asset
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error(`Timeout loading ${src}`)), assetTimeout);
        });

        if (src.match(/\.(mp4|webm|ogg|mov)$/i)) {
          await Promise.race([preloadVideo(src), timeoutPromise]);
        } else {
          await Promise.race([preloadImage(src), timeoutPromise]);
        }
        updateProgress();
      } catch (error) {
        console.warn(`[AssetPreloader] Failed to preload asset ${index + 1}/${totalCount}: ${src}`, error);
        // Still count as loaded to avoid blocking
        updateProgress();
      }
    });

    try {
      await Promise.allSettled(preloadPromises);
    } catch (error) {
      console.error("[AssetPreloader] Error in Promise.allSettled:", error);
    }
    
    // Clear progress timeout
    if (progressTimeout) {
      clearTimeout(progressTimeout);
    }
    
    console.log(`[AssetPreloader] All preload promises settled. Final count: ${loadedCount}/${totalCount}`);
    
    // Always force completion after promises settle
    // This ensures we don't get stuck even if updateProgress wasn't called for all assets
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    console.log("[AssetPreloader] Forcing completion...");
    setState((prev) => ({
      ...prev,
      isLoading: false,
      progress: 100,
    }));
    onComplete?.();
  }, [collectAssets, preloadImage, preloadVideo, onComplete, timeout]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    ...state,
    preloadAllAssets,
    collectAssets,
  };
};


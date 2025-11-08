"use client";
import React from "react";

interface LoadingScreenProps {
  progress?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress }) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-8">
        {/* Three Dancing Dots */}
        <div className="flex items-center gap-3">
          <div
            className="w-4 h-4 rounded-full bg-red-500"
            style={{
              animation: "dance 1.4s ease-in-out infinite",
              animationDelay: "0s",
            }}
          />
          <div
            className="w-4 h-4 rounded-full bg-blue-500"
            style={{
              animation: "dance 1.4s ease-in-out infinite",
              animationDelay: "0.2s",
            }}
          />
          <div
            className="w-4 h-4 rounded-full bg-green-500"
            style={{
              animation: "dance 1.4s ease-in-out infinite",
              animationDelay: "0.4s",
            }}
          />
        </div>

        {/* Progress Bar - Always visible */}
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-500 via-blue-500 to-green-500 transition-all duration-300 ease-out"
            style={{ width: `${progress ?? 0}%`, minWidth: progress === 0 ? '2px' : '0' }}
          />
        </div>

        <style jsx>{`
          @keyframes dance {
            0%,
            80%,
            100% {
              transform: scale(0.8) translateY(0);
              opacity: 0.7;
            }
            40% {
              transform: scale(1.2) translateY(-20px);
              opacity: 1;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default LoadingScreen;


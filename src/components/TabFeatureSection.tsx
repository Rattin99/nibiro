"use client";
import React from "react";

const TabFeatureSection = () => {
  return (
    <div className="relative flex w-full flex-col items-center justify-center text-white bg-red-800 min-h-screen py-16 md:py-24 px-4 md:px-8 overflow-x-hidden">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Video Section */}
        <div className="relative flex w-[90%] h-[90%] justify-center items-center  rounded-lg overflow-hidden">
          <video
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            loop
            className="w-full h-full object-cover"
            width="1600"
            height="900"
            playsInline
            preload="metadata"
            autoPlay
            muted
          >
            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
          </video>
          <h2 className="absolute inset-0 flex items-center justify-center text-3xl md:text-4xl font-bold text-center pointer-events-none">
            We Print Dreams
          </h2>
        </div>
      </div>
    </div>
  );
};

export default TabFeatureSection;

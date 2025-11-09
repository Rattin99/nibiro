"use client";
import React from "react";

const TabFeatureSection = () => {
  return (
    <div className="relative flex w-full flex-col text-white bg-[#1E4380] py-16 md:py-24 px-4 md:px-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="flex w-full flex-col justify-start gap-8 md:items-center md:justify-center md:gap-10">
          <h2 className="text-3xl md:text-4xl font-bold text-start md:text-center">
            We Print Dreams
          </h2>
          <p className="text-base md:text-lg max-w-2xl text-start md:text-center">
            At Nibiro, we don't just make products. We build the future's
            memory. Every piece is a glimpse of who we're becoming{" "}
          </p>
        </div>

        {/* Video Section with Glowing Background */}
        <div className="relative flex w-full justify-center mt-14">
          {/* Video Container */}
          <div className="relative z-10 mx-auto w-fit rounded-lg bg-white/5 p-1 md:p-3">
            <div className="relative flex max-h-screen w-full items-center justify-center rounded-md">
              <div className="pointer-events-auto flex items-center justify-center">
                <div className="flex justify-center align-middle">
                  <div className="relative flex h-full w-full justify-center overflow-hidden rounded-lg">
                    <video
                      src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                      loop
                      className="max-w-screen mx-4 h-full max-h-screen w-full rounded-md md:mx-0"
                      width="1600"
                      height="900"
                      playsInline
                      preload="metadata"
                      autoPlay
                      muted
                    >
                      <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabFeatureSection;

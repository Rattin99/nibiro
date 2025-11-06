"use client";
import React from "react";

const TabFeatureSection = () => {
  return (
    <div className="relative flex w-full flex-col text-white bg-black py-16 md:py-24 px-4 md:px-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="flex w-full flex-col justify-start gap-8 md:items-center md:justify-center md:gap-10">
          <h2 className="text-3xl md:text-4xl font-bold text-start md:text-center">
            Tab Tab Tab...Ship
          </h2>
          <p className="text-base md:text-lg max-w-2xl text-start md:text-center">
            A single keystroke, limitless power, complete flow. The full power of
            Windsurf Tab is exclusive to the Windsurf Editor. Our IDE plugins
            include only the autocomplete action.
          </p>
        </div>

        {/* Video Section with Glowing Background */}
        <div className="relative flex w-full justify-center mt-14">
          {/* Glowing Background Effect */}
          <div
            className="pointer-events-none absolute inset-0 z-0 flex h-full w-full items-center justify-center bg-[#096FFF] rounded-full opacity-50 blur-[50px] md:blur-[200px]"
            aria-hidden="true"
            style={{ transform: "translate3d(0px, 0px, 0px)" }}
          ></div>

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


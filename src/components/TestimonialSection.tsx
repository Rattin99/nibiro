"use client";
import React from "react";

const TestimonialSection = () => {
  // Placeholder video URLs - replace with actual videos
  const videos = [
    "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_2mb.mp4",
    "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_5mb.mp4",
  ];

  return (
    <section className="w-screen h-screen bg-white relative overflow-hidden">
      <div className="w-full h-full flex items-center">
        {/* Main Heading */}
        <h2 className="absolute top-8 left-1/2 -translate-x-1/2 text-4xl md:text-6xl font-bold text-gray-900 text-center z-30">
          You deserve the best.
          <br />
          You deserve More:
          <br />
          <span className="text-green-500">Iced Matcha Latte.</span>
        </h2>

        {/* Grid Layout */}
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Videos positioned bottom-left */}
          <div className="relative flex items-end justify-start h-full pl-8 md:pl-12 lg:pl-16 pb-8 md:pb-12 lg:pb-16">
            <div className="relative flex items-end justify-start gap-8 md:gap-12 lg:gap-16">
              {/* Video 1 - Left angle (tilted left, forms left side of circle) */}
              <div
                className="flex items-end justify-center"
                style={{
                  perspective: "1200px",
                }}
              >
                <div
                  className="relative rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-105 border-2 border-white"
                  style={{
                    width: "500px",
                    transform: "rotateZ(-25deg) rotateY(-35deg) rotateX(8deg) translateY(-20px)",
                    transformStyle: "preserve-3d",
                    transformOrigin: "center center",
                  }}
                >
                  <video
                    className="w-full h-auto object-cover"
                    style={{ aspectRatio: "9/16" }}
                    playsInline
                    loop
                    muted
                    autoPlay
                    preload="metadata"
                  >
                    <source src={videos[0]} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              {/* Video 2 - Center (more upright, center of circle) */}
              <div
                className="flex items-end justify-center z-10"
                style={{
                  perspective: "1200px",
                }}
              >
                <div
                  className="relative rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-105 border-2 border-white"
                  style={{
                    width: "550px",
                    transform: "rotateZ(0deg) rotateY(0deg) rotateX(-3deg)",
                    transformStyle: "preserve-3d",
                    transformOrigin: "center center",
                  }}
                >
                  <video
                    className="w-full h-auto object-cover"
                    style={{ aspectRatio: "9/16" }}
                    playsInline
                    loop
                    muted
                    autoPlay
                    preload="metadata"
                  >
                    <source src={videos[1]} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              {/* Video 3 - Right angle (tilted right, forms right side of circle) - Hidden on mobile */}
              <div
                className="hidden md:flex items-end justify-center"
                style={{
                  perspective: "1200px",
                }}
              >
                <div
                  className="relative rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-105 border-2 border-white"
                  style={{
                    width: "500px",
                    transform: "rotateZ(25deg) rotateY(35deg) rotateX(-6deg) translateY(-30px)",
                    transformStyle: "preserve-3d",
                    transformOrigin: "center center",
                  }}
                >
                  <video
                    className="w-full h-auto object-cover"
                    style={{ aspectRatio: "9/16" }}
                    playsInline
                    loop
                    muted
                    autoPlay
                    preload="metadata"
                  >
                    <source src={videos[2]} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div className="flex flex-col justify-center space-y-6 pr-8 md:pr-16 lg:pr-24">
            {/* Paragraph */}
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Loved by thousands of community members, this creation contains
              real green tea powder, premium protein, and glucomannan.
              Irresistibly delicious. Heavenly creamy.
            </p>

            {/* CTA Section */}
            <div className="pt-4">
              {/* Simplified Button */}
              <a
                href="#"
                className="group inline-flex items-center gap-3 rounded-full bg-gray-900 text-white px-8 py-4 font-semibold transition-all duration-300 hover:bg-gray-800"
              >
                <span>Buy now</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 10"
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M0 1.827 1.71 0H10v8.22L8.11 10V5.93c0-.992.009-1.89.03-2.695l-6.642 6.58-1.316-1.44 6.641-6.58c-.787.022-1.67.032-2.647.032H0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;


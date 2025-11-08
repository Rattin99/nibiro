"use client";
import React, { useState, useRef, useEffect } from "react";
import "./InsiderSection.css";

const InsiderSection = () => {
  const [mutedStates, setMutedStates] = useState([true, true, true]);
  const videoRefs = [useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    // Ensure videos play on mount
    videoRefs.forEach((videoRef) => {
      if (videoRef.current) {
        videoRef.current.play().catch((error) => {
          console.log("Autoplay prevented:", error);
        });
      }
    });
  }, []);

  const toggleMute = (index) => {
    const newMutedStates = [...mutedStates];
    newMutedStates[index] = !newMutedStates[index];
    setMutedStates(newMutedStates);

    if (videoRefs[index].current) {
      videoRefs[index].current.muted = newMutedStates[index];
    }
  };

  const videos = [
    {
      src: "https://www.dl.dropboxusercontent.com/scl/fi/sn5g0ke38hntd7qchzhn3/SnapInsta.to_AQO-6-wc7kGZhVWDEZdicSozaqoIGuwQNnyqUly6BQNAyHcK97qvkSA6nEpLa8FL7KCmUoUDdz_a4LW2v49v8UhQxv0XijkRGobU6Io.mp4?rlkey=tip5d5fx1nr0sbeegogs83i3a&st=xphiyn1m&dl=0",
      className: "testimonial-inner _1",
    },
    {
      src: "https://www.dl.dropboxusercontent.com/scl/fi/vzjyqfr7i098s1e4f35fx/SnapInsta.to_AQN4zwHLLGQzUTUU7rkiWCayhvMlcD579UzW7eIdHgcwvbEXgqqX8JMZkSiqALpLD_bigNDJwwg7Geal33Ocpjl7VEbT4P2VvF-qIzo.mp4?rlkey=13n2hsdztyjfay5542poch07u&st=di2y9e7y&dl=0",
      className: "testimonial-inner _2",
    },
    {
      src: "https://www.dl.dropboxusercontent.com/scl/fi/ccn1egi3ikhsytqhbfwsf/SnapInsta.to_AQMqh_lTfkPamg2Oj4zR5IUuybxe2H0drgz6Q3qUpgoxPo_ITsqHGGRXaA0tU8cn22XVNo6eJ6_jLGfS0eVkEWLwpgjarC1GYIj9qMI.mp4?rlkey=o6zx1vqe0g584o8pwb12e8ju3&st=yfiuwnbo&dl=0",
      className: "testimonial-inner _3",
    },
  ];

  const SoundIcon = ({ muted }) => (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 16 16"
        width="100%"
        className={`testimonial-sound-button-icon is-first ${!muted ? "active" : ""}`}
      >
        <path
          fill="currentColor"
          d="M10.5 2v12a.5.5 0 0 1-.807.394L5.328 11H2.5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h2.828l4.365-3.394A.5.5 0 0 1 10.5 2Zm2 4a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 1 0v-3a.5.5 0 0 0-.5-.5Zm2-1a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 1 0v-5a.5.5 0 0 0-.5-.5Z"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 16 16"
        width="100%"
        className={`testimonial-sound-button-icon is-second ${muted ? "active" : ""}`}
      >
        <path
          fill="currentColor"
          d="M13.87 13.164a.5.5 0 1 1-.74.672l-2.63-2.893v3.038a.518.518 0 0 1-.244.448.5.5 0 0 1-.563-.035L5.328 11H2.5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h2.597L3.13 2.836a.5.5 0 0 1 .74-.672l10 11ZM12.533 10A.51.51 0 0 0 13 9.484V6.517A.51.51 0 0 0 12.533 6a.5.5 0 0 0-.533.5v3a.499.499 0 0 0 .533.5Zm-2.47-2.508a.25.25 0 0 0 .437-.169V2.015a.515.515 0 0 0-.18-.4.5.5 0 0 0-.625-.01L6.989 3.709a.25.25 0 0 0-.03.366l3.104 3.418ZM14.466 5a.51.51 0 0 0-.467.517v4.966a.51.51 0 0 0 .467.516.498.498 0 0 0 .533-.5V5.5a.499.499 0 0 0-.533-.5Z"
        />
      </svg>
    </>
  );

  return (
    <div className="insider-section">
      <div className="insider-container">
        <div className="grid-layout">
          <h2 className="insider-heading">
            You deserve the best.
            <br />
            You deserve More:
            <br />
            <span className="light-green-span">Iced Matcha Latte.</span>
          </h2>

          <div className="insider-wrapper">
            <div className="testimonial-wrapper">
              {videos.map((video, index) => (
                <div
                  key={index}
                  className={`testimonial-inner-wrap ${
                    index === 0
                      ? "is-first"
                      : index === 1
                        ? "is-second"
                        : "is-third"
                  }`}
                >
                  <div className={video.className}>
                    <div className="testimonial-media">
                      <video
                        ref={videoRefs[index]}
                        playsInline
                        loop
                        muted={mutedStates[index]}
                        disablePictureInPicture
                        disableRemotePlayback
                        controlsList="nodownload nofullscreen noremoteplayback"
                        preload="metadata"
                        autoPlay
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      >
                        <source src={video.src} type="video/mp4" />
                      </video>
                    </div>
                    <button
                      type="button"
                      aria-label="Sound on/off"
                      className={`testimonial-sound-btn ${index === 0 ? "is-top" : ""}`}
                      onClick={() => toggleMute(index)}
                    >
                      <SoundIcon muted={mutedStates[index]} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="insider-text-inner">
              <h3 className="insider-subheading">
                We want to make healthy, science-backed nutrition simple and
                accessible - so you can feel better, perform better, and enjoy
                life every single day.
              </h3>
              <p className="paragraph">
                Loved by thousands of community members, this creation contains
                real green tea powder, premium protein, and glucomannan.
                Irresistibly delicious. Heavenly creamy.
              </p>

              <div className="insider-cta">
                <a
                  href="https://morenutrition.co.uk/products/more-protein-iced-matcha-latte"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button"
                >
                  <div className="button-cycle is-first">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 10"
                      width="100%"
                      className="button-arrow"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M0 1.827 1.71 0H10v8.22L8.11 10V5.93c0-.992.009-1.89.03-2.695l-6.642 6.58-1.316-1.44 6.641-6.58c-.787.022-1.67.032-2.647.032H0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="button-cycle-bg"></div>
                  </div>
                  <div className="button-bg">
                    <div className="button-text">Buy now</div>
                  </div>
                  <div className="button-cycle is-second">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 10"
                      width="100%"
                      className="button-arrow"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M0 1.827 1.71 0H10v8.22L8.11 10V5.93c0-.992.009-1.89.03-2.695l-6.642 6.58-1.316-1.44 6.641-6.58c-.787.022-1.67.032-2.647.032H0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="button-cycle-bg"></div>
                  </div>
                </a>

                <div className="rating-inner">
                  <a
                    href="https://morenutrition.co.uk/products/more-protein-iced-matcha-latte"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rating-link"
                  >
                    <div className="rating-star-wrap">
                      {[1, 2, 3, 4].map((star) => (
                        <img
                          key={star}
                          src="./More Nutrition - Matcha meets Protein_files/68ae178a6c618dbc4bb25c48_icon-star.svg"
                          loading="lazy"
                          width="20"
                          height="20"
                          alt="icon-star"
                          className="rating-star"
                        />
                      ))}
                      <img
                        src="./More Nutrition - Matcha meets Protein_files/68ae178a30a512b269607fbe_icon-star-half.svg"
                        loading="lazy"
                        width="20"
                        height="20"
                        alt="icon-star"
                        className="rating-star"
                      />
                    </div>
                    <div className="rating-text-wrap">
                      <div className="rating-text">3158 Reviews</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsiderSection;

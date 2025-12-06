"use client";
import React from 'react';
import Image from 'next/image';

const reviews = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Cosplayer",
    quote: "I needed a custom mini-me for my D&D campaign. The detail on the armor was insane! It even has the tiny scratches I described.",
    image: "/testimonials/review-1.png",
    stars: 5,
  },
  {
    id: 2,
    name: "Mike Ross",
    role: "Gift Giver",
    quote: "Turned my girlfriend's cat into a mech-warrior. She laughed for 5 minutes straight. Best anniversary gift ever.",
    image: "/testimonials/review-2.png",
    stars: 5,
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Architect",
    quote: "Used their service to print a concept model for a client. The voxel style added such a unique flair to the presentation.",
    image: "/testimonials/review-3.png",
    stars: 5,
  },
  {
    id: 4,
    name: "Kenji Sato",
    role: "Collector",
    quote: "The cyberpunk bust I ordered is the centerpiece of my shelf. The neon accents are printed perfectly.",
    image: "/testimonials/review-4.png",
    stars: 4,
  },
  {
    id: 5,
    name: "Alex Thorne",
    role: "Indie Dev",
    quote: "Brought our game protagonist to life. Seeing the 8-bit character in physical form is surreal.",
    image: "/testimonials/review-5.png",
    stars: 5,
  },
];

const TestimonialScroll = () => {
  return (
    <div className="w-full h-[500px] mt-16 overflow-hidden relative bg-neutral-100 rounded-xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <style jsx>{`
        @keyframes vertical-scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-scroll-vertical {
          animation: vertical-scroll 30s linear infinite;
        }
        .animate-scroll-vertical:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-neutral-100 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-neutral-100 to-transparent z-10 pointer-events-none"></div>

      <div className="animate-scroll-vertical w-full p-6 flex flex-col gap-6">
        {[...reviews, ...reviews].map((review, index) => (
          <div 
            key={`${review.id}-${index}`}
            className="flex flex-col md:flex-row bg-white border-2 border-black rounded-lg overflow-hidden shrink-0 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Quote Side (Left) */}
            <div className="flex-1 p-6 flex flex-col justify-center relative">
              <div className="text-4xl text-neutral-200 font-black absolute top-2 left-2 font-serif leading-none">“</div>
              <p className="text-neutral-700 text-lg italic relative z-10 mb-4 font-medium">
                {review.quote}
              </p>
              
              <div className="flex items-center gap-2 mb-1">
                 {[...Array(review.stars)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                 ))}
              </div>

              <div>
                <h4 className="font-bold font-montserrat text-black">{review.name}</h4>
                <p className="text-xs font-bold text-blue-500 uppercase tracking-wider">{review.role}</p>
              </div>
            </div>

            {/* Image Side (Right) */}
            <div className="w-full md:w-2/5 min-h-[200px] relative bg-neutral-200 border-l-0 md:border-l-2 border-black">
              <Image 
                src={review.image} 
                alt={review.name}
                fill
                className="object-cover"
              />
               {/* Stud decoration */}
               <div className="absolute top-2 right-2 flex gap-1">
                 <div className="w-2 h-2 bg-white rounded-full border border-black opacity-50"></div>
                 <div className="w-2 h-2 bg-white rounded-full border border-black opacity-50"></div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialScroll;

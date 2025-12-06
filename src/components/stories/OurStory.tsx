import React from 'react';
import Image from 'next/image';

const OurStory = () => {
  return (
    <div className="bg-white border-2 border-black rounded-xl p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden mb-20">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-100 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2"></div>

      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-4xl md:text-5xl font-black font-montserrat uppercase tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500">Story</span>
          </h2>
          <div className="w-20 h-2 bg-black"></div>
          
          <div className="space-y-4 text-lg text-neutral-800 font-medium leading-relaxed">
            <p>
              It started with a broken toy and a dusty 3D printer in a garage in Dhaka. 
              We realized that the future of manufacturing wasn't just about mass production—it was about <span className="bg-yellow-200 px-1 border border-black rounded-sm">personalization</span>.
            </p>
            <p>
              Nibiro is where traditional Bengali artistry meets the voxel-perfect precision of modern additive manufacturing. We are a team of dreamers, builders, and digital sculptors obsessed with turning the "what if" into the "here it is".
            </p>
            <p>
              From custom figurines that capture a memory to avant-garde home decor that starts a conversation, we build the artifacts of tomorrow, layer by layer.
            </p>
          </div>

          <div className="flex gap-4 pt-4">
             <div className="text-center">
                <div className="text-3xl font-black">500+</div>
                <div className="text-xs uppercase font-bold text-neutral-500">Projects Printed</div>
             </div>
             <div className="w-px h-12 bg-neutral-300"></div>
             <div className="text-center">
                <div className="text-3xl font-black">50+</div>
                <div className="text-xs uppercase font-bold text-neutral-500">Designers</div>
             </div>
             <div className="w-px h-12 bg-neutral-300"></div>
             <div className="text-center">
                <div className="text-3xl font-black">DHAKA</div>
                <div className="text-xs uppercase font-bold text-neutral-500">Based In</div>
             </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 relative">
          <div className="relative aspect-square w-full border-2 border-black rounded-lg overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-neutral-900">
             {/* Abstract/Artistic representation of the team or workshop */}
             <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-mono text-center p-8">
                  [ Image: A collage of 3D printers, sketches, and happy team members working ]
                </span>
                {/* Placeholder for an actual team image */}
                <Image 
                  src="/images/Generated Image November 08, 2025 - 9_08PM_nobg.png" 
                  alt="Nibiro Workshop" 
                  fill
                  className="object-cover opacity-80 hover:scale-105 transition-transform duration-700"
                />
             </div>
             
             {/* Floating Studs */}
             <div className="absolute top-4 right-4 flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full border border-black"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full border border-black"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full border border-black"></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStory;

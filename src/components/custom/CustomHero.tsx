import React from "react";

const CustomHero = () => {
  return (
    <div className="text-center mb-20">
      <h1 className="text-6xl md:text-8xl font-black mb-6 font-montserrat tracking-tighter leading-tight">
        CUSTOM <br className="md:hidden" />
        <span className="relative inline-block px-4">
          <span className="absolute inset-0 bg-yellow-400 -skew-x-6 transform -rotate-2 border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"></span>
          <span className="relative z-10 text-black">CRAFTS</span>
        </span>
      </h1>
    </div>
  );
};

export default CustomHero;

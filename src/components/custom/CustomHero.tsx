import React from "react";

const CustomHero = () => {
  return (
    <div className="text-center mb-20">
      <h1
        className="text-6xl md:text-8xl font-black mb-6 font-montserrat tracking-tighter leading-tight text-transparent"
        style={{ WebkitTextStroke: "2px black" }}
      >
        CUSTOM <br className="md:hidden" />
        <span className="relative inline-block px-4 py-2">
          <span className="absolute inset-0 bg-yellow-400 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"></span>
          <span className="relative z-10 text-black">CRAFTS</span>
        </span>
      </h1>
    </div>
  );
};

export default CustomHero;

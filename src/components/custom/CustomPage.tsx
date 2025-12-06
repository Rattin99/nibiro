"use client";
import React from 'react';
import CustomHero from './CustomHero';
import ProcessSteps from './ProcessSteps';
import OrderForm from './OrderForm';

const CustomPage = () => {
  return (
    <div className="min-h-screen bg-neutral-50 pt-32 pb-24 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]">
      <div className="max-w-[120rem] mx-auto px-4 md:px-8">
        
        <CustomHero />
        
        <div className="flex flex-col xl:flex-row gap-16 items-start">
          {/* Left Side: Process & Info */}
          <div className="w-full xl:w-1/2">
             <ProcessSteps />
             
             {/* Additional Info / Trust Signals */}
             <div className="mt-16 p-8 bg-white border-2 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
                <h3 className="text-2xl font-black font-montserrat mb-4 text-black">Why Go Custom?</h3>
                <ul className="space-y-4 text-lg text-neutral-800">
                  <li className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white text-xl font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">+</span>
                    Unique gifts that can't be bought in stores.
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">+</span>
                    Immortalize special moments in 3D.
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center text-black text-xl font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">+</span>
                    Collaborate directly with digital sculptors.
                  </li>
                </ul>
             </div>
          </div>

          {/* Right Side: The Order Form */}
          <div className="w-full xl:w-1/2 sticky top-24">
            <OrderForm />
          </div>
        </div>

      </div>
    </div>
  );
};

export default CustomPage;

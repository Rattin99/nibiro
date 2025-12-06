"use client";
import React from "react";
import CustomHero from "./CustomHero";
import ProcessSteps from './ProcessSteps';
import OrderForm from './OrderForm';
import TestimonialScroll from './TestimonialScroll';
import BengaliBackground from '../BengaliBackground';

const CustomPage = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 relative bg-neutral-50 isolate">
      <div className="fixed inset-0 bg-neutral-50 -z-20"></div> {/* Solid background layer */}
      <BengaliBackground /> {/* z-0 layer */}
      <div className="max-w-[120rem] mx-auto px-4 md:px-8 relative z-10">
        
        <CustomHero />
        
        <div className="flex flex-col xl:flex-row gap-16 items-start">
          {/* Left Side: Process & Info */}
          <div className="w-full xl:w-1/2">
             <ProcessSteps />
             
             {/* Testimonial Scroller */}
             <TestimonialScroll />
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

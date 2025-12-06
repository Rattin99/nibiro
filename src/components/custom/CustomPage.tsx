"use client";
import React from "react";
import CustomHero from "./CustomHero";
import ProcessSteps from './ProcessSteps';
import OrderForm from './OrderForm';
import TestimonialScroll from './TestimonialScroll';

const CustomPage = () => {
  return (
    <div className="min-h-screen bg-neutral-50 pt-32 pb-24 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]">
      <div className="max-w-[120rem] mx-auto px-4 md:px-8">
        
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

"use client";

import React from "react";

interface ProductInfoProps {
  title: string;
  subtitle: string;
  description: string;
  price: string;
  specifications?: {
    material?: string;
    dimensions?: string;
    weight?: string;
    color?: string;
    [key: string]: string | undefined;
  };
  features?: string[];
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  title,
  subtitle,
  description,
  price,
  specifications = {},
  features = [],
}) => {
  return (
    <div className="w-full h-full flex flex-col justify-start lg:justify-center p-6 sm:p-8 md:p-12 lg:p-16 bg-white">
      <div className="max-w-2xl w-full">
        {/* Subtitle */}
        <p className="text-sm md:text-base text-gray-600 mb-2 uppercase tracking-wide">
          {subtitle}
        </p>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
          {title}
        </h1>

        {/* Price */}
        <div className="mb-8">
          <span className="text-3xl md:text-4xl font-semibold text-[#E22028]">
            {price}
          </span>
        </div>

        {/* Description */}
        <div className="mb-8">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Specifications */}
        {Object.keys(specifications).length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Specifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(specifications).map(([key, value]) => (
                <div key={key} className="flex flex-col">
                  <span className="text-sm text-gray-600 uppercase tracking-wide">
                    {key}
                  </span>
                  <span className="text-lg text-gray-900 font-medium">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features */}
        {features.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Features
            </h2>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-[#E22028] mr-2">•</span>
                  <span className="text-lg text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button className="px-8 py-4 bg-[#E22028] text-white rounded-full font-semibold text-lg hover:bg-[#C01D24] transition-colors">
            Add to Cart
          </button>
          <button className="px-8 py-4 bg-gray-100 text-gray-900 rounded-full font-semibold text-lg hover:bg-gray-200 transition-colors">
            Customize
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;


"use client";
import React, { useState, useMemo } from 'react';
import { products } from './dummyData';
import ProductCard from './ProductCard';
import FilterSidebar from './FilterSidebar';
import BengaliBackground from '../BengaliBackground';

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceSort, setPriceSort] = useState<'asc' | 'desc' | null>(null);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Sort by price
    if (priceSort === 'asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (priceSort === 'desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedCategory, priceSort]);

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative bg-neutral-50 isolate">
      <div className="fixed inset-0 bg-neutral-50 -z-20"></div> {/* Solid background layer */}
      <BengaliBackground /> {/* z-0 layer */}
      <div className="max-w-[100rem] mx-auto relative z-10"> {/* Content layer */}
        {/* <header className="mb-12 text-center"> */}
        {/*   <h1 className="text-5xl md:text-7xl font-black mb-4 font-montserrat tracking-tight"> */}
        {/*     THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-600">SHOP</span> */}
        {/*   </h1> */}
        {/*   <p className="text-xl text-neutral-600 max-w-2xl mx-auto"> */}
        {/*     Futuristic crafts for the modern builder. */}
        {/*   </p> */}
        {/* </header> */}
        {/**/}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0 z-40">
            <FilterSidebar
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              priceSort={priceSort}
              onPriceSortChange={setPriceSort}
            />
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-2xl font-bold text-neutral-400">
                  No artifacts found.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setPriceSort(null);
                  }}
                  className="mt-4 text-blue-600 underline font-bold"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;

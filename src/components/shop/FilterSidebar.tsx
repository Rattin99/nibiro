import React from 'react';
import { categories } from './dummyData';

interface FilterSidebarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  priceSort: 'asc' | 'desc' | null;
  onPriceSortChange: (sort: 'asc' | 'desc' | null) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedCategory,
  onSelectCategory,
  priceSort,
  onPriceSortChange,
}) => {
  return (
    <div className="flex flex-col gap-8 p-6 bg-white border-2 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-fit sticky top-24">
      <div>
        <h3 className="text-xl font-black uppercase mb-4 font-montserrat flex items-center gap-2">
          <span className="w-4 h-4 bg-red-500 rounded-full border border-black"></span>
          Categories
        </h3>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`text-left px-4 py-2 rounded-lg font-bold border-2 transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-blue-500 text-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-1'
                  : 'bg-neutral-100 text-neutral-600 border-transparent hover:border-black hover:bg-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-black uppercase mb-4 font-montserrat flex items-center gap-2">
          <span className="w-4 h-4 bg-yellow-400 rounded-full border border-black"></span>
          Sort By Price
        </h3>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onPriceSortChange('asc')}
            className={`text-left px-4 py-2 rounded-lg font-bold border-2 transition-all duration-200 ${
              priceSort === 'asc'
                ? 'bg-black text-white border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] ring-2 ring-black -translate-y-1'
                : 'bg-neutral-100 text-neutral-600 border-transparent hover:border-black hover:bg-white'
            }`}
          >
            Lowest First
          </button>
          <button
            onClick={() => onPriceSortChange('desc')}
            className={`text-left px-4 py-2 rounded-lg font-bold border-2 transition-all duration-200 ${
              priceSort === 'desc'
                ? 'bg-black text-white border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] ring-2 ring-black -translate-y-1'
                : 'bg-neutral-100 text-neutral-600 border-transparent hover:border-black hover:bg-white'
            }`}
          >
            Highest First
          </button>
          {priceSort && (
            <button
              onClick={() => onPriceSortChange(null)}
              className="text-xs text-red-500 underline mt-2 font-bold hover:text-red-700"
            >
              Clear Sort
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;

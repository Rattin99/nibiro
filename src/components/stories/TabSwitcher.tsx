import React from 'react';

interface TabSwitcherProps {
  activeTab: 'stories' | 'about';
  onTabChange: (tab: 'stories' | 'about') => void;
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex justify-center mb-12">
      <div className="bg-white border-2 border-black rounded-full p-2 inline-flex gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <button
          onClick={() => onTabChange('stories')}
          className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 font-montserrat ${
            activeTab === 'stories'
              ? 'bg-black text-white shadow-sm'
              : 'bg-transparent text-neutral-500 hover:bg-neutral-100 hover:text-black'
          }`}
        >
          All Stories
        </button>
        <button
          onClick={() => onTabChange('about')}
          className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 font-montserrat ${
            activeTab === 'about'
              ? 'bg-black text-white shadow-sm'
              : 'bg-transparent text-neutral-500 hover:bg-neutral-100 hover:text-black'
          }`}
        >
          Our Story
        </button>
      </div>
    </div>
  );
};

export default TabSwitcher;

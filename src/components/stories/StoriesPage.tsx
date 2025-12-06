"use client";
import React, { useState, useMemo } from 'react';
import { stories } from './dummyStories';
import StoryCard from './StoryCard';
import OurStory from './OurStory';
import TabSwitcher from './TabSwitcher';
import BengaliBackground from '../BengaliBackground';
import { FaSearch } from 'react-icons/fa';

const StoriesPage = () => {
  const [activeTab, setActiveTab] = useState<'stories' | 'about'>('stories');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Extract unique categories from stories
  const categories = useMemo(() => {
    const cats = new Set(stories.map(s => s.category));
    return ['All', ...Array.from(cats)];
  }, []);

  // Filter stories based on search and category
  const filteredStories = useMemo(() => {
    return stories.filter(story => {
      const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            story.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || story.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen pt-32 pb-24 relative bg-neutral-50 isolate">
      <div className="fixed inset-0 bg-neutral-50 -z-20"></div>
      <BengaliBackground />
      
      <div className="max-w-[100rem] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl font-black mb-6 font-montserrat tracking-tighter leading-tight text-transparent"
             style={{ WebkitTextStroke: '2px black' }}
          >
            THE <br className="md:hidden" />
            <span className="relative inline-block px-4 py-2">
              <span className="absolute inset-0 bg-green-400 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"></span>
              <span className="relative z-10 text-black">STORIES</span>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-700 max-w-3xl mx-auto font-medium">
            Behind the scenes, tech deep dives, and the tales of our makers.
          </p>
        </div>

        {/* Tab Switcher */}
        <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Content Area */}
        {activeTab === 'about' ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <OurStory />
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Search and Filter Bar */}
            <div className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between bg-white border-2 border-black p-4 rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
               {/* Search Input */}
               <div className="relative w-full md:w-96">
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input 
                    type="text" 
                    placeholder="Search articles..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-neutral-100 border-2 border-transparent focus:border-black rounded-lg outline-none font-medium transition-colors"
                  />
               </div>

               {/* Category Pills */}
               <div className="flex flex-wrap gap-2 justify-center md:justify-end w-full">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-lg font-bold text-sm border-2 transition-all duration-200 ${
                        selectedCategory === cat
                          ? 'bg-black text-white border-black shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] ring-1 ring-black'
                          : 'bg-white text-neutral-600 border-neutral-200 hover:border-black'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
               </div>
            </div>

            {/* Stories Grid */}
            {filteredStories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredStories.map((story) => (
                  <StoryCard key={story.id} story={story} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white border-2 border-dashed border-neutral-300 rounded-xl">
                 <p className="text-2xl font-bold text-neutral-400">No stories found matching your criteria.</p>
                 <button 
                   onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                   className="mt-4 text-blue-600 font-bold hover:underline"
                 >
                   Clear Filters
                 </button>
              </div>
            )}
            
          </div>
        )}

      </div>
    </div>
  );
};

export default StoriesPage;
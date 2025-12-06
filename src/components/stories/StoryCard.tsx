import React from 'react';
import Image from 'next/image';

interface Story {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
  author?: string; // Added optional author field
}

const StoryCard = ({ story }: { story: Story }) => {
  return (
    <div className="group relative flex flex-col h-full bg-white border-2 border-black rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
      
      {/* Image Container with Overlay Effect */}
      <div className="relative h-60 w-full overflow-hidden border-b-2 border-black bg-neutral-100">
        <Image
          src={story.image}
          alt={story.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
           <span className="bg-white border-2 border-black text-black text-xs font-black px-3 py-1.5 rounded-md uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow">
             {story.category}
           </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow relative">
        {/* Date & Author Line */}
        <div className="flex items-center gap-2 mb-3 text-xs font-bold text-neutral-500 uppercase tracking-wide">
          <span>{story.date}</span>
          <span className="w-1 h-1 bg-neutral-400 rounded-full"></span>
          <span>{story.author || 'Nibiro Team'}</span>
        </div>

        <h3 className="text-2xl font-black font-montserrat mb-3 leading-tight text-neutral-900 group-hover:text-blue-600 transition-colors line-clamp-2">
          {story.title}
        </h3>
        
        <p className="text-neutral-600 leading-relaxed mb-6 line-clamp-3 text-sm font-medium">
          {story.excerpt}
        </p>

        {/* Bottom Action Area */}
        <div className="mt-auto pt-4 border-t-2 border-neutral-100 flex items-center justify-between group/btn">
           <span className="font-bold text-sm text-black group-hover/btn:underline decoration-2 underline-offset-4 decoration-red-500">
             Read Full Article
           </span>
           <div className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center bg-white group-hover:bg-black group-hover:text-white transition-colors">
             <span className="text-lg leading-none mb-0.5">→</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
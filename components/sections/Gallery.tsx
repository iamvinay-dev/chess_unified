'use client';

import * as React from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const defaultImages = [
  'https://res.cloudinary.com/dmgkhmynj/image/upload/v1776938968/chess-unified/h6rwogwycmmueamvtdbc.jpg',
  'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1586165368502-1bad197a6461?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1528819622765-d6bcf132f793?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544320296-6b8c9751767f?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1560174038-da43ac74f01b?q=80&w=800&auto=format&fit=crop',
];

export function Gallery({ images = [] }: { images?: string[] }) {
  const displayImages = images.length > 0 ? images : defaultImages;
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = React.useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      let scrollTo;
      
      if (direction === 'right') {
        scrollTo = scrollLeft + 400;
        if (scrollLeft + clientWidth >= scrollWidth - 10) scrollTo = 0; // Loop back
      } else {
        scrollTo = scrollLeft - 400;
        if (scrollLeft <= 0) scrollTo = scrollWidth; // Go to end
      }
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  // Auto-scroll logic
  React.useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
        const nextScroll = scrollLeft + 1; // Very slow incremental movement
        
        if (scrollLeft + clientWidth >= scrollWidth - 1) {
          scrollRef.current.scrollLeft = 0;
        } else {
          scrollRef.current.scrollLeft = nextScroll;
        }
      }
    }, 30); // Smooth slow movement

    return () => clearInterval(interval);
  }, [isPaused]);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setIsPaused(true);
        scroll('left');
      }
      if (e.key === 'ArrowRight') {
        setIsPaused(true);
        scroll('right');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section 
      id="gallery" 
      className="pb-32 bg-gray-50/50 border-b border-gray-100 scroll-mt-24 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-6 relative">
        <div className="flex items-center justify-between mb-8">
           <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Academy Glimpses</div>
           <div className="flex gap-4">
              <button 
                suppressHydrationWarning
                onClick={() => scroll('left')}
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:border-primary"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                suppressHydrationWarning
                onClick={() => scroll('right')}
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:border-primary"
              >
                <ChevronRight size={20} />
              </button>
           </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto no-scrollbar pb-8 cursor-grab active:cursor-grabbing"
          style={{ scrollBehavior: isPaused ? 'smooth' : 'auto' }}
        >
          {/* Rendering extra images for seamless loop appearance in manual scroll if needed */}
          {[...displayImages, ...displayImages].map((src, idx) => (
            <div
              key={idx}
              className="relative w-[300px] md:w-[450px] aspect-[16/11] rounded-[2.5rem] overflow-hidden bg-white border-4 border-white shadow-xl transition-all duration-500 shrink-0 group"
            >
              <Image
                src={src}
                alt={`Gallery image ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 300px, 450px"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="absolute bottom-8 right-8 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-primary shadow-lg translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <ArrowRight size={18} />
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-center gap-6 mt-8">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Hover to Browse</span>
            <div className="w-12 h-px bg-gray-200" />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Arrow Keys Supported</span>
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

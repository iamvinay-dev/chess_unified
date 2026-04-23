'use client';

import * as React from 'react';
import Image from 'next/image';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';
import { SpecialCamp } from '@/lib/types';

export function SpecialCamps({ camps = [] }: { camps?: SpecialCamp[] }) {
  if (!camps || camps.length === 0) return null;

  return (
    <section id="camps" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-6">
              <Sparkles size={14} />
              Featured Events
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-[0.85]">
              Special <span className="text-primary italic">Camps</span>
            </h2>
            <p className="text-lg text-gray-400 font-medium leading-relaxed">
              Intensive training sessions designed to fast-track your progress. Join our seasonal camps for immersive chess study and competition.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {camps.map((camp, idx) => (
            <div
              key={idx}
              className="bg-gray-50/50 rounded-[3rem] overflow-hidden border border-gray-100 hover:bg-white hover:shadow-2xl transition-all duration-500 group"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={camp.bannerUrl || 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=800&auto=format&fit=crop'}
                  alt={camp.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md text-black px-4 py-2 rounded-2xl flex items-center gap-2 shadow-lg">
                  <Calendar size={14} className="text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest">{camp.date}</span>
                </div>
              </div>

              <div className="p-10">
                <h3 className="text-3xl font-black mb-4 tracking-tight">{camp.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed mb-10 line-clamp-3">
                  {camp.description}
                </p>
                <div className="flex items-center justify-between">
                   <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-black">
                      {idx + 1}
                   </div>
                   <a 
                    href={`https://wa.me/919885006568?text=${encodeURIComponent(`Hi, I'm interested in the ${camp.title} special camp. Can I get more details?`)}`}
                    target="_blank"
                    className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px] hover:text-black transition-colors group"
                   >
                     Enquiry <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                   </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import * as React from 'react';
import Image from 'next/image';
import { Trophy, Calendar, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';
import { Tournament } from '@/lib/types';
import { cn } from '@/lib/utils';

export function Tournaments({ tournaments = [] }: { tournaments?: Tournament[] }) {
  if (!tournaments || tournaments.length === 0) return null;

  return (
    <section id="tournaments" className="py-16 md:py-32 bg-white overflow-hidden scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-6">
            <Trophy size={14} />
            Championships
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase leading-[0.85]">
            Unified <span className="text-primary italic">Circuit</span>
          </h2>
          <p className="text-lg text-gray-400 font-medium leading-relaxed max-w-2xl">
            Register for our upcoming tournaments and test your skills against the best players in the region. Track your progress on the leaderboards.
          </p>
        </div>

        <div className="space-y-6">
          {tournaments.map((tournament, idx) => (
            <div
              key={tournament.id || idx}
              className="bg-gray-50/50 hover:bg-white border border-gray-100 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-10 transition-all duration-500 group hover:shadow-2xl flex flex-col lg:flex-row gap-8 md:gap-12 items-center"
            >
              <div className="w-full lg:w-80 h-52 relative rounded-[2rem] overflow-hidden shrink-0 border border-gray-100">
                <Image
                  src={tournament.bannerUrl || 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=800&auto=format&fit=crop'}
                  alt={tournament.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={cn(
                  "absolute top-4 right-4 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg",
                  tournament.status === 'open' ? "bg-green-500 text-white" : "bg-red-500 text-white"
                )}>
                  {tournament.status}
                </div>
              </div>

              <div className="flex-1 w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-black mb-3 tracking-tight group-hover:text-primary transition-colors">
                      {tournament.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-6">
                      <div className="flex items-center gap-2 text-gray-400 font-bold text-sm">
                        <Calendar size={16} className="text-primary" />
                        {tournament.date}
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 font-bold text-sm">
                        <MapPin size={16} className="text-primary" />
                        {tournament.venue}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Entry Fee</div>
                    <div className="text-3xl font-black text-black">{tournament.fee}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-8 border-t border-gray-100">
                  <div className="flex items-center gap-8">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Age Group</div>
                      <div className="font-black text-primary">{tournament.ageGroups}</div>
                    </div>
                    <div className="w-px h-10 bg-gray-100" />
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <ShieldCheck size={16} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">FA Rated</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <a 
                      href={tournament.registrationLink || `https://wa.me/919885006568?text=${encodeURIComponent(`Hi, I'd like to register for the ${tournament.title} tournament. Please share the registration details.`)}`}
                      target="_blank"
                      className="w-full md:w-auto bg-black text-white hover:bg-primary px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl hover:-translate-y-1"
                    >
                      Register Now
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

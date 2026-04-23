'use client';

import * as React from 'react';
import { Heart } from 'lucide-react';
import { SiteContent } from '@/lib/types';

interface SocialMediaProps {
  data?: SiteContent['socialMediaSection'];
}

export function SocialMedia({ data }: SocialMediaProps) {
  if (!data) return null;

  return (
    <section id="social" className="py-24 bg-white border-t border-gray-100 scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-2 text-pink-500 font-bold tracking-widest uppercase text-xs mb-4 bg-pink-50 px-6 py-2 rounded-full border border-pink-100">
            <Heart size={14} className="fill-current" /> We Are On Social Media
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.85]">
            Connect With <span className="text-primary italic">Us</span>
          </h2>
          <p className="mt-6 text-gray-500 font-medium text-lg">
            Stay updated with our latest chess matches, behind-the-scenes academy moments, and general updates across our platforms.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 mb-24">
          {data.instagram && (
            <a href={data.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 px-12 py-6 rounded-3xl bg-pink-50 hover:bg-pink-100 text-pink-600 transition-all font-black group text-2xl shadow-xl shadow-pink-500/10 hover:-translate-y-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              Instagram
            </a>
          )}
          {data.facebook && (
            <a href={data.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 px-12 py-6 rounded-3xl bg-blue-50 hover:bg-blue-100 text-blue-600 transition-all font-black group text-2xl shadow-xl shadow-blue-500/10 hover:-translate-y-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
              Facebook
            </a>
          )}
          {data.youtube && (
            <a href={data.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 px-12 py-6 rounded-3xl bg-red-50 hover:bg-red-100 text-red-600 transition-all font-black group text-2xl shadow-xl shadow-red-500/10 hover:-translate-y-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
              YouTube
            </a>
          )}
        </div>

        {data.images && data.images.length > 0 && (
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.images.map((img, idx) => (
              <div key={idx} className="relative aspect-square rounded-[3rem] overflow-hidden group border-8 border-gray-50 shadow-2xl">
                <img src={img} alt="Social Media Feed" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white drop-shadow-2xl">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

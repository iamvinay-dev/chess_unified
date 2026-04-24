'use client';

import * as React from 'react';
import Image from 'next/image';
import { ArrowRight, Trophy } from 'lucide-react';

export function Hero({
  title,
  description,
  ctaPrimary,
  ctaSecondary,
}: {
  title?: string;
  description?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
}) {
  return (
    <section className="relative min-h-[0] md:min-h-[85vh] flex items-center pt-32 pb-16 md:pt-24 md:pb-8 overflow-hidden bg-white">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
          <div className="flex-1 text-left">
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[7.5rem] font-black mb-6 tracking-tighter leading-[0.85] text-black uppercase">
              {title || (
                <>
                  Build <span className="text-primary">Minds</span>
                  <br />
                  Through <span className="text-gray-900/10">Chess</span>
                </>
              )}
            </h1>

            <p className="text-lg md:text-xl text-gray-500 mb-12 max-w-xl leading-relaxed font-medium">
              {description ||
                "Master the game of kings with elite strategy and focus. Join Anantapur's premier academy for the next generation of champions."}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href="#contact"
                className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-2xl shadow-primary/30 hover:-translate-y-1 transition-all duration-300 group"
              >
                {ctaPrimary || 'Get Started'}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="w-full sm:w-auto bg-gray-50 hover:bg-gray-100 px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all duration-300 text-black border border-gray-100"
              >
                {ctaSecondary || 'Enroll Now'}
              </a>
            </div>
          </div>

          <div className="flex-1 relative w-full h-[250px] lg:h-[600px] mt-8 lg:mt-0">
            {/* Elegant Image Container */}
            <div className="relative w-full h-full rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] bg-gray-100 border-[12px] border-white group">
              <Image
                src="/assets/hero-chess.png"
                alt="Chess Master"
                fill
                priority
                className="object-cover group-hover:scale-110 transition-transform duration-[2000ms] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Achievement Badge */}
            <div className="absolute -top-10 -left-10 bg-black text-white p-6 rounded-3xl shadow-2xl animate-bounce-slow z-20 hidden md:block">
              <div className="flex items-center gap-3">
                <Trophy size={20} className="text-yellow-500" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  FIDE Certified Academy
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

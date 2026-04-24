'use client';

import * as React from 'react';
import { Target, Lightbulb, Users, Trophy } from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'Personalized Training',
    description: 'Tailored for every level — from first moves to complex endgame strategies.',
  },
  {
    icon: Trophy,
    title: 'Expert Guidance',
    description: 'Prepare students for local, regional, and national tournaments with expert mentorship.',
  },
  {
    icon: Users,
    title: 'Structured Sessions',
    description: 'Consistent learning with interactive games, puzzles, and structured chess exercises.',
  },
  {
    icon: Lightbulb,
    title: 'Flexible Learning',
    description: 'Join in-person at our Anantapur center or from anywhere with online sessions.',
  },
];

interface AboutProps {
  highlights?: string[];
}

export function About({ highlights = [] }: AboutProps) {
  return (
    <section id="about" className="py-16 lg:py-32 bg-white border-y border-gray-50 scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div>
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase leading-[0.85]">
              Academy <span className="text-primary italic">Life</span>
            </h2>
            <div className="space-y-6">
              <p className="text-xl text-gray-500 font-medium leading-relaxed">
                &quot;Chess is the gymnasium of the mind.&quot; Chess Unified offers structured coaching from beginner to advanced levels, focusing on strategy, concentration, and critical thinking.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed font-medium">
                We provide personalized training, practice sessions, and tournament guidance to help players succeed at district, state, and national levels.
              </p>
              <blockquote className="border-l-4 border-primary pl-4 py-2 mt-4 text-primary font-black italic tracking-widest uppercase text-sm">
                 &quot;Think Smart. Play Sharp. Grow Unified.&quot;
              </blockquote>
            </div>

            {/* Dynamic Highlights from Admin */}
            <div className="mt-12 space-y-4">
              {highlights.map((text, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-all">
                    <Target size={16} />
                  </div>
                  <span className="text-lg font-bold text-gray-600 tracking-tight">{text}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-2 gap-10">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                   <Target size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-black tracking-tight">Goal Oriented</h4>
                  <p className="text-sm text-gray-400 font-medium italic">Focused progress tracking</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                   <Trophy size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-black tracking-tight">Tournament Prep</h4>
                  <p className="text-sm text-gray-400 font-medium italic">Practical game analysis</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-12 lg:pb-0">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-gray-50/50 p-8 rounded-[2.5rem] border border-gray-100 hover:bg-white hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center text-primary mb-8 shadow-sm group-hover:scale-110 transition-transform">
                  <feature.icon size={26} />
                </div>
                <h3 className="text-xl font-black mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-gray-400 text-sm font-medium leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

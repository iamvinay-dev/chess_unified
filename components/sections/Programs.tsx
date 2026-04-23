'use client';

import * as React from 'react';
import { CheckCircle2, Star, Clock, Users, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const programs = [
  {
    title: 'Beginner',
    level: 'Foundations',
    description: 'Perfect for children starting their chess journey. We cover rules, piece movements, and basic checkmates.',
    features: ['Piece Values & Moves', 'Basic Opening Principles', 'Fundamental Endgames'],
    icon: Star,
    color: 'blue'
  },
  {
    title: 'Intermediate',
    level: 'Tactician',
    description: 'For students who know the basics and want to learn advanced tactics, strategies, and middle-game planning.',
    features: ['Tactical Patterns', 'Middle-game Strategy', 'Pawn Structures'],
    icon: Clock,
    color: 'primary',
    popular: true
  },
  {
    title: 'Advanced',
    level: 'Champion',
    description: 'Elite coaching for tournament players. Focused on opening repertoires, deep analysis, and mental stamina.',
    features: ['Opening Repertoires', 'Engine Analysis', 'Tournament Prep'],
    icon: Users,
    color: 'black'
  }
];

export function Programs() {
  return (
    <section id="programs" className="py-20 md:py-32 bg-gray-50/50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-[0.85]">
            Master <span className="text-primary italic">Every</span> Level
          </h2>
          <p className="text-base md:text-lg text-gray-500 font-medium leading-relaxed">
            From first moves to grandmaster strategies, our tiered programs are designed to scale with your child's ambition.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program, idx) => (
            <div 
              key={idx} 
              className={cn(
                "relative p-10 rounded-[3rem] bg-white border transition-all duration-500 group hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] hover:-translate-y-2 overflow-hidden",
                program.popular ? "border-primary/20 ring-1 ring-primary/10" : "border-gray-100"
              )}
            >
              {program.popular && (
                <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2 rounded-bl-3xl">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8 p-4 bg-gray-50 rounded-2xl w-fit group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <program.icon size={28} />
              </div>

              <div className="mb-6">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2">Level: {program.level}</div>
                <h3 className="text-3xl font-black tracking-tight">{program.title}</h3>
              </div>
              
              <p className="text-gray-500 mb-8 leading-relaxed font-medium text-sm">
                {program.description}
              </p>

              <div className="space-y-4 mb-10">
                {program.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-bold text-gray-400">
                    <CheckCircle2 size={16} className="text-primary" />
                    {feature}
                  </div>
                ))}
              </div>

              <button 
                className="w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs border border-gray-100 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300"
                suppressHydrationWarning
              >
                Enroll Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

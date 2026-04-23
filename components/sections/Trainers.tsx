'use client';

import * as React from 'react';
import Image from 'next/image';
import { BadgeCheck, ExternalLink, GraduationCap, Medal } from 'lucide-react';

const trainers = [
  {
    name: 'Experienced FIDE Trainer',
    role: 'Head Coach',
    bio: 'Certified FIDE trainer with over 10 years of experience in coaching national level players.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop',
    tags: ['FIDE Certified', '10+ Years Exp'],
    award: 'National Master'
  },
  {
    name: 'National Expert',
    role: 'Senior Instructor',
    bio: 'Specialist in opening theory and endgame tactics with a focus on young learners.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop',
    tags: ['Tournament Pro', 'Kids Specialist'],
    award: 'State Champion'
  },
];

export function Trainers() {
  return (
    <section id="trainers" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-[0.85]">
              Meet The <span className="text-primary italic">Masters</span>
            </h2>
            <p className="text-lg text-gray-500 font-medium leading-relaxed">
              Our trainers are certified professionals with national and international experience — bringing world-class chess coaching to Anantapur.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {trainers.map((trainer, idx) => (
            <div
              key={idx}
              className="group bg-gray-50/50 p-10 rounded-[3rem] border border-gray-100 flex flex-col md:flex-row gap-10 items-center md:items-start hover:bg-white hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] transition-all duration-500"
            >
              <div className="relative shrink-0">
                <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 shadow-xl border-4 border-white">
                  <Image
                    src={trainer.image}
                    alt={trainer.name}
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 bg-primary text-white p-2 rounded-2xl shadow-lg shadow-primary/20">
                  <BadgeCheck size={20} />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                  {trainer.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-black uppercase tracking-widest bg-white text-primary border border-primary/10 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-3xl font-black mb-2 tracking-tight">{trainer.name}</h3>
                <div className="flex items-center justify-center md:justify-start gap-2 text-primary font-black text-xs uppercase tracking-tighter mb-6">
                  <Medal size={14} />
                  {trainer.award}
                </div>
                <p className="text-gray-500 font-medium text-sm leading-relaxed mb-8">
                  {trainer.bio}
                </p>
                <div className="h-px bg-gray-100 w-full mb-6" />
                <div className="text-black font-black text-[10px] uppercase tracking-widest opacity-30">
                   {trainer.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

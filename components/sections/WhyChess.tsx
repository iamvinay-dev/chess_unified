'use client';

import * as React from 'react';
import { Award, Library, Eye, CircleCheck } from 'lucide-react';

const benefits = [
  {
    icon: Award,
    title: 'Analytical Thinking',
    description: 'Improves analytical skills and problem-solving abilities that last a lifetime.',
    color: 'bg-blue-500',
  },
  {
    icon: Library,
    title: 'Boosts Memory',
    description: 'Boosts memory, recall, and pattern recognition through regular practice and study.',
    color: 'bg-purple-500',
  },
  {
    icon: Eye,
    title: 'Better Focus',
    description: 'Enhances the ability to concentrate and maintain attention over extended periods.',
    color: 'bg-orange-500',
  },
  {
    icon: CircleCheck,
    title: 'Life Strategy',
    description: 'Builds strong strategic thinking and planning applicable in all areas of life.',
    color: 'bg-green-500',
  },
];

export function WhyChess() {
  return (
    <section id="why" className="py-24 md:py-40 bg-white scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-24">
          <h2 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter uppercase leading-[0.85]">
            More Than <span className="text-primary italic">a Game</span>
          </h2>
          <p className="text-2xl md:text-3xl text-gray-400 font-medium leading-relaxed max-w-2xl">
            Chess isn&apos;t just a game — it&apos;s a developmental powerhouse. We cultivate intellectual strength that transcends the 64 squares.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="bg-gray-50/50 p-12 rounded-[3.5rem] border border-gray-100 hover:bg-white hover:shadow-2xl transition-all duration-500 group"
            >
              <div
                className={`${benefit.color} w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white mb-10 shadow-xl group-hover:scale-110 transition-transform`}
              >
                <benefit.icon size={32} />
              </div>
              <h3 className="text-3xl font-black mb-6 tracking-tight">{benefit.title}</h3>
              <p className="text-base md:text-lg text-gray-500 font-medium leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Course Structure Section */}
        <div className="mt-24 md:mt-32 max-w-4xl mx-auto bg-blue-600 rounded-[3rem] md:rounded-[4rem] p-10 md:p-16 border border-blue-400 shadow-2xl shadow-blue-500/20 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 flex flex-col md:flex-row gap-12 justify-between">
            <div className="md:w-1/2">
              <h3 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter leading-tight">
                Academy Course <span className="italic block mt-1 opacity-90">Structure</span>
              </h3>
              <p className="text-blue-100 font-medium leading-relaxed md:text-lg mb-8">
                A highly structured progression map designed to take students from absolute beginners to advanced tournament strategists.
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="font-black uppercase tracking-widest text-xs opacity-70 mb-2">Duration</div>
                <div className="text-2xl font-black text-white">6 Months per Level</div>
              </div>
            </div>

            <div className="md:w-1/2 border-l-2 border-white/20 pl-8 md:pl-12 py-4">
              <div className="font-black uppercase tracking-widest text-xs opacity-70 mb-6">Learning Path</div>
              <ul className="space-y-6 font-bold text-lg">
                <li className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-black text-sm shadow-md shrink-0">1</span> 
                  Level 1: Beginner
                </li>
                <li className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-black text-sm shadow-md shrink-0">2</span> 
                  Level 2: Intermediate
                </li>
                <li className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-black text-sm shadow-md shrink-0">3</span> 
                  Level 3: Advanced
                </li>
              </ul>
              
              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-sm font-medium text-blue-100 leading-relaxed italic">
                  * Enrollment cycles and promotions are based strictly on practical game assessment and student performance.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-40 bg-primary rounded-[3rem] md:rounded-[5rem] p-8 md:p-28 relative overflow-hidden text-white shadow-3xl">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 md:gap-32 items-center">
            <div>
              <div className="text-6xl md:text-9xl font-black mb-4 md:mb-8 opacity-20 leading-none">“</div>
              <h3 className="text-3xl md:text-6xl font-black mb-8 md:mb-12 italic leading-[1.1] tracking-tighter">
                &quot;Chess is the gymnasium of the mind.&quot;
              </h3>
              <p className="text-lg md:text-2xl text-white/80 font-medium leading-relaxed mb-10 md:mb-12">
                Scientific research confirms that children immersed in chess demonstrate remarkable growth in cognitive flexibility and academic performance.
              </p>
              <div className="flex items-center gap-4 md:gap-6">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center font-black text-white text-xl md:text-3xl border border-white/20 shadow-inner shrink-0">
                  BP
                </div>
                <div>
                  <div className="font-black text-lg md:text-2xl">Blaise Pascal</div>
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
                    Philosopher & Scientist
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-8">
              {[
                { value: '17%', label: 'Memory Growth' },
                { value: '92%', label: 'Focus' },
                { value: '2.5x', label: 'Math Aptitude' },
                { value: '100%', label: 'Dedication' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-md p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-white/10 hover:bg-white/20 transition-all shadow-lg"
                >
                  <div className="text-2xl md:text-5xl font-black text-white mb-2 tracking-tighter">
                    {stat.value}
                  </div>
                  <p className="text-[9px] md:text-xs font-black text-white/60 uppercase tracking-[0.1em] md:tracking-[0.2em] leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

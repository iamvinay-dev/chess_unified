'use client';

import * as React from 'react';
import { Mail, MessageCircle, ArrowRight, Building2, Phone, Star } from 'lucide-react';

export function Franchise() {
  const [step, setStep] = React.useState<'initial' | 'prompt' | 'whatsapp'>('initial');

  const whatsappLink = `https://wa.me/919885006568?text=${encodeURIComponent("I want to talk about the franchise opportunity")}`;

  return (
    <section id="franchise" className="py-20 md:py-32 bg-gray-50/50 scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="bg-primary rounded-[3rem] md:rounded-[5rem] overflow-hidden relative shadow-2xl shadow-primary/30 text-white p-10 md:p-24">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-5" />
          <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px]" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 px-6 py-3 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8">
                <Building2 size={16} />
                Global Opportunity
              </div>
              <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase leading-[0.85]">
                Grow With <span className="italic opacity-50 underline decoration-white/20">Us</span>
              </h2>
              
              <div className="min-h-[140px] flex flex-col justify-center mb-12">
                {step === 'initial' && (
                  <p className="text-xl md:text-2xl text-white/70 font-medium leading-relaxed max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                    Interested in starting a Chess Unified franchise? Empower your community with the game of kings and join our mission.
                  </p>
                )}
                
                {step !== 'initial' && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center gap-3 mb-4 text-white">
                      <Star className="text-yellow-400 fill-current" size={20} />
                      <span className="font-black uppercase tracking-widest text-sm">Expert Consultation</span>
                    </div>
                    <p className="text-xl md:text-3xl font-bold leading-tight text-white mb-2">
                       Talk with our expertise about franchise
                    </p>
                    <p className="text-white/50 font-medium">Our senior team is ready to guide you through the process.</p>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {step === 'initial' ? (
                  <button 
                    suppressHydrationWarning
                    onClick={() => setStep('prompt')}
                    className="bg-white text-primary px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:-translate-y-1 transition-all shadow-xl shadow-black/10 group"
                  >
                    Franchise Inquiry
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <a 
                    href={whatsappLink}
                    target="_blank"
                    className="bg-green-500 text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-4 hover:-translate-y-1 transition-all shadow-xl shadow-green-900/20 animate-in zoom-in duration-500"
                  >
                    <MessageCircle size={24} />
                    Chat with Experts
                  </a>
                )}
                
                <a 
                  href="mailto:chessunified1@gmail.com"
                  className="bg-primary-dark/30 border border-white/10 text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-primary-dark transition-all"
                >
                  <Mail size={20} />
                  Email Us
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
               {[
                 { title: 'Proven System', desc: 'Step-by-step coaching methodology and business operations.' },
                 { title: 'Brand Equity', desc: "Leverage Anantapur's most recognized chess academy name." },
                 { title: 'Full Support', desc: 'Comprehensive training for your coaches and management team.' }
               ].map((item, i) => (
                 <div key={i} className="bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all group">
                   <div className="flex items-start gap-6">
                     <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center font-black group-hover:bg-white group-hover:text-primary transition-all">
                       0{i+1}
                     </div>
                     <div>
                       <h4 className="text-2xl font-black mb-2 tracking-tight">{item.title}</h4>
                       <p className="text-white/50 font-medium leading-relaxed">{item.desc}</p>
                     </div>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

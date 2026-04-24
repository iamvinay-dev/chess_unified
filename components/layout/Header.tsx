'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Courses', href: '#why' },
  { name: 'Marchandise', href: '#shop' },
  { name: 'Tournaments', href: '#tournaments' },
  { name: 'Camps', href: '#camps' },
  { name: 'About', href: '#about' },
  { name: 'Franchise', href: '#franchise' },
];

export function Header({ logoUrl }: { logoUrl?: string }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled || isOpen ? 'bg-white py-3 shadow-sm' : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group relative z-50">
          {logoUrl ? (
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 bg-white p-0.5 group-hover:scale-110 transition-transform shadow-md">
              <img src={logoUrl} alt="Logo" className="w-full h-full object-contain rounded-full" />
            </div>
          ) : (
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-black text-xl shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform">
              CU
            </div>
          )}
          <div className="flex flex-col leading-none">
            <span className="text-xl font-black tracking-tighter uppercase">
              Chess <span className="text-primary italic">Unified</span>
            </span>
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-gray-400 mt-0.5">
              Anantapur
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-primary text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-black hover:shadow-2xl hover:shadow-black/20 transition-all duration-300"
          >
            Enroll Now
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden relative z-50">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-3 bg-gray-50 rounded-2xl text-black hover:bg-primary hover:text-white transition-all shadow-sm"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-white z-40 md:hidden transition-all duration-500 flex flex-col items-center pt-32 pb-10 px-6 overflow-y-auto',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-20" />
        
        <nav className="relative z-10 flex flex-col items-center gap-8 w-full">
          {navLinks.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-2xl font-black uppercase tracking-tighter hover:text-primary transition-all duration-300",
                isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              )}
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              {link.name}
            </a>
          ))}
          <div className="w-full h-px bg-gray-100 my-4" />
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className={cn(
              "w-full bg-primary text-white py-6 rounded-[2rem] text-center text-xl font-black uppercase tracking-widest shadow-2xl shadow-primary/30",
              isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}
            style={{ transitionDelay: `500ms` }}
          >
            Enroll Now
          </a>
        </nav>
      </div>
    </header>
  );
}

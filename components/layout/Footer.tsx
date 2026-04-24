'use client';

import * as React from 'react';
import Link from 'next/link';

const footerLinks = [
  { name: 'Academy Life', href: '#about' },
  { name: 'More Than a Game', href: '#why' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Contact', href: '#contact' },
  { name: 'Admin Portal', href: '/admin' },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '#' },
  { name: 'Terms & Conditions', href: '#' },
];

export function Footer({ logoUrl }: { logoUrl?: string }) {
  return (
    <footer className="bg-white border-t border-gray-100 py-32 md:py-48">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-20 mb-24">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-6 mb-10 group">
              {logoUrl ? (
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20 bg-white p-1 group-hover:scale-110 transition-transform shadow-md">
                  <img src={logoUrl} alt="Logo" className="w-full h-full object-contain rounded-full" />
                </div>
              ) : (
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform">
                  CU
                </div>
              )}
              <div className="flex flex-col leading-none">
                <span className="text-3xl font-black tracking-tighter uppercase">
                  Chess <span className="text-primary italic">Unified</span>
                </span>
                <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mt-1">
                  Anantapur
                </span>
              </div>
            </Link>
            <p className="text-lg md:text-xl text-gray-400 max-w-sm leading-relaxed font-medium">
              Empowering young minds through the strategic game of chess. Anantapur&apos;s premier destination for future champions and creative thinkers.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-10">
              Navigation
            </h4>
            <ul className="space-y-6">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-primary transition-colors font-black uppercase tracking-[0.15em] text-xs"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-10">
              Legal & Safe
            </h4>
            <ul className="space-y-6">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-primary transition-colors font-black uppercase tracking-[0.15em] text-xs"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-16 flex flex-col md:flex-row justify-between items-center gap-10">
          <p className="text-gray-400 text-xs font-black uppercase tracking-widest">
            © {new Date().getFullYear()} Chess Unified Academy.
          </p>
          
          <div className="flex items-center gap-8">
            <a href="https://instagram.com/chessunified" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 text-xs font-black uppercase tracking-widest">
               Instagram
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 text-xs font-black uppercase tracking-widest">
               Facebook
            </a>
          </div>

          <div className="flex gap-12 text-xs font-black text-gray-300 uppercase tracking-widest">
            <span>Built in Anantapur</span>
            <span className="hidden md:inline">•</span>
            <span>Est. 2025</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

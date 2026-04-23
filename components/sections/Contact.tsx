'use client';

import * as React from 'react';
import { Mail, Phone, MapPin, Camera, Globe, Video, MessageCircle } from 'lucide-react';
import { FormEvent } from 'react';
import { WhatsAppEnrollForm } from '@/components/forms/WhatsAppEnrollForm';
import { SiteContent } from '@/lib/types';

export function Contact({ info }: { info?: SiteContent['contact'] }) {
  const phone = info?.phone || '+91 98850 06568';
  const email = info?.email || 'chessunified1@gmail.com';
  const address = info?.address || 'Door No.1/696 Rudrampeta Bypass, Anantapur, AP 515004';
  const waNumber = info?.whatsapp || '919885006568';

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      lines: address.split(', '),
      link: `https://maps.google.com/?q=${encodeURIComponent(address)}`,
      action: 'Open in Maps',
    },
    {
      icon: Phone,
      title: 'Call / WhatsApp',
      lines: [phone, 'Available 9AM - 8PM'],
      link: `https://wa.me/${waNumber}`,
      action: 'Message Us',
    },
    {
      icon: Mail,
      title: 'Email Us',
      lines: [email, 'Response within 24h'],
      link: `mailto:${email}`,
      action: 'Send Email',
    },
  ];

  const socials = [
    { icon: Camera, href: info?.instagram || '#', color: 'hover:text-pink-500' },
    { icon: Globe, href: info?.facebook || '#', color: 'hover:text-blue-600' },
    { icon: Video, href: info?.youtube || '#', color: 'hover:text-red-600' },
    { icon: MessageCircle, href: info?.twitter || '#', color: 'hover:text-blue-400' },
  ];

  return (
    <section id="contact" className="py-20 md:py-32 bg-white overflow-hidden relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase leading-[0.85]">
              Start Your <span className="text-primary italic">Journey</span>
            </h2>
            <p className="text-xl text-gray-500 mb-16 max-w-lg leading-relaxed font-medium">
              Reach out to enroll, ask questions, or schedule a free trial. We're always happy to help shape the next generation of players.
            </p>

            <div className="space-y-12">
              {contactInfo.map((info, idx) => (
                <div key={idx} className="flex gap-8 group">
                  <div className="bg-primary/5 w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shrink-0 border border-primary/10">
                    <info.icon size={28} />
                  </div>
                  <div>
                    <h4 className="font-black text-2xl mb-2 tracking-tight">{info.title}</h4>
                    {info.lines.map((line, lIdx) => (
                      <p key={lIdx} className="text-gray-400 font-medium text-sm">
                        {line}
                      </p>
                    ))}
                    <a
                      href={info.link}
                      className="inline-block mt-4 text-primary font-black text-xs uppercase tracking-widest hover:text-black transition-colors"
                    >
                      {info.action} →
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-20">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-8">
                Follow Our Community
              </h4>
              <div className="flex gap-4">
                {socials.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    className={`bg-gray-50 w-14 h-14 rounded-2xl flex items-center justify-center text-gray-500 border border-gray-100 transition-all hover:bg-white hover:shadow-xl hover:scale-110 ${social.color}`}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {info?.locationImages && info.locationImages.length > 0 && (
              <div className="mt-16 pt-16 border-t border-gray-100">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-8">
                  Our Academy Locations
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {info.locationImages.map((img, idx) => (
                    <div key={idx} className="relative aspect-video rounded-3xl overflow-hidden border border-gray-100 shadow-sm group">
                      <img src={img} alt="Academy Location" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative">
             <div className="absolute inset-0 bg-primary/5 rounded-[4rem] blur-3xl -z-10" />
             <WhatsAppEnrollForm />
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import * as React from 'react';
import Image from 'next/image';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { Merchandise as MerchandiseType } from '@/lib/types';

interface MerchandiseProps {
  items: MerchandiseType[];
}

export function Merchandise({ items }: MerchandiseProps) {
  if (!items || items.length === 0) return null;

  return (
    <section id="shop" className="py-24 md:py-40 bg-gray-50 scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 md:mb-32">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter uppercase leading-[0.85]">
              Chess <span className="text-primary italic">Store</span>
            </h2>
            <p className="text-2xl text-gray-400 font-medium leading-relaxed">
              Premium chess equipment and study materials to elevate your game.
            </p>
          </div>
          <div className="flex items-center gap-4 text-primary font-black uppercase tracking-widest text-xs bg-primary/5 px-8 py-4 rounded-2xl border border-primary/10">
            <ShoppingBag size={20} />
            Available Now
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-[3rem] p-8 border border-gray-100 hover:shadow-2xl transition-all duration-500 group flex flex-col h-full">
              <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-8">
                <Image
                  src={item.imageUrl || 'https://images.unsplash.com/photo-1523475496153-3d6cc0f0bf19?q=80&w=800&auto=format&fit=crop'}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl font-black text-primary shadow-xl">
                  ₹{item.price}
                </div>
              </div>
              <h3 className="text-3xl font-black mb-4 tracking-tight">{item.name}</h3>
              <p className="text-gray-400 font-medium leading-relaxed mb-10 flex-grow">
                {item.description}
              </p>
              <button 
                suppressHydrationWarning
                onClick={() => {
                  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919885006568';
                  window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi, I want to buy ${item.name}`)}`, '_blank');
                }}
                className="w-full bg-primary text-white py-6 rounded-[1.8rem] font-bold text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all"
              >
                Inquire to Buy
                <ChevronRight size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

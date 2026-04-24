'use client';

import * as React from 'react';
import {
  FileEdit,
  ImageIcon,
  ShoppingBag,
  Star,
  Trophy,
  Layout,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function AdminDashboard() {
  const operations = [
    {
      title: 'Edit Hero & About',
      description: 'Update the main website text, banners, and features.',
      icon: Layout,
      link: '/admin/edit',
      color: 'text-blue-500',
      bg: 'bg-blue-50',
    },
    {
      title: 'Merchandise Store',
      description: 'Manage chess sets, books, and store items.',
      icon: ShoppingBag,
      link: '/admin/edit', // Will scroll/focus manually or just direct to edit page
      color: 'text-purple-500',
      bg: 'bg-purple-50',
    },
    {
      title: 'Special Camps',
      description: 'Add or remove upcoming special training camps.',
      icon: Star,
      link: '/admin/edit',
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
    },
    {
      title: 'Tournaments',
      description: 'Create and manage upcoming chess tournaments.',
      icon: Trophy,
      link: '/admin/tournaments',
      color: 'text-green-500',
      bg: 'bg-green-50',
    },
    {
      title: 'Photo Library',
      description: 'Upload and organize the academy media gallery.',
      icon: ImageIcon,
      link: '/admin/media',
      color: 'text-orange-500',
      bg: 'bg-orange-50',
    },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-500">Quickly navigate to manage all aspects of your academy&apos;s website.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {operations.map((op, idx) => (
          <Link 
            key={idx} 
            href={op.link} 
            className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-xl hover:border-primary/20 transition-all duration-500 flex flex-col items-start gap-6 block"
          >
            <div className={cn('p-4 rounded-3xl group-hover:scale-110 transition-transform shadow-sm border border-black/5', op.bg, op.color)}>
              <op.icon size={28} />
            </div>
            
            <div>
              <h3 className="text-xl font-black mb-2 tracking-tight">{op.title}</h3>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">{op.description}</p>
            </div>
            
            <div className={cn("absolute -bottom-6 -right-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity", op.color)}>
              <op.icon size={120} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
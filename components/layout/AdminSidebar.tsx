'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FileEdit,
  Trophy,
  Image as ImageIcon,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Edit Site', href: '/admin/edit', icon: FileEdit },
  { name: 'Tournaments', href: '/admin/tournaments', icon: Trophy },
  { name: 'Media Library', href: '/admin/media', icon: ImageIcon },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = React.useState(false);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <aside
      className={cn(
        'h-screen bg-white border-r transition-all duration-300 flex flex-col sticky top-0',
        collapsed ? 'w-20' : 'w-72'
      )}
    >
      <div className="p-6 flex items-center justify-between border-b h-20">
        {!collapsed && (
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
              CU
            </div>
            <span className="font-bold tracking-tight">Admin Portal</span>
          </Link>
        )}
        {collapsed && (
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold mx-auto">
            CU
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 hover:bg-gray-100 rounded-lg absolute -right-3 top-7 bg-white border shadow-sm"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      <nav className="flex-grow p-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-medium',
                active
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-black'
              )}
            >
              <item.icon size={20} className={cn(active ? 'text-white' : 'text-gray-400')} />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t space-y-2">
        <Link
          href="/"
          className={cn(
            'flex items-center gap-4 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 transition-all font-medium'
          )}
        >
          <Monitor size={20} className="text-gray-400" />
          {!collapsed && <span>View Website</span>}
        </Link>
        <button
          onClick={handleLogout}
          className={cn(
            'w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-medium'
          )}
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

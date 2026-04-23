import * as React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AdminSidebar } from '@/components/layout/AdminSidebar'; export default async function ProtectedAdminLayout({ children,
}: { children: React.ReactNode;
}) { 
  const cookieStore = await cookies(); 
  const session = cookieStore.get('admin_session'); 
  
  if (!session) { 
    redirect('/admin/login'); 
  } 
  
  return ( 
    <div className="flex h-screen bg-gray-50 overflow-hidden w-full relative"> 
      <AdminSidebar /> 
      <main className="flex-grow p-8 overflow-y-auto w-full h-full relative z-0 relative"> 
        <div className="max-w-7xl mx-auto pb-24"> 
          {children} 
        </div> 
      </main> 
    </div> 
  );
}

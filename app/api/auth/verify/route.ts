import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { readJSON } from '@/lib/data-manager';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    
    // Check auth.json first
    const authData = await readJSON('auth.json', { password: process.env.NEXT_ADMIN_PASSWORD || 'admin123' });
    const adminPassword = authData.password;

    if (password === adminPassword) {
      const cookieStore = await cookies();
      cookieStore.set('admin_session', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false, message: 'Invalid password' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

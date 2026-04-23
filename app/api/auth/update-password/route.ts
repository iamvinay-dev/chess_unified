import { NextResponse } from 'next/server';
import { readJSON, writeJSON } from '@/lib/data-manager';

export async function POST(request: Request) {
  try {
    const { currentPassword, newPassword } = await request.json();
    
    // Load existing password
    const authData = await readJSON('auth.json', { password: process.env.NEXT_ADMIN_PASSWORD || 'admin123' });
    
    if (currentPassword !== authData.password) {
      return NextResponse.json({ success: false, message: 'Current password is incorrect' }, { status: 401 });
    }

    // Update with new password
    await writeJSON('auth.json', { password: newPassword });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

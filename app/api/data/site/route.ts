import { NextResponse } from 'next/server';
import { readJSON, writeJSON } from '@/lib/data-manager';
import { SiteContent } from '@/lib/types';

const FILENAME = 'siteContent.json';

export async function GET() {
  const data = await readJSON<Partial<SiteContent>>(FILENAME, {});
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  try {
    const newData = await request.json();
    await writeJSON(FILENAME, newData);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to update' }, { status: 500 });
  }
}


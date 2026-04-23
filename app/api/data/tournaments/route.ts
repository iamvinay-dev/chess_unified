import { NextResponse } from 'next/server';
import { readJSON, writeJSON } from '@/lib/data-manager';
import { Tournament } from '@/lib/types';

const FILENAME = 'tournaments.json';

export async function GET() {
  const data = await readJSON<Tournament[]>(FILENAME, []);
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const tournament = await request.json();
    const data = await readJSON<Tournament[]>(FILENAME, []);
    const newTournament = { ...tournament, id: Date.now().toString() };
    data.push(newTournament as Tournament);
    await writeJSON(FILENAME, data);
    return NextResponse.json(newTournament);
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const tournament = await request.json();
    const data = await readJSON<Tournament[]>(FILENAME, []);
    const index = data.findIndex(t => t.id === tournament.id);
    if (index !== -1) {
      data[index] = tournament;
      await writeJSON(FILENAME, data);
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const data = await readJSON<Tournament[]>(FILENAME, []);
    const filteredData = data.filter(t => t.id !== id);
    await writeJSON(FILENAME, filteredData);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}


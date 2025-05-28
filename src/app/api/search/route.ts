import { fetchFromFinnhub } from '@/lib/finnhub';
import { NextResponse }  from 'next/server';


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const symbol = searchParams.get('symbol');

  if (!query) {
    return NextResponse.json({ error: 'Missing search query' }, { status: 400 });
  }

  try {
    const data = await fetchFromFinnhub('search', { q: query });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch from Finnhub' }, { status: 500 });
  }
}
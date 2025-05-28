import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  const holdings = await prisma.holding.findMany({
    where: { userId: params.userId },
  });
  return Response.json(holdings);
}

export async function POST(req: NextRequest, { params }: { params: { userId: string } }) {
  const data = await req.json();

  const promises = data.map((item: any) =>
    prisma.holding.upsert({
      where: {
        id: item.id || '',
      },
      update: {
        quantity: item.quantity,
        avgPrice: item.avgPrice,
      },
      create: {
        symbol: item.symbol,
        quantity: item.quantity,
        avgPrice: item.avgPrice,
        userId: params.userId,
      },
    })
  );

  await Promise.all(promises);
  return Response.json({ status: 'ok' });
}

import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  const transactions = await prisma.transaction.findMany({
    where: { userId: params.userId },
    orderBy: { timestamp: 'desc' },
  });
  return Response.json(transactions);
}

export async function POST(req: NextRequest, { params }: { params: { userId: string } }) {
  const data = await req.json();

  await prisma.transaction.createMany({
    data: data.map((tx: any) => ({
      ...tx,
      timestamp: new Date(tx.timestamp),
      userId: params.userId,
    })),
  });

  return Response.json({ status: 'ok' });
}

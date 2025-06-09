import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  context: { params: { userId: string } }
) {
  const userId = context.params.userId;

  const holdings = await prisma.holding.findMany({
    where: { userId },
  });

  return Response.json(holdings);
}



export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const data = await req.json();

    if (!Array.isArray(data)) {
      return new Response(JSON.stringify({ error: 'Invalid payload format' }), {
        status: 400,
      });
    }

    const promises = data.map((item: any) =>
      prisma.holding.upsert({
        where: {
          id: item.id || '', // Make sure your DB schema handles empty string fallback
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

    return new Response(JSON.stringify({ status: 'ok' }), { status: 200 });
  } catch (error) {
    console.error('Error updating holdings:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}

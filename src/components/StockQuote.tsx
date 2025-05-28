'use client';

import { useEffect, useState } from 'react';

export default function StockQuote({ symbol }: { symbol: string }) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchQuote = async () => {
      const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`);
      const quote = await res.json();
      setData(quote);
    };
    fetchQuote();
  }, [symbol]);

  if (!data) return <p className="text-center mt-4">Loading quote...</p>;

  return (
    <div className="text-center mt-4 bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-bold">{symbol}</h2>
      <p>Current Price: ${data.c}</p>
      <p>Change: {data.d} ({data.dp}%)</p>
    </div>
  );
}

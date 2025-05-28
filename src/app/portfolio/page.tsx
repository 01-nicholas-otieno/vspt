'use client';

import { usePortfolio } from '@/context/PortfolioContext';
import { useEffect, useState } from 'react';

async function fetchQuote(symbol: string): Promise<number> {
  const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`);
  const data = await res.json();
  return data.c || 0;
}

export default function PortfolioPage() {
  const { holdings, cash } = usePortfolio();
  const [prices, setPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchPrices = async () => {
      const newPrices: Record<string, number> = {};
      await Promise.all(
        holdings.map(async (h) => {
          const price = await fetchQuote(h.symbol);
          newPrices[h.symbol] = price;
        })
      );
      setPrices(newPrices);
    };

    if (holdings.length > 0) fetchPrices();
  }, [holdings]);

  const totalStocksValue = holdings.reduce((total, h) => {
    const currentPrice = prices[h.symbol] || 0;
    return total + h.quantity * currentPrice;
  }, 0);

  const totalValue = totalStocksValue + cash;

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">📁 Portfolio</h1>

      <div className="max-w-3xl mx-auto bg-white rounded p-4 shadow mb-6">
        <p className="text-lg">💵 <strong>Cash:</strong> ${cash.toFixed(2)}</p>
        <p className="text-lg">📊 <strong>Total Portfolio Value:</strong> ${totalValue.toFixed(2)}</p>
      </div>

      <div className="max-w-3xl mx-auto bg-white rounded p-4 shadow">
        <h2 className="text-xl font-semibold mb-4">📈 Holdings</h2>
        {holdings.length === 0 ? (
          <p>No holdings yet.</p>
        ) : (
          <table className="w-full text-left border">
            <thead>
              <tr className="border-b">
                <th className="p-2">Symbol</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Avg Price</th>
                <th className="p-2">Current Price</th>
                <th className="p-2">Total Value</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((h) => {
                const currentPrice = prices[h.symbol] || 0;
                return (
                  <tr key={h.symbol} className="border-b">
                    <td className="p-2 font-bold">{h.symbol}</td>
                    <td className="p-2">{h.quantity}</td>
                    <td className="p-2">${h.avgPrice.toFixed(2)}</td>
                    <td className="p-2">${currentPrice.toFixed(2)}</td>
                    <td className="p-2">${(h.quantity * currentPrice).toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}

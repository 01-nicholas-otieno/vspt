'use client';

import { usePortfolio } from '@/context/PortfolioContext';
import { downloadCSV } from '@/utils/csv';
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


  const [sellSymbol, setSellSymbol] = useState('');
const [sellQty, setSellQty] = useState(0);
const { sellStock } = usePortfolio();

const handleSell = async () => {
  if (!sellSymbol || sellQty <= 0) return alert("Enter valid symbol and quantity.");
  const price = await fetchQuote(sellSymbol);
  const success = sellStock(sellSymbol, price, sellQty);
  if (!success) return alert("Invalid sell operation.");
  setSellSymbol('');
  setSellQty(0);
  alert(`Sold ${sellQty} of ${sellSymbol} @ $${price.toFixed(2)}`);
};



  const totalStocksValue = holdings.reduce((total, h) => {
    const currentPrice = prices[h.symbol] || 0;
    return total + h.quantity * currentPrice;
  }, 0);

  const totalValue = totalStocksValue + cash;
  const exportPortfolio = () => {
  const data = holdings.map(h => ({
    Symbol: h.symbol,
    Quantity: h.quantity,
    'Avg Price': h.avgPrice.toFixed(2),
    'Current Price': prices[h.symbol]?.toFixed(2) || '0.00',
    'Total Value': (h.quantity * (prices[h.symbol] || 0)).toFixed(2),
  }));
  data.unshift({ Symbol: 'Cash', Quantity: '', 'Avg Price': '', 'Current Price': '', 'Total Value': cash.toFixed(2) });
  downloadCSV(data, 'portfolio');
};


  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">📁 Portfolio</h1>

      <div className="max-w-3xl mx-auto bg-white rounded p-4 shadow mb-6">
        <p className="text-lg">💵 <strong>Cash:</strong> ${cash.toFixed(2)}</p>
        <p className="text-lg">📊 <strong>Total Portfolio Value:</strong> ${totalValue.toFixed(2)}</p>
      </div>

      <div className="max-w-3xl mx-auto bg-white rounded p-4 shadow">
        <h2 className="text-xl font-semibold mb-4">📈 Holdings</h2>
        <button onClick={exportPortfolio} className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          ⬇ Export Portfolio CSV
        </button>

        <div className="mb-4 flex flex-wrap gap-2 items-center">
  <input
    type="text"
    placeholder="Symbol (e.g. AAPL)"
    value={sellSymbol}
    onChange={(e) => setSellSymbol(e.target.value.toUpperCase())}
    className="p-2 border rounded w-32"
  />
  <input
    type="number"
    placeholder="Quantity"
    value={sellQty}
    onChange={(e) => setSellQty(Number(e.target.value))}
    className="p-2 border rounded w-28"
  />
  <button
    onClick={handleSell}
    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
  >
    🔻 Sell
  </button>
</div>

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

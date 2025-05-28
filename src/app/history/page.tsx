'use client';

import { usePortfolio } from '@/context/PortfolioContext';
import { useState } from 'react';

export default function HistoryPage() {
  const { transactions } = usePortfolio();
  const [filterSymbol, setFilterSymbol] = useState('');

  const filtered = transactions.filter((t) =>
    filterSymbol ? t.symbol.toLowerCase().includes(filterSymbol.toLowerCase()) : true
  );

  const sorted = [...filtered].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">🧾 Transaction History</h1>

      <div className="max-w-3xl mx-auto mb-4">
        <input
          type="text"
          className="w-full p-2 rounded border"
          placeholder="Filter by symbol (e.g., AAPL)"
          value={filterSymbol}
          onChange={(e) => setFilterSymbol(e.target.value)}
        />
      </div>

      <div className="max-w-3xl mx-auto bg-white rounded shadow p-4 overflow-auto">
        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          <table className="w-full table-auto text-left">
            <thead>
              <tr className="border-b">
                <th className="p-2">Type</th>
                <th className="p-2">Symbol</th>
                <th className="p-2">Price</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((t, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-2">{t.type}</td>
                  <td className="p-2">{t.symbol}</td>
                  <td className="p-2">${t.price.toFixed(2)}</td>
                  <td className="p-2">{t.quantity}</td>
                  <td className="p-2 text-sm text-gray-500">{new Date(t.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}

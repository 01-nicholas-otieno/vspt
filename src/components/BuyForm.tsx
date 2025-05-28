'use client';

import { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';

export default function BuyForm({ symbol, price }: { symbol: string; price: number }) {
  const [qty, setQty] = useState(0);
  const [message, setMessage] = useState('');
  const { buyStock, cash } = usePortfolio();

  const handleBuy = () => {
    const success = buyStock(symbol, price, qty);
    if (success) {
      setMessage(`✅ Bought ${qty} shares of ${symbol}`);
      setQty(0);
    } else {
      setMessage(`❌ Not enough cash or invalid quantity`);
    }
  };

  return (
    <div className="mt-4 bg-white p-4 rounded shadow max-w-md mx-auto text-center">
      <p className="mb-2">Available Cash: ${cash.toFixed(2)}</p>
      <input
        type="number"
        className="p-2 border rounded w-full mb-2"
        placeholder="Quantity"
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
      />
      <button onClick={handleBuy} className="bg-blue-600 text-white px-4 py-2 rounded">
        Buy @ ${price}
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}

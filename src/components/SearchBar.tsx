'use client';

import { useState } from 'react';

type Result = {
  symbol: string;
  description: string;
};

export default function SearchBar({ onSelect }: { onSelect: (symbol: string) => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Result[]>([]);

  const search = async () => {
    if (!query.trim()) return;
    const res = await fetch(`/api/search?q=${query}`);
    const data = await res.json();
    setResults(data.result || []);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <input
        type="text"
        className="w-full p-2 rounded border border-gray-300 mb-2"
        placeholder="Search by company or symbol..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && search()}
      />
      <ul className="bg-white rounded shadow">
        {results.map((item) => (
          <li
            key={item.symbol}
            className="p-2 cursor-pointer hover:bg-gray-100"
            onClick={() => onSelect(item.symbol)}
          >
            <strong>{item.symbol}</strong> — {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

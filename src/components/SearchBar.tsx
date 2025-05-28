'use client';
import { useState, useEffect } from 'react';

type Result = {
  symbol: string;
  description: string;
};

export default function SearchBar({ onSelect }: { onSelect: (symbol: string) => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const search = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      setResults(data.result || []);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      search(query);
    }, 300); // 300ms delay

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="w-full max-w-xl mx-auto">
      <input
        type="text"
        className="w-full p-2 rounded border border-gray-300 mb-2"
        placeholder="Search by company or symbol..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      
      {isLoading && (
        <div className="text-center text-gray-500 py-2">
          Searching...
        </div>
      )}
      
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

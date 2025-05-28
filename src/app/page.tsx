'use client';

import Image from "next/image";
import { useState } from "react";
import SearchBar from '@/components/SearchBar';
import StockQuote from '@/components/StockQuote';

export default function Home() {
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
       <main className="min-h-screen p-6 bg-gray-100">
        <h1 className="text-3xl font-bold text-center mb-6">📈 Stock Trading Simulator</h1>
        <SearchBar onSelect={setSelectedSymbol} />
        {selectedSymbol && <StockQuote symbol={selectedSymbol} />}
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        &#169; lanzone 2025
      </footer>
    </div>
  );
}

'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Holding = {
  symbol: string;
  quantity: number;
  avgPrice: number;
};

type PortfolioContextType = {
  cash: number;
  holdings: Holding[];
  buyStock: (symbol: string, price: number, quantity: number) => boolean;
};

const PortfolioContext = createContext<PortfolioContextType | null>(null);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [cash, setCash] = useState(10000); // Start with $10,000
  const [holdings, setHoldings] = useState<Holding[]>([]);

  const buyStock = (symbol: string, price: number, quantity: number): boolean => {
    const cost = price * quantity;
    if (cost > cash || quantity <= 0) return false;

    const existing = holdings.find((h) => h.symbol === symbol);

    let updatedHoldings;
    if (existing) {
      const totalQty = existing.quantity + quantity;
      const newAvgPrice = ((existing.avgPrice * existing.quantity) + (price * quantity)) / totalQty;

      updatedHoldings = holdings.map((h) =>
        h.symbol === symbol ? { ...h, quantity: totalQty, avgPrice: newAvgPrice } : h
      );
    } else {
      updatedHoldings = [...holdings, { symbol, quantity, avgPrice: price }];
    }

    setHoldings(updatedHoldings);
    setCash(cash - cost);
    return true;
  };

  return (
    <PortfolioContext.Provider value={{ cash, holdings, buyStock }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error('usePortfolio must be used within PortfolioProvider');
  return context;
}

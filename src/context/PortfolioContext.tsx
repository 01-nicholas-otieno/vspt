'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Holding = {
  symbol: string;
  quantity: number;
  avgPrice: number;
};


type Transaction = {
  type: 'BUY';
  symbol: string;
  price: number;
  quantity: number;
  timestamp: string;
};

type PortfolioContextType = {
  cash: number;
  holdings: Holding[];
  transactions: Transaction[];
  buyStock: (symbol: string, price: number, quantity: number) => boolean;
};

const PortfolioContext = createContext<PortfolioContextType | null>(null);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [cash, setCash] = useState(10000);
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

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
    setTransactions([
      ...transactions,
      {
        type: 'BUY',
        symbol,
        price,
        quantity,
        timestamp: new Date().toISOString(),
      },
    ]);

    return true;
  };

  return (
    <PortfolioContext.Provider value={{ cash, holdings, transactions, buyStock }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error('usePortfolio must be used within PortfolioProvider');
  return context;
}

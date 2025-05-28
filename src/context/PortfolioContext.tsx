'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Holding = {
  symbol: string;
  quantity: number;
  avgPrice: number;
};

type Transaction = {
  type: 'BUY' | 'SELL';
  symbol: string;
  price: number;
  quantity: number;
  timestamp: string;
};

type PortfolioContextType = {
  cash: number;
  holdings: Holding[];
  transactions: Transaction[];
  buyStock: (symbol: string, price: number, quantity: number) => Promise<boolean>;
  sellStock: (symbol: string, price: number, quantity: number) => Promise<boolean>;
};

const PortfolioContext = createContext<PortfolioContextType | null>(null);
const USER_ID = 'demo-user';

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [cash, setCash] = useState(10000);
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [hRes, tRes] = await Promise.all([
        fetch(`/api/portfolio/${USER_ID}/holdings`),
        fetch(`/api/portfolio/${USER_ID}/transactions`),
      ]);

      const holdingsFromDB = await hRes.json();
      const transactionsFromDB = await tRes.json();

      const totalCost = holdingsFromDB.reduce(
        (sum: number, h: any) => sum + h.avgPrice * h.quantity,
        0
      );
      const defaultCash = 10000;
      const remainingCash = defaultCash - totalCost;

      setHoldings(holdingsFromDB);
      setTransactions(transactionsFromDB);
      setCash(remainingCash);
    };

    fetchData();
  }, []);

  const buyStock = async (symbol: string, price: number, quantity: number): Promise<boolean> => {
    const totalCost = price * quantity;
    if (quantity <= 0 || cash < totalCost) return false;

    const newHoldings = [...holdings];
    const existing = newHoldings.find(h => h.symbol === symbol);

    if (existing) {
      const totalShares = existing.quantity + quantity;
      existing.avgPrice = (existing.avgPrice * existing.quantity + price * quantity) / totalShares;
      existing.quantity = totalShares;
    } else {
      newHoldings.push({ symbol, quantity, avgPrice: price });
    }

    const newTransaction = {
      type: 'BUY',
      symbol,
      price,
      quantity,
      timestamp: new Date().toISOString(),
      userId: USER_ID,
    };

    await fetch(`/api/portfolio/${USER_ID}/holdings`, {
      method: 'POST',
      body: JSON.stringify(newHoldings),
    });

    await fetch(`/api/portfolio/${USER_ID}/transactions`, {
      method: 'POST',
      body: JSON.stringify([newTransaction]),
    });

    setHoldings(newHoldings);
    setCash(cash - totalCost);
    setTransactions([...transactions, newTransaction]);

    return true;
  };

  const sellStock = async (symbol: string, price: number, quantity: number): Promise<boolean> => {
    const existing = holdings.find(h => h.symbol === symbol);
    if (!existing || quantity <= 0 || existing.quantity < quantity) return false;

    const totalValue = price * quantity;
    const newHoldings = holdings.map(h =>
      h.symbol === symbol
        ? { ...h, quantity: h.quantity - quantity }
        : h
    ).filter(h => h.quantity > 0);

    const newTransaction = {
      type: 'SELL',
      symbol,
      price,
      quantity,
      timestamp: new Date().toISOString(),
      userId: USER_ID,
    };

    await fetch(`/api/portfolio/${USER_ID}/holdings`, {
      method: 'POST',
      body: JSON.stringify(newHoldings),
    });

    await fetch(`/api/portfolio/${USER_ID}/transactions`, {
      method: 'POST',
      body: JSON.stringify([newTransaction]),
    });

    setHoldings(newHoldings);
    setCash(cash + totalValue);
    setTransactions([...transactions, newTransaction]);

    return true;
  };

  return (
    <PortfolioContext.Provider value={{ cash, holdings, transactions, buyStock, sellStock }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error('usePortfolio must be used within PortfolioProvider');
  return context;
}

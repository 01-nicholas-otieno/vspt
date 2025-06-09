'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, PieChart, Download, Minus, Plus, Sparkles } from 'lucide-react';

// Mock data and functions for demonstration
const mockHoldings = [
  { symbol: 'AAPL', quantity: 10, avgPrice: 150.25 },
  { symbol: 'TSLA', quantity: 5, avgPrice: 220.80 },
  { symbol: 'GOOGL', quantity: 3, avgPrice: 2650.00 },
  { symbol: 'MSFT', quantity: 8, avgPrice: 310.45 },
];

const mockPrices = {
  'AAPL': 175.50,
  'TSLA': 245.30,
  'GOOGL': 2720.15,
  'MSFT': 335.20,
};

const mockCash = 15420.75;

export default function StunningPortfolio() {
  const [holdings] = useState(mockHoldings);
  const [prices] = useState(mockPrices);
  const [cash] = useState(mockCash);
  const [sellSymbol, setSellSymbol] = useState('');
  const [sellQty, setSellQty] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredStock, setHoveredStock] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const totalStocksValue = holdings.reduce((total, h) => {
    const currentPrice = prices[h.symbol] || 0;
    return total + h.quantity * currentPrice;
  }, 0);

  const totalValue = totalStocksValue + cash;

  const handleSell = () => {
    if (!sellSymbol || sellQty <= 0) return;
    alert(`Sold ${sellQty} shares of ${sellSymbol}`);
    setSellSymbol('');
    setSellQty(0);
  };

  const exportPortfolio = () => {
    alert('Portfolio exported successfully!');
  };

  const getGainLoss = (holding) => {
    const currentPrice = prices[holding.symbol] || 0;
    const gain = (currentPrice - holding.avgPrice) * holding.quantity;
    const gainPercent = ((currentPrice - holding.avgPrice) / holding.avgPrice) * 100;
    return { gain, gainPercent, isPositive: gain >= 0 };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className={`relative z-10 p-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 tracking-tight">
            Portfolio
          </h1>
          <div className="flex items-center justify-center gap-2 text-slate-400">
            <Sparkles className="w-5 h-5" />
            <span className="text-lg">Real-time Portfolio Analytics</span>
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        {/* Portfolio Summary Cards */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cash Card */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50">
                <div className="flex items-center justify-between mb-4">
                  <DollarSign className="w-8 h-8 text-cyan-400" />
                  <div className="text-right">
                    <p className="text-slate-400 text-sm">Available Cash</p>
                    <p className="text-3xl font-bold text-white">${cash.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                  </div>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse" style={{width: '65%'}}></div>
                </div>
              </div>
            </div>

            {/* Stocks Value Card */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50">
                <div className="flex items-center justify-between mb-4">
                  <PieChart className="w-8 h-8 text-purple-400" />
                  <div className="text-right">
                    <p className="text-slate-400 text-sm">Stocks Value</p>
                    <p className="text-3xl font-bold text-white">${totalStocksValue.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                  </div>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" style={{width: '85%'}}></div>
                </div>
              </div>
            </div>

            {/* Total Value Card */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="w-8 h-8 text-pink-400" />
                  <div className="text-right">
                    <p className="text-slate-400 text-sm">Total Value</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
                      ${totalValue.toLocaleString(undefined, {minimumFractionDigits: 2})}
                    </p>
                  </div>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-pink-500 to-orange-500 rounded-full animate-pulse" style={{width: '95%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trading Panel */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Minus className="w-6 h-6 text-red-400" />
                Quick Sell
              </h2>
              <div className="flex flex-wrap gap-4 items-end">
                <div className="flex-1 min-w-48">
                  <label className="block text-slate-400 text-sm mb-2">Stock Symbol</label>
                  <input
                    type="text"
                    placeholder="e.g., AAPL"
                    value={sellSymbol}
                    onChange={(e) => setSellSymbol(e.target.value.toUpperCase())}
                    className="w-full bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-all backdrop-blur-sm"
                  />
                </div>
                <div className="flex-1 min-w-32">
                  <label className="block text-slate-400 text-sm mb-2">Quantity</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={sellQty}
                    onChange={(e) => setSellQty(Number(e.target.value))}
                    className="w-full bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-all backdrop-blur-sm"
                  />
                </div>
                <button
                  onClick={handleSell}
                  className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-red-500/25"
                >
                  Sell Stock
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Holdings Table */}
        <div className="max-w-7xl mx-auto">
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden">
              <div className="p-8 border-b border-slate-700/50">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <TrendingUp className="w-6 h-6 text-cyan-400" />
                    Holdings
                  </h2>
                  <button
                    onClick={exportPortfolio}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-xl hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-cyan-500/25"
                  >
                    <Download className="w-4 h-4" />
                    Export CSV
                  </button>
                </div>
              </div>

              {holdings.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-slate-400 text-lg">No holdings yet. Start investing to see your portfolio grow!</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700/50 bg-slate-800/50">
                        <th className="text-left p-6 text-slate-400 font-medium">Symbol</th>
                        <th className="text-left p-6 text-slate-400 font-medium">Quantity</th>
                        <th className="text-left p-6 text-slate-400 font-medium">Avg Price</th>
                        <th className="text-left p-6 text-slate-400 font-medium">Current Price</th>
                        <th className="text-left p-6 text-slate-400 font-medium">Total Value</th>
                        <th className="text-left p-6 text-slate-400 font-medium">Gain/Loss</th>
                      </tr>
                    </thead>
                    <tbody>
                      {holdings.map((holding, index) => {
                        const currentPrice = prices[holding.symbol] || 0;
                        const totalValue = holding.quantity * currentPrice;
                        const { gain, gainPercent, isPositive } = getGainLoss(holding);
                        
                        return (
                          <tr
                            key={holding.symbol}
                            className={`border-b border-slate-700/30 hover:bg-slate-800/50 transition-all duration-300 cursor-pointer ${hoveredStock === holding.symbol ? 'bg-slate-800/50 shadow-lg' : ''}`}
                            onMouseEnter={() => setHoveredStock(holding.symbol)}
                            onMouseLeave={() => setHoveredStock(null)}
                            style={{
                              animationDelay: `${index * 100}ms`
                            }}
                          >
                            <td className="p-6">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                  {holding.symbol.charAt(0)}
                                </div>
                                <span className="text-white font-bold text-lg">{holding.symbol}</span>
                              </div>
                            </td>
                            <td className="p-6 text-slate-300 font-medium">{holding.quantity}</td>
                            <td className="p-6 text-slate-300">${holding.avgPrice.toFixed(2)}</td>
                            <td className="p-6 text-white font-medium">${currentPrice.toFixed(2)}</td>
                            <td className="p-6 text-white font-bold">${totalValue.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                            <td className="p-6">
                              <div className={`flex items-center gap-2 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                                {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                                <div>
                                  <div className="font-bold">
                                    {isPositive ? '+' : ''}${gain.toFixed(2)}
                                  </div>
                                  <div className="text-sm opacity-75">
                                    {isPositive ? '+' : ''}{gainPercent.toFixed(2)}%
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

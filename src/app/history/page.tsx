'use client';

import { useState, useEffect } from 'react';
import { History, Search, Download, TrendingUp, TrendingDown, Filter, Calendar, DollarSign, Activity, Zap } from 'lucide-react';

// Mock transaction data for demonstration
const mockTransactions = [
  { type: 'BUY', symbol: 'AAPL', price: 175.50, quantity: 10, timestamp: '2024-06-08T14:30:00Z' },
  { type: 'SELL', symbol: 'TSLA', price: 245.30, quantity: 5, timestamp: '2024-06-08T11:15:00Z' },
  { type: 'BUY', symbol: 'GOOGL', price: 2720.15, quantity: 2, timestamp: '2024-06-07T16:45:00Z' },
  { type: 'BUY', symbol: 'MSFT', price: 335.20, quantity: 8, timestamp: '2024-06-07T09:20:00Z' },
  { type: 'SELL', symbol: 'AAPL', price: 168.40, quantity: 3, timestamp: '2024-06-06T13:10:00Z' },
  { type: 'BUY', symbol: 'NVDA', price: 890.75, quantity: 4, timestamp: '2024-06-06T10:30:00Z' },
  { type: 'BUY', symbol: 'AMZN', price: 142.80, quantity: 12, timestamp: '2024-06-05T15:20:00Z' },
  { type: 'SELL', symbol: 'GOOGL', price: 2650.00, quantity: 1, timestamp: '2024-06-05T12:45:00Z' },
];

export default function StunningHistory() {
  const [transactions] = useState(mockTransactions);
  const [filterSymbol, setFilterSymbol] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredTransaction, setHoveredTransaction] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const filtered = transactions.filter((t) => {
    const symbolMatch = filterSymbol ? t.symbol.toLowerCase().includes(filterSymbol.toLowerCase()) : true;
    const typeMatch = filterType === 'ALL' ? true : t.type === filterType;
    return symbolMatch && typeMatch;
  });

  const sorted = [...filtered].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const exportTransactions = () => {
    alert('Transactions exported successfully!');
  };

  const getTotalValue = (transaction) => {
    return transaction.price * transaction.quantity;
  };

  const getTransactionStats = () => {
    const totalBuys = transactions.filter(t => t.type === 'BUY').length;
    const totalSells = transactions.filter(t => t.type === 'SELL').length;
    const totalVolume = transactions.reduce((sum, t) => sum + getTotalValue(t), 0);
    return { totalBuys, totalSells, totalVolume };
  };

  const { totalBuys, totalSells, totalVolume } = getTransactionStats();

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-pulse"
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
          <h1 className="text-6xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4 tracking-tight">
            Transaction History
          </h1>
          <div className="flex items-center justify-center gap-2 text-slate-400">
            <Activity className="w-5 h-5" />
            <span className="text-lg">Complete Trading Activity</span>
            <Activity className="w-5 h-5" />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Total Transactions */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
                <div className="flex items-center justify-between">
                  <History className="w-8 h-8 text-indigo-400" />
                  <div className="text-right">
                    <p className="text-slate-400 text-sm">Total Trades</p>
                    <p className="text-2xl font-bold text-white">{transactions.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Buy Orders */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
                <div className="flex items-center justify-between">
                  <TrendingUp className="w-8 h-8 text-green-400" />
                  <div className="text-right">
                    <p className="text-slate-400 text-sm">Buy Orders</p>
                    <p className="text-2xl font-bold text-green-400">{totalBuys}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sell Orders */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
                <div className="flex items-center justify-between">
                  <TrendingDown className="w-8 h-8 text-red-400" />
                  <div className="text-right">
                    <p className="text-slate-400 text-sm">Sell Orders</p>
                    <p className="text-2xl font-bold text-red-400">{totalSells}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Volume */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
                <div className="flex items-center justify-between">
                  <DollarSign className="w-8 h-8 text-cyan-400" />
                  <div className="text-right">
                    <p className="text-slate-400 text-sm">Total Volume</p>
                    <p className="text-2xl font-bold text-cyan-400">${totalVolume.toLocaleString(undefined, {minimumFractionDigits: 0})}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-4 items-center">
                  {/* Symbol Filter */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Filter by symbol..."
                      value={filterSymbol}
                      onChange={(e) => setFilterSymbol(e.target.value)}
                      className="pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all backdrop-blur-sm min-w-48"
                    />
                  </div>

                  {/* Type Filter */}
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="pl-10 pr-8 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all backdrop-blur-sm appearance-none cursor-pointer"
                    >
                      <option value="ALL">All Types</option>
                      <option value="BUY">Buy Only</option>
                      <option value="SELL">Sell Only</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={exportTransactions}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-xl hover:from-indigo-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-indigo-500/25"
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="max-w-7xl mx-auto">
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden">
              
              {sorted.length === 0 ? (
                <div className="p-12 text-center">
                  <Zap className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 text-lg">No transactions found matching your filters.</p>
                  <p className="text-slate-500 text-sm mt-2">Try adjusting your search criteria.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700/50 bg-slate-800/50">
                        <th className="text-left p-6 text-slate-400 font-medium">Type</th>
                        <th className="text-left p-6 text-slate-400 font-medium">Symbol</th>
                        <th className="text-left p-6 text-slate-400 font-medium">Price</th>
                        <th className="text-left p-6 text-slate-400 font-medium">Quantity</th>
                        <th className="text-left p-6 text-slate-400 font-medium">Total Value</th>
                        <th className="text-left p-6 text-slate-400 font-medium">Date & Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sorted.map((transaction, index) => {
                        const { date, time } = formatDate(transaction.timestamp);
                        const totalValue = getTotalValue(transaction);
                        const isBuy = transaction.type === 'BUY';
                        
                        return (
                          <tr
                            key={index}
                            className={`border-b border-slate-700/30 hover:bg-slate-800/50 transition-all duration-300 cursor-pointer ${hoveredTransaction === index ? 'bg-slate-800/50 shadow-lg' : ''}`}
                            onMouseEnter={() => setHoveredTransaction(index)}
                            onMouseLeave={() => setHoveredTransaction(null)}
                            style={{
                              animationDelay: `${index * 50}ms`
                            }}
                          >
                            <td className="p-6">
                              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                                isBuy 
                                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
                              }`}>
                                {isBuy ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                {transaction.type}
                              </div>
                            </td>
                            <td className="p-6">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm ${
                                  isBuy ? 'bg-gradient-to-br from-green-400 to-emerald-500' : 'bg-gradient-to-br from-red-400 to-pink-500'
                                }`}>
                                  {transaction.symbol.charAt(0)}
                                </div>
                                <span className="text-white font-bold">{transaction.symbol}</span>
                              </div>
                            </td>
                            <td className="p-6 text-slate-300 font-mono">${transaction.price.toFixed(2)}</td>
                            <td className="p-6 text-slate-300 font-medium">{transaction.quantity}</td>
                            <td className="p-6 text-white font-bold">${totalValue.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                            <td className="p-6">
                              <div className="flex items-center gap-2 text-slate-400">
                                <Calendar className="w-4 h-4" />
                                <div>
                                  <div className="text-white font-medium">{date}</div>
                                  <div className="text-sm text-slate-500">{time}</div>
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

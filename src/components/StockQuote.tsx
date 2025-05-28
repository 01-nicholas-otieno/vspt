'use client';
import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Activity, DollarSign, ArrowUpRight, ArrowDownRight, Sparkles } from 'lucide-react';
import BuyForm from './BuyForm';

export default function StockQuote({ symbol }: { symbol: string }) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const fetchQuote = async () => {
      setIsLoading(true);
      try {
        // Mock data for demonstration (replace with your actual API call)
        const mockData = {
          c: 185.42, // current price
          d: 2.85,   // change
          dp: 1.56,  // change percent
          h: 187.20, // high
          l: 182.10, // low
          o: 183.50, // open
          pc: 182.57 // previous close
        };
        
        // Simulate API delay for loading animation
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setData(mockData);
        setAnimationKey(prev => prev + 1);
      } catch (error) {
        console.error('Error fetching quote:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (symbol) {
      fetchQuote();
    }
  }, [symbol]);

  const isPositive = data && data.d > 0;
  const isNegative = data && data.d < 0;

  if (isLoading) {
    return (
      <div className="mt-6 max-w-2xl mx-auto">
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-3xl p-8 shadow-2xl border border-slate-200/50 dark:border-slate-700/50">
          {/* Animated loading gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer transform -skew-x-12"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-8">
              <div className="animate-spin">
                <Sparkles className="w-8 h-8 text-blue-500" />
              </div>
              <span className="ml-3 text-lg font-medium text-slate-600 dark:text-slate-400">
                Loading {symbol} quote...
              </span>
            </div>
            
            {/* Loading skeleton */}
            <div className="space-y-6">
              <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded-2xl animate-pulse"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-20 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse"></div>
                <div className="h-20 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse"></div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="h-16 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse"></div>
                <div className="h-16 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse"></div>
                <div className="h-16 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="mt-6 max-w-2xl mx-auto" key={animationKey}>
      {/* Main card with gradient background */}
      <div className={`relative overflow-hidden rounded-3xl shadow-2xl border transition-all duration-700 ${
        isPositive 
          ? 'bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-950/50 dark:via-green-950/50 dark:to-teal-950/50 border-emerald-200/50 dark:border-emerald-800/50' 
          : isNegative 
          ? 'bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 dark:from-red-950/50 dark:via-rose-950/50 dark:to-pink-950/50 border-red-200/50 dark:border-red-800/50'
          : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950/50 dark:via-blue-950/50 dark:to-indigo-950/50 border-slate-200/50 dark:border-slate-800/50'
      }`}>
        
        {/* Animated background orbs */}
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br from-white/30 to-transparent blur-2xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-gradient-to-tr from-white/20 to-transparent blur-xl animate-float-delayed"></div>

        <div className="relative z-10 p-8">
          {/* Header with symbol and trend icon */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-2xl transition-all duration-500 ${
                isPositive ? 'bg-emerald-100 dark:bg-emerald-900/50' :
                isNegative ? 'bg-red-100 dark:bg-red-900/50' :
                'bg-slate-100 dark:bg-slate-800/50'
              }`}>
                <Activity className={`w-8 h-8 transition-colors duration-500 ${
                  isPositive ? 'text-emerald-600' :
                  isNegative ? 'text-red-600' :
                  'text-slate-600'
                }`} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white animate-slide-up">
                  {symbol}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Real-time quote
                </p>
              </div>
            </div>
            
            {/* Trend indicator */}
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-500 ${
              isPositive ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300' :
              isNegative ? 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300' :
              'bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400'
            }`}>
              {isPositive ? <TrendingUp className="w-5 h-5" /> :
               isNegative ? <TrendingDown className="w-5 h-5" /> :
               <Activity className="w-5 h-5" />}
              <span className="font-medium text-sm">
                {isPositive ? 'Bullish' : isNegative ? 'Bearish' : 'Neutral'}
              </span>
            </div>
          </div>

          {/* Current price section */}
          <div className="mb-8">
            <div className="flex items-baseline space-x-4 mb-3">
              <span className="text-5xl font-bold text-slate-900 dark:text-white animate-number-up">
                ${data.c?.toFixed(2)}
              </span>
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-xl font-semibold transition-all duration-500 ${
                isPositive ? 'bg-emerald-500 text-white' :
                isNegative ? 'bg-red-500 text-white' :
                'bg-slate-400 text-white'
              }`}>
                {isPositive ? <ArrowUpRight className="w-4 h-4" /> :
                 isNegative ? <ArrowDownRight className="w-4 h-4" /> :
                 <Activity className="w-4 h-4" />}
                <span className="animate-fade-in">
                  {data.d > 0 ? '+' : ''}{data.d?.toFixed(2)} ({data.dp > 0 ? '+' : ''}{data.dp?.toFixed(2)}%)
                </span>
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Previous close: ${data.pc?.toFixed(2)}
            </p>
          </div>

          {/* Market data grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-4 border border-white/50 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 hover:scale-105">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Open</span>
              </div>
              <p className="text-xl font-bold text-slate-900 dark:text-white">
                ${data.o?.toFixed(2)}
              </p>
            </div>

            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-4 border border-white/50 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 hover:scale-105">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">High</span>
              </div>
              <p className="text-xl font-bold text-slate-900 dark:text-white">
                ${data.h?.toFixed(2)}
              </p>
            </div>

            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-4 border border-white/50 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 hover:scale-105">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingDown className="w-5 h-5 text-red-500" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Low</span>
              </div>
              <p className="text-xl font-bold text-slate-900 dark:text-white">
                ${data.l?.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Performance indicator bar */}
          <div className="mt-6 p-4 bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm rounded-xl border border-white/50 dark:border-slate-700/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Day's Range</span>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                ${data.l?.toFixed(2)} - ${data.h?.toFixed(2)}
              </span>
            </div>
            <div className="relative h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className={`absolute left-0 top-0 h-full rounded-full transition-all duration-1000 ease-out ${
                  isPositive ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' :
                  isNegative ? 'bg-gradient-to-r from-red-400 to-red-600' :
                  'bg-gradient-to-r from-blue-400 to-blue-600'
                }`}
                style={{ 
                  width: `${((data.c - data.l) / (data.h - data.l)) * 100}%` 
                }}
              ></div>
              <div 
                className="absolute top-0 w-1 h-full bg-slate-900 dark:bg-white rounded-full"
                style={{ 
                  left: `${((data.c - data.l) / (data.h - data.l)) * 100}%` 
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <BuyForm symbol={symbol} price={data.c} />
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-8px) scale(1.03); }
        }
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes number-up {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-shimmer { animation: shimmer 2s infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite 2s; }
        .animate-slide-up { animation: slide-up 0.6s ease-out; }
        .animate-number-up { animation: number-up 0.8s ease-out; }
        .animate-fade-in { animation: fade-in 1s ease-out; }
      `}</style>
    </div>
  );
}

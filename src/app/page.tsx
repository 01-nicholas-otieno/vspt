'use client';
import { useState, useEffect } from "react";
import { TrendingUp, Search, BarChart3, DollarSign, Activity, Sparkles } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import StockQuote from "@/components/StockQuote";
import Link from "next/link";


export default function Home() {
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        <main className="flex flex-col items-center w-full max-w-6xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-6 animate-in fade-in-0 slide-in-from-top-4 duration-1000">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent leading-tight">
              Stock Trading
              <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Simulator
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Experience the future of trading with real-time data, stunning visuals, 
              and cutting-edge technology at your fingertips.
            </p>
            <p className="text-center mb-6 space-x-4">
              <Link href="/portfolio" className="text-blue-600 underline">View Portfolio</Link>
              <Link href="/history" className="text-blue-600 underline">Transaction History</Link>
            </p>
          </div>

          {/* Search Section */}
          <div className="w-full animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-200">
            <SearchBar onSelect={setSelectedSymbol} />
          </div>

          {/* Stock Quote Section */}
          {selectedSymbol && (
            <div className="w-full animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-300">
              <StockQuote symbol={selectedSymbol} />
            </div>
          )}

          {/* Feature highlights */}
          {!selectedSymbol && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-500">
              {[
                { icon: BarChart3, title: "Real-time Data", desc: "Live market updates" },
                { icon: DollarSign, title: "Smart Analytics", desc: "AI-powered insights" },
                { icon: Activity, title: "Live Trading", desc: "Instant execution" }
              ].map((feature, index) => (
                <div key={index} className="group">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                    <div className="relative bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                      <feature.icon className="w-8 h-8 text-purple-400 mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-400">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/20 rounded-full text-gray-400 hover:bg-white/10 transition-colors duration-300">
            <Sparkles className="w-4 h-4" />
            <span>© lanzone 2025</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

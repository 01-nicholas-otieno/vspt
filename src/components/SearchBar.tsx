'use client';
import { useState, useEffect, useRef } from 'react';
import { Search, TrendingUp, Building2, Sparkles, X } from 'lucide-react';

type Result = {
  symbol: string;
  description: string;
};

export default function SearchBar({ onSelect }: { onSelect: (symbol: string) => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLUListElement>(null);

  const search = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }
    setIsLoading(true);
    try {
      // Simulated search results for demo
      const mockResults = [
        { symbol: 'AAPL', description: 'Apple Inc. - Technology Hardware & Equipment' },
        { symbol: 'GOOGL', description: 'Alphabet Inc. - Internet Content & Information' },
        { symbol: 'MSFT', description: 'Microsoft Corp. - Software & Services' },
        { symbol: 'TSLA', description: 'Tesla Inc. - Electric Vehicles & Clean Energy' },
        { symbol: 'NVDA', description: 'NVIDIA Corp. - Semiconductors & AI' }
      ].filter(item => 
        item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 200));
      setResults(mockResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      search(query);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : results.length - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          onSelect(results[selectedIndex].symbol);
          setQuery('');
          setResults([]);
          setSelectedIndex(-1);
          inputRef.current?.blur();
        }
        break;
      case 'Escape':
        setQuery('');
        setResults([]);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSelect = (symbol: string) => {
    onSelect(symbol);
    setQuery('');
    setResults([]);
    setSelectedIndex(-1);
    inputRef.current?.blur();
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-emerald-600/20 rounded-2xl blur-xl opacity-60 animate-pulse"></div>
      
      {/* Main container */}
      <div className="relative backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-300 hover:shadow-3xl">
        {/* Search input container */}
        <div className={`relative transition-all duration-300 ${isFocused ? 'bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/30 dark:to-purple-950/30' : ''}`}>
          {/* Animated border */}
          <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 opacity-0 transition-opacity duration-300 ${isFocused ? 'opacity-100' : ''}`} 
               style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'xor', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', padding: '2px' }}></div>
          
          <div className="relative flex items-center p-1">
            {/* Search icon */}
            <div className="pl-4 pr-3">
              <Search className={`w-6 h-6 transition-all duration-300 ${isFocused ? 'text-blue-600 scale-110' : 'text-gray-400'}`} />
            </div>

            {/* Input field */}
            <input
              ref={inputRef}
              type="text"
              className="flex-1 py-4 pr-4 bg-transparent text-lg font-medium placeholder-gray-400 focus:outline-none text-gray-900 dark:text-white"
              placeholder="Search stocks, ETFs, or companies..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(-1);
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 150)}
              onKeyDown={handleKeyDown}
            />

            {/* Loading spinner and clear button */}
            <div className="pr-4 flex items-center space-x-2">
              {isLoading && (
                <div className="animate-spin">
                  <Sparkles className="w-5 h-5 text-blue-500" />
                </div>
              )}
              {query && !isLoading && (
                <button
                  onClick={clearSearch}
                  className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results dropdown */}
        {(results.length > 0 || (isLoading && query)) && (
          <div className="border-t border-gray-200/50 dark:border-gray-700/50">
            {isLoading && query && (
              <div className="px-6 py-8 text-center">
                <div className="inline-flex items-center space-x-3 text-gray-500">
                  <div className="animate-spin">
                    <Sparkles className="w-5 h-5 text-blue-500" />
                  </div>
                  <span className="text-sm font-medium">Searching markets...</span>
                </div>
              </div>
            )}

            {results.length > 0 && (
              <ul ref={resultsRef} className="max-h-80 overflow-y-auto">
                {results.map((item, index) => (
                  <li
                    key={item.symbol}
                    className={`group relative cursor-pointer transition-all duration-200 ${
                      selectedIndex === index
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`}
                    onClick={() => handleSelect(item.symbol)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    {/* Animated selection indicator */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 transition-all duration-200 ${
                      selectedIndex === index ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                    }`}></div>

                    <div className="flex items-center px-6 py-4 space-x-4">
                      {/* Icon */}
                      <div className={`p-2 rounded-xl transition-all duration-200 ${
                        selectedIndex === index 
                          ? 'bg-blue-100 dark:bg-blue-900/50 scale-110' 
                          : 'bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700'
                      }`}>
                        {item.description.includes('Technology') || item.description.includes('Software') ? 
                          <Building2 className={`w-5 h-5 ${selectedIndex === index ? 'text-blue-600' : 'text-gray-600 dark:text-gray-400'}`} /> :
                          <TrendingUp className={`w-5 h-5 ${selectedIndex === index ? 'text-blue-600' : 'text-gray-600 dark:text-gray-400'}`} />
                        }
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3">
                          <span className={`font-bold text-lg transition-colors duration-200 ${
                            selectedIndex === index ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
                          }`}>
                            {item.symbol}
                          </span>
                          <div className={`h-1 w-1 rounded-full transition-colors duration-200 ${
                            selectedIndex === index ? 'bg-blue-400' : 'bg-gray-300'
                          }`}></div>
                        </div>
                        <p className={`text-sm mt-1 transition-colors duration-200 ${
                          selectedIndex === index ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {item.description}
                        </p>
                      </div>

                      {/* Arrow indicator */}
                      <div className={`transition-all duration-200 ${
                        selectedIndex === index ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                      }`}>
                        <div className="w-2 h-2 border-r-2 border-b-2 border-blue-500 transform rotate-[-45deg]"></div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Keyboard shortcuts hint */}
      {isFocused && results.length > 0 && (
        <div className="mt-3 text-center">
          <div className="inline-flex items-center space-x-4 text-xs text-gray-500 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-200/50 dark:border-gray-700/50">
            <span className="flex items-center space-x-1">
              <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">↑↓</kbd>
              <span>navigate</span>
            </span>
            <span className="flex items-center space-x-1">
              <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">↵</kbd>
              <span>select</span>
            </span>
            <span className="flex items-center space-x-1">
              <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">esc</kbd>
              <span>clear</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

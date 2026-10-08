import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    products, 
    setDetailProduct, 
    formatPrice, 
    setSearchQuery: setGlobalSearch,
    setSelectedCategory 
  } = useStore();

  const [term, setTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setTerm('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const popularSearches = ['Velvet Peshwas', 'Festive Chiffon', 'Emerald Pret', '3 Piece', 'Unstitched Silk', 'Black Formals'];

  const results = term.trim() === '' ? [] : products.filter(p => {
    const q = term.toLowerCase();
    return p.name.toLowerCase().includes(q) ||
           p.category.toLowerCase().includes(q) ||
           p.fabric.toLowerCase().includes(q) ||
           p.subtitle.toLowerCase().includes(q);
  });

  const handleSelectProduct = (prod: any) => {
    setIsSearchOpen(false);
    setDetailProduct(prod);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (term.trim()) {
      setGlobalSearch(term);
      setSelectedCategory('All');
      setIsSearchOpen(false);
      const el = document.getElementById('shop-catalog');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePopularClick = (item: string) => {
    setTerm(item);
    setGlobalSearch(item);
    setSelectedCategory('All');
    setIsSearchOpen(false);
    const el = document.getElementById('shop-catalog');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-950/70 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSearchOpen(false)} 
      />

      <div className="relative max-w-3xl mx-auto mt-12 sm:mt-20 px-4">
        <div className="bg-[#FAF9F5] rounded-2xl shadow-2xl border border-[#E8E2D5] overflow-hidden">
          
          {/* Search Input Bar */}
          <form onSubmit={handleSearchSubmit} className="relative flex items-center p-4 sm:p-5 border-b border-[#E8E2D5] bg-white">
            <Search className="w-5 h-5 text-stone-400 ml-2 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search by silhouette, fabric, color, or collection..."
              className="w-full px-4 py-2 text-stone-900 bg-transparent text-sm sm:text-base placeholder-stone-400 focus:outline-none"
            />
            {term && (
              <button
                type="button"
                onClick={() => setTerm('')}
                className="p-1 text-stone-400 hover:text-stone-700 mr-2"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="p-2 text-stone-500 hover:text-stone-900 text-xs uppercase tracking-wider font-semibold"
            >
              Cancel
            </button>
          </form>

          {/* Body: Results or Suggestions */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {term.trim() === '' ? (
              <div>
                <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-stone-500 mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Trending Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handlePopularClick(item)}
                      className="px-3 py-1.5 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg text-xs text-stone-700 transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-stone-500 block mb-2">
                  Matching Pieces ({results.length})
                </span>
                {results.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => handleSelectProduct(prod)}
                    className="flex items-center gap-4 p-3 bg-white hover:bg-[#F5F2EB] rounded-xl border border-stone-200 cursor-pointer transition-colors"
                  >
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-16 object-cover rounded-md bg-stone-100 shrink-0"
                    />
                    <div className="flex-1">
                      <h4 className="font-serif-luxury text-sm font-medium text-stone-900 line-clamp-1">
                        {prod.name}
                      </h4>
                      <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                        {prod.category} · {prod.fabric}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-serif-luxury text-sm font-semibold text-stone-900 tabular-nums">
                        {formatPrice(prod.salePrice ?? prod.price)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-sm text-stone-600 mb-2">No results found for "{term}"</p>
                <p className="text-xs text-stone-400">
                  Try searching for general keywords like "Festive", "Lawn", "Velvet", or "Chiffon".
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

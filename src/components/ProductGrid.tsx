import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, ArrowUpDown, X, Sparkles } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const { 
    products, 
    categories, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery 
  } = useStore();

  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'bestseller' | 'rating'>('newest');
  const [selectedPiece, setSelectedPiece] = useState<string>('All');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [showFiltersMobile, setShowFiltersMobile] = useState<boolean>(false);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      // Search filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesFabric = product.fabric.toLowerCase().includes(query);
        const matchesSku = product.sku.toLowerCase().includes(query);
        if (!matchesName && !matchesCategory && !matchesFabric && !matchesSku) {
          return false;
        }
      }

      // Pieces filter
      if (selectedPiece !== 'All' && product.pieces !== selectedPiece) {
        return false;
      }

      // In Stock filter
      if (inStockOnly && !product.inStock) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.salePrice ?? a.price;
      const priceB = b.salePrice ?? b.price;

      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'bestseller') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      if (sortBy === 'rating') return b.rating - a.rating;
      // 'newest' default
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [products, selectedCategory, searchQuery, selectedPiece, inStockOnly, sortBy]);

  const pieceOptions = ['All', '1 Piece', '2 Piece', '3 Piece', 'Unstitched'];

  return (
    <section id="shop-catalog" className="py-12 md:py-16 bg-[#FAF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-8 h-px bg-[#C5A059]"></span>
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#8C7A58] font-semibold">
              The Sovereign Collection
            </span>
            <span className="w-8 h-px bg-[#C5A059]"></span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-stone-900 tracking-tight mb-3">
            {selectedCategory === 'All' ? 'Signature Fashion Catalog' : selectedCategory}
          </h2>
          <p className="text-stone-600 text-sm font-light leading-relaxed">
            Every garment embodies heritage Pakistani craftsmanship, bespoke silhouettes, and premium fabrics tailored with timeless elegance.
          </p>
        </div>

        {/* Category Filter Tabs (Zero-Pill, Clean Segmented Discipline) */}
        <div className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap mb-8 pb-4 border-b border-[#E8E2D5]">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium transition-all rounded cursor-pointer ${
              selectedCategory === 'All'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
            }`}
          >
            All Pieces ({products.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium transition-all rounded cursor-pointer ${
                selectedCategory === cat.name
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white p-4 rounded-xl border border-[#ECE7DD]">
          {/* Active Status & Search info */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-stone-500 font-sans-modern tabular-nums">
              Showing <strong className="text-stone-900">{filteredProducts.length}</strong> of {products.length} products
            </span>

            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#F5F2EB] text-stone-800 text-xs rounded">
                Search: "{searchQuery}"
                <button 
                  onClick={() => setSearchQuery('')}
                  className="hover:text-red-600 ml-1"
                  aria-label="Clear search"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>

          {/* Controls: Pieces, Stock, Sort */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Pieces selector */}
            <div className="flex items-center gap-1.5 text-xs text-stone-600">
              <span className="text-stone-400 hidden sm:inline">Silhouette:</span>
              <select
                value={selectedPiece}
                onChange={(e) => setSelectedPiece(e.target.value)}
                className="bg-transparent border border-stone-200 rounded px-2.5 py-1 text-xs text-stone-800 focus:outline-none focus:border-stone-900 cursor-pointer"
              >
                {pieceOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* In Stock Toggle */}
            <label className="flex items-center gap-1.5 text-xs text-stone-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded border-stone-300 text-stone-900 focus:ring-stone-900"
              />
              <span>In Stock Only</span>
            </label>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1 text-xs text-stone-600">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent border border-stone-200 rounded px-2.5 py-1 text-xs text-stone-800 focus:outline-none focus:border-stone-900 cursor-pointer"
                aria-label="Sort products"
              >
                <option value="newest">Sort: Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="bestseller">Popular / Bestseller</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-stone-300 p-8">
            <Sparkles className="w-10 h-10 text-[#C5A059] mx-auto mb-3" />
            <h3 className="font-serif-luxury text-xl font-medium text-stone-900 mb-1">
              No matching garments found
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto mb-6">
              We couldn't find any products matching your active filters. Try resetting the filters or searching for something else.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setSelectedPiece('All');
                setInStockOnly(false);
              }}
              className="px-6 py-2.5 bg-stone-900 text-white rounded text-xs uppercase tracking-wider font-semibold hover:bg-stone-800 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, ShoppingBag, Heart, Check, ArrowRight } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    setDetailProduct,
    addToCart, 
    isInWishlist, 
    toggleWishlist, 
    formatPrice 
  } = useStore();

  if (!quickViewProduct) return null;

  const [selectedSize, setSelectedSize] = useState(quickViewProduct.sizes[0]?.size || 'Standard');
  const [selectedColor, setSelectedColor] = useState(quickViewProduct.colors[0]?.name || '');
  const [quantity, setQuantity] = useState(1);

  const isFavorited = isInWishlist(quickViewProduct.id);

  const handleAdd = () => {
    addToCart(quickViewProduct, selectedSize, selectedColor, quantity);
    setQuickViewProduct(null);
  };

  const handleOpenFull = () => {
    const prod = quickViewProduct;
    setQuickViewProduct(null);
    setDetailProduct(prod);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
        onClick={() => setQuickViewProduct(null)} 
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-[#E8E2D5] z-10">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 text-stone-500 hover:text-stone-950 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-3/4 sm:aspect-auto h-72 sm:h-full bg-stone-100">
            <img
              src={quickViewProduct.images[0]}
              alt={quickViewProduct.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-1.5 text-[11px] text-stone-500 uppercase tracking-wider">
                <span>{quickViewProduct.category}</span>
                <span>·</span>
                <span>{quickViewProduct.pieces}</span>
              </div>

              <div>
                <h3 className="font-serif-luxury text-xl text-stone-900 font-medium">
                  {quickViewProduct.name}
                </h3>
                <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                  {quickViewProduct.subtitle}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="font-serif-luxury text-xl font-bold text-stone-950 tabular-nums">
                  {formatPrice(quickViewProduct.salePrice ?? quickViewProduct.price)}
                </span>
                {quickViewProduct.salePrice && (
                  <span className="text-xs text-stone-400 line-through tabular-nums">
                    {formatPrice(quickViewProduct.price)}
                  </span>
                )}
              </div>

              {/* Color */}
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-700 block mb-1.5">
                  Color: {selectedColor}
                </span>
                <div className="flex items-center gap-1.5">
                  {quickViewProduct.colors.map((c, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-6 h-6 rounded-full border transition-all ${
                        selectedColor === c.name ? 'ring-2 ring-stone-900 scale-110' : 'border-stone-300'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-700 block mb-1.5">
                  Size: {selectedSize}
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {quickViewProduct.sizes.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSize(s.size)}
                      className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                        selectedSize === s.size 
                          ? 'bg-stone-900 text-white border-stone-900' 
                          : 'border-stone-200 text-stone-700 hover:border-stone-900'
                      }`}
                    >
                      {s.size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 space-y-2.5">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAdd}
                  className="flex-1 py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                  <span>Add to Bag</span>
                </button>
                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`p-3 rounded border transition-colors ${
                    isFavorited ? 'border-rose-500 text-rose-500 bg-rose-50' : 'border-stone-300 text-stone-700'
                  }`}
                  aria-label="Wishlist toggle"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleOpenFull}
                className="w-full text-center text-xs text-[#9A7B38] hover:text-stone-900 font-semibold uppercase tracking-wider flex items-center justify-center gap-1 py-1"
              >
                <span>View Full Details & Reviews</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const { 
    isWishlistOpen, 
    setIsWishlistOpen, 
    wishlist, 
    products, 
    toggleWishlist, 
    setDetailProduct, 
    addToCart, 
    formatPrice 
  } = useStore();

  if (!isWishlistOpen) return null;

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsWishlistOpen(false)} 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F5] shadow-2xl flex flex-col justify-between border-l border-[#E5DFD1]">
          
          {/* Header */}
          <div className="p-6 border-b border-[#E8E2D5] bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-current" />
              <h2 className="font-serif-luxury text-xl font-medium text-stone-900">
                Your Saved Wishlist
              </h2>
              <span className="text-xs text-stone-500 font-sans-modern tabular-nums">
                ({wishlistProducts.length})
              </span>
            </div>
            
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 text-stone-500 hover:text-stone-900 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistProducts.length > 0 ? (
              wishlistProducts.map((prod) => (
                <div 
                  key={prod.id}
                  className="flex gap-4 p-3 bg-white rounded-xl border border-[#ECE7DD] shadow-xs"
                >
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-24 object-cover rounded-lg bg-stone-100 shrink-0 cursor-pointer"
                    onClick={() => {
                      setIsWishlistOpen(false);
                      setDetailProduct(prod);
                    }}
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 
                          onClick={() => {
                            setIsWishlistOpen(false);
                            setDetailProduct(prod);
                          }}
                          className="font-serif-luxury text-sm font-medium text-stone-900 line-clamp-1 cursor-pointer hover:text-[#9A7B38]"
                        >
                          {prod.name}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(prod.id)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <span className="text-[11px] text-stone-500 block mt-0.5">
                        {prod.category} · {prod.pieces}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="font-serif-luxury text-sm font-semibold text-stone-950 tabular-nums">
                        {formatPrice(prod.salePrice ?? prod.price)}
                      </span>

                      <button
                        onClick={() => {
                          addToCart(prod, prod.sizes[0]?.size || 'Standard', prod.colors[0]?.name || '');
                        }}
                        className="py-1 px-3 bg-stone-900 hover:bg-stone-800 text-white rounded text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                      >
                        <ShoppingBag className="w-3 h-3 text-[#D4AF37]" />
                        <span>Add to Bag</span>
                      </button>
                    </div>

                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <Heart className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <h3 className="font-serif-luxury text-lg font-medium text-stone-800 mb-1">
                  Your wishlist is empty
                </h3>
                <p className="text-xs text-stone-500 mb-6">
                  Save your favorite handcrafted items to review or purchase anytime.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="px-6 py-2.5 bg-stone-900 text-white rounded text-xs uppercase tracking-wider font-semibold hover:bg-stone-800"
                >
                  Explore Catalog
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 bg-white border-t border-[#E8E2D5]">
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="w-full py-3 bg-stone-900 text-white rounded text-xs uppercase tracking-wider font-semibold hover:bg-stone-800 transition-colors"
            >
              Continue Browsing
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

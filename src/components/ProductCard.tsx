import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    isInWishlist, 
    toggleWishlist, 
    setQuickViewProduct, 
    setDetailProduct,
    addToCart,
    formatPrice 
  } = useStore();

  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]?.size || 'Standard');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const discountPercent = product.salePrice 
    ? Math.round(((product.price - product.salePrice) / product.price) * 100) 
    : 0;

  const currentDisplayImage = hovered && product.images[1] ? product.images[1] : product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedSize, selectedColor, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div 
      className="group relative flex flex-col bg-white rounded-xl overflow-hidden border border-[#ECE7DD] hover:border-[#D5CBBA] hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={() => setDetailProduct(product)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Visual Area */}
      <div className="relative aspect-3/4 w-full bg-[#F5F2EB] overflow-hidden">
        {/* Product Image with smooth transition */}
        <img
          src={currentDisplayImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-700 ease-out"
        />

        {/* Editorial Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNew && (
            <span className="bg-[#1E1B18]/90 backdrop-blur-xs text-[#FAF9F5] text-[10px] tracking-wider uppercase font-semibold px-2 py-0.5 rounded">
              New Arrival
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-[#B84242] text-white text-[10px] tracking-wider uppercase font-semibold px-2 py-0.5 rounded shadow-xs">
              -{discountPercent}%
            </span>
          )}
          {product.isBestSeller && !product.isNew && (
            <span className="bg-[#C5A059] text-stone-950 text-[10px] tracking-wider uppercase font-bold px-2 py-0.5 rounded shadow-xs">
              Bestseller
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isFavorited 
              ? 'bg-[#B84242] text-white shadow-md' 
              : 'bg-white/85 backdrop-blur-xs text-stone-700 hover:text-[#B84242] hover:bg-white shadow-xs'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Hover Bar */}
        <div className="absolute inset-x-3 bottom-3 z-10 flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 py-2 px-3 bg-white/95 backdrop-blur-xs hover:bg-stone-900 hover:text-white text-stone-900 rounded text-[11px] uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
          
          <button
            onClick={handleQuickAdd}
            className={`px-3 py-2 rounded text-[11px] font-semibold transition-colors flex items-center justify-center shadow-sm ${
              addedAnimation 
                ? 'bg-emerald-700 text-white' 
                : 'bg-stone-900 text-white hover:bg-[#C5A059] hover:text-stone-950'
            }`}
            title="Quick Add to Bag"
          >
            {addedAnimation ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Metadata: Category & Pieces */}
          <div className="flex items-center gap-1.5 text-[11px] text-stone-700 uppercase tracking-wider mb-1 font-medium">
            <span>{product.pieces}</span>
            <span aria-hidden="true">·</span>
            <span>{product.fabric.split('&')[0]}</span>
          </div>

          {/* Product Title */}
          <h3 className="font-serif-luxury text-base font-medium text-stone-900 group-hover:text-[#9A7B38] transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>

          {/* Subtitle */}
          <p className="text-xs text-stone-600 line-clamp-1 mb-2 font-light">
            {product.subtitle}
          </p>
        </div>

        {/* Price & Color Swatches */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-serif-luxury text-base sm:text-lg font-semibold text-stone-950 tabular-nums">
              {formatPrice(product.salePrice ?? product.price)}
            </span>
            {product.salePrice && (
              <span className="text-xs text-stone-600 line-through tabular-nums">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Color Indicators */}
          <div className="flex items-center gap-1">
            {product.colors.slice(0, 3).map((col, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(col.name);
                }}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColor === col.name ? 'scale-110 ring-1 ring-stone-900' : 'border-stone-300'
                }`}
                style={{ backgroundColor: col.hex }}
                title={col.name}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-[10px] text-stone-600 font-sans-modern">
                +{product.colors.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Sizes Preview */}
        <div className="flex items-center gap-1.5 mt-2.5 pt-2 border-t border-stone-100">
          <span className="text-[10px] uppercase tracking-wider text-stone-600 font-medium mr-1">
            Size:
          </span>
          <div className="flex items-center gap-1 flex-wrap">
            {product.sizes.map((s, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(s.size);
                }}
                className={`text-[10px] px-1.5 py-0.5 rounded transition-colors ${
                  selectedSize === s.size 
                    ? 'bg-stone-900 text-white' 
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {s.size}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

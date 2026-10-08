import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Ruler, 
  Check, 
  Star, 
  Truck, 
  RotateCcw, 
  Sparkles, 
  PhoneCall, 
  Share2,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { 
    detailProduct, 
    setDetailProduct, 
    addToCart, 
    isInWishlist, 
    toggleWishlist, 
    formatPrice,
    setIsSizeGuideOpen,
    reviews,
    submitReview,
    settings,
    setIsCheckoutOpen
  } = useStore();

  if (!detailProduct) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(detailProduct.sizes[0]?.size || 'Standard');
  const [selectedColor, setSelectedColor] = useState(detailProduct.colors[0]?.name || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');
  
  // Review form states
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');

  const isFavorited = isInWishlist(detailProduct.id);
  const productReviews = reviews.filter(r => r.productId === detailProduct.id && r.status === 'Approved');

  const handleAddToCart = () => {
    addToCart(detailProduct, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(detailProduct, selectedSize, selectedColor, quantity);
    setDetailProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;
    submitReview(detailProduct.id, detailProduct.name, newReviewAuthor, newReviewRating, newReviewComment);
    setNewReviewAuthor('');
    setNewReviewComment('');
  };

  const currentSizeObj = detailProduct.sizes.find(s => s.size === selectedSize);
  const isOutOfStock = currentSizeObj && currentSizeObj.stock <= 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-950/70 backdrop-blur-xs transition-opacity"
        onClick={() => setDetailProduct(null)} 
      />

      {/* Modal Dialog */}
      <div className="relative min-h-screen flex items-center justify-center p-2 sm:p-4 md:p-6">
        <div className="relative bg-[#FAF9F5] rounded-2xl shadow-2xl max-w-5xl w-full overflow-hidden border border-[#E8E2D5]">
          
          {/* Close button */}
          <button
            onClick={() => setDetailProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 text-stone-700 hover:text-stone-950 bg-white/80 hover:bg-white rounded-full shadow-xs transition-all focus:outline-none"
            aria-label="Close product view"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto">
            
            {/* Gallery Column (Left 6 cols) */}
            <div className="md:col-span-6 p-4 sm:p-6 bg-[#F6F3EB] flex flex-col justify-between">
              <div>
                {/* Main Image */}
                <div className="relative aspect-3/4 rounded-xl overflow-hidden bg-white shadow-xs mb-4">
                  <img
                    src={detailProduct.images[activeImageIndex] || detailProduct.images[0]}
                    alt={detailProduct.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                  {detailProduct.salePrice && (
                    <span className="absolute top-3 left-3 bg-[#B84242] text-white text-[11px] font-bold px-2.5 py-0.5 rounded shadow-xs tracking-wider uppercase">
                      Sale
                    </span>
                  )}
                </div>

                {/* Thumbnails */}
                {detailProduct.images.length > 1 && (
                  <div className="flex items-center gap-3 overflow-x-auto pb-2">
                    {detailProduct.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-16 h-20 rounded-md overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                          activeImageIndex === idx ? 'border-stone-900 shadow-xs' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="Thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Video Preview Note if provided */}
              {detailProduct.videoUrl && (
                <div className="mt-4 p-3 bg-white/70 rounded-lg border border-stone-200 text-xs text-stone-600 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C5A059]" />
                    <span>Runway Fashion Reel available for this piece</span>
                  </span>
                  <a 
                    href={detailProduct.videoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#9A7B38] font-semibold hover:underline text-[11px] uppercase tracking-wider"
                  >
                    Watch Video
                  </a>
                </div>
              )}
            </div>

            {/* Product Purchase Module (Right 6 cols) */}
            <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between bg-white">
              <div className="space-y-5">
                
                {/* Category & SKU */}
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <div className="flex items-center gap-1.5 uppercase tracking-wider font-medium">
                    <span>{detailProduct.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{detailProduct.pieces}</span>
                  </div>
                  <span className="font-mono text-[11px]">SKU: {detailProduct.sku}</span>
                </div>

                {/* Title */}
                <div>
                  <h2 className="font-serif-luxury text-2xl sm:text-3xl text-stone-900 font-medium leading-tight">
                    {detailProduct.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 font-light mt-1">
                    {detailProduct.subtitle}
                  </p>
                </div>

                {/* Rating & Review counter */}
                <div className="flex items-center gap-2 text-xs text-stone-600">
                  <div className="flex items-center text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-semibold text-stone-900">{detailProduct.rating}</span>
                  <span>({productReviews.length} Customer Reviews)</span>
                </div>

                {/* Pricing Block */}
                <div className="flex items-baseline gap-3 py-3 border-y border-stone-100">
                  <span className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-stone-950 tabular-nums">
                    {formatPrice(detailProduct.salePrice ?? detailProduct.price)}
                  </span>
                  {detailProduct.salePrice && (
                    <span className="text-base text-stone-500 line-through tabular-nums">
                      {formatPrice(detailProduct.price)}
                    </span>
                  )}
                  <span className="ml-auto text-xs font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    Tax Included
                  </span>
                </div>

                {/* Color Selection */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-wider font-semibold text-stone-800">
                      Color: <span className="font-normal text-stone-600">{selectedColor}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {detailProduct.colors.map((c, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
                          selectedColor === c.name ? 'ring-2 ring-stone-900 ring-offset-2 scale-110' : 'border-stone-300'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {selectedColor === c.name && (
                          <Check className={`w-3.5 h-3.5 ${c.hex === '#FAF5EB' ? 'text-black' : 'text-white'}`} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-wider font-semibold text-stone-800">
                      Select Size: <span className="font-normal text-stone-600">{selectedSize}</span>
                    </span>
                    <button
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="text-xs text-[#9A7B38] hover:underline flex items-center gap-1 font-medium cursor-pointer"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>Size Guide</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {detailProduct.sizes.map((s, idx) => {
                      const isSelected = selectedSize === s.size;
                      const hasStock = s.stock > 0;

                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedSize(s.size)}
                          disabled={!hasStock}
                          className={`min-w-10 px-3 py-2 text-xs font-semibold rounded border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-stone-900 text-white border-stone-900'
                              : hasStock
                              ? 'bg-white text-stone-800 border-stone-300 hover:border-stone-900'
                              : 'bg-stone-100 text-stone-400 border-stone-200 line-through cursor-not-allowed'
                          }`}
                        >
                          {s.size}
                        </button>
                      );
                    })}
                  </div>
                  {currentSizeObj && currentSizeObj.stock <= 3 && currentSizeObj.stock > 0 && (
                    <p className="text-[11px] text-amber-700 mt-1.5 font-medium">
                      Hurry, only {currentSizeObj.stock} left in size {selectedSize}!
                    </p>
                  )}
                </div>

                {/* Quantity & Actions */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-stone-300 rounded overflow-hidden">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-2 text-stone-600 hover:bg-stone-100 transition-colors"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 text-xs font-semibold tabular-nums text-stone-900">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-2 text-stone-600 hover:bg-stone-100 transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      disabled={isOutOfStock}
                      className="flex-1 py-3 px-6 bg-stone-900 text-white hover:bg-stone-800 disabled:bg-stone-300 rounded font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                      <span>{isOutOfStock ? 'Sold Out' : 'Add to Bag'}</span>
                    </button>

                    <button
                      onClick={() => toggleWishlist(detailProduct.id)}
                      className={`p-3 rounded border transition-colors ${
                        isFavorited 
                          ? 'border-[#B84242] text-[#B84242] bg-rose-50' 
                          : 'border-stone-300 text-stone-700 hover:border-stone-900'
                      }`}
                      aria-label="Wishlist toggle"
                    >
                      <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Buy Now & WhatsApp Concierge Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handleBuyNow}
                      className="w-full py-2.5 px-4 bg-[#D4AF37] hover:bg-[#B88A3B] text-stone-950 font-semibold text-xs uppercase tracking-wider rounded transition-colors text-center cursor-pointer"
                    >
                      Buy Now
                    </button>

                    <a
                      href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Wajeeha%2C%20I%20would%20like%20to%20order%20${encodeURIComponent(detailProduct.name)}%20(${selectedSize}%20/%20${selectedColor})`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1.5"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>WhatsApp Order</span>
                    </a>
                  </div>
                </div>

                {/* Delivery Notes */}
                <div className="p-3 bg-[#FAF9F5] rounded-lg border border-[#ECE7DD] space-y-1.5 text-[11px] text-stone-600">
                  <div className="flex items-center gap-2 text-stone-800 font-medium">
                    <Truck className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Free delivery on orders above Rs. {settings.freeShippingThreshold.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-3.5 h-3.5 text-stone-400" />
                    <span>7-day easy size exchange policy across Pakistan</span>
                  </div>
                </div>

              </div>

              {/* Informational Tabs (Description / Specs / Reviews) */}
              <div className="mt-8 pt-6 border-t border-stone-100">
                <div className="flex items-center gap-4 border-b border-stone-200 mb-4">
                  {(['description', 'specifications', 'reviews'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-2 text-xs uppercase tracking-wider font-semibold transition-colors border-b-2 -mb-px cursor-pointer ${
                        activeTab === tab
                          ? 'border-stone-900 text-stone-900'
                          : 'border-transparent text-stone-500 hover:text-stone-800'
                      }`}
                    >
                      {tab} {tab === 'reviews' && `(${productReviews.length})`}
                    </button>
                  ))}
                </div>

                {activeTab === 'description' && (
                  <div className="text-xs text-stone-600 leading-relaxed space-y-2 font-light">
                    <p>{detailProduct.description}</p>
                    <div className="pt-2">
                      <strong className="text-stone-900 font-medium">Care Instructions:</strong> {detailProduct.care}
                    </div>
                  </div>
                )}

                {activeTab === 'specifications' && (
                  <div className="text-xs space-y-2 font-light">
                    <div className="flex justify-between py-1 border-b border-stone-100">
                      <span className="text-stone-500">Fabric Composition</span>
                      <span className="text-stone-900 font-medium">{detailProduct.specifications.fabricDetails}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-stone-100">
                      <span className="text-stone-500">Shirt / Kurti Length</span>
                      <span className="text-stone-900 font-medium">{detailProduct.specifications.shirtLength}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-stone-100">
                      <span className="text-stone-500">Dupatta</span>
                      <span className="text-stone-900 font-medium">{detailProduct.specifications.dupatta}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-stone-100">
                      <span className="text-stone-500">Trouser / Bottom</span>
                      <span className="text-stone-900 font-medium">{detailProduct.specifications.trouser}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-stone-100">
                      <span className="text-stone-500">Embroidery Techniques</span>
                      <span className="text-stone-900 font-medium">{detailProduct.specifications.embroidery}</span>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    {/* Existing reviews */}
                    <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                      {productReviews.length > 0 ? (
                        productReviews.map(r => (
                          <div key={r.id} className="p-3 bg-stone-50 rounded border border-stone-100 text-xs">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold text-stone-900">{r.customerName}</span>
                              <span className="text-[11px] text-stone-400">{r.date}</span>
                            </div>
                            <div className="flex items-center text-[#D4AF37] mb-1">
                              {[...Array(r.rating)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-current" />
                              ))}
                            </div>
                            <p className="text-stone-600 font-light">{r.comment}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-stone-500 italic">No reviews yet. Be the first to review this piece!</p>
                      )}
                    </div>

                    {/* Submit Review */}
                    <form onSubmit={handleReviewSubmit} className="pt-3 border-t border-stone-100 space-y-2">
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-800 block">
                        Write a Review
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={newReviewAuthor}
                          onChange={(e) => setNewReviewAuthor(e.target.value)}
                          className="px-2.5 py-1.5 text-xs border border-stone-200 rounded text-stone-800"
                          required
                        />
                        <select
                          value={newReviewRating}
                          onChange={(e) => setNewReviewRating(Number(e.target.value))}
                          className="px-2.5 py-1.5 text-xs border border-stone-200 rounded text-stone-800"
                        >
                          <option value={5}>5 Stars - Exceptional</option>
                          <option value={4}>4 Stars - Very Good</option>
                          <option value={3}>3 Stars - Average</option>
                        </select>
                      </div>
                      <textarea
                        placeholder="Share your thoughts about the fit, fabric, and embroidery..."
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs border border-stone-200 rounded text-stone-800 resize-none h-16"
                        required
                      />
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-stone-900 text-white rounded text-xs font-semibold uppercase tracking-wider hover:bg-stone-800"
                      >
                        Submit Review
                      </button>
                    </form>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, ShoppingBag, Trash2, ArrowRight, Tag, Check, Sparkles } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    cartSubtotal, 
    cartShipping, 
    cartDiscount, 
    cartTotal, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon, 
    formatPrice, 
    settings,
    setIsCheckoutOpen 
  } = useStore();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const freeShippingThreshold = settings.freeShippingThreshold;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const amountNeeded = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput);
      setCouponInput('');
    }
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)} 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F5] shadow-2xl flex flex-col justify-between border-l border-[#E5DFD1]">
          
          {/* Header */}
          <div className="p-6 border-b border-[#E8E2D5] bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#C5A059]" />
                <h2 className="font-serif-luxury text-xl font-medium text-stone-900">
                  Your Shopping Bag
                </h2>
                <span className="text-xs text-stone-500 font-sans-modern tabular-nums">
                  ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
                </span>
              </div>
              
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 text-stone-500 hover:text-stone-900 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress bar */}
            <div className="mt-4 pt-3 border-t border-stone-100">
              <div className="flex items-center justify-between text-xs mb-1.5">
                {amountNeeded > 0 ? (
                  <span className="text-stone-600">
                    Add <strong className="text-stone-900">{formatPrice(amountNeeded)}</strong> for Free Express Shipping
                  </span>
                ) : (
                  <span className="text-emerald-700 font-medium flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Unlocked Free Express Shipping across Pakistan!</span>
                  </span>
                )}
                <span className="font-semibold text-stone-900 tabular-nums">{progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#C5A059] transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div 
                  key={item.id}
                  className="flex gap-4 p-3 bg-white rounded-xl border border-[#ECE7DD] shadow-xs"
                >
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-24 object-cover rounded-lg bg-stone-100 shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif-luxury text-sm font-medium text-stone-900 line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-[11px] text-stone-500 mt-0.5 space-x-2">
                        <span>Size: <strong className="text-stone-800">{item.size}</strong></span>
                        <span>·</span>
                        <span>Color: <strong className="text-stone-800">{item.color}</strong></span>
                      </div>
                    </div>

                    {/* Stepper & Price */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-stone-200 rounded">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-100"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-semibold tabular-nums text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-100"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-serif-luxury text-sm font-semibold text-stone-950 tabular-nums">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>

                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <h3 className="font-serif-luxury text-lg font-medium text-stone-800 mb-1">
                  Your shopping bag is empty
                </h3>
                <p className="text-xs text-stone-500 mb-6">
                  Explore our luxury festive drops and add your favorite pret ensemble.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-stone-900 text-white rounded text-xs uppercase tracking-wider font-semibold hover:bg-stone-800"
                >
                  Start Shopping
                </button>
              </div>
            )}
          </div>

          {/* Footer & Order Summary */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-[#E8E2D5] space-y-4">
              
              {/* Coupon Form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Code: <strong>{appliedCoupon.code}</strong> ({appliedCoupon.discountPercent}% Off)</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-emerald-700 hover:text-emerald-900 underline text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. WAJEEHA10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 px-3 py-2 border border-stone-300 rounded text-xs text-stone-800 uppercase placeholder:normal-case placeholder:text-stone-400 focus:outline-none focus:border-stone-900"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Subtotals */}
              <div className="space-y-1.5 text-xs text-stone-600 font-sans-modern pt-2 border-t border-stone-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900 tabular-nums">{formatPrice(cartSubtotal)}</span>
                </div>
                
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount</span>
                    <span className="font-semibold tabular-nums">-{formatPrice(cartDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping (Express Pakistan)</span>
                  <span className="font-semibold text-stone-900 tabular-nums">
                    {cartShipping === 0 ? <span className="text-emerald-700 font-bold uppercase text-[10px]">Free</span> : formatPrice(cartShipping)}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-bold text-stone-950 pt-2 border-t border-stone-100">
                  <span>Total Amount</span>
                  <span className="font-serif-luxury text-base tabular-nums">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleProceedCheckout}
                  className="w-full py-3.5 px-6 bg-stone-950 hover:bg-[#C5A059] hover:text-stone-950 text-white rounded font-semibold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-2 text-stone-500 hover:text-stone-900 text-xs font-medium text-center"
                >
                  Continue Browsing
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

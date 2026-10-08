import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  Building2, 
  Banknote, 
  Check, 
  Lock,
  ArrowRight,
  Info
} from 'lucide-react';
import { PaymentMethod, CustomerInfo } from '../types';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartSubtotal, 
    cartShipping, 
    cartDiscount, 
    cartTotal, 
    appliedCoupon, 
    formatPrice, 
    settings,
    createOrder,
    showToast 
  } = useStore();

  const [formData, setFormData] = useState<CustomerInfo>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Lahore',
    province: 'Punjab',
    postalCode: '',
    orderNotes: ''
  });

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('COD');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const pakistaniCities = [
    'Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 
    'Multan', 'Peshawar', 'Sialkot', 'Quetta', 'Gujranwala', 
    'Hyderabad', 'Abbottabad', 'Bahawalpur', 'Sargodha'
  ];

  const provinces = [
    'Punjab', 'Sindh', 'Khyber Pakhtunkhwa', 'Balochistan', 'Islamabad ICT', 'Azad Kashmir'
  ];

  // Adjust shipping if express selected
  const actualShippingFee = shippingMethod === 'express' 
    ? settings.expressShippingRate 
    : cartShipping;

  const actualTotal = cartSubtotal - cartDiscount + actualShippingFee;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.address.trim()) {
      showToast('Please fill in all required customer fields.', 'error');
      return;
    }

    if (cart.length === 0) {
      showToast('Your shopping bag is empty.', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const order = createOrder({
        customer: formData,
        items: cart,
        subtotal: cartSubtotal,
        shipping: actualShippingFee,
        discount: cartDiscount,
        couponCode: appliedCoupon?.code,
        total: actualTotal,
        paymentMethod,
        paymentStatus: paymentMethod === 'Online Card' ? 'Paid' : 'Pending',
        orderStatus: 'Confirmed'
      });

      setIsSubmitting(false);
      setIsCheckoutOpen(false);
      showToast(`Order #${order.orderNumber} placed successfully!`, 'success');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-950/75 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCheckoutOpen(false)} 
      />

      <div className="relative min-h-screen flex items-center justify-center p-3 sm:p-6">
        <div className="relative bg-[#FAF9F5] rounded-2xl shadow-2xl max-w-4xl w-full border border-[#E8E2D5] overflow-hidden my-8">
          
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#E8E2D5] bg-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#C5A059]/15 flex items-center justify-center text-[#9A7B38]">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-serif-luxury text-xl sm:text-2xl font-medium text-stone-900">
                  Secure Checkout
                </h2>
                <span className="text-xs text-stone-500 font-light">
                  Direct delivery from WAJEEHA Haute Couture Atelier
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="p-1.5 text-stone-400 hover:text-stone-900 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 max-h-[82vh] overflow-y-auto">
            
            {/* Left 7 Columns: Customer Form */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 bg-white border-b lg:border-b-0 lg:border-r border-[#ECE7DD]">
              
              {/* Section 1: Customer Details */}
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-900 mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-[10px] flex items-center justify-center">1</span>
                  <span>Customer & Shipping Details</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="sm:col-span-2">
                    <label className="block text-stone-700 font-medium mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Ayesha Tariq"
                      required
                      className="w-full px-3 py-2 border border-stone-300 rounded text-stone-900 focus:outline-none focus:border-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ayesha@example.com"
                      required
                      className="w-full px-3 py-2 border border-stone-300 rounded text-stone-900 focus:outline-none focus:border-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Phone Number (WhatsApp) *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0300 1234567"
                      required
                      className="w-full px-3 py-2 border border-stone-300 rounded text-stone-900 focus:outline-none focus:border-stone-900"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-stone-700 font-medium mb-1">Street Address & House No. *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="House/Apartment #, Street, Phase, Area"
                      required
                      className="w-full px-3 py-2 border border-stone-300 rounded text-stone-900 focus:outline-none focus:border-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">City *</label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-stone-300 rounded text-stone-900 focus:outline-none focus:border-stone-900 bg-white"
                    >
                      {pakistaniCities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Province *</label>
                    <select
                      name="province"
                      value={formData.province}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-stone-300 rounded text-stone-900 focus:outline-none focus:border-stone-900 bg-white"
                    >
                      {provinces.map(prov => (
                        <option key={prov} value={prov}>{prov}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="e.g. 54000"
                      className="w-full px-3 py-2 border border-stone-300 rounded text-stone-900 focus:outline-none focus:border-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Order Notes (Optional)</label>
                    <input
                      type="text"
                      name="orderNotes"
                      value={formData.orderNotes}
                      onChange={handleChange}
                      placeholder="Special instructions for rider"
                      className="w-full px-3 py-2 border border-stone-300 rounded text-stone-900 focus:outline-none focus:border-stone-900"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Shipping Method */}
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-900 mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-[10px] flex items-center justify-center">2</span>
                  <span>Shipping Method</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <label 
                    className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                      shippingMethod === 'standard' 
                        ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900' 
                        : 'border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="shippingMethod"
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                      className="mt-0.5 text-stone-900"
                    />
                    <div>
                      <span className="font-semibold text-stone-900 block">Standard TCS Courier</span>
                      <span className="text-[11px] text-stone-500">3–5 Business Days</span>
                      <span className="text-xs font-medium text-stone-900 mt-1 block">
                        {cartShipping === 0 ? 'FREE' : formatPrice(settings.standardShippingRate)}
                      </span>
                    </div>
                  </label>

                  <label 
                    className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                      shippingMethod === 'express' 
                        ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900' 
                        : 'border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="shippingMethod"
                      checked={shippingMethod === 'express'}
                      onChange={() => setShippingMethod('express')}
                      className="mt-0.5 text-stone-900"
                    />
                    <div>
                      <span className="font-semibold text-stone-900 block">Express Overnight Air</span>
                      <span className="text-[11px] text-stone-500">1–2 Business Days</span>
                      <span className="text-xs font-medium text-stone-900 mt-1 block">
                        {formatPrice(settings.expressShippingRate)}
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Section 3: Payment Method */}
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-900 mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-[10px] flex items-center justify-center">3</span>
                  <span>Payment Method</span>
                </h3>

                <div className="space-y-2.5 text-xs">
                  {/* COD */}
                  <label 
                    className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                      paymentMethod === 'COD' 
                        ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900' 
                        : 'border-stone-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                      className="mt-1 text-stone-900"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-stone-900 flex items-center gap-1.5">
                          <Banknote className="w-4 h-4 text-[#C5A059]" />
                          <span>Cash on Delivery (COD)</span>
                        </span>
                        <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                          Nationwide Pakistan
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1">
                        Pay cash directly to the courier rider upon delivery at your doorstep.
                      </p>
                    </div>
                  </label>

                  {/* Bank Transfer */}
                  <label 
                    className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                      paymentMethod === 'Bank Transfer' 
                        ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900' 
                        : 'border-stone-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'Bank Transfer'}
                      onChange={() => setPaymentMethod('Bank Transfer')}
                      className="mt-1 text-stone-900"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-stone-900 flex items-center gap-1.5">
                          <Building2 className="w-4 h-4 text-[#C5A059]" />
                          <span>Direct Bank Transfer</span>
                        </span>
                        <span className="text-[10px] text-stone-600">Meezan / HBL</span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1">
                        Transfer via Mobile App / IBFT to: {settings.bankDetails.bankName} (A/C: {settings.bankDetails.accountNumber})
                      </p>
                    </div>
                  </label>

                  {/* Card Payment */}
                  <label 
                    className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                      paymentMethod === 'Online Card' 
                        ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900' 
                        : 'border-stone-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'Online Card'}
                      onChange={() => setPaymentMethod('Online Card')}
                      className="mt-1 text-stone-900"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-stone-900 flex items-center gap-1.5">
                          <CreditCard className="w-4 h-4 text-[#C5A059]" />
                          <span>Online Debit / Credit Card</span>
                        </span>
                        <span className="text-[10px] text-stone-600">Visa / MasterCard</span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1">
                        Encrypted 256-bit SSL transaction via Pakistani merchant gateway.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

            </div>

            {/* Right 5 Columns: Order Summary */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-[#FAF9F5] flex flex-col justify-between">
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-900 mb-4 pb-2 border-b border-[#E8E2D5]">
                  Order Items ({cart.length})
                </h3>

                {/* Items preview */}
                <div className="space-y-3 max-h-56 overflow-y-auto pr-1 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-3 text-xs items-center">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        referrerPolicy="no-referrer"
                        className="w-12 h-14 object-cover rounded bg-stone-100 shrink-0" 
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif-luxury font-medium text-stone-900 truncate">{item.name}</h4>
                        <span className="text-[11px] text-stone-500">{item.size} · {item.color} · Qty: {item.quantity}</span>
                      </div>
                      <span className="font-semibold text-stone-900 tabular-nums">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 text-xs text-stone-600 border-t border-[#E8E2D5] pt-4 font-sans-modern">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-stone-900 tabular-nums">{formatPrice(cartSubtotal)}</span>
                  </div>

                  {cartDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Promo Discount ({appliedCoupon?.code})</span>
                      <span className="font-semibold tabular-nums">-{formatPrice(cartDiscount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    <span className="font-semibold text-stone-900 tabular-nums">
                      {actualShippingFee === 0 ? <span className="text-emerald-700 font-bold uppercase text-[10px]">Free</span> : formatPrice(actualShippingFee)}
                    </span>
                  </div>

                  <div className="flex justify-between text-base font-bold text-stone-950 pt-3 border-t border-[#E8E2D5]">
                    <span>Total Payable</span>
                    <span className="font-serif-luxury text-lg tabular-nums text-[#9A7B38]">{formatPrice(actualTotal)}</span>
                  </div>
                </div>

                {/* Trust badge */}
                <div className="mt-6 p-3 bg-white rounded-lg border border-[#ECE7DD] text-[11px] text-stone-600 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>3-Day Inspection & Exchange Guarantee with WAJEEHA authentic seal.</span>
                </div>
              </div>

              {/* Place Order CTA */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-stone-950 hover:bg-[#C5A059] hover:text-stone-950 text-white rounded font-semibold text-xs uppercase tracking-[0.22em] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:bg-stone-400"
                >
                  {isSubmitting ? (
                    <span>Processing Order...</span>
                  ) : (
                    <>
                      <span>Place Order · {formatPrice(actualTotal)}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useStore } from '../context/StoreContext';
import { BrandLogo } from './BrandLogo';
import { CheckCircle2, Printer, PhoneCall, ArrowRight, Truck, PackageCheck, X } from 'lucide-react';

export const OrderSuccessModal: React.FC = () => {
  const { lastPlacedOrder, setLastPlacedOrder, formatPrice, settings } = useStore();

  if (!lastPlacedOrder) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-950/75 backdrop-blur-xs transition-opacity no-print"
        onClick={() => setLastPlacedOrder(null)} 
      />

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-stone-200 overflow-hidden z-10 my-8">
        
        {/* Close Button */}
        <button
          onClick={() => setLastPlacedOrder(null)}
          className="absolute top-4 right-4 z-20 p-2 text-stone-400 hover:text-stone-900 rounded-full transition-colors no-print"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Printable Invoice Container */}
        <div className="p-6 sm:p-10">
          
          {/* Header Brand Lockup */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-4">
            <div>
              <BrandLogo size="md" variant="dark" />
            </div>
            
            <div className="text-left sm:text-right text-xs text-stone-500 font-sans-modern">
              <span className="font-semibold text-stone-900 block text-sm">INVOICE & RECEIPT</span>
              <span>Order #{lastPlacedOrder.orderNumber}</span>
              <span className="block mt-0.5">{new Date(lastPlacedOrder.createdAt).toLocaleDateString('en-US', { dateStyle: 'long' })}</span>
            </div>
          </div>

          {/* Success Banner (Hidden in print) */}
          <div className="my-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 no-print">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-emerald-900">
                Order Confirmed Successfully!
              </h4>
              <p className="text-xs text-emerald-700 mt-0.5">
                Thank you, {lastPlacedOrder.customer.fullName}. We have dispatched your order details to your phone & email.
              </p>
            </div>
          </div>

          {/* Shipping & Tracking Information */}
          <div className="grid grid-cols-2 gap-4 py-4 text-xs border-b border-stone-200">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-stone-400 block mb-1">
                Delivered To:
              </span>
              <p className="font-semibold text-stone-900">{lastPlacedOrder.customer.fullName}</p>
              <p className="text-stone-600 mt-0.5">{lastPlacedOrder.customer.address}</p>
              <p className="text-stone-600">{lastPlacedOrder.customer.city}, {lastPlacedOrder.customer.province}</p>
              <p className="text-stone-600 font-mono mt-0.5">{lastPlacedOrder.customer.phone}</p>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-stone-400 block mb-1">
                Dispatch Status:
              </span>
              <p className="font-semibold text-stone-900 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Courier: {lastPlacedOrder.courier || 'TCS Express'}</span>
              </p>
              <p className="text-stone-600 font-mono mt-0.5">
                Tracking: <strong className="text-stone-900">{lastPlacedOrder.trackingNumber}</strong>
              </p>
              <p className="text-stone-600 mt-0.5">
                Payment: <strong className="text-stone-900">{lastPlacedOrder.paymentMethod}</strong> ({lastPlacedOrder.paymentStatus})
              </p>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="py-4">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 font-medium text-[11px] uppercase tracking-wider text-left">
                  <th className="pb-2">Garment</th>
                  <th className="pb-2 text-center">Specs</th>
                  <th className="pb-2 text-center">Qty</th>
                  <th className="pb-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-sans-modern tabular-nums">
                {lastPlacedOrder.items.map((item, idx) => (
                  <tr key={idx} className="py-2">
                    <td className="py-3">
                      <span className="font-serif-luxury font-medium text-stone-900 block">{item.name}</span>
                      <span className="text-[10px] text-stone-400 font-mono">{item.sku}</span>
                    </td>
                    <td className="py-3 text-center text-stone-600">
                      {item.size} · {item.color}
                    </td>
                    <td className="py-3 text-center text-stone-900 font-semibold">
                      {item.quantity}
                    </td>
                    <td className="py-3 text-right font-medium text-stone-950">
                      {formatPrice(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total Breakdown */}
          <div className="border-t border-stone-200 pt-4 space-y-1.5 text-xs text-stone-600 font-sans-modern">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-stone-900 tabular-nums">{formatPrice(lastPlacedOrder.subtotal)}</span>
            </div>
            {lastPlacedOrder.discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Promotional Discount ({lastPlacedOrder.couponCode})</span>
                <span className="font-medium tabular-nums">-{formatPrice(lastPlacedOrder.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Express Nationwide Delivery</span>
              <span className="font-medium text-stone-900 tabular-nums">
                {lastPlacedOrder.shipping === 0 ? 'FREE' : formatPrice(lastPlacedOrder.shipping)}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold text-stone-950 pt-2 border-t border-stone-200">
              <span>Total Payable</span>
              <span className="font-serif-luxury text-lg tabular-nums text-[#9A7B38]">
                {formatPrice(lastPlacedOrder.total)}
              </span>
            </div>
          </div>

          {/* Footer actions (No print) */}
          <div className="mt-8 pt-6 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 no-print">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice</span>
            </button>

            <a
              href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Wajeeha%2C%20I%20have%20placed%20order%20${lastPlacedOrder.orderNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>WhatsApp Helpline</span>
            </a>

            <button
              onClick={() => setLastPlacedOrder(null)}
              className="px-6 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors ml-auto"
            >
              Back to Store
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

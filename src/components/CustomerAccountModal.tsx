import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  User, 
  Package, 
  Heart, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Truck, 
  ArrowRight,
  ShieldCheck,
  ShoppingBag
} from 'lucide-react';
import { OrderStatus } from '../types';

export const CustomerAccountModal: React.FC = () => {
  const { 
    isAccountOpen, 
    setIsAccountOpen, 
    orders, 
    customers, 
    formatPrice, 
    setIsWishlistOpen,
    wishlist 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses'>('orders');

  if (!isAccountOpen) return null;

  // Use the most recent customer or default profile
  const currentCustomer = customers[0] || {
    fullName: 'Ayesha Tariq',
    email: 'ayesha.tariq@gmail.com',
    phone: '+92 300 8472910',
    city: 'Islamabad',
    status: 'VIP'
  };

  const statusSteps: OrderStatus[] = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered'];

  const getStatusIndex = (st: OrderStatus) => {
    return statusSteps.indexOf(st);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-950/70 backdrop-blur-xs transition-opacity"
        onClick={() => setIsAccountOpen(false)} 
      />

      <div className="relative bg-[#FAF9F5] rounded-2xl shadow-2xl max-w-3xl w-full border border-[#E8E2D5] overflow-hidden z-10 my-8">
        
        {/* Header */}
        <div className="p-6 border-b border-[#E8E2D5] bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C5A059]/15 flex items-center justify-center text-[#9A7B38]">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif-luxury text-xl font-medium text-stone-900">
                  {currentCustomer.fullName}
                </h3>
                <span className="px-2 py-0.5 bg-[#C5A059]/15 text-[#8C7A58] text-[10px] font-bold rounded uppercase tracking-wider">
                  {currentCustomer.status} Member
                </span>
              </div>
              <p className="text-xs text-stone-500 font-sans-modern">{currentCustomer.email} · {currentCustomer.phone}</p>
            </div>
          </div>

          <button
            onClick={() => setIsAccountOpen(false)}
            className="p-1.5 text-stone-400 hover:text-stone-900 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Strip */}
        <div className="flex border-b border-[#E8E2D5] bg-[#F6F3EB] px-6 text-xs uppercase tracking-wider font-semibold">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-4 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'orders' ? 'border-stone-900 text-stone-900' : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>My Orders ({orders.length})</span>
          </button>
          
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-4 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'profile' ? 'border-stone-900 text-stone-900' : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile Details</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`py-3 px-4 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'addresses' ? 'border-stone-900 text-stone-900' : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.length > 0 ? (
                orders.map((ord) => {
                  const currentIdx = getStatusIndex(ord.orderStatus);

                  return (
                    <div key={ord.id} className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs space-y-3">
                      {/* Order Header */}
                      <div className="flex items-center justify-between text-xs pb-2 border-b border-stone-100">
                        <div>
                          <span className="font-bold text-stone-900">Order #{ord.orderNumber}</span>
                          <span className="text-stone-400 block text-[11px] font-sans-modern">
                            {new Date(ord.createdAt).toLocaleDateString('en-US', { dateStyle: 'medium' })}
                          </span>
                        </div>
                        
                        <div className="text-right">
                          <span className="font-serif-luxury font-bold text-stone-900 tabular-nums">
                            {formatPrice(ord.total)}
                          </span>
                          <span className="block text-[10px] text-stone-500">
                            {ord.paymentMethod} ({ord.paymentStatus})
                          </span>
                        </div>
                      </div>

                      {/* Items preview */}
                      <div className="space-y-2">
                        {ord.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-xs">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              referrerPolicy="no-referrer"
                              className="w-10 h-12 object-cover rounded bg-stone-100 shrink-0" 
                            />
                            <div className="flex-1 min-w-0">
                              <span className="font-serif-luxury font-medium text-stone-900 block truncate">{item.name}</span>
                              <span className="text-[11px] text-stone-500">{item.size} · {item.color} · Qty: {item.quantity}</span>
                            </div>
                            <span className="font-medium text-stone-900 tabular-nums">{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>

                      {/* Visual Timeline Progression */}
                      <div className="pt-3 border-t border-stone-100">
                        <div className="flex items-center justify-between text-[10px] text-stone-500 uppercase tracking-wider mb-1 font-semibold">
                          <span>Status: <strong className="text-stone-900">{ord.orderStatus}</strong></span>
                          <span>Tracking: <strong className="font-mono text-stone-900">{ord.trackingNumber}</strong></span>
                        </div>

                        <div className="grid grid-cols-5 gap-1 pt-1">
                          {statusSteps.map((step, idx) => {
                            const isDone = idx <= currentIdx;
                            return (
                              <div key={step} className="flex flex-col items-center">
                                <div className={`w-full h-1.5 rounded-full transition-all ${
                                  isDone ? 'bg-[#C5A059]' : 'bg-stone-200'
                                }`} />
                                <span className={`text-[9px] mt-1 truncate ${isDone ? 'text-stone-900 font-semibold' : 'text-stone-400'}`}>
                                  {step}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                    </div>
                  );
                })
              ) : (
                <div className="text-center py-10">
                  <p className="text-xs text-stone-500">No orders found.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-4 text-xs bg-white p-6 rounded-xl border border-stone-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-stone-500 block">Full Name</span>
                  <p className="font-semibold text-stone-900 text-sm mt-0.5">{currentCustomer.fullName}</p>
                </div>
                <div>
                  <span className="text-stone-500 block">Email Address</span>
                  <p className="font-semibold text-stone-900 text-sm mt-0.5">{currentCustomer.email}</p>
                </div>
                <div>
                  <span className="text-stone-500 block">Phone Number</span>
                  <p className="font-semibold text-stone-900 text-sm mt-0.5">{currentCustomer.phone}</p>
                </div>
                <div>
                  <span className="text-stone-500 block">Account Tier</span>
                  <p className="font-semibold text-stone-900 text-sm mt-0.5">{currentCustomer.status} Privé</p>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-stone-500">
                <span>Total Lifetime Spending:</span>
                <span className="font-bold text-stone-900 text-sm tabular-nums">
                  {formatPrice(orders.reduce((sum, o) => sum + o.total, 0))}
                </span>
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="space-y-3">
              <div className="p-4 bg-white rounded-xl border border-stone-200 text-xs">
                <div className="flex items-center justify-between font-semibold text-stone-900 mb-1">
                  <span>Primary Residence (Default)</span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Active</span>
                </div>
                <p className="text-stone-700 mt-1">House 42, Street 8, Sector F-7/2</p>
                <p className="text-stone-600">Islamabad, Federal Capital - 44000</p>
                <p className="text-stone-500 font-mono mt-1">+92 300 8472910</p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-stone-200 text-xs">
                <div className="flex items-center justify-between font-semibold text-stone-900 mb-1">
                  <span>Lahore Family Residence</span>
                </div>
                <p className="text-stone-700 mt-1">Bungalow 18-A, Phase 5, DHA</p>
                <p className="text-stone-600">Lahore, Punjab - 54792</p>
                <p className="text-stone-500 font-mono mt-1">+92 321 9841123</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#E8E2D5] flex items-center justify-between text-xs">
          <button
            onClick={() => {
              setIsAccountOpen(false);
              setIsWishlistOpen(true);
            }}
            className="text-stone-600 hover:text-stone-900 flex items-center gap-1.5"
          >
            <Heart className="w-3.5 h-3.5 text-rose-500" />
            <span>View Wishlist ({wishlist.length})</span>
          </button>

          <button
            onClick={() => setIsAccountOpen(false)}
            className="px-5 py-2 bg-stone-900 text-white rounded font-semibold uppercase tracking-wider text-[11px]"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X, 
  ShieldCheck, 
  PhoneCall, 
  ArrowRight,
  Globe
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { BrandLogo } from './BrandLogo';
import { CurrencyCode } from '../types';

export const Header: React.FC = () => {
  const { 
    cart, 
    wishlist, 
    currency, 
    setCurrency, 
    setIsCartOpen, 
    setIsWishlistOpen, 
    setIsSearchOpen, 
    setIsAccountOpen,
    viewMode,
    setViewMode,
    setSelectedCategory,
    settings
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { label: 'Home', action: () => { setSelectedCategory('All'); } },
    { label: 'Shop All', action: () => { setSelectedCategory('All'); } },
    { label: 'Luxury Pret', action: () => { setSelectedCategory('Luxury Pret'); } },
    { label: 'Festive \'26', action: () => { setSelectedCategory('Festive Collection'); } },
    { label: '2 & 3 Piece', action: () => { setSelectedCategory('3 Piece'); } },
    { label: 'Unstitched', action: () => { setSelectedCategory('Unstitched'); } }
  ];

  const currencies: CurrencyCode[] = ['PKR', 'USD', 'AED', 'GBP'];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#E9E4D9] transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-[#1E1B18] text-[#FAF9F5] text-[11px] py-1.5 px-4 tracking-wider uppercase">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Free delivery notice */}
          <div className="hidden sm:flex items-center gap-2 text-stone-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
            <span>Free Express Shipping across Pakistan on orders above Rs. {settings.freeShippingThreshold.toLocaleString()}</span>
          </div>

          <div className="sm:hidden text-center w-full truncate">
            <span>Free Shipping across Pakistan on Rs. {settings.freeShippingThreshold.toLocaleString()}+</span>
          </div>

          {/* Right: Currency selector & WhatsApp helpline & Admin switch */}
          <div className="hidden md:flex items-center gap-4 text-stone-300 text-[11px]">
            {/* WhatsApp direct assistance */}
            <a 
              href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Wajeeha%2C%20I%20need%20assistance%20with%20an%20order`}
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"
            >
              <PhoneCall className="w-3 h-3 text-[#D4AF37]" />
              <span>WhatsApp Concierge</span>
            </a>

            <span className="text-stone-600">|</span>

            {/* Currency Switcher */}
            <div className="flex items-center gap-1">
              <Globe className="w-3 h-3 text-stone-400" />
              <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="bg-transparent text-stone-200 border-none outline-none text-[11px] cursor-pointer hover:text-white"
                aria-label="Currency"
              >
                {currencies.map(c => (
                  <option key={c} value={c} className="bg-stone-900 text-white">{c}</option>
                ))}
              </select>
            </div>

            <span className="text-stone-600">|</span>

            {/* Admin Switcher Button */}
            <button
              onClick={() => setViewMode(viewMode === 'store' ? 'admin' : 'store')}
              className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-semibold tracking-wider transition-all ${
                viewMode === 'admin' 
                  ? 'bg-[#D4AF37] text-stone-900 shadow-sm' 
                  : 'bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700'
              }`}
              title="Toggle Storefront vs. Admin Dashboard"
            >
              <ShieldCheck className="w-3 h-3" />
              <span>{viewMode === 'admin' ? 'Exit Admin' : 'Admin Portal'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          
          {/* Zone 1: Mobile Hamburger & Search */}
          <div className="flex items-center gap-3 md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-stone-800 hover:text-[#C5A059] transition-colors focus:outline-none"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-stone-800 hover:text-[#C5A059] transition-colors focus:outline-none"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop Left Nav Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.slice(0, 3).map((link, idx) => (
              <button
                key={idx}
                onClick={link.action}
                className="text-xs uppercase tracking-[0.2em] font-medium text-stone-700 hover:text-[#C5A059] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#C5A059] hover:after:w-full after:transition-all"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Zone 2: Brand Identity Center Logo */}
          <div className="flex-1 md:flex-none flex justify-center py-2">
            <button 
              onClick={() => { setSelectedCategory('All'); setViewMode('store'); }}
              className="focus:outline-none group"
              aria-label="WAJEEHA Home"
            >
              <BrandLogo size="md" variant="dark" />
            </button>
          </div>

          {/* Desktop Right Nav Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.slice(3).map((link, idx) => (
              <button
                key={idx}
                onClick={link.action}
                className="text-xs uppercase tracking-[0.2em] font-medium text-stone-700 hover:text-[#C5A059] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#C5A059] hover:after:w-full after:transition-all"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Actions (Search, Wishlist, Account, Bag) */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Desktop Search Button */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex items-center gap-2 p-2 text-stone-700 hover:text-[#C5A059] transition-colors rounded-full focus:outline-none"
              aria-label="Search products"
              title="Search collection"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Customer Account Button */}
            <button 
              onClick={() => setIsAccountOpen(true)}
              className="p-2 text-stone-700 hover:text-[#C5A059] transition-colors rounded-full focus:outline-none"
              aria-label="Customer Account"
              title="Customer Account & Orders"
            >
              <User className="w-4 h-4" />
            </button>

            {/* Wishlist Button */}
            <button 
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 text-stone-700 hover:text-[#C5A059] transition-colors rounded-full relative focus:outline-none"
              aria-label={`Wishlist with ${wishlist.length} items`}
              title="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C5A059] text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Bag Button */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 bg-stone-900 text-stone-100 hover:bg-stone-800 transition-all rounded-full focus:outline-none shadow-sm hover:shadow"
              aria-label={`Shopping bag with ${totalCartCount} items`}
              title="Shopping Bag"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#D4AF37] text-stone-950 text-[9px] font-bold rounded-full flex items-center justify-center">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-medium tracking-wider uppercase hidden sm:inline">Bag</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div 
            className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity" 
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-[#FAF9F5] h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E9E4D9]">
                <BrandLogo size="sm" variant="dark" />
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-stone-500 hover:text-stone-900 focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 space-y-4">
                {navLinks.map((link, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      link.action();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-2.5 px-3 text-sm uppercase tracking-[0.18em] font-medium text-stone-800 hover:text-[#C5A059] hover:bg-[#F2EDE2] rounded-md transition-colors flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#E9E4D9] space-y-4">
              <button
                onClick={() => {
                  setViewMode(viewMode === 'store' ? 'admin' : 'store');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-4 bg-stone-900 text-white rounded text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>{viewMode === 'admin' ? 'View Storefront' : 'Open Admin Dashboard'}</span>
              </button>

              <div className="flex items-center justify-between text-xs text-stone-600 pt-2">
                <span>Currency</span>
                <select 
                  value={currency} 
                  onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                  className="bg-transparent border border-stone-300 rounded px-2 py-1 text-xs"
                >
                  {currencies.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

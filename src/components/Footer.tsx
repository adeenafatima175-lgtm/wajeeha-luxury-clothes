import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { useStore } from '../context/StoreContext';
import { 
  Mail, 
  PhoneCall, 
  MapPin, 
  ArrowRight, 
  Check, 
  Instagram, 
  Facebook, 
  MessageCircle, 
  Sparkles,
  CreditCard,
  Truck,
  RotateCcw,
  ShieldCheck
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, showToast, setIsSizeGuideOpen, setViewMode } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Welcome to WAJEEHA Privé! Use code WAJEEHA10 for 10% off your first purchase.');
    setEmail('');
  };

  return (
    <footer className="bg-[#141210] text-[#FAF9F5] border-t border-[#26231E]">
      
      {/* 4-Pillar Trust Highlights */}
      <div className="border-b border-[#26231E] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C5A059]/10 flex items-center justify-center text-[#D4AF37] shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold tracking-wider uppercase text-white">Free Nationwide Shipping</h4>
                <p className="text-[11px] text-stone-400 mt-0.5">On all orders above Rs. {settings.freeShippingThreshold.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C5A059]/10 flex items-center justify-center text-[#D4AF37] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold tracking-wider uppercase text-white">100% Authentic Pret</h4>
                <p className="text-[11px] text-stone-400 mt-0.5">Pure crinkle chiffons & 9000 velvets</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C5A059]/10 flex items-center justify-center text-[#D4AF37] shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold tracking-wider uppercase text-white">Easy Exchanges</h4>
                <p className="text-[11px] text-stone-400 mt-0.5">7-day hassle-free size exchange guarantee</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C5A059]/10 flex items-center justify-center text-[#D4AF37] shrink-0">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold tracking-wider uppercase text-white">WhatsApp Concierge</h4>
                <p className="text-[11px] text-stone-400 mt-0.5">Instant styling & sizing assistance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Signup Strip */}
      <div className="border-b border-[#26231E] py-12 bg-[#1A1714]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2 text-[#D4AF37]">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-[11px] uppercase tracking-[0.3em] font-semibold">Join The Privé Circle</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-white mb-2">
            Receive 10% Off Your Debut Order
          </h3>
          <p className="text-xs sm:text-sm text-stone-400 max-w-md mx-auto mb-6 font-light">
            Be the first to access private sales, new festive arrivals, and bespoke bridal unveils.
          </p>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex items-center gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 bg-stone-900 border border-stone-700 rounded text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#D4AF37] hover:bg-[#B88A3B] text-stone-950 font-semibold text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              {subscribed ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Subscribed</span>
                </>
              ) : (
                <>
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-start">
              <BrandLogo size="md" variant="light" />
            </div>
            <p className="text-xs text-stone-400 font-light leading-relaxed max-w-sm pt-2">
              WAJEEHA is a premier Pakistani fashion maison dedicated to timeless elegance. We craft festive luxury prêt, embroidered wedding formals, and pure fabrics that celebrate feminine grace.
            </p>
            <div className="flex items-center gap-3 text-stone-400 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-stone-900 rounded-full hover:text-[#D4AF37] transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-stone-900 rounded-full hover:text-[#D4AF37] transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-stone-900 rounded-full hover:text-[#D4AF37] transition-colors" 
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white mb-4">Customer Care</h4>
            <ul className="space-y-2.5 text-xs text-stone-400 font-light">
              <li>
                <button onClick={() => setIsSizeGuideOpen(true)} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                  Size Guide & Measurements
                </button>
              </li>
              <li><span className="hover:text-[#D4AF37] cursor-pointer">Shipping & Delivery Timelines</span></li>
              <li><span className="hover:text-[#D4AF37] cursor-pointer">Returns & Exchanges Policy</span></li>
              <li><span className="hover:text-[#D4AF37] cursor-pointer">Track Your Consignment</span></li>
              <li><span className="hover:text-[#D4AF37] cursor-pointer">Custom Stitching FAQ</span></li>
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white mb-4">Collections</h4>
            <ul className="space-y-2.5 text-xs text-stone-400 font-light">
              <li><span className="hover:text-[#D4AF37] cursor-pointer">Luxury Prêt 2026</span></li>
              <li><span className="hover:text-[#D4AF37] cursor-pointer">Festive Peshwas & Kalidars</span></li>
              <li><span className="hover:text-[#D4AF37] cursor-pointer">Shahi Velvet Formals</span></li>
              <li><span className="hover:text-[#D4AF37] cursor-pointer">2-Piece Stitched Coordinates</span></li>
              <li><span className="hover:text-[#D4AF37] cursor-pointer">Unstitched Brocade & Chiffon</span></li>
            </ul>
          </div>

          {/* Contact & Atelier */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white mb-4">Atelier & Support</h4>
            <ul className="space-y-3 text-xs text-stone-400 font-light">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Gulberg III, MM Alam Road, Lahore, Pakistan</span>
              </li>
              <li className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{settings.supportPhone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{settings.supportEmail}</span>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => setViewMode('admin')}
                  className="inline-flex items-center gap-1.5 text-[11px] text-[#D4AF37] hover:underline uppercase tracking-wider font-semibold"
                >
                  <span>Admin Staff Portal</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment icons */}
        <div className="mt-12 pt-8 border-t border-[#26231E] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-sans-modern">
          <p>© {new Date().getFullYear()} WAJEEHA (Pvt) Ltd. All rights reserved. Registered trademark.</p>
          
          <div className="flex items-center gap-3 text-stone-400">
            <span className="text-[10px] uppercase tracking-wider">Accepted:</span>
            <span className="px-2 py-0.5 bg-stone-900 rounded text-[10px] text-stone-300">Cash on Delivery (COD)</span>
            <span className="px-2 py-0.5 bg-stone-900 rounded text-[10px] text-stone-300">Bank Transfer</span>
            <span className="px-2 py-0.5 bg-stone-900 rounded text-[10px] text-stone-300">Visa / Mastercard</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

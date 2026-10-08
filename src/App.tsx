import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { ProductGrid } from './components/ProductGrid';
import { PromotionalBanner } from './components/PromotionalBanner';
import { InstagramSection } from './components/InstagramSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { QuickViewModal } from './components/QuickViewModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { CustomerAccountModal } from './components/CustomerAccountModal';
import { ToastContainer } from './components/ToastContainer';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { PhoneCall, ShieldCheck } from 'lucide-react';

const AppContent: React.FC = () => {
  const { viewMode, setViewMode, settings } = useStore();

  if (viewMode === 'admin') {
    return (
      <div className="min-h-screen bg-[#F4F1EA]">
        <AdminDashboard />
        <OrderSuccessModal />
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-900 flex flex-col font-sans-modern selection:bg-[#D4AF37]/20">
      {/* Customer Storefront View */}
      <Header />
      
      <main className="flex-1">
        <Hero />
        <CategorySection />
        <ProductGrid />
        <PromotionalBanner />
        <InstagramSection />
      </main>

      <Footer />

      {/* Modals & Drawers */}
      <ProductDetailModal />
      <QuickViewModal />
      <SizeGuideModal />
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <CheckoutModal />
      <OrderSuccessModal />
      <CustomerAccountModal />
      <ToastContainer />

      {/* Floating Action Button for WhatsApp and Quick Admin Switcher */}
      <div className="fixed bottom-6 left-6 z-30 flex flex-col gap-2.5 no-print">
        {/* Quick Admin Toggle */}
        <button
          onClick={() => setViewMode('admin')}
          className="group flex items-center gap-2 p-2.5 sm:px-3 sm:py-2 bg-stone-900/90 hover:bg-stone-950 backdrop-blur-md text-white rounded-full shadow-lg border border-stone-700/60 transition-all cursor-pointer"
          title="Switch to Admin Dashboard"
        >
          <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
          <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider">
            Admin Portal
          </span>
        </button>

        {/* WhatsApp Helpline */}
        <a
          href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Wajeeha%2C%20I%20have%20an%20inquiry%20regarding%20your%20luxury%20collection`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 p-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-full shadow-xl hover:scale-105 transition-all"
          title="Chat with WAJEEHA WhatsApp Concierge"
        >
          <PhoneCall className="w-4 h-4" />
          <span className="hidden sm:inline text-xs font-bold tracking-wide">
            WhatsApp Concierge
          </span>
        </a>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}

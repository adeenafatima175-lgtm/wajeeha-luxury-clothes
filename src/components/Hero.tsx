import React from 'react';
import { ArrowRight, Sparkles, Gem, Scissors, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Hero: React.FC = () => {
  const { setSelectedCategory } = useStore();

  const scrollToShop = (category = 'All') => {
    setSelectedCategory(category);
    const element = document.getElementById('shop-catalog');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#FAF9F5]">
      {/* Main Campaign Hero Split/Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        <div className="relative rounded-2xl overflow-hidden bg-stone-900 shadow-2xl min-h-[540px] md:min-h-[640px] flex items-center">
          
          {/* Background Photography with Scrim */}
          <div className="absolute inset-0">
            <img 
              src="/src/assets/images/hero_wajeeha_festive_model_1791435670867.jpg" 
              alt="WAJEEHA Festive Luxury Pret Campaign"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center md:object-[center_35%] transform scale-105 transition-transform duration-1000 ease-out hover:scale-100"
            />
            {/* Measured luxury gradient scrim for WCAG AA readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/65 to-transparent md:to-stone-950/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent md:hidden" />
          </div>

          {/* Content Lockup */}
          <div className="relative z-10 max-w-2xl px-6 sm:px-12 py-12 md:py-20 text-white">
            
            {/* Editorial Kicker */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-[#D4AF37]"></span>
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-semibold">
                Festive Edit · Autumn / Winter 2026
              </span>
            </div>

            {/* Main Brand Title */}
            <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-[#FAF9F5] mb-4 text-balance">
              Elegance in <br />
              <span className="italic font-light text-[#D8BA75]">Every Stitch</span>
            </h1>

            {/* Subtitle */}
            <p className="text-stone-200/90 text-sm sm:text-base leading-relaxed max-w-lg mb-8 font-light">
              Discover timeless Pakistani luxury prêt and bespoke couture. Intricate tilla embroideries, pure crinkle chiffons, and artisanal silhouettes tailored to celebrate your grace.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={() => scrollToShop('Festive Collection')}
                className="px-8 py-3.5 bg-[#FAF9F5] text-stone-900 hover:bg-[#D8BA75] hover:text-stone-950 text-xs uppercase tracking-[0.22em] font-semibold transition-all duration-300 rounded shadow-md hover:shadow-xl flex items-center gap-2.5 group cursor-pointer"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button 
                onClick={() => scrollToShop('Luxury Pret')}
                className="px-8 py-3.5 bg-transparent border border-white/40 hover:border-white text-white text-xs uppercase tracking-[0.22em] font-medium transition-all duration-300 rounded backdrop-blur-xs hover:bg-white/10 cursor-pointer"
              >
                <span>Explore Prêt</span>
              </button>
            </div>

            {/* Mini Trust Bar inside Hero */}
            <div className="mt-12 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-stone-300 font-light">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Pure Fabrics</span>
              </div>
              <div className="flex items-center gap-2">
                <Gem className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Artisanal Tilla</span>
              </div>
              <div className="flex items-center gap-2">
                <Scissors className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Custom Stitching</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Worldwide Delivery</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

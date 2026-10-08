import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Sparkles, MessageSquareQuote, CheckCircle2 } from 'lucide-react';

export const PromotionalBanner: React.FC = () => {
  const { settings, setSelectedCategory } = useStore();

  return (
    <section className="py-16 bg-[#1A1815] text-[#FAF9F5] overflow-hidden relative">
      {/* Decorative gold background ambient accents */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#C5A059]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#C5A059]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Campaign */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-8 h-px bg-[#D4AF37]"></span>
              <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
                Couture Craftsmanship
              </span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-[#FAF9F5]">
              Handcrafted with Heritage, <br />
              <span className="italic text-[#D8BA75]">Tailored for Modern Royalty</span>
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light max-w-xl">
              Each WAJEEHA ensemble represents weeks of meticulous hand-needlework by master Pakistani artisans. From intricate antique zardozi to fine tilla scalloping on pure crinkle chiffon, our atelier preserves age-old heritage weaves with a contemporary feminine grace.
            </p>

            {/* Artisan Highlights */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Pure Silks & Velvets</h4>
                  <p className="text-[11px] text-stone-400 mt-0.5">Ethically sourced 9000 micro-velvets and raw silks</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Master Tailoring</h4>
                  <p className="text-[11px] text-stone-400 mt-0.5">Double-stitched seams with internal lining slips</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  setSelectedCategory('Festive Collection');
                  const el = document.getElementById('shop-catalog');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-[#FAF9F5] text-stone-900 hover:bg-[#D4AF37] hover:text-stone-950 rounded text-xs uppercase tracking-[0.2em] font-semibold transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>View Festive Formals</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Wajeeha%2C%20I%20am%20interested%20in%20custom%20stitching%20or%20bridal%20bespoke`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-white/20 hover:border-white text-white rounded text-xs uppercase tracking-[0.2em] font-medium transition-colors"
              >
                Bespoke WhatsApp Order
              </a>
            </div>
          </div>

          {/* Right Column: Visual Feature Box */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-stone-900 group">
              <img
                src="/src/assets/images/wajeeha_unstitched_fabrics_1791435714334.jpg"
                alt="Wajeeha pure handcrafted fabrics and embroidery details"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-1.5 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>The Ateliers of Lahore & Karachi</span>
                </div>
                <p className="font-serif-luxury text-lg text-white font-medium leading-snug">
                  "Timeless grace crafted into every stitch, honouring centuries of Mughal needlecraft."
                </p>
                <span className="text-[11px] text-stone-400 mt-2 block tracking-wider uppercase font-sans-modern">
                  Wajeeha Luxury Pret Atelier
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

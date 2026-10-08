import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, ArrowRight } from 'lucide-react';

export const CategorySection: React.FC = () => {
  const { categories, selectedCategory, setSelectedCategory } = useStore();

  const handleSelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    const element = document.getElementById('shop-catalog');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 md:py-16 bg-[#FAF9F5] border-b border-[#EBE6DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C7A58] font-semibold">
                Curated Aesthetics
              </span>
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-stone-900 tracking-tight">
              Shop by Category
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 font-light">
              Explore our handpicked Pakistani pret, festive formals, and luxury unstitched fabrics.
            </p>
          </div>

          <button 
            onClick={() => handleSelect('All')}
            className="mt-4 md:mt-0 text-xs uppercase tracking-[0.2em] font-semibold text-stone-900 hover:text-[#C5A059] flex items-center gap-1.5 transition-colors self-start md:self-auto cursor-pointer"
          >
            <span>View All Collections</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Categories Grid / Carousel */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.name;

            return (
              <button
                key={cat.id}
                onClick={() => handleSelect(cat.name)}
                className={`group text-left p-2.5 rounded-xl transition-all duration-300 cursor-pointer ${
                  isSelected 
                    ? 'bg-[#F2ECE1] shadow-xs' 
                    : 'bg-white hover:bg-[#FDFBF7] shadow-xs hover:shadow-md'
                }`}
              >
                {/* Image Container with zoom */}
                <div className="relative aspect-4/3 w-full rounded-lg overflow-hidden bg-stone-100 mb-3">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/10 transition-colors" />
                  
                  {/* Subtle hover pill indicator */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-stone-950/80 backdrop-blur-xs text-white py-1 px-2.5 rounded text-[11px] font-medium tracking-wide text-center group-hover:bg-stone-900 transition-colors">
                    {cat.name}
                  </div>
                </div>

                {/* Text Metadata */}
                <div className="px-1">
                  <div className="flex items-center justify-between text-xs text-stone-700 font-medium">
                    <span className="truncate">{cat.name}</span>
                    <span className="text-[11px] text-stone-600 font-sans-modern tabular-nums">
                      {cat.productCount} Items
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 line-clamp-1 mt-0.5 font-light">
                    {cat.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};

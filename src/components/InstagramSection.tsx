import React from 'react';
import { Instagram, Heart, Sparkles } from 'lucide-react';

export const InstagramSection: React.FC = () => {
  const posts = [
    {
      image: '/src/assets/images/hero_wajeeha_festive_model_1791435670867.jpg',
      likes: '3,842',
      tag: '#WajeehaFestive26'
    },
    {
      image: '/src/assets/images/wajeeha_luxury_pret_model_1791435683519.jpg',
      likes: '2,910',
      tag: '#EmeraldPret'
    },
    {
      image: '/src/assets/images/wajeeha_festive_velvet_model_1791435701142.jpg',
      likes: '4,120',
      tag: '#VelvetSoiree'
    },
    {
      image: '/src/assets/images/wajeeha_black_formal_model_1791435826102.jpg',
      likes: '3,490',
      tag: '#NoirFormals'
    },
    {
      image: '/src/assets/images/wajeeha_blush_pink_lawn_1791435841179.jpg',
      likes: '1,890',
      tag: '#WajeehaSummerLawn'
    },
    {
      image: '/src/assets/images/wajeeha_unstitched_fabrics_1791435714334.jpg',
      likes: '2,450',
      tag: '#BrocadeWeaves'
    }
  ];

  return (
    <section className="py-16 bg-[#FAF9F5] border-t border-[#EAE4D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 mb-2 text-[#8C7A58]">
            <Instagram className="w-4 h-4 text-[#C5A059]" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold">
              @wajeeha_couture
            </span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-stone-900 tracking-tight mb-2">
            Styled by Wajeeha Women
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-light">
            Tag <span className="font-medium text-stone-900">#WajeehaElegance</span> on Instagram for a chance to be featured on our global editorial feed.
          </p>
        </div>

        {/* 6-Item Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {posts.map((post, idx) => (
            <a
              key={idx}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-xl overflow-hidden bg-stone-200 block shadow-xs hover:shadow-lg transition-all"
            >
              <img
                src={post.image}
                alt={`Instagram style feature ${post.tag}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-stone-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-3 text-center">
                <Instagram className="w-6 h-6 mb-2 text-[#D4AF37]" />
                <div className="flex items-center gap-1 text-xs font-semibold">
                  <Heart className="w-3.5 h-3.5 fill-current text-rose-400" />
                  <span>{post.likes}</span>
                </div>
                <span className="text-[10px] text-stone-300 mt-1 font-mono">{post.tag}</span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};

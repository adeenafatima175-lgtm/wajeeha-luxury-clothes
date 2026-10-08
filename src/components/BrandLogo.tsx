import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light' | 'gold';
  showSubtitle?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  variant = 'dark',
  showSubtitle = true,
  className = ''
}) => {
  const isLight = variant === 'light';
  const textColor = isLight ? 'text-[#FAF9F5]' : 'text-[#1E1B18]';
  const subtextColor = isLight ? 'text-[#D4AF37]/80' : 'text-[#8C7A58]';
  const goldColor = '#C5A059';

  const scale = size === 'sm' ? 'scale-75' : size === 'lg' ? 'scale-125' : 'scale-100';

  return (
    <div className={`flex flex-col items-center select-none text-center ${className}`}>
      {/* Luxury Brand Crest SVG matching user's uploaded logo with draped silk W and floral branch */}
      <div className={`flex items-center justify-center transition-transform origin-center ${scale}`}>
        <svg 
          viewBox="0 0 120 70" 
          className="w-16 h-10 overflow-visible"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle hanger top */}
          <path 
            d="M60 12 C60 7, 56 6, 56 3 C56 1, 58 0, 60 0 C62 0, 64 1, 64 3 C64 6, 60 7, 60 12" 
            stroke={goldColor} 
            strokeWidth="1.6" 
            strokeLinecap="round"
          />
          <path 
            d="M48 21 L60 12 L72 21" 
            stroke={goldColor} 
            strokeWidth="1.8" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          {/* Center sparkle */}
          <path 
            d="M60 18 L61 21 L64 22 L61 23 L60 26 L59 23 L56 22 L59 21 Z" 
            fill={goldColor} 
          />

          {/* Majestic Serif W */}
          <path 
            d="M36 24 C45 22, 54 38, 59 52 L61 52 C65 38, 71 25, 75 25 C77 25, 78 28, 76 34 L66 60 L60 60 L48 35 C45 29, 41 26, 36 24 Z" 
            fill="url(#goldGradient)" 
          />

          {/* Draped Silk Swatch sweeping across left apex */}
          <path 
            d="M32 25 C42 22, 52 32, 60 48 C62 52, 63 52, 62 50 C55 35, 46 25, 34 26 C30 26, 28 27, 26 28 C30 25, 34 24, 40 26 Z" 
            fill="url(#silkGradient)" 
            opacity="0.95"
          />

          {/* Floral Petal Flourish on right apex */}
          <path 
            d="M75 25 C82 22, 88 18, 91 16 C88 20, 85 24, 79 28 Z" 
            fill={goldColor} 
          />
          <path 
            d="M78 27 C84 27, 89 29, 93 32 C88 32, 82 30, 77 28 Z" 
            fill={goldColor} 
          />
          <circle cx="89" cy="18" r="1.5" fill={goldColor} />

          <defs>
            <linearGradient id="goldGradient" x1="30" y1="20" x2="80" y2="60" gradientUnits="userSpaceOnUse">
              <stop stopColor="#D8BA75" />
              <stop offset="0.5" stopColor="#B88A3B" />
              <stop offset="1" stopColor="#8E6726" />
            </linearGradient>
            <linearGradient id="silkGradient" x1="26" y1="22" x2="62" y2="52" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F5ECE0" />
              <stop offset="0.5" stopColor="#DFD1BE" />
              <stop offset="1" stopColor="#BAA287" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col items-center mt-0.5">
        <span 
          className={`font-serif-luxury font-medium tracking-[0.28em] text-lg md:text-xl uppercase transition-colors ${textColor}`}
          style={{ letterSpacing: '0.28em' }}
        >
          WAJEEHA
        </span>
        
        {showSubtitle && (
          <div className="flex items-center gap-2 mt-0.5">
            <span className="w-3 h-px bg-[#C5A059]/40"></span>
            <span 
              className={`text-[9px] uppercase tracking-[0.35em] font-medium font-sans-modern ${subtextColor}`}
              style={{ letterSpacing: '0.35em' }}
            >
              LUXURY PRET
            </span>
            <span className="w-3 h-px bg-[#C5A059]/40"></span>
          </div>
        )}
      </div>
    </div>
  );
};

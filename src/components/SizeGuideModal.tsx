import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Ruler, Sparkles, Check } from 'lucide-react';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useStore();
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!isSizeGuideOpen) return null;

  const chartDataInches = [
    { size: 'XS', chest: '36', waist: '32', hip: '38', shoulder: '14.0', length: '42-45', trouserLength: '37' },
    { size: 'S',  chest: '38', waist: '34', hip: '40', shoulder: '14.5', length: '42-45', trouserLength: '37.5' },
    { size: 'M',  chest: '41', waist: '37', hip: '44', shoulder: '15.0', length: '44-46', trouserLength: '38' },
    { size: 'L',  chest: '44', waist: '41', hip: '48', shoulder: '15.5', length: '44-46', trouserLength: '38.5' },
    { size: 'XL', chest: '48', waist: '45', hip: '52', shoulder: '16.5', length: '45-47', trouserLength: '39' }
  ];

  const chartDataCm = [
    { size: 'XS', chest: '91', waist: '81', hip: '96', shoulder: '35.5', length: '107-114', trouserLength: '94' },
    { size: 'S',  chest: '96', waist: '86', hip: '102', shoulder: '36.8', length: '107-114', trouserLength: '95' },
    { size: 'M',  chest: '104', waist: '94', hip: '112', shoulder: '38.1', length: '112-117', trouserLength: '96.5' },
    { size: 'L',  chest: '112', waist: '104', hip: '122', shoulder: '39.4', length: '112-117', trouserLength: '97.8' },
    { size: 'XL', chest: '122', waist: '114', hip: '132', shoulder: '41.9', length: '114-119', trouserLength: '99' }
  ];

  const currentChart = unit === 'inches' ? chartDataInches : chartDataCm;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-950/70 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSizeGuideOpen(false)} 
      />

      {/* Modal Card */}
      <div className="relative bg-[#FAF9F5] rounded-2xl shadow-2xl max-w-3xl w-full p-6 sm:p-8 border border-[#E8E2D5] z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D5]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#C5A059]/15 flex items-center justify-center text-[#9A7B38]">
              <Ruler className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-xl font-medium text-stone-900">
                Stitched Size Chart & Measurements
              </h3>
              <p className="text-xs text-stone-500 font-light">
                Standard ready-to-wear sizing for WAJEEHA luxury pret and festive suits.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="p-2 text-stone-500 hover:text-stone-950 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Unit Selector */}
        <div className="flex items-center justify-between py-4">
          <span className="text-xs text-stone-600 font-medium">All garment measurements are stitched values:</span>
          
          <div className="flex items-center bg-stone-200/60 p-1 rounded-lg">
            <button
              onClick={() => setUnit('inches')}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                unit === 'inches' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Inches
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                unit === 'cm' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Centimeters (cm)
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-xs">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-[#F6F3EB] text-stone-700 uppercase tracking-wider font-semibold border-b border-stone-200 text-[11px]">
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">Chest / Bust</th>
                <th className="py-3 px-4">Waist</th>
                <th className="py-3 px-4">Hips</th>
                <th className="py-3 px-4">Shoulder</th>
                <th className="py-3 px-4">Shirt Length</th>
                <th className="py-3 px-4">Trouser</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-sans-modern tabular-nums text-stone-700">
              {currentChart.map((row, idx) => (
                <tr key={idx} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-3 px-4 font-bold text-stone-900">{row.size}</td>
                  <td className="py-3 px-4">{row.chest}</td>
                  <td className="py-3 px-4">{row.waist}</td>
                  <td className="py-3 px-4">{row.hip}</td>
                  <td className="py-3 px-4">{row.shoulder}</td>
                  <td className="py-3 px-4">{row.length}</td>
                  <td className="py-3 px-4">{row.trouserLength}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Measurement Tips */}
        <div className="mt-6 p-4 bg-[#F5F2EA] rounded-xl border border-[#E5DFD1] text-xs text-stone-600 space-y-2">
          <div className="flex items-center gap-1.5 font-semibold text-stone-900">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>How to Find Your Exact Fit</span>
          </div>
          <p className="font-light leading-relaxed">
            Measure your favorite fitting kurta from underarm to underarm for Chest. For Kalidar and Peshwas silhouettes, the waist and hip measurements are relaxed with full gathering. For custom sizing or sleeve alteration, message our WhatsApp Concierge anytime.
          </p>
        </div>

        {/* Close Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs uppercase tracking-wider font-semibold"
          >
            Got It
          </button>
        </div>

      </div>
    </div>
  );
};

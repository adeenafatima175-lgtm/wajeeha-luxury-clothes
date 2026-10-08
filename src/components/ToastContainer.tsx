import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-3.5 rounded-xl shadow-xl border flex items-center justify-between gap-3 transition-all duration-300 animate-slide-up ${
            toast.type === 'error'
              ? 'bg-rose-950/95 text-rose-100 border-rose-800'
              : toast.type === 'info'
              ? 'bg-stone-900/95 text-stone-100 border-stone-800'
              : 'bg-stone-950/95 text-[#FAF9F5] border-[#D4AF37]/50'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            ) : toast.type === 'info' ? (
              <Info className="w-4 h-4 text-blue-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
            )}
            <p className="text-xs font-medium leading-snug truncate">{toast.message}</p>
          </div>

          <button
            onClick={() => dismissToast(toast.id)}
            className="text-stone-400 hover:text-white p-1 shrink-0"
            aria-label="Dismiss toast"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};

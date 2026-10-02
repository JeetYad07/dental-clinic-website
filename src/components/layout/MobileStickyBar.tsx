import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export const MobileStickyBar: React.FC = () => {
  return (
    <aside
      aria-label="Quick mobile booking actions"
      className="fixed bottom-0 left-0 right-0 z-40 bg-surface-container-lowest/95 p-3 backdrop-blur-lg shadow-[0_-4px_16px_rgba(0,0,0,0.08)] lg:hidden border-t border-outline-variant/30"
    >
      <div className="mx-auto flex max-w-md items-center justify-between gap-2.5">
        <a
          href="tel:09036940356"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-surface-container-high py-2.5 px-3 text-xs font-bold text-primary active:scale-95 transition-transform"
        >
          <Phone className="w-4 h-4 text-primary" />
          <span>Call Reception</span>
        </a>
        <a
          href="https://wa.me/919036940356?text=Hi%20Tooth%20Story%20Clinic%2C%20I'd%20like%20to%20book%20an%20appointment"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-[2] items-center justify-center gap-2 rounded-full bg-[#25D366] py-2.5 px-4 text-xs font-bold text-white shadow-md active:scale-95 transition-transform"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>WhatsApp (Book Now)</span>
        </a>
      </div>
    </aside>
  );
};

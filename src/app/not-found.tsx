import React from 'react';
import Link from 'next/link';
import { Home, MessageCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 bg-surface">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-primary-fixed flex items-center justify-center text-primary text-3xl font-extrabold">
          404
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-on-surface">Page Not Found</h1>
          <p className="text-sm text-on-surface-variant">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-primary text-on-primary text-sm font-bold hover:bg-primary-container transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <a
            href="https://wa.me/919036940356"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-bold hover:bg-[#1EBE5D] transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Clinic</span>
          </a>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useId } from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'icon';
  theme?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'full',
  theme = 'light',
}) => {
  const isDark = theme === 'dark';
  const rawId = useId();
  // Sanitize id for SVG attribute usage
  const id = rawId.replace(/[^a-zA-Z0-9]/g, '');

  const gradId = `toothGrad_${id}`;
  const accentGradId = `accentGrad_${id}`;

  const iconSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 44 44"
      className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 shrink-0 transition-transform duration-200 group-hover:scale-105"
      fill="none"
    >
      <defs>
        {/* Vibrant Medical Sapphire to Ocean Teal Gradient */}
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="60%" stopColor="#0E7490" />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>

        <linearGradient id={accentGradId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2DD4BF" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
      </defs>

      {/* Modern Rounded Shield Mark */}
      <rect
        width="44"
        height="44"
        rx="12"
        fill={isDark ? '#1E293B' : '#E0F2FE'}
        stroke={isDark ? '#334155' : '#BAE6FD'}
        strokeWidth="1.5"
      />

      {/* Stylized Tooth Anatomy Mark */}
      <path
        d="M22 10 C17 10 13 13 13 18 C13 22.5 15 26.5 17 31 C18.2 33.8 19.5 35.5 20.8 35.5 C22 35.5 22.2 32.5 22.2 30.5 C22.2 32.5 22.4 35.5 23.6 35.5 C24.9 35.5 26.2 33.8 27.4 31 C29.4 26.5 31.4 22.5 31.4 18 C31.4 13 27.4 10 22 10 Z"
        fill={`url(#${gradId})`}
      />

      {/* Patient Smile Line */}
      <path
        d="M17.5 22.5 Q22.2 27 26.9 22.5"
        stroke={`url(#${accentGradId})`}
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Enamel Light Sparkle */}
      <circle cx="27.5" cy="15.5" r="1.5" fill="#FFFFFF" />
    </svg>
  );

  if (variant === 'icon') {
    return <div className={`inline-flex items-center ${className}`}>{iconSvg}</div>;
  }

  return (
    <div className={`group inline-flex items-center gap-2 sm:gap-2.5 ${className}`}>
      {iconSvg}
      <div className="flex flex-col select-none">
        <div className="font-black tracking-tight leading-none text-base sm:text-[18px] md:text-[19px]">
          <span className={isDark ? 'text-white' : 'text-slate-900'}>TOOTH</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-cyan-600 to-teal-600 dark:from-sky-400 dark:to-teal-300 font-black ml-1">
            STORY
          </span>
        </div>
        <span
          className={`font-bold uppercase tracking-wider text-[9px] sm:text-[10px] leading-tight mt-0.5 ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          {variant === 'compact' ? (
            'Dental Clinic'
          ) : (
            <>
              <span className="sm:hidden">Dental Clinic</span>
              <span className="hidden sm:inline">Dental Clinic • Electronic City</span>
            </>
          )}
        </span>
      </div>
    </div>
  );
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Clinical Luxury Canvas & Surfaces
        'surface': '#FFFFFF',
        'surface-dim': '#F1F5F9',
        'surface-bright': '#FFFFFF',
        'surface-container-lowest': '#FFFFFF',
        'surface-container-low': '#F8FAFC',
        'surface-container': '#F1F5F9',
        'surface-container-high': '#E2E8F0',
        'surface-container-highest': '#CBD5E1',
        'on-surface': '#0F172A',
        'on-surface-variant': '#475569',
        'inverse-surface': '#0F172A',
        'inverse-on-surface': '#F8FAFC',
        'outline': '#94A3B8',
        'outline-variant': '#E2E8F0',
        'surface-tint': '#0E7490',
        
        // Brand Primary: Deep Marine Slate & Cyan
        'primary': '#0E7490',
        'primary-hover': '#085C73',
        'on-primary': '#FFFFFF',
        'primary-container': '#083344',
        'on-primary-container': '#E0F2FE',
        'inverse-primary': '#38BDF8',
        'primary-fixed': '#E0F2FE',
        'primary-fixed-dim': '#BAE6FD',
        'on-primary-fixed': '#082F49',
        'on-primary-fixed-variant': '#075985',

        // Brand Secondary: Soothing Sage & Mint
        'secondary': '#0D9488',
        'secondary-hover': '#0F766E',
        'on-secondary': '#FFFFFF',
        'secondary-container': '#F0FDFA',
        'on-secondary-container': '#134E4A',
        'secondary-fixed': '#CCFBF1',
        'secondary-fixed-dim': '#99F6E4',
        'on-secondary-fixed': '#042F2E',
        'on-secondary-fixed-variant': '#115E59',

        // Third Accent: Warm Gold / Amber (Reviews & Accents)
        'tertiary': '#D97706',
        'on-tertiary': '#FFFFFF',
        'tertiary-container': '#FEF3C7',
        'on-tertiary-container': '#78350F',
        'tertiary-fixed': '#FEF3C7',
        'tertiary-fixed-dim': '#FDE68A',
        'on-tertiary-fixed': '#451A03',
        'on-tertiary-fixed-variant': '#92400E',

        // Communication & Status
        'whatsapp': '#25D366',
        'whatsapp-dark': '#128C7E',
        'error': '#DC2626',
        'on-error': '#FFFFFF',
        'error-container': '#FEE2E2',
        'on-error-container': '#991B1B',
        
        // Aliases
        'background': '#F8FAFC',
        'on-background': '#0F172A',
        'surface-variant': '#F1F5F9',
      },
      boxShadow: {
        'card': '0 2px 12px -2px rgba(15, 23, 42, 0.06), 0 1px 4px -1px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 12px 32px -4px rgba(15, 23, 42, 0.1), 0 4px 12px -2px rgba(15, 23, 42, 0.05)',
        'glass': '0 8px 32px 0 rgba(14, 116, 144, 0.08)',
        'soft': '0 4px 20px -2px rgba(15, 23, 42, 0.05)',
      },
      borderRadius: {
        DEFAULT: '0.375rem',
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        full: '9999px',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
};

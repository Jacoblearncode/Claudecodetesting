import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        apex: {
          black: '#000000',
          void: '#050505',
          dark: '#0a0a0a',
          surface: '#111111',
          card: '#161616',
          border: '#222222',
          muted: '#333333',
          silver: '#888888',
          light: '#bbbbbb',
          white: '#f5f5f5',
          red: '#dc2626',
          'red-bright': '#ef4444',
          'red-dark': '#991b1b',
          'red-glow': 'rgba(220,38,38,0.15)',
          gold: '#c9a84c',
          'gold-light': '#e8c96f',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-bebas)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #111111 100%)',
        'card-gradient': 'linear-gradient(145deg, #161616, #0a0a0a)',
        'red-gradient': 'linear-gradient(135deg, #991b1b, #dc2626)',
        'glass': 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'red-glow': '0 0 30px rgba(220,38,38,0.3)',
        'red-glow-sm': '0 0 15px rgba(220,38,38,0.2)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.6)',
        'inner-border': 'inset 0 1px 0 rgba(255,255,255,0.05)',
      },
      animation: {
        'pulse-red': 'pulse-red 2s cubic-bezier(0.4,0,0.6,1) infinite',
        'shimmer': 'shimmer 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-red': {
          '0%, 100%': { boxShadow: '0 0 15px rgba(220,38,38,0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(220,38,38,0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scan: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
      },
      backdropBlur: { xs: '2px' },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [],
}

export default config

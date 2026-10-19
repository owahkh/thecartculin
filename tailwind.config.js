/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './*.html',
    './**/*.html',
    './assets/js/main.js',
    './assets/js/categories.js',
  ],
  theme: {
    extend: {
      colors: {
        /* ---- Royal / Elite Palette ---- */
        royal:       '#1B1033',
        'royal-800': '#241845',
        'royal-700': '#33215C',
        plum:        '#4A1942',
        maroon:      '#640017',
        gold:        '#C9A24B',
        'gold-light':'#E3C77B',
        'gold-dark': '#A67C2E',
        ivory:       '#F7F2E4',
        cream:       '#FCF9F1',
        pearl:       '#FFFFFF',
        ash:         '#6B6480',
        'ash-light': '#8E8474',
        'border-subtle': 'rgba(27,16,51,0.08)',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans:  ['Inter', 'sans-serif'],
      },
      boxShadow: {
        royal:     '0 18px 40px -18px rgba(27,16,51,0.45)',
        'royal-lg':'0 30px 70px -25px rgba(27,16,51,0.55)',
        'card': '0 2px 8px rgba(27,16,51,0.06)',
        'card-hover': '0 12px 32px rgba(27,16,51,0.12)',
      },
      letterSpacing: {
        luxe: '0.22em',
        'tracking-wide': '0.15em',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      maxWidth: {
        'content': '72rem',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
};
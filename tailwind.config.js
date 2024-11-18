const { hairlineWidth } = require('nativewind/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Primary color scale
        primary: {
          a0: '#601efa',
          a10: '#7a3dfc',
          a20: '#9057fd',
          a30: '#a46ffe',
          a40: '#b587ff',
          a50: '#c69fff',
        },
        // Surface colors
        surface: {
          a0: '#121325',
          a10: '#28283a',
          a20: '#3f3f4f',
          a30: '#585866',
          a40: '#71717e',
          a50: '#8c8c96',
        },
        // Mixed surface colors
        'surface-mixed': {
          a0: '#130d25',
          a10: '#28243a',
          a20: '#403b4f',
          a30: '#585466',
          a40: '#726e7e',
          a50: '#8c8996',
        },
        // Dark theme colors
        dark: {
          primary: 'hsl(var(--color-primary-a50))',
          surface: 'hsl(var(--color-surface-a0))',
          'surface-mixed': 'hsl(var(--color-surface-mixed-a0))',
        },
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

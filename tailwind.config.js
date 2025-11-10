/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#4F46E5',
          secondary: '#0EA5E9',
          accent: '#F97316',
          muted: '#64748B',
        },
      },
    },
  },
  plugins: [],
};

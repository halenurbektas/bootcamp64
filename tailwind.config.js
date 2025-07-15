/** @type {import('tailwindcss').Config} */
export default {
  // YENİ EKlenen SATIR:
  darkMode: 'class', // Bu satırı ekliyoruz.
  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.2s ease-out'
      }
    },
  },
  plugins: [],
}
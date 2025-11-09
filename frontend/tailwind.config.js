/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#991b1b',
          600: '#7f1d1d',
          700: '#991b1b',
          800: '#7f1d1d',
          900: '#7f1d1d',
        },
        accent: {
          burgundy: '#991b1b',
          red: '#dc2626',
          warm: '#b91c1c'
        }
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(153, 27, 27, 0.05) 0%, rgba(127, 29, 29, 0.05) 100%)',
        'gradient-collab': 'linear-gradient(to bottom right, #991b1b, #7f1d1d, #b91c1c)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}

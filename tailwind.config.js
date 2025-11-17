/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0B1220',
          800: '#0F172A',
          700: '#1E293B'
        },
        electric: {
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8'
        },
        surface: '#11182780',
        offwhite: '#F8FAFC'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px'
      },
      boxShadow: {
        glass: '0 10px 30px rgba(0,0,0,0.25)'
      }
    },
  },
  plugins: [],
}

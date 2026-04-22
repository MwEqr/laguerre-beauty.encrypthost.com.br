/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        premium: {
          50: '#fffafa',   // Fundo branco com leve toque quente
          100: '#ffe4e6',  // Vermelho super claro
          200: '#fecaca',  // Vermelho claro
          800: '#1a1a1a',  // Preto luxo (em vez de marrom)
          900: '#000000',  // Preto puro para cabeçalho/fundo escuro
        },
        accent: {
          light: '#f87171', // Vermelho vivo claro
          DEFAULT: '#dc2626', // Vermelho intenso principal (Logo)
          dark: '#991b1b',  // Vermelho escuro
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
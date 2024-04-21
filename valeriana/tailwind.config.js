/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary :{
          dark: 'var(--color-primary-dark)',
          base: 'var(--color-primary-base)',
          light: 'var(--color-primary-light)'
        },
        secondary: {
          base: 'var(--color-secondary-base)',
          light: 'var(--color-secondary-light)'
        },
        tertiary: {
          dark: 'var(--color-tertiary-dark)',
          light: 'var(--color-tertiary-light)'
        }
      }
    },
  },
  plugins: [],
}


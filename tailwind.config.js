/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors for GoMotors branding
        'gomotors': {
          'accent': '#ffd000', // Yellow accent color
          'nav': '#333333',    // Navbar background color
          'link': '#0000ff',   // Blue link color
          'hover': '#ffd000'   // Hover state color
        }
      },
      fontFamily: {
        'sans': ['var(--font-geist-sans)', 'Arial', 'sans-serif'],
        'mono': ['var(--font-geist-mono)', 'monospace'],
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        marquee2: 'marquee2 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
    },
  },
  plugins: [],
}; 
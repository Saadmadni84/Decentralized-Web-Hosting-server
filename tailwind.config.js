/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6366F1", // Indigo
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#A855F7", // Purple
          foreground: "#FFFFFF",
        },
        background: "#0f172a", // Slate 900
        foreground: "#f8fafc", // Slate 50
        card: {
          DEFAULT: "rgba(30, 41, 59, 0.5)", // Glassmorphism base
          foreground: "#f8fafc",
        },
        border: "rgba(148, 163, 184, 0.2)",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(to bottom right, #0f172a, #1e1b4b, #312e81)',
      },
    },
  },
  plugins: [],
};

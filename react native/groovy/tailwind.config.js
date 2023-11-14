/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./screens/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#3a2f3b",
      },
    },
  },
  plugins: [],
};

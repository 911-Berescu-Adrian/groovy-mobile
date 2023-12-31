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
        background: "#231B2A",
        accent: "#322330",
        metallic: "#B8BDCC",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all your React components
    "./.storybook/**/*.{js,jsx,ts,tsx}", // Include Storybook files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
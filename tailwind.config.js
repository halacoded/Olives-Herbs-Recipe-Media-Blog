/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        olive: {
          DEFAULT: "#344E41",
          light: "#A3B18A",
        },
      },
      fontFamily: {
        telugu: ['"Telugu MN"', "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

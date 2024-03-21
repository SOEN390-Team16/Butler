/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'profile-hero': "url('/src/pictures/editProfileHero.jpg')",
      }
    },
    fontFamily: {
      raleway: ["Raleway", "sans-serif"],
      inter: ["Inter", "sans-serif"],
    }
  },
  plugins: [],
};

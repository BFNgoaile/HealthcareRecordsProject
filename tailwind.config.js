module.exports = {
  purge: ['./src/**/*.{html,ts}'],
  // purge: false,
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'dark-modegray': '#202020',
        'dark-modegraylight': '#575757',
      }
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [require('@tailwindcss/typography')
],
};

import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      primary: colors.white,
      secondary: '#FFEA00',
      highlight: '#FF6A00',
      neutral: colors.gray,
    },
    fontFamily: {
      heading: ['Barlow', 'sans-serif'],
      body: ['Roboto', 'Inter'],
    },
    extend: {
      colors: {
        background: colors.black,
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [],
} satisfies Config;

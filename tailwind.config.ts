import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard'],
        maple: ['MaplestoryOTF', 'sans-serif'],
      },
    },
    colors: {
      primary: '#ED4264',
    },
  },
  plugins: [],
};
export default config;

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      pretendard: ['Pretendard'],
      maple: ['MaplestoryOTF'],
    },
    extend: {
      colors: {
        primary: '#ED4264',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['hover', 'focus'], // `hover` 및 `focus` 상태에서 배경색 변형 활성화
    },
  },
  plugins: [],
};
export default config;

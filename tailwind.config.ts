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
        gray900: '#171923',
        gray800: '#1A202C',
        gray700: '#2D3748',
        gray600: '#4A5568',
        gray500: '#718096',
        gray400: '#A0AEC0',
        gray300: '#CBD5E0',
        gray200: '#E2E8F0',
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

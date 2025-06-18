import type { Config } from 'tailwindcss';
import headlessuiPlugin from '@headlessui/tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './src/views/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@headlessui/theme/dist/**/*.{js,ts,jsx,tsx}',
    './node_modules/@headlessui/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      zIndex: {
        modal: '1000',
        dropdown: '50',
        overlay: '999',
      },
      backgroundColor: {
        'modal-overlay': 'rgba(0,0,0,0.5)',
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-out',
      },
      transitionProperty: {
        height: 'height',
        spacing: 'margin, padding',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      colors: {
        'hr-purple-default': '#732DCE',
        'hr-purple-bg': '#F4EFFB',
        'hr-purple-border': '#D8C7F7',
        'hr-purple-hover': '#5B1DB8',
        'hr-mint-default': '#01BDD7',
        'hr-yellow-default': '#FFA203',
        'hr-pink-default': '#FB1397',
        'hr-pink-bg': '#FEECF5',
        'hr-pink-border': '#FBC1E1',
        'hr-pink-hover': '#F5007A',
        'hr-danger-default': '#FF2E5F',
        'hr-danger-bg': '#FFF0F4',
        'hr-danger-border': '#FFC7D6',
        'hr-danger-hover': '#F7225A',
        'hr-success-default': '#2E5AFF',
        'hr-success-bg': '#F0F0FF',
        'hr-success-border': '#CDCFFE',
        'hr-success-hover': '#2656F2',
        'hr-white': '#FFFFFF',
        'hr-light': '#F1F1F5',
        'hr-gray-5': '#F6F7F8',
        'hr-gray-10': '#EDEFF2',
        'hr-gray-20': '#E0E2E6',
        'hr-gray-30': '#D5D7DD',
        'hr-gray-40': '#C2C5CC',
        'hr-gray-50': '#878B96',
        'hr-gray-60': '#5C606A',
        'hr-gray-70': '#4D525B',
        'hr-gray-80': '#31353E',
        'hr-gray-90': '#191B1F',
        'hr-kakao': '#FEE500',
        'hr-naver': '#03C75A',
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)', 'var(--font-notoSansKR)'],
      },
      fontSize: {
        'hr-h2': '2.25rem',
        'hr-h3': '1.75rem',
        'hr-h4': '1.5rem',
        'hr-h5': '1.25rem',
        'hr-b1': '1.125rem',
        'hr-b2': '1rem',
        'hr-b3': '.937rem',
        'hr-b4': '.875rem',
        'hr-b5': '.812rem',
        'hr-c1': '.75rem',
        'hr-c2': '.687rem',
        'hr-c3': '.625rem',
      },
      fontWeight: {
        'hr-bold': '700',
        'hr-semi-bold': '600',
        'hr-regular': '400',
      },
      lineHeight: {
        'hr-default': '130%',
        'hr-body': '150%',
      },
      padding: {
        '9': '36px',
      },
    },
  },
  plugins: [typography, headlessuiPlugin({ prefix: 'ui' })],
};

export default config;

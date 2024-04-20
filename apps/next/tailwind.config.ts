import type { Config } from 'tailwindcss';

const config: Config = {
  purge: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        darkBlack: '#1C1E20',
        darkRed: '#ED1A2F'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      borderRadius: {
        large: '30px',
        larger: '60px'
      }
    }
  },
  plugins: [],
  css: {
    active: true,
    purge: false,
    layers: ['components', 'utilities']
  }
};
export default config;

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'moonlight': '#EDEDED',
        'midnight': '#000000',
        'sapphire': '#218AFF',
      },
      fontFamily: {
        nohemi: ['Nohemi', 'helvetica', 'sans-serif'],
        jetbrains: ['Jetbrains Mono', 'monospace', 'sans-serif'],
        aspekta: ['Aspekta', 'sans-serif']
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#111827',
          dark: '#0B0F17',
          accent: '#B48C56',
          'accent-hover': '#9B7443',
          canvas: '#FAFAF9',
          surface: '#FFFFFF',
          muted: '#F3F4F6',
          border: '#E5E7EB',
          'border-dark': 'rgba(255, 255, 255, 0.1)',
          'text-primary': '#111827',
          'text-secondary': '#4B5563',
          'text-muted': '#6B7280',
          whatsapp: '#25D366',
          'whatsapp-hover': '#1EBE5D',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      maxWidth: {
        'container-sm': '640px',
        'container-md': '896px',
        'container-lg': '1152px',
        'container-xl': '1280px',
      },
      borderRadius: {
        sm: '2px',
        md: '4px',
        none: '0px',
      },
      boxShadow: {
        subtle: '0 1px 3px rgba(0, 0, 0, 0.05)',
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 2px 4px -2px rgba(0, 0, 0, 0.04)',
        overlay: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};

export default config;

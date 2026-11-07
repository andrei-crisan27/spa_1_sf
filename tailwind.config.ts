import type { Config } from 'tailwindcss';

/** Maps a CSS custom property holding "R G B" channels to a Tailwind color with alpha support. */
const token = (name: string) => `rgb(var(--color-${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: token('bg'),
        surface: token('surface'),
        'surface-muted': token('surface-muted'),
        'surface-sage': token('surface-sage'),
        border: token('border'),
        fg: token('fg'),
        muted: token('muted'),
        primary: {
          DEFAULT: token('primary'),
          hover: token('primary-hover'),
          fg: token('primary-fg'),
        },
        heading: token('heading'),
        header: { DEFAULT: token('header'), fg: token('header-fg') },
        accent: {
          DEFAULT: token('accent'),
          strong: token('accent-strong'),
          fg: token('accent-fg'),
        },
        sage: { DEFAULT: token('sage'), strong: token('sage-strong') },
        whatsapp: {
          DEFAULT: token('whatsapp'),
          hover: token('whatsapp-hover'),
          fg: token('whatsapp-fg'),
        },
        'on-image': { DEFAULT: token('on-image'), accent: token('on-image-accent') },
        scrim: token('scrim'),
        danger: token('danger'),
        success: token('success'),
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        prose: '70ch',
        container: '76rem',
      },
      spacing: {
        header: 'var(--header-height)',
        'header-condensed': 'var(--header-height-condensed)',
      },
      scrollMargin: {
        header: 'var(--header-height-condensed)',
      },
      borderRadius: {
        card: '1rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgb(var(--color-shadow) / 0.06), 0 8px 24px -8px rgb(var(--color-shadow) / 0.18)',
        lift: '0 2px 4px rgb(var(--color-shadow) / 0.08), 0 18px 40px -12px rgb(var(--color-shadow) / 0.28)',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
      zIndex: {
        header: '40',
        floating: '45',
        drawer: '50',
        modal: '60',
      },
    },
  },
  plugins: [],
} satisfies Config;

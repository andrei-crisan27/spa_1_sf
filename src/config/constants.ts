/** Shared behavioral constants — no magic numbers in components. */
export const SCROLL = {
  /** Pixels scrolled before the header condenses. */
  condenseThreshold: 24,
  /** Fraction of the viewport (below the header) used to decide the active section. */
  spyViewportRatio: 0.35,
  /** Pixels scrolled before "back to top" appears. */
  backToTopThreshold: 600,
} as const;

export const CAROUSEL = {
  autoAdvanceMs: 6000,
  swipeThresholdPx: 60,
  swipeVelocity: 400,
} as const;

export const COUNT_UP = {
  durationMs: 1600,
} as const;

export const FORM_RULES = {
  nameMinLength: 2,
  messageMinLength: 10,
  messageMaxLength: 500,
} as const;

export const STORAGE_KEYS = {
  theme: 'sf-theme',
} as const;

export const MEDIA = {
  desktop: '(min-width: 1024px)',
  tablet: '(min-width: 768px)',
  reducedMotion: '(prefers-reduced-motion: reduce)',
  prefersDark: '(prefers-color-scheme: dark)',
} as const;

export const ROUTES = {
  home: '/',
  randuieli: '/randuieli-crestine',
  ajutor: '/ajutor-de-inmormantare',
} as const;

export const SECTION_IDS = {
  top: 'sus',
  main: 'continut',
  hero: 'acasa',
  about: 'despre',
  services: 'servicii',
  gallery: 'galerie',
  contact: 'contact',
  contactForm: 'formular-contact',
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

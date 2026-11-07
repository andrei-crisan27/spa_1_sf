import type { PlaceholderImageData } from '@/components/ui/PlaceholderImage';

/** Home page copy. Replace lorem ipsum here only. */
export const heroContent = {
  carouselLabel: 'Galerie de prezentare',
  eyebrow: 'Lorem ipsum dolor',
  tagline: 'Lorem ipsum dolor sit amet, cu respect și grijă.',
  subline:
    'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  ctaCall: 'Sună acum',
  ctaWhatsApp: 'Scrie pe WhatsApp',
  slides: [
    {
      id: 'hero-1',
      alt: 'Lorem ipsum — imagine de prezentare 1',
      motif: 'candle',
      tone: 'navy',
      ratio: '16/9',
    },
    {
      id: 'hero-2',
      alt: 'Lorem ipsum — imagine de prezentare 2',
      motif: 'flower',
      tone: 'sage',
      ratio: '16/9',
    },
    {
      id: 'hero-3',
      alt: 'Lorem ipsum — imagine de prezentare 3',
      motif: 'dove',
      tone: 'navy',
      ratio: '16/9',
    },
    {
      id: 'hero-4',
      alt: 'Lorem ipsum — imagine de prezentare 4',
      motif: 'wreath',
      tone: 'gold',
      ratio: '16/9',
    },
    {
      id: 'hero-5',
      alt: 'Lorem ipsum — imagine de prezentare 5',
      motif: 'cross',
      tone: 'sage',
      ratio: '16/9',
    },
    {
      id: 'hero-6',
      alt: 'Lorem ipsum — imagine de prezentare 6',
      motif: 'candle',
      tone: 'stone',
      ratio: '16/9',
    },
    {
      id: 'hero-7',
      alt: 'Lorem ipsum — imagine de prezentare 7',
      motif: 'flower',
      tone: 'navy',
      ratio: '16/9',
    },
    {
      id: 'hero-8',
      alt: 'Lorem ipsum — imagine de prezentare 8',
      motif: 'dove',
      tone: 'gold',
      ratio: '16/9',
    },
  ] satisfies PlaceholderImageData[],
};

export const introContent = {
  /** City is appended from config/site.ts */
  headingPrefix: 'Servicii Funerare',
  badge: 'Non-stop',
  badgeNote: 'Lorem ipsum 24 de ore din 24, 7 zile din 7',
  paragraphs: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Maecenas faucibus mollis interdum.',
    'Vestibulum id ligula porta felis euismod semper. Cras mattis consectetur purus sit amet fermentum. Donec ullamcorper nulla non metus auctor fringilla, sed posuere consectetur est at lobortis.',
    'Nullam quis risus eget urna mollis ornare vel eu leo. Aenean lacinia bibendum nulla sed consectetur.',
  ],
  closing: 'Lorem ipsum dolor sit amet — suntem aici pentru dumneavoastră. Contactați-ne oricând.',
  closingCta: 'Contactați-ne',
};

export interface StatItem {
  id: string;
  value: number;
  suffix?: string;
  /** Shown instead of an animated number (e.g. "24/7"). */
  display?: string;
  label: string;
}

export const aboutContent = {
  eyebrow: 'Despre noi',
  heading: 'Despre',
  image: {
    id: 'about-1',
    alt: 'Lorem ipsum — imagine reprezentativă a echipei',
    motif: 'dove',
    tone: 'sage',
    ratio: '4/3',
  } satisfies PlaceholderImageData,
  paragraphs: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere consectetur est at lobortis. Curabitur blandit tempus porttitor. Etiam porta sem malesuada magna mollis euismod.',
    'Donec sed odio dui. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam eget risus varius blandit sit amet non magna.',
  ],
  values: ['Lorem ipsum respect', 'Dolor sit discreție', 'Amet consectetur empatie'],
  stats: [
    { id: 'available', value: 24, display: '24/7', label: 'Disponibilitate' },
    { id: 'years', value: 20, suffix: '+', label: 'Ani de experiență' },
    { id: 'families', value: 1500, suffix: '+', label: 'Familii ajutate' },
  ] satisfies StatItem[],
};

export const contactContent = {
  eyebrow: 'Contact',
  heading: 'Contact',
  intro:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scrieți-ne pe WhatsApp sau sunați-ne oricând.',
  form: {
    title: 'Trimiteți-ne un mesaj pe WhatsApp',
    nameLabel: 'Nume',
    namePlaceholder: 'Lorem Ipsum',
    phoneLabel: 'Număr de telefon',
    phonePlaceholder: '07xx xxx xxx',
    phoneHint: 'Ex.: 0722 123 456 sau +40 722 123 456',
    messageLabel: 'Mesaj',
    messagePlaceholder: 'Lorem ipsum dolor sit amet…',
    recipientLabel: 'Cu cine doriți să vorbiți?',
    submit: 'Trimite pe WhatsApp',
    counter: (current: number, max: number) => `${current}/${max}`,
    responseNote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Răspundem de regulă în câteva minute (placeholder).',
    errors: {
      nameRequired: 'Vă rugăm să introduceți numele.',
      nameTooShort: (min: number) => `Numele trebuie să aibă cel puțin ${min} caractere.`,
      phoneRequired: 'Vă rugăm să introduceți numărul de telefon.',
      phoneInvalid: 'Introduceți un număr valid din România (ex.: 07xx xxx xxx).',
      messageRequired: 'Vă rugăm să scrieți un mesaj.',
      messageTooShort: (min: number) => `Mesajul trebuie să aibă cel puțin ${min} caractere.`,
      messageTooLong: (max: number) => `Mesajul poate avea cel mult ${max} caractere.`,
    },
    success: {
      title: 'Se deschide WhatsApp…',
      body: 'Lorem ipsum dolor sit amet. Dacă fereastra nu s-a deschis, folosiți linkul de mai jos.',
      fallback: 'Deschide WhatsApp manual',
      reset: 'Trimite alt mesaj',
    },
  },
  /** {nume}, {telefon} and {mesaj} are replaced by buildWhatsAppLink. */
  whatsAppTemplate: 'Bună ziua, sunt {nume}. Număr de telefon: {telefon}.\n{mesaj}',
  details: {
    title: 'Date de contact',
    phones: 'Telefon',
    email: 'Email',
    address: 'Adresă',
    hours: 'Program',
    call: (name: string) => `Sună pe ${name}`,
    whatsapp: (name: string) => `WhatsApp ${name}`,
    mapLabel: 'Hartă (placeholder)',
    mapNote: 'Lorem ipsum — aici va fi afișată harta locației.',
  },
};

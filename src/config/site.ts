import { ROUTES, SECTION_IDS, type SectionId } from './constants';

export interface Owner {
  id: string;
  name: string;
  /** International format, e.g. +40700000001 */
  phone: string;
  role: string;
}

export type NavItem =
  | { kind: 'route'; label: string; to: string }
  | { kind: 'anchor'; label: string; sectionId: SectionId };

export interface WorkingHours {
  label: string;
  value: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: 'facebook' | 'instagram' | 'youtube';
}

export interface SiteConfig {
  name: string;
  city: string;
  legalName: string;
  cui: string;
  regCom: string;
  address: { street: string; city: string; county: string; full: string };
  emails: { primary: string };
  workingHours: WorkingHours[];
  owners: [Owner, Owner];
  social: SocialLink[];
  anpc: { sal: string; sol: string };
  nav: NavItem[];
}

/** Single source of truth for business data. Replace placeholders here. */
export const site: SiteConfig = {
  name: 'Servicii Funerare',
  city: '[Oraș]',
  legalName: 'Lorem Ipsum S.R.L.',
  cui: 'RO00000000',
  regCom: 'J00/0000/2000',
  address: {
    street: 'Str. Lorem Ipsum nr. 1',
    city: '[Oraș]',
    county: 'Jud. [Județ]',
    full: 'Str. Lorem Ipsum nr. 1, [Oraș], Jud. [Județ]',
  },
  emails: { primary: 'contact@exemplu.ro' },
  workingHours: [
    { label: 'Luni – Vineri', value: '08:00 – 20:00' },
    { label: 'Sâmbătă – Duminică', value: '09:00 – 16:00' },
    { label: 'Urgențe', value: 'Non-stop, 24/7' },
  ],
  owners: [
    { id: 'owner-1', name: 'Nume Prenume 1', phone: '+40700000001', role: 'Lorem ipsum' },
    { id: 'owner-2', name: 'Nume Prenume 2', phone: '+40700000002', role: 'Dolor sit amet' },
  ],
  social: [
    { label: 'Facebook', href: '#', icon: 'facebook' },
    { label: 'Instagram', href: '#', icon: 'instagram' },
    { label: 'YouTube', href: '#', icon: 'youtube' },
  ],
  anpc: {
    sal: 'https://anpc.ro/ce-este-sal/',
    sol: 'https://ec.europa.eu/consumers/odr',
  },
  nav: [
    { kind: 'route', label: 'Prima pagină', to: ROUTES.home },
    { kind: 'anchor', label: 'Despre', sectionId: SECTION_IDS.about },
    { kind: 'anchor', label: 'Servicii', sectionId: SECTION_IDS.services },
    { kind: 'route', label: 'Rânduieli creștine', to: ROUTES.randuieli },
    { kind: 'route', label: 'Ajutor de înmormântare', to: ROUTES.ajutor },
    { kind: 'anchor', label: 'Galerie foto', sectionId: SECTION_IDS.gallery },
    { kind: 'anchor', label: 'Contact', sectionId: SECTION_IDS.contact },
  ],
};

export const primaryOwner = site.owners[0];

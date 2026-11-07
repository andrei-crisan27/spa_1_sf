import type { TimelineEntry } from '@/components/ui/Timeline';

export interface ArticleSection {
  id: string;
  heading: string;
  paragraphs: string[];
}

const LOREM_A =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.';
const LOREM_B =
  'Vestibulum id ligula porta felis euismod semper. Cras mattis consectetur purus sit amet fermentum. Donec ullamcorper nulla non metus auctor fringilla. Maecenas sed diam eget risus varius blandit sit amet non magna.';
const LOREM_C =
  'Nullam quis risus eget urna mollis ornare vel eu leo. Curabitur blandit tempus porttitor. Etiam porta sem malesuada magna mollis euismod. Sed posuere consectetur est at lobortis.';

export const randuieliContent = {
  title: 'Rânduieli creștine',
  eyebrow: 'Tradiție și credință',
  lead: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rânduielile creștine, pe scurt — text provizoriu.',
  sections: [
    { id: 'coliva', heading: 'Coliva', paragraphs: [LOREM_A, LOREM_B] },
    {
      id: 'trupul-defunctului',
      heading: 'Trupul defunctului',
      paragraphs: [LOREM_B, LOREM_C, LOREM_A],
    },
    { id: 'inmormantarea', heading: 'Înmormântarea', paragraphs: [LOREM_C, LOREM_A] },
    { id: 'doliul', heading: 'Doliul', paragraphs: [LOREM_A, LOREM_C] },
    { id: 'pomenirea-mortilor', heading: 'Pomenirea morților', paragraphs: [LOREM_B] },
  ] satisfies ArticleSection[],
  timelineLabel: 'Datele pomenirilor',
  timeline: [
    {
      id: '3-zile',
      label: '3 zile',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: '9-zile',
      label: '9 zile',
      description: 'Vestibulum id ligula porta felis euismod semper.',
    },
    {
      id: '40-zile',
      label: '40 de zile',
      description: 'Cras mattis consectetur purus sit amet fermentum.',
    },
    {
      id: '3-luni',
      label: '3 luni',
      description: 'Donec ullamcorper nulla non metus auctor fringilla.',
    },
    {
      id: '6-luni',
      label: '6 luni',
      description: 'Nullam quis risus eget urna mollis ornare vel eu leo.',
    },
    {
      id: '9-luni',
      label: '9 luni',
      description: 'Aenean lacinia bibendum nulla sed consectetur.',
    },
    { id: '1-an', label: '1 an', description: 'Maecenas faucibus mollis interdum.' },
    {
      id: 'anual-7-ani',
      label: 'Anual, timp de 7 ani',
      description: 'Curabitur blandit tempus porttitor. Etiam porta sem malesuada.',
    },
  ] satisfies TimelineEntry[],
};

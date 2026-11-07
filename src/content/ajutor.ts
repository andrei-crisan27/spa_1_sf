export interface AidCategory {
  id: string;
  label: string;
  documentsTitle: string;
  documents: string[];
  whereTitle: string;
  where: string;
  importantTitle: string;
  important: string;
}

const DOCUMENTS_TITLE = 'Documente necesare';
const WHERE_TITLE = 'Unde depuneți cererea';
const IMPORTANT_TITLE = 'IMPORTANT';

export const ajutorContent = {
  title: 'Ajutor de înmormântare',
  eyebrow: 'Ajutor de deces',
  lead: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Informații provizorii despre obținerea ajutorului de înmormântare.',
  intro: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',
    'Vestibulum id ligula porta felis euismod semper. Cras mattis consectetur purus sit amet fermentum.',
  ],
  categoriesLabel: 'Categorii de beneficiari',
  categoriesHeading: 'Alegeți situația dumneavoastră',
  categories: [
    {
      id: 'membru-familie',
      label: 'Un membru al familiei este asigurat',
      documentsTitle: DOCUMENTS_TITLE,
      documents: [
        'Act de identitate — lorem ipsum',
        'Cerere — dolor sit amet',
        'Certificat de deces original',
        'Acte doveditoare ale cheltuielilor',
        'Lorem ipsum dovada calității de asigurat',
      ],
      whereTitle: WHERE_TITLE,
      where:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere consectetur est at lobortis.',
      importantTitle: IMPORTANT_TITLE,
      important:
        'Lorem ipsum dolor sit amet — cererea se depune într-un termen limitat (placeholder).',
    },
    {
      id: 'militar',
      label: 'Militar',
      documentsTitle: DOCUMENTS_TITLE,
      documents: [
        'Act de identitate — lorem ipsum',
        'Cerere — dolor sit amet',
        'Certificat de deces original',
        'Acte doveditoare ale cheltuielilor',
        'Lorem ipsum adeverință de la unitate',
      ],
      whereTitle: WHERE_TITLE,
      where:
        'Donec ullamcorper nulla non metus auctor fringilla. Nullam quis risus eget urna mollis ornare.',
      importantTitle: IMPORTANT_TITLE,
      important: 'Cras mattis consectetur purus sit amet fermentum (placeholder).',
    },
    {
      id: 'angajat',
      label: 'Angajat',
      documentsTitle: DOCUMENTS_TITLE,
      documents: [
        'Act de identitate — lorem ipsum',
        'Cerere — dolor sit amet',
        'Certificat de deces original',
        'Acte doveditoare ale cheltuielilor',
        'Lorem ipsum adeverință de la angajator',
      ],
      whereTitle: WHERE_TITLE,
      where:
        'Maecenas sed diam eget risus varius blandit sit amet non magna. Curabitur blandit tempus porttitor.',
      importantTitle: IMPORTANT_TITLE,
      important: 'Aenean lacinia bibendum nulla sed consectetur (placeholder).',
    },
    {
      id: 'pensionar',
      label: 'Pensionar',
      documentsTitle: DOCUMENTS_TITLE,
      documents: [
        'Act de identitate — lorem ipsum',
        'Cerere — dolor sit amet',
        'Certificat de deces original',
        'Acte doveditoare ale cheltuielilor',
        'Lorem ipsum ultimul talon de pensie',
      ],
      whereTitle: WHERE_TITLE,
      where:
        'Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo.',
      importantTitle: IMPORTANT_TITLE,
      important: 'Vestibulum id ligula porta felis euismod semper (placeholder).',
    },
  ] satisfies AidCategory[],
  cta: {
    title: 'Vă ajutăm cu întocmirea dosarului',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Contactați-ne și ne ocupăm noi de acte.',
    button: 'Contactați-ne',
  },
};

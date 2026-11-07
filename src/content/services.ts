export type ServiceIcon =
  | 'consult'
  | 'coffin'
  | 'flowers'
  | 'transport'
  | 'memorial'
  | 'bread'
  | 'catering'
  | 'dressing'
  | 'chapel'
  | 'documents'
  | 'pension';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: ServiceIcon;
}

export const servicesContent = {
  eyebrow: 'Servicii',
  heading: 'Suntem alături de familiile îndoliate, cu o gamă completă de servicii:',
  intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
  items: [
    {
      id: 'consultanta',
      icon: 'consult',
      title: 'Consultanță pentru alegerea pachetului',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.',
    },
    {
      id: 'sicrie',
      icon: 'coffin',
      title: 'Sicrie, urne și cruci',
      description:
        'Vestibulum id ligula porta felis euismod semper. Cras mattis consectetur purus sit amet.',
    },
    {
      id: 'coroane',
      icon: 'flowers',
      title: 'Coroane, flori și lumânări',
      description:
        'Donec ullamcorper nulla non metus auctor fringilla. Nullam quis risus eget urna mollis.',
    },
    {
      id: 'transport',
      icon: 'transport',
      title: 'Transport funerar autorizat',
      description:
        'Aenean lacinia bibendum nulla sed consectetur. Maecenas faucibus mollis interdum.',
    },
    {
      id: 'parastas',
      icon: 'memorial',
      title: 'Organizarea parastasului',
      description:
        'Curabitur blandit tempus porttitor. Etiam porta sem malesuada magna mollis euismod.',
    },
    {
      id: 'coliva',
      icon: 'bread',
      title: 'Coliva și colaci',
      description:
        'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum.',
    },
    {
      id: 'catering',
      icon: 'catering',
      title: 'Catering',
      description:
        'Maecenas sed diam eget risus varius blandit sit amet non magna. Donec sed odio dui.',
    },
    {
      id: 'imbracat',
      icon: 'dressing',
      title: 'Îmbrăcat și servicii cosmetice',
      description:
        'Sed posuere consectetur est at lobortis. Morbi leo risus, porta ac consectetur ac.',
    },
    {
      id: 'capela',
      icon: 'chapel',
      title: 'Capelă frigorifică (închiriere)',
      description:
        'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vivamus sagittis lacus.',
    },
    {
      id: 'acte',
      icon: 'documents',
      title: 'Ajutor la obținerea actelor (certificat de deces, adeverință de înmormântare)',
      description:
        'Nulla vitae elit libero, a pharetra augue. Duis mollis, est non commodo luctus.',
    },
    {
      id: 'dosar-pensii',
      icon: 'pension',
      title: 'Întocmirea dosarului pentru ajutorul de deces de la Casa de Pensii',
      description:
        'Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Etiam porta sem.',
    },
  ] satisfies ServiceItem[],
};

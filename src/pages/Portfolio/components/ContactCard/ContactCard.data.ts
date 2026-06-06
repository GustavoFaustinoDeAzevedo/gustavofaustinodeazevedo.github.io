import { ContactCardItem, LeftSideCardLanguage } from './ContactCard.types';

export const contactCard: ContactCardItem[] = [
  {
    icon: 'linkedin',
    text: 'LinkedIn',
    href: 'https://www.linkedin.com/in/gustavo-faustino-de-azevedo/',
  },
  {
    icon: 'github',
    text: 'GitHub',
    href: 'https://github.com/GustavoFaustinoDeAzevedo',
  },
  {
    icon: 'phone',
    text: '(84) 99205-7810',
    href: 'tel:+5584992057810',
  },
  {
    icon: 'whatsapp',
    text: '(84) 99205-7810',
    href: 'https://wa.me/5584992057810',
  },
  {
    icon: 'email',
    text: 'gustavofaustino18@hotmail.com',
    href: 'mailto:gustavofaustino18@hotmail.com',
  },
];

export const leftSideCardLanguage: LeftSideCardLanguage = {
  por: {
    cardTitle: 'Informações de contato e redes sociais',
    country: 'Brasil',
  },
  eng: {
    cardTitle: 'Contact information and social networks',
    country: 'Brazil',
  },
};

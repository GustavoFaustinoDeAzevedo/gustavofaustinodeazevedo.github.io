import { Language } from '@/store/slices/settings/settingsSlice.types';
export type ContactCardItem = {
  icon: 'linkedin' | 'github' | 'phone' | 'whatsapp' | 'email';
  text: string;
  href: string;
};

export type LanguageCard = {
  cardTitle: string;
  country: string;
};

export type LeftSideCardLanguage = Record<Language, LanguageCard>;

import { Language } from '@/store/slices/settings/settingsSlice';
import { changeBackgroundTextContent } from '../data/changeBackground.data';

type Range = {
  min: string;
  max: string;
  default: string;
};

type FilterData = {
  id: string;
  label: string;
  step: number;
  range: Range;
};

type FilterList = {
  [key: string]: FilterData;
};

export type FilterListLanguage = {
  por: FilterList;
  eng: FilterList;
};

type Filter = {
  legend: string;
  options: FilterListLanguage;
};

type Picker = {
  legend: string;
  button: string;
};

type Settings = {
  filter: Filter;
  picker: Picker;
};

export type Choice = {
  id: string;
  label: string;
  title: string;
  settings: Settings;
};

export type Choices = {
  image: Choice;
  color: Choice;
};

type LanguageContent = {
  legend: string;
  choices: Choices;
};

export type BackgroundTextContent = {
  eng: LanguageContent;
  por: LanguageContent;
};

type LanguageKey = keyof typeof changeBackgroundTextContent;
export type RootType = (typeof changeBackgroundTextContent)[LanguageKey];

export type HandleChangeBackground = {
  backgroundImage?: string;
  isBackgroundImage?: boolean;
};

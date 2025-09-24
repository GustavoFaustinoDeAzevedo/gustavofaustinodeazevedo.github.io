import { changeBackgroundTextContent } from '../data/changeBackground.data';

type Range = {};

export type FilterData = {
  id: string;
  label: string;
  step: number;
  min: number;
  max: number;
  default: number;
};

export type FilterList = {
  [key: string]: FilterData;
};

export type FilterListLanguage = {
  por: FilterList;
  eng: FilterList;
};
export type Filter = {
  legend: string;
  options: FilterList;
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

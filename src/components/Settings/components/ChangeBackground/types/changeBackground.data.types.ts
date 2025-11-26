import { EffectValues, FilterValues } from '@/store/slices/settings';
import { changeBackgroundTextContent } from '../data/changeBackground.data';
import { SliderData } from '@components/ui/Slider/SliderItem';
import { ColorGradientsList, GradientValues } from '../data/colorFilters.data';

export type FilterList = {
  [key: string]: SliderData;
};

export type EffectList = {
  [key: string]: GradientValues;
};

export type FilterListLanguage = {
  por: FilterList;
  eng: FilterList;
};
export type Filter = {
  legend: string;
  options: FilterList;
};

export type Effect = {
  legend: string;
  options: EffectList;
};

type Picker = {
  legend: string;
  button: string;
};

type Settings = {
  effect?: Effect;
  filter?: Filter;
  title: string;
  picker: Picker;
};

export type ImageChoice = {
  id: string;
  label: string;
  title: string;
  value: string;
  settings: Settings;
};

export type ColorChoice = {
  id: string;
  label: string;
  title: string;
  value: string;
  settings: Settings;
};

export type Choices = {
  image: ImageChoice;
  color: ColorChoice;
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
  desktopBackgroundColor?: string;
  desktopBackgroundImage?: string;
  desktopBackgroundEffect?: GradientValues;
  desktopBackgroundFilter?: FilterValues;
  isBackgroundImage?: boolean;
};

type FilterData = {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  default: number;
};

export type FilterList = {
  [key: string]: FilterData;
};

type Filter = {
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

type Choices = {
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

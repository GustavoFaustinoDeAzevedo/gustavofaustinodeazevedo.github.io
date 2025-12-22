import { Language } from '@/store/slices/settings';
import { FilterListLanguage } from '../types/changeBackground.data.types';

type FilterConfig = {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  default: number;
};

export const filterConfigs = {
  brightness: { min: 0.5, max: 1.5, step: 0.05, default: 1 },
  contrast: { min: 0.5, max: 2, step: 0.1, default: 1 },
  saturation: { min: 0.5, max: 2, step: 0.1, default: 1 },
  hue: { min: 0, max: 360, step: 1, default: 0 },
  grayscale: { min: 0, max: 1, step: 0.1, default: 0 },
  sepia: { min: 0, max: 1, step: 0.1, default: 0 },
  invert: { min: 0, max: 1, step: 0.1, default: 0 },
  blur: { min: 0, max: 10, step: 0.5, default: 0 },
};

export const filterLabels = {
  por: {
    brightness: 'Brilho',
    contrast: 'Contraste',
    saturation: 'Saturação',
    hue: 'Tonalidade',
    grayscale: 'Monocromia',
    sepia: 'Sépia',
    invert: 'Inversão',
    blur: 'Desfoque',
  },
  eng: {
    brightness: 'Brightness',
    contrast: 'Contrast',
    saturation: 'Saturation',
    hue: 'HUE',
    grayscale: 'Grayscale',
    sepia: 'Sepia',
    invert: 'Invert',
    blur: 'Blur',
  },
};

export const getImageFilters = (
  lang: Language
): Record<string, FilterConfig> => {
  return Object.keys(filterConfigs).reduce((acc, id) => {
    acc[id] = {
      id,
      label: filterLabels[lang][id as keyof (typeof filterLabels)[typeof lang]],
      ...filterConfigs[id as keyof typeof filterConfigs],
    };
    return acc;
  }, {} as Record<string, FilterConfig>);
};

export const imageFilters = {
  eng: getImageFilters('eng'),
  por: getImageFilters('por'),
};

export type FilterValues = {
  brightness: number;
  contrast: number;
  saturation: number;
  hue: number;
  grayscale: number;
  sepia: number;
  invert: number;
  blur: number;
};

export type Preset = {
  id: string;
  name: string;
  values: FilterValues;
};

export type PresetList = {
  [Language in 'eng' | 'por']: Preset[];
};

const presetValues = {
  custom: {
    brightness: 1,
    contrast: 1,
    saturation: 1,
    hue: 0,
    grayscale: 0,
    sepia: 0,
    invert: 0,
    blur: 0,
  },
  default: {
    brightness: 1,
    contrast: 1,
    saturation: 1,
    hue: 0,
    grayscale: 0,
    sepia: 0,
    invert: 0,
    blur: 0,
  },
  vintage: {
    brightness: 0.9,
    contrast: 1.1,
    saturation: 0.7,
    hue: 30,
    grayscale: 0.1,
    sepia: 0.4,
    invert: 0,
    blur: 0,
  },
  neon: {
    brightness: 1.2,
    contrast: 1.3,
    saturation: 1.5,
    hue: 0,
    grayscale: 0,
    sepia: 0,
    invert: 0,
    blur: 0,
  },
  ice: {
    brightness: 1.05,
    contrast: 1.2,
    saturation: 0.8,
    hue: 210,
    grayscale: 0.1,
    sepia: 0,
    invert: 0,
    blur: 0,
  },
  warm: {
    brightness: 1.1,
    contrast: 1.0,
    saturation: 1.2,
    hue: 40,
    grayscale: 0,
    sepia: 0,
    invert: 0,
    blur: 0,
  },
  soft: {
    brightness: 1.0,
    contrast: 0.9,
    saturation: 0.6,
    hue: 0,
    grayscale: 0.05,
    sepia: 0,
    invert: 0,
    blur: 0,
  },
  monochrome: {
    brightness: 1.0,
    contrast: 1.2,
    saturation: 0,
    hue: 0,
    grayscale: 1,
    sepia: 0,
    invert: 0,
    blur: 0,
  },
  sunset: {
    brightness: 1.1,
    contrast: 1.05,
    saturation: 1.3,
    hue: 25,
    grayscale: 0,
    sepia: 0,
    invert: 0,
    blur: 0,
  },
  foggy: {
    brightness: 0.95,
    contrast: 0.8,
    saturation: 0.5,
    hue: 0,
    grayscale: 0.2,
    sepia: 0.1,
    invert: 0,
    blur: 2,
  },
  cyberpunk: {
    brightness: 1.2,
    contrast: 1.4,
    saturation: 1.6,
    hue: 280,
    grayscale: 0,
    sepia: 0,
    invert: 0.1,
    blur: 0,
  },
  noir: {
    brightness: 0.8,
    contrast: 1.3,
    saturation: 0.2,
    hue: 0,
    grayscale: 0.8,
    sepia: 0.3,
    invert: 0,
    blur: 0,
  },
  pastel: {
    brightness: 1.1,
    contrast: 0.9,
    saturation: 0.6,
    hue: 320,
    grayscale: 0,
    sepia: 0.2,
    invert: 0,
    blur: 1,
  },
  dreamy: {
    brightness: 1.3,
    contrast: 1.0,
    saturation: 1.2,
    hue: 260,
    grayscale: 0.1,
    sepia: 0,
    invert: 0,
    blur: 0,
  },
  blaze: {
    brightness: 1.2,
    contrast: 1.3,
    saturation: 1.4,
    hue: 15,
    grayscale: 0,
    sepia: 0.3,
    invert: 0,
    blur: 0,
  },
  glacier: {
    brightness: 1.1,
    contrast: 1.0,
    saturation: 0.8,
    hue: 200,
    grayscale: 0.1,
    sepia: 0,
    invert: 0,
    blur: 1,
  },
  zombie: {
    brightness: 0.9,
    contrast: 0.8,
    saturation: 0.3,
    hue: 120,
    grayscale: 0.4,
    sepia: 0.2,
    invert: 0.2,
    blur: 1,
  },
  mirror_world: {
    brightness: 1.0,
    contrast: 1.5,
    saturation: 1.0,
    hue: 0,
    grayscale: 0,
    sepia: 0,
    invert: 1,
    blur: 0,
  },
  galaxy: {
    brightness: 1.2,
    contrast: 1.2,
    saturation: 1.5,
    hue: 260,
    grayscale: 0,
    sepia: 0.1,
    invert: 0,
    blur: 2,
  },
  mystic: {
    brightness: 0.85,
    contrast: 1.1,
    saturation: 0.5,
    hue: 300,
    grayscale: 0.3,
    sepia: 0.2,
    invert: 0,
    blur: 0,
  },
  clean: {
    brightness: 1.0,
    contrast: 1.0,
    saturation: 0.8,
    hue: 0,
    grayscale: 0,
    sepia: 0,
    invert: 0,
    blur: 0,
  },
};

const presetNames = {
  custom: { por: 'Personalizado', eng: 'Custom' },
  default: { por: 'Padrão', eng: 'Default' },
  vintage: { por: 'Vintage', eng: 'Vintage' },
  neon: { por: 'Neon', eng: 'Neon' },
  ice: { por: 'Frio', eng: 'Cool' },
  warm: { por: 'Quente', eng: 'Warm' },
  soft: { por: 'Suave', eng: 'Soft' },
  monochrome: { por: 'Monocromático', eng: 'Monochrome' },
  sunset: { por: 'Pôr do Sol', eng: 'Sunset' },
  foggy: { por: 'Nebuloso', eng: 'Foggy' },
  cyberpunk: { por: 'Cyberpunk', eng: 'Cyberpunk' },
  noir: { por: 'Noir', eng: 'Noir' },
  pastel: { por: 'Pastel', eng: 'Pastel' },
  dreamy: { por: 'Sonhador', eng: 'Dreamy' },
  blaze: { por: 'Chamas', eng: 'Blaze' },
  glacier: { por: 'Geleira', eng: 'Glacier' },
  zombie: { por: 'Zumbi', eng: 'Zombie' },
  mirror_world: { por: 'Mundo Espelhado', eng: 'Mirror World' },
  galaxy: { por: 'Galáxia', eng: 'Galaxy' },
  mystic: { por: 'Místico', eng: 'Mystic' },
  clean: { por: 'Limpo', eng: 'Clean' },
};

export const getPresetList = (lang: Language): Preset[] => {
  return Object.keys(presetValues).map((id) => ({
    id,
    name: presetNames[id as keyof typeof presetNames]?.[lang] || id,
    values: presetValues[id as keyof typeof presetValues],
  }));
};

export const presetList: PresetList = {
  por: getPresetList('por'),
  eng: getPresetList('eng'),
};

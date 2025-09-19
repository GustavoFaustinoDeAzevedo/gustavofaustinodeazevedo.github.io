import { FilterListLanguage } from '../types/changeBackground.data.types';

export const colorFilters: FilterListLanguage = {
  por: {
    brightness: {
      id: 'brightness',
      label: 'Brilho',
      min: 0.5,
      max: 1.5,
      step: 0.05,
      default: 1,
    },
  },
  eng: {
    brightness: {
      id: 'brightness',
      label: 'Brightness',
      min: 0.5,
      max: 1.5,
      step: 0.05,
      default: 1,
    },
  },
};

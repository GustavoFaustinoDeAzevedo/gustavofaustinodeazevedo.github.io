import { repeat } from 'lodash';
import { FilterListLanguage } from '../types/changeBackground.data.types';

export const colorGradients: FilterListLanguage = {
  por: {
    none: {
      id: 'none',
      label: 'Nenhum',
      min: 0,
      max: 0,
      step: 0,
      default: 0,
    },
    linear: {
      id: 'linear',
      label: 'Linear',
      min: 0,
      max: 360,
      step: 15,
      default: 0,
    },
    conic: {
      id: 'conic',
      label: 'Cônico',
      min: 5,
      max: 100,
      step: 5,
      default: 5,
    },
    radial: {
      id: 'radial',
      label: 'Radial',
      min: 5,
      max: 100,
      step: 5,
      default: 5,
    },
  },
  eng: {
    none: {
      id: 'none',
      label: 'None',
      min: 0,
      max: 0,
      step: 0,
      default: 0,
    },
    linear: {
      id: 'linear',
      label: 'Linear',
      min: 0,
      max: 360,
      step: 15,
      default: 0,
    },
    conic: {
      id: 'conic',
      label: 'Conic',
      min: 5,
      max: 100,
      step: 5,
      default: 5,
    },
    radial: {
      id: 'radial',
      label: 'Radial',
      min: 5,
      max: 100,
      step: 5,
      default: 5,
    },
  },
};

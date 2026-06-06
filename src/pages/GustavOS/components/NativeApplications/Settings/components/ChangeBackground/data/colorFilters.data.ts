export type GradientValues = {
  id: string;
  label: string;
  value: string;
};

export type ColorGradientsList = {
  [lang: string]: Record<string, GradientValues>;
};

export const colorGradients: ColorGradientsList = {
  por: {
    linear: {
      id: 'linear',
      label: 'Contínuo',
      value: 'linear',

    },
    radial: {
      id: 'radial',
      label: 'Circular',
      value: 'radial',
    },
    conic: {
      id: 'conic',
      label: 'Cônico',
      value: 'conic',
    },
  },
  eng: {
    linear: {
      id: 'linear',
      label: 'Continuous',
      value: 'linear',
    },
    radial: {
      id: 'radial',
      label: 'Circular',
      value: 'radial',
    },
    conic: {
      id: 'conic',
      label: 'Conic',
      value: 'conic',
    },
  },
};

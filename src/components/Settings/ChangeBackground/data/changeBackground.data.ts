import { BackgroundTextContent } from '../types/changeBackground.data.types';
import { filters } from './filters.data';

export const changeBackgroundTextContent: BackgroundTextContent = {
  eng: {
    legend: 'Display',
    choices: {
      image: {
        id: 'image',
        label: 'Image',
        title: 'Background Preview',
        settings: {
          filter: {
            legend: 'Filter',
            options: filters,
          },
          picker: {
            legend: 'Image',
            button: 'Or Select an Image File',
          },
        },
      },
      color: {
        id: 'color',
        label: 'Color',
        title: 'Background Preview',
        settings: {
          filter: {
            legend: 'Filter',
            options: {
              brightness: {
                id: 'brightness',
                label: 'Brightness',
                range: { min: '0.5', max: '1.5', default: '1' },
              },
              contrast: {
                id: 'contrast',
                label: 'Contrast',
                range: { min: '0.5', max: '2', default: '1' },
              },
              saturation: {
                id: 'saturation',
                label: 'Saturation',
                range: { min: '0.5', max: '2', default: '1' },
              },
              hue: {
                id: 'hue',
                label: 'HUE',
                range: { min: '0', max: '360' },
              },
            },
          },
          picker: {
            legend: 'Color',
            button: 'Default Color',
          },
        },
      },
    },
  },
  por: {
    legend: 'Exibição',
    choices: {
      image: {
        id: 'image',
        label: 'Imagem',
        title: 'Pré-Visualização de Fundo',
        settings: {
          filter: {
            legend: 'Filtro',
            options: ['Brilho', 'Contraste', 'Saturação', 'Tonalidade'],
          },
          picker: {
            legend: 'Imagem',
            button: 'Ou Selecione um Arquivo de Imagem',
          },
        },
      },
      color: {
        id: 'color',
        label: 'Cor',
        title: 'Pré-Visualização de Fundo',
        settings: {
          filter: {
            legend: 'Filtro',
            options: {
              brightness: {
                id: 'brightness',
                label: 'Brilho',
                range: { min: '0.5', max: '1.5', default: '1' },
              },
              contrast: {
                id: 'contrast',
                label: 'Contraste',
                range: { min: '0.5', max: '2', default: '1' },
              },
              saturation: {
                id: 'saturation',
                label: 'Saturação',
                range: { min: '0.5', max: '2', default: '1' },
              },
              hue: {
                id: 'hue',
                label: 'Tonalidade',
                range: { min: '0', max: '360', default: '0' },
              },
            },
          },
          picker: {
            legend: 'Cor',
            button: 'Cor Padrão',
          },
        },
      },
    },
  },
};

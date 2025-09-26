import { BackgroundTextContent } from '../types/changeBackground.data.types';
import { colorFilters } from './colorFilters.data';
import { imageFilters } from './imageFilters.data';

export const changeBackgroundTextContent: BackgroundTextContent = {
  eng: {
    legend: 'Display',
    choices: {
      image: {
        id: 'image',
        label: 'Image',
        value: 'image',
        title: 'Background Preview',
        settings: {
          filter: {
            legend: 'Filter',
            options: imageFilters.eng,
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
        value: 'color',
        title: 'Background Preview',
        settings: {
          filter: {
            legend: 'Filter',
            options: colorFilters.eng,
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
        value: 'image',
        title: 'Pré-Visualização de Fundo',
        settings: {
          filter: {
            legend: 'Filtro',
            options: imageFilters.por,
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
        value: 'color',
        title: 'Pré-Visualização de Fundo',
        settings: {
          filter: {
            legend: 'Filtro',
            options: colorFilters.por,
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

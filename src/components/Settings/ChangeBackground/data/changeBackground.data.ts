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
          title: 'Customize Background',
          filter: {
            legend: 'Filter', 
            options: imageFilters.eng,
          },
          picker: {
            legend: 'Image',
            button: 'Upload Image',
          },
        },
      },
      color: {
        id: 'color',
        label: 'Color',
        value: 'color',
        title: 'Background Preview',
        settings: {
          title: 'Customize Background',
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
          title: 'Personalizar Fundo',
          filter: {
            legend: 'Filtro',
            options: imageFilters.por,
          },
          picker: {
            legend: 'Imagem',
            button: 'Carregar Imagem',
          },
        },
      },
      color: {
        id: 'color',
        label: 'Cor',
        value: 'color',
        title: 'Pré-Visualização de Fundo',
        settings: {
          title: 'Personalizar Fundo',
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

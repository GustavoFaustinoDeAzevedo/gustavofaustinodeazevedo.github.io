import { BackgroundTextContent } from '../types/changeBackground.data.types';
import { colorGradients } from './colorFilters.data';
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
            legend: 'Filters',
            options: imageFilters.eng,
          },
          picker: {
            legend: 'Choose an Image',
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
          effect: {
            legend: 'Gradient',
            options: colorGradients.eng,
          },
          picker: {
            legend: 'Choose a Color',
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
            legend: 'Filtros',
            options: imageFilters.por,
          },
          picker: {
            legend: 'Escolha uma Imagem',
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
          effect: {
            legend: 'Gradiente',
            options: colorGradients.por,
          },
          picker: {
            legend: 'Escolha uma Cor',
            button: 'Cor Padrão',
          },
        },
      },
    },
  },
};

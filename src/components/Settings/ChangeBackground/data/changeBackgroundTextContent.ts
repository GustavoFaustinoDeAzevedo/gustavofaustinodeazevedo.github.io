type Settings = {
  legend: string;
  choices: string[];
};

type ImageChoice = {
  id: string;
  label: string;
  title: string;
  settings: Settings;
  button: string;
};

type ColorChoice = {
  id: string;
  label: string;
  title: string;
  settings: Settings;
  button: string;
};

type Choices = {
  image: ImageChoice;
  color: ColorChoice;
};

type LanguageContent = {
  legend: string;
  choices: Choices;
};

type BackgroundTextContent = {
  eng: LanguageContent;
  por: LanguageContent;
};

export const changeBackgroundTextContent: BackgroundTextContent = {
  eng: {
    legend: 'Display',
    choices: {
      image: {
        id: 'image',
        label: 'Image',
        title: 'Select an image to use as a custom background',
        settings: {
          legend: 'Effects',
          choices: ['1', '2', '3'],
        },
        button: 'Or Select an Image File',
      },
      color: {
        id: 'color',
        label: 'Color',
        title: 'Choose a color to change the desktop background theme',
        settings: {
          legend: 'Effects',
          choices: ['1', '2', '3'],
        },
        button: 'Default Color',
      },
    },
  },
  por: {
    legend: 'Exibição',
    choices: {
      image: {
        id: 'image',
        label: 'Imagem',
        title: 'Selecione uma imagem para usar como fundo personalizado',
        settings: {
          legend: 'Efeitos',
          choices: ['1', '2', '3'],
        },
        button: 'Ou Selecione um Arquivo de Imagem',
      },
      color: {
        id: 'color',
        label: 'Cor',
        title:
          'Personalize a aparência da área de trabalho com a cor escolhida',
        settings: {
          legend: 'Efeitos',
          choices: ['1', '2', '3'],
        },
        button: 'Cor Padrão',
      },
    },
  },
};

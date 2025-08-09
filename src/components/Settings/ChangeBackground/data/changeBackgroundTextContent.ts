type Effects = {
  legend: string;
  choices: string[];
};

type Picker = {
  legend: string;
  button: string;
};

type Settings = {
  effects: Effects;
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
        title: 'Background Preview',
        settings: {
          effects: {
            legend: 'Effects',
            choices: ['1', '2', '3'],
          },
          picker: {
            legend: '',
            button: 'Or Select an Image File',
          },
        },
      },
      color: {
        id: 'color',
        label: 'Color',
        title: 'Background Preview',
        settings: {
          effects: {
            legend: 'Effects',
            choices: ['1', '2', '3'],
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
        title: 'Pré-Visualização de Fundo',
        settings: {
          effects: {
            legend: 'Efeitos',
            choices: ['1', '2', '3'],
          },
          picker: {
            legend: '',
            button: 'Ou Selecione um Arquivo de Imagem',
          },
        },
      },
      color: {
        id: 'color',
        label: 'Cor',
        title: 'Pré-Visualização de Fundo',
        settings: {
          effects: {
            legend: 'Efeitos',
            choices: ['1', '2', '3'],
          },
          picker: {
            legend: 'Escolha uma cor',
            button: 'Cor Padrão',
          },
        },
      },
    },
  },
};

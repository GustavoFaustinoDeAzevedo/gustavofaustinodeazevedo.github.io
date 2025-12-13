interface InputData {
  ariaLabel: string;
  id: string;
  type: string;
  name: string;
  placeholder: string;
  label: string;
  textArea?: boolean;
  required?: boolean;
}

interface FormData {
  form: {
    ariaLabel: string;
  };
  title: string;
  name: InputData;
  email: InputData;
  message: InputData;
  button: {
    ariaLabel: string;
    name: string;
    label: string;
  };
}

interface FormDataTranslations {
  eng: FormData;
  por: FormData;
}

const formData: FormDataTranslations = {
  eng: {
    form: {
      ariaLabel: 'Contact form',
    },
    title: 'Use the form below to contact me',
    name: {
      required: true,
      ariaLabel: 'Name input',
      id: 'name',
      type: 'input',
      name: 'Name',
      placeholder: 'Ex: Charlie Lima',
      label: 'Name',
    },
    email: {
      required: true,
      ariaLabel: 'Email input',
      id: 'email',
      type: 'input',
      name: 'Email',
      placeholder: 'Ex: charlielima@example.com',
      label: 'Email',
    },
    message: {
      required: true,
      textArea: true,
      ariaLabel: 'Message input',
      id: 'message',
      type: 'textarea',
      name: 'Message',
      placeholder: 'Type your message here',
      label: 'Message',
    },
    button: {
      ariaLabel: 'Submit button',
      name: 'Submit',
      label: 'Submit',
    },
  },
  por: {
    form: {
      ariaLabel: 'Formulário de contato',
    },
    title: 'Use o formulário abaixo para entrar em contato comigo',
    name: {
      required: true,
      ariaLabel: 'Inserir Nome',
      id: 'name',
      type: 'input',
      name: 'Nome',
      placeholder: 'Ex: Charlie Lima',
      label: 'Nome',
    },
    email: {
      required: true,
      ariaLabel: 'Inserir Email',
      id: 'email',
      type: 'input',
      name: 'Email',
      placeholder: 'Ex: charlielima@exemplo.com',
      label: 'Email',
    },
    message: {
      required: true,
      textArea: true,
      ariaLabel: 'Inserir Mensagem',
      id: 'message',
      type: 'textarea',
      name: 'Mensagem',
      placeholder: 'Digite sua mensagem aqui',
      label: 'Mensagem',
    },
    button: {
      ariaLabel: 'Enviar',
      name: 'Enviar',
      label: 'Enviar',
    },
  },
};

export default formData;

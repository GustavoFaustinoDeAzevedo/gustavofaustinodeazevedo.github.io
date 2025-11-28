import { FileNode } from './filesData';

const instaledAppsData: FileNode[] = [
  {
    fileId: 'about',
    title: { eng: 'About Me', por: 'Sobre Mim' },
    icon: 'about',
    type: 'text',
    initialDimensions: { width: '650px', height: '520px' },
  },
  {
    fileId: 'skills',
    title: { eng: 'Skills', por: 'Habilidades' },
    icon: 'skills',
    type: 'file',
    initialDimensions: { width: '750px', height: '540px' },
  },

  {
    fileId: 'contact',
    title: { eng: 'Contact Info', por: 'Informações de Contato' },
    icon: 'business-card-icon',
    type: 'app',
    initialDimensions: { width: '490px', height: '600px' },
  },

  {
    fileId: 'sendMessage',
    title: { eng: 'Send Message', por: 'Enviar Mensagem' },
    icon: 'contact',
    type: 'app',
    initialDimensions: { width: '490px', height: '620px' },
  },
  {
    fileId: 'change-background',
    title: {
      eng: 'Change Background (unfinished)',
      por: 'Alterar Fundo (incompleto)',
    },
    icon: 'image-outline-icon',
    type: 'app',
    isUnique: true,
    initialStates: { maximized: true },
    initialDimensions: { width: '1200px', height: '800px' },
  },
  {
    fileId: 'calculator',
    title: { eng: 'Calculator', por: 'Calculadora' },
    icon: 'calculator',
    type: 'app',
    initialDimensions: { width: '400px', height: '500px' },
  },
  {
    fileId: 'notepad',
    title: { eng: 'Notepad (unfinished)', por: 'Bloco de Notas (incompleto)' },
    icon: 'notepad',
    type: 'app',
    initialDimensions: { width: '400px', height: '500px' },
  },
  {
    fileId: 'sticky-notes',
    title: {
      eng: 'Sticky Notes (unfinished)',
      por: 'Notas Adesivas (incompleto)',
    },
    icon: 'sticky-notes',
    type: 'app',
    initialDimensions: { width: '400px', height: '500px' },
  },
];

export default instaledAppsData;

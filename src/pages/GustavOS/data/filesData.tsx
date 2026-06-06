//Este arquivo contém a estrutura do sistema de arquivos inicial, incluindo pastas e arquivos
// com suas respectivas propriedades.
//É usado para preencher o File Explorer e gerenciar o sistema de arquivos no aplicativo.
// No futuro esse arquivo não existirá mais e, inicialmente, o sistema criará um sistema de arquivos vazio e o
// usuário poderá adicionar arquivos/pastas.

import { FileNode } from '@/store/slices/file';

export const rootFolder: FileNode = {
  fileId: 'root',
  nodeDepth: 0,
  title: { eng: 'root', por: 'raiz' },
  icon: 'folder',
  type: 'folder',

  content: [
    {
      fileId: 'users',
      title: { eng: 'Users', por: 'Usuários' },
      icon: 'users',
      type: 'folder',
      content: [
        // {
        //   fileId: 'guests',
        //   title: { eng: 'Guest', por: 'Convidado' },
        //   icon: 'user',
        //   type: 'folder',
        //   content: [
        //     {
        //       fileId: 'desktop',
        //       title: { eng: 'Desktop', por: 'Área de Trabalho' },
        //       icon: 'desktop',
        //       type: 'folder',
        //       content: [
        //         {
        //           fileId: 'devMenu',
        //           title: { eng: 'Dev Menu', por: 'Menu de Desenvolvedor' },
        //           icon: '',
        //           type: 'app',
        //           initialDimensions: { width: '400px', height: '500px' },
        //         },
        //         {
        //           fileId: 'about',
        //           title: { eng: 'About Me', por: 'Sobre Mim' },
        //           icon: 'about',
        //           type: 'text',
        //           initialDimensions: { width: '650px', height: '600px' },
        //         },
        //         {
        //           fileId: 'skills',
        //           title: { eng: 'Skills', por: 'Habilidades' },
        //           icon: 'skills',
        //           type: 'file',
        //           initialDimensions: { width: '750px', height: '540px' },
        //         },
        //         {
        //           fileId: 'contact',
        //           title: { eng: 'Contact Info', por: 'Informações de Contato' },
        //           icon: 'business-card-icon',
        //           type: 'app',
        //           initialDimensions: { width: '490px', height: '600px' },
        //         },
        //         {
        //           fileId: 'sendMessage',
        //           title: { eng: 'Send Message', por: 'Enviar Mensagem' },
        //           icon: 'contact',
        //           type: 'app',
        //           initialDimensions: { width: '490px', height: '620px' },
        //         },
        //         {
        //           fileId: 'change-background',
        //           title: {
        //             eng: 'Change Background (unfinished)',
        //             por: 'Alterar Fundo (incompleto)',
        //           },
        //           icon: 'image-outline-icon',
        //           type: 'app',
        //           isUnique: true,
        //           initialStates: { maximized: true },
        //           initialDimensions: { width: '1200px', height: '800px' },
        //         },
        //       ],
        //     },
        //   ],
        // },
      ],
    },
  ],
};

export const placeholder: FileNode = {
  fileId: 'placeholder',
  title: { eng: 'placeholder', por: 'placeholder' },
  icon: 'folder',
  type: 'folder',
  content: [
    { fileId: 'new', title: { eng: 'New', por: 'Novo' }, icon: 'plus-circle' },
  ],
};

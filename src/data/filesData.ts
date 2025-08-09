// This file contains the structure of the file system, including folders and files with their respective properties.
// It is used to populate the file explorer and manage the file system in the application.

// 1. Type definitions

type LanguageTitle = { eng: string; por: string };

interface FileNode {
  fileId: string;
  title: LanguageTitle;
  icon?: string;
  type?: 'folder' | 'app' | 'text' | 'file';
  initialDimensions?: {
    width: string | '1000px';
    height: string | '600px;';
  };
  children?: FileNode[];
  nodeDepth?: number;
  isUnique?: boolean;
  windowMask?: {
    src: string;
    title: LanguageTitle;
    icon: string;
  };
}

// 2. Main objects

export const rootFolder: FileNode = {
  fileId: 'root',
  nodeDepth: 0,
  title: { eng: 'C:', por: 'C:' },
  icon: 'folder',
  type: 'folder',
  children: [
    {
      fileId: 'users',
      title: { eng: 'Users', por: 'Usuários' },
      icon: 'users',
      type: 'folder',
      children: [
        {
          fileId: 'guests',
          title: { eng: 'Guest', por: 'Convidado' },
          icon: 'user',
          type: 'folder',
          children: [
            {
              fileId: 'desktop',
              title: { eng: 'Desktop', por: 'Área de Trabalho' },
              icon: 'desktop',
              type: 'folder',
              children: [
                {
                  fileId: 'about',
                  title: { eng: 'About Me', por: 'Sobre Mim' },
                  icon: 'about',
                  type: 'text',
                  initialDimensions: { width: '650px', height: '520px' },
                },
                {
                  fileId: 'projects',
                  title: {
                    eng: 'Program Files (Work in Progress 1/25 [PAUSED])',
                    por: 'Arquivos de Programas (Em Desenvolvimento 1/25 [PAUSED])',
                  },
                  icon: 'folder',
                  type: 'folder',
                  children: [
                    {
                      fileId: 'calculator',
                      title: { eng: 'Calculator', por: 'Calculadora' },
                      icon: 'calculator',
                      type: 'app',
                      initialDimensions: { width: '400px', height: '500px' },
                    },
                    {
                      fileId: 'notepad',
                      title: {
                        eng: 'Notepad (Work in Progress',
                        por: 'Bloco de Notas (Em Desenvolvimento)',
                      },
                      icon: 'notepad',
                      type: 'app',
                      initialDimensions: { width: '500px', height: '500px' },
                    },
                    {
                      fileId: 'todo',
                      title: { eng: 'To-Do List', por: 'Lista de Tarefas' },
                      type: 'app',
                    },
                    {
                      fileId: 'weather',
                      title: { eng: 'Weather App', por: 'Aplicativo de Clima' },
                      type: 'app',
                    },
                    {
                      fileId: 'memory-game',
                      title: { eng: 'Memory Game', por: 'Jogo da Memória' },
                      type: 'app',
                    },
                    {
                      fileId: 'snake-game',
                      title: { eng: 'Snake Game', por: 'Jogo da Cobra' },
                      type: 'app',
                    },
                    {
                      fileId: 'piano-app',
                      title: { eng: 'Piano App', por: 'Aplicativo de Piano' },
                      type: 'app',
                    },
                    {
                      fileId: 'tetris-game',
                      title: { eng: 'Tetris Game', por: 'Jogo Tetris' },
                      type: 'app',
                    },
                    {
                      fileId: 'rock-paper-scissors',
                      title: {
                        eng: 'Rock Paper Scissors',
                        por: 'Pedra Papel Tesoura',
                      },
                      type: 'app',
                    },
                    {
                      fileId: 'tic-tac-toe',
                      title: { eng: 'Tic Tac Toe', por: 'Jogo da Velha' },
                      type: 'app',
                    },
                    {
                      fileId: 'quiz-app',
                      title: { eng: 'Quiz App', por: 'Aplicativo de Quiz' },
                      type: 'app',
                    },
                    {
                      fileId: 'pomodoro-timer',
                      title: {
                        eng: 'Pomodoro Timer',
                        por: 'Cronômetro Pomodoro',
                      },
                      type: 'app',
                    },
                    {
                      fileId: 'stopwatch',
                      title: { eng: 'Stopwatch', por: 'Cronômetro' },
                      type: 'app',
                    },
                    {
                      fileId: 'currency-converter',
                      title: {
                        eng: 'Currency Converter',
                        por: 'Conversor de Moedas',
                      },
                      type: 'app',
                    },
                    {
                      fileId: 'markdown-editor',
                      title: { eng: 'Markdown Editor', por: 'Editor Markdown' },
                      type: 'app',
                    },
                    {
                      fileId: 'image-gallery',
                      title: {
                        eng: 'Image Gallery',
                        por: 'Galeria de Imagens',
                      },
                      type: 'app',
                    },
                    {
                      fileId: 'calendar-app',
                      title: {
                        eng: 'Calendar App',
                        por: 'Aplicativo de Calendário',
                      },
                      type: 'app',
                    },
                    {
                      fileId: 'music-player',
                      title: {
                        eng: 'Music Player',
                        por: 'Reprodutor de Música',
                      },
                      type: 'app',
                    },
                    {
                      fileId: 'video-player',
                      title: {
                        eng: 'Video Player',
                        por: 'Reprodutor de Vídeo',
                      },
                      type: 'app',
                    },
                    {
                      fileId: 'drawing-app',
                      title: {
                        eng: 'Drawing App',
                        por: 'Aplicativo de Desenho',
                      },
                      type: 'app',
                    },
                    {
                      fileId: 'chat-app',
                      title: { eng: 'Chat App', por: 'Aplicativo de Chat' },
                      type: 'app',
                    },
                    {
                      fileId: 'rss-reader',
                      title: { eng: 'RSS Reader', por: 'Leitor de RSS' },
                      type: 'app',
                    },
                    {
                      fileId: 'password-manager',
                      title: {
                        eng: 'Password Manager',
                        por: 'Gerenciador de Senhas',
                      },
                      type: 'app',
                    },
                    {
                      fileId: 'expense-tracker',
                      title: {
                        eng: 'Expense Tracker',
                        por: 'Rastreador de Despesas',
                      },
                      type: 'app',
                    },
                    {
                      fileId: 'habit-tracker',
                      title: {
                        eng: 'Habit Tracker',
                        por: 'Rastreador de Hábitos',
                      },
                      type: 'app',
                    },
                    {
                      fileId: 'new',
                      title: { eng: 'New File', por: 'Adicionar Arquivo' },
                      icon: 'plus-circle',
                    },
                  ],
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
                  title: { eng: 'Contact', por: 'Contato' },
                  icon: 'contact',
                  type: 'app',
                  initialDimensions: { width: '490px', height: '550px' },
                },
                {
                  fileId: 'change-background',
                  title: {
                    eng: 'Change Background (UX and UI in progress)',
                    por: 'Alterar Fundo (UX e UI em desenvolvimento)',
                  },
                  icon: 'image-outline-icon',
                  type: 'app',
                  isUnique: true,
                  initialDimensions: { width: '1200px', height: '750px' },
                },
                {
                  fileId: 'cmd',
                  title: {
                    eng: 'Command Prompt (UX in Progress [PAUSED])',
                    por: 'Prompt de Comando (UX em Desenvolvimento [PAUSADO])',
                  },
                  icon: 'command',
                  type: 'app',
                  initialDimensions: { width: '580px', height: '330px' },
                },
                {
                  fileId: 'task-manager',
                  title: {
                    eng: 'Task Manager (UI and UX in Progress [PAUSED])',
                    por: 'Gerenciador de Tarefas (UI e UX em Desenvolvimento [PAUSADO])',
                  },
                  icon: 'task-manager',
                  type: 'app',
                  isUnique: true,
                },
                {
                  fileId: 'browser',
                  title: { eng: 'Browser', por: 'Navegador' },
                  icon: 'browser',
                  type: 'app',
                  initialDimensions: { width: '1000px', height: '600px' },
                },
                {
                  fileId: 'github',
                  title: { eng: 'Github', por: 'Github' },
                  icon: 'github',
                  type: 'app',
                  windowMask: {
                    src: 'https://github.com/GustavoFaustinoDeAzevedo/gustavofaustinodeazevedo.github.io',
                    title: { eng: 'Browser', por: 'Navegador' },
                    icon: 'browser',
                  },
                  initialDimensions: { width: '1000px', height: '600px' },
                },
                {
                  fileId: 'new',
                  title: { eng: 'New File', por: 'Adicionar Arquivo' },
                  icon: 'plus-circle',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const placeholder: FileNode = {
  fileId: 'placeholder',
  title: { eng: 'placeholder', por: 'placeholder' },
  icon: 'folder',
  type: 'folder',
  children: [
    { fileId: 'new', title: { eng: 'New', por: 'Novo' }, icon: 'plus-circle' },
  ],
};

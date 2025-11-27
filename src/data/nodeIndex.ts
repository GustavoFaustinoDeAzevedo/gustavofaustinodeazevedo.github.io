type LanguageTitle = { eng: string; por: string };

type FileNode = {
  id: string;
  fileId: string;
  parentId?: string;
  title: LanguageTitle;
  icon?: string;
  type?: 'folder' | 'app' | 'text' | 'file';
  initialStates?: Record<string, boolean>;
  initialDimensions?: {
    width: string | '1000px';
    height: string | '600px;';
  };
  children?: string[];
  content?: any;
  nodeDepth?: number;
  isUnique?: boolean;
  windowMask?: {
    src: string;
    title: LanguageTitle;
    icon: string;
  };
};

export type FileNodeIndex = Record<string, FileNode>;

const nodeIndex: FileNodeIndex = {
  root: {
    id: crypto.randomUUID(),
    fileId: 'root',
    title: { eng: 'C:', por: 'C:' },
    icon: 'folder',
    type: 'folder',
    children: ['users'],
  },
  users: {
    id: crypto.randomUUID(),
    fileId: 'users',
    title: { eng: 'Users', por: 'Usuários' },
    icon: 'users',
    type: 'folder',
    parentId: 'root',
    children: ['guests'],
  },
  guests: {
    id: crypto.randomUUID(),
    fileId: 'guests',
    title: { eng: 'Guest', por: 'Convidado' },
    icon: 'user',
    type: 'folder',
    parentId: 'users',
    children: ['desktop'],
  },
  desktop: {
    id: crypto.randomUUID(),
    fileId: 'desktop',
    title: { eng: 'Desktop', por: 'Área de Trabalho' },
    icon: 'desktop',
    type: 'folder',
    parentId: 'guests',
    children: [
      'about',
      'projects',
      'skills',
      'contact',
      'change-background',
      'cmd',
      'task-manager',
      'new-desktop',
    ],
  },
  about: {
    id: crypto.randomUUID(),
    fileId: 'about',
    title: { eng: 'About Me', por: 'Sobre Mim' },
    icon: 'about',
    type: 'text',
    parentId: 'desktop',
    initialDimensions: { width: '650px', height: '520px' },
  },
  // projects: {
  //   fileId: 'projects',
  //   title: {
  //     eng: 'Program Files (Work in Progress 1/25 [PAUSED])',
  //     por: 'Arquivos de Programas (Em Desenvolvimento 1/25 [PAUSED])',
  //   },
  //   icon: 'folder',
  //   type: 'folder',
  //   parentId: 'desktop',
  //   children: [
  //     'calculator',
  //     'notepad',
  //     'todo',
  //     'weather',
  //     'memory-game',
  //     'snake-game',
  //     'piano-app',
  //     'tetris-game',
  //     'rock-paper-scissors',
  //     'tic-tac-toe',
  //     'quiz-app',
  //     'pomodoro-timer',
  //     'stopwatch',
  //     'currency-converter',
  //     'markdown-editor',
  //     'image-gallery',
  //     'calendar-app',
  //     'music-player',
  //     'video-player',
  //     'drawing-app',
  //     'chat-app',
  //     'rss-reader',
  //     'password-manager',
  //     'expense-tracker',
  //     'habit-tracker',
  //     'new-projects',
  //   ],
  // },
  calculator: {
    id: crypto.randomUUID(),
    fileId: 'calculator',
    title: { eng: 'Calculator', por: 'Calculadora' },
    icon: 'calculator',
    type: 'app',
    parentId: 'projects',
    initialDimensions: { width: '400px', height: '500px' },
  },
  notepad: {
    id: crypto.randomUUID(),
    fileId: 'notepad',
    title: {
      eng: 'Notepad (Work in Progress',
      por: 'Bloco de Notas (Em Desenvolvimento)',
    },
    icon: 'notepad',
    type: 'app',
    parentId: 'projects',
    initialDimensions: { width: '500px', height: '500px' },
  },
  todo: {
    id: crypto.randomUUID(),
    fileId: 'todo',
    title: { eng: 'To-Do List', por: 'Lista de Tarefas' },
    type: 'app',
    parentId: 'projects',
  },
  weather: {
    id: crypto.randomUUID(),
    fileId: 'weather',
    title: { eng: 'Weather App', por: 'Aplicativo de Clima' },
    type: 'app',
    parentId: 'projects',
  },
  'memory-game': {
    fileId: 'memory-game',
    title: { eng: 'Memory Game', por: 'Jogo da Memória' },
    type: 'app',
    parentId: 'projects',
  },
  'snake-game': {
    fileId: 'snake-game',
    title: { eng: 'Snake Game', por: 'Jogo da Cobra' },
    type: 'app',
    parentId: 'projects',
  },
  'piano-app': {
    fileId: 'piano-app',
    title: { eng: 'Piano App', por: 'Aplicativo de Piano' },
    type: 'app',
    parentId: 'projects',
  },
  'tetris-game': {
    fileId: 'tetris-game',
    title: { eng: 'Tetris Game', por: 'Jogo Tetris' },
    type: 'app',
    parentId: 'projects',
  },
  'rock-paper-scissors': {
    fileId: 'rock-paper-scissors',
    title: { eng: 'Rock Paper Scissors', por: 'Pedra Papel Tesoura' },
    type: 'app',
    parentId: 'projects',
  },
  'tic-tac-toe': {
    fileId: 'tic-tac-toe',
    title: { eng: 'Tic Tac Toe', por: 'Jogo da Velha' },
    type: 'app',
    parentId: 'projects',
  },
  'quiz-app': {
    fileId: 'quiz-app',
    title: { eng: 'Quiz App', por: 'Aplicativo de Quiz' },
    type: 'app',
    parentId: 'projects',
  },
  'pomodoro-timer': {
    fileId: 'pomodoro-timer',
    title: { eng: 'Pomodoro Timer', por: 'Cronômetro Pomodoro' },
    type: 'app',
    parentId: 'projects',
  },
  stopwatch: {
    fileId: 'stopwatch',
    title: { eng: 'Stopwatch', por: 'Cronômetro' },
    type: 'app',
    parentId: 'projects',
  },
  'currency-converter': {
    fileId: 'currency-converter',
    title: { eng: 'Currency Converter', por: 'Conversor de Moedas' },
    type: 'app',
    parentId: 'projects',
  },
  'markdown-editor': {
    fileId: 'markdown-editor',
    title: { eng: 'Markdown Editor', por: 'Editor Markdown' },
    type: 'app',
    parentId: 'projects',
  },
  'image-gallery': {
    fileId: 'image-gallery',
    title: { eng: 'Image Gallery', por: 'Galeria de Imagens' },
    type: 'app',
    parentId: 'projects',
  },
  'calendar-app': {
    fileId: 'calendar-app',
    title: { eng: 'Calendar App', por: 'Aplicativo de Calendário' },
    type: 'app',
    parentId: 'projects',
  },
  'music-player': {
    fileId: 'music-player',
    title: { eng: 'Music Player', por: 'Reprodutor de Música' },
    type: 'app',
    parentId: 'projects',
  },
  'video-player': {
    fileId: 'video-player',
    title: { eng: 'Video Player', por: 'Reprodutor de Vídeo' },
    type: 'app',
    parentId: 'projects',
  },
  'drawing-app': {
    fileId: 'drawing-app',
    title: { eng: 'Drawing App', por: 'Aplicativo de Desenho' },
    type: 'app',
    parentId: 'projects',
  },
  'chat-app': {
    fileId: 'chat-app',
    title: { eng: 'Chat App', por: 'Aplicativo de Chat' },
    type: 'app',
    parentId: 'projects',
  },
  'rss-reader': {
    fileId: 'rss-reader',
    title: { eng: 'RSS Reader', por: 'Leitor de RSS' },
    type: 'app',
    parentId: 'projects',
  },
  'password-manager': {
    fileId: 'password-manager',
    title: { eng: 'Password Manager', por: 'Gerenciador de Senhas' },
    type: 'app',
    parentId: 'projects',
  },
  'expense-tracker': {
    fileId: 'expense-tracker',
    title: { eng: 'Expense Tracker', por: 'Rastreador de Despesas' },
    type: 'app',
    parentId: 'projects',
  },
  'habit-tracker': {
    fileId: 'habit-tracker',
    title: { eng: 'Habit Tracker', por: 'Rastreador de Hábitos' },
    type: 'app',
    parentId: 'projects',
  },
  'new-projects': {
    fileId: 'new',
    title: { eng: 'New File', por: 'Adicionar Arquivo' },
    icon: 'plus-circle',
    parentId: 'projects',
    type: 'file',
  },
  skills: {
    fileId: 'skills',
    title: { eng: 'Skills', por: 'Habilidades' },
    icon: 'skills',
    type: 'file',
    parentId: 'desktop',
    initialDimensions: { width: '750px', height: '540px' },
  },
  contact: {
    fileId: 'contact',
    title: { eng: 'Contact', por: 'Contato' },
    icon: 'business-card-icon',
    type: 'app',
    parentId: 'desktop',
    initialDimensions: { width: '490px', height: '600px' },
  },

  'change-background': {
    fileId: 'change-background',
    title: {
      eng: 'Change Background (UX and UI in progress)',
      por: 'Alterar Fundo (UX e UI em desenvolvimento)',
    },
    icon: 'image-outline-icon',
    type: 'app',
    isUnique: true,
    parentId: 'desktop',
    initialDimensions: { width: '1200px', height: '750px' },
  },
  cmd: {
    fileId: 'cmd',
    title: {
      eng: 'Command Prompt (UX in Progress [PAUSED])',
      por: 'Prompt de Comando (UX em Desenvolvimento [PAUSADO])',
    },
    icon: 'command',
    type: 'app',
    parentId: 'desktop',
    initialDimensions: { width: '580px', height: '330px' },
  },
  'task-manager': {
    fileId: 'task-manager',
    title: {
      eng: 'Task Manager (UI and UX in Progress [PAUSED])',
      por: 'Gerenciador de Tarefas (UI e UX em Desenvolvimento [PAUSADO])',
    },
    icon: 'task-manager',
    type: 'app',
    isUnique: true,
    parentId: 'desktop',
  },
  'new-desktop': {
    fileId: 'new',
    title: { eng: 'New File', por: 'Adicionar Arquivo' },
    icon: 'plus-circle',
    parentId: 'desktop',
    type: 'folder',
  },
};

export default nodeIndex;

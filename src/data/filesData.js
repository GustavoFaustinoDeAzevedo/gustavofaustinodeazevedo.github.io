export const rootFolder =
{
  id: 'desktop', title: 'desktop', type: 'desktop', children: [
    { id: 'about', title: { eng: 'About Me', por: 'Sobre Mim' }, icon: 'icon about', type: 'file' },
    {
      id: 'projects', title: { eng: 'Program Files (Work in Progress 1/25)', por: 'Arquivos de Programas (Em Desenvolvimento 1/25)' }, icon: 'icon projects', type: 'folder',
      children: [
        { id: 'calculator', title: { eng: 'Calculator', por: 'Calculadora', type: 'app' } },
        { id: 'notepad', title: { eng: 'Notepad (Work in Progress', por: 'Bloco de Notas (Em Desenvolvimento)', type: 'app' } },
        { id: 'todo', title: { eng: 'To-Do List', por: 'Lista de Tarefas', type: 'app' } },
        { id: 'weather', title: { eng: 'Weather App', por: 'Aplicativo de Clima', type: 'app' } },
        { id: 'memory-game', title: { eng: 'Memory Game', por: 'Jogo da Memória', type: 'app' } },
        { id: 'snake-game', title: { eng: 'Snake Game', por: 'Jogo da Cobra', type: 'app' } },
        { id: 'piano-app', title: { eng: 'Piano App', por: 'Aplicativo de Piano', type: 'app' } },
        { id: 'tetris-game', title: { eng: 'Tetris Game', por: 'Jogo Tetris', type: 'app' } },
        { id: 'rock-paper-scissors', title: { eng: 'Rock Paper Scissors', por: 'Pedra Papel Tesoura', type: 'app' } },
        { id: 'tic-tac-toe', title: { eng: 'Tic Tac Toe', por: 'Jogo da Velha', type: 'app' } },
        { id: 'quiz-app', title: { eng: 'Quiz App', por: 'Aplicativo de Quiz', type: 'app' } },
        { id: 'pomodoro-timer', title: { eng: 'Pomodoro Timer', por: 'Cronômetro Pomodoro', type: 'app' } },
        { id: 'stopwatch', title: { eng: 'Stopwatch', por: 'Cronômetro', type: 'app' } },
        { id: 'currency-converter', title: { eng: 'Currency Converter', por: 'Conversor de Moedas', type: 'app' } },
        { id: 'markdown-editor', title: { eng: 'Markdown Editor', por: 'Editor Markdown', type: 'app' } },
        { id: 'image-gallery', title: { eng: 'Image Gallery', por: 'Galeria de Imagens', type: 'app' } },
        { id: 'calendar-app', title: { eng: 'Calendar App', por: 'Aplicativo de Calendário', type: 'app' } },
        { id: 'music-player', title: { eng: 'Music Player', por: 'Reprodutor de Música', type: 'app' } },
        { id: 'video-player', title: { eng: 'Video Player', por: 'Reprodutor de Vídeo', type: 'app' } },
        { id: 'drawing-app', title: { eng: 'Drawing App', por: 'Aplicativo de Desenho', type: 'app' } },
        { id: 'chat-app', title: { eng: 'Chat App', por: 'Aplicativo de Chat', type: 'app' } },
        { id: 'rss-reader', title: { eng: 'RSS Reader', por: 'Leitor de RSS', type: 'app' } },
        { id: 'password-manager', title: { eng: 'Password Manager', por: 'Gerenciador de Senhas', type: 'app' } },
        { id: 'expense-tracker', title: { eng: 'Expense Tracker', por: 'Rastreador de Despesas', type: 'app' } },
        { id: 'habit-tracker', title: { eng: 'Habit Tracker', por: 'Rastreador de Hábitos', type: 'app' } },
      ]
    },
    { id: 'skills', title: { eng: 'Skills', por: 'Habilidades' }, icon: 'icon skills', type: 'file' },
    { id: 'contact', title: { eng: 'Contact', por: 'Contato' }, icon: 'icon contact', type: 'app' },
    { id: 'change-background', title: { eng: 'Change Background', por: 'Alterar Fundo' }, icon: 'icon color-picker', isUnique: true, type: 'app' },
    { id: 'cmd', title: { eng: 'Command Prompt (Work in Progress)', por: 'Prompt de Comando (Em Desenvolvimento)' }, icon: 'icon command', type: 'app' },
    { id: 'task-manager', title: { eng: 'Task Manager (Work in Progress)', por: 'Gerenciador de Tarefas (Em Desenvolvimento)' }, icon: 'icon task-manager', isUnique: true, type: 'app' },
    { id: 'browser', title: { eng: 'Browser', por: 'Navegador' }, icon: 'icon browser', type: 'app' },
    { id: 'github', title: { eng: 'Github', por: 'Github' }, icon: 'icon github', windowParams: { src: 'https://github.com/GustavoFaustinoDeAzevedo/gustavofaustinodeazevedo.github.io', title: { eng: 'Browser', por: 'Navegador' }, icon: 'icon browser', type: 'app' } },
    //{ id: 'tests', title: { eng: 'Tests', por: 'Testes' }, icon: 'icon skills' },

    { id: 'new', title: { eng: 'New', por: 'Novo' }, icon: 'icon plus-circle', type: 'app' },
  ]
}
  ;

export const placeholder = { id: 'placeholder', title: { eng: 'placeholder', por: 'placeholder' }, icon: 'icon window-icon' };

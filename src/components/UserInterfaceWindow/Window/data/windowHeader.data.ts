import { WindowHeaderProps } from '../core/WindowHeader';

const windowHeaderData = ({
  language,
  helpContent,
  isMaximized,
  handleRequestMinimize,
  handleRequestMaximize,
  handleRequestRestore,
  handleRequestClose,
}: WindowHeaderProps) => {
  return [
    {
      name: 'help',
      title: language === 'por' ? 'Ajuda' : 'Help',
      icon: 'help',
      action: () => alert(helpContent as string),
      condition: !!helpContent,
    },
    {
      name: 'minimize',
      title: language === 'por' ? 'Minimizar' : 'Minimize',
      icon: 'minimize',
      action: handleRequestMinimize,
    },
    {
      name: 'maximize',
      title: language === 'por' ? 'Maximizar' : 'Maximize',
      icon: 'maximize',
      action: handleRequestMaximize,
      condition: !isMaximized,
    },
    {
      name: 'restore',
      title: language === 'por' ? 'Restaurar' : 'Restore',
      icon: 'restore',
      action: handleRequestRestore,
      condition: isMaximized,
    },
    {
      name: 'close',
      title: language === 'por' ? 'Fechar' : 'Close',
      icon: 'close',
      action: handleRequestClose,
      condition: true,
    },
  ];
};

export default windowHeaderData;

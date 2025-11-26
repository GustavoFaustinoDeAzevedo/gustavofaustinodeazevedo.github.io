import Icon from '@components/ui/GlobalStyles/components/Icon';

interface TaskbarItemProps {
  id: string;
  isMinimized: boolean;
  icon: string;
  index: number;
  focusedWindow: string;
  handleWindowMinimize: (id: string) => void;
  handleWindowRestore: (id: string) => void;
  title: string;
}

const TaskbarTask = ({
  id,
  isMinimized,
  icon,
  index,
  focusedWindow,
  handleWindowMinimize,
  handleWindowRestore,
  title,
}: TaskbarItemProps) => {
  const handleClick = () => {
    return isMinimized ? handleWindowRestore(id) : handleWindowMinimize(id);
  };

  return (
    <li
      key={`taskbar-icon-${index}-${id}`}
      className={`taskbar__window open 
         ${focusedWindow === id ? 'focus' : ''} 
         ${isMinimized ? 'minimized' : ''}
      `}
      title={title}
      onClick={handleClick}
    >
      <Icon
        variant={icon}
        style={{ backgroundColor: 'transparent', width: '1.8rem' }}
      />
    </li>
  );
};

export default TaskbarTask;

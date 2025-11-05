import Icon from '@/components/ui/GlobalStyles/components/Icon';

interface TaskbarItemProps {
  id: string;
  isMinimized: boolean;
  icon: string;
  index: number;
  focusedWindow: string;
  onWindowMinimize: (id: string) => void;
  onWindowRestore: (id: string) => void;
  title: string;
}

const TaskbarItem = ({
  id,
  isMinimized,
  icon,
  index,
  focusedWindow,
  onWindowMinimize,
  onWindowRestore,
  title,
}: TaskbarItemProps) => {
  const handleClick = () => {
    return isMinimized ? onWindowRestore(id) : onWindowMinimize(id);
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

export default TaskbarItem;

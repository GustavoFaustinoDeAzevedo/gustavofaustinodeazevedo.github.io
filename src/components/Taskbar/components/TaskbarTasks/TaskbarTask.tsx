import { RootState } from '@/store';
import { Title } from '@/store/slices/file';
import Icon from '@components/ui/GlobalStyles/components/Icon';
import React, { use, useMemo } from 'react';
import { useSelector } from 'react-redux';

interface TaskbarItemProps {
  id: string;
  isMinimized: boolean;
  icon: string;
  index: number;
  handleWindowMinimize: (id: string) => void;
  handleWindowRestore: (id: string) => void;
  handleWindowFocus: (id: string) => void;
  title?: string;
}

const TaskbarTask = ({
  id,
  isMinimized,
  icon,
  index,
  handleWindowMinimize,
  handleWindowRestore,
  handleWindowFocus,
  title,
}: TaskbarItemProps) => {
  const { focusedWindow } = useSelector((state: RootState) => state.window);

  const handleClick = () => {
    if (!isMinimized && focusedWindow !== id) {
      return handleWindowFocus(id);
    }
    return isMinimized ? handleWindowRestore(id) : handleWindowMinimize(id);
  };

  const memoizedIcon = useMemo(
    () => (
      <Icon
        variant={icon}
        style={{ backgroundColor: 'transparent', width: '1.8rem' }}
      />
    ),
    [icon],
  );

  return (
    <li
      key={`taskbar-icon-${index}-${id}`}
      className={`taskbar__window open 
         ${focusedWindow === id ? 'focus' : ''} 
         ${isMinimized ? 'minimized' : ''}
         ${id.replace(/[.#]/g, '')}-taskbar-task
      `}
      title={title}
      onClick={handleClick}
    >
      {memoizedIcon}
    </li>
  );
};

export default TaskbarTask;

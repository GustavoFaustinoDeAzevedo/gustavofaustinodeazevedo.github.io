import { RootState } from '@/store';
import actions from '@/store/actions';
import Icon from '@components/ui/GlobalStyles/components/Icon';
import React, { use, useMemo } from 'react';
import { useSelector } from 'react-redux';

interface TaskbarItemProps {
  id: string;
  index: number;
}

const TaskbarTask = ({ id, index }: TaskbarItemProps) => {

  const focusedWindow = useSelector(
    (state: RootState) => state.window.focusedWindow,
  );
  const windowData = useSelector(
    (state: RootState) => state.window.openedWindows[id],
  );
  const language = useSelector((state: RootState) => state.settings.language);

  if (!windowData) return null;

  const { title, windowState, icon } = windowData;
  const isMinimized = windowState?.status.minimized ?? false;


  const { handleUpdateWindow } = actions.useWindowActions();

  const handleWindow = (windowId: string, request: string, value?: boolean) => {
    handleUpdateWindow({
      windowId,
      [request]: value ?? true,
    });
  };

  const handleWindowMinimize = (windowId: string) => {
    handleWindow(windowId, 'isRequestingMinimize', true);
  };
  const handleWindowRestore = (windowId: string) => {
    handleWindow(windowId, 'isRequestingRestore', true);
  };
  const handleWindowFocus = (windowId: string) => {
    handleWindow(windowId, 'isRequestingFocus', true);
  };

  const handleClick = () => {
    if (!isMinimized && focusedWindow !== id) {
      return handleWindowFocus(id);
    }
    return isMinimized ? handleWindowRestore(id) : handleWindowMinimize(id);
  };

  const memoizedIcon = useMemo(
    () => (
      <Icon
        variant={icon ?? 'html-file'}
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
      title={title?.[language as keyof typeof title] || ''}
      onClick={handleClick}
    >
      {memoizedIcon}
    </li>
  );
};

export default React.memo(TaskbarTask);

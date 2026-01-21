import React, { useMemo } from 'react';
import TaskbarTask from './TaskbarTask';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import actions from '@/store/actions';

const TaskbarTasks = () => {
  const windowActions = actions.useWindowActions();
  const { handleUpdateWindow } = windowActions;
  const { openedWindowList } = useSelector((state: RootState) => state.window);
  const { language } = useSelector((state: RootState) => state.settings);
  const handleWindow = (id: string, request: string, value?: boolean) => {
    handleUpdateWindow({
      windowId: id,
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

  return useMemo(
    () => (
      <ul className="taskbar__window-list">
        {openedWindowList?.[0]?.windowState?.status.opened &&
          openedWindowList.map(
            ({ windowId, title, windowState, icon }, index) => {
              return (
                <TaskbarTask
                  key={windowId}
                  id={windowId ?? ''}
                  title={title?.[language as keyof typeof title] || ''}
                  isMinimized={windowState?.status.minimized ?? false}
                  icon={icon ?? 'html-file'}
                  index={index}
                  handleWindowMinimize={handleWindowMinimize}
                  handleWindowRestore={handleWindowRestore}
                  handleWindowFocus={handleWindowFocus}
                />
              );
            },
          )}
      </ul>
    ),
    [openedWindowList, language],
  );
};

export default React.memo(TaskbarTasks);

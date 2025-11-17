import React, { useMemo } from 'react';
import TaskbarTask from './TaskbarTask';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import actions from '@/store/actions';

const TaskbarTasks = () => {
  const windowActions = actions.useWindowActions();
  const { handleUpdateWindow } = windowActions;
  const { language } = useSelector((state: RootState) => state.settings);
  const { openedWindowList, focusedWindow } = useSelector(
    (state: RootState) => state.window
  );

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
  return useMemo(
    () => (
      <ul className="taskbar__window-list">
        {openedWindowList?.[0]?.windowState?.status.opened &&
          openedWindowList
            .filter(
              ({ windowId }) =>
                windowId !== 'New' &&
                windowId !== 'placeholder' &&
                windowId !== 'desktop'
            )
            .map(({ windowId, title, windowState, icon }, index) => {
              return (
                <TaskbarTask
                  key={windowId}
                  id={windowId ?? ''}
                  title={title?.[language] ?? ''}
                  isMinimized={windowState?.status.minimized ?? false}
                  icon={icon ?? 'html-file'}
                  index={index}
                  focusedWindow={focusedWindow ?? ''}
                  handleWindowMinimize={handleWindowMinimize}
                  handleWindowRestore={handleWindowRestore}
                />
              );
            })}
      </ul>
    ),
    [
      openedWindowList,
      language,
      focusedWindow,
      handleWindowMinimize,
      handleWindowRestore,
    ]
  );
};

export default React.memo(TaskbarTasks);

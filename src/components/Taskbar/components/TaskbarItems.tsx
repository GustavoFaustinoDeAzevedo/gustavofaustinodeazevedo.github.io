import React, { useMemo } from 'react';
import TaskbarItem from './TaskbarItem';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import actions from '@/store/actions';

const TaskbarItems = () => {
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
    handleWindow(windowId, 'isRequestMinimize', true);
  };
  const handleWindowRestore = (windowId: string) => {
    handleWindow(windowId, 'isRequestMinimize', true);
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
                <TaskbarItem
                  key={windowId}
                  id={windowId ?? ''}
                  title={title?.[language] ?? ''}
                  isMinimized={windowState?.status.minimized ?? false}
                  icon={icon ?? 'html-file'}
                  index={index}
                  focusedWindow={focusedWindow ?? ''}
                  onWindowMinimize={handleWindowMinimize}
                  onWindowRestore={handleWindowRestore}
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

export default React.memo(TaskbarItems);

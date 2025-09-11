import React, { useMemo } from 'react';
import TaskbarItem from './TaskbarItem';

const TaskbarItems = ({
  focusedWindow,
  openedWindowList,
  onWindowMinimize,
  onWindowRestore,
}) => {
  const renderedItems = useMemo(() => {
    return (
      <ul className="taskbar-items">
        {openedWindowList?.[0]?.windowState.status.opened &&
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
                  id={windowId}
                  title={title}
                  isMinimized={windowState.status.minimized}
                  icon={icon}
                  index={index}
                  focusedWindow={focusedWindow}
                  onWindowMinimize={onWindowMinimize}
                  onWindowRestore={onWindowRestore}
                />
              );
            })}
      </ul>
    );
  }, [openedWindowList, focusedWindow, onWindowMinimize, onWindowRestore]);

  return renderedItems;
};

export default TaskbarItems;

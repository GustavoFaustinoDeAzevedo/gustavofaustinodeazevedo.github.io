import React, { useMemo } from 'react';
import TaskbarItem from './TaskbarItem';

const TaskbarItems = ({
  focusedWindow,
  openedWindowList,
  onWindowMinimize,
  onWindowRestore,
}) => {
  const renderedItems = useMemo(
    () => (
      <ul className="taskbar-items">
        {openedWindowList?.[0]?.windowState.open &&
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
                  isMinimized={windowState.minimized}
                  icon={icon}
                  index={index}
                  focusedWindow={focusedWindow}
                  onWindowMinimize={onWindowMinimize}
                  onWindowRestore={onWindowRestore}
                />
              );
            })}
      </ul>
    ),
    [openedWindowList, focusedWindow, onWindowMinimize, onWindowRestore]
  );

  return renderedItems;
};

export default TaskbarItems;

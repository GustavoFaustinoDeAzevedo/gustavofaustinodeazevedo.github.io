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
              ({ id }) =>
                id !== 'New' && id !== 'placeholder' && id !== 'desktop'
            )
            .map(({ id, title, windowState, icon }, index) => {
              return (
                <TaskbarItem
                  key={id}
                  id={id}
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

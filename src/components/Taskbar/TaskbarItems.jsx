import React, { useMemo } from 'react';
import TaskbarItem from './TaskbarItem';

const TaskbarItems = ({
  focusedWindow,
  openedWindowList,
  onWindowMinimize,
  onWindowRestore,
}) => {
  const renderedItems = useMemo(() => (
    <ul className="taskbar-items">
      {openedWindowList?.[0]?.open &&
        openedWindowList
          .filter(({ id }) => id !== 'New' && id !== 'placeholder')
          .map(({ id, state, icon }, index) => 
          {
            console.log(state )

           return (
            <TaskbarItem
              key={id}
              id={id}
              isMinimized={state.minimized}
              icon={icon}
              index={index}
              focusedWindow={focusedWindow}
              onWindowMinimize={onWindowMinimize}
              onWindowRestore={onWindowRestore}
            />
          )})}
    </ul>
  ), [openedWindowList, focusedWindow, onWindowMinimize, onWindowRestore]);

  return renderedItems;
};

export default TaskbarItems;

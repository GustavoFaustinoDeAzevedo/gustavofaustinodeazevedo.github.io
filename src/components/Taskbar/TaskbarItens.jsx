import React from 'react';
import windowAnimations from '../Window/useWindowAnimations';
import useRefs from '../../contexts/useRefs';

const TaskbarItems = ({
  focusedWindow,
  openedWindowList,
  onWindowMinimize,
  onWindowRestore,
}) => {
  const { getRef } = useRefs();

  const handleTaskbarClick = (id, isMinimized) => {
    isMinimized ? onWindowRestore(id) : onWindowMinimize(id);
  };
  return (
    <ul className="taskbar-items">
      {openedWindowList.map(
        ({ id, isMinimized, icon }, index) =>
          id !== 'New' &&
          id !== 'placeholder' && (
            <li
              key={`taskbar-icon-${index}-${id}`}
              className={`taskbar-item open 
            ${focusedWindow === id ? 'focus' : ''} 
            ${isMinimized ? 'minimized' : ''}
            `}
              onClick={() => handleTaskbarClick(id, isMinimized, index)}
            >
              <i className={`${icon}`}></i>
            </li>
          )
      )}
    </ul>
  );
};

export default TaskbarItems;

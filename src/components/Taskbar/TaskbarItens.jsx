import React from 'react';
import { minimize, restore } from './taskbarAnimations';
import { useRefs } from '../../contexts/RefsContext';

const TaskbarItems = ({
  desktopIconsData,
  focusedWindow,
  openedWindows,
  minimizedWindows,
  onWindowMinimize,
  onWindowRestore,
}) => {
  const { createRef, getRef } = useRefs();
  const handleTaskbarClick = (id) => {
    console.log(minimizedWindows);
    const windowRef = getRef(id);
    const isMinimized = minimizedWindows.includes(id);
    if (isMinimized) {
      restore(windowRef, onWindowRestore(id));
    } else {
      minimize(windowRef, onWindowMinimize(id));
    }
  };

  return (
    <ul className="taskbar-items">
      {desktopIconsData.map(
        ({ id, icon }, index) =>
          id !== 'new' &&
          id !== 'placeholder' && (
            <li
              key={`taskbar-icon-${index}-${id}`}
              className={`taskbar-item 
            ${focusedWindow === id ? 'focus' : ''}
            ${openedWindows.includes(id) ? 'open' : ''}
            ${minimizedWindows.includes(id) ? 'minimized' : ''}`}
              onClick={() => handleTaskbarClick(id)}
            >
              <i className={`${icon}`}></i>
            </li>
          )
      )}
    </ul>
  );
};

export default TaskbarItems;

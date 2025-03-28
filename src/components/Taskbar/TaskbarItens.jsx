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
    const windowRef = getRef(id);
    const isMinimized = minimizedWindows.includes(id);
    if (isMinimized) {
      restore(windowRef, () => onWindowRestore(id), isMinimized);
    } else {
      minimize(windowRef, () => onWindowMinimize(id), isMinimized);
    }
  };

  return (
    <ul className="taskbar-items">
      {desktopIconsData.map(({ id, icon }) => (
        <li
          key={id}
          className={`taskbar-item 
            ${focusedWindow === id ? 'focus' : ''}
            ${openedWindows.includes(id) ? 'open' : ''}
            ${minimizedWindows.includes(id) ? 'minimized' : ''}`}
          onClick={() => handleTaskbarClick(id)}
        >
          <i className={`${icon}`}></i>
        </li>
      ))}
    </ul>
  );
};

export default TaskbarItems;

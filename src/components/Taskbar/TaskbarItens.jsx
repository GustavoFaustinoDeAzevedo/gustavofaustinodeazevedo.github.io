import React from 'react';

const TaskbarItems = ({
  windows,
  focusedWindow,
  openedWindows,
  minimizedWindows,
  onWindowMinimize,
  onWindowRestore,
}) => {
  const handleTaskbarClick = (id) => {
    const isMinimized = minimizedWindows.includes(id);
    isMinimized ? onWindowRestore(id) : onWindowMinimize(id);
  };

  return (
    <ul className="taskbar-items">
      {windows.map(({ id, icon }) => (
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

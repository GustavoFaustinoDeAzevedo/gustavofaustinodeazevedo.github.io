import React, { useEffect, useState } from 'react';

function Taskbar({ windows, openedWindows, minimizedWindows, onWindowClick }) {
  const [time, setTime] = useState('00:00');

  useEffect(() => {
    function updateClock() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    }

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="taskbar">
      <div className="start-button">
        <i className="icon view"></i>
      </div>
      <div className="taskbar-items">
        {windows.map(({ id, title, icon }) => {
          return (
            <div
              key={id}
              className={`taskbar-item 
                ${openedWindows.includes(id) ? 'active' : ''} 
                ${minimizedWindows.includes(id) ? 'minimized' : ''}
              `}
              onClick={() => onWindowClick(id)}
            >
              <i className={`icon ${icon}`}></i>
              <span>{title}</span>
            </div>
          );
        })}
      </div>
      <div className="taskbar-right">
        <span className="clock">{time}</span>
      </div>
    </div>
  );
}

export default Taskbar;

import React, { useEffect, useRef, useState } from 'react';

const Taskbar = ({
  language,
  windows,
  focusedWindow,
  openedWindows,
  minimizedWindows,
  onWindowClick,
  onChangeLanguage,
}) => {
  const [time, setTime] = useState('00:00');
  const languageListRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleAnimation = () => {
    if (languageListRef.current) {
      if (visible) {
        // Animation to "slide out" downwards
        languageListRef.current.style.transform = 'translateY(0)';
        languageListRef.current.style.opacity = '1';
        requestAnimationFrame(() => {
          languageListRef.current.style.transition =
            'transform 0.1s ease-out, opacity 0.1s ease-out';
          languageListRef.current.style.opacity = '0';
          languageListRef.current.style.transform = 'translateY(100%)';
        });
      } else {
        // Animation to "slide in" upwards
        languageListRef.current.style.display = 'block';
        languageListRef.current.style.transform = 'translateY(100%)';
        languageListRef.current.style.opacity = '0';
        requestAnimationFrame(() => {
          languageListRef.current.style.transition =
            'transform 0.1s ease-in, opacity 0.1s ease-in';
          languageListRef.current.style.opacity = '1';
          languageListRef.current.style.transform = 'translateY(0)';
        });
      }
      setVisible(!visible);
    }
  };

  const handleTransitionEnd = () => {
    if (languageListRef.current) {
      visible
        ? (languageListRef.current.style.display = 'block')
        : (languageListRef.current.style.display = 'none');
    }
  };

  return (
    <>
      <div className="taskbar">
        <div className="start-button">
          <i className="icon window-icon"></i>
        </div>
        <div className="taskbar-items">
          {windows.map(({ id, icon }) => {
            return (
              <div
                key={id}
                className={`taskbar-item 
                ${focusedWindow === id ? 'focus' : ''}
                ${openedWindows.includes(id) ? 'open' : ''} 
                ${minimizedWindows.includes(id) ? 'minimized' : ''}
              `}
                onClick={() => onWindowClick(id)}
              >
                <i className={`icon ${icon}`}></i>
              </div>
            );
          })}
        </div>
        <div className="taskbar-right">
          <div className="language">
            <p className="language-button" onClick={toggleAnimation}>
              {language}
            </p>
            <ul
              ref={languageListRef}
              className="language-list"
              onTransitionEnd={handleTransitionEnd}
            >
              <li
                onClick={onChangeLanguage}
                className={language.includes('ENG') ? 'active' : ''}
              >
                English-US
              </li>
              <li
                onClick={onChangeLanguage}
                className={language.includes('POR') ? 'active' : ''}
              >
                Portuguese-BR
              </li>
            </ul>
          </div>
          <span className="clock">{time}</span>
        </div>
      </div>
    </>
  );
};

export default Taskbar;

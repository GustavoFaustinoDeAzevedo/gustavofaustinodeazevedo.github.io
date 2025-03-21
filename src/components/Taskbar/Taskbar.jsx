import React, { useEffect, useState } from 'react';
import toggleOpenMenuAnimation from '../../animations/elementTransitions';
import createRefs from '../../scripts/createRefs';
import useClickOutside from '../../hooks/useClickOutside';

const Taskbar = ({
  language,
  windows,
  focusedWindow,
  openedWindows,
  minimizedWindows,
  onWindowClick,
  onChangeLanguage,
}) => {
  const refs = createRefs(['languageList', 'languageButton', 'startWindow']);
  const [time, setTime] = useState('00:00');
  const [windowsVisibility, setWindowsVisibility] = useState({
    window1: false,
    window2: false,
  });

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

  useClickOutside(
    refs.languageButton,
    () => {
      toggleOpenMenuAnimation(refs.languageList, windowsVisibility.window1);
      toggleWindowVisibility('window1');
    },
    windowsVisibility.window1,
    refs.languageList
  );

  const toggleWindowVisibility = (window) => {
    setWindowsVisibility((prevVisibility) => ({
      ...prevVisibility,
      [window]: !prevVisibility[window], // Alterna o estado específico da janela
    }));
  };

  const handleTransitionEnd = () => {
    if (refs.languageList.current) {
      windowsVisibility.window1
        ? (refs.languageList.current.style.display = 'block')
        : (refs.languageList.current.style.display = 'none');
    }
  };

  //================================================================

  return (
    <>
      <div className="taskbar">
        <div
          onClick={() => {
            toggleOpenMenuAnimation(
              refs.startWindow,
              windowsVisibility.window1
            );
            toggleWindowVisibility('window2');
          }}
          className="start-button"
        >
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
            <p
              ref={refs.languageButton}
              className="language-button"
              onClick={() => {
                toggleOpenMenuAnimation(
                  refs.languageList,
                  windowsVisibility.window1
                );
                toggleWindowVisibility('window1');
              }}
            >
              {language}
            </p>
            <div className="language-list-container">
              <ul
                ref={refs.languageList}
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
          </div>
          <span className="clock">{time}</span>
        </div>
      </div>
    </>
  );
};

export default Taskbar;

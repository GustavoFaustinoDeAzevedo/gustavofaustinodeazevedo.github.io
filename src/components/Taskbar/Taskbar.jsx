import React, { useEffect, useState } from 'react';
import toggleOpenMenuAnimation from '../../animations/elementTransitions';
import createRefs from '../../scripts/createRefs';
import useClickOutside from '../../hooks/useClickOutside';
import StartMenu from './StartMenu';

const Taskbar = ({
  language,
  windows,
  focusedWindow,
  openedWindows,
  minimizedWindows,
  onWindowClick,
  onChangeLanguage,
}) => {
  const { languageList, languageButton, startWindow } = createRefs([
    'languageList',
    'languageButton',
    'startWindow',
  ]);
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
    languageButton,
    () => {
      toggleOpenMenuAnimation(languageList, windowsVisibility.window1);
      toggleWindowVisibility('window1');
    },
    windowsVisibility.window1,
    languageList
  );

  const toggleWindowVisibility = (window) => {
    setWindowsVisibility((prevVisibility) => ({
      ...prevVisibility,
      [window]: !prevVisibility[window], // Alterna o estado específico da janela
    }));
  };

  const handleTransitionEnd = (ref, window) => {
    if (ref.current) {
      windowsVisibility[window]
        ? (ref.current.style.display = 'block')
        : (ref.current.style.display = 'none');
    }
  };

  //================================================================

  return (
    <>
      <nav className="taskbar">
        <StartMenu
          visible={windowsVisibility.window2}
          toggleWindowVisibility={toggleWindowVisibility}
          handleTransitionEnd={handleTransitionEnd}
        />
        {/* <button
          className="start-button"
          onClick={() => {
            toggleOpenMenuAnimation(startWindow, windowsVisibility.window2);
            toggleWindowVisibility('window2');
          }}
          aria-label="Init Menu"
        >
          <i className="icon window-icon"></i>
        </button>

        {/* <!-- Start Window --> */}
        {/* <section className="start-window-container">
          <div ref={startWindow} className="start-window-content">
            <input type="text" aria-label="Menu Init Search Input" />
            <section>dsadsadasdasd</section>
            <section>asdasdasdasdasd</section>
          </div>
        </section>  */}

        {/* <!-- Taskbar Icons --> */}
        <ul className="taskbar-items">
          {windows.map(({ id, icon }) => (
            <li
              key={id}
              className={`taskbar-item 
          ${focusedWindow === id ? 'focus' : ''}
          ${openedWindows.includes(id) ? 'open' : ''} 
          ${minimizedWindows.includes(id) ? 'minimized' : ''}
        `}
              onClick={() => onWindowClick(id)}
            >
              <i className={`${icon}`}></i>
            </li>
          ))}
        </ul>

        {/* <!-- Taskbar Right Section --> */}
        <section className="taskbar-right">
          {/* <!-- Languages --> */}
          <section className="language">
            <button
              ref={languageButton}
              className="language-button"
              onClick={() => {
                toggleOpenMenuAnimation(
                  languageList,
                  windowsVisibility.window1
                );
                toggleWindowVisibility('window1');
              }}
              aria-label="Select language"
            >
              {language}
            </button>
            <div className="language-list-container">
              <ul
                ref={languageList}
                className="language-list"
                onTransitionEnd={() =>
                  handleTransitionEnd(languageList, 'window1')
                }
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
          </section>

          {/* <!-- Relógio --> */}
          <span className="clock" aria-label={`Hora atual: ${time}`}>
            {time}
          </span>
        </section>
      </nav>
    </>
  );
};

export default Taskbar;

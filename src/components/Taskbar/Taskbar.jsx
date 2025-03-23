import React, { useEffect, useState } from 'react';
import toggleOpenMenuAnimation from '../../animations/elementTransitions';
import createRefs from '../../scripts/createRefs';
import gsap from 'gsap';
import useClickOutside from '../../hooks/useClickOutside';
import StartMenu from './StartMenu';
import { useRefs } from '../../contexts/RefsContext';

const Taskbar = ({
  language,
  windows,
  focusedWindow,
  openedWindows,
  minimizedWindows,
  onWindowMinimize,
  onWindowRestore,
  onChangeLanguage,
}) => {
  const { languageList, languageButton } = createRefs([
    'languageList',
    'languageButton',
  ]);

  const { createRef, getRef } = useRefs();
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

  const closeWindow = (windowRef, handler, id) => {
    if (!windowRef.current) return;

    gsap.to(windowRef.current, {
      scale: 0.9, // Reduz levemente o tamanho
      opacity: 0, // Some suavemente
      duration: 0.2, // Duração da animação
      ease: 'power2.inOut',
      onComplete: () => handler(id), // Chama a função de fechar após a animação
    });
  };

  const openWindow = (windowRef, handler, id) => {
    if (!windowRef.current) return;
    // Define o estado inicial (invisível e pequeno)
    gsap.set(windowRef.current, { scale: 0.9, opacity: 0 });

    // Faz a animação de abertura
    handler(id);
    gsap.to(windowRef.current, {
      scale: 1, // Tamanho normal
      opacity: 1, // Totalmente visível
      duration: 0.2, // Duração da animação
      ease: 'power2.out',
    });
  };

  const windowClickHandler = (id) => {
    const windowRef = getRef(id);
    if (minimizedWindows.includes(id)) {
      openWindow(windowRef, onWindowMinimize, id);
    } else {
      closeWindow(windowRef, onWindowRestore, id);
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
              onClick={() => windowClickHandler(id)}
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

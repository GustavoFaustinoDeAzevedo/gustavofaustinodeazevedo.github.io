import React, { useState, useCallback, useRef } from 'react';
import StartMenu from './StartMenu';
import TaskbarItems from './TaskbarItens';
import LanguageSelector from './LanguageSelector';
import Clock from './Clock';
import toggleOpenMenuAnimation from '../../animations/elementTransitions';

const Taskbar = ({
  language,
  desktopIconsData,
  focusedWindow,
  openedWindows,
  minimizedWindows,
  onWindowMinimize,
  onWindowRestore,
  onChangeLanguage,
  history,
}) => {
  const [windowsVisibility, setWindowsVisibility] = useState({
    startMenu: false,
    languageMenu: false,
  });

  const windowsRef = useRef({});

  const toggleWindowVisibility = useCallback((windowKey) => {
    setWindowsVisibility((prev) => {
      const newVisibility = !prev[windowKey];
      const ref = windowsRef.current[windowKey];
      if (ref) {
        toggleOpenMenuAnimation(ref, newVisibility);
      }
      return {
        ...prev,
        [windowKey]: newVisibility,
      };
    });
  }, []);

  return (
    <nav className="taskbar">
      <StartMenu
        language={language}
        isVisible={windowsVisibility.startMenu}
        windowRef={(element) => (windowsRef.current.startMenu = element)}
        toggleWindowVisibility={() => toggleWindowVisibility('startMenu')}
        history={history}
      />
      <TaskbarItems
        desktopIconsData={desktopIconsData}
        focusedWindow={focusedWindow}
        openedWindows={openedWindows}
        minimizedWindows={minimizedWindows}
        onWindowMinimize={onWindowMinimize}
        onWindowRestore={onWindowRestore}
      />
      <section className="taskbar-right">
        <LanguageSelector
          windowRef={(element) => (windowsRef.current.languageMenu = element)}
          language={language}
          isVisible={windowsVisibility.languageMenu}
          toggleWindowVisibility={() => toggleWindowVisibility('languageMenu')}
          onChangeLanguage={onChangeLanguage}
        />
        <Clock />
      </section>
    </nav>
  );
};

export default React.memo(Taskbar);

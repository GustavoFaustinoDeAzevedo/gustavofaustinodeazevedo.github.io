import React, { useEffect, useState } from 'react';
import StartMenu from './StartMenu';
import TaskbarItems from './TaskbarItens';
import LanguageSelector from './LanguageSelector';
import Clock from './Clock';
import createRefs from '../../scripts/createRefs';

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

  const [windowsVisibility, setWindowsVisibility] = useState({
    startMenu: false,
    languageMenu: false,
  });

  // useClickOutside(languageButton, () => {
  //   toggleOpenMenuAnimation(languageList, windowsVisibility.languageMenu);
  //   toggleWindowVisibility('languageMenu');
  // });

  const toggleWindowVisibility = (window) => {
    setWindowsVisibility((prev) => ({
      ...prev,
      [window]: !prev[window],
    }));
  };

  return (
    <nav className="taskbar">
      <StartMenu
        visible={windowsVisibility.startMenu}
        toggleWindowVisibility={toggleWindowVisibility}
      />
      <TaskbarItems
        windows={windows}
        focusedWindow={focusedWindow}
        openedWindows={openedWindows}
        minimizedWindows={minimizedWindows}
        onWindowMinimize={onWindowMinimize}
        onWindowRestore={onWindowRestore}
      />
      <section className="taskbar-right">
        <LanguageSelector
          language={language}
          languageButton={languageButton}
          languageList={languageList}
          windowsVisibility={windowsVisibility}
          toggleWindowVisibility={toggleWindowVisibility}
          onChangeLanguage={onChangeLanguage}
        />
        <Clock />
      </section>
    </nav>
  );
};

export default Taskbar;

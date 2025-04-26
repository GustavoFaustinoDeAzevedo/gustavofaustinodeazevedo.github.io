import React, { useState, useCallback, useRef } from 'react';
import StartMenu from './StartMenu';
import TaskbarItems from './TaskbarItems';
import useClickOutside from '../../hooks/useClickOutside';
import LanguageSelector from './LanguageSelector';
import Clock from './Clock';
import { useSelector } from 'react-redux';

const Taskbar = ({
  className,
  // language,
  // focusedWindow,
  // openedWindowList,
  onWindowMinimize,
  onWindowRestore,
  onChangeLanguage,
  // history,
}) => {
  //TODO: fazer o hook de animação em outro arquivo usando use

  const language = useSelector((state) => state.settings.language);
  const openedWindowList = useSelector(
    (state) => state.window.openedWindowList
  );
  const focusedWindow = useSelector((state) => state.window.focusedWindow);
  const history = useSelector((state) => state.window.history);

  const [menuVisibility, setMenuVisibility] = useState({
    languageMenu: false,
    startMenu: false,
  });

  const menuRef = useRef([]);
  const buttonRef = useRef(null);
  const actualVisibleMenu = useRef('');

  const toggleMenuVisibility = (visibilityKey) => {
    setMenuVisibility((prev) => {
      const isVisible = !prev[visibilityKey];

      if (isVisible) {
        actualVisibleMenu.current = visibilityKey;
      } else if (actualVisibleMenu.current === visibilityKey) {
        actualVisibleMenu.current = null;
      }
      return {
        ...prev,
        [visibilityKey]: isVisible,
      };
    });
  };
  // Detects clicks outside to close the Start Menu
  useClickOutside(
    menuRef,
    () => {
      setMenuVisibility((prev) => {
        return { ...prev, startMenu: false, languageMenu: false };
      });
    },
    menuVisibility[actualVisibleMenu.current],
    buttonRef
  );

  return (
    <nav className="taskbar">
      <StartMenu
        language={language}
        startButtonRef={(element) => (buttonRef.current = element)}
        isVisible={menuVisibility.startMenu}
        windowRef={(element) => (menuRef.current = element)}
        toggleMenuVisibility={() => toggleMenuVisibility}
        onClick={() => toggleMenuVisibility('startMenu')}
        history={history}
      />
      <TaskbarItems
        focusedWindow={focusedWindow}
        openedWindowList={openedWindowList}
        onWindowMinimize={onWindowMinimize}
        onWindowRestore={onWindowRestore}
      />
      <section className="taskbar-right">
        <LanguageSelector
          languageButtonRef={(element) => (buttonRef.current = element)}
          windowRef={(element) => (menuRef.current = element)}
          language={language}
          isVisible={menuVisibility.languageMenu}
          // toggleWindowVisibility={() => toggleMenuVisibility()}
          onClick={() => toggleMenuVisibility('languageMenu')}
          onChangeLanguage={onChangeLanguage}
        />
        <Clock />
      </section>
    </nav>
  );
};

export default Taskbar;

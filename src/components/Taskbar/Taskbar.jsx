import React, { useState, useCallback, useRef } from 'react';
import StartMenu from './StartMenu';
import TaskbarItems from './TaskbarItems';
import useClickOutside from '../../hooks/useClickOutside';
import LanguageSelector from './LanguageSelector';
import Clock from './Clock';
import { useSelector } from 'react-redux';

const Taskbar = ({
  windowList,
  className,
  focusedWindow,
  history,
  language,
  onChangeLanguage,
  onUpdateWindow,
  onUnfocus,
}) => {
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

  const handleMinimize = (id) => {
    onUpdateWindow({
      id,
      minimized: true,
    });
  };
  const handleMaximize = (id) => {
    onUpdateWindow({
      id: id,
      maximized: true,
    });
  };

  const handleRestore = (id) => {
    onUpdateWindow({
      id: id,
      requestingRestore: true,
    });
  };

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
        openedWindowList={windowList}
        onWindowMinimize={(id) => handleMinimize(id)}
        onWindowRestore={(id) => handleRestore(id)}
      />
      <section className="taskbar-right">
        <LanguageSelector
          languageButtonRef={(element) => (buttonRef.current = element)}
          windowRef={(element) => (menuRef.current = element)}
          language={language}
          isVisible={menuVisibility.languageMenu}
          onClick={() => toggleMenuVisibility('languageMenu')}
          onChangeLanguage={onChangeLanguage}
        />
        <Clock />
      </section>
    </nav>
  );
};

export default Taskbar;

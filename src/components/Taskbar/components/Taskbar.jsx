import React, { useState, useCallback, useRef } from 'react';
import { StartMenu, TaskbarItems, LanguageSelector, Clock } from '..';
import useClickOutside from '../../../hooks/useClickOutside';
import { useSelector } from 'react-redux';
import BatteryStatus from '../../BatteryStatus/components/BatteryStatus';

const Taskbar = ({
  windowList,
  className,
  focusedWindow,
  history,
  language,
  windowActions,
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

  const { handleChangeLanguage } = windowActions;

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

  const handleMinimize = (id) => {
    onUpdateWindow({
      windowId: id,
      requestingMinimize: true,
    });
  };
  const handleMaximize = (id) => {
    onUpdateWindow({
      windowId: id,
      requestingMaximize: true,
    });
  };

  const handleRestore = (id) => {
    onUpdateWindow({
      windowId: id,
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
        onClick={() => toggleMenuVisibility('startMenu')}
        history={history}
      />
      <TaskbarItems
        focusedWindow={focusedWindow}
        openedWindowList={windowList}
        onWindowMinimize={(id) => handleMinimize(id)}
        onWindowRestore={(id) => handleRestore(id)}
      />
      <section className="taskbar-right-section">
        <LanguageSelector
          languageButtonRef={(element) => (buttonRef.current = element)}
          windowRef={(element) => (menuRef.current = element)}
          language={language}
          isVisible={menuVisibility.languageMenu}
          onClick={() => toggleMenuVisibility('languageMenu')}
          onChangeLanguage={handleChangeLanguage}
        />
        <Clock />
        <BatteryStatus />
      </section>
    </nav>
  );
};

export default Taskbar;

import React, { useState, useCallback, useRef } from 'react';
import { StartMenu, TaskbarItems, LanguageSelector, Clock } from '..';
import useClickOutside from '@/hooks/useClickOutside';
import { useSelector } from 'react-redux';
import BatteryStatus from '@/components/BatteryStatus/components/BatteryStatus';
import actions from '@/store/actions';
import { useIsMobile } from '@/App/hooks';

const Taskbar = ({ isMobile }) => {
  const { language, isDoubleClick } = useSelector((state) => state.settings);
  const { openedWindowList, history, focusedWindow } = useSelector(
    (state) => state.window
  );

  const windowActions = actions.useWindowActions();
  const settingsActions = actions.useSettingsActions();

  const [menuVisibility, setMenuVisibility] = useState({
    languageMenu: false,
    startMenu: false,
  });

  const menuRef = useRef([]);
  const buttonRef = useRef(null);
  const actualVisibleMenu = useRef('');

  const { handleUpdateWindow } = windowActions;
  const { handleChangeLanguage, handleChangeDoubleCkick } = settingsActions;

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
    handleUpdateWindow({
      windowId: id,
      isRequestingMinimize: true,
    });
  };
  const handleMaximize = (id) => {
    handleUpdateWindow({
      windowId: id,
      isRequestingMaximize: true,
    });
  };

  const handleRestore = (id) => {
    handleUpdateWindow({
      windowId: id,
      isRequestingRestore: true,
    });
  };

  return (
    <nav className="taskbar">
      {!isMobile && (
        <StartMenu
          language={language}
          startButtonRef={(element) => (buttonRef.current = element)}
          isVisible={menuVisibility.startMenu}
          windowRef={(element) => (menuRef.current = element)}
          onClick={() => toggleMenuVisibility('startMenu')}
          history={history}
        />
      )}
      <TaskbarItems
        focusedWindow={focusedWindow}
        openedWindowList={openedWindowList}
        onWindowMinimize={(id) => handleMinimize(id)}
        onWindowRestore={(id) => handleRestore(id)}
      />
      <section className="taskbar-right-section">
        {!isMobile && (
          <label className="container">
            {language === 'eng'
              ? `Double Click To Open Files`
              : `Duplo Clique Para Abrir Arquivos`}
            <input
              type="checkbox"
              checked={isDoubleClick}
              onChange={() => handleChangeDoubleCkick(!isDoubleClick)}
            />
            <span className="checkmark"></span>
          </label>
        )}
        <LanguageSelector
          isMobile={isMobile}
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

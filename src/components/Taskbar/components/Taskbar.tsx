import React, { useState, useCallback, useRef } from 'react';
import { StartMenu, TaskbarItems, LanguageSelector, Clock } from '..';
import useClickOutside from '@/shared/hooks/useClickOutside';
import { useSelector } from 'react-redux';
import BatteryStatus from '@/components/BatteryStatus/components/BatteryStatus';
import actions from '@/store/actions';
import { useIsMobile } from '@/shared/hooks';
import TaskbarRightSection from './TaskbarRightSection';
import { RootState } from '@/store';

const Taskbar = ({ isMobile }: { isMobile: boolean }) => {
  const { language, isDoubleClick } = useSelector(
    (state: RootState) => state.settings
  );
  const { openedWindowList, history, focusedWindow } = useSelector(
    (state: RootState) => state.window
  );

  const windowActions = actions.useWindowActions();
  const settingsActions = actions.useSettingsActions();

  const [menuVisibility, setMenuVisibility] = useState({
    languageMenu: false,
    startMenu: false,
  });

  const actualVisibleMenu = useRef<string | null>('');

  const { handleUpdateWindow } = windowActions;
  const { handleChangeLanguage, handleChangeDoubleCkick } = settingsActions;

  const toggleMenuVisibility = (visibilityKey: string) => {
    setMenuVisibility((prev) => {
      const isVisible = !prev[visibilityKey as keyof typeof prev];

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

  const handleMinimize = (id: string) => {
    handleUpdateWindow({
      windowId: id,
      isRequestingMinimize: true,
    });
  };
  const handleMaximize = (id: string) => {
    handleUpdateWindow({
      windowId: id,
      isRequestingMaximize: true,
    });
  };

  const handleRestore = (id: string) => {
    handleUpdateWindow({
      windowId: id,
      isRequestingRestore: true,
    });
  };

  return (
    <nav className="taskbar">
      {!isMobile && <StartMenu language={language} history={history} />}
      <TaskbarItems
        focusedWindow={focusedWindow}
        openedWindowList={openedWindowList}
        onWindowMinimize={(id: string) => handleMinimize(id)}
        onWindowRestore={(id: string) => handleRestore(id)}
      />
      <TaskbarRightSection
        handleChangeDoubleCkick={handleChangeDoubleCkick}
        isMobile={isMobile}
        toggleMenuVisibility={toggleMenuVisibility}
        language={language}
        handleChangeLanguage={handleChangeLanguage}
        isDoubleClick={isDoubleClick}
      />
    </nav>
  );
};

export default React.memo(Taskbar);

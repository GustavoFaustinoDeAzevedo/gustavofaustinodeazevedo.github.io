import React from 'react';
import { StartMenu, TaskbarItems } from '..';
import { useSelector } from 'react-redux';
import actions from '@/store/actions';
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

  const { handleUpdateWindow } = windowActions;
  const { handleChangeLanguage, handleChangeDoubleCkick } = settingsActions;

  const handleWindow = (id: string, request: string, value?: boolean) => {
    handleUpdateWindow({
      windowId: id,
      [request]: value ?? true,
    });
  };

  return (
    <nav className="taskbar">
      {!isMobile && <StartMenu language={language} history={history} />}
      <TaskbarItems
        language={language}
        focusedWindow={focusedWindow || ''}
        openedWindowList={openedWindowList}
        onWindowMinimize={(id: string) =>
          handleWindow(id, 'isRequestingMinimize')
        }
        onWindowRestore={(id: string) =>
          handleWindow(id, 'isRequestingRestore')
        }
      />
      <TaskbarRightSection
        handleChangeDoubleCkick={handleChangeDoubleCkick}
        isMobile={isMobile}
        language={language}
        handleChangeLanguage={handleChangeLanguage}
        isDoubleClick={isDoubleClick}
      />
    </nav>
  );
};

export default React.memo(Taskbar);

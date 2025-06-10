import React, { useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { RefsProvider } from '../contexts/RefsContext';
import actions from '../store/actions';

import Desktop from '../components/Desktop';
import Taskbar from '../components/Taskbar';
import ContextMenu from '../components/ContextMenu';
import ConsoleCommand from '../components/ConsoleCommand';

import { useDisableRightClick } from './hooks/useDisableRightClick';
import { useTaskbarProps } from './hooks/useTaskbarProps';
import createWindowList from './utils/createWindowList';

import { useItemsHandler } from './hooks/useItemsHandler';
import { useHandleContextMenu } from './hooks/useHandleContextMenu';

gsap.registerPlugin(useGSAP);

const App = () => {
  //Refs
  const desktopRef = useRef(null);

  //Setup
  useDisableRightClick();

  //Redux Selectors
  const language = useSelector((state) => state.language);
  const contextMenu = useSelector((state) => state.contextMenu);
  const windowList = useSelector((state) => state.window.openedWindowList);
  const focusedWindow = useSelector((state) => state.window.focusedWindow);
  const history = useSelector((state) => state.window.history);
  const filesData = useSelector((state) => state.file.filesList);

  //Action Handlers
  const {
    handleFocusWindow,
    handleOpenWindow,
    handleResetFocus,
    handleCloseWindow,
    handleUpdateWindow,
  } = actions.useWindowActions();

  const filesActions = actions.useFilesActions();
  const contextMenuActions = actions.useContextMenuActions();
  const handleHideContextMenu = contextMenuActions.handleHideContextMenu;

  //Language Toggle
  const handleChangeLanguage = useCallback(() => {
    changeLanguage(language === 'POR' ? 'ENG' : 'POR');
  }, [language]);

  //Hooks: Windows & Taskbar
  const taskbarProps = useTaskbarProps({
    windowList,
    history,
    focusedWindow,
    language,
    handleChangeLanguage,
    handleUpdateWindow,
    handleFocusWindow,
    handleResetFocus,
    handleCloseWindow,
    handleOpenWindow,
  });

  const windowsStack = createWindowList(
    desktopRef,
    windowList,
    focusedWindow,
    language,
    handleOpenWindow,
    handleFocusWindow,
    handleResetFocus,
    handleCloseWindow,
    handleUpdateWindow
  );

  //Hooks: Icons & Context Menu
  const itemsHandler = useItemsHandler();
  const handleContextMenu = useHandleContextMenu();


  //JSX Render
  return (
    <div className="desktop" ref={desktopRef}>
      <Desktop
        onContextMenu={handleContextMenu}
        language={language}
        windowList={windowList}
        filesData={filesData}
        filesActions={filesActions}
        handleOpenWindow={handleOpenWindow}
      />

      <RefsProvider>
        {windowsStack}
        <Taskbar {...taskbarProps} />
      </RefsProvider>

      {contextMenu.visible && (
        <ContextMenu
          {...contextMenu}
          language={language}
          items={itemsHandler()}
          onClose={handleHideContextMenu}
        />
      )}
    </div>
  );
};

export default React.memo(App);

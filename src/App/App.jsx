import React, { useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { RefsProvider } from '../contexts/RefsContext';
import actions from '../store/actions';

import Background from '../components/Background';
import Taskbar from '../components/Taskbar';
import ContextMenu from '../components/ContextMenu';
import ConsoleCommand from '../components/ConsoleCommand';

import { useDisableRightClick } from './useDisableRightClick';
import { useTaskbarProps } from './useTaskbarProps';
import useWindowList from './useWindowList';
import useDesktopIconsList from './useDesktopIconsList';
import { useItemsHandler } from './useItemsHandler';
import { useHandleContextMenu } from './useHandleContextMenu';

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
  const desktopIconsData = useSelector((state) => state.icon.desktopIconList);

  //Action Handlers
  const {
    handleFocusWindow,
    handleOpenWindow,
    handleResetFocus,
    handleCloseWindow,
    handleUpdateWindow,
  } = actions.useWindowActions();

  const desktopIconsActions = actions.useDesktopIconsActions();
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

  const windowsStack = useWindowList(
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

  const desktopIconsStack = useDesktopIconsList(
    language,
    windowList,
    desktopIconsData,
    desktopIconsActions,
    handleOpenWindow
  );

  //JSX Render
  return (
    <div className="desktop" ref={desktopRef}>
      <Background onContextMenu={handleContextMenu} />

      <div className="desktop-icons-wrapper related-background">
        {desktopIconsStack}
      </div>

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

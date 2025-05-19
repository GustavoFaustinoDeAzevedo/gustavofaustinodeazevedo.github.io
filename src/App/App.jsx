import React, { useCallback, useMemo, useRef } from 'react';
import { RefsProvider } from '../contexts/RefsContext';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
// import { desktopIconsData } from '../data/desktopIconsData';
// import { useDesktop } from '../hooks/useDesktop';
// import { changeLanguage, hideContextMenu } from '../actions/windowActions';
import { useTimelineContext } from '../contexts/timelineContext';

import { useDisableRightClick } from './useDisableRightClick';
import { useTaskbarProps } from './useTaskbarProps';
import { useWindowList } from './useWindowList';
import { useSelector } from 'react-redux';
import useDesktopIconsList from './useDesktopIconsList';
import { useItemsHandler } from './useItemsHandler';
import { useHandleContextMenu } from './useHandleContextMenu';
import actions from '../store/actions';

import Background from '../components/Background';
import Taskbar from '../components/Taskbar';
import ContextMenu from '../components/ContextMenu';

gsap.registerPlugin(useGSAP);

const App = () => {
  const desktopRef = useRef(null);
  useDisableRightClick();
  const language = useSelector((state) => state.language);
  const contextMenu = useSelector((state) => state.contextMenu);
  const windowList = useSelector((state) => state.window.openedWindowList);
  const focusedWindow = useSelector((state) => state.window.focusedWindow);
  const {
    handleFocusWindow,
    handleOpenWindow,
    handleResetFocus,
    handleCloseWindow,
    handleUpdateWindow,
  } = actions.useWindowActions();
  const contextMenuActions = actions.useContextMenuActions();
  const handleHideContextMenu = contextMenuActions.handleHideContextMenu;
  const handleChangeLanguage = useCallback(() => {
    changeLanguage(language === 'POR' ? 'ENG' : 'POR');
  }, [language]);

  const taskbarProps = useTaskbarProps({
    handleChangeLanguage,
  });

  const itemsHandler = useItemsHandler();
  const handleContextMenu = useHandleContextMenu();

  const desktopIconsStack = useDesktopIconsList();
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

  return (
    <div className="desktop" ref={desktopRef}>
      <Background onContextMenu={handleContextMenu} />
      <div className="desktop-icons-wrapper related-background">
        {desktopIconsStack}
      </div>
      <RefsProvider>
        {windowsStack}
        {/* <Taskbar {...taskbarProps} /> */}
      </RefsProvider>
      {contextMenu.visible && (
        <ContextMenu
          {...contextMenu}
          language={language}
          items={itemsHandler()}
          onClose={() => handleHideContextMenu()}
        />
      )}
    </div>
  );
};

export default React.memo(App);

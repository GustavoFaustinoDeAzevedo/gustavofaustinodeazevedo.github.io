import React, { useCallback, useEffect, useRef } from 'react';
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
import { taskbarProps } from './hooks/taskbarProps';
import createWindowList from './utils/createWindowList';

import { useItemsHandler } from './hooks/useItemsHandler';
import { useHandleContextMenu } from './hooks/useHandleContextMenu';

gsap.registerPlugin(useGSAP);

const App = () => {
  //Refs
  const desktopRef = useRef(null);

  //Setup
  // useDisableRightClick();

  //Redux Selectors
  const language = useSelector((state) => state.settings.language);
  const contextMenu = useSelector((state) => state.contextMenu);
  const windowList = useSelector((state) => state.window.openedWindowList);
  const focusedWindow = useSelector((state) => state.window.focusedWindow);
  const history = useSelector((state) => state.window.history);
  const rootFolder = useSelector((state) => state.file.filesList);

  //Action Handlers
  const windowActions = {
    ...actions.useWindowActions(),
    ...actions.useSettingsActions(),
  };

  const filesActions = actions.useFilesActions();
  const contextMenuActions = actions.useContextMenuActions();
  const handleHideContextMenu = contextMenuActions.handleHideContextMenu;

  //Hooks: Windows & Taskbar

  const windowsStack = createWindowList(
    desktopRef,
    windowList,
    focusedWindow,
    language,
    windowActions
  );

  // const itemsHandler = useItemsHandler();
  // const handleContextMenu = useHandleContextMenu();

  //JSX Render
  return (
    <>
      {/* <GlobalStyle /> */}
      <div className="desktop" ref={desktopRef}>
        <Desktop
          //onContextMenu={handleContextMenu}
          language={language}
          windowList={windowList}
          children={rootFolder.children}
          filesActions={filesActions}
          handleOpenWindow={windowActions.handleOpenWindow}
        />

        <RefsProvider>
          {windowsStack}
          <Taskbar
            {...taskbarProps({
              windowList,
              history,
              focusedWindow,
              language,
              windowActions,
            })}
          />
        </RefsProvider>

        {/* {contextMenu.visible && (
        <ContextMenu
          {...contextMenu}
          language={language}
          items={itemsHandler()}
          onClose={handleHideContextMenu}
        />
      )} */}
      </div>
    </>
  );
};

export default React.memo(App);

import React, {
  use,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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
import createWindowList from '../components/Window/utils/createWindowList';

import { useItemsHandler } from './hooks/useItemsHandler';
import { useHandleContextMenu } from './hooks/useHandleContextMenu';
import { ThemeProvider } from 'styled-components';
import PageMeta from '../components/PageMeta';
import useChangeTheme from '../components/Settings/ChangeTheme/hooks/useChangeTheme';
import useUserBrowserDarkMode from '../hooks/useUserBrowserDarkMode';

gsap.registerPlugin(useGSAP);

const App = () => {
  //Refs
  useEffect(() => {
    
  },[]);
  const { theme, isDarkMode, setDarkMode } = useChangeTheme();
  const desktopRef = useRef(null);
  const isUserBrowserDarkMode = useUserBrowserDarkMode();

  //Setup
  // useDisableRightClick();

  //Redux Selectors
  const language = useSelector((state) => state.settings.language);
  const contextMenu = useSelector((state) => state.contextMenu);
  const windowList = useSelector((state) => state.window.openedWindowList);
  const focusedWindow = useSelector((state) => state.window.focusedWindow);
  const history = useSelector((state) => state.window.history);
  const rootFolder = useSelector((state) => state.file.filesList);
  const newRootFolder = rootFolder;

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
    windowActions,
    filesActions
  );

  // const itemsHandler = useItemsHandler();
  // const handleContextMenu = useHandleContextMenu();

  //JSX Render

  return (
    <>
      <PageMeta
        focusedWindow={focusedWindow}
        windowList={windowList}
        isUserBrowserDarkMode={isUserBrowserDarkMode}
        language={language}
      />
      <ThemeProvider theme={theme}>
        {/* <GlobalStyle /> */}
        <div className="desktop" ref={desktopRef}>
          <Desktop
            //onContextMenu={handleContextMenu}
            currentNode={'desktop'}
            language={language}
            windowList={windowList}
            children={rootFolder.children[0].children[0].children[0].children} // C:\Users\Guest\Desktop
            filesActions={filesActions}
            windowActions={windowActions}
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
      </ThemeProvider>
    </>
  );
};

export default React.memo(App);

import React, { use, useCallback, useEffect, useRef, useState } from 'react';
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

import {
  lightTheme,
  darkTheme,
} from '../components/ui/GlobalStyles/utils/themes';
import { useItemsHandler } from './hooks/useItemsHandler';
import { useHandleContextMenu } from './hooks/useHandleContextMenu';
import { ThemeProvider } from 'styled-components';
import { index } from 'mathjs';

gsap.registerPlugin(useGSAP);

const App = () => {
  //Refs
  const [darkMode, setDarkMode] = useState(true);
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

  function findPath(obj, targetId, targetIndex, path = []) {
    if (obj.id === targetId && obj.index === targetIndex) return [...path];

    if (obj.children) {
      for (let child of obj.children) {
        const result = findPath(child, targetId, targetIndex, [
          ...path,
          obj.title[language.toLowerCase()],
        ]);
        if (result) return result;
      }
    }

    return null;
  }
  console.log(
    [(findPath(newRootFolder, 'desktop', 3) ?? []).join('/'), 'Desktop'].join(
      '/'
    )
  );
  return (
    <>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        {/* <GlobalStyle /> */}
        <div className="desktop" ref={desktopRef}>
          <Desktop
            //onContextMenu={handleContextMenu}
            nodeId={'desktop'}
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

import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import actions from '../store/actions';

import Desktop from '../components/Desktop';
import Taskbar from '../components/Taskbar';
import PageMeta from '../components/PageMeta';

import taskbarProps from '../app/hooks/taskbarProps';
import createWindowList from '../components/Window/utils/createWindowList';
import { RefsProvider } from '../contexts/RefsContext';
import { ThemeProvider } from 'styled-components';

import useChangeTheme from '../components/Settings/ChangeTheme/hooks/useChangeTheme';
import useUserBrowserDarkMode from '../hooks/useUserBrowserDarkMode';

gsap.registerPlugin(useGSAP);

/**
 * Main application component.
 * Sets up theme, Redux state selectors, action handlers, and renders
 * Desktop, window stack, and Taskbar inside ThemeProvider.
 */
const App: React.FC = () => {
  // Apply custom theme hook
  const { theme } = useChangeTheme();

  // Reference to the desktop container for animations / window positioning
  const desktopRef = useRef<HTMLDivElement | null>(null);

  // Detect if user’s browser is in dark mode
  const isUserBrowserDarkMode = useUserBrowserDarkMode();

  // Redux selectors: grab settings, context menu, window data, and file tree
  const language = useSelector((state: RootState) => state.settings.language);
  const backgroundColor = useSelector(
    (state: RootState) => state.settings.desktopBackgroundColor
  );
  const contextMenu = useSelector((state: RootState) => state.contextMenu);
  const windowList = useSelector(
    (state: RootState) => state.window.openedWindowList
  );
  const focusedWindow = useSelector(
    (state: RootState) => state.window.focusedWindow
  );
  const history = useSelector((state: RootState) => state.window.history);
  const rootFolder = useSelector((state: RootState) => state.file.filesList);

  // Combine window- and settings-related action hooks
  const windowActions = {
    ...actions.useWindowActions(),
    ...actions.useSettingsActions(),
  };

  // Files and context menu actions
  const filesActions = actions.useFilesActions();
  const contextMenuActions = actions.useContextMenuActions();
  const handleHideContextMenu = contextMenuActions.handleHideContextMenu;

  // Build stack of window components based on current state
  const windowsStack = createWindowList(
    desktopRef,
    windowList,
    focusedWindow,
    language,
    windowActions,
    filesActions
  );

  return (
    <>
      {/* Populate head metadata based on window and theme */}
      <PageMeta
        focusedWindow={focusedWindow}
        windowList={windowList}
        isUserBrowserDarkMode={isUserBrowserDarkMode}
        language={language}
      />

      {/* Provide styled-components theme */}
      <ThemeProvider theme={theme}>
        <div className="desktop" ref={desktopRef}>
          {/* Render desktop icons and children for C:\Users\Guest\Desktop */}
          <Desktop
            currentNode="desktop"
            language={language}
            windowList={windowList}
            backgroundColor={backgroundColor}
            children={
              rootFolder.children?.[0]?.children?.[0]?.children?.[0]
                ?.children ?? []
            }
            filesActions={filesActions}
            windowActions={windowActions}
          />

          {/* Provide refs context for window positioning */}
          <RefsProvider>
            {windowsStack}

            {/* Render taskbar with dynamic props */}
            <Taskbar
              {...taskbarProps({
                windowList,
                history,
                focusedWindow,
                language,
                handleChangeLanguage: windowActions.handleChangeLanguage,
                windowActions,
              })}
              onChangeLanguage={windowActions.handleChangeLanguage}
            />
          </RefsProvider>

          {/* 
            // Uncomment to enable custom context menu
            {contextMenu.visible && (
              <ContextMenu
                {...contextMenu}
                language={language}
                items={useItemsHandler()}
                onClose={handleHideContextMenu}
              />
            )}
          */}
        </div>
      </ThemeProvider>
    </>
  );
};

export default React.memo(App);

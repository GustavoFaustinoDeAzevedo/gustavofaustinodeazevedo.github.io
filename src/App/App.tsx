import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { RootState } from '@/store';

import Desktop from '@/components/Desktop';
import Taskbar from '@/components/Taskbar';
import PageMeta from '@/components/PageMeta';

import { useIsMobile } from '@/shared/hooks';
import createWindowList from '@/components/Window/utils/createWindowList';
import { RefsProvider } from '@/contexts/RefsContext';

import { ThemeProvider } from 'styled-components';

import useChangeTheme from '@/components/Settings/ChangeTheme/hooks/useChangeTheme';
import useUserBrowserDarkMode from '@/shared/hooks/useUserBrowserDarkMode';

import actions from '@/store/actions';

gsap.registerPlugin(useGSAP);

const App = () => {
  const isMobile = useIsMobile();
  const { theme } = useChangeTheme();
  const desktopRef = useRef<HTMLDivElement | null>(null);
  const isUserBrowserDarkMode = useUserBrowserDarkMode();
  const language = useSelector((state: RootState) => state.settings.language);
  const backgroundImage = useSelector(
    (state: RootState) => state.settings.desktopBackgroundImage
  );
  const backgroundColorContrast = useSelector(
    (state: RootState) => state.settings.desktopBackgroundColorContrast
  );
  const windowList = useSelector(
    (state: RootState) => state.window.openedWindowList
  );
  const focusedWindow = useSelector(
    (state: RootState) => state.window.focusedWindow
  );
  const rootFolder = useSelector((state: RootState) => state.file.filesList);

  const filesActions = actions.useFilesActions();
  const contextMenuActions = actions.useContextMenuActions();
  const handleHideContextMenu = contextMenuActions.handleHideContextMenu;

  const windowsStack = createWindowList({
    isMobile,
    desktopRef,
    windowList,
    focusedWindow,
    language,
    filesActions,
  });

  return (
    <>
      <PageMeta
        focusedWindow={focusedWindow}
        windowList={windowList}
        isUserBrowserDarkMode={isUserBrowserDarkMode}
        language={language}
      />

      <ThemeProvider theme={theme}>
        <div className="desktop" ref={desktopRef}>
          <Desktop
            currentNode="desktop"
            language={language}
            windowList={windowList}
            isMobile={isMobile}
            backgroundImage={backgroundImage}
            backgroundColorContrast={backgroundColorContrast}
            children={
              rootFolder.children?.[0]?.children?.[0]?.children?.[0]
                ?.children ?? []
            } // temporário
            filesActions={filesActions}
          />
          <RefsProvider>
            {windowsStack}
            <Taskbar isMobile={isMobile} />
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

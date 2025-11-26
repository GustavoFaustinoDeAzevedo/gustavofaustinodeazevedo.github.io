import React, { useRef, useState } from 'react';

import './app.styles.css';

import Desktop from '@components/Desktop';
import Taskbar from '@components/Taskbar';

import ListWindows from '@window';
import { RefsProvider } from '@/contexts/RefsContext';

import { ThemeProvider } from 'styled-components';

import useUserBrowserDarkMode from '@/shared/hooks/useUserBrowserDarkMode';

import actions from '@/store/actions';
import useBackgroundImageLoad from '@/shared/hooks/useBackgroundImageLoad';
import { desktopBackgroundInitialImage } from '@/store/slices/settings/settingsSlice';

const App = () => {
  const [isLoadingAnimation, setIsLoadingAnimation] = useState(true);
  const loaded = useBackgroundImageLoad(
    desktopBackgroundInitialImage,
    'images/Wallpapers/pexels-rpnickson-2559941.jpg',
    15000
  );
  const desktopRef = useRef<HTMLDivElement | null>(null);
  // const isUserBrowserDarkMode = useUserBrowserDarkMode();

  const contextMenuActions = actions.useContextMenuActions();

  return (
    <>
      {!loaded && (
        <div className="loading-screen flex justify-end items-end padding-4">
          <p className="animate-spin text-3xl z-tooltip">💿</p>
        </div>
      )}
      {loaded && (
        <>
          {isLoadingAnimation && (
            <>
              <div
                className="loading-screen__ending-layer-1"
                onAnimationEnd={() => setIsLoadingAnimation(false)}
              ></div>
            </>
          )}

          <div className="desktop" ref={desktopRef}>
            <Desktop />
            <RefsProvider>
              <ListWindows desktopRef={desktopRef} />
              <Taskbar />
            </RefsProvider>

            {/* 
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
        </>
      )}
    </>
  );
};

export default React.memo(App);

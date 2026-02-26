import React, { useRef, useState, Suspense } from 'react';
import './app.styles.css';

import { RefsProvider } from '@/contexts/RefsContext';
import { ThemeProvider } from 'styled-components';

import useUserBrowserDarkMode from '@/shared/hooks/useUserBrowserDarkMode';
import actions from '@/store/actions';
import useBackgroundImageLoad from '@/shared/hooks/useBackgroundImageLoad';
import { desktopBackgroundInitialImage } from '@/store/slices/settings/settingsSlice';
import { useKeyboardBlockOnMouseHold, useLocalStorage } from '@shared/hooks';

// Lazy imports
const Desktop = React.lazy(() => import('@components/Desktop'));
const Taskbar = React.lazy(() => import('@components/Taskbar'));
const ListWindows = React.lazy(() =>
  import('@/components/UserInterfaceWindow').then((module) => ({
    default: module.ListWindows,
  })),
);

const App = () => {
  const [isLoadingAnimation, setIsLoadingAnimation] = useState(true);
  const loaded = useBackgroundImageLoad(
    desktopBackgroundInitialImage,
    'images/Wallpapers/pexels-rpnickson-2559941.jpg',
    15000,
  );
  const desktopRef = useRef<HTMLDivElement | null>(null);

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
            <div
              className="loading-screen__ending-layer-1"
              onAnimationEnd={() => setIsLoadingAnimation(false)}
            ></div>
          )}

          <div className="desktop" ref={desktopRef}>
            <Suspense fallback={<div>Carregando Desktop...</div>}>
              <Desktop />
            </Suspense>

            <RefsProvider>
              <Suspense fallback={<div>Carregando janelas...</div>}>
                <ListWindows desktopRef={desktopRef} />
              </Suspense>

              <Suspense fallback={<div>Carregando Taskbar...</div>}>
                <Taskbar />
              </Suspense>
            </RefsProvider>
          </div>
        </>
      )}
    </>
  );
};

export default React.memo(App);

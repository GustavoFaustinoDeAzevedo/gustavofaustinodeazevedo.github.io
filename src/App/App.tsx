import React, { useRef, useState, Suspense } from 'react';
import './app.styles.css';

import { RefsProvider } from '@/contexts/RefsContext';
import useBackgroundImageLoad from '@/shared/hooks/useBackgroundImageLoad';
import { desktopBackgroundInitialImage } from '@/store/slices/settings/settingsSlice';
import LoadingScreen from './LoadingScreen';


const Desktop = React.lazy(() => import('@components/Desktop'));
const Taskbar = React.lazy(() => import('@components/Taskbar'));
const ListWindows = React.lazy(() =>
  import('@/components/UserInterface').then((module) => ({
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
      {!loaded && <LoadingScreen text="Carregando sistema..." icon="💿" />}

      {loaded && (
        <>
          {isLoadingAnimation && (
            <div
              className="loading-screen__ending-layer-1"
              onAnimationEnd={() => setIsLoadingAnimation(false)}
            ></div>
          )}

          <div className="desktop" ref={desktopRef}>
            <Suspense
              fallback={
                <LoadingScreen text="Carregando Desktop..." icon="🖥️" />
              }
            >
              <Desktop />
            </Suspense>

            <RefsProvider>
              <Suspense
                fallback={
                  <LoadingScreen text="Carregando janelas..." icon="🗂️" />
                }
              >
                <ListWindows desktopRef={desktopRef} />
              </Suspense>

              <Suspense
                fallback={
                  <LoadingScreen text="Carregando Taskbar..." icon="🛠️" />
                }
              >
                <Taskbar />
              </Suspense>
            </RefsProvider>
          </div>
        </>
      )}
    </>
  );
};

export default App;

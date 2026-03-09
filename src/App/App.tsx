import React, { useRef, useState, Suspense } from 'react';
import './app.styles.css';

import { RefsProvider } from '@/contexts/RefsContext';
import useBackgroundImageLoad from '@/shared/hooks/useBackgroundImageLoad';
import { desktopBackgroundInitialImage } from '@/store/slices/settings/settingsSlice';
import LoadingScreen from './LoadingScreen';

const [Desktop, Taskbar, SystemWindowsList] = [
  React.lazy(() =>
    import('@/components/DesktopEnvironment').then((module) => ({
      default: module.Desktop,
    })),
  ),
  React.lazy(
    () => import('@/components/DesktopEnvironment/CoreElements/Taskbar'),
  ),
  React.lazy(() => import('./SystemWindowsList')),
];

const App = () => {
  const [isLoadingAnimation, setIsLoadingAnimation] = useState(true);
  const loaded = useBackgroundImageLoad(
    desktopBackgroundInitialImage,
    'images/Wallpapers/pexels-rpnickson-2559941.jpg',
    15000,
  );
  const desktopRef = useRef<HTMLDivElement>(document.createElement('div'));

  return (
    <>
      <Suspense fallback={<LoadingScreen text="Carregando..." icon="💿" />}>
        {isLoadingAnimation && (
          <div
            className="loading-screen__ending-layer-1"
            onAnimationEnd={() => setIsLoadingAnimation(false)}
          ></div>
        )}

        <div className="desktop" ref={desktopRef}>
          <Desktop />

          <RefsProvider>
            <SystemWindowsList bounds={desktopRef} />

            <Taskbar />
          </RefsProvider>
        </div>
      </Suspense>
    </>
  );
};

export default App;

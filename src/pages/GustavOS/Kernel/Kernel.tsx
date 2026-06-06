import React, { useRef, useState, Suspense } from 'react';
import './Kernel.css';

import { RefsProvider } from '@GustavOS/contexts/RefsContext';
import useBackgroundImageLoad from '@/shared/hooks/useBackgroundImageLoad';
import { desktopBackgroundInitialImage } from '@/store/slices/settings/settingsSlice';
import LoadingScreen from './LoadingScreen';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import actions from '@/store/actions';
import { useLayoutEffect } from 'react';

const [Desktop, Taskbar, SystemWindowsList] = [
  React.lazy(() =>
    import('@GustavOS/components').then((module) => ({
      default: module.Desktop,
    })),
  ),
  React.lazy(() =>
    import('@GustavOS/components/CoreElements/Taskbar').then((module) => ({
      default: module.Taskbar,
    })),
  ),
  React.lazy(() => import('./SystemWindowsList')),
];

const Kernel = () => {
  const [isLoadingAnimation, setIsLoadingAnimation] = useState(true);
  const { handleCurrentUser } = actions.useUserActions();
  const userId = useSelector((state: RootState) => state.users.currentUserId);

  const loaded = useBackgroundImageLoad(
    desktopBackgroundInitialImage,
    'images/Wallpapers/pexels-rpnickson-2559941.jpg',
    15000,
  );
  const desktopRef = useRef<HTMLDivElement>(document.createElement('div'));

  useLayoutEffect(() => {
    handleCurrentUser(userId);
  }, [userId, handleCurrentUser]);

  return (
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
  );
};

export default Kernel;

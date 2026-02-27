import WindowManager from './WindowManager';
import { useIsMobile } from '@/shared';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import React, { useMemo } from 'react';

const ListWindows = ({
  desktopRef,
}: {
  desktopRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const windowList = useSelector(
    (state: RootState) => state.window.openedWindows,
  );

  const windowCount = useMemo(
    () => Object.keys(windowList).length,
    [windowList],
  );

  const isMobile = useIsMobile();

  const windowMapper = useMemo(
    () =>
      Object.keys(windowList).map((windowId, index) => (
        <WindowManager
          isMobile={isMobile}
          windowIndex={index}
          key={windowId}
          windowId={windowId || ''}
          desktopRef={desktopRef}
        />
      )),
    [windowCount, isMobile, desktopRef],
  );

  return <>{windowMapper}</>;
};

export default React.memo(ListWindows);

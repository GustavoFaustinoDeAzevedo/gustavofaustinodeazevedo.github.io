import WindowManager from './WindowManager';
import { useIsMobile } from '@/shared';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import React, { useMemo } from 'react';

const ListWindows = ({ desktopRef }: { desktopRef: React.RefObject<HTMLDivElement | null> }) => {
  const windowList = useSelector((state: RootState) => state.window.openedWindowList);

  const filteredWindowList = useMemo(
    () => windowList?.filter(({ windowId }) => windowId !== 'new' && windowId !== 'placeholder'),
    [windowList]
  );

  const isMobile = useIsMobile();

  const windowMapper = useMemo(
    () =>
      filteredWindowList?.map((windowParams, index) => (
        <WindowManager
          isMobile={isMobile}
          windowIndex={index}
          key={windowParams.windowId}
          windowRawParams={windowParams} 
          desktopRef={desktopRef}
        />
      )),
    [filteredWindowList, isMobile, desktopRef]
  );

  return <>{windowMapper}</>;
};

export default React.memo(ListWindows);


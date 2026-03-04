import React, { useMemo } from 'react';
import WindowManager from './WindowManager';
import { useIsMobile } from '@/shared';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const WindowMapper = ({
  windowList,
  bounds,
  actions,
}: {
  windowList: Record<string, any>;
  bounds: React.RefObject<HTMLDivElement | null>;
  actions: {
    windowActions: {
      handleUpdateWindow: (data: any) => void;
      handleResetFocus: (windowId: string) => void;
      handleCloseWindow: (windowId: string) => void;
      handleGeneralFocus: (windowId: string) => void;
    };
  };
}) => {
  const windowCount = Object.keys(windowList).length;

  const isMobile = useIsMobile();
  const language = useSelector((state: RootState) => state.settings.language);

  const windowMapper = useMemo(
    () =>
      windowCount > 0 &&
      Object.keys(windowList).map((windowId, index) => (
        <WindowManager
          isMobile={isMobile}
          windowIndex={index}
          key={windowId}
          windowId={windowId || ''}
          bounds={bounds}
          windowRawParams={windowList[windowId]}
          language={language}
          actions={actions}
        />
      )),
    [windowCount, isMobile, bounds, language, actions],
  );

  return windowMapper;
};

export default React.memo(WindowMapper);

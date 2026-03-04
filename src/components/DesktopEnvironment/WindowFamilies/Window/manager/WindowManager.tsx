import Window from '../core';
import { WindowData } from '@/store/actions/useWindowActions';
import React, { useCallback, useMemo, useRef } from 'react';
import flattenWindowParams from '../utils/flattenWindowParams';
import useRefs from '@/contexts/useRefs';
import { WindowNode } from '@/store/slices/window';
import { Language } from '@/store/slices/settings';
import useWindowHandlers from '../utils/createWindowHandlers';

type WindowManagerProps = {
  isMobile: boolean;
  windowIndex: number;
  windowId: string;
  bounds: React.RefObject<HTMLDivElement | null>;
  language: Language;
  windowRawParams: WindowNode;
  actions: {
    windowActions: {
      handleUpdateWindow: (data: WindowData) => void;
      handleResetFocus: (windowId: string) => void;
      handleCloseWindow: (windowId: string) => void;
      handleGeneralFocus: (windowId: string) => void;
    };
    filesActions?: {
      handleOpenFile: (path: string) => void;
      handleNewFile: (path: string, data: any) => void;
      handleRemoveFile: (fileToRemove: any) => void;
    };
  };
};

const WindowManager = ({
  isMobile,
  windowIndex,
  windowId,
  bounds,
  language,
  windowRawParams,
  actions,
}: WindowManagerProps) => {
  const { windowActions, filesActions = {} } = actions;

  const { createRef } = useRefs();
  const windowRef = createRef(windowId);
  const headerRef = useRef(null);

  const updateWindowState = useCallback(
    (updates: WindowData): void => {
      windowActions.handleUpdateWindow({ ...updates, windowId });
    },
    [windowActions, windowId],
  );

  const handleResetFocus = useCallback(() => {
    if (!windowRawParams.windowState?.status.focused) return;
    windowActions.handleResetFocus(windowId);
  }, [windowActions, windowId]);

  const handleClose = useCallback(() => {
    updateWindowState({ opened: false });
  }, [updateWindowState]);

  const handleFocus = useCallback(() => {
    if (windowRawParams?.windowState?.status.focused) return null;
    updateWindowState({ focused: true, isRequestingFocus: false });
  }, [updateWindowState, windowRawParams?.windowState?.status.focused]);

  const extraHandlers = useWindowHandlers(updateWindowState);

  const windowHandlers = useMemo(
    () => ({
      updateWindowState,
      handleResetFocus,
      handleClose,
      handleFocus,
      ...extraHandlers,
    }),
    [
      updateWindowState,
      handleResetFocus,
      handleClose,
      handleFocus,
      extraHandlers,
    ],
  );

  const windowParams = useMemo(
    () =>
      flattenWindowParams(
        { windowIndex, language, windowRef, headerRef },
        windowRawParams as WindowNode,
      ),
    [language, windowRawParams, windowRef],
  );

  return (
    <Window
      isMobile={isMobile}
      bounds={bounds}
      windowParams={windowParams}
      windowHandlers={windowHandlers}
      filesActions={filesActions}
    />
  );
};

export default React.memo(WindowManager);

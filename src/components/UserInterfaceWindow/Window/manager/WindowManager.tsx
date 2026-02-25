import Window from '../core';
import { WindowData } from '@/store/actions/useWindowActions';
import React, { useCallback, useMemo, useRef } from 'react';
import actions from '@/store/actions';
import createWindowHandlers from '../utils/createWindowHandlers';
import flattenWindowParams from '../utils/flattenWindowParams';
import useRefs from '@/contexts/useRefs';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { WindowNode } from '@/store/slices/window';

type WindowManagerProps = {
  isMobile: boolean;
  windowIndex: number;
  windowId: string;
  desktopRef: React.RefObject<HTMLDivElement | null>;
};

const WindowManager = ({
  isMobile,
  windowIndex,
  windowId,
  desktopRef,
}: WindowManagerProps) => {

  const windowRawParams = useSelector(
    (state: RootState) => state.window.openedWindows[windowId],
  );

  const language = useSelector((state: RootState) => state.settings.language);

  //Actions

  const windowActions = actions.useWindowActions();
  const filesActions = actions.useFilesActions();

  //Refs para janela e header

  const { createRef } = useRefs();
  const windowRef = createRef(windowId);
  const headerRef = useRef(null);

  //Handler principal para lidar com as atualizações do estado da janela

  const updateWindowState = useCallback(
    (updates: WindowData): void => {
      windowActions.handleUpdateWindow({ ...updates, windowId });
    },
    [windowActions],
  );

  // Handlers para lidar com as ações da janela

  const handleResetFocus = useCallback(() => {
    windowActions.handleResetFocus(windowId);
  }, [windowActions.handleResetFocus]);


  const handleClose = useCallback(() => {
    updateWindowState({ opened: false });
  }, []);


  const handleFocus = useCallback(() => {
    if (windowRawParams?.isFocused) return null;
    updateWindowState({ focused: true, isRequestingFocus: false });
  }, []);

  // Encapsulamento dos handlers

  const windowHandlers = {
    updateWindowState,
    handleResetFocus,
    handleClose,
    handleFocus,
    ...createWindowHandlers(updateWindowState),
  };

  // Planificação de parametros da janela

  const windowParams = useMemo(
    () =>
      flattenWindowParams(
        { windowIndex, language, windowRef, headerRef },
        windowRawParams as WindowNode,
      ),
    [windowIndex, language, windowRef, headerRef, windowRawParams],
  );

  return (
    <Window
      // className={className}
      isMobile={isMobile}
      desktopRef={desktopRef}
      windowParams={windowParams}
      windowHandlers={windowHandlers}
      filesActions={filesActions}
    />
  );
};

export default React.memo(WindowManager);

// export default React.memo(WindowManager, (prev, next) => {
//   return (
//     prev.isMobile === next.isMobile &&
//     prev.windowIndex === next.windowIndex &&
//     prev.desktopRef === next.desktopRef &&
//     prev.windowRawParams.windowId === next.windowRawParams.windowId &&
//     prev.windowRawParams.windowState === next.windowRawParams.windowState
//   );
// });

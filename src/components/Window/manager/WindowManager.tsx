import Window from '../core';
import useFilesActions from '@/store/actions/useFilesActions';
import useSettingsActions from '@/store/actions/useSettingsActions';
import useWindowActions, { WindowData } from '@/store/actions/useWindowActions';
import React, { useCallback, useMemo, useRef } from 'react';
import actions from '@/store/actions';
import createWindowHandlers from '../utils/createWindowHandlers';
import flattenWindowParams from '../utils/flattenWindowParams';
import useRefs from '@/contexts/useRefs';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { WindowNode } from '@/store/slices/window';

type WindowActions = ReturnType<typeof useWindowActions>;
type FilesActions = ReturnType<typeof useFilesActions>;
type SettingActions = ReturnType<typeof useSettingsActions>;

type WindowManagerProps = {
  isMobile: boolean;
  windowIndex: number;
  windowRawParams: WindowNode;
  desktopRef: React.RefObject<HTMLDivElement | null>;
};

const WindowManager = ({
  isMobile,
  windowIndex,
  windowRawParams,
  desktopRef,
}: WindowManagerProps) => {
  const { windowId = '' } = windowRawParams;

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
    [windowActions, windowId],
  );
  

  // Handler para lidar com a perda do foco da janela

  const handleResetFocus = useCallback(() => {
    windowActions.handleResetFocus(windowId);
  }, [windowActions.handleResetFocus]);

  // Handler para lidar com o fechamento da janela

  const handleClose = useCallback(() => {
    updateWindowState({ opened: false });
  }, [updateWindowState]);

  const handleFocus = useCallback(() => {
    if (windowRawParams.isFocused) return null;
    updateWindowState({ focused: true, isRequestingFocus: false });
  }, [updateWindowState]);

  // Criação dos handlers da janela

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
        windowRawParams,
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

export default React.memo(WindowManager, (prev, next) => {
  return (
    prev.isMobile === next.isMobile &&
    prev.windowIndex === next.windowIndex &&
    prev.desktopRef === next.desktopRef &&
    prev.windowRawParams.windowId === next.windowRawParams.windowId &&
    prev.windowRawParams.windowState === next.windowRawParams.windowState
  );
});

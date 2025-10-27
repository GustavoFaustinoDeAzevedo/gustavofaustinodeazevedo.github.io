import Window from './Window';
import useFilesActions from '@/store/actions/useFilesActions';
import useSettingsActions from '@/store/actions/useSettingsActions';
import useWindowActions, { WindowData } from '@/store/actions/useWindowActions';
import { useCallback, useRef } from 'react';
import actions from '@/store/actions';
import createWindowHandlers from '../utils/createWindowHandlers';
import flattenWindowParams from '../utils/flattenWindowParams';
import useRefs from '@/contexts/useRefs';

type WindowActions = ReturnType<typeof useWindowActions>;
type FilesActions = ReturnType<typeof useFilesActions>;
type SettingActions = ReturnType<typeof useSettingsActions>;

type WindowManagerProps = {
  isMobile: boolean;
  windowIndex: number;
  windowRawParams: WindowData;
  language: string;
  desktopRef: React.RefObject<HTMLDivElement | null>;
  filesActions: FilesActions;
  windowActions: WindowActions;
  settingsActions: SettingActions;
};

const WindowManager = ({
  isMobile,
  windowIndex,
  windowRawParams,
  language,
  desktopRef,
  filesActions,
}: WindowManagerProps) => {
  const { windowId = '' } = windowRawParams;

  //Refs para janela e header

  const { createRef } = useRefs();
  const windowRef = createRef(windowId);
  const headerRef = useRef(null);

  const windowActions = actions.useWindowActions();

  //Handler principal para lidar com as atualizações do estado da janela

  const updateWindowState = useCallback(
    (updates: WindowData): void => {
      windowActions.handleUpdateWindow({ ...updates, windowId });
    },
    [windowId, windowActions.handleUpdateWindow]
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

  const windowParams = flattenWindowParams(
    { windowIndex, language, windowRef, headerRef },
    windowRawParams
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

export default WindowManager;

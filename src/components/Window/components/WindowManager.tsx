import Window from './Window';
import useFilesActions from '@/store/actions/useFilesActions';
import useSettingsActions from '@/store/actions/useSettingsActions';
import { HandleChangeBackground } from '../../Settings/ChangeBackground/types/changeBackground.data.types';
import useWindowActions, { WindowData } from '@/store/actions/useWindowActions';
import { Ref, useCallback, useMemo, useRef } from 'react';
import actions from '@/store/actions';
import createWindowHandlers from '../utils/createWindowHandlers';
import flattenWindowParams from '../utils/flattenWindowParams';
import useRefs from '@/contexts/useRefs';
import useWindowLifecycle from '../hooks/useWindowLifecycle';
import createWindowDraggable from '../utils/createWindowDraggable';
import useClickOutside from '@/hooks/useClickOutside';
import getWindowClass from '../utils/getWindowClass';

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

  //classe memoizada para a janela

  const { isFocused, isMinimized, isOpened, isMaximized, zIndex } =
    windowParams;

  const className = useMemo(
    () => getWindowClass({ isFocused, isMinimized, isOpened, isMaximized }),
    [isFocused, isMinimized, isOpened, isMaximized]
  );

  return (
    <Window
      className={className}
      desktopRef={desktopRef}
      windowParams={windowParams}
      windowHandlers={windowHandlers}
      filesActions={filesActions}
    />
  );
};

export default WindowManager;

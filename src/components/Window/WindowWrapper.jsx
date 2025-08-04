import Window from './components/Window';

const WindowWrapper = ({
  windowIndex,
  windowParams,
  language,
  isFocused,
  desktopRef,
  windowList,
  filesActions,
  windowActions,
}) => {
  const {
    handleOpenWindow,
    handleResetFocus,
    handleCloseWindow,
    handleFocusWindow,
    handleUpdateWindow,
    handleChangeBackground,
  } = windowActions;

  const { windowId, size, position, windowState, ...restParams } = windowParams;

  const windowParamsObj = {
    ...restParams,
    windowId,
    windowIndex,
    language,
    isFocused,
    windowList,
    x: position.x,
    y: position.y,
    width: size.width,
    height: size.height,
    lastX: position.lastX,
    lastY: position.lastY,
    isOpen: windowState.open,
    lastWidth: size.lastWidth,
    lastHeight: size.lastHeight,
    isMinimized: windowState.minimized,
    isMaximized: windowState.maximized,
    isRequestingOpen: windowState.requestingOpen,
    isRequestingClose: windowState.requestingClose,
    isRequestingRestore: windowState.requestingRestore,
    isRequestingMaximize: windowState.requestingMaximize,
    isRequestingMinimize: windowState.requestingMinimize,
  };

  const createWindowActions = (windowId) => ({
    handleContextMenu: () => {},
    handleResetFocus,
    handleFocusWindow: () => handleFocusWindow(windowId),
    handleCloseWindow: () => handleCloseWindow(windowId),
    handleOpenWindow,
    handleUpdateWindow: (params) => handleUpdateWindow({ windowId, ...params }),
    handleChangeBackground,
  });

  const windowActionsObj = createWindowActions(windowId);

  return (
    <Window
      desktopRef={desktopRef}
      windowParams={windowParamsObj}
      windowActions={windowActionsObj}
      filesActions={filesActions}
    />
  );
};

export default WindowWrapper;

import React, { useContext } from 'react';
import Window from './Window';

const WindowWrapper = ({
  index,
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

  const { id, size, position, windowState, ...restParams } = windowParams;

  const windowParamsObj = {
    ...restParams,
    id,
    index,
    language,
    isFocused,
    windowList,
    x: position.x,
    y: position.y,
    width: size.width,
    height: size.height,
    startX: position.startX,
    startY: position.startY,
    isOpen: windowState.open,
    startWidth: size.startWidth,
    startHeight: size.startHeight,
    isMinimized: windowState.minimized,
    isMaximized: windowState.maximized,
    isRequestingOpen: windowState.requestingOpen,
    isRequestingClose: windowState.requestingClose,
    isRequestingRestore: windowState.requestingRestore,
    isRequestingMaximize: windowState.requestingMaximize,
    isRequestingMinimize: windowState.requestingMinimize,
  };

  const windowActionsObj = {
    handleContextMenu: () => {},
    handleResetFocus: () => handleResetFocus(),
    handleFocusWindow: () => handleFocusWindow(id),
    handleCloseWindow: () => handleCloseWindow(id),
    handleOpenWindow: (data) => handleOpenWindow(data),
    handleUpdateWindow: (params) => handleUpdateWindow({ id, ...params }),
    handleChangeBackground: (backgroundColor, iconColor, backgroundImage) =>
      handleChangeBackground(backgroundColor, iconColor, backgroundImage),
  };

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

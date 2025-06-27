import React, { useContext } from 'react';
import Window from './Window';

const WindowWrapper = ({
  index,
  window,
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

  const {
    id,
    src,
    icon,
    size,
    type,
    title,
    zIndex,
    nodeId,
    content,
    children,
    position,
    windowState,
  } = window;

  const windowParamsObj = {
    id,
    src,
    type,
    icon,
    index,
    title,
    zIndex,
    nodeId,
    language,
    children,
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
    handleOpenWindow: () => handleOpenWindow(),
    handleFocusWindow: () => handleFocusWindow(id),
    handleCloseWindow: () => handleCloseWindow(id),
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

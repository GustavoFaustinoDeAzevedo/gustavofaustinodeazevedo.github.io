import React, { useContext } from 'react';
import Window from '../Window/components/Window';

const WindowWrapper = ({
  window,
  index,
  isFocused,
  handlers,
  desktopRef,
  language,
}) => {
  const {
    handleOpenWindow,
    handleFocusWindow,
    handleResetFocus,
    handleCloseWindow,
    handleUpdateWindow,
  } = handlers;

  const { id, title, windowState, position, size, zIndex, icon, content } =
    window;

  const windowParamsObj = {
    id,
    index,
    zIndex,
    isOpen: windowState.open,
    title,
    icon,
    x: position.x,
    y: position.y,
    startX: position.startX,
    startY: position.startY,
    width: size.width,
    height: size.height,
    startWidth: size.startWidth,
    startHeight: size.startHeight,
    isFocused,
    isMinimized: windowState.minimized,
    isMaximized: windowState.maximized,
    isRequestingOpen: windowState.requestingOpen,
    isRequestingRestore: windowState.requestingRestore,
    isRequestingClose: windowState.requestingClose,
    isRequestingMaximize: windowState.requestingMaximize,
    isRequestingMinimize: windowState.requestingMinimize,
    content,
  };

  const windowActionsObj = {
    onUpdateWindow: handleUpdateWindow,
    onFocus: () => handleFocusWindow(id),
    onUnfocus: () => handleResetFocus(),
    onClose: () => handleCloseWindow(id),
    onContextMenu: () => {},
  };

  return (
    <Window
      windowParams={windowParamsObj}
      windowActions={windowActionsObj}
      desktopRef={desktopRef}
    />
  );
};

export default WindowWrapper;

import { useRef, useMemo, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import WindowHeader from './windowHeader';
import WindowContentWrapper from './WindowContentWrapper';
import useClickOutside from '../../../hooks/useClickOutside';
import createWindowDraggable from '../utils/createWindowDraggable';
import getWindowClass from '../utils/getWindowClass';
import useRefs from '../../../contexts/useRefs';
import useWindowLifecycle from '../hooks/useWindowLifecycle';

gsap.registerPlugin(useGSAP);

const Window = ({ windowParams, windowActions, desktopRef, filesActions }) => {
  const {
    windowId,
    currentNode,
    zIndex,
    isOpen,
    title,
    icon,
    children,
    isFocused,
    isMinimized,
    isMaximized,
    windowList,
    language,
    type,
    src,
  } = windowParams;
  const {
    handleFocusWindow,
    handleResetFocus,
    handleUpdateWindow,
    handleContextMenu,
  } = windowActions;

  // Refs for window and header

  const { createRef } = useRefs();
  const windowRef = createRef(windowId);
  const headerRef = useRef(null);

  // updateWindowState function to handle window state updates

  const updateWindowState = useCallback(
    (updates) => handleUpdateWindow({ windowId, ...updates }),
    [windowId, handleUpdateWindow]
  );

  // Memoized className for the window

  const className = useMemo(
    () => getWindowClass({ isFocused, isMinimized, isOpen, isMaximized }),
    [isFocused, isMinimized, isOpen, isMaximized]
  );

  // Function to get window dimensions

  const getWindowInfo = useCallback(
    () => windowRef.current?.getBoundingClientRect() ?? { width: 0, height: 0 },
    [windowRef]
  );

  // Window lifecycle management

  useWindowLifecycle({
    windowRef,
    headerRef,
    desktopRef,
    windowParams,
    windowActions,
    handleFocusWindow,
    updateWindowState,
    getWindowInfo,
    createWindowDraggable,
  });

  // Click hook to handle focus

  useClickOutside({
    mainRef: windowRef,
    onClickOutside: handleResetFocus,
    isActive: isFocused,
  });

  // Handlers for window actions

  const handleMinimize = useCallback(
    () => updateWindowState({ requestingMinimize: true }),
    [updateWindowState]
  );
  const handleMaximize = useCallback(
    () => updateWindowState({ requestingMaximize: true }),
    [updateWindowState]
  );
  const handleRestore = useCallback(
    () => updateWindowState({ requestingRestore: true }),
    [updateWindowState]
  );
  const handleClose = useCallback(
    () => updateWindowState({ requestingClose: true }),
    [updateWindowState]
  );

  // Props for child components

  const windowHeaderProps = {
    headerRef,
    onMinimize: handleMinimize,
    onMaximize: handleMaximize,
    onRestore: handleRestore,
    onClose: handleClose,
    windowId,
    title,
    icon,
    isOpen,
    isFocused,
    isMinimized,
    isMaximized,
    language,
  };

  const windowContentWrapperProps = {
    isFocused,
    isOpen,
    windowId,
    currentNode,
    src,
    windowActions,
    children,
    filesActions,
    type,
    windowList,
    language,
  };

  return (
    <div
      ref={windowRef}
      className={`${className} parent`}
      style={{ zIndex }}
      onContextMenu={handleContextMenu}
      id={windowId}
      onClick={isFocused ? null : handleFocusWindow}
    >
      <WindowHeader {...windowHeaderProps} />

      <WindowContentWrapper {...windowContentWrapperProps} />
    </div>
  );
};

export default Window;

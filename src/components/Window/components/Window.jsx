import { useRef, useMemo, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import WindowHeader from './windowHeader';
import WindowContentWrapper from './WindowContentWrapper';
import useClickOutside from '../../../hooks/useClickOutside';
import createWindowDraggable from '../utils/createWindowDraggable';
import getWindowClass from '../utils/getWindowClass';
import useRefs from '../../../contexts/useRefs';

import windowAnimations from '../utils/windowAnimations';
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

  const { createRef } = useRefs();
  const windowRef = createRef(windowId);
  const headerRef = useRef(null);
  const {
    openWindow,
    maximizeWindow,
    restoreWindow,
    minimizeWindow,
    closeWindow,
  } = useMemo(() => windowAnimations, []);

  const className = useMemo(
    () => getWindowClass({ isFocused, isMinimized, isOpen, isMaximized }),
    [isFocused, isMinimized, isOpen, isMaximized]
  );

  const getWindowInfo = useCallback(
    () => windowRef.current?.getBoundingClientRect() ?? { width: 0, height: 0 },
    [windowRef]
  );

  const updateWindowState = useCallback(
    (updates) => handleUpdateWindow({ windowId, ...updates }),
    [windowId, handleUpdateWindow]
  );

  useWindowLifecycle({
    windowRef,
    headerRef,
    desktopRef,
    windowParams,
    windowActions,
    handleFocusWindow,
    updateWindowState,
    animations: {
      openWindow,
      maximizeWindow,
      restoreWindow,
      minimizeWindow,
      closeWindow,
    },
    getWindowInfo,
    createWindowDraggable,
  });

  const handleMinimize = () => updateWindowState({ minimized: true });
  const handleMaximize = () => updateWindowState({ maximized: true });
  const handleRestore = () => updateWindowState({ requestingRestore: true });

  const handleClose = () => updateWindowState({ requestingClose: true });


  useClickOutside(windowRef, handleResetFocus, isFocused);

  return (
    <div
      ref={windowRef}
      className={`${className} parent`}
      style={{ zIndex }}
      onContextMenu={handleContextMenu}
      id={windowId}
      onClick={isFocused ? null : handleFocusWindow}
    >
      <WindowHeader
        headerRef={headerRef}
        onMinimize={handleMinimize}
        onMaximize={handleMaximize}
        onRestore={handleRestore}
        onClose={handleClose}
        windowId={windowId}
        title={title}
        icon={icon}
        isOpen={isOpen}
        isFocused={isFocused}
        isMinimized={isMinimized}
        isMaximized={isMaximized}
        language={language}
      />

      <WindowContentWrapper
        isFocused={isFocused}
        isOpen={isOpen}
        windowId={windowId}
        currentNode={currentNode}
        src={src}
        windowActions={windowActions}
        children={children}
        filesActions={filesActions}
        type={type}
        windowList={windowList}
        language={language}
      />
    </div>
  );
};

export default Window;

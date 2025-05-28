// components/Window/index.js
import React, { useRef, useMemo, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import WindowHeader from './windowHeader';
import WindowContent from './WindowContent';
import useClickOutside from '../../hooks/useClickOutside';
import useWindowDraggable from './useWindowDraggable';
import getWindowClass from './utils/getWindowClass';
import useRefs from '../../contexts/useRefs';

import useWindowAnimations from './useWindowAnimations';
import useWindowLifecycle from './hooks/useWindowLifeCycle';

gsap.registerPlugin(useGSAP);

const Window = ({ windowParams, windowActions, desktopRef }) => {
  const {
    id,
    index,
    zIndex,
    isOpen,
    title,
    icon,
    x,
    y,
    startX,
    startY,
    width,
    height,
    content,
    startWidth,
    startHeight,
    isFocused,
    isMinimized,
    isMaximized,
    isRequestingOpen,
    isRequestingRestore,
    isRequestingClose,
  } = windowParams;
  const { onFocus, onUnfocus, onUpdateWindow, onClose, onContextMenu } =
    windowActions;

  const { createRef } = useRefs();
  const windowRef = createRef(id);
  const headerRef = useRef(null);
  const {
    openWindow,
    maximizeWindow,
    restoreWindow,
    minimizeWindow,
    closeWindow,
  } = useWindowAnimations;

  const className = useMemo(
    () => getWindowClass({ isFocused, isMinimized, isOpen, isMaximized }),
    [isFocused, isMinimized, isOpen, isMaximized]
  );

  const getWindowInfo = useCallback(
    () => windowRef.current?.getBoundingClientRect() ?? { width: 0, height: 0 },
    [windowRef]
  );

  const updateWindowState = useCallback(
    (updates) => onUpdateWindow({ id, ...updates }),
    [id, onUpdateWindow]
  );

  useWindowLifecycle({
    windowRef,
    headerRef,
    desktopRef,
    windowParams,
    onFocus,
    onUnfocus,
    onClose,
    updateWindowState,
    animations: {
      openWindow,
      maximizeWindow,
      restoreWindow,
      minimizeWindow,
      closeWindow,
    },
    getWindowInfo,
    useWindowDraggable,
  });

  const handleMinimize = () => updateWindowState({ minimized: true });
  const handleMaximize = () => updateWindowState({ maximized: true });
  const handleRestore = () => updateWindowState({ requestingRestore: true });
  const handleClose = () => updateWindowState({ requestingClose: true });

  useClickOutside(windowRef, onUnfocus, isFocused);

  return (
    <div
      ref={windowRef}
      className={`${className} parent`}
      style={{ zIndex }}
      onContextMenu={onContextMenu}
      id={id}
    >
      <WindowHeader
        headerRef={headerRef}
        onMinimize={handleMinimize}
        onMaximize={handleMaximize}
        onRestore={handleRestore}
        onClose={handleClose}
        {...{ id, title, icon, isOpen, isFocused, isMinimized, isMaximized }}
      />
      <WindowContent
        onFocus={onFocus}
        isOpen={isOpen}
        id={id}
        content={content}
      />
    </div>
  );
};

export default Window;

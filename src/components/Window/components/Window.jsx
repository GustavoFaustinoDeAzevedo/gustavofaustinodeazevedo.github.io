// components/Window/index.js
import React, { useRef, useMemo, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import WindowHeader from './windowHeader';
import WindowContent from './WindowContent';
import useClickOutside from '../../../hooks/useClickOutside';
import createWindowDraggable from '../utils/createWindowDraggable';
import getWindowClass from '../utils/getWindowClass';
import useRefs from '../../../contexts/useRefs';

import windowAnimations from '../utils/windowAnimations';
import useWindowLifecycle from '../hooks/useWindowLifecycle';

gsap.registerPlugin(useGSAP);

const Window = ({ windowParams, windowActions, desktopRef }) => {
  const {
    id,
    zIndex,
    isOpen,
    title,
    icon,
    content,
    isFocused,
    isMinimized,
    isMaximized,
    src
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
    createWindowDraggable,
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
        src={src}
        content={content}
      />
    </div>
  );
};

export default Window;

// components/Window/index.js
import React, {
  useRef,
  useMemo,
  useEffect,
  useCallback,
  useReducer,
} from 'react';
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
import actions from '../../../store/actions';

gsap.registerPlugin(useGSAP);

const Window = ({ windowParams, windowActions, desktopRef }) => {
  const {
    id,
    nodeId,
    zIndex,
    isOpen,
    title,
    icon,
    children,
    isFocused,
    isMinimized,
    isMaximized,
    src,
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
      style={id === 'desktop' ? { zIndex: 0 } : { zIndex: zIndex }}
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
      <WindowContentWrapper
        onFocus={onFocus}
        isFocused={isFocused}
        isOpen={isOpen}
        id={id}
        nodeId={nodeId}
        src={src}
        windowActions={windowActions}
        children={children}
      />
    </div>
  );
};

export default Window;
